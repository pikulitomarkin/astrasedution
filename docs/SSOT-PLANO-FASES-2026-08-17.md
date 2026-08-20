# Plano de implementação — SSOT Marcos 17/08/2026

**Documento de trabalho interno**  
**Fonte:** SSOT Técnico Obrigatório (AstraFutureSeduction) — versão 17/08/2026  
**Status:** Fase 1 aprovada (Geison + Grok). **Não iniciar Fase 2 até este plano ser aceito.**  
**Metas:** 12 fases técnicas até **30/11/2026** · lançamento público da 1ª versão completa até **31/12/2026**

---

## 1. Visão alinhada ao SSOT

| Pilar | Diretriz |
|-------|----------|
| Produto | Um único site; dois modos pós-login: **Twin (profissional)** e **Seduction (premium adulto)** |
| Comunicação pública | Home sempre limpa, sofisticada, **nunca vulgar**; adulto só após login + escolha de modo |
| Coração técnico | Detalhismo máximo de identidade (rosto, pele, corpo, unhas/pés prioridade máxima, tatuagens, cabelo, maquiagem, acessórios, íntimos, consistência temporal) |
| Segurança | Anti-deepfake a partir da Fase 2; UI de regras a partir da Fase 3 (consentimento Twin, bloqueio undress/face-swap de terceiros, proibição de aparência &lt;18) |
| Pagamento de fase | R$ 500 / fase — só após aprovação Geison + Grok |
| Prioridade | Qualidade / detalhismo / segurança **acima** de velocidade |

### Preços (site atual = SSOT)

- Standard R$ 49/mês · Premium R$ 149/mês · Deluxe R$ 399/mês  
- Mesmos planos para os dois modos no início

### Marketing até 30/11/2026

Marketing mínimo. Foco total em produto.

---

## 2. Estado atual vs SSOT (baseline 20/08/2026)

### Concluído (Fase 1 + extras já em produção)

| Item | Estado |
|------|--------|
| Auth JWT (register / login / refresh) | ✅ |
| Verificação de email + Resend (`noreply@astrasedution.com`) | ✅ |
| Reset / troca de senha | ✅ |
| Dashboard + créditos Free (3) | ✅ |
| Teaser watermarked (Pillow stub) + galeria | ✅ |
| Waitlist + admin | ✅ |
| Recarga welcome +1000 créditos (stub `PAYMENT_MODE=instant`) | ✅ |
| Deploy VPS Docker (api + app + db + nginx HTTPS) | ✅ |
| i18n pt / en / es | ✅ |
| Landing pricing Standard / Premium / Deluxe | ✅ |
| Header logado: só manequim de perfil | ✅ |

### Lacunas críticas (impedem “Fase 2 done”)

| Lacuna | Impacto |
|--------|---------|
| Geração ainda é **stub Pillow** | Sem motor real |
| Sem modelo **Identity** / seed persistente | Sem consistência básica |
| Sem escolha **Twin vs Seduction** pós-login | Arquitetura de produto incompleta |
| Sem pipeline anti-deepfake / ToS / bloqueios | Fora do SSOT §5 |
| Wizard UI não grava params no backend | Customização só cosmética |
| Sem gateway de pagamento real | Monetização stub |

---

## 3. Calendário das 12 fases (SSOT)

| Fase | Entrega | Tema | Status |
|------|---------|------|--------|
| **1** | — | Base do sistema | ✅ Aprovada / paga |
| **2** | **29/08/2026** | Motor real + consistência básica + anti-deepfake base | 🔲 Próxima |
| **3** | 12/09/2026 | Wizard + customização detalhada (corpo, rosto, unhas, pés, acessórios) | 🔲 |
| **4** | 26/09/2026 | Customização avançada + física corporal + texturas de pele | 🔲 |
| **5** | 10/10/2026 | Modo Twin + vídeos falantes básicos | 🔲 |
| **6** | 24/10/2026 | Hot master solo (altíssimo detalhismo) | 🔲 |
| **7** | 07/11/2026 | Multi-person básico + interação sensual | 🔲 |
| **8** | 14/11/2026 | Hot master multi-person (shemales / homens) | 🔲 |
| **9** | 21/11/2026 | Vídeos fluidos + consistência forte | 🔲 |
| **10** | 25/11/2026 | Biblioteca pessoal + evolução de identidades | 🔲 |
| **11** | 28/11/2026 | Monetização completa + versão EN | 🔲 |
| **12** | 30/11/2026 | Expansão de idiomas + refinamentos finais | 🔲 |

