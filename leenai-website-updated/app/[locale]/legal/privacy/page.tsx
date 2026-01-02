import type {Metadata} from 'next';
import {siteUrl} from '@/lib/seo';
import type {Locale} from '@/lib/i18n';
import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: Locale}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'سياسة الخصوصية | لينAI' : 'Privacy Policy | LeenAI';
  return {
    title,
    alternates: {
      canonical: `${url}/${locale}/legal/privacy`,
      languages: {en: `${url}/en/legal/privacy`, ar: `${url}/ar/legal/privacy`}
    }
  };
}

export default async function PrivacyPage({params}: {params: Promise<{locale: Locale}>}) {
  const {locale} = await params;

  return (
    <section className="py-14">
      <Container className="prose max-w-none prose-headings:text-brand-ink prose-p:text-brand-ink/80">
        <SectionHeading
          title={locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          subtitle={
            locale === 'ar'
              ? 'قالب مبدئي — يُراجع قانونيًا قبل النشر.'
              : 'Starter template — review legally before publishing.'
          }
        />

        <h2>{locale === 'ar' ? '1) البيانات التي نجمعها' : '1) Data we collect'}</h2>
        <p>
          {locale === 'ar'
            ? 'قد نجمع بيانات التواصل التي تقدمها عبر نموذج التواصل (مثل الاسم والبريد واسم الشركة ومحتوى الرسالة).'
            : 'We may collect contact details you provide via the contact form (name, email, company, and message).'}
        </p>

        <h2>{locale === 'ar' ? '2) كيف نستخدم البيانات' : '2) How we use data'}</h2>
        <p>
          {locale === 'ar'
            ? 'نستخدم البيانات للرد على طلبك، وتقديم معلومات عن خدماتنا، وتحسين الموقع.'
            : 'We use data to respond to your request, provide information about our services, and improve the website.'}
        </p>

        <h2>{locale === 'ar' ? '3) تقليل البيانات وPDPL' : '3) Data minimization & PDPL'}</h2>
        <p>
          {locale === 'ar'
            ? 'نوصي بعدم إرسال بيانات شخصية إلا للضرورة. بايلوتاتنا تبدأ “قراءة فقط” وتفعيل الكتابة يتم بعد UAT عبر بوابة أمنية وCR.'
            : 'We recommend not sharing personal data unless necessary. Our pilots start read-only; write operations unlock post-UAT via Security Gate + CR.'}
        </p>

        <h2>{locale === 'ar' ? '4) الاحتفاظ والحذف' : '4) Retention & deletion'}</h2>
        <p>
          {locale === 'ar'
            ? 'يُحدد الاحتفاظ بالبيانات وفق سياساتنا الداخلية ومتطلبات العميل والالتزام. يمكن طلب حذف البيانات وفقًا للقانون المعمول به.'
            : 'Retention is defined by internal policy, client requirements, and compliance. You may request deletion as permitted by applicable law.'}
        </p>

        <h2>{locale === 'ar' ? '5) التواصل' : '5) Contact'}</h2>
        <p>
          {locale === 'ar'
            ? 'للاستفسارات المتعلقة بالخصوصية، تواصل معنا عبر صفحة التواصل.'
            : 'For privacy questions, contact us via the Contact page.'}
        </p>
      </Container>
    </section>
  );
}
