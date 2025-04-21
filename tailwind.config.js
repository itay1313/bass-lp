import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        success: '#22c55e',
        error: '#ef4444',
        surface: {
          light: 'var(--surface)',
          dark: 'var(--surface)',
        },
        border: {
          light: 'var(--border)',
          dark: 'var(--border)',
        },
        hover: {
          light: 'var(--hover)',
          dark: 'var(--hover)',
        },
        text: {
          light: {
            DEFAULT: 'var(--text)',
            normal: 'var(--text-normal)',
            subtle: 'var(--text-subtle)',
            disabled: 'var(--text-disabled)',
          },
          dark: {
            DEFAULT: 'var(--text)',
            normal: 'var(--text-normal)',
            subtle: 'var(--text-subtle)',
            disabled: 'var(--text-disabled)',
          },
        },
      },
      backgroundColor: {
        light: 'var(--bg)',
        dark: 'var(--bg)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(161, 255, 20, 0.3)',
        'hover-green': '0 0 40px rgba(161, 255, 20, 0.4)',
      },
      transitionDuration: {
        2000: '2000ms',
      },
      blur: {
        xs: '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'var(--primary)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
    forms({
      strategy: 'class',
    }),
  ],
};

export default config;
