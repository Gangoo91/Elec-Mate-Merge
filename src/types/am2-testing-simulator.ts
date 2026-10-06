/**
 * AM2 Testing Simulator Types
 *
 * Core interfaces for the MFT (Multi-Function Tester) simulator,
 * AM2 rig circuits, EIC schedules, and test readings.
 */

import type { Marking, SeededProblem, SimMistake, SimMode } from '@/data/am2/sectionBRules';
import type { InspectionState, InspectionVerdict } from '@/data/am2/sectionBInspection';
import type { BondingState } from '@/data/am2/sectionBBonding';
import type { OriginState } from '@/data/am2/sectionBOrigin';
import type { FunctionalState } from '@/data/am2/sectionBFunctional';
import type { FixRecord } from '@/data/am2/sectionBRectify';

// ── MFT Dial Positions ─────────────────────────────────────

export type DialPosition =
  | 'OFF'
  | 'CONTINUITY'
  | 'IR_250V'
  | 'IR_500V'
  | 'LOOP_ZS'
  | 'RCD_30'
  | 'RCD_100'
  | 'RCD_300'
  | 'PFC';

export const DIAL_POSITIONS: {
  id: DialPosition;
  label: string;
  unit: string;
  testCategory: 'off' | 'dead' | 'live';
  angleDeg: number;
}[] = [
  { id: 'OFF', label: 'OFF', unit: '', testCategory: 'off', angleDeg: 0 },
  {
    id: 'CONTINUITY',
    label: 'Ω',
    unit: 'Ω',
    testCategory: 'dead',
    angleDeg: 33.75,
  },
  {
    id: 'IR_250V',
    label: 'MΩ 250V',
    unit: 'MΩ',
    testCategory: 'dead',
    angleDeg: 67.5,
  },
  {
    id: 'IR_500V',
    label: 'MΩ 500V',
    unit: 'MΩ',
    testCategory: 'dead',
    angleDeg: 101.25,
  },
  {
    id: 'LOOP_ZS',
    label: 'Zs',
    unit: 'Ω',
    testCategory: 'live',
    angleDeg: 135,
  },
  {
    id: 'RCD_30',
    label: 'RCD 30mA',
    unit: 'ms',
    testCategory: 'live',
    angleDeg: 168.75,
  },
  {
    id: 'RCD_100',
    label: 'RCD 100mA',
    unit: 'ms',
    testCategory: 'live',
    angleDeg: 202.5,
  },
  {
    id: 'RCD_300',
    label: 'RCD 300mA',
    unit: 'ms',
    testCategory: 'live',
    angleDeg: 236.25,
  },
  {
    id: 'PFC',
    label: 'PFC',
    unit: 'kA',
    testCategory: 'live',
    angleDeg: 270,
  },
];

// ── Test Point Types ────────────────────────────────────────

export type TestPointType =
  | 'db' // Distribution board
  | 'socket' // Socket outlet
  | 'light' // Light fitting / ceiling rose
  | 'switch' // Light switch (1/2/intermediate)
  | 'cooker' // Cooker control unit
  | 'shower' // Shower unit
  | 'motor' // Motor terminal box
  | 'dol_starter' // DOL starter
  | 'isolator' // Isolator
  | 'fcu' // Switched fused connection unit
  | 'fire_panel' // Fire alarm panel
  | 'detector' // Smoke / heat detector
  | 'data_outlet' // Data outlet
  | 'patch_panel' // Patch panel
  | 'junction_box' // Junction box
  | 'swa_gland'; // SWA cable gland

export interface CircuitTestPoint {
  id: string;
  label: string;
  type: TestPointType;
  /** Available dial positions at this test point */
  availableTests: DialPosition[];
  /** Position in the circuit diagram (percentage) */
  xPct: number;
  yPct: number;
}

// ── AM2 Rig Circuit ─────────────────────────────────────────

export interface AM2RigCircuit {
  id: number;
  name: string;
  description: string;

  // Protection
  mcbRating: number;
  mcbType: 'B' | 'C' | 'D';
  breakingCapacity: number; // kA
  bsStandard: string; // e.g. 'BS EN 60898'

  // Cable
  cableType: string; // e.g. '2.5mm² T&E'
  liveMm2: string; // e.g. '2.5'
  cpcMm2: string; // e.g. '1.5'
  wiringType: string; // Column 3 code (A-H, O)
  referenceMethod: string; // Column 4

  // Limits
  maxZs: number; // Ω
  /** Lowest acceptable insulation resistance at 500 V (MΩ). Table 64 gives
   *  1.0; fire alarm wiring is held to 2.0 by BS 5839-1 (clause 36.1). */
  irMin?: number;
  pointsServed: string;

