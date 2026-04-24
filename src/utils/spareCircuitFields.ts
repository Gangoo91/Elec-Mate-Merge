/**
 * Shared definition of the field cascade applied when a user marks a circuit
 * as "Spare" in the Schedule of Tests.
 *
 * Per customer request (see WhatsApp, 2026-04-24): clicking Spare should set
 * EVERY test + circuit-detail field to 'N/A', with `pointsServed = "0"`.
 * Previously only a subset of the test fields were being set, leaving users
 * to manually N/A ~20 fields per spare way.
 *
 * Used by both the desktop Schedule of Tests and the mobile equivalent so the
 * cascade stays consistent across surfaces.
 */

export const getSpareCircuitFields = (): Record<string, string> => ({
  // Description — overwrite whatever was there with "Spare"
  circuitDescription: 'Spare',

  // Circuit details (per BS 7671 Schedule of Circuit Details columns)
  typeOfWiring: 'N/A',
  referenceMethod: 'N/A',
  liveSize: 'N/A',
  cpcSize: 'N/A',

  // Overcurrent protective device
  bsStandard: 'N/A',
  protectiveDeviceType: 'N/A',
  protectiveDeviceCurve: 'N/A',
  protectiveDeviceRating: 'N/A',
  protectiveDeviceKaRating: 'N/A',
  maxZs: 'N/A',

  // RCD block
  rcdBsStandard: 'N/A',
  rcdType: 'N/A',
  rcdRating: 'N/A',
  rcdRatingA: 'N/A',

  // Continuity tests
  r1r2: 'N/A',
  r2: 'N/A',
  ringContinuityLive: 'N/A',
  ringContinuityNeutral: 'N/A',
  ringR1: 'N/A',
  ringRn: 'N/A',
  ringR2: 'N/A',

  // Insulation tests
  insulationTestVoltage: 'N/A',
  insulationLiveNeutral: 'N/A',
  insulationLiveEarth: 'N/A',
  insulationResistance: 'N/A',
  insulationNeutralEarth: 'N/A',

  // Earth fault loop + RCD tests
  polarity: 'N/A',
  zs: 'N/A',
  rcdOneX: 'N/A',
  rcdFiveX: 'N/A',
  rcdHalfX: 'N/A',
  rcdTestButton: 'N/A',

  // AFDD + functional test
  afddTest: 'N/A',
  functionalTest: 'N/A',
  functionalTesting: 'N/A',

  // Points served — zero, not N/A (there are literally no points on a spare)
  pointsServed: '0',
});
