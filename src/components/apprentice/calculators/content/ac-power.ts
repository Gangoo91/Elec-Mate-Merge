import type { CalculatorContent } from './types';

/**
 * AC power — fundamental theory (no governing standard).
 */
export const acPowerContent: CalculatorContent = {
  slug: 'ac-power',
  governingStandards: ['none'],

  whyItMatters: [
    'In AC circuits, power splits into real (kW), reactive (kVAr) and apparent (kVA) — the “power triangle” — and only the real part does useful work.',
    'Apparent power S = V × I (×√3 for three-phase) is what the supply must carry; real power P = S × cosφ is what the load uses.',
    'Reactive power flows back and forth with inductance and capacitance — it does no work but still loads the cables and supply.',
    'Keeping these straight underpins correct supply sizing, power-factor correction and tariff understanding.',
  ],

  whenToCheck: [
    'Finding real, reactive and apparent power from voltage, current and power factor',
    'Converting between single- and three-phase power',
    'Sizing a supply from a load’s kVA rather than its kW',
    'Understanding the current an inductive load actually draws',
  ],

  commonMistakes: [
    'Using P = V × I for AC without the power factor (that gives S, not P)',
    'Forgetting the √3 for three-phase apparent power',
    'Adding kW and kVAr arithmetically instead of vectorially (use S = √(P² + Q²))',
    'Confusing leading (capacitive) and lagging (inductive) reactive power',
  ],

  workedExample: {
    scenario: 'Single-phase load: 230 V, 20 A, power factor 0.9 lagging.',
    inputs: [
      { label: 'Voltage', value: '230 V' },
      { label: 'Current', value: '20 A' },
      { label: 'Power factor', value: '0.9' },
    ],
    steps: [
      'S = V × I = 230 × 20 = 4600 VA = 4.6 kVA',
      'P = S × cosφ = 4.6 × 0.9 = 4.14 kW',
      'Q = √(S² − P²) = √(4.6² − 4.14²) = 2.0 kVAr',
    ],
    result: 'S = 4.6 kVA, P = 4.14 kW, Q = 2.0 kVAr.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. Power-triangle relationships exact; engine uses √3 correctly for 3-phase.',
  },
};
