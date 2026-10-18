import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { services } from '@/data/services';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SplitText } from '@/components/ui/SplitText';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

function PlusMinus({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line/25"
      animate={{ rotate: open ? 90 : 0, borderColor: open ? 'rgb(var(--accent))' : undefined }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <span className="absolute h-px w-3 bg-ink/70" />
      <motion.span
        className="absolute h-3 w-px bg-ink/70"
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      />
    </motion.span>
  );
}

/**
 * Capabilities as an accordion. One open at a time, real buttons, aria wired,
 * and the copy does the selling instead of a stock illustration.
 */
export function Services() {
  const [open, setOpen] = useState<string | null>(services[0]?.index ?? null);
  const reduced = useReducedMotion();

  return (
    <section
      className="defer-paint relative border-t border-line/15 py-section"
      aria-labelledby="services-title"
    >
      <div className="shell grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-4">
          <div className="flex items-center gap-3">
            <span className="label text-accentInk">04</span>
            <span className="label">Capabilities</span>
          </div>
          <SplitText
            as="h2"
            id="services-title"
            className="mt-4 font-display text-[clamp(2.2rem,5vw,3.7rem)] font-medium leading-[0.95] tracking-[-0.045em]"
            lines={['What the', 'bird does.']}
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/60">
            Five things, done properly. Most projects use two or three of them — you don’t have to
            buy the whole menu.
          </p>
          <p className="mt-6 max-w-[19rem] border-l border-accent/40 pl-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
            Fixed scope. Fixed price. Half up front. No retainer you can’t leave.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <ul className="flex flex-col">
            {services.map((service) => {
              const isOpen = open === service.index;
              const panelId = `service-panel-${service.index}`;
              const buttonId = `service-button-${service.index}`;
              return (
                <li key={service.index} className="border-t border-line/15 last:border-b">
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : service.index)}
                      className="group flex w-full items-center gap-4 py-5 text-left transition-colors duration-300 hover:bg-ink/[0.03] sm:gap-7 sm:py-6"
                      data-cursor={isOpen ? 'Close' : 'Open'}
                    >
                      <span
                        className={cn(
                          'font-mono text-[0.6rem] transition-colors duration-300',
                          isOpen ? 'text-accentInk' : 'text-muted',
                        )}
                      >
                        C-{service.index}
                      </span>
                      <span
                        className={cn(
                          'flex-1 font-display text-[clamp(1.45rem,3.3vw,2.4rem)] font-medium leading-none tracking-[-0.035em] transition-[color,transform] duration-500 ease-edge',
                          isOpen ? 'text-ink' : 'text-ink/70 group-hover:translate-x-1 group-hover:text-ink',
                        )}
                      >
                        {service.title}
                      </span>
                      <span className="hidden max-w-[15rem] text-right text-xs leading-snug text-muted lg:block">
                        {service.promise}
                      </span>
                      <PlusMinus open={isOpen} />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduced ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                        exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-12 gap-6 pb-8 sm:pl-16">
                          <p className="col-span-12 text-sm leading-relaxed text-ink/75 md:col-span-8 md:text-base">
                            {service.detail}
                          </p>
                          <ul className="col-span-12 flex flex-wrap content-start gap-1.5 md:col-span-4">
                            {service.deliverables.map((item) => (
                              <li
                                key={item}
                                className="rounded-full border border-line/20 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-muted"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
