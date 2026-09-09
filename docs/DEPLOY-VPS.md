# Deploy — VPS (canônico)

**Ambiente de produção:** VPS `184.107.160.119` · path `/opt/astraseduction` · domínio `https://astrasedution.com`

O **Vercel não é o alvo de deploy** deste projeto. Falhas de preview/CI no Vercel podem ser ignoradas; a stack oficial é Docker Compose na VPS (api + app + db + nginx).

## Atualizar produção

No repositório local (ou via SSH na VPS):

```bash
# Na VPS
cd /opt/astraseduction
git fetch origin
git checkout <branch>
git pull origin <branch>
docker compose up -d --build
docker compose ps
```

Ou, a partir desta máquina (requer SSH root):

```bash
BRANCH=cursor/ssot-retomada-v1-205f bash deploy/deploy-vps.sh
```

## Smoke

```bash
BASE_URL=https://astrasedution.com ./deploy/smoke-fase1.sh
```

## Notas

- O arquivo `.env` da VPS **não** é versionado; nunca sobrescrever no pull.
- HTTPS / www já configurados no Nginx + Let's Encrypt.
- Após merge em `main`, preferir deploy a partir de `main`.
