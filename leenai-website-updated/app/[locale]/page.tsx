import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import {getTranslations} from 'next-intl/server';

import type {Metadata} from 'next';
import type {Locale} from '@/lib/i18n';
import {pick} from '@/lib/content';
import {site, home} from '@/content/site';
import {solutions} from '@/content/solutions';
import {pilotTimeline} from '@/content/timeline';
import {faqs} from '@/content/faqs';
import {orgJsonLd, faqJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {SectionHeading} from '@/components/section-heading';
import {SolutionIcon} from '@/components/solution-icon';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';

export async function generateMetadata({
  params
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const {locale} = params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'لينAI | أنظمة قرار خلال 6–8 أسابيع' : 'LeenAI | Decision Systems in 6–8 weeks';
  const description = pick(locale, site.description);

  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}`,
      languages: {
        en: `${url}/en`,
        ar: `${url}/ar`
      }
    },
    openGraph: {
      title,
      description,
      images: [`${url}/og-default.png`]
    }
  };
}

export default async function HomePage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const base = `/${locale}`;

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />
      <Script id="faq-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(faqJsonLd(faqs, locale))}} />

      <section className="relative overflow-hidden">
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge>{locale === 'ar' ? 'Decision-first' : 'Decision-first'}</Badge>
              <Badge variant="outline">{locale === 'ar' ? 'PDPL-aware' : 'PDPL-aware'}</Badge>
              <Badge variant="outline">{locale === 'ar' ? 'Read-only first' : 'Read-only first'}</Badge>
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-brand-ink md:text-5xl">
              {pick(locale, home.hero.headline)}
            </h1>

            <p className="text-base text-brand-ink/80 md:text-lg">
              {pick(locale, home.hero.subheadline)}
            </p>

            <ul className="space-y-2 text-sm text-brand-ink/80">
              {pick(locale, home.hero.bullets).map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-teal" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`${base}/solutions`}>{t('cta.viewSolutions')}</Link>
              </Button>
            </div>

            <p className="text-xs text-brand-ink/60">
              {locale === 'ar'
                ? 'ملاحظة: الأرقام أعلاه أمثلة مستهدفة للقبول ويتم تخصيصها حسب بياناتك ونطاق البايلوت.'
                : 'Note: Targets shown are example acceptance metrics and are customized per scope and data.'}
            </p>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-brand-gradient p-8 shadow-sm">
              <div className="rounded-xl bg-white/90 p-6">
                <div className="flex items-center gap-3">
                  <Image src="/logo.png" alt="LeenAI" width={240} height={120} priority />
                </div>
                <div className="mt-6 space-y-3">
                  {pick(locale, site.taglines).map((line) => (
                    <p key={line} className="text-sm text-brand-ink/80">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="mt-6 rounded-lg border border-brand-paleCyan bg-white p-4 text-xs text-brand-ink/70">
                  {locale === 'ar'
                    ? 'افتراضيًا: لا بيانات شخصية في الـPrompts أو الـLogs. وتفعيل الكتابة يتم فقط بعد UAT عبر بوابة أمنية وCR.'
                    : 'Default posture: no personal data in prompts or logs. Writes unlock only post‑UAT via Security Gate + CR.'}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            title={locale === 'ar' ? 'نتائج قابلة للقياس' : 'Measurable outcomes'}
            subtitle={
              locale === 'ar'
                ? 'كل بايلوت مرتبط بقرار عمل ومؤشرات أداء ومعايير قبول.'
                : 'Every pilot is anchored to a business decision, KPIs, and clear acceptance criteria.'
            }
          />

          <div className="grid gap-4 md:grid-cols-3">
            {home.kpiHighlights.map((k) => (
              <Card key={pick(locale, k.label)}>
                <CardHeader>
                  <CardTitle>{pick(locale, k.label)}</CardTitle>
                  <CardDescription>{pick(locale, k.value)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            title={locale === 'ar' ? 'حلول (Decision Systems)' : 'Solutions (Decision Systems)'}
            subtitle={
              locale === 'ar'
                ? 'موديولات قابلة للتكرار ضمن بايلوت 6–8 أسابيع.'
                : 'Repeatable modules delivered as 6–8 week pilots.'
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
                  <Button asChild variant="outline">
                    <Link href={`${base}/solutions/${s.slug}`}>
                      {locale === 'ar' ? 'تفاصيل الحل' : 'View details'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            title={locale === 'ar' ? 'كيف نعمل خلال البايلوت' : 'How the pilot works'}
            subtitle={
              locale === 'ar'
                ? 'مسار أسبوعي مبسّط (يُضبط حسب النطاق).'
                : 'A simple week-by-week path (adjusted per scope).'
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            {pilotTimeline.map((step) => (
              <Card key={pick(locale, step.title)}>
                <CardHeader>
                  <CardTitle>{pick(locale, step.title)}</CardTitle>
                  <CardDescription>{pick(locale, step.detail)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div>
            <Button asChild>
              <Link href={`${base}/how-it-works`}>{locale === 'ar' ? 'تفاصيل المنهج' : 'See full method'}</Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="space-y-8">
          <SectionHeading
            title={locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
            subtitle={
              locale === 'ar'
                ? 'إجابات مختصرة — بلا مبالغة.'
                : 'Clear answers — no hype.'
            }
          />

          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible>
                {faqs.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>{pick(locale, item.q)}</AccordionTrigger>
                    <AccordionContent>{pick(locale, item.a)}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="rounded-2xl bg-brand-gradient p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="text-white">
                <div className="text-xl font-semibold">
                  {locale === 'ar' ? 'جاهز لبايلوت قرار خلال 6–8 أسابيع؟' : 'Ready for a 6–8 week decision pilot?'}
                </div>
                <div className="text-sm text-white/90">
                  {locale === 'ar'
                    ? 'صف لنا القرار الذي تريد تحسينه وسنرسل خطة بايلوت ومعايير قبول.'
                    : 'Tell us the decision you want to improve — we’ll respond with a pilot plan and acceptance criteria.'}
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
