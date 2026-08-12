import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.auth import get_current_user
from app.config import get_settings
from app.database import get_db
from app.models import CreditRecharge, User
from app.schemas import (
    CreditsPublic,
    DebitCreditsRequest,
    DebitCreditsResponse,
    RechargePackPublic,
    RechargeRequest,
    RechargeResponse,
)

router = APIRouter(prefix="/credits", tags=["credits"])
settings = get_settings()


def _require_verified(user: User) -> None:
    if not user.email_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Verifique seu email antes de usar créditos",
        )


def _packs(user: User) -> list[RechargePackPublic]:
    packs: list[RechargePackPublic] = []
    if not user.first_recharge_claimed:
        packs.append(
            RechargePackPublic(
                id="welcome",
                name="Recarga de Boas-vindas",
                credits=settings.recharge_bonus_credits,
                price_brl_cents=settings.recharge_bonus_price_brl,
                description=(
                    f"Primeira recarga após o cadastro: "
                    f"{settings.recharge_bonus_credits} créditos para geração."
                ),
                first_recharge_only=True,
            )
        )
    packs.extend(
        [
            RechargePackPublic(
                id="standard",
                name="Pacote Standard",
                credits=500,
                price_brl_cents=4900,
                description="500 créditos mensais — plano Standard",
            ),
            RechargePackPublic(
                id="premium",
                name="Pacote Premium",
                credits=2000,
                price_brl_cents=14900,
                description="2.000 créditos — plano Premium",
            ),
        ]
    )
    return packs


def _pack_by_id(user: User, pack_id: str) -> RechargePackPublic:
    for pack in _packs(user):
        if pack.id == pack_id:
            return pack
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Pacote de recarga inválido ou indisponível",
    )


@router.get("", response_model=CreditsPublic)
def get_credits(current_user: User = Depends(get_current_user)) -> CreditsPublic:
    return CreditsPublic(
        plan=current_user.plan,
        credits=current_user.credits,
        max_free_credits=settings.free_plan_credits,
        email_verified=current_user.email_verified,
        first_recharge_available=not current_user.first_recharge_claimed,
        recharge_bonus_credits=settings.recharge_bonus_credits,
    )


@router.get("/packs", response_model=list[RechargePackPublic])
def list_recharge_packs(
    current_user: User = Depends(get_current_user),
) -> list[RechargePackPublic]:
    _require_verified(current_user)
    return _packs(current_user)


@router.post("/recharge", response_model=RechargeResponse)
def recharge_credits(
    payload: RechargeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RechargeResponse:
    """
    Recarga de créditos.
    Pacote 'welcome' (primeira recarga pós-cadastro) concede o bônus de 1000 créditos.
    PAYMENT_MODE=instant credita imediatamente (gateway real entra depois).
    """
    _require_verified(current_user)

    if payload.pack_id == "welcome" and current_user.first_recharge_claimed:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Bônus de primeira recarga já foi utilizado",
        )

    pack = _pack_by_id(current_user, payload.pack_id)

    if pack.first_recharge_only and current_user.first_recharge_claimed:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Bônus de primeira recarga já foi utilizado",
        )

    if settings.payment_mode not in ("instant", "demo", "manual"):
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Pagamento indisponível. Configure o gateway de pagamento.",
        )

    is_first_bonus = pack.id == "welcome"
    recharge = CreditRecharge(
        id=secrets.token_urlsafe(12),
        user_id=current_user.id,
        pack_id=pack.id,
        credits_granted=pack.credits,
        amount_brl=pack.price_brl_cents,
        status="completed",
        is_first_bonus=is_first_bonus,
        provider=settings.payment_mode,
    )

    current_user.credits += pack.credits
    if is_first_bonus:
        current_user.first_recharge_claimed = True
        if current_user.plan == "free":
            current_user.plan = "starter"

    db.add(recharge)
    db.commit()
    db.refresh(current_user)

    return RechargeResponse(
        recharge_id=recharge.id,
        credits=current_user.credits,
        credits_granted=pack.credits,
        is_first_bonus=is_first_bonus,
        status=recharge.status,
        message=(
            f"Recarga concluída: +{pack.credits} créditos."
            + (" Bônus de boas-vindas aplicado!" if is_first_bonus else "")
        ),
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
            detail="Créditos insuficientes. Faça uma recarga para continuar gerando.",
        )

    current_user.credits -= payload.amount
    db.commit()
    db.refresh(current_user)

    return DebitCreditsResponse(
        credits=current_user.credits,
        debited=payload.amount,
        message=f"{payload.amount} crédito(s) utilizado(s)",
    )
