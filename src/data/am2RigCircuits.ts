/**
 * AM2 Rig Circuits
 *
 * The 7 circuits on our practice rig, modelled on a typical AM2 rig.
 * Nominal test values are realistic for a well-installed rig with
 * ~15m cable runs and Ze of 0.14Ω (typical TN-C-S supply).
 *
 * Ze and prospective fault current are measured once, at the origin
 * (sectionBOrigin.ts) — each circuit used to carry its own "PFC at the DB".
 */

import type { AM2RigCircuit } from '@/types/am2-testing-simulator';
import { getMcbZsLimit } from '@/data/zsLimits';

/** Max Zs straight from BS 7671 Table 41.3 (A4:2026), so the rig can't drift
 *  from the table. It had: 6 A B 7.67 Ω (table: 7.28) and 40 A B 1.04 Ω
 *  (table: 1.09) — checked against the printed book, 5 Oct 2026. */
const tableZs = (curve: 'B' | 'C', rating: number): number =>
  getMcbZsLimit(curve === 'B' ? 'typeB' : 'typeC', rating)?.maxZs ?? 0;

export const AM2_ZE = 0.14; // External earth fault loop impedance (TN-C-S)

/** Lowest acceptable insulation resistance for a circuit, in MΩ at 500 V. */
export const irMinFor = (c: { irMin?: number }) => c.irMin ?? 1.0;

/** Highest acceptable measured Zs: 0.8 × the Table 41.3 value (Appendix 3),
 *  to two decimals — one figure for the meter, the schedule and the review. */
export const measuredZsMax = (c: { maxZs: number }) => Math.round(c.maxZs * 80) / 100;

