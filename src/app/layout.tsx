import Image from 'next/image';

import StoreProvider from '@/app/store-provider';

import type { Metadata } from 'next';

import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Maestri',
  description: 'IT-service for beauty industry',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('min-h-svh', 'font-sans', inter.variable)}>
      <body className="min-h-svh antialiased relative">
        <Image
          src="/images/bg.jpg"
          alt="background"
          className="-z-10"
          sizes="100vw"
          priority
          fill
        />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
