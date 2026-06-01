import type { CalculatorContent } from './types';

/**
 * Star-delta conversion — fundamental theory (no governing standard).
 */
export const starDeltaContent: CalculatorContent = {
  slug: 'star-delta',
  governingStandards: ['none'],

  whyItMatters: [
    'How a three-phase load is connected — star (Y) or delta (Δ) — changes the relationship between line and phase voltage and current by √3.',
    'In star: line voltage = √3 × phase voltage, and line current = phase current. In delta: line voltage = phase voltage, and line current = √3 × phase current.',
    'A delta connection draws three times the power of the same windings in star — the basis of star-delta motor starting, which limits inrush by starting in star.',
    'Choosing the wrong connection (or mis-reading the relationships) gives wildly wrong currents and torque.',
  ],

  whenToCheck: [
    'Converting between line and phase quantities for a three-phase load',
    'Designing or checking star-delta motor starting',
    'Working out phase voltage on a 400 V (line) supply',
    'Comparing the power a motor produces in star vs delta',
  ],

  commonMistakes: [
    'Swapping the √3 relationships between star and delta',
    'Forgetting line current = phase current in star (and line voltage = phase voltage in delta)',
    'Assuming the same power in both connections (delta is 3× star)',
    'Mixing line and phase values when sizing protection',
  ],

  workedExample: {
    scenario: '400 V line supply feeding a star-connected load.',
    inputs: [
      { label: 'Line voltage', value: '400 V' },
      { label: 'Connection', value: 'Star (Y)' },
    ],
    steps: [
      'Phase voltage = line voltage ÷ √3',
      'V_phase = 400 ÷ 1.732',
      'V_phase ≈ 231 V',
    ],
    result: 'Each phase sees ≈ 231 V (the familiar 230 V) in star; line current equals phase current.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. Star/delta √3 relationships exact; engine uses them correctly.',
  },
};
