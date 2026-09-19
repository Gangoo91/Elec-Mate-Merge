#!/usr/bin/env node
/**
 * Generate the inline symbol map the Room Planner draws from.
 *
 * WHY THIS EXISTS
 * ───────────────
 * The planner used to `fetch()` each symbol from `/symbols/<cat>/<file>.svg` at
 * draw time. That is a network call per symbol, in a tool electricians use on
 * site, where there is frequently no signal. When the fetch failed the loader
 * fell back to a hand-maintained inline copy of 50 symbols — which had drifted
 * (its "single 13A socket" was a plain circle, not the semicircle-on-a-baseline
 * of the real symbol) — and for the other 85 it drew a generic placeholder.
 *
 * So the same plan looked different, and wrong, offline.
 *
 * All 114 SVGs together are ~48 KB, so there is no reason to fetch them at all.
 * This script inlines every one at build time. The planner and the public
 * symbol chart then draw from the same bytes, and a corrected SVG reaches both
 * without anyone remembering to update a second copy.
 *
 * Run `npm run symbols:generate` after adding or editing any file in
 * `public/symbols/`. `npm run check:symbol-svgs` fails the build if you forget.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SYMBOL_ROOT = 'public/symbols';
const OUT = 'src/components/electrician-tools/diagram-builder/symbols/symbolSvgs.generated.ts';

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.svg')) out.push(full);
  }
  return out;
}

/** Collapse whitespace so the generated file stays readable and small. */
const tidy = (svg) => svg.replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();

export function buildSource() {
  const files = walk(SYMBOL_ROOT).sort();
  const lines = files.map((f) => {
    const key = '/' + relative('public', f).split(/[\\/]/).join('/');
    const svg = tidy(readFileSync(f, 'utf8'));
    if (svg.includes('`') || svg.includes('${')) {
      throw new Error(`${f}: SVG contains a backtick or \${ which would break the template literal`);
    }
    return `  '${key}': \`${svg}\`,`;
  });

  return `/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Every symbol in \`public/symbols/\`, inlined so the Room Planner never needs a
 * network round-trip to draw one. Regenerate with \`npm run symbols:generate\`;
 * \`npm run check:symbol-svgs\` fails if this drifts from the source files.
 *
 * ${files.length} symbols.
 */

/** Keyed by the public path, which is what \`symbolRegistry.svgPath\` holds. */
export const SYMBOL_SVGS: Readonly<Record<string, string>> = {
${lines.join('\n')}
};

export const SYMBOL_SVG_COUNT = ${files.length};
`;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].split(/[\\/]/).pop());
if (isMain) {
  const src = buildSource();
  writeFileSync(OUT, src);
  console.log(`✔ wrote ${OUT} (${src.length} bytes)`);
}
