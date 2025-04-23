'use client';

import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ContactForm from '../components/ContactForm';
import ThemeToggle from '../components/ThemeToggle';
import MiddleSection from '@/components/MiddleSection';
import Footer from '@/components/Footer';
import { jsonArray } from '@/components/jsonArray';
import SearchInput from '@/components/searchInput';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const filteredSections = jsonArray.filter(
    section =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main
      className="min-h-screen relative"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <ThemeToggle />
      <Hero />
      <SearchInput onSearch={setSearchQuery} />
      {filteredSections.map((section, index) => (
        <MiddleSection
          key={index}
          title={section.title}
          description={section.description}
          video={section.video}
        />
      ))}
      <ContactForm />
      <Footer />
    </main>
  );
}
