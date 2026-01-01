import Link from 'next/link';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';

import {Container} from '@/components/container';

export async function SiteFooter({locale}: {locale: 'en' | 'ar'}) {
  const t = await getTranslations({locale});

  const base = `/${locale}`;

  return (
    <footer className="border-t border-brand-paleCyan bg-white/70">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/icon.png" alt="LeenAI" width={34} height={34} />
            <div>
              <div className="font-semibold text-brand-ink">LeenAI</div>
              <div className="text-sm text-brand-ink/70">{t('footer.pdplNote')}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-3">
            <Link href={`${base}/solutions`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              {t('nav.solutions')}
            </Link>
            <Link href={`${base}/how-it-works`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              {t('nav.how')}
            </Link>
            <Link href={`${base}/security-pdpl`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              {t('nav.security')}
            </Link>
            <Link href={`${base}/resources`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              {t('nav.resources')}
            </Link>
            <Link href={`${base}/legal/privacy`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              Privacy
            </Link>
            <Link href={`${base}/legal/terms`} className="text-brand-ink/80 hover:text-brand-deepBlue">
              Terms
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-brand-paleCyan pt-6 text-xs text-brand-ink/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} LeenAI. {t('footer.rights')}</div>
          <div>Not legal advice. Policies should be reviewed with your counsel.</div>
        </div>
      </Container>
    </footer>
  );
}
