"""Geração via Cérebro Astra (Fase 2) — teaser compatível + Identity Passport."""

from __future__ import annotations

import json
import secrets
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models import Generation, IdentityPassport, User
from app.rate_limit import rate_limit
from app.schemas import GenerationPublic, TeaserGenerateRequest, TeaserGenerateResponse
from app.services.cerebro import generate_image
from app.services.safety import evaluate_generation

router = APIRouter(tags=["generate"])
settings = get_settings()


def _require_verified(user: User) -> None:
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Verifique seu email antes de gerar imagens",
        )


def _image_url(generation_id: str) -> str:
    return f"/api/v1/generations/{generation_id}/image"


def _to_public(generation: Generation) -> GenerationPublic:
    return GenerationPublic(
        id=generation.id,
        style=generation.style,
        image_url=_image_url(generation.id),
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


def _parse_attrs(raw: str) -> dict:
    try:
        data = json.loads(raw or "{}")
        return data if isinstance(data, dict) else {}
    except json.JSONDecodeError:
        return {}


@router.post("/generate/teaser", response_model=TeaserGenerateResponse)
def generate_teaser(
    payload: TeaserGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    _: None = rate_limit(
        "generate",
        settings.rate_limit_generate,
        settings.rate_limit_window_seconds,
    ),
) -> TeaserGenerateResponse:
    _require_verified(current_user)

    if current_user.credits < 1:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Créditos insuficientes. Você usou suas gerações Free.",
        )

    identity: IdentityPassport | None = None
    if payload.identity_id:
        identity = db.get(IdentityPassport, payload.identity_id)
        if identity is None or identity.user_id != current_user.id or not identity.is_active:
            raise HTTPException(status_code=404, detail="Identity Passport não encontrado")

    product_line = (
        (payload.product_line or (identity.product_line if identity else "future")).lower().strip()
    )
    if product_line not in {"future", "seduction"}:
        raise HTTPException(status_code=400, detail="product_line deve ser future ou seduction")

    seed = identity.seed if identity else secrets.token_hex(16)
    attributes = _parse_attrs(identity.attributes_json) if identity else {}
    if identity:
        attributes["apparent_age"] = identity.apparent_age

    if identity:
        verdict = evaluate_generation(
            db,
            user_id=current_user.id,
            identity=identity,
            prompt=f"{payload.style} {payload.variant}",
            reference_is_real_photo=payload.reference_is_real_photo,
            has_real_person_consent=payload.has_real_person_consent,
        )
        if not verdict.allowed:
            db.commit()
            raise HTTPException(status_code=422, detail=verdict.detail)
    elif payload.reference_is_real_photo and not payload.has_real_person_consent:
        raise HTTPException(
            status_code=422,
            detail="Rosto real sem consentimento — bloqueado (anti-deepfake).",
        )

    generation_id = secrets.token_urlsafe(12)
    base_dir = Path(settings.generations_dir) / current_user.id
    if identity:
        base_dir = base_dir / identity.id
    image_path = base_dir / f"{generation_id}.png"

    result = generate_image(
        settings,
        output_path=image_path,
        seed=seed,
        style=payload.style,
        variant=payload.variant,
        product_line=product_line,
        attributes=attributes,
        watermark=True,
    )
    if not image_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao gerar imagem",
        )

    current_user.credits -= 1
    generation = Generation(
        id=generation_id,
        user_id=current_user.id,
        identity_id=identity.id if identity else None,
        style=payload.style,
        variant=payload.variant,
        product_line=product_line,
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
    db.commit()
    db.refresh(current_user)
    db.refresh(generation)

    return TeaserGenerateResponse(
        generation=_to_public(generation),
        credits_remaining=current_user.credits,
    )


@router.get("/generations", response_model=list[GenerationPublic])
def list_generations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[GenerationPublic]:
    rows = db.scalars(
        select(Generation)
        .where(Generation.user_id == current_user.id)
        .order_by(Generation.created_at.desc())
    ).all()
    return [_to_public(row) for row in rows]


@router.get("/generations/{generation_id}/image")
def get_generation_image(
    generation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> FileResponse:
    generation = db.get(Generation, generation_id)
    if generation is None or generation.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Imagem não encontrada")

    path = Path(generation.image_path)
    if not path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Arquivo não encontrado")

    return FileResponse(path, media_type="image/png", filename=f"astra-{generation_id}.png")
