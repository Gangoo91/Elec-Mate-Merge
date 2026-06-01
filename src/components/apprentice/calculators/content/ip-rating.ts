import type { CalculatorContent } from './types';

/**
 * IP rating decoder — BS EN 60529.
 */
export const ipRatingContent: CalculatorContent = {
  slug: 'ip-rating',
  governingStandards: ['BS EN 60529'],

  whyItMatters: [
    'The IP (Ingress Protection) code tells you what an enclosure keeps out: the first digit is solids/dust, the second is water.',
    'Choosing the right IP rating for the location keeps equipment safe — a bathroom zone, an outdoor enclosure and a dusty workshop each demand different protection.',
    'BS 7671 special-location sections (bathrooms 701, swimming pools 702, outdoors) specify minimum IP ratings by zone.',
    'Under-rating risks water/dust ingress and failure; over-rating wastes money and can trap heat.',
  ],

  whenToCheck: [
    'Selecting enclosures, accessories and luminaires for wet, dusty or outdoor locations',
    'Meeting the minimum IP for a BS 7671 special-location zone',
    'Specifying equipment near jets, hoses or submersion',
    'Decoding a manufacturer’s IP marking',
  ],

  commonMistakes: [
    'Reading the digits the wrong way round (first = solids, second = water)',
    'Assuming a higher second digit includes the lower tests (IPX7 does not guarantee IPX5/6)',
    'Ignoring the BS 7671 zone minimum for the location',
    'Confusing IP with IK (mechanical impact) ratings',
  ],

  workedExample: {
    scenario: 'An outdoor socket marked IP66.',
    inputs: [
      { label: 'First digit (6)', value: 'Dust-tight' },
      { label: 'Second digit (6)', value: 'Powerful water jets' },
    ],
    steps: [
      'First digit 6 → total protection against dust ingress',
      'Second digit 6 → protected against powerful water jets',
      'Suitable for a typical exposed outdoor location',
    ],
    result: 'IP66 = dust-tight and jet-proof — appropriate for outdoor use.',
  },

  standards: [
    {
      standard: 'BS EN 60529',
      citation: 'BS EN 60529 — Degrees of protection (IP code)',
      clauseText:
        'The IP code classifies the degree of protection provided by enclosures against access to hazardous parts, ingress of solid foreign objects (first digit) and ingress of water (second digit). BS 7671 special-location sections specify minimum IP ratings by zone.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'IP digit meanings per BS EN 60529; BS 7671 special-location minimums apply by zone. Decoder logic matches the engine.',
  },
};
