import type {Localized} from '@/lib/content';

export type SolutionIcon =
  | 'file-text'
  | 'message-circle'
  | 'search'
  | 'database'
  | 'camera';

export type Kpi = {
  label: Localized<string>;
  target: Localized<string>;
};

export type Solution = {
  slug: string;
  icon: SolutionIcon;
  title: Localized<string>;
  tagline: Localized<string>;
  overview: Localized<string>;
  triggers: Localized<string[]>;
  workflow: Localized<string[]>;
  dataSources: Localized<string[]>;
  kpis: Kpi[];
  notes: Localized<string[]>;
};

export const solutions: Solution[] = [
  {
    slug: 'smartquote',
    icon: 'file-text',
    title: {en: 'SmartQuote', ar: 'SmartQuote'},
    tagline: {
      en: 'RFQ → Quote automation (read‑only first, HITL for exceptions).',
      ar: 'أتمتة RFQ → عرض سعر (قراءة فقط أولاً، وتسليم للبشر عند الاستثناءات).'
    },
    overview: {
      en: 'Turn incoming RFQs (email/portal/PDF/specs) into structured line items, match catalog/pricing, route exceptions to humans, and generate a draft quote with an audit trail.',
      ar: 'حوّل طلبات عروض الأسعار الواردة (بريد/بوابة/PDF/مواصفات) إلى بنود منظمة، طابق الكتالوج/السعر، ارفع الاستثناءات للبشر، وولّد مسودة عرض مع سجل تدقيق.'
    },
    triggers: {
      en: [
        'RFQ received via email or customer portal (often PDF attachments).',
        'Sales team needs a first draft quote quickly without losing control.'
      ],
      ar: [
        'وصول RFQ عبر البريد أو بوابة العميل (غالباً مع مرفقات PDF).',
        'الحاجة لمسودة عرض أولية بسرعة دون فقدان التحكم.'
      ]
    },
    workflow: {
      en: [
        'Ingest RFQ → OCR/extraction',
        'Match catalog & approved price lists',
        'Detect exceptions → Human‑in‑the‑loop review',
        'Generate draft PDF/email quote',
        'Report TTQ + logs'
      ],
      ar: [
        'استقبال RFQ → OCR/استخلاص',
        'مطابقة الكتالوج وقوائم الأسعار المعتمدة',
        'كشف الاستثناءات → مراجعة بشرية (HITL)',
        'توليد مسودة PDF/بريد لعرض السعر',
        'تقرير TTQ + سجلات'
      ]
    },
    dataSources: {
      en: [
        'Price lists, discounts, terms',
        'Product master/catalog',
        'Inventory & availability',
        'Customer master / credit rules (read-only in pilot)'
      ],
      ar: [
        'قوائم الأسعار والخصومات والشروط',
        'بيانات المنتجات/الكتالوج',
        'المخزون والتوفر',
        'بيانات العملاء/قواعد الائتمان (قراءة فقط في البايلوت)'
      ]
    },
    kpis: [
      {
        label: {en: 'TTQ', ar: 'TTQ'},
        target: {en: '−50% (acceptance example)', ar: '−50% (مثال قبول)'}
      },
      {
        label: {en: 'OCR accuracy', ar: 'دقة OCR'},
        target: {en: '≥95% (acceptance example)', ar: '≥95% (مثال قبول)'}
      },
      {
        label: {en: 'Critical errors', ar: 'الأخطاء الحرجة'},
        target: {en: '≤2% (acceptance example)', ar: '≤2% (مثال قبول)'}
      }
    ],
    notes: {
      en: [
        'Pilots start read-only; write operations unlock post‑UAT via Security Gate + Change Request (CR).',
        'PDPL posture: no personal data in prompts or logs (default).'
      ],
      ar: [
        'البايلوت يبدأ قراءة فقط؛ تفعيل الكتابة بعد UAT عبر بوابة أمنية + طلب تغيير (CR).',
        'وضعية PDPL: لا بيانات شخصية داخل الـPrompts أو الـLogs (افتراضيًا).'
      ]
    }
  },
  {
    slug: 'whatsapp-cx',
    icon: 'message-circle',
    title: {en: 'WhatsApp CX', ar: 'WhatsApp CX'},
    tagline: {
      en: 'Omnichannel CX (WhatsApp/Web/Email) with citations and escalation.',
      ar: 'خدمة عملاء متعددة القنوات (WhatsApp/الويب/البريد) مع استشهادات وتصعيد.'
    },
    overview: {
      en: 'Triage customer messages, retrieve grounded answers with citations, enforce confidence thresholds, and escalate to humans when needed — with full logging.',
      ar: 'افرز رسائل العملاء، استرجع إجابات “مؤسسة” مع استشهادات، طبّق عتبات الثقة، وصعّد للبشر عند الحاجة — مع تسجيل كامل.'
    },
    triggers: {
      en: [
        'Customer asks about status, ETA, price/availability, returns, credit.',
        'Teams need faster response time without losing compliance.'
      ],
      ar: [
        'أسئلة العميل عن الحالة/ETA/السعر-التوفر/المرتجعات/الائتمان.',
        'الحاجة لرفع سرعة الاستجابة دون فقدان الامتثال.'
      ]
    },
    workflow: {
      en: [
        'NLU/triage → intent & policy checks',
        'RAG with citations from approved sources',
        'Confidence thresholds → HITL handoff',
        'Respond + log (metrics, traces, audits)'
      ],
      ar: [
        'NLU/فرز → نية + فحوصات سياسة',
        'RAG مع استشهادات من مصادر معتمدة',
        'عتبات الثقة → تسليم للبشر (HITL)',
        'رد + سجل (مقاييس/تتبّع/تدقيق)'
      ]
    },
    dataSources: {
      en: [
        'Knowledge base (policies, SOPs, FAQs)',
        'Order/shipment status (read-only)',
        'Customer account info (read-only, minimized)'
      ],
      ar: [
        'قاعدة المعرفة (سياسات/إجراءات/SOPs/FAQ)',
        'حالة الطلب/الشحنة (قراءة فقط)',
        'بيانات حساب العميل (قراءة فقط وبأقل قدر)'
      ]
    },
    kpis: [
      {
        label: {en: 'First Contact Resolution (FCR)', ar: 'حل من أول تواصل (FCR)'},
        target: {en: '≥60% (acceptance example)', ar: '≥60% (مثال قبول)'}
      },
      {
        label: {en: 'Average Handle Time (AHT)', ar: 'زمن التعامل (AHT)'},
        target: {en: '−25% (acceptance example)', ar: '−25% (مثال قبول)'}
      },
      {
        label: {en: 'Latency', ar: 'الكمون'},
        target: {en: '≤2s (acceptance example)', ar: '≤2 ث (مثال قبول)'}
      }
    ],
    notes: {
      en: [
        'Grounded answers with citations to reduce hallucination risk.',
        'Escalation (HITL) for low confidence or policy-restricted requests.'
      ],
      ar: [
        'إجابات “مؤسسة” مع استشهادات لتقليل مخاطر الهلوسة.',
        'تصعيد (HITL) عند انخفاض الثقة أو منع السياسة.'
      ]
    }
  },
  {
    slug: 'opsrag',
    icon: 'search',
    title: {en: 'OpsRAG', ar: 'OpsRAG'},
    tagline: {
      en: 'Internal knowledge Q&A with citations and feedback loop.',
      ar: 'أسئلة وأجوبة المعرفة الداخلية مع استشهادات وتغذية راجعة.'
    },
    overview: {
      en: 'Staff ask operational questions (pricing, policy, SOPs). The system retrieves from governed sources and returns cited answers, with feedback feeding evals.',
      ar: 'يسأل الفريق أسئلة تشغيلية (تسعير/سياسة/إجراءات). يسترجع النظام من مصادر محكومة ويعيد إجابات مع استشهادات، مع تغذية راجعة للتقييم.'
    },
    triggers: {
      en: [
        'Teams need fast, trusted answers from scattered documents.',
        'Reduce dependency on “who knows what” and repetitive questions.'
      ],
      ar: [
        'الحاجة لإجابات سريعة وموثوقة من مستندات متفرقة.',
        'تقليل الاعتماد على المعرفة الشخصية وتكرار الأسئلة.'
      ]
    },
    workflow: {
      en: [
        'Ingest to Bronze/Silver/Gold',
        'Embeddings + vector index',
        'Cited answers with confidence checks',
        'Feedback loop → evaluation improvements'
      ],
      ar: [
        'إدخال إلى Bronze/Silver/Gold',
        'Embeddings + فهرس متجهي',
        'إجابات مع استشهادات وفحوصات ثقة',
        'تغذية راجعة → تحسين التقييمات'
      ]
    },
    dataSources: {
      en: [
        'SharePoint/Drive folders (approved)',
        'Policies, SOPs, manuals, price books',
        'Curated KPI tables (optional)'
      ],
      ar: [
        'مجلدات SharePoint/Drive (المعتمدة)',
        'سياسات، إجراءات، أدلة، قوائم أسعار',
        'جداول مؤشرات KPI المعتمدة (اختياري)'
      ]
    },
    kpis: [
      {
        label: {en: 'Answer latency', ar: 'كمون الإجابة'},
        target: {en: '≤5s (acceptance example)', ar: '≤5 ث (مثال قبول)'}
      },
      {
        label: {en: 'Coverage', ar: 'التغطية'},
        target: {en: '≥90% (acceptance example)', ar: '≥90% (مثال قبول)'}
      }
    ],
    notes: {
      en: [
        'Access is governed; sources are cataloged and auditable.',
        'Ideal for SOPs, policies, and operational FAQs.'
      ],
      ar: [
        'الوصول محكوم؛ المصادر مفهرسة وقابلة للتدقيق.',
        'مناسب لـ SOPs والسياسات وأسئلة التشغيل.'
      ]
    }
  },
  {
    slug: 'ops-data-platform',
    icon: 'database',
    title: {en: 'Ops Data Platform', ar: 'Ops Data Platform'},
    tagline: {
      en: 'Mini‑lake (bronze/silver/gold) + dashboards — agent‑ready.',
      ar: 'طبقة بيانات مصغّرة (bronze/silver/gold) + لوحات — جاهزة للوكلاء.'
    },
    overview: {
      en: 'A minimal decision data layer: ingest raw data, clean to analytics-ready tables, publish curated KPIs/dashboards, and optionally expose to grounded Q&A with citations.',
      ar: 'طبقة قرار بيانات خفيفة: إدخال البيانات الخام، تنظيفها لجداول جاهزة للتحليل، نشر KPIs ولوحات معتمدة، وإتاحة أسئلة وأجوبة مؤسّسة مع استشهادات (اختياري).'
    },
    triggers: {
      en: [
        'Leadership needs trusted metrics without chasing spreadsheets.',
        'Agents and dashboards need a clean, governed data layer.'
      ],
      ar: [
        'الحاجة لمقاييس موثوقة دون مطاردة الجداول.',
        'الوكلاء واللوحات تحتاج طبقة بيانات نظيفة ومحكومة.'
      ]
    },
    workflow: {
      en: [
        'Bronze: immutable ingestion',
        'Silver: cleaned/typed (PII minimization/masking)',
        'Gold: curated KPIs + knowledge for agents',
        'Dashboards + runbook'
      ],
      ar: [
        'Bronze: إدخال غير قابل للتعديل',
        'Silver: تنظيف وتوحيد (تقليل/إخفاء PII)',
        'Gold: KPIs معتمدة + معرفة للوكلاء',
        'لوحات + Runbook'
      ]
    },
    dataSources: {
      en: ['ERP/CRM extracts (read-only)', 'Operational databases', 'Files/exports'],
      ar: ['بيانات ERP/CRM (قراءة فقط)', 'قواعد بيانات تشغيلية', 'ملفات/Exports']
    },
    kpis: [],
    notes: {
      en: [
        'Includes data dictionary, quality checks, retention notes, training and handover.',
        'Optional grounded Q&A over curated tables/documents (if scoped).'
      ],
      ar: [
        'يشمل قاموس بيانات، فحوص جودة، سياسات احتفاظ، تدريب وتسليم.',
        'اختياري: أسئلة وأجوبة مؤسّسة على الجداول/المستندات (حسب النطاق).'
      ]
    }
  },
  {
    slug: 'vision-safety',
    icon: 'camera',
    title: {en: 'Vision Safety Watch', ar: 'Vision Safety Watch'},
    tagline: {
      en: 'Counting / congestion / safety detection with dashboards and runbooks.',
      ar: 'رؤية للعدّ/الازدحام/السلامة مع لوحات وRunbooks.'
    },
    overview: {
      en: 'Computer vision module for warehouses/safety: detection models, calibration plan, compliance KPI dashboard, and operational runbooks.',
      ar: 'مكوّن رؤية للمستودعات/السلامة: نماذج كشف، خطة معايرة، لوحة KPIs امتثال، وRunbooks تشغيلية.'
    },
    triggers: {
      en: ['Safety monitoring, near-miss reduction, congestion insights.'],
      ar: ['مراقبة السلامة، تقليل الحوادث القريبة، فهم الازدحام.']
    },
    workflow: {
      en: ['Calibrate cameras/areas', 'Run detection + alerts', 'Review dashboard + runbook'],
      ar: ['معايرة الكاميرات/المناطق', 'تشغيل الكشف + التنبيهات', 'مراجعة اللوحة + Runbook']
    },
    dataSources: {
      en: ['Camera feeds (scoped)', 'Operational logs'],
      ar: ['تغذية الكاميرات (ضمن النطاق)', 'سجلات تشغيلية']
    },
    kpis: [
      {
        label: {en: 'Precision/Recall', ar: 'Precision/Recall'},
        target: {en: '≥0.9 (acceptance example)', ar: '≥0.9 (مثال قبول)'}
      },
      {
        label: {en: 'False Alarm Rate (FAR)', ar: 'معدل الإنذار الخاطئ (FAR)'},
        target: {en: '≤10% (acceptance example)', ar: '≤10% (مثال قبول)'}
      }
    ],
    notes: {
      en: ['Includes acceptance pack, runbooks & training.'],
      ar: ['يشمل حزمة القبول وRunbooks وتدريب.']
    }
  }
];
