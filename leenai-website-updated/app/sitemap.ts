import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';
import {solutions} from '@/content/solutions';

const staticRoutes = ['', '/solutions', '/how-it-works', '/security-pdpl', '/case-studies', '/resources', '/about', '/contact', '/legal/privacy', '/legal/terms'];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl();
  const locales: Array<'en' | 'ar'> = ['en', 'ar'];

  const pages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of staticRoutes) {
      pages.push({
        url: `${url}/${locale}${route}`,
        lastModified: new Date()
      });
    }

    for (const s of solutions) {
      pages.push({
        url: `${url}/${locale}/solutions/${s.slug}`,
        lastModified: new Date()
      });
    }
  }

  return pages;
}
