import secrets
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models import Generation, User
from app.schemas import GenerationPublic, TeaserGenerateRequest, TeaserGenerateResponse
from app.teaser_image import create_teaser_image

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
    )


@router.post("/generate/teaser", response_model=TeaserGenerateResponse)
def generate_teaser(
    payload: TeaserGenerateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> TeaserGenerateResponse:
    _require_verified(current_user)

    if current_user.credits < 1:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Créditos insuficientes. Você usou suas 3 gerações Free.",
        )

    generation_id = secrets.token_urlsafe(12)
    base_dir = Path(settings.generations_dir) / current_user.id
    image_path = base_dir / f"{generation_id}.png"

    try:
        create_teaser_image(image_path, payload.style, generation_id)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao gerar imagem teaser",
        ) from exc

    current_user.credits -= 1
    generation = Generation(
        id=generation_id,
        user_id=current_user.id,
        style=payload.style,
        image_path=str(image_path),
        watermarked=True,
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
