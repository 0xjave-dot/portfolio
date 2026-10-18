import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';
import { isTouchDevice } from '@/lib/utils';

const spring = { stiffness: 170, damping: 15, mass: 0.25 } as const;

/**
 * Magnetic pull: the element leans toward the cursor within its own box and
 * springs back on leave. Disabled on touch and for reduced-motion users.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const enabled = !reduced && !isTouchDevice();

  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const onMouseMove = (event: MouseEvent<T>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave, enabled };
}
