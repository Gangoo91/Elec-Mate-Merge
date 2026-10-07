#!/usr/bin/env node
/**
 * Enquiry reader eval (ELE-2022).
 *
 * Sends every case in cases.json through the live inbound-enquiry-email function
 * in dry-run mode (read, nothing stored) and scores the fields.
 *
 *   INBOUND_EMAIL_SECRET=… EVAL_TO=<prefix>-<token>@in.elec-mate.com node scripts/enquiry-eval/run.mjs
 *
 * Run it after any change to _shared/enquiry-reader.ts. Fails (exit 1) under 90%.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { deflateSync } from 'node:zlib';

const here = dirname(fileURLToPath(import.meta.url));
const cases = JSON.parse(readFileSync(join(here, 'cases.json'), 'utf8'));
const URL = 'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/inbound-enquiry-email?dry_run=1';
const secret = process.env.INBOUND_EMAIL_SECRET;
const to = process.env.EVAL_TO;
if (!secret || !to) {
  console.error('Set INBOUND_EMAIL_SECRET and EVAL_TO');
  process.exit(2);
}

const digits = (v) => (v ?? '').replace(/\D/g, '');

// Tiny generated images: a 64×48 PNG gradient (not a fuse board) and a GIF
function png() {
  const w = 64, h = 48;
  const rows = [];
  for (let y = 0; y < h; y++) {
    const r = [0];
    for (let x = 0; x < w; x++) r.push((x * 4) & 255, (y * 5) & 255, 120);
    rows.push(Buffer.from(r));
  }
  const crcTable = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const len = Buffer.alloc(4); len.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([len, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', deflateSync(Buffer.concat(rows))), chunk('IEND', Buffer.alloc(0))]).toString('base64');
}
const GIF = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// The written reply: short, no links, no prices, no dashes
function replyProblems(reply) {
  if (!reply) return ['no reply'];
  const out = [];
  const words = reply.trim().split(/\s+/).length;
  if (words < 20 || words > 100) out.push(`${words} words`);
  if (/https?:\/\/|www\./i.test(reply)) out.push('has a link');
  if (/£\s?\d/.test(reply)) out.push('quotes a price');
  if (/[—–]|\s-\s/.test(reply)) out.push('uses a dash');
  return out;
}
const norm = (v) => (v ?? '').toUpperCase().replace(/\s+/g, '');

function check(key, want, r) {
  const f = r.fields ?? {};
  switch (key) {
    case 'is_enquiry':
      return (r.is_enquiry ?? true) === want;
    case 'job_key':
      // Some messages fairly fit two types ("outside light stopped working")
      return Array.isArray(want) ? want.includes(f.job_key) : f.job_key === want;
    case 'urgent':
      return (f.urgency === 'emergency') === want;
    case 'phone':
      return want === null ? !f.phone : digits(f.phone).endsWith(digits(want).slice(-9));
    case 'email':
      return want === null ? !f.email : (f.email ?? '').toLowerCase() === want.toLowerCase();
    case 'postcode':
      return want === null ? !f.postcode : norm(f.postcode) === norm(want);
    case 'name':
      return (f.name ?? '').toLowerCase().includes(want.toLowerCase());
    case 'work_category':
      return f.work_category === want;
    case 'not_our_work':
      return !!f.not_our_work === want;
    case 'contact_hidden':
      return !!f.contact_hidden === want;
    case 'photo_danger':
      return !!f.photo_danger === want;
    case 'reply_has':
      return (f.draft_reply ?? '').includes(want);
    case 'reply_has_any':
      return want.some((w) => (f.draft_reply ?? '').toLowerCase().includes(w.toLowerCase()));
    case 'availability': {
      const a = f.availability ?? null;
      if (want === null) return a === null;
      if (!a) return false;
      if ('days' in want && JSON.stringify([...(a.days ?? [])].sort()) !== JSON.stringify([...(want.days ?? [])].sort())) return false;
      // Times: [low, high] accepts a range ("mornings" = 11:00 or 12:00)
      for (const k of ['earliest', 'latest']) {
        if (!(k in want)) continue;
        const w = want[k];
        if (w === null ? a[k] !== null : Array.isArray(w) ? !(a[k] >= w[0] && a[k] <= w[1]) : a[k] !== w) return false;
      }
      return true;
    }
    default:
      return false;
  }
}

let pass = 0;
let total = 0;
const failures = [];
const replyIssues = [];
const byField = {};
const started = Date.now();

for (const c of cases) {
  const t0 = Date.now();
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-inbound-secret': secret },
    body: JSON.stringify({
      to,
      from: c.from,
      from_name: c.from_name ?? null,
      reply_to: c.reply_to ?? null,
      subject: c.subject,
      text: c.text,
      message_id: null,
      photos:
        c.photo === 'png'
          ? [{ filename: 'board.png', mime_type: 'image/png', data: png() }]
          : c.photo === 'gif'
            ? [{ filename: 'banner.gif', mime_type: 'image/gif', data: GIF }]
            : undefined,
    }),
  });
  const r = await res.json();
  const ms = Date.now() - t0;
  // Every case must have been read by a model (a silent outage must not "pass")
  const expectations = { ...c.expect, _model: true };
  if (c.expect.is_enquiry !== false) expectations._reply = true;
  const results = Object.entries(expectations).map(([k, want]) => {
    if (k === '_model') {
      const ok = !!r.fields?.ai_model;
      byField.model ??= { pass: 0, total: 0 };
      byField.model.total++;
      if (ok) byField.model.pass++;
      return { k: 'model', want: 'any', ok };
    }
    if (k === '_reply') {
      const problems = replyProblems(r.fields?.draft_reply);
      const ok = problems.length === 0;
      byField.reply ??= { pass: 0, total: 0 };
      byField.reply.total++;
      if (ok) byField.reply.pass++;
      if (!ok) replyIssues.push(`${c.id}: ${problems.join(', ')}`);
      return { k: 'reply', want: 'clean', ok };
    }
    const ok = check(k, want, r);
    byField[k] ??= { pass: 0, total: 0 };
    byField[k].total++;
    if (ok) byField[k].pass++;
    return { k, want, ok };
  });
  const bad = results.filter((x) => !x.ok);
  total += results.length;
  pass += results.length - bad.length;
  const mark = bad.length ? '✗' : '✓';
  console.log(`${mark} ${c.id.padEnd(28)} ${String(ms).padStart(5)}ms  ${r.fields?.job_key ?? '-'}${r.fields?.urgency === 'emergency' ? ' URGENT' : ''}${r.is_enquiry === false ? ' (not an enquiry)' : ''}`);
  for (const b of bad) {
    const f = r.fields ?? {};
    if (b.k === 'model' || b.k === 'reply') continue;
    const got = { is_enquiry: r.is_enquiry, job_key: f.job_key, urgent: f.urgency, phone: f.phone, email: f.email, postcode: f.postcode, name: f.name, work_category: f.work_category, not_our_work: f.not_our_work, contact_hidden: f.contact_hidden }[b.k];
    failures.push(`${c.id}: ${b.k} wanted ${JSON.stringify(b.want)} got ${JSON.stringify(got)}`);
  }
  if (c.id === 'form-cu' && r.fields?.draft_reply) console.log(`   reply: "${r.fields.draft_reply}"`);
}

const pct = Math.round((pass / total) * 1000) / 10;
console.log(`\n${pass}/${total} checks passed (${pct}%) across ${cases.length} enquiries in ${Math.round((Date.now() - started) / 1000)}s\n`);
for (const [k, v] of Object.entries(byField)) {
  console.log(`  ${k.padEnd(15)} ${v.pass}/${v.total}`);
}
if (failures.length) {
  console.log('\nFailures:');
  for (const f of failures) console.log('  ' + f);
}
if (replyIssues.length) {
  console.log('\nReply issues:');
  for (const f of replyIssues) console.log('  ' + f);
}
// Emergencies are gated on their own: 99% overall must never hide a missed one
const urgent = byField.urgent ?? { pass: 0, total: 0 };
const emergencyOk = urgent.pass === urgent.total;
console.log(`\nUrgency checks (must all pass): ${urgent.pass}/${urgent.total}${emergencyOk ? '' : '  ← FAIL'}`);
process.exit(pct >= 90 && emergencyOk ? 0 : 1);
