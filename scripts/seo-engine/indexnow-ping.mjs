#!/usr/bin/env node
/**
 * indexnow-ping.mjs — Bulk-submit URLs to IndexNow (used by Bing,
 * Yandex, Seznam, Naver, IndexNow.org partners — and indirectly powers
 * ChatGPT search citations + Perplexity, both of which draw from Bing).
 *
 * Unlike Google Indexing API:
 *  - No daily quota cap (recommended: <10,000 URLs/day per host)
 *  - Submits to all IndexNow partners in a single call
 *  - Accepts batches up to 10,000 URLs per request
 *
 * Key file: public/667dd51e03b216ccc6459c672fdfda85.txt
 * Must be served at https://www.elec-mate.com/667dd51e03b216ccc6459c672fdfda85.txt
 *
 * Usage:
 *   node scripts/seo-engine/indexnow-ping.mjs                  # ping curated priority URLs
 *   node scripts/seo-engine/indexnow-ping.mjs --all-seo        # ping every routed SEO URL (~1349)
 *   node scripts/seo-engine/indexnow-ping.mjs --from <file>    # ping URLs listed in file (one per line)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const KEY = '667dd51e03b216ccc6459c672fdfda85';
const HOST = 'www.elec-mate.com';
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const BATCH_SIZE = 1000; // safe under IndexNow's 10k cap

const args = new Set(process.argv.slice(2));
const ALL_SEO = args.has('--all-seo');
const fromIdx = process.argv.indexOf('--from');
const FROM_FILE = fromIdx !== -1 ? process.argv[fromIdx + 1] : null;

// --- Build URL list -------------------------------------------------------

const urls = new Set();

if (FROM_FILE) {
  if (!existsSync(FROM_FILE)) {
    console.error(`File not found: ${FROM_FILE}`);
    process.exit(1);
  }
  for (const line of readFileSync(FROM_FILE, 'utf-8').split('\n')) {
    const t = line.trim();
    if (t.startsWith('http')) urls.add(t);
    else if (t.startsWith('/')) urls.add(BASE + t);
  }
} else if (ALL_SEO) {
  // Pull every routed slug from the SEO audit JSON
  const auditFile = join(ROOT, 'reports/seo-audit.json');
  if (!existsSync(auditFile)) {
    console.error('reports/seo-audit.json missing — run scripts/seo-audit/run.mjs first');
    process.exit(1);
  }
  const audit = JSON.parse(readFileSync(auditFile, 'utf-8'));
  for (const p of audit.scored) {
    if (p.slug && p.status !== 'red') urls.add(BASE + p.slug);
  }
} else {
  // Default: priority set — same shape as indexing-ping.mjs target list
  const appliedFile = join(ROOT, 'reports/ctr-rewrites-applied.json');
  if (existsSync(appliedFile)) {
    for (const r of JSON.parse(readFileSync(appliedFile, 'utf-8'))) {
      urls.add(BASE + r.slug);
    }
  }
  // New SEO pages from this session
  const recentSlugs = [
    '/guides/section-537-isolation-switching-a4-2026',
    '/guides/section-722-ev-charging-a4-2026-changes',
    '/guides/section-712-prosumer-a4-2026',
    '/guides/section-715-elv-lighting-a4-2026',
    '/guides/tn-c-banned-new-installations-a4-2026',
    '/guides/cable-reaction-to-fire-cca-a4-2026',
    '/guides/poe-plus-plus-type-4-90w-installation',
    '/guides/v2h-bidirectional-ev-charging',
    '/guides/dali-lighting-control-wiring-bs-en-62386',
    '/guides/knx-wiring-installation-guide-uk',
    '/guides/rams-for-eicr-inspection',
    '/guides/rams-for-consumer-unit-replacement',
    '/guides/rams-for-ev-charger-installation',
    '/guides/rams-for-full-rewire',
    '/guides/rams-for-solar-pv-installation',
    '/guides/bs-7671-a4-2026-summary',
    '/guides/bs-7671-a4-2026-afdd-changes',
    '/guides/bs-7671-a4-2026-eic-model-form',
    '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
    '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
    '/best-electrician-app',
    '/am2-exam-preparation',
    '/electrical-testing-calculators',
    '/tools',
    '/guides',
    '/training',
  ];
  for (const s of recentSlugs) urls.add(BASE + s);

  // Top winnable from GSC if available
  const gscFile = join(ROOT, 'scripts/seo-engine/gsc-pages-90d.json');
  if (existsSync(gscFile)) {
    const pages = JSON.parse(readFileSync(gscFile, 'utf-8'));
    for (const p of pages
      .filter((p) => p.position >= 4 && p.position <= 20 && p.impressions >= 100)
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 200)) {
      urls.add(BASE + p.slug);
    }
  }
}

const urlList = Array.from(urls);
if (urlList.length === 0) {
  console.error('No URLs to submit.');
  process.exit(1);
}

console.log(`Submitting ${urlList.length} URLs to IndexNow (key: ${KEY.slice(0, 8)}...)`);

let totalOk = 0;
let totalErr = 0;

for (let i = 0; i < urlList.length; i += BATCH_SIZE) {
  const batch = urlList.slice(i, i + BATCH_SIZE);
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: batch,
  };
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    if (res.ok || res.status === 200 || res.status === 202) {
      totalOk += batch.length;
      console.log(`  batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} accepted (HTTP ${res.status})`);
    } else {
      const txt = await res.text();
      totalErr += batch.length;
      console.log(`  batch ${Math.floor(i / BATCH_SIZE) + 1}: HTTP ${res.status} — ${txt.slice(0, 200)}`);
    }
  } catch (e) {
    totalErr += batch.length;
    console.log(`  batch ${Math.floor(i / BATCH_SIZE) + 1}: error ${e.message}`);
  }
}

console.log(`\nDone. Accepted: ${totalOk}  Failed: ${totalErr}`);
