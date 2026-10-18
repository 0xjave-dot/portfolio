import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  style?: CSSProperties;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** The quiet default entrance used across the site. */
export function Reveal({ children, className, delay = 0, y = 24, once = true, style }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y }}
      animate={reduced ? { opacity: 1 } : inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

interface HairlineProps {
  className?: string;
  delay?: number;
}

/** A hairline that draws itself in from the left. */
export function DrawLine({ className, delay = 0 }: HairlineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-5% 0px' });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-px w-full origin-left bg-line/20"
        initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: inView || reduced ? 1 : 0 }}
        transition={{ duration: 1.2, ease: EASE, delay }}
      />
    </div>
  );
}
