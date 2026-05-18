#!/usr/bin/env node
/**
 * gsc-daily-pull.mjs — Pull yesterday's GSC snapshot per URL, write to
 * public.seo_gsc_daily in Supabase. Designed to run daily via cron/CI.
 *
 * Strategy:
 *  - Pulls a 1-day window ending 2 days ago (GSC has ~48h reporting lag)
 *  - One row per URL with impressions/clicks/position/CTR + top query
 *  - Idempotent on (pull_date, slug) — re-running the same day is safe (upsert)
 *
 * Required env:
 *   GSC_SA_JSON   — path to GSC service-account JSON (webmasters scope)
 *   SUPABASE_URL  — https://jtwygbeceundfgnkirof.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  — service role key
 *
 * Usage:
 *   GSC_SA_JSON=~/Desktop/elec-mate-ee61580a466d.json \
 *     SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     node scripts/seo-engine/gsc-daily-pull.mjs
 */

import { execSync } from 'child_process';
import { existsSync, writeFileSync, mkdtempSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const HISTORY_DIR = join(ROOT, 'scripts/seo-engine/gsc-history');
mkdirSync(HISTORY_DIR, { recursive: true });

const CREDS = process.env.GSC_SA_JSON;
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://jtwygbeceundfgnkirof.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE = process.env.GSC_SITE || 'sc-domain:elec-mate.com';
const SKIP_UPSERT = !SUPABASE_KEY;

if (!CREDS || !existsSync(CREDS)) {
  console.error('GSC_SA_JSON env var required + must point to a valid SA JSON');
  process.exit(1);
}

// -- Step 1: pull from GSC -----------------------------------------------
// Use python (which has google-auth installed) via a temp file.

const pullDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  .toISOString()
  .slice(0, 10); // 2 days ago — GSC lag-safe

const tmp = mkdtempSync(join(tmpdir(), 'gsc-daily-'));
const pyScript = `
import json, sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

CREDS = '${CREDS}'
SITE = '${SITE}'
DATE = '${pullDate}'

creds = service_account.Credentials.from_service_account_file(CREDS, scopes=['https://www.googleapis.com/auth/webmasters.readonly'])
gsc = build('searchconsole', 'v1', credentials=creds, cache_discovery=False)

# 1-day window for that date
pages = []
start_row = 0
while True:
    res = gsc.searchanalytics().query(siteUrl=SITE, body={
        'startDate': DATE, 'endDate': DATE,
        'dimensions': ['page'], 'rowLimit': 25000, 'startRow': start_row
    }).execute()
    rows = res.get('rows', [])
    if not rows: break
    for r in rows:
        url = r['keys'][0]
        slug = url.replace('https://www.elec-mate.com', '').replace('https://elec-mate.com', '')
        pages.append({
            'slug': slug,
            'impressions': r['impressions'],
            'clicks': r['clicks'],
            'ctr': r['ctr'],
            'position': r['position'],
        })
    if len(rows) < 25000: break
    start_row += 25000

# For each page with >= 50 impressions, also pull the top query
top_q = {}
for p in pages:
    if p['impressions'] < 50: continue
    url = 'https://www.elec-mate.com' + p['slug']
    try:
        res = gsc.searchanalytics().query(siteUrl=SITE, body={
            'startDate': DATE, 'endDate': DATE,
            'dimensions': ['query'],
            'dimensionFilterGroups': [{'filters':[{'dimension':'page','operator':'equals','expression':url}]}],
            'rowLimit': 1
        }).execute()
        rows = res.get('rows', [])
        if rows:
            top_q[p['slug']] = {'query': rows[0]['keys'][0], 'impressions': rows[0]['impressions']}
    except Exception:
        pass

print(json.dumps({'date': DATE, 'pages': pages, 'top_q': top_q}))
`;
const pyFile = join(tmp, 'pull.py');
writeFileSync(pyFile, pyScript);

console.log(`Pulling GSC data for ${pullDate}...`);
const raw = execSync(`python3 ${pyFile}`, { maxBuffer: 200 * 1024 * 1024 }).toString();
const { date, pages, top_q } = JSON.parse(raw);
console.log(`  ${pages.length} pages with impressions on ${date}`);

// Always write the local snapshot — useful for diffing / version control
const historyFile = join(HISTORY_DIR, `${date}.json`);
writeFileSync(historyFile, JSON.stringify({ date, pages, top_q }, null, 2));
console.log(`  wrote ${historyFile}`);

if (SKIP_UPSERT) {
  console.log('\nSUPABASE_SERVICE_ROLE_KEY not set — skipping Supabase upsert.');
  console.log('Local snapshot written. Set env + re-run to persist.');
  process.exit(0);
}

// -- Step 2: upsert to Supabase ------------------------------------------

const rows = pages.map((p) => ({
  pull_date: date,
  slug: p.slug,
  impressions: p.impressions,
  clicks: p.clicks,
  position: Number(p.position.toFixed(2)),
  ctr: Number(p.ctr.toFixed(5)),
  top_query: top_q[p.slug]?.query || null,
  top_query_impressions: top_q[p.slug]?.impressions || null,
}));

// Upsert in batches of 500 (Supabase row limit per request)
let upserted = 0;
const BATCH = 500;
for (let i = 0; i < rows.length; i += BATCH) {
  const batch = rows.slice(i, i + BATCH);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/seo_gsc_daily`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(batch),
  });
  if (!res.ok) {
    const txt = await res.text();
    console.error(`Batch ${i}-${i + BATCH} failed: ${res.status} ${txt.slice(0, 300)}`);
    process.exit(1);
  }
  upserted += batch.length;
  console.log(`  upserted ${upserted}/${rows.length}`);
}

console.log(`\nDone. ${upserted} rows upserted to public.seo_gsc_daily for ${date}.`);
console.log(`View latest snapshot: SELECT * FROM seo_gsc_latest ORDER BY impressions DESC LIMIT 20;`);
