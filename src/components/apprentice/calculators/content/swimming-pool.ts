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
      citation: 'Regulation 702.32 — the three zones, dimensioned',
      clauseText:
        'Zone 0 is the interior of the basin of the swimming pool or fountain including any recesses in its walls or floors, basins for foot cleaning and water jets or waterfalls and the space below them. Zone 1 is limited by zone 0, a vertical plane 2 m from the rim of the basin, the floor or surface expected to be occupied by persons, and the horizontal plane 2.50 m above it. Where the pool contains diving boards, springboards, starting blocks, chutes or other components expected to be occupied by persons, zone 1 instead extends 1.50 m from their periphery and 2.50 m above the highest surface expected to be occupied. Zone 2 is the vertical plane external to zone 1 and a parallel plane 1.50 m from it, up to 2.50 m above the floor. Zones 1 and 2 may be limited by fixed partitions having a minimum height of 2.50 m. THERE IS NO ZONE 2 FOR FOUNTAINS (702.32(c)).',
      tableRefs: ['Reg 702.32', 'Figures 702.1 to 702.4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 702.410.3.4.1 — Zones 0 and 1: two DIFFERENT SELV voltages',
      clauseText:
        'Except for fountains (see 702.410.3.4.2): in ZONE 0 only protection by SELV at a nominal voltage not exceeding 12 V AC RMS or 30 V ripple-free DC is permitted; in ZONE 1 only protection by SELV at a nominal voltage not exceeding 25 V AC RMS or 60 V ripple-free DC is permitted. In both cases the SELV source shall be installed outside zones 0, 1 and 2. Equipment for the interior of basins intended to operate only when people are not inside zone 0 may instead use SELV, ADS with an RCD to Reg 415.1.1, or electrical separation supplying one item only — and the socket-outlet and control device shall carry a notice warning that the equipment is to be used only when the pool is not occupied.',
      tableRefs: ['Reg 702.410.3.4.1', 'Reg 415.1.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 702.410.3.4.2 / .3 — fountains and Zone 2',
      clauseText:
        'Fountains are carved out of the general zone 0/1 rule and given their own protective measures in 702.410.3.4.2 (SELV, ADS with an RCD to 415.1.1, or electrical separation). Zone 2 is dealt with separately again in 702.410.3.4.3 — and does not exist at all for fountains.',
      tableRefs: ['Reg 702.410.3.4.2', 'Reg 702.410.3.4.3'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Zone dimensions and protective measures quoted verbatim from the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf). \u26a0\ufe0f The previous single-sentence citation gave only \u201cSELV at 12 V AC in Zone 0\u201d and left Zone 1 unstated \u2014 zone 1 has a DIFFERENT ceiling, 25 V AC RMS / 60 V ripple-free DC, and zone 0 has a DC figure too (30 V ripple-free). Also captured: the diving-board variant of zone 1 (1.50 m from the periphery, not 2 m from the rim), the 2.50 m fixed-partition rule, and that there is NO zone 2 for fountains. Zone geometry in the engine matches 702.32.',
  },
};
