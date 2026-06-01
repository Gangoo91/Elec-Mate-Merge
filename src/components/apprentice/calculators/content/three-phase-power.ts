import type { CalculatorContent } from './types';

/**
 * Three-phase power — fundamental theory (no governing standard).
 */
export const threePhasePowerContent: CalculatorContent = {
  slug: 'three-phase-power',
  governingStandards: ['none'],

  whyItMatters: [
    'Three-phase delivers far more power down the same conductors than single-phase, which is why it feeds industrial and larger commercial loads.',
    'The √3 (1.732) factor links line and phase quantities — get it right or every current and power figure is out by 73%.',
    'Real (kW), apparent (kVA) and reactive (kVAr) power are different things; the power factor links them and decides how much current actually flows.',
    'Balanced loading across the three phases keeps the neutral current low and the supply efficient.',
  ],

  whenToCheck: [
    'Calculating line current from a three-phase kW or kVA rating',
    'Converting between line and phase voltage/current (star vs delta)',
    'Sizing supplies and protective devices for three-phase loads',
    'Checking phase balance across a distribution board',
  ],

  commonMistakes: [
    'Dropping the √3 factor (or using it on the wrong quantity)',
    'Confusing kW (real) with kVA (apparent) — divide by power factor to convert',
    'Mixing line and phase values in star/delta',
    'Assuming a balanced neutral current when loads are uneven',
  ],

  workedExample: {
    scenario: '15 kW three-phase motor, 400 V line, power factor 0.85.',
    inputs: [
      { label: 'Real power (P)', value: '15 kW' },
      { label: 'Line voltage (VL)', value: '400 V' },
      { label: 'Power factor', value: '0.85' },
    ],
    steps: [
      'IL = P ÷ (√3 × VL × pf)',
      'IL = 15 000 ÷ (1.732 × 400 × 0.85)',
      'IL = 15 000 ÷ 588.9',
      'IL ≈ 25.5 A per line',
    ],
    result: 'Line current ≈ 25.5 A (apparent power S = √3 × VL × IL ≈ 17.6 kVA).',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory. √3 relationships and worked example verified; engine uses √3 correctly.',
  },
};
