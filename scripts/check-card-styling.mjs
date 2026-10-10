/**
 * check:card-styling — ELE-1628
 * ─────────────────────────────────────────────────────────────────────────────
 * A ratchet on the two styling faults that keep coming back:
 *
 *   volt-fill   `bg-elec-yellow/<n>` (any variant, e.g. `hover:`): a translucent
 *               yellow BACKGROUND. On the near-black ground every opacity mixes
 *               into muddy brown (card-recipe.ts; Andrew: "why do you always do
 *               these brown cards"). Solid `bg-elec-yellow` + black text is
 *               fine, and so are `border-elec-yellow/<n>` and
 *               `text-elec-yellow/<n>` — a line has nothing to mix with.
 *   grey-text   `text-white/<n>`: renders grey, and grey text is banned
 *               outright (all text `text-white`).
 *
 * The tree carries thousands of both, so a hard fail would never land. This
 * records the count per area in `scripts/card-styling-baseline.json` and fails
 * only when an area's count GOES UP. Every clean-up ratchets it down: run
 * `node scripts/check-card-styling.mjs --update` after removing some.
 *
 * What it does NOT check, said out loud so a green run is not mistaken for
 * more than it is (the lesson of check-question-quality, green for eighteen
 * days while reading a fraction of what it claimed):
 *   - class names built at runtime (`bg-elec-yellow/${n}`, lookups in maps) —
 *     only literal class text is matched;
 *   - inline `style={{ background: … }}` and CSS files;
 *   - whether a new card imports card-recipe (rule 3 of the ticket) — that
 *     needs a component-level read, not a regex;
 *   - anything outside src/.
 * It prints how many files it read so a silently empty glob shows up.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, 'src');
const BASELINE = join(root, 'scripts/card-styling-baseline.json');
const update = process.argv.includes('--update');

const RULES = {
  'volt-fill': /(?<![\w-])bg-elec-yellow\/(?:\d+|\[[^\]\s]+\])/g,
  'grey-text': /(?<![\w-])text-white\/(?:\d+|\[[^\]\s]+\])/g,
};

/** Area = the first two path segments under src, e.g. `pages/study-centre`. */
const areaOf = (rel) => {
  const parts = rel.split('/');
  return parts.length > 2 ? `${parts[0]}/${parts[1]}` : parts[0];
};

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p);
    else if (/\.(tsx|ts|jsx|js)$/.test(name) && !name.endsWith('.d.ts')) files.push(p);
  }
})(SRC);

const counts = {};
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const area = areaOf(relative(SRC, f));
  for (const [rule, re] of Object.entries(RULES)) {
    const n = (text.match(re) || []).length;
    if (!n) continue;
    counts[rule] ??= {};
    counts[rule][area] = (counts[rule][area] ?? 0) + n;
  }
}

const total = (rule) => Object.values(counts[rule] ?? {}).reduce((a, b) => a + b, 0);
console.log(`check:card-styling read ${files.length} files under src/`);
for (const rule of Object.keys(RULES)) console.log(`  ${rule}: ${total(rule)}`);

if (files.length < 1000) {
  console.error(`✗ only ${files.length} files read — the walk is broken, not the tree clean`);
  process.exit(1);
}

if (update || !existsSync(BASELINE)) {
  writeFileSync(BASELINE, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), counts }, null, 2) + '\n');
  console.log(`✓ baseline ${update ? 'updated' : 'written'}: ${relative(root, BASELINE)}`);
  process.exit(0);
}

const base = JSON.parse(readFileSync(BASELINE, 'utf8')).counts ?? {};
const rises = [];
const drops = [];
for (const rule of Object.keys(RULES)) {
  const areas = new Set([...Object.keys(base[rule] ?? {}), ...Object.keys(counts[rule] ?? {})]);
  for (const area of areas) {
    const was = base[rule]?.[area] ?? 0;
    const now = counts[rule]?.[area] ?? 0;
    if (now > was) rises.push(`  ${rule} in src/${area}: ${was} → ${now} (+${now - was})`);
    else if (now < was) drops.push(`  ${rule} in src/${area}: ${was} → ${now}`);
  }
}

if (drops.length) {
  console.log(`↓ ${drops.length} area(s) improved — lock it in with --update:`);
  drops.slice(0, 10).forEach((d) => console.log(d));
}
if (rises.length) {
  console.error(`✗ new translucent volt fills or grey text:`);
  rises.forEach((r) => console.error(r));
  console.error(
    '  Use a neutral card (card-recipe CARD_NEUTRAL / CARD_SURFACE) or SOLID bg-elec-yellow + text-black;' +
      ' text is always text-white.'
  );
  process.exit(1);
}
console.log('✓ no area got worse');
