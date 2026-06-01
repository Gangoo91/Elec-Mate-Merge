import type { CalculatorContent } from './types';

/**
 * Arc flash — IEEE 1584-2002. Calculator reimplemented and validated in this pass.
 */
export const arcFlashContent: CalculatorContent = {
  slug: 'arc-flash',
  governingStandards: ['IEEE 1584'],

  whyItMatters: [
    'An arc flash releases intense heat in milliseconds; the incident energy (cal/cm²) at the working distance determines the arc-rated PPE a worker needs.',
    'Incident energy rises with the arcing current and the time the protective device takes to clear — faster protection dramatically reduces the hazard.',
    'It falls steeply with distance, so increasing the working distance (or working dead) is a powerful control.',
    'These figures are for design awareness — PPE selection for live work should be confirmed by a formal arc-flash study.',
  ],

  whenToCheck: [
    'Assessing the arc-flash hazard at a board before live work',
    'Comparing the effect of faster protection or a greater working distance',
    'Estimating the arc-flash boundary and indicative PPE category',
    'Informing a decision to de-energise rather than work live',
  ],

  commonMistakes: [
    'Treating an indicative result as a substitute for a formal arc-flash study',
    'Ignoring clearing time — slow protection multiplies the energy',
    'Using the wrong electrode configuration (open vs enclosed) or gap',
    'Forgetting that arc-rated PPE addresses thermal energy, not blast/pressure',
  ],

  workedExample: {
    scenario: '20 kA bolted fault, 480 V LV switchgear (enclosed), 0.2 s, 610 mm.',
    inputs: [
      { label: 'Bolted fault', value: '20 kA' },
      { label: 'Voltage / gap', value: '480 V / 32 mm' },
      { label: 'Clearing time', value: '0.2 s' },
    ],
    steps: [
      'Arcing current from the IEEE 1584-2002 equation ≈ 11.2 kA',
      'Normalised energy → incident energy = Cf · En · (t/0.2) · (610/D)^x',
      'At 610 mm, 0.2 s ≈ 4.8 cal/cm²',
    ],
    result: '≈ 4.8 cal/cm² → indicative PPE Category 2 (confirm by formal study).',
  },

  standards: [
    {
      standard: 'IEEE 1584',
      citation: 'IEEE 1584-2002 — Arc-Flash Hazard Calculations',
      clauseText:
        'Incident energy and arc-flash boundary are calculated from the arcing current, electrode configuration, gap, clearing time and working distance per IEEE 1584-2002. Results are indicative; a formal study should confirm PPE.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Calculator reimplemented to IEEE 1584-2002 and validated against the canonical 20 kA/480 V example (~4.8 cal/cm²). UK arc-flash work also references the ENA/EA guidance and DGUV-I 203-077.',
  },
};
