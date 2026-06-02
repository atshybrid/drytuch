import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { HERO_FRAMES } from '../../../constants/cinematic';
import MagneticButton from '../shared/MagneticButton';
import SplitReveal from '../shared/SplitReveal';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const mediaRef = useRef(null);
  const contentRef = useRef(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % HERO_FRAMES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;

    const ctx = gsap.context(() => {
      gsap.to(media, {
        scale: 1.25,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.4,
        },
      });

      gsap.to(content, {
        y: -120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '60% top',
          scrub: 0.3,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="cinematic-hero" id="hero">
      <div ref={mediaRef} className="cinematic-hero-media">
        {HERO_FRAMES.map((f, i) => (
          <div
            key={f.label}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: frame === i ? 1 : 0 }}
          >
            <img src={f.image} alt={f.label} className="h-full w-full object-cover" loading="eager" />
          </div>
        ))}
        <div className="cinematic-hero-vignette" />
        <div className="cinematic-hero-grain" />
      </div>

      <div ref={contentRef} className="cinematic-hero-content">
        <p className="cinematic-eyebrow">Farm → Dry → Pack → Deliver</p>
        <h1 className="cinematic-hero-title">
          <SplitReveal text="SUN DRIED." delay={0.05} />
          <br />
          <span className="text-gradient-gold">
            <SplitReveal text="NUTRIENT LOCKED." delay={0.15} />
          </span>
        </h1>
        <p className="cinematic-hero-sub">
          FROM FARM TO FUTURE.
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600 md:text-base">
          Dry meat · vegetables · fruits · nuts — handcrafted through traditional drying,
          vacuum sealed, delivered to your door.
        </p>
        <div className="mt-10">
          <MagneticButton to="/categories" className="px-10 py-4 text-sm uppercase tracking-[0.25em]">
            Explore Collection
          </MagneticButton>
        </div>
      </div>

      <div className="cinematic-scroll-hint">
        <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400">Scroll</span>
        <ChevronDown size={18} className="animate-bounce text-stone-400" />
      </div>
    </section>
  );
}
