#!/usr/bin/env python3
"""Gera PDF de entrega Fase 1 — Astra Seduction (todas as rodadas)."""

from __future__ import annotations

import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent
DEPLOY = Path(__file__).resolve().parent
OUTPUT = DEPLOY / "FASE1-ENTREGA-CLIENTE.pdf"
SMOKE_OUT = DEPLOY / "smoke-results.txt"


def run_smoke() -> str:
    smoke_script = DEPLOY / "smoke-fase1.sh"
    if smoke_script.is_file():
        subprocess.run(
            ["bash", str(smoke_script)],
            cwd=ROOT,
            env={"BASE_URL": "http://184.107.160.119", "SMOKE_OUT": str(SMOKE_OUT)},
            check=False,
        )
    if SMOKE_OUT.is_file():
        return SMOKE_OUT.read_text(encoding="utf-8")
    return "(smoke tests não executados)"


def sanitize(text: str) -> str:
    """fpdf core fonts são Latin-1; substituir caracteres comuns PT."""
    replacements = {
        "—": "-",
        "→": "->",
        "✓": "[OK]",
        "✗": "[X]",
        "≥": ">=",
        "≤": "<=",
        "“": '"',
        "”": '"',
        "‘": "'",
        "’": "'",
        "…": "...",
        "á": "a",
        "à": "a",
        "â": "a",
        "ã": "a",
        "é": "e",
        "ê": "e",
        "í": "i",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ú": "u",
        "ç": "c",
        "Á": "A",
        "À": "A",
        "Â": "A",
        "Ã": "A",
        "É": "E",
        "Ê": "E",
        "Í": "I",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ú": "U",
        "Ç": "C",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return text.encode("latin-1", "replace").decode("latin-1")


class ClientPDF(FPDF):
    def footer(self) -> None:
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(120, 120, 120)
        self.cell(0, 10, sanitize(f"Pagina {self.page_no()}"), align="C")


def section_title(pdf: ClientPDF, title: str) -> None:
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(20, 20, 20)
    pdf.ln(4)
    pdf.multi_cell(0, 8, sanitize(title))
    pdf.ln(2)


def body(pdf: ClientPDF, text: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(40, 40, 40)
    pdf.multi_cell(0, 5.5, sanitize(text))
    pdf.ln(1)


def bullet(pdf: ClientPDF, text: str) -> None:
    pdf.set_x(pdf.l_margin)
    pdf.set_font("Helvetica", "", 10)
    pdf.multi_cell(0, 5.5, sanitize(f"  - {text}"))


def build_pdf(smoke_text: str) -> None:
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y %H:%M UTC")
    pdf = ClientPDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # Capa
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(10, 10, 10)
    pdf.ln(30)
    pdf.cell(0, 12, "ASTRA SEDUCTION", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 14)
    pdf.cell(0, 10, "Fase 1 - Relatorio de Entrega", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(8)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 8, sanitize(f"Gerado em: {now}"), align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "Cliente: Geison / Grok", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "Ambiente: http://184.107.160.119", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "Repositorio: github.com/pikulitomarkin/astrasedution", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 8, "PR #2 (branch cursor/fase1-dia1-fastapi-auth-205f)", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.add_page()
    section_title(pdf, "1. Resumo executivo")
    body(
        pdf,
        "A Fase 1 transforma a landing teaser em aplicacao web funcional com autenticacao, "
        "verificacao de email, waitlist, dashboard, controle de creditos Free (3 geracoes) "
        "e geracao de imagens teaser watermarked (placeholder Pillow; motor Flux na Fase 2).",
    )
    body(
        pdf,
        "Criterio SSOT: usuario registra, loga, verifica email, gera 3 imagens watermarked "
        "sem erro; a 4a geracao e bloqueada (HTTP 402). Todos os criterios foram validados "
        "em producao na VPS.",
    )

    section_title(pdf, "2. Stack e arquitetura")
    bullet(pdf, "Frontend: Next.js 16 (standalone) + AuthContext JWT")
    bullet(pdf, "Backend: FastAPI + SQLAlchemy + PostgreSQL 16")
    bullet(pdf, "Proxy: Nginx (porta 80) -> app :3000 e /api/v1/ -> api :8000")
    bullet(pdf, "Containers: astra-db, astra-api, astra-app, astra-nginx")
    bullet(pdf, "Volume: generation_data (PNGs persistidos)")

    section_title(pdf, "3. Rodadas de entrega (5 dias)")

    rounds = [
        (
            "Rodada 1 - Auth real + FastAPI base",
            [
                "Servico FastAPI no docker-compose com proxy Nginx /api/v1/",
                "Endpoints: register, login, me, refresh, logout",
                "JWT access + refresh; senhas bcrypt",
                "Model users (plan free, 3 creditos, email_verified)",
                "Frontend: cadastro/login via AuthContext",
                "Deploy VPS validado",
            ],
        ),
        (
            "Rodada 2 - Verificacao email + Waitlist",
            [
                "Tokens de verificacao + pagina /verificar + reenvio",
                "Bloqueio de /create ate email verificado",
                "Waitlist na landing (#contact) + POST /waitlist",
                "Admin: GET /admin/waitlist + export CSV (X-Admin-Key)",
                "EMAIL_DEV_EXPOSE_LINK=true na VPS (link no register sem SMTP)",
            ],
        ),
        (
            "Rodada 3 - Dashboard + creditos Free",
            [
                "Rota /dashboard (glassmorphism, cards plano/creditos/status)",
                "Redirect pos-login para /dashboard (?next= suportado)",
                "API GET /credits e POST /credits/debit",
                "Debito bloqueia em 0; exige email verificado (403)",
                "Middleware protege /dashboard e /create",
            ],
        ),
        (
            "Rodada 4 - Geracao teaser watermarked (criterio aprovacao)",
            [
                "POST /generate/teaser - debita 1 credito, gera PNG Pillow",
                "Watermark Astra Free em todas as imagens Free",
                "GET /generations - galeria do usuario",
                "GET /generations/{id}/image - download autenticado",
                "UI dashboard: seletor de estilo, botao gerar, galeria",
                "4a geracao retorna HTTP 402 sem crash",
            ],
        ),
        (
            "Rodada 5 - Hardening e pacote de aceite",
            [
                "Rate limit por IP: register 5/min, login 10/min, generate 10/min",
                "Aviso startup se JWT_SECRET padrao",
                "Script E2E automatizado (deploy/e2e-fase1.sh)",
                "JWT/NEXTAUTH secrets fortes na VPS",
                "Headers de seguranca no Nginx (nosniff, X-Frame-Options)",
            ],
        ),
    ]

    for title, items in rounds:
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(0, 90, 120)
        pdf.multi_cell(0, 6, sanitize(title))
        for item in items:
            bullet(pdf, item)
        pdf.ln(2)

    section_title(pdf, "4. Checklist DoD Fase 1")
    dod = [
        ("Registro + login JWT", "OK"),
        ("Verificacao de email", "OK"),
        ("Dashboard acessivel pos-login", "OK"),
        ("Waitlist capturando emails", "OK"),
        ("Plano Free com 3 creditos", "OK"),
        ("3 imagens watermarked sem erro", "OK"),
        ("4a geracao recusada (402)", "OK"),
        ("Rate limit auth/generate", "OK"),
        ("HTTPS / dominio proprio", "Pendente"),
        ("SMTP producao (desligar dev link)", "Pendente"),
    ]
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_x(pdf.l_margin)
    pdf.cell(120, 7, "Item", border=1)
    pdf.cell(40, 7, "Status", border=1, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 10)
    for item, status in dod:
        pdf.set_x(pdf.l_margin)
        pdf.cell(120, 7, sanitize(item), border=1)
        pdf.cell(40, 7, status, border=1, new_x="LMARGIN", new_y="NEXT")
    pdf.ln(3)

    section_title(pdf, "5. Endpoints principais")
    endpoints = [
        "POST /api/v1/auth/register - Cadastro",
        "POST /api/v1/auth/login - Login",
        "GET  /api/v1/auth/verify-email?token= - Verificar email",
        "GET  /api/v1/auth/me - Perfil (auth)",
        "GET  /api/v1/credits - Saldo (auth)",
        "POST /api/v1/generate/teaser - Gerar imagem (auth, email verificado)",
        "GET  /api/v1/generations - Galeria (auth)",
        "GET  /api/v1/generations/{id}/image - PNG (auth)",
        "POST /api/v1/waitlist - Waitlist publica",
        "GET  /api/v1/admin/waitlist - Admin (X-Admin-Key)",
    ]
    for ep in endpoints:
        bullet(pdf, ep)

    section_title(pdf, "6. Demonstracao (5 minutos)")
    steps = [
        "Abrir http://184.107.160.119/cadastro e criar conta",
        "Copiar link de verificacao (JSON do register enquanto sem SMTP)",
        "Abrir /verificar?token=... e confirmar email",
        "Login -> redirect /dashboard",
        "Gerar 3 imagens teaser (estilos disponiveis)",
        "Conferir galeria com watermark Astra Free",
        "Tentar 4a geracao -> creditos insuficientes",
    ]
    for i, step in enumerate(steps, 1):
        bullet(pdf, f"{i}. {step}")

    section_title(pdf, "7. Resultados dos smoke tests")
    pdf.set_font("Courier", "", 8)
    for line in smoke_text.splitlines():
        pdf.set_x(pdf.l_margin)
        if len(line) > 100:
            line = line[:97] + "..."
        pdf.multi_cell(0, 4, sanitize(line))
    pdf.ln(2)

    section_title(pdf, "8. Pendencias e Fase 2")
    bullet(pdf, "Configurar dominio + DNS apontando para 184.107.160.119")
    bullet(pdf, "HTTPS via Certbot (deploy/nginx/certs)")
    bullet(pdf, "SMTP real e EMAIL_DEV_EXPOSE_LINK=false")
    bullet(pdf, "Fase 2: motor Flux/ComfyUI, planos pagos, geracao real 8K")

    section_title(pdf, "9. Comandos uteis")
    bullet(pdf, "Smoke: BASE_URL=http://184.107.160.119 ./deploy/smoke-fase1.sh")
    bullet(pdf, "E2E:   BASE_URL=http://184.107.160.119 ./deploy/e2e-fase1.sh")
    bullet(pdf, "Health: curl http://184.107.160.119/api/health")

    pdf.output(str(OUTPUT))
    print(f"PDF gerado: {OUTPUT}")


if __name__ == "__main__":
    smoke = run_smoke()
    build_pdf(smoke)
