import type { CalculatorContent } from './types';

/**
 * Maximum demand — BS 7671 Reg 311.1 + IET On-Site Guide diversity.
 */
export const maximumDemandContent: CalculatorContent = {
  slug: 'maximum-demand',
  governingStandards: ['BS 7671', 'IET On-Site Guide'],

  whyItMatters: [
    'Maximum demand is the realistic peak load after diversity — it sizes the supply, tails and any DNO connection.',
    'BS 7671 Reg 311.1 requires the maximum demand to be determined; diversity may be taken into account in determining it.',
    'Reg 536.4.202 (A4:2026): diversity shall not be used as a means of load curtailment, load control or overload protection — the rated current of a consumer unit or distribution board is a separate check.',
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
    steps: ['I = (MD × 1000) ÷ V', 'I = 18 000 ÷ 230', 'I ≈ 78 A'],
    result: '≈ 78 A — within a typical 80–100 A single-phase supply, but close; check headroom.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 311.1 — Maximum demand and diversity',
      clauseText:
        'For economic and reliable design of an installation within thermal limits and admissible voltage drop, the maximum demand shall be determined. In determining the maximum demand of an installation or part thereof, diversity may be taken into account. The IET On-Site Guide, Appendix A, Table A2 provides the diversity allowances; BS 7671 itself publishes none.',
      tableRefs: ['On-Site Guide Appendix A, Table A2', 'Reg 536.4.202'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-08-06',
    notes:
      'Reg 311.1 quoted verbatim from the printed BS 7671:2018+A4:2026 text — "shall be determined" applies to maximum demand, "may be taken into account" to diversity. Reg 536.4.202 verified verbatim. Supply-limit figures are typical UK values, derived from 100 A at the selected voltage, not from BS 7671 (supply capacity is a DNO/ESQCR matter).',
  },
};
