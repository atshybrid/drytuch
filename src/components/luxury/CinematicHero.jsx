import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ChevronRight, Truck, Shield, Leaf } from 'lucide-react';
import { LOCAL } from '../../constants/images';
import { HomeTopBar } from '../layout/DesktopNav';

const perks = [
  { icon: Truck, label: 'Fast delivery' },
  { icon: Shield, label: 'Quality assured' },
  { icon: Leaf, label: '100% natural' },
];

export default function CinematicHero() {
  const root = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(content.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative min-h-[88dvh] w-full overflow-hidden md:min-h-[78vh] lg:min-h-[85vh]">
      <HomeTopBar />

      <img
        src={LOCAL.landing}
        alt="DryTuch Premium Dry Foods"
        className="absolute inset-0 h-full w-full object-cover animate-kenburns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-luxury-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[88dvh] max-w-6xl flex-col justify-end px-4 pb-28 pt-24 md:min-h-[78vh] md:flex-row md:items-end md:justify-between md:gap-12 md:px-8 md:pb-20 lg:min-h-[85vh]">
        <div ref={content} className="max-w-xl">
          <p className="section-eyebrow">Est. 2026 · India</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient-gold">DRY</span>
            <span className="text-white">TUCH</span>
          </h1>
          <p className="mt-4 max-w-md text-base text-white/75 md:text-lg">
            Premium dry meat, vegetables & fruits — handcrafted, sun-dried, delivered fresh to your door.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/categories/dry-meat" className="btn-luxury px-6 py-3.5 text-sm text-white">
              Shop Dry Meat
              <ChevronRight size={16} />
            </Link>
            <Link to="/categories" className="btn-luxury-outline px-6 py-3.5 text-sm text-white">
              Browse All
            </Link>
          </div>
        </div>

        <div className="mt-8 hidden flex-col gap-3 md:mt-0 md:flex">
          {perks.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="glass-luxury flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80"
            >
              <Icon size={18} className="text-luxury-secondary" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
