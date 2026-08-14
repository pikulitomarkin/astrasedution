#!/usr/bin/env bash
# Emite/renova certificado Let's Encrypt para astraseduction.com
# Uso (na VPS): DOMAIN=astraseduction.com EMAIL=suporte@astraseduction.com ./deploy/ssl-setup.sh

set -euo pipefail

DOMAIN="${DOMAIN:-astrasedution.com}"
EMAIL="${EMAIL:-suporte@astrasedution.com}"
WWW_ROOT="${WWW_ROOT:-/opt/astraseduction/deploy/nginx/certbot-www}"
COMPOSE_DIR="${COMPOSE_DIR:-/opt/astraseduction}"

mkdir -p "$WWW_ROOT"

if ! command -v certbot >/dev/null 2>&1; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq certbot
fi

# Standalone: libera porta 80
cd "$COMPOSE_DIR"
docker compose stop nginx

certbot certonly \
  --standalone \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --preferred-challenges http \
  -d "$DOMAIN" \
  --keep-until-expiring \
  --expand

docker compose up -d nginx

echo "OK: certificado em /etc/letsencrypt/live/$DOMAIN/"
echo "Teste: curl -fsSI https://$DOMAIN/"
