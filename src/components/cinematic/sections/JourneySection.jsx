import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY_CARDS } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

export default function JourneySection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);

  useGSAP(
    () => {
      gsap.from('.journey-card', {
        y: 100,
        opacity: 0,
        stagger: 0.06,
        duration: 0.45,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section" id="shop">
      <div className="cinematic-container">
        <p className="cinematic-eyebrow">Choose Your Journey</p>
        <h2 className="cinematic-heading">Three worlds.<br />One craft.</h2>
      </div>

      <div className="mt-12 flex flex-col gap-4 px-4 md:mt-16 md:flex-row md:gap-6 md:px-8 lg:px-16">
        {JOURNEY_CARDS.map((card) => (
          <motion.div
            key={card.id}
            className="journey-card group relative flex-1 cursor-pointer overflow-hidden rounded-3xl"
            style={{ minHeight: active === card.id ? 520 : 420 }}
            onHoverStart={() => setActive(card.id)}
            onHoverEnd={() => setActive(null)}
            layout
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={active === card.id ? card.preview : card.image}
              alt={card.title}
              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <motion.div
                animate={{ y: active === card.id ? 0 : 8 }}
                transition={{ duration: 0.2 }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.35em]"
                  style={{ color: card.accent }}
                >
                  {card.subtitle.split('·')[0]}
                </p>
                <h3 className="mt-2 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                  {card.title}
                </h3>
                <AnimatePresence>
                  {active === card.id ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-sm text-white/80">{card.subtitle}</p>
                      <Link
                        to={card.link}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white"
                      >
                        Enter <ArrowUpRight size={16} />
                      </Link>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            </div>

            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              style={{ boxShadow: `inset 0 0 80px ${card.accent}33` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
