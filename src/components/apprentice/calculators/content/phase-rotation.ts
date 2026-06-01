import type { CalculatorContent } from './types';

/**
 * Phase rotation / sequence — BS 7671 Part 6.
 */
export const phaseRotationContent: CalculatorContent = {
  slug: 'phase-rotation',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Phase sequence (the order L1–L2–L3 reach their peaks) decides which way three-phase motors turn — a reversed sequence runs a motor backwards, which can be dangerous for pumps, conveyors and machinery.',
    'BS 7671 requires phase sequence to be verified where it matters, and to be preserved across an installation.',
    'Confirming sequence at the origin and at each distribution board catches cross-connected phases before equipment is energised.',
    'It is quick to check and avoids expensive or hazardous “wrong-way” starts.',
  ],

  whenToCheck: [
    'On any three-phase supply before connecting rotating machinery',
    'After working on a distribution board or sub-main',
    'When commissioning motors, pumps and HVAC plant',
    'To confirm sequence is maintained throughout the installation',
  ],

  commonMistakes: [
    'Assuming colour identification guarantees correct sequence (it can be cross-connected)',
    'Not re-checking after board alterations',
    'Confusing phase rotation with phase loss',
    'Energising a motor before verifying direction',
  ],

  workedExample: {
    scenario: 'Three-phase board verified with a rotation tester.',
    inputs: [
      { label: 'Expected sequence', value: 'L1 → L2 → L3' },
      { label: 'Tester reading', value: 'Clockwise' },
    ],
    steps: [
      'Connect the rotation indicator to L1, L2, L3',
      'A correct (clockwise / 1-2-3) reading confirms positive sequence',
      'A reversed reading means two phases are swapped',
    ],
    result: 'Positive sequence confirmed — safe to connect rotating plant the expected way.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.11 — Phase sequence',
      clauseText:
        'Where required, it shall be verified that the phase sequence is maintained. This is particularly important for circuits supplying rotating machinery, where reversed sequence reverses the direction of rotation.',
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Phase-sequence verification is a Part 6 requirement. Confirm exact 643.11 wording against A4:2026 facets.',
  },
};
