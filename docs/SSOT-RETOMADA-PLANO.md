# Plano de implementação — SSOT Retomada Astra V1

**Documento de trabalho interno**  
**Fonte:** [SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf](./SSOT_RETOMADA_ASTRA_V1_06.09.2026.pdf)  
**Status:** Fase 1 aprovada/paga. **Não iniciar Fase 2 até este plano ser aceito.**  
**Metas:** 13 fases · Fase 2 em **20/09/2027** · meta interna **15/01/2028** · lançamento **31/01/2028**

> O plano SSOT 17/08/2026 (12 fases / Fase 2 em 29/08/2026) está **SUPERSEDIDO**. Ver [`SSOT-LEGACY-2026-08-17-SUPERSEDIDO.md`](./SSOT-LEGACY-2026-08-17-SUPERSEDIDO.md).

---

## 1. Visão alinhada ao SSOT Retomada

| Pilar | Diretriz |
|-------|----------|
| Produtos | **Astra Future** (B2B / digital twin — prioridade) e **Astra Seduction** (adulto sintético) — produtos públicos **separados**, motor interno compartilhado |
| Missão Future | Superar o HeyGen em fidelidade, consistência, velocidade e custo |
| Missão Seduction | Melhor plataforma profissional de realismo adulto sintético (identidade persistente) |
| Coração técnico | Bloco §4 **congelado** (só expansão): rosto, pele, corpo, **unhas/pés prioridade máxima**, tatuagens, cabelo, maquiagem, acessórios, íntimos, consistência |
| Inteligência | **Cérebro Astra**: orquestração/roteamento de modelos existentes — **não** treinar modelos do zero |
| Identidade | **Identity Passport** (Permanente / Preferencial / Variável / Experimental) |
| Segurança | Anti-deepfake como requisito de engenharia desde Fase 2; bloqueio de menores/aparência juvenil; logs; moderação |
| Pagamento de fase | Bolsa R$ 500 / fase (13 × R$ 500 = R$ 6.500) — só após aprovação; **≠** custo real de APIs/GPU |
| Societário | Gustavo 30% · Geison 30% · Empresa Marcos (PJ) 20% · Jonny 20% · Gabriela R$ 700/mês pós–Gate 1 |
| CNPJ | Abrir **após Gate 1**; idealmente **dois CNPJs** (Future + Seduction) para isolamento de risco |
| Afiliados | 40% recorrente; afiliado = assinante ativo; programa a partir da Fase 12 |
| Prioridade de escopo | Future-first até Gate 2; Seduction aprofunda nas Fases 7–9 |

### Preços oficiais (SSOT §13)

**Free Trial (ambos):** sem cartão; watermark + resolução limitada. Seduction: verificação +18; módulos íntimos bloqueados no trial.

**Astra Future**

| Plano | USD | BRL | Recursos |
|-------|-----|-----|----------|
| Trial | 0 | 0 | Watermark, 15 imgs, 1 vídeo 720p |
| Individual | 10/mês | 49/mês | Sem watermark, 1 Twin, HD |
| Profissional | 19/mês | 89/mês | 5 Twins, vídeos em lote, voz |
| Agência/Corp | 39/mês | 199/mês | Twins ilimitados, API, multi-usuário |

**Astra Seduction**

| Plano | USD | BRL | Recursos |
|-------|-----|-----|----------|
| Trial | 0 | 0 | Verificado +18, funções básicas |
| Básico | 12/mês | 59/mês | Alta resolução, 1 personagem |
| Premium | 24/mês | 119/mês | Unhas/pés avançados, 3 personagens |
| Creator Studio | 39/mês | 199/mês | Vídeos, uso comercial |

Regra: preço de venda **nunca** abaixo do custo variável.

---

## 2. Estado atual vs Retomada (baseline 09/09/2026)

### Concluído (Fase 1 + extras em produção)

| Item | Estado |
|------|--------|
| Auth JWT (register / login / refresh) | ✅ |
| Verificação de email + Resend | ✅ |
| Reset / troca de senha | ✅ |
| Dashboard + créditos Free (3) | ✅ |
| Teaser watermarked (Pillow stub) + galeria | ✅ |
| Waitlist + admin | ✅ |
| Recarga welcome +1000 créditos (stub) | ✅ |
| Deploy VPS Docker (api + app + db + nginx HTTPS + www) | ✅ |
| i18n pt / en / es | ✅ |
| Header logado: manequim de perfil | ✅ |
| Landing pricing alinhada às tabelas Future/Seduction | ✅ (este PR) |

### Lacunas críticas (Fase 2+)

