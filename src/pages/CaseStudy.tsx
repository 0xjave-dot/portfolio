import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { getNextProject, getProject, projects } from '@/data/projects';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Lightbox } from '@/components/ui/Lightbox';
import type { LightboxImage } from '@/components/ui/Lightbox';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';
import NotFound from './NotFound';

const EASE = [0.22, 1, 0.36, 1] as const;

function SectionTitle({ index, children }: { index: string; children: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-line/15 pt-4">
      <span className="font-mono text-[0.62rem] text-accentInk">{index}</span>
      <h2 className="font-display text-[clamp(1.1rem,1.6vw,1.35rem)] font-medium uppercase tracking-[0.08em]">
        {children}
      </h2>
    </div>
  );
}

function MetaRow({ project }: { project: Project }) {
  const items = [
    { label: 'Client', value: project.client },
    { label: 'Role', value: project.role.join(', ') },
    { label: 'Year', value: project.year },
    { label: 'Stack', value: project.stack.join(' · ') },
  ];

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line/15 py-8 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1.5">
          <span className="label">{item.label}</span>
          <span className="text-sm leading-snug text-ink/85">{item.value}</span>
        </div>
      ))}
      <div className="flex flex-col gap-1.5">
        <span className="label">Live</span>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline w-fit text-sm text-ink"
          data-cursor="Live"
        >
          {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')} ↗
        </a>
      </div>
    </div>
  );
}

