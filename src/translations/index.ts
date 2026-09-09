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
  },
};

export function useTranslations(language: Language): Translations {
  return translations[language];
}

export default translations;
