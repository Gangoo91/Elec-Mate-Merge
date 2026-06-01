import type { CalculatorContent } from './types';

/**
 * Power factor — fundamental theory (no governing standard).
 */
export const powerFactorContent: CalculatorContent = {
  slug: 'power-factor',
  governingStandards: ['none'],

  whyItMatters: [
    'Power factor is the ratio of real power (kW, the useful work) to apparent power (kVA, what the supply actually carries) — cosφ = kW ÷ kVA.',
    'A poor power factor means more current flows for the same useful output, so cables and transformers run hotter and supplies are sized larger than the kW alone suggests.',
    'Many commercial tariffs charge for kVA (or penalise low power factor), so a poor figure costs money directly.',
    'Inductive loads (motors, fluorescent gear, transformers) drag the power factor down; correction (capacitors) brings it back up.',
  ],

  whenToCheck: [
    'Comparing a load’s kW rating with the kVA the supply must carry',
    'Diagnosing why measured current is higher than the kW implies',
    'Assessing whether power-factor correction would pay back',
    'Sizing supplies for inductive-heavy installations',
  ],

  commonMistakes: [
    'Treating kW and kVA as the same — they only match at unity power factor',
    'Forgetting that current scales with 1/pf for a given kW',
    'Confusing displacement power factor with true power factor where harmonics are present',
    'Ignoring kVA-based charges on commercial tariffs',
  ],

  workedExample: {
    scenario: 'A load drawing 10 kW with a power factor of 0.8.',
    inputs: [
      { label: 'Real power (P)', value: '10 kW' },
      { label: 'Power factor', value: '0.8' },
    ],
    steps: [
      'S = P ÷ pf = 10 ÷ 0.8 = 12.5 kVA',
      'Reactive Q = √(S² − P²) = √(12.5² − 10²) = 7.5 kVAr',
      'At 0.8 pf the supply carries 12.5 kVA for 10 kW of useful power',
    ],
    result: 'S = 12.5 kVA, Q = 7.5 kVAr — 25% more apparent power than the real load.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. kW/kVA/kVAr relationships exact; no governing standard.',
  },
};
