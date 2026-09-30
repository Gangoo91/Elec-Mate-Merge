/**
 * One numbering for the whole job (30 Sep 2026).
 *
 * The plan tags, the board sheet, the export review and the PDF must give a
 * circuit the same way number — the PDF prints the plan pages (with their
 * tags) beside the schedule. They used to be numbered in two places: each
 * sheet on its own on the canvas, the pooled job in the export, so a
 * hand-drawn or multi-sheet job's PDF said "way 5" on the plan and "way 1"
 * in the schedule. Both now come from here.
 *
 *  • Designed sheets (read from a plan) merge through `scheduleForRooms`; a
 *    ref repeated across sheets becomes "S1 · 2".
 *  • Hand-drawn sheets pool through `assignCircuits`, as the export always
 *    has; beside designed sheets their refs become "S1 · hand-drawn".
 *  • The lot is numbered once, by `wayMap`, for the job's supply.
 */
import type { CanvasObject } from '@/pages/electrician-tools/ai-tools/DiagramBuilderPage';
import { assignCircuits, type CircuitScheduleEntry } from '@/utils/circuit-assignment';
import {
  isDesigned,
  kindOfRef,
  scheduleForRooms,
  scheduleFromObjects,
  toScheduleEntries,
  type DesignedCircuit,
} from './circuitDesign';
import { wayMap, type Supply, type Way } from './boardWays';
import { planSettings } from './wiring';

export interface JobSheet {
  /** The saved sheet's id, where it has one — for keying edits. */
  id?: string;
  name: string;
  objects: CanvasObject[];
  /** A sheet's symbols, where its objects could not be read. */
  symbolIds?: string[];
}

export interface JobNumbering {
  supply: Supply;
  /** Designed circuits, merged across sheets (job refs). */
  designed: DesignedCircuit[];
  /** Hand-drawn circuits, pooled (job refs). */
  handDrawn: CircuitScheduleEntry[];
  /** The same, as circuits — for the certificate hand-off. */
  handCircuits: DesignedCircuit[];
  /** Way number per job ref. */
  ways: Map<string, Way>;
  /** A sheet's own circuit ref → the job ref it is numbered under. */
  refOf: (sheet: number, ref: string) => string;
  /** The way a sheet's circuit is on: what its plan tags show. */
  labelsFor: (sheet: number) => Map<string, string>;
  /**
   * Where a job circuit comes from — "<sheet id>:<ref on that sheet>", or
   * "hand-drawn:<ref>" — which, unlike the job ref, doesn't change when a
   * sheet is added or the sheets are reordered. Edits are kept by this.
   */
  originOf: (jobRef: string) => string;
  /** The job's earthing, for the single-line diagram. */
  earthing: ReturnType<typeof planSettings>['earthing'];
}

/** A fingerprint of a sheet's tags, stored with its image to spot stale pages. */
export const labelKey = (labels: Map<string, string>) =>
  [...labels.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([r, l]) => `${r}=${l}`)
    .join('|');

const symbolIdsOf = (sh: JobSheet) =>
  sh.symbolIds ??
  sh.objects.filter((o) => o.type === 'symbol' && o.symbolId).map((o) => o.symbolId!);

/**
 * A hand-drawn sheet's circuits: from the fittings' own circuits where the
 * drawing is there, else the per-type defaults from its symbol list.
 * `qualify` names them apart from designed circuits ("S1 · hand-drawn").
 */
