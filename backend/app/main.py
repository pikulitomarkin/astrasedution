from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from app.config import get_settings
from app.database import Base, engine
from app.routers import admin, auth, credits, generate, health, waitlist

logger = logging.getLogger("uvicorn.error")
settings = get_settings()

app = FastAPI(title=settings.app_name, version="0.1.0")

origins = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if origins != ["*"] else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/api/v1")
app.include_router(auth.router, prefix="/api/v1")
app.include_router(credits.router, prefix="/api/v1")
app.include_router(generate.router, prefix="/api/v1")
app.include_router(waitlist.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)
    if settings.jwt_secret in ("change-me-in-production", "change-me"):
        logger.warning(
            "JWT_SECRET está com valor padrão — defina um segredo forte em produção."
        )
