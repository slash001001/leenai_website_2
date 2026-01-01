import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Script from 'next/script';

import type {Locale} from '@/lib/i18n';
import {orgJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({
  params
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const {locale} = params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'قصص النجاح | لينAI' : 'Case studies | LeenAI';
  const description =
    locale === 'ar'
      ? 'قوالب لقصص نجاح البايلوت — سيتم إضافة قصص فعلية بعد الإطلاق.'
      : 'Pilot case study templates — real stories will be added after launch.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/case-studies`,
      languages: {en: `${url}/en/case-studies`, ar: `${url}/ar/case-studies`}
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function CaseStudiesPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const base = `/${locale}`;

  const templates = [
    {
      title: {en: 'B2B Distributor — RFQ→Quote', ar: 'موزّع B2B — RFQ→Quote'},
      desc: {
        en: 'Template: capture baseline TTQ, extraction quality, exception handling, and acceptance pack.',
        ar: 'قالب: توثيق خط الأساس لـ TTQ، جودة الاستخلاص، معالجة الاستثناءات، وحزمة القبول.'
      },
      badge: 'SmartQuote'
    },
    {
      title: {en: 'Hospitality — Guest Care Copilot', ar: 'الضيافة — مساعد رعاية الضيف'},
      desc: {
        en: 'Template: omnichannel responses with citations, escalation to agents, and service KPIs.',
        ar: 'قالب: ردود متعددة القنوات مع استشهادات، تصعيد للوكلاء، ومؤشرات خدمة.'
      },
      badge: 'WhatsApp CX'
    },
    {
      title: {en: 'Logistics — Shipment Ops Agent', ar: 'اللوجستيات — وكيل تشغيل الشحنات'},
      desc: {
        en: 'Template: status/ETA automation, exception routing, and operational dashboards.',
        ar: 'قالب: أتمتة الحالة/ETA، توجيه الاستثناءات، ولوحات تشغيل.'
      },
      badge: 'Ops Data Platform'
    }
  ];

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />

      <section className="py-14">
        <Container className="space-y-10">
          <SectionHeading
            title={locale === 'ar' ? 'قصص النجاح' : 'Case studies'}
            subtitle={
              locale === 'ar'
                ? 'سنضيف قصصًا فعلية بعد توقيع وتنفيذ البايلوتات الأولى.'
                : 'We’ll add real stories after the first pilots are signed and delivered.'
            }
          />

          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((c) => (
              <Card key={c.title.en}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-lg">{locale === 'ar' ? c.title.ar : c.title.en}</CardTitle>
                    <Badge variant="outline">{c.badge}</Badge>
                  </div>
                  <CardDescription>{locale === 'ar' ? c.desc.ar : c.desc.en}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`${base}/contact`}>{t('cta.bookCall')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-brand-paleCyan bg-white/70 p-6 text-sm text-brand-ink/70">
            {locale === 'ar'
              ? 'إذا رغبت، يمكننا مشاركة قالب “Case Study” وتعبئته من بياناتك بعد UAT.'
              : 'If you want, we can share a case study template and fill it using your post-UAT results.'}
          </div>
        </Container>
      </section>
    </>
  );
}
