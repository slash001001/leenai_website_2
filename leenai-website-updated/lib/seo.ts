import type {Locale} from '@/lib/i18n';
import type {FaqItem} from '@/content/faqs';
import type {Solution} from '@/content/solutions';
import {pick} from '@/lib/content';
import {site} from '@/content/site';

export function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000';
}

export function orgJsonLd(locale: Locale) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url,
    logo: `${url}/icon.png`,
    description: pick(locale, site.description),
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA'
    }
  };
}

export function serviceJsonLd(solution: Solution, locale: Locale) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pick(locale, solution.title),
    description: pick(locale, solution.overview),
    provider: {
      '@type': 'Organization',
      name: site.name,
      url
    },
    areaServed: {
      '@type': 'Country',
      name: 'Saudi Arabia'
    },
    url: `${url}/${locale}/solutions/${solution.slug}`
  };
}

export function faqJsonLd(faqs: FaqItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: pick(locale, item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: pick(locale, item.a)
      }
    }))
  };
}
