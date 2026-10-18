import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { cn } from '@/lib/utils';

export interface LightboxImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

/** Keyboard-operable image viewer: Esc closes, arrows step, focus stays inside. */
export function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const open = index !== null;
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useScrollLock(open);

  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('button');
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, step]);

  const current = index !== null ? images[index] : undefined;

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-paper/95 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
        >
          <div ref={panelRef} className="flex w-full max-w-6xl flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="label">
                {String((index ?? 0) + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line/25 text-ink transition-colors hover:border-accent hover:text-accentInk"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line/25 text-ink transition-colors hover:border-accent hover:text-accentInk"
                  aria-label="Next image"
                >
                  →
                </button>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="ml-2 flex h-10 items-center gap-2 rounded-full border border-line/25 px-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accentInk"
                >
                  Close <span aria-hidden="true">✕</span>
                </button>
              </div>
            </div>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={cn('max-h-[76svh] w-full rounded-[3px] object-contain', 'bg-surface')}
            />
            {current.caption ? <p className="label normal-case tracking-normal">{current.caption}</p> : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
