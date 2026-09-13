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


class GenerationPublic(BaseModel):
    id: str
    style: str
    image_url: str
    watermarked: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TeaserGenerateResponse(BaseModel):
    generation: GenerationPublic
    credits_remaining: int
