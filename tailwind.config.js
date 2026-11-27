/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        onyx: { DEFAULT: '#121212', 900: '#0b0b0b', 800: '#161616', 700: '#1e1e1e', 600: '#2a2a28', 500: '#3a3936' },
        ivory: { DEFAULT: '#f3eee4', muted: '#cfc8bb', dim: '#9a948a' },
        champagne: '#e6d5b8',
        gold: { DEFAULT: '#b89a64', light: '#d1b886', dark: '#8c7445' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.32em' },
      maxWidth: { site: '84rem' },
      transitionTimingFunction: { luxe: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
