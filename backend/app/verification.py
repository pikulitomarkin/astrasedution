import secrets
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, update
from sqlalchemy.orm import Session

from app.config import get_settings
from app.email import send_verification_email
from app.models import EmailVerificationToken, User

settings = get_settings()


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def create_verification_token(db: Session, user: User) -> EmailVerificationToken:
    db.execute(
        update(EmailVerificationToken)
        .where(
            EmailVerificationToken.user_id == user.id,
            EmailVerificationToken.used_at.is_(None),
        )
        .values(used_at=_utcnow())
    )

    token = EmailVerificationToken(
        id=secrets.token_urlsafe(16),
        user_id=user.id,
        token=secrets.token_urlsafe(32),
        expires_at=_utcnow() + timedelta(hours=settings.email_verification_expire_hours),
    )
    db.add(token)
    db.commit()
    db.refresh(token)
    return token


def build_verify_url(token: str) -> str:
    base = settings.public_app_url.rstrip("/")
    return f"{base}/verificar?token={token}"


def issue_verification(db: Session, user: User) -> str:
    record = create_verification_token(db, user)
    verify_url = build_verify_url(record.token)
    send_verification_email(user.email, verify_url, user.name)
    return verify_url


def verify_email_token(db: Session, token: str) -> User:
    record = db.scalar(
        select(EmailVerificationToken).where(EmailVerificationToken.token == token)
    )
    if record is None:
        raise ValueError("Token inválido")
    if record.used_at is not None:
        raise ValueError("Token já utilizado")
    if record.expires_at < _utcnow():
        raise ValueError("Token expirado")

    user = db.get(User, record.user_id)
    if user is None:
        raise ValueError("Usuário não encontrado")

    record.used_at = _utcnow()
    user.email_verified = True
    db.commit()
    db.refresh(user)
    return user
