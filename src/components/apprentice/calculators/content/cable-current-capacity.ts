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
      citation: 'Regulation 523.1 — the actual duty is a TEMPERATURE limit',
      clauseText:
        'The current, including any harmonic current, to be carried by any conductor for sustained periods during normal operation shall be such that the appropriate temperature limit specified in Table 52.2 is not exceeded. The value of current shall be selected in accordance with Regulation 523.2, or determined in accordance with Regulation 523.3. Table 52.2 gives 70 °C at the conductor for thermoplastic, 90 °C at the conductor for thermosetting, 70 °C at the sheath for mineral (thermoplastic covered or bare exposed to touch) and 105 °C at the sheath for mineral not exposed to touch and not in contact with combustible material.',
      tableRefs: ['Reg 523.1', 'Table 52.2'],
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4 — tabulated capacity and the rating factors',
      clauseText:
        'The tabulated current-carrying capacity is the value that holds the conductor at its Table 52.2 temperature limit under the reference conditions of the table. Real installations rarely match those conditions, so the tabulated value is corrected by the applicable rating factors — ambient temperature, grouping, thermal insulation and, where fitted, the factor for a semi-enclosed (BS 3036) fuse — before it may be compared with the design current.',
      tableRefs: ['Appendix 4'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 523.1 quoted verbatim from the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf), together with the Table 52.2 temperature limits it points to. The file previously cited \u201cRegulation 523\u201d for \u201ccurrent-carrying capacity\u201d, which understates it \u2014 Section 523 is titled CURRENT-CARRYING CAPACITIES OF CABLES and 523.1 frames the requirement as a conductor/sheath TEMPERATURE limit, with the current merely the means of respecting it. That framing is what makes the derating factors non-optional. Derating arithmetic matches the engine and the bs7671-data tables.',
  },
};