Fases 13+ (2027): voz / lip-sync / HeyGen parity — fora do escopo deste plano até Fase 12.

---

## 4. Princípios de execução

1. **Uma fase por vez** — aceite Geison/Grok antes de avançar.  
2. **DoD escrito** por fase (abaixo) + smoke/E2E + PDF/checklist de aceite.  
3. **Sem vulgaridade na home**; modo Seduction só pós-login.  
4. **Créditos** debitados só em job de geração bem-sucedido (ou política explícita documentada).  
5. **Segurança** nunca adiada: cada fase que toca upload/geração reforça §5.  
6. Deploy contínuo na VPS (`astrasedution.com`) após DoD interno.

---

## 5. Lista de tarefas por fase

### Fase 1 — Base (concluída)

- [x] Auth JWT + bcrypt  
- [x] Verificação email  
- [x] Dashboard + Free 3 créditos  
- [x] Teaser watermarked  
- [x] Waitlist  
- [x] Deploy VPS + aceite  

---

### Fase 2 — Motor real + consistência básica + anti-deepfake base  
**Entrega: 29/08/2026** · **Ordem imediata do SSOT**

#### 2.1 Infra do motor
- [ ] Definir stack do worker (ComfyUI + Flux/SDXL ou equivalente aprovado)  
- [ ] Serviço Docker `generation-worker` (GPU ou fila remota documentada)  
- [ ] Volume/S3 para artefatos + referências de identidade  
- [ ] Healthcheck do worker + métricas básicas (fila, falhas)

#### 2.2 API / jobs
- [ ] Modelo `GenerationJob` (queued / running / succeeded / failed)  
- [ ] `POST /generate` assíncrono (substitui teaser sync como caminho principal)  
- [ ] `GET /generate/{id}` (status + URL da imagem)  
- [ ] Debitar crédito **somente** em sucesso (ou hold+release documentado)  
- [ ] Rate limit e timeout de job  
- [ ] Manter teaser Free watermarked como fallback/demo se worker down (flag)

#### 2.3 Consistência básica de identidade
- [ ] Modelo `Identity` (user_id, nome, seed, refs, created_at)  
- [ ] Criar identidade a partir de 1–N imagens sintéticas ou seed inicial  
- [ ] Pipeline face-ID / IP-Adapter (ou equivalente) + seed fixo  
- [ ] Gerar ≥2 imagens da mesma Identity com similaridade facial aceitável (critério Geison/Grok)  
- [ ] Persistência: reutilizar Identity em novas gerações

#### 2.4 Anti-deepfake (base — SSOT §5)
- [ ] Aceite de Termos (flag `tos_accepted_at` no user) no fluxo pós-cadastro / 1ª geração  
- [ ] Bloquear endpoints de undress / face-swap de terceiros (não implementar essas features)  
- [ ] Validação servidor: idade mínima declarada ≥18; rejeitar prompts/params de aparência infantil  
- [ ] Watermark + metadados (user_id, job_id, identity_id, timestamp) em outputs  
- [ ] Logs de geração auditáveis  
- [ ] Placeholder Twin: campo/consentimento “vídeo próprio” (UI mínima; fluxo completo na Fase 5)  
- [ ] Política: Modo Seduction prioriza personagens **sintéticos**; upload de foto real de terceiro para sexual → bloqueado

#### 2.5 Produto / UX mínima
- [ ] Tela pós-login: escolha **Modo Twin** vs **Modo Seduction** (routing/flag `active_mode`)  
- [ ] Dashboard mostra Identity + últimas gerações reais  
- [ ] Mensagens de erro claras (fila, NSFW policy, créditos)

