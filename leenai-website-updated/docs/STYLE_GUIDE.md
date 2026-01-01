# LeenAI Website Style Guide

This repo is a bilingual (EN/AR) marketing site. Keep it **crisp, evidence‑first, and PDPL‑aware**.

## Voice & tone
- Business‑class, direct, minimal marketing fluff.
- Prefer **outcomes + guardrails** over generic “AI transformation” claims.
- Avoid absolute guarantees; use **examples** and explain that thresholds are agreed per pilot.

## Claims & numbers
- Any KPI numbers on marketing pages must be labeled as:
  - **Example**, **Target**, or **Pilot acceptance example**
- Do **not** claim legal compliance (e.g., “PDPL compliant/ready”) unless validated by counsel.
  - Use **“PDPL-aware”** or **“PDPL posture”** instead.

## Bilingual rules
- Always update **both** `messages/en.json` and `messages/ar.json`.
- Keep keys in sync (run `npm run check:i18n`).

## Accessibility
- Ensure interactive elements have:
  - Visible focus states
  - Proper labels
  - High contrast where possible

## SEO & structured data
- Maintain canonical + hreflang alternates for localized routes.
- Keep JSON‑LD small and accurate (Organization + FAQ on the home page only).

## Contact form & PDPL
- Keep the contact form minimal.
- Avoid logging personal data in server logs (default).
- Store/retain only what is necessary.
