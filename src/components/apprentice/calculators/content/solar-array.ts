import type { CalculatorContent } from './types';

/**
 * Solar array design — string sizing + BS 7671 §712.
 */
export const solarArrayContent: CalculatorContent = {
  slug: 'solar-array',
  governingStandards: ['BS 7671', 'MCS'],

  whyItMatters: [
    'String voltage must stay within the inverter’s MPPT window across temperature: panels produce their highest open-circuit voltage when cold, which sets the maximum panels per string.',
    'Too few panels per string and the array under-volts on hot days, dropping out of the MPPT range; too many and the cold Voc can exceed the inverter’s maximum and damage it.',
    'Roof layout (row spacing, tilt, azimuth) sets how many panels fit and how much inter-row shading they cause.',
    'The DC side stays live in daylight, so isolation, labelling and protection to BS 7671 Section 712 are essential.',
  ],

  whenToCheck: [
    'Sizing strings against the inverter’s min/max DC voltage at hot/cold extremes',
    'Laying out rows to balance panel count against inter-row shading',
    'Checking DC and AC voltage drop on long cable runs',
    'Confirming MCS minimum system size and design rules',
  ],

  commonMistakes: [
    'Sizing strings at 25 °C and ignoring the cold-Voc rise (risking inverter over-voltage)',
    'Packing rows too close, causing inter-row shading losses',
    'Underestimating DC/AC cable voltage drop on long roof-to-inverter runs',
    'Forgetting DC-side isolation and labelling per Section 712',
  ],

  workedExample: {
    scenario: 'Panel Voc 40 V, −0.30%/°C; inverter max 1000 V DC; cold design −10 °C.',
    inputs: [
      { label: 'Voc (STC)', value: '40 V' },
      { label: 'Temp coefficient', value: '−0.30%/°C' },
      { label: 'Inverter max DC', value: '1000 V' },
    ],
    steps: [
      'Voc at −10 °C = 40 × (1 + (−0.0030 × (−10 − 25)))',
      'Voc(cold) = 40 × (1 + 0.105) = 44.2 V',
      'Max panels/string = 1000 ÷ 44.2 ≈ 22',
    ],
    result: '≈ 22 panels max per string at the cold extreme (stay below the inverter maximum).',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — Solar PV power supply systems',
      clauseText:
        'PV array design must meet Section 712: DC-side isolation and labelling, string protection, and recognition that the DC side remains live in daylight.',
      tableRefs: ['Section 712'],
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3002 — Solar PV installation standard',
      clauseText:
        'MCS-certified design and installation to MIS 3002 (minimum system size, shading and string design) is required for SEG eligibility.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Cold-Voc string-sizing matches the engine. Section 712 + MIS 3002 authored from established requirements; confirm against source. Note: array voltage-drop constants were corrected (loop/√3) in this pass.',
  },
};
