import { Language } from '@/contexts/LanguageContext';

export interface Translations {
  common: {
    startNow: string;
    freeGenerations: string;
    vipAccess: string;
    myCreator: string;
    logout: string;
    login: string;
    signup: string;
    backToHome: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    invalidCredentials: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loginHere: string;
    signupHere: string;
    minimumChars: string;
    benefits: string;
    freeCredits: string;
    highResExport: string;
    exclusiveStyles: string;
  };
  navigation: {
    home: string;
    features: string;
    technology: string;
    pricing: string;
    contact: string;
  };
  hero: {
    extremeRealismTechnology: string;
    digitalSeduction: string;
    extremeRealism: string;
    subtitle1: string;
    subtitle2: string;
    example: string;
    demo: string;
    startNow: string;
    stats: {
      resolution: string;
      customizations: string;
      realism: string;
    };
  };
  features: {
    exclusiveTechnology: string;
    discoverFeatures: string;
    advancedAI: string;
    advancedAIDesc: string;
    maximumSecurity: string;
    maximumSecurityDesc: string;
    premiumDesign: string;
    premiumDesignDesc: string;
    globalScale: string;
    globalScaleDesc: string;
    performance: string;
    performanceDesc: string;
    compliance: string;
    complianceDesc: string;
  };
  cta: {
    readyForDigitalRevolution: string;
    joinThousands: string;
    getFreeCredits: string;
    creditsGeneration: string;
    noCommitment: string;
    support: string;
  };
  pricing: {
    plansAndPrices: string;
    chooseYourCreativePower: string;
    flexiblePlans: string;
    forBeginners: string;
    mostPopular: string;
    vipExperience: string;
    monthly: string;
    creditsMonth: string;
    features: {
      generationsMonthly: string;
      hdResolution: string;
      emailSupport: string;
      basicStyleLibrary: string;
      pngExport: string;
      ultraHdResolution: string;
      prioritySupport: string;
      completeStyleLibrary: string;
      multipleExportFormats: string;
      apiAccess: string;
      watermarkRemover: string;
      vipSupport: string;
      earlyAccess: string;
      premiumLibrary: string;
      unlimitedApi: string;
      resolution8k: string;
      personalizedTraining: string;
      oneOnOneConsulting: string;
    };
    includes: string;
    cancelAnytime: string;
    noHiddenFees: string;
    securePayment: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signupTitle: string;
    signupSubtitle: string;
    loggingIn: string;
    creatingAccount: string;
    createAccount: string;
    exclusiveAccess: string;
    creatorAccess: string;
    realTimePreview: string;
    emailPlaceholder: string;
    namePlaceholder: string;
  };
  waitlist: {
    title: string;
    subtitle: string;
    nameOptional: string;
    join: string;
    errorGeneric: string;
  };
  dashboard: {
    vipPanel: string;
    hello: string;
    tagline: string;
    confirmEmail: string;
    verifyToUnlock: string;
    verifyNow: string;
    currentPlan: string;
    freeTeasers: string;
    premiumActive: string;
    creditsLeft: string;
    ofFreePlan: string;
    accountStatus: string;
    active: string;
    pendingVerification: string;
    readyToCreate: string;
    awaitingEmail: string;
    generationsCreated: string;
    generateTeaser: string;
    generateHint: string;
    generateImage: string;
    generating: string;
    verifyToGenerate: string;
    noCredits: string;
    yourGenerations: string;
    noImagesYet: string;
    styleLifestyle: string;
    styleGolden: string;
    styleStudio: string;
    credit: string;
    credits: string;
  };
  floating: {
    create: string;
    freeAvailable: string;
  };
  recommended: string;
}

