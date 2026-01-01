import type {Locale} from '@/lib/i18n';

export type Localized<T> = {en: T; ar: T};

export function pick<T>(locale: Locale, value: Localized<T>): T {
  return value[locale];
}
