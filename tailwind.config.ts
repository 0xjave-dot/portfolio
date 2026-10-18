import type { Config } from 'tailwindcss';

/**
 * Design tokens live here so every surface in the app can be re-skinned from one file.
 * Colours are RGB channel triplets in CSS variables (see src/styles/index.css) so that
 * Tailwind opacity modifiers (bg-accent/20) keep working across both themes.
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentInk: 'rgb(var(--accent-ink) / <alpha-value>)',
        stamp: 'rgb(var(--stamp) / <alpha-value>)',
        glint: 'rgb(var(--glint) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.1', letterSpacing: '0.14em' }],
        'display-sm': ['clamp(2.5rem, 8vw, 5.5rem)', { lineHeight: '0.92', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.88', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(3.5rem, 14vw, 13rem)', { lineHeight: '0.82', letterSpacing: '-0.05em' }],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
        section: 'clamp(5rem, 12vw, 11rem)',
      },
      maxWidth: {
        shell: '96rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        edge: 'cubic-bezier(0.22, 1, 0.36, 1)',
        snap: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'slide-left': {
          '0%': { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.72)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translate3d(0,12px,0)' },
          '100%': { opacity: '1', transform: 'translate3d(0,0,0)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
        'rise-in': 'rise-in 0.6s cubic-bezier(0.22,1,0.36,1) both',
        blink: 'blink 1.1s step-end infinite',
      },
    },
  },
  plugins: [],
};

export default config;
