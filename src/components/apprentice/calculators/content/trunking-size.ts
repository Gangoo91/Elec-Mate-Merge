import type { CalculatorContent } from './types';

/**
 * Trunking sizing — space factor (IET On-Site Guide / BS 7671 Reg 522.8.1).
 */
export const trunkingSizeContent: CalculatorContent = {
  slug: 'trunking-size',
  governingStandards: ['IET On-Site Guide', 'BS 7671'],

  whyItMatters: [
    'Cable trunking is sized so the cables occupy no more than about 45% of its internal cross-section — enough room for heat dissipation and to lay cables in without damage.',
    'The IET On-Site Guide uses a cable-factor / trunking-factor method: sum the cable factors and choose a trunking whose factor is at least that total.',
    'Overfilled trunking runs hot (apply grouping derating) and is hard to add to later.',
    'Right-sizing leaves capacity for future circuits and keeps the install tidy and compliant.',
  ],

  whenToCheck: [
    'Selecting trunking for a known set of cables',
    'When future spare capacity is wanted',
    'Where many circuits share the trunking (apply grouping derating too)',
    'Confirming the 45% space factor is not exceeded',
  ],

  commonMistakes: [
    'Exceeding ~45% fill and overheating the grouped cables',
    'Forgetting grouping derating for cables bunched in trunking',
    'Leaving no spare capacity for additions',
    'Mixing cable factors and physical areas inconsistently',
  ],

  workedExample: {
    scenario: 'Cables totalling 600 mm² of cable factor in 50×50 mm trunking.',
    inputs: [
      { label: 'Total cable factor', value: '600' },
      { label: 'Trunking internal area', value: '2500 mm²' },
      { label: 'Space factor', value: '45%' },
    ],
    steps: [
      'Usable area = internal area × 0.45 = 2500 × 0.45 = 1125 mm²',
      'Required ≤ usable: 600 ≤ 1125',
      'Fill ≈ 24% — comfortably within 45%',
    ],
    result: '50×50 trunking is adequate (~24% fill) with room to spare.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 522.8.1',
      clauseText:
        'A wiring system shall be selected and erected to avoid mechanical damage during installation, use or maintenance; cables in trunking are sized so they can be drawn in and dissipate heat. The IET On-Site Guide gives the cable-factor / trunking-factor method and the ~45% space factor.',
      tableRefs: ['On-Site Guide (trunking factors)'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      '45% space factor and the factor method come from the IET On-Site Guide; Reg 522.8 covers avoidance of damage. Trunking factor tables in src/lib/calculators/bs7671-data/trunkingData.',
  },
};
