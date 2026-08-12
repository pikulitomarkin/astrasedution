import csv
import io

from fastapi import APIRouter, Depends, Header, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.config import get_settings
from app.database import get_db
from app.models import WaitlistEntry
from app.schemas import WaitlistEntryPublic

router = APIRouter(prefix="/admin", tags=["admin"])
settings = get_settings()


def require_admin(x_admin_key: str | None = Header(default=None, alias="X-Admin-Key")) -> None:
    if not settings.admin_api_key:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="ADMIN_API_KEY não configurada no servidor",
        )
    if x_admin_key != settings.admin_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Chave de admin inválida",
        )


@router.get("/waitlist", response_model=list[WaitlistEntryPublic])
def list_waitlist(
    _: None = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[WaitlistEntryPublic]:
    rows = db.scalars(select(WaitlistEntry).order_by(WaitlistEntry.created_at.desc())).all()
    return [WaitlistEntryPublic.model_validate(row) for row in rows]


@router.get("/waitlist/export")
def export_waitlist_csv(
    _: None = Depends(require_admin),
    db: Session = Depends(get_db),
) -> StreamingResponse:
    rows = db.scalars(select(WaitlistEntry).order_by(WaitlistEntry.created_at.desc())).all()

    buffer = io.StringIO()
    writer = csv.writer(buffer)
    writer.writerow(["id", "email", "name", "source", "created_at"])
    for row in rows:
        writer.writerow([row.id, row.email, row.name or "", row.source, row.created_at.isoformat()])

    buffer.seek(0)
    return StreamingResponse(
        iter([buffer.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": 'attachment; filename="waitlist.csv"'},
    )
