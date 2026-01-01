import fs from 'node:fs';
import path from 'node:path';

const messagesDir = path.join(process.cwd(), 'messages');
const locales = ['en', 'ar'];

function flatten(obj, prefix = '', out = new Set()) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      flatten(v, key, out);
    } else {
      out.add(key);
    }
  }
  return out;
}

function readJson(file) {
  const p = path.join(messagesDir, file);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

const keys = {};
for (const locale of locales) {
  keys[locale] = flatten(readJson(`${locale}.json`));
}

let ok = true;
const baseline = keys[locales[0]];

for (const locale of locales.slice(1)) {
  const current = keys[locale];
  const missing = [...baseline].filter((k) => !current.has(k));
  const extra = [...current].filter((k) => !baseline.has(k));

  if (missing.length || extra.length) {
    ok = false;
    console.error(`\n[i18n parity] ${locale}.json mismatch:`);

    if (missing.length) {
      console.error(`  Missing keys (${missing.length}):`);
      missing.forEach((k) => console.error(`    - ${k}`));
    }

    if (extra.length) {
      console.error(`  Extra keys (${extra.length}):`);
      extra.forEach((k) => console.error(`    + ${k}`));
    }
  }
}

if (!ok) process.exit(1);

console.log('[i18n parity] OK: en.json and ar.json keys match.');
