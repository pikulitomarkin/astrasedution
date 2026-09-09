# Astra — Future + Seduction

Plataforma de **identidades digitais persistentes** (Identity Passport) com orquestração de modelos (**Cérebro Astra**).

| Produto | Foco |
|---------|------|
| **Astra Future** | Digital twins / avatares B2B — prioridade, benchmark HeyGen |
| **Astra Seduction** | Realismo adulto sintético profissional |

**SSOT oficial:** [`docs/SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf`](./docs/SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf)  
**Plano de fases:** [`docs/SSOT-RETOMADA-PLANO.md`](./docs/SSOT-RETOMADA-PLANO.md)  
**Checklist:** [`docs/SSOT-RETOMADA-CHECKLIST.md`](./docs/SSOT-RETOMADA-CHECKLIST.md)

> Plano SSOT 17/08/2026 (Fase 2 em 29/08/2026) está **supersedido**. Ver [`docs/SSOT-LEGACY-2026-08-17-SUPERSEDIDO.md`](./docs/SSOT-LEGACY-2026-08-17-SUPERSEDIDO.md).

### Datas-chave (Retomada V1)

- Fase 1: base do sistema — **concluída / paga**
- Fase 2: prova de viabilidade — **20/09/2027**
- Meta interna: **15/01/2028**
- Lançamento: **31/01/2028**

### Stack atual

- **Frontend:** Next.js (App Router) + i18n pt/en/es
- **API:** FastAPI (JWT, créditos, teaser Pillow, waitlist, email Resend)
- **DB:** PostgreSQL 16
- **Deploy:** Docker Compose + Nginx (HTTPS) na VPS

### Preços (SSOT §13)

**Future:** Trial · Individual US$10 / R$49 · Profissional US$19 / R$89 · Agência US$39 / R$199  
**Seduction:** Trial · Básico US$12 / R$59 · Premium US$24 / R$119 · Creator Studio US$39 / R$199

### Getting Started

```bash
npm install
npm run dev
```

Stack completa:

```bash
docker compose up --build
```

Abra [http://localhost:3000](http://localhost:3000).

### Documentação de aceite Fase 1

Ver [`deploy/FASE1-ACEITE.md`](./deploy/FASE1-ACEITE.md).

**Não iniciar Fase 2** até o plano de Retomada ser aceito.
