import type { CalculatorContent } from './types';

/**
 * Basic AC circuit (impedance) — fundamental theory (no governing standard).
 */
export const basicAcCircuitContent: CalculatorContent = {
  slug: 'basic-ac-circuit',
  governingStandards: ['none'],

  whyItMatters: [
    'In AC, opposition to current is impedance (Z), which combines resistance (R) with reactance (X): Z = √(R² + X²).',
    'Reactance comes from inductance (X_L = 2πfL) and capacitance (X_C = 1/2πfC) and changes with frequency — so AC behaves differently from DC.',
    'The phase angle φ between voltage and current (cosφ = R/Z) is the power factor — it decides how much of the apparent power is useful.',
    'This is the bridge from Ohm’s law to real AC circuits, power factor and resonance.',
  ],

  whenToCheck: [
    'Finding the current in an AC circuit with inductance or capacitance',
    'Working out the phase angle / power factor of a circuit',
    'Understanding how impedance changes with frequency',
    'Analysing motor, transformer or filter behaviour',
  ],

  commonMistakes: [
    'Adding R and X arithmetically instead of as a vector (use √(R² + X²))',
    'Forgetting reactance depends on frequency',
    'Mixing inductive (lagging) and capacitive (leading) reactance signs',
    'Using R in place of Z when finding AC current',
  ],

  workedExample: {
    scenario: 'Series circuit: R = 8 Ω, X_L = 6 Ω, on 230 V.',
    inputs: [
      { label: 'Resistance (R)', value: '8 Ω' },
      { label: 'Reactance (X_L)', value: '6 Ω' },
      { label: 'Voltage', value: '230 V' },
    ],
    steps: [
      'Z = √(R² + X²) = √(8² + 6²) = √100 = 10 Ω',
      'I = V ÷ Z = 230 ÷ 10 = 23 A',
      'cosφ = R ÷ Z = 8 ÷ 10 = 0.8 (power factor)',
    ],
    result: 'Z = 10 Ω, I = 23 A, power factor 0.8 lagging.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. Impedance/phase relationships exact; no governing standard.',
  },
};
