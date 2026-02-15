/**
 * Schema.org JSON-LD Structured Data Component
 * Melhora SEO com dados estruturados para Google Rich Results
 */

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Astra Seduction',
    description: 'Plataforma premium de IA para criação de modelos fotorrealísticos com resolução 8K',
    url: 'https://astraseduction.com',
    logo: 'https://astraseduction.com/logo-astra.png',
    sameAs: [
      'https://twitter.com/astraseduction',
      'https://instagram.com/astraseduction',
      'https://facebook.com/astraseduction',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Suporte VIP',
      email: 'suporte@astraseduction.com',
      availableLanguage: ['Portuguese', 'English'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Astra Seduction',
    url: 'https://astraseduction.com',
    description: 'Crie modelos IA com realismo extremo. 10.000 créditos mensais, resolução 8K e suporte VIP.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://astraseduction.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Astra Seduction Creator Wizard',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    offers: [
      {
        '@type': 'Offer',
        price: '49.00',
        priceCurrency: 'BRL',
        name: 'Plano Standard',
        description: '500 créditos mensais, Resolução HD 1080p',
      },
      {
        '@type': 'Offer',
        price: '149.00',
        priceCurrency: 'BRL',
        name: 'Plano Premium',
        description: '2.000 créditos mensais, Resolução Ultra HD 4K',
      },
      {
        '@type': 'Offer',
        price: '399.00',
        priceCurrency: 'BRL',
        name: 'Plano Deluxe',
        description: '10.000 créditos mensais, Resolução 8K, Suporte VIP',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1247',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://astraseduction.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Planos',
        item: 'https://astraseduction.com/#pricing',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Creator Wizard',
        item: 'https://astraseduction.com/create',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
