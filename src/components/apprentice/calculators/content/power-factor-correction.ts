import type { CalculatorContent } from './types';

/**
 * Power-factor correction — engineering tool (no specific BS 7671 reg).
 */
export const powerFactorCorrectionContent: CalculatorContent = {
  slug: 'power-factor-correction',
  governingStandards: ['none'],

  whyItMatters: [
    'Correcting power factor adds capacitance to supply the reactive power that inductive loads need, so the supply carries less current for the same real power.',
    'The capacitor size is Qc = P × (tanφ₁ − tanφ₂): the reactive power to move from the present angle (φ₁) to the target (φ₂).',
    'Better power factor cuts cable/transformer heating and current, frees up supply capacity, and avoids kVA or low-power-factor charges on commercial tariffs.',
    'Over-correction (leading power factor) and harmonic resonance are real risks — size and detune correction carefully.',
  ],

  whenToCheck: [
    'Sizing a capacitor bank to reach a target power factor',
    'Estimating the current and kVA reduction from correction',
    'Assessing the payback against kVA/penalty charges',
    'Deciding between fixed and automatic (stepped) correction',
  ],

  commonMistakes: [
    'Over-correcting into a leading power factor at light load',
    'Ignoring harmonics — capacitors can resonate and need detuning reactors',
    'Correcting at the wrong point (whole-site vs at the load)',
    'Confusing kVAr (capacitor rating) with kVA or kW',
  ],

  workedExample: {
    scenario: 'Move 50 kW from 0.75 to 0.95 power factor.',
    inputs: [
      { label: 'Real power', value: '50 kW' },
      { label: 'tanφ₁ (0.75 pf)', value: '0.882' },
      { label: 'tanφ₂ (0.95 pf)', value: '0.329' },
    ],
    steps: [
      'Qc = P × (tanφ₁ − tanφ₂)',
      'Qc = 50 × (0.882 − 0.329)',
      'Qc = 50 × 0.553 ≈ 27.7 kVAr',
    ],
    result: '≈ 27.7 kVAr of capacitance to reach 0.95 power factor.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'PFC sizing Qc = P(tanφ₁ − tanφ₂) is exact and matches the engine. No specific BS 7671 reg governs capacitor-bank sizing; the installation itself complies with BS 7671.',
  },
};