  // RCD
  hasRcd: boolean;
  rcdRating?: number; // mA
  rcdType?: string; // e.g. 'Type A'
  rcdBsStandard?: string;

  // Test points
  testPoints: CircuitTestPoint[];

  // Nominal test values (base for reading engine)
  nominalValues: CircuitNominalValues;

  // Circuit topology for diagram layout
  diagramLayout: 'linear' | 'ring' | 'star';

  // Phase type
  phaseType: '1P' | '3P';

  // Required tests in GN3 order
  requiredTests: RequiredTest[];
}

export interface CircuitNominalValues {
  /** r₁ end-to-end for ring finals (Ω) */
  ringR1?: number;
  /** rₙ end-to-end for ring finals (Ω) */
  ringRn?: number;
  /** r₂ end-to-end for ring finals (Ω) */
  ringR2?: number;
  /** R₁+R₂ (Ω) */
  r1r2: number;
  /** R₂ only (Ω) */
  r2?: number;
  /** Insulation resistance base (MΩ) — actual display capped at >200 */
  irBase: number;
  /** Zs (Ω) */
  zs: number;
  /** Ze (Ω) — external earth fault loop impedance */
  ze: number;
  /** RCD trip time at 1× (ms) */
  rcdTripTime?: number;
  /** PFC (kA) */
  pfc: number;
}

export interface RequiredTest {
  id: string;
  testPointId: string;
  dialPosition: DialPosition;
  /** Which sub-test within that dial position */
  subTest?:
    | 'r1'
    | 'rn'
    | 'r2'
    | 'ln'
    | 'r1r2'
    | 'L-L'
    | 'L-E'
    // Three-phase circuits: insulation between each pair of lines.
    | 'L1-L2'
    | 'L2-L3'
    | 'L3-L1'
    | 'polarity'
    | 'test_button'
    | 'rcd180';
  gn3Step: number;
  description: string;
}

// ── Test Reading ────────────────────────────────────────────

export interface TestReading {
  id: string;
  circuitId: number;
  testPointId: string;
  dialPosition: DialPosition;
  subTest?: string;
  value: number;
  displayValue: string;
  unit: string;
  compliant: boolean;
  timestamp: number;
  /** Which EIC columns this populates */
  eicColumns: number[];
  /** Taken before a repair that could have changed it (Reg 643.1) — it no
   *  longer counts; the test has to be taken again. */
  stale?: boolean;
}

// ── MFT Instrument State ────────────────────────────────────

export interface MFTState {
  dialPosition: DialPosition;
  isTestActive: boolean;
  currentReading: TestReading | null;
  displayMode: 'idle' | 'testing' | 'result' | 'hold';
  leadConnected: boolean;
}

// ── EIC Form State ──────────────────────────────────────────

export interface EICCertificateData {
  // Pre-filled for AM2 scenario
  clientName: string;
  installationAddress: string;
  descriptionOfWork: string;
  designerName: string;
  installerName: string;
  inspectorName: string;
  supplyType: string; // TN-S, TN-C-S, TT
  supplyVoltage: string;
  /** System type (TN-S, TN-C-S, TT) — written by the learner outside Learn. */
  earthingArrangement: string;
  zeAtOrigin: string;
  pfcAtOrigin: string;
  /** From the drawings: the main switch's rating (A). */
  mainSwitchRating?: string;
  /** From the drawings: main earthing and main bonding conductor sizes (mm²). */
  earthingConductorCsa?: string;
  bondingConductorCsa?: string;
}

export interface EICCircuitDetail {
  circuitNumber: string; // Column 1
  circuitDescription: string; // Column 2
  typeOfWiring: string; // Column 3
  referenceMethod: string; // Column 4
  pointsServed: string; // Column 5
  liveMm2: string; // Column 6
  cpcMm2: string; // Column 7
  ocpdBsStandard: string; // Column 8
  ocpdType: string; // Column 9
  ocpdRating: string; // Column 10
  breakingCapacity: string; // Column 11
  maxPermittedZs: string; // Column 12
  rcdBsStandard: string; // Column 13
  rcdType: string; // Column 14
  rcdIdn: string; // Column 15
  rcdRating: string; // Column 16
}

export interface EICTestResult {
  circuitNumber: string; // Column 17
  ringR1: string; // Column 18
  ringRn: string; // Column 19
  ringR2: string; // Column 20
  r1r2: string; // Column 21
  r2: string; // Column 22
  irTestVoltage: string; // Column 23
  irLiveLive: string; // Column 24
  irLiveEarth: string; // Column 25
  polarity: string; // Column 26
  maxMeasuredZs: string; // Column 27
  rcdDisconnectionTime: string; // Column 28
  rcdTestButton: string; // Column 29
  afddTest: string; // Column 30
  remarks: string; // Column 31
}

