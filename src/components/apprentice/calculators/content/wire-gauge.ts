import type { CalculatorContent } from './types';

/**
 * Wire gauge (AWG/SWG) — reference tool (no governing UK installation standard).
 */
export const wireGaugeContent: CalculatorContent = {
  slug: 'wire-gauge',
  governingStandards: ['none'],

  whyItMatters: [
    'UK installation work sizes cable in mm² (cross-sectional area), but imported equipment and data/electronics often quote AWG (American) or SWG (Imperial) gauges.',
    'Converting to mm² lets you compare an imported conductor against BS 7671 cable sizes and current ratings.',
    'Gauge numbers run backwards — a bigger number is a thinner wire — which catches people out.',
    'Getting the equivalent CSA right keeps current ratings and voltage-drop checks valid.',
  ],

  whenToCheck: [
    'Comparing an AWG/SWG conductor against UK mm² sizes',
    'Specifying or checking imported equipment tails and flexes',
    'Cross-referencing data/control cabling quoted in AWG',
    'Confirming an equivalent CSA before applying BS 7671 ratings',
  ],

  commonMistakes: [
    'Assuming a higher gauge number means a thicker wire (it’s the opposite)',
    'Treating AWG and SWG as identical (they differ)',
    'Comparing diameter instead of cross-sectional area',
    'Using a gauge CSA directly without checking the BS 7671 current rating',
  ],

  workedExample: {
    scenario: 'A conductor marked 12 AWG.',
    inputs: [
      { label: 'Gauge', value: '12 AWG' },
      { label: 'Approx CSA', value: '~3.31 mm²' },
    ],
    steps: [
      '12 AWG ≈ 3.31 mm² cross-sectional area',
      'Nearest UK size is 2.5 mm² (smaller) or 4 mm² (larger)',
      'Apply BS 7671 ratings to the chosen mm² size, not the gauge',
    ],
    result: '12 AWG ≈ 3.3 mm² — between UK 2.5 and 4 mm²; rate it as the actual mm² size.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Reference conversion tool. AWG/SWG↔mm² conversions exact; UK installation sizing is mm² under BS 7671.',
  },
};
