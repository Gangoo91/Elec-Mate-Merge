#!/usr/bin/env node
/**
 * gsc-export.mjs — Pull GSC search analytics into JSON files used by the SEO engine.
 *
 * Outputs:
 *   scripts/seo-engine/gsc-pages-90d.json         — per-URL pos/imp/clicks/CTR last 90 days
 *   scripts/seo-engine/gsc-queries-per-url-90d.json — per-URL top 5 queries last 90 days
 *
 * Requires:
 *   GSC_SA_JSON env var (path to service-account JSON) OR pass --creds <path>
 *
 * Usage:
 *   GSC_SA_JSON=/path/to/sa.json node scripts/seo-engine/gsc-export.mjs
 */

import { writeFileSync, existsSync, mkdtempSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SITE = process.env.GSC_SITE || 'sc-domain:elec-mate.com';
const DAYS = parseInt(process.env.GSC_DAYS || '90', 10);

const credsIdx = process.argv.indexOf('--creds');
const CREDS_PATH = credsIdx >= 0 ? process.argv[credsIdx + 1] : process.env.GSC_SA_JSON;
if (!CREDS_PATH || !existsSync(CREDS_PATH)) {
  console.error(`Missing service-account JSON. Set GSC_SA_JSON or pass --creds <path>`);
  process.exit(1);
}

// Use python3 + google-api-python-client (already installed) for token handling.
// Easier than re-implementing JWT signing in Node.
const PY_SCRIPT = `
import json, sys
from datetime import date, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

CREDS = '${CREDS_PATH}'
SITE = '${SITE}'
DAYS = ${DAYS}

creds = service_account.Credentials.from_service_account_file(CREDS, scopes=['https://www.googleapis.com/auth/webmasters.readonly'])
gsc = build('searchconsole', 'v1', credentials=creds, cache_discovery=False)
end = date.today(); start = end - timedelta(days=DAYS)

# Pull per-URL aggregate
pages = []
start_row = 0
while True:
    res = gsc.searchanalytics().query(siteUrl=SITE, body={
        'startDate': start.isoformat(), 'endDate': end.isoformat(),
        'dimensions': ['page'], 'rowLimit': 25000, 'startRow': start_row
    }).execute()
    rows = res.get('rows', [])
    if not rows: break
    for r in rows:
        url = r['keys'][0]
        slug = url.replace('https://www.elec-mate.com', '').replace('https://elec-mate.com', '')
        pages.append({
            'url': url, 'slug': slug,
            'impressions': r['impressions'], 'clicks': r['clicks'],
            'ctr': r['ctr'], 'position': r['position'],
        })
    if len(rows) < 25000: break
    start_row += 25000

print(json.dumps({'pages': pages}, indent=2))
`;

const tmp = mkdtempSync(join(tmpdir(), 'gsc-'));
console.log(`Pulling GSC data for last ${DAYS} days...`);
const pyFile1 = join(tmp, 'p1.py');
writeFileSync(pyFile1, PY_SCRIPT);
const pagesJson = execSync(`python3 ${pyFile1}`, { maxBuffer: 100 * 1024 * 1024 }).toString();
const { pages } = JSON.parse(pagesJson);
console.log(`  ${pages.length} pages pulled`);

writeFileSync(
  join(ROOT, 'scripts/seo-engine/gsc-pages-90d.json'),
  JSON.stringify(pages, null, 2),
);
console.log(`  wrote gsc-pages-90d.json`);

// Now pull top queries per URL — only for pages worth rewriting
const winnable = pages
  .filter((p) => p.position >= 4 && p.position <= 20 && p.impressions >= 200)
  .sort((a, b) => b.impressions - a.impressions)
  .slice(0, 100);
console.log(`  ${winnable.length} winnable pages — pulling top queries each...`);

const QUERIES_SCRIPT = `
import json, sys
from datetime import date, timedelta
from google.oauth2 import service_account
from googleapiclient.discovery import build

CREDS = '${CREDS_PATH}'
SITE = '${SITE}'
DAYS = ${DAYS}

creds = service_account.Credentials.from_service_account_file(CREDS, scopes=['https://www.googleapis.com/auth/webmasters.readonly'])
gsc = build('searchconsole', 'v1', credentials=creds, cache_discovery=False)
end = date.today(); start = end - timedelta(days=DAYS)

urls = json.loads(sys.stdin.read())
result = {}
for url in urls:
    slug = url.replace('https://www.elec-mate.com', '').replace('https://elec-mate.com', '')
    try:
        res = gsc.searchanalytics().query(siteUrl=SITE, body={
            'startDate': start.isoformat(), 'endDate': end.isoformat(),
            'dimensions': ['query'],
            'dimensionFilterGroups': [{'filters':[{'dimension':'page','operator':'equals','expression':url}]}],
            'rowLimit': 5
        }).execute()
        result[slug] = [{
            'query': r['keys'][0],
            'impressions': r['impressions'], 'clicks': r['clicks'],
            'ctr': r['ctr'], 'position': r['position'],
        } for r in res.get('rows', [])]
    except Exception as e:
        result[slug] = []
print(json.dumps(result, indent=2))
`;

const urlsStdin = JSON.stringify(winnable.map((p) => p.url));
const pyFile2 = join(tmp, 'p2.py');
writeFileSync(pyFile2, QUERIES_SCRIPT);
const queriesJson = execSync(
  `python3 ${pyFile2}`,
  { input: urlsStdin, maxBuffer: 100 * 1024 * 1024 },
).toString();
const queries = JSON.parse(queriesJson);
writeFileSync(
  join(ROOT, 'scripts/seo-engine/gsc-queries-per-url-90d.json'),
  JSON.stringify(queries, null, 2),
);
console.log(`  wrote gsc-queries-per-url-90d.json (${Object.keys(queries).length} URLs)`);
console.log('\nDone. Next: node scripts/seo-engine/ctr-rewriter.mjs');
