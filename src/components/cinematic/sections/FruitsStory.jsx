import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRUIT_PARALLAX } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

export default function FruitsStory() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      FRUIT_PARALLAX.forEach((_, i) => {
        gsap.to(`.fruit-layer-${i}`, {
          y: (i + 1) * -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      });

      gsap.from('.fruit-title', {
        y: 60,
        opacity: 0,
        duration: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100/50 via-stone-50 to-stone-100" />

      <div className="cinematic-container relative z-10 text-center">
        <p className="cinematic-eyebrow">Dry Fruits & Nuts</p>
        <h2 className="fruit-title cinematic-heading">
          Nature&apos;s candy.<br />
          <span className="text-gradient-gold">Luxury preserved.</span>
        </h2>
      </div>

      <div className="relative z-10 mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4 md:gap-8">
        {FRUIT_PARALLAX.map((fruit, i) => (
          <div
            key={fruit.name}
            className={`fruit-layer-${i} group relative`}
          >
            <div className="overflow-hidden rounded-3xl">
              <img
                src={fruit.image}
                alt={fruit.name}
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="font-display text-lg font-bold">{fruit.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
