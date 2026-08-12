#!/usr/bin/env bash
# Teste E2E Fase 1 — Astra Seduction
# Uso: BASE_URL=http://184.107.160.119 ./deploy/e2e-fase1.sh

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1}"
API="${BASE_URL%/}/api/v1"
EMAIL="e2e$(date +%s)@example.com"
PASS="Test123456"

pass=0
fail=0

ok() { echo "✓ $1"; pass=$((pass + 1)); }
bad() { echo "✗ $1"; fail=$((fail + 1)); exit 1; }

echo "=== E2E Fase 1 @ $API ==="

echo "--- Health ---"
HEALTH=$(curl -fsS "${BASE_URL%/}/api/health" || echo FAIL)
echo "$HEALTH" | grep -q '"status"' && ok "health" || bad "health"

echo "--- Register ---"
REG=$(curl -sS -X POST "$API/auth/register" -H "Content-Type: application/json" \
  -d "{\"name\":\"E2E\",\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin)['tokens']['access_token'])")
VERIFY_URL=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin).get('verification_url') or '')")
[ -n "$TOKEN" ] && ok "register" || bad "register"

echo "--- Verify email ---"
VT=$(python3 -c "from urllib.parse import urlparse,parse_qs; u=urlparse('$VERIFY_URL'); print(parse_qs(u.query).get('token',[''])[0])")
if [ -n "$VT" ]; then
  curl -fsS "$API/auth/verify-email?token=$VT" | grep -q "sucesso" && ok "verify-email" || bad "verify-email"
else
  echo "  (sem verification_url — pulando; exige EMAIL_DEV_EXPOSE_LINK=true)"
fi

echo "--- Login ---"
LOGIN=$(curl -sS -X POST "$API/auth/login" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
echo "$LOGIN" | grep -q "access_token" && ok "login" || bad "login"

echo "--- Credits (3 free) ---"
CRED=$(curl -fsS "$API/credits" -H "Authorization: Bearer $TOKEN")
echo "$CRED" | python3 -c "import sys,json; d=json.load(sys.stdin); assert d['credits']==3, d" && ok "credits=3" || bad "credits"

echo "--- Generate 3x ---"
for i in 1 2 3; do
  CODE=$(curl -sS -o /tmp/e2e-gen.json -w "%{http_code}" -X POST "$API/generate/teaser" \
    -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
    -d '{"style":"solo_lifestyle"}')
  [ "$CODE" = "200" ] && ok "generate #$i" || bad "generate #$i (HTTP $CODE)"
done

echo "--- Generate 4th (402) ---"
CODE=$(curl -sS -o /tmp/e2e-gen4.json -w "%{http_code}" -X POST "$API/generate/teaser" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"style":"solo_lifestyle"}')
[ "$CODE" = "402" ] && ok "4th blocked (402)" || bad "4th should be 402, got $CODE"

echo "--- Gallery (3 items) ---"
GENS=$(curl -fsS "$API/generations" -H "Authorization: Bearer $TOKEN")
COUNT=$(echo "$GENS" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
[ "$COUNT" = "3" ] && ok "gallery count=3" || bad "gallery count=$COUNT"

GEN_ID=$(echo "$GENS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d[0]['id'])")
CODE=$(curl -sS -o /tmp/e2e-img.png -w "%{http_code}" "$API/generations/$GEN_ID/image" \
  -H "Authorization: Bearer $TOKEN")
[ "$CODE" = "200" ] && file /tmp/e2e-img.png | grep -q PNG && ok "image download" || bad "image"

echo "--- Waitlist ---"
WL=$(curl -sS -X POST "$API/waitlist" -H "Content-Type: application/json" \
  -d "{\"email\":\"waitlist$(date +%s)@example.com\",\"name\":\"E2E\"}")
echo "$WL" | grep -q "sucesso\|VIP" && ok "waitlist" || bad "waitlist"

echo ""
echo "=== Resultado: $pass checks OK ==="
exit 0
