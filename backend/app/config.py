from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
        populate_by_name=True,
    )

    database_url: str = Field(
        default="postgresql://postgres:postgres@db:5432/astraseduction",
        validation_alias="DATABASE_URL",
    )
    jwt_secret: str = Field(
        default="change-me-in-production",
        validation_alias="JWT_SECRET",
    )
    jwt_algorithm: str = Field(default="HS256", validation_alias="JWT_ALGORITHM")
    access_token_expire_minutes: int = Field(
        default=60 * 24,
        validation_alias="ACCESS_TOKEN_EXPIRE_MINUTES",
    )
    refresh_token_expire_days: int = Field(
        default=30,
        validation_alias="REFRESH_TOKEN_EXPIRE_DAYS",
    )
    free_plan_credits: int = Field(default=3, validation_alias="FREE_PLAN_CREDITS")
    cors_origins: str = Field(default="*", validation_alias="CORS_ORIGINS")
    app_name: str = Field(default="Astra Seduction API", validation_alias="APP_NAME")


@lru_cache
def get_settings() -> Settings:
    return Settings()
