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
 *
 * ELE-1484 added a fourth: not every row on a schedule is a circuit. An
 * incoming RCD, an SPD or a main switch protects several ways and occupies
 * none, but the table forced a sequential number onto it anyway — so an
 * "RCD 80A 30mA" row printed as circuit 7 next to the cooker, also on 7.
 * Those rows carry `isDeviceRow` and sit outside numbering entirely.
 */

/** A circuit number may be a plain way ("5"), a 3P span ("1-3") or a phase-group row ("4.1"). */
const NUMBER_TOKEN = /(\d+(?:\.\d+)?(?:\s*-\s*\d+)?)/;

/** Printed in the circuit-number column for a row that is not a circuit. */
export const DEVICE_ROW_NUMBER = '—';

/**
 * What an electrician types in the way column to say "this isn't a circuit".
 *
 * Any dash, or "n/a". Both are matched as the user types, so neither may be a
 * prefix of a legitimate way label — which is why a bare "0" is NOT here even
 * though it is the workaround electricians improvise. Two-digit way labels
 * ("01", "02") are common on commercial boards, and treating "0" as a trigger
 * would convert the row the instant the first key landed. A span starts with a
 * digit ("1-3"), so a leading dash is unambiguous.
 */
const NOT_A_CIRCUIT_INPUT = /^(?:[-–—]+|n\/?a)$/i;

/** True when the text entered in the way column means "no way number". */
export const meansNotACircuit = (raw: unknown): boolean =>
  NOT_A_CIRCUIT_INPUT.test(String(raw ?? '').trim());

/** True when the row records a device (RCD/SPD/main switch), not a circuit. */
export const isDeviceRow = (circuit: Pick<TestResult, 'isDeviceRow'>): boolean =>
  circuit.isDeviceRow === true;

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
    if (isDeviceRow(c)) continue; // an RCD/SPD holds no way, so reserves nothing
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
 * Blank numbers are ignored — an unfilled row is not yet a clash. Device rows
 * are ignored too: they print a dash, so two of them never collide.
 */
