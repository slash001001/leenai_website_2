import Link from 'next/link';
import Script from 'next/script';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import type {Locale} from '@/lib/i18n';
import {pick} from '@/lib/content';
import {solutions} from '@/content/solutions';
import {orgJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {SolutionIcon} from '@/components/solution-icon';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: Locale}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'الحلول | لينAI' : 'Solutions | LeenAI';
  const description =
    locale === 'ar'
      ? 'موديولات قرار قابلة للتكرار: SmartQuote، WhatsApp CX، OpsRAG، طبقة بيانات، ورؤية.'
      : 'Repeatable decision modules: SmartQuote, WhatsApp CX, OpsRAG, Data Platform, and Vision.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/solutions`,
      languages: {
        en: `${url}/en/solutions`,
        ar: `${url}/ar/solutions`
      }
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function SolutionsPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const base = `/${locale}`;

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />

      <section className="py-14">
        <Container className="space-y-10">
          <SectionHeading
            title={locale === 'ar' ? 'الحلول' : 'Solutions'}
            subtitle={
              locale === 'ar'
                ? 'كل حل هو “Decision System” يُسلَّم كبايلوت مع حزمة قبول.'
                : 'Each solution is a governed decision system delivered as a pilot with an Acceptance Pack.'
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            {solutions.map((s) => (
              <Card key={s.slug} className="hover:shadow-sm transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-brand-paleCyan p-2">
                      <SolutionIcon name={s.icon} className="h-5 w-5 text-brand-deepBlue" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle>{pick(locale, s.title)}</CardTitle>
                      <CardDescription>{pick(locale, s.tagline)}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-brand-ink/80">{pick(locale, s.overview)}</p>
                  <div className="flex flex-wrap gap-2">
                    {pick(locale, s.triggers).slice(0, 2).map((tr) => (
                      <span key={tr} className="text-xs text-brand-ink/70">
                        • {tr}
                      </span>
                    ))}
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`${base}/solutions/${s.slug}`}>
                      {locale === 'ar' ? 'تفاصيل' : 'Details'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-brand-paleCyan bg-white/70 p-6 text-sm text-brand-ink/70">
            <div className="font-medium text-brand-ink">{locale === 'ar' ? 'ملاحظة' : 'Note'}</div>
            <p className="mt-2">
              {locale === 'ar'
                ? 'نبدأ “قراءة فقط” دائمًا. الكتابة تُفتح بعد UAT عبر بوابة أمنية وCR مع خطة Rollback.'
                : 'We always start read‑only. Write operations unlock after UAT via Security Gate + CR with a rollback plan.'}
            </p>
          </div>

          <div>
            <Button asChild size="lg">
              <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
