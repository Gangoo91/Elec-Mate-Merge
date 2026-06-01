import type { CalculatorContent } from './types';

/**
 * Battery backup / UPS runtime — engineering tool (no governing standard).
 */
export const batteryBackupContent: CalculatorContent = {
  slug: 'battery-backup',
  governingStandards: ['none'],

  whyItMatters: [
    'Backup runtime is usable battery energy ÷ load — and “usable” is well below nameplate once depth of discharge, inverter efficiency and ageing are applied.',
    'Lead-acid chemistries also lose effective capacity at higher discharge rates (the Peukert effect), so a heavy load runs the battery down faster than the simple sum suggests.',
    'Sizing on usable energy (not nameplate) is the difference between a UPS that lasts the required time and one that drops out early.',
    'Inverter sizing must cover the peak (and surge) load, not just the average.',
  ],

  whenToCheck: [
    'Sizing a UPS/battery bank for a target runtime',
    'Selecting the inverter for the peak and surge load',
    'Comparing chemistries on usable energy and cycle life',
    'Checking cable and fuse sizing for the DC side',
  ],

  commonMistakes: [
    'Using nameplate Ah/kWh instead of usable (depth of discharge × efficiency × health)',
    'Ignoring the Peukert derating at higher discharge rates for lead-acid',
    'Sizing the inverter to the average rather than the peak/surge load',
    'Forgetting temperature derating for cold or hot battery locations',
  ],

  workedExample: {
    scenario: '48 V, 200 Ah AGM (50% DoD, 90% health), 97 W load, 92% inverter.',
    inputs: [
      { label: 'Nameplate energy', value: '48 × 200 = 9.6 kWh' },
      { label: 'DoD × health', value: '0.5 × 0.9' },
      { label: 'Load (DC)', value: '97 ÷ 0.92 ≈ 105 W' },
    ],
    steps: [
      'Usable ≈ 9.6 kWh × 0.5 × 0.9 ≈ 4.3 kWh',
      'Runtime ≈ usable ÷ load ≈ 4300 ÷ 97',
      '≈ 44 hours (before Peukert correction at this light load)',
    ],
    result: '≈ 4.3 kWh usable → tens of hours at a small load; size the inverter to the peak.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes: 'UPS/battery sizing tool — no single governing standard. Usable-energy, Peukert and inverter-efficiency logic match the engine.',
  },
};
