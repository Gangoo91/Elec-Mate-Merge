import type { CalculatorContent } from './types';

/**
 * Battery backup / UPS runtime — sizing tool.
 *
 * There is no single governing standard for runtime itself: BS 7671 states no backup duration.
 * The installation requirements for a fixed battery bank do have one — BS 7671:2018+A4:2026
 * Chapter 57 (Stationary secondary batteries), introduced by Amendment 4 — and where the system
 * is a safety service, Section 560 applies (Reg 560.6.12 for UPS, Reg 560.9 for emergency
 * lighting). Duration comes from the application, not the wiring regulations.
 */
export const batteryBackupContent: CalculatorContent = {
  slug: 'battery-backup',
  governingStandards: ['none'],

  whyItMatters: [
    'Backup runtime is usable battery energy ÷ the DC power the inverter actually draws — and “usable” is well below nameplate once depth of discharge, inverter efficiency and ageing are applied.',
    'Lead-acid chemistries also lose effective capacity at higher discharge rates (the Peukert effect), so a heavy load runs the battery down faster than the simple sum suggests. The reverse gain at light loads is bounded by the manufacturer’s longest published rate — it is not unlimited.',
    'Sizing on usable energy (not nameplate) is the difference between a UPS that lasts the required time and one that drops out early.',
    'Inverter sizing must cover the peak (and surge) load, not just the average.',
    'A fixed battery bank supplying an installation falls under BS 7671 Chapter 57: adequate ventilation for any chemistry (Reg 570.6.3), a Type B RCD on the AC supply circuit unless the PCE gives at least simple separation (Reg 570.6.2.2), isolation to Section 462 (Reg 570.6.5), key/tool-access DC fuses (Reg 570.6.7.201) and warning notices (Reg 570.6.8.201–.203).',
  ],

  whenToCheck: [
    'Sizing a UPS/battery bank for a target runtime',
    'Selecting the inverter for the peak and surge load',
    'Comparing chemistries on usable energy and cycle life',
    'Checking cable and fuse sizing for the DC side',
  ],

  commonMistakes: [
    'Using nameplate Ah/kWh instead of usable (depth of discharge × efficiency × health)',
    'Dividing usable DC energy straight by the AC load — that assumes a 100% efficient inverter and over-states runtime',
    'Ignoring the Peukert derating at higher discharge rates for lead-acid',
    'Extrapolating Peukert upwards at light loads until the bank appears to hold more than nameplate',
    'Sizing the inverter to the average rather than the peak/surge load',
    'Forgetting temperature derating for cold battery locations — and crediting a warm room with extra capacity, which it does not give',
    'Treating ventilation as a lead-acid-only measure: Reg 570.6.3 applies whatever the chemistry',
    'Quoting a “required” backup duration from BS 7671 — it states none',
  ],

  workedExample: {
    scenario: '48 V, 200 Ah AGM (50% DoD, 90% health), 97 W AC load, 92% inverter.',
    inputs: [
      { label: 'Nameplate energy', value: '48 × 200 = 9.6 kWh' },
      { label: 'DoD × health', value: '0.5 × 0.9' },
      { label: 'DC power drawn', value: '97 ÷ 0.92 ≈ 105 W' },
    ],
    steps: [
      'Usable ≈ 9.6 kWh × 0.5 × 0.9 ≈ 4.3 kWh',
      'Runtime ≈ usable ÷ DC power drawn ≈ 4300 ÷ 105',
      '≈ 41 hours before any Peukert correction — the inverter’s own losses cost about 3 hours',
      'The tool then adds the Peukert gain for this very light load, capped at the manufacturer’s longest published rate, so it reports somewhat longer',
    ],
    result:
      '≈ 4.3 kWh usable → about 41 hours at this small load before the Peukert gain. Divide by the DC power drawn, not the AC watts, and size the inverter to the peak.',
  },

  standards: [],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Runtime/sizing tool — BS 7671 sets no duration. Chapter 57 citations (570.5.1, 570.6.1.1.1, 570.6.2.1.201, 570.6.2.2, 570.6.3, 570.6.5, 570.6.7.201/.202/.203, 570.6.8.201/.202/.203) and Regs 560.6.12, 560.7, 560.9, 313.2 verified against BS 7671:2018+A4:2026. Runtime now includes inverter efficiency; Peukert gain and the temperature factor are clamped.',
  },
};
