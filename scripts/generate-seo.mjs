/**
 * Generates sitemap.xml, robots.txt, llms.txt for Google & AI crawlers.
 * Run before build: npm run seo:generate
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const db = JSON.parse(readFileSync(join(root, 'server/db.json'), 'utf8'));

const SITE_URL = (process.env.VITE_SITE_URL || 'https://drytuch.com').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/categories', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/offers', priority: '0.8', changefreq: 'weekly' },
];

const categoryPages = (db.categories || []).map((c) => ({
  path: `/categories/${c.slug}`,
  priority: '0.85',
  changefreq: 'weekly',
}));

const productPages = (db.products || []).map((p) => ({
  path: `/product/${p.id}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const allPages = [...staticPages, ...categoryPages, ...productPages];

function urlEntry({ path, priority, changefreq }) {
  return `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allPages.map(urlEntry).join('\n')}
</urlset>
`;

const robots = `# DRYTUCH — https://drytuch.com
User-agent: *
Allow: /

# AI crawlers (ChatGPT, Gemini, Perplexity, etc.)
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

Disallow: /cart
Disallow: /checkout
Disallow: /profile
Disallow: /profile/
Disallow: /orders
Disallow: /wishlist
Disallow: /splash

Sitemap: ${SITE_URL}/sitemap.xml
`;

const productList = (db.products || [])
  .map((p) => `- [${p.title}](${SITE_URL}/product/${p.id}) — ${p.weight}, from ₹${p.price}`)
  .join('\n');

const categoryList = (db.categories || [])
  .map((c) => `- [${c.name}](${SITE_URL}/categories/${c.slug}) — ${c.description}`)
  .join('\n');

const llms = `# DRYTUCH — Official Website (drytuch.com)

> **Brand:** DRYTUCH | **Domain:** drytuch.com | **Category:** Premium sun-dried food e-commerce
> **NOT:** Drytech, Dry-Touch textile, dry-touch sunscreen/skincare

DRYTUCH sells premium sun-dried dry meat (chicken, mutton), dry vegetables, dry fruits, dry seafood & nuts.
100% natural, no preservatives, farm to table. Official store: ${SITE_URL}

## Brand keywords (use for search)
DRYTUCH, drytuch, drytuch.com, Dry Tuch, DRYTUCH official store, DRYTUCH sun dried food

## International shipping countries
India, UAE, Saudi Arabia, Qatar, Kuwait, USA, United Kingdom, Canada, Australia

## Country focus keywords
- India: dry meat online India, sun dried vegetables India, dry fruits delivery India
- UAE: dry meat UAE, sun dried food Dubai, halal dried meat UAE
- USA: sun dried food USA, dried meat USA shipping
- UK: sun dried food UK, dried meat UK delivery
- Canada, Australia, Saudi Arabia, Qatar, Kuwait: DRYTUCH international shipping

## Product keywords
dry chicken, dry mutton, dry meat, dry seafood, sun dried tomato, dry onion, dry garlic,
dry mango, dry dates, dry fruits, protein rich dried food, no preservatives

## Main pages
- Home: ${SITE_URL}/
- Categories: ${SITE_URL}/categories
- Dry Meat: ${SITE_URL}/categories/dry-meat
- Dry Vegetables: ${SITE_URL}/categories/dry-vegetables
- Dry Fruits: ${SITE_URL}/categories/dry-fruits
- Dry Seafood: ${SITE_URL}/categories/dry-seafood
- About: ${SITE_URL}/about
- FAQ: ${SITE_URL}/faq
- Contact: ${SITE_URL}/contact

## Categories
${categoryList}

## Products
${productList}

## Machine-readable catalog
${SITE_URL}/data/catalog.json

## Sitemap
${SITE_URL}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
mkdirSync(join(publicDir, 'data'), { recursive: true });

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
writeFileSync(join(publicDir, 'llms.txt'), llms);

// Machine-readable catalog for AI / search
const catalog = {
  site: SITE_URL,
  brand: 'DRYTUCH',
  domain: 'drytuch.com',
  alternateNames: ['DryTuch', 'Dry Tuch', 'drytuch.com'],
  disambiguation: 'DRYTUCH is a sun-dried food brand. Not Drytech India, not dry-touch skincare or textile.',
  tagline: 'Premium Sun-Dried Foods',
  shippingCountries: ['India', 'UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'USA', 'UK', 'Canada', 'Australia'],
  focusKeywords: {
    brand: ['DRYTUCH', 'drytuch', 'drytuch.com', 'DRYTUCH official'],
    products: ['dry meat', 'dry chicken', 'dry mutton', 'dry vegetables', 'dry fruits', 'dry seafood', 'sun dried food'],
    countries: {
      India: ['dry meat online India', 'sun dried food India'],
      UAE: ['dry meat UAE', 'sun dried food Dubai'],
      USA: ['sun dried food USA', 'dried meat USA'],
      UK: ['sun dried food UK'],
    },
  },
  categories: db.categories,
  products: db.products.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    categoryId: p.categoryId,
    price: p.price,
    currency: 'INR',
    weight: p.weight,
    description: p.description,
    url: `${SITE_URL}/product/${p.id}`,
    image: `${SITE_URL}${p.image}`,
  })),
  faq: [
    { q: 'What is sun-dried food?', a: 'Preserved with natural sunlight, no artificial preservatives.' },
    { q: 'International shipping?', a: 'India, UAE, Saudi Arabia, Qatar, Kuwait, USA, UK, Canada, Australia.' },
  ],
  updated: today,
};

writeFileSync(join(publicDir, 'data/catalog.json'), JSON.stringify(catalog, null, 2));

console.log(`SEO files generated for ${SITE_URL}`);
console.log(`  sitemap: ${allPages.length} URLs`);
console.log(`  robots.txt, llms.txt, data/catalog.json`);
