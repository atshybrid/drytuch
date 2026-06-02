import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../../constants/cinematic';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      const steps = gsap.utils.toArray('.process-step');

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 0.3,
        },
      });

      steps.forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 === 0 ? -30 : 30,
          opacity: 0,
          duration: 0.35,
          scrollTrigger: {
            trigger: step,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="cinematic-section cinematic-section-dark" id="process">
      <div className="cinematic-container text-center">
        <p className="cinematic-eyebrow">The DryTuch Process</p>
        <h2 className="cinematic-heading mx-auto max-w-2xl">
          Farm to your door.<br />Every step matters.
        </h2>
      </div>

      <div className="relative mx-auto mt-20 max-w-2xl px-6">
        <div
          ref={lineRef}
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-luxury-primary via-luxury-secondary to-transparent"
        />

        <div className="space-y-16">
          {PROCESS_STEPS.map((step, i) => (
            <div
              key={step.id}
              className={`process-step relative flex items-center gap-8 ${
                i % 2 === 0 ? 'flex-row' : 'flex-row-reverse text-right'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <span className="font-mono text-xs text-luxury-secondary">0{i + 1}</span>
                <h3 className="mt-1 font-display text-2xl font-bold">{step.label}</h3>
                <p className="mt-2 text-sm text-stone-500">{step.desc}</p>
              </div>
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-luxury-primary/30 bg-white">
                <span className="h-3 w-3 rounded-full bg-luxury-secondary" />
              </div>
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
