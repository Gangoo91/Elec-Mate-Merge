import type { CalculatorContent } from './types';

/**
 * Cable current-carrying capacity — BS 7671 Reg 523 + Appendix 4.
 */
export const cableCurrentCapacityContent: CalculatorContent = {
  slug: 'cable-current-capacity',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'A conductor’s current-carrying capacity (Iz) is the current it can carry continuously without exceeding its insulation’s temperature limit (70 °C for thermoplastic, 90 °C for thermosetting).',
    'It starts from the Appendix 4 tabulated value for the reference method, then is reduced by the installation’s rating factors (ambient, grouping, insulation).',
    'The device must satisfy Ib ≤ In ≤ Iz — the cable’s derated capacity has to be at least the device rating.',
    'Exceeding Iz cooks the insulation over time, leading to breakdown and fire risk.',
  ],

  whenToCheck: [
    'Selecting a cable size for a known load and installation method',
    'When ambient temperature, grouping or insulation differ from the reference',
    'Confirming an existing cable is adequate for a new or increased load',
    'Choosing the installation (reference) method that matches the route',
  ],

  commonMistakes: [
    'Using the tabulated value without applying the rating factors',
    'Picking the wrong reference method for the actual installation',
    'Letting Iz fall below the device rating In',
    'Forgetting the worst-case point of the route (e.g. through insulation)',
  ],

  workedExample: {
    scenario: 'Clipped-direct 6 mm² T&E (It ≈ 47 A) with grouping Cg 0.80 and ambient Ca 0.94.',
    inputs: [
      { label: 'Tabulated It', value: '47 A' },
      { label: 'Ca (ambient)', value: '0.94' },
      { label: 'Cg (grouping)', value: '0.80' },
    ],
    steps: [
      'Iz = It × Ca × Cg = 47 × 0.94 × 0.80',
      'Iz ≈ 35.3 A',
      'Choose In so that Ib ≤ In ≤ 35.3 A',
    ],
    result: 'Derated Iz ≈ 35 A — a 32 A device is fine; a 40 A device would not be.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 523 — Current-carrying capacity',
      clauseText:
        'The current to be carried by a conductor shall not exceed its current-carrying capacity Iz, determined from the Appendix 4 tabulated value corrected by the applicable rating factors for the installation conditions.',
      tableRefs: ['Appendix 4'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Reg 523 and Appendix 4 derating match the engine and bs7671-data tables. Confirm 523 sub-clause wording against A4:2026 facets.',
  },
};
