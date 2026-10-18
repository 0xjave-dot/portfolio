import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  /** Pixels per second when the page is still. */
  speed?: number;
  direction?: 1 | -1;
  className?: string;
  itemClassName?: string;
  /** How strongly page scroll velocity pushes the belt. */
  velocityFactor?: number;
}

/**
 * Infinite belt whose speed reacts to scroll velocity.
 *
 * The loop only writes transforms: the content width is measured once (and on
 * resize) so the animation never forces a layout inside rAF.
 */
export function Marquee({
  items,
  speed = 44,
  direction = 1,
  className,
  itemClassName,
  velocityFactor = 0.55,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!track || !group) return;

    let raf = 0;
    let offset = 0;
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let velocity = 0;
    let width = group.offsetWidth || 1;

    const measure = () => {
      width = group.offsetWidth || 1;
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);

    const loop = (now: number) => {
      const delta = Math.min(64, now - lastTime) / 1000;
      lastTime = now;
      const scroll = window.scrollY;
      const raw = scroll - lastScroll;
      lastScroll = scroll;
      // smooth the scroll impulse so a flick doesn't teleport the belt
      velocity += (raw - velocity) * 0.12;

      offset += (speed * direction + velocity * velocityFactor * 60) * delta;

      if (offset <= -width) offset += width;
      if (offset > 0) offset -= width;

      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
    };
  }, [reduced, speed, direction, velocityFactor]);

  return (
    <div className={cn('relative flex w-full overflow-hidden', className)} aria-hidden="true">
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} ref={copy === 0 ? groupRef : undefined} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className={cn(
                  'flex items-center gap-6 whitespace-nowrap px-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-ink/80 sm:text-xs',
                  itemClassName,
                )}
              >
                {item}
                <span className="text-accentInk/70" aria-hidden="true">
                  ✳
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
