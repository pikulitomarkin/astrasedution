import { Heart, Copyright } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4 flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-primary to-gold-secondary p-1">
                <Heart className="h-5 w-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">AstraFuture</span>
                <span className="text-xs font-medium gold-gradient tracking-widest">
                  SEDUCTION
                </span>
              </div>
            </div>
            <p className="max-w-md text-center text-sm text-zinc-400 md:text-left">
              A plataforma de IA de luxo que redefine os limites da tecnologia 
              com design cibernético premium e inteligência artificial avançada.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Recursos</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Preços</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">API</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Sobre</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Carreiras</a></li>
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Privacidade</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Termos</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center text-sm text-zinc-500">
              <Copyright className="mr-2 h-4 w-4" />
              {currentYear} AstraFutureSeduction. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-zinc-400 hover:text-gold-primary transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}