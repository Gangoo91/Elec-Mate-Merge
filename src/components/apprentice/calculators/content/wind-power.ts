import type { CalculatorContent } from './types';

/**
 * Small wind power — physics + connection editorial.
 */
export const windPowerContent: CalculatorContent = {
  slug: 'wind-power',
  governingStandards: ['ENA EREC G98', 'ENA EREC G99', 'MCS', 'BS 7671'],

  whyItMatters: [
    'Wind power rises with the cube of wind speed — doubling the wind gives eight times the power — so the site’s mean wind speed dominates the economics far more than the turbine rating.',
    'Hub height matters: wind speed increases with height (wind shear), so a taller mast on a clean, open site can transform yield.',
    'The Betz limit caps the fraction of wind energy any turbine can capture at ~59%; real small turbines achieve much less, which is why capacity factors are modest.',
    'Grid connection follows the same G98 (≤16 A/phase) / G99 (above) rules as other generation.',
  ],

  whenToCheck: [
    'Assessing a site by its mean wind speed and exposure before anything else',
    'Comparing hub heights — the wind-shear gain often justifies a taller mast',
    'When the turbine output crosses the G98/G99 threshold',
    'Checking MCS certification (MIS 3003) for grant/SEG eligibility',
  ],

  commonMistakes: [
    'Sizing on rated power instead of the realistic capacity factor at the site’s wind speed',
    'Ignoring turbulence and obstructions from buildings and trees (urban sites are poor)',
    'Forgetting wind power scales with the cube of speed when comparing sites',
    'Trusting optimistic wind-database figures for low or suburban masts — verify with on-site measurement',
    'Assuming G98 applies above the 16 A/phase threshold',
  ],

  workedExample: {
    scenario: '5 kW turbine, site mean wind speed giving a 20% capacity factor.',
    inputs: [
      { label: 'Rated power', value: '5 kW' },
      { label: 'Capacity factor', value: '20%' },
      { label: 'Hours/year', value: '8760' },
    ],
    steps: [
      'Annual energy = rated × capacity factor × 8760',
      'Annual energy = 5 × 0.20 × 8760',
      'Annual energy ≈ 8760 kWh/yr',
    ],
    result: '≈ 8760 kWh/yr — note the strong sensitivity to the site’s mean wind speed.',
  },

  standards: [
    {
      standard: 'ENA EREC G99',
      citation: 'ENA EREC G98 / G99 — connection of the turbine',
      clauseText:
        'Output up to and including 16 A per phase connects under G98 (notify); above that, a G99 application and agreement are required before the turbine is connected.',
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3003 — small wind installation standard',
      clauseText:
        'MCS certification to MIS 3003 covers small wind turbine system design and installation and is required for SEG eligibility.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Physics (cube law, Betz ~0.59, wind shear) is standard and matches the engine; G98/G99 thresholds verified; MIS 3003 authored from established scope.',
  },
};
