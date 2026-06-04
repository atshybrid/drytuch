import { useMemo } from 'react';
import JsonLd from './JsonLd';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_DOMAIN } from '../../constants/seo';
import { SHIPPING_COUNTRIES } from '../../constants/brand';

export default function SiteJsonLd() {
  const data = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Brand',
          '@id': `${SITE_URL}/#brand`,
          name: SITE_NAME,
          alternateName: ['DRYTUCH', 'DryTuch', 'Dry Tuch', SITE_DOMAIN, 'drytuch.com'],
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          description:
            'DRYTUCH is a premium sun-dried food brand (drytuch.com). Not affiliated with Drytech or dry-touch textile/skincare products.',
          slogan: 'Premium Sun-Dried Foods',
        },
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          legalName: 'DRYTUCH',
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          description: SITE_DESCRIPTION,
          brand: { '@id': `${SITE_URL}/#brand` },
          areaServed: SHIPPING_COUNTRIES.map((name) => ({
            '@type': 'Country',
            name,
          })),
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: SITE_URL,
          name: `${SITE_NAME} — ${SITE_DOMAIN}`,
          alternateName: 'drytuch.com official store',
          description: SITE_DESCRIPTION,
          publisher: { '@id': `${SITE_URL}/#organization` },
          inLanguage: ['en', 'en-IN'],
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'OnlineStore',
          '@id': `${SITE_URL}/#store`,
          name: SITE_NAME,
          url: SITE_URL,
          image: DEFAULT_OG_IMAGE,
          description: SITE_DESCRIPTION,
          priceRange: '₹₹',
          currenciesAccepted: 'INR, USD, AED',
          areaServed: SHIPPING_COUNTRIES,
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'DRYTUCH Sun-Dried Foods',
            itemListElement: [
              { '@type': 'OfferCatalog', name: 'Dry Meat' },
              { '@type': 'OfferCatalog', name: 'Dry Vegetables' },
              { '@type': 'OfferCatalog', name: 'Dry Fruits' },
              { '@type': 'OfferCatalog', name: 'Dry Seafood' },
            ],
          },
        },
      ],
    }),
    []
  );

  return <JsonLd data={data} />;
}
