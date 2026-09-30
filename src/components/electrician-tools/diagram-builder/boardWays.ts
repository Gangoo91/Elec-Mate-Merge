/**
 * Board numbering (30 Sep 2026).
 *
 * The design names circuits by family — S1 for a ring, L2 for lighting — and
 * the engine still works in those. A board is not numbered that way: the
 * circuit number is the way number marked on the board (GN3 9th Ed, Ch 7).
 * Everything the electrician sees — the plan tags, the board schedule, the
 * single-line diagram and the PDF — shows the way number from here.
 *
 *  • Single-phase board: ways 1, 2, 3… in board order.
 *  • Three-phase board: single-phase circuits are spread over L1/L2/L3 by
 *    connected load and marked by way and phase — 1L1, 1L2, 1L3, 2L1… (GN3:
 *    "the compartment number with the phase appended, eg 5L1"). A submain to
 *    a sub-board takes a whole way, marked TPN.
 *  • More than one board: every number carries its board — CU/3, DB2/1.
 *  • Fire detection zones are panel zones, not ways: Zone 1, Zone 2…
 */
import { circuitRank, connectedLoadW, type DesignedCircuit } from './circuitDesign';

export type Supply = 'single' | 'three';
export type Phase = 'L1' | 'L2' | 'L3' | 'TPN';

export interface Way {
  /** The design's own ref (S1, L2…), which the engine keeps using. */
  ref: string;
  /** "CU", or the sub-board's name ("DB2"). */
  board: string;
  /** Way number on its board (zones: the zone number). */
  way: number;
  /** Three-phase boards only. */
  phase?: Phase;
  /** On its own board: "3", "2L1", "1 TPN", "Zone 1". */
  label: string;
  /** Unambiguous across boards: "3" on a one-board job, else "CU/3". */
  full: string;
}

const PHASES = ['L1', 'L2', 'L3'] as const;

/** Number every circuit. The order within a board is the design's board order. */
export function wayMap(circuits: DesignedCircuit[], supply: Supply = 'single'): Map<string, Way> {
  const out = new Map<string, Way>();
  const boards = [...new Set(circuits.map((c) => c.board ?? 'CU'))].sort((a, b) =>
    a === 'CU' ? -1 : b === 'CU' ? 1 : a.localeCompare(b, undefined, { numeric: true })
  );
  const multi = boards.length > 1;
  const full = (board: string, label: string) => (multi ? `${board}/${label}` : label);

  let zone = 0;
  circuits
    .filter((c) => c.kind === 'fire-zone')
    .sort((a, b) => circuitRank(a.ref) - circuitRank(b.ref))
    .forEach((c) => {
      zone += 1;
      const label = `Zone ${zone}`;
      out.set(c.ref, { ref: c.ref, board: 'Panel', way: zone, label, full: label });
    });

  // A sub-board's own load, for balancing its submain against the rest.
  const boardLoad = (name: string) =>
    circuits
      .filter((c) => (c.board ?? 'CU') === name && c.kind !== 'fire-zone')
      .reduce((a, c) => a + connectedLoadW(c), 0);
  const loadOf = (c: DesignedCircuit) =>
    c.kind === 'submain' ? boardLoad(c.ref) : connectedLoadW(c);

  for (const board of boards) {
    // Board order — or where the electrician has moved a way, theirs.
    const ways = circuits
      .filter((c) => (c.board ?? 'CU') === board && c.kind !== 'fire-zone')
      .sort(
        (a, b) =>
          (a.pin ?? Infinity) - (b.pin ?? Infinity) || circuitRank(a.ref) - circuitRank(b.ref)
      );

    if (supply === 'single') {
      ways.forEach((c, i) => {
        const label = `${i + 1}`;
        out.set(c.ref, { ref: c.ref, board, way: i + 1, label, full: full(board, label) });
      });
      continue;
    }

    // Three-phase: submains take whole TPN ways first, then single-phase
    // circuits go to the least-loaded phase, heaviest first.
    let way = 0;
    ways
      .filter((c) => c.kind === 'submain')
      .forEach((c) => {
        way += 1;
        const label = `${way} TPN`;
        out.set(c.ref, { ref: c.ref, board, way, phase: 'TPN', label, full: full(board, label) });
      });
    const singles = ways.filter((c) => c.kind !== 'submain');
    // Heaviest first, each to the phase with the fewest circuits (the least
    // loaded of those): phases stay within one circuit of each other and the
    // load spreads. By load alone, a house's cooker and EV took L1 and L2 and
    // everything else stacked up L3 to way 7 with a dozen spares.
    const loads = [0, 0, 0];
    const counts = [0, 0, 0];
    const phaseOf = new Map<string, number>();
    [...singles]
      .sort((a, b) => loadOf(b) - loadOf(a) || circuitRank(a.ref) - circuitRank(b.ref))
      .forEach((c) => {
        const fewest = Math.min(...counts);
        let p = -1;
        [0, 1, 2].forEach((q) => {
          if (counts[q] === fewest && (p < 0 || loads[q] < loads[p])) p = q;
        });
        loads[p] += loadOf(c);
        counts[p] += 1;
        phaseOf.set(c.ref, p);
      });
    const nth = [0, 0, 0];
    singles.forEach((c) => {
      const p = phaseOf.get(c.ref)!;
      nth[p] += 1;
      const n = way + nth[p];
      const label = `${n}${PHASES[p]}`;
      out.set(c.ref, {
        ref: c.ref,
        board,
        way: n,
        phase: PHASES[p],
        label,
        full: full(board, label),
      });
    });
  }
  return out;
}

