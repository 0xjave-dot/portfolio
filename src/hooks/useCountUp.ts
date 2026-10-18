import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

interface CountUpOptions {
  duration?: number;
  decimals?: number;
}

/**
 * Counts from 0 to `target` the first time the element enters the viewport.
 * Reduced-motion users get the final value immediately.
 */
export function useCountUp<T extends HTMLElement>(target: number, options: CountUpOptions = {}) {
  const { duration = 1400, decimals = 0 } = options;
  const ref = useRef<T | null>(null);
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      // easeOutExpo keeps the last digits from crawling
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration, decimals, reduced]);

  return { ref, value, inView };
}
