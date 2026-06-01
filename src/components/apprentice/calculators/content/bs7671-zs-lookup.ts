import type { CalculatorContent } from './types';

/**
 * BS 7671 Zs lookup — Tables 41.2–41.4.
 */
export const bs7671ZsLookupContent: CalculatorContent = {
  slug: 'bs7671-zs-lookup',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'The maximum earth fault loop impedance for a device is tabulated in BS 7671 (Tables 41.2–41.4) — look it up rather than re-derive it every time.',
    'The figure depends on the device type and rating and the required disconnection time (0.4 s or 5 s).',
    'Tabulated maxima assume the conductor at its operating temperature, so a cold measured value should be compared after applying the rule-of-thumb correction (×0.8).',
    'If measured Zs exceeds the tabulated maximum, the device will not disconnect in time and the circuit fails ADS.',
  ],

  whenToCheck: [
    'Verifying a measured Zs against the correct device maximum',
    'At design stage, to confirm a chosen device suits the expected loop impedance',
    'When selecting between Type B, C and D for the available Zs',
    'During periodic inspection and EICR coding',
  ],

  commonMistakes: [
    'Reading the wrong device-type column (B/C/D differ greatly)',
    'Comparing a cold measured Zs to the full tabulated value without the 0.8 correction',
    'Mixing the 0.4 s and 5 s tables',
    'Using a fuse table for an MCB (or vice versa)',
  ],

  workedExample: {
    scenario: '40 A Type B MCB, TN, 0.4 s.',
    inputs: [
      { label: 'Device', value: '40 A Type B' },
      { label: 'Trip multiple', value: '5 × In = 200 A' },
      { label: 'Tabulated max Zs', value: '1.09 Ω' },
    ],
    steps: [
      'Max Zs = U0 × Cmin ÷ Ia = 230 × 0.95 ÷ 200',
      'Max Zs = 218.5 ÷ 200 = 1.09 Ω (design)',
      'Apply ×0.8 for a cold measured comparison → 0.87 Ω',
    ],
    result: 'Measured Zs must be ≤ ~0.87 Ω (cold) against the 1.09 Ω design maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Tables 41.2–41.4 — maximum Zs',
      clauseText:
        'Maximum earth fault loop impedance values for fuses (41.2/41.4), and for circuit-breakers/RCBOs (41.3), are tabulated for the required disconnection time. The device-protected circuit complies when measured Zs does not exceed the (temperature-corrected) tabulated value.',
      tableRefs: ['Table 41.1', 'Table 41.2', 'Table 41.3', 'Table 41.4'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Max-Zs relationship (U0·Cmin/Ia) and the 0.8 rule match the engine and zsLimits data. Numeric tables not individually faceted.',
  },
};
