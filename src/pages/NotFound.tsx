import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { usePageMeta } from '@/hooks/usePageMeta';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function NotFound() {
  usePageMeta({
    title: '404 — wrong turn | Raven',
    description: 'That page does not exist. Head back to the work.',
    path: '/404',
  });

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center pt-28 pb-20">
      <div className="shell">
        <div className="flex items-center gap-3">
          <span className="label text-accentInk">404</span>
          <span className="label">Off the grid</span>
        </div>

        <h1 className="mt-6 font-display text-[clamp(3rem,14vw,11rem)] font-medium leading-[0.82] tracking-[-0.06em]">
          <span className="outline-type">Wrong</span>
          <br />
          <span className="font-serif italic tracking-[-0.02em]">turn.</span>
        </h1>

        <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
          That URL isn’t one of mine. The work is this way — or press <kbd className="rounded border border-line/30 px-1.5 py-0.5 font-mono text-[0.7em]">~</kbd> and
          type <span className="font-mono text-accentInk">projects</span>.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton to="/" variant="solid" size="md" cursorLabel="Home" trailing={<span aria-hidden="true">↗</span>}>
            Back to the site
          </MagneticButton>
          <MagneticButton href={site.whatsapp.href} external variant="outline" size="md" cursorLabel="WhatsApp">
            WhatsApp
          </MagneticButton>
        </div>

        <div className="mt-16 border-t border-line/15 pt-6">
          <span className="label">Or jump straight to a case study</span>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/work/${project.slug}`}
                  className="link-underline font-mono text-[0.68rem] uppercase tracking-[0.14em] text-ink/80 hover:text-ink"
                >
                  {project.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