const translations: Record<Language, Translations> = {
  en: {
    common: {
      startNow: 'Start Now',
      freeGenerations: 'Free Generations',
      vipAccess: 'VIP Access',
      myCreator: 'My Creator',
      logout: 'Logout',
      login: 'Login',
      signup: 'Sign Up',
      backToHome: '← Back to home',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      name: 'Name',
      invalidCredentials: 'Invalid email or password',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: 'Don\'t have an account?',
      loginHere: 'Log in here',
      signupHere: 'Sign up here',
      minimumChars: 'Minimum 6 characters',
      benefits: 'VIP Benefits',
      freeCredits: '1,000 free generation credits',
      highResExport: 'High resolution export',
      exclusiveStyles: 'Exclusive style library',
    },
    navigation: {
      home: 'Home',
      features: 'Features',
      technology: 'Technology',
      pricing: 'Pricing',
      contact: 'Contact',
    },
    hero: {
      extremeRealismTechnology: 'EXTREME REALISM TECHNOLOGY',
      digitalSeduction: 'Digital Seduction',
      extremeRealism: 'Extreme Realism',
      subtitle1: 'Where artificial intelligence meets the art of seduction.',
      subtitle2: 'Create virtual companions with photo-realistic details impossible to distinguish.',
      example: 'Example of',
      demo: 'DEMO',
      startNow: 'Start Now',
      stats: {
        resolution: 'Ultra HD Resolution',
        customizations: 'Customizations',
        realism: 'Visual Realism',
      },
    },
    features: {
      exclusiveTechnology: 'Exclusive Technology',
      discoverFeatures: 'Discover the features that make AstraFutureSeduction the most advanced AI platform on the market.',
      advancedAI: 'Advanced AI',
      advancedAIDesc: 'State-of-the-art machine learning algorithms for precise and instant results.',
      maximumSecurity: 'Maximum Security',
      maximumSecurityDesc: 'End-to-end encryption and enterprise security protocols.',
      premiumDesign: 'Premium Design',
      premiumDesignDesc: 'Cyber-luxury interface with glassmorphism elements and fluid animations.',
      globalScale: 'Global Scale',
      globalScaleDesc: 'Globally distributed infrastructure for minimal latency and high availability.',
      performance: 'Performance',
      performanceDesc: 'Real-time processing optimized for high-performance devices.',
      compliance: 'Compliance',
      complianceDesc: 'Fully compliant with GDPR, HIPAA and other international regulations.',
    },
    cta: {
      readyForDigitalRevolution: 'Ready for the Digital Revolution?',
      joinThousands: 'Join thousands of visionaries who are already transforming their businesses with luxury AI.',
      getFreeCredits: 'Get 1,000 generation credits and VIP Creator access through login',
      creditsGeneration: '1,000 generation credits • No commitment • 24/7 Support',
      noCommitment: 'No commitment',
      support: '24/7 Support',
    },
    pricing: {
      plansAndPrices: 'PLANS AND PRICES',
      chooseYourCreativePower: 'Choose Your Creative Power',
      flexiblePlans: 'Flexible plans for all levels. Start with Standard and scale as your creativity grows.',
      forBeginners: 'For Beginners',
      mostPopular: 'Most Popular',
      vipExperience: 'VIP Experience',
      monthly: '/month',
      creditsMonth: 'credits/month',
      features: {
        generationsMonthly: 'generations monthly',
        hdResolution: 'HD Resolution (1080p)',
        emailSupport: 'Email support',
        basicStyleLibrary: 'Basic style library',
        pngExport: 'PNG export',
        ultraHdResolution: 'Ultra HD Resolution (4K)',
        prioritySupport: 'Priority support 24/7',
        completeStyleLibrary: 'Complete style library',
        multipleExportFormats: 'Export in PNG, JPEG, WebP',
        apiAccess: 'API access',
        watermarkRemover: 'Watermark remover',
        vipSupport: 'VIP dedicated support',
        earlyAccess: 'Early access to new features',
        premiumLibrary: 'Premium exclusive library',
        unlimitedApi: 'Unlimited API',
        resolution8k: 'Resolução 8K',
        personalizedTraining: 'Personalized AI training',
        oneOnOneConsulting: '1-on-1 consulting',
      },
      includes: 'All plans include end-to-end encryption and specialized technical support',
      cancelAnytime: 'Cancel anytime • No hidden fees • Secure payment',
      noHiddenFees: 'No hidden fees',
      securePayment: 'Secure payment',
    },
    auth: {
      loginTitle: 'VIP Access',
      loginSubtitle: 'Enter your exclusive creation panel',
      signupTitle: 'VIP Sign Up',
      signupSubtitle: 'Create your account to access the exclusive creator',
      loggingIn: 'Signing in...',
      creatingAccount: 'Creating account...',
      createAccount: 'Create account',
      exclusiveAccess: 'Exclusive access to the AstraFuture Model Creator',
      creatorAccess: 'Exclusive access to the Model Creator',
      realTimePreview: 'Real-time AI preview',
      emailPlaceholder: 'you@email.com',
      namePlaceholder: 'Your name',
    },
    waitlist: {
      title: 'Early Access VIP List',
      subtitle: 'Leave your email and be the first to know when new seats and premium features open.',
      nameOptional: 'Name (optional)',
      join: 'Join the VIP Waitlist',
      errorGeneric: 'Could not join the waitlist',
    },
    dashboard: {
      vipPanel: 'VIP Panel',
      hello: 'Hello',
      tagline: 'Generate up to {max} watermarked teaser images on the Free plan.',
      confirmEmail: 'Confirm your email',
      verifyToUnlock: 'Verify {email} to unlock free generations.',
      verifyNow: 'Verify now',
      currentPlan: 'Current plan',
      freeTeasers: '{max} teaser generations included',
      premiumActive: 'Premium benefits active',
      creditsLeft: 'Credits remaining',
      ofFreePlan: 'of {max} on Free plan',
      accountStatus: 'Account status',
      active: 'Active',
      pendingVerification: 'Pending verification',
      readyToCreate: 'Ready to create',
      awaitingEmail: 'Waiting for email confirmation',
      generationsCreated: '{count} generation(s) created',
      generateTeaser: 'Generate watermarked teaser',
      generateHint: 'Each generation uses 1 credit and produces a placeholder image with an "Astra Free" watermark. Real Flux engine arrives in Phase 2.',
      generateImage: 'Generate image',
      generating: 'Generating...',
      verifyToGenerate: 'Verify your email to generate images.',
      noCredits: 'You used your {max} Free generations. Join the waitlist for updates.',
      yourGenerations: 'Your generations',
      noImagesYet: 'No images yet. Generate your first teaser above.',
      styleLifestyle: 'Solo lifestyle',
      styleGolden: 'Golden hour',
      styleStudio: 'Studio glow',
      credit: 'credit',
      credits: 'credits',
    },
    floating: {
      create: 'Create',
      freeAvailable: '3 free generations available',
    },
    recommended: 'RECOMMENDED',
  },
  pt: {
    common: {
      startNow: 'Começar Agora',
      freeGenerations: 'Gerações Gratuitas',
      vipAccess: 'Acesso VIP',
      myCreator: 'Meu Criador',
      logout: 'Sair',
      login: 'Entrar',
      signup: 'Cadastrar',
      backToHome: '← Voltar para a página inicial',
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar Senha',
      name: 'Nome',
      invalidCredentials: 'Email ou senha inválidos',
      alreadyHaveAccount: 'Já tem uma conta?',
      dontHaveAccount: 'Não tem uma conta?',
      loginHere: 'Faça login aqui',
      signupHere: 'Cadastre-se aqui',
      minimumChars: 'Mínimo 6 caracteres',
      benefits: 'Benefícios VIP',
      freeCredits: '1.000 créditos de geração gratuitos',
      highResExport: 'Exportação em alta resolução',
      exclusiveStyles: 'Biblioteca exclusiva de estilos',
    },
    navigation: {
      home: 'Início',
      features: 'Recursos',
      technology: 'Tecnologia',
      pricing: 'Preços',
      contact: 'Contato',
    },
    hero: {
      extremeRealismTechnology: 'TECNOLOGIA DE REALISMO EXTREMO',
      digitalSeduction: 'Sedução Digital',
      extremeRealism: 'Realismo Extremo',
      subtitle1: 'Onde a inteligência artificial encontra a arte da sedução.',
      subtitle2: 'Crie companheiras virtuais com detalhes foto-realistas impossíveis de distinguir.',
      example: 'Exemplo de',
      demo: 'DEMONSTRAÇÃO',
      startNow: 'Começar Agora',
      stats: {
        resolution: 'Resolução Ultra HD',
        customizations: 'Personalizações',
        realism: 'Realismo Visual',
      },
    },
    features: {
      exclusiveTechnology: 'Tecnologia Exclusiva',
      discoverFeatures: 'Descubra os recursos que fazem da AstraFutureSeduction a plataforma de IA mais avançada do mercado.',
      advancedAI: 'IA Avançada',
      advancedAIDesc: 'Algoritmos de machine learning de última geração para resultados precisos e instantâneos.',
      maximumSecurity: 'Segurança Máxima',
      maximumSecurityDesc: 'Criptografia de ponta a ponta e protocolos de segurança empresariais.',
      premiumDesign: 'Design Premium',
      premiumDesignDesc: 'Interface ciber-luxo com elementos de glassmorphism e animações fluidas.',
      globalScale: 'Global Scale',
      globalScaleDesc: 'Infraestrutura distribuída globalmente para latência mínima e alta disponibilidade.',
      performance: 'Performance',
      performanceDesc: 'Processamento em tempo real com otimização para dispositivos de alta performance.',
      compliance: 'Conformidade',
      complianceDesc: 'Totalmente compatível com GDPR, HIPAA e outras regulamentações internacionais.',
    },
    cta: {
      readyForDigitalRevolution: 'Pronto para a Revolução Digital?',
      joinThousands: 'Junte-se a milhares de visionários que já estão transformando seus negócios com IA de luxo.',
      getFreeCredits: 'Obtenha 1.000 créditos de geração e acesso ao Criador VIP através do login',
      creditsGeneration: '1.000 créditos de geração • Sem compromisso • Suporte 24/7',
      noCommitment: 'Sem compromisso',
      support: 'Suporte 24/7',
    },
    pricing: {
      plansAndPrices: 'PLANOS E PREÇOS',
      chooseYourCreativePower: 'Escolha Seu Poder Criativo',
      flexiblePlans: 'Planos flexíveis para todos os níveis. Comece com o Standard e escale conforme sua criatividade cresce.',
      forBeginners: 'Para Iniciantes',
      mostPopular: 'Mais Popular',
      vipExperience: 'Experiência VIP',
      monthly: '/mês',
      creditsMonth: 'créditos/mês',
      features: {
        generationsMonthly: 'gerações mensais',
        hdResolution: 'Resolução HD (1080p)',
        emailSupport: 'Suporte por email',
        basicStyleLibrary: 'Biblioteca básica de estilos',
        pngExport: 'Exportação em PNG',
        ultraHdResolution: 'Resolução Ultra HD (4K)',
        prioritySupport: 'Suporte prioritário 24/7',
        completeStyleLibrary: 'Biblioteca completa de estilos',
        multipleExportFormats: 'Exportação em PNG, JPEG, WebP',
        apiAccess: 'API access',
        watermarkRemover: 'Removedor de marca d\'água',
        vipSupport: 'Suporte VIP dedicado',
        earlyAccess: 'Acesso antecipado a novos recursos',
        premiumLibrary: 'Biblioteca premium exclusiva',
        unlimitedApi: 'API ilimitada',

        resolution8k: '8K Resolution',
        personalizedTraining: 'Treinamento personalizado de IA',
        oneOnOneConsulting: 'Consultoria 1-on-1',
      },
      includes: 'Todos os planos incluem criptografia de ponta a ponta e suporte técnico especializado',
      cancelAnytime: 'Cancele a qualquer momento • Sem taxas ocultas • Pagamento seguro',
      noHiddenFees: 'Sem taxas ocultas',
      securePayment: 'Pagamento seguro',
    },
    auth: {
      loginTitle: 'Acesso VIP',
      loginSubtitle: 'Entre no seu painel de criação exclusivo',
      signupTitle: 'Cadastro VIP',
      signupSubtitle: 'Crie sua conta para acessar o criador exclusivo',
      loggingIn: 'Entrando...',
      creatingAccount: 'Criando conta...',
      createAccount: 'Criar conta',
      exclusiveAccess: 'Acesso exclusivo ao Criador de Modelos AstraFuture',
      creatorAccess: 'Acesso exclusivo ao Criador de Modelos',
      realTimePreview: 'Preview em tempo real com IA',
      emailPlaceholder: 'seu@email.com',
      namePlaceholder: 'Seu nome',
    },
    waitlist: {
      title: 'Lista VIP de Acesso Antecipado',
      subtitle: 'Deixe seu email e seja o primeiro a saber quando novas vagas e recursos premium forem liberados.',
      nameOptional: 'Nome (opcional)',
      join: 'Entrar na Waitlist VIP',
      errorGeneric: 'Erro ao entrar na waitlist',
    },
    dashboard: {
      vipPanel: 'Painel VIP',
      hello: 'Olá',
      tagline: 'Gere até {max} imagens teaser watermarked no plano Free.',
      confirmEmail: 'Confirme seu email',
      verifyToUnlock: 'Verifique {email} para liberar as gerações gratuitas.',
      verifyNow: 'Verificar agora',
      currentPlan: 'Plano atual',
      freeTeasers: '{max} gerações teaser inclusas',
      premiumActive: 'Benefícios premium ativos',
      creditsLeft: 'Créditos restantes',
      ofFreePlan: 'de {max} no plano Free',
      accountStatus: 'Status da conta',
      active: 'Ativa',
      pendingVerification: 'Pendente verificação',
      readyToCreate: 'Pronta para criar',
      awaitingEmail: 'Aguardando confirmação de email',
      generationsCreated: '{count} geração(ões) criada(s)',
      generateTeaser: 'Gerar teaser watermarked',
      generateHint: 'Cada geração consome 1 crédito e produz uma imagem placeholder com marca d\'água "Astra Free". Motor Flux real chega na Fase 2.',
      generateImage: 'Gerar imagem',
      generating: 'Gerando...',
      verifyToGenerate: 'Verifique seu email para gerar imagens.',
      noCredits: 'Você usou suas {max} gerações Free. Entre na waitlist para novidades.',
      yourGenerations: 'Suas gerações',
      noImagesYet: 'Nenhuma imagem ainda. Gere sua primeira teaser acima.',
      styleLifestyle: 'Lifestyle solo',
      styleGolden: 'Golden hour',
      styleStudio: 'Studio glow',
      credit: 'crédito',
      credits: 'créditos',
    },
    floating: {
      create: 'Criar',
      freeAvailable: '3 gerações gratuitas disponíveis',
    },
    recommended: 'RECOMENDADO',
  },
  es: {
    common: {
      startNow: 'Comenzar Ahora',
      freeGenerations: 'Generaciones Gratuitas',
      vipAccess: 'Acceso VIP',
      myCreator: 'Mi Creador',
      logout: 'Cerrar Sesión',
      login: 'Iniciar Sesión',
      signup: 'Registrarse',
      backToHome: '← Volver al inicio',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña',
      name: 'Nombre',
      invalidCredentials: 'Correo o contraseña inválidos',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      dontHaveAccount: '¿No tienes una cuenta?',
      loginHere: 'Inicia sesión aquí',
      signupHere: 'Regístrate aquí',
      minimumChars: 'Mínimo 6 caracteres',
      benefits: 'Beneficios VIP',
      freeCredits: '1,000 créditos de generación gratuitos',
      highResExport: 'Exportación en alta resolución',
      exclusiveStyles: 'Biblioteca exclusiva de estilos',
    },
    navigation: {
      home: 'Inicio',
      features: 'Características',
      technology: 'Tecnología',
      pricing: 'Precios',
      contact: 'Contacto',
    },
    hero: {
      extremeRealismTechnology: 'TECNOLOGÍA DE REALISMO EXTREMO',
      digitalSeduction: 'Seducción Digital',
      extremeRealism: 'Realismo Extremo',
      subtitle1: 'Donde la inteligencia artificial se encuentra con el arte de la seducción.',
      subtitle2: 'Crea compañeras virtuales con detalles foto-realistas imposibles de distinguir.',
      example: 'Ejemplo de',
      demo: 'DEMOSTRACIÓN',
      startNow: 'Comenzar Ahora',
      stats: {
        resolution: 'Resolución Ultra HD',
        customizations: 'Personalizaciones',
        realism: 'Realismo Visual',
      },
    },
    features: {
      exclusiveTechnology: 'Tecnología Exclusiva',
      discoverFeatures: 'Descubre las características que hacen de AstraFutureSeduction la plataforma de IA más avanzada del mercado.',
      advancedAI: 'IA Avanzada',
      advancedAIDesc: 'Algoritmos de aprendizaje automático de última generación para resultados precisos e instantáneos.',
      maximumSecurity: 'Seguridad Máxima',
      maximumSecurityDesc: 'Cifrado de extremo a extremo y protocolos de seguridad empresarial.',
      premiumDesign: 'Diseño Premium',
      premiumDesignDesc: 'Interfaz ciber-lujo con elementos de glassmorphism y animaciones fluidas.',
      globalScale: 'Escala Global',
      globalScaleDesc: 'Infraestructura distribuida globalmente para latencia mínima y alta disponibilidad.',
      performance: 'Rendimiento',
      performanceDesc: 'Procesamiento en tiempo real optimizado para dispositivos de alto rendimiento.',
      compliance: 'Cumplimiento',
      complianceDesc: 'Totalmente compatible con GDPR, HIPAA y otras regulaciones internacionales.',
    },
    cta: {
      readyForDigitalRevolution: '¿Listo para la Revolución Digital?',
      joinThousands: 'Únete a miles de visionarios que ya están transformando sus negocios con IA de lujo.',
      getFreeCredits: 'Obtén 1,000 créditos de generación y acceso VIP al Creador mediante inicio de sesión',
      creditsGeneration: '1,000 créditos de generación • Sin compromiso • Soporte 24/7',
      noCommitment: 'Sin compromiso',
      support: 'Soporte 24/7',
    },
    pricing: {
      plansAndPrices: 'PLANES Y PRECIOS',
      chooseYourCreativePower: 'Elige Tu Poder Creativo',
      flexiblePlans: 'Planes flexibles para todos los niveles. Comienza con Standard y escala a medida que crece tu creatividad.',
      forBeginners: 'Para Principiantes',
      mostPopular: 'Más Popular',
      vipExperience: 'Experiencia VIP',
      monthly: '/mes',
      creditsMonth: 'créditos/mes',
      features: {
        generationsMonthly: 'generaciones mensuales',
        hdResolution: 'Resolución HD (1080p)',
        emailSupport: 'Soporte por correo',
        basicStyleLibrary: 'Biblioteca básica de estilos',
        pngExport: 'Exportación en PNG',
        ultraHdResolution: 'Resolución Ultra HD (4K)',
        prioritySupport: 'Soporte prioritario 24/7',
        completeStyleLibrary: 'Biblioteca completa de estilos',
        multipleExportFormats: 'Exportación en PNG, JPEG, WebP',
        apiAccess: 'Acceso API',
        watermarkRemover: 'Removedor de marca de agua',
        vipSupport: 'Soporte VIP dedicado',
        earlyAccess: 'Acceso anticipado a nuevas funciones',
        premiumLibrary: 'Biblioteca premium exclusiva',
        unlimitedApi: 'API ilimitada',
        resolution8k: 'Resolução 8K',
        personalizedTraining: 'Entrenamiento personalizado de IA',
        oneOnOneConsulting: 'Consultoría 1 a 1',
      },
      includes: 'Todos los planes incluyen cifrado de extremo a extremo y soporte técnico especializado',
      cancelAnytime: 'Cancela en cualquier momento • Sin tarifas ocultas • Pago seguro',
      noHiddenFees: 'Sin tarifas ocultas',
      securePayment: 'Pago seguro',
    },
    auth: {
      loginTitle: 'Acceso VIP',
      loginSubtitle: 'Entra a tu panel de creación exclusivo',
      signupTitle: 'Registro VIP',
      signupSubtitle: 'Crea tu cuenta para acceder al creador exclusivo',
      loggingIn: 'Iniciando sesión...',
      creatingAccount: 'Creando cuenta...',
      createAccount: 'Crear cuenta',
      exclusiveAccess: 'Acceso exclusivo al Creador de Modelos AstraFuture',
      creatorAccess: 'Acceso exclusivo al Creador de Modelos',
      realTimePreview: 'Vista previa en tiempo real con IA',
      emailPlaceholder: 'tu@email.com',
      namePlaceholder: 'Tu nombre',
    },
    waitlist: {
      title: 'Lista VIP de Acceso Anticipado',
      subtitle: 'Deja tu email y sé el primero en saber cuando se liberen nuevas plazas y funciones premium.',
      nameOptional: 'Nombre (opcional)',
      join: 'Unirse a la Waitlist VIP',
      errorGeneric: 'Error al unirse a la waitlist',
    },
    dashboard: {
      vipPanel: 'Panel VIP',
      hello: 'Hola',
      tagline: 'Genera hasta {max} imágenes teaser con marca de agua en el plan Free.',
      confirmEmail: 'Confirma tu email',
      verifyToUnlock: 'Verifica {email} para liberar las generaciones gratuitas.',
      verifyNow: 'Verificar ahora',
      currentPlan: 'Plan actual',
      freeTeasers: '{max} generaciones teaser incluidas',
      premiumActive: 'Beneficios premium activos',
      creditsLeft: 'Créditos restantes',
      ofFreePlan: 'de {max} en el plan Free',
      accountStatus: 'Estado de la cuenta',
      active: 'Activa',
      pendingVerification: 'Verificación pendiente',
      readyToCreate: 'Lista para crear',
      awaitingEmail: 'Esperando confirmación de email',
      generationsCreated: '{count} generación(es) creada(s)',
      generateTeaser: 'Generar teaser con marca de agua',
      generateHint: 'Cada generación consume 1 crédito y produce una imagen placeholder con marca de agua "Astra Free". El motor Flux real llega en la Fase 2.',
      generateImage: 'Generar imagen',
      generating: 'Generando...',
      verifyToGenerate: 'Verifica tu email para generar imágenes.',
      noCredits: 'Usaste tus {max} generaciones Free. Únete a la waitlist para novedades.',
      yourGenerations: 'Tus generaciones',
      noImagesYet: 'Ninguna imagen aún. Genera tu primer teaser arriba.',
      styleLifestyle: 'Lifestyle solo',
      styleGolden: 'Golden hour',
      styleStudio: 'Studio glow',
      credit: 'crédito',
      credits: 'créditos',
    },
    floating: {
      create: 'Crear',
      freeAvailable: '3 generaciones gratuitas disponibles',
    },
    recommended: 'RECOMENDADO',
  },
};

export function useTranslations(language: Language): Translations {
  return translations[language];
}

export default translations;