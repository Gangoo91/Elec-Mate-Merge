import type { CalculatorContent } from './types';

/**
 * Heat pump load — renewable editorial.
 * MCS MIS 3005-I:2025 (installation) confirmed against source; MIS 3005-D (design)
 * and BUS eligibility cited from established requirements.
 */
export const heatPumpContent: CalculatorContent = {
  slug: 'heat-pump',
  governingStandards: ['MCS', 'BS 7671'],

  whyItMatters: [
    'A heat pump must be sized to the dwelling’s calculated heat loss — too big and it short-cycles and runs inefficiently; too small and it can’t hold temperature on the coldest day.',
    'The design flow temperature is the single biggest lever on running cost: lower flow temperatures (e.g. 35 °C underfloor vs 55 °C radiators) lift the seasonal efficiency (SCOP) significantly.',
    'MCS certification to MIS 3005 is what unlocks the Boiler Upgrade Scheme grant (£7,500 for air- and ground-source; air-to-air is not eligible) and consumer protection.',
    'The electrical supply, isolation and earthing for the unit must meet BS 7671 — heat pumps are a continuous, significant load.',
  ],

  whenToCheck: [
    'At design stage, from a proper room-by-room (or whole-house) heat loss — not a rule-of-thumb kW/m²',
    'When choosing emitters: low flow temperature needs larger radiators or underfloor heating',
    'Sizing the supply and protective device for the running and start currents',
    'Checking BUS eligibility (ASHP/GSHP only) and MCS sizing limits',
  ],

  commonMistakes: [
    'Oversizing “to be safe” — it causes cycling and worse efficiency, and can breach MCS sizing limits',
    'Designing around 55 °C flow when the existing emitters could be upsized for low-temperature operation',
    'Assuming an air-to-air system qualifies for the BUS grant (it does not)',
    'Quoting a single COP instead of the SCOP that reflects a whole heating season',
  ],

  workedExample: {
    scenario:
      '90 m² modern semi, good insulation (≈70 W/m²), Southern England (design −2 °C, indoor 21 °C).',
    inputs: [
      { label: 'Floor area', value: '90 m²' },
      { label: 'Heat loss factor', value: '70 W/m²' },
      { label: 'ΔT', value: '23 K' },
      { label: 'Emitter / flow temp', value: 'Radiators / 55 °C' },
    ],
    steps: [
      'Q = area × HLP × (ΔT / 21) / 1000',
      'Q = 90 × 70 × (23 / 21) / 1000',
      'Q ≈ 6.9 kW space heating (before DHW)',
      'Add DHW and check against MCS sizing margins',
    ],
    result: '≈ 6.9 kW space heating → size the unit to the total load, not oversized.',
  },

  standards: [
    {
      standard: 'MCS',
      citation: 'MCS MIS 3005-D:2025 Issue 2.0 (05/12/2025) — The Heat Pump Design Standard',
      clauseText:
        '§1: specifies the requirements for MCS contractors undertaking the DESIGN of microgeneration heat pump systems supplying permanent buildings with space heating and/or domestic hot water — “building” meaning an individual self-contained unit (detached, semi, terrace, an individual flat in a block, or an individual commercial unit). Microgeneration heat pumps are those with a thermal output NOT EXCEEDING 45 kWth per MCS 007; multiple heat pumps may serve one installation with a TOTAL DESIGN HEAT LOAD NOT EXCEEDING 70 kWth (determined in accordance with BS EN 12831-1:2017), provided no single heat pump exceeds 45 kWth. Expressly excluded: cooling-only systems, direct expansion (DX) ground-loop systems, and heat pumps extracting heat from loft spaces. Reversible systems are included but shall be designed and optimised for heating. §5: a heat pump shall be selected that will provide AT LEAST 100% OF THE HEAT LOAD, taking into account the flow temperature at the heat pump and WITHOUT input from any supplementary electric heater.',
      tableRefs: ['MIS 3005-D §1', 'MIS 3005-D §5', 'BS EN 12831-1:2017', 'MCS 007'],
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3005-I:2025 Issue 1.0 — Heat Pump Installation Standard',
      clauseText:
        'Specifies the requirements for MCS Contractors undertaking the installation, set to work and commissioning of microgeneration heat pump systems supplying permanent buildings with space heating and/or domestic hot water (§1). It covers ground, air and water sources, compression and thermally activated heat pumps, heating-only and heating-plus-cooling systems, and both monobloc and split units. Microgeneration heat pumps are defined as those with a thermal output not exceeding 45 kWth. Expressly EXCLUDED are cooling-only systems, direct expansion (DX) ground-loop systems, and heat pumps extracting heat from loft spaces; reversible systems are included but shall be designed and optimised for heating. Appendix A gives an example commissioning checklist.',
      tableRefs: ['MIS 3005-I §1', 'MIS 3005-I Appendix A'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 — electrical supply to the heat pump',
      clauseText:
        'The supply circuit, isolation, protective device and earthing for the heat pump must comply with BS 7671, sized for a continuous load with appropriate RCD/RCBO protection.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'MIS 3005-D:2025 Issue 2.0 is now HELD (Desktop/hav/MCS-MIS3005-D-2025-Issue2.0-HeatPumpDesign.pdf, downloaded from mcscertified.com 2026-08-09) and \u00a71/\u00a75 are quoted verbatim \u2014 this was the single blocker keeping the file on needs-review. The previous MIS 3005-D entry was written from established requirements without the document and understated it. Three things the real text adds: heat load is determined in accordance with BS EN 12831-1:2017 (a named method, not \u201ca recognised method\u201d); the 45 kWth ceiling is PER HEAT PUMP with a separate 70 kWth total for multi-unit installations \u2014 the file previously gave only 45 kWth; and the 100%-of-heat-load rule is explicitly WITHOUT input from a supplementary electric heater, which is the part that bites on a marginal design. MIS 3005-I:2025 Issue 1.0 verified separately and confirmed still current (MCS site checked 2026-08-09 \u2014 3005-I has not been reissued). BUS grant eligibility is government policy, not MCS, and remains unverified here.',
  },
};
