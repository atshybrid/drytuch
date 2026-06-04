import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SeoHead from './SeoHead';
import SiteJsonLd from './SiteJsonLd';
import ProductJsonLd from './ProductJsonLd';
import { productService, categoryService } from '../../api';
import {
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  CATEGORY_SEO,
  keywordsForCategory,
  absoluteUrl,
  BRAND_KEYWORDS,
} from '../../constants/seo';
import { BRAND } from '../../constants/brand';

const PRIVATE_PREFIXES = ['/cart', '/checkout', '/profile', '/orders', '/wishlist', '/splash'];

export default function RouteSeo() {
  const { pathname } = useLocation();
  const productMatch = matchPath('/product/:id', pathname);
  const categoryMatch = matchPath('/categories/:slug', pathname);

  const { data: product } = useQuery({
    queryKey: ['product', productMatch?.params.id, 'seo'],
    queryFn: () => productService.getById(productMatch.params.id),
    enabled: !!productMatch?.params.id,
    staleTime: 600000,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['categories', 'seo'],
    queryFn: categoryService.getAll,
    enabled: !!categoryMatch?.params.slug,
    staleTime: 600000,
  });

  const category = categories.find((c) => c.slug === categoryMatch?.params.slug);
  const categorySeo = CATEGORY_SEO[categoryMatch?.params.slug];

  const seo = useMemo(() => {
    if (PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) {
      return { title: SITE_TITLE, description: SITE_DESCRIPTION, keywords: SITE_KEYWORDS, noindex: true };
    }

    if (product) {
      const img = product.image?.startsWith('http') ? product.image : product.image;
      return {
        title: `Buy ${product.title} — DRYTUCH.com | Sun-Dried | India UAE USA UK`,
        description: `${product.title} by DRYTUCH — ${product.description?.slice(0, 120) || 'Premium sun-dried food'}. Order at drytuch.com. Ships to India, UAE, USA, UK, Canada, Australia.`,
        keywords: [...BRAND_KEYWORDS, product.title, 'DRYTUCH online', 'sun dried food delivery'].join(', '),
        path: `/product/${product.id}`,
        image: absoluteUrl(img),
        type: 'product',
        noindex: false,
      };
    }

    if (category && categorySeo) {
      return {
        title: categorySeo.title,
        description: categorySeo.description,
        keywords: keywordsForCategory(category.slug),
        path: `/categories/${category.slug}`,
        image: absoluteUrl(category.image),
        noindex: false,
      };
    }

    if (category) {
      return {
        title: `${category.name} — DRYTUCH.com | Premium Sun-Dried`,
        description: `${category.description} Shop at DRYTUCH.com — delivery to India, UAE, USA, UK & more.`,
        keywords: keywordsForCategory(category.slug),
        path: `/categories/${category.slug}`,
        image: absoluteUrl(category.image),
        noindex: false,
      };
    }

    const staticMap = {
      '/': {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        keywords: SITE_KEYWORDS,
      },
      '/categories': {
        title: `Shop All Categories — DRYTUCH.com | Dry Meat, Vegetables, Fruits | Worldwide`,
        description:
          'Browse DRYTUCH categories: dry meat, dry vegetables, dry fruits, dry seafood. Official store drytuch.com. Ships to India, UAE, Saudi Arabia, USA, UK, Canada, Australia.',
        keywords: SITE_KEYWORDS,
      },
      '/about': {
        title: `About DRYTUCH.com — Premium Sun-Dried Foods Brand`,
        description:
          'DRYTUCH (drytuch.com) — farm-sourced sun-dried foods. Natural, no preservatives. International shipping to 9 countries.',
        keywords: [...BRAND_KEYWORDS, 'about DRYTUCH', 'sun dried food brand'].join(', '),
      },
      '/contact': {
        title: `Contact DRYTUCH.com — Orders & International Shipping`,
        description: 'Contact DRYTUCH for orders, UAE USA UK shipping, product enquiries at drytuch.com.',
        keywords: [...BRAND_KEYWORDS, 'contact DRYTUCH', 'DRYTUCH customer service'].join(', '),
      },
      '/faq': {
        title: `DRYTUCH FAQ — Sun-Dried Food, Shipping India UAE USA UK`,
        description:
          'DRYTUCH FAQ: sun-dried food, storage, shipping to India, UAE, USA, UK, no preservatives, shelf life.',
        keywords: [...BRAND_KEYWORDS, 'DRYTUCH FAQ', 'sun dried food questions'].join(', '),
      },
      '/offers': {
        title: `DRYTUCH Offers — Coupons on Dry Meat, Fruits & Vegetables`,
        description: 'Exclusive DRYTUCH deals on premium dried meats, vegetables and fruits at drytuch.com.',
        keywords: [...BRAND_KEYWORDS, 'DRYTUCH coupon', 'dry food offers'].join(', '),
      },
      '/search': {
        title: `Search DRYTUCH Products — drytuch.com`,
        description: 'Search premium sun-dried products at DRYTUCH official store.',
        keywords: SITE_KEYWORDS,
        noindex: true,
      },
    };

    return staticMap[pathname] || { title: SITE_TITLE, description: SITE_DESCRIPTION, keywords: SITE_KEYWORDS };
  }, [pathname, product, category, categorySeo]);

  return (
    <>
      <SeoHead {...seo} />
      <SiteJsonLd />
      {product ? <ProductJsonLd product={product} /> : null}
    </>
  );
}
