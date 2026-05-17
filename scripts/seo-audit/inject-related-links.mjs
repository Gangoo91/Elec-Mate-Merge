#!/usr/bin/env node

/**
 * Topic-aware internal link injector.
 *
 * Targets red pages with < 6 internal links (audit criterion #7 failing)
 * and injects a "Related" section pointing at the most relevant sibling
 * SEO pages. Internal linking is one of the strongest signals Google uses
 * to evaluate "Discovered, currently not indexed" pages.
 *
 * Topic matching: token-Jaccard between the slug tokens of the source page
 * and every other page. Top-N highest-similarity peers become the related
 * links. Excludes sibling pages that are also red (would link to weakness)
 * unless no green/amber peer exists.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const DRY_RUN = process.argv.includes('--dry-run');
const TARGET_LINKS = 8;
const MIN_PEERS = 6;

const { scored } = JSON.parse(readFileSync(REPORT, 'utf-8'));

// Only target pages that:
//   - are red
//   - have a slug (routed)
//   - have fewer than MIN_PEERS internal links
//   - are NOT scheduled for kill_301
const candidates = scored.filter(
  (p) =>
    p.status === 'red' &&
    p.slug &&
    p.internalLinks < MIN_PEERS &&
    p.suggestedAction !== 'kill_301',
);

console.log(`[link-inject] ${candidates.length} red pages need related links`);

// Build a corpus of "peer" pages (anything green/amber that's routed)
const peers = scored.filter((p) => p.slug && p.status !== 'red');

function tokenise(slug) {
  return new Set(
    slug
      .toLowerCase()
      .replace(/^\/(tools|guides|compare|training|certificates)\//, '')
      .replace(/^\//, '')
      .replace(/[^a-z0-9]+/g, '-')
      .split('-')
      .filter(
        (t) =>
          t &&
          t.length > 2 &&
          !['the', 'and', 'for', 'with', 'guide', 'tool', 'page', 'app'].includes(t),
      ),
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function topPeersFor(sourceSlug, count) {
  const sourceTokens = tokenise(sourceSlug);
  if (sourceTokens.size === 0) return [];
  return peers
    .filter((p) => p.slug !== sourceSlug)
    .map((p) => ({ ...p, _score: jaccard(sourceTokens, tokenise(p.slug)) }))
    .filter((p) => p._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, count);
}

// ---------------------------------------------------------------------------
// JSX block builder
// ---------------------------------------------------------------------------
function buildRelatedSection(matches) {
  const items = matches
    .map((m) => {
      const label = (m.title || m.slug || '').replace(/\s*\|.*$/, '').trim() || m.slug;
      return `            <SEOInternalLink href="${m.slug}">${label}</SEOInternalLink>`;
    })
    .join('\n');

  return `

      {/* Related pages — auto-injected for internal-link health (audit criterion #7).
          Topic-matched via token-Jaccard against the broader SEO corpus. */}
      <section className="px-5 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Related electrical pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
${items}
          </div>
        </div>
      </section>`;
}

// ---------------------------------------------------------------------------
// Patch each candidate
// ---------------------------------------------------------------------------
const stats = { patched: [], noPeer: [], unchanged: [], skipped: [] };

for (const p of candidates) {
  const filePath = join(ROOT, p.sourceFile);
  if (!existsSync(filePath)) {
    stats.skipped.push({ slug: p.slug, reason: 'file not found' });
    continue;
  }
  const original = readFileSync(filePath, 'utf-8');

  // Skip thin GeneratedGuidePage wrappers — they render via config, not JSX
  if (/GeneratedGuidePage/.test(original) || original.length < 1500) {
    stats.skipped.push({ slug: p.slug, reason: 'thin wrapper / generated page' });
    continue;
  }

  // Skip template pages — their relatedPages prop is the right surface, not JSX injection
  if (/<(GuideTemplate|ToolTemplate|ComparisonTemplate|CourseTemplate|BusinessTemplate)\b/.test(original)) {
    stats.skipped.push({ slug: p.slug, reason: 'uses template (relatedPages prop)' });
    continue;
  }

  // Already has SEOInternalLink import? Good. If not, add.
  let patched = original;
  if (!/SEOInternalLink/.test(patched)) {
    const importLine = `import { SEOInternalLink } from '@/components/seo/SEOInternalLink';\n`;
    const importBlock = patched.match(/(^import[\s\S]*?from\s+['"][^'"]+['"];\s*\n)+/);
    if (importBlock) {
      const insertAt = importBlock.index + importBlock[0].length;
      patched = patched.slice(0, insertAt) + importLine + patched.slice(insertAt);
    }
  }

  const matches = topPeersFor(p.slug, TARGET_LINKS);
  if (matches.length < 3) {
    stats.noPeer.push({ slug: p.slug, found: matches.length });
    continue;
  }

  const section = buildRelatedSection(matches);

  // Insert before the final <SEOCTASection or before </PublicPageLayout>
  let insertedAt = null;
  const ctaMatch = patched.match(/<SEOCTASection\b/);
  if (ctaMatch) {
    patched = patched.slice(0, ctaMatch.index) + section + '\n\n      ' + patched.slice(ctaMatch.index);
    insertedAt = 'before SEOCTASection';
  } else {
    const layoutClose = patched.match(/<\/PublicPageLayout>/);
    if (layoutClose) {
      patched = patched.slice(0, layoutClose.index) + section + '\n    ' + patched.slice(layoutClose.index);
      insertedAt = 'before </PublicPageLayout>';
    }
  }

  if (!insertedAt) {
    stats.skipped.push({ slug: p.slug, reason: 'no insertion anchor' });
    continue;
  }

  if (patched === original) {
    stats.unchanged.push(p.slug);
    continue;
  }

  if (!DRY_RUN) writeFileSync(filePath, patched, 'utf-8');
  stats.patched.push({ slug: p.slug, peerCount: matches.length });
}

console.log(`\n=== Related-links injection ${DRY_RUN ? '(DRY RUN)' : ''} ===`);
console.log(`Patched:           ${stats.patched.length}`);
console.log(`Skipped:           ${stats.skipped.length}`);
console.log(`Too-few peers:     ${stats.noPeer.length}`);

if (stats.patched.length > 0 && stats.patched.length <= 50) {
  console.log(`\nPatched:`);
  stats.patched.forEach((p) => console.log(`  ${p.slug}  (+${p.peerCount} links)`));
}
if (stats.skipped.length > 0 && stats.skipped.length <= 30) {
  console.log(`\nSkipped:`);
  stats.skipped.forEach((s) => console.log(`  ${s.slug}  — ${s.reason}`));
}
