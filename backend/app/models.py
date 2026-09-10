from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    password_hash: Mapped[str] = mapped_column(Text, nullable=False)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    plan: Mapped[str] = mapped_column(String(32), default="free", nullable=False)
    credits: Mapped[int] = mapped_column(Integer, default=3, nullable=False)
    first_recharge_claimed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class EmailVerificationToken(Base):
    __tablename__ = "email_verification_tokens"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    token: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class PasswordResetToken(Base):
    __tablename__ = "password_reset_tokens"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    token: Mapped[str] = mapped_column(String(128), unique=True, index=True, nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    used_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class WaitlistEntry(Base):
    __tablename__ = "waitlist_entries"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True, nullable=False)
    name: Mapped[str | None] = mapped_column(String(200), nullable=True)
    source: Mapped[str] = mapped_column(String(64), default="landing", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class IdentityPassport(Base):
    """Identity Passport — núcleo da Fase 2 (consistência persistente)."""

    __tablename__ = "identity_passports"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    product_line: Mapped[str] = mapped_column(String(32), default="future", nullable=False)
    # permanente | preferencial | variavel | experimental
    tier: Mapped[str] = mapped_column(String(32), default="preferencial", nullable=False)
    seed: Mapped[str] = mapped_column(String(128), index=True, nullable=False)
    attributes_json: Mapped[str] = mapped_column(Text, default="{}", nullable=False)
    consent_synthetic_only: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    consent_no_real_person: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    apparent_age: Mapped[int] = mapped_column(Integer, default=25, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )


class Generation(Base):
    __tablename__ = "generations"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    identity_id: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    batch_id: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    style: Mapped[str] = mapped_column(String(64), default="solo_lifestyle", nullable=False)
    variant: Mapped[str | None] = mapped_column(String(64), nullable=True)
    product_line: Mapped[str] = mapped_column(String(32), default="future", nullable=False)
    image_path: Mapped[str] = mapped_column(Text, nullable=False)
    watermarked: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    provider: Mapped[str | None] = mapped_column(String(64), nullable=True)
    model_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    prompt_hash: Mapped[str | None] = mapped_column(String(64), nullable=True)
    status: Mapped[str] = mapped_column(String(32), default="completed", nullable=False)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    cost_usd_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    latency_ms: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class ModerationEvent(Base):
    __tablename__ = "moderation_events"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    identity_id: Mapped[str | None] = mapped_column(String(64), index=True, nullable=True)
    action: Mapped[str] = mapped_column(String(64), nullable=False)  # allow | block
    reason_code: Mapped[str] = mapped_column(String(64), nullable=False)
    detail: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class ConsistencyBatch(Base):
    __tablename__ = "consistency_batches"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    identity_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    product_line: Mapped[str] = mapped_column(String(32), default="future", nullable=False)
    variant_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    success_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    fail_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    total_cost_usd_cents: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    total_latency_ms: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    notes_json: Mapped[str] = mapped_column(Text, default="{}", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class CreditRecharge(Base):
    __tablename__ = "credit_recharges"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    user_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    pack_id: Mapped[str] = mapped_column(String(64), nullable=False)
    credits_granted: Mapped[int] = mapped_column(Integer, nullable=False)
    amount_brl: Mapped[int] = mapped_column(Integer, nullable=False)  # centavos
    status: Mapped[str] = mapped_column(String(32), default="completed", nullable=False)
    is_first_bonus: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    provider: Mapped[str] = mapped_column(String(64), default="manual", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
