import type { CalculatorContent } from './types';

/**
 * Fault level — BS 7671 Reg 434.5.1 (breaking capacity).
 *
 * This file previously cited 434.5.2 for breaking capacity. Verified against the
 * printed A4:2026 text: 434.5.1 carries the breaking-capacity duty and the
 * back-up-protection exception; 434.5.2 is the conductor's thermal withstand
 * (the let-through / adiabatic check), a different question entirely.
 */
export const faultLevelContent: CalculatorContent = {
  slug: 'fault-level',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Fault level is the prospective current on a dead short; every protective device must be able to break that current safely — its breaking capacity must equal or exceed the fault level at its location.',
    'It is highest at the origin (close to the source/transformer) and falls with distance as cable impedance adds up.',
    'Fed from a transformer, the fault level depends on the transformer rating and its percentage impedance.',
    'A device with too low a breaking capacity can fail explosively during a fault — this is a fundamental safety check.',
  ],

  whenToCheck: [
    'Selecting devices at the origin and at sub-distribution boards',
    'When a transformer or DNO supply fault level is declared',
    'Confirming the breaking capacity (Icn / Ics) of MCBs and MCCBs',
    'After supply changes that raise the available fault current',
  ],

  commonMistakes: [
    'Choosing a device whose breaking capacity is below the fault level',
    'Assuming the same fault level throughout (it falls with distance)',
    'Ignoring motor contribution to fault current on larger systems',
    'Mixing up percentage impedance and per-unit values',
  ],

  workedExample: {
    scenario: '500 kVA transformer, 4% impedance, 400 V secondary.',
    inputs: [
      { label: 'Transformer', value: '500 kVA' },
      { label: 'Impedance', value: '4%' },
      { label: 'Secondary voltage', value: '400 V' },
    ],
    steps: [
      'Full-load current = 500 000 ÷ (√3 × 400) ≈ 722 A',
      'Fault level ≈ FLC ÷ (Z% / 100) = 722 ÷ 0.04',
      'Fault level ≈ 18 kA at the transformer terminals',
    ],
    result: '≈ 18 kA at the LV terminals — devices there need breaking capacity ≥ 18 kA.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.1 — Breaking capacity of a fault current protective device',
      clauseText:
        'A device shall be capable of breaking — and for a circuit-breaker, making — the fault current up to and including the maximum prospective fault current at the point where it is installed (Reg 432.3). Regulation 434.5.1 permits a device with a LOWER rated breaking capacity than the prospective short-circuit current at its point of installation, but only under specific conditions: back-up protection by an upstream device, selected per the downstream manufacturer’s instructions derived from product-standard tests (for example BS EN 60947-2, BS EN 60898-1). Where the manufacturer gives no such information, combined short-circuit protection shall not be used and each device must have the required capability in its own right.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.2 — thermal withstand of the conductor',
      clauseText:
        'A separate question from breaking capacity: 434.5.2 governs whether the CONDUCTOR survives the fault, via the let-through energy the device permits against the conductor’s k²S². A device can interrupt the fault safely and still leave a cable that has been damaged, which is why the adiabatic check is a second step and not an alternative.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'CITATION CORRECTED against the printed A4:2026 text (Desktop/BS7671_ocr.pdf). Breaking capacity is Reg 434.5.1 (with the back-up-protection exception and the manufacturer-instruction condition), and the duty to break the full prospective fault current is Reg 432.3. Reg 434.5.2 is the conductor’s thermal withstand — the two were transposed here. Fault-level arithmetic (FLC ÷ Z%) matches the engine.',
  },
};
