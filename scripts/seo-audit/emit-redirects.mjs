#!/usr/bin/env node

/**
 * Emit Netlify _redirects file from the latest audit's cannibalisation
 * clusters. Reads reports/seo-audit.json, writes public/_redirects.
 *
 * Each cluster's canonical wins; every loser → 301 to canonical.
 *
 * Run AFTER `node scripts/seo-audit/run.mjs`.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const OUT = join(ROOT, 'public', '_redirects');

if (!existsSync(REPORT)) {
  console.error(`No audit report at ${REPORT}. Run scripts/seo-audit/run.mjs first.`);
  process.exit(1);
}

const report = JSON.parse(readFileSync(REPORT, 'utf-8'));
const clusters = report.clusterDecisions || [];

if (clusters.length === 0) {
  console.log('No cannibalisation clusters found. Nothing to emit.');
  process.exit(0);
}

const lines = [
  '# Auto-generated cannibalisation redirects',
  `# Source: reports/seo-audit.json (run ${report.summary?.generatedAt || 'unknown'})`,
  `# Clusters: ${clusters.length}`,
  '# Do not edit by hand. Regenerate via:',
  '#   node scripts/seo-audit/run.mjs && node scripts/seo-audit/emit-redirects.mjs',
  '',
];

let redirectCount = 0;
for (const cluster of clusters) {
  const canonical = cluster.canonical;
  if (!canonical) continue;
  lines.push(`# cluster: ${cluster.clusterTopic} (${cluster.intentClass})`);
  for (const member of cluster.members) {
    if (member === canonical) continue;
    // Netlify _redirects syntax: <from> <to> 301!
    // The `!` forces the redirect even if the target route also exists.
    lines.push(`${member.padEnd(60)} ${canonical} 301!`);
    redirectCount++;
  }
  lines.push('');
}

// Preserve any existing manual rules at the bottom (if file exists, keep its
// content under a separator so this generated section can be regenerated)
let existingTail = '';
if (existsSync(OUT)) {
  const existing = readFileSync(OUT, 'utf-8');
  const tailMarker = '# --- manual rules below ---';
  const tailIdx = existing.indexOf(tailMarker);
  if (tailIdx >= 0) existingTail = '\n' + existing.slice(tailIdx);
}

const output = lines.join('\n') + '\n# --- manual rules below ---' + existingTail + '\n';
writeFileSync(OUT, output, 'utf-8');

console.log(`Wrote ${redirectCount} cannibalisation redirects to public/_redirects`);
console.log(`Clusters: ${clusters.length}`);
console.log('Sample:');
for (const c of clusters.slice(0, 5)) {
  console.log(`  ${c.clusterTopic}: canonical=${c.canonical}, redirect(s)=${c.members.length - 1}`);
}
