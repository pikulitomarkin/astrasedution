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
    trialNote: string;
    productFuture: string;
    productSeduction: string;
    recommended: string;
    monthly: string;
    features: {
      emailSupport: string;
      prioritySupport: string;
      apiAccess: string;
      vipSupport: string;
    };
    future: {
      individual: string;
      individualTagline: string;
      individualHighlight: string;
      professional: string;
      professionalTagline: string;
      professionalHighlight: string;
      agency: string;
      agencyTagline: string;
      agencyHighlight: string;
      features: {
        oneTwin: string;
        fiveTwins: string;
        unlimitedTwins: string;
        hdNoWatermark: string;
        batchVideo: string;
        voice: string;
        multiUser: string;
        identityPassport: string;
      };
    };
    seduction: {
      basic: string;
      basicTagline: string;
      basicHighlight: string;
      premium: string;
      premiumTagline: string;
      premiumHighlight: string;
      creatorStudio: string;
      creatorStudioTagline: string;
      creatorStudioHighlight: string;
      features: {
        oneCharacter: string;
        threeCharacters: string;
        highRes: string;
        nailsFeet: string;
        ageVerified: string;
        videos: string;
        commercialUse: string;
        identityPassport: string;
      };
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
      dontHaveAccount: "Don't have an account?",
      loginHere: 'Log in here',
      signupHere: 'Sign up here',
      minimumChars: 'Minimum 6 characters',
      benefits: 'VIP Benefits',
      freeCredits: 'Free trial with watermark (no card required)',
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
      discoverFeatures:
        'Discover the features that make Astra Future and Astra Seduction the most advanced identity AI platforms on the market.',
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
      getFreeCredits:
        'Start with a free trial — create an identity and generate tests with watermark, no credit card',
      creditsGeneration: 'Free trial • No commitment • 24/7 Support',
      noCommitment: 'No commitment',
      support: '24/7 Support',
    },
    pricing: {
      plansAndPrices: 'PLANS AND PRICES',
      chooseYourCreativePower: 'Choose Your Creative Power',
      flexiblePlans:
        'Two products, one engine. Astra Future first (digital twins vs HeyGen); Astra Seduction for adult synthetic realism.',
      trialNote:
        'Free trial on both lines: no card — watermarked tests before you pay. Seduction requires 18+ verification.',
      productFuture: 'Astra Future',
      productSeduction: 'Astra Seduction',
      recommended: 'RECOMMENDED',
      monthly: '/month',
      features: {
        emailSupport: 'Email support',
        prioritySupport: 'Priority support 24/7',
        apiAccess: 'API access',
        vipSupport: 'VIP dedicated support',
      },
      future: {
        individual: 'Individual',
        individualTagline: 'Entry twin for creators',
        individualHighlight: '1 Twin · HD · no watermark',
        professional: 'Professional',
        professionalTagline: 'Most popular for teams',
        professionalHighlight: '5 Twins · batch video · voice',
        agency: 'Agency / Corp',
        agencyTagline: 'Scale without limits',
        agencyHighlight: 'Unlimited twins · API · multi-user',
        features: {
          oneTwin: '1 digital twin',
          fiveTwins: '5 digital twins',
          unlimitedTwins: 'Unlimited twins',
          hdNoWatermark: 'HD without watermark',
          batchVideo: 'Batch video generation',
          voice: 'Voice / lip-sync ready',
          multiUser: 'Multi-user seats',
          identityPassport: 'Identity Passport',
        },
      },
      seduction: {
        basic: 'Basic',
        basicTagline: 'Start with one character',
        basicHighlight: '1 character · high resolution',
        premium: 'Premium',
        premiumTagline: 'Nails & feet advanced',
        premiumHighlight: '3 characters · detail control',
        creatorStudio: 'Creator Studio',
        creatorStudioTagline: 'Commercial video output',
        creatorStudioHighlight: 'Videos · commercial use',
        features: {
          oneCharacter: '1 persistent character',
          threeCharacters: '3 persistent characters',
          highRes: 'High resolution output',
          nailsFeet: 'Advanced nails & feet control',
          ageVerified: '18+ verified access',
          videos: 'Video generation',
          commercialUse: 'Commercial use license',
          identityPassport: 'Identity Passport',
        },
      },
      includes: 'All plans include encryption, audit logs roadmap and specialized technical support',
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
      freeCredits: 'Free trial com marca d\'água (sem cartão)',
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
      discoverFeatures:
        'Descubra os recursos que fazem da Astra Future e da Astra Seduction as plataformas de identidade com IA mais avançadas do mercado.',
      advancedAI: 'IA Avançada',
      advancedAIDesc: 'Algoritmos de machine learning de última geração para resultados precisos e instantâneos.',
      maximumSecurity: 'Segurança Máxima',
      maximumSecurityDesc: 'Criptografia de ponta a ponta e protocolos de segurança empresariais.',
      premiumDesign: 'Design Premium',
      premiumDesignDesc: 'Interface ciber-luxo com elementos de glassmorphism e animações fluidas.',
      globalScale: 'Escala Global',
      globalScaleDesc: 'Infraestrutura distribuída globalmente para latência mínima e alta disponibilidade.',
      performance: 'Performance',
      performanceDesc: 'Processamento em tempo real com otimização para dispositivos de alta performance.',
      compliance: 'Conformidade',
      complianceDesc: 'Totalmente compatível com GDPR, HIPAA e outras regulamentações internacionais.',
    },
    cta: {
      readyForDigitalRevolution: 'Pronto para a Revolução Digital?',
      joinThousands: 'Junte-se a milhares de visionários que já estão transformando seus negócios com IA de luxo.',
      getFreeCredits:
        'Comece com free trial — crie uma identidade e gere testes com marca d\'água, sem cartão',
      creditsGeneration: 'Free trial • Sem compromisso • Suporte 24/7',
      noCommitment: 'Sem compromisso',
      support: 'Suporte 24/7',
    },
    pricing: {
      plansAndPrices: 'PLANOS E PREÇOS',
      chooseYourCreativePower: 'Escolha Seu Poder Criativo',
      flexiblePlans:
        'Dois produtos, um motor. Astra Future em prioridade (digital twins vs HeyGen); Astra Seduction para realismo adulto sintético.',
      trialNote:
        'Free trial nas duas linhas: sem cartão — testes com marca d\'água antes de pagar. Seduction exige verificação +18.',
      productFuture: 'Astra Future',
      productSeduction: 'Astra Seduction',
      recommended: 'RECOMENDADO',
      monthly: '/mês',
      features: {
        emailSupport: 'Suporte por email',
        prioritySupport: 'Suporte prioritário 24/7',
        apiAccess: 'Acesso à API',
        vipSupport: 'Suporte VIP dedicado',
      },
      future: {
        individual: 'Individual',
        individualTagline: 'Twin de entrada para criadores',
        individualHighlight: '1 Twin · HD · sem marca d\'água',
        professional: 'Profissional',
        professionalTagline: 'Mais popular para times',
        professionalHighlight: '5 Twins · vídeo em lote · voz',
        agency: 'Agência / Corp',
        agencyTagline: 'Escala sem limites',
        agencyHighlight: 'Twins ilimitados · API · multi-usuário',
        features: {
          oneTwin: '1 digital twin',
          fiveTwins: '5 digital twins',
          unlimitedTwins: 'Twins ilimitados',
          hdNoWatermark: 'HD sem marca d\'água',
          batchVideo: 'Geração de vídeo em lote',
          voice: 'Voz / lip-sync',
          multiUser: 'Assentos multi-usuário',
          identityPassport: 'Identity Passport',
        },
      },
      seduction: {
        basic: 'Básico',
        basicTagline: 'Comece com uma personagem',
        basicHighlight: '1 personagem · alta resolução',
        premium: 'Premium',
        premiumTagline: 'Unhas e pés avançados',
        premiumHighlight: '3 personagens · controle de detalhes',
        creatorStudio: 'Creator Studio',
        creatorStudioTagline: 'Vídeo com uso comercial',
        creatorStudioHighlight: 'Vídeos · uso comercial',
        features: {
          oneCharacter: '1 personagem persistente',
          threeCharacters: '3 personagens persistentes',
          highRes: 'Saída em alta resolução',
          nailsFeet: 'Controle avançado de unhas e pés',
          ageVerified: 'Acesso verificado +18',
          videos: 'Geração de vídeo',
          commercialUse: 'Licença de uso comercial',
          identityPassport: 'Identity Passport',
        },
      },
      includes: 'Todos os planos incluem criptografia, roadmap de logs de auditoria e suporte técnico especializado',
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
      freeCredits: 'Free trial con marca de agua (sin tarjeta)',
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
      discoverFeatures:
        'Descubre las características que hacen de Astra Future y Astra Seduction las plataformas de identidad con IA más avanzadas del mercado.',
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
      getFreeCredits:
        'Empieza con free trial — crea una identidad y genera pruebas con marca de agua, sin tarjeta',
      creditsGeneration: 'Free trial • Sin compromiso • Soporte 24/7',
      noCommitment: 'Sin compromiso',
      support: 'Soporte 24/7',
    },
    pricing: {
      plansAndPrices: 'PLANES Y PRECIOS',
      chooseYourCreativePower: 'Elige Tu Poder Creativo',
      flexiblePlans:
        'Dos productos, un motor. Astra Future primero (digital twins vs HeyGen); Astra Seduction para realismo adulto sintético.',
      trialNote:
        'Free trial en ambas líneas: sin tarjeta — pruebas con marca de agua antes de pagar. Seduction requiere verificación +18.',
      productFuture: 'Astra Future',
      productSeduction: 'Astra Seduction',
      recommended: 'RECOMENDADO',
      monthly: '/mes',
      features: {
        emailSupport: 'Soporte por correo',
        prioritySupport: 'Soporte prioritario 24/7',
        apiAccess: 'Acceso API',
        vipSupport: 'Soporte VIP dedicado',
      },
      future: {
        individual: 'Individual',
        individualTagline: 'Twin de entrada para creadores',
        individualHighlight: '1 Twin · HD · sin marca de agua',
        professional: 'Profesional',
        professionalTagline: 'Más popular para equipos',
        professionalHighlight: '5 Twins · video en lote · voz',
        agency: 'Agencia / Corp',
        agencyTagline: 'Escala sin límites',
        agencyHighlight: 'Twins ilimitados · API · multi-usuario',
        features: {
          oneTwin: '1 digital twin',
          fiveTwins: '5 digital twins',
          unlimitedTwins: 'Twins ilimitados',
          hdNoWatermark: 'HD sin marca de agua',
          batchVideo: 'Generación de video en lote',
          voice: 'Voz / lip-sync',
          multiUser: 'Asientos multi-usuario',
          identityPassport: 'Identity Passport',
        },
      },
      seduction: {
        basic: 'Básico',
        basicTagline: 'Empieza con un personaje',
        basicHighlight: '1 personaje · alta resolución',
        premium: 'Premium',
        premiumTagline: 'Uñas y pies avanzados',
        premiumHighlight: '3 personajes · control de detalle',
        creatorStudio: 'Creator Studio',
        creatorStudioTagline: 'Video con uso comercial',
        creatorStudioHighlight: 'Videos · uso comercial',
        features: {
          oneCharacter: '1 personaje persistente',
          threeCharacters: '3 personajes persistentes',
          highRes: 'Salida en alta resolución',
          nailsFeet: 'Control avanzado de uñas y pies',
          ageVerified: 'Acceso verificado +18',
          videos: 'Generación de video',
          commercialUse: 'Licencia de uso comercial',
          identityPassport: 'Identity Passport',
        },
      },
      includes: 'Todos los planes incluyen cifrado, roadmap de logs de auditoría y soporte técnico especializado',
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
