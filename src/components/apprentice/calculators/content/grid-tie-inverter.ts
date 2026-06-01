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
      standard: 'ENA EREC G98',
      citation: 'ENA EREC G98 / G99 — inverter connection',
      clauseText:
        'Inverter AC output up to and including 16 A per phase connects under G98 with notification; above that, a G99 application and agreement are required before energising.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — AC side protection & isolation',
      clauseText:
        'The AC circuit must comply with BS 7671 (Section 712 for PV), including isolation, protection and an accessible AC isolator.',
      tableRefs: ['Section 712'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'G98/G99 thresholds verified and match the engine (isG98 = acCurrent ≤ 16 A). Clipping/DC:AC guidance is standard practice.',
  },
};
