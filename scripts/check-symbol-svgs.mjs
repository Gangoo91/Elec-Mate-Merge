#!/usr/bin/env node
/**
 * Fail if the generated symbol map has drifted from `public/symbols/`.
 *
 * The Room Planner draws from the generated file; the public symbol chart and
 * the SEO pages draw from the .svg files directly. If the two ever disagree,
 * a corrected symbol reaches one surface and not the other — which is exactly
 * how the planner ended up drawing a plain circle for a socket outlet while the
 * chart drew the correct one.
 *
 * Cheap to run, so it runs in CI.
 */
import { readFileSync } from 'node:fs';
import { buildSource } from './generate-symbol-svgs.mjs';

const OUT = 'src/components/electrician-tools/diagram-builder/symbols/symbolSvgs.generated.ts';

let current;
try {
  current = readFileSync(OUT, 'utf8');
} catch {
  console.error(`✖ ${OUT} is missing — run: npm run symbols:generate`);
  process.exit(1);
}

const expected = buildSource();

if (current !== expected) {
  console.error(
    `✖ ${OUT} is out of date with public/symbols/.\n` +
      `  A symbol was added or edited without regenerating, so the Room Planner\n` +
      `  would draw a different symbol from the one on the chart.\n` +
      `  Fix: npm run symbols:generate`
  );
  process.exit(1);
}

const count = (expected.match(/^  '\/symbols\//gm) || []).length;
console.log(`✔ ${count} symbols inlined and in step with public/symbols/`);
