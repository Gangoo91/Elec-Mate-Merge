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
    steps: ['Iz = It × Ca × Cg × Ci × Cs', 'Iz = 27 × 0.94 × 0.70 × 1 × 1', 'Iz ≈ 17.8 A'],
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
    /*
      Verified against the printed Appendix 4 (Desktop/BS7671_ocr.pdf, §2.1 and
      §2.3.1). Two things the single "rating factors" line did not say, and both
      change how the answer should be read.
    */
    {
      standard: 'BS 7671',
      citation: 'Appendix 4 §2.1 — reference ambient temperature',
      clauseText:
        'The tabulated current-carrying capacities assume a reference ambient of 30 °C for cables in air, irrespective of installation method, and 20 °C for cables buried directly in soil or in ducts in the ground. Where the ambient differs, the rating factors of Tables 4B1 and 4B2 apply to the values in Tables 4D1A to 4J4A. For buried cables no further correction is needed if soil temperature exceeds the selected ambient by up to 5 °C for only a few weeks a year.',
      tableRefs: ['Table 4B1', 'Table 4B2'],
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4 §2.1 — what the factors do NOT cover',
      clauseText:
        'The rating factors in Tables 4B1 and 4B2 do not take account of any increase due to solar or other infrared radiation. Where cables are subject to such radiation the current-carrying capacity is derived by the methods of BS 7769 (BS IEC 60287) instead — a derating calculator cannot answer that case.',
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4 §2.3.1 — grouping',
      clauseText:
        'Where more cables than a single circuit are installed in the same group, the group rating factors of Tables 4C1 to 4C3 need to be applied. NOTE: those factors are calculated for prolonged steady-state operation at 100% load factor — where loading is less than that, the applicable group factor may be higher.',
      tableRefs: ['Table 4C1', 'Table 4C2', 'Table 4C3'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Appendix 4 \u00a72.1 (30 \u00b0C air / 20 \u00b0C buried reference ambients, Tables 4B1\u20134B2, the solar-radiation exclusion pointing to BS 7769) and \u00a72.3.1 (grouping, Tables 4C1\u20134C3 and the 100% load-factor note) verified against the printed A4:2026 text. Iz = It \u00d7 Ca \u00d7 Cg \u00d7 Ci \u00d7 Cs matches the engine; factor tables live in src/lib/calculators/bs7671-data.',
  },
};
