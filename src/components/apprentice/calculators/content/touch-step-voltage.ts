import type { CalculatorContent } from './types';

/**
 * Touch & step voltage — BS EN 50522 / BS 7671 earthing.
 */
export const touchStepVoltageContent: CalculatorContent = {
  slug: 'touch-step-voltage',
  governingStandards: ['BS EN 50522', 'BS 7671'],

  whyItMatters: [
    'During an earth fault, current flowing to earth raises the local ground potential (the earth potential rise, EPR), creating voltages a person can be exposed to.',
    'Touch voltage is what appears between a hand on metalwork and the feet; step voltage is between two feet a stride apart — both must be kept within safe limits for the fault duration.',
    'The permissible touch voltage falls as the fault clears more slowly, so fast disconnection is a key control.',
    'This matters most at substations, large earthing systems and TT installations with high electrode resistance.',
  ],

  whenToCheck: [
    'Assessing safety around an earthing system during an earth fault',
    'Where EPR is high (high fault current or high electrode resistance)',
    'Comparing touch/step voltages against the time-dependent permissible limits',
    'Designing mitigation (grading, surfacing, bonding) to reduce exposure',
  ],

  commonMistakes: [
    'Ignoring the fault duration — permissible touch voltage depends on time',
    'Overlooking step voltage (often lower than touch, but still assessed)',
    'Assuming a low EPR without confirming electrode resistance and fault current',
    'Neglecting surface layers (chippings/asphalt) that raise the permissible limits',
  ],

  workedExample: {
    scenario: '200 A earth fault through a 16.9 Ω electrode system.',
    inputs: [
      { label: 'Fault current', value: '200 A' },
      { label: 'Electrode resistance', value: '16.9 Ω' },
      { label: 'Touch factor', value: '~0.7 of EPR' },
    ],
    steps: [
      'EPR = If × R = 200 × 16.9 = 3380 V',
      'Touch voltage ≈ 0.7 × EPR ≈ 2370 V',
      'Compare against the permissible touch voltage for the fault time',
    ],
    result: 'EPR ≈ 3.4 kV, touch ≈ 2.4 kV — far above limits; mitigation/fast clearing needed.',
  },

  standards: [
    {
      standard: 'BS EN 50522',
      citation: 'BS EN 50522 — Earthing of power installations',
      clauseText:
        'BS EN 50522 gives permissible touch voltages as a function of fault duration and the methods for assessing earth potential rise, touch and step voltages. BS 7671 earthing requirements apply to the installation.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'EPR, touch/step factors and time-dependent permissible voltages per BS EN 50522 / IEC 60479 match the engine (not in BS 7671 facets).',
  },
};
