import { useMemo } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SeoHead from './SeoHead';
import SiteJsonLd from './SiteJsonLd';
import ProductJsonLd from './ProductJsonLd';
import { productService, categoryService } from '../../api';
import { SITE_TITLE, SITE_DESCRIPTION, absoluteUrl } from '../../constants/seo';
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

  const seo = useMemo(() => {
    if (PRIVATE_PREFIXES.some((p) => pathname.startsWith(p))) {
      return { title: SITE_TITLE, description: SITE_DESCRIPTION, noindex: true };
    }

    if (product) {
      const img = product.image?.startsWith('http') ? product.image : product.image;
      return {
        title: `${product.title} — ${BRAND.name} | Buy Sun-Dried Online`,
        description: product.description?.slice(0, 160) || SITE_DESCRIPTION,
        path: `/product/${product.id}`,
        image: absoluteUrl(img),
        type: 'product',
        noindex: false,
      };
    }

    if (category) {
      return {
        title: `${category.name} — ${BRAND.name} | Premium Sun-Dried`,
        description: category.description || SITE_DESCRIPTION,
        path: `/categories/${category.slug}`,
        image: absoluteUrl(category.image),
        noindex: false,
      };
    }

    const staticMap = {
      '/': {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
      },
      '/categories': {
        title: `Shop Categories — ${BRAND.name} | Dry Meat, Vegetables & Fruits`,
        description: 'Browse dry meat, dry vegetables, dry fruits and dry seafood. Premium sun-dried foods with worldwide shipping.',
      },
      '/about': {
        title: `About ${BRAND.name} — Premium Sun-Dried Foods`,
        description: 'Learn about DRYTUCH — farm-sourced, naturally dried premium foods with no preservatives.',
      },
      '/contact': {
        title: `Contact ${BRAND.name}`,
        description: 'Contact DRYTUCH for orders, shipping and product enquiries.',
      },
      '/faq': {
        title: `FAQ — ${BRAND.name}`,
        description: 'Frequently asked questions about sun-dried foods, storage, shipping and quality.',
      },
      '/offers': {
        title: `Offers & Coupons — ${BRAND.name}`,
        description: 'Exclusive deals on premium dried meats, vegetables and fruits.',
      },
      '/search': {
        title: `Search Products — ${BRAND.name}`,
        description: 'Search DRYTUCH premium sun-dried products.',
        noindex: true,
      },
    };

    return staticMap[pathname] || { title: SITE_TITLE, description: SITE_DESCRIPTION };
  }, [pathname, product, category]);

  return (
    <>
      <SeoHead {...seo} />
      <SiteJsonLd />
      {product ? <ProductJsonLd product={product} /> : null}
    </>
  );
}
