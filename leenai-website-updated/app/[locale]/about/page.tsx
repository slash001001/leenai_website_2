import Script from 'next/script';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import type {Locale} from '@/lib/i18n';
import {orgJsonLd, siteUrl} from '@/lib/seo';

import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

export async function generateMetadata({
  params
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const {locale} = params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'من نحن | لينAI' : 'About | LeenAI';
  const description =
    locale === 'ar'
      ? 'لينAI تبني “مصنع ذكاء اصطناعي” داخل عملك: بيانات→معرفة→وكلاء→إجراءات، مع حوكمة وأمان.'
      : 'LeenAI builds an “AI Factory” inside your business: data → knowledge → agents → actions, with governance and safety.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/about`,
      languages: {
        en: `${url}/en/about`,
        ar: `${url}/ar/about`
      }
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function AboutPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});

  const blocks = [
    {
      title: {en: 'What we mean by “AI Factory”', ar: 'ماذا نعني بـ “AI Factory”؟'},
      desc: {
        en: 'A modular production line that turns your data into governed decision systems — agents that can reason, retrieve, and (when approved) execute actions.',
        ar: 'خط إنتاج معياري يحوّل بياناتك إلى أنظمة قرار محكومة — وكلاء يفهمون ويسترجعون ويُنفذون (عند الموافقة) أفعالاً حقيقية.'
      }
    },
    {
      title: {en: 'Data → Knowledge (RAG)', ar: 'بيانات → معرفة (RAG)'},
      desc: {
        en: 'We prepare and index approved sources (ERP/CRM/files/SharePoint), creating a governed knowledge layer with citations.',
        ar: 'نُجهّز ونفهرس المصادر المعتمدة (ERP/CRM/ملفات/SharePoint)، لبناء طبقة معرفة محكومة مع استشهادات.'
      }
    },
    {
      title: {en: 'Knowledge → Agents', ar: 'معرفة → وكلاء'},
      desc: {
        en: 'We build multi-step agents with state, retries, and policy guardrails — tailored to a named business decision.',
        ar: 'نبني وكلاء متعددة الخطوات مع حالة ومحاولات وإطارات سياسة — مرتبطة بقرار عمل محدد.'
      }
    },
    {
      title: {en: 'Agents → Actions (safely)', ar: 'وكلاء → إجراءات (بأمان)'},
      desc: {
        en: 'We integrate via APIs/connectors. Pilots start read-only; write actions unlock post‑UAT via Security Gate + Change Request (CR).',
        ar: 'نربط عبر APIs/موصلات. البايلوت يبدأ قراءة فقط؛ تفعيل الكتابة بعد UAT عبر بوابة أمنية + طلب تغيير (CR).'
      }
    },
    {
      title: {en: 'Governance, telemetry, and cost control', ar: 'حوكمة ومراقبة وتكلفة'},
      desc: {
        en: 'LangOps/EvalOps: versioning, evaluation gates, dashboards, audit logs, quotas/limits, and escalation to humans (HITL).',
        ar: 'LangOps/EvalOps: إدارة نسخ، بوابات تقييم، لوحات، سجلات تدقيق، حصص/حدود، وتصعيد للبشر (HITL).'
      }
    }
  ];

  return (
    <>
      <Script id="org-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(orgJsonLd(locale))}} />

      <section className="py-14">
        <Container className="space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>AI Factory</Badge>
              <Badge variant="outline">Decision-first</Badge>
              <Badge variant="outline">PDPL-aware</Badge>
            </div>
            <SectionHeading
              title={locale === 'ar' ? 'من نحن' : 'About LeenAI'}
              subtitle={
                locale === 'ar'
                  ? 'نبني أنظمة قرار قابلة للتكرار داخل الشركات — بسرعة وقياس.'
                  : 'We build repeatable decision systems inside organizations — fast and measurable.'
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {blocks.map((b) => (
              <Card key={b.title.en}>
                <CardHeader>
                  <CardTitle>{locale === 'ar' ? b.title.ar : b.title.en}</CardTitle>
                  <CardDescription>{locale === 'ar' ? b.desc.ar : b.desc.en}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'النتيجة' : 'Outcome'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'بايلوت 6–8 أسابيع يثبت القيمة على قرار محدد، ثم مسار توسّع للمرحلة التالية.'
                  : 'A 6–8 week pilot that proves value on a named decision, followed by a scale plan for phase 2.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-brand-ink/80">
              {locale === 'ar'
                ? 'نركز على قرارات عالية الأثر وقليلة الالتباس: التسعير/العروض، معرفة التشغيل، واستجابة العملاء عبر القنوات.'
                : 'We focus on high-impact, low-ambiguity decisions: pricing/quoting, operational knowledge, and customer response across channels.'}
            </CardContent>
          </Card>

          <div>
            <a
              href={`/${locale}/contact`}
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand-deepBlue px-6 text-sm font-medium text-white hover:bg-brand-midBlue"
            >
              {t('cta.bookCall')}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
