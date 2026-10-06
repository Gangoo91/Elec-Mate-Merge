/**
 * Section B — the paperwork the learner fills in themselves: the schedule of
 * circuit details (columns 1–16) and the certificate's supply details.
 *
 * AM2 plan, round 6 (6 Oct 2026). NET's AM2S manual: "Correctly complete an
 * Electrical Installation Certificate, Schedule of Circuit Details and Schedule
 * of Test Results". Both used to be filled in for the learner. In Practise and
 * Assessment they now read the rig's drawings and their own readings and write
 * them; Learn keeps them filled in.
 *
 * What the drawings say is this rig's scenario. The limits used to mark:
 *   - Column 12 takes the Table 41.3 value for the device (via zsLimits, read
 *     from the printed book). The model form's own wording for column 12 is in
 *     Appendix 6, whose form pages aren't in our OCR of the book — unverified.
 *   - Reference methods are BS 7671's (Appendix 4: A, B, C, D1, D2, E, F, G).
 *   - Ipf: Appendix 14 (sectionBOrigin.ipfFrom).
 */
import type {
  AM2RigCircuit,
  EICCertificateData,
  EICCircuitDetail,
} from '@/types/am2-testing-simulator';
import { ipfFrom, seqWant, type OriginState } from '@/data/am2/sectionBOrigin';

/** The rig's drawings: the supply, the board and the main conductors. */
export const RIG_DRAWINGS = {
  supply:
    'Three-phase four-wire supply, 400/230 V, 50 Hz. PME: the distributor provides the earth from the supply’s combined neutral and earth (PEN) conductor, 25 mm².',
  board: 'DB1, TP&N, with a 100 A four-pole main switch.',
  mainSwitchRating: '100',
  earthingConductor: '16',
  bondingConductor: '10',
};

const WIRING_WORDS: Record<string, string> = {
  A: 'PVC-insulated and sheathed flat twin-and-earth',
  G: 'XLPE-insulated steel-wire-armoured',
  O: 'fire-resistant FP200',
};
const METHOD_WORDS: Record<string, string> = { C: 'clipped direct to the surface' };

/** What the drawing says about one circuit — in words, not in form codes. */
export function circuitSpec(c: AM2RigCircuit): string {
  const points =
    c.diagramLayout === 'ring'
      ? `${c.pointsServed} socket-outlets on a ring`
      : `${c.pointsServed} point`;
  const cpc = /^[\d.]+$/.test(c.cpcMm2)
    ? `${c.cpcMm2} mm² protective conductor`
    : 'armour as the protective conductor';
  const cable = `${c.liveMm2} mm² ${WIRING_WORDS[c.wiringType] ?? c.cableType} cable with a ${cpc}, ${METHOD_WORDS[c.referenceMethod] ?? `installation method ${c.referenceMethod}`}`;
  const device =
    c.hasRcd && c.rcdBsStandard === 'BS EN 61009'
      ? `RCBO to ${c.bsStandard}, Type ${c.mcbType} curve, ${c.mcbRating} A, ${c.breakingCapacity} kA, ${c.rcdRating} mA, RCD ${c.rcdType}`
      : `MCB to ${c.bsStandard}, Type ${c.mcbType} curve, ${c.mcbRating} A, ${c.breakingCapacity} kA${
          c.hasRcd
            ? `; then a ${c.mcbRating} A ${c.rcdRating} mA RCD to ${c.rcdBsStandard}, ${c.rcdType}`
            : ''
        }`;
  return `${points}. ${cable}. ${device}.`;
}

/** What columns 1–16 should say for a circuit. */
export function detailsKey(c: AM2RigCircuit): EICCircuitDetail {
  return {
    circuitNumber: String(c.id),
    circuitDescription: c.name,
    typeOfWiring: c.wiringType,
    referenceMethod: c.referenceMethod,
    pointsServed: c.pointsServed,
    liveMm2: c.liveMm2,
    cpcMm2: c.cpcMm2,
    ocpdBsStandard: c.bsStandard,
    ocpdType: c.mcbType,
    ocpdRating: String(c.mcbRating),
    breakingCapacity: String(c.breakingCapacity),
    maxPermittedZs: c.maxZs.toFixed(2),
    rcdBsStandard: c.hasRcd ? (c.rcdBsStandard ?? '') : 'N/A',
    rcdType: c.hasRcd ? (c.rcdType ?? '') : 'N/A',
    rcdIdn: c.hasRcd && c.rcdRating ? String(c.rcdRating) : 'N/A',
    rcdRating: c.hasRcd ? String(c.mcbRating) : 'N/A',
  };
}

/** Blank columns 3–16 (the number and description stay). */
export function blankDetails(c: AM2RigCircuit): EICCircuitDetail {
  const k = detailsKey(c);
  return Object.fromEntries(
    Object.entries(k).map(([f, v]) =>
      f === 'circuitNumber' || f === 'circuitDescription' ? [f, v] : [f, '']
    )
  ) as unknown as EICCircuitDetail;
}

type DKey = keyof EICCircuitDetail;

export interface DetailField {
  key: DKey;
  col: number;
  head: string;
  /** Chips to pick from; a number input where absent. */
  options?: string[];
  unit?: string;
}