/** Per-phase connected load on each board of a three-phase supply, in watts. */
export function phaseLoads(
  circuits: DesignedCircuit[],
  ways: Map<string, Way>
): Map<string, Record<'L1' | 'L2' | 'L3', number>> {
  const out = new Map<string, Record<'L1' | 'L2' | 'L3', number>>();
  circuits.forEach((c) => {
    const w = ways.get(c.ref);
    if (!w || !w.phase || w.phase === 'TPN') return;
    const row = out.get(w.board) ?? { L1: 0, L2: 0, L3: 0 };
    row[w.phase] += connectedLoadW(c);
    out.set(w.board, row);
  });
  return out;
}

/** Sort key: board, then way, then phase. */
export function wayOrder(w?: Way): number {
  if (!w) return 1e12;
  const phase = w.phase ? ['TPN', 'L1', 'L2', 'L3'].indexOf(w.phase) : 0;
  return boardRank(w.board) * 1e4 + w.way * 10 + phase;
}

/**
 * CU first, then sub-boards in number order — by the whole name, so DB2 on
 * sheet 1 and DB2 on sheet 2 ("DB2 · 2") are two boards, not interleaved.
 */
function boardRank(board: string): number {
  if (board === 'CU') return 0;
  if (board === 'Panel') return 9e5;
  const m = /^DB(\d+)(?: · (\d+|hand-drawn))?$/.exec(board);
  if (!m) return 8e5;
  return Number(m[1]) * 1000 + (m[2] === 'hand-drawn' ? 999 : Number(m[2] ?? 0));
}

// ── Board notation ───────────────────────────────────────────────────────────

export interface Notation {
  /** "RCBO", "AFDD/RCBO", "MCB" — or "TBC" where the design leaves it open. */
  device: string;
  /** "B32", "B6", "32 A" — or "TBC". */
  rating: string;
  /** "30 mA", "—", or the EV note. */
  rcd: string;
  /** Live/cpc in mm²: "2.5/1.5" — or "TBC". */
  cable: string;
  /** True where the rating or cable is a typical value to confirm. */
  typical: boolean;
}

/**
 * The design's device and cable text in the shorthand a board schedule uses:
 * "32 A Type B AFDD/RCBO 30 mA" → AFDD/RCBO · B32 · 30 mA.
 */
export function notation(c: DesignedCircuit): Notation {
  if (isSpare(c)) return { device: 'Spare', rating: '—', rcd: '—', cable: '—', typical: false };
  const d = c.device;
  // "32 A Type B", "32A MCB Type B" or "B32" — the text as written wins
  // over anything inferred.
  const typed = /(\d+)\s*A\b[^—,;]*?\bType\s*([BCD])\b/i.exec(d);
  const short = /\b([BCD])\s?(\d{1,3})\b/.exec(d);
  const amps = /(\d+)\s*A\b/.exec(d);
  const rating = typed
    ? `${typed[2].toUpperCase()}${typed[1]}`
    : short
      ? `${short[1]}${short[2]}`
      : amps
        ? `${amps[1]} A`
        : 'TBC';
  const device =
    c.kind === 'fire-zone'
      ? 'Zone'
      : /AFDD/i.test(d)
        ? 'AFDD/RCBO'
        : /RCBO/i.test(d)
          ? 'RCBO'
          : /\bMCB\b/i.test(d)
            ? 'MCB'
            : c.kind === 'fire-supply'
              ? 'MCB'
              : c.rcd && rating !== 'TBC'
                ? 'RCBO'
                : 'TBC';
  const pair = /(\d+(?:\.\d+)?\/\d+(?:\.\d+)?)\s*mm²/.exec(c.cable);
  const single = /(\d+(?:\.\d+)?)\s*mm²/.exec(c.cable);
  const cable = pair
    ? pair[1]
    : single
      ? single[1]
      : /fire-resisting/i.test(c.cable)
        ? 'FR'
        : 'TBC';
  return {
    device,
    rating,
    rcd: c.kind === 'ev' ? 'Per 722' : c.rcd ? '30 mA' : '—',
    cable,
    typical: /typical|size to|confirm/i.test(`${d} ${c.cable}`),
  };
}

