import Lenis from 'lenis';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { LenisContext } from '@/lib/lenis-context';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SmoothScrollProps {
  children: ReactNode;
}

/**
 * Lenis smooth scrolling. GSAP is deliberately not imported here: Lenis drives
 * its own rAF loop, ScrollTrigger picks up the real scroll events, and the
 * ~45KB of GSAP is only fetched when the pinned work section mounts.
 *
 * Reduced-motion users get native scrolling and no Lenis instance at all.
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduced = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || reduced) {
      setLenis(null);
      return;
    }

    const instance = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  const scrollTo = useCallback(
    (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => {
      const offset = options?.offset ?? 0;
      if (lenis) {
        lenis.scrollTo(target, { offset, immediate: options?.immediate, duration: 1.2 });
        return;
      }
      if (typeof target === 'string') {
        document.querySelector<HTMLElement>(target)?.scrollIntoView({
          behavior: options?.immediate ? 'auto' : 'smooth',
          block: 'start',
        });
        return;
      }
      if (typeof target === 'number') {
        window.scrollTo({ top: target + offset, behavior: options?.immediate ? 'auto' : 'smooth' });
        return;
      }
      target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth', block: 'start' });
    },
    [lenis],
  );

  const stop = useCallback(() => lenis?.stop(), [lenis]);
  const start = useCallback(() => lenis?.start(), [lenis]);

  const value = useMemo(() => ({ lenis, scrollTo, stop, start }), [lenis, scrollTo, stop, start]);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

/** Reset scroll on route change, immediately (no smooth animation across pages). */
export function useScrollReset(pathname: string): void {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
