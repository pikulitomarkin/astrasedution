'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { verifyEmailToken } from '@/lib/api';

function VerificarContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, status, accessToken, refreshProfile, resendVerification } = useAuth();
  const token = searchParams.get('token');
  const pending = searchParams.get('pending') === '1';

  const [verifyState, setVerifyState] = useState<'idle' | 'loading' | 'success' | 'error'>(
    token ? 'loading' : 'idle'
  );
  const [verifyMessage, setVerifyMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (!token) return;

    let cancelled = false;
    (async () => {
      try {
        const result = await verifyEmailToken(token);
        if (cancelled) return;
        setVerifyState('success');
        setVerifyMessage(result.message);
        await refreshProfile();
      } catch (err) {
        if (cancelled) return;
        setVerifyState('error');
        setVerifyMessage(err instanceof Error ? err.message : 'Falha na verificação');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, refreshProfile]);

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    try {
      const msg = await resendVerification();
      setResendMessage(msg);
    } catch (err) {
      setResendMessage(err instanceof Error ? err.message : 'Erro ao reenviar');
    } finally {
      setResendLoading(false);
    }
  };

  const showPending = pending || (status === 'authenticated' && user && !user.email_verified);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        <motion.div
          className="glass-panel border border-gold-light/20 rounded-2xl p-8 backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient mb-4">
              <Mail className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-playfair">
              Verificação de Email
            </h1>
          </div>

          {token && verifyState === 'loading' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-glow mx-auto mb-4" />
              <p className="text-zinc-400">Validando seu email...</p>
            </div>
          )}

          {token && verifyState === 'success' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-emerald-300 text-sm">{verifyMessage}</p>
              </div>
              <button
                onClick={() => router.push('/create')}
                className="w-full gold-gradient text-black font-semibold py-3 rounded-lg"
              >
                Ir para o Criador
              </button>
            </div>
          )}

          {token && verifyState === 'error' && (
            <div className="space-y-6">
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{verifyMessage}</p>
              </div>
              {status === 'authenticated' && (
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="w-full border border-gold-light/30 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                  Reenviar email
                </button>
              )}
            </div>
          )}

          {!token && showPending && (
            <div className="space-y-6">
              <p className="text-zinc-400 text-center text-sm">
                Enviamos um link de confirmação para{' '}
                <span className="text-white font-medium">{user?.email}</span>.
                Verifique sua caixa de entrada e spam.
              </p>
              {resendMessage && (
                <p className="text-sm text-center text-brand-glow">{resendMessage}</p>
              )}
              <button
                onClick={handleResend}
                disabled={resendLoading || !accessToken}
                className="w-full border border-gold-light/30 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${resendLoading ? 'animate-spin' : ''}`} />
                Reenviar email de verificação
              </button>
              <Link href="/" className="block text-center text-sm text-zinc-500 hover:text-white">
                Voltar para a home
              </Link>
            </div>
          )}

          {!token && !showPending && status !== 'loading' && (
            <div className="text-center space-y-4">
              <p className="text-zinc-400 text-sm">
                Use o link enviado por email ou faça login para reenviar a verificação.
              </p>
              <Link href="/login" className="text-gold-primary hover:text-gold-light font-semibold">
                Ir para login
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function VerificarPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <VerificarContent />
    </Suspense>
  );
}
