import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  DEFAULT_OG_IMAGE,
  absoluteUrl,
} from '../../constants/seo';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Per-page SEO: title, description, canonical, Open Graph, Twitter.
 */
export default function SeoHead({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
}) {
  const location = useLocation();
  const canonicalPath = path ?? location.pathname;
  const canonical = absoluteUrl(canonicalPath);
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image);

  useEffect(() => {
    document.title = title;

    setMeta('description', description);
    setMeta('keywords', SITE_KEYWORDS);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setMeta('googlebot', noindex ? 'noindex' : 'index, follow');

    setLink('canonical', canonical);

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:site_name', SITE_NAME, 'property');
    setMeta('og:locale', 'en_IN', 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
  }, [title, description, canonical, ogImage, type, noindex]);

  return null;
}
