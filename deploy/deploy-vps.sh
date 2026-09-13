#!/usr/bin/env bash
# Deploy canônico na VPS via tar+ssh + docker compose (não Vercel).
# Uso: bash deploy/deploy-vps.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VPS_HOST="${VPS_HOST:-184.107.160.119}"
VPS_USER="${VPS_USER:-root}"
APP_DIR="${APP_DIR:-/opt/astraseduction}"
SSH_OPTS=(-o StrictHostKeyChecking=accept-new -o PreferredAuthentications=password -o PubkeyAuthentication=no)

echo "==> Sync ${ROOT} -> ${VPS_USER}@${VPS_HOST}:${APP_DIR} (preserva .env)"
tar czf - \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dev.db' \
  --exclude='.env' \
  --exclude='*.mp4' \
  --exclude='.cursor' \
  -C "${ROOT}" . \
| ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
  "mkdir -p ${APP_DIR} && cd ${APP_DIR} && tar xzf -"

echo "==> Rebuild containers"
ssh "${SSH_OPTS[@]}" "${VPS_USER}@${VPS_HOST}" \
  "set -euo pipefail; cd ${APP_DIR}; test -f .env; docker compose up -d --build; sleep 8; docker compose ps; curl -fsS -o /dev/null -w 'health=%{http_code}\n' http://127.0.0.1/api/v1/health; curl -fsS -o /dev/null -w 'https=%{http_code}\n' https://astrasedution.com/"

echo "==> Deploy VPS concluído"
