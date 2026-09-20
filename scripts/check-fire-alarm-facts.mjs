#!/usr/bin/env node
/**
 * Fire alarm teaching content must match BS 5839-1:2025.
 *
 *   npm run check:fire-alarm-facts
 *
 * WHY THIS EXISTS
 * ELE-1754. A learner reported that the fire alarm study cards were wrong. They
 * were, and an audit against the actual standard found the errors were not
 * isolated — they were spread across a 200-question mock exam bank, a
 * compliance data module and a teaching page, all of which cite
 * "BS 5839-1:2025" by name and none of which had ever been checked against it.
 *
 * The reason none of it had been checked is the important part: **BS 5839-1 is
 * not in the RAG.** `bs7671_facets` holds BS 7671 A4:2026, GN3 and OSG only. So
 * every fire alarm figure in this codebase was written from memory or from a
 * web search, and nothing in the build could tell the difference between a real
 * recommendation and a plausible-sounding invention. Several of the figures
 * were internally consistent and completely wrong, which is the worst case —
 * they survive review because they look like they came from somewhere.
 *
 * What was actually wrong, all verified against the purchased standard:
 *
 *   - "a smoke detector covers 84 m²" — BS 5839-1 sets NO coverage area for any
 *     detector. 21.2.1 sets a distance: 7.5 m to the nearest smoke detector,
 *     5.3 m to the nearest heat detector.
 *   - "test 25% of detectors annually, all over 4 years" — 43.3.5 says a
 *     functional test on EVERY detector within the 12-month period. There is no
 *     25% rule and no 4-year cycle. The only quarterly item in the inspection
 *     clauses is 43.1, the examination of VENTED BATTERIES.
 *   - "Clause 45" cited for every service interval — Clause 45 is EXTENSIONS.
 *   - "Clause 16.5" cited for sound levels — Clause 16 is VISUAL alarms;
 *     audible is Clause 15.
 *   - "smoke detectors 7.5 m centre-to-centre" — 7.5 m is the RADIUS. The grid
 *     that satisfies it is 10.6 m c/c (7.5 × √2), which is the figure clause
 *     21.2.14 itself uses. Heat is 5.3 m radius, 7.5 m c/c.
 *   - "manual call points 1.4 m ±0.1 m" — 19.8 gives 1.4 m +0.2/−0.3 m.
 *   - "smoke detectors at least 0.6 m below the ceiling" — 21.2.4a) gives the
 *     sensing element 25 mm to 600 mm below. 600 mm is the ceiling, not a floor.
 *   - "max 32 detectors per zone" — no such limit. Zones are bounded by area
 *     (2 000 m², 12.3a) and search distance (60 m, 12.3b).
 *
 * This guard pins the figures that were wrong, plus the clause numbers that
 * were misattributed. It is deliberately a list of KNOWN-WRONG patterns rather
 * than an attempt to validate every number: a regression here looks exactly
 * like the original defect, because the original defect was someone writing a
 * confident figure they had not checked.
 *
 * Neither tsc nor eslint has anything to say about any of this. Every one of
 * these was a syntactically perfect string.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Walk src/ for anything that teaches or encodes fire alarm rules. */
function collect(dir = 'src', out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      collect(full, out);
      continue;
    }
    if (!/\.tsx?$/.test(name)) continue;
    if (!/fire-?alarm|bs5839/i.test(full)) continue;
    out.push(full);
  }
  return out;
}

/**
 * Each rule is a pattern that should never appear, with the correction.
 * `near` narrows a rule to the context that makes it wrong, so that a figure
 * which is legitimate elsewhere (7.5 m IS the heat c/c spacing, and IS the
 * smoke radius) is not reported everywhere it occurs.
 */
