import {getRequestConfig} from 'next-intl/server';
import {locales} from '@/lib/i18n';

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    // Fallback handled by middleware; keep a safe guard.
    locale = 'en';
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
