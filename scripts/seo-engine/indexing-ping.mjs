#!/usr/bin/env node
/**
 * indexing-ping.mjs — Bulk-submit URLs to Google Indexing API.
 *
 * Quota: ~200 URLs/day per project (Google's default).
 *
 * Picks the most useful URLs to ping each run:
 *  - All pages in reports/ctr-rewrites-applied.json (just had title rewrites)
 *  - All 40 new SEO pages from recent batches
 *  - Top 100 winnable pages from scripts/seo-engine/gsc-pages-90d.json
 *  - Deduped, capped at MAX_PER_RUN
 *
 * Usage:
 *   GSC_SA_JSON=/path/to/sa.json node scripts/seo-engine/indexing-ping.mjs
 */

import { readFileSync, existsSync, writeFileSync, mkdtempSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const CREDS = process.env.GSC_SA_JSON;
const MAX_PER_RUN = parseInt(process.env.MAX_PER_RUN || '180', 10);
const BASE = 'https://www.elec-mate.com';

if (!CREDS || !existsSync(CREDS)) {
  console.error('GSC_SA_JSON env var required');
  process.exit(1);
}

const urls = new Set();

// 1. Pages we just rewrote
const appliedFile = join(ROOT, 'reports/ctr-rewrites-applied.json');
if (existsSync(appliedFile)) {
  for (const r of JSON.parse(readFileSync(appliedFile, 'utf-8'))) {
    urls.add(BASE + r.slug);
  }
}

// 2. 40 new SEO pages (hand-listed for now; could parse SEORoutes.tsx)
const newPages = [
  '/guides/afdd-mandatory-hmo-care-home-a4-2026',
  '/guides/section-722-ev-charging-a4-2026-changes',
  '/guides/spd-chapter-443-a4-2026',
  '/guides/tn-c-banned-new-installations-a4-2026',
  '/guides/cable-reaction-to-fire-cca-a4-2026',
  '/guides/section-712-prosumer-a4-2026',
  '/guides/section-715-elv-lighting-a4-2026',
  '/guides/reduced-low-voltage-110v-cte-site-supplies',
  '/guides/poe-plus-plus-type-4-90w-installation',
  '/guides/cat6-cat6a-current-rating-poe',
  '/guides/ip-camera-poe-installation-uk',
  '/guides/structured-cabling-bs-en-50173-electricians',
  '/guides/bs-en-50174-data-cable-installation',
  '/guides/poe-lighting-vs-traditional-led-wiring',
  '/guides/dali-lighting-control-wiring-bs-en-62386',
  '/guides/knx-wiring-installation-guide-uk',
  '/guides/v2h-bidirectional-ev-charging',
  '/guides/lvdc-dc-microgrid-distribution',
  '/guides/smart-distribution-board-iot-consumer-unit',
  '/guides/section-537-isolation-switching-a4-2026',
  '/guides/electrical-rams-template-uk',
  '/guides/rams-for-eicr-inspection',
  '/guides/rams-for-consumer-unit-replacement',
  '/guides/rams-for-ev-charger-installation',
  '/guides/rams-for-full-rewire',
  '/guides/rams-for-solar-pv-installation',
  '/guides/how-to-write-electrical-method-statement',
  '/guides/electrical-method-statement-template',
  '/guides/method-statement-safe-isolation',
  '/guides/method-statement-live-working',
  '/guides/method-statement-fault-finding',
  '/guides/cdm-2015-for-electricians',
  '/guides/permit-to-work-electrical-isolation',
  '/guides/lockout-tagout-loto-electricians',
  '/guides/site-induction-electrical-contractors',
  '/guides/near-miss-reporting-electricians',
  '/guides/working-near-live-mains-hazard-control',
  '/guides/lone-working-electricians',
  '/guides/confined-space-electrical-work',
  '/guides/working-at-height-electricians',
  '/guides/bs-7671-a4-2026-summary',
  '/guides/bs-7671-a4-2026-afdd-changes',
  '/guides/bs-7671-a4-2026-eic-model-form',
  '/guides/bs-7671-a4-2026-meiwc-model-form',
  '/guides/bs-7671-a4-2026-tn-cs-pnb-earthing',
  '/guides/bs-7671-a4-2026-luminaire-rcd-protection',
  '/guides/bs-7671-a4-2026-schedule-of-tests',
];
for (const p of newPages) urls.add(BASE + p);

// 3. Top winnable pages from GSC
const gscFile = join(ROOT, 'scripts/seo-engine/gsc-pages-90d.json');
if (existsSync(gscFile)) {
  const pages = JSON.parse(readFileSync(gscFile, 'utf-8'));
  const winnable = pages
    .filter((p) => p.position >= 4 && p.position <= 20 && p.impressions >= 100)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 100);
  for (const p of winnable) urls.add(BASE + p.slug);
}

const urlList = Array.from(urls).slice(0, MAX_PER_RUN);
console.log(`Pinging ${urlList.length} URLs via Indexing API (cap: ${MAX_PER_RUN})...`);

const tmp = mkdtempSync(join(tmpdir(), 'idx-'));
const pyScript = `
import json, sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

CREDS = '${CREDS}'
urls = json.loads(sys.stdin.read())
creds = service_account.Credentials.from_service_account_file(CREDS, scopes=['https://www.googleapis.com/auth/indexing'])
idx = build('indexing', 'v3', credentials=creds, cache_discovery=False)

ok = err = 0
for url in urls:
    try:
        idx.urlNotifications().publish(body={'url': url, 'type': 'URL_UPDATED'}).execute()
        ok += 1
    except Exception as e:
        err += 1
        if err <= 5: print(f'  ERR {url}: {str(e)[:120]}', file=sys.stderr)

print(json.dumps({'ok': ok, 'err': err}))
`;
const pyFile = join(tmp, 'ping.py');
writeFileSync(pyFile, pyScript);
const out = execSync(`python3 ${pyFile}`, { input: JSON.stringify(urlList), maxBuffer: 50 * 1024 * 1024 }).toString();
console.log(out);
