import { useContext } from 'react';
import { LenisContext } from '@/lib/lenis-context';
import type { LenisContextValue } from '@/lib/lenis-context';

/**
 * Access the single Lenis instance created by <SmoothScroll>.
 * Anchor navigation must go through `scrollTo` so it stays in sync with the
 * scroll-driven animations.
 */
export function useLenis(): LenisContextValue {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenis must be used inside <SmoothScroll>');
  }
  return context;
}
