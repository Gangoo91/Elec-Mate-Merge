import type { CalculatorContent } from './types';

/**
 * Data centre electrical design — engineering tool (no single governing standard).
 */
export const dataCentreContent: CalculatorContent = {
  slug: 'data-centre',
  governingStandards: ['none'],

  whyItMatters: [
    'A data centre’s total facility load is the IT load plus cooling plus losses — and cooling is usually the biggest add-on, so it dominates the supply, UPS and generator sizing.',
    'PUE (Power Usage Effectiveness) = total facility power ÷ IT power; a lower PUE (closer to 1) means more of the power does useful computing.',
    'Redundancy (N+1, 2N) sizes the *capacity* of UPS, generators and cooling — but standby units don’t all run continuously, so they shouldn’t inflate the continuous energy/PUE.',
    'UPS battery autonomy bridges to generator start; getting the energy and capacity figures right keeps the facility resilient without over-spending.',
  ],

  whenToCheck: [
    'Sizing UPS, generator and cooling for an IT load',
    'Estimating PUE, annual energy and running cost',
    'Applying a redundancy scheme (N+1 / 2N) to capacity',
    'Sizing UPS battery autonomy to generator start',
  ],

  commonMistakes: [
    'Applying redundancy to continuous energy (it sizes capacity, not running load)',
    'Underestimating cooling load in a temperate vs free-cooling climate',
    'Confusing PUE (energy ratio) with capacity headroom',
    'Sizing the generator to the UPS output without start/derating margins',
  ],

  workedExample: {
    scenario: '200 kW IT load, air cooling (ratio ≈ 1.35), 5% lighting/misc.',
    inputs: [
      { label: 'IT load', value: '200 kW' },
      { label: 'Cooling', value: '200 × 1.35 = 270 kW' },
      { label: 'Lighting/misc', value: '200 × 0.05 = 10 kW' },
    ],
    steps: [
      'Total facility = 200 + 270 + 10 = 480 kW',
      'PUE = total ÷ IT = 480 ÷ 200',
      'PUE = 2.4 (improves with free cooling / better airflow)',
    ],
    result: 'Total ≈ 480 kW, PUE ≈ 2.4 — redundancy then sizes UPS/cooling capacity.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'PUE and load build-up match the engine (cooling redundancy corrected to size capacity, not PUE, in this pass). No single governing UK standard; the installation complies with BS 7671 and industry practice (e.g. Uptime tiers).',
  },
};
