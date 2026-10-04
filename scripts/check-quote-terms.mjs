#!/usr/bin/env node
/**
 * The quote terms a client reads on the online quote page must be the terms
 * printed on the PDF (ELE-1149). The PDF builds them in Deno
 * (supabase/functions/generate-pdf-monkey), which can't import from src, so
 * the page has its own copy in src/utils/quoteTerms.ts. This fails if the map
 * or the list-building differ.
 *
 *   npm run check:quote-terms
 */
import { readFileSync } from 'node:fs';

const grab = (file) => {
  const s = readFileSync(file, 'utf8').replace(/export /g, '');
  const map = s.slice(
    s.indexOf('const DEFAULT_TERMS_MAP'),
    s.indexOf('\n};\n', s.indexOf('const DEFAULT_TERMS_MAP')) + 3
  );
  const k = s.indexOf('function buildTermsList(');
  const fn = s.slice(k, s.indexOf('\n}\n', k) + 2);
  const norm = (t) => t.replace(/\s+/g, ' ').trim();
  return { map: norm(map), fn: norm(fn) };
};

const pdf = grab('supabase/functions/generate-pdf-monkey/index.ts');
const page = grab('src/utils/quoteTerms.ts');
const problems = [];
if (!pdf.map || pdf.map !== page.map)
  problems.push('DEFAULT_TERMS_MAP differs between the PDF function and src/utils/quoteTerms.ts');
if (!pdf.fn || pdf.fn !== page.fn)
  problems.push('buildTermsList differs between the PDF function and src/utils/quoteTerms.ts');
if (problems.length) {
  console.error('✗ quote terms:\n' + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log('✓ quote terms: the online quote page and the PDF build the same list');
