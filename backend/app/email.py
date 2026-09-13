import json
import logging
import smtplib
import urllib.error
import urllib.request
from email.message import EmailMessage

from app.config import get_settings

logger = logging.getLogger(__name__)

RESEND_API_URL = "https://api.resend.com/emails"


def resend_configured() -> bool:
    return bool(get_settings().resend_api_key.strip())


def smtp_configured() -> bool:
    settings = get_settings()
    return bool(settings.smtp_host and settings.smtp_user and settings.smtp_password)


def email_provider_configured() -> bool:
    return resend_configured() or smtp_configured()


def _from_address() -> str:
    settings = get_settings()
    if settings.email_from.strip():
        return settings.email_from.strip()
    return settings.smtp_from.strip() or "noreply@astrasedution.com"


def _send_email(to_email: str, subject: str, text_body: str, html_body: str | None = None) -> bool:
    if resend_configured():
        return _send_via_resend(to_email, subject, text_body, html_body)
    if smtp_configured():
        return _send_via_smtp(to_email, subject, text_body)
    logger.warning(
        "Nenhum provedor de email configurado (RESEND_API_KEY / SMTP). Destino=%s assunto=%s",
        to_email,
        subject,
    )
    return False


def _send_via_resend(
    to_email: str,
    subject: str,
    text_body: str,
    html_body: str | None = None,
) -> bool:
    settings = get_settings()
    payload: dict = {
        "from": _from_address(),
        "to": [to_email],
        "subject": subject,
        "text": text_body,
    }
    if html_body:
        payload["html"] = html_body

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
        logger.info("Email enviado via Resend para %s (%s)", to_email, subject)
        return True
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="replace")
        logger.error("Falha Resend HTTP %s para %s: %s", exc.code, to_email, detail)
        return False
    except Exception:
        logger.exception("Falha ao enviar email via Resend para %s", to_email)
        return False


def _send_via_smtp(to_email: str, subject: str, text_body: str) -> bool:
    settings = get_settings()
    message = EmailMessage()
    message["Subject"] = subject
    message["From"] = _from_address()
    message["To"] = to_email
    message.set_content(text_body)

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=20) as server:
            if settings.smtp_tls:
                server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)
            server.send_message(message)
        logger.info("Email enviado via SMTP para %s (%s)", to_email, subject)
        return True
    except Exception:
        logger.exception("Falha ao enviar email via SMTP para %s", to_email)
        return False


def send_welcome_email(to_email: str, verify_url: str, name: str | None = None) -> bool:
    """Boas-vindas no cadastro + link de verificação."""
    settings = get_settings()
    display_name = name or "VIP"
    subject = "Bem-vindo(a) à Astra Seduction — confirme seu email"
    text_body = f"""Olá {display_name},

Bem-vindo(a) à Astra Seduction.

Sua conta foi criada com sucesso. Confirme seu email para liberar o criador e seus créditos:

{verify_url}

Este link expira em {settings.email_verification_expire_hours} horas.

Se você não criou esta conta, ignore este email.

— Equipe Astra Seduction
"""
    html_body = f"""<p>Olá <strong>{display_name}</strong>,</p>
<p>Bem-vindo(a) à <strong>Astra Seduction</strong>.</p>
<p>Sua conta foi criada com sucesso. Confirme seu email para liberar o criador e seus créditos:</p>
<p><a href="{verify_url}">Confirmar meu email</a></p>
<p>Ou copie e cole: {verify_url}</p>
<p>Este link expira em {settings.email_verification_expire_hours} horas.</p>
<p>— Equipe Astra Seduction</p>"""
    return _send_email(to_email, subject, text_body, html_body)


def send_verification_email(to_email: str, verify_url: str, name: str | None = None) -> bool:
    """Reenvio de verificação (mesmo conteúdo de boas-vindas resumido)."""
    return send_welcome_email(to_email, verify_url, name)


def send_recharge_email(
    to_email: str,
    *,
    credits_granted: int,
    credits_total: int,
    pack_name: str,
    amount_brl_cents: int,
    is_first_bonus: bool = False,
    name: str | None = None,
) -> bool:
    display_name = name or "VIP"
    amount = amount_brl_cents / 100
    bonus_line = (
        "Bônus de primeira recarga aplicado.\n"
        if is_first_bonus
        else ""
    )
    subject = "Recarga efetuada — créditos disponíveis"
    text_body = f"""Olá {display_name},

Sua recarga foi efetuada com sucesso.

Pacote: {pack_name}
Valor: R$ {amount:.2f}
Créditos creditados: +{credits_granted}
Saldo atual: {credits_total}
{bonus_line}
Acesse o painel: {get_settings().public_app_url.rstrip("/")}/dashboard

— Equipe Astra Seduction
"""
    html_body = f"""<p>Olá <strong>{display_name}</strong>,</p>
<p>Sua <strong>recarga foi efetuada</strong> com sucesso.</p>
<ul>
  <li>Pacote: {pack_name}</li>
  <li>Valor: R$ {amount:.2f}</li>
  <li>Créditos creditados: <strong>+{credits_granted}</strong></li>
  <li>Saldo atual: <strong>{credits_total}</strong></li>
</ul>
{"<p><strong>Bônus de primeira recarga aplicado.</strong></p>" if is_first_bonus else ""}
<p><a href="{get_settings().public_app_url.rstrip("/")}/dashboard">Abrir painel</a></p>
<p>— Equipe Astra Seduction</p>"""
    return _send_email(to_email, subject, text_body, html_body)


def send_password_reset_email(to_email: str, reset_url: str, name: str | None = None) -> bool:
    display_name = name or "VIP"
    hours = get_settings().password_reset_expire_hours
    subject = "Redefinição de senha — Astra Seduction"
    text_body = f"""Olá {display_name},

Recebemos um pedido para redefinir sua senha.

Use o link abaixo (válido por {hours} hora(s)):

{reset_url}

Se você não solicitou esta alteração, ignore este email. Sua senha permanecerá a mesma.

— Equipe Astra Seduction
"""
    html_body = f"""<p>Olá <strong>{display_name}</strong>,</p>
<p>Recebemos um pedido para redefinir sua senha.</p>
<p><a href="{reset_url}">Redefinir senha</a></p>
<p>Ou copie e cole: {reset_url}</p>
<p>Este link é válido por {hours} hora(s).</p>
<p>Se você não solicitou esta alteração, ignore este email.</p>
<p>— Equipe Astra Seduction</p>"""
    return _send_email(to_email, subject, text_body, html_body)


def send_password_changed_email(to_email: str, name: str | None = None) -> bool:
    display_name = name or "VIP"
    subject = "Senha alterada — Astra Seduction"
    text_body = f"""Olá {display_name},

Sua senha foi alterada com sucesso.

Se não foi você, redefina a senha imediatamente e entre em contato com o suporte.

Painel: {get_settings().public_app_url.rstrip("/")}/login

— Equipe Astra Seduction
"""
    html_body = f"""<p>Olá <strong>{display_name}</strong>,</p>
<p>Sua <strong>senha foi alterada</strong> com sucesso.</p>
<p>Se não foi você, redefina a senha imediatamente e entre em contato com o suporte.</p>
<p><a href="{get_settings().public_app_url.rstrip("/")}/login">Acessar login</a></p>
<p>— Equipe Astra Seduction</p>"""
    return _send_email(to_email, subject, text_body, html_body)
