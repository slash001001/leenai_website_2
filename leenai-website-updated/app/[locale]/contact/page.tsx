import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';
import Script from 'next/script';

import type {Locale} from '@/lib/i18n';
import {orgJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {ContactForm} from '@/components/contact-form';
import {Badge} from '@/components/ui/badge';

export async function generateMetadata({
  params
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const {locale} = params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'تواصل معنا | لينAI' : 'Contact | LeenAI';
  const description =
    locale === 'ar'
      ? 'احجز مكالمة: صف القرار الذي تريد تحسينه وسنرد بخطة بايلوت ومعايير قبول.'
      : 'Book a call: tell us the decision you want to improve; we’ll respond with a pilot plan and acceptance criteria.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/contact`,
      languages: {en: `${url}/en/contact`, ar: `${url}/ar/contact`}
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function ContactPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />

      <section className="py-14">
        <Container className="grid gap-8 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Decision-first</Badge>
              <Badge variant="outline">Read-only first</Badge>
              <Badge variant="outline">PDPL-aware</Badge>
            </div>
            <SectionHeading title={t('contact.title')} subtitle={t('contact.subtitle')} />
            <Card>
              <CardHeader>
                <CardTitle>{locale === 'ar' ? 'ماذا نحتاج منك؟' : 'What we need from you'}</CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'معلومتان كافية للبداية.'
                    : 'Two inputs are enough to start.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-brand-ink/80">
                <div>1) {locale === 'ar' ? 'قرار العمل المراد تحسينه.' : 'The business decision you want to improve.'}</div>
                <div>2) {locale === 'ar' ? 'مصادر البيانات المتاحة (ERP/CRM/ملفات/قنوات).' : 'Available data sources (ERP/CRM/files/channels).'}</div>
                <div className="pt-2 text-xs text-brand-ink/60">
                  {locale === 'ar'
                    ? 'تجنب إرسال بيانات شخصية إلا للضرورة.'
                    : 'Avoid sending personal data unless necessary.'}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t('contact.title')}</CardTitle>
                <CardDescription>
                  {locale === 'ar'
                    ? 'سنعود لك بخطة بايلوت ومعايير قبول.'
                    : 'We’ll reply with a pilot plan and acceptance criteria.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
