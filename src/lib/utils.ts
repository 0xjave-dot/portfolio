/** Join conditional class names. Deliberately tiny — no runtime dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const isBrowser = typeof window !== 'undefined';

/** 6.5244° N, 3.3792° E — used in the mono micro-labels. */
export const LAGOS = {
  lat: 6.5244,
  lng: 3.3792,
  timeZone: 'Africa/Lagos',
} as const;

export function formatLagosTime(date: Date, withSeconds = true): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: LAGOS.timeZone,
    hour: '2-digit',
    minute: '2-digit',
    ...(withSeconds ? { second: '2-digit' } : {}),
    hour12: false,
  }).format(date);
}

export function formatLagosOffset(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: LAGOS.timeZone,
    timeZoneName: 'shortOffset',
  }).formatToParts(date);
  return parts.find((p) => p.type === 'timeZoneName')?.value ?? 'GMT+1';
}

/** Two-digit index, e.g. 1 -> "01". */
export const pad = (n: number): string => String(n).padStart(2, '0');

export function prefersReducedMotion(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isTouchDevice(): boolean {
  if (!isBrowser) return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

/** PNG-safe slug for in-page anchors, e.g. "Let's talk" -> "lets-talk". */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
