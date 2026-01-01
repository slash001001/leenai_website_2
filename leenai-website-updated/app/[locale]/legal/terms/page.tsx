import type {Metadata} from 'next';
import {siteUrl} from '@/lib/seo';
import type {Locale} from '@/lib/i18n';
import {Container} from '@/components/container';
import {SectionHeading} from '@/components/section-heading';

export async function generateMetadata({
  params
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const {locale} = params;
  const url = siteUrl();
  const title = locale === 'ar' ? 'الشروط والأحكام | لينAI' : 'Terms | LeenAI';
  return {
    title,
    alternates: {
      canonical: `${url}/${locale}/legal/terms`,
      languages: {en: `${url}/en/legal/terms`, ar: `${url}/ar/legal/terms`}
    }
  };
}

export default function TermsPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;

  return (
    <section className="py-14">
      <Container className="prose max-w-none prose-headings:text-brand-ink prose-p:text-brand-ink/80">
        <SectionHeading
          title={locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          subtitle={
            locale === 'ar'
              ? 'قالب مبدئي — يُراجع قانونيًا قبل النشر.'
              : 'Starter template — review legally before publishing.'
          }
        />

        <h2>{locale === 'ar' ? '1) استخدام الموقع' : '1) Using the website'}</h2>
        <p>
          {locale === 'ar'
            ? 'المحتوى لأغراض معلوماتية فقط وقد يتغير دون إشعار.'
            : 'Content is for informational purposes only and may change without notice.'}
        </p>

        <h2>{locale === 'ar' ? '2) لا استشارة قانونية' : '2) No legal advice'}</h2>
        <p>
          {locale === 'ar'
            ? 'أي معلومات عن PDPL أو الأمان لا تُعد استشارة قانونية. راجع مستشارك القانوني.'
            : 'Any PDPL/security information is not legal advice. Consult your counsel.'}
        </p>

        <h2>{locale === 'ar' ? '3) الملكية الفكرية' : '3) Intellectual property'}</h2>
        <p>
          {locale === 'ar'
            ? 'جميع الحقوق محفوظة. لا يجوز إعادة استخدام المحتوى دون إذن.'
            : 'All rights reserved. Do not reuse content without permission.'}
        </p>

        <h2>{locale === 'ar' ? '4) تحديد المسؤولية' : '4) Limitation of liability'}</h2>
        <p>
          {locale === 'ar'
            ? 'يُقدم الموقع “كما هو” دون ضمانات.'
            : 'The website is provided “as is” without warranties.'}
        </p>
      </Container>
    </section>
  );
}
