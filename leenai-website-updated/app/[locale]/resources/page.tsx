import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Script from 'next/script';

import type {Locale} from '@/lib/i18n';
import {orgJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: Locale}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'الموارد | لينAI' : 'Resources | LeenAI';
  const description =
    locale === 'ar'
      ? 'قوالب ومواد مفيدة للبايلوت: SOW، نموذج Intake، ملخص الأمان.'
      : 'Useful pilot materials: SOW, intake template, security overview.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/resources`,
      languages: {en: `${url}/en/resources`, ar: `${url}/ar/resources`}
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function ResourcesPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});
  const base = `/${locale}`;

  const items = [
    {
      title: {en: 'Master Pilot SOW (v1.1)', ar: 'قالب SOW للبايلوت (v1.1)'},
      desc: {
        en: 'Scope in/out, deliverables, acceptance pack, security/PDPL posture, and change control.',
        ar: 'Scope In/Out، المخرجات، حزمة القبول، الأمان/PDPL، وإدارة التغيير.'
      }
    },
    {
      title: {en: 'RFQ Intake Form', ar: 'نموذج RFQ Intake'},
      desc: {
        en: 'A structured form to capture details needed for quotation automation pilots.',
        ar: 'نموذج منظم لجمع تفاصيل بايلوت أتمتة العروض.'
      }
    },
    {
      title: {en: 'Security & PDPL overview', ar: 'ملخص الأمان وPDPL'},
      desc: {
        en: 'Read-only first, no PII in prompts/logs by default, audit trails, and on‑prem/VPC options in KSA.',
        ar: 'قراءة فقط أولاً، عدم وضع PII في الـPrompts/Logs افتراضيًا، سجلات تدقيق، وخيارات نشر داخل السعودية.'
      }
    }
  ];

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />

      <section className="py-14">
        <Container className="space-y-10">
          <SectionHeading
            title={locale === 'ar' ? 'الموارد' : 'Resources'}
            subtitle={
              locale === 'ar'
                ? 'نرسل المواد التفصيلية عند الطلب لتناسب سياقك.'
                : 'We share detailed materials on request to match your context.'
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <Card key={it.title.en}>
                <CardHeader>
                  <CardTitle>{locale === 'ar' ? it.title.ar : it.title.en}</CardTitle>
                  <CardDescription>{locale === 'ar' ? it.desc.ar : it.desc.en}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline">
                    <Link href={`${base}/contact`}>{t('cta.download')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-brand-paleCyan bg-white/70 p-6 text-sm text-brand-ink/70">
            {locale === 'ar'
              ? 'نبدأ بايلوتاتنا “قراءة فقط” دائمًا. الكتابة تُفتح بعد UAT عبر بوابة أمنية وCR مع خطة Rollback.'
              : 'Pilots always start read‑only. Writes unlock post‑UAT via Security Gate + CR with rollback plans.'}
          </div>
        </Container>
      </section>
    </>
  );
}
