import secrets

from fastapi import APIRouter, Depends, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import WaitlistEntry
from app.schemas import WaitlistJoinRequest, WaitlistJoinResponse

router = APIRouter(prefix="/waitlist", tags=["waitlist"])


@router.post("", response_model=WaitlistJoinResponse, status_code=status.HTTP_201_CREATED)
def join_waitlist(
    payload: WaitlistJoinRequest,
    db: Session = Depends(get_db),
) -> WaitlistJoinResponse:
    email = payload.email.lower().strip()
    existing = db.scalar(select(WaitlistEntry).where(WaitlistEntry.email == email))

    if existing:
        return WaitlistJoinResponse(
            message="Você já está na lista VIP. Em breve entraremos em contato.",
            already_registered=True,
        )

    entry = WaitlistEntry(
        id=secrets.token_urlsafe(16),
        email=email,
        name=(payload.name or "").strip() or None,
        source=(payload.source or "landing").strip() or "landing",
    )
    db.add(entry)
    db.commit()

    return WaitlistJoinResponse(
        message="Email cadastrado na waitlist VIP com sucesso!",
        already_registered=False,
    )
