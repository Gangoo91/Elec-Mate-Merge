#!/usr/bin/env node

/**
 * Convert reports/seo-audit.json into batched SQL INSERTs for
 * seo_page_audit / seo_audit_run / seo_cannibalisation_cluster.
 *
 * Writes batches to reports/seo-audit-sql/{01-run.sql, 02-clusters.sql,
 * 03-pages-001.sql, 03-pages-002.sql, ...}.
 *
 * Each pages batch is 100 rows. The run.sql and clusters.sql contain UUID
 * literals that the pages SQL references — execute in numeric file-name order.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const REPORT = join(ROOT, 'reports', 'seo-audit.json');
const OUT_DIR = join(ROOT, 'reports', 'seo-audit-sql');

if (!existsSync(REPORT)) {
  console.error(`No audit report at ${REPORT}.`);
  process.exit(1);
}

const report = JSON.parse(readFileSync(REPORT, 'utf-8'));
const { summary, scored, clusterDecisions } = report;

if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

// Stable run UUID across regenerations — derive from generatedAt + rubric.
// Lets us re-emit without changing FK relationships in already-loaded DB rows.
const STABLE_RUN_UUID = process.env.SEO_AUDIT_RUN_ID || 'd505281a-87f1-45a9-b0b0-9b2a15301924';
const runId = STABLE_RUN_UUID;

// ---------------------------------------------------------------------------
// PostgreSQL value helpers
// ---------------------------------------------------------------------------
function pgString(value) {
  if (value === null || value === undefined) return 'NULL';
  return `'${String(value).replace(/'/g, "''")}'`;
}
function pgText(value) {
  return pgString(value);
}
function pgInt(value) {
  if (value === null || value === undefined) return 'NULL';
  return String(value);
}
function pgNumeric(value) {
  if (value === null || value === undefined) return 'NULL';
  return String(value);
}
function pgBool(value) {
  return value ? 'true' : 'false';
}
function pgUuid(value) {
  return value ? `'${value}'::uuid` : 'NULL';
}
function pgTextArray(arr) {
  if (!arr || arr.length === 0) return `'{}'::text[]`;
  const items = arr.map((s) => `"${String(s).replace(/"/g, '\\"')}"`).join(',');
  return `'{${items}}'::text[]`;
}
function pgJsonb(obj) {
  if (obj === null || obj === undefined) return `'{}'::jsonb`;
  return `'${JSON.stringify(obj).replace(/'/g, "''")}'::jsonb`;
}

// ---------------------------------------------------------------------------
// 1. seo_audit_run
// ---------------------------------------------------------------------------
const runSql = `-- SEO audit run row
INSERT INTO seo_audit_run (id, started_at, completed_at, pages_total, pages_scored, pages_green, pages_amber, pages_red, rubric_version, notes)
VALUES (
  '${runId}',
  ${pgString(summary.generatedAt)}::timestamptz,
  ${pgString(summary.generatedAt)}::timestamptz,
  ${pgInt(summary.totals.scored)},
  ${pgInt(summary.totals.scored)},
  ${pgInt(summary.totals.green)},
  ${pgInt(summary.totals.amber)},
  ${pgInt(summary.totals.red)},
  ${pgString(summary.rubricVersion)},
  'Phase A only — DB grounding pending'
);
`;
writeFileSync(join(OUT_DIR, '01-run.sql'), runSql, 'utf-8');

// ---------------------------------------------------------------------------
// 2. seo_cannibalisation_cluster — assign UUIDs + map slug → cluster_id
// ---------------------------------------------------------------------------
const clusterIdBySlug = new Map();
const clusterRows = [];
for (const c of clusterDecisions) {
  const clusterId = randomUUID();
  for (const member of c.members) clusterIdBySlug.set(member, clusterId);
  clusterRows.push({
    id: clusterId,
    cluster_topic: c.clusterTopic,
    intent_class: c.intentClass,
    canonical_slug: c.canonical,
    member_slugs: c.members,
    decided_reason: (c.reasons || []).join(', ') || 'auto-canonicalised',
  });
}

const clustersSql =
  `-- Cannibalisation clusters\n` +
  clusterRows
    .map(
      (r) =>
        `INSERT INTO seo_cannibalisation_cluster (id, cluster_topic, intent_class, canonical_slug, member_slugs, decided_reason) VALUES (` +
        [
          pgUuid(r.id),
          pgString(r.cluster_topic),
          pgString(r.intent_class),
          pgString(r.canonical_slug),
          pgTextArray(r.member_slugs),
          pgString(r.decided_reason),
        ].join(', ') +
        ');',
    )
    .join('\n');
writeFileSync(join(OUT_DIR, '02-clusters.sql'), clustersSql, 'utf-8');

// ---------------------------------------------------------------------------
// 3. seo_page_audit — batch in chunks of 100
// ---------------------------------------------------------------------------
function buildPageRow(p) {
  const slug = p.slug || `/__orphan__/${p.sourceFile.split('/').pop().replace('.tsx', '')}`;
  const role = p.cannibalisationRole;
  const clusterId = clusterIdBySlug.get(p.slug) || null;
  const redirectTarget = role === 'redirect_source' && clusterId
    ? clusterDecisions.find((c) => c.members.includes(p.slug))?.canonical || null
    : null;

  // Slim row — only non-default columns. The rest use schema defaults.
  return [
    pgString(slug),
    pgString(p.sourceFile),
    pgString(p.pageType),
    pgInt(p.phaseAScore),
    pgString(p.status),
    pgUuid(clusterId),
    role ? pgString(role) : 'NULL',
    redirectTarget ? pgString(redirectTarget) : 'NULL',
    pgBool(p.hasTool),
    pgInt(p.internalLinks || 0),
    pgInt(p.wordCount || 0),
    pgString(p.suggestedAction),
    redirectTarget ? pgString(redirectTarget) : 'NULL',
    pgUuid(runId),
    pgString(summary.rubricVersion),
  ].join(',');
}

const PAGE_COLUMNS = [
  'slug', 'source_file', 'page_type',
  'score', 'status',
  'cannibalisation_cluster_id', 'cannibalisation_role', 'redirect_target',
  'tool_component_present',
  'internal_links_count', 'word_count',
  'suggested_action', 'suggested_redirect_to',
  'audit_run_id', 'rubric_version',
].join(',');

const BATCH_SIZE = 100;
let batchNum = 0;
for (let i = 0; i < scored.length; i += BATCH_SIZE) {
  batchNum++;
  const slice = scored.slice(i, i + BATCH_SIZE);
  const values = slice.map((p) => '(' + buildPageRow(p) + ')').join(',\n');
  const sql = `-- seo_page_audit batch ${batchNum}\nINSERT INTO seo_page_audit (${PAGE_COLUMNS}) VALUES\n${values}\nON CONFLICT (slug) DO UPDATE SET
  score = EXCLUDED.score,
  status = EXCLUDED.status,
  cannibalisation_cluster_id = EXCLUDED.cannibalisation_cluster_id,
  cannibalisation_role = EXCLUDED.cannibalisation_role,
  redirect_target = EXCLUDED.redirect_target,
  tool_component_present = EXCLUDED.tool_component_present,
  internal_links_count = EXCLUDED.internal_links_count,
  word_count = EXCLUDED.word_count,
  suggested_action = EXCLUDED.suggested_action,
  suggested_redirect_to = EXCLUDED.suggested_redirect_to,
  audit_run_id = EXCLUDED.audit_run_id,
  rubric_version = EXCLUDED.rubric_version,
  last_audited_at = now(),
  updated_at = now();
`;
  writeFileSync(join(OUT_DIR, `03-pages-${String(batchNum).padStart(3, '0')}.sql`), sql, 'utf-8');
}

console.log(`Wrote SQL to ${OUT_DIR}`);
console.log(`  01-run.sql           — 1 run row (id=${runId})`);
console.log(`  02-clusters.sql      — ${clusterRows.length} cluster rows`);
console.log(`  03-pages-*.sql       — ${batchNum} batches × ${BATCH_SIZE} rows`);
console.log(`Total page rows: ${scored.length}`);
