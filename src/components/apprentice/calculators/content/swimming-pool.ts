import type { CalculatorContent } from './types';

/**
 * Swimming pool electrical — BS 7671 Section 702.
 */
export const swimmingPoolContent: CalculatorContent = {
  slug: 'swimming-pool',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Water dramatically lowers body resistance, so swimming pools are a special location with stricter rules under BS 7671 Section 702.',
    'The zones (0, 1, 2) around the pool set what equipment and voltages are allowed and the minimum IP ratings — Zone 0 is inside the basin, where only SELV at 12 V AC / 30 V DC is permitted.',
    'Supplementary equipotential bonding ties all extraneous and exposed metal together so no dangerous voltage can appear between them.',
    'Getting the zones, bonding or IP wrong in a wet location is potentially fatal.',
  ],

  whenToCheck: [
    'Designing or inspecting electrics in and around a pool',
    'Determining the zone for a piece of equipment',
    'Specifying SELV, IP rating and RCD protection by zone',
    'Confirming supplementary equipotential bonding',
  ],

  commonMistakes: [
    'Mis-identifying the zones and allowing non-compliant equipment',
    'Using mains voltage in Zone 0/1 where SELV is required',
    'Under-rating IP for the zone’s water exposure',
    'Omitting supplementary equipotential bonding of pool metalwork',
  ],

  workedExample: {
    scenario: 'Underwater luminaire in Zone 0 (inside the pool).',
    inputs: [
      { label: 'Zone', value: '0 (inside basin)' },
      { label: 'Permitted supply', value: 'SELV ≤ 12 V AC' },
      { label: 'SELV source', value: 'Outside zones 0/1/2' },
    ],
    steps: [
      'Zone 0 permits only SELV at 12 V AC (30 V ripple-free DC)',
      'The SELV safety source must be located outside zones 0, 1 and 2',
      'Equipment must meet the zone’s minimum IP rating',
    ],
    result: 'Zone 0 luminaire on 12 V SELV, source outside the zones — compliant with Section 702.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 702 — Swimming pools and other basins',
      clauseText:
        'Section 702 defines zones 0, 1 and 2 with restricted voltages, equipment and IP ratings (e.g. SELV at 12 V AC in Zone 0 with the source outside the zones), additional RCD protection and supplementary equipotential bonding of all extraneous and exposed-conductive-parts.',
      tableRefs: ['Section 702'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Section 702 zones, SELV and bonding requirements match the engine. Confirm exact zone dimensions/sub-clauses against A4:2026 facets.',
  },
};
