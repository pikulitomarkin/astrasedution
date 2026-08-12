import secrets

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth import (
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
    hash_password,
    verify_password,
)
from app.config import get_settings
from app.database import get_db
from app.models import User
from app.schemas import (
    AuthResponse,
    LoginRequest,
    MessageResponse,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    UserPublic,
)
from app.verification import issue_verification, verify_email_token

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()


def _tokens_for(user: User) -> TokenResponse:
    return TokenResponse(
        access_token=create_access_token(user.id),
        refresh_token=create_refresh_token(user.id),
    )


@router.post("/register", response_model=AuthResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)) -> AuthResponse:
    email = payload.email.lower().strip()
    existing = db.scalar(select(User).where(User.email == email))
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email já cadastrado",
        )

    user = User(
        id=secrets.token_urlsafe(16),
        email=email,
        name=(payload.name or "").strip() or None,
        password_hash=hash_password(payload.password),
        email_verified=False,
        plan="free",
        credits=settings.free_plan_credits,
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    verify_url = issue_verification(db, user)
    expose_url = verify_url if settings.email_dev_expose_link else None

    return AuthResponse(
        user=UserPublic.model_validate(user),
        tokens=_tokens_for(user),
        verification_url=expose_url,
    )


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> AuthResponse:
    email = payload.email.lower().strip()
    user = db.scalar(select(User).where(User.email == email))
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha inválidos",
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Conta desativada",
        )

    return AuthResponse(user=UserPublic.model_validate(user), tokens=_tokens_for(user))


@router.get("/me", response_model=UserPublic)
def me(current_user: User = Depends(get_current_user)) -> UserPublic:
    return UserPublic.model_validate(current_user)


@router.get("/verify-email", response_model=MessageResponse)
def verify_email(
    token: str = Query(..., min_length=10),
    db: Session = Depends(get_db),
) -> MessageResponse:
    try:
        verify_email_token(db, token)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    return MessageResponse(message="Email verificado com sucesso")


@router.post("/resend-verification", response_model=MessageResponse)
def resend_verification(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> MessageResponse:
    if current_user.email_verified:
        return MessageResponse(message="Email já verificado")

    issue_verification(db, current_user)
    return MessageResponse(
        message="Email de verificação reenviado. Verifique sua caixa de entrada."
    )


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user_id = decode_token(payload.refresh_token, "refresh")
    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh inválido",
        )
    return _tokens_for(user)


@router.post("/logout", response_model=MessageResponse)
def logout(current_user: User = Depends(get_current_user)) -> MessageResponse:
    _ = current_user
    return MessageResponse(message="Logout efetuado")