export function handDrawnCircuits(
  objects: CanvasObject[],
  symbolIds: string[],
  qualify: boolean
): DesignedCircuit[] {
  const tag = (c: DesignedCircuit): DesignedCircuit =>
    qualify
      ? { ...c, ref: `${c.ref} · hand-drawn`, description: `${c.description} (hand-drawn sheets)` }
      : c;
  if (objects.some((o) => o.type === 'symbol' && o.circuitRef))
    return scheduleFromObjects(objects).circuits.map(tag);
  return assignCircuits(symbolIds).circuitSchedule.map((e) =>
    tag({
      ref: e.circuitRef,
      kind: kindOfRef(e.circuitRef) ?? 'radial',
      description: e.circuitName,
      device: e.protection,
      cable: e.cableSize,
      points: e.points,
      floor: '',
      rooms: [],
      rcd: !/not required|n\/a/i.test(e.rcd),
      afdd: /AFDD/i.test(e.protection),
      notes: [],
      source: e.rcdBasis ?? '',
    })
  );
}

export function jobNumbering(sheets: JobSheet[]): JobNumbering {
  const { supply, earthing } = planSettings(sheets.flatMap((s) => s.objects));
  const designedIdx = sheets.map((_, i) => i).filter((i) => isDesigned(sheets[i].objects));
  const plainIdx = sheets.map((_, i) => i).filter((i) => !designedIdx.includes(i));

  const designed = designedIdx.length
    ? scheduleForRooms(
        designedIdx.map((i) => ({ name: sheets[i].name, objects: sheets[i].objects }))
      ).circuits
    : [];
  const designedRefs = new Set(designed.map((c) => c.ref));
  const qualify = designedIdx.length > 0;

  // Hand-drawn sheets: the circuits as drawn — each fitting's circuit is on
  // it. The per-type defaults (assignCircuits) split sockets over 10 and
  // lights over 12 by SORTING SYMBOL NAMES, so the PDF listed an S2 that no
  // fitting on the plan was on. They stay only for a sheet whose drawing
  // could not be read.
  const plainObjects = plainIdx.flatMap((i) => sheets[i].objects);
  const drawn = plainObjects.some((o) => o.type === 'symbol' && o.circuitRef);
  const handCircuits = handDrawnCircuits(
    drawn ? plainObjects : [],
    drawn ? [] : plainIdx.flatMap((i) => symbolIdsOf(sheets[i])),
    qualify
  );
  const handDrawn = toScheduleEntries(handCircuits);

  const ways = wayMap([...designed, ...handCircuits], supply);

  const refOf = (sheet: number, ref: string) => {
    const d = designedIdx.indexOf(sheet);
    if (d >= 0) {
      const q = `${ref} · ${d + 1}`;
      return designedRefs.has(q) ? q : ref;
    }
    return qualify ? `${ref} · hand-drawn` : ref;
  };
  const labelsFor = (sheet: number) => {
    const out = new Map<string, string>();
    sheets[sheet]?.objects.forEach((o) => {
      if (!o.circuitRef || out.has(o.circuitRef)) return;
      const w = ways.get(refOf(sheet, o.circuitRef));
      if (w) out.set(o.circuitRef, w.full);
    });
    return out;
  };
  const sheetKey = (i: number) => sheets[i]?.id ?? `sheet-${i}`;
  const originOf = (jobRef: string) => {
    const hand = / · hand-drawn$/.exec(jobRef);
    if (hand) return `hand-drawn:${jobRef.replace(/ · hand-drawn$/, '')}`;
    if (!designedIdx.length) return `hand-drawn:${jobRef}`;
    const q = / · (\d+)$/.exec(jobRef);
    if (q) {
      const i = designedIdx[Number(q[1]) - 1];
      return `${sheetKey(i)}:${jobRef.replace(/ · \d+$/, '')}`;
    }
    const owner =
      designedIdx.find((i) => sheets[i].objects.some((o) => o.circuitRef === jobRef)) ??
      designedIdx.find((i) => sheets[i].objects.some((o) => /^FZ\d/.test(o.circuitRef ?? ''))) ??
      designedIdx[0];
    return `${sheetKey(owner)}:${jobRef}`;
  };
  return {
    supply,
    earthing,
    designed,
    handDrawn,
    handCircuits,
    ways,
    refOf,
    labelsFor,
    originOf,
  };
}
