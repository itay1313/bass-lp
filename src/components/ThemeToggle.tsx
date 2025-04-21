'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-2 rounded-lg backdrop-blur-sm"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <SunIcon className="w-6 h-6" style={{ color: 'var(--text)' }} />
        ) : (
          <MoonIcon className="w-6 h-6" style={{ color: 'var(--text)' }} />
        )}
      </button>
    </div>
  );
}
