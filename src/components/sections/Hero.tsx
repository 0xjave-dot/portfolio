import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { birdArt } from '@/data/bird';
import { site } from '@/data/site';
import { useIntroComplete } from '@/hooks/useIntroComplete';
import { useLenis } from '@/hooks/useLenis';
import { useLocalTime } from '@/hooks/useLocalTime';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FigureCaption, HandArrow, Stamp } from '@/components/ui/Annotation';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { INTRO_STORAGE_KEY } from '@/lib/intro';

const EASE = [0.22, 1, 0.36, 1] as const;

function Line({
  children,
  delay,
  ready,
  still,
  className,
}: {
  children: ReactNode;
  delay: number;
  ready: boolean;
  /** Render at the final position with no animation (used under the preloader). */
  still?: boolean;
  className?: string;
}) {
  if (still) {
    return (
      <span className="block overflow-hidden pb-[0.04em]">
        <span className={className} style={{ display: 'block' }}>
          {children}
        </span>
      </span>
    );
  }
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className={className}
        initial={{ y: '110%' }}
        animate={ready ? { y: '0%' } : { y: '110%' }}
        transition={{ duration: 1.1, ease: EASE, delay }}
        style={{ display: 'block' }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Hero. Type first, bird second: on mobile the bird sits under the headline in
 * normal flow, and only on desktop does it become the big right-hand plate.
 *
 * On a first visit the preloader is covering the screen, so everything is painted
 * in its final position immediately (good for LCP) and the curtain is the reveal.
 * On repeat visits — and for anyone who skips the intro — the masked line reveal
 * plays instead.
 */
export function Hero() {
  const [firstVisit] = useState(() => {
    try {
      return window.sessionStorage.getItem(INTRO_STORAGE_KEY) !== '1';
    } catch {
      return false;
    }
  });
  const introDone = useIntroComplete();
  const ready = introDone || firstVisit;

  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { time, offset } = useLocalTime();
  const { scrollTo } = useLenis();
  const spotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced || !isDesktop) return;
    const spot = spotRef.current;
    const section = spot?.parentElement;
    if (!spot || !section) return;

    let tx = window.innerWidth * 0.7;
    let ty = window.innerHeight * 0.35;
    let cx = tx;
    let cy = ty;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      tx = event.clientX - rect.left;
      ty = event.clientY - rect.top;
    };
    const loop = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      spot.style.setProperty('--hx', `${cx}px`);
      spot.style.setProperty('--hy', `${cy}px`);
      frame = requestAnimationFrame(loop);
    };

    section.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      section.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced, isDesktop]);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-5 pt-20 sm:pt-24 lg:pt-28"
    >
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div
          ref={spotRef}
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              'radial-gradient(560px circle at var(--hx, 70%) var(--hy, 35%), rgb(var(--accent) / 0.10), transparent 70%)',
          }}
        />
        <div className="absolute -right-40 top-1/4 h-[42rem] w-[42rem] rounded-full bg-accent/[0.05] blur-[130px]" />
        <div className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-glint/[0.06] blur-[110px]" />
      </div>

      {/* scrim so the fixed nav always has something to sit on */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-paper via-paper/85 to-transparent lg:h-32"
      />

      <div className="shell relative z-10 w-full">
        {/* specimen header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-dot-pulse rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="label text-ink">{site.availability}</span>
          </div>
          <div className="hidden items-center gap-5 sm:flex">
            <span className="label">Specimen № 042</span>
            <span className="label hidden md:inline">Corvus corax (provisional)</span>
            <span className="label">{site.coords}</span>
          </div>
        </div>

        <div className="relative pt-6 sm:pt-8">
          {/* annotations, desktop only */}
          <div className="pointer-events-none absolute right-[2vw] top-1 z-20 hidden lg:block">
            <Stamp className="text-stamp">Not a template</Stamp>
          </div>
          <div className="pointer-events-none absolute right-[38vw] top-[24%] z-20 hidden xl:flex xl:flex-col xl:items-end">
            <span className="rounded-sm bg-paper/70 px-2 py-1 font-serif text-sm italic text-ink/75 backdrop-blur-sm">
              will notice your 2px offset
            </span>
            <HandArrow className="mt-1 h-10 w-24 text-accentInk/80" flip />
          </div>

          {/* headline */}
          <h1 className="relative z-10 font-display font-medium leading-[0.78] tracking-[-0.055em]">
            <span className="sr-only">Hi, I'M JESSE. I make stuff.</span>
            <span aria-hidden="true">
              <Line ready={ready} delay={0.1} still={firstVisit}>
                <span className="block text-[clamp(2.8rem,10vw,9rem)]">HI, I'M</span>
              </Line>
              <Line ready={ready} delay={0.2} still={firstVisit}>
                <span className="outline-type block text-[clamp(2.8rem,10vw,9rem)]">JESSE.</span>
              </Line>
              <Line ready={ready} delay={0.3} still={firstVisit}>
                <span className="block font-serif text-[clamp(2.8rem,9.5vw,8.5rem)] font-normal italic leading-[0.8] tracking-[-0.03em] text-accentInk">
                  I MAKE STUFF.
                </span>
              </Line>
            </span>
          </h1>

          {/* the bird */}
          <motion.figure
            className="pointer-events-none relative z-0 mx-auto mt-6 w-[84%] max-w-[23rem] sm:w-[64%] sm:max-w-[27rem] lg:absolute lg:bottom-[-2.5rem] lg:right-[1.5vw] lg:mt-0 lg:w-[36vw] lg:max-w-[540px]"
            initial={firstVisit || reduced ? false : { opacity: 0, y: 40 }}
            animate={firstVisit || reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
          >
            <div className="plate relative border border-line/15 bg-surface/50 p-2 sm:p-3">
              <div className="halftone relative">
                <img
                  src={birdArt.hero.src}
                  alt={birdArt.hero.alt}
                  width={birdArt.hero.width}
                  height={birdArt.hero.height}
                  fetchPriority="high"
                  decoding="async"
                  className="w-full"
                />
              </div>
            </div>
            <FigureCaption label="Fig. 01" className="mt-2 hidden lg:flex">
              the bird. hood, laptop, staff. the staff does nothing.
            </FigureCaption>
          </motion.figure>

          {/* standfirst + actions */}
          <div className="relative z-10 mt-7 flex max-w-[34rem] flex-col gap-5 sm:mt-9">
            <motion.p
              className="text-base leading-relaxed text-ink/75 sm:text-lg"
              initial={firstVisit || reduced ? false : { opacity: 0, y: 16 }}
              animate={firstVisit || reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            >
              
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={firstVisit || reduced ? false : { opacity: 0, y: 16 }}
              animate={firstVisit || reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.72 }}
            >
              <MagneticButton
                variant="solid"
                size="md"
                cursorLabel="Stuff"
                onClick={() => scrollTo('#work', { offset: -72 })}
                trailing={<span aria-hidden="true">↓</span>}
              >
                SEE
              </MagneticButton>
              <MagneticButton
                variant="outline"
                size="md"
                href={site.whatsapp.href}
                external
                cursorLabel="Talk"
                trailing={<span aria-hidden="true">↗</span>}
              >
                Send word
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* rail */}
      <div className="shell relative z-10 mt-8 w-full">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-line/10 pt-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span className="label">Corvid / product engineer</span>
            <span className="label hidden sm:inline">Lagos → the internet</span>
            <span className="label text-ink">
              {time} <span className="text-muted">{offset}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => scrollTo('#work', { offset: -72 })}
            className="group flex items-center gap-3"
            aria-label="Scroll to work"
            data-cursor="Scroll"
          >
            <span className="label hidden sm:inline">Scroll, or don’t</span>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-line/25 transition-colors group-hover:border-accent">
              <motion.span
                aria-hidden="true"
                className="text-[0.7rem]"
                animate={reduced ? undefined : { y: [0, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↓
              </motion.span>
            </span>
          </button>
        </div>
      </div>

      <span className="rail pointer-events-none absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[0.55rem] uppercase tracking-[0.4em] text-muted/60 xl:block">
        Permanently under construction
      </span>
    </section>
  );
}
