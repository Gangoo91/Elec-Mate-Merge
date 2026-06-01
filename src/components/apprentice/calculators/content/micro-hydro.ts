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
    'Grid connection follows the usual G98 (≤16 A/phase) / G99 (above) rules; an abstraction licence is also normally required.',
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
      citation: 'ENA EREC G98 / G99 — connection',
      clauseText:
        'Output up to and including 16 A per phase connects under G98 (notify); above that, a G99 application and agreement are required before connection.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 — installation',
      clauseText:
        'The generating installation must comply with BS 7671 for protection, isolation and earthing. An abstraction licence from the environmental regulator is normally also required.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'P = ρgQHη matches the engine (9.81·Q·H·η). G98/G99 thresholds verified; abstraction-licence note is regulatory context.',
  },
};
