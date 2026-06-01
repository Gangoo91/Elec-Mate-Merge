import type { CalculatorContent } from './types';

/**
 * Instrumentation (4–20 mA loops) — process/control reference (no BS 7671 reg).
 */
export const instrumentationContent: CalculatorContent = {
  slug: 'instrumentation',
  governingStandards: ['none'],

  whyItMatters: [
    'The 4–20 mA current loop is the workhorse of process instrumentation: the signal is a current, so it’s immune to voltage drop and the “live zero” (4 mA) lets you detect a broken wire.',
    'Scaling between the measured value and the 4–20 mA signal (a linear map) is the everyday calculation for calibration and commissioning.',
    '4 mA = 0% of range and 20 mA = 100%, so 12 mA is mid-scale — handy for quick checks.',
    'Loop resistance and supply voltage set whether the transmitter can drive the full 20 mA into the loop.',
  ],

  whenToCheck: [
    'Calibrating or commissioning a transmitter to an engineering range',
    'Converting a measured mA reading back to a process value',
    'Checking the loop has enough supply voltage for its total resistance',
    'Diagnosing a fault from an out-of-range (e.g. 0 mA or >20 mA) signal',
  ],

  commonMistakes: [
    'Treating 0 mA as 0% (the live zero is 4 mA, so 0 mA means a fault)',
    'Mixing up the engineering range with the signal range',
    'Forgetting the supply must overcome the total loop resistance at 20 mA',
    'Non-linear sensors: assuming a straight-line map where the sensor isn’t linear',
  ],

  workedExample: {
    scenario: 'A 0–100 °C transmitter reads 12 mA.',
    inputs: [
      { label: 'Range', value: '0–100 °C' },
      { label: 'Signal', value: '12 mA' },
    ],
    steps: [
      '% = (mA − 4) ÷ 16 = (12 − 4) ÷ 16 = 50%',
      'Value = 0 + 50% × (100 − 0)',
      'Value = 50 °C',
    ],
    result: '12 mA = 50% of range = 50 °C.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Process/control reference — no BS 7671 installation reg. 4–20 mA linear scaling exact.',
  },
};
