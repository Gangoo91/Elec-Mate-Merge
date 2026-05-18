#!/usr/bin/env node
/**
 * gsc-submit-sitemaps.mjs — submit every sitemap to Google Search Console
 * for the elec-mate.com property.
 *
 * Uses the same service account as indexing-ping.mjs.
 * Re-submission is idempotent — GSC just re-queues the sitemap for fetch.
 *
 * Usage:
 *   GSC_SA_JSON=/path/to/sa.json node scripts/seo-engine/gsc-submit-sitemaps.mjs
 */

import { existsSync, writeFileSync, mkdtempSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const CREDS = process.env.GSC_SA_JSON;
const SITE = 'sc-domain:elec-mate.com';
const BASE = 'https://www.elec-mate.com';

const SITEMAPS = [
  '/sitemap.xml',
  '/sitemap-pages.xml',
  '/sitemap-guides.xml',
  '/sitemap-seo.xml',
  '/sitemap-tools.xml',
  '/sitemap-training.xml',
  '/sitemap-compare.xml',
];

if (!CREDS || !existsSync(CREDS)) {
  console.error('GSC_SA_JSON env var required');
  process.exit(1);
}

const sitemapUrls = SITEMAPS.map((s) => BASE + s);

const tmp = mkdtempSync(join(tmpdir(), 'gsc-sm-'));
const pyScript = `
import json, sys
from google.oauth2 import service_account
from googleapiclient.discovery import build

CREDS = '${CREDS}'
SITE = '${SITE}'
urls = json.loads(sys.stdin.read())

creds = service_account.Credentials.from_service_account_file(
    CREDS, scopes=['https://www.googleapis.com/auth/webmasters'])
svc = build('searchconsole', 'v1', credentials=creds, cache_discovery=False)

ok = err = 0
for u in urls:
    try:
        svc.sitemaps().submit(siteUrl=SITE, feedpath=u).execute()
        print(f'  submitted: {u}')
        ok += 1
    except Exception as e:
        err += 1
        print(f'  ERR {u}: {str(e)[:160]}', file=sys.stderr)

print(json.dumps({'ok': ok, 'err': err}))
`;

const pyFile = join(tmp, 'submit.py');
writeFileSync(pyFile, pyScript);

console.log(`Submitting ${sitemapUrls.length} sitemaps to GSC (${SITE})...`);
const out = execSync(`python3 ${pyFile}`, {
  input: JSON.stringify(sitemapUrls),
  maxBuffer: 50 * 1024 * 1024,
}).toString();
console.log(out);
