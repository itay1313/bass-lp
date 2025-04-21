'use client';

import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import ThemeToggle from '../components/ThemeToggle';
import MiddleSection from '@/components/MiddleSection';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main
      className="min-h-screen relative"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <ThemeToggle />
      <Hero />
      <MiddleSection />
      <ContactForm />
    </main>
  );
}
