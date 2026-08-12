from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models import User
from app.schemas import CreditsPublic, DebitCreditsRequest, DebitCreditsResponse

router = APIRouter(prefix="/credits", tags=["credits"])
settings = get_settings()


def _require_verified(user: User) -> None:
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Verifique seu email antes de usar créditos",
        )


@router.get("", response_model=CreditsPublic)
def get_credits(current_user: User = Depends(get_current_user)) -> CreditsPublic:
    return CreditsPublic(
        plan=current_user.plan,
        credits=current_user.credits,
        max_free_credits=settings.free_plan_credits,
        email_verified=current_user.email_verified,
    )


@router.post("/debit", response_model=DebitCreditsResponse)
def debit_credits(
    payload: DebitCreditsRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> DebitCreditsResponse:
    _require_verified(current_user)

    if current_user.credits < payload.amount:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail="Créditos insuficientes. Faça upgrade do plano ou aguarde renovação.",
        )

    current_user.credits -= payload.amount
    db.commit()
    db.refresh(current_user)

    return DebitCreditsResponse(
        credits=current_user.credits,
        debited=payload.amount,
        message=f"{payload.amount} crédito(s) utilizado(s)",
    )
