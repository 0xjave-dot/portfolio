import { useLayoutEffect, useRef } from 'react';
import { processSteps } from '@/data/skills';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';

/** Four stages of a bird building a website, scrubbed horizontally by page scroll. */
export function Process() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    const setup = async () => {
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      if (cancelled) return;

      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
        const tween = gsap.to(track, {
          // Move the stages left as the page scrolls down, revealing each next one from the right.
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.3}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (lineRef.current) lineRef.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
          if (lineRef.current) lineRef.current.style.transform = '';
        };
      });

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener('edge:layout', refresh);
      window.addEventListener('load', refresh);
      const timer = window.setTimeout(refresh, 300);
      cleanup = () => {
        window.clearTimeout(timer);
        window.removeEventListener('edge:layout', refresh);
        window.removeEventListener('load', refresh);
        media.revert();
      };
    };

    if (typeof IntersectionObserver === 'undefined') {
      void setup();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            void setup();
          }
        },
        { rootMargin: '80% 0px' },
      );
      observer.observe(pin);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <section className="relative border-t border-line/15 py-section" aria-labelledby="process-title">
      <div className="shell">
        <div className="grid grid-cols-12 gap-y-6 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="label text-accentInk">05</span>
              <span className="label">Lifecycle</span>
            </div>
            <SplitText
              as="h2"
              id="process-title"
              className="mt-4 font-display text-[clamp(2.2rem,5vw,3.7rem)] font-medium leading-[0.95] tracking-[-0.045em]"
              lines={['Forage. Nest.', 'Hoard. Fly.']}
            />
          </div>
          <p className="col-span-12 max-w-md self-end text-sm leading-relaxed text-ink/60 lg:col-span-5 lg:col-start-8">
            Four stages, no mystery. You see the build on a staging URL the whole way through, you own
            everything at the end, and nobody says “circling back”.
          </p>
        </div>

        <div ref={pinRef} className="process-pin relative mt-12 h-[100svh] overflow-hidden sm:mt-16">
          <div ref={trackRef} className="process-track relative h-full w-max">
            <div
              aria-hidden="true"
              className="process-line absolute left-0 right-0 top-[9px] h-px bg-line/20"
            >
              <div ref={lineRef} className="h-px origin-left bg-accent" />
            </div>
            <ol className="relative flex h-full items-stretch gap-5 sm:gap-6">
              {processSteps.map((step, index) => (
                <li key={step.index} className="process-step relative w-[82vw] max-w-[28rem] shrink-0 pt-10">
                  <Reveal delay={index * 0.08}>
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-line/25 bg-paper"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <div>
                      <span className="label">
                        {step.index} — {step.title}
                      </span>
                      <h3 className="mt-1 font-serif text-[clamp(1.8rem,3vw,2.4rem)] italic leading-none tracking-[-0.01em] text-ink">
                        {step.stage}
                      </h3>
                      <p className="mt-3 max-w-[26rem] text-sm leading-relaxed text-ink/65">{step.body}</p>
                      <p className="mt-4 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-accentInk">
                        → {step.output}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
