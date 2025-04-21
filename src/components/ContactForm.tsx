'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import confetti from 'canvas-confetti';

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

export default function ContactForm() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

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
      const colors =
        theme === 'dark' ? ['#a1ff14', '#81cc10', '#ffffff'] : ['#a1ff14', '#81cc10', '#1a1a1a'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } catch (error: Error | unknown) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : translations.error);
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative" id="contact-form">
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[var(--bg)] to-transparent z-0" />
      <div className="container mx-auto px-4 py-16 max-w-lg">
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
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder={translations.namePlaceholder}
                required
                className="w-full px-4 py-2 rounded-lg text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
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
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder={translations.emailPlaceholder}
                required
                className="w-full px-4 py-2 rounded-lg text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
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
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder={translations.messagePlaceholder}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg resize-none text-start"
                style={{
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  border: '1px solid var(--border)',
                }}
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
              <div className="text-center" style={{ color: 'var(--add-green)' }} role="alert">
                {translations.success}
              </div>
            )}

            {status === 'error' && (
              <div className="text-center" style={{ color: 'var(--add-red)' }} role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
