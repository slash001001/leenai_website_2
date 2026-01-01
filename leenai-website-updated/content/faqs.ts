import type {Localized} from '@/lib/content';

export type FaqItem = {
  q: Localized<string>;
  a: Localized<string>;
};

export const faqs: FaqItem[] = [
  {
    q: {
      en: 'What is an “AI Pilot Studio”?',
      ar: 'ما هو “AI Pilot Studio”؟'
    },
    a: {
      en: 'A short, KPI-anchored pilot (typically 6–8 weeks) that proves value on a named business decision, with an Acceptance Pack (UAT, evals, runbooks, training, handover).',
      ar: 'بايلوت قصير مرتبط بمؤشرات أداء (غالباً 6–8 أسابيع) يثبت القيمة على قرار عمل محدد، مع حزمة قبول (UAT، تقييمات، Runbooks، تدريب، وتسليم).'
    }
  },
  {
    q: {
      en: 'Do you start with read-only access?',
      ar: 'هل تبدأون بالوصول “قراءة فقط”؟'
    },
    a: {
      en: 'Yes. Pilots start read-only. Write operations are unlocked after UAT via a Security Gate and Change Request (CR), with rollback plans.',
      ar: 'نعم. البايلوت يبدأ “قراءة فقط”. تفعيل الكتابة يتم بعد UAT عبر بوابة أمنية وطلب تغيير (CR) مع خطط Rollback.'
    }
  },
  {
    q: {
      en: 'How do you reduce hallucinations?',
      ar: 'كيف تقللون مخاطر الهلوسة؟'
    },
    a: {
      en: 'We rely on grounded retrieval (RAG) with citations, confidence thresholds, continuous evaluations (coverage/latency/hallucination), and Human-in-the-Loop escalation for sensitive cases.',
      ar: 'نعتمد على استرجاع مؤسّس (RAG) مع استشهادات، عتبات ثقة، تقييمات مستمرة (تغطية/كمون/هلوسة)، وتصعيد للبشر في الحالات الحساسة.'
    }
  },
  {
    q: {
      en: 'What about PDPL and data residency?',
      ar: 'ماذا عن PDPL وتوطين البيانات؟'
    },
    a: {
      en: 'PDPL-aware by design: no personal data in prompts or logs (default), encryption in transit/at rest, RBAC, audit trails, and on‑prem/VPC deployment options in KSA when required.',
      ar: 'جاهزية PDPL بالتصميم: لا بيانات شخصية داخل الـPrompts أو الـLogs (افتراضيًا)، تشفير أثناء النقل وفي السكون، RBAC، سجلات تدقيق، وخيارات نشر داخل السعودية (On‑prem/VPC) عند الحاجة.'
    }
  },
  {
    q: {
      en: 'What do we get at the end of the pilot?',
      ar: 'ماذا نستلم في نهاية البايلوت؟'
    },
    a: {
      en: 'A working decision system with dashboards/logs, an Acceptance Pack (UAT + Golden Set + Eval Plan), runbooks, training, and a scale-up plan for phase 2.',
      ar: 'نظام قرار عامل مع لوحات وسجلات، وحزمة قبول (UAT + Golden Set + خطة تقييم)، وRunbooks، وتدريب، وخطة توسّع للمرحلة الثانية.'
    }
  }
];
