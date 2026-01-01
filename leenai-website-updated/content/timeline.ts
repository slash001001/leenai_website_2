import type {Localized} from '@/lib/content';

export type TimelineStep = {
  title: Localized<string>;
  detail: Localized<string>;
};

export const pilotTimeline: TimelineStep[] = [
  {
    title: {en: 'Week 0–1 — Discovery & security', ar: 'الأسبوع 0–1 — الاستكشاف والأمان'},
    detail: {
      en: 'Pick 2–3 high-impact scenarios, enable read-only access, and establish baseline metrics.',
      ar: 'اختيار 2–3 سيناريوهات عالية الأثر؛ تفعيل الوصول «قراءة فقط»؛ بناء خط أساس للمقاييس.'
    }
  },
  {
    title: {en: 'Week 2 — Knowledge & data', ar: 'الأسبوع 2 — المعرفة والبيانات'},
    detail: {
      en: 'Index documents, stand up Bronze→Silver→Gold, and demo first cited answers.',
      ar: 'فهرسة الوثائق؛ تفعيل Bronze→Silver→Gold؛ أول عرض لإجابات مع استشهادات.'
    }
  },
  {
    title: {en: 'Weeks 3–4 — Channels & agents', ar: 'الأسبوع 3–4 — القنوات والوكلاء'},
    detail: {
      en: 'Wire WhatsApp/email/web + ERP/CRM (read-only) and run agents in a sandbox with logs.',
      ar: 'ربط WhatsApp/البريد/الويب وربط ERP/CRM (قراءة فقط)؛ تشغيل الوكلاء في Sandbox مع سجلات.'
    }
  },
  {
    title: {en: 'Week 5 — UAT', ar: 'الأسبوع 5 — UAT'},
    detail: {
      en: 'Users test real cases; tune guardrails/evals; lock acceptance metrics.',
      ar: 'اختبار حالات واقعية؛ ضبط Guardrails/Evals؛ تثبيت مقاييس القبول.'
    }
  },
  {
    title: {en: 'Week 6 — Handover', ar: 'الأسبوع 6 — التسليم'},
    detail: {
      en: 'Deliver playbooks, training, dashboards; plan CR-gated writes for phase 2.',
      ar: 'Playbooks، تدريب، لوحات؛ التخطيط لتفعيل الكتابة في المرحلة التالية عبر CR.'
    }
  }
];
