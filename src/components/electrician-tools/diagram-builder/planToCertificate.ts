/**
 * The floor plan into a certificate (30 Sep 2026).
 *
 * The board schedule the planner designs is, field for field, the start of the
 * EIC's schedule of circuits (GN3 Form 3): circuit number, description, type
 * of wiring, points, live/cpc, device standard, curve, rating, RCD. So the
 * electrician starts the EIC with those already in — and only adds readings.
 *
 * Numbered as the plan tags and the PDF are (boardWays): ways 1, 2, 3… — on a
 * three-phase board in the certificate's own form ("1.1", "Way 1 L1" for the
 * plan's 1L1; see certNumber), one certificate board per
 * plan board (CU, DB2…), each sub-board recorded as supplied from its way on
 * the main board. Spare positions on a three-phase board go in as spares.
 *
 * Only what the design knows is written. Where it leaves a value open —
 * "size to the cooker", an EV's RCD type — the field is left blank for the
 * electrician, never filled with a guess. Maximum Zs comes from the
 * certificate's own Table 41.3 lookup, which matches the BS 7671 facets.
 *
 * Handed to the EIC form and the board door chart page through
 * utils/planCertificateHandoff, so both see the same rows.
 */
import type { TestResult } from '@/types/testResult';
import type { PlanCertificate } from '@/utils/planCertificateHandoff';
import {
  createDefaultBoard,
  MAIN_BOARD_ID,
  type DistributionBoard,
} from '@/types/distributionBoard';
import { createCircuitWithDefaults } from '@/utils/circuitDefaults';
import { getMaxZsForDevice } from '@/lib/eic/expectedValues';
import type { DesignedCircuit, Earthing } from './circuitDesign';
import {
  circuitTitle,
  isSpare,
  notation,
  wayOrder,
  withSpares,
  type Supply,
  type Way,
} from './boardWays';

const FACTORY_TYPE: Partial<Record<DesignedCircuit['kind'], string>> = {
  ring: 'ring_final',
  radial: 'radial',
  lighting: 'lighting',
  cooker: 'cooker',
  'water-heater': 'immersion',
  'smoke-alarms': 'smoke_detectors',
  heating: 'radial',
};

/** "2.5" → "2.5mm", "6" → "6.0mm", "10" → "10mm" — the form's own options. */
const size = (v?: string) => {
  const n = Number.parseFloat(v ?? '');
  if (!Number.isFinite(n)) return '';
  return n >= 10 ? `${n}mm` : `${n.toFixed(1)}mm`;
};

/**
 * A way's number in the certificate's own model — the one its renumber and
 * edit tools (utils/circuitNumbering) keep: on a three-phase board way 1's
 * L1, L2 and L3 rows are "1.1", "1.2", "1.3", designated "Way 1 L1"…, and a
 * TPN circuit is "1". The plan's "1L1" typed into that column was cut to "1"
 * the moment it was edited, putting three rows on way 1. The designation
 * keeps the plan's reading.
 */
function certNumber(way: Way): { circuitNumber: string; circuitDesignation: string } {
  if (way.phase && way.phase !== 'TPN')
    return {
      circuitNumber: `${way.way}.${way.phase.slice(1)}`,
      circuitDesignation: `Way ${way.way} ${way.phase}`,
    };
  const n = way.phase === 'TPN' ? String(way.way) : way.label;
  return { circuitNumber: n, circuitDesignation: `Way ${n}` };
}

/**
 * The form's own "Add circuit" pre-fills passing results (IR >200 MΩ,
 * polarity correct, functional ✓) for speed. A row from a plan has had no
 * test at all, so it must arrive with every result empty — a plan never
 * vouches for a reading.
 */
const NO_RESULTS: Partial<TestResult> = {
  insulationResistance: '',
  insulationLiveNeutral: '',
  insulationLiveEarth: '',
  insulationNeutralEarth: '',
  polarity: '',
  functionalTesting: '',
};

