import json
import logging
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

RESEND_API_URL = "https://api.resend.com/emails"


def resend_configured() -> bool:
    return bool(settings.resend_api_key.strip())


def smtp_configured() -> bool:
    return bool(settings.smtp_host and settings.smtp_user and settings.smtp_password)


def email_provider_configured() -> bool:
    return resend_configured() or smtp_configured()


def _from_address() -> str:
    if settings.email_from.strip():
        return settings.email_from.strip()
    return settings.smtp_from.strip() or "noreply@astrasedution.com"


def _send_via_resend(to_email: str, subject: str, body: str) -> bool:
    payload = {
        "from": _from_address(),
        "to": [to_email],
        "subject": subject,
        "text": body,
    }
    request = urllib.request.Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {settings.resend_api_key.strip()}",
            "Content-Type": "application/json",
            "User-Agent": "astrasedution-api/1.0",
        },
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            raw = response.read().decode("utf-8", errors="replace")
            if response.status >= 400:
                logger.error("Resend respondeu %s: %s", response.status, raw)
                return False
        logger.info("Email de verificação enviado via Resend para %s", to_email)
        return True
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        logger.error("Falha Resend HTTP %s para %s: %s", exc.code, to_email, detail)
        return False
    except Exception:
        logger.exception("Falha ao enviar email via Resend para %s", to_email)
        return False


def _send_via_smtp(to_email: str, subject: str, body: str) -> bool:
    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = _from_address()
    message["To"] = to_email
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as server:
            if settings.smtp_tls:
                server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(message)
        logger.info("Email de verificação enviado via SMTP para %s", to_email)
        return True
    except Exception:
        logger.exception("Falha ao enviar email via SMTP para %s", to_email)
        return False


def send_verification_email(to_email: str, verify_url: str, name: str | None = None) -> bool:
    display_name = name or "VIP"
    subject = "Confirme seu email — Astra Seduction"
    body = f"""Olá {display_name},

Bem-vindo(a) à Astra Seduction. Confirme seu email para liberar o acesso ao criador:

{verify_url}

Este link expira em {settings.email_verification_expire_hours} horas.

Se você não criou esta conta, ignore este email.

— Equipe Astra Seduction
"""

    if resend_configured():
        return _send_via_resend(to_email, subject, body)

    if smtp_configured():
        return _send_via_smtp(to_email, subject, body)

    logger.warning(
        "Nenhum provedor de email configurado (RESEND_API_KEY / SMTP). Link de verificação para %s: %s",
        to_email,
        verify_url,
    )
    return False
