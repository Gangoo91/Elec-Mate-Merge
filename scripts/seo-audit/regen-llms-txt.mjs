#!/usr/bin/env node

/**
 * Regenerate public/llms.txt and public/llms-full.txt from canonical sources.
 *
 * Tier 1 (llms.txt — succinct):
 *   - Brand summary
 *   - Compliance: A4:2026 + GN3 + OSG
 *   - Top hubs + categories
 *   - Up to ~150 highest-value page links (greens with tools, key guides)
 *
 * Tier 2 (llms-full.txt — exhaustive):
 *   - Everything above
 *   - Full list of every indexed SEO page from the audit
 *   - Grouped by category (Calculators, Guides, Comparisons, Training, Certs)
 *
 * Why this matters: LLM crawlers (GPTBot/ClaudeBot/PerplexityBot) use
 * llms.txt to understand site scope. A current, comprehensive llms.txt
 * dramatically lifts citation rates on AI search platforms.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const LLMS = join(ROOT, 'public', 'llms.txt');
const LLMS_FULL = join(ROOT, 'public', 'llms-full.txt');
const BASE = 'https://www.elec-mate.com';

if (!existsSync(REPORT)) {
  console.error('No audit report. Run scripts/seo-audit/run.mjs first.');
  process.exit(1);
}

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));

// Live audit data → group pages by category. Use page_type as primary key.
const indexable = scored.filter(
  (p) =>
    p.slug &&
    p.suggestedAction !== 'kill_301' &&
    p.cannibalisationRole !== 'redirect_source',
);

const groups = {
  calculator: [],
  tool: [],
  guide: [],
  comparison: [],
  training: [],
  cert: [],
  hub: [],
  other: [],
};
for (const p of indexable) {
  const g = groups[p.pageType] || groups.other;
  g.push(p);
}

// Helper — derive a human label from slug
function slugLabel(slug) {
  return slug
    .replace(/^\/(tools|guides|compare|training|certificates)\//, '')
    .replace(/^\//, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function listLines(pages, max = null) {
  const sorted = pages
    .slice()
    .sort((a, b) => (b.phaseAScore || 0) - (a.phaseAScore || 0));
  const slice = max ? sorted.slice(0, max) : sorted;
  return slice.map(
    (p) => `- [${slugLabel(p.slug)}](${BASE}${p.slug})${p.title ? ' — ' + (p.title.split('|')[0]?.trim() || '') : ''}`,
  );
}

const HEADER = `# Elec-Mate

> The complete digital platform for UK electricians, apprentices, employers and college tutors. BS 7671:2018+A4:2026 compliant. 70+ calculators, 16 certificate types, 8 AI specialist agents, 46+ training courses, full business management — all in one mobile-first app.

## What is Elec-Mate?

Elec-Mate is a UK-built mobile-first web application for electrical professionals. Every tool, certificate and calculation is aligned to BS 7671:2018 Amendment 4 (2026), IET Guidance Note 3 (Inspection & Testing), and the IET On-Site Guide — the current canonical UK electrical standards.

## Compliance and standards

All tools, certificates, training content and calculators on Elec-Mate are aligned to:

- **BS 7671:2018+A4:2026** (IET Wiring Regulations, Amendment 4, January 2026)
- **IET Guidance Note 3** — Inspection & Testing (9th Edition, A4-aligned)
- **IET On-Site Guide** (9th Edition, A4-aligned)
- **Part P** (Building Regulations, England & Wales)
- **Electricity at Work Regulations 1989**
- **Electrical Safety Standards in the Private Rented Sector (England) Regulations 2020**

## Audience

- Qualified UK electricians (domestic, commercial, industrial)
- Electrical apprentices (City & Guilds 2365 Level 2 / Level 3, EAL, T Levels, 5357, 8202, AM2, AM2E)
- Electrical contractors and employers
- College tutors managing electrical students
- Self-employed electricians running a business

## Key product surfaces (most-searched topics)

`;

const TIER1_FOOTER = `

## Pricing

- 7-day free trial (no charge during trial)
- From GBP 4.99/month
- All features included

## Platform availability

- iOS (App Store: https://apps.apple.com/gb/app/elec-mate/id6758948665)
- Android (Google Play coming soon — pre-launch as of May 2026)
- Web (responsive, mobile-first)
- Offline-capable PWA — every tool works without internet
`;

// ---------------------------------------------------------------------------
// Build llms.txt (tier 1 — succinct, top ~150 most-valuable pages only)
// ---------------------------------------------------------------------------
const tier1 = [];
tier1.push(HEADER.trimEnd());
tier1.push('');
tier1.push('### Electrical calculators (free to use, no signup)');
tier1.push('');
tier1.push(...listLines(groups.calculator, 30));
tier1.push('');
tier1.push('### BS 7671 guides and explainers');
tier1.push('');
tier1.push(...listLines(groups.guide.filter((p) => /bs.?7671|regulation|section/i.test(p.slug || '')), 25));
tier1.push('');
tier1.push('### Inspection, testing and certificates');
tier1.push('');
tier1.push(...listLines(groups.cert, 15));
tier1.push(
  ...listLines(
    groups.guide.filter((p) => /eicr|eic|minor-works|certificate|inspection|testing/i.test(p.slug || '')),
    20,
  ),
);
tier1.push('');
tier1.push('### Apprentice & training');
tier1.push('');
tier1.push(...listLines(groups.training, 20));
tier1.push(...listLines(groups.guide.filter((p) => /apprentice|am2|level[-_]?[23]|city.?guilds|epa/i.test(p.slug || '')), 20));
tier1.push('');
tier1.push('### Comparison and "best of" content');
tier1.push('');
tier1.push(...listLines(groups.comparison, 15));
tier1.push('');
tier1.push(TIER1_FOOTER.trimEnd());

writeFileSync(LLMS, tier1.join('\n') + '\n', 'utf-8');
console.log(`[llms.txt]      wrote ${LLMS} (${tier1.length} lines)`);

// ---------------------------------------------------------------------------
// Build llms-full.txt (tier 2 — exhaustive page list)
// ---------------------------------------------------------------------------
const tier2 = [];
tier2.push(HEADER.trimEnd());
tier2.push('');
tier2.push('## Complete page index');
tier2.push('');
tier2.push(`Every indexable SEO page on elec-mate.com, grouped by page type. ${indexable.length} pages.`);
tier2.push('');

const groupOrder = [
  ['calculator', 'Calculators'],
  ['tool',       'Interactive tools'],
  ['guide',      'Guides and explainers'],
  ['cert',       'Certificate templates'],
  ['training',   'Training and CPD'],
  ['comparison', 'Comparisons'],
  ['hub',        'Hub pages'],
  ['other',      'Other'],
];

for (const [key, label] of groupOrder) {
  const pages = groups[key];
  if (pages.length === 0) continue;
  tier2.push(`### ${label} (${pages.length})`);
  tier2.push('');
  tier2.push(...listLines(pages));
  tier2.push('');
}

tier2.push(TIER1_FOOTER.trimEnd());

writeFileSync(LLMS_FULL, tier2.join('\n') + '\n', 'utf-8');
console.log(`[llms-full.txt] wrote ${LLMS_FULL} (${tier2.length} lines)`);

console.log(`\nIndexed pages: ${indexable.length}`);
for (const [key, label] of groupOrder) {
  console.log(`  ${label.padEnd(28)} ${groups[key].length}`);
}
