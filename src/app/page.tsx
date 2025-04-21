'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';

const BassScene = dynamic(() => import('../components/BassScene'), {
  ssr: false,
});

const translations = {
  title: 'Contact Us',
  subtitle:
    "We'll help you find the perfect bass guitar. just fill out the form and we'll get back to you soon.",
  name: 'Full Name',
  email: 'Email Address',
  message: 'Message',
  namePlaceholder: 'Enter your name',
  emailPlaceholder: 'Enter your email',
  messagePlaceholder: 'Write your message here...',
  send: 'Send Message',
  sending: 'Sending...',
  success: "Thank you! We'll get back to you soon.",
  error: 'Something went wrong. Please try again.',
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Failed to submit form');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      // Fire confetti immediately
      const end = Date.now() + 3000;
      const colors = theme === 'dark' 
        ? ['#a1ff14', '#81cc10', '#ffffff']
        : ['#a1ff14', '#81cc10', '#1a1a1a'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

    } catch (error: Error | unknown) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : translations.error);
      console.error('Error:', error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main
      className="min-h-screen relative"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Theme Toggle */}
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* 3D Scene */}
        <div className="absolute inset-0 z-10">
          <Suspense fallback={null}>
            <BassScene />
          </Suspense>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 min-h-screen flex flex-col justify-center">
          <div className="text-center space-y-8">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text mix-blend-difference"
              style={{
                color: 'var(--text)',
                textShadow: theme === 'dark' ? '0 0 80px rgba(161, 255, 20, 0.2)' : 'none',
              }}
            >
              You Need a New
              <br />
              <span style={{ color: theme === 'dark' ? 'var(--primary)' : 'var(--primary-dark)' }}>
                Bass Guitar
              </span>
            </h1>

            <p
              className="text-xl md:text-2xl max-w-3xl mx-auto mix-blend-difference"
              style={{ color: 'var(--text-subtle)' }}
            >
              Discover your perfect sound with our curated collection of premium bass guitars. From
              vintage classics to modern masterpieces.
            </p>

            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  const formElement = document.getElementById('contact-form');
                  formElement?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 z-10 relative group"
                style={{
                  background: 'var(--primary)',
                  color: '#000000',
                  boxShadow: theme === 'dark' ? '0 0 30px rgba(161, 255, 20, 0.3)' : 'none',
                }}
              >
                <span className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-[rgba(161,255,20,0.2)] group-hover:blur-md" />
                <span className="relative">Find Your Bass</span>
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[var(--bg)] to-transparent z-0" />
            <div
              className="absolute -top-1/2 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
              style={{
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-lg" id="contact-form">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            {translations.title}
          </h1>
          <p style={{ color: 'var(--text-subtle)' }}>{translations.subtitle}</p>
        </div>

        <div className="rounded-xl shadow-lg p-6 md:p-8" style={{ background: 'var(--surface)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text)' }}
              >
                {translations.name}
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder={translations.namePlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text)' }}
              >
                {translations.email}
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 rounded-lg text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder={translations.emailPlaceholder}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text)' }}
              >
                {translations.message}
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2 rounded-lg resize-none text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
                placeholder={translations.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 z-10 relative group transition-all duration-300 cursor-pointer"
              style={{
                background: 'var(--primary)',
                color: 'var(--button-text)',
              }}
            >
              {status === 'loading' ? translations.sending : translations.send}
            </button>

            {status === 'success' && (
              <p className="text-sm text-center" style={{ color: 'var(--add-green)' }} role="alert">
                {translations.success}
              </p>
            )}
            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: 'var(--add-red)' }} role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
