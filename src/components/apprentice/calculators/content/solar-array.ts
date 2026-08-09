import type { CalculatorContent } from './types';

/**
 * Solar array design — string sizing + BS 7671 §712.
 */
export const solarArrayContent: CalculatorContent = {
  slug: 'solar-array',
  governingStandards: ['BS 7671', 'MCS'],

  whyItMatters: [
    'String voltage must stay within the inverter’s MPPT window across temperature: panels produce their highest open-circuit voltage when cold, which sets the maximum panels per string.',
    'Too few panels per string and the array under-volts on hot days, dropping out of the MPPT range; too many and the cold Voc can exceed the inverter’s maximum and damage it.',
    'Roof layout (row spacing, tilt, azimuth) sets how many panels fit and how much inter-row shading they cause.',
    'The DC side stays live in daylight, so isolation, labelling and protection to BS 7671 Section 712 are essential.',
  ],

  whenToCheck: [
    'Sizing strings against the inverter’s min/max DC voltage at hot/cold extremes',
    'Laying out rows to balance panel count against inter-row shading',
    'Checking DC and AC voltage drop on long cable runs',
    'Confirming MCS minimum system size and design rules',
  ],

  commonMistakes: [
    'Sizing strings at 25 °C and ignoring the cold-Voc rise (risking inverter over-voltage)',
    'Packing rows too close, causing inter-row shading losses',
    'Underestimating DC/AC cable voltage drop on long roof-to-inverter runs',
    'Forgetting DC-side isolation and labelling per Section 712',
  ],

  workedExample: {
    scenario: 'Panel Voc 40 V, −0.30%/°C; inverter max 1000 V DC; cold design −10 °C.',
    inputs: [
      { label: 'Voc (STC)', value: '40 V' },
      { label: 'Temp coefficient', value: '−0.30%/°C' },
      { label: 'Inverter max DC', value: '1000 V' },
    ],
    steps: [
      'Voc at −10 °C = 40 × (1 + (−0.0030 × (−10 − 25)))',
      'Voc(cold) = 40 × (1 + 0.105) = 44.2 V',
      'Max panels/string = 1000 ÷ 44.2 ≈ 22',
    ],
    result: '≈ 22 panels max per string at the cold extreme (stay below the inverter maximum).',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — Solar PV power supply systems',
      clauseText:
        'PV array design must meet Section 712: DC-side isolation and labelling, string protection, and recognition that the DC side cannot be switched off and remains live in daylight.',
      tableRefs: ['Section 712'],
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3002:2025 Issue 2.0 — what it actually requires',
      clauseText:
        'MIS 3002 specifies the requirements for MCS Contractors undertaking the supply, design, installation, set to work and commissioning of solar PV systems on permanent buildings, connected in parallel with the distribution network, up to a maximum DC output of 50 kWp (§1). It does NOT set the design rules itself: §3.2.1 requires design and installation to the 2nd Edition of the IET Code of Practice for Grid Connected Solar Photovoltaic Systems, with MIS 3002’s additional requirements and exceptions in §3.3–3.9 on top. Where a conflict arises, the latest version of BS 7671 takes precedence, with particular attention drawn to Part 7 Section 712 (§3.2.2).',
      tableRefs: ['MIS 3002 §1', 'MIS 3002 §3.2'],
    },
    {
      standard: 'ENA EREC G99',
      citation: 'EREC G99 Issue 2 2025 §6.1.2.1 — the G98 threshold, quoted exactly',
      clauseText:
        '“A connection procedure to facilitate the connection and operation of Fully Type Tested Power Generating Modules with aggregate Registered Capacity of less than or equal to 16 A per phase in parallel with public Low Voltage Distribution Network is given in EREC G98 and is not considered further in this document. These are referred to as micro-generators.” Two qualifiers do real work here and are usually dropped: the module must be FULLY TYPE TESTED, and the 16 A is the AGGREGATE Registered Capacity — so two 3 kW inverters on the same phase aggregate to 6 kW and fall under G99, even though neither exceeds the threshold on its own.',
      tableRefs: ['G99 §6.1.2.1'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'MIS 3002 rewritten against the source (Desktop/hav/MCS-MIS3002-2025-Solar-PV.pdf, Issue 1.0, dated 01/01/2025), matching the treatment already applied to solar-pv.ts. \u26a0\ufe0f The previous text claimed MIS 3002 covers \u201cminimum system size, shading and string design\u201d \u2014 the standard sets NO minimum system size, the word \u201cshading\u201d does not appear in it, and it defers the design rules to the IET Code of Practice 2nd Ed rather than stating them. The 50 kWp DC ceiling is the real scope figure. G99 \u00a76.1.2.1 added verbatim so the array\u2019s connection route is stated with its Fully-Type-Tested and aggregate-capacity qualifiers. Cold-Voc string-sizing matches the engine; array voltage-drop constants (loop / \u221a3) were corrected in an earlier pass. \u26a0\ufe0f MIS 3002 SUPERSEDED CHECK (2026-08-09): the held copy was Issue 1.0 (01/01/2025); the current issue is 2.0, dated 18/03/2026, now also held as MCS-MIS3002-2025-Solar-PV-Issue2.0-CURRENT.pdf. Its own amendment record gives the change as \u201cExtension to clause 5.5.5 and other small corrective amendments\u201d. The two clauses quoted here \u2014 the \u00a71 50 kWp DC scope and \u00a73.2.1/3.2.2 deferral to the IET Code of Practice 2nd Edition with BS 7671 taking precedence \u2014 were compared line-by-line across both issues and are UNCHANGED, so the substance stands; only the issue number was stale. Note MCS also runs a parallel \u2018Current Installer Scheme\u2019 MIS 3002 at Issue 6.0 (also 18/03/2026), held alongside it.',
  },
};
