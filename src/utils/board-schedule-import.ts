/**
 * Maps a stored certificate (EICR / EIC / Minor Works) onto a board schedule,
 * so a schedule can be produced from work already recorded instead of retyped.
 *
 * Everything the schedule needs is already captured per circuit on a cert —
 * device, rating, cable size, Zs, RCD — which also means an imported schedule
 * fills the extended PDF columns that the manual form does not collect.
 */

import type { BoardCircuit, BoardScheduleData } from './generate-board-schedule-pdf';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Json = any;

/*
 * 🔴 Only ever returns text that came from a PRIMITIVE. An object reaching
 * `String()` yields the literal "[object Object]", which then flows into React
 * state, the form inputs and the PDF — it survives every downstream guard
 * because by that point it IS a string. Reject non-primitives at the source.
 */
const str = (v: unknown): string => {
  if (v === null || v === undefined) return '';
  const t = typeof v;
  if (t === 'string') return (v as string).trim();
  if (t === 'number' || t === 'boolean') return String(v);
  return '';
};

/** Boolean-ish: these are stored as the STRINGS "true"/"false", not booleans. */
const isTrue = (v: unknown): boolean => str(v).toLowerCase() === 'true';

/**
 * 🔴 `phases` is recorded eight different ways across live certificates:
 * "1", "single", "Single", "three", "3", "1-phase-2-wire", "2" and "".
 * Anything that is not clearly three-phase is treated as single — the safer
 * default, because a single-phase schedule printed for a three-phase board is
 * obviously wrong to the person holding it, whereas the reverse silently
 * invents two phases that do not exist.
 */
export function isThreePhaseCert(data: Json): boolean {
  const p = str(data?.phases).toLowerCase();
  return p === 'three' || p === '3' || p.startsWith('3-phase') || p.startsWith('three');
}

/**
 * SPD is spread over spdT1/spdT2/spdT3 (boolean strings), spdNA, and
 * spdOperationalStatus. Composed into something readable rather than dumped
 * raw — "false" printed on a client document would be nonsense.
 */
export function describeSpd(board: Json): string {
  if (isTrue(board?.spdNA)) return 'Not applicable';
  const types = [
    isTrue(board?.spdT1) && 'Type 1',
    isTrue(board?.spdT2) && 'Type 2',
    isTrue(board?.spdT3) && 'Type 3',
  ].filter(Boolean) as string[];
  if (types.length === 0) return '';
  const operational = isTrue(board?.spdOperationalStatus);
  return `${types.join(' + ')} — ${operational ? 'operational' : 'not confirmed operational'}`;
}

/**
 * Device reads as type + curve, e.g. "RCBO Type B".
 *
 * ⚠️ Two bugs lived here, both provable against live certs:
 *
 *   1. The de-duplication test was a plain substring check, so "RCBO" + curve
 *      "B" matched (`"rcbo".includes("b")`) and the curve was silently DROPPED
 *      from every RCBO on the board. Curves are single letters — B, C, D — so
 *      a substring test hits constantly. It now looks for the curve as a
 *      standalone token ("Type B", or "B" on its own), never as a letter
 *      buried inside a word.
 *   2. With no device type, it returned the bare curve — a schedule column
 *      reading just "B" is meaningless. A curve with nothing to qualify is
 *      dropped, and `bsStandard` ("RCBO (BS EN 61009)") is used instead.
 */
function describeDevice(c: Json): string {
  const type = str(c?.protectiveDeviceType);
  const curve = str(c?.protectiveDeviceCurve);

  if (!type) {
    // A curve alone says nothing; the BS standard names the device properly.
    return str(c?.bsStandard);
  }
  if (!curve) return type;

  const alreadyStated = new RegExp(`(^|\\s)(type\\s+)?${curve}(\\s|$)`, 'i').test(type);
  return alreadyStated ? type : `${type} Type ${curve}`;
}

/** "L1" | "L2" | "L3", from the circuit record only — never inferred. */
function readPhase(c: Json): string {
  const direct = str(c?.phaseAssignment).toUpperCase();
  if (/^L[123]$/.test(direct)) return direct;
  // Falls back to the designation, which reads e.g. "Way 10 L1".
  const m = str(c?.circuitDesignation).toUpperCase().match(/\bL([123])\b/);
  return m ? `L${m[1]}` : '';
}

