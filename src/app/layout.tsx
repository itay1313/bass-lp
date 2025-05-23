import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import React from 'react';

const rubik = Rubik({
  subsets: ['latin', 'hebrew'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Buy A Funky Bass',
  description: 'A funky bass guitar shop landing page',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rubik.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
