import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext, THEME_STORAGE_KEY } from '@/lib/theme-context';
import type { Theme } from '@/lib/theme-context';
import { prefersReducedMotion } from '@/lib/utils';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light' || attr === 'dark') return attr;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

/**
 * Theme lives on <html data-theme>, so every CSS variable flips at once.
 * Toggling uses the View Transitions API for a circular wipe from the click
 * point, with an instant swap as the fallback.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* storage can be unavailable in private mode — the theme still works */
    }
  }, [theme]);

  const applyTheme = useCallback((next: Theme, origin?: { x: number; y: number }) => {
    const doc = document as DocumentWithViewTransition;

    if (origin) {
      document.documentElement.style.setProperty('--vt-x', `${origin.x}px`);
      document.documentElement.style.setProperty('--vt-y', `${origin.y}px`);
    }

    const canAnimate = typeof doc.startViewTransition === 'function' && !prefersReducedMotion();
    if (!canAnimate) {
      setThemeState(next);
      return;
    }
    doc.startViewTransition?.(() => {
      flushSync(() => setThemeState(next));
    });
  }, []);

  const setTheme = useCallback((next: Theme) => applyTheme(next), [applyTheme]);

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      applyTheme(theme === 'dark' ? 'light' : 'dark', origin);
    },
    [theme, applyTheme],
  );

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
