import type { CalculatorContent } from './types';

/**
 * Grid-tie inverter — sizing, clipping, connection.
 */
export const gridTieInverterContent: CalculatorContent = {
  slug: 'grid-tie-inverter',
  governingStandards: ['ENA EREC G98', 'ENA EREC G99', 'BS 7671'],

  whyItMatters: [
    'The inverter’s AC output, not the array size, decides the connection route: up to 16 A/phase (≈3.68 kW single phase) is G98 (notify), above that is G99 (apply first).',
    'A modest DC:AC ratio (array slightly larger than the inverter) lifts annual yield, but too high a ratio clips the peaks and wastes energy.',
    'Inverter efficiency and system losses mean delivered AC energy is below the DC array’s theoretical output.',
    'The AC circuit, isolation and protection must meet BS 7671, with an accessible AC isolator.',
  ],

  whenToCheck: [
    'Matching inverter size to array (DC:AC ratio, typically ~1.1–1.2)',
    'When the AC output approaches 16 A/phase — the G98/G99 decision',
    'Checking expected clipping at high DC:AC ratios',
    'Sizing the AC protective device and isolator',
  ],

  commonMistakes: [
    'Sizing the inverter to the array’s nameplate and ignoring a sensible DC:AC ratio',
    'Assuming G98 when the AC output exceeds 16 A per phase',
    'Overlooking clipping losses when heavily oversizing the array',
    'Forgetting the firefighter-accessible AC isolator',
  ],

  workedExample: {
    scenario: '4 kWp array on a 3.68 kW inverter, 230 V single phase.',
    inputs: [
      { label: 'Array (DC)', value: '4 kWp' },
      { label: 'Inverter (AC)', value: '3.68 kW' },
      { label: 'Supply', value: '230 V' },
    ],
    steps: [
      'DC:AC ratio = 4 ÷ 3.68 = 1.09 (modest, minimal clipping)',
      'AC current = 3680 ÷ 230 ≈ 16 A',
      '≈ 16 A/phase → at the G98 limit; just above needs G99',
    ],
    result: 'DC:AC 1.09; ~16 A AC → G98 boundary (above it requires G99).',
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
      standard: 'ENA EREC G99',
      citation: 'EREC G99 Issue 2 2025 §6.1 Table (scenarios 6 and 7) — adding storage later',
      clauseText:
        'Whether adding storage to an existing PV system re-opens the connection depends entirely on how it is coupled. DC-COUPLED storage (connected to the existing inverters, with no change to the inverters) has “no compliance effect” — compliance remains based on the existing inverters — but generators shall, under their Connection Agreement, apply to the DNO before connecting new Electricity Storage devices. AC-COUPLED storage, with its own inverters, forms an INDEPENDENT Power Park Module which needs to comply with EREC G99 (with certain exemptions listed in Annex A.4).',
      tableRefs: ['G99 §6.1 Table, scenarios 6 and 7', 'G99 Annex A.4'],
    },
    {
      standard: 'ENA EREC G100',
      citation: 'EREC G100 Issue 2 Amendment 2 2023 — Form B, export limitation',
      clauseText:
        'Where an export or import limitation scheme (a Customer Load Limitation Scheme, CLS) is used to stay within an agreed limit, G100 Form B is the Compliance Verification Report by which the manufacturer demonstrates and declares compliance. For a one-off installation the installer uses Form B to confirm the CLS has been tested to satisfy G100, and “this form shall be submitted to the DNO before commissioning”. Where the CLS is Fully Type Tested and registered on the ENA Type Test Register, Form C carries the register reference instead and Form B need not be submitted.',
      tableRefs: ['G100/2 Form B'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — the DC side and the AC isolator',
      clauseText:
        'The AC circuit must comply with BS 7671 including isolation, protection and an accessible AC isolator; for a PV source Section 712 additionally governs the DC side, which cannot be switched off and remains live in daylight.',
      tableRefs: ['Section 712'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'G99 \u00a76.1.2.1 quoted verbatim from ENA EREC G99 Issue 2 2025 (Desktop/hav/G99-Issue2-2025.pdf). \u26a0\ufe0f The previous one-line summary dropped BOTH qualifiers the clause carries \u2014 \u201cFully Type Tested\u201d and \u201cAGGREGATE Registered Capacity\u201d. The aggregate point is a real trap: two sub-threshold inverters on one phase can still require G99. The DC- vs AC-coupled storage distinction is from the G99 \u00a76.1 scenario table (rows 6 and 7), read directly. G100 content is from the held document, which is Form B only \u2014 not the full G100 body \u2014 so only Form B\u2019s own procedure is stated. Clipping / DC:AC ratio guidance is manufacturer practice, not a standard, and is presented as such.',
  },
};
