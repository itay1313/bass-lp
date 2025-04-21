'use client';

import React, { Suspense } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const BassScene = dynamic(() => import('./BassScene'), {
  ssr: false,
});

export default function Hero() {
  const { theme } = useTheme();

  return (
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
      <div className="absolute inset-0 z-10 hidden md:block">
        <Suspense fallback={null}>
          <BassScene />
        </Suspense>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 lg:pb-32 min-h-screen flex flex-col justify-center">
        <div className="text-center space-y-8">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
            style={{
              color: 'var(--text)',
              textShadow: theme === 'dark' ? '0 0 80px rgba(161, 255, 20, 0.2)' : 'none',
            }}
          >
            You Need a New
            <br />
            <span style={{ color: 'var(--primary)' }}>Bass Guitar</span>
          </h1>

          <p
            className="text-xl md:text-2xl max-w-3xl mx-auto"
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
                color: 'var(--button-text)',
                boxShadow: theme === 'dark' ? '0 0 30px rgba(161, 255, 20, 0.3)' : 'none',
              }}
            >
              <span className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-[rgba(161,255,20,0.2)] group-hover:blur-md" />
              <span className="relative">Find Your Bass</span>
            </button>
          </div>

          {/* Mobile Bass Scene */}
          <div className="block md:hidden w-full h-[500px] relative mt-8 -mx-4">
            <div className="absolute inset-0 w-full">
              <Suspense fallback={null}>
                <BassScene />
              </Suspense>
            </div>
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
  );
}