const RULES = [
  {
    id: 'coverage-area',
    pattern: /\b84\s?m[²2]\b/,
    detail:
      'BS 5839-1 sets no coverage area per detector. Clause 21.2.1a): no point more than 7.5 m from the nearest smoke detector (5.3 m for heat).',
  },
  {
    id: 'sample-testing',
    pattern: /\b25\s?%[^.]{0,80}\b(detector|device)s?\b|\b(detector|device)s?\b[^.]{0,60}\b25\s?%/i,
    not: /43\.3\.5|every detector|not a 25|no 25%|vented batter|claimed|earlier version|rule in BS 5839-1/i,
    detail:
      'Clause 43.3.5 requires a functional test on EVERY detector within the 12-month period — not a 25% sample. The only quarterly item is 43.1, vented batteries.',
  },
  {
    id: 'four-year-cycle',
    pattern: /\b(4|four)[- ]year\b[^.]{0,60}\b(cycle|rotation)\b/i,
    // Battery life IS four years (24.3.2). This rule is about a DETECTOR
    // testing cycle, so anything discussing batteries is out of scope.
    not: /batter|SLA|float charge|ageing factor|24\.3\.2|design replacement|capacity/i,
    detail:
      'There is no four-year detector cycle in BS 5839-1. The only "4 years" is secondary battery life (24.3.2), a different subject.',
  },
  {
    /*
     * A CONDITIONAL rule stated as an absolute one.
     *
     * 12.1 b) restricts a zone to a single storey only where the total floor
     * area of the BUILDING exceeds 300 m², and NOTE 2 expressly permits a zone
     * to span storeys at 300 m² or less. The course's own RegsCallout quotes
     * that correctly — but a quiz explanation in the same section taught the
     * rule with no condition at all, and marked a distractor wrong that would
     * have been right had it said 300 m² instead of 2,000 m².
     *
     * That is the shape to watch: the threshold is easy to conflate with the
     * 2,000 m² zone-AREA cap, and dropping it turns a rule with an exception
     * into a rule without one. This fires on any statement that a storey is
     * its own zone unless the 300 m² condition or the clause number is nearby.
     */
    id: 'storey-zone-unconditional',
    pattern: /each storey[^.]{0,60}(its own|a separate|separate)\s+zone|(one|a)\s+zone\s+per\s+storey/i,
    not: /300\s?m|12\.1|greater than 300|less than or equal to 300/i,
    detail:
      'Clause 12.1 b) restricts a zone to a single storey only where the total floor area of the building is greater than 300 m². NOTE 2 permits a zone to cover more than one storey at 300 m² or less. State the condition, and do not confuse the 300 m² building threshold with the 2,000 m² zone-area cap.',
  },
  {
    /*
     * The second conditional-stated-absolutely case found, same shape as
     * `storey-zone-unconditional`.
     *
     * 15.1.3 requires the alarm signal to be 5 dB(A) above background noise
     * ONLY "where the sound pressure level of background noise is greater than
     * 60 dB(A)". Below that trigger the rule does not apply at all and the
     * 65/60/75 dB(A) floors govern alone. The course taught "+5 dB above any
     * persistent ambient sound" in three places, which would have a 45 dB(A)
     * office designed to 50 dB(A) instead of 65.
     *
     * The trap is that 60 dB(A) appears in Clause 15 TWICE meaning different
     * things — the small-enclosed-space MINIMUM, and this background-noise
     * TRIGGER — so the file can be full of "60 dB" and still never state the
     * condition. Hence the `not` looks for the trigger phrasing, not the bare
     * number.
     */
    /*
     * Tightened after a first run that over-matched: `.{0,40}` let the phrase
     * bridge "…5 dB(A) at bed-head" to an unrelated "ambient" much later in the
     * same long aria-label, so the two halves must now be adjacent.
     *
     * The `not` also needed widening from `exceeds?` to `exceed\w*`: M5S5 says
     * "background EXCEEDING 60 dB(A)", which is correct and was being flagged.
     *
     * One I wrongly dismissed as a false positive turned out to be real — the
     * diagram's own aria-label read "≥+5 dB above ambient lasting 30 s or
     * longer", handing screen-reader users the unconditional version of the
     * rule. Check what the pattern actually matched before calling it noise.
     */
    id: 'ambient-5db-unconditional',
    pattern: /5\s?dB\(?A?\)?\s+above\s+(?:the\s+|any\s+|persistent\s+)*(?:ambient|background)\b/i,
    not: /(greater than|exceed\w*|above|over)\s+60\s?dB|15\.1\.3/i,
    detail:
      'Clause 15.1.3 applies the +5 dB(A) rule ONLY where background noise is greater than 60 dB(A). Below that trigger the 65/60/75 dB(A) minima govern on their own. NOTE 1 also exempts running water in bathrooms and shower rooms, and noise unlikely to persist longer than 30 s.',
  },
  {
    /*
     * FP200 is a STANDARD (PH 30) cable, not an enhanced one.
     *
     * 25.5 Standard: 30 min survival, BS EN 50200:2015 including the Annex E
     * water spray — class PH 30.
     * 25.6 Enhanced: 120 min, BS EN 50200:2015 AND BS 8434-2 — class PH 120.
     *
     * A flashcard described "FP200 (enhanced fire-resistant cable…)" while the
     * course's own cable section correctly taught FP200 Gold as the standard
     * PH 30 choice and FP PLUS as the enhanced PH 120 one. The error is
     * expensive in both directions: it either has enhanced cable specified
     * across a whole building that does not need it, or — far worse — has
     * FP200 accepted on a critical path that the fire strategy said needed
     * 120 minutes.
     */
    id: 'fp200-enhanced',
    pattern: /FP\s?200[^.]{0,50}\benhanced\b|\benhanced\b[^.]{0,40}\bFP\s?200\b/i,
    // Also exempts text that is CORRECTING the error — "do not describe FP200
    // as enhanced", "it is the standard grade" — which otherwise trips on itself.
    not: /not enhanced|is a standard|the standard grade|do not (describe|present)|PH\s?30|standard \(PH/i,
    detail:
      'FP200 / FP200 Gold is a STANDARD fire-resisting cable — 30 min, class PH 30 (clause 25.5). Enhanced means 120 min, class PH 120, tested to BS EN 50200:2015 AND BS 8434-2 (clause 25.6) — FP PLUS and similar. Do not present FP200 as enhanced.',
  },
  {
    id: 'clause-45-servicing',
    pattern: /reference:\s*'[^']*Clause 45|per BS 5839-1:2025 Clause 45/,
    detail:
      'Clause 45 is EXTENSIONS. Routine testing is Clause 42 (42.1 weekly, 42.2 monthly); inspection and servicing is Clause 43 (43.1 quarterly vented batteries, 43.2 ~6-monthly visits, 43.3 the 12-month schedule).',
  },
  {
    id: 'clause-16-sound',
    // Only fires where Clause 16 is cited AS THE SOURCE for a sound level.
    // Clause 16 is correctly cited for visual alarm devices all over this content.
    pattern: /reference:\s*'[^']*Clause 16|(sound level|audible)[^\n]{0,40}Clause 16/i,
    detail:
      'Clause 16 is VISUAL alarm signals. Audible alarm levels are Clause 15 — 15.1.1a) 65 dB(A), 15.1.1b) 75 dB(A) at the bedhead, 15.1.3 the +5 dB(A) rule once background exceeds 60 dB(A).',
  },
  {
    id: 'smoke-spacing',
    // Directional and sentence-bounded: "smoke" must PRECEDE the figure within
    // the same sentence. A heat block that mentions smoke in passing ("closer
    // together than smoke detectors. … the grid is 7.5 m c/c") is not a claim
    // about smoke spacing, and [^.] stops the match crossing the full stop.
    pattern: /smoke[^.]{0,60}7\.5\s?m\s*(centre-to-centre|c\/c)/i,
    not: /10\.6/,
    detail:
      '7.5 m is the smoke detector RADIUS (21.2.1a), not the grid pitch. The square grid that satisfies it is 10.6 m centre-to-centre — the figure clause 21.2.14 uses. (7.5 m c/c IS correct for HEAT.)',
  },
  {
    id: 'heat-spacing',
    pattern: /heat[^.]{0,60}5\.3\s?m\s*(centre-to-centre|c\/c)/i,
    not: /7\.5\s?m\s*(centre-to-centre|c\/c)/i,
    detail:
      '5.3 m is the heat detector RADIUS (21.2.1b), not the grid pitch. The grid that satisfies it is 7.5 m centre-to-centre.',
  },
  {
    id: 'heat-radius',
    pattern: /heat detector[^.]{0,60}\b(radius|coverage)[^.]{0,30}7\.5\s?m/i,
    detail:
      'Clause 21.2.1b): the heat detector limit is 5.3 m. 7.5 m is the smoke figure.',
  },
  {
    id: 'mcp-tolerance',
    pattern: /1\.4\s?m?\s*±\s*0\.1/,
    detail:
      'Clause 19.8 gives 1.4 m +0.2/−0.3 m above finished floor level (so 1.1 m to 1.6 m). The tolerance is asymmetric.',
  },
  {
    id: 'element-depth',
    pattern: /(at least|minimum of)\s*0\.6\s?m\s*below the ceiling|mounted at least 0\.6\s?m below/i,
    detail:
      'Clause 21.2.4a): the sensing element sits 25 mm to 600 mm below the ceiling for smoke (25–150 mm for heat). 600 mm is the MAXIMUM depth, not a minimum.',
  },
  {
    id: 'detectors-per-zone',
    // Scoped to ZONES. A 32-device limit on a circuit class is a real
    // manufacturer/EN 54 constraint and is not what this rule is about.
    pattern: /\b32\b[^.]{0,40}\bper zone\b|\bzone\b[^.]{0,40}\bmaximum of 32\b/i,
    not: /no limit|manufacturer|not recommendations/i,
    detail:
      'BS 5839-1 sets no limit on detectors per zone. A zone is bounded by floor area (2 000 m², 12.3a) and search distance (60 m, 12.3b). Per-loop figures are manufacturer constraints.',
  },
];

