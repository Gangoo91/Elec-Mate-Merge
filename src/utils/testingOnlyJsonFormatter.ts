/**
 * testingOnlyJsonFormatter.ts
 * Formats Testing Only certificate form data for PDF generation.
 *
 * Uses the same TestResult[] (scheduleOfTests) and DistributionBoard[]
 * format as EICR/EIC, with boards grouped with their circuits.
 *
 * NO branding fields — intentionally omitted for Testing Only certificates.
 */

import { getBoardWays } from '@/types/distributionBoard';

// ── Helpers ─────────────────────────────────────────────────────────────────

const str = (value: unknown, fallback = ''): string => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number') return String(value);
  return String(value);
};

/** Returns 'N/A' if value is empty — used for circuit fields on the PDF */
const strOrNA = (value: unknown): string => {
  const s = str(value);
  return s || 'N/A';
};

const normalisePolarity = (v: unknown): string => {
  const s = str(v);
  if (!s || s === 'N/A') return 'N/A';
  if (['Correct', 'correct', 'OK', '✓', 'Satisfactory', 'Y', 'pass'].includes(s)) return 'Y';
  if (['Incorrect', 'incorrect', '✗', 'N', 'fail'].includes(s)) return 'N';
  return s;
};

const normaliseYesNo = (v: unknown): string => {
  const s = str(v);
  if (!s || s === 'N/A') return 'N/A';
  if (['Pass', 'pass', 'OK', '✓', 'Satisfactory', 'Y'].includes(s)) return 'Y';
  if (['Fail', 'fail', '✗', 'N'].includes(s)) return 'N';
  return s;
};

// ── Circuit formatter (matches EICR's formatCircuit output) ────────────────

const formatCircuit = (result: any) => ({
  id: result.id || '',
  circuit_number: strOrNA(result.circuitNumber),
  circuit_description: strOrNA(result.circuitDescription),
  type_of_wiring: strOrNA(result.typeOfWiring),
  reference_method: strOrNA(result.referenceMethod),
  points_served: strOrNA(result.pointsServed),
  live_size: strOrNA(result.liveSize),
  cpc_size: strOrNA(result.cpcSize),
  bs_standard: strOrNA(result.bsStandard),
  protective_device_type: strOrNA(result.protectiveDeviceType),
  protective_device_curve: strOrNA(result.protectiveDeviceCurve),
  protective_device_rating: strOrNA(result.protectiveDeviceRating),
  protective_device_ka_rating: strOrNA(result.protectiveDeviceKaRating),
  max_zs: strOrNA(result.maxZs),
  rcd_bs_standard: strOrNA(result.rcdBsStandard),
  rcd_type: strOrNA(result.rcdType),
  rcd_rating: strOrNA(result.rcdRating),
  rcd_rating_a: strOrNA(result.rcdRatingA),
  ring_r1: strOrNA(result.ringR1),
  ring_rn: strOrNA(result.ringRn),
  ring_r2: strOrNA(result.ringR2),
  r1r2: strOrNA(result.r1r2),
  r2: strOrNA(result.r2),
  insulation_test_voltage: strOrNA(result.insulationTestVoltage),
  insulation_live_neutral: strOrNA(result.insulationLiveNeutral),
  insulation_live_earth: strOrNA(result.insulationLiveEarth),
  polarity: normalisePolarity(result.polarity),
  zs: strOrNA(result.zs),
  rcd_one_x: strOrNA(result.rcdOneX),
  rcd_test_button: normaliseYesNo(result.rcdTestButton),
  afdd_test: normaliseYesNo(result.afddTest),
  notes: str(result.notes),
});

// ── Board formatter (matches EICR's formatBoardsWithSchedules output) ──────

const MAIN_BOARD_ID = 'main-cu';

