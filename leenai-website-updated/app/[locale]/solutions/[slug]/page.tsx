import Link from 'next/link';
import Script from 'next/script';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {getTranslations} from 'next-intl/server';

import type {Locale} from '@/lib/i18n';
import {pick} from '@/lib/content';
import {solutions} from '@/content/solutions';
import {serviceJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {SolutionIcon} from '@/components/solution-icon';
import {Badge} from '@/components/ui/badge';

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ar'];
  return locales.flatMap((locale) => solutions.map((s) => ({locale, slug: s.slug})));
}

export async function generateMetadata({
  params
}: {
  params: {locale: Locale; slug: string};
}): Promise<Metadata> {
  const {locale, slug} = params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return {};
  const url = siteUrl();
  const title = `${pick(locale, solution.title)} | LeenAI`;
  const description = pick(locale, solution.tagline);

  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/solutions/${slug}`,
      languages: {
        en: `${url}/en/solutions/${slug}`,
        ar: `${url}/ar/solutions/${slug}`
      }
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function SolutionPage({params}: {params: {locale: Locale; slug: string}}) {
  const {locale, slug} = params;
  const t = await getTranslations({locale});
  const base = `/${locale}`;

  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  return (
    <>
      <Script
        id={`service-jsonld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(serviceJsonLd(solution, locale))}}
      />

      <section className="py-14">
        <Container className="space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge>{locale === 'ar' ? 'Solution' : 'Solution'}</Badge>
              <Badge variant="outline">{locale === 'ar' ? 'Decision System' : 'Decision System'}</Badge>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-brand-paleCyan p-3">
                <SolutionIcon name={solution.icon} className="h-6 w-6 text-brand-deepBlue" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-semibold tracking-tight text-brand-ink">
                  {pick(locale, solution.title)}
                </h1>
                <p className="text-base text-brand-ink/75 md:text-lg">
                  {pick(locale, solution.tagline)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`${base}/solutions`}>{locale === 'ar' ? 'العودة للحلول' : 'Back to solutions'}</Link>
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'نظرة عامة' : 'Overview'}</CardTitle>
              <CardDescription>{pick(locale, solution.overview)}</CardDescription>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'متى نستخدمه؟ (Triggers)' : 'When to use it (Triggers)'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-brand-ink/80">
                  {pick(locale, solution.triggers).map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'تدفق العمل' : 'Typical workflow'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-sm text-brand-ink/80">
                  {pick(locale, solution.workflow).map((x, i) => (
                    <li key={x} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-paleCyan text-xs font-semibold text-brand-deepBlue">
                        {i + 1}
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'مصادر البيانات' : 'Data sources'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-brand-ink/80">
                  {pick(locale, solution.dataSources).map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-midBlue" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'مؤشرات القبول (أمثلة)' : 'Acceptance targets (examples)'}</CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'المستهدفات تُضبط حسب نطاقك وبياناتك.'
                    : 'Targets are customized per scope and data.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {solution.kpis.length > 0 ? (
                  <ul className="space-y-2 text-sm text-brand-ink/80">
                    {solution.kpis.map((k) => (
                      <li key={pick(locale, k.label)} className="flex items-center justify-between gap-3">
                        <span>{pick(locale, k.label)}</span>
                        <span className="rounded-full bg-brand-paleCyan px-2 py-1 text-xs text-brand-deepBlue">
                          {pick(locale, k.target)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-brand-ink/70">
                    {locale === 'ar'
                      ? 'يتم الاتفاق على KPIs ضمن وثيقة النطاق وحزمة القبول.'
                      : 'KPIs are agreed in the scoped Acceptance Pack.'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'ملاحظات ضوابط' : 'Guardrail notes'}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-brand-ink/80">
                {pick(locale, solution.notes).map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="rounded-2xl bg-brand-gradient p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-white">
                <div className="text-xl font-semibold">
                  {locale === 'ar' ? 'هل هذا هو البايلوت الصحيح لحالتك؟' : 'Is this the right pilot for you?'}
                </div>
                <div className="text-sm text-white/90">
                  {locale === 'ar'
                    ? 'أرسل 2–3 سيناريوهات وبياناتك المتاحة وسنقترح نطاقًا ومعايير قبول.'
                    : 'Send 2–3 scenarios and available data; we’ll propose scope and acceptance criteria.'}
                </div>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
