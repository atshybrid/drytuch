/** Site URL for SEO, sitemap, canonical links */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://drytuch.com').replace(/\/$/, '');

export const SITE_NAME = 'DRYTUCH';
export const SITE_TITLE = 'DRYTUCH — Premium Sun-Dried Foods | Dry Meat, Vegetables & Fruits';
export const SITE_DESCRIPTION =
  'Shop premium sun-dried dry meat, vegetables, fruits, seafood & nuts at DRYTUCH. 100% natural, no preservatives. Farm to table. Ships to India, UAE, USA, UK & more.';
export const SITE_KEYWORDS =
  'drytuch, sun dried food, dry meat, dry chicken, dry mutton, dry vegetables, dry fruits, dried seafood, premium dried foods, healthy snacks, protein rich, no preservatives';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/drytuch_landing.png`;
export const TWITTER_HANDLE = '@drytuch';

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
