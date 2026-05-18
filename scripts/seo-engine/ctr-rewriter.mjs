#!/usr/bin/env node
/**
 * ctr-rewriter.mjs — AI title/meta rewriter driven by real GSC query data.
 *
 * Pipeline:
 *  1. Read GSC export (scripts/seo-engine/gsc-pages-90d.json) — per-URL pos/imp/clicks
 *  2. For each URL in position 4-20 with >= MIN_IMP impressions:
 *     - Pull top 3 queries for that URL (from gsc-queries-90d.json)
 *     - Read source .tsx page → extract current title + description
 *     - Call Vercel AI Gateway → 3 title/desc variants matching query intent
 *  3. Output reports/ctr-rewrites.json with diff per URL
 *
 * Apply phase (separate command --apply):
 *  - Read reports/ctr-rewrites.json
 *  - For each entry where humanApproved !== false, apply the first variant
 *  - Update source .tsx file
 *  - Output reports/ctr-rewrites-applied.json
 *
 * Run order:
 *  node scripts/seo-engine/gsc-export.mjs          # pulls fresh GSC data
 *  node scripts/seo-engine/ctr-rewriter.mjs        # generates diff
 *  # human review reports/ctr-rewrites.json
 *  node scripts/seo-engine/ctr-rewriter.mjs --apply
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const PAGES_FILE = join(ROOT, 'scripts/seo-engine/gsc-pages-90d.json');
const QUERIES_FILE = join(ROOT, 'scripts/seo-engine/gsc-queries-per-url-90d.json');
const SEO_PAGES_DIR = join(ROOT, 'src/pages/seo');
const SEO_ROUTES_FILE = join(ROOT, 'src/routes/SEORoutes.tsx');
const OUTPUT_FILE = join(ROOT, 'reports/ctr-rewrites.json');
const APPLIED_FILE = join(ROOT, 'reports/ctr-rewrites-applied.json');

const MIN_IMP = parseInt(process.env.MIN_IMP || '200', 10);
const MIN_POS = parseFloat(process.env.MIN_POS || '4');
const MAX_POS = parseFloat(process.env.MAX_POS || '20');
const TOP_N = parseInt(process.env.TOP_N || '50', 10);
const AI_GATEWAY_KEY = process.env.AI_GATEWAY_API_KEY || '';
const AI_MODEL = process.env.AI_MODEL || 'anthropic/claude-haiku-4.5';

const APPLY = process.argv.includes('--apply');

// -- helpers ---------------------------------------------------------------

function slugToComponentName(routesSource, slug) {
  // Find the Route entry with that path
  const routeRe = new RegExp(`path="${slug.replace(/[/.\-]/g, '\\$&')}"[\\s\\S]*?<(\\w+)\\s*/>`);
  const m = routesSource.match(routeRe);
  if (!m) return null;
  return m[1];
}

function componentToFile(routesSource, componentName) {
  // Match lazy import line
  const re = new RegExp(`const\\s+${componentName}\\s*=\\s*lazy\\(\\s*\\(\\)\\s*=>\\s*import\\(\\s*['"]@/pages/seo/(\\w+)['"]`);
  const m = routesSource.match(re);
  if (!m) return null;
  const file = join(SEO_PAGES_DIR, m[1] + '.tsx');
  return existsSync(file) ? file : null;
}

function extractTitleAndDesc(src) {
  // Templates use <GuideTemplate ... title="..." description="..." />, so the
  // SEO title prop appears as `title="..."` followed within ~400 chars by
  // `description="..."`. Match the pair that are close together.
  const pairRe = /\btitle=(["'`])([^"'`]+)\1[\s\S]{0,400}?\bdescription=(["'`])([^"'`]+)\3/;
  const m = src.match(pairRe);
  if (m) return { title: m[2], description: m[4] };
  // Fallback: any title= alone
  const titleM = src.match(/\btitle=["'`]([^"'`]+)["'`]/);
  return { title: titleM ? titleM[1] : null, description: null };
}

async function callGateway(systemPrompt, userPrompt) {
  if (!AI_GATEWAY_KEY) throw new Error('AI_GATEWAY_API_KEY env var required');
  const res = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AI_GATEWAY_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: AI_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 600,
      temperature: 0.4,
    }),
  });
  if (!res.ok) throw new Error(`Gateway ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.choices[0].message.content;
}

const SYSTEM_PROMPT = `You are a senior UK technical SEO rewriting titles and meta descriptions for a UK electrical platform (Elec-Mate).

Rules:
- Title: max 60 chars (hard cap), front-load the user's actual search query
- Description: max 155 chars, lead with the user's pain point, include a number/year/value, finish with what they get
- UK English only (colour, centre, organisation, licence)
- No emojis, no clickbait, no "ultimate"/"awesome"
- Include the year 2026 or "A4:2026" where regulatory currency matters
- Trade-grade tone — speak to electricians, not consumers
- NEVER invent or hallucinate British Standards. Only cite real, verified standards:
  - BS 7671:2018+A4:2026 (the wiring regs)
  - BS 5266 (emergency lighting), BS 5839 (fire alarms), BS 7909 (events), BS EN 60617 (symbols),
    BS EN 50173 (cabling), BS EN 50174 (cabling install), BS EN 62386 (DALI)
  - When unsure, omit the standard reference rather than inventing one
- Output JSON only — no preamble, no explanation, no markdown`;

function buildUserPrompt({ slug, currentTitle, currentDesc, queries }) {
  return `URL: ${slug}
Current title: ${currentTitle || '(none)'}
Current meta description: ${currentDesc || '(none)'}

Top 3 queries from Google Search Console (last 90 days), in order of impressions:
${queries.map((q, i) => `${i + 1}. "${q.query}" — ${q.impressions} impressions, position ${q.position.toFixed(1)}, CTR ${(q.ctr * 100).toFixed(1)}%`).join('\n')}

The current title/description is bleeding clicks. Rewrite 3 variants of title + meta description that:
- Match the #1 query's intent precisely
- Front-load the query's primary noun phrase
- Add a year, number, or specific value to drive CTR

Return JSON: {"variants": [{"title": "...", "description": "..."}, {"title": "...", "description": "..."}, {"title": "...", "description": "..."}]}`;
}

// -- main ------------------------------------------------------------------

async function generate() {
  if (!existsSync(PAGES_FILE)) {
    console.error(`Missing ${PAGES_FILE} — run scripts/seo-engine/gsc-export.mjs first.`);
    process.exit(1);
  }
  if (!existsSync(QUERIES_FILE)) {
    console.error(`Missing ${QUERIES_FILE} — run scripts/seo-engine/gsc-export.mjs first.`);
    process.exit(1);
  }

  const pages = JSON.parse(readFileSync(PAGES_FILE, 'utf-8'));
  const queriesPerUrl = JSON.parse(readFileSync(QUERIES_FILE, 'utf-8'));
  const routesSource = readFileSync(SEO_ROUTES_FILE, 'utf-8');

  // Filter to winnable pages
  const candidates = pages
    .filter((p) => p.position >= MIN_POS && p.position <= MAX_POS && p.impressions >= MIN_IMP)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, TOP_N);

  console.log(`Candidates (pos ${MIN_POS}-${MAX_POS}, imp>=${MIN_IMP}, top ${TOP_N}): ${candidates.length}`);

  const results = [];
  for (const p of candidates) {
    const slug = p.slug;
    const queries = (queriesPerUrl[slug] || []).slice(0, 3);
    if (queries.length === 0) {
      console.log(`  SKIP ${slug} — no queries`);
      continue;
    }
    const componentName = slugToComponentName(routesSource, slug);
    if (!componentName) {
      console.log(`  SKIP ${slug} — no route match`);
      continue;
    }
    const file = componentToFile(routesSource, componentName);
    if (!file) {
      console.log(`  SKIP ${slug} — no source file`);
      continue;
    }
    const src = readFileSync(file, 'utf-8');
    const { title, description } = extractTitleAndDesc(src);
    if (!title) {
      console.log(`  SKIP ${slug} — no title prop in source`);
      continue;
    }

    try {
      const userPrompt = buildUserPrompt({ slug, currentTitle: title, currentDesc: description, queries });
      const raw = await callGateway(SYSTEM_PROMPT, userPrompt);
      // Strip markdown fences if model added them
      const cleaned = raw.replace(/^```json\s*|\s*```$/g, '').trim();
      const parsed = JSON.parse(cleaned);
      results.push({
        slug,
        file: file.replace(ROOT + '/', ''),
        impressions: p.impressions,
        clicks: p.clicks,
        position: p.position,
        ctr: p.ctr,
        topQueries: queries,
        currentTitle: title,
        currentDescription: description,
        variants: parsed.variants,
        humanApproved: null, // set to true/false before --apply
      });
      console.log(`  OK ${slug} (imp=${p.impressions}, top query="${queries[0].query}")`);
    } catch (e) {
      console.log(`  ERR ${slug}: ${e.message.slice(0, 100)}`);
    }
  }

  writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
  console.log(`\nWrote ${results.length} rewrites → ${OUTPUT_FILE}`);
  console.log(`Review the file, then run with --apply to commit changes.`);
}

async function apply() {
  if (!existsSync(OUTPUT_FILE)) {
    console.error(`Missing ${OUTPUT_FILE} — generate first.`);
    process.exit(1);
  }
  const rewrites = JSON.parse(readFileSync(OUTPUT_FILE, 'utf-8'));
  const applied = [];
  for (const r of rewrites) {
    if (r.humanApproved === false) continue;
    if (!r.variants || r.variants.length === 0) continue;
    const v = r.variants[0]; // take the first variant
    if (v.title.length > 60) {
      console.log(`  SKIP ${r.slug} — variant title >60 chars`);
      continue;
    }
    if (v.description.length > 165) {
      console.log(`  SKIP ${r.slug} — variant desc >165 chars`);
      continue;
    }
    const file = join(ROOT, r.file);
    let src = readFileSync(file, 'utf-8');
    // Replace title and description props using literal substring match (not regex)
    // to avoid corruption when titles contain pipe/quote/regex-special chars.
    const titleOld = `title="${r.currentTitle}"`;
    const titleNew = `title="${v.title}"`;
    if (!src.includes(titleOld)) {
      console.log(`  SKIP ${r.slug} — current title literal not found in source (may have been edited)`);
      continue;
    }
    src = src.replace(titleOld, titleNew);
    if (r.currentDescription) {
      const descOld = `description="${r.currentDescription}"`;
      const descNew = `description="${v.description}"`;
      if (src.includes(descOld)) src = src.replace(descOld, descNew);
    }
    // Defensive check — after replace, the file must NOT contain a malformed `title="..."| ...` pattern
    if (/\btitle="[^"]*"\|/.test(src)) {
      console.log(`  REVERT ${r.slug} — malformed title detected after replace`);
      continue;
    }
    writeFileSync(file, src);
    applied.push({ slug: r.slug, file: r.file, applied: v });
    console.log(`  APPLIED ${r.slug}`);
  }
  writeFileSync(APPLIED_FILE, JSON.stringify(applied, null, 2));
  console.log(`\nApplied ${applied.length} rewrites → ${APPLIED_FILE}`);
}

(APPLY ? apply() : generate()).catch((e) => {
  console.error(e);
  process.exit(1);
});
