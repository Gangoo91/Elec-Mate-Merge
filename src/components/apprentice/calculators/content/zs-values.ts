import type { CalculatorContent } from './types';

/**
 * Maximum Zs values — grounded against BS 7671:2018+A4:2026.
 * Reg 411.3.1.2 + Table 41.1 (disconnection times) verified against facets.
 * Maximum Zs figures are tabulated in Tables 41.2–41.4.
 */
export const zsValuesContent: CalculatorContent = {
  slug: 'zs-values',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Earth fault loop impedance (Zs) must be low enough that the protective device disconnects within the required time during an earth fault.',
    'If measured Zs exceeds the maximum for the device, the fault current may be too low to trip it quickly, leaving dangerous touch voltages present.',
    'The limits depend on the device type and rating, the earthing system, and the required disconnection time (0.4 s or 5 s).',
  ],

  whenToCheck: [
    'After installation, comparing measured Zs against the maximum for the protective device',
    'At design stage, to confirm the chosen device will disconnect in time',
    'When the maximum disconnection time is 0.4 s (final circuits ≤ 63 A with socket-outlets, or ≤ 32 A fixed equipment) per Reg 411.3.1.2',
    'Remember to correct tabulated maxima for conductor temperature (the 0.8 / Cmin rule of thumb)',
  ],

  commonMistakes: [
    'Comparing measured (cold) Zs against the full tabulated maximum without applying the temperature/rule-of-thumb correction',
    'Using the wrong device type column (Type B vs C vs D have very different maxima)',
    'Mixing up the 0.4 s and 5 s disconnection-time requirements',
    'Forgetting that Zs = Ze + (R1 + R2)',
  ],

  workedExample: {
    scenario: '32 A Type B MCB on a TN system, final circuit with socket-outlets (0.4 s disconnection).',
    inputs: [
      { label: 'Device', value: '32 A Type B' },
      { label: 'Disconnection time', value: '0.4 s' },
      { label: 'Tabulated max Zs (Table 41.3)', value: '1.37 Ω' },
    ],
    steps: [
      'Type B trips at 5 × In → Ia = 5 × 32 = 160 A',
      'Max Zs = U0 × Cmin ÷ Ia = 230 × 0.95 ÷ 160',
      'Max Zs = 218.5 ÷ 160 = 1.37 Ω',
      'Apply the rule-of-thumb correction (× 0.8) when comparing a cold measured value: 1.09 Ω',
    ],
    result: 'Measured Zs must be ≤ ~1.09 Ω (cold) to satisfy the 1.37 Ω design maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.3.1.2',
      clauseText:
        'The maximum disconnection times in Table 41.1 shall apply to final circuits rated up to 63 A with one or more socket-outlets, and to final circuits rated up to 32 A supplying only fixed connected current-using equipment.',
      tableRefs: ['Table 41.1', 'Table 41.2', 'Table 41.3', 'Table 41.4'],
      sourceFacetIds: ['9f714882-23a7-4f4a-8b27-08d21783177c', 'c60b151a-198d-4d1e-ba04-b5750c64a253'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 411.3.1.2 + Table 41.1 verified against A4:2026 facets. Max Zs figures from Tables 41.2–41.4 (numeric tables not individually faceted); match the calculator engine (src/data/zsLimits.ts).',
  },
};