// ── Spare ways, descriptions ─────────────────────────────────────────────────

export const isSpare = (c: DesignedCircuit) => c.ref.startsWith('spare:');

/**
 * On a three-phase board every way has three positions. Where balancing left
 * a position empty (4L1 when L1 already carries the cooker), a schedule lists
 * it as a spare rather than skipping it — so does this. Returns the circuits
 * in board order with the spares in place, and the numbering with theirs.
 */
export function withSpares(
  sorted: DesignedCircuit[],
  wayOf: Map<string, Way>
): { list: DesignedCircuit[]; wayOf: Map<string, Way> } {
  const labels = sorted.map((c) => wayOf.get(c.ref)).filter((w): w is Way => !!w?.phase);
  if (!labels.length) return { list: sorted, wayOf };
  const map = new Map(wayOf);
  const board = labels[0].board;
  const used = new Set(labels.map((w) => `${w.way}${w.phase}`));
  const tpn = new Set(labels.filter((w) => w.phase === 'TPN').map((w) => w.way));
  const top = Math.max(...labels.map((w) => w.way));
  const list = [...sorted];
  for (let n = 1; n <= top; n++) {
    if (tpn.has(n)) continue;
    for (const ph of ['L1', 'L2', 'L3'] as const) {
      if (used.has(`${n}${ph}`)) continue;
      const label = `${n}${ph}`;
      const full = labels[0].full.includes('/') ? `${board}/${label}` : label;
      const ref = `spare:${board}:${label}`;
      map.set(ref, { ref, board, way: n, phase: ph, label, full });
      list.push({
        ref,
        kind: 'radial',
        description: 'Spare',
        device: '',
        cable: '',
        points: 0,
        floor: '',
        rooms: [],
        rcd: false,
        afdd: false,
        notes: [],
        source: '',
        board: board === 'CU' ? undefined : board,
      });
    }
  }
  list.sort((a, b) => wayOrder(map.get(a.ref)) - wayOrder(map.get(b.ref)));
  return { list, wayOf: map };
}

/**
 * The circuit as a schedule names it: "Sockets — Ground floor" says little
 * when four circuits share it, so the rooms it serves are added where they
 * fit.
 */
export function circuitTitle(c: DesignedCircuit, max = 60): string {
  const base = c.description;
  if (!c.rooms.length || c.rooms.some((r) => base.includes(r))) return clip(base, max);
  const rooms = c.rooms.join(', ');
  return clip(`${base}: ${rooms}`, max);
}
const clip = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

/**
 * The same for schedule entries (the PDF's board schedule): a three-phase
 * board's empty positions as "Spare" rows, in way order.
 */
export function spareEntries<
  T extends { circuitRef: string; wayLabel?: string; circuitName: string },
>(entries: T[]): T[] {
  const parse = (l?: string) => /(?:^|\/)(\d+)\s?(L[123]|TPN)$/.exec(l ?? '');
  const parsed = entries.map((e) => ({ e, m: parse(e.wayLabel) }));
  if (!parsed.some((p) => p.m)) return entries;
  const prefix = /^(.*\/)/.exec(entries.find((e) => e.wayLabel)?.wayLabel ?? '')?.[1] ?? '';
  const used = new Set(parsed.filter((p) => p.m).map((p) => `${p.m![1]}${p.m![2]}`));
  const tpn = new Set(parsed.filter((p) => p.m?.[2] === 'TPN').map((p) => p.m![1]));
  const top = Math.max(0, ...parsed.filter((p) => p.m).map((p) => Number(p.m![1])));
  const spares: T[] = [];
  for (let n = 1; n <= top; n++) {
    if (tpn.has(`${n}`)) continue;
    for (const ph of ['L1', 'L2', 'L3']) {
      if (used.has(`${n}${ph}`)) continue;
      spares.push({
        ...entries[0],
        circuitRef: `spare:${n}${ph}`,
        wayLabel: `${prefix}${n}${ph}`,
        circuitName: 'Spare',
        cableSize: '—',
        protection: '—',
        rcd: '—',
        rcdBasis: undefined,
        points: 0,
        typicalLoad: '—',
        needsReview: undefined,
        runLengthM: undefined,
        maxLengthM: undefined,
        lengthOk: undefined,
        circuitKind: 'spare',
      } as T);
    }
  }
  const key = (e: T) => {
    const m = parse(e.wayLabel);
    return m ? Number(m[1]) * 10 + ['TPN', 'L1', 'L2', 'L3'].indexOf(m[2]) : 1e6;
  };
  return [...entries, ...spares].sort((a, b) => key(a) - key(b));
}
