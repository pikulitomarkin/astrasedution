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
