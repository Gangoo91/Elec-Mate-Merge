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
      citation: 'EREC G99 Issue 2 2025 §6.1.2.1 — the G98 threshold, quoted exactly',
      clauseText:
        '“A connection procedure to facilitate the connection and operation of Fully Type Tested Power Generating Modules with aggregate Registered Capacity of less than or equal to 16 A per phase in parallel with public Low Voltage Distribution Network is given in EREC G98 and is not considered further in this document. These are referred to as micro-generators.” Two qualifiers do real work here and are usually dropped: the module must be FULLY TYPE TESTED, and the 16 A is the AGGREGATE Registered Capacity — so two 3 kW inverters on the same phase aggregate to 6 kW and fall under G99, even though neither exceeds the threshold on its own.',
      tableRefs: ['G99 §6.1.2.1'],
    },
    {
      standard: 'MCS',
      citation:
        'MCS MIS 3003 Issue 4.1 (05/12/2025) — The Small Wind Turbine Standard (Installation)',
      clauseText:
        '§1: this standard specifies the requirements for MCS Contractors undertaking the supply, design, installation, set to work, commissioning and handover of small wind turbine systems located on DEDICATED FREE-STANDING / GUYED TOWERS, supplying permanent buildings, and normally connected in parallel to the electricity distribution network. The scope is small wind turbine systems with power outputs of BETWEEN 0 W AND 50 kW, MEASURED AT A WIND SPEED OF 11.0 m/s — the rating is meaningless without that reference wind speed. Systems that never operate in parallel to the grid (i.e. OFF-GRID SYSTEMS) ARE NOT IN SCOPE. Definitions are in MCS 001, The MCS Contractor Standard Part 1.',
      tableRefs: ['MIS 3003 §1', 'MCS 001'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'MIS 3003 Issue 4.1 is now HELD (Desktop/hav/MCS-MIS3003-SmallWind-Issue4.1-2025-12-05.pdf, downloaded from mcscertified.com 2026-08-09; mandatory for MCS Contractors from 05/12/2025) and \u00a71 is quoted verbatim. This replaces an entry that asserted what MIS 3003 \u201ccovers\u201d from an unheld document. Three things the real scope adds: the 0\u201350 kW range is measured AT 11.0 m/s, the standard applies only to dedicated free-standing or guyed towers, and OFF-GRID systems are expressly out of scope \u2014 so an off-grid turbine gets no MCS route and no SEG. G99 \u00a76.1.2.1 quoted verbatim from ENA EREC G99 Issue 2 2025. Physics \u2014 cube law, Betz 16/27 \u2248 0.593, wind-shear power law \u2014 is textbook and matches the engine; Betz is a theoretical maximum real small turbines fall well short of.',
  },
};
