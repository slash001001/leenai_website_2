'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useLocale, useTranslations} from 'next-intl';
import {Menu, X} from 'lucide-react';

import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Container} from '@/components/container';
import {LanguageSwitcher} from '@/components/language-switcher';

const navItems = [
  {key: 'solutions', href: '/solutions'},
  {key: 'how', href: '/how-it-works'},
  {key: 'security', href: '/security-pdpl'},
  {key: 'caseStudies', href: '/case-studies'},
  {key: 'resources', href: '/resources'},
  {key: 'about', href: '/about'}
] as const;

export function SiteHeader() {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);

  const base = `/${locale}`;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-paleCyan bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href={base} className="flex items-center gap-3">
          <Image src="/icon.png" alt="LeenAI" width={34} height={34} priority />
          <span className="font-semibold tracking-tight text-brand-ink">LeenAI</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`${base}${item.href}`}
              className="text-sm text-brand-ink/80 hover:text-brand-deepBlue"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden">
          <div className="border-t border-brand-paleCyan bg-white">
            <Container className="py-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={`${base}${item.href}`}
                    className={cn('text-sm text-brand-ink/90 hover:text-brand-deepBlue')}
                    onClick={() => setOpen(false)}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <LanguageSwitcher />
                  <Button asChild size="sm" onClick={() => setOpen(false)}>
                    <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
