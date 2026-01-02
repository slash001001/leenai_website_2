import '../globals.css';

import type {Metadata} from 'next';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Inter, IBM_Plex_Sans_Arabic} from 'next/font/google';

import {direction, isLocale, type Locale} from '@/lib/i18n';
import {SiteHeader} from '@/components/site-header';
import {SiteFooter} from '@/components/site-footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ar',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'LeenAI',
  description: 'LeenAI — Decision Systems delivered as KPI-anchored pilots.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!isLocale(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} dir={direction(locale)} className="bg-swirl">
      <body className={`${inter.variable} ${arabic.variable} antialiased text-brand-ink`}>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <SiteFooter locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
