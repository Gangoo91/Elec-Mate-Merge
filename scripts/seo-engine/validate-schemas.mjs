#!/usr/bin/env node
/**
 * validate-schemas.mjs — Lightweight structured-data validator.
 *
 * Fetches live pages from elec-mate.com (or a configurable BASE), parses every
 * `<script type="application/ld+json">` block, and checks each schema against a
 * required-fields ruleset for the most common @types we emit.
 *
 * Why this exists: today's Review snippet bug shipped because there was no
 * automated check. With 1100+ pages emitting JSON-LD, silent schema bugs are
 * inevitable. This script runs in CI / cron and alerts on the day they appear.
 *
 * Outputs reports/schema-errors.json with per-page issue list.
 *
 * Usage:
 *   node scripts/seo-engine/validate-schemas.mjs                  # all pages
 *   node scripts/seo-engine/validate-schemas.mjs --limit 50       # first 50
 *   node scripts/seo-engine/validate-schemas.mjs --slug=/guides/foo  # one URL
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const BASE = process.env.SCHEMA_VALIDATOR_BASE || 'https://www.elec-mate.com';
const AUDIT_FILE = join(ROOT, 'reports/seo-audit.json');
const OUT_FILE = join(ROOT, 'reports/schema-errors.json');

function argValue(name) {
  const eqIdx = process.argv.findIndex((a) => a.startsWith(`${name}=`));
  if (eqIdx >= 0) return process.argv[eqIdx].split('=')[1];
  const flagIdx = process.argv.indexOf(name);
  if (flagIdx >= 0 && process.argv[flagIdx + 1]) return process.argv[flagIdx + 1];
  return null;
}
const limitVal = argValue('--limit');
const LIMIT = limitVal ? parseInt(limitVal, 10) : null;
const ONE_SLUG = argValue('--slug');

// -- ruleset --------------------------------------------------------------
// Per-@type required fields. Missing field → error. Wrong type → error.

const RULES = {
  Article: {
    required: ['headline', 'datePublished'],
    typed: { author: 'object', publisher: 'object' },
  },
  WebPage: {
    required: ['name'],
  },
  FAQPage: {
    required: ['mainEntity'],
    custom: (s) => {
      const e = [];
      if (!Array.isArray(s.mainEntity)) e.push('mainEntity must be an array');
      else {
        s.mainEntity.forEach((q, i) => {
          if (q['@type'] !== 'Question') e.push(`mainEntity[${i}].@type must be Question`);
          if (!q.name) e.push(`mainEntity[${i}].name required`);
          if (!q.acceptedAnswer) e.push(`mainEntity[${i}].acceptedAnswer required`);
          else if (!q.acceptedAnswer.text) e.push(`mainEntity[${i}].acceptedAnswer.text required`);
        });
      }
      return e;
    },
  },
  HowTo: {
    required: ['name', 'step'],
    custom: (s) => {
      const e = [];
      if (!Array.isArray(s.step)) e.push('step must be an array');
      else if (s.step.length === 0) e.push('step array empty');
      return e;
    },
  },
  Service: {
    required: ['name', 'areaServed', 'provider'],
  },
  LocalBusiness: {
    required: ['name', 'address'],
  },
  Course: {
    required: ['name', 'provider'],
  },
  SoftwareApplication: {
    required: ['name', 'applicationCategory'],
    custom: (s) => {
      const e = [];
      if (s.aggregateRating) {
        if (!s.aggregateRating.ratingValue) e.push('aggregateRating.ratingValue required');
        if (!s.aggregateRating.ratingCount && !s.aggregateRating.reviewCount) {
          e.push('aggregateRating.ratingCount or reviewCount required');
        }
      }
      return e;
    },
  },
  Review: {
    required: ['reviewRating', 'itemReviewed', 'author'],
    custom: (s) => {
      const e = [];
      if (s.reviewRating && typeof s.reviewRating === 'object') {
        if (!s.reviewRating.ratingValue) e.push('reviewRating.ratingValue required');
      } else if (s.reviewRating) {
        e.push('reviewRating must be a Rating object, not a scalar');
      }
      return e;
    },
  },
  BreadcrumbList: {
    required: ['itemListElement'],
  },
};

function validateSchema(schema, ctx) {
  const errors = [];
  const type = schema['@type'];
  if (!type) return [`missing @type (in ${ctx})`];
  if (!RULES[type]) return []; // not a type we validate
  const rule = RULES[type];
  for (const field of rule.required || []) {
    if (schema[field] === undefined || schema[field] === null || schema[field] === '') {
      errors.push(`${type}: missing required field "${field}"`);
    }
  }
  for (const [field, expectedType] of Object.entries(rule.typed || {})) {
    if (schema[field] !== undefined && typeof schema[field] !== expectedType) {
      errors.push(`${type}: "${field}" must be ${expectedType}, got ${typeof schema[field]}`);
    }
  }
  if (rule.custom) errors.push(...rule.custom(schema));
  return errors;
}

async function checkPage(slug) {
  const url = `${BASE}${slug}`;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) return { slug, status: res.status, errors: [`HTTP ${res.status}`], schemas: [] };
    const html = await res.text();
    const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const schemas = [];
    const errors = [];
    if (blocks.length === 0) {
      errors.push('no JSON-LD blocks found');
    }
    blocks.forEach((m, i) => {
      try {
        const parsed = JSON.parse(m[1]);
        // Support array of schemas or @graph
        const items = Array.isArray(parsed) ? parsed : parsed['@graph'] ? parsed['@graph'] : [parsed];
        items.forEach((item) => {
          schemas.push(item['@type']);
          errors.push(...validateSchema(item, `block ${i + 1}`));
        });
      } catch (e) {
        errors.push(`block ${i + 1}: JSON parse error — ${e.message.slice(0, 80)}`);
      }
    });
    return { slug, status: 200, schemas, errors };
  } catch (e) {
    return { slug, status: 0, errors: [`fetch error: ${e.message.slice(0, 100)}`], schemas: [] };
  }
}

async function main() {
  let slugs;
  if (ONE_SLUG) {
    slugs = [ONE_SLUG];
  } else if (existsSync(AUDIT_FILE)) {
    const audit = JSON.parse(readFileSync(AUDIT_FILE, 'utf-8'));
    slugs = audit.scored.map((p) => p.slug);
  } else {
    console.error('No audit file — run scripts/seo-audit/run.mjs first or pass --slug=/foo');
    process.exit(1);
  }
  if (LIMIT) slugs = slugs.slice(0, LIMIT);

  console.log(`Validating ${slugs.length} pages against schema ruleset...`);
  const results = [];
  const CONCURRENCY = 8;
  for (let i = 0; i < slugs.length; i += CONCURRENCY) {
    const batch = slugs.slice(i, i + CONCURRENCY);
    const out = await Promise.all(batch.map(checkPage));
    results.push(...out);
    if ((i + CONCURRENCY) % 80 === 0) console.log(`  ${i + CONCURRENCY}/${slugs.length}`);
  }

  const issues = results.filter((r) => r.errors.length > 0);
  console.log(`\nDone. ${results.length} pages checked, ${issues.length} with issues.`);
  writeFileSync(OUT_FILE, JSON.stringify({ checkedAt: new Date().toISOString(), base: BASE, total: results.length, issuesCount: issues.length, issues }, null, 2));
  console.log(`Wrote ${OUT_FILE}`);

  if (issues.length > 0) {
    console.log('\nTop 10 issues:');
    issues.slice(0, 10).forEach((r) => {
      console.log(`  ${r.slug}`);
      r.errors.slice(0, 3).forEach((e) => console.log(`    - ${e}`));
    });
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
