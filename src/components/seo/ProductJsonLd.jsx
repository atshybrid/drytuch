import { useMemo } from 'react';
import JsonLd from './JsonLd';
import { SITE_URL, SITE_NAME } from '../../constants/seo';

export default function ProductJsonLd({ product }) {
  const data = useMemo(() => {
    if (!product) return null;
    return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image?.startsWith('http') ? product.image : `${SITE_URL}${product.image}`,
    sku: product.id,
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: SITE_NAME },
    },
    aggregateRating: product.rating
      ? {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 1,
        }
      : undefined,
    };
  }, [product]);

  if (!data) return null;

  return <JsonLd data={data} />;
}
