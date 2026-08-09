import type { CalculatorContent } from './types';

/**
 * Micro-hydro — physics + connection editorial.
 */
export const microHydroContent: CalculatorContent = {
  slug: 'micro-hydro',
  governingStandards: ['ENA EREC G98', 'ENA EREC G99', 'BS 7671'],

  whyItMatters: [
    'Hydro power is the product of head and flow: P ≈ ρ·g·Q·H·η, so both the vertical drop (head) and the water flow rate matter — a high head with modest flow can outperform a big flow with little head.',
    'Unlike solar and wind, a good hydro resource runs continuously, giving high capacity factors and steady year-round generation.',
    'Turbine choice follows head and flow (Pelton for high head/low flow, Kaplan/crossflow for low head/high flow); the wrong turbine throws away efficiency.',
    'Grid connection follows the usual G98 (≤16 A/phase aggregate, Fully Type Tested) / G99 (above) rules — but the binding constraint is usually not electrical. Taking and returning water needs an abstraction and/or impoundment licence from the Environment Agency in England (SEPA in Scotland, NRW in Wales), and that consent, not the turbine, is what most often caps a scheme. Figures produced here are an electrical estimate and carry no licensing implication.',
  ],

  whenToCheck: [
    'Estimating power from measured head and flow',
    'Selecting a turbine type to suit the head/flow regime',
    'Allowing for seasonal flow variation (dry-season output is lower)',
    'When the output crosses the G98/G99 threshold; and abstraction licensing',
  ],

  commonMistakes: [
    'Assuming year-round flow — dry seasons reduce output',
    'Choosing a turbine type unsuited to the site’s head and flow',
    'Forgetting penstock and generator losses in the power estimate',
    'Overlooking the abstraction licence and G98/G99 connection',
  ],

  workedExample: {
    scenario: '20 m head, 0.05 m³/s flow, turbine 0.85 × generator 0.95 efficiency.',
    inputs: [
      { label: 'Head (H)', value: '20 m' },
      { label: 'Flow (Q)', value: '0.05 m³/s' },
      { label: 'Overall efficiency', value: '0.85 × 0.95' },
    ],
    steps: [
      'P = ρ·g·Q·H·η = 1000 × 9.81 × 0.05 × 20 × (0.85 × 0.95)',
      'P = 9810 × (0.85 × 0.95)',
      'P ≈ 7.9 kW',
    ],
    result: '≈ 7.9 kW continuous — high capacity factor if flow is reliable.',
  },

  standards: [
    {
      standard: 'ENA EREC G99',
      citation: 'EREC G99 Issue 2 2025 §6.1.2.1 — the G98 threshold, quoted exactly',
      clauseText:
        '“A connection procedure to facilitate the connection and operation of Fully Type Tested Power Generating Modules with aggregate Registered Capacity of less than or equal to 16 A per phase in parallel with public Low Voltage Distribution Network is given in EREC G98 and is not considered further in this document. These are referred to as micro-generators.” Two qualifiers do real work here and are usually dropped: the module must be FULLY TYPE TESTED, and the 16 A is the AGGREGATE Registered Capacity — so two 3 kW inverters on the same phase aggregate to 6 kW and fall under G99, even though neither exceeds the threshold on its own.',
      tableRefs: ['G99 §6.1.2.1'],
    },
    {
      standard: 'none',
      citation: 'There is NO MCS standard for micro-hydro',
      clauseText:
        'Checked directly against the MCS Standards & Tools Library (mcscertified.com) on 2026-08-09: MCS publishes installation standards for solar PV, wind, biomass, heat pumps, batteries and CHP. Hydro is not among them — the word does not appear in the library at all, and MIS 3007 is the micro-CHP standard, not a hydro one. So a micro-hydro scheme has no MCS certification route, and the MCS-linked consumer protection and SEG framework that solar and wind installers rely on does not apply in the same way. Grid connection is still governed by EREC G98/G99, and the installation itself by BS 7671.',
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      '\ud83d\udd34 CORRECTION OF MY OWN EARLIER CLAIM (made 2026-08-09 in this same pass). This file previously said micro-hydro \u201csits under its own MCS installation standard\u201d and named MIS 3007. That is wrong twice over: MIS 3007 is the MICRO-CHP standard, and MCS publishes NO hydro standard at all \u2014 verified against the live MCS Standards & Tools Library, where solar, wind, biomass, heat pump, battery and CHP appear and hydro does not. The lesson is the one already recorded for MIS 3002 \u201cshading\u201d: naming a document you do not hold invents specifics. G99 \u00a76.1.2.1 is quoted verbatim from the held source. P = \u03c1\u00b7g\u00b7Q\u00b7H\u00b7\u03b7 and the turbine-efficiency ranges match the engine. Abstraction/impoundment licensing is covered in whyItMatters as regulatory context, not as a quoted clause.',
  },
};
