/** Site URL for SEO, sitemap, canonical links */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://drytuch.com').replace(/\/$/, '');

export const SITE_NAME = 'DRYTUCH';
export const SITE_DOMAIN = 'drytuch.com';

/** Brand-first title — helps Google separate from "drytech" */
export const SITE_TITLE =
  'DRYTUCH.com Official Store | Premium Sun-Dried Foods — Dry Meat, Vegetables & Fruits';

export const SITE_DESCRIPTION =
  'DRYTUCH (drytuch.com) — official online store for premium sun-dried dry meat, chicken, mutton, vegetables, fruits & seafood. 100% natural, no preservatives. Order online with delivery to India, UAE, Saudi Arabia, Qatar, Kuwait, USA, UK, Canada & Australia.';

/** Core brand + product keywords */
export const BRAND_KEYWORDS = [
  'DRYTUCH',
  'drytuch',
  'drytuch.com',
  'Dry Tuch',
  'DRYTUCH official',
  'DRYTUCH sun dried food',
  'buy drytuch online',
];

/** Country / region focus keywords (international shipping) */
export const COUNTRY_KEYWORDS = {
  global: [
    'sun dried food online',
    'premium dried foods worldwide shipping',
    'natural dried meat no preservatives',
    'farm to table dried food',
  ],
  India: [
    'dry meat online India',
    'sun dried vegetables India',
    'dry fruits online India',
    'premium dried food India delivery',
  ],
  UAE: [
    'dry meat UAE',
    'sun dried food Dubai delivery',
    'halal dried meat UAE',
    'dry fruits UAE online',
  ],
  USA: [
    'sun dried food USA',
    'dried meat USA shipping',
    'premium dry snacks USA',
    'natural dried food America',
  ],
  UK: [
    'sun dried food UK',
    'dried meat UK delivery',
    'dry vegetables UK online',
  ],
  Canada: [
    'sun dried food Canada',
    'dried meat Canada shipping',
  ],
  Australia: [
    'sun dried food Australia',
    'dried meat Australia online',
  ],
  'Saudi Arabia': [
    'sun dried food Saudi Arabia',
    'dried meat KSA delivery',
  ],
};

export const PRODUCT_KEYWORDS = [
  'dry chicken',
  'dry mutton',
  'dry meat',
  'dry seafood',
  'sun dried tomato',
  'sun dried onion',
  'dry garlic',
  'dry mango',
  'dry dates',
  'dry fruits and nuts',
  'protein rich dried food',
  'long shelf life dried food',
];

/** Combined for meta keywords tag */
export const SITE_KEYWORDS = [
  ...BRAND_KEYWORDS,
  ...PRODUCT_KEYWORDS,
  ...COUNTRY_KEYWORDS.global,
  ...COUNTRY_KEYWORDS.India.slice(0, 3),
  ...COUNTRY_KEYWORDS.UAE.slice(0, 3),
  ...COUNTRY_KEYWORDS.USA.slice(0, 3),
  ...COUNTRY_KEYWORDS.UK.slice(0, 2),
].join(', ');

export const CATEGORY_SEO = {
  'dry-meat': {
    title: 'Dry Meat Online — DRYTUCH | Chicken, Mutton | India UAE USA UK',
    description:
      'Buy premium dry chicken & dry mutton at DRYTUCH.com. Sun-dried, no preservatives. Ships to India, UAE, USA, UK, Canada, Australia & Gulf countries.',
    keywords: [
      'dry meat online',
      'dry chicken',
      'dry mutton',
      'dried meat UAE',
      'dry meat USA shipping',
      'DRYTUCH dry meat',
    ],
  },
  'dry-vegetables': {
    title: 'Dry Vegetables — DRYTUCH | Sun-Dried Tomato, Onion, Garlic | Worldwide',
    description:
      'Shop sun-dried vegetables at DRYTUCH — tomato, onion, garlic, chilli & more. Natural drying. International delivery India, UAE, USA, UK.',
    keywords: ['dry vegetables online', 'sun dried tomato', 'dried onion', 'DRYTUCH vegetables'],
  },
  'dry-fruits': {
    title: 'Dry Fruits & Nuts — DRYTUCH | Mango, Dates, Raisin | Global Shipping',
    description:
      'Premium dry fruits & nuts from DRYTUCH.com. Mango, dates, raisin, pineapple. Order online — ships to 9 countries.',
    keywords: ['dry fruits online', 'dried mango', 'medjool dates', 'DRYTUCH dry fruits'],
  },
  'dry-seafood': {
    title: 'Dry Seafood — DRYTUCH | Premium Sun-Dried | UAE USA UK Delivery',
    description:
      'Premium dry seafood from DRYTUCH. Sun-dried, protein rich. Ships to India, UAE, Saudi Arabia, USA, UK & more.',
    keywords: ['dry seafood online', 'dried seafood UAE', 'DRYTUCH seafood'],
  },
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/drytuch_landing.png`;
export const TWITTER_HANDLE = '@drytuch';

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}

export function keywordsForCategory(slug) {
  const cat = CATEGORY_SEO[slug];
  if (!cat) return SITE_KEYWORDS;
  return [...BRAND_KEYWORDS, ...cat.keywords, ...COUNTRY_KEYWORDS.global.slice(0, 4)].join(', ');
}
