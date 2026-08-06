/**
 * Verified Appendix 4 current-carrying capacity for a schedule row.
 *
 * Its own module so both the legacy `regulationChecker` validators and the new
 * rule registry can use it without importing each other — an earlier version
 * had `cableProtectiveDeviceValidator` and `overloadProtection` importing one
 * another, and the resulting cycle left the app rendering a blank page.
 */
import { TestResult } from '@/types/testResult';
import { capacityTables, type CableTypeKey } from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';

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
//
// ELE-1504 — methods 100–103 were absent from this map, so every circuit
// recorded against one resolved to null and fell through to the generic column,
// which is Method C (clipped direct). Those four methods are cables in thermal
// insulation and carry the LOWEST capacities in Table 4D5, so the fallback
// overstated capacity on precisely the circuits most at risk of overheating: a
// 25 A device on 2.5 mm² passed under method 100 (real Iz 21 A) while correctly
// failing under the less severe method A (Iz 20 A). 504 live circuits are
// recorded against 100–103.
//
// The values were already present and correct in the verified Appendix 4
// dataset — re-checked cell by cell against Table 4D5 on page 484 of the
// standard, 2026-08-06. Only the mapping was missing.
const METHOD_TO_KEY: Record<string, string> = {
  A: 'method-a',
  B: 'method-b',
  C: 'method-c',
  D: 'method-d2', // buried direct
  E: 'method-e',
  F: 'method-b', // trunking on a wall
  // Table 4D5 only — flat twin and earth. Any other cable type recorded against
  // these resolves to null and the caller abstains, which is correct: there is
  // no published figure to judge it against.
  '100': 'method-100', // above a plasterboard ceiling, insulation ≤ 100 mm
  '101': 'method-101', // above a plasterboard ceiling, insulation > 100 mm
  '102': 'method-102', // in an insulated stud wall, touching the inner surface
  '103': 'method-103', // in an insulated stud wall, not touching the inner surface
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
export const getVerifiedCableCapacity = (result: TestResult, isRing: boolean): number | null => {
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

