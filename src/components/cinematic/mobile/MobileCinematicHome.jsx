import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { ChevronRight, Plus, Star } from 'lucide-react';
import { productService, reviewService } from '../../../api';
import { addToCart } from '../../../store/slices/cartSlice';
import { showToast } from '../../../store/slices/uiSlice';
import { formatPrice } from '../../../utils/format';
import { LOCAL } from '../../../constants/images';
import {
  JOURNEY_CARDS,
  PROCESS_STEPS,
  COUNTERS,
  HERO_FRAMES,
} from '../../../constants/cinematic';

function MobileHero() {
  const [frame, setFrame] = useState(0);

  return (
    <section className="mobile-hero">
      <div className="mobile-hero-media">
        <AnimatePresence mode="wait">
          <motion.img
            key={frame}
            src={HERO_FRAMES[frame].image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onAnimationComplete={() => {
              setTimeout(() => setFrame((f) => (f + 1) % HERO_FRAMES.length), 2800);
            }}
          />
        </AnimatePresence>
        <div className="mobile-hero-overlay" />
      </div>
      <div className="mobile-hero-content">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-luxury-secondary">
          Farm → Dry → Pack → Deliver
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] text-stone-900">
          SUN DRIED.<br />
          <span className="text-gradient-gold">NUTRIENT LOCKED.</span>
        </h1>
        <p className="mt-3 text-sm text-stone-600">FROM FARM TO FUTURE.</p>
        <Link to="/categories" className="btn-cinematic mt-8 inline-flex px-8 py-4 text-xs uppercase tracking-[0.2em]">
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

function MobileJourney() {
  return (
    <section className="mobile-section">
      <p className="mobile-eyebrow">Choose Your Journey</p>
      <div className="mobile-swipe-row mt-4">
        {JOURNEY_CARDS.map((card) => (
          <Link key={card.id} to={card.link} className="mobile-journey-card">
            <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <h3 className="font-display text-2xl font-extrabold">{card.title}</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
                Explore <ChevronRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function MobileProcess() {
  return (
    <section className="mobile-section mobile-section-dark">
      <p className="mobile-eyebrow">The Process</p>
      <h2 className="mobile-heading">Farm to door.</h2>
      <div className="mt-6 space-y-0">
        {PROCESS_STEPS.map((step, i) => (
          <div key={step.id} className="mobile-process-step">
            <div className="mobile-process-dot" />
            <div className="pb-8 pl-6">
              <span className="font-mono text-[10px] text-luxury-secondary">0{i + 1}</span>
              <h3 className="font-display text-lg font-bold">{step.label}</h3>
              <p className="mt-1 text-xs text-stone-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileGallery({ title, items, link }) {
  return (
    <section className="mobile-section">
      <div className="flex items-end justify-between px-5">
        <h2 className="mobile-heading">{title}</h2>
        <Link to={link} className="text-xs font-bold text-luxury-primary">See all</Link>
      </div>
      <div className="mobile-swipe-row mt-4">
        {items.map((item) => (
          <div key={item.name || item.label} className="mobile-product-tile">
            <img src={item.image} alt={item.name || item.label} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-3">
              <p className="text-xs font-bold uppercase tracking-wide">{item.name || item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileBestSeller() {
  const dispatch = useDispatch();
  const { data: products = [] } = useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: productService.getBestSellers,
  });

  if (!products.length) return null;
  const product = products[0];

  return (
    <section className="mobile-section mobile-section-dark">
      <p className="mobile-eyebrow">Best Seller</p>
      <div className="mt-4 overflow-hidden rounded-3xl">
        <img src={product.image} alt={product.title} className="aspect-square w-full object-cover" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-extrabold">{product.title}</h3>
      <p className="mt-1 font-display text-2xl font-bold text-luxury-secondary">
        {formatPrice(product.price)}
      </p>
      <button
        type="button"
        onClick={() => {
          dispatch(addToCart(product));
          dispatch(showToast('Added to cart'));
        }}
        className="btn-cinematic mt-5 flex w-full items-center justify-center gap-2 py-4 text-sm font-bold"
      >
        <Plus size={18} /> Add to Cart
      </button>
    </section>
  );
}

function MobileStories() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', 'mobile'],
    queryFn: () => reviewService.getByProduct('1'),
  });

  return (
    <section className="mobile-section">
      <p className="mobile-eyebrow">Stories</p>
      <div className="mobile-swipe-row mt-4">
        {reviews.map((r) => (
          <div key={r.id} className="mobile-story-card">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={10} className={j < r.rating ? 'fill-luxury-secondary text-luxury-secondary' : 'text-white/15'} />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">&ldquo;{r.comment}&rdquo;</p>
            <p className="mt-4 text-xs font-bold">{r.userName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function MobileCounters() {
  return (
    <section className="mobile-section">
      <div className="grid grid-cols-3 gap-4 px-5">
        {COUNTERS.map((c) => (
          <div key={c.label} className="text-center">
            <p className="font-display text-2xl font-extrabold text-luxury-secondary">
              {c.value}{c.suffix}
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-stone-400">{c.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function MobileCinematicHome() {
  const meatItems = [
    { label: 'Mutton', image: LOCAL.meat.mutton },
    { label: 'Chicken', image: LOCAL.meat.chicken },
    { label: 'Seafood', image: LOCAL.meat.seafood },
  ];
  const fruitItems = [
    { name: 'Mango', image: LOCAL.fruits.mango },
    { name: 'Dates', image: LOCAL.fruits.dates },
    { name: 'Banana', image: LOCAL.fruits.banana },
    { name: 'Raisin', image: LOCAL.fruits.raisin },
  ];
  const vegItems = [
    { name: 'Tomato', image: LOCAL.vegetables.tomato },
    { name: 'Garlic', image: LOCAL.vegetables.garlic },
    { name: 'Onion', image: LOCAL.vegetables.onion },
    { name: 'Ginger', image: LOCAL.vegetables.ginger },
  ];

  return (
    <div className="mobile-cinematic pb-nav">
      <MobileHero />
      <MobileJourney />
      <MobileProcess />
      <MobileGallery title="Dry Meat" items={meatItems} link="/categories/dry-meat" />
      <MobileGallery title="Dry Vegetables" items={vegItems} link="/categories/dry-vegetables" />
      <MobileGallery title="Dry Fruits" items={fruitItems} link="/categories/dry-fruits" />
      <MobileCounters />
      <MobileBestSeller />
      <MobileStories />
      <section className="mobile-section px-5 pb-8">
        <div className="rounded-3xl glass-cinematic p-6 text-center">
          <img src={LOCAL.logo} alt="DryTuch" className="mx-auto h-16 w-16 rounded-2xl" />
          <p className="mt-4 font-display text-lg font-bold">Install DryTuch App</p>
          <p className="mt-1 text-xs text-stone-500">Native experience on your phone</p>
        </div>
      </section>
    </div>
  );
}
