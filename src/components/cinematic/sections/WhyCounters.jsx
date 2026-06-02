import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COUNTERS } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, suffix, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });

    return () => tween.kill();
  }, [value]);

  return (
    <div ref={ref} className="counter-block text-center">
      <p className="font-display text-5xl font-extrabold text-gradient-gold md:text-7xl">
        {display}{suffix}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.3em] text-stone-500">{label}</p>
    </div>
  );
}

export default function WhyCounters() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.counter-block', {
        y: 40,
        opacity: 0,
        stagger: 0.06,
        duration: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section cinematic-section-dark" id="why">
      <div className="cinematic-container text-center">
        <p className="cinematic-eyebrow">Why DryTuch</p>
        <h2 className="cinematic-heading">Numbers that speak.<br />Quality that delivers.</h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-12 px-6 md:grid-cols-3 md:gap-8">
        {COUNTERS.map((c) => (
          <AnimatedCounter key={c.label} {...c} />
        ))}
      </div>
    </section>
  );
}
