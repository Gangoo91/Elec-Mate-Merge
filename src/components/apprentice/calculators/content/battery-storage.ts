import type { CalculatorContent } from './types';

/**
 * Battery / electrical energy storage (EESS) — connection + BS 7671 editorial.
 */
export const batteryStorageContent: CalculatorContent = {
  slug: 'battery-storage',
  governingStandards: ['BS 7671', 'ENA EREC G98', 'ENA EREC G99', 'MCS'],

  whyItMatters: [
    'Usable storage is always less than the nameplate kWh — depth of discharge, round-trip efficiency and temperature all eat into it, so size to usable energy, not the label.',
    'A storage inverter is a form of generation for connection purposes: up to 16 A/phase (≈3.68 kW) it connects under G98; above that, G99 applies before energising.',
    'Lithium chemistries (LiFePO₄) give deeper discharge and far more cycles than lead-acid — the right chemistry depends on cycle life and budget, not just capacity.',
    'Domestic GB installs of battery storage are currently 0%-rated for VAT (to 31 March 2027).',
  ],

  whenToCheck: [
    'Sizing a bank for a target daily autonomy or self-consumption',
    'When the inverter output crosses the G98/G99 threshold',
    'Choosing chemistry on cycle life and depth of discharge, not just kWh',
    'Siting outdoors/garage — apply the temperature derating to capacity',
  ],

  commonMistakes: [
    'Quoting nameplate kWh as usable — apply depth of discharge and round-trip efficiency',
    'Assuming G98 when the inverter exceeds the 16 A/phase threshold',
    'Ignoring cold-temperature capacity loss for outdoor installs',
    'Comparing lithium and lead-acid on £/kWh capacity alone, not £/kWh-cycle',
  ],

  workedExample: {
    scenario: '8 kWh/day demand, 1 day autonomy, LiFePO₄ (95% DoD, 98% efficiency), 20% reserve.',
    inputs: [
      { label: 'Daily demand', value: '8 kWh' },
      { label: 'Autonomy + reserve', value: '1 day + 20%' },
      { label: 'DoD / efficiency', value: '95% / 98%' },
    ],
    steps: [
      'Required (usable) = 8 × 1 × 1.2 = 9.6 kWh',
      'Allow for round-trip efficiency: 9.6 ÷ 0.98 ≈ 9.8 kWh',
      'Total capacity = usable ÷ DoD = 9.8 ÷ 0.95 ≈ 10.3 kWh',
    ],
    result: '≈ 10.3 kWh installed for ~9.6 kWh usable.',
  },

  standards: [
    {
      standard: 'ENA EREC G98',
      citation: 'ENA EREC G98 / G99 — storage inverter connection',
      clauseText:
        'A storage system that can export is treated as generation for connection: up to and including 16 A per phase connects under G98 (notify); above that, G99 application and agreement are required before connection.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 — installation of the storage system',
      clauseText:
        'The storage installation must comply with BS 7671 for cabling, isolation, protection and earthing, with manufacturer requirements for the battery and inverter. The IET Code of Practice for Electrical Energy Storage Systems gives further guidance.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'G98/G99 thresholds match the engine; BS 7671 + IET EESS Code of Practice authored from established practice. VAT 0% domestic GB per HMRC relief.',
  },
};