export const findDuplicateCircuitNumbers = (circuits: TestResult[]): DuplicateCircuitGroup[] => {
  const seen = new Map<string, DuplicateCircuitGroup>();
  for (const c of circuits) {
    if (isDeviceRow(c)) continue;
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

/** A label that is nothing but a way number — "1", "12", "4.1", "1-3". */
const BARE_NUMBER = /^\d+(?:\.\d+)?(?:\s*-\s*\d+)?$/;

/**
 * A short reference built around a way number — "Ct1", "C12", "DB/3".
 *
 * The prefix is capped at three letters and the number must end the string, so
 * prose never matches: "Bed 2 sockets" keeps its 2, which is a room number and
 * nothing to do with the way. "L1"/"L2"/"L3" are excluded outright — those are
 * phases, and bumping one would silently move a circuit onto another line.
 */
const NUMBER_WITH_PREFIX = /^(?!L[123]$)([A-Za-z]{0,3}[\s./-]?)(\d+(?:\.\d+)?(?:\s*-\s*\d+)?)$/i;

/**
 * Keep a hand-typed way label in step with the number that prints (ELE-1486).
 *
 * `isAutoDesignation` only covers labels we generated. A bare "7" — the most
 * natural thing to type into a column headed "Way" — is not auto, so renumber
 * used to leave it showing 7 while the certificate printed 8. The table and
 * the PDF disagreed, and nothing on screen moved to say so.
 *
 * Any label that is *only* a way number, with or without a short prefix, is
 * rewritten. The number is not checked against the old one: a label already
 * out of step is exactly the case this exists to repair, and `circuitNumber`
 * is invisible in the UI, so leaving it stale keeps the divergence hidden.
 * This runs only inside an explicit Renumber, where the user has asked for
 * numbers to change and a visible change is the point.
 *
 * Returns null when the label should be left exactly as it is.
 */
const relabelForNewNumber = (designation: unknown, newNumber: string): string | null => {
  const label = String(designation ?? '').trim();
  if (!label) return null;

  if (BARE_NUMBER.test(label)) return newNumber;

  const m = label.match(NUMBER_WITH_PREFIX);
  return m ? `${m[1]}${newNumber}` : null;
};

/**
 * Renumber a circuit onto a specific way, keeping a hand-typed label intact.
 * `phaseSeq` > 0 marks the row as part of an L1/L2/L3 group sharing one way,
 * which is written as "4.1" / "4.2" / "4.3".
 */
/**
 * True when a board carries more than one line, so a phase suffix on a way
 * actually tells the reader something.
 *
 * On a domestic single-phase board every circuit is L1, so "Way 4 L1" repeats
 * the same non-fact on every row — the suffix only earns its place where there
 * is another line it could have been. Decided per BOARD rather than per circuit
 * so a label cannot appear and disappear while a single circuit is edited; it
 * flips only when a second phase is genuinely introduced, which is the moment
 * the distinction starts to matter.
 */
export const boardIsMultiPhase = (boardCircuits: TestResult[]): boolean =>
  boardCircuits.some(
    (c) =>
      c.phaseAssignment === 'L2' ||
      c.phaseAssignment === 'L3' ||
      c.phaseAssignment === 'L1,L2,L3' ||
      c.phaseType === '3P'
  );

export const applyCircuitNumber = (
  circuit: TestResult,
  wayNum: number,
  phaseSeq = 0,
  /**
   * Whether to append the phase to the auto-generated designation. Defaults to
   * true so existing callers are unchanged; `renumberCircuits` works it out per
   * board and passes the answer in.
   */
  showPhase = true
): TestResult => {
  // A device row holds no way, so there is nothing to apply. Without this a
  // duplicated RCD row would keep the flag but be stamped with a real number —
  // printing "13" while sitting outside clash detection, which is how it would
  // silently collide with the actual way 13.
  if (isDeviceRow(circuit)) return circuit;

  const next: TestResult = {
    ...circuit,
    circuitNumber: phaseSeq > 0 ? `${wayNum}.${phaseSeq}` : String(wayNum),
    wayNumber: wayNum,
  };
  if (isAutoDesignation(circuit.circuitDesignation)) {
    const phase =
      showPhase && circuit.phaseAssignment && circuit.phaseAssignment !== 'L1,L2,L3'
        ? ` ${circuit.phaseAssignment}`
        : '';
    next.circuitDesignation = `Way ${wayNum}${phase}`;
  } else {
    // ELE-1486 — a hand-typed label that carries the way number has to move
    // with it, or the table shows one number and the certificate prints
    // another. Genuine prose ("Kitchen ring") is left untouched.
    const relabelled = relabelForNewNumber(circuit.circuitDesignation, next.circuitNumber);
    if (relabelled !== null) next.circuitDesignation = relabelled;
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

  // Worked out once per board over the whole set, before any labelling — a
  // single-phase board drops the "L1" that would otherwise sit on every row.
  const multiPhaseByBoard = new Map<string, boolean>();
  circuits.forEach((c) => {
    const id = c.boardId || MAIN_BOARD_ID;
    if (!multiPhaseByBoard.has(id)) {
      multiPhaseByBoard.set(
        id,
        boardIsMultiPhase(circuits.filter((x) => (x.boardId || MAIN_BOARD_ID) === id))
      );
    }
  });

  return circuits.map((circuit) => {
    // A device row keeps its dash and its position, and — crucially — does not
    // advance the counter. Resequencing through it would shunt every real
    // circuit below it down one way.
    if (isDeviceRow(circuit)) return circuit;

    const boardId = circuit.boardId || MAIN_BOARD_ID;
    const showPhase = multiPhaseByBoard.get(boardId) ?? true;
    const phase = circuit.phaseAssignment;
    const continuesGroup =
      (phase === 'L2' || phase === 'L3') && groupWayByBoard.has(boardId);

    if (continuesGroup) {
      const way = groupWayByBoard.get(boardId) as number;
      const seq = (phaseSeqByBoard.get(boardId) ?? 1) + 1;
      phaseSeqByBoard.set(boardId, seq);
      return applyCircuitNumber(circuit, way, seq, showPhase);
    }

    const way = (nextWayByBoard.get(boardId) ?? 0) + 1;
    nextWayByBoard.set(boardId, way);

    if (phase === 'L1') {
      groupWayByBoard.set(boardId, way);
      phaseSeqByBoard.set(boardId, 1);
      return applyCircuitNumber(circuit, way, 1, showPhase);
    }

    groupWayByBoard.delete(boardId);
    phaseSeqByBoard.delete(boardId);
    return applyCircuitNumber(circuit, way, 0, showPhase);
  });
};
