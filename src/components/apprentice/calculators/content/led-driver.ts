import type { CalculatorContent } from './types';

/**
 * LED driver — component selection (no governing standard).
 */
export const ledDriverContent: CalculatorContent = {
  slug: 'led-driver',
  governingStandards: ['none'],

  whyItMatters: [
    'LEDs are current-driven devices, so the driver must match the array: constant-current drivers set the current, constant-voltage drivers set the voltage and the strip sets its own current.',
    'The total forward voltage of a series string (sum of each LED’s Vf) must sit within the driver’s output range, with headroom for the driver to regulate.',
    'Sizing the driver wattage with a margin (≈20%) above the load improves reliability and life — running a driver flat-out shortens it.',
    'Mismatched drivers flicker, run hot or fail early.',
  ],

  whenToCheck: [
    'Selecting a driver for an LED array or strip',
    'Checking the string voltage sits within the driver’s output window',
    'Sizing driver wattage with a sensible margin',
    'Diagnosing flicker or premature driver failure',
  ],

  commonMistakes: [
    'Using a constant-voltage driver for constant-current LEDs (or vice versa)',
    'A series string whose total Vf exceeds the driver’s output range',
    'Running the driver at 100% of its rating with no margin',
    'Ignoring the driver’s minimum load requirement',
  ],

  workedExample: {
    scenario: '5 LEDs in series, 3.5 V each, 350 mA, constant-current driver.',
    inputs: [
      { label: 'String voltage', value: '5 × 3.5 = 17.5 V' },
      { label: 'Current', value: '350 mA' },
      { label: 'Load power', value: '17.5 × 0.35 = 6.1 W' },
    ],
    steps: [
      'Driver must output 350 mA at ≥17.5 V',
      'Add ~20% margin: ≈ 7.4 W minimum driver',
      'Confirm 17.5 V is within the driver’s output range',
    ],
    result: 'Choose a 350 mA constant-current driver covering ~17.5 V, ≥ ~7.4 W.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'Component-selection tool — no single governing standard. Vf/current/wattage logic exact; the supply circuit still complies with BS 7671.',
  },
};
