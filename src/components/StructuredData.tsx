/**
 * Schema.org JSON-LD Structured Data Component
 * Alinhado ao SSOT Retomada V1 (Future + Seduction).
 */

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astra',
    description:
      'Astra Future (digital twins B2B) e Astra Seduction (realismo adulto sintético) — identidades digitais persistentes.',
    url: 'https://astrasedution.com',
    logo: 'https://astrasedution.com/logo-astra.png',
    sameAs: [
      'https://twitter.com/astraseduction',
      'https://instagram.com/astraseduction',
      'https://facebook.com/astraseduction',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'suporte@astrasedution.com',
      availableLanguage: ['Portuguese', 'English', 'Spanish'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Astra Future + Astra Seduction',
    url: 'https://astrasedution.com',
    description:
      'Plataforma de identidades digitais persistentes. Future-first vs HeyGen; Seduction para realismo adulto profissional.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://astrasedution.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Astra Future',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: [
      {
        '@type': 'Offer',
        price: '0.00',
        priceCurrency: 'BRL',
        name: 'Trial',
        description: 'Marca d\'água, 15 imagens, 1 vídeo 720p',
      },
      {
        '@type': 'Offer',
        price: '49.00',
        priceCurrency: 'BRL',
        name: 'Individual',
        description: '1 Twin, HD, sem marca d\'água — US$ 10/mês',
      },
      {
        '@type': 'Offer',
        price: '89.00',
        priceCurrency: 'BRL',
        name: 'Profissional',
        description: '5 Twins, vídeos em lote, voz — US$ 19/mês',
      },
      {
        '@type': 'Offer',
        price: '199.00',
        priceCurrency: 'BRL',
        name: 'Agência/Corp',
        description: 'Twins ilimitados, API, multi-usuário — US$ 39/mês',
      },
    ],
  };

  const seductionOffersSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Astra Seduction',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    offers: [
      {
        '@type': 'Offer',
        price: '59.00',
        priceCurrency: 'BRL',
        name: 'Básico',
        description: 'Alta resolução, 1 personagem — US$ 12/mês',
      },
      {
        '@type': 'Offer',
        price: '119.00',
        priceCurrency: 'BRL',
        name: 'Premium',
        description: 'Unhas/pés avançados, 3 personagens — US$ 24/mês',
      },
      {
        '@type': 'Offer',
        price: '199.00',
        priceCurrency: 'BRL',
        name: 'Creator Studio',
        description: 'Vídeos, uso comercial — US$ 39/mês',
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://astrasedution.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Planos',
        item: 'https://astrasedution.com/#pricing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Creator Wizard',
        item: 'https://astrasedution.com/create',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seductionOffersSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
