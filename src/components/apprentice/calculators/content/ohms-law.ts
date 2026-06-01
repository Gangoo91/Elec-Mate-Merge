import type { CalculatorContent } from './types';

/**
 * Ohm's law — fundamental theory (no governing standard).
 */
export const ohmsLawContent: CalculatorContent = {
  slug: 'ohms-law',
  governingStandards: ['none'],

  whyItMatters: [
    'Ohm’s law (V = I × R) ties together the three quantities every electrical problem comes back to — voltage, current and resistance.',
    'Combined with the power equations (P = V × I = I²R = V²/R) it lets you find any unknown from two knowns — the basis of fault-finding, load checks and design sanity checks.',
    'It explains the everyday behaviour you see on the job: a lower resistance draws more current, and a poor (high-resistance) connection drops voltage and gets hot.',
    'Get comfortable here and the rest of the calculations — voltage drop, power, cable sizing — all follow naturally.',
  ],

  whenToCheck: [
    'Finding the current a known load draws on a known supply',
    'Estimating the resistance of a heating element from its rating',
    'Sanity-checking a measured value against what theory predicts',
    'Working out the power dissipated in a resistor or connection',
  ],

  commonMistakes: [
    'Mixing AC and DC — for AC with reactance use impedance Z, not just R',
    'Unit slips: keep volts, amps and ohms consistent (mΩ vs Ω, mA vs A)',
    'Rearranging the triangle wrongly (V = I × R, I = V / R, R = V / I)',
    'Forgetting power rises with the square of current (I²R) — small current rises heat a lot',
  ],

  workedExample: {
    scenario: 'A 230 V supply across a 19 Ω heating element.',
    inputs: [
      { label: 'Voltage (V)', value: '230 V' },
      { label: 'Resistance (R)', value: '19 Ω' },
    ],
    steps: [
      'I = V ÷ R = 230 ÷ 19 = 12.1 A',
      'P = V × I = 230 × 12.1 = 2783 W',
      '(check) P = V² ÷ R = 230² ÷ 19 = 2784 W ✓',
    ],
    result: 'I ≈ 12.1 A, P ≈ 2.78 kW.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Fundamental theory — no governing standard. Equations and worked example are exact.',
  },
};
