import type { Metadata } from 'next';
import { Fredericka_the_Great, Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const blueprint = Fredericka_the_Great({
  adjustFontFallback: false,
  subsets: ['latin'],
  weight: '400',
  variable: '--font-blueprint',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://restate.vercel.app'),
  title: {
    default: 're-state documentation',
    template: '%s – re-state',
  },
  description: 'Provider-free shared state for React and React Native.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 're-state documentation',
    description: 'Provider-free shared state for React and React Native.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} ${blueprint.variable} flex min-h-screen flex-col font-sans`}>
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: false,
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
