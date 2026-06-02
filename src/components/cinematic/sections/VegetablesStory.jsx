import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VEG_FLOATING } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

function FloatingCard({ item, index }) {
  return (
    <motion.div
      className="veg-float-card"
      style={{ rotate: item.rotate }}
      whileHover={{ rotate: 0, scale: 1.08, z: 50 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="glass-cinematic overflow-hidden rounded-2xl p-1">
        <img src={item.image} alt={item.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
      </div>
      <p className="mt-3 text-center text-xs font-bold uppercase tracking-[0.25em] text-stone-600">
        {item.name}
      </p>
    </motion.div>
  );
}

export default function VegetablesStory() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from('.veg-float-card', {
        y: 80,
        opacity: 0,
        rotateY: 30,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section cinematic-section-dark">
      <div className="cinematic-container text-center">
        <p className="cinematic-eyebrow">Dry Vegetables</p>
        <h2 className="cinematic-heading">Sun-kissed ingredients.<br />Glass-pure quality.</h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-stone-500">
          Hover to explore — each ingredient dried naturally, preserving nutrients and flavor.
        </p>
      </div>

      <div className="veg-float-grid mx-auto mt-16 max-w-5xl px-6">
        {VEG_FLOATING.map((item, i) => (
          <FloatingCard key={item.name} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
