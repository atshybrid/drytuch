import { LOCAL } from './images';

export const PROCESS_STEPS = [
  { id: 'farm', label: 'Farm', desc: 'Sourced from trusted growers & farms across India' },
  { id: 'cleaning', label: 'Cleaning', desc: 'Hand-selected, washed & prepared with care' },
  { id: 'drying', label: 'Natural Drying', desc: 'Sun-dried & slow-dehydrated for maximum nutrition' },
  { id: 'quality', label: 'Quality Check', desc: 'Every batch inspected for purity & freshness' },
  { id: 'packing', label: 'Vacuum Packing', desc: 'Sealed to lock nutrients & extend shelf life' },
  { id: 'delivery', label: 'Delivery', desc: 'Farm to your door — fast & fresh' },
];

export const JOURNEY_CARDS = [
  {
    id: 'dry-meat',
    title: 'DRY MEAT',
    subtitle: 'High protein · Long shelf life · Traditional craft',
    image: LOCAL.meat.mutton,
    preview: LOCAL.meat.chicken,
    link: '/categories/dry-meat',
    accent: '#C0392B',
  },
  {
    id: 'dry-vegetables',
    title: 'DRY VEGETABLES',
    subtitle: 'Sun-dried · Farm fresh · Zero preservatives',
    image: LOCAL.vegetables.tomato,
    preview: LOCAL.vegetables.garlic,
    link: '/categories/dry-vegetables',
    accent: '#4D7C0F',
  },
  {
    id: 'dry-fruits',
    title: 'DRY FRUITS',
    subtitle: 'Naturally sweet · Nutrient locked · Premium quality',
    image: LOCAL.fruits.dates,
    preview: LOCAL.fruits.mango,
    link: '/categories/dry-fruits',
    accent: '#D4A017',
  },
];

export const MEAT_STORY = [
  { label: 'High Protein', image: LOCAL.meat.mutton, desc: 'Fuel for active lifestyles' },
  { label: 'Long Shelf Life', image: LOCAL.meat.chicken, desc: 'Traditional drying preserves quality' },
  { label: 'Natural Flavor', image: LOCAL.meat.seafood, desc: 'No artificial additives ever' },
];

export const VEG_FLOATING = [
  { name: 'Tomato', image: LOCAL.vegetables.tomato, rotate: -8 },
  { name: 'Garlic', image: LOCAL.vegetables.garlic, rotate: 6 },
  { name: 'Onion', image: LOCAL.vegetables.onion, rotate: -4 },
  { name: 'Ginger', image: LOCAL.vegetables.ginger, rotate: 10 },
];

export const FRUIT_PARALLAX = [
  { name: 'Mango', image: LOCAL.fruits.mango, depth: 0.15 },
  { name: 'Banana', image: LOCAL.fruits.banana, depth: 0.25 },
  { name: 'Dates', image: LOCAL.fruits.dates, depth: 0.1 },
  { name: 'Raisins', image: LOCAL.fruits.raisin, depth: 0.2 },
];

export const HERO_FRAMES = [
  { image: LOCAL.meat.mutton, label: 'Dry Meat Processing' },
  { image: LOCAL.vegetables.tomato, label: 'Vegetable Drying' },
  { image: LOCAL.fruits.dates, label: 'Fruit Drying' },
];

export const COUNTERS = [
  { value: 100, suffix: '%', label: 'Natural' },
  { value: 50, suffix: '+', label: 'Products' },
  { value: 1000, suffix: '+', label: 'Customers' },
];