| Lacuna | Impacto |
|--------|---------|
| Geração ainda é **stub Pillow** | Sem prova de viabilidade |
| Sem **Identity Passport** / seed persistente | Sem consistência |
| Sem produtos Future e Seduction separados | Arquitetura de produto incompleta |
| Sem **Cérebro Astra** (roteamento de modelos) | Sem custo/qualidade competitivos |
| Sem pipeline anti-deepfake completo | Fora do Gate 1 |
| Wizard não grava Identity no backend | Customização cosmética |
| Sem gateway real (Stripe Future / adult processors Seduction) | Monetização stub até Fase 12 |
| Free trial SSOT (15 imgs / 1 vídeo) ≠ créditos atuais | Alinhar na monetização (Fase 12) |

---

## 3. Cronograma das 13 fases (oficial)

| Fase | Entrega | Data | Bolsa | Status |
|------|---------|------|-------|--------|
| **1** | Base do sistema | — | R$ 500 (pago) | ✅ |
| **2** | Prova de viabilidade técnica (**DECISIVA**) | **20/09/2027** | R$ 500 | 🔲 Próxima |
| **3** | Wizard e customização inicial | 04/10/2027 | R$ 500 | 🔲 |
| **4** | Qualidade diferencial (unhas, pés, pele) | 18/10/2027 | R$ 500 | 🔲 |
| **5** | Astra Future inicial (MVP B2B) | 01/11/2027 | R$ 500 | 🔲 |
| **6** | Future profissional (voz, lip-sync) | 15/11/2027 | R$ 500 | 🔲 |
| **7** | Seduction visual premium | 22/11/2027 | R$ 500 | 🔲 |
| **8** | Multi-personagem | 29/11/2027 | R$ 500 | 🔲 |
| **9** | Recursos adultos avançados | 06/12/2027 | R$ 500 | 🔲 |
| **10** | Vídeo consistente | 13/12/2027 | R$ 500 | 🔲 |
| **11** | Biblioteca e evolução | 18/12/2027 | R$ 500 | 🔲 |
| **12** | Monetização automatizada + afiliados | 22/12/2027 | R$ 500 | 🔲 |
| **13** | Espanhol e refinamentos | **15/01/2028** | R$ 500 | 🔲 |

Interpretação: 15/01/2028 = meta interna → 16–30/01/2028 correções → **31/01/2028** janela de lançamento. Segurança/qualidade prevalecem sobre a data.

---

## 4. Gates de decisão

| Gate | Quando | Pergunta |
|------|--------|----------|
| **Gate 1** | Pós–Fase 2 (20/09/2027) | Tecnologia funciona (qualidade, repetibilidade, custo, tempo)? Continuar / trocar modelo / limitar escopo / priorizar Future |
| **Gate 2** | Pós–Fase 5 | Future pode ser vendido? Demo, preço-teste, cobrança manual |
| **Gate 3** | Pós–Fase 7 | Seduction tem diferencial real vs categoria? |
| **Gate 4** | Pré-lançamento | Pagamentos, moderação, consentimento, logs, backup, suporte, estabilidade |

CNPJ e contratos formais: **após Gate 1**; janela recomendada até Gate 2.

---

## 5. Fase 2 — critérios de aceite (resumo)

**Data:** 20/09/2027 · **Bolsa:** R$ 500 · **Responsável:** Empresa do Marcos (PJ)

Obrigatório:

1. Mesma identidade em múltiplos ângulos/luzes/expressões/atributos (mãos, unhas, pés, pele, corpo).
2. Entrega documentada: stack, GPU/VPS, custo por imagem/vídeo, tempo, taxa de falha, limitações.
3. Anti-deepfake: bloquear rosto real sem consentimento; recusar aparência juvenil.
4. Benchmark HeyGen (Future) + reprodução de fluxo de vídeo de nicho (~1:30) com custo/tempo registrados.
5. Avaliação §11 (médias mínimas por categoria; ≥3 avaliadores).

Uma imagem isolada **não** aprova a Fase 2.

---

## 6. Regras de execução para o time técnico

1. **Future-first:** qualquer conflito de capacidade prioriza o caminho B2B até Gate 2.
2. **Bloco §4:** só expandir; nunca remover/diluir.
3. **Orquestração > treino:** preferir provedores/APIs roteados pelo Cérebro Astra.
4. **Dois produtos:** não misturar branding/pagamento/ToS públicos; motor pode ser compartilhado.
5. **Não iniciar Fase 2** sem aceite explícito deste plano e liberação da bolsa.
6. Landing/marketing até Gate 2: pricing e copy alinhados ao SSOT; sem prometer motor real já pronto.

---

## 7. Próximo passo imediato

1. Geison / Jonny / Marcos **aceitam** este plano.  
2. Até 20/09/2027: preparação de stack, provedores candidatos e protocolo de bateria (sem cobrança de Fase 2).  
3. Na data: executar e entregar o dossiê do Gate 1.
