#!/usr/bin/env node
/**
 * Pull the LIVE PDFMonkey template bodies into docs/templates/.
 *
 * check-cert-mapping compares each formatter's payload against the template
 * copy in docs/templates. Templates are edited live in PDFMonkey (margins,
 * the photo appendix, the building-regs block, the verify-engineer QR — all
 * landed there in September 2026 and never here), so the copies drift and the
 * check reports "fields that never print" for keys the live template prints
 * happily. This makes the copies match live; run it before the check.
 *
 *   PDFMONKEY_API_KEY=… node scripts/pdfmonkey-pull-templates.mjs [--dry]
 *
 * Read-only against PDFMonkey. Writes only under docs/templates/.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const KEY = process.env.PDFMONKEY_API_KEY;
if (!KEY) {
  console.error('PDFMONKEY_API_KEY is not set');
  process.exit(2);
}
const DRY = process.argv.includes('--dry');
const ROOT = new URL('..', import.meta.url).pathname;
const CHECK = readFileSync(join(ROOT, 'scripts', 'check-cert-mapping.mjs'), 'utf8');

// The check's own table is the source of truth for id → templateId → file.
const entries = [];
const re = /id: '([a-z0-9-]+)'[\s\S]*?templateId: '([A-F0-9-]+)'[\s\S]*?template: '([^']+)'/g;
for (const m of CHECK.matchAll(re))
  entries.push({ id: m[1], templateId: m[2].toLowerCase(), file: m[3] });

let changed = 0;
for (const e of entries) {
  const res = await fetch(`https://api.pdfmonkey.io/api/v1/document_templates/${e.templateId}`, {
    headers: { Authorization: `Bearer ${KEY}`, Accept: 'application/json' },
  });
  if (!res.ok) {
    console.error(`  ${e.id.padEnd(22)} HTTP ${res.status}`);
    continue;
  }
  const { document_template: t } = await res.json();
  if (typeof t?.body !== 'string') {
    console.error(`  ${e.id.padEnd(22)} no body in response`);
    continue;
  }
  const path = join(ROOT, 'docs', 'templates', e.file);
  const before = existsSync(path) ? readFileSync(path, 'utf8') : '';
  const same = before === t.body;
  const draftDiffers = t.body !== t.body_draft;
  console.log(
    `  ${e.id.padEnd(22)} ${same ? 'unchanged' : 'UPDATED  '} ${String(t.body.length).padStart(7)} chars` +
      (draftDiffers ? '   (live draft differs — pulled the PUBLISHED body)' : '')
  );
  if (!same && !DRY) {
    writeFileSync(path, t.body);
    changed++;
  }
}
console.log(`\n${changed} template file(s) ${DRY ? 'would be' : ''} updated under docs/templates/`);
