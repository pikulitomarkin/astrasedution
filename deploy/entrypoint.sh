#!/bin/sh
set -eu

echo "[entrypoint] Aguardando banco e aplicando migrações Prisma..."

retries=30
i=0
until node -e "
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, connectionTimeoutMillis: 3000 });
pool.query('SELECT 1').then(() => pool.end()).then(() => process.exit(0)).catch(async (e) => { try { await pool.end(); } catch {} process.exit(1); });
" 2>/dev/null; do
  i=$((i + 1))
  if [ "$i" -ge "$retries" ]; then
    echo "[entrypoint] Banco indisponível após ${retries} tentativas."
    exit 1
  fi
  echo "[entrypoint] Banco ainda não pronto (${i}/${retries})..."
  sleep 2
done

npx prisma migrate deploy

echo "[entrypoint] Iniciando aplicação..."
exec "$@"