/** A certificate row from a designed circuit, on its board and way. */
function rowFor(c: DesignedCircuit, way: Way, boardId: string, planOrigin?: string): TestResult {
  const label = way.label;
  const phase = way.phase;
  const n = notation(c);
  const base = createCircuitWithDefaults(
    FACTORY_TYPE[c.kind] ?? 'other',
    label,
    circuitTitle(c, 80)
  );
  const [live, cpc] = n.cable.includes('/') ? n.cable.split('/') : [n.cable, ''];
  const curve = /^([BCD])(\d+)$/.exec(n.rating);
  const amps = curve ? curve[2] : (/^(\d+)\s*A$/.exec(n.rating)?.[1] ?? '');
  const isRcbo = n.device === 'RCBO' || n.device === 'AFDD/RCBO';
  const deviceType = isRcbo ? 'RCBO' : n.device === 'MCB' ? 'MCB' : '';
  const maxZs =
    curve && deviceType
      ? getMaxZsForDevice({
          deviceType,
          rating: Number(curve[2]),
          curve: curve[1],
          voltage: 230,
          disconnectionTime: 0.4,
        })
      : null;
  const notes = [
    n.device === 'AFDD/RCBO' ? 'RCBO with AFDD (BS EN 62606)' : '',
    c.kind === 'ev' ? 'RCD type per Section 722 and the charge point maker' : '',
    n.typical ? `Design: ${c.device} · ${c.cable}` : '',
    'From the floor plan — confirm on site',
  ].filter(Boolean);
  return {
    ...base,
    ...NO_RESULTS,
    ...certNumber(way),
    boardId,
    wayNumber: way.way,
    phaseType: way.phase === 'TPN' ? '3P' : '1P',
    phaseAssignment: phase === 'TPN' ? 'L1,L2,L3' : (phase ?? null),
    pointsServed: c.points > 0 ? String(c.points) : '',
    // A: thermoplastic insulated and sheathed (T&E) — the model form's code.
    typeOfWiring: /T&E/.test(c.cable) ? 'A' : '',
    // How it is run is decided on site; the plan doesn't know.
    referenceMethod: '',
    liveSize: size(live),
    cpcSize: size(cpc),
    cableSize: live && cpc ? `${live}/${cpc}` : '',
    protectiveDeviceType: deviceType,
    bsStandard: isRcbo ? 'RCBO (BS EN 61009)' : deviceType === 'MCB' ? 'MCB (BS EN 60898)' : '',
    protectiveDeviceCurve: curve?.[1] ?? '',
    protectiveDeviceRating: amps,
    protectiveDeviceKaRating: '',
    protectiveDevice: deviceType && n.rating !== 'TBC' ? `${deviceType} ${n.rating}` : '',
    maxZs: maxZs ? maxZs.toFixed(2) : '',
    rcdBsStandard: isRcbo ? 'RCBO (BS EN 61009)' : '',
    // The design sets 30 mA; the RCD's type (A, F, B) it leaves to the
    // electrician and the equipment.
    rcdType: '',
    rcdRating: c.rcd && c.kind !== 'submain' ? '30' : '',
    rcdRatingA: isRcbo ? amps : '',
    notes: notes.join('. '),
    autoFilled: true,
    ...(planOrigin ? { planOrigin } : {}),
  };
}

function spareRow(way: Way, boardId: string): TestResult {
  const base = createCircuitWithDefaults('other', way.label, 'Spare');
  return {
    ...base,
    ...NO_RESULTS,
    ...certNumber(way),
    circuitDescription: 'Spare',
    boardId,
    wayNumber: way.way,
    phaseType: '1P',
    // Spares only arise on single-phase positions (never a TPN way).
    phaseAssignment: way.phase && way.phase !== 'TPN' ? way.phase : null,
    isSpare: true,
    typeOfWiring: '',
    referenceMethod: '',
    insulationTestVoltage: '',
    liveSize: '',
    cpcSize: '',
    cableSize: '',
    bsStandard: '',
    protectiveDeviceType: '',
    protectiveDeviceCurve: '',
    protectiveDeviceRating: '',
    protectiveDeviceKaRating: '',
    protectiveDevice: '',
    rcdBsStandard: '',
    rcdType: '',
    rcdRating: '',
    rcdRatingA: '',
    autoFilled: true,
  };
}

