import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';
import { getCableCapacity, getCableSizeForRating } from './cableCapacityCalculator';
import { getVerifiedCableCapacity } from './cableCapacity';
import { overloadProtectionRule } from '@/utils/validation/rules/overloadProtection';

const MISSING_TO_FIELD: Record<string, keyof TestResult> = {
  'reference method': 'referenceMethod',
  'cable size': 'liveSize',
  'live conductor size': 'liveSize',
  'device rating': 'protectiveDeviceRating',
  'protective device rating': 'protectiveDeviceRating',
  'bs standard': 'bsStandard',
  'device type': 'protectiveDeviceType',
};

// ── ELE-1366: Iz from the circuit's ACTUAL wiring type + reference method ──
// The old check used one generic capacity column (16mm = 76A) and hardcoded
// Method C, so it falsely failed cables that legitimately carry more — e.g. a
// 16mm SWA sub-main (89A) or even 16mm T&E clipped (85A, not 76A) on an 80A
// BS 88. This resolves capacity from the verified Appendix 4 tables (ELE-1257,
// values transcribed + adversarially re-read vs the standard / OSG, matching
// bs7671_facets) keyed on the schedule's own Type-of-Wiring (col 3) and
// Reference Method (col 4) codes. Defaults lean conservative (understate → more
// likely to warn), and any unresolved case falls back to the generic column so
// behaviour is never worse than before.

// Helper function to detect lighting circuits
const isLightingCircuit = (result: TestResult): boolean => {
  const circuitType = result.type?.toLowerCase() || '';
  const description = result.circuitDescription?.toLowerCase() || '';

  // Check for common lighting circuit indicators
  const lightingKeywords = [
    'light',
    'lights',
    'lighting',
    'downstairs lights',
    'upstairs lights',
    'kitchen lights',
    'outdoor lights',
    'bedroom lights',
    'bathroom lights',
    'hall lights',
    'landing lights',
  ];

  return lightingKeywords.some(
    (keyword) => circuitType.includes(keyword) || description.includes(keyword)
  );
};

// Check cable and protective device compatibility
//
// Delegates to the rule in `utils/validation/rules/overloadProtection.ts` so
// there is ONE implementation of Regulation 433. That rule covers three things
// this validator never did, each verified against the printed standard:
//
//   433.1.1(c) / 433.1.202 — a semi-enclosed fuse to BS 3036 must not exceed
//     0.725 × Iz. For a BS EN 60898 breaker this follows from In ≤ Iz, which is
//     why it went unnoticed; for a rewireable fuse it does not. A 20 A BS 3036
//     on 2.5 mm² (Iz 27 A) passed here and is over by 0.4 A.
//
//   433.1.204 — a ring final supplying BS 1363 accessories is judged on
//     Iz ≥ 20 A, not on the device rating. Doubling Iz and comparing to In (the
//     old behaviour) passes any 32 A ring whose single-cable Iz is 16 A or more
//     — a 2.5 mm² ring on reference method 101 has Iz 17 A and passed.
//
//   The same regulation expressly permits BS 3036 on a 30/32 A ring, so the
//     0.725 factor must NOT be applied there.
//
// The rule abstains rather than guesses when it cannot establish its inputs;
// those become warnings here so an unverifiable circuit is never silently
// indistinguishable from a passing one.
export const checkCableProtectiveDeviceMatch = (result: TestResult): RegulationWarning[] => {
  const outcome = overloadProtectionRule.evaluate(result, {
    revision: 'A4:2026',
    nominalVoltage: 230,
  });

  /**
   * The rule reports what it needed in prose ("reference method"); the grid
   * needs the field name. One map, so a reworded message cannot silently stop
   * flagging a cell — an unmapped phrase yields no field, which shows the
   * finding in the sheet without a marker rather than marking the wrong cell.
   */
  if (outcome.status === 'fail') {
    return [
      {
        severity: 'critical',
        title: outcome.title ?? 'Cable Undersized for Protective Device',
        // The finding is the relationship between the device, the cable and how
        // it is installed — so all three are flagged, not just one.
        fields: ['protectiveDeviceRating', 'liveSize', 'referenceMethod'],
        description: [outcome.message, outcome.detail].filter(Boolean).join(' '),
        regulation: 'BS 7671 Regulation 433.1.1 (and 433.1.202 / 433.1.204)',
        suggestion: outcome.suggestion ?? 'Increase the cable size or reduce the device rating.',
      },
    ];
  }

  if (outcome.status === 'abstain') {
    return [
      {
        severity: 'warning',
        title: 'Overload Protection Not Verified',
        // An abstain names what is missing, so flag exactly those cells rather
        // than the whole relationship — the electrician needs to know which box
        // to fill, not which rule could not run.
        fields: (outcome.missing ?? [])
          .map((m) => MISSING_TO_FIELD[m.toLowerCase()])
          .filter(Boolean) as (keyof TestResult)[],
        description: outcome.message,
        regulation: 'BS 7671 Regulation 433.1.1',
        suggestion: `Record: ${outcome.missing.join(', ').toLowerCase()}.`,
      },
    ];
  }

  return [];
};
