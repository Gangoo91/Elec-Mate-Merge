#!/usr/bin/env node
/**
 * check-topic-registry — proves the two consumers of mockExamTopics.json
 * still agree on which /mock-exams/:exam/:topic pages exist.
 *
 * WHY THIS EXISTS
 * The topic landings are produced twice: once at runtime by
 * `src/components/seo/mockExamTopicRegistry.ts` (which imports the banks and
 * counts real question objects) and once at build time by
 * `scripts/generate-seo-html.mjs` (which regex-scans the bank source, because
 * a build script cannot import TypeScript).
 *
 * They used to be two hand-kept lists. They drifted: `pat-testing` existed
 * only on the runtime side, so its five topic pages resolved in the browser
 * but were never prerendered and never indexable — the exact failure the old
 * "update both files together" comment was supposed to prevent. Sharing one
 * JSON removed the metadata drift; this check covers the rest, because the
 * two COUNTING strategies can still diverge (a bank that renames its export,
 * declares questions above it, or switches from `category` to `section`).
 *
 * A mismatch is a real bug in both directions:
 *   • runtime-only  -> page works for humans, invisible to Google
 *   • build-only    -> Google indexes a URL that redirects the visitor away
 *
 * Usage: npm run check:topic-registry   (exit 1 on drift)
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { tmpdir } from 'os';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const JSON_PATH = join(ROOT, 'src/data/seo/mockExamTopics.json');

/** Mirror of categoryToSlug() in mockExamTopicRegistry.ts. */
const categoryToSlug = (c) =>
  c
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Build-time view: regex-scan each bank exactly as generate-seo-html.mjs does. */
function routesFromBuildScript() {
  const registry = JSON.parse(readFileSync(JSON_PATH, 'utf-8'));
  const out = [];
  for (const entry of registry) {
    const bankPath = join(ROOT, entry.bankFile);
    if (!existsSync(bankPath)) {
      throw new Error(`${entry.examSlug}: bankFile does not exist — ${entry.bankFile}`);
    }
    let src = readFileSync(bankPath, 'utf-8');
    const start = src.search(new RegExp(`export const ${entry.bankExport}\\b`));
    if (start < 0) {
      throw new Error(
        `${entry.examSlug}: bankExport "${entry.bankExport}" not found in ${entry.bankFile}`
      );
    }
    src = src.slice(start);

    const counts = new Map();
    if (entry.sectionNames) {
      for (const m of src.matchAll(/section\s*:\s*['"`]([^'"`]+)['"`]/g)) {
        const name = entry.sectionNames[m[1].trim()];
        if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
      }
    } else {
      for (const m of src.matchAll(/category\s*:\s*['"`]([^'"`]+)['"`]/g)) {
        counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
      }
    }
    for (const [category, qCount] of counts) {
      if (qCount < 5) continue; // matches the resolveTopicPage() guard
      out.push(`${entry.examSlug}/${categoryToSlug(category)}|${qCount}`);
    }
  }
  return out.sort();
}

/** Runtime view: bundle the real registry and ask it directly. */
function routesFromRegistry() {
  const dir = mkdtempSync(join(tmpdir(), 'topicreg-'));
  try {
    const entry = join(dir, 'probe.ts');
    const bundle = join(dir, 'probe.cjs');
    writeFileSync(
      entry,
      `import { getAllTopicRoutes } from '@/components/seo/mockExamTopicRegistry';\n` +
        `console.log(JSON.stringify(getAllTopicRoutes().map(r => r.examSlug + '/' + r.topicSlug + '|' + r.qCount).sort()));\n`
    );
    execFileSync(
      'npx',
      [
        'esbuild',
        entry,
        '--bundle',
        '--platform=node',
        '--format=cjs',
        `--alias:@=${join(ROOT, 'src')}`,
        `--outfile=${bundle}`,
        '--log-level=error',
      ],
      { cwd: ROOT, stdio: ['ignore', 'ignore', 'inherit'] }
    );
    return JSON.parse(execFileSync('node', [bundle], { encoding: 'utf-8' }));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const build = routesFromBuildScript();
const runtime = routesFromRegistry();

const inBuild = new Set(build);
const inRuntime = new Set(runtime);
const buildOnly = build.filter((r) => !inRuntime.has(r));
const runtimeOnly = runtime.filter((r) => !inBuild.has(r));

/**
 * The sitemap is a committed file, not a build artefact, so it can fall behind
 * the registry silently — which is exactly what happened before (72 topic URLs
 * listed while the registry served more). Checked here rather than regenerated
 * during the build, because writing into public/ mid-build leaves CI with a
 * dirty tree.
 */
function sitemapDrift() {
  const path = join(ROOT, 'public/sitemap-mock-exams.xml');
  if (!existsSync(path)) return ['sitemap-mock-exams.xml is missing'];
  const xml = readFileSync(path, 'utf-8');
  const listed = new Set(
    [...xml.matchAll(/<loc>[^<]*\/mock-exams\/([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((p) => p.includes('/'))
  );
  const expected = new Set(runtime.map((r) => r.split('|')[0]));
  const missing = [...expected].filter((t) => !listed.has(t));
  const stale = [...listed].filter((t) => !expected.has(t));
  const out = [];
  if (missing.length) out.push(`${missing.length} topic landings are NOT in the sitemap`);
  if (stale.length) out.push(`${stale.length} sitemap URLs no longer resolve`);
  return out;
}

const sitemap = sitemapDrift();

if (buildOnly.length === 0 && runtimeOnly.length === 0 && sitemap.length === 0) {
  console.log(`✅ topic registry consistent — ${build.length} topic landings, sitemap in step`);
  process.exit(0);
}

if (sitemap.length && buildOnly.length === 0 && runtimeOnly.length === 0) {
  console.error('❌ sitemap out of date');
  for (const line of sitemap) console.error(`   ${line}`);
  console.error('\nRun: npm run build:sitemap:mock-exams');
  process.exit(1);
}

console.error('❌ topic registry DRIFT\n');
if (runtimeOnly.length) {
  console.error(`  ${runtimeOnly.length} resolve in the browser but are NOT prerendered`);
  console.error('  (they work for humans and are invisible to Google):');
  for (const r of runtimeOnly) console.error(`     /mock-exams/${r.replace('|', '  — ')} questions`);
}
if (buildOnly.length) {
  console.error(`\n  ${buildOnly.length} are prerendered but do NOT resolve at runtime`);
  console.error('  (Google indexes them, the visitor gets redirected away):');
  for (const r of buildOnly) console.error(`     /mock-exams/${r.replace('|', '  — ')} questions`);
}
console.error('\nFix src/data/seo/mockExamTopics.json, or the bank it points at.');
process.exit(1);