#### 2.6 Aceite Fase 2
- [ ] E2E: register → verify → ToS → criar Identity → 2 gerações consistentes → 3ª debita crédito  
- [ ] Checklist PDF/MD de aceite  
- [ ] Deploy produção + revisão Geison/Grok  

**DoD Fase 2:** motor real em produção; Identity reutilizável com consistência facial básica demonstrável; anti-deepfake base ativo; escolha Twin/Seduction pós-login.

---

### Fase 3 — Wizard + customização detalhada  
**Entrega: 12/09/2026**

- [ ] Wizard ligado ao backend (params → prompt compiler → job)  
- [ ] Controles: etnia/idade (≥18), rosto básico, pele, cabelo, maquiagem  
- [ ] Unhas (mãos/pés) — variedade inicial forte (formatos longos / extra-longos)  
- [ ] Pés (anatomia básica + poses)  
- [ ] Acessórios iniciais (joias, óculos)  
- [ ] Preview intermediário (baixa res) opcional  
- [ ] UI de segurança visível (ToS, avisos anti-deepfake, banimento)  
- [ ] Modo Seduction: UI premium (não vulgar); Twin: visual ferramenta profissional  
- [ ] Aceite: gerar identidade customizada via wizard ponta a ponta  

**DoD Fase 3:** wizard produz gerações reais com params persistidos; unhas/pés com opções demonstráveis; regras §5 na UI.

---

### Fase 4 — Customização avançada + física + pele  
**Entrega: 26/09/2026**

- [ ] Proporções corporais avançadas (seios, cintura, quadril, glúteos, membros)  
- [ ] Física corporal básica (queda/movimento em poses)  
- [ ] Texturas de pele (poros, subtons, suor/brilho)  
- [ ] Tatuagens / piercings posicionáveis  
- [ ] Cabelo avançado (textura, mechas, frizz)  
- [ ] Maquiagem reativa à luz (melhoria de prompts/LoRAs)  
- [ ] Aceite: side-by-side antes/depois de física/pele  

**DoD Fase 4:** controle corporal avançado + pele realista em gerações estáveis.

---

### Fase 5 — Modo Twin + vídeos falantes básicos  
**Entrega: 10/10/2026**

- [ ] Fluxo Twin completo: upload + **consentimento em vídeo** da própria pessoa  
- [ ] Validação/armazenamento do consentimento  
- [ ] Geração Twin (clonagem visual básica)  
- [ ] Pipeline vídeo falante básico (TTS + lip-sync inicial — qualidade “utilizável”, não HeyGen-level)  
- [ ] Biblioteca Twin do usuário  
- [ ] Separação clara UX Twin vs Seduction  
- [ ] Aceite: Twin com consentimento + 1 vídeo falante curto  

**DoD Fase 5:** Twin comercializável em versão básica com consentimento obrigatório.

---

### Fase 6 — Hot master solo  
**Entrega: 24/10/2026**

- [ ] Pipeline Seduction solo de altíssimo detalhismo (íntimos, fluidos, expressões)  
- [ ] Qualidade paritária para variações anatômicas previstas no SSOT (cis F/M, shemale — solo)  
- [ ] Guardrails: sintético-first; bloqueio upload sexual de terceiros  
- [ ] Aceite: set de imagens solo “master” aprovado por Geison/Grok  

**DoD Fase 6:** qualidade solo no padrão SSOT §4 (detalhes íntimos), com segurança.

---

### Fase 7 — Multi-person básico  
**Entrega: 07/11/2026**

- [ ] Cenas 2 pessoas com composição básica  
- [ ] Interação sensual básica (poses, proximidade)  
- [ ] Consistência de cada Identity na cena  
- [ ] Aceite: 2 identidades reconhecíveis na mesma imagem  

**DoD Fase 7:** multi-person básico estável.

---

### Fase 8 — Hot master multi-person completo  
**Entrega: 14/11/2026**

- [ ] Multi-person completo (incluindo shemales e homens no mesmo nível de qualidade)  
- [ ] Sincronização corporal / cenas mais complexas  
- [ ] Aceite: pack multi-person master  

**DoD Fase 8:** multi-person completo aprovado.

---

