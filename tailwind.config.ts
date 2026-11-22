import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        ink: 'var(--color-ink)',
        soft: 'var(--color-soft)',
        rose: 'var(--color-rose)',
        line: 'var(--color-line)',
        sage: 'var(--color-sage)',
        wash: 'var(--color-wash)',
        'intro-pink': 'var(--color-intro-pink)',
      },
      fontFamily: {
        script: ['var(--font-pinyon)', 'cursive'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tracked: '0.14em',
        wide: '0.3em',
      },
      boxShadow: {
        'rose-glow': '0 10px 30px -10px rgba(217, 160, 168, 0.25)',
        'rose-subtle': '0 4px 20px -2px rgba(138, 85, 96, 0.08)',
      },
      animation: {
        'breathe-slow': 'breathe 3s ease-in-out infinite',
        'pulse-line': 'pulseLine 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sway-slow': 'sway 6s ease-in-out infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' },
        },
        pulseLine: {
          '0%, 100%': { transform: 'scaleY(0.4) translateY(0)', opacity: '0.4' },
          '50%': { transform: 'scaleY(1) translateY(4px)', opacity: '1' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
