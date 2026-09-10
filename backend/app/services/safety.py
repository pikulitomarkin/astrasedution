"""Anti-deepfake e gates de segurança — requisito de engenharia desde a Fase 2."""

from __future__ import annotations

import re
import secrets
from dataclasses import dataclass

from sqlalchemy.orm import Session

from app.models import IdentityPassport, ModerationEvent

MIN_APPARENT_AGE = 18

_JUVENILE_PATTERNS = [
    r"\bchild\b",
    r"\bkid\b",
    r"\bkids\b",
    r"\bminor\b",
    r"\bunderage\b",
    r"\bloli\b",
    r"\bshota\b",
    r"\bpreteen\b",
    r"\bteen\s*girl\b",
    r"\bteen\s*boy\b",
    r"\bescolar\b",
    r"\bcrian[cç]a\b",
    r"\bmenor\b",
    r"\binfantil\b",
    r"\bbeb[eê]\b",
    r"\bschool\s*girl\b",
]

_REAL_PERSON_PATTERNS = [
    r"\bcelebrity\b",
    r"\bfamos[oa]\b",
    r"\breal\s+person\b",
    r"\bpessoa\s+real\b",
    r"\bdeepfake\b",
    r"\bface\s*swap\b",
]


@dataclass
class SafetyVerdict:
    allowed: bool
    reason_code: str
    detail: str


def _log(
    db: Session,
    *,
    action: str,
    reason_code: str,
    detail: str,
    user_id: str | None = None,
    identity_id: str | None = None,
) -> None:
    db.add(
        ModerationEvent(
            id=secrets.token_urlsafe(12),
            user_id=user_id,
            identity_id=identity_id,
            action=action,
            reason_code=reason_code,
            detail=detail[:2000] if detail else None,
        )
    )


def evaluate_identity_create(
    db: Session,
    *,
    user_id: str,
    apparent_age: int,
    consent_synthetic_only: bool,
    consent_no_real_person: bool,
    attributes_text: str = "",
) -> SafetyVerdict:
    if apparent_age < MIN_APPARENT_AGE:
        verdict = SafetyVerdict(
            False,
            "juvenile_appearance",
            f"Idade aparente {apparent_age} abaixo do mínimo {MIN_APPARENT_AGE}.",
        )
        _log(db, action="block", reason_code=verdict.reason_code, detail=verdict.detail, user_id=user_id)
        return verdict

    if not consent_synthetic_only or not consent_no_real_person:
        verdict = SafetyVerdict(
            False,
            "missing_consent",
            "Consentimento obrigatório: identidade 100% sintética e sem pessoa real.",
        )
        _log(db, action="block", reason_code=verdict.reason_code, detail=verdict.detail, user_id=user_id)
        return verdict

    blob = attributes_text.lower()
    for pattern in _JUVENILE_PATTERNS:
        if re.search(pattern, blob, flags=re.IGNORECASE):
            verdict = SafetyVerdict(
                False,
                "juvenile_content",
                f"Texto bloqueado por aparência/conteúdo juvenil ({pattern}).",
            )
            _log(db, action="block", reason_code=verdict.reason_code, detail=verdict.detail, user_id=user_id)
            return verdict

    for pattern in _REAL_PERSON_PATTERNS:
        if re.search(pattern, blob, flags=re.IGNORECASE):
            verdict = SafetyVerdict(
                False,
                "real_person_risk",
                f"Texto sugere pessoa real / deepfake ({pattern}).",
            )
            _log(db, action="block", reason_code=verdict.reason_code, detail=verdict.detail, user_id=user_id)
            return verdict

    _log(
        db,
        action="allow",
        reason_code="identity_ok",
        detail="Identity Passport aprovado pelos gates Fase 2.",
        user_id=user_id,
    )
    return SafetyVerdict(True, "identity_ok", "ok")


def evaluate_generation(
    db: Session,
    *,
    user_id: str,
    identity: IdentityPassport,
    prompt: str,
    reference_is_real_photo: bool = False,
    has_real_person_consent: bool = False,
) -> SafetyVerdict:
    if identity.apparent_age < MIN_APPARENT_AGE:
        verdict = SafetyVerdict(False, "juvenile_appearance", "Passport com idade aparente inválida.")
        _log(
            db,
            action="block",
            reason_code=verdict.reason_code,
            detail=verdict.detail,
            user_id=user_id,
            identity_id=identity.id,
        )
        return verdict

    if reference_is_real_photo and not has_real_person_consent:
        verdict = SafetyVerdict(
            False,
            "real_face_without_consent",
            "Rosto real sem consentimento registrado — bloqueado (anti-deepfake).",
        )
        _log(
            db,
            action="block",
            reason_code=verdict.reason_code,
            detail=verdict.detail,
            user_id=user_id,
            identity_id=identity.id,
        )
        return verdict

    blob = f"{prompt} {identity.attributes_json}".lower()
    for pattern in _JUVENILE_PATTERNS:
        if re.search(pattern, blob, flags=re.IGNORECASE):
            verdict = SafetyVerdict(False, "juvenile_content", "Prompt/atributos com sinal juvenil.")
            _log(
                db,
                action="block",
                reason_code=verdict.reason_code,
                detail=verdict.detail,
                user_id=user_id,
                identity_id=identity.id,
            )
            return verdict

    _log(
        db,
        action="allow",
        reason_code="generation_ok",
        detail="Geração liberada pelos gates Fase 2.",
        user_id=user_id,
        identity_id=identity.id,
    )
    return SafetyVerdict(True, "generation_ok", "ok")
