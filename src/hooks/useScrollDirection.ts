import { useEffect, useRef, useState } from 'react';

export type ScrollDirection = 'up' | 'down';

/** Direction of travel, used by the hiding navigation. */
export function useScrollDirection(threshold = 8): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>('up');
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;

    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - last.current;
      if (Math.abs(delta) < threshold) return;
      setDirection(delta > 0 ? 'down' : 'up');
      last.current = current;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return direction;
}