function LivePreview({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden border border-line/20 bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/15 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.06em] text-muted">
            {project.liveUrl.replace(/^https?:\/\//, '')}
          </span>
        </div>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-ink hover:text-accentInk"
          data-cursor="Open"
        >
          Open live site ↗
        </a>
      </div>

      <div className="relative aspect-[16/10] w-full bg-paper">
        {loaded ? (
          <iframe
            src={project.liveUrl}
            title={`${project.name} live preview`}
            loading="lazy"
            className="h-full w-full border-0"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="absolute inset-0 grid-lines flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="label">Live preview</span>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Loads {project.shortName} inside the page. Some hosts block embedding — if the frame
              stays blank, use “Open live site”.
            </p>
            <MagneticButton variant="outline" size="sm" onClick={() => setLoaded(true)} cursorLabel="Load">
              Load preview
            </MagneticButton>
          </div>
        )}
      </div>
      {loaded ? (
        <p className="border-t border-line/15 px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
          If nothing renders, the site sends an X-Frame-Options header — open it directly instead.
        </p>
      ) : null}
    </div>
  );
}

function CaseStudyView({ project }: { project: Project }) {
  const reduced = useReducedMotion();
  const next = getNextProject(project.slug);
  const [lightbox, setLightbox] = useState<number | null>(null);

  usePageMeta({
    title: `${project.name} — ${project.category} | Jesse`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: `${site.url}${project.images.hero.src}`,
    type: 'article',
  });

  const gallery: LightboxImage[] = [
    { ...project.images.full, caption: `${project.name} — full page, desktop` },
    { ...project.images.mobile, caption: `${project.name} — mobile 390px` },
    ...project.gallery,
  ];

  return (
    <article>
      {/* hero band, painted in the project's own palette */}
      <header
        className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40"
        style={{ backgroundColor: project.theme.bg, color: project.theme.fg }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(to right, ${project.theme.fg} 1px, transparent 1px), linear-gradient(to bottom, ${project.theme.fg} 1px, transparent 1px)`,
            backgroundSize: 'clamp(64px, 8vw, 120px) clamp(64px, 8vw, 120px)',
          }}
        />
        <div className="shell relative">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4"
            style={{ borderColor: `${project.theme.fg}26` }}
          >
            <Link
              to="/"
              className="font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100"
            >
              ← All work
            </Link>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] opacity-70">
              {project.index} / {String(projects.length).padStart(2, '0')} — {project.category} · {project.year}
            </span>
          </div>

          <motion.h1
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mt-8 max-w-[16ch] font-display text-[clamp(2.8rem,9vw,8rem)] font-medium leading-[0.86] tracking-[-0.05em]"
          >
            {project.name}
          </motion.h1>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl"><p className="text-base leading-relaxed opacity-80 sm:text-lg">{project.standfirst}</p><p className="mt-3 font-serif text-lg italic leading-snug opacity-90 sm:text-xl">{project.note}</p></div>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex w-fit items-center gap-3 rounded-full border px-5 py-3 font-mono text-[0.62rem] uppercase tracking-[0.16em] transition-colors"
              style={{ borderColor: `${project.theme.fg}40` }}
              data-cursor="Live"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: project.theme.accent }}
              />
              Live site
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </div>

          <div className="mt-12 lg:mt-16">
            <Parallax distance={reduced ? 0 : 34} outerClassName="rounded-[3px]">
              <img
                src={project.images.hero.src}
                alt={project.images.hero.alt}
                width={project.images.hero.width}
                height={project.images.hero.height}
                className="w-full rounded-[3px] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.65)]"
                decoding="async"
              />
            </Parallax>
          </div>
        </div>
      </header>

      <div className="shell py-12 lg:py-16">
        <MetaRow project={project} />
      </div>

      {/* narrative */}
      <div className="shell grid grid-cols-12 gap-y-12 pb-16 lg:gap-x-12 lg:pb-24">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="01">Overview</SectionTitle>
        </div>
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-8 lg:col-start-5">
          <Reveal>
            <p className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium leading-[1.3] tracking-[-0.02em] text-ink">
              {project.overview}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-y-12 border-t border-line/10 py-16 lg:gap-x-12 lg:py-20">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="02">The challenge</SectionTitle>
        </div>
        <div className="col-span-12 lg:col-span-7 lg:col-start-5">
          <Reveal>
            <p className="text-base leading-relaxed text-ink/75 sm:text-lg">{project.challenge}</p>
          </Reveal>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-y-12 border-t border-line/10 py-16 lg:gap-x-12 lg:py-20">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="03">What I built</SectionTitle>
        </div>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <ol className="flex flex-col">
            {project.built.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <li className="flex gap-5 border-b border-line/10 py-5 first:pt-0 last:border-b-0">
                  <span className="mt-1 font-mono text-[0.6rem] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-ink/80 sm:text-base">{item}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-y-12 border-t border-line/10 py-16 lg:gap-x-12 lg:py-20">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="04">What I handed over</SectionTitle>
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ink/60">
            The deliverables at the end of the build — not the marketing version of them.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <ol className="flex flex-col">
            {project.deliverables.map((item, index) => (
              <Reveal key={item} delay={index * 0.04}>
                <li className="flex gap-5 border-b border-line/10 py-5 first:pt-0 last:border-b-0">
                  <span className="mt-1 font-mono text-[0.6rem] text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed text-ink/80 sm:text-base">{item}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-y-12 border-t border-line/10 py-16 lg:gap-x-12 lg:py-20">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="05">Under the hood</SectionTitle>
          <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ink/60">
            Read off the live deployment, not from a pitch deck.
          </p>
        </div>
        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {project.tech.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.04}>
                <div className="flex flex-col gap-1.5 border-t border-line/15 pt-3">
                  <dt className="label">{item.label}</dt>
                  <dd className="font-display text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">
                    {item.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell grid grid-cols-12 gap-y-12 border-t border-line/10 py-16 lg:gap-x-12 lg:py-20">
        <div className="col-span-12 lg:col-span-3">
          <SectionTitle index="06">Results</SectionTitle>
        </div>
        <div className="col-span-12 flex flex-col gap-8 lg:col-span-8 lg:col-start-5">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
            {project.facts.map((fact) => (
              <Reveal key={fact.label}>
                <div className="flex flex-col gap-1.5 border-t border-line/15 pt-3">
                  <dt className="label">{fact.label}</dt>
                  <dd className="font-display text-lg font-medium leading-snug tracking-[-0.01em] sm:text-xl">
                    {fact.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <p className="max-w-xl border-l border-accent/50 pl-4 text-sm leading-relaxed text-ink/60">
            {project.resultsNote}
          </p>
        </div>
      </div>

      {/* gallery */}
      <div className="shell border-t border-line/10 py-16 lg:py-20">
        <div className="flex items-baseline justify-between gap-4">
          <SectionTitle index="07">Screens</SectionTitle>
          <span className="label hidden sm:block">
            {gallery.length} captures · click to enlarge
          </span>
        </div>
        <div className="mt-8 grid grid-cols-12 gap-5">
          {gallery.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setLightbox(index)}
              className={cn(
                'group overflow-hidden border border-line/15 bg-surface text-left',
                index === 0 ? 'col-span-12 lg:col-span-8' : 'col-span-6 lg:col-span-4',
              )}
              data-cursor="Open"
              aria-label={`Open ${image.alt}`}
            >
              <div className={cn('overflow-hidden', index === 0 && 'max-h-[34rem]')}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    'w-full transition-transform duration-[900ms] ease-edge group-hover:scale-[1.02]',
                    index === 0 && 'object-cover object-top',
                  )}
                />
              </div>
              {image.caption ? (
                <span className="block border-t border-line/10 px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted">
                  {image.caption}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {/* live preview */}
      <div className="shell border-t border-line/10 py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-3">
            <SectionTitle index="08">In the wild</SectionTitle>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-ink/60">
              The site is live and unedited. Load it here, or open it in its own tab.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <LivePreview project={project} />
          </div>
        </div>
      </div>

      {/* next */}
      <Link
        to={`/work/${next.slug}`}
        className="group relative mt-4 block overflow-hidden border-t border-line/15"
        data-cursor="Next"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-[600ms] ease-edge group-hover:scale-y-100"
        />
        <div className="shell relative flex flex-col justify-between gap-4 py-12 transition-colors duration-500 group-hover:text-paper sm:flex-row sm:items-end sm:py-16">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted transition-colors duration-500 group-hover:text-paper/60">
              Next project
            </span>
            <span className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.045em]">
              {next.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="label transition-colors duration-500 group-hover:text-paper/60">
              {next.category}
            </span>
            <span
              aria-hidden="true"
              className="font-display text-3xl transition-transform duration-500 group-hover:translate-x-2"
            >
              →
            </span>
          </div>
        </div>
      </Link>

      <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
    </article>
  );
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) return <NotFound />;
  return <CaseStudyView project={project} />;
}
