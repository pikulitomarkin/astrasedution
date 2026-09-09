#!/usr/bin/env bash
# Deploy canônico na VPS (não Vercel).
# Uso:
#   BRANCH=cursor/ssot-retomada-v1-205f bash deploy/deploy-vps.sh
#   VPS_HOST=184.107.160.119 VPS_USER=root bash deploy/deploy-vps.sh
set -euo pipefail

VPS_HOST="${VPS_HOST:-184.107.160.119}"
VPS_USER="${VPS_USER:-root}"
APP_DIR="${APP_DIR:-/opt/astraseduction}"
BRANCH="${BRANCH:-main}"
REPO_URL="${REPO_URL:-https://github.com/pikulitomarkin/astrasedution.git}"

REMOTE_SCRIPT=$(cat <<EOF
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive
cd ${APP_DIR}
if [ ! -d .git ]; then
  git clone --branch "${BRANCH}" "${REPO_URL}" ${APP_DIR}
  cd ${APP_DIR}
fi
git remote set-url origin "${REPO_URL}" || true
git fetch origin
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"
# Nunca apagar .env
test -f .env
docker compose up -d --build
docker compose ps
curl -fsS -o /dev/null -w "health_http=%{http_code}\n" http://127.0.0.1/api/v1/health || true
curl -fsS -o /dev/null -w "home_https=%{http_code}\n" https://astrasedution.com/ || true
EOF
)

echo "==> Deploy VPS ${VPS_USER}@${VPS_HOST}:${APP_DIR} branch=${BRANCH}"
ssh -o StrictHostKeyChecking=accept-new "${VPS_USER}@${VPS_HOST}" "bash -s" <<<"${REMOTE_SCRIPT}"
echo "==> Deploy concluído"
