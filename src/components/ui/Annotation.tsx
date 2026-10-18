import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Hand-drawn-ish arrow. Used to point at things the copy is already implying. */
export function HandArrow({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      aria-hidden="true"
      className={cn(className, flip && '-scale-x-100')}
    >
      <path
        d="M4 12c14 26 38 38 72 34 12-1.4 22-5 32-11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="2 4"
      />
      <path d="M101 28l8 7-9 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Stamp({
  children,
  className,
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  return <span className={cn('stamp', tilt && 'stamp-tilt', className)}>{children}</span>;
}

/** Figure caption with its catalogue number. */
export function FigureCaption({
  label,
  children,
  className,
}: {
  label: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <figcaption className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-1', className)}>
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-accentInk">{label}</span>
      {children ? (
        <span className="font-mono text-[0.58rem] leading-relaxed tracking-[0.02em] text-muted">
          {children}
        </span>
      ) : null}
    </figcaption>
  );
}
