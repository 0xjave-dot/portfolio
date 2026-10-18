import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Two-part cursor: a hard dot that tracks the pointer 1:1 and a ring that trails
 * it with easing. Interactive elements declare their own label with
 * `data-cursor="View"` and the ring opens up to show it.
 *
 * Disabled entirely on touch devices and for reduced-motion users, where the
 * native cursor is left alone.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const coarse = useMediaQuery('(pointer: coarse)');
  const enabled = !reduced && !coarse;

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove('cursor-none');
      return;
    }

    document.documentElement.classList.add('cursor-none');
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let frame = 0;
    let shown = false;

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
      if (!shown) {
        shown = true;
        setVisible(true);
      }

      const target = event.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>('[data-cursor]');
      const nextLabel = labelled?.dataset.cursor ?? null;
      setLabel((current) => (current === nextLabel ? current : nextLabel));
    };

    const loop = () => {
      ringX += (pointerX - ringX) * 0.16;
      ringY += (pointerY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('cursor-none');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-200"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-ink/40 transition-[width,height,background-color,border-color,opacity] duration-300 ease-out"
        style={{
          width: label ? 84 : pressed ? 22 : 36,
          height: label ? 84 : pressed ? 22 : 36,
          opacity: visible ? 1 : 0,
          backgroundColor: label ? 'rgb(var(--accent))' : 'transparent',
          borderColor: label ? 'rgb(var(--accent))' : undefined,
        }}
      >
        <span
          className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-[#0A0A0B] transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
