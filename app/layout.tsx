import type { Metadata, Viewport } from 'next';
import { Pinyon_Script, Cormorant_Garamond, Noto_Serif_Devanagari } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';
import { weddingConfig } from '@/config/invite';

const pinyon = Pinyon_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pinyon',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const devanagari = Noto_Serif_Devanagari({
  weight: ['400', '500', '600'],
  subsets: ['devanagari'],
  variable: '--font-devanagari',
  display: 'swap',
});

const siteUrl =
  process.env.RENDER_EXTERNAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  weddingConfig.meta.url;

export const metadata: Metadata = {
  title: weddingConfig.meta.title,
  description: weddingConfig.meta.description,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    url: siteUrl,
    siteName: `${weddingConfig.couple.groom} & ${weddingConfig.couple.bride} Wedding`,
    images: [
      {
        url: weddingConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${weddingConfig.couple.groom} & ${weddingConfig.couple.bride} Wedding Invitation`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: weddingConfig.meta.title,
    description: weddingConfig.meta.description,
    images: [weddingConfig.meta.ogImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#fbf1ed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pinyon.variable} ${cormorant.variable} ${devanagari.variable}`}>
      <body className="bg-bg text-ink antialiased min-h-screen selection:bg-rose/30">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
