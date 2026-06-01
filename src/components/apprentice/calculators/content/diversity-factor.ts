import type { CalculatorContent } from './types';

/**
 * Diversity — IET On-Site Guide design aid (not a BS 7671 regulation).
 */
export const diversityFactorContent: CalculatorContent = {
  slug: 'diversity-factor',
  governingStandards: ['IET On-Site Guide'],

  whyItMatters: [
    'Not every load runs at full power at the same time, so applying diversity gives a realistic maximum demand instead of a wastefully large connected total.',
    'Diversity allowances differ by load type and premises — lighting, socket circuits, cooking and heating each have their own treatment in the IET On-Site Guide.',
    'Under-applying diversity oversizes the supply, main cable and switchgear; over-applying it risks overloading them.',
    'Diversity is guidance for sizing the supply — it does not reduce the rating any individual circuit must have.',
  ],

  whenToCheck: [
    'Estimating maximum demand for a consumer unit or distribution board',
    'Sizing the main switch, tails and supply',
    'Deciding whether the existing supply has spare capacity for a new load',
    'For mixed domestic/commercial premises with different diversity rules',
  ],

  commonMistakes: [
    'Applying diversity to a circuit’s own protective device rating (it’s for the supply, not the circuit)',
    'Using domestic diversity allowances for a commercial/industrial installation',
    'Forgetting some loads (e.g. EV chargers, heat pumps) get little or no diversity',
    'Double-counting diversity already built into a sub-board’s figure',
  ],

  workedExample: {
    scenario: 'Domestic board: lighting 1 kW, sockets 6 kW, cooker 12 kW (illustrative diversity).',
    inputs: [
      { label: 'Lighting (×0.66)', value: '0.66 kW' },
      { label: 'Sockets (largest + 40%)', value: 'per OSG' },
      { label: 'Cooker (10 A + 30% rem.)', value: 'per OSG' },
    ],
    steps: [
      'Apply the On-Site Guide allowance to each load category',
      'Sum the diversified figures to get the maximum demand',
      'Size the supply and main device to that demand',
    ],
    result: 'Diversified maximum demand is well below the connected total — size the supply to it.',
  },

  standards: [
    {
      standard: 'IET On-Site Guide',
      citation: 'IET On-Site Guide — Appendix A (diversity and maximum demand)',
      clauseText:
        'The IET On-Site Guide gives diversity allowances by load type and premises for estimating maximum demand. BS 7671 Regulation 311.1 requires the maximum demand (with diversity) to be assessed.',
      tableRefs: ['On-Site Guide Appendix A', 'Reg 311.1'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Diversity allowances come from the IET On-Site Guide (not BS 7671 facets). Reg 311.1 requires maximum-demand assessment. Confirm specific allowances against the current OSG.',
  },
};
