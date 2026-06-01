import type { CalculatorContent } from './types';

/**
 * Cable derating — BS 7671 Appendix 4 rating factors.
 */
export const cableDeratingContent: CalculatorContent = {
  slug: 'cable-derating',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'A cable’s tabulated rating assumes ideal conditions; real installations are hotter and more crowded, so the rating must be reduced by correction factors.',
    'The derated capacity is Iz = It × Ca × Cg × Ci × Cs — tabulated rating × ambient (Ca) × grouping (Cg) × thermal insulation (Ci) × soil/installation (Cs).',
    'Each factor below 1 cuts the safe current; several together can roughly halve a cable’s rating.',
    'Skipping derating is a common cause of cables running too hot for their protective device.',
  ],

  whenToCheck: [
    'Whenever ambient temperature differs from the 30 °C (air) / 20 °C (ground) reference',
    'When cables are grouped/bunched in a containment or on a tray',
    'Where a cable runs through or is surrounded by thermal insulation',
    'For buried cables (soil temperature and thermal resistivity)',
  ],

  commonMistakes: [
    'Applying only one factor when several apply (they multiply)',
    'Using the wrong reference temperature for the insulation type',
    'Forgetting the severe penalty for cables surrounded by thermal insulation',
    'Ignoring grouping in a shared conduit/trunking',
  ],

  workedExample: {
    scenario: 'It = 27 A, 35 °C ambient (Ca 0.94), 3 grouped circuits (Cg 0.70), no insulation.',
    inputs: [
      { label: 'Tabulated It', value: '27 A' },
      { label: 'Ca (35 °C)', value: '0.94' },
      { label: 'Cg (3 circuits)', value: '0.70' },
    ],
    steps: [
      'Iz = It × Ca × Cg × Ci × Cs',
      'Iz = 27 × 0.94 × 0.70 × 1 × 1',
      'Iz ≈ 17.8 A',
    ],
    result: 'Derated Iz ≈ 17.8 A — the device rating In must not exceed this.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Appendix 4 — rating factors',
      clauseText:
        'Current-carrying capacity is the tabulated value corrected by rating factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci) and, for buried cables, soil conditions. The corrected capacity Iz must be at least the device rating In.',
      tableRefs: ['Appendix 4', 'Table 4B1', 'Table 4C1', 'Table 52.2'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Iz = It × Ca × Cg × Ci × Cs matches the engine and Appendix 4. Factor tables transcribed in src/lib/calculators/bs7671-data.',
  },
};
