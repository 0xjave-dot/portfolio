import { capabilities } from '@/data/skills';
import { Marquee } from '@/components/ui/Marquee';

const notes = [
  'Open for work',
  'Lagos, Nigeria',
  'Will trade websites for coffee',
  'No small talk',
  'One bird, start to finish',
  'Reads the docs',
];

/** The belt under the hero. Reacts to scroll velocity; says what it means. */
export function MarqueeStrip() {
  return (
    <section aria-label="Capabilities" className="relative border-y border-line/15 bg-surface/40">
      <div className="py-4 sm:py-6">
        <Marquee
          items={capabilities}
          speed={36}
          itemClassName="!px-8 !text-[clamp(1.5rem,3.4vw,2.8rem)] !font-display !font-medium !uppercase !tracking-[-0.035em] !text-ink"
        />
      </div>
      <div className="border-t border-line/10 py-2.5">
        <Marquee
          items={notes}
          speed={16}
          direction={-1}
          velocityFactor={0.35}
          itemClassName="!px-5 !text-[0.6rem] !tracking-[0.24em] !text-muted"
        />
      </div>
    </section>
  );
}
