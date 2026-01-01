'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'en' ? 'ar' : 'en';

  function onSwitch() {
    // Replace the leading locale segment: /en/... or /ar/...
    const newPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${nextLocale}`);
    router.push(newPath);
  }

  return (
    <Button variant="ghost" size="sm" onClick={onSwitch} aria-label="Switch language">
      {nextLocale.toUpperCase()}
    </Button>
  );
}
