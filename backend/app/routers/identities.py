"""Identity Passport + bateria de consistência (Fase 2)."""

from __future__ import annotations

import json
import secrets
from pathlib import Path
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models import ConsistencyBatch, Generation, IdentityPassport, User
from app.rate_limit import rate_limit
from app.schemas import (
    ConsistencyBatteryRequest,
    ConsistencyBatteryResponse,
    GenerationPublic,
    IdentityCreateRequest,
    IdentityPublic,
    IdentityUpdateRequest,
)
from app.services.cerebro import CONSISTENCY_VARIANTS, generate_image
from app.services.safety import evaluate_generation, evaluate_identity_create

router = APIRouter(prefix="/identities", tags=["identities"])
settings = get_settings()


def _require_verified(user: User) -> None:
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Verifique seu email antes de gerenciar identidades",
        )


def _parse_attrs(raw: str) -> dict[str, Any]:
    try:
        data = json.loads(raw or "{}")
        return data if isinstance(data, dict) else {}
    except json.JSONDecodeError:
        return {}


def _to_public(identity: IdentityPassport) -> IdentityPublic:
    return IdentityPublic(
        id=identity.id,
        name=identity.name,
        product_line=identity.product_line,
        tier=identity.tier,
        seed=identity.seed,
        attributes=_parse_attrs(identity.attributes_json),
        consent_synthetic_only=identity.consent_synthetic_only,
        consent_no_real_person=identity.consent_no_real_person,
        apparent_age=identity.apparent_age,
        is_active=identity.is_active,
        created_at=identity.created_at,
        updated_at=identity.updated_at,
    )


def _generation_public(generation: Generation) -> GenerationPublic:
    return GenerationPublic(
        id=generation.id,
        style=generation.style,
        image_url=f"/api/v1/generations/{generation.id}/image",
        watermarked=generation.watermarked,
        created_at=generation.created_at,
        identity_id=generation.identity_id,
        batch_id=generation.batch_id,
        variant=generation.variant,
        product_line=generation.product_line,
        provider=generation.provider,
        model_id=generation.model_id,
        status=generation.status,
        cost_usd_cents=generation.cost_usd_cents,
        latency_ms=generation.latency_ms,
    )


