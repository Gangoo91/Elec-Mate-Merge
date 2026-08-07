/**
 * Find & replace across the schedule of tests — ELE-1493.
 *
 * Sweeping one value across a 23-circuit board is a daily job. Bulk fill can
 * only *set* a column to a value; it cannot say "wherever this reads LIM, make
 * it N/A", which is the actual task when a limitation is lifted or a meter is
 * swapped.
 *
 * ## What may be searched, and what may not
 *
 * The searchable set is derived from the fields the schedule's own cell
 * components read and write. Three groups are deliberately excluded:
 *
 * 1. **Structural fields** — `circuitNumber`, `circuitDesignation`, `wayNumber`,
 *    `boardId`, `isSpare`, `isDeviceRow`. Rewriting a circuit number by text
 *    match is precisely the failure in ELE-1486, where the printed number and
 *    the visible way label silently diverged. Renumbering has its own tool that
 *    keeps the two in step.
 *
 * 2. **Legacy duplicates** — `cableSize`, `type`, `protectiveDevice`,
 *    `circuitType`, `insulationResistance`, `insulationNeutralEarth`,
 *    `ringContinuityNeutral`, `pfc*`. These shadow a live field. Writing one
 *    without the other is how a preset once produced a ring the ring detector
 *    could not recognise.
 *
 * 3. **`r2` — the field, not the column.** The schedule's R₂ column looks like
 *    it should map to `r2`, and it does not: `ContinuityCells` binds it to
 *    `ringContinuityLive` ("temporary field", per the comment there). So `r2`
 *    is excluded — nothing writes it, and a replace would edit something the
 *    electrician cannot see — while `ringContinuityLive` IS searchable under
 *    the label the grid shows. Get this backwards and find & replace silently
 *    misses every R₂ on the board.
 *
 * ## Why the count comes first
 *
 * The whole point is to change many rows at once, which is exactly what makes
 * it dangerous. `findMatches` is pure and runs on every keystroke, so the
 * dialog can state precisely what will change *before* anything does.
 */
import { TestResult } from '@/types/testResult';
import { isSpareCircuit } from '@/utils/spareWays';
import { isDeviceRow } from '@/utils/circuitNumbering';

export interface SearchableColumn {
  field: keyof TestResult;
  /** Matches the schedule header, so the dropdown reads like the grid. */
  label: string;
  group: string;
}

/** Every column a replace may touch. Order mirrors the grid, left to right. */
export const SEARCHABLE_COLUMNS: SearchableColumn[] = [
  { field: 'circuitDescription', label: 'Description', group: 'Circuit details' },
  { field: 'typeOfWiring', label: 'Wiring type', group: 'Circuit details' },
  { field: 'referenceMethod', label: 'Ref method', group: 'Circuit details' },
  { field: 'pointsServed', label: 'Points', group: 'Circuit details' },

  { field: 'liveSize', label: 'Live mm²', group: 'Conductors' },
  { field: 'cpcSize', label: 'CPC mm²', group: 'Conductors' },

  { field: 'bsStandard', label: 'BS (EN)', group: 'Protective device' },
  { field: 'protectiveDeviceType', label: 'Device type', group: 'Protective device' },
  { field: 'protectiveDeviceCurve', label: 'Curve', group: 'Protective device' },
  { field: 'protectiveDeviceRating', label: 'Rating A', group: 'Protective device' },
  { field: 'protectiveDeviceKaRating', label: 'kA', group: 'Protective device' },
  { field: 'maxZs', label: 'Max Zs Ω', group: 'Protective device' },

  { field: 'rcdBsStandard', label: 'BS (EN)', group: 'RCD details' },
  { field: 'rcdType', label: 'Type', group: 'RCD details' },
  { field: 'rcdRating', label: 'IΔn mA', group: 'RCD details' },
  { field: 'rcdRatingA', label: 'Rating A', group: 'RCD details' },

  { field: 'ringR1', label: 'r₁ Ω', group: 'Continuity' },
  { field: 'ringRn', label: 'rₙ Ω', group: 'Continuity' },
  { field: 'ringR2', label: 'r₂ Ω', group: 'Continuity' },
  { field: 'r1r2', label: 'R₁+R₂ Ω', group: 'Continuity' },
  // The grid's R₂ column, which binds here rather than to `r2`.
  { field: 'ringContinuityLive', label: 'R₂ Ω', group: 'Continuity' },

  { field: 'insulationTestVoltage', label: 'Test voltage V', group: 'Insulation' },
  { field: 'insulationLiveNeutral', label: 'L-N MΩ', group: 'Insulation' },
  { field: 'insulationLiveEarth', label: 'L-E MΩ', group: 'Insulation' },

  { field: 'polarity', label: 'Polarity', group: 'Zs' },
  { field: 'zs', label: 'Zs Ω', group: 'Zs' },

  { field: 'rcdOneX', label: 'Disconnection ms', group: 'RCD tests' },
  { field: 'rcdTestButton', label: 'Test button', group: 'RCD tests' },

  { field: 'afddTest', label: 'AFDD', group: 'AFDD' },
  { field: 'functionalTesting', label: 'Functional', group: 'Functional' },
  { field: 'notes', label: 'Remarks', group: 'Notes' },
];