export const DETAIL_GROUPS: { id: string; title: string; fields: DetailField[] }[] = [
  {
    id: 'wiring',
    title: 'Wiring',
    fields: [
      {
        key: 'typeOfWiring',
        col: 3,
        head: 'Type',
        options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'O'],
      },
      {
        key: 'referenceMethod',
        col: 4,
        head: 'Ref. method',
        options: ['A', 'B', 'C', 'D1', 'D2', 'E', 'F', 'G'],
      },
      { key: 'pointsServed', col: 5, head: 'Points' },
    ],
  },
  {
    id: 'conductors',
    title: 'Conductors (mm²)',
    fields: [
      {
        key: 'liveMm2',
        col: 6,
        head: 'Live',
        options: ['1.0', '1.5', '2.5', '4', '6', '10', '16'],
      },
      { key: 'cpcMm2', col: 7, head: 'cpc', options: ['1.0', '1.5', '2.5', '4', '6', '10', '16'] },
    ],
  },
  {
    id: 'device',
    title: 'Overcurrent device',
    fields: [
      {
        key: 'ocpdBsStandard',
        col: 8,
        head: 'BS (EN)',
        options: ['BS EN 60898', 'BS EN 61009', 'BS 88-3', 'BS 3036'],
      },
      { key: 'ocpdType', col: 9, head: 'Type', options: ['B', 'C', 'D'] },
      { key: 'ocpdRating', col: 10, head: 'Rating', unit: 'A' },
      { key: 'breakingCapacity', col: 11, head: 'Breaking capacity', unit: 'kA' },
    ],
  },
  {
    id: 'maxZs',
    title: 'Maximum Zs',
    fields: [{ key: 'maxPermittedZs', col: 12, head: 'Max Zs', unit: 'Ω' }],
  },
  {
    id: 'rcd',
    title: 'RCD',
    fields: [
      {
        key: 'rcdBsStandard',
        col: 13,
        head: 'BS (EN)',
        options: ['BS EN 61008', 'BS EN 61009', 'N/A'],
      },
      { key: 'rcdType', col: 14, head: 'Type', options: ['Type AC', 'Type A', 'Type B', 'N/A'] },
      {
        key: 'rcdIdn',
        col: 15,
        head: 'IΔn',
        unit: 'mA',
        options: ['10', '30', '100', '300', 'N/A'],
      },
      { key: 'rcdRating', col: 16, head: 'Rating', unit: 'A' },
    ],
  },
];

/** Compare two entries the way an assessor reads them: "1.0" = "1", "Type B" = "B". */
export function sameEntry(have = '', want = ''): boolean {
  const norm = (s: string) =>
    s
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/^type(?=[bcd]$)/, '')
      .replace(/^n\/?a$/, 'n/a');
  const a = norm(have);
  const b = norm(want);
  if (a === b) return true;
  const x = Number(a);
  const y = Number(b);
  return a !== '' && b !== '' && !Number.isNaN(x) && !Number.isNaN(y) && Math.abs(x - y) < 0.005;
}

// ── The certificate's supply details ─────────────────────────

type CKey = keyof EICCertificateData | 'phaseSequence';

export interface CertField {
  key: CKey;
  label: string;
  options?: string[];
  unit?: string;
  /** Where the answer comes from, for the debrief. */
  from: string;
}

export const CERT_FIELDS: CertField[] = [
  {
    key: 'earthingArrangement',
    label: 'System type',
    options: ['TN-S', 'TN-C-S', 'TT'],
    from: 'The supply on the drawings (PME)',
  },
  { key: 'zeAtOrigin', label: 'Ze at the origin', unit: 'Ω', from: 'Your Ze reading' },
  {
    key: 'pfcAtOrigin',
    label: 'Prospective fault current Ipf',
    unit: 'kA',
    from: 'Your PSCC and PEFC readings (Appendix 14)',
  },
  {
    key: 'phaseSequence',
    label: 'Phase sequence',
    options: ['Confirmed', 'Not confirmed'],
    from: 'Your phase rotation readings',
  },
  {
    key: 'mainSwitchRating',
    label: 'Main switch rating',
    unit: 'A',
    from: 'The board on the drawings',
  },
  {
    key: 'earthingConductorCsa',
    label: 'Main earthing conductor',
    unit: 'mm²',
    options: ['6', '10', '16', '25'],
    from: 'The drawings',
  },
  {
    key: 'bondingConductorCsa',
    label: 'Main bonding conductors',
    unit: 'mm²',
    options: ['6', '10', '16', '25'],
    from: 'The drawings',
  },
];

/** What each certificate field should say, from the drawings and the learner's own readings. */
export function certKey(origin: OriginState): Record<CKey, string> {
  const ze = origin.zeHow?.earthOff ? (origin.ze ?? '') : '';
  return {
    earthingArrangement: 'TN-C-S',
    zeAtOrigin: ze,
    pfcAtOrigin: ipfFrom(origin.pscc, origin.pefc),
    phaseSequence: seqWant(origin),
    mainSwitchRating: RIG_DRAWINGS.mainSwitchRating,
    earthingConductorCsa: RIG_DRAWINGS.earthingConductor,
    bondingConductorCsa: RIG_DRAWINGS.bondingConductor,
  } as Record<CKey, string>;
}

/** Measured figures are marked to a hundredth; the rest exactly. */
export function sameCert(key: CKey, have = '', want = ''): boolean {
  if (key === 'earthingArrangement') return have.trim().toUpperCase().startsWith(want);
  if (key === 'zeAtOrigin' || key === 'pfcAtOrigin')
    return have !== '' && want !== '' && Math.abs(Number(have) - Number(want)) <= 0.011;
  return sameEntry(have, want);
}

