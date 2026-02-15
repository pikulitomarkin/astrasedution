'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from '@/components';
import { GenerationWizard } from '@/components/creator-wizard';

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Proteger rota - requer autenticação
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Loading state
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

  // Não autenticado
  if (!session) {
    return null;
  }

  // Handler para quando o wizard for completado
  const handleWizardComplete = (values: Record<string, number>) => {
    console.log('Wizard completado com valores:', values);
    // Aqui você pode:
    // 1. Enviar para API de geração de IA
    // 2. Salvar no banco de dados
    // 3. Navegar para preview/resultado
    // 4. Mostrar toast de sucesso
    alert(`Criação finalizada! ${Object.keys(values).length} parâmetros configurados.`);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <GenerationWizard onComplete={handleWizardComplete} />
    </div>
  );
}
