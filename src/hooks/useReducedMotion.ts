import { useMediaQuery } from './useMediaQuery';

/**
 * Single source of truth for motion decisions. Everything animated on the site
 * checks this: cursor, parallax, Lenis, pinned work sequence, marquee speed.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
