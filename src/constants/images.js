/**
 * Local product images — /public folder
 * All paths are served from site root (e.g. /Dry_dates.png)
 */

export const LOCAL = {
  landing: '/drytuch_landing.png',
  logo: '/logo.png',
  flow: '/flow.png',

  categories: {
    dryMeat: '/drymutton.png',
    dryVegetables: '/Dry_tamoto.png',
    dryFruits: '/Dry_dates.png',
    nuts: '/Dry_raisin.png',
  },

  meat: {
    chicken: '/drychiken.png',
    mutton: '/drymutton.png',
    seafood: '/Dry_seafood.png',
  },

  vegetables: {
    tomato: '/Dry_tamoto.png',
    onion: '/Dry_onion.png',
    garlic: '/Dry_garlic.png',
    ginger: '/Dry_ginger.png',
    chilli: '/Dry_chilli.png',
    curryLeaves: '/Dry_curryleave.png',
    greenChilli: '/Dry_grinchilli.png',
  },

  fruits: {
    apple: '/Dry_apple.png',
    apricot: '/Dry_aricot.png',
    banana: '/Dry_banana.png',
    dates: '/Dry_dates.png',
    mango: '/Dry_mango.png',
    pineapple: '/Dry_pinaple.png',
    raisin: '/Dry_raisin.png',
  },
};

export const IMG = {
  categories: LOCAL.categories,
  products: {
    beefJerky: LOCAL.meat.seafood,
    beefJerky2: LOCAL.meat.mutton,
    chickenJerky: LOCAL.meat.chicken,
    muttonDry: LOCAL.meat.mutton,
    sunDriedTomato: LOCAL.vegetables.tomato,
    sunDriedTomato2: LOCAL.vegetables.tomato,
    dryMushroom: LOCAL.vegetables.ginger,
    dryOnion: LOCAL.vegetables.onion,
    medjoolDates: LOCAL.fruits.dates,
    turkishApricots: LOCAL.fruits.apricot,
    driedFigs: LOCAL.fruits.raisin,
    almonds: LOCAL.fruits.apple,
    cashews: LOCAL.fruits.banana,
    walnuts: LOCAL.fruits.mango,
  },
  banners: {
    meat: LOCAL.meat.mutton,
    vegetables: LOCAL.vegetables.tomato,
    fruits: LOCAL.fruits.dates,
    landing: LOCAL.landing,
  },
  offers: {
    fruits: LOCAL.fruits.dates,
    jerky: LOCAL.meat.chicken,
    nuts: LOCAL.fruits.raisin,
  },
  avatar: '/logo.png',
  fallback: LOCAL.landing,
};

/** Extra products for gallery / future use */
export const ALL_DRY_ITEMS = [
  { name: 'Dry Chicken', image: LOCAL.meat.chicken, category: 'dry-meat' },
  { name: 'Dry Mutton', image: LOCAL.meat.mutton, category: 'dry-meat' },
  { name: 'Dry Seafood', image: LOCAL.meat.seafood, category: 'dry-meat' },
  { name: 'Dry Tomato', image: LOCAL.vegetables.tomato, category: 'dry-vegetables' },
  { name: 'Dry Onion', image: LOCAL.vegetables.onion, category: 'dry-vegetables' },
  { name: 'Dry Garlic', image: LOCAL.vegetables.garlic, category: 'dry-vegetables' },
  { name: 'Dry Ginger', image: LOCAL.vegetables.ginger, category: 'dry-vegetables' },
  { name: 'Dry Chilli', image: LOCAL.vegetables.chilli, category: 'dry-vegetables' },
  { name: 'Dry Curry Leaves', image: LOCAL.vegetables.curryLeaves, category: 'dry-vegetables' },
  { name: 'Dry Green Chilli', image: LOCAL.vegetables.greenChilli, category: 'dry-vegetables' },
  { name: 'Dry Apple', image: LOCAL.fruits.apple, category: 'dry-fruits' },
  { name: 'Dry Apricot', image: LOCAL.fruits.apricot, category: 'dry-fruits' },
  { name: 'Dry Banana', image: LOCAL.fruits.banana, category: 'dry-fruits' },
  { name: 'Dry Dates', image: LOCAL.fruits.dates, category: 'dry-fruits' },
  { name: 'Dry Mango', image: LOCAL.fruits.mango, category: 'dry-fruits' },
  { name: 'Dry Pineapple', image: LOCAL.fruits.pineapple, category: 'dry-fruits' },
  { name: 'Dry Raisin', image: LOCAL.fruits.raisin, category: 'dry-fruits' },
];
