import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { birdArt } from '@/data/bird';
import { site } from '@/data/site';
import { knownBugs, specialInterests } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FigureCaption, Stamp } from '@/components/ui/Annotation';
import { SplitText } from '@/components/ui/SplitText';

const LEAD =
  'I build products. The whole thing — interface, API, database, and the parts nobody screenshots.';

const BIO = [
  'I read the docs. I notice when a button is two pixels off, and I don’t stop until the form works at 360px. It’s the reason the spacing is right.',
  `Just me, start to finish: your brand design, the interface, the schema, the API, the deploy. No handoffs, no “circling back”, no bureaucracy. If something is broken I'll tell you it’s broken, (usually after I fix it, you won't even notice.)`,
  `Off the clock, I'm a Lord of the Rings guy, I like Warhammer, zoology, anime (obviously), dogs, armoured tanks and combustion engines. I know why giraffes are like that. Ask me, I like telling.`,
];

const SPEC = [
  ['Species', 'Raven (Corvus corax, probably)'],
  ['Range', 'Lagos, Nigeria. Occasionally the internet.'],
  ['Habitat', 'Dark rooms, 2am, 47 open tabs'],
  ['Call', 'Low. Mostly swear words.'],
  ['Diet', 'Coffee, bugs, other people’s CSS'],
  ['Also makes', 'Push notifications, bots, games, market scripts, AI workflows'],
  ['Social', 'Shy, unless you want to discuss the fall of Carthage.'],
];

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.38, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.24em] inline-block">
      {children}
    </motion.span>
  );
}

/** Scroll-scrubbed word highlight on the lead line. */
function ScrubLead() {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = LEAD.split(' ');

  return (
    <p
      ref={ref}
      className="font-display text-[clamp(1.5rem,2.7vw,2.15rem)] font-medium leading-[1.25] tracking-[-0.02em] text-ink"
    >
      {words.map((word, index) =>
        reduced ? (
          <span key={`${word}-${index}`} className="mr-[0.24em] inline-block">
            {word}
          </span>
        ) : (
          <Word
            key={`${word}-${index}`}
            progress={scrollYProgress}
            range={[index / words.length, Math.min(1, (index + 2) / words.length)]}
          >
            {word}
          </Word>
        ),
      )}
    </p>
  );
}

function Footnote({ id, children }: { id: number; children: string }) {
  return (
    <li id={`fn-${id}`} className="flex gap-3 border-t border-line/10 py-3 text-xs leading-relaxed text-muted">
      <span className="font-mono text-[0.6rem] text-accentInk">{id}</span>
      <span>{children}</span>
    </li>
  );
}

export function About() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line/15 py-section" aria-labelledby="about-title">
      {/* oversized ghost word */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 select-none font-display text-[16vw] font-medium leading-none tracking-[-0.06em] text-ink/[0.035]"
      >
        SPECIMEN
      </span>

      <div className="shell relative grid grid-cols-12 gap-y-12 lg:gap-x-10">
        {/* artwork column */}
        <div className="col-span-12 lg:col-span-5">
          <div className="relative">
            <figure className="plate halftone bg-surface p-3">
              <img
                src={birdArt.typing.src}
                alt={birdArt.typing.alt}
                width={birdArt.typing.width}
                height={birdArt.typing.height}
                loading="lazy"
                decoding="async"
                className="w-full"
              />
              <FigureCaption label="Fig. 03" className="mt-3">
                at work, 02:14. the code in the glasses is real.
              </FigureCaption>
            </figure>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Stamp className="text-stamp">Specimen № 042</Stamp>
              <span className="label text-right">Hoodie, glasses, 47 tabs</span>
            </div>

            <motion.img
              src={birdArt.brick.src}
              alt={birdArt.brick.alt}
              width={birdArt.brick.width}
              height={birdArt.brick.height}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute -left-8 bottom-24 hidden w-20 rotate-[-12deg] drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] sm:block"
              animate={{ y: [0, -8, 0], rotate: [-12, -8, -12] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* record column */}
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
          <div className="flex items-center gap-3">
            <span className="label text-accentInk">03</span>
            <span className="label">The bird</span>
          </div>

          <div className="flex items-start gap-4">
            <img
              src={birdArt.face.src}
              alt={birdArt.face.alt}
              width={birdArt.face.width}
              height={birdArt.face.height}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full border border-line/20 object-cover grayscale sm:h-20 sm:w-20"
            />
            <div>
              <SplitText
                as="h2"
                id="about-title"
                className="font-display text-[clamp(2rem,4vw,3.1rem)] font-medium leading-[0.98] tracking-[-0.04em]"
                lines={['One bird.', 'All of it.']}
              />
              <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted">
                Self-taught. Lagos. No bootcamp montage.
                <sup>
                  <a href="#fn-1" className="ml-1 text-accentInk hover:underline">
                    1
                  </a>
                </sup>
              </p>
            </div>
          </div>

          <ScrubLead />

          <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink/70 sm:text-base">
            {BIO.map((paragraph, index) => (
              <p key={paragraph.slice(0, 20)}>
                {paragraph}
                {index === 0 ? (
                  <sup>
                    <a href="#fn-2" className="ml-0.5 font-mono text-[0.6em] text-accentInk hover:underline">
                      2
                    </a>
                  </sup>
                ) : null}
                {index === 2 ? (
                  <sup>
                    <a href="#fn-3" className="ml-0.5 font-mono text-[0.6em] text-accentInk hover:underline">
                      3
                    </a>
                  </sup>
                ) : null}
              </p>
            ))}
          </div>

          {/* spec sheet */}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-0 border-t border-line/15 sm:grid-cols-2">
            {SPEC.map(([key, value]) => (
              <div key={key} className="flex items-baseline justify-between gap-4 border-b border-line/10 py-2.5">
                <dt className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted">{key}</dt>
                <dd className="text-right text-[0.8rem] leading-snug text-ink/85">{value}</dd>
              </div>
            ))}
          </dl>

          {/* known bugs */}
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-stamp">Known bugs</span>
              <span className="h-px flex-1 bg-line/15" />
            </div>
            <ul className="mt-3 flex flex-col">
              {knownBugs.map((entry) => (
                <li
                  key={entry.bug}
                  className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/10 py-2 text-sm text-ink/80"
                >
                  <span>{entry.bug}</span>
                  <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-muted">
                    {entry.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* special interests */}
          <div>
            <span className="label">Special interests (selected)</span>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {specialInterests.map((interest) => (
                <li
                  key={interest}
                  className="rounded-full border border-line/20 px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-ink/70 transition-colors hover:border-accent hover:text-accentInk"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          {/* footnotes */}
          <ol className="mt-2 flex flex-col">
            <Footnote id={1}>
              Imaginator. If you got that reference, we’re friends now.
            </Footnote>
            <Footnote id={2}>The two-pixel thing is not a bit. It is the job.</Footnote>
            <Footnote id={3}>It’s real and it’s worse than you think.</Footnote>
          </ol>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-mono text-[0.66rem] uppercase tracking-[0.16em]"
              data-cursor="Email"
            >
              {site.email}
            </a>
            <a
              href={site.whatsapp.href}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline font-mono text-[0.66rem] uppercase tracking-[0.16em]"
              data-cursor="WhatsApp"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