### Fase 9 — Vídeos fluidos + consistência forte  
**Entrega: 21/11/2026**

- [ ] Geração de vídeo com motion mais fluido  
- [ ] Consistência facial/corporal forte frame a frame  
- [ ] Otimização tempo/custo de render  
- [ ] Aceite: vídeo curto (ex. 3–8s) sem quebra grave de identidade  

**DoD Fase 9:** vídeo fluido com Identity estável.

---

### Fase 10 — Biblioteca pessoal + evolução  
**Entrega: 25/11/2026**

- [ ] Biblioteca de Identities (CRUD, favoritos, tags)  
- [ ] Evolução controlada (cabelo, tatuagem, peso sutil) sem perder base  
- [ ] Versionamento de Identity  
- [ ] Aceite: evoluir Identity e gerar mantendo reconhecimento  

**DoD Fase 10:** biblioteca + evolução temporal funcionando.

---

### Fase 11 — Monetização completa + EN  
**Entrega: 28/11/2026**

- [ ] Gateway real (Pix/Stripe ou aprovado)  
- [ ] Assinaturas Standard / Premium / Deluxe  
- [ ] Webhooks, faturas, cancelamento  
- [ ] Quotas por plano alinhadas aos créditos  
- [ ] EN completo (copy, emails, legal)  
- [ ] Aceite: compra real de plano + cobrança + acesso  

**DoD Fase 11:** monetização real + EN utilizável.

---

### Fase 12 — Idiomas + refinamentos  
**Entrega: 30/11/2026**

- [ ] Expandir idiomas além de pt/en/es (priorizar lista Geison)  
- [ ] Hardening, performance, UX polish  
- [ ] Auditoria segurança anti-deepfake final  
- [ ] Checklist lançamento 31/12/2026  
- [ ] Aceite: release candidate da 1ª versão completa  

**DoD Fase 12:** RC pronta para lançamento público.

---

## 6. Dependências técnicas sugeridas (Fase 2)

```
Next.js (app) ──► FastAPI (api) ──► Redis/fila ──► generation-worker (ComfyUI/Flux)
                      │
                      ├── PostgreSQL (users, identities, jobs, credits)
                      └── Storage (local volume / S3)
```

| Componente | Papel |
|------------|--------|
| `Identity` | Seed + refs + metadados de consistência |
| `GenerationJob` | Estado assíncrono da geração |
| Worker | Inferência real + face consistency |
| Policy layer | ToS, idade, bloqueio upload sexual de terceiros |

---

## 7. Critérios de reprovação (SSOT §10)

A fase será reprovada se:

- Detalhismo abaixo do exigido para o escopo da fase  
- Regras de segurança anti-deepfake incompletas ou burlação fácil  
- Home/vulgaridade na comunicação pública  

---

## 8. Ordem de trabalho imediata (após aceite deste plano)

1. ~~Alinhar fases e publicar este plano~~ ← **este documento**  
2. Confirmar com Marcos/Geison: stack do worker (GPU VPS vs API externa)  
3. Iniciar **somente Fase 2** com branch `cursor/fase2-motor-identidade-205f`  
4. Entregar DoD Fase 2 até **29/08/2026**

---

## 9. Riscos e mitigações

| Risco | Mitigação |
|-------|-----------|
| VPS sem GPU suficiente | Worker remoto / RunPod / API; documentar custo |
| Consistência facial fraca | Face-ID + seed + teste A/B com Geison cedo |
| Escopo adulto atrasa segurança | Policy layer na Fase 2, não na 6 |
| Gateway atrasa Fase 11 | Manter stub até Fase 11; não bloquear 2–10 |
| Wizard atual desconectado | Fase 3 amarra UI→API; Fase 2 usa Identity mínima |

---

## 10. Artefatos por fase (padrão)

Cada fase deve entregar:

1. Código + PR  
2. Deploy em `astrasedution.com`  
3. Script smoke/E2E  
4. `deploy/FASE{N}-ACEITE.md` (+ PDF se solicitado)  
5. Aprovação Geison + Grok registrada  

---

*Gerado a partir do SSOT 17/08/2026. Alterações futuras só com nova versão explícita do SSOT.*
