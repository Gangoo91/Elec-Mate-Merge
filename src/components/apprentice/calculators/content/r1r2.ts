import type { CalculatorContent } from './types';

/**
 * R1 + R2 (continuity) — BS 7671 Part 6 + GN3.
 */
export const r1r2Content: CalculatorContent = {
  slug: 'r1r2',
  governingStandards: ['BS 7671', 'IET Guidance Note 3'],

  whyItMatters: [
    'R1 + R2 is the resistance of the line conductor (R1) plus the circuit protective conductor (R2) from the board to the furthest point — it proves the CPC is continuous and correctly sized.',
    'Added to the external loop impedance (Ze), it gives Zs: Zs = Ze + (R1 + R2) — so this measurement underpins the disconnection-time check.',
    'A high or open R1 + R2 means a broken or undersized CPC — a serious safety defect that stops automatic disconnection working.',
    'It also confirms cross-bonding and that no connections are loose along the circuit.',
  ],

  whenToCheck: [
    'During initial verification and periodic inspection (continuity testing)',
    'To establish Zs by calculation (Ze + R1 + R2) instead of a live loop test',
    'When a reduced-size CPC is used and its continuity matters',
    'After any work that could disturb a protective conductor',
  ],

  commonMistakes: [
    'Not nulling the test leads before measuring (adds lead resistance to the reading)',
    'Comparing a cold (test) value directly with a hot maximum without correction',
    'Confusing R2 (the CPC) with R1 (the line conductor)',
    'Forgetting parallel paths (bonding) can lower the measured value',
  ],

  workedExample: {
    scenario: '2.5/1.5 mm² T&E, 25 m run (r1 = 7.41, r2 = 12.1 mΩ/m).',
    inputs: [
      { label: 'r1 (2.5 mm²)', value: '7.41 mΩ/m' },
      { label: 'r2 (1.5 mm²)', value: '12.1 mΩ/m' },
      { label: 'Length', value: '25 m' },
    ],
    steps: [
      '(R1 + R2) per metre = 7.41 + 12.1 = 19.5 mΩ/m',
      'R1 + R2 = 19.5 × 25 = 488 mΩ',
      'R1 + R2 ≈ 0.49 Ω',
    ],
    result: 'R1 + R2 ≈ 0.49 Ω → add Ze to get Zs and compare to the device maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.2.1 — Continuity of conductors',
      clauseText:
        'The continuity of protective conductors, including main and supplementary bonding, shall be verified. The measured (R1 + R2) is used to confirm CPC continuity and to establish Zs as Ze + (R1 + R2).',
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Zs = Ze + (R1+R2) and continuity testing are foundational (Part 6 / GN3 Ch 10). Per-metre resistances match the engine. Confirm 643.2.1 wording against A4:2026 facets.',
  },
};
