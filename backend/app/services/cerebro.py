"""Cérebro Astra — orquestração de provedores (Fase 2)."""

from __future__ import annotations

import hashlib
import json
import logging
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import httpx

from app.config import Settings
from app.services.providers.identity_canvas import render_identity_canvas

logger = logging.getLogger("uvicorn.error")

CONSISTENCY_VARIANTS: list[dict[str, str]] = [
    {"variant": "front_neutral", "style": "portrait_front", "focus": "face"},
    {"variant": "three_quarter", "style": "portrait_angle", "focus": "face"},
    {"variant": "profile_left", "style": "portrait_profile", "focus": "face"},
    {"variant": "smile_soft", "style": "portrait_expression", "focus": "face"},
    {"variant": "light_soft", "style": "studio_softbox", "focus": "skin"},
    {"variant": "light_hard", "style": "studio_hard", "focus": "skin"},
    {"variant": "hands_rest", "style": "detail_hands", "focus": "hands"},
    {"variant": "nails_closeup", "style": "detail_nails", "focus": "nails"},
    {"variant": "feet_closeup", "style": "detail_feet", "focus": "feet"},
    {"variant": "full_body", "style": "full_body", "focus": "body"},
    {"variant": "hair_wind", "style": "hair_motion", "focus": "hair"},
    {"variant": "outfit_change", "style": "wardrobe_swap", "focus": "outfit"},
]


@dataclass
class GenerationResult:
    provider: str
    model_id: str
    prompt: str
    prompt_hash: str
    cost_usd_cents: int
    latency_ms: int
    status: str
    error_message: str | None = None


def build_prompt(
    *,
    product_line: str,
    style: str,
    variant: str,
    attributes: dict[str, Any],
    seed: str,
) -> str:
    age = attributes.get("apparent_age") or attributes.get("age") or 25
    ethnicity = attributes.get("ethnicity") or attributes.get("skin_tone") or "mixed"
    hair = attributes.get("hair") or attributes.get("hair_style") or "natural"
    extras = attributes.get("notes") or ""
    base = (
        f"photorealistic {product_line} digital twin, consistent identity seed {seed[:12]}, "
        f"apparent age {age}, {ethnicity} skin, {hair} hair, style={style}, variant={variant}"
    )
    if product_line == "future":
        base += ", professional corporate avatar, HeyGen-quality talking-head ready, clean background"
    else:
        base += ", adult synthetic character, high detail hands nails feet, non-juvenile"
    if extras:
        base += f", {extras}"
    return base


def _prompt_hash(prompt: str) -> str:
    return hashlib.sha256(prompt.encode("utf-8")).hexdigest()[:32]


def _run_identity_canvas(
    settings: Settings,
    *,
    output_path: Path,
    seed: str,
    style: str,
    variant: str,
    product_line: str,
    attributes: dict[str, Any],
    watermark: bool,
    prompt: str,
) -> GenerationResult:
    started = time.perf_counter()
    render_identity_canvas(
        output_path,
        seed=seed,
        style=style,
        variant=variant,
        product_line=product_line,
        attributes=attributes,
        watermark=watermark,
    )
    latency = int((time.perf_counter() - started) * 1000)
    return GenerationResult(
        provider="identity_canvas",
        model_id="astra-identity-canvas-v1",
        prompt=prompt,
        prompt_hash=_prompt_hash(prompt),
        cost_usd_cents=0,
        latency_ms=latency,
        status="completed",
    )


def _run_fal(
    settings: Settings,
    *,
    output_path: Path,
    prompt: str,
) -> GenerationResult:
    if not settings.fal_api_key.strip():
        raise RuntimeError("FAL_KEY não configurada")

    started = time.perf_counter()
    headers = {
        "Authorization": f"Key {settings.fal_api_key.strip()}",
        "Content-Type": "application/json",
    }
    model = settings.fal_model_id
    url = f"https://fal.run/{model}"
    with httpx.Client(timeout=settings.astra_image_timeout_seconds) as client:
        response = client.post(
            url,
            headers=headers,
            json={"prompt": prompt, "image_size": "portrait_4_3"},
        )
        response.raise_for_status()
        payload = response.json()
        image_url = None
        if isinstance(payload.get("images"), list) and payload["images"]:
            image_url = payload["images"][0].get("url")
        image_url = image_url or (payload.get("image") or {}).get("url")
        if not image_url:
            raise RuntimeError(f"Resposta FAL sem URL de imagem: {json.dumps(payload)[:400]}")
        img = client.get(image_url)
        img.raise_for_status()
        output_path.parent.mkdir(parents=True, exist_ok=True)
        output_path.write_bytes(img.content)

    latency = int((time.perf_counter() - started) * 1000)
    return GenerationResult(
        provider="fal",
        model_id=model,
        prompt=prompt,
        prompt_hash=_prompt_hash(prompt),
        cost_usd_cents=settings.astra_default_cost_usd_cents,
        latency_ms=latency,
        status="completed",
    )


def generate_image(
    settings: Settings,
    *,
    output_path: Path,
    seed: str,
    style: str,
    variant: str,
    product_line: str,
    attributes: dict[str, Any] | None = None,
    watermark: bool = True,
) -> GenerationResult:
    attributes = attributes or {}
    prompt = build_prompt(
        product_line=product_line,
        style=style,
        variant=variant,
        attributes=attributes,
        seed=seed,
    )
    provider = (settings.astra_image_provider or "identity_canvas").strip().lower()

    try:
        if provider == "fal":
            return _run_fal(settings, output_path=output_path, prompt=prompt)
        if provider == "replicate":
            raise RuntimeError(
                "Provedor replicate ainda não ativado neste ambiente — use fal ou identity_canvas"
            )
        return _run_identity_canvas(
            settings,
            output_path=output_path,
            seed=seed,
            style=style,
            variant=variant,
            product_line=product_line,
            attributes=attributes,
            watermark=watermark,
            prompt=prompt,
        )
    except Exception as exc:
        logger.exception("Cérebro Astra falhou (%s); fallback identity_canvas", provider)
        result = _run_identity_canvas(
            settings,
            output_path=output_path,
            seed=seed,
            style=style,
            variant=variant,
            product_line=product_line,
            attributes=attributes,
            watermark=watermark,
            prompt=prompt,
        )
        result.error_message = f"fallback_after:{provider}:{exc}"
        return result
