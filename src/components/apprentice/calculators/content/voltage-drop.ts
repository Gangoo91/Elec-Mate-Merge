import type { CalculatorContent } from './types';

/**
 * Voltage Drop — grounded against BS 7671:2018+A4:2026.
 * Reg 525.202 and Reg 715.525 clause text verified against the standards corpus.
 * The 3%/5% figures are the limits referenced by Appendix 4, Section 6.4.
 */
export const voltageDropContent: CalculatorContent = {
  slug: 'voltage-drop',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Too much voltage drop starves equipment — motors struggle to start, lamps dim and electronics misbehave at the far end of a long run.',
    'BS 7671 caps the drop from the origin of the installation to the load: 3% for lighting and 5% for other circuits, measured from the supply terminals to the point of use.',
    'Voltage lost in a cable is dissipated as heat, so an undersized cable both wastes energy and runs warmer than it should.',
    'Persistent undervoltage can cause nuisance tripping and shortens the life of motors and ballasts.',
  ],

  whenToCheck: [
    'Long cable runs — anything beyond ~20 m is worth checking',
    'Higher-current final circuits (32 A and above)',
    'Sensitive loads such as IT equipment and dimmable lighting',
    'Motor circuits, where starting current can be 6–8× the running current',
    'Supplies to outbuildings, sheds and detached garages',
  ],

  commonMistakes: [
    'Forgetting that voltage drop is cumulative — measured from the origin to the furthest point, not just one leg',
    'Using the wrong mV/A/m value for the installation method or cable type',
    'Ignoring motor starting current, which can dwarf the running current',
    'Overlooking the drop already present between the supply intake and the consumer unit',
  ],

  workedExample: {
    scenario: '20 A power radial in 2.5 mm² twin & earth, 25 m run, 230 V single phase.',
    inputs: [
      { label: 'mV/A/m (2.5 mm² T&E)', value: '18 mV/A/m' },
      { label: 'Design current (Ib)', value: '20 A' },
      { label: 'Route length (L)', value: '25 m' },
      { label: 'Limit (power circuit)', value: '5% (11.5 V)' },
    ],
    steps: [
      'Vd = (mV/A/m × Ib × L) ÷ 1000',
      'Vd = (18 × 20 × 25) ÷ 1000',
      'Vd = 9000 ÷ 1000 = 9.0 V',
      '% = (9.0 ÷ 230) × 100 = 3.9%',
    ],
    result: 'Vd = 9.0 V (3.9%) — within the 5% limit for a power circuit.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 525.202',
      clauseText:
        'The voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment shall not exceed the values stated in Appendix 4, Section 6.4. The requirement is deemed satisfied when those values are met.',
      tableRefs: ['Appendix 4, Section 6.4'],
      sourceFacetIds: [
        '5008a32d-51a1-4a34-a1e7-c9acd78d99d7',
        '9ef99355-c225-44c9-bc70-65c07ead3a88',
        'fe711d8c-ffe9-4c3c-9a94-231e218d827d',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 715.525 — ELV lighting',
      clauseText:
        'In an ELV lighting installation, the voltage drop between the transformer and the furthest luminaire shall not exceed 5% of the nominal voltage of the ELV installation to be deemed to comply with Section 525.',
      sourceFacetIds: ['603ead7d-39a8-42d1-982c-9e33d716f0e0'],
    },
  ],

  quickReference: {
    title: 'Permitted voltage drop',
    columns: ['Circuit type', 'Max %', 'At 230 V'],
    rows: [
      ['Lighting', '3%', '6.9 V'],
      ['Other (power, heating)', '5%', '11.5 V'],
    ],
    footnote: 'Limits from BS 7671 Appendix 4, Section 6.4 (referenced by Regulation 525.202).',
  },

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 525.202 and 715.525 clause text verified against BS 7671:2018+A4:2026 facets. The 3%/5% figures are tabulated in Appendix 4 §6.4 (table not individually faceted); they match the calculator engine and Reg 525.202.',
  },
};
