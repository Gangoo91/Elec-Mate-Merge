import type { CalculatorContent } from './types';

/**
 * Unit converter — utility tool (no governing standard).
 */
export const unitConverterContent: CalculatorContent = {
  slug: 'unit-converter',
  governingStandards: ['none'],

  whyItMatters: [
    'Most calculation errors are unit errors — a confident answer in the wrong units is still wrong, and on site that can mean an undersized cable or a miscut.',
    'Electrical work mixes SI prefixes (m, k, M) with imperial leftovers (inches, AWG, °F), so quick, reliable conversion avoids slips.',
    'Keeping consistent units through a calculation (V, A, Ω; or W, kW; or mm², mm) is the simplest way to stay right.',
    'A converter is a fast sanity check when a figure “feels” an order of magnitude off.',
  ],

  whenToCheck: [
    'Converting between SI prefixes (mΩ↔Ω, W↔kW, mm↔m)',
    'Working with imperial dimensions or temperatures',
    'Before feeding values into another calculator (keep units consistent)',
    'Sanity-checking a result that looks 10× or 1000× out',
  ],

  commonMistakes: [
    'Dropping or adding a factor of 1000 between prefixes',
    'Mixing area (mm²) with linear (mm) conversions',
    'Confusing °C and °F conversions (they are not a simple scale)',
    'Rounding too early and compounding the error',
  ],

  workedExample: {
    scenario: 'Convert 2500 mΩ to ohms, and 0.75 kW to watts.',
    inputs: [
      { label: 'Resistance', value: '2500 mΩ' },
      { label: 'Power', value: '0.75 kW' },
    ],
    steps: [
      '2500 mΩ ÷ 1000 = 2.5 Ω',
      '0.75 kW × 1000 = 750 W',
    ],
    result: '2500 mΩ = 2.5 Ω; 0.75 kW = 750 W.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Utility tool — no governing standard. Conversions exact.',
  },
};
