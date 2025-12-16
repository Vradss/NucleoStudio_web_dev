import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['var(--font-space-mono-regular)', 'monospace'],
        'geist-regular': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-medium': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-semibold': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-bold': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-super': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',  /* Usado en parallax-boxes */
        },
        nucleo: {
          DEFAULT: 'var(--nucleo-primary)',
          50: 'var(--nucleo-light)',
          200: 'var(--nucleo-secondary)',
          500: 'var(--nucleo-primary)',
          600: 'var(--nucleo-primary-dark)',
          primary: 'var(--nucleo-primary)',
          'primary-dark': 'var(--nucleo-primary-dark)',
          light: 'var(--nucleo-light)',
          secondary: 'var(--nucleo-secondary)',
          dark: 'var(--nucleo-dark)',
          'dark-secondary': 'var(--nucleo-dark-secondary)',
          'dark-tertiary': 'var(--nucleo-dark-tertiary)',
          'dark-quaternary': 'var(--nucleo-dark-quaternary)',
          'dark-border': 'var(--nucleo-dark-border)',
          'dark-hover': 'var(--nucleo-dark-hover)',
          'dark-hover-light': 'var(--nucleo-dark-hover-light)',
          'bg-selector': 'var(--nucleo-bg-selector)',
          highlight: 'var(--nucleo-highlight)',
        },
        secondary: {
          DEFAULT: 'var(--nucleo-secondary)',  /* Color secundario de Nucleo */
        },
        border: 'var(--border)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config

