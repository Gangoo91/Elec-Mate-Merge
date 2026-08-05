import { TestResult } from '@/types/testResult';
import { MAIN_BOARD_ID } from '@/types/distributionBoard';

/**
 * Circuit numbering for the schedule of test results (ELE-1475).
 *
 * Three defects converged to put duplicate circuit numbers on issued EICRs:
 *
 * 1. `duplicateTestResult` cloned a circuit and reassigned only `id`, so the
 *    copy inherited the source's `circuitNumber` and `wayNumber`.
 * 2. Every "next number" was `circuits.length + 1`, which collides the moment
 *    a circuit is deleted (delete way 3 of 6 and the next add is 6 again).
 * 3. The circuit-number column edits `circuitDesignation`, but the PDF prints
 *    `circuitNumber`. The sync ran one way only, so the field the customer
 *    sees was invisible and unfixable from the table.
 *
 * Numbers are scoped PER BOARD — DB1 way 1 and DB2 way 1 are both legitimate.
 */

/** A circuit number may be a plain way ("5"), a 3P span ("1-3") or a phase-group row ("4.1"). */
const NUMBER_TOKEN = /(\d+(?:\.\d+)?(?:\s*-\s*\d+)?)/;

/**
 * The integer way a circuit occupies, for max/collision purposes.
 * "5" → 5 · "4.1" → 4 · "1-3" → 3 (upper bound, so the span is not reused).
 */
export const parseCircuitNumberBase = (raw: unknown): number | null => {
  const s = String(raw ?? '').trim();
  if (!s) return null;
  const upper = s.includes('-') ? (s.split('-').pop() ?? '') : s;
  const n = parseInt(upper.split('.')[0], 10);
  return Number.isFinite(n) ? n : null;
};

/** Circuits belonging to one board, treating a missing boardId as the main CU. */
const circuitsOnBoard = (circuits: TestResult[], boardId: string): TestResult[] =>
  circuits.filter((c) => (c.boardId || MAIN_BOARD_ID) === boardId);

/**
 * Next free way number on a board — highest in use plus one.
 *
 * Deliberately NOT `length + 1`: that reuses numbers after a deletion and was
 * one of the routes to duplicates. Considers `wayNumber` too, so a row whose
 * `circuitNumber` was left blank still reserves its way.
 */
export const getNextCircuitNumber = (circuits: TestResult[], boardId: string): number => {
  let max = 0;
  for (const c of circuitsOnBoard(circuits, boardId)) {
    const fromNumber = parseCircuitNumberBase(c.circuitNumber);
    if (fromNumber !== null && fromNumber > max) max = fromNumber;
    const way = typeof c.wayNumber === 'number' ? c.wayNumber : null;
    if (way !== null && Number.isFinite(way) && way > max) max = way;
  }
  return max + 1;
};

/**
 * Pull the printable circuit number out of a designation the electrician typed.
 * "Ct1" → "1" · "Way 5 L1" → "5" · "C12" → "12" · "1-3" → "1-3" · "4.1" → "4.1"
 *
 * Returns null when there is no number in the text at all, so the caller leaves
 * the existing value alone rather than clobbering it with something worse.
 */
export const deriveCircuitNumber = (designation: unknown): string | null => {
  const s = String(designation ?? '').trim();
  if (!s) return null;
  const m = s.match(NUMBER_TOKEN);
  return m ? m[1].replace(/\s+/g, '') : null;
};

/** One board's worth of clashing rows. */
export interface DuplicateCircuitGroup {
  boardId: string;
  circuitNumber: string;
  circuitIds: string[];
}

/**
 * Circuit numbers used more than once on the same board.
 * Blank numbers are ignored — an unfilled row is not yet a clash.
 */
export const findDuplicateCircuitNumbers = (circuits: TestResult[]): DuplicateCircuitGroup[] => {
  const seen = new Map<string, DuplicateCircuitGroup>();
  for (const c of circuits) {
    const num = String(c.circuitNumber ?? '').trim();
    if (!num) continue;
    const boardId = c.boardId || MAIN_BOARD_ID;
    const key = `${boardId}::${num}`;
    const existing = seen.get(key);
    if (existing) existing.circuitIds.push(c.id);
    else seen.set(key, { boardId, circuitNumber: num, circuitIds: [c.id] });
  }
  return [...seen.values()].filter((g) => g.circuitIds.length > 1);
};

