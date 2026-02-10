'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';

export default function CadastroPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        name,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error === 'CredentialsSignin' ? 'Email já cadastrado ou credenciais inválidas' : result.error);
      } else {
        router.push('/create');
        router.refresh();
      }
    } catch {
      setError('Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md">
        {/* Glassmorphism card */}
        <div className="glass-panel border border-gold-light/20 rounded-2xl p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-gradient mb-4">
              <UserPlus className="w-8 h-8 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 font-playfair">
              Cadastro VIP
            </h1>
            <p className="text-gray-400">
              Crie sua conta para acessar o criador exclusivo
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gold-light" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/50 border border-gold-light/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Mínimo 6 caracteres
              </p>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-black font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Criando conta...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Criar Conta VIP
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gold-light/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black text-gray-400">ou</span>
              </div>
            </div>

            {/* Login link */}
            <div className="text-center">
              <p className="text-gray-400">
                Já tem uma conta?{' '}
                <Link
                  href="/login"
                  className="text-gold-primary hover:text-gold-light font-semibold transition-colors"
                >
                  Faça login aqui
                </Link>
              </p>
            </div>

            {/* VIP benefits */}
            <div className="mt-8 space-y-3">
              <h3 className="text-lg font-semibold text-gold-light text-center">
                🎁 Benefícios VIP
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
                  Acesso exclusivo ao Criador de Modelos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
                  1.000 créditos de geração gratuitos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
                  Preview em tempo real com IA
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gold-primary rounded-full"></div>
                  Exportação em alta resolução
                </li>
              </ul>
            </div>
          </form>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}