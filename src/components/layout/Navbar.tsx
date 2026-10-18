import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { birdArt } from '@/data/bird';
import { navItems, sectionIds, site } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useLenis } from '@/hooks/useLenis';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { useScrollLock } from '@/hooks/useScrollLock';
import { useTheme } from '@/hooks/useTheme';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="Raven — home"
      data-cursor="Home"
    >
      <img
        src={birdArt.logo.src}
        alt=""
        width={birdArt.logo.width}
        height={birdArt.logo.height}
        className="h-8 w-8 rounded-[4px] object-cover ring-1 ring-line/20 transition-transform duration-500 group-hover:-rotate-3 sm:h-9 sm:w-9"
      />
      <span className="font-display text-xl font-medium leading-none tracking-[-0.05em] sm:text-2xl">RAVEN</span>
      <span className="mb-2 hidden font-mono text-[0.5rem] tracking-[0.1em] text-accentInk sm:inline">№42</span>
    </Link>
  );
}

function ThemeGlyph({ theme }: { theme: 'dark' | 'light' }) {
  return theme === 'dark' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.4 14.6A8.6 8.6 0 1 1 9.4 3.6a6.9 6.9 0 0 0 11 11Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const direction = useScrollDirection();
  const active = useActiveSection(sectionIds);
  const { scrollTo } = useLenis();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const goTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      const id = href.replace('#', '');
      if (location.pathname !== '/') {
        navigate('/');
        window.setTimeout(() => scrollTo(`#${id}`, { offset: -72 }), 420);
        return;
      }
      scrollTo(href, { offset: -72 });
    },
    [location.pathname, navigate, scrollTo],
  );

  const hidden = direction === 'down' && scrolled && !menuOpen;
  // On case-study pages the hero band is painted in the client's palette, so the
  // nav needs its own surface to stay legible over any of the four.
  const solid = scrolled || menuOpen || location.pathname !== '/';

  return (
    <>
      <motion.header
        className={cn('fixed inset-x-0 top-0', menuOpen ? 'z-[95]' : 'z-[80]')}
        initial={false}
        animate={{ y: hidden ? '-104%' : '0%' }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={cn(
            'border-b transition-colors duration-500',
            solid ? 'border-line/15 bg-paper/85 backdrop-blur-xl' : 'border-transparent',
          )}
        >
          <div className="shell flex h-[64px] items-center justify-between gap-4 sm:h-[72px]">
            <Wordmark onClick={() => setMenuOpen(false)} />

            <nav aria-label="Primary" className="hidden shrink-0 md:block">
              <ul className="flex items-center gap-1 whitespace-nowrap">
                {navItems.map((item) => {
                  const isActive = active === item.id && location.pathname === '/';
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => goTo(item.href)}
                        className={cn(
                          'group relative whitespace-nowrap px-3 py-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] transition-colors duration-300',
                          isActive ? 'text-ink' : 'text-muted hover:text-ink',
                        )}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="mr-1.5 text-[0.55em] text-accentInk/70">{item.index}</span>
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-500 ease-edge',
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line/20 text-ink transition-colors duration-300 hover:border-accent hover:text-accentInk"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                data-cursor="Theme"
              >
                <ThemeGlyph theme={theme} />
              </button>

              <div className="hidden sm:block">
                <MagneticButton
                  variant="solid"
                  size="sm"
                  onClick={() => goTo('#contact')}
                  cursorLabel="Talk"
                  trailing={<span aria-hidden="true">↗</span>}
                >
                  Send word
                </MagneticButton>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="relative z-[92] flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-line/20 md:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                <motion.span
                  className="block h-px w-4 bg-ink"
                  animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
                <motion.span
                  className="block h-px w-4 bg-ink"
                  animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[90] flex flex-col justify-between overflow-y-auto bg-paper px-gutter pb-8 pt-24 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.12 + index * 0.06 }}
                  className="border-b border-line/15"
                >
                  <button
                    type="button"
                    onClick={() => goTo(item.href)}
                    className="flex w-full items-baseline justify-between py-4 text-left"
                  >
                    <span className="font-display text-[clamp(2rem,10vw,3rem)] leading-none tracking-[-0.05em]">
                      {item.label}
                    </span>
                    <span className="font-mono text-[0.58rem] text-muted">{item.index}</span>
                  </button>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={birdArt.face.src}
                  alt={birdArt.face.alt}
                  width={birdArt.face.width}
                  height={birdArt.face.height}
                  className="h-12 w-12 rounded-full border border-line/20 object-cover grayscale"
                />
                <span className="font-mono text-[0.56rem] uppercase leading-relaxed tracking-[0.14em] text-muted">
                  The bird.
                  <br />
                  Still awake.
                </span>
              </div>
              <a href={`mailto:${site.email}`} className="font-mono text-sm text-ink">
                {site.email}
              </a>
              <a
                href={site.whatsapp.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-sm text-ink"
              >
                WhatsApp — {site.phone.display}
              </a>
              <div className="flex items-center justify-between border-t border-line/15 pt-4">
                <span className="label">{site.coords}</span>
                <span className="label">Lagos · {site.timeZoneLabel}</span>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
