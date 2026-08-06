import type { CalculatorContent } from './types';

/**
 * IP rating decoder — BS EN 60529.
 */
export const ipRatingContent: CalculatorContent = {
  slug: 'ip-rating',
  governingStandards: ['BS EN 60529', 'BS 7671'],

  whyItMatters: [
    'The IP (Ingress Protection) code tells you what an enclosure keeps out: the first characteristic numeral is solids/access, the second is water.',
    'Choosing the right IP rating for the location keeps equipment safe — a bath/shower zone, an outdoor enclosure and a dusty workshop each demand different protection.',
    'BS 7671 sets an outdoor / moisture-exposed minimum of IP44 wherever it states one (Regs 721.55.2.3, 705.512.2, 709.553.1.8, 740.512.2). IP24 and IP34 do not meet it — the first numeral has to be 4.',
    'BS 7671 states most of its own minima with one numeral omitted as X — IPX4, IP2X, IP4X, IPXXD. Read those the same way as a full code.',
    'Under-rating risks water/dust ingress and failure; over-rating wastes money and can trap heat.',
  ],

  whenToCheck: [
    'Selecting enclosures, accessories and luminaires for wet, dusty or outdoor locations',
    'Meeting the minimum IP for a BS 7671 special-location zone',
    'Specifying equipment near jets, hoses or submersion',
    'Decoding a manufacturer’s IP marking',
  ],

  commonMistakes: [
    'Reading the numerals the wrong way round (first = solids/access, second = water)',
    'Assuming a higher second numeral includes the lower tests (IPX7 does not guarantee IPX5/6)',
    'Treating IP24 or IP34 as “outdoor rated” — every BS 7671 outdoor/moisture minimum is IP44, so the first numeral must be at least 4',
    'Calling first numeral 5 “dust-tight” — 5 is dust-protected (limited ingress permitted); only 6 is dust-tight',
    'Reading a second numeral of 3 as “light moisture” — 3 is spray up to 60° from vertical',
    'Ignoring the BS 7671 zone minimum for the location',
    'Confusing the additional letters (A–D, access to hazardous parts, as in IPXXB/IPXXD) with the supplementary letters (H, M, S, W)',
    'Confusing IP with IK (mechanical impact) ratings',
  ],

  workedExample: {
    scenario: 'An outdoor socket marked IP66.',
    inputs: [
      { label: 'First digit (6)', value: 'Dust-tight' },
      { label: 'Second digit (6)', value: 'Powerful water jets' },
    ],
    steps: [
      'First digit 6 → total protection against dust ingress',
      'Second digit 6 → protected against powerful water jets',
      'Suitable for a typical exposed outdoor location',
    ],
    result: 'IP66 = dust-tight and jet-proof — appropriate for outdoor use.',
  },

  standards: [
    {
      standard: 'BS EN 60529',
      citation: 'BS EN 60529 — Degrees of protection (IP code)',
      clauseText:
        'The IP code classifies the degree of protection provided by enclosures against access to hazardous parts, ingress of solid foreign objects (first characteristic numeral) and ingress of water (second characteristic numeral). An omitted numeral is written X in either position. An additional letter A–D may follow, stating protection against access to hazardous parts; a supplementary letter H, M, S or W may follow that.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 416.2.2',
      clauseText:
        'A horizontal top surface of a barrier or enclosure which is readily accessible shall provide a degree of protection of at least IPXXD or IP4X.',
      sourceFacetIds: [
        '3a7e307d-9963-4abf-b38f-8f05dabe8829',
        '2ac3c99d-07a0-4c0b-a7f5-e52649cdd2e9',
        'cc7d1960-8468-4f26-837e-bfe1f98db0fb',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 701.512.2 — locations containing a bath or shower',
      clauseText:
        'Installed electrical equipment in zone 0 shall have at least IPX7. Equipment in zones 1 and 2 shall have at least IPX4. Equipment exposed to water jets, for example for cleaning purposes, shall have at least IPX5. Shaver supply units to BS EN 61558-2-5 in zone 2, where direct spray from showers is unlikely, are excepted.',
      sourceFacetIds: [
        '1d434abf-670f-482e-b32e-c7756fcf74c0',
        '18400610-f0ad-4562-940f-662404942420',
        'a73f1084-c3a9-4fdc-8302-6e3653934246',
        'd3a46a3b-b9cb-49ce-8434-0c0674867f9e',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 702.512.2 — swimming pools and other basins',
      clauseText:
        'Zone 0 requires at least IPX8. Zone 1 requires at least IPX4, or IPX5 where water jets are likely for cleaning. Zone 2 requires at least IPX2 indoors and IPX4 outdoors, or IPX5 where water jets are likely for cleaning.',
      sourceFacetIds: [
        '8a785c28-b9ce-40c7-b6ca-1ef7d80dc0e9',
        'd62144f1-3b65-44b1-94f9-3d3a139f92cc',
        '90db6140-9f76-45ef-a2a0-fd0c617a1edb',
        'f6e1a8cb-f50c-4945-b10b-7fd1cc8721ab',
        'c940aa19-1bc6-4cc6-bc20-97032b8fd5ad',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 703.512.2 — rooms and cabins containing sauna heaters',
      clauseText:
        'Equipment shall have a degree of protection of at least IPX4. Where cleaning by use of water jets may be reasonably expected, equipment shall have at least IPX5.',
      sourceFacetIds: [
        '6540bd95-c971-4f41-873c-5e2e909ab949',
        'a9b49043-f138-462d-9a1f-ac6170053d75',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 721.55.2.3 (with Regs 705.512.2, 709.553.1.8, 740.512.2)',
      clauseText:
        'Where an accessory is located in a position in which it is exposed to the effects of moisture it shall be constructed or enclosed so as to provide a degree of protection not less than IP44. The same IP44 minimum is set for equipment in agricultural and horticultural premises (705.512.2), for socket-outlets in marinas (709.553.1.8) and for equipment exposed to external influences in Chapter 74 (740.512.2).',
      sourceFacetIds: [
        'eb64844b-87f0-4868-ae5d-6079a7f36760',
        '5cb85b70-990b-4049-a63d-ec03025a998d',
        '8be382b2-7a2c-4391-ae37-2c7070c93c52',
        '816021af-a0d0-4694-88a2-31f0a14f1d80',
        '84900b07-a80b-41e3-a363-77a7918557f6',
      ],
    },
  ],

  quickReference: {
    title: 'BS 7671 special-location minimum IP ratings',
    columns: ['Location / zone', 'Minimum', 'Regulation'],
    rows: [
      ['Bath or shower — zone 0', 'IPX7', '701.512.2'],
      ['Bath or shower — zones 1 and 2', 'IPX4', '701.512.2'],
      ['Bath or shower — exposed to water jets', 'IPX5', '701.512.2'],
      ['Swimming pool — zone 0', 'IPX8', '702.512.2'],
      ['Swimming pool — zone 1', 'IPX4 (IPX5 if jets)', '702.512.2'],
      ['Swimming pool — zone 2 indoor', 'IPX2 (IPX5 if jets)', '702.512.2'],
      ['Swimming pool — zone 2 outdoor', 'IPX4 (IPX5 if jets)', '702.512.2'],
      ['Sauna room or cabin', 'IPX4 (IPX5 if jets)', '703.512.2'],
      ['Accessory exposed to moisture', 'IP44', '721.55.2.3'],
      ['Agricultural / horticultural equipment', 'IP44', '705.512.2'],
      ['Marina socket-outlets', 'IP44', '709.553.1.8'],
      ['Readily accessible horizontal top surface', 'IPXXD or IP4X', '416.2.2'],
      ['Live parts behind barriers / in enclosures', 'IPXXB or IP2X', '416.2.1'],
    ],
    footnote:
      'Verified against BS 7671:2018+A4:2026. Where a regulation states a rating in X form, only that axis is required by that clause — the other axis may still be set by another regulation.',
  },

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'IP numeral meanings per BS EN 60529. BS 7671 zone minima and the IP44 outdoor/moisture minimum verified against bs7671_facets (A4:2026) — facet ids recorded per citation. Decoder logic matches: outdoor pass now requires IP44, X is accepted in both numeral positions, additional letters A–D added.',
  },
};
