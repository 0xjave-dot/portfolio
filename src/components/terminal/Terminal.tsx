import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from '@/data/projects';
import { site } from '@/data/site';
import { useTheme } from '@/hooks/useTheme';
import { useScrollLock } from '@/hooks/useScrollLock';

type LineKind = 'input' | 'output' | 'muted' | 'accent' | 'error';

interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

const BANNER = [
  'JESSE // terminal — specimen no. 042',
  'Type "help". Esc closes. "~" opens.',
];

const HELP: Array<[string, string]> = [
  ['help', 'List commands'],
  ['work', 'List the five live projects'],
  ['open <slug>', 'Open a case study (gic, zanori, apreeltree, fitables, dudja)'],
  ['contact', 'Email, phone, WhatsApp'],
  ['socials', 'GitHub and the rest'],
  ['theme', 'Toggle light / dark'],
  ['whoami', 'Identity crisis'],
  ['caw', 'Raven noises'],
  ['worm', 'Do not'],
  ['clear', 'Clear the transcript'],
  ['exit', 'Close the terminal'],
];

const CAW = [
  '   __',
  '  <(o )___',
  '   ( ._> /',
  '    `---\\',
  '',
  'caw. that will be ₦500,000.',
];

let lineId = 0;

/** `~` terminal. Keyboard-only easter egg, in the bird's voice. */
export function Terminal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<Line[]>(() => [
    ...BANNER.map((text) => ({ id: lineId++, kind: 'muted' as LineKind, text })),
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  useScrollLock(open);

  const push = useCallback((entries: Array<{ kind: LineKind; text: string }>) => {
    setLines((current) => [...current, ...entries.map((entry) => ({ id: lineId++, ...entry }))]);
  }, []);

  useEffect(() => {
    const openFromFooter = () => setOpen(true);
    window.addEventListener('edge:terminal', openFromFooter);
    return () => window.removeEventListener('edge:terminal', openFromFooter);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable;
      if (!open && !typing && (event.key === '`' || event.key === '~')) {
        event.preventDefault();
        setOpen(true);
        return;
      }
      if (open && event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines, open]);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      if (!input) return;
      push([{ kind: 'input', text: `jesse@portfolio:~$ ${input}` }]);

      const [command, ...args] = input.toLowerCase().split(/\s+/);
      const argument = args[0];

      switch (command) {
        case 'help':
          push(
            HELP.map(([name, description]) => ({
              kind: 'output' as LineKind,
              text: `${name.padEnd(12)} ${description}`,
            })),
          );
          break;
        case 'work':
        case 'projects':
          push(
            projects.map((project) => ({
              kind: 'output' as LineKind,
              text: `${project.index}  ${project.slug.padEnd(11)} ${project.name} — ${project.category}`,
            })),
          );
          push([{ kind: 'muted', text: 'Run "open <slug>" for the full record.' }]);
          break;
        case 'open': {
          const match = projects.find((project) => project.slug === argument);
          if (!match) {
            push([
              {
                kind: 'error',
                text: `Unknown project "${argument ?? ''}". Try: ${projects.map((p) => p.slug).join(', ')}`,
              },
            ]);
            break;
          }
          push([{ kind: 'accent', text: `Opening /work/${match.slug} …` }]);
          setOpen(false);
          navigate(`/work/${match.slug}`);
          break;
        }
        case 'contact':
          push([
            { kind: 'output', text: `email     ${site.email}` },
            { kind: 'output', text: `whatsapp  ${site.whatsapp.href}` },
            { kind: 'output', text: `phone     ${site.phone.display}` },
            { kind: 'output', text: `location  ${site.location} · ${site.coords}` },
          ]);
          break;
        case 'socials':
          push(
            site.socials.map((social) => ({
              kind: 'output' as LineKind,
              text: `${social.label.padEnd(10)} ${social.href}`,
            })),
          );
          break;
        case 'theme':
          toggleTheme({ x: window.innerWidth - 80, y: 60 });
          push([{ kind: 'accent', text: 'Theme flipped. The bird has opinions about this.' }]);
          break;
        case 'whoami':
          push([
            { kind: 'output', text: 'Jesse. Product engineer. Corvid.' },
            { kind: 'output', text: 'Ships products: interface, API, database, notifications.' },
            { kind: 'muted', text: 'Lagos, Nigeria. Awake.' },
          ]);
          break;
        case 'caw':
          push(CAW.map((text) => ({ kind: 'output' as LineKind, text })));
          break;
        case 'worm':
          push([{ kind: 'error', text: 'I am a bird. That is a trap. No.' }]);
          break;
        case 'clear':
          setLines([]);
          break;
        case 'exit':
        case 'close':
        case 'quit':
          setOpen(false);
          break;
        default:
          push([{ kind: 'error', text: `command not found: ${command}. Type "help".` }]);
      }
    },
    [navigate, push, toggleTheme],
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-end justify-center bg-paper/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Terminal"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-[70svh] w-full max-w-2xl flex-col border border-line/20 bg-[#0A0A0B] text-[#EDEAE3] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:h-[62svh] sm:rounded-[4px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
                  jesse@portfolio — zsh
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-accent"
              >
                close ✕
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 font-mono text-[0.72rem] leading-relaxed sm:text-[0.78rem]"
            >
              {lines.map((line) => (
                <div
                  key={line.id}
                  className={
                    line.kind === 'input'
                      ? 'text-accent'
                      : line.kind === 'muted'
                        ? 'text-white/40'
                        : line.kind === 'accent'
                          ? 'text-accent'
                          : line.kind === 'error'
                            ? 'text-[#FF6B4A]'
                            : 'text-white/80'
                  }
                >
                  <span className="whitespace-pre-wrap">{line.text}</span>
                </div>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
              onSubmit={(event) => {
                event.preventDefault();
                run(value);
                setValue('');
              }}
            >
              <span className="font-mono text-[0.72rem] text-accent">jesse@portfolio:~$</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                className="min-w-0 flex-1 bg-transparent font-mono text-[0.72rem] text-white outline-none placeholder:text-white/25 sm:text-[0.78rem]"
                placeholder="help"
                aria-label="Terminal command"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
              />
              <span className="h-3.5 w-2 animate-blink bg-accent" aria-hidden="true" />
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
