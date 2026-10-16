import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://mobile-simulator-web.vercel.app'),
  title: {
    default: 'Mobile Simulator — Responsive Testing Tool (77+ Devices)',
    template: '%s | Mobile Simulator'
  },
  description: 'Free responsive testing tool for web developers. Simulate websites on 77+ smartphones, tablets, foldables, and laptops. Viewport resolutions, media queries, and free transparent PNG mockups.',
  keywords: [
    'responsive simulator',
    'mobile simulator',
    'viewport sizes',
    'device resolution',
    'iphone 18 pro viewport',
    'pixel 10 screen resolution',
    'responsive web design testing',
    'free phone mockups',
    'transparent png mockup'
  ],
  authors: [{ name: 'Mobile Simulator' }],
  creator: 'Mobile Simulator',
  publisher: 'Mobile Simulator',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mobile-simulator-web.vercel.app',
    title: 'Mobile Simulator — Responsive Web Testing Suite',
    description: 'Test responsive design on 77+ smartphones, tablets, and laptops. Accurate viewports, user agents, and transparent frame mockups.',
    siteName: 'Mobile Simulator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mobile Simulator — Responsive Web Testing Suite',
    description: 'Test responsive design on 77+ smartphones, tablets, and laptops.',
  },
  verification: {
    // Allows easy copy-paste of Google Search Console verification meta tag:
    google: 'google-site-verification-token',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased selection:bg-sky-500 selection:text-white">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
