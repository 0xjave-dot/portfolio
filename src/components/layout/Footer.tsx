import { useEffect, useState } from 'react';
import { birdArt } from '@/data/bird';
import { navItems, site } from '@/data/site';
import { useLenis } from '@/hooks/useLenis';
import { cn } from '@/lib/utils';

/**
 * Sticky-reveal footer: it sits under the page (`sticky bottom-0`, z-0) while the
 * opaque main column scrolls over it, so it is uncovered rather than pushed up.
 *
 * Because the footer is technically always in the viewport, its giant wordmark is
 * only painted once the reader is near the end of the page — otherwise it would
 * become the LCP element on load (and cost a layout shift while fonts load).
 */
export function Footer() {
  const { scrollTo } = useLenis();
  const year = new Date().getFullYear();
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const doc = document.documentElement;
      setNearEnd(window.scrollY + window.innerHeight > doc.scrollHeight - window.innerHeight * 1.6);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    const interval = window.setInterval(check, 1200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.clearInterval(interval);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <footer className="sticky bottom-0 z-0 flex min-h-[72svh] flex-col justify-between border-t border-line/15 bg-surface pb-5 pt-12">
      <div className="shell flex flex-1 flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-dot-pulse rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="label text-ink">{site.availability}</span>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="link-underline font-mono text-[0.66rem] uppercase tracking-[0.16em]"
            data-cursor="Email"
          >
            {site.email} ↗
          </a>
        </div>

        <div className="flex flex-1 flex-col justify-center gap-6">
          <div className="flex items-end justify-between gap-6">
            <button
              type="button"
              onClick={() => scrollTo(0)}
              className={cn('group w-fit text-left transition-opacity duration-300', nearEnd ? 'opacity-100' : 'opacity-0')}
              aria-label="RAVEN — back to top"
              aria-hidden={nearEnd ? undefined : 'true'}
              tabIndex={nearEnd ? undefined : -1}
              data-cursor="Top"
            >
              <span className="block font-display text-[clamp(3.2rem,16vw,12rem)] font-medium leading-[0.76] tracking-[-0.06em] text-transparent transition-colors duration-700 ease-edge [-webkit-text-stroke:1px_rgb(var(--ink)/0.45)] group-hover:text-ink group-hover:[-webkit-text-stroke:1px_transparent]">
                RAVEN
              </span>
            </button>
            <img
              src={birdArt.face.src}
              alt={birdArt.face.alt}
              width={birdArt.face.width}
              height={birdArt.face.height}
              loading="lazy"
              decoding="async"
              className={cn(
                'mb-2 hidden h-20 w-20 shrink-0 rounded-full border border-line/20 object-cover grayscale transition-all duration-700 hover:grayscale-0 sm:block',
                nearEnd ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line/15 pt-5">
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 font-display text-lg tracking-[-0.02em]">
                <img
                  src={birdArt.logo.src}
                  alt=""
                  width={birdArt.logo.width}
                  height={birdArt.logo.height}
                  loading="lazy"
                  className="h-5 w-5 rounded-[3px] object-cover ring-1 ring-line/20"
                />
                Raven <span className="font-mono text-[0.6rem] text-muted">— {site.tagline}</span>
              </span>
              <span className="label normal-case tracking-normal">
                No templates were harmed. One bird was mildly inconvenienced.
              </span>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                {['Brand', 'UI/UX', 'Web apps', 'Booking', 'Ecommerce'].map((item) => (
                  <li key={item} className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                className="label text-ink hover:text-accentInk"
              >
                WhatsApp
              </a>
              <a href={`tel:${site.phone.tel}`} className="label text-ink hover:text-accentInk">
                {site.phone.display}
              </a>
              {site.socials
                .filter((social) => social.label === 'GitHub')
                .map((social) => (
                  <a
                    key={social.handle}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="label text-ink hover:text-accentInk"
                  >
                    GitHub {social.handle}
                  </a>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/15 pt-4">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(item.href, { offset: -72 })}
                    className="label text-ink/70 transition-colors hover:text-accentInk"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('edge:terminal'))}
              className="group flex items-center gap-2 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              <span className="rounded border border-line/25 px-1.5 py-0.5 group-hover:border-accent group-hover:text-accentInk">
                ~
              </span>
              Terminal
            </button>
            <span className="label">© {year} Raven</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
