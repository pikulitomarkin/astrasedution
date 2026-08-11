#!/usr/bin/env bash
# Instala Docker, sobe frontend/backend (Next.js), PostgreSQL e Nginx na VPS.
# Uso:
#   sudo bash deploy/setup-vps.sh
#   ou (remoto): ssh user@IP 'bash -s' < deploy/setup-vps.sh
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/astraseduction}"
REPO_URL="${REPO_URL:-https://github.com/pikulitomarkin/astrasedution.git}"
BRANCH="${BRANCH:-main}"

echo "==> [1/6] Atualizando sistema..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get upgrade -y
apt-get install -y ca-certificates curl gnupg git ufw openssl rsync

echo "==> [2/6] Instalando Docker Engine + Compose..."
if ! command -v docker >/dev/null 2>&1; then
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  . /etc/os-release
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu ${VERSION_CODENAME} stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -y
  apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  systemctl enable --now docker
else
  echo "Docker já instalado: $(docker --version)"
fi

echo "==> [3/6] Firewall (SSH/HTTP/HTTPS)..."
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo "==> [4/6] Preparando diretório da aplicação em ${APP_DIR}..."
mkdir -p "${APP_DIR}"
if [ -d "${APP_DIR}/.git" ]; then
  cd "${APP_DIR}"
  git fetch origin
  git checkout "${BRANCH}"
  git pull origin "${BRANCH}"
else
  # Se o script for executado de dentro do repo clonado, copia; senão clona.
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
  if [ -f "${REPO_ROOT}/docker-compose.yml" ] && [ "${REPO_ROOT}" != "${APP_DIR}" ]; then
    rsync -a --delete --exclude '.git' --exclude 'node_modules' --exclude '.next' "${REPO_ROOT}/" "${APP_DIR}/"
    cd "${APP_DIR}"
  else
    git clone --branch "${BRANCH}" "${REPO_URL}" "${APP_DIR}"
    cd "${APP_DIR}"
  fi
fi

mkdir -p deploy/nginx/certs

echo "==> [5/6] Gerando .env de produção se necessário..."
if [ ! -f .env ]; then
  SECRET="$(openssl rand -hex 32)"
  DB_PASS="$(openssl rand -hex 16)"
  PUBLIC_IP="$(curl -fsS https://api.ipify.org || hostname -I | awk '{print $1}')"
  cat > .env <<EOF
POSTGRES_USER=postgres
POSTGRES_PASSWORD=${DB_PASS}
POSTGRES_DB=astraseduction
DATABASE_URL=postgresql://postgres:${DB_PASS}@db:5432/astraseduction
NEXTAUTH_URL=http://${PUBLIC_IP}
NEXTAUTH_SECRET=${SECRET}
HTTP_PORT=80
HTTPS_PORT=443
EOF
  echo "Arquivo .env criado. Ajuste NEXTAUTH_URL para o domínio quando estiver pronto."
else
  echo ".env já existe — mantendo."
fi

echo "==> [6/6] Build e start dos serviços (db + app + nginx)..."
docker compose pull || true
docker compose build --no-cache
docker compose up -d

echo
echo "Serviços em execução:"
docker compose ps
echo
echo "Healthcheck:"
sleep 5
curl -fsS "http://127.0.0.1/api/health" || curl -fsS "http://127.0.0.1:3000/api/health" || true
echo
echo "Pronto. Frontend/Backend (Next.js) + PostgreSQL + Nginx instalados."
echo "Atualize NEXTAUTH_URL no .env para o domínio e rode: docker compose up -d --build"
