import Image from 'next/image';

import StoreProvider from '@/app/store-provider';

import type { Metadata } from 'next';

import './globals.css';

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
    <html lang="en" className="min-h-svh">
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
