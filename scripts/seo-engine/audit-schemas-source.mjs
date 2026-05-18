#!/usr/bin/env node
/**
 * audit-schemas-source.mjs — Source-side schema completeness audit.
 *
 * Parses every src/pages/seo/*.tsx to determine:
 *  - Which template each page uses (GuideTemplate / ToolTemplate / etc)
 *  - Which schemas WILL be emitted by that template
 *  - Which expected schemas are MISSING (e.g. /electricians/[city] without
 *    localArea prop, /training/ pages not using CourseTemplate)
 *
 * Outputs reports/schema-coverage.json with per-page schema status.
 *
 * This is preventive — catches schema gaps BEFORE shipping (vs. the live
 * validator which catches them after).
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const SEO_DIR = join(ROOT, 'src/pages/seo');
const ROUTES_FILE = join(ROOT, 'src/routes/SEORoutes.tsx');
const OUT = join(ROOT, 'reports/schema-coverage.json');

const routesSrc = readFileSync(ROUTES_FILE, 'utf-8');

// Map path → component name
const pathToComponent = {};
const routeRe = /path="([^"]+)"[\s\S]*?<(\w+)\s*\/>/g;
let m;
while ((m = routeRe.exec(routesSrc)) !== null) {
  pathToComponent[m[1]] = m[2];
}

// Map component name → file path
const componentToFile = {};
const importRe = /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(\s*['"]@\/pages\/seo\/(\w+)['"]\s*\)\s*\)/g;
while ((m = importRe.exec(routesSrc)) !== null) {
  componentToFile[m[1]] = join(SEO_DIR, m[2] + '.tsx');
}

// What schemas each template emits (read from template source on disk):
const TEMPLATE_SCHEMAS = {
  GuideTemplate: ['WebPage', 'Article', 'FAQPage?', 'HowTo?', 'BreadcrumbList', 'Service?(localArea)'],
  ToolTemplate: ['SoftwareApplication', 'FAQPage?', 'BreadcrumbList'],
  BusinessTemplate: ['SoftwareApplication', 'Service', 'BreadcrumbList'],
  CourseTemplate: ['Course', 'FAQPage?', 'BreadcrumbList'],
  ComparisonTemplate: ['Article', 'FAQPage?', 'BreadcrumbList'],
};

const results = [];
for (const [routePath, componentName] of Object.entries(pathToComponent)) {
  const file = componentToFile[componentName];
  if (!file) {
    results.push({ path: routePath, status: 'no-source-file' });
    continue;
  }
  let src;
  try {
    src = readFileSync(file, 'utf-8');
  } catch {
    results.push({ path: routePath, status: 'unreadable-source-file' });
    continue;
  }

  // Detect template via import
  const templateImport = src.match(/import\s+(\w+)\s+from\s+['"]@\/pages\/seo\/templates\/(\w+)/);
  const template = templateImport ? templateImport[2] : null;

  const issues = [];
  const expected = template && TEMPLATE_SCHEMAS[template] ? TEMPLATE_SCHEMAS[template] : [];

  // Special checks
  if (routePath.startsWith('/electricians/') && template === 'GuideTemplate') {
    if (!/\blocalArea\s*=/.test(src)) {
      issues.push('city page missing localArea prop → no Service schema');
    }
  }

  if (routePath.startsWith('/training/') && template !== 'CourseTemplate') {
    issues.push(`training page using ${template || 'unknown'} (expected CourseTemplate) → no Course schema`);
  }

  // Check for FAQ presence on guide pages
  if (template === 'GuideTemplate') {
    const faqsBlock = src.match(/\bfaqs\s*=\s*\{([\s\S]*?)\}\s*[\n/]/);
    const inlineFaqsArray = src.match(/\bconst\s+faqs\s*=\s*\[([\s\S]*?)\];/);
    if (!faqsBlock && !inlineFaqsArray) issues.push('no faqs array — FAQPage schema will not emit');
  }

  // Check generated-config pages (most new pages)
  const isGenerated = src.includes('GeneratedGuidePage');
  if (isGenerated) {
    const configImport = src.match(/import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@\/pages\/seo\/generated\/(\w+)/);
    if (configImport) {
      const configFile = join(SEO_DIR, 'generated', configImport[2] + '.ts');
      try {
        const configSrc = readFileSync(configFile, 'utf-8');
        if (!/\bfaqs\s*:\s*\[/.test(configSrc)) issues.push('config has no faqs → FAQPage schema missing');
        if (!/\bhowToSteps\s*:\s*\[/.test(configSrc)) issues.push('config has no howToSteps → HowTo schema missing');
      } catch {
        issues.push(`config file not readable: ${configImport[2]}`);
      }
    }
  }

  results.push({
    path: routePath,
    component: componentName,
    template,
    isGenerated,
    expected,
    issues,
  });
}

const summary = {
  totalPages: results.length,
  byTemplate: results.reduce((acc, r) => { acc[r.template || 'unknown'] = (acc[r.template || 'unknown'] || 0) + 1; return acc; }, {}),
  withIssues: results.filter((r) => r.issues?.length > 0).length,
  issuesByType: results.reduce((acc, r) => {
    for (const i of r.issues || []) acc[i] = (acc[i] || 0) + 1;
    return acc;
  }, {}),
};

writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), summary, results }, null, 2));
console.log('Total pages:', summary.totalPages);
console.log('By template:', JSON.stringify(summary.byTemplate));
console.log('Pages with issues:', summary.withIssues);
console.log('\nIssues breakdown:');
for (const [k, v] of Object.entries(summary.issuesByType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${v.toString().padStart(4)}× ${k}`);
}
console.log(`\nWrote ${OUT}`);
