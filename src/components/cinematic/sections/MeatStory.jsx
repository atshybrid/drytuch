import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MEAT_STORY } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

export default function MeatStory() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section overflow-hidden" id="stories">
      <div className="cinematic-container mb-12">
        <p className="cinematic-eyebrow">Dry Meat Story</p>
        <h2 className="cinematic-heading">Protein preserved.<br />Flavor amplified.</h2>
      </div>

      <div ref={trackRef} className="flex w-max gap-6 px-8 md:gap-10 md:px-16">
        {MEAT_STORY.map((item, i) => (
          <article
            key={item.label}
            className="meat-panel relative h-[70vh] w-[85vw] shrink-0 overflow-hidden rounded-3xl md:h-[75vh] md:w-[55vw]"
          >
            <img
              src={item.image}
              alt={item.label}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <span className="font-mono text-xs text-luxury-secondary">0{i + 1}</span>
              <h3 className="mt-2 font-display text-4xl font-extrabold md:text-6xl">{item.label}</h3>
              <p className="mt-3 max-w-md text-base text-white/75">{item.desc}</p>
            </div>
          </article>
        ))}
        <div className="flex h-[70vh] w-[40vw] shrink-0 items-center md:h-[75vh]">
          <p className="font-display text-3xl font-bold text-stone-300 md:text-5xl">
            Traditional<br />craft.<br />Modern<br />delivery.
          </p>
        </div>
      </div>
    </section>
  );
}