/** Total rows that would be renumbered — the count worth showing the user. */
export const countDuplicateCircuits = (circuits: TestResult[]): number =>
  findDuplicateCircuitNumbers(circuits).reduce((n, g) => n + g.circuitIds.length - 1, 0);

/** Designations we generated ourselves, and may therefore safely regenerate. */
const AUTO_DESIGNATION = /^(?:way\s*\d+(?:\s*L[123])?|C\d+(?:\.\d+)?)$/i;

/** True when the label looks auto-generated rather than typed by the electrician. */
export const isAutoDesignation = (designation: unknown): boolean => {
  const s = String(designation ?? '').trim();
  return !s || AUTO_DESIGNATION.test(s);
};

/**
 * Renumber a circuit onto a specific way, keeping a hand-typed label intact.
 * `phaseSeq` > 0 marks the row as part of an L1/L2/L3 group sharing one way,
 * which is written as "4.1" / "4.2" / "4.3".
 */
export const applyCircuitNumber = (
  circuit: TestResult,
  wayNum: number,
  phaseSeq = 0
): TestResult => {
  const next: TestResult = {
    ...circuit,
    circuitNumber: phaseSeq > 0 ? `${wayNum}.${phaseSeq}` : String(wayNum),
    wayNumber: wayNum,
  };
  if (isAutoDesignation(circuit.circuitDesignation)) {
    const phase =
      circuit.phaseAssignment && circuit.phaseAssignment !== 'L1,L2,L3'
        ? ` ${circuit.phaseAssignment}`
        : '';
    next.circuitDesignation = `Way ${wayNum}${phase}`;
  }
  return next;
};

/**
 * Repair a schedule by resequencing each board 1..n in the order the rows
 * already appear.
 *
 * Moving only the clashing rows would satisfy uniqueness but leave a cert
 * reading 1, 15, 16, 17, 2, 3 — technically valid and useless to anyone
 * reading it. On this schedule row order IS way order, so a clean resequence
 * is what makes the document right.
 *
 * Row order is never changed — an EICR's schedule order is the electrician's.
 * Hand-typed labels ("Ct1") are left alone; only labels we generated are
 * rewritten. Consecutive L1/L2/L3 rows keep sharing a single way.
 *
 * Returns the original array untouched when there is nothing to fix, so
 * callers can skip a needless state update.
 */
export const renumberDuplicateCircuits = (circuits: TestResult[]): TestResult[] => {
  if (findDuplicateCircuitNumbers(circuits).length === 0) return circuits;

  const nextWayByBoard = new Map<string, number>();
  const groupWayByBoard = new Map<string, number>();
  const phaseSeqByBoard = new Map<string, number>();

  return circuits.map((circuit) => {
    const boardId = circuit.boardId || MAIN_BOARD_ID;
    const phase = circuit.phaseAssignment;
    const continuesGroup =
      (phase === 'L2' || phase === 'L3') && groupWayByBoard.has(boardId);

    if (continuesGroup) {
      const way = groupWayByBoard.get(boardId) as number;
      const seq = (phaseSeqByBoard.get(boardId) ?? 1) + 1;
      phaseSeqByBoard.set(boardId, seq);
      return applyCircuitNumber(circuit, way, seq);
    }

    const way = (nextWayByBoard.get(boardId) ?? 0) + 1;
    nextWayByBoard.set(boardId, way);

    if (phase === 'L1') {
      groupWayByBoard.set(boardId, way);
      phaseSeqByBoard.set(boardId, 1);
      return applyCircuitNumber(circuit, way, 1);
    }

    groupWayByBoard.delete(boardId);
    phaseSeqByBoard.delete(boardId);
    return applyCircuitNumber(circuit, way, 0);
  });
};