@router.get("", response_model=list[IdentityPublic])
def list_identities(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[IdentityPublic]:
    _require_verified(current_user)
    rows = db.scalars(
        select(IdentityPassport)
        .where(
            IdentityPassport.user_id == current_user.id,
            IdentityPassport.is_active.is_(True),
        )
        .order_by(IdentityPassport.created_at.desc())
    ).all()
    return [_to_public(row) for row in rows]


@router.post("", response_model=IdentityPublic, status_code=status.HTTP_201_CREATED)
def create_identity(
    payload: IdentityCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> IdentityPublic:
    _require_verified(current_user)

    attrs = payload.attributes or {}
    attrs_text = json.dumps(attrs, ensure_ascii=False)
    verdict = evaluate_identity_create(
        db,
        user_id=current_user.id,
        apparent_age=payload.apparent_age,
        consent_synthetic_only=payload.consent_synthetic_only,
        consent_no_real_person=payload.consent_no_real_person,
        attributes_text=f"{payload.name} {attrs_text}",
    )
    if not verdict.allowed:
        db.commit()
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=verdict.detail)

    product_line = payload.product_line.lower().strip()
    if product_line not in {"future", "seduction"}:
        raise HTTPException(status_code=400, detail="product_line deve ser future ou seduction")

    tier = payload.tier.lower().strip()
    if tier not in {"permanente", "preferencial", "variavel", "experimental"}:
        raise HTTPException(
            status_code=400,
            detail="tier inválido (permanente|preferencial|variavel|experimental)",
        )

    identity = IdentityPassport(
        id=secrets.token_urlsafe(12),
        user_id=current_user.id,
        name=payload.name.strip(),
        product_line=product_line,
        tier=tier,
        seed=secrets.token_hex(16),
        attributes_json=attrs_text,
        consent_synthetic_only=payload.consent_synthetic_only,
        consent_no_real_person=payload.consent_no_real_person,
        apparent_age=payload.apparent_age,
        is_active=True,
    )
    db.add(identity)
    db.commit()
    db.refresh(identity)
    return _to_public(identity)


@router.get("/{identity_id}", response_model=IdentityPublic)
def get_identity(
    identity_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> IdentityPublic:
    _require_verified(current_user)
    identity = db.get(IdentityPassport, identity_id)
    if identity is None or identity.user_id != current_user.id or not identity.is_active:
        raise HTTPException(status_code=404, detail="Identity Passport não encontrado")
    return _to_public(identity)


@router.patch("/{identity_id}", response_model=IdentityPublic)
def update_identity(
    identity_id: str,
    payload: IdentityUpdateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> IdentityPublic:
    _require_verified(current_user)
    identity = db.get(IdentityPassport, identity_id)
    if identity is None or identity.user_id != current_user.id or not identity.is_active:
        raise HTTPException(status_code=404, detail="Identity Passport não encontrado")

    if payload.name is not None:
        identity.name = payload.name.strip()
    if payload.tier is not None:
        tier = payload.tier.lower().strip()
        if tier not in {"permanente", "preferencial", "variavel", "experimental"}:
            raise HTTPException(status_code=400, detail="tier inválido")
        identity.tier = tier
    if payload.attributes is not None:
        identity.attributes_json = json.dumps(payload.attributes, ensure_ascii=False)
    if payload.apparent_age is not None:
        if payload.apparent_age < 18:
            raise HTTPException(status_code=422, detail="Idade aparente mínima: 18")
        identity.apparent_age = payload.apparent_age

    db.commit()
    db.refresh(identity)
    return _to_public(identity)


@router.delete("/{identity_id}", status_code=status.HTTP_204_NO_CONTENT, response_class=Response)
def deactivate_identity(
    identity_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Response:
    _require_verified(current_user)
    identity = db.get(IdentityPassport, identity_id)
    if identity is None or identity.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Identity Passport não encontrado")
    identity.is_active = False
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post(
    "/{identity_id}/consistency-battery",
    response_model=ConsistencyBatteryResponse,
)
def run_consistency_battery(
    identity_id: str,
    payload: ConsistencyBatteryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    _: None = rate_limit(
        "generate",
        settings.rate_limit_generate,
        settings.rate_limit_window_seconds,
    ),
) -> ConsistencyBatteryResponse:
    """Bateria Gate 1: mesma identidade em múltiplos ângulos/luzes/detalhes."""
    _require_verified(current_user)
    identity = db.get(IdentityPassport, identity_id)
    if identity is None or identity.user_id != current_user.id or not identity.is_active:
        raise HTTPException(status_code=404, detail="Identity Passport não encontrado")

    max_variants = min(
        payload.max_variants or settings.consistency_battery_max_variants,
        settings.consistency_battery_max_variants,
        len(CONSISTENCY_VARIANTS),
    )
    variants = CONSISTENCY_VARIANTS[:max_variants]
    credit_cost = max(1, len(variants) // 2)  # bateria custa metade arredondada (mín. 1)
    if current_user.credits < credit_cost:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f"Créditos insuficientes para bateria ({credit_cost} necessários).",
        )

    attrs = _parse_attrs(identity.attributes_json)
    attrs["apparent_age"] = identity.apparent_age
    prompt_probe = f"{identity.name} battery {identity.product_line}"
    verdict = evaluate_generation(
        db,
        user_id=current_user.id,
        identity=identity,
        prompt=prompt_probe,
        reference_is_real_photo=False,
        has_real_person_consent=False,
    )
    if not verdict.allowed:
        db.commit()
        raise HTTPException(status_code=422, detail=verdict.detail)

    batch_id = secrets.token_urlsafe(12)
    batch = ConsistencyBatch(
        id=batch_id,
        user_id=current_user.id,
        identity_id=identity.id,
        product_line=identity.product_line,
        variant_count=len(variants),
        success_count=0,
        fail_count=0,
        total_cost_usd_cents=0,
        total_latency_ms=0,
        notes_json=json.dumps({"credit_cost": credit_cost, "gate": "gate1_fase2"}),
    )
    db.add(batch)

    generations: list[Generation] = []
    base_dir = Path(settings.generations_dir) / current_user.id / identity.id / batch_id

    for item in variants:
        generation_id = secrets.token_urlsafe(12)
        image_path = base_dir / f"{item['variant']}-{generation_id}.png"
        result = generate_image(
            settings,
            output_path=image_path,
            seed=identity.seed,
            style=item["style"],
            variant=item["variant"],
            product_line=identity.product_line,
            attributes=attrs,
            watermark=True,
        )
        generation = Generation(
            id=generation_id,
            user_id=current_user.id,
            identity_id=identity.id,
            batch_id=batch_id,
            style=item["style"],
            variant=item["variant"],
            product_line=identity.product_line,
            image_path=str(image_path),
            watermarked=True,
            provider=result.provider,
            model_id=result.model_id,
            prompt_hash=result.prompt_hash,
            status=result.status,
            error_message=result.error_message,
            cost_usd_cents=result.cost_usd_cents,
            latency_ms=result.latency_ms,
        )
        db.add(generation)
        generations.append(generation)
        if result.status == "completed" and image_path.is_file():
            batch.success_count += 1
        else:
            batch.fail_count += 1
        batch.total_cost_usd_cents += result.cost_usd_cents
        batch.total_latency_ms += result.latency_ms

    current_user.credits -= credit_cost
    db.commit()
    for generation in generations:
        db.refresh(generation)
    db.refresh(batch)
    db.refresh(current_user)

    failure_rate = (
        batch.fail_count / batch.variant_count if batch.variant_count else 0.0
    )
    return ConsistencyBatteryResponse(
        batch_id=batch.id,
        identity_id=identity.id,
        product_line=identity.product_line,
        variant_count=batch.variant_count,
        success_count=batch.success_count,
        fail_count=batch.fail_count,
        failure_rate=failure_rate,
        total_cost_usd_cents=batch.total_cost_usd_cents,
        total_latency_ms=batch.total_latency_ms,
        credits_remaining=current_user.credits,
        generations=[_generation_public(g) for g in generations],
    )
