import { useMemo } from 'react';
import JsonLd from './JsonLd';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE } from '../../constants/seo';

/** Organization + WebSite schema on every public page */
export default function SiteJsonLd() {
  const data = useMemo(
    () => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: SITE_DESCRIPTION,
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en-IN',
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
        '@type': 'Store',
        '@id': `${SITE_URL}/#store`,
        name: SITE_NAME,
        url: SITE_URL,
        image: DEFAULT_OG_IMAGE,
        description: SITE_DESCRIPTION,
        priceRange: '₹₹',
        servesCuisine: 'Sun-dried foods',
        areaServed: ['IN', 'AE', 'SA', 'QA', 'KW', 'US', 'GB', 'CA', 'AU'],
      },
    ],
    }),
    []
  );

  return <JsonLd data={data} />;
}
