# LeenAI Website (Next.js + Tailwind + next-intl)

This repository is a bilingual (EN/AR) marketing website scaffold for **LeenAI**.

- **Framework:** Next.js (App Router)
- **Styling:** TailwindCSS + shadcn/ui-style components
- **i18n:** next-intl (English + Arabic with RTL support)
- **SEO:** metadata + JSON-LD + sitemap + robots + llms.txt
- **Forms:** Contact form (optional email sending via Resend)

## 1) Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`  
The middleware redirects `/` → `/en` (default locale).

## 2) Environment variables

Copy `.env.example` → `.env.local` and update:

- `NEXT_PUBLIC_SITE_URL` (recommended for correct canonical URLs)
- `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- `RESEND_API_KEY` (optional)

If email is not configured, the contact API will log **minimal, non‑PII** telemetry only.

## 3) Quality checks

```bash
npm run ci
```

This runs:

- `lint`
- `typecheck`
- `check:i18n` (ensures EN/AR translation keys match)

## 4) Content editing

- Navigation + UI strings: `messages/en.json`, `messages/ar.json`
- Core copy: `content/site.ts`
- Solutions: `content/solutions.ts`
- Pilot timeline: `content/timeline.ts`
- FAQ: `content/faqs.ts`

## 5) Brand assets

Located in `public/`:

- `logo.png` (full logo)
- `icon.png` (swirl icon)
- `og-default.png` (Open Graph image)
- `favicon.ico`, `apple-touch-icon.png`

## 6) Notes (PDPL posture)

This website copy follows a PDPL-aware posture aligned with the provided documents:

- Pilots start **read-only**
- Write actions unlock **post-UAT** via **Security Gate + Change Request (CR)**
- Default: **no personal data in prompts or logs**

> Review all security/legal copy with your counsel before publishing.

## 7) Deploy

Typical options:

- Vercel
- Self-hosted Node server (`npm run build && npm run start`)

## 8) Roadmap placeholders

This scaffold leaves room to add later:

- Chatbots
- AI tools and dashboards
- Authenticated portals
- Blog/resources CMS

---

Generated on: 2025-12-31
