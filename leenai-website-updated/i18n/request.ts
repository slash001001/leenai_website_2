import {getRequestConfig, type GetRequestConfigParams} from 'next-intl/server';
import {locales} from '@/lib/i18n';

export default getRequestConfig(async ({locale}: GetRequestConfigParams) => {
  const resolvedLocale = locales.includes(locale as any) ? locale ?? 'en' : 'en';

  return {
    locale: resolvedLocale,
    messages: (await import(`../messages/${resolvedLocale}.json`)).default
  };
});
