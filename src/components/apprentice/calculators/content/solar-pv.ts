import type { CalculatorContent } from './types';

/**
 * Solar PV — renewable editorial.
 * Connection thresholds (G98/G99) match the calculator engine. BS 7671 Section 712
 * and MCS MIS 3002 cited from established requirements; flagged for source confirmation.
 */
export const solarPvContent: CalculatorContent = {
  slug: 'solar-pv',
  governingStandards: ['BS 7671', 'ENA EREC G98', 'ENA EREC G99', 'MCS'],

  whyItMatters: [
    'System yield is what the customer is really buying — getting orientation, tilt and the performance ratio right is the difference between a quote that delivers and one that disappoints.',
    'The DNO connection route is decided by inverter output: up to and including 16 A per phase (≈3.68 kW single phase) connects under G98 (notify after); above that, G99 applies and you must apply for and receive agreement before energising.',
    'A compliant PV install needs DC-side isolation, correct labelling and array protection to BS 7671 Section 712 — the DC side can stay live whenever there is daylight.',
    'MCS certification (and a correct VAT rate) affects both grant/SEG eligibility and the customer’s final price.',
  ],

  whenToCheck: [
    'At quote stage, to size the array and predict annual yield against the customer’s usage',
    'When the inverter output approaches 16 A/phase — the G98 vs G99 decision point',
    'For shaded, east/west or non-optimal roofs where the orientation and tilt factors bite',
    'When advising on VAT — domestic GB installs are currently zero-rated (see below)',
  ],

  commonMistakes: [
    'Quoting nameplate kWp as delivered energy — always apply a performance ratio (typically 75–85%)',
    'Assuming G98 applies when the inverter exceeds 16 A per phase (it then needs G99)',
    'Forgetting the DC side stays live in daylight — isolation and labelling per BS 7671 Section 712',
    'Applying 5% or 20% VAT to a domestic GB install that currently qualifies for 0%',
  ],

  workedExample: {
    scenario: '4.0 kWp array, south-facing at 35°, London (≈1100 kWh/m²/yr), PR 80%.',
    inputs: [
      { label: 'System size', value: '4.0 kWp' },
      { label: 'Irradiance', value: '1100 kWh/m²/yr' },
      { label: 'Performance ratio', value: '80%' },
      { label: 'Inverter', value: '3.68 kW (G98)' },
    ],
    steps: [
      'Annual yield = kWp × irradiance × PR',
      'Annual yield = 4.0 × 1100 × 0.80',
      'Annual yield = 3520 kWh/yr',
      'Inverter ≤ 16 A/phase → connects under G98 (notify the DNO)',
    ],
    result: '≈ 3520 kWh/yr; G98 connection; domestic GB VAT 0%.',
  },

  standards: [
    {
      standard: 'ENA EREC G98',
      citation: 'ENA EREC G98 — micro-generation ≤ 16 A/phase',
      clauseText:
        'Fully type-tested micro-generation up to and including 16 A per phase (≈3.68 kW single phase) may be connected under G98, with notification to the DNO. Above this threshold, G99 applies.',
    },
    {
      standard: 'ENA EREC G99',
      citation: 'ENA EREC G99 — generation above the G98 threshold',
      clauseText:
        'Generation above the G98 threshold must be the subject of an application to, and agreement from, the DNO before the installation is energised and connected to the network.',
    },
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 712 — Solar PV power supply systems',
      clauseText:
        'PV installations must meet the additional requirements of Section 712, including DC-side isolation, protection and labelling, recognising that the DC side cannot be switched off and remains live in daylight.',
      tableRefs: ['Section 712'],
    },
    {
      standard: 'MCS',
      citation: 'MCS MIS 3002 — Solar PV installation standard',
      clauseText:
        'MCS-certified installation to MIS 3002 is required for SEG eligibility and consumer protection, covering system design, shading assessment and commissioning.',
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'G98/G99 16 A/3.68 kW thresholds match the calculator engine and are well established. BS 7671 Section 712 and MCS MIS 3002 authored from standard requirements — confirm against source documents. VAT 0% domestic GB per HMRC relief to 31 Mar 2027.',
  },
};