/**
 * The tokens that actually get swept.
 *
 * These are first-class values on our schedule (ELE-849), not free text, so
 * offering them as chips removes the most common typing and the case mistakes
 * that come with it.
 */
export const LIMITATION_TOKENS = ['LIM', 'N/A', 'N/V', '—'] as const;

export interface FindReplaceOptions {
  find: string;
  replace: string;
  /** Substring match. When false, only a whole-value match counts. */
  matchPartial: boolean;
  ignoreCase: boolean;
  /** Restrict to one column. `null` searches every searchable column. */
  field: keyof TestResult | null;
}

export interface FieldMatch {
  circuitId: string;
  field: keyof TestResult;
  label: string;
  before: string;
  after: string;
}

export interface MatchSummary {
  matches: FieldMatch[];
  /** Distinct circuits affected — the number an electrician thinks in. */
  circuitCount: number;
  /** Matches that sit on a spare way or a device row, reported not hidden. */
  onNonCircuitRows: number;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Apply the replacement to a single value, or return null when it does not match. */
export const replaceInValue = (
  value: string,
  { find, replace, matchPartial, ignoreCase }: FindReplaceOptions
): string | null => {
  if (!find) return null;
  const current = value ?? '';

  if (!matchPartial) {
    // Whole-value match. Trimmed, because a trailing space in a cell is not a
    // difference the electrician can see or intended to type.
    const a = current.trim();
    const b = find.trim();
    const same = ignoreCase ? a.toLowerCase() === b.toLowerCase() : a === b;
    return same ? replace : null;
  }

  const re = new RegExp(escapeRegExp(find), ignoreCase ? 'gi' : 'g');
  if (!re.test(current)) return null;
  return current.replace(new RegExp(escapeRegExp(find), ignoreCase ? 'gi' : 'g'), replace);
};

/**
 * Everything a replace would change, without changing anything.
 *
 * Empty values never match. "Replace nothing with N/A" would silently fill the
 * entire board, which is bulk fill's job and is not what anyone means by find.
 */
export const findMatches = (
  circuits: TestResult[],
  options: FindReplaceOptions
): MatchSummary => {
  const columns = options.field
    ? SEARCHABLE_COLUMNS.filter((c) => c.field === options.field)
    : SEARCHABLE_COLUMNS;

  const matches: FieldMatch[] = [];
  const circuitIds = new Set<string>();
  let onNonCircuitRows = 0;

  for (const circuit of circuits) {
    const isNonCircuit = isSpareCircuit(circuit) || isDeviceRow(circuit);
    for (const column of columns) {
      const before = String(circuit[column.field] ?? '');
      if (!before.trim()) continue;

      const after = replaceInValue(before, options);
      if (after === null || after === before) continue;

      matches.push({
        circuitId: circuit.id,
        field: column.field,
        label: column.label,
        before,
        after,
      });
      circuitIds.add(circuit.id);
      if (isNonCircuit) onNonCircuitRows += 1;
    }
  }

  return { matches, circuitCount: circuitIds.size, onNonCircuitRows };
};

/**
 * Produce the updated rows.
 *
 * Returns a whole new array so the caller can commit it in a single state
 * change — one save, and one thing to undo, rather than 23 separate writes.
 */
export const applyReplacements = (
  circuits: TestResult[],
  matches: FieldMatch[]
): TestResult[] => {
  if (!matches.length) return circuits;

  const byCircuit = new Map<string, FieldMatch[]>();
  for (const m of matches) {
    const list = byCircuit.get(m.circuitId);
    if (list) list.push(m);
    else byCircuit.set(m.circuitId, [m]);
  }

  return circuits.map((circuit) => {
    const changes = byCircuit.get(circuit.id);
    if (!changes) return circuit;
    const next = { ...circuit };
    for (const change of changes) {
      (next as Record<string, unknown>)[change.field as string] = change.after;
    }
    return next;
  });
};

/** "12 values across 8 circuits" — the sentence shown before committing. */
export const describeMatches = (summary: MatchSummary): string => {
  const { matches, circuitCount } = summary;
  if (!matches.length) return 'No matches';
  const v = `${matches.length} ${matches.length === 1 ? 'value' : 'values'}`;
  const c = `${circuitCount} ${circuitCount === 1 ? 'circuit' : 'circuits'}`;
  return `${v} across ${c}`;
};
