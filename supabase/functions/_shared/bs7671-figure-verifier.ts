/**
 * BS 7671 figure verifier — checks QUOTED VALUES, not just reg numbers.
 *
 * The citation verifier (ELE-1260) makes an invented regulation number
 * structurally unable to reach the user unflagged. This module does the same
 * for the highest-risk numeric claims: maximum Zs values attributed to
 * Table 41.3, and insulation-resistance test parameters from Table 64.1.
 * The weekly feedback analysis's #1 pattern is "incorrect regulation citation
 * or wrong table referenced" — this is the structural answer to it.
 *
 * Philosophy copied from the citation verifier: PRECISION FIRST, fail open.
 * A false "wrong figure" flag on a correct answer destroys exactly the trust
 * this exists to build, so a claim is only checked when the device, the value
 * and the table attribution are unambiguous, and anything hedged, measured or
 * rule-of-thumb (GN3 ×0.8 site values) is skipped entirely.
 */

// Table 41.3 — maximum Zs (Ω) for MCBs/RCBOs to BS EN 60898 etc., 0.4 s
// disconnection, 230 V, Cmin = 0.95. Mirrors MAX_ZS_VALUES in
// bs7671-unified-calculations.ts (kept separate: that module's tables feed
// calculations; these feed verification. If Table 41.3 ever changes, both
// change together with the amendment.)
const TABLE_41_3: Record<string, Record<number, number>> = {
  B: { 6: 7.28, 10: 4.37, 16: 2.73, 20: 2.19, 25: 1.75, 32: 1.37, 40: 1.09, 50: 0.87, 63: 0.69, 80: 0.55, 100: 0.44, 125: 0.35 },
  C: { 6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87, 32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17 },
  D: { 6: 1.82, 10: 1.09, 16: 0.68, 20: 0.55, 25: 0.44, 32: 0.34, 40: 0.27, 50: 0.22, 63: 0.17, 80: 0.14, 100: 0.11, 125: 0.09 },
};

// Type D only — 5 s disconnection variant (Reg 411.3.2.3 applications).
const TABLE_41_3_5S: Record<number, number> = {
  6: 3.64, 10: 2.19, 16: 1.37, 20: 1.09, 25: 0.87, 32: 0.68, 40: 0.55, 50: 0.44, 63: 0.35, 80: 0.27, 100: 0.22, 125: 0.17,
};

export interface FigureIssue {
  /** Human-readable description of the mismatch, ready to show the user. */
  message: string;
}

export interface FigureCheckResult {
  /** Number of figure claims that were checkable at all. */
  checked: number;
  issues: FigureIssue[];
  clean: boolean;
}

/** Two-decimal tolerance — the tables publish two decimals. */
function matches(claimed: number, expected: number): boolean {
  return Math.abs(claimed - expected) < 0.005;
}

/**
 * Verify max-Zs claims of the shape "…Type B 32 A … 1.37 Ω … Table 41.3…"
 * within a single sentence. Requirements for a claim to be CHECKED:
 *   - a device type+rating (B/C/D + a rating that exists in the table)
 *   - a value in Ω
 *   - the words "max"/"maximum"/"limit" or an explicit Table 41.3 attribution
 * Requirements to be SKIPPED even then (precision guards):
 *   - sentence mentions 0.8 / 80% / rule of thumb / measured / on site
 *     (GN3 site-comparison values are deliberately below Table 41.3)
 *   - sentence mentions 5 s AND the device is B or C (no such table exists;
 *     that error is caught as its own issue)
 */
