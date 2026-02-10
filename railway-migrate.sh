#!/bin/bash
# Script para executar migrações do Prisma no Railway
# IMPORTANTE: Para executar migrações LOCALMENTE (fora do Railway), você precisa da URL PÚBLICA do PostgreSQL.
# A URL interna `postgres.railway.internal` só funciona dentro da rede do Railway.
#
# Para obter a URL pública:
# 1. Acesse o painel do Railway (https://railway.app)
# 2. Vá para seu projeto → PostgreSQL
# 3. Na aba "Connect" ou "Connection", copie a "External Connection URL"
# 4. Use essa URL no DATABASE_URL (exemplo: postgresql://postgres:senha@xxxx.railway.app:5432/railway)

echo "🔧 Configurando migrações do Prisma para PostgreSQL Railway"

# Verificar se DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL não está definida."
    echo "   Certifique-se de configurar a variável de ambiente DATABASE_URL com a URL PÚBLICA do PostgreSQL."
    echo "   Exemplo: export DATABASE_URL='postgresql://postgres:senha@xxxx.railway.app:5432/railway'"
    echo "   "
    echo "   Para executar dentro do Railway (deploy), a variável já deve estar configurada automaticamente."
    exit 1
fi

echo "📦 Instalando dependências do Prisma..."
npm install @prisma/client prisma

echo "🚀 Executando migrações do Prisma..."
npx prisma migrate deploy

echo "✅ Migrações concluídas!"
echo "📊 Para verificar as tabelas criadas, execute:"
echo "   npx prisma studio"