import type { CalculatorContent } from './types';

/**
 * Off-grid system — sizing + BS 7671 editorial (no DNO connection).
 */
export const offGridSystemContent: CalculatorContent = {
  slug: 'off-grid-system',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Off-grid means there is no grid to fall back on, so the array and battery must cover the worst realistic day — under-sizing leaves the load without power, oversizing wastes money.',
    'Generation is set by peak-sun-hours, not panel rating: a 4 kWp array at 3 peak-sun-hours yields ~12 kWh, not 4 kWh.',
    'Battery autonomy carries the load through cloudy days; size it on usable energy (depth of discharge) at the system voltage.',
    'Because it is not grid-connected, G98/G99 do not apply, but the installation still has to comply with BS 7671.',
  ],

  whenToCheck: [
    'Sizing the array from daily energy ÷ peak-sun-hours ÷ system efficiency',
    'Sizing the battery for the required days of autonomy at the chosen depth of discharge',
    'Sizing the inverter for the peak simultaneous load (with a margin)',
    'Sizing the charge controller for the array current',
  ],

  commonMistakes: [
    'Sizing the array on panel watts instead of peak-sun-hours and system losses',
    'Ignoring depth of discharge — usable battery energy is well below nameplate',
    'Forgetting the inverter must cover the peak (not average) load',
    'Neglecting cold-weather battery capacity loss for an outdoor install',
    'Sizing to an average day instead of the worst-case winter — loads then drop out in dull spells',
  ],

  workedExample: {
    scenario:
      '10 kWh/day, 3.5 peak-sun-hours, 85% system efficiency, 3 days autonomy, 48 V, 80% DoD.',
    inputs: [
      { label: 'Daily demand', value: '10 kWh' },
      { label: 'Peak-sun-hours', value: '3.5' },
      { label: 'Autonomy / DoD', value: '3 days / 80%' },
    ],
    steps: [
      'Array = demand ÷ PSH ÷ efficiency = 10 ÷ 3.5 ÷ 0.85 ≈ 3.4 kW',
      'Battery (Ah) = (demand × days × 1000) ÷ (V × DoD)',
      'Battery = (10 × 3 × 1000) ÷ (48 × 0.8) ≈ 781 Ah at 48 V',
    ],
    result: '≈ 3.4 kW array and ~781 Ah (48 V) battery for 3 days’ autonomy.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 551.1(a) — off-grid IS in scope of Section 551',
      clauseText:
        'Section 551 applies to low voltage and extra-low voltage installations incorporating generating sets intended to supply, continuously or occasionally, all or part of the installation — and arrangement (a) is expressly “supply to an installation which is not connected to a system for distribution of electricity to the public”. A stand-alone system is not outside BS 7671; it is named in the scope.',
      tableRefs: ['Reg 551.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Chapter 57 — Stationary Secondary Batteries (NEW in A4:2026)',
      clauseText:
        'A4:2026 introduced Chapter 57, which provides requirements for stationary secondary battery installations as a source of supply for electrical installations — the battery bank at the heart of an off-grid system. Reg 570.5.1 requires the battery type and capacity to be selected taking account of the nature of demand, battery voltage, charge and discharge time, the generation profiles of locally connected generators such as solar PV, power conversion equipment connection and coupling mode, the supplied equipment’s utilization voltage range, charge and discharge profiles, load profiles and cyclic operation capability, and suitability for fixed installation. The chapter does NOT apply to batteries inside products covered by product standards, nor to those wholly within pluggable UPS (BS EN [IEC] 62040), central safety power supplies (BS EN 50171), fire detection and alarm systems (BS 5839), alarm systems (BS EN 50132), machinery (BS EN [IEC] 60204) or emergency lighting (BS 5266).',
      tableRefs: ['Reg 570.1', 'Reg 570.5.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Section 712 — the PV array, and why no G98/G99',
      clauseText:
        'Where a PV array is the generator, Section 712 applies to the DC side — isolation, protection and labelling, recognising the array cannot be switched off and stays live in daylight. Because a stand-alone system is not connected in parallel with the public distribution network, the ENA connection codes G98/G99 do not apply; that is a consequence of Reg 551.1(a), not an exemption from BS 7671.',
      tableRefs: ['Section 712'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Rewritten against the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf). The file previously cited only \u201cBS 7671 \u2014 off-grid LV installation\u201d with no regulation number. Two real anchors now exist: Reg 551.1(a) names the not-connected-to-the-public-network case in scope, and \u26a0\ufe0f A4:2026 introduced CHAPTER 57 (Stationary Secondary Batteries), numbered 570.x, which is the governing text for the battery bank \u2014 including the 570.5.1 selection criteria and the six system types expressly excluded from its scope. Reg 551.8 was deleted and redirected to this chapter. Sizing relationships match the engine.',
  },
};
