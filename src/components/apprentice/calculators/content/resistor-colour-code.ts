import type { CalculatorContent } from './types';

/**
 * Resistor colour code — component reference (no governing standard).
 */
export const resistorColourCodeContent: CalculatorContent = {
  slug: 'resistor-colour-code',
  governingStandards: ['none'],

  whyItMatters: [
    'Resistor bands encode the value, multiplier and tolerance — reading them correctly is basic electronics literacy for control, instrumentation and repair work.',
    'The IEC 60062 colour sequence (black 0 → white 9) is universal, so once learned it reads any band resistor.',
    'The tolerance band tells you how close the real value is to the nominal — important for precision circuits.',
    'Getting the read direction or a band wrong gives a value out by orders of magnitude.',
  ],

  whenToCheck: [
    'Identifying a resistor’s value during repair or fault-finding',
    'Selecting a replacement from a colour-banded stock',
    'Teaching or learning the colour sequence',
    'Confirming a 4-, 5- or 6-band reading',
  ],

  commonMistakes: [
    'Reading the bands from the wrong end (tolerance band goes last)',
    'Mixing up 4-band and 5-band sequences',
    'Confusing similar colours (red/brown, blue/violet) in poor light',
    'Forgetting the multiplier band sets the order of magnitude',
  ],

  workedExample: {
    scenario: 'A 4-band resistor: brown, black, red, gold.',
    inputs: [
      { label: 'Bands 1–2', value: 'Brown (1), Black (0)' },
      { label: 'Multiplier', value: 'Red (×100)' },
      { label: 'Tolerance', value: 'Gold (±5%)' },
    ],
    steps: [
      'Digits = 1, 0 → 10',
      'Multiplier red = ×100',
      '10 × 100 = 1000 Ω',
    ],
    result: '1 kΩ ±5%.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Component reference (IEC 60062 colour sequence). Decoder logic exact; no governing UK installation standard.',
  },
};
