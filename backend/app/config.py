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
    public_app_url: str = Field(
        default="http://localhost:3000",
        validation_alias="PUBLIC_APP_URL",
    )
    admin_api_key: str = Field(default="", validation_alias="ADMIN_API_KEY")
    email_verification_expire_hours: int = Field(
        default=24,
        validation_alias="EMAIL_VERIFICATION_EXPIRE_HOURS",
    )
    email_dev_expose_link: bool = Field(
        default=False,
        validation_alias="EMAIL_DEV_EXPOSE_LINK",
    )
    smtp_host: str = Field(default="", validation_alias="SMTP_HOST")
    smtp_port: int = Field(default=587, validation_alias="SMTP_PORT")
    smtp_user: str = Field(default="", validation_alias="SMTP_USER")
    smtp_password: str = Field(default="", validation_alias="SMTP_PASSWORD")
    smtp_from: str = Field(
        default="noreply@astraseduction.com",
        validation_alias="SMTP_FROM",
    )
    smtp_tls: bool = Field(default=True, validation_alias="SMTP_TLS")
    generations_dir: str = Field(
        default="/app/data/generations",
        validation_alias="GENERATIONS_DIR",
    )
    rate_limit_register: int = Field(default=5, validation_alias="RATE_LIMIT_REGISTER_PER_MINUTE")
    rate_limit_login: int = Field(default=10, validation_alias="RATE_LIMIT_LOGIN_PER_MINUTE")
    rate_limit_generate: int = Field(default=10, validation_alias="RATE_LIMIT_GENERATE_PER_MINUTE")
    rate_limit_window_seconds: int = Field(default=60, validation_alias="RATE_LIMIT_WINDOW_SECONDS")


@lru_cache
def get_settings() -> Settings:
    return Settings()
