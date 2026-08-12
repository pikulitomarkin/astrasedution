'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components';
import { GenerationWizard } from '@/components/creator-wizard';

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
