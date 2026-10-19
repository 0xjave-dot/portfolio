import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { processSteps } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Reveal } from '@/components/ui/Reveal';
import { SplitText } from '@/components/ui/SplitText';

/** Four stages of a bird building a website. The line draws as you scroll. */
export function Process() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.85', 'end 0.6'] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="defer-paint relative border-t border-line/15 py-section"
      aria-labelledby="process-title"
    >
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
            Four stages, no mystery. You see the build on a staging URL the whole way through, you
            own everything at the end, and nobody says “circling back”.
          </p>
        </div>

        <div ref={timelineRef} className="relative mt-16 sm:mt-20">
          <div aria-hidden="true" className="absolute left-0 right-0 top-[9px] hidden h-px bg-line/20 md:block">
            <motion.div style={{ scaleX: reduced ? 1 : scaleX }} className="h-px origin-left bg-accent" />
          </div>
          <div aria-hidden="true" className="absolute bottom-0 left-[9px] top-2 w-px bg-line/20 md:hidden">
            <motion.div style={{ scaleY: reduced ? 1 : scaleY }} className="h-full w-px origin-top bg-accent" />
          </div>

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {processSteps.map((step, index) => (
              <li key={step.index} className="relative pl-10 md:pl-0">
                <Reveal delay={index * 0.08}>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-line/25 bg-paper md:relative md:mb-6"
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

          <div aria-hidden="true" className="mt-10 hidden items-center justify-end gap-3 md:flex">
            <span className="h-px w-16 bg-line/20" />
            <img
              src="/bird/raven-logo.webp"
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="h-6 w-6 rounded-[3px] object-cover opacity-50 ring-1 ring-line/15"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
