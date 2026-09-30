import { build } from 'esbuild';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const dir = mkdtempSync(join(tmpdir(), 'mwlabels-'));
const out = join(dir, 'opts.mjs');
await build({ entryPoints: ['src/constants/minorWorksOptions.ts'], bundle: true, platform: 'node', format: 'esm', outfile: out, alias: { '@': './src' }, logLevel: 'error' });
const o = await import(out);
const pick = (arr) => Object.fromEntries((arr || []).map((x) => [x.value, x.label]));
const maps = {
  WORK_TYPE: pick(o.WORK_TYPES), CIRCUIT_TYPE: pick(o.CIRCUIT_TYPES), CABLE_TYPE: pick(o.CABLE_TYPES),
  INSTALLATION_METHOD: pick(o.INSTALLATION_METHODS), REFERENCE_METHOD: pick(o.REFERENCE_METHODS),
  PROTECTIVE_DEVICE_TYPE: pick(o.PROTECTIVE_DEVICE_TYPES), QUALIFICATION: pick(o.QUALIFICATION_LEVELS),
  SCHEME_PROVIDER: pick(o.SCHEME_PROVIDERS), EARTHING_ARRANGEMENT: pick(o.EARTHING_ARRANGEMENTS), RCD_TYPE: pick(o.RCD_TYPES),
};
const body = `// GENERATED from src/constants/minorWorksOptions.ts — regenerate with
//   node scripts/gen-minor-works-labels.mjs
// The Minor Works form stores option VALUES ('twin-earth', 'eal-level3'); the
// certificate must print the LABELS ('Twin & Earth', 'EAL Level 3'). Until
// 30 Sep 2026 the raw values were printed on every issued certificate.

export const MW_LABELS = ${JSON.stringify(maps, null, 2)} as const;

type MapName = keyof typeof MW_LABELS;

/** Label for a stored option value; unknown or free-typed values pass through untouched. */
export function mwLabel(map: MapName, value: unknown): string {
  const v = String(value ?? '').trim();
  if (!v) return '';
  const table = MW_LABELS[map] as Record<string, string>;
  return table[v] ?? table[v.toLowerCase()] ?? v;
}

/** Scheme provider for printing: blank when none / not registered. */
export function mwSchemeLabel(value: unknown): string {
  const v = String(value ?? '').trim();
  if (!v || /^(none|not registered|n\\/a)$/i.test(v)) return '';
  return mwLabel('SCHEME_PROVIDER', v);
}
`;
writeFileSync('supabase/functions/_shared/minor-works-labels.ts', body);
console.log(Object.entries(maps).map(([k, v]) => `${k}:${Object.keys(v).length}`).join(' '));
