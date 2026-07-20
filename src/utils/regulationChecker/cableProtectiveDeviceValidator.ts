import { TestResult } from '@/types/testResult';
import { RegulationWarning } from './types';
import { isRingCircuit } from './ringCircuitDetector';
import { getCableCapacity, getCableSizeForRating } from './cableCapacityCalculator';
import { capacityTables, type CableTypeKey } from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';

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

// Type of Wiring (col 3): A=T&E B=Singles C=Thermosetting D=MICC E=Flexible F=SWA/AWA O=Other
const WIRING_TO_CABLE_KEY: Record<string, CableTypeKey> = {
  A: 'twin-earth', // flat T&E — Table 4D5
  B: 'pvc-single', // singles — Table 4D1A
  C: 'xlpe-multicore', // thermosetting (90°C) — Table 4E2A (multicore = conservative)
  D: 'mineral-light', // MICC — light duty (conservative)
  F: 'swa-pvc', // armoured — Table 4D4A (PVC = conservative vs XLPE SWA)
  // E (Flexible) / O (Other) intentionally unmapped → generic fallback
};

// Reference Method (col 4): A=Conduit B=Open/Enclosed C=Clipped D=Ground E=Free air F=Trunking
const METHOD_TO_KEY: Record<string, string> = {
  A: 'method-a',
  B: 'method-b',
  C: 'method-c',
  D: 'method-d2', // buried direct
  E: 'method-e',
  F: 'method-b', // trunking on a wall
};

// '16mm' → '16.0', '2.5mm' → '2.5', '10mm' → '10.0' (module CSA key format)
const toCsaKey = (liveSize: string): string => {
  const n = parseFloat(String(liveSize).replace(/[^\d.]/g, ''));
  if (!isFinite(n) || n <= 0) return '';
  return Number.isInteger(n) ? `${n}.0` : `${n}`;
};

/**
 * Verified Iz (A) for this circuit, or null when it can't be resolved (caller
 * then falls back to the generic column). Strict: no cross-method / cross-phase
 * substitution, so we never overstate capacity into a false PASS.
 */
const getVerifiedCableCapacity = (result: TestResult, isRing: boolean): number | null => {
  const wiring = (result.typeOfWiring || 'A').toUpperCase();
  const method = (result.referenceMethod || 'C').toUpperCase();
  const cableKey = WIRING_TO_CABLE_KEY[wiring];
  const methodKey = METHOD_TO_KEY[method];
  if (!cableKey || !methodKey) return null;

  const col = capacityTables[cableKey]?.methods[methodKey];
  if (!col) return null;

  const set = result.phaseType === '3P' ? col.threePhase : col.singlePhase;
  const iz = set?.[toCsaKey(result.liveSize)];
  if (iz == null) return null;

  // A ring is two legs in parallel (matches the generic path's ×2).
  return isRing ? iz * 2 : iz;
};

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
export const checkCableProtectiveDeviceMatch = (result: TestResult): RegulationWarning[] => {
  const warnings: RegulationWarning[] = [];

  if (!result.liveSize || !result.protectiveDeviceRating) {
    return warnings;
  }

  const isRing = isRingCircuit(result);
  const isLighting = isLightingCircuit(result);
  // In ≤ Iz (Reg 433.1.1) — verified Appendix 4 capacity for the circuit's
  // actual wiring type + reference method, falling back to the generic column
  // only when it can't be resolved (never worse than before). ELE-1366.
  const cableCapacity =
    getVerifiedCableCapacity(result, isRing) ??
    getCableCapacity(result.liveSize, 'method_c', isRing);
  const deviceRating = parseInt(result.protectiveDeviceRating);

  if (cableCapacity === 0 || isNaN(deviceRating)) {
    return warnings;
  }

  // BS 7671 Regulation 433.1.1 - Cable capacity must exceed protective device rating
  if (deviceRating > cableCapacity) {
    const capacityNote = isRing
      ? ` (${cableCapacity / 2}A × 2 parallel paths = ${cableCapacity}A effective capacity)`
      : ` (${cableCapacity}A capacity)`;
    warnings.push({
      severity: 'critical',
      title: 'Cable Undersized for Protective Device',
      description: `${result.liveSize} cable${capacityNote} cannot safely carry ${deviceRating}A protective device rating.`,
      regulation: 'BS 7671 Regulation 433.1.1',
      suggestion: `Use minimum ${getCableSizeForRating(deviceRating, 'method_c', isRing)} cable for ${deviceRating}A protection${isRing ? ' in ring configuration' : ''}.`,
    });
  }

  // "Cable May Be Oversized" warning REMOVED (ELE-709).
  // BS 7671 Section 433 defines MINIMUM cable size — using a larger cable is always
  // safer and never a compliance issue. The warning confused electricians doing
  // standard work (e.g. 1.5mm/6A lighting circuits) and provided no safety value.

  return warnings;
};
