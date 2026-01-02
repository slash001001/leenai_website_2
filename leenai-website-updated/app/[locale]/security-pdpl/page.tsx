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
  params: Promise<{locale: Locale}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'الأمان وPDPL | لينAI' : 'Security & PDPL | LeenAI';
  const description =
    locale === 'ar'
      ? 'ضوابط متوائمة مع السعودية: توطين بيانات، تشفير، RBAC، سجلات تدقيق، قراءة فقط أولاً، وتفعيل الكتابة عبر بوابة أمنية + CR.'
      : 'KSA-aligned controls: data residency, encryption, RBAC, audit logs, read-only first, and CR-gated writes.';
  return {
    title,
    description,
    alternates: {
      canonical: `${url}/${locale}/security-pdpl`,
      languages: {
        en: `${url}/en/security-pdpl`,
        ar: `${url}/ar/security-pdpl`
      }
    },
    openGraph: {title, description, images: [`${url}/og-default.png`]}
  };
}

export default async function SecurityPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  const controls = [
    {
      title: {en: 'PDPL posture (default)', ar: 'وضعية PDPL (افتراضيًا)'},
      desc: {
        en: 'No personal data in prompts or logs. Data minimization and masking by default.',
        ar: 'لا بيانات شخصية داخل الـPrompts أو الـLogs. تقليل/إخفاء PII افتراضيًا.'
      }
    },
    {
      title: {en: 'Data residency options', ar: 'خيارات توطين البيانات'},
      desc: {
        en: 'On‑prem or VPC deployment options in KSA when required.',
        ar: 'خيارات نشر داخل السعودية (On‑prem أو VPC) عند الحاجة.'
      }
    },
    {
      title: {en: 'Encryption & secrets', ar: 'التشفير وإدارة الأسرار'},
      desc: {
        en: 'Encryption in transit and at rest; secrets management and key control in the client environment.',
        ar: 'تشفير أثناء النقل وفي السكون؛ وإدارة أسرار ومفاتيح داخل بيئة العميل.'
      }
    },
    {
      title: {en: 'RBAC & audit trails', ar: 'RBAC وسجلات التدقيق'},
      desc: {
        en: 'Role-based access control, audit logs, quotas/limits, and operational telemetry.',
        ar: 'تحكم وصول قائم على الأدوار، سجلات تدقيق، حصص/حدود، وTelemetry تشغيلية.'
      }
    },
    {
      title: {en: 'Read-only first, then gated writes', ar: 'قراءة فقط أولاً ثم كتابة محكومة'},
      desc: {
        en: 'Pilots start read-only. Writes unlock post‑UAT via Security Gate + Change Request (CR) with rollback plans.',
        ar: 'البايلوت يبدأ قراءة فقط. تفعيل الكتابة بعد UAT عبر بوابة أمنية + طلب تغيير (CR) مع خطط Rollback.'
      }
    },
    {
      title: {en: 'Quality governance (LangOps/EvalOps)', ar: 'حوكمة الجودة (LangOps/EvalOps)'},
      desc: {
        en: 'Version prompts/models; run eval gates (coverage, factuality, safety) before promoting to production (thresholds are agreed per use case).',
        ar: 'إدارة نسخ الـPrompts/النماذج؛ وبوابات تقييم (التغطية/الدقة/السلامة) قبل الترقية للإنتاج (العتبات تُتفق حسب حالة الاستخدام).'
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
              <Badge>PDPL-aware</Badge>
              <Badge variant="outline">Audit-friendly</Badge>
              <Badge variant="outline">Read-only first</Badge>
            </div>
            <SectionHeading
              title={locale === 'ar' ? 'الأمان وPDPL' : 'Security & PDPL'}
              subtitle={
                locale === 'ar'
                  ? 'ضوابط عملية قابلة للتنفيذ — وليست شعارات.'
                  : 'Practical controls — not slogans.'
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {controls.map((c) => (
              <Card key={c.title.en}>
                <CardHeader>
                  <CardTitle>{locale === 'ar' ? c.title.ar : c.title.en}</CardTitle>
                  <CardDescription>{locale === 'ar' ? c.desc.ar : c.desc.en}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{locale === 'ar' ? 'متى نصعّد للبشر (HITL)?' : 'When do we escalate to humans (HITL)?'}</CardTitle>
              <CardDescription>
                {locale === 'ar'
                  ? 'عند انخفاض الثقة أو منع السياسة أو القرارات الحساسة (تسعير/عقود/مدفوعات).'
                  : 'Low confidence, policy restrictions, or sensitive decisions (pricing/contracts/payments).'}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-brand-ink/80">
              {locale === 'ar'
                ? 'نستخدم عتبات ثقة، وقواعد/Regex، وفلترات صلة، وسجلات تدقيق. كل تفاعل يُسجل (بدون PII في الـLogs افتراضيًا).'
                : 'We use confidence thresholds, rules/regex, relevance filters, and auditable logs. Interactions are logged (with no PII in logs by default).'}
            </CardContent>
          </Card>

          <div className="rounded-xl border border-brand-paleCyan bg-white/70 p-6 text-sm text-brand-ink/70">
            <div className="font-medium text-brand-ink">{locale === 'ar' ? 'تنبيه' : 'Disclaimer'}</div>
            <p className="mt-2">
              {locale === 'ar'
                ? 'هذه صفحة تعريفية وليست استشارة قانونية. سياسات الخصوصية والاحتفاظ ومشاركة البيانات يجب مراجعتها مع المستشار القانوني لديك.'
                : 'This page is informational and not legal advice. Privacy/retention/sharing policies should be reviewed with your counsel.'}
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