export interface CertBoardOption {
  id: string;
  label: string;
  circuitCount: number;
}

/** Boards on a cert, with how many circuits each holds. */
export function listBoardsOnCert(data: Json): CertBoardOption[] {
  const boards: Json[] = Array.isArray(data?.distributionBoards) ? data.distributionBoards : [];
  const circuits: Json[] = Array.isArray(data?.scheduleOfTests) ? data.scheduleOfTests : [];

  if (boards.length === 0) {
    // Certs can carry circuits with no board record at all — still importable.
    return circuits.length
      ? [{ id: '', label: 'All circuits', circuitCount: circuits.length }]
      : [];
  }

  return boards.map((b) => {
    const id = str(b?.id);
    const label = str(b?.reference) || str(b?.name) || 'Board';
    /*
     * ⚠️ A single-board cert often leaves `boardId` unset on its circuits, so
     * matching strictly on boardId would import ZERO circuits. When there is
     * only one board, everything belongs to it.
     */
    const count =
      boards.length === 1
        ? circuits.length
        : circuits.filter((c) => str(c?.boardId) === id).length;
    return { id, label, circuitCount: count };
  });
}

/**
 * Build the board-schedule form state from a cert + chosen board.
 * Returns the data and whether the cert is three-phase, since the page holds
 * phase mode separately.
 */
export function buildScheduleFromCert(
  data: Json,
  boardId: string
): { board: BoardScheduleData; threePhase: boolean } {
  const boards: Json[] = Array.isArray(data?.distributionBoards) ? data.distributionBoards : [];
  const allCircuits: Json[] = Array.isArray(data?.scheduleOfTests) ? data.scheduleOfTests : [];

  const board: Json =
    boards.find((b) => str(b?.id) === boardId) ?? boards[0] ?? {};

  const circuitRows =
    boards.length <= 1
      ? allCircuits
      : allCircuits.filter((c) => str(c?.boardId) === str(board?.id));

  const threePhase = isThreePhaseCert(data);

  const circuits: BoardCircuit[] = circuitRows.map((c) => ({
    id: crypto.randomUUID(),
    // `wayNumber` is stored as a NUMBER, `circuitNumber` as a string — str()
    // handles both, and the string is authoritative where present.
    circuitNumber: str(c?.circuitNumber) || str(c?.wayNumber),
    description: str(c?.circuitDescription) || str(c?.circuitDesignation),
    rating: str(c?.protectiveDeviceRating),
    type: describeDevice(c),
    cableSize: str(c?.liveSize),
    zs: str(c?.zs),
    rcdRating: str(c?.rcdRating),
    /*
     * Certificates DO record the phase — `phaseAssignment` holds "L1"/"L2"/"L3"
     * on every circuit, and `circuitDesignation` repeats it ("Way 10 L1").
     * Only ever taken from the record, never inferred: guessing a rotation
     * would put circuits on conductors they are not connected to, on a
     * document someone works from. Single-phase boards drop it entirely —
     * every conductor is brown, so labelling each row is noise.
     */
    phase: threePhase ? (readPhase(c) || undefined) : undefined,
  }));

  return {
    threePhase,
    board: {
      boardRef: str(board?.reference) || str(board?.name) || str(data?.boardSize) || '',
      // Board LOCATION is where the board is ("Plant room"), not the site
      // address — those are different facts and conflating them put a postal
      // address in the location column.
      location: str(board?.location),
      mainSwitchRating: str(board?.mainSwitchRating) || str(data?.mainSwitchRating),
      rcdDetails: '',
      /*
       * The client and site come across too — a schedule imported from a cert
       * is for the same job, and retyping them is exactly the work this
       * feature exists to remove. `clientEmail` is taken where the cert holds
       * one so the send dialog can prefill it.
       */
      clientName: str(data?.clientName),
      clientEmail: str(data?.clientEmail) || str(data?.email),
      installationAddress: str(data?.installationAddress) || str(data?.propertyAddress),
      boardMake: [str(board?.make), str(board?.type)].filter(Boolean).join(' '),
      totalWays: str(board?.totalWays),
      spd: describeSpd(board),
      fedFrom: '',
      notes: '',
      companyName: '',
      circuits: circuits.length
        ? circuits
        : [{ id: crypto.randomUUID(), circuitNumber: '1', description: '', rating: '', type: 'MCB' }],
    },
  };
}
