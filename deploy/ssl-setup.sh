#!/usr/bin/env bash
# Emite/renova certificado Let's Encrypt para apex + www (webroot, sem downtime).
# Uso (na VPS): DOMAIN=astrasedution.com EMAIL=suporte@astrasedution.com ./deploy/ssl-setup.sh

set -euo pipefail

DOMAIN="${DOMAIN:-astrasedution.com}"
EMAIL="${EMAIL:-suporte@astrasedution.com}"
WWW_ROOT="${WWW_ROOT:-/opt/astraseduction/deploy/nginx/certbot-www}"
COMPOSE_DIR="${COMPOSE_DIR:-/opt/astraseduction}"

mkdir -p "$WWW_ROOT/.well-known/acme-challenge"
chmod -R a+rX "$WWW_ROOT"

if ! command -v certbot >/dev/null 2>&1; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq certbot
fi

cd "$COMPOSE_DIR"

# Garante nginx no ar com location ACME (webroot)
docker compose up -d nginx

certbot certonly \
  --webroot \
  -w "$WWW_ROOT" \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  --preferred-challenges http \
  -d "$DOMAIN" \
  -d "www.$DOMAIN" \
  --keep-until-expiring \
  --expand

docker compose exec -T nginx nginx -s reload || docker compose up -d nginx

echo "OK: certificado em /etc/letsencrypt/live/$DOMAIN/ (inclui www.$DOMAIN)"
echo "Teste: curl -fsSI https://$DOMAIN/ && curl -fsSI https://www.$DOMAIN/"
