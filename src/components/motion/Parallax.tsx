import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface ParallaxProps {
  children: ReactNode;
  /** Total travel in px across the element's viewport pass. */
  distance?: number;
  className?: string;
  outerClassName?: string;
}

/**
 * Subtle GPU-only parallax. Transform only, no layout work, and it switches off
 * entirely for reduced-motion users.
 */
export function Parallax({ children, distance = 60, className, outerClassName }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={cn('overflow-hidden', outerClassName)}>
      <motion.div style={reduced ? undefined : { y }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}
