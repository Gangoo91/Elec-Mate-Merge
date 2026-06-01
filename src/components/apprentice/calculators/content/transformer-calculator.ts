import type { CalculatorContent } from './types';

/**
 * Transformer calculator — fundamental theory (no governing standard).
 */
export const transformerContent: CalculatorContent = {
  slug: 'transformer-calculator',
  governingStandards: ['none'],

  whyItMatters: [
    'A transformer’s primary and secondary currents follow from its kVA rating and voltages: I = kVA × 1000 ÷ (√3 × V) for three-phase.',
    'The voltage (turns) ratio sets the secondary voltage; the current ratio is the inverse — step voltage down and current up, and vice versa.',
    'Percentage impedance sets the secondary fault level: a lower %Z gives a higher fault current, which drives downstream breaking-capacity choices.',
    'Knowing rated currents, fault level and regulation lets you size protection, cables and the supply correctly.',
  ],

  whenToCheck: [
    'Finding primary/secondary full-load currents from a kVA rating',
    'Estimating the secondary fault level from %Z',
    'Sizing protection and cables on each side of a transformer',
    'Checking voltage regulation under load',
  ],

  commonMistakes: [
    'Dropping the √3 for three-phase current',
    'Inverting the voltage and current ratios',
    'Forgetting %Z determines the secondary fault level',
    'Mixing kVA (apparent) with kW (real) when a power factor is involved',
  ],

  workedExample: {
    scenario: '100 kVA, 415 V primary, 4% impedance.',
    inputs: [
      { label: 'Rating', value: '100 kVA' },
      { label: 'Primary voltage', value: '415 V (3-phase)' },
      { label: 'Impedance', value: '4%' },
    ],
    steps: [
      'Primary FLC = 100 000 ÷ (√3 × 415) ≈ 139 A',
      'Secondary fault level ≈ FLC ÷ (Z% / 100)',
      '≈ 139 ÷ 0.04 ≈ 3.5 kA (referred to the primary side)',
    ],
    result: 'Primary FLC ≈ 139 A; fault level scales as 1 ÷ %Z.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Transformer relationships are fundamental theory; engine uses √3 correctly. No single governing UK installation standard for the calculation itself.',
  },
};
