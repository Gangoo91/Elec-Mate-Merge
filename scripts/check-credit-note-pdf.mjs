/**
 * The credit note PDF template — ELE-1704.
 *
 * `docs/pdf-monkey-credit-note-template.html` is derived from the live
 * invoice template: a whole block (key facts + "How to pay" + bank details)
 * was cut out and new markup put in its place. Nothing had ever rendered it.
 *
 * ⚠️ What this checks, and what it does NOT.
 *
 * It is NOT a Liquid engine. Conditionals take their FIRST branch and loops
 * run twice, so this proves nothing about Liquid semantics — a wrong `{% if %}`
 * would sail through. What it does prove is the class of thing a derived
 * template actually gets wrong:
 *
 *   • the Liquid balances and every drop resolves (no stray {{ }} in output)
 *   • no CSS custom property is used without being declared — the --em-mast-*
 *     bug that blanked twenty live certificate templates
 *   • nothing overflows A4 width, which is how a PDF silently loses a column
 *   • no label renders with a blank value beside it (Liquid drops nils)
 *   • every drop the template reads is one the edge function actually sends
 *
 * PDFMonkey renders with Chrome, and so does this, at A4 96dpi.
 */
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';

const TEMPLATE = 'docs/pdf-monkey-credit-note-template.html';
const FUNCTION = 'supabase/functions/generate-pdf-monkey/index.ts';
/*
 * The CONTENT box, measured from what PDFMonkey ACTUALLY uses.
 *
 * The template carries `@page { margin: 12mm 10mm }` and PDFMonkey ignores
 * it — the page box comes from the template's own `settings.margin`, which
 * for this invoice family is { top: 5, right: 5, bottom: 12, left: 5 } mm.
 * Confirmed against a real generated PDF (595.92 x 841.92pt = A4).
 *
 * So content gets 210 - 10 = 200mm across and 297 - 17 = 280mm down.
 */
const MARGIN = { top: 5, right: 5, bottom: 12, left: 5 };
const mm = (v) => Math.round((v / 25.4) * 96);
const A4_W = mm(210 - MARGIN.left - MARGIN.right);
const PAGE_H = mm(297 - MARGIN.top - MARGIN.bottom);

const problems = [];
const src = readFileSync(TEMPLATE, 'utf8');

/* ── 1. Liquid balance ───────────────────────────────────────────────── */
{
  const openers = { if: 'endif', for: 'endfor', case: 'endcase', unless: 'endunless', capture: 'endcapture' };
  const closers = Object.fromEntries(Object.entries(openers).map(([k, v]) => [v, k]));
  const stack = [];
  for (const [, tag] of src.matchAll(/{%-?\s*(\w+)/g)) {
    if (openers[tag]) stack.push(tag);
    else if (closers[tag]) {
      if (stack[stack.length - 1] !== closers[tag]) problems.push(`unbalanced Liquid: unexpected {% ${tag} %}`);
      else stack.pop();
    }
  }
  if (stack.length) problems.push(`unclosed Liquid tags: ${stack.join(', ')}`);
}

/* ── 2. CSS custom properties ────────────────────────────────────────── */
{
  const used = new Set([...src.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]));
  const declared = new Set([...src.matchAll(/(--[\w-]+)\s*:/g)].map((m) => m[1]));
  for (const v of used) if (!declared.has(v)) problems.push(`CSS var used but never declared: ${v}`);
}

/* ── 3. Every drop is supplied by the edge function ──────────────────── */
{
  const fn = readFileSync(FUNCTION, 'utf8');
  const start = fn.indexOf('(payload as Record<string, unknown>).creditNote = {');
  if (start < 0) problems.push('the credit-note overlay has gone from generate-pdf-monkey');
  else {
    const block = fn.slice(start, fn.indexOf('};', start));
    const supplied = new Set([...block.matchAll(/^\s*(\w+):/gm)].map((m) => m[1]));
    const used = new Set([...src.matchAll(/creditNote\.(\w+)/g)].map((m) => m[1]));
    for (const u of used) if (!supplied.has(u)) problems.push(`template reads creditNote.${u}, the function never sends it`);
  }
}

/* ── 5. Render it ────────────────────────────────────────────────────── */
const sample = (expr) => {
  const base = expr.split('|')[0].trim();
  const S = {
    'creditNote.number': 'Credit/001',
    'creditNote.reference': 'Credit note against invoice Invoice/042 dated 14 September 2026',
    'creditNote.reason': 'Second circuit not required',
    'creditNote.totalFormatted': '£120.00',
    'creditNote.netAfterCisFormatted': '£120.00',
    'invoice.invoiceNumber': 'Invoice/042',
    'invoice.client.name': 'Mrs J Whitfield',
    'invoice.client.address': '14 Brook Lane\nStafford\nST17 4QQ',
    'invoice.jobDetails.title': 'Consumer unit replacement and two new circuits',
    'companyProfile.company_name': 'Moore Electrical Services Ltd',
    'item.description': 'Consumer unit — 10 way dual RCD, supplied and fitted',
    term: 'Payment due within 14 days of the date of this document.',
  };
  if (S[base]) return S[base];
  const d = expr.match(/default:\s*'([^']*)'/);
  if (d) return d[1];
  if (/Formatted|[Aa]mount|total/.test(base)) return '£120.00';
  if (/date/i.test(expr)) return '28 Sep 2026';
  if (/[Cc]olor/.test(base)) return '#1e40af';
  return base.split('.').pop().replace(/_/g, ' ');
};

