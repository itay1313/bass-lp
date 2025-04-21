'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-6 text-center text-sm" style={{ color: 'var(--text-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4">
        <p>
          © {new Date().getFullYear()} Created by{' '}
          <Link
            href="https://www.linkedin.com/in/itayhaephrati/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--primary)] transition-colors"
          >
            Itay Haephrati
          </Link>
        </p>
      </div>
    </footer>
  );
}
