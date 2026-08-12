# Fase 1 — Pacote de aceite (Geison / Grok)

**Data:** 2026-08-12  
**Ambiente:** http://184.107.160.119  
**Branch:** `cursor/fase1-dia1-fastapi-auth-205f`  
**PR:** https://github.com/pikulitomarkin/astrasedution/pull/2

---

## Critério SSOT

> Usuário registra, loga e gera **3 imagens simples watermarked sem erro**; a 4ª é bloqueada.

---

## Checklist de aceite

| # | Item | Status |
|---|------|--------|
| 1 | Registro + login JWT (FastAPI + bcrypt) | OK |
| 2 | Verificação de email (token + `/verificar`) | OK |
| 3 | Dashboard pós-login (`/dashboard`) | OK |
| 4 | Waitlist na landing (`POST /api/v1/waitlist`) | OK |
| 5 | Plano Free = 3 créditos no registro | OK |
| 6 | 3 gerações watermarked sem erro | OK |
| 7 | 4ª geração recusada (HTTP 402) | OK |
| 8 | Galeria com imagens do usuário | OK |
| 9 | Rate limit register/login/generate | OK |
| 10 | JWT_SECRET forte na VPS (≠ padrão) | OK |
| 11 | HTTPS / domínio | Pendente (sem DNS ainda) |

---

## Fluxo de demonstração (5 min)

1. Abrir http://184.107.160.119/cadastro — criar conta
2. Copiar link de verificação (dev: `EMAIL_DEV_EXPOSE_LINK=true`) ou usar email SMTP
3. Abrir `/verificar?token=...` — confirmar email
4. Login → redirect `/dashboard`
5. Escolher estilo → **Gerar imagem** (3×)
6. Ver galeria com watermark **Astra Free**
7. Tentar 4ª geração → mensagem de créditos insuficientes

---

## Teste automatizado

```bash
BASE_URL=http://184.107.160.119 ./deploy/e2e-fase1.sh
BASE_URL=http://184.107.160.119 ./deploy/smoke-fase1.sh
```

## PDF de entrega ao cliente

Documento consolidado com todas as rodadas (Dias 1–5) e resultados dos smoke tests:

- **Arquivo:** `deploy/FASE1-ENTREGA-CLIENTE.pdf`
- **Regenerar:** `pip install -r deploy/requirements-pdf.txt && python3 deploy/generate-fase1-pdf.py`

---

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/api/v1/auth/register` | Cadastro (rate limit 5/min/IP) |
| POST | `/api/v1/auth/login` | Login (10/min/IP) |
| GET | `/api/v1/auth/verify-email?token=` | Verificar email |
| GET | `/api/v1/credits` | Saldo (auth) |
| POST | `/api/v1/generate/teaser` | Gera PNG watermarked (10/min/IP) |
| GET | `/api/v1/generations` | Galeria do usuário |
| POST | `/api/v1/waitlist` | Waitlist landing |

---

## Observações técnicas

- **Motor IA:** Fase 1 usa placeholder Pillow + watermark; Flux/ComfyUI entra na Fase 2.
- **Email:** SMTP opcional; em dev o link de verificação aparece no JSON do register.
- **HTTPS:** aguardando domínio + Certbot; secrets JWT já configurados na VPS.
- **Admin waitlist:** `GET /api/v1/admin/waitlist` com header `X-Admin-Key`.

---

## Contatos / próximos passos

- Fase 2: motor Flux real, ComfyUI, planos pagos
- Configurar domínio + HTTPS quando DNS estiver pronto
- Desligar `EMAIL_DEV_EXPOSE_LINK` após SMTP em produção