function checkZsClaims(text: string): { checked: number; issues: FigureIssue[] } {
  const issues: FigureIssue[] = [];
  let checked = 0;

  // Sentence-ish spans: split on newline and sentence enders.
  const spans = text.split(/(?<=[.!?])\s+|\n+/);
  for (const span of spans) {
    if (!/table\s*41\.3|max(?:imum)?\s+zs|zs\s+limit|max\s+permitted/i.test(span)) continue;
    if (/0\.8|80\s*%|rule of thumb|measured|site|cold/i.test(span)) continue;

    // Three phrasings: "Type B 32 A", "32 A Type B", "B32".
    const device = span.match(
      /\btype\s*([BCD])\s*,?\s*(\d{1,3})\s*A\b|\b(\d{1,3})\s*A\s*type\s*([BCD])\b|\b([BCD])(\d{1,3})\b/i
    );
    if (!device) continue;
    const type = (device[1] || device[4] || device[5] || '').toUpperCase();
    const rating = parseInt(device[2] || device[3] || device[6] || '', 10);
    if (!TABLE_41_3[type] || !(rating in TABLE_41_3[type])) continue;

    // No \b after Ω — it is a non-word character, so a boundary there
    // never exists and the whole pattern silently matched nothing.
    const value = span.match(/(\d+(?:\.\d+)?)\s*(?:Ω|ohms?)(?![\w])/i);
    if (!value) continue;
    const claimed = parseFloat(value[1]);

    const is5s = /\b5\s*s\b|5\s*seconds/i.test(span);
    checked += 1;

    if (is5s && type !== 'D') {
      // Types B and C have no 5 s column in Table 41.3 — quoting one is
      // itself the error, whatever the number.
      issues.push({
        message: `Table 41.3 has no 5 s value for a Type ${type} device — 5 s figures exist for Type D only (Reg 411.3.2.3 applications).`,
      });
      continue;
    }

    const expected = is5s && type === 'D' ? TABLE_41_3_5S[rating] : TABLE_41_3[type][rating];
    if (expected !== undefined && !matches(claimed, expected)) {
      issues.push({
        message: `Table 41.3 gives ${expected} Ω for a Type ${type} ${rating} A device${is5s ? ' (5 s)' : ''}, not ${claimed} Ω.`,
      });
    }
  }
  return { checked, issues };
}

/**
 * Verify insulation-resistance test parameters against Table 64.1:
 *   SELV/PELV: 250 V dc, ≥ 0.5 MΩ · up to 500 V (incl. 230/400 V): 500 V dc,
 *   ≥ 1 MΩ · above 500 V: 1000 V dc, ≥ 1 MΩ.
 * Only the canonical LV claim is checked (500 V / 1 MΩ family) — and only
 * when the span explicitly attributes it to Table 64.1 or calls it the
 * minimum, so advice like "expect hundreds of MΩ on a new install" is never
 * flagged.
 */
function checkIrClaims(text: string): { checked: number; issues: FigureIssue[] } {
  const issues: FigureIssue[] = [];
  let checked = 0;
  const spans = text.split(/(?<=[.!?])\s+|\n+/);
  for (const span of spans) {
    if (!/table\s*64\.1|insulation resistance|ir test/i.test(span)) continue;
    if (/selv|pelv|above\s*500|over\s*500/i.test(span)) continue; // other rows

    // Test voltage claim for standard LV circuits.
    const tv = span.match(/test voltage[^.]{0,40}?\b(\d{3,4})\s*v\b/i);
    if (tv && /230|400|low voltage|standard/i.test(span)) {
      checked += 1;
      if (parseInt(tv[1], 10) !== 500) {
        issues.push({
          message: `Table 64.1 gives a 500 V dc test voltage for circuits up to 500 V, not ${tv[1]} V.`,
        });
      }
    }

    // Minimum IR claim.
    const min = span.match(/(?:minimum|at least|≥|floor)[^.]{0,30}?(\d+(?:\.\d+)?)\s*MΩ/i);
    if (min && /table\s*64\.1|minimum|limit/i.test(span)) {
      checked += 1;
      if (!matches(parseFloat(min[1]), 1)) {
        issues.push({
          message: `Table 64.1 sets the minimum insulation resistance at 1 MΩ for circuits up to 500 V, not ${min[1]} MΩ.`,
        });
      }
    }
  }
  return { checked, issues };
}

/** Pure text check — no DB, no network; safe to run on every answer. */
export function verifyFigures(text: string): FigureCheckResult {
  const zs = checkZsClaims(text);
  const ir = checkIrClaims(text);
  const issues = [...zs.issues, ...ir.issues];
  return {
    checked: zs.checked + ir.checked,
    issues,
    clean: issues.length === 0,
  };
}