const formatBoards = (formData: Record<string, any>, testResults: any[]) => {
  const boards = formData.distributionBoards || [];

  // No boards defined but we have test results — create a default main board
  if (!Array.isArray(boards) || boards.length === 0) {
    if (testResults.length > 0) {
      return [{
        db_reference: 'Main DB',
        db_location: '',
        db_manufacturer: '',
        db_type: '',
        db_ways: '',
        db_zdb: '',
        db_ipf: '',
        zdb: '',
        ipf: '',
        polarity_confirmed: false,
        phase_sequence_confirmed: false,
        spd_operational: false,
        spd_na: false,
        spd_make: '',
        spd_model: '',
        spd_location: '',
        spd_rated_current_ka: '',
        main_switch_type: '',
        main_switch_rating: '',
        circuit_count: testResults.length,
        circuits: testResults.map(formatCircuit),
      }];
    }
    return [];
  }

  return boards.map((board: any) => {
    const boardId = board.id || MAIN_BOARD_ID;
    const boardCircuits = testResults.filter(
      (r: any) => (r.boardId || MAIN_BOARD_ID) === boardId
    );

    return {
      db_reference: board.reference || board.name || 'Main DB',
      db_location: board.location || '',
      db_manufacturer: board.make || '',
      db_type: board.type || '',
      db_ways: getBoardWays(board)?.toString() || '',
      db_zdb: board.zdb || '',
      db_ipf: board.ipf || '',
      zdb: board.zdb || '',
      ipf: board.ipf || '',
      supplied_from: board.suppliedFrom || '',
      incoming_device_bs_en: board.incomingDeviceBsEn || '',
      incoming_device_type: board.incomingDeviceType || '',
      incoming_device_rating: board.incomingDeviceRating || '',
      polarity_confirmed: board.confirmedCorrectPolarity ?? false,
      phase_sequence_confirmed: board.confirmedPhaseSequence ?? false,
      spd_operational: board.spdOperationalStatus ?? false,
      spd_na: board.spdNA ?? false,
      spd_make: board.spdMake || '',
      spd_model: board.spdModel || '',
      spd_location: board.spdLocation || '',
      spd_rated_current_ka: board.spdRatedCurrentKa || '',
      main_switch_bs_en: board.mainSwitchBsEn || '',
      main_switch_type: board.mainSwitchType || '',
      main_switch_rating: board.mainSwitchRating || '',
      main_switch_poles: board.mainSwitchPoles || '',
      circuit_count: boardCircuits.length,
      circuits: boardCircuits.map(formatCircuit),
    };
  });
};

// ── Inline defaults ────────────────────────────────────────────────────────

const defaults: Record<string, any> = {
  referenceNumber: '',
  testDate: '',
  testerName: '',
  testerQualifications: '',
  testerPhone: '',
  testerEmail: '',
  clientName: '',
  declarationConfirmed: false,
  mftMake: '',
  mftModel: '',
  mftSerial: '',
  mftCalDate: '',
  loopMake: '',
  loopSerial: '',
  rcdTesterMake: '',
  rcdTesterSerial: '',
  installationAddress: '',
  installationDescription: '',
  workCarriedOut: '',
  numberOfCircuits: '',
  scheduleOfTests: [],
  distributionBoards: [],
  testerSignature: '',
  testerDate: '',
  notes: '',
};

// ── Main formatter ──────────────────────────────────────────────────────────

export const formatTestingOnlyJson = (formData: Record<string, any>) => {
  const merged = { ...defaults, ...formData };

  const testResults = Array.isArray(merged.scheduleOfTests) ? merged.scheduleOfTests : [];
  const boards = formatBoards(merged, testResults);

  // Flat circuits list (for backward compat / simple templates)
  const circuits = testResults.map((r: any) => formatCircuit(r));

  return {
    // Certificate header
    referenceNumber: str(merged.referenceNumber),
    testDate: str(merged.testDate),

    // Tester details
    testerName: str(merged.testerName),
    testerQualifications: str(merged.testerQualifications),
    testerPhone: str(merged.testerPhone),
    testerEmail: str(merged.testerEmail),

    // Client / Main Contractor
    clientName: str(merged.clientName),
    declarationConfirmed: merged.declarationConfirmed ?? false,

    // MFT instrument
    mftMake: str(merged.mftMake),
    mftModel: str(merged.mftModel),
    mftSerial: str(merged.mftSerial),
    mftCalDate: str(merged.mftCalDate),

    // Loop tester
    loopMake: str(merged.loopMake),
    loopSerial: str(merged.loopSerial),

    // RCD tester
    rcdTesterMake: str(merged.rcdTesterMake),
    rcdTesterSerial: str(merged.rcdTesterSerial),

    // Installation
    installationAddress: str(merged.installationAddress),
    installationDescription: str(merged.installationDescription),
    workCarriedOut: str(merged.workCarriedOut),
    numberOfCircuits: str(merged.numberOfCircuits || testResults.length),

    // Boards with grouped circuits (same format as EICR)
    boards,

    // Flat circuits list (backward compat)
    circuits,

    // Signature & notes
    testerSignature: str(merged.testerSignature),
    testerDate: str(merged.testerDate),
    notes: str(merged.notes),
  };
};