/**
 * Boards and schedule rows from the plan's circuits and their numbering.
 * Fire detection zones are not board ways (they're on the alarm panel), so
 * they don't appear; the panel's own supply does.
 */
export function planToCertificate(
  circuits: DesignedCircuit[],
  wayOf: Map<string, Way>,
  opts: {
    supply: Supply;
    earthing: Earthing;
    planName: string;
    installationAddress?: string;
    clientName?: string;
    /** Where each sub-board sits, for the board's location field. */
    boardRooms?: Map<string, string>;
    /** The plan's saved sheets and each circuit's origin on them (jobNumbering). */
    link?: { sheetIds: string[]; originOf: (jobRef: string) => string };
  }
): PlanCertificate {
  const ways = circuits.filter((c) => c.kind !== 'fire-zone');
  const boardNames = [...new Set(ways.map((c) => wayOf.get(c.ref)?.board ?? 'CU'))].sort(
    (a, b) =>
      wayOrder({ ref: '', board: a, way: 0, label: '', full: '' }) -
      wayOrder({ ref: '', board: b, way: 0, label: '', full: '' })
  );
  if (!boardNames.includes('CU')) boardNames.unshift('CU');

  const boards: DistributionBoard[] = boardNames.map((name, i) => {
    const b = createDefaultBoard(
      i === 0 ? MAIN_BOARD_ID : `plan-${name.replace(/\W+/g, '-')}`,
      name,
      i
    );
    const feed = circuits.find((c) => c.kind === 'submain' && c.ref === name);
    const feedWay = feed ? wayOf.get(feed.ref) : undefined;
    return {
      ...b,
      name: i === 0 ? 'Main CU' : name,
      reference: name,
      location: opts.boardRooms?.get(name) ?? b.location,
      mainSwitchPoles: opts.supply === 'three' ? 'TPN' : 'DP',
      ...(feedWay ? { suppliedFrom: `${feedWay.board} way ${feedWay.label}` } : {}),
    };
  });
  const idOf = new Map(boards.map((b) => [b.reference, b.id]));

  const rows: TestResult[] = [];
  boardNames.forEach((name) => {
    const own = ways
      .filter((c) => (wayOf.get(c.ref)?.board ?? 'CU') === name)
      .sort((a, b) => wayOrder(wayOf.get(a.ref)) - wayOrder(wayOf.get(b.ref)));
    const spared = withSpares(own, wayOf);
    spared.list.forEach((c) => {
      const w = spared.wayOf.get(c.ref);
      if (!w) return;
      rows.push(
        isSpare(c)
          ? spareRow(w, idOf.get(name)!)
          : rowFor(c, w, idOf.get(name)!, opts.link?.originOf(c.ref))
      );
    });
  });

  return {
    v: 1,
    createdAt: new Date().toISOString(),
    planName: opts.planName,
    installationAddress: opts.installationAddress,
    clientName: opts.clientName,
    phases: opts.supply,
    supplyVoltage: opts.supply === 'three' ? '400' : '230',
    earthingArrangement: opts.earthing.toLowerCase().replace(/-/g, ''),
    distributionBoards: boards,
    scheduleOfTests: rows,
    ...(opts.link?.sheetIds.length
      ? {
          sourcePlan: {
            sheetIds: opts.link.sheetIds,
            name: opts.planName,
            startedAt: new Date().toISOString(),
          },
        }
      : {}),
  };
}