export interface EICScheduleState {
  certificate: EICCertificateData;
  circuitDetails: EICCircuitDetail[];
  testResults: EICTestResult[];
  headerFields: {
    dbReference: string;
    location: string;
    ze: string;
    ipf: string;
    phaseSequence: string;
    correctPolarity: string;
    operationalStatus: string;
    spdDetails: string;
  };
}

// ── Testing Simulator State ─────────────────────────────────

export type SimulatorPhase =
  'rig-select' | 'inspection' | 'bonding' | 'origin' | 'functional' | 'testing' | 'eic' | 'summary';

export interface CircuitProgress {
  circuitId: number;
  completedTests: string[]; // RequiredTest ids
  totalTests: number;
  readings: TestReading[];
  status: 'untested' | 'partial' | 'complete';
}

export interface TestingSimulatorState {
  /** null until the learner picks a mode on the rig page. */
  mode: SimMode | null;
  /** Live tests are locked until every dead test is done and this is set (Reg 643.1). */
  energised: boolean;
  leadsNulled: boolean;
  seeded: SeededProblem[];
  mistakes: SimMistake[];
  /** The visual inspection that comes before any test (Reg 642.1). */
  inspection: InspectionState;
  /** Continuity of the main protective bonding conductors (Reg 643.2.1). */
  bonding: BondingState;
  /** Ze, prospective fault current and phase sequence at the origin. */
  origin: OriginState;
  /** Functional testing (Reg 643.10). */
  functional: FunctionalState;
  /** Repairs made during the run, and what each made stale (Reg 643.1). */
  fixes: FixRecord[];
  phase: SimulatorPhase;
  activeCircuitId: number | null;
  activeTestPointId: string | null;
  mft: MFTState;
  circuitProgress: Record<number, CircuitProgress>;
  eic: EICScheduleState;
  gn3CurrentStep: number;
  sessionStartTime: number;
  score: SimulatorScore | null;
}

/** Marks, not weights: testing + schedule + problems caught, out of what was available. */
export interface SimulatorScore {
  overall: number;
  mode: SimMode;
  seconds: number;
  marking: Marking;
}

// ── Actions ─────────────────────────────────────────────────

export type TestingSimulatorAction =
  | { type: 'SELECT_CIRCUIT'; circuitId: number }
  | { type: 'SELECT_TEST_POINT'; testPointId: string }
  | { type: 'SET_DIAL_POSITION'; position: DialPosition }
  | { type: 'START_TEST' }
  | { type: 'COMPLETE_TEST'; reading: TestReading }
  | { type: 'CLEAR_READING' }
  | { type: 'SET_PHASE'; phase: SimulatorPhase }
  | { type: 'UPDATE_EIC_RESULT'; circuitId: number; field: string; value: string }
  | { type: 'UPDATE_EIC_DETAIL'; circuitNumber: string; field: string; value: string }
  | { type: 'UPDATE_EIC_CERT'; field: string; value: string }
  | { type: 'BACK_TO_RIG' }
  | { type: 'CALCULATE_SCORE' }
  | { type: 'RESET_SESSION' }
  | { type: 'RESTORE'; state: TestingSimulatorState }
  | {
      type: 'SET_MODE';
      mode: SimMode;
      seeded: SeededProblem[];
      inspection: InspectionState;
      bonding: BondingState;
      origin: OriginState;
      functional: FunctionalState;
    }
  | { type: 'UPDATE_BONDING'; patch: Partial<BondingState>; mistake?: SimMistake }
  | { type: 'ANSWER_INSPECTION'; id: string; verdict: InspectionVerdict }
  | { type: 'FINISH_INSPECTION' }
  | { type: 'UPDATE_ORIGIN'; patch: Partial<OriginState>; mistake?: SimMistake }
  | { type: 'UPDATE_FUNCTIONAL'; patch: Partial<FunctionalState>; mistake?: SimMistake }
  /** Put something right on a circuit — or on a bond — and make stale what it could affect. */
  | { type: 'RECTIFY'; circuitId: number; optionId: string }
  | { type: 'RECTIFY_BOND'; bond: string; optionId: string }
  | { type: 'ENERGISE' }
  /** Isolate the board again — for a repair, or a dead test to repeat. */
  | { type: 'DEENERGISE' }
  | { type: 'NULL_LEADS' }
  | { type: 'LOG_MISTAKE'; mistake: SimMistake };
