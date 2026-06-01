import type { CalculatorContent } from './types';

/**
 * Conduit fill — space factors (IET On-Site Guide / BS EN 61386).
 */
export const conduitFillContent: CalculatorContent = {
  slug: 'conduit-fill',
  governingStandards: ['IET On-Site Guide', 'BS 7671'],

  whyItMatters: [
    'Cables in conduit must not be packed too tightly — overfilling traps heat (reducing the grouping rating) and makes drawing-in damage the insulation.',
    'The space factor (cable area as a percentage of the conduit bore) is capped — commonly ~40% for runs with bends and less for tighter geometries.',
    'The IET On-Site Guide uses a cable-factor / conduit-factor method that also accounts for the run length and number of bends.',
    'Correct fill keeps the installation both mechanically safe and thermally within its rating.',
  ],

  whenToCheck: [
    'Choosing conduit size for a given number and size of cables',
    'On long runs or runs with several bends (the allowable factor falls)',
    'When grouping in conduit reduces the cable rating (apply Cg as well)',
    'Before drawing in — confirm the fill is within the limit',
  ],

  commonMistakes: [
    'Exceeding the space factor and overheating the bunched cables',
    'Ignoring the effect of bends and run length on the allowable factor',
    'Forgetting the grouping derating (Cg) for cables bunched in conduit',
    'Using single-cable factors for a multi-cable run',
  ],

  workedExample: {
    scenario: '6 × 2.5 mm² singles (≈ 9.6 mm² each) in 20 mm PVC conduit (bore area ≈ 222 mm²).',
    inputs: [
      { label: 'Total cable area', value: '6 × 9.6 ≈ 58 mm²' },
      { label: 'Conduit bore area', value: '~222 mm²' },
      { label: 'Limit (with bends)', value: '~40%' },
    ],
    steps: [
      'Fill % = total cable area ÷ bore area × 100',
      'Fill % = 58 ÷ 222 × 100',
      'Fill % ≈ 26% (within ~40%)',
    ],
    result: '≈ 26% fill — within the limit; also apply grouping derating to the cables.',
  },

  standards: [
    {
      standard: 'IET On-Site Guide',
      citation: 'IET On-Site Guide — conduit cable factors',
      clauseText:
        'Conduit fill is assessed using the On-Site Guide cable-factor / conduit-factor method, which limits the proportion of the bore occupied and accounts for run length and bends. BS 7671 Reg 522.8 requires wiring systems to avoid mechanical damage.',
      tableRefs: ['On-Site Guide (conduit factors)', 'Reg 522.8'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Space-factor approach matches the engine; cable/conduit factor tables come from the IET On-Site Guide (not BS 7671 facets). Conduit product standard: BS EN 61386.',
  },
};
