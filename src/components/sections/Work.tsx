import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@/data/projects';
import { projects } from '@/data/projects';
import { useLenis } from '@/hooks/useLenis';
import { cn, pad } from '@/lib/utils';

function BrowserFrame({ project, className }: { project: Project; className?: string }) {
  const host = project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <div
      className={cn(
        'browser-chrome group/frame transition-colors duration-500 hover:border-line/30',
        className,
      )}
      data-cursor="View"
    >
      <div className="flex items-center gap-2 border-b border-line/10 bg-surface/80 px-3 py-2">
        <span className="flex gap-1" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
        </span>
        <span className="ml-2 truncate rounded-full bg-paper/60 px-2.5 py-0.5 font-mono text-[0.55rem] tracking-[0.08em] text-muted">
          {host}
        </span>
      </div>
      <div className="relative overflow-hidden bg-surface">
        <img
          src={project.images.hero.src}
          alt={project.images.hero.alt}
          width={project.images.hero.width}
          height={project.images.hero.height}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover object-top grayscale-[35%] transition-[transform,filter] duration-[900ms] ease-edge group-hover/frame:scale-[1.025] group-hover/frame:grayscale-0"
        />
      </div>
    </div>
  );
}

function PanelMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accentInk">№ {project.index}</span>
      <span className="label">{project.category}</span>
      <span className="label">/ {project.year}</span>
    </div>
  );
}

function PanelLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <Link
        to={`/work/${project.slug}`}
        className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent hover:text-accentInk"
        data-cursor="Open"
      >
        Case study
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </Link>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
        data-cursor="Live"
      >
        Live site
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </a>
    </div>
  );
}

function StackTags({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {project.stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-line/15 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function WorkPanel({ project }: { project: Project }) {
  return (
    <article className="flex h-full w-full shrink-0 items-center px-[6vw]">
      <div className="mx-auto grid w-full max-w-[74rem] grid-cols-12 items-center gap-6 lg:gap-10">
        <div className="col-span-12 flex flex-col gap-5 lg:col-span-4">
          <PanelMeta project={project} />
          <h3 className="font-display text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[0.94] tracking-[-0.04em]">
            {project.name}
          </h3>
          <p className="max-w-sm font-serif text-[clamp(1.05rem,1.6vw,1.3rem)] italic leading-snug text-ink/80">
            {project.note}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-ink/55">{project.summary}</p>
          <StackTags project={project} />
          <PanelLinks project={project} />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div className="relative">
            <BrowserFrame project={project} />
            <span className="stamp absolute -bottom-3 right-4 bg-paper text-stamp">{project.stamp}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

function WorkStack() {
  return (
    <div className="flex flex-col gap-14 px-gutter pb-4 sm:gap-20">
      {projects.map((project) => (
        <article key={project.slug} className="flex flex-col gap-5">
          <PanelMeta project={project} />
          <h3 className="font-display text-[clamp(2.2rem,9vw,3.4rem)] font-medium leading-[0.92] tracking-[-0.04em]">
            {project.name}
          </h3>
          <BrowserFrame project={project} />
          <p className="font-serif text-base italic leading-snug text-ink/80">{project.note}</p>
          <p className="text-sm leading-relaxed text-ink/55">{project.summary}</p>
          <StackTags project={project} />
          <PanelLinks project={project} />
        </article>
      ))}
    </div>
  );
}

/**
 * Selected work.
 *
 * Desktop: the section pins and four project panels travel horizontally, scrubbed
 * by scroll position (GSAP + ScrollTrigger on Lenis' ticker).
 *
 * Mobile / reduced motion: a plain vertical stack. The switch is CSS-only
 * (`.work-horizontal` / `.work-stack`), so React never unmounts a subtree that
 * ScrollTrigger has re-parented into a pin-spacer — which is what used to throw
 * "removeChild is not a child of this node" on resize.
 */
export function Work() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const { scrollTo } = useLenis();

  useLayoutEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let observer: IntersectionObserver | undefined;

    const setup = async () => {
      // GSAP + ScrollTrigger are ~45KB, and only this section needs them, so they
      // are fetched once the section is within a viewport of being seen.
      const { gsap, ScrollTrigger } = await import('@/lib/gsap');
      if (cancelled) return;

      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 0.35}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`;
              if (counterRef.current) {
                counterRef.current.textContent = pad(
                  Math.min(projects.length, Math.floor(self.progress * projects.length) + 1),
                );
              }
            },
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(track, { clearProps: 'transform' });
        };
      });

      // Late-mounted sections and lazy images change the document height.
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
    <section id="work" className="relative border-t border-line/15" aria-labelledby="work-title">
      <div className="shell flex flex-col gap-3 pb-8 pt-16 sm:flex-row sm:items-end sm:justify-between sm:pt-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="label text-accentInk">01</span>
            <span className="label">Field records</span>
          </div>
          <h2
            id="work-title"
            className="mt-3 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-medium leading-[0.92] tracking-[-0.045em]"
          >
            Four specimens,
            <br />
            <span className="font-serif italic tracking-[-0.02em] text-ink/60">all still alive.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-ink/60">
          Client sites and booking platforms, running right now. Every one links to the real thing —
          poke at them.
        </p>
      </div>

      <div className="work-horizontal">
        <div ref={pinRef} className="relative h-[100svh] overflow-hidden">
          <div ref={trackRef} className="flex h-full items-center will-change-transform">
            {projects.map((project) => (
              <WorkPanel key={project.slug} project={project} />
            ))}
            <div className="flex h-full w-full shrink-0 items-center px-[6vw]">
              <div className="mx-auto w-full max-w-[74rem] border-t border-line/20 pt-6">
                <div className="flex flex-col gap-4">
                  <span className="label">End of index</span>
                  <p className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-medium leading-[0.98] tracking-[-0.035em]">
                    That’s all four — for now.
                  </p>
                  <p className="max-w-sm text-sm leading-relaxed text-ink/60">
                    New work lands here first. If you want yours next, the contact section is one scroll
                    away.
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo('#contact', { offset: -72 })}
                    className="inline-flex w-fit items-center gap-2 border-b border-ink/30 pb-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] hover:border-accent hover:text-accentInk"
                    data-cursor="Talk"
                  >
                    Start a project <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
            <div className="shell flex items-center justify-between border-t border-line/10 py-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[0.65rem] text-ink">
                  <span ref={counterRef}>01</span>
                  <span className="text-muted"> / {pad(projects.length)}</span>
                </span>
                <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted sm:inline">
                  Scroll to advance
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-px w-24 bg-line/20 sm:w-40">
                  <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-accent" />
                </div>
                <span aria-hidden="true" className="font-mono text-[0.7rem] text-muted">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="work-stack">
        <WorkStack />
      </div>
    </section>
  );
}
