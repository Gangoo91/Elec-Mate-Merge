import type { CalculatorContent } from './types';

/**
 * Marine electrical — ISO 13297 / ABYC E-11 (not BS 7671).
 */
export const marineElectricalContent: CalculatorContent = {
  slug: 'marine-electrical',
  governingStandards: ['ISO 13297', 'ABYC E-11'],

  whyItMatters: [
    'Boats are not buildings: the marine environment (salt, vibration, a floating, often ungrounded system) means BS 7671 does not apply — ISO 13297 (and US ABYC E-11) govern small-craft AC/DC systems.',
    'Voltage drop limits are tighter and conductors are usually stranded, tinned and sized for the higher allowable drop and ampacity of the marine standard.',
    'Galvanic isolation, correct AC/DC earth/bonding and overcurrent protection at the source are safety-critical against shock and corrosion.',
    'Using building-wiring rules on a boat gives the wrong cable sizes and unsafe earthing.',
  ],

  whenToCheck: [
    'Designing or checking a boat’s AC or DC circuits',
    'Sizing marine cable for ampacity and the tighter voltage-drop limits',
    'Specifying galvanic isolation and bonding',
    'Selecting overcurrent protection at the source (battery/shore inlet)',
  ],

  commonMistakes: [
    'Applying BS 7671 cable sizing to a boat instead of ISO 13297/ABYC',
    'Using non-tinned conductors that corrode in the marine environment',
    'Omitting galvanic isolation on the shore-power earth',
    'Protecting circuits too far from the source',
  ],

  workedExample: {
    scenario: 'A 12 V DC circuit, 10 A, 5 m run, 3% allowable drop.',
    inputs: [
      { label: 'Voltage', value: '12 V DC' },
      { label: 'Current / length', value: '10 A / 5 m' },
      { label: 'Allowable drop', value: '3% (0.36 V)' },
    ],
    steps: [
      'Allowable drop = 12 × 0.03 = 0.36 V',
      'Required conductor keeps 2-way drop ≤ 0.36 V at 10 A over 5 m',
      'Select the marine cable size from the standard’s ampacity/drop table',
    ],
    result: 'Size the tinned marine conductor to keep the 2-way drop ≤ 0.36 V.',
  },

  standards: [
    {
      standard: 'ISO 13297',
      citation: 'ISO 13297 — Small craft AC/DC electrical systems',
      clauseText:
        'ISO 13297 (with ABYC E-11 in the US) governs AC and DC electrical installations in small craft: conductor sizing for ampacity and voltage drop, overcurrent protection at the source, earthing/bonding and galvanic isolation. BS 7671 does not apply to the vessel.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Marine standards (ISO 13297 / ABYC E-11) authored from established requirements — not in the BS 7671 facets. Confirm cable/drop tables against the standard.',
  },
};