let html = src.replace(/{%\s*assign[^%]*%}/g, '');
for (let i = 0; i < 6; i++) {
  const next = html.replace(/{%\s*for\s+[^%]*%}([\s\S]*?){%\s*endfor\s*%}/g, (_, body) => body + body);
  if (next === html) break;
  html = next;
}
for (let i = 0; i < 80; i++) {
  const next = html.replace(/{%\s*if[^%]*%}([\s\S]*?){%\s*endif\s*%}/g, (_, body) =>
    body.split(/{%\s*els(?:if|e)[^%]*%}/)[0]
  );
  if (next === html) break;
  html = next;
}
html = html.replace(/{{-?\s*([\s\S]*?)\s*-?}}/g, (_, e) => sample(e)).replace(/{%[\s\S]*?%}/g, '');

const leftovers = html.match(/{[{%]/g);
if (leftovers) problems.push(`${leftovers.length} unresolved Liquid marker(s) after rendering`);

const dir = mkdtempSync(join(tmpdir(), 'cnpdf-'));
const file = join(dir, 'credit-note.html');
writeFileSync(file, html);

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: A4_W, height: 1123 } });
await page.goto(`file://${file}`);
await page.waitForTimeout(300);

const r = await page.evaluate((W) => {
  const out = { over: [], empty: [], tiny: [], scrollW: document.documentElement.scrollWidth, h: document.body.scrollHeight };
  for (const el of document.querySelectorAll('*')) {
    const b = el.getBoundingClientRect();
    if (b.width > 0 && b.right > W + 1) out.over.push(`${el.tagName}.${String(el.className).slice(0, 28)} right=${Math.round(b.right)}`);
    if (!el.children.length && (el.textContent || '').trim()) {
      const px = parseFloat(getComputedStyle(el).fontSize);
      if (px && px < 7) out.tiny.push(`${px}px "${(el.textContent || '').trim().slice(0, 26)}"`);
    }
  }
  for (const el of document.querySelectorAll('.label, .info-label, .card-header')) {
    const sib = el.nextElementSibling;
    if (sib && !(sib.textContent || '').trim()) out.empty.push((el.textContent || '').trim().slice(0, 28));
  }
  return out;
}, A4_W);

const body = await page.evaluate(() => document.body.innerText);
await page.screenshot({ path: join(dir, 'credit-note.png'), fullPage: true });
await browser.close();

/* ── 6. It must actually say what a credit note has to say ───────────── */
if (!/CREDIT NOTE/.test(body)) problems.push('the document is not headed CREDIT NOTE');
if (!/Credit\/001/.test(body)) problems.push('the credit note number does not appear');
if (!/against invoice Invoice\/042/i.test(body)) problems.push('the statutory reference to the credited invoice is missing');
/*
 * A credit note must not ask to be paid. Checked against the RENDERED TEXT,
 * not the source: the first version scanned the file and tripped on this
 * template's own HTML comment explaining that it had REMOVED the bank
 * details. What matters is what reaches the customer.
 */
for (const banned of [
  /Amount due/i,
  /Balance due/i,
  /How to pay/i,
  /Sort code/i,
  /Account number/i,
  /Payment due/i,
  /Late payment interest/i,
  // Inherited invoice copy on a document that is not an invoice. The
  // certificate callout said "accompanies this invoice".
  /accompanies this invoice/i,
  /Terms & conditions/i,
]) {
  if (banned.test(body)) problems.push(`the document carries invoice payment wording: ${banned}`);
}

r.over.slice(0, 5).forEach((o) => problems.push(`overflows A4 width — ${o}`));
r.tiny.slice(0, 5).forEach((t) => problems.push(`text under 7px — ${t}`));
r.empty.slice(0, 5).forEach((e) => problems.push(`label with a blank value — "${e}"`));
if (r.scrollW > A4_W + 1) problems.push(`page is wider than A4 (${r.scrollW} > ${A4_W})`);

const pages = Math.ceil(r.h / PAGE_H);
console.log(
  `  rendered ${r.h}px over ${pages} page(s) of ${PAGE_H}px, content width ${r.scrollW}/${A4_W}`
);

/*
 * A credit note is a SHORT document. Spilling a little past the first page
 * puts nothing but the footer on page two, which is exactly what the first
 * real PDF did. Flagged rather than tolerated: customers see this.
 */
if (pages > 1 && r.h < PAGE_H * 1.3) {
  problems.push(
    `spills onto page ${pages} by ${r.h - PAGE_H}px — page ${pages} holds little more than the footer`
  );
}
console.log(`  screenshot: ${join(dir, 'credit-note.png')}`);

if (problems.length) {
  console.log(`\n❌ credit note template: ${problems.length} problem(s)`);
  problems.forEach((p) => console.log(`  • ${p}`));
  process.exit(1);
}
console.log('\n✅ credit note template: balanced, complete and fits A4');