const files = collect();
const problems = [];

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  /*
   * A quiz file legitimately CONTAINS wrong statements — they are the
   * distractors, and a plausible wrong answer is the whole point of one. So
   * `options:` arrays are skipped. Only the question, the explanation and the
   * teaching prose are held to the standard, which is where a learner reads a
   * claim as true.
   */
  let inOptions = false;
  lines.forEach((line, i) => {
    if (/\boptions:\s*\[/.test(line)) inOptions = true;
    else if (inOptions && /^\s*\],?\s*$/.test(line)) inOptions = false;
    if (inOptions) return;
    /*
     * `not` is checked against a small WINDOW, not just the matching line.
     *
     * Prettier wraps JSX prose at 100 characters, so a single sentence is
     * routinely spread over three or four lines. A line-only check therefore
     * cannot see a qualifier that landed one line up — M5S5 states "in areas
     * where ambient noise exceeds 60 dB(A)" on one line and "sounders must be
     * at least 5 dB above the ambient background" on the next, and was flagged
     * as unconditional when it is nothing of the sort.
     *
     * Three lines either side covers a wrapped sentence, and a block comment
     * whose qualifier sits a couple of lines above the phrase it qualifies,
     * without reaching into a genuinely separate statement. `pattern` still matches on the single line, so this
     * only ever suppresses a false positive — it cannot hide a claim that has
     * no qualifier anywhere near it.
     */
    const window = lines.slice(Math.max(0, i - 3), i + 4).join(' ');
    for (const rule of RULES) {
      if (!rule.pattern.test(line)) continue;
      if (rule.not && rule.not.test(window)) continue;
      // A rule scoped with `near` only fires when its context word is present
      // on the same line — otherwise the shared figures report everywhere.
      if (rule.near && !rule.near.test(line)) continue;
      problems.push({
        file,
        line: i + 1,
        id: rule.id,
        text: line.trim().slice(0, 120),
        detail: rule.detail,
      });
    }
  });
}

if (problems.length === 0) {
  console.log(
    `✔ ${files.length} fire alarm content files checked against BS 5839-1:2025 — no known-wrong figures`
  );
  process.exit(0);
}

console.error(`\n✖ ${problems.length} claim(s) contradicting BS 5839-1:2025\n`);
for (const p of problems) {
  console.error(`  ${p.file}:${p.line}  [${p.id}]`);
  console.error(`    ${p.text}`);
  console.error(`    → ${p.detail}\n`);
}
process.exit(1);
