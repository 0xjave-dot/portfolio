import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '@/hooks/useMagnetic';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  strength?: number;
  cursorLabel?: string;
  trailing?: ReactNode;
}

type Props =
  | (BaseProps & { href: string; external?: boolean; to?: never; onClick?: () => void })
  | (BaseProps & { to: string; href?: never; external?: never; onClick?: () => void })
  | (BaseProps & {
      href?: never;
      to?: never;
      external?: never;
      onClick?: () => void;
      type?: 'button' | 'submit';
      disabled?: boolean;
    });

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[0.65rem]',
  md: 'h-12 px-6 text-[0.7rem] sm:h-14 sm:px-8',
  lg: 'h-14 px-8 text-xs sm:h-16 sm:px-10',
};

const variants: Record<Variant, string> = {
  solid: 'bg-accent text-[#0A0A0B] border border-accent',
  outline: 'bg-transparent text-ink border border-line/25',
  ghost: 'bg-transparent text-ink border border-transparent',
};

/**
 * Magnetic pill. The whole button leans toward the cursor and springs back;
 * the label sits above a sliding fill so hover reads as intent, not decoration.
 */
export function MagneticButton({
  children,
  className,
  variant = 'outline',
  size = 'md',
  strength = 0.28,
  cursorLabel,
  trailing,
  ...rest
}: Props) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic<HTMLDivElement>(strength);

  const classes = cn(
    'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-mono uppercase tracking-[0.16em] transition-colors duration-300',
    sizes[size],
    variants[variant],
    rest.onClick || 'href' in rest || 'to' in rest ? 'cursor-pointer' : '',
    className,
  );
  const fill =
    variant === 'solid'
      ? 'bg-ink translate-y-full group-hover:translate-y-0'
      : 'bg-accent translate-y-full group-hover:translate-y-0';

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={cn('absolute inset-0 transition-transform duration-500 ease-edge', fill)}
      />
      <span
        className={cn(
          'relative z-10 inline-flex items-center gap-2.5 transition-colors duration-300',
          variant === 'solid' ? 'group-hover:text-paper' : 'group-hover:text-[#0A0A0B]',
        )}
      >
        {children}
        {trailing}
      </span>
    </>
  );

  const dataCursor = cursorLabel ?? 'Open';

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="inline-flex"
    >
      {'href' in rest && rest.href ? (
        <a
          href={rest.href}
          className={classes}
          data-cursor={dataCursor}
          onClick={rest.onClick}
          {...(rest.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        >
          {inner}
        </a>
      ) : 'to' in rest && rest.to ? (
        <Link to={rest.to} className={classes} data-cursor={dataCursor} onClick={rest.onClick}>
          {inner}
        </Link>
      ) : (
        <button
          type={'type' in rest ? (rest.type ?? 'button') : 'button'}
          className={classes}
          data-cursor={dataCursor}
          onClick={rest.onClick}
          disabled={'disabled' in rest ? rest.disabled : undefined}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
