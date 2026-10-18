import { createContext } from 'react';
import type Lenis from 'lenis';

export interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

export const LenisContext = createContext<LenisContextValue | null>(null);
