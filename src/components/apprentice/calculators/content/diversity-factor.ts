import type { CalculatorContent } from './types';

/**
 * Diversity — IET On-Site Guide design aid (not a BS 7671 regulation).
 */
export const diversityFactorContent: CalculatorContent = {
  slug: 'diversity-factor',
  governingStandards: ['IET On-Site Guide'],

  whyItMatters: [
    'Not every load runs at full power at the same time, so applying diversity gives a realistic maximum demand instead of a wastefully large connected total.',
    'Diversity allowances differ by load type and premises — lighting, socket circuits, cooking and heating each have their own treatment in the IET On-Site Guide.',
    'Under-applying diversity oversizes the supply, main cable and switchgear; over-applying it risks overloading them.',
    'Diversity is guidance for sizing the supply — it does not reduce the rating any individual circuit must have.',
  ],

  whenToCheck: [
    'Estimating maximum demand for a consumer unit or distribution board',
    'Sizing the main switch, tails and supply',
    'Deciding whether the existing supply has spare capacity for a new load',
    'For mixed domestic/commercial premises with different diversity rules',
  ],

  commonMistakes: [
    'Applying diversity to a circuit’s own protective device rating (it’s for the supply, not the circuit)',
    'Using domestic diversity allowances for a commercial/industrial installation',
    'Forgetting some loads (e.g. EV chargers, heat pumps) get little or no diversity',
    'Double-counting diversity already built into a sub-board’s figure',
  ],

  workedExample: {
    scenario: 'Domestic board: lighting 1 kW, sockets 6 kW, cooker 12 kW (illustrative diversity).',
    inputs: [
      { label: 'Lighting (×0.66)', value: '0.66 kW' },
      { label: 'Sockets (100% largest + 40% of every other)', value: 'per OSG' },
      { label: 'Cooker (first 10 A + 30% rem., +5 A if socket)', value: 'per OSG' },
    ],
    steps: [
      'Apply the On-Site Guide allowance to each load category',
      'Sum the diversified figures to get the maximum demand',
      'Size the supply and main device to that demand',
    ],
    result: 'Diversified maximum demand is well below the connected total — size the supply to it.',
  },

  standards: [
    {
      standard: 'IET On-Site Guide',
      citation: 'IET On-Site Guide — Appendix A, Table A2 (allowances for diversity)',
      clauseText:
        'The IET On-Site Guide gives diversity allowances by load type and premises for estimating maximum demand (Appendix A: Table A1 typical current demands, Table A2 allowances for diversity). BS 7671 Regulation 311.1 requires the maximum demand to be determined, and permits diversity to be taken into account in doing so. Appendix A covers household and similar premises — industrial and large commercial premises are excluded and require case-by-case assessment. Regulation 536.4.202 forbids using diversity as a means of load curtailment, load control or overload protection.',
      tableRefs: ['On-Site Guide Appendix A, Table A2', 'Reg 311.1', 'Reg 536.4.202'],
    },
  ],

  _grounding: {
    status: 'needs-review',
    generatedAt: '2026-08-06',
    notes:
      'Diversity allowances come from the IET On-Site Guide, Appendix A, Table A2 (not BS 7671 — BS 7671 publishes no diversity table). Reg 311.1 verified against the printed A4:2026 text: maximum demand "shall be determined", diversity "may be taken into account". The numeric Table A2 row values are not in the RAG corpus and remain unverified against the printed On-Site Guide.',
  },
};
