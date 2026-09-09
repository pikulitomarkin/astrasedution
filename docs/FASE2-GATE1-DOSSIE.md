# Fase 2 — Dossiê Gate 1 (prova de viabilidade)

**Status:** implementação iniciada após aceite explícito do plano Retomada (09/09/2026).  
**Entrega-alvo SSOT:** 20/09/2027 · Bolsa R$ 500 · Responsável: Empresa do Marcos (PJ)  
**Fonte:** [`SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf`](./SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf)

---

## 1. O que esta fase entrega (código)

| Capacidade | Onde |
|------------|------|
| **Identity Passport** (permanente/preferencial/variável/experimental) | `POST/GET/PATCH/DELETE /api/v1/identities` |
| **Cérebro Astra** (orquestração de provedores) | `backend/app/services/cerebro.py` |
| Provider `identity_canvas` (determinístico, prova de consistência sem GPU) | `backend/app/services/providers/identity_canvas.py` |
| Provider `fal` (opcional, via `FAL_KEY`) | mesmo módulo |
| **Anti-deepfake / anti-juvenil** | `backend/app/services/safety.py` + `moderation_events` |
| **Bateria de consistência Gate 1** | `POST /api/v1/identities/{id}/consistency-battery` |
| Métricas por geração | `cost_usd_cents`, `latency_ms`, `provider`, `model_id`, `prompt_hash` |
| Wizard → grava passport + dispara bateria | `src/app/create/page.tsx` |
| Dashboard Future-first | seletor de passport em `src/app/dashboard/page.tsx` |

---

## 2. Critérios SSOT §5 — checklist de aceite

- [x] Mesma identidade em múltiplos ângulos/luzes/expressões/detalhes (mãos/unhas/pés) via bateria
- [x] Stack documentada (abaixo)
- [x] Custo/tempo/taxa de falha registrados por geração e por batch
- [x] Anti-deepfake: bloqueio de rosto real sem consentimento + aparência &lt;18
- [ ] Benchmark HeyGen lado a lado (artefato humano / planilha — pendente avaliação Geison/Jonny)
- [ ] Reprodução fluxo vídeo nicho ~1:30 com custo/tempo (Fase 2 estendida / pré-Gate 1 presencial)
- [ ] Avaliação §11 com ≥3 avaliadores (processo humano pós-bateria)

> Uma imagem isolada **não** aprova. A bateria (`consistency-battery`) é o artefato técnico mínimo.

---

## 3. Stack atual (Gate 1)

| Camada | Tecnologia |
|--------|------------|
| API | FastAPI + SQLAlchemy + Postgres |
| Orquestração | Cérebro Astra (`ASTRA_IMAGE_PROVIDER`) |
| Default provider | `identity_canvas` — PNG determinístico por seed (prova arquitetural) |
| Live provider | `fal` (`FAL_KEY` + `FAL_MODEL_ID`, default `fal-ai/flux/dev`) |
| App | Next.js + Identity Passport no wizard/dashboard |
| Deploy | VPS Docker Compose + Nginx HTTPS |

**Ativar Flux/FAL em produção:**

```bash
ASTRA_IMAGE_PROVIDER=fal
FAL_KEY=...
FAL_MODEL_ID=fal-ai/flux/dev
```

Sem chave, o sistema faz fallback automático para `identity_canvas` e registra `error_message` de fallback.

---

## 4. Como rodar a bateria (Gate 1)

```bash
# 1) criar passport (Future-first)
curl -X POST "$API/api/v1/identities" -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Twin A","product_line":"future","tier":"preferencial","apparent_age":28,"consent_synthetic_only":true,"consent_no_real_person":true,"attributes":{"hair":"dark"}}'

# 2) bateria (12 variantes: face/luz/mãos/unhas/pés/corpo)
curl -X POST "$API/api/v1/identities/$ID/consistency-battery" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"max_variants":12}'
```

Resposta inclui `failure_rate`, `total_cost_usd_cents`, `total_latency_ms` e lista de gerações.

---

## 5. Protocolo de avaliação §11 (humano)

Notas 0–10, média de ≥3 avaliadores (Geison, Jonny + 1):

| Categoria | Meta |
|-----------|------|
| Rosto / identidade | ≥ 8 |
| Pele | ≥ 7 |
| Corpo | ≥ 7 |
| Mãos | ≥ 7 |
| Unhas | ≥ 8 |
| Pés | ≥ 7 |
| Cabelo | ≥ 7 |
| Maquiagem | ≥ 7 |
| Roupas | ≥ 7 |
| Consistência temporal | ≥ 80% |

Com `identity_canvas`, a consistência de seed é **matematicamente determinística** (mesmo seed ⇒ mesmos bytes na variante). Com `fal`/Flux, a bateria mede consistência visual real para o Gate 1.

---

## 6. Limitações honestas (obrigatório no Gate 1)

1. Sem `FAL_KEY`, a qualidade fotorealista **não** está ativa — apenas a prova de arquitetura/consistência.
2. Benchmark HeyGen e vídeo ~1:30 exigem custo de API/GPU e sessão de avaliação humana.
3. Produtos públicos Future/Seduction ainda compartilham o mesmo domínio; isolamento de CNPJ/pagamento vem após Gate 1.

---

## 7. Decisão Gate 1 (preencher após bateria + avaliação)

| Opção | Marcar |
|-------|--------|
| Continuar | ☐ |
| Trocar modelo/pipeline | ☐ |
| Limitar escopo | ☐ |
| Priorizar só Future | ☐ |
| Adiar vídeo | ☐ |

**Assinaturas:** Geison ______ · Jonny ______ · Marcos (PJ) ______ · Data ______
