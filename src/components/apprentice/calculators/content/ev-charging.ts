import type { CalculatorContent } from './types';

/**
 * EV charging — grounded against BS 7671:2018+A4:2026 Section 722.
 * 30 mA RCD + PEN-fault provisions verified against facets where possible.
 */
export const evChargingContent: CalculatorContent = {
  slug: 'ev-charging',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'An EV charge point is a continuous, high, often outdoor load — it needs its own circuit sized with the 1.25 factor and protected to BS 7671 Section 722.',
    'On a TN-C-S (PME) supply, an open PEN conductor can put dangerous voltage on the car body; Section 722 requires PEN-fault detection/disconnection or an alternative means (e.g. an earth electrode).',
    'Additional protection by a 30 mA RCD is required, and the installation must also protect against DC residual current (Type A + 6 mA DC detection, or Type B).',
    'Above the DNO notification thresholds the connection must be notified or applied for before energising.',
  ],

  whenToCheck: [
    'Sizing the supply: is there spare capacity after diversity, or is a DNO upgrade needed?',
    'Choosing the earthing arrangement and PEN-fault provision for an outdoor point on PME',
    'Selecting RCD type — Type A with 6 mA DC detection, or Type B',
    'Checking voltage drop and Zs on the (often long) final circuit to the charger',
  ],

  commonMistakes: [
    'Using a plain Type AC RCD — not permitted; DC residual current must be handled',
    'Ignoring the PME/PEN risk on an outdoor charge point',
    'Forgetting the 1.25 continuous-load factor when sizing the cable and device',
    'Overlooking DNO notification (G98/G99/G100) for the added load',
  ],

  workedExample: {
    scenario: '7.4 kW single-phase home charge point, 230 V.',
    inputs: [
      { label: 'Charger power', value: '7.4 kW' },
      { label: 'Supply', value: '230 V, 1-phase' },
      { label: 'Continuous-load factor', value: '×1.25' },
    ],
    steps: [
      'Ib = P ÷ V = 7400 ÷ 230 = 32.2 A',
      'Design for continuous load: 32.2 × 1.25 = 40.2 A',
      'Select a 40 A protective device + suitably rated cable',
      'Provide 30 mA RCD with DC fault protection (Type A + 6 mA, or Type B)',
    ],
    result: 'Ib ≈ 32 A → 40 A circuit with Type A (6 mA DC) RCD and PEN-fault provision on PME.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 722 — Electric vehicle charging installations',
      clauseText:
        'EV charging installations must meet the additional requirements of Section 722, including additional protection by a 30 mA RCD, protection against DC residual current, and measures against a PEN conductor fault where a PME (TN-C-S) earth is used for an outdoor charge point.',
      tableRefs: ['Section 722', 'Regulation 722.411.4.1'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-06-01',
    notes:
      'Section 722 requirements (30 mA RCD, DC fault protection, PEN-fault provision on PME) authored from the standard and match the calculator engine; confirm exact 722 sub-clauses against A4:2026 facets.',
  },
};
