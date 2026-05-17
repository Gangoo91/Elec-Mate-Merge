#!/usr/bin/env node

/**
 * SEO audit Phase A — file-system scan + scoring without DB.
 *
 * Usage:
 *   node scripts/seo-audit/run.mjs                          # all routed pages
 *   node scripts/seo-audit/run.mjs --limit 50                # canary
 *   node scripts/seo-audit/run.mjs --out reports/audit.json  # custom path
 *   node scripts/seo-audit/run.mjs --include-orphans         # also score unrouted files
 *
 * Output:
 *   - JSON manifest with every scored page + cluster decisions
 *   - Top-10 worst pages summary at stdout
 *   - Cannibalisation cluster summary at stdout
 *   - Orphan file list at stdout
 *
 * Does NOT write to Supabase yet — that's Phase B (next step).
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractPage, listSeoFiles, loadRouteMap } from './extract.mjs';
import { detectClusters, chooseCanonical } from './clusters.mjs';
import { scorePage, RUBRIC_VERSION } from './score.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

const args = process.argv.slice(2);
const argv = (flag) => {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
};
const LIMIT = argv('--limit') ? Number(argv('--limit')) : null;
const OUT = argv('--out') || join(ROOT, 'reports', 'seo-audit.json');
const INCLUDE_ORPHANS = args.includes('--include-orphans');
const VERBOSE = args.includes('--verbose');

(async () => {
  const startedAt = new Date();
  console.log(`[audit] starting Phase A — rubric ${RUBRIC_VERSION}`);
  console.log(`[audit] root: ${ROOT}`);

  // 1. File discovery + route map
  const seoFiles = listSeoFiles(join(ROOT, 'src/pages/seo'));
  const { slugToFile, fileToSlug } = loadRouteMap(join(ROOT, 'src/routes/SEORoutes.tsx'));

  console.log(`[audit] discovered ${seoFiles.length} .tsx files, ${slugToFile.size} routed`);

  // 2. Per-file extract
  const targets = INCLUDE_ORPHANS
    ? seoFiles
    : seoFiles.filter((f) => fileToSlug.has(f.replace(ROOT + '/', '')) || fileToSlug.has(relativeFromRoot(f, ROOT)));

  const limited = LIMIT ? targets.slice(0, LIMIT) : targets;
  console.log(`[audit] extracting ${limited.length} files...`);

  const extracts = [];
  for (let i = 0; i < limited.length; i++) {
    const f = limited[i];
    try {
      const ex = extractPage(f);
      extracts.push(ex);
      if (VERBOSE && i % 50 === 0) console.log(`  [${i + 1}/${limited.length}] ${ex.fileName}`);
    } catch (err) {
      console.error(`  FAIL extract ${f}: ${err?.message || err}`);
    }
  }

  // Build a slugByFile map keyed on the relative paths used in extract.sourceFile
  const slugByFile = new Map();
  for (const [slug, file] of slugToFile.entries()) {
    slugByFile.set(file, slug);
    slugByFile.set(join(ROOT, file), slug);
  }

  // 3. Cluster detection
  const clusters = detectClusters(extracts, slugByFile);
  console.log(`[audit] cannibalisation clusters detected: ${clusters.length}`);

  // 4. Choose canonical per cluster + flag losers
  const fileBySlug = new Map();
  for (const [slug, file] of slugToFile.entries()) fileBySlug.set(slug, file);

  const clusterDecisions = [];
  const cannibalisationRoleBySlug = new Map();
  for (const cluster of clusters) {
    const decision = chooseCanonical(cluster, slugByFile, fileBySlug);
    clusterDecisions.push({ ...cluster, ...decision });
    for (const slug of cluster.members) {
      cannibalisationRoleBySlug.set(slug, slug === decision.canonical ? 'keep' : 'redirect_source');
    }
  }

  // 5. Score every page — slug-based page_type override beats filename guess
  const scored = extracts.map((ex) => {
    const slug = slugByFile.get(ex.sourceFile) || slugByFile.get(join(ROOT, ex.sourceFile));
    const role = slug ? cannibalisationRoleBySlug.get(slug) : null;
    // Slug-based authoritative page-type override
    if (slug) {
      if (slug.startsWith('/guides/')) ex.pageType = 'guide';
      else if (slug.startsWith('/training/')) ex.pageType = 'training';
      else if (slug.startsWith('/compare/')) ex.pageType = 'comparison';
      else if (slug.startsWith('/certificates/')) ex.pageType = 'cert';
    }
    const { phaseAScore, status, criteria, suggestedAction } = scorePage({
      extract: ex,
      cannibalisationRole: role,
      slug,
    });
    return {
      slug: slug || null,
      sourceFile: ex.sourceFile.replace(ROOT + '/', ''),
      title: ex.title,
      description: ex.description,
      pageType: ex.pageType,
      audience: ex.audience,
      templateUsed: ex.templateUsed,
      hasTool: ex.toolComponentRendered,
      toolGated: ex.toolInsideAuthGate,
      internalLinks: ex.internalLinks.length,
      bs7671CitesCount: ex.bs7671Cites.length,
      bs7671CitesSample: ex.bs7671Cites.slice(0, 5),
      wordCount: ex.wordCount,
      cannibalisationRole: role || null,
      phaseAScore,
      status,
      criteria,
      suggestedAction,
    };
  });

  // 6. Summaries
  const summary = {
    rubricVersion: RUBRIC_VERSION,
    generatedAt: new Date().toISOString(),
    durationMs: Date.now() - startedAt.getTime(),
    totals: {
      sourceFiles: seoFiles.length,
      routed: slugToFile.size,
      orphans: seoFiles.length - slugToFile.size,
      scored: scored.length,
      green: scored.filter((p) => p.status === 'green').length,
      amber: scored.filter((p) => p.status === 'amber').length,
      red: scored.filter((p) => p.status === 'red').length,
    },
    actions: scored.reduce((acc, p) => {
      acc[p.suggestedAction] = (acc[p.suggestedAction] || 0) + 1;
      return acc;
    }, {}),
    cannibalisationClusters: clusterDecisions.length,
    clustersSample: clusterDecisions.slice(0, 10),
    worst10: scored
      .slice()
      .sort((a, b) => a.phaseAScore - b.phaseAScore || (a.wordCount - b.wordCount))
      .slice(0, 10)
      .map((p) => ({
        slug: p.slug,
        sourceFile: p.sourceFile,
        score: p.phaseAScore,
        action: p.suggestedAction,
        wordCount: p.wordCount,
        internalLinks: p.internalLinks,
        hasTool: p.hasTool,
        cannibalisationRole: p.cannibalisationRole,
      })),
  };

  // 7. Write output
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify({ summary, scored, clusterDecisions }, null, 2), 'utf-8');

  // 8. Console report
  console.log('\n=== SEO Audit Phase A Summary ===');
  console.log(`Source files:        ${summary.totals.sourceFiles}`);
  console.log(`Routed:              ${summary.totals.routed}`);
  console.log(`Orphans:             ${summary.totals.orphans}`);
  console.log(`Scored:              ${summary.totals.scored}`);
  console.log(`Green (>=70):        ${summary.totals.green}`);
  console.log(`Amber (40-69):       ${summary.totals.amber}`);
  console.log(`Red (<40):           ${summary.totals.red}`);
  console.log(`Cannibalisation:     ${summary.cannibalisationClusters} clusters`);
  console.log('\nAction breakdown:');
  for (const [action, count] of Object.entries(summary.actions)) {
    console.log(`  ${action.padEnd(20)} ${count}`);
  }
  console.log('\nTop 10 worst pages (lowest Phase A score):');
  for (const w of summary.worst10) {
    console.log(
      `  [${String(w.score).padStart(3)}] ${w.action.padEnd(12)} ${w.slug || '(orphan: ' + w.sourceFile + ')'}`,
    );
  }
  if (clusterDecisions.length > 0) {
    console.log('\nFirst 10 cannibalisation clusters:');
    for (const c of clusterDecisions.slice(0, 10)) {
      console.log(`  ${c.clusterTopic}  →  canonical: ${c.canonical}`);
      for (const slug of c.members) {
        if (slug !== c.canonical) console.log(`     redirect: ${slug}`);
      }
    }
  }
  console.log(`\nFull report → ${OUT}`);
})().catch((err) => {
  console.error('[audit] fatal:', err);
  process.exit(2);
});

function relativeFromRoot(absPath, root) {
  return absPath.startsWith(root + '/') ? absPath.slice(root.length + 1) : absPath;
}