export const AM2_RIG_CIRCUITS: AM2RigCircuit[] = [
  // ─── Circuit 1: Ring Final (Socket Outlets) ───
  {
    id: 1,
    name: 'Ring final',
    description: '32A ring final circuit — socket outlets, 30 mA RCBO',
    mcbRating: 32,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 61009',
    cableType: '2.5mm² T&E',
    liveMm2: '2.5',
    cpcMm2: '1.5',
    wiringType: 'A',
    referenceMethod: 'C',
    maxZs: tableZs('B', 32),
    pointsServed: '5',
    // Socket-outlets up to 32 A need 30 mA additional protection (Reg 411.3.3).
    // The rig used to show this circuit with no RCD at all.
    hasRcd: true,
    rcdRating: 30,
    rcdType: 'Type A',
    rcdBsStandard: 'BS EN 61009',
    phaseType: '1P',
    diagramLayout: 'ring',
    testPoints: [
      {
        id: 'c1-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V', 'LOOP_ZS', 'RCD_30'],
        xPct: 50,
        yPct: 15,
      },
      {
        id: 'c1-s1',
        label: 'Socket 1',
        type: 'socket',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 40,
      },
      {
        id: 'c1-s2',
        label: 'Socket 2',
        type: 'socket',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 70,
      },
      {
        id: 'c1-s3',
        label: 'Socket 3',
        type: 'socket',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 50,
        yPct: 85,
      },
      {
        id: 'c1-s4',
        label: 'Socket 4',
        type: 'socket',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 15,
        yPct: 70,
      },
      {
        id: 'c1-s5',
        label: 'Socket 5',
        type: 'socket',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 15,
        yPct: 40,
      },
    ],
    nominalValues: {
      ringR1: 0.52,
      ringRn: 0.52,
      ringR2: 0.87,
      r1r2: 0.35,
      r2: 0.22,
      irBase: 250,
      zs: 0.49, // Ze 0.14 + R1+R2 0.35 (was 0.72, which didn't add up)
      ze: AM2_ZE,
      rcdTripTime: 24,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c1-cont-r1',
        testPointId: 'c1-db',
        dialPosition: 'CONTINUITY',
        subTest: 'r1',
        gn3Step: 2,
        description: 'Ring r₁ (line) end-to-end',
      },
      {
        id: 'c1-cont-rn',
        testPointId: 'c1-db',
        dialPosition: 'CONTINUITY',
        subTest: 'rn',
        gn3Step: 2,
        description: 'Ring rₙ (neutral) end-to-end',
      },
      {
        id: 'c1-cont-r2',
        testPointId: 'c1-db',
        dialPosition: 'CONTINUITY',
        subTest: 'r2',
        gn3Step: 2,
        description: 'Ring r₂ (cpc) end-to-end',
      },
      {
        // GN3 ring test step 2: line and neutral cross-connected, L–N at every
        // socket — about a quarter of (r₁ + rₙ) at each. Proves the ring; not
        // recorded on the schedule.
        id: 'c1-cont-ln',
        testPointId: 'c1-s3',
        dialPosition: 'CONTINUITY',
        subTest: 'ln',
        gn3Step: 2.1, // GN3 ring test step 2 — after r₁, rₙ and r₂
        description: 'Line and neutral cross-connected, L–N at each socket',
      },
      {
        id: 'c1-cont-r1r2',
        testPointId: 'c1-s3',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 2.2, // step 3 — after step 2
        description: 'Cross-connected R₁+R₂ at mid-point',
      },
      {
        id: 'c1-ir',
        testPointId: 'c1-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c1-ir-ll',
        testPointId: 'c1-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c1-zs',
        testPointId: 'c1-s3',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at furthest point',
      },
      {
        id: 'c1-rcd',
        testPointId: 'c1-db',
        dialPosition: 'RCD_30',
        gn3Step: 7,
        description: 'RCD trip test at 1× (30 mA), 0°',
      },
      {
        // GN3: test on both half-cycles and record the longer time.
        id: 'c1-rcd180',
        testPointId: 'c1-db',
        dialPosition: 'RCD_30',
        subTest: 'rcd180',
        gn3Step: 7,
        description: 'RCD trip test at 1× (30 mA), 180°',
      },
      {
        id: 'c1-rcd-btn',
        testPointId: 'c1-db',
        dialPosition: 'RCD_30',
        subTest: 'test_button',
        gn3Step: 7,
        description: 'RCD test button operation',
      },
    ],
  },

  // ─── Circuit 2: Radial (Cooker) ───
  {
    id: 2,
    name: 'Cooker radial',
    description: '32A radial circuit — cooker control unit',
    mcbRating: 32,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 60898',
    cableType: '4mm² T&E',
    liveMm2: '4',
    cpcMm2: '1.5', // 4 mm² flat twin and earth has a 1.5 mm² cpc (was 2.5)
    wiringType: 'A',
    referenceMethod: 'C',
    maxZs: tableZs('B', 32),
    pointsServed: '1',
    hasRcd: false,
    phaseType: '1P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c2-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V'],
        xPct: 15,
        yPct: 50,
      },
      {
        id: 'c2-cooker',
        label: 'Cooker control unit',
        type: 'cooker',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 50,
      },
    ],
    nominalValues: {
      r1r2: 0.28,
      r2: 0.2,
      irBase: 300,
      zs: 0.42,
      ze: AM2_ZE,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c2-cont',
        testPointId: 'c2-cooker',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at cooker unit',
      },
      {
        id: 'c2-ir',
        testPointId: 'c2-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c2-ir-ll',
        testPointId: 'c2-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c2-zs',
        testPointId: 'c2-cooker',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at cooker unit',
      },
    ],
  },

  // ─── Circuit 3: Lighting (2-Way Switching) ───
  {
    id: 3,
    name: 'Two-way lighting',
    description: '6A lighting circuit with 2-way switching',
    mcbRating: 6,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 60898',
    cableType: '1.5mm² T&E',
    liveMm2: '1.5',
    cpcMm2: '1.0',
    wiringType: 'A',
    referenceMethod: 'C',
    maxZs: tableZs('B', 6),
    pointsServed: '1',
    hasRcd: false,
    phaseType: '1P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c3-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V'],
        xPct: 10,
        yPct: 50,
      },
      {
        id: 'c3-sw1',
        label: '2-way switch 1',
        type: 'switch',
        availableTests: ['CONTINUITY'],
        xPct: 35,
        yPct: 50,
      },
      {
        id: 'c3-light',
        label: 'Ceiling rose',
        type: 'light',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 60,
        yPct: 50,
      },
      {
        id: 'c3-sw2',
        label: '2-way switch 2',
        type: 'switch',
        availableTests: ['CONTINUITY'],
        xPct: 90,
        yPct: 50,
      },
    ],
    nominalValues: {
      // 39.7 m of 1.5/1.0 twin and earth (30.20 mΩ/m; cpc 18.10).
      r1r2: 1.2,
      r2: 0.72,
      irBase: 280,
      zs: 1.34,
      ze: AM2_ZE,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c3-cont',
        testPointId: 'c3-light',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at the ceiling rose',
      },
      {
        id: 'c3-polarity',
        testPointId: 'c3-light',
        dialPosition: 'CONTINUITY',
        subTest: 'polarity',
        gn3Step: 4,
        description: 'Polarity at the switches and ceiling rose',
      },
      {
        id: 'c3-ir',
        testPointId: 'c3-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c3-ir-ll',
        testPointId: 'c3-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c3-zs',
        testPointId: 'c3-light',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at the ceiling rose',
      },
    ],
  },

  // ─── Circuit 4: 3-Phase Motor (DOL) ───
  {
    id: 4,
    name: 'Three-phase motor (DOL)',
    description: '20A 3-phase motor with direct-on-line starter',
    mcbRating: 20,
    mcbType: 'C',
    breakingCapacity: 10,
    bsStandard: 'BS EN 60898',
    // Four-core SWA: three lines and a 2.5 mm² core as the cpc, so R₁+R₂ comes
    // straight from Table I1. (It was "Armour" with values copied from the ring;
    // we hold no sourced armour resistance to work an armour cpc out from.)
    cableType: '2.5mm² 4-core SWA (XLPE)',
    liveMm2: '2.5',
    cpcMm2: '2.5',
    wiringType: 'G', // XLPE (thermosetting) SWA to BS 5467 — the usual UK SWA
    referenceMethod: 'C', // SWA clipped direct (was 'F', a free-air method)
    maxZs: tableZs('C', 20),
    pointsServed: '1',
    hasRcd: false,
    phaseType: '3P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c4-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V'],
        xPct: 10,
        yPct: 50,
      },
      {
        id: 'c4-iso',
        label: 'TPN isolator',
        type: 'isolator',
        availableTests: ['CONTINUITY'],
        xPct: 30,
        yPct: 50,
      },
      {
        id: 'c4-dol',
        label: 'DOL starter',
        type: 'dol_starter',
        availableTests: ['CONTINUITY'],
        xPct: 55,
        yPct: 50,
      },
      {
        id: 'c4-motor',
        label: 'Motor terminal box',
        type: 'motor',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 50,
      },
    ],
    nominalValues: {
      // 15 m of 2.5 mm² line + 2.5 mm² cpc core: 15 × (7.41 + 7.41) mΩ/m
      // (Table I1 at 20 °C, conductorResistance.ts) = 0.22 Ω. Zs = Ze + R₁+R₂.
      // Was 0.35 / 0.49, copied from the ring.
      r1r2: 0.22,
      r2: 0.11,
      irBase: 250,
      zs: 0.36,
      ze: AM2_ZE,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c4-cont',
        testPointId: 'c4-motor',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at motor terminals',
      },
      {
        id: 'c4-ir',
        testPointId: 'c4-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      // Three-phase: between each pair of lines (no neutral on this circuit).
      {
        id: 'c4-ir-l1l2',
        testPointId: 'c4-db',
        dialPosition: 'IR_500V',
        subTest: 'L1-L2',
        gn3Step: 3,
        description: 'Insulation resistance L1–L2',
      },
      {
        id: 'c4-ir-l2l3',
        testPointId: 'c4-db',
        dialPosition: 'IR_500V',
        subTest: 'L2-L3',
        gn3Step: 3,
        description: 'Insulation resistance L2–L3',
      },
      {
        id: 'c4-ir-l3l1',
        testPointId: 'c4-db',
        dialPosition: 'IR_500V',
        subTest: 'L3-L1',
        gn3Step: 3,
        description: 'Insulation resistance L3–L1',
      },
      {
        id: 'c4-zs',
        testPointId: 'c4-motor',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at motor terminals',
      },
    ],
  },

  // ─── Circuit 5: Fire alarm panel supply ───
  // The 230 V supply to the fire alarm panel, in FP200. The detectors and
  // sounders are on the panel's own circuits, not this one — they used to be
  // drawn as points on it.
  {
    id: 5,
    name: 'Fire alarm supply',
    description: '6A supply to the fire alarm panel — FP200 cable',
    mcbRating: 6,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 60898',
    cableType: '1.5mm² FP200',
    liveMm2: '1.5',
    // FP200 Gold has a full-size cpc (Prysmian datasheet: 1.5 mm² 2C+E has a
    // 1.5 mm² cpc). Was 1.0, as if it were twin and earth.
    cpcMm2: '1.5',
    wiringType: 'O', // fire-resistant cable = Other (code C is cables in non-metallic conduit)
    referenceMethod: 'C',
    maxZs: tableZs('B', 6),
    // BS 5839-1:2025 clause 36.1: fire alarm cables at least 2 MΩ at 500 V DC.
    irMin: 2.0,
    pointsServed: '1',
    hasRcd: false,
    phaseType: '1P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c5-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V'],
        xPct: 15,
        yPct: 50,
      },
      {
        id: 'c5-panel',
        label: 'Fire alarm panel',
        type: 'fire_panel',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 50,
      },
    ],
    nominalValues: {
      // 39.7 m of 1.5/1.5 FP200 (24.20 mΩ/m; full-size cpc 12.10).
      r1r2: 0.96,
      r2: 0.48,
      irBase: 280,
      zs: 1.1,
      ze: AM2_ZE,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c5-cont',
        testPointId: 'c5-panel',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at fire alarm panel',
      },
      {
        id: 'c5-ir',
        testPointId: 'c5-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c5-ir-ll',
        testPointId: 'c5-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c5-zs',
        testPointId: 'c5-panel',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at fire alarm panel',
      },
    ],
  },

  // ─── Circuit 6: Comms cabinet supply ───
  // Was "Data (Cat 6)": a 6 A circuit "in Cat 6 / 1.5mm²" with continuity and
  // 500 V insulation tests at a data outlet. Cat 6 data cable isn't tested
  // with the MFT, so what goes on the schedule is the mains supply to the
  // cabinet. It also had no Zs test — every circuit gets one.
  {
    id: 6,
    name: 'Comms cabinet',
    description: '6A radial to the comms cabinet fused connection unit',
    mcbRating: 6,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 60898',
    cableType: '1.5mm² T&E',
    liveMm2: '1.5',
    cpcMm2: '1.0',
    wiringType: 'A',
    referenceMethod: 'C',
    maxZs: tableZs('B', 6),
    pointsServed: '1',
    hasRcd: false,
    phaseType: '1P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c6-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V'],
        xPct: 15,
        yPct: 50,
      },
      {
        id: 'c6-fcu',
        label: 'Cabinet FCU',
        type: 'fcu',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 50,
      },
    ],
    nominalValues: {
      r1r2: 0.9,
      r2: 0.54,
      irBase: 300,
      zs: 1.04, // Ze 0.14 + R1+R2 0.90
      ze: AM2_ZE,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c6-cont',
        testPointId: 'c6-fcu',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at cabinet FCU',
      },
      {
        id: 'c6-ir',
        testPointId: 'c6-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c6-ir-ll',
        testPointId: 'c6-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c6-zs',
        testPointId: 'c6-fcu',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at cabinet FCU',
      },
    ],
  },

  // ─── Circuit 7: Shower (RCD Protected) ───
  {
    id: 7,
    name: 'Shower',
    description: '40A shower circuit — 30mA RCD protected',
    mcbRating: 40,
    mcbType: 'B',
    breakingCapacity: 6,
    bsStandard: 'BS EN 60898',
    cableType: '6mm² T&E',
    liveMm2: '6',
    cpcMm2: '2.5',
    wiringType: 'A',
    referenceMethod: 'C',
    maxZs: tableZs('B', 40),
    pointsServed: '1',
    hasRcd: true,
    rcdRating: 30,
    rcdType: 'Type A',
    rcdBsStandard: 'BS EN 61008',
    phaseType: '1P',
    diagramLayout: 'linear',
    testPoints: [
      {
        id: 'c7-db',
        label: 'Distribution board',
        type: 'db',
        availableTests: ['CONTINUITY', 'IR_500V', 'RCD_30'],
        xPct: 15,
        yPct: 50,
      },
      {
        id: 'c7-shower',
        label: 'Shower unit',
        type: 'shower',
        availableTests: ['CONTINUITY', 'LOOP_ZS'],
        xPct: 85,
        yPct: 50,
      },
    ],
    nominalValues: {
      r1r2: 0.17,
      r2: 0.12,
      irBase: 300,
      zs: 0.31,
      ze: AM2_ZE,
      rcdTripTime: 22,
      pfc: 1.84,
    },
    requiredTests: [
      {
        id: 'c7-cont',
        testPointId: 'c7-shower',
        dialPosition: 'CONTINUITY',
        subTest: 'r1r2',
        gn3Step: 1,
        description: 'R₁+R₂ at shower unit',
      },
      {
        id: 'c7-ir',
        testPointId: 'c7-db',
        dialPosition: 'IR_500V',
        subTest: 'L-E',
        gn3Step: 3,
        description: 'Insulation resistance L-E',
      },
      {
        id: 'c7-ir-ll',
        testPointId: 'c7-db',
        dialPosition: 'IR_500V',
        subTest: 'L-L',
        gn3Step: 3,
        description: 'Insulation resistance L-L',
      },
      {
        id: 'c7-zs',
        testPointId: 'c7-shower',
        dialPosition: 'LOOP_ZS',
        gn3Step: 6,
        description: 'Zs at shower unit',
      },
      {
        id: 'c7-rcd',
        testPointId: 'c7-db',
        dialPosition: 'RCD_30',
        gn3Step: 7,
        description: 'RCD trip test at 1× (30 mA), 0°',
      },
      {
        // GN3: test on both half-cycles and record the longer time.
        id: 'c7-rcd180',
        testPointId: 'c7-db',
        dialPosition: 'RCD_30',
        subTest: 'rcd180',
        gn3Step: 7,
        description: 'RCD trip test at 1× (30 mA), 180°',
      },
      {
        id: 'c7-rcd-btn',
        testPointId: 'c7-db',
        dialPosition: 'RCD_30',
        subTest: 'test_button',
        gn3Step: 7,
        description: 'RCD test button operation',
      },
    ],
  },
];

/** Get a circuit by ID */
export function getAM2Circuit(id: number): AM2RigCircuit | undefined {
  return AM2_RIG_CIRCUITS.find((c) => c.id === id);
}
