import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { INTRO_STORAGE_KEY, intro } from '@/lib/intro';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';

const ease = [0.76, 0, 0.24, 1] as const;

const STATUS_LINES = [
  'sharpening beak',
  'counting feathers',
  'reading the docs',
  'closing 40 tabs',
  'pretending to be normal',
];

/**
 * ≤2.2s intro: counter runs 0 → 100, RAVEN wipes in behind a clip path, curtain
 * lifts. Skippable by any key/click, skipped entirely for reduced motion, and
 * shown once per session.
 */
export function Preloader() {
  const alreadySeen = (() => {
    try {
      return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === '1';
    } catch {
      return false;
    }
  })();

  const reduced = useReducedMotion();
  const [active, setActive] = useState(() => !alreadySeen && !reduced);
  const [count, setCount] = useState(() => (alreadySeen || reduced ? 100 : 0));
  const [status, setStatus] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const timers = useRef<number[]>([]);
  useScrollLock(active);

  const finish = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1');
    } catch {
      /* private mode: fine */
    }
    intro.complete();
    setActive(false);
  }, []);

  useEffect(() => {
    if (!active) intro.complete();
  }, [active]);

  useEffect(() => {
    if (!active || skipped) return;

    const start = performance.now();
    const duration = 900;
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Math.round(progress * 100));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const statusTimer = window.setInterval(() => setStatus((value) => (value + 1) % STATUS_LINES.length), 420);
    timers.current.push(window.setTimeout(() => setLifting(true), 1150));
    timers.current.push(window.setTimeout(finish, 1650));

    return () => {
      cancelAnimationFrame(frame);
      window.clearInterval(statusTimer);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    };
  }, [active, skipped, finish]);

  useEffect(() => {
    if (!active) return;
    const skip = () => {
      setSkipped(true);
      setCount(100);
      setLifting(true);
      timers.current.forEach((timer) => window.clearTimeout(timer));
      window.setTimeout(finish, 420);
    };
    window.addEventListener('pointerdown', skip, { once: true });
    window.addEventListener('keydown', skip, { once: true });
    window.addEventListener('wheel', skip, { once: true, passive: true });
    return () => {
      window.removeEventListener('pointerdown', skip);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
    };
  }, [active, finish]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col justify-between bg-paper px-gutter py-5"
          initial={{ y: 0 }}
          animate={lifting ? { y: '-101%' } : { y: 0 }}
          exit={{ y: '-101%' }}
          transition={{ duration: 0.65, ease }}
          aria-hidden="true"
        >
          <div className="flex items-start justify-between">
            <span className="label">Raven — specimen no. 042</span>
            <span className="label">Lagos, NG</span>
          </div>

          <div className="flex flex-col gap-5">
            <div className="overflow-hidden">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={{ clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              >
                <span className="block font-display text-[19vw] font-medium leading-[0.76] tracking-[-0.06em]">
                  RAVEN
                </span>
              </motion.div>
            </div>
            <div className="flex items-end justify-between border-t border-line/15 pt-3">
              <span className="label max-w-[18ch] normal-case tracking-normal">{STATUS_LINES[status]}…</span>
              <span className="font-mono text-4xl tabular sm:text-6xl">{String(count).padStart(3, '0')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="label">Loading the bird</span>
            <span className="label opacity-60">Any key to skip</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
