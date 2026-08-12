import logging
import smtplib
from email.message import EmailMessage

from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


def smtp_configured() -> bool:
    return bool(settings.smtp_host and settings.smtp_user and settings.smtp_password)


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

    if not smtp_configured():
        logger.warning(
            "SMTP não configurado. Link de verificação para %s: %s",
            to_email,
            verify_url,
        )
        return False

    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = settings.smtp_from
    message["To"] = to_email
    message.set_content(body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as server:
            if settings.smtp_tls:
                server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(message)
        logger.info("Email de verificação enviado para %s", to_email)
        return True
    except Exception:
        logger.exception("Falha ao enviar email de verificação para %s", to_email)
        return False
