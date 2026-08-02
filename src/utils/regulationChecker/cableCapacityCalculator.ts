import { cableSizeOptions } from '@/types/cableTypes';

// Installation-method derating used by the quick cable-capacity guidance.
//
// ⚠️ GUIDANCE FIGURES, NOT BS 7671 DATA. Appendix 4 publishes a tabulated
// current-carrying capacity per reference method (Tables 4D1A–4G1A) — it does
// not publish multipliers off Method C. These factors are an in-house
// approximation for indicative guidance only; never present a result derived
// from them as a BS 7671 Appendix 4 value or as a pass/fail against it. For
// real Iz values use `@/lib/calculators/bs7671-data/appendix4CurrentCapacity`
// (verified per-method tables), as `cableProtectiveDeviceValidator` now does.
export const installationMethods = {
  method_c: { label: 'Method C (Clipped Direct)', factor: 1.0 },
  method_a1: { label: 'Method A1 (Conduit in Wall)', factor: 0.87 },
  method_b: { label: 'Method B (Trunking)', factor: 0.91 },
  method_d: { label: 'Method D (Direct Buried)', factor: 1.1 },
  method_e: { label: 'Method E (Free Air)', factor: 1.2 },
};

// NOTE: the old `voltageDropFactors` table and the `calculateVoltageDrop` /
// `getMaximumCableLength` helpers were removed here. They held a SINGLE
// mV/A/m constant per cable type (18 = the 2.5 mm² T&E figure) and then divided
// by the CSA again — Appendix 4's mV/A/m is already per conductor size, so the
// drop was under-reported by a factor of the CSA. They also combined R and X as
// √(R²+X²) instead of R·cosφ + X·sinφ, and applied a flat 5% limit where
// Appendix 4 §6.4 gives 3% for lighting. Nothing consumed them.
//
// Voltage drop belongs to the verified Appendix 4 dataset in
// `@/lib/calculators/bs7671-data/` — use that, per size and reference method.

export const cableTypes = [
  { value: 'pvc_copper', label: '70°C PVC Copper', tempRating: 70 },
  { value: 'xlpe_copper', label: '90°C XLPE Copper', tempRating: 90 },
  { value: 'pvc_aluminium', label: '70°C PVC Aluminium', tempRating: 70 },
  { value: 'armoured_copper', label: 'Armoured Copper', tempRating: 70 },
  { value: 'armoured_aluminium', label: 'Armoured Aluminium', tempRating: 70 },
];

// Enhanced cable capacity calculation with installation method
export const getCableCapacity = (
  cableSize: string,
  installationMethod: string = 'method_c',
  isRingCircuit: boolean = false
): number => {
  const cable = cableSizeOptions.find((option) => option.value === cableSize);
  const method = installationMethods[installationMethod as keyof typeof installationMethods];

  if (!cable || !method) return 0;

  const adjustedCapacity = cable.currentCarryingCapacity * method.factor;
  return isRingCircuit ? adjustedCapacity * 2 : adjustedCapacity;
};

// Get minimum cable size for a given protective device rating
export const getCableSizeForRating = (
  rating: number,
  installationMethod: string = 'method_c',
  isRingCircuit: boolean = false
): string => {
  const method = installationMethods[installationMethod as keyof typeof installationMethods];
  if (!method) return 'Invalid method';

  const requiredCapacity = isRingCircuit ? rating / 2 : rating;
  const adjustedRequired = requiredCapacity / method.factor;

  const suitableCables = cableSizeOptions.filter(
    (cable) => cable.currentCarryingCapacity >= adjustedRequired
  );

  return suitableCables.length > 0 ? suitableCables[0].label : 'Check manufacturer data';
};
