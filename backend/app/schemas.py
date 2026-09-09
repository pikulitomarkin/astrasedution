from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    name: str | None = Field(default=None, max_length=200)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserPublic(BaseModel):
    id: str
    email: EmailStr
    name: str | None = None
    email_verified: bool
    plan: str
    credits: int
    created_at: datetime

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):
    user: UserPublic
    tokens: TokenResponse
    verification_url: str | None = None


class RefreshRequest(BaseModel):
    refresh_token: str = Field(min_length=10)


class MessageResponse(BaseModel):
    message: str


class ChangePasswordRequest(BaseModel):
    current_password: str = Field(min_length=6, max_length=128)
    new_password: str = Field(min_length=6, max_length=128)


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class ResetPasswordRequest(BaseModel):
    token: str = Field(min_length=10, max_length=256)
    new_password: str = Field(min_length=6, max_length=128)


class WaitlistJoinRequest(BaseModel):
    email: EmailStr
    name: str | None = Field(default=None, max_length=200)
    source: str | None = Field(default="landing", max_length=64)


class WaitlistJoinResponse(BaseModel):
    message: str
    already_registered: bool = False


class WaitlistEntryPublic(BaseModel):
    id: str
    email: EmailStr
    name: str | None = None
    source: str
    created_at: datetime

    model_config = {"from_attributes": True}


class CreditsPublic(BaseModel):
    plan: str
    credits: int
    max_free_credits: int
    email_verified: bool
    first_recharge_available: bool = False
    recharge_bonus_credits: int = 1000


class DebitCreditsRequest(BaseModel):
    amount: int = Field(default=1, ge=1, le=10)


class DebitCreditsResponse(BaseModel):
    credits: int
    debited: int
    message: str


class RechargePackPublic(BaseModel):
    id: str
    name: str
    credits: int
    price_brl_cents: int
    description: str
    first_recharge_only: bool = False


class RechargeRequest(BaseModel):
    pack_id: str = Field(default="welcome", max_length=64)


class RechargeResponse(BaseModel):
    recharge_id: str
    credits: int
    credits_granted: int
    is_first_bonus: bool
    status: str
    message: str


class TeaserGenerateRequest(BaseModel):
    style: str = Field(default="solo_lifestyle", max_length=64)
    identity_id: str | None = Field(default=None, max_length=64)
    variant: str = Field(default="front_neutral", max_length=64)
    product_line: str | None = Field(default=None, max_length=32)
    reference_is_real_photo: bool = False
    has_real_person_consent: bool = False


class GenerationPublic(BaseModel):
    id: str
    style: str
    image_url: str
    watermarked: bool
    created_at: datetime
    identity_id: str | None = None
    batch_id: str | None = None
    variant: str | None = None
    product_line: str | None = None
    provider: str | None = None
    model_id: str | None = None
    status: str | None = None
    cost_usd_cents: int | None = None
    latency_ms: int | None = None

    model_config = {"from_attributes": True}


class TeaserGenerateResponse(BaseModel):
    generation: GenerationPublic
    credits_remaining: int


class IdentityCreateRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    product_line: str = Field(default="future", max_length=32)
    tier: str = Field(default="preferencial", max_length=32)
    attributes: dict = Field(default_factory=dict)
    apparent_age: int = Field(default=25, ge=18, le=90)
    consent_synthetic_only: bool = True
    consent_no_real_person: bool = True


class IdentityUpdateRequest(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=120)
    tier: str | None = Field(default=None, max_length=32)
    attributes: dict | None = None
    apparent_age: int | None = Field(default=None, ge=18, le=90)


class IdentityPublic(BaseModel):
    id: str
    name: str
    product_line: str
    tier: str
    seed: str
    attributes: dict
    consent_synthetic_only: bool
    consent_no_real_person: bool
    apparent_age: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ConsistencyBatteryRequest(BaseModel):
    max_variants: int | None = Field(default=None, ge=1, le=12)


class ConsistencyBatteryResponse(BaseModel):
    batch_id: str
    identity_id: str
    product_line: str
    variant_count: int
    success_count: int
    fail_count: int
    failure_rate: float
    total_cost_usd_cents: int
    total_latency_ms: int
    credits_remaining: int
    generations: list[GenerationPublic]
