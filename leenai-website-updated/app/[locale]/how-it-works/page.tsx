import Script from 'next/script';
import type {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

import type {Locale} from '@/lib/i18n';
import {pick} from '@/lib/content';
import {pilotTimeline} from '@/content/timeline';
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
  const title = locale === 'ar' ? 'كيف نعمل | لينAI' : 'How it works | LeenAI';
  const description =
    locale === 'ar'
      ? 'منهج بايلوت 6–8 أسابيع: Decision Map، خطة بيانات، Evals، UAT، Runbooks، تدريب، وتسليم.'
      : '6–8 week pilot method: Decision Map, data plan, evals, UAT, runbooks, training, and handover.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/how-it-works`,
      languages: {
        en: `${url}/en/how-it-works`,
        ar: `${url}/ar/how-it-works`
      }
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function HowItWorksPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});

  const deliverables = [
    {
      title: {en: 'Scope & success criteria', ar: 'النطاق ومعايير النجاح'},
      desc: {
        en: 'Locked decision scope baseline, KPIs, and acceptance thresholds.',
        ar: 'تثبيت نطاق القرار، مؤشرات الأداء، وعتبات القبول.'
      }
    },
    {
      title: {en: 'Decision Map & Decision Rights', ar: 'خريطة القرار وصلاحياته'},
      desc: {
        en: 'Decision definition, inputs, thresholds, approvers, and escalation SLAs.',
        ar: 'تعريف القرار ومدخلاته وعتباته والموافقات وSLA التصعيد.'
      }
    },
    {
      title: {en: 'Access Matrix', ar: 'مصفوفة الوصول'},
      desc: {
        en: 'Roles × systems × permissions (read-only first).',
        ar: 'الأدوار × الأنظمة × الصلاحيات (قراءة فقط أولاً).'
      }
    },
    {
      title: {en: 'Data intake plan + sample set', ar: 'خطة بيانات + عينات'},
      desc: {
        en: 'A practical plan and a representative sample set (size depends on scope).',
        ar: 'خطة عملية ومجموعة عينات ممثلة (الحجم يعتمد على النطاق).'
      }
    },
    {
      title: {en: 'Evaluation plan + quality dashboards', ar: 'خطة تقييم + لوحات جودة'},
      desc: {
        en: 'Golden set and dashboards for accuracy/latency/consistency/escalation.',
        ar: 'Golden Set ولوحات للدقة/الكمون/الاتساق/التصعيد.'
      }
    },
    {
      title: {en: 'UAT Pack', ar: 'حزمة UAT'},
      desc: {
        en: 'Templates + execution log (scenario count depends on scope).',
        ar: 'قوالب + سجل تنفيذ (عدد السيناريوهات يعتمد على النطاق).'
      }
    },
    {
      title: {en: 'Runbooks + training + handover', ar: 'Runbooks + تدريب + تسليم'},
      desc: {
        en: 'Ops/Admin runbooks, training session(s), and an acceptance pack.',
        ar: 'Runbooks تشغيل/إدارة، جلسات تدريب حسب الاتفاق، وحزمة قبول.'
      }
    },
    {
      title: {en: 'Next phase plan', ar: 'خطة المرحلة التالية'},
      desc: {
        en: 'Go‑Live Light or scale-up plan, including CR‑gated writes if needed.',
        ar: 'خطة Go‑Live Light أو توسّع، بما في ذلك تفعيل الكتابة عبر CR عند الحاجة.'
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
              <Badge>Decision-first</Badge>
              <Badge variant="outline">Read-only first</Badge>
              <Badge variant="outline">PDPL-aware</Badge>
            </div>
            <SectionHeading
              title={locale === 'ar' ? 'كيف نعمل' : 'How we work'}
              subtitle={
                locale === 'ar'
                  ? 'بايلوت قصير ومقاس: نثبت القرار، نبني ضوابط، ثم نُسلّم نظام قرار قابل للتشغيل.'
                  : 'Short, measurable pilots: lock the decision, build guardrails, then hand over an operable decision system.'
              }
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'المسار الأسبوعي' : 'Weekly path'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'مسار مبسّط، ويتم تخصيصه حسب النطاق.'
                  : 'A simplified path, customized per scope.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {pilotTimeline.map((step) => (
                <div key={pick(locale, step.title)} className="rounded-lg border border-brand-paleCyan bg-white p-4">
                  <div className="font-medium">{pick(locale, step.title)}</div>
                  <div className="mt-1 text-sm text-brand-ink/70">{pick(locale, step.detail)}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          <SectionHeading
            title={locale === 'ar' ? 'ماذا يتضمن البايلوت (Deliverables)' : 'What the pilot includes (Deliverables)'}
            subtitle={
              locale === 'ar'
                ? 'حزمة قابلة للتدقيق، تُسلم مع النظام.'
                : 'An auditable pack delivered with the system.'
            }
          />

          <div className="grid gap-4 md:grid-cols-2">
            {deliverables.map((d) => (
              <Card key={pick(locale, d.title)}>
                <CardHeader>
                  <CardTitle>{pick(locale, d.title)}</CardTitle>
                  <CardDescription>{pick(locale, d.desc)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="rounded-xl border border-brand-paleCyan bg-white/70 p-6 text-sm text-brand-ink/70">
            <div className="font-medium text-brand-ink">{locale === 'ar' ? 'ملاحظة PDPL' : 'PDPL note'}</div>
            <p className="mt-2">
              {locale === 'ar'
                ? 'افتراضيًا: لا بيانات شخصية داخل الـPrompts أو الـLogs، ونبدأ قراءة فقط. تفعيل الكتابة يتم بعد UAT عبر بوابة أمنية + CR.'
                : 'Default posture: no personal data in prompts or logs; start read-only. Writes unlock post‑UAT via Security Gate + CR.'}
            </p>
          </div>

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
