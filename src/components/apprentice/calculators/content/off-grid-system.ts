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
    scenario: '10 kWh/day, 3.5 peak-sun-hours, 85% system efficiency, 3 days autonomy, 48 V, 80% DoD.',
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
      citation: 'BS 7671 — off-grid LV installation',
      clauseText:
        'An off-grid installation must comply with BS 7671 for protection, isolation, cabling and earthing, including Section 712 where a PV array is used. Grid connection codes (G98/G99) do not apply to a stand-alone system.',
      tableRefs: ['Section 712'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Sizing relationships match the engine. BS 7671 applicability authored from established practice; no DNO codes apply (stand-alone).',
  },
};
