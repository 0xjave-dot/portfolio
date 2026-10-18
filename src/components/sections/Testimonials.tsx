import { AnimatePresence, motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { testimonials } from '@/data/testimonials';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Stamp } from '@/components/ui/Annotation';
import { cn, pad } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

function projectName(slug: string): string {
  return projects.find((project) => project.slug === slug)?.name ?? 'Project';
}

/** Three bars standing in for a quote nobody has written yet. */
function Redacted() {
  return (
    <div aria-hidden="true" className="flex flex-col gap-3">
      {['w-[92%]', 'w-[84%]', 'w-[46%]'].map((width) => (
        <span
          key={width}
          className={cn('block h-3 rounded-[1px] bg-ink/15 sm:h-4', width)}
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgb(var(--ink) / 0.18) 0 8px, transparent 8px 14px)',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Testimony.
 *
 * There is no social proof on file, and inventing it would be dishonest, so the
 * section says so. As soon as a real quote is added to src/data/testimonials.ts
 * (placeholder: false) it renders normally and the carousel starts advancing.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);
  const total = testimonials.length;
  const current = testimonials[index];
  const hasRealQuote = testimonials.some((entry) => !entry.placeholder && entry.quote.length > 0);

  const go = useCallback((next: number) => setIndex((next + total) % total), [total]);

  useEffect(() => {
    if (!hasRealQuote || paused || reduced) return;
    timer.current = window.setInterval(() => setIndex((value) => (value + 1) % total), 7000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [hasRealQuote, paused, reduced, total]);

  if (!current) return null;

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    if (info.offset.x < -70) go(index + 1);
    else if (info.offset.x > 70) go(index - 1);
  };

  /** Arrow keys work from the controls, which is where keyboard focus lands. */
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section
      id="testimony"
      className="defer-paint relative border-t border-line/15 py-section"
      aria-labelledby="testimony-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="shell grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="label text-accentInk">05</span>
            <span className="label">Testimony</span>
          </div>
          <h2
            id="testimony-title"
            className="mt-4 font-display text-[clamp(1.9rem,3.6vw,2.8rem)] font-medium leading-[1] tracking-[-0.04em]"
          >
            Nothing on
            <br />
            <span className="font-serif italic text-ink/60">the record.</span>
          </h2>
          <p className="mt-5 max-w-[19rem] text-sm leading-relaxed text-ink/60">
            I’m not going to invent quotes and put them in a client’s mouth — that’s a strange thing
            to do. When someone sends real words, they land here, verbatim, with their name on it.
          </p>
          <p className="mt-4 max-w-[19rem] font-mono text-[0.58rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
            Until then: read the case studies. The work is the argument.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <div className="relative" role="group" aria-roledescription="carousel" aria-label="Client testimony">
            <div className="plate relative border border-line/20 bg-surface/60 p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <span className="label">Evidence {pad(index + 1)}</span>
                <Stamp className="text-stamp">
                  {current.placeholder ? 'Statement pending' : 'On record'}
                </Stamp>
              </div>

              <div className="mt-8 min-h-[9rem] sm:min-h-[8rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={index}
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    drag={reduced ? false : 'x'}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.14}
                    onDragEnd={onDragEnd}
                    className={cn('flex flex-col gap-6', !reduced && 'cursor-grab active:cursor-grabbing')}
                    data-cursor="Drag"
                    aria-live="polite"
                  >
                    {current.placeholder ? (
                      <Redacted />
                    ) : (
                      <blockquote className="font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-medium leading-[1.25] tracking-[-0.02em]">
                        “{current.quote}”
                      </blockquote>
                    )}
                    <figcaption className="flex flex-wrap items-end justify-between gap-3 border-t border-line/10 pt-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink">
                          {current.author}
                        </span>
                        <span className="label">{current.role}</span>
                      </div>
                      <Link
                        to={`/work/${current.project}`}
                        className="link-underline font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted hover:text-ink"
                        data-cursor="Open"
                      >
                        {projectName(current.project)} ↗
                      </Link>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line/10 pt-4">
                <span className="font-mono text-[0.6rem] text-muted">
                  <span className="text-ink">{pad(index + 1)}</span> / {pad(total)}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(index - 1)}
                    onKeyDown={onKeyDown}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line/20 transition-colors hover:border-accent hover:text-accentInk"
                    aria-label="Previous testimony"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => go(index + 1)}
                    onKeyDown={onKeyDown}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line/20 transition-colors hover:border-accent hover:text-accentInk"
                    aria-label="Next testimony"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted">
              Are you a client with something nice to say?{' '}
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent('A sentence about the work')}`}
                className="squiggle text-ink hover:text-accentInk"
              >
                Send it
              </a>{' '}
              and I’ll put it here, unedited.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
