import { AnimatePresence, motion } from 'framer-motion';

interface ToastProps {
  message: string | null;
}

/** Small confirmation pill, used for copy-to-clipboard. */
export function Toast({ message }: ToastProps) {
  return (
    <div aria-live="polite" aria-atomic="true" className="pointer-events-none fixed bottom-6 left-1/2 z-[95] -translate-x-1/2">
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 rounded-full border border-accent/40 bg-surface/95 px-5 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink">{message}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
