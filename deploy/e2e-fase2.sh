#!/usr/bin/env bash
# E2E Fase 2 — Identity Passport + bateria Gate 1 + teaser com identity_id
# Uso: BASE_URL=https://astrasedution.com ./deploy/e2e-fase2.sh

set -euo pipefail

BASE_URL="${BASE_URL:-https://astrasedution.com}"
API="${BASE_URL%/}/api/v1"
EMAIL="fase2$(date +%s)@example.com"
PASS="Test123456"

pass=0
fail=0
ok() { echo "✓ $1"; pass=$((pass + 1)); }
bad() { echo "✗ $1"; fail=$((fail + 1)); exit 1; }

echo "=== E2E Fase 2 @ $API ==="

echo "--- Health ---"
curl -fsS "${BASE_URL%/}/api/health" | grep -q '"status"' && ok "health" || bad "health"

echo "--- Register ---"
REG=$(curl -sS -X POST "$API/auth/register" -H "Content-Type: application/json" \
  -d "{\"name\":\"Fase2 E2E\",\"email\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin)['tokens']['access_token'])")
VERIFY_URL=$(echo "$REG" | python3 -c "import sys,json; print(json.load(sys.stdin).get('verification_url') or '')")
[ -n "$TOKEN" ] && ok "register" || bad "register: $REG"

echo "--- Verify email ---"
VT=$(python3 -c "from urllib.parse import urlparse,parse_qs; u=urlparse('$VERIFY_URL'); print(parse_qs(u.query).get('token',[''])[0])")
if [ -n "$VT" ]; then
  curl -fsS "$API/auth/verify-email?token=$VT" | grep -qi "sucesso" && ok "verify-email" || bad "verify-email"
else
  bad "verify-email missing link (EMAIL_DEV_EXPOSE_LINK)"
fi

echo "--- Credits before ---"
CRED=$(curl -fsS "$API/credits" -H "Authorization: Bearer $TOKEN")
BEFORE=$(echo "$CRED" | python3 -c "import sys,json; print(json.load(sys.stdin)['credits'])")
[ "$BEFORE" -ge 1 ] && ok "credits=$BEFORE" || bad "credits=$BEFORE"

echo "--- Create Identity Passport ---"
ID_JSON=$(curl -sS -X POST "$API/identities" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Twin E2E","product_line":"future","tier":"preferencial","apparent_age":28,"consent_synthetic_only":true,"consent_no_real_person":true,"attributes":{"hair":"long, voluminous","ethnicity":"medium","height_cm":172}}')
ID=$(echo "$ID_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")
SEED=$(echo "$ID_JSON" | python3 -c "import sys,json; print(json.load(sys.stdin)['seed'])")
[ -n "$ID" ] && [ -n "$SEED" ] && ok "identity id=$ID seed=${SEED:0:8}" || bad "create identity: $ID_JSON"

echo "--- Consistency battery (12 variants, 1 credit) ---"
BAT=$(curl -sS -X POST "$API/identities/$ID/consistency-battery" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"max_variants":12}')
echo "$BAT" | python3 -c "
import sys,json
d=json.load(sys.stdin)
assert d.get('variant_count')==12, d
assert d.get('success_count',0)>=1, d
assert 'failure_rate' in d, d
assert d.get('credits_remaining')==$BEFORE-1, d
print(f\"ok {d['success_count']}/{d['variant_count']} fail_rate={d['failure_rate']} credits={d['credits_remaining']}\")
" && ok "battery" || bad "battery: $BAT"

echo "--- Teaser with identity_id ---"
TEASER=$(curl -sS -X POST "$API/generate/teaser" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"style\":\"solo_lifestyle\",\"identity_id\":\"$ID\",\"variant\":\"front_neutral\"}")
echo "$TEASER" | python3 -c "
import sys,json
d=json.load(sys.stdin)
g=d.get('generation') or d
assert (g.get('identity_id') or '')=='$ID', d
print('provider', g.get('provider'), 'status', g.get('status'))
" && ok "teaser+identity" || bad "teaser: $TEASER"

echo "--- Safety: juvenile age blocked ---"
CODE=$(curl -sS -o /tmp/fase2-juv.json -w "%{http_code}" -X POST "$API/identities" \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"name":"Bad","product_line":"future","tier":"experimental","apparent_age":16,"consent_synthetic_only":true,"consent_no_real_person":true,"attributes":{}}')
[ "$CODE" = "422" ] && ok "block apparent_age<18" || bad "juvenile should 422, got $CODE $(cat /tmp/fase2-juv.json)"

echo ""
echo "=== Resultado Fase 2: $pass checks OK ==="
exit 0
