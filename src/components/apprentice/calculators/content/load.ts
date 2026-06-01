import type { CalculatorContent } from './types';

/**
 * Load assessment — BS 7671 Reg 311.1 / 433.1.
 */
export const loadContent: CalculatorContent = {
  slug: 'load',
  governingStandards: ['BS 7671', 'IET On-Site Guide'],

  whyItMatters: [
    'Adding up the connected loads (with diversity) gives the maximum demand that the circuit, board and supply must carry.',
    'From the demand you get the current — I = P ÷ V single-phase, or P ÷ (√3·V·pf) three-phase — which sizes the device and cable so Ib ≤ In ≤ Iz.',
    'A design margin (commonly ×1.25 for continuous loads) keeps the cable and device comfortably within rating.',
    'Under-assessing overloads the installation; over-assessing wastes copper and supply capacity.',
  ],

  whenToCheck: [
    'Estimating the demand and current for a board or sub-main',
    'Sizing the protective device and cable for a mix of loads',
    'Applying diversity to avoid oversizing the supply',
    'Checking spare capacity before adding a load',
  ],

  commonMistakes: [
    'Summing connected load with no diversity',
    'Omitting the continuous-load design margin',
    'Mixing kW and kVA when converting to current',
    'Letting the device rating fall outside Ib ≤ In ≤ Iz',
  ],

  workedExample: {
    scenario: 'Diversified demand 9.2 kW, single-phase 230 V.',
    inputs: [
      { label: 'Maximum demand', value: '9.2 kW' },
      { label: 'Supply', value: '230 V' },
    ],
    steps: [
      'I = P ÷ V = 9200 ÷ 230 = 40 A',
      'Apply margin for continuous load (×1.25): 50 A design current',
      'Select device and cable so Ib ≤ In ≤ Iz',
    ],
    result: '≈ 40 A demand → size the circuit (with margin) so Ib ≤ In ≤ Iz.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 / 433.1.1',
      clauseText:
        'The maximum demand (taking diversity into account) shall be assessed (311.1), and the protective device shall satisfy Ib ≤ In ≤ Iz with I2 ≤ 1.45 Iz (433.1.1).',
      tableRefs: ['On-Site Guide Appendix A'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Reg 311.1 (maximum demand) and 433.1.1 (coordination) are foundational; current conversion matches the engine.',
  },
};
