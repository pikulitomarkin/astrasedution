'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components';
import { GenerationWizard } from '@/components/creator-wizard';
import { Mail, AlertCircle } from 'lucide-react';

export default function CreatePage() {
  const { user, status } = useAuth();
  const router = useRouter();

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
              href="/verificar?pending=1"
              className="block w-full gold-gradient text-black font-semibold py-3 rounded-lg"
            >
              Ir para verificação
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleWizardComplete = (values: Record<string, number>) => {
    console.log('Wizard completado com valores:', values);
    alert(
      `Criação finalizada! ${Object.keys(values).length} parâmetros configurados. Créditos restantes: ${user.credits}`
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <GenerationWizard onComplete={handleWizardComplete} />
    </div>
  );
}
