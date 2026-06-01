import type { CalculatorContent } from './types';

/**
 * Maximum demand — BS 7671 Reg 311.1 + IET On-Site Guide diversity.
 */
export const maximumDemandContent: CalculatorContent = {
  slug: 'maximum-demand',
  governingStandards: ['BS 7671', 'IET On-Site Guide'],

  whyItMatters: [
    'Maximum demand is the realistic peak load after diversity — it sizes the supply, main switch, tails and any DNO connection.',
    'BS 7671 requires maximum demand (taking diversity into account) to be assessed for every installation.',
    'A single-phase domestic supply is typically limited around 80–100 A; exceeding it means a three-phase or upgraded supply.',
    'Getting it wrong either overloads the intake or pays for an unnecessary upgrade.',
  ],

  whenToCheck: [
    'At design stage for a new installation or a major addition',
    'Before adding a heavy load (EV charger, heat pump, shower)',
    'When deciding single- vs three-phase supply',
    'When a DNO connection or upgrade may be needed',
  ],

  commonMistakes: [
    'Summing connected load with no diversity (overstates demand)',
    'Forgetting non-diversified loads like EV chargers and heat pumps',
    'Ignoring the practical single-phase supply limit',
    'Mixing up kW and kVA when converting to current',
  ],

  workedExample: {
    scenario: 'Diversified demand 18 kW, single-phase 230 V.',
    inputs: [
      { label: 'Maximum demand', value: '18 kW' },
      { label: 'Supply', value: '230 V, 1-phase' },
    ],
    steps: [
      'I = (MD × 1000) ÷ V',
      'I = 18 000 ÷ 230',
      'I ≈ 78 A',
    ],
    result: '≈ 78 A — within a typical 80–100 A single-phase supply, but close; check headroom.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 — Maximum demand and diversity',
      clauseText:
        'The maximum demand of an installation, taking diversity into account, shall be assessed. The IET On-Site Guide provides diversity allowances to support this assessment.',
      tableRefs: ['On-Site Guide Appendix A'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Reg 311.1 (assess maximum demand with diversity) is foundational; current conversion matches the engine. Supply-limit figures are typical UK values.',
  },
};
