import { useEffect } from 'react';
import { useLenis } from './useLenis';

/** Locks page scroll (overlays, menus) without the layout jumping. */
export function useScrollLock(locked: boolean): void {
  const { stop, start } = useLenis();

  useEffect(() => {
    if (!locked) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    stop();
    const { body } = document;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = '';
      body.style.paddingRight = '';
      start();
    };
  }, [locked, stop, start]);
}
