import {NextResponse} from 'next/server';
import {z} from 'zod';

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().min(1).max(200),
  message: z.string().min(1).max(4000),
  consent: z.boolean().refine((v) => v === true, {message: 'Consent required'}),
  website: z.string().optional() // honeypot
});

type RateLimitEntry = {count: number; resetAt: number};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // per IP per window (best-effort, in-memory)

function getClientIp(req: Request) {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) {
    const first = xf.split(',')[0]?.trim();
    if (first) return first;
  }
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

function getStore() {
  const g = globalThis as unknown as {
    __leenai_contact_rl?: Map<string, RateLimitEntry>;
  };
  if (!g.__leenai_contact_rl) g.__leenai_contact_rl = new Map();
  return g.__leenai_contact_rl;
}

function checkRateLimit(ip: string) {
  const store = getStore();
  const now = Date.now();

  const existing = store.get(ip);
  if (!existing || now > existing.resetAt) {
    const fresh: RateLimitEntry = {count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS};
    store.set(ip, fresh);
    return {allowed: true, retryAfterSeconds: 0};
  }

  existing.count += 1;
  store.set(ip, existing);

  const allowed = existing.count <= RATE_LIMIT_MAX;
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

  // Best-effort cleanup to avoid unbounded memory growth
  if (store.size > 2000) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  return {allowed, retryAfterSeconds};
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ok: false, error: 'Invalid payload'}, {status: 400});
  }

  const data = parsed.data;

  // Honeypot: if filled, treat as spam but return 200 to avoid signals.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ok: true}, {status: 200});
  }

  // Rate limit (best effort)
  const rl = checkRateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      {ok: false, error: 'Too many requests'},
      {
        status: 429,
        headers: {
          'Retry-After': String(rl.retryAfterSeconds)
        }
      }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || 'LeenAI Website <no-reply@example.com>';
  const resendKey = process.env.RESEND_API_KEY;

  // Optional email sending via Resend (no extra dependency).
  if (to && resendKey) {
    const subject = `New website lead — ${data.company}`;
    const text = `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nConsent: ${String(
      data.consent
    )}\n\nMessage:\n${data.message}\n`;

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        text
      })
    });

    if (!resp.ok) {
      // Do not leak errors to the client; return ok and let logs show details.
      console.error('Resend error', await resp.text());
    }
  } else {
    // Avoid logging personal data by default (PDPL-aware).
    console.log('Contact lead (email not configured)', {
      company: data.company,
      messageChars: data.message.length,
      consent: data.consent
    });
  }

  return NextResponse.json({ok: true}, {status: 200});
}
