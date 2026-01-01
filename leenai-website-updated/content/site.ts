import type {Localized} from '@/lib/content';

export const site = {
  name: 'LeenAI',
  description: {
    en: 'LeenAI builds governed decision systems for B2B organizations — delivered as KPI-anchored pilots in 6–8 weeks.',
    ar: 'لينAI تبني أنظمة قرار محكومة للشركات B2B — تُسلَّم كبايلوتات مرتبطة بمؤشرات أداء خلال 6–8 أسابيع.'
  } satisfies Localized<string>,
  taglines: {
    en: [
      'Your AI Factory, inside your business.',
      'From data to outcomes, fast.',
      'Safe by design: PDPL-aware, on‑prem/VPC.'
    ],
    ar: [
      'مصنع ذكاء اصطناعي داخل عملك.',
      'من البيانات إلى النتائج بسرعة.',
      'آمن بالتصميم: مراعاة PDPL، خيارات نشر داخل السعودية (On‑prem/VPC).'
    ]
  } satisfies Localized<string[]>,
  location: {
    en: 'Saudi Arabia',
    ar: 'المملكة العربية السعودية'
  } satisfies Localized<string>
};

export const home = {
  hero: {
    headline: {
      en: 'Decision Systems in 6–8 weeks.',
      ar: 'أنظمة قرار خلال 6–8 أسابيع.'
    } satisfies Localized<string>,
    subheadline: {
      en: 'Automate decisions, insights, and interactions — on your data — with guardrails, evals, and clear acceptance criteria.',
      ar: 'نُؤتمت القرارات والرؤى والتفاعلات — على بياناتك — بضوابط وتقييمات ومعايير قبول واضحة.'
    } satisfies Localized<string>,
    bullets: {
      en: [
        'Decision-first pilots with measurable KPIs and an Acceptance Pack (UAT + evals + runbooks + training).',
        'Read-only first; write operations unlock post‑UAT via Security Gate + Change Request (CR).',
        'PDPL posture: no personal data in prompts or logs (default).'
      ],
      ar: [
        'بايلوتات “Decision-first” مرتبطة بمؤشرات قياس وبحزمة قبول (UAT + تقييمات + Runbooks + تدريب).',
        'قراءة فقط أولاً؛ تفعيل الكتابة بعد UAT عبر بوابة أمنية + طلب تغيير (CR).',
        'وضعية PDPL: لا بيانات شخصية داخل الـPrompts أو الـLogs (افتراضيًا).'
      ]
    } satisfies Localized<string[]>
  },
  kpiHighlights: [
    {
      label: {en: 'Time‑to‑Quote (TTQ)', ar: 'زمن إصدار العرض (TTQ)'} satisfies Localized<string>,
      value: {en: 'Target: −50% (pilot acceptance example)', ar: 'مستهدف: −50% (مثال قبول للبايلوت)'} satisfies Localized<string>
    },
    {
      label: {en: 'Customer Care', ar: 'خدمة العملاء'} satisfies Localized<string>,
      value: {en: 'FCR ≥60% • AHT −25% • latency ≤2s (example)', ar: 'FCR ≥60% • AHT −25% • كمون ≤2 ث (مثال)'} satisfies Localized<string>
    },
    {
      label: {en: 'Knowledge Q&A (RAG)', ar: 'أسئلة وأجوبة المعرفة (RAG)'} satisfies Localized<string>,
      value: {en: '≤5s answers • ≥90% coverage (example)', ar: '≤5 ث للإجابة • تغطية ≥90% (مثال)'} satisfies Localized<string>
    }
  ]
};
