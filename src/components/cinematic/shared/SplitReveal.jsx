import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplitReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = text.split('');
    el.innerHTML = chars
      .map((c) => `<span class="split-char inline-block">${c === ' ' ? '&nbsp;' : c}</span>`)
      .join('');

    gsap.from(el.querySelectorAll('.split-char'), {
      y: 30,
      opacity: 0,
      stagger: 0.012,
      duration: 0.35,
      ease: 'power2.out',
      delay,
    });
  }, [text, delay]);

  return (
    <span ref={ref} className={`perspective-1000 ${className}`} aria-label={text} />
  );
}
