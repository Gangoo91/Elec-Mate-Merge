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
    scenario: '90 m² modern semi, good insulation (≈70 W/m²), Southern England (design −2 °C, indoor 21 °C).',
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
      citation: 'MCS MIS 3005-D — Heat Pump Design Standard',
      clauseText:
        'Heat pump systems must be designed from a calculated heat loss to a recognised method, with the heat pump and emitters sized to the design heat loss and flow temperature. Oversizing beyond the permitted margin is not allowed.',
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3005-I:2025 — Heat Pump Installation Standard',
      clauseText:
        'Installation, commissioning and handover must follow MIS 3005-I:2025, including system commissioning and the commissioning checklist (Appendix A).',
      tableRefs: ['Appendix A — Commissioning Checklist'],
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 — electrical supply to the heat pump',
      clauseText:
        'The supply circuit, isolation, protective device and earthing for the heat pump must comply with BS 7671, sized for a continuous load with appropriate RCD/RCBO protection.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'MIS 3005-I:2025 title/structure confirmed against source PDF. MIS 3005-D design requirements and BUS eligibility (£7,500 ASHP/GSHP; air-to-air not eligible) authored from established rules — confirm design figures against MIS 3005-D. Heat-loss formula corrected (was ~24× high).',
  },
};
