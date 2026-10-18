import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const ease = [0.76, 0, 0.24, 1] as const;
const bars = 5;

/**
 * Route change wipe: five full-height bars retract upward in sequence as the new
 * page mounts. Keyed on pathname, so it fires on every navigation without any
 * timing choreography from the pages themselves.
 */
export function PageCurtain() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[110] flex">
      {Array.from({ length: bars }).map((_, index) => (
        <motion.div
          key={`${pathname}-${index}`}
          className="h-full flex-1 border-r border-paper/10 bg-ink last:border-r-0"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.62, ease, delay: 0.04 + index * 0.045 }}
          style={{ transformOrigin: 'top' }}
        />
      ))}
    </div>
  );
}
