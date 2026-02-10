import { Brain, Zap, Shield } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-70"
          poster="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072"
        >
          <source
            src="/videos/astra-model-cyberluxury-bg.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-primary/20 to-gold-accent/20 px-4 py-2">
            <Zap className="h-4 w-4 text-gold-secondary" />
            <span className="text-sm font-semibold gold-gradient">
              TECNOLOGIA DE PONTA
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
            <span className="block">A Perfeição</span>
            <span className="block gold-gradient mt-2">Digital Sem Limites</span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-8 max-w-2xl text-xl text-zinc-300">
            A primeira plataforma de IA de luxo que combina inteligência artificial 
            avançada com design cibernético premium para uma experiência verdadeiramente única.
          </p>



          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="glass-effect-light mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl">
                <Brain className="h-10 w-10 text-gold-primary" />
              </div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-zinc-400">Precisão da IA</div>
            </div>
            <div className="text-center">
              <div className="glass-effect-light mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl">
                <Zap className="h-10 w-10 text-gold-primary" />
              </div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-zinc-400">Disponibilidade</div>
            </div>
            <div className="text-center">
              <div className="glass-effect-light mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl">
                <Shield className="h-10 w-10 text-gold-primary" />
              </div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-zinc-400">Segurança</div>
            </div>
            <div className="text-center">
              <div className="glass-effect-light mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl">
                <div className="text-2xl font-bold gold-gradient">AI</div>
              </div>
              <div className="text-3xl font-bold text-white">∞</div>
              <div className="text-sm text-zinc-400">Possibilidades</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute left-10 top-1/4 animate-float">
        <div className="h-32 w-32 rounded-full bg-gradient-to-r from-gold-primary/10 to-transparent blur-2xl"></div>
      </div>
      <div className="absolute right-10 bottom-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <div className="h-40 w-40 rounded-full bg-gradient-to-l from-gold-secondary/10 to-transparent blur-2xl"></div>
      </div>
    </section>
  );
}