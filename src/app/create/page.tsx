'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components';
import { GenerationWizard } from '@/components/creator-wizard';
import { Mail, AlertCircle } from 'lucide-react';
import { createIdentity, runConsistencyBattery } from '@/lib/api';
import { wizardValuesToPassportAttributes } from '@/lib/wizardPassport';

const PHASE2_FLASH_KEY = 'astra_fase2_flash';

export default function CreatePage() {
  const { user, status, accessToken, refreshProfile } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-glow mx-auto mb-4" />
          <p className="text-zinc-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!user.email_verified) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[70vh] p-4">
          <div className="glass-panel border border-gold-light/20 rounded-2xl p-8 max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3 font-playfair">
              Verifique seu email
            </h2>
            <p className="text-zinc-400 text-sm mb-6">
              Para usar o criador e gerar imagens, confirme o email{' '}
              <span className="text-white">{user.email}</span>.
            </p>
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 mb-6 text-left">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-200 text-sm">
                O acesso ao criador fica bloqueado até a verificação do email (requisito da Fase 1).
              </p>
            </div>
            <Link
              href="/dashboard"
              className="block w-full border border-gold-light/30 text-white font-semibold py-3 rounded-lg mb-3 text-center"
            >
              Voltar ao Dashboard
            </Link>
            <Link
              href="/verificar?pending=1"
              className="block w-full gold-gradient text-black font-semibold py-3 rounded-lg text-center"
            >
              Ir para verificação
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleWizardComplete = async (values: Record<string, number>) => {
    if (!accessToken || saving) return;
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const attributes = wizardValuesToPassportAttributes(values);
      const apparentAge = Number(attributes.apparent_age) || 25;
      const identity = await createIdentity(accessToken, {
        name: `Twin Future ${new Date().toLocaleDateString('pt-BR')}`,
        product_line: 'future',
        tier: 'preferencial',
        apparent_age: apparentAge,
        attributes,
        consent_synthetic_only: true,
        consent_no_real_person: true,
      });

      let batteryNote = '';
      let batteryOk = false;
      try {
        // 12 variantes · 1 crédito (Gate 1) — cabe no Free (3 créditos)
        const battery = await runConsistencyBattery(accessToken, identity.id, 12);
        batteryOk = true;
        batteryNote = ` Bateria Gate 1: ${battery.success_count}/${battery.variant_count} ok · falha ${(battery.failure_rate * 100).toFixed(0)}% · ${battery.total_latency_ms}ms.`;
      } catch (batteryErr) {
        batteryNote = ` Passport salvo; bateria não rodou (${batteryErr instanceof Error ? batteryErr.message : 'erro'}).`;
      }

      await refreshProfile();
      const flash = `Identity Passport criado (${identity.id.slice(0, 8)}…) seed ${identity.seed.slice(0, 8)}.${batteryNote}`;
      setMessage(flash);
      try {
        sessionStorage.setItem(
          PHASE2_FLASH_KEY,
          JSON.stringify({
            message: flash,
            identityId: identity.id,
            batteryOk,
            at: Date.now(),
          })
        );
      } catch {
        /* ignore */
      }
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao salvar Identity Passport');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pt-6">
        <p className="text-sm text-zinc-400 mb-2">
          Fase 2 · Future-first — ao finalizar, o wizard grava um <strong className="text-white">Identity Passport</strong> e dispara a bateria de consistência.
        </p>
        {saving && <p className="text-brand-glow text-sm mb-3">Salvando passport e rodando bateria…</p>}
        {message && <p className="text-emerald-400 text-sm mb-3">{message}</p>}
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
      </div>
      <GenerationWizard onComplete={handleWizardComplete} />
    </div>
  );
}
