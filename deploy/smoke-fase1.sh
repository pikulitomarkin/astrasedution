#!/usr/bin/env bash
# Smoke tests Fase 1 — Astra Seduction
# Uso: BASE_URL=http://184.107.160.119 ./deploy/smoke-fase1.sh
# Gera: deploy/smoke-results.txt

set -euo pipefail

BASE_URL="${BASE_URL:-http://184.107.160.119}"
API="${BASE_URL%/}/api/v1"
OUT="${SMOKE_OUT:-$(dirname "$0")/smoke-results.txt}"
TS=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

pass=0
fail=0
warn=0

log() { echo "$1" | tee -a "$OUT"; }
ok() { log "  [OK] $1"; pass=$((pass + 1)); }
bad() { log "  [FAIL] $1"; fail=$((fail + 1)); }
warn_line() { log "  [WARN] $1"; warn=$((warn + 1)); }

: > "$OUT"
log "=============================================="
log "ASTRA SEDUCTION — Smoke Tests Fase 1"
log "Data: $TS"
log "Base: $BASE_URL"
log "=============================================="
log ""

log "1. PÁGINAS FRONTEND"
for spec in "/:200" "/login:200" "/cadastro:200" "/verificar:200" "/dashboard:307" "/create:307"; do
  path="${spec%%:*}"
  expect="${spec##*:}"
  code=$(curl -sS -o /dev/null -w "%{http_code}" "$BASE_URL$path" || echo "000")
  if [ "$code" = "$expect" ]; then ok "$path → HTTP $code"; else bad "$path → HTTP $code (esperado $expect)"; fi
done
log ""

log "2. HEALTH CHECKS"
if curl -fsS "${BASE_URL%/}/api/health" | grep -q '"status"'; then ok "Next.js /api/health"; else bad "/api/health"; fi
if curl -fsS "$API/health" | grep -q '"status"'; then ok "FastAPI /api/v1/health"; else bad "/api/v1/health"; fi
log ""

log "3. E2E AUTOMATIZADO (deploy/e2e-fase1.sh)"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
if BASE_URL="$BASE_URL" bash "$SCRIPT_DIR/e2e-fase1.sh" >> "$OUT" 2>&1; then
  ok "E2E completo (12 checks)"
else
  bad "E2E falhou — ver log acima"
fi
log ""

log "4. PROTEÇÃO DE ROTAS (sem JWT)"
code=$(curl -sS -o /dev/null -w "%{http_code}" "$API/credits")
[ "$code" = "401" ] || [ "$code" = "403" ] && ok "GET /credits sem token → HTTP $code" || bad "GET /credits sem token → HTTP $code"
code=$(curl -sS -o /dev/null -w "%{http_code}" "$API/generations")
[ "$code" = "401" ] || [ "$code" = "403" ] && ok "GET /generations sem token → HTTP $code" || bad "GET /generations sem token → HTTP $code"
log ""

log "5. WAITLIST (endpoint público)"
WL=$(curl -sS -X POST "$API/waitlist" -H "Content-Type: application/json" \
  -d "{\"email\":\"smoke$(date +%s)@example.com\",\"name\":\"Smoke\"}")
echo "$WL" | grep -qE 'sucesso|VIP' && ok "POST /waitlist" || bad "POST /waitlist"
log ""

log "6. ADMIN WAITLIST (sem chave → 401)"
code=$(curl -sS -o /dev/null -w "%{http_code}" "$API/admin/waitlist")
[ "$code" = "401" ] && ok "GET /admin/waitlist sem chave → HTTP $code" || warn_line "GET /admin/waitlist sem chave → HTTP $code (esperado 401)"
log ""

log "=============================================="
log "RESUMO: $pass OK | $fail FAIL | $warn WARN"
log "=============================================="

[ "$fail" -eq 0 ]
