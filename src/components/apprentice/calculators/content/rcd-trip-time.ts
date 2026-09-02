import type { CalculatorContent } from './types';

/**
 * RCD trip time — grounded against BS 7671:2018+A4:2026.
 * Reg 411.3.3 / 411.3.4 (RCD additional protection, ≤ 30 mA) verified against facets.
 * Trip-time limits at test multiples come from the RCD product standards (BS EN 61008/61009).
 */
export const rcdTripTimeContent: CalculatorContent = {
  slug: 'rcd-trip-time',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'An RCD providing additional protection must disconnect fast enough to limit the duration of a shock current.',
    'For a 30 mA RCD, the single AC test at 1× IΔn confirms it trips within 300 ms. BS 7671:2018+A4:2026 deleted Appendix 3 Table 3A and the 5× IΔn test — one test at rated residual current now verifies the device, whatever its Type.',
    'Additional protection by a 30 mA RCD is mandatory for many socket-outlet and luminaire circuits in domestic premises.',
  ],

  whenToCheck: [
    'Commissioning and periodic testing of any RCD or RCBO',
    'Verifying additional protection on socket-outlets up to 32 A (Reg 411.3.3) and luminaire circuits in dwellings (Reg 411.3.4)',
    'When confirming a Type A or Type F device responds correctly to the test currents',
    'After any alteration that adds socket-outlets or lighting to a circuit',
  ],

  commonMistakes: [
    'Not proving the test instrument before and after the test',
    'Still recording a 5× IΔn / 40 ms result — that test was deleted at A4:2026 and an assessor will query it',
    'Testing at only one phase angle — test at 0° and 180° and record the slower time',
    'Quoting AC-only trip behaviour where a Type A (or higher) device is required for the load',
    'Confusing the 300 ms general limit with the 130–500 ms window for ‘S’ (time-delayed) types',
  ],

  workedExample: {
    scenario: '30 mA non-delayed RCD, instantaneous type, tested at standard multiples.',
    inputs: [
      { label: 'Rated residual current (IΔn)', value: '30 mA' },
      { label: 'Test at 1× IΔn', value: '30 mA' },
      { label: 'Test at 5× IΔn', value: '150 mA' },
    ],
    steps: [
      'Prove the instrument and warn anyone the trip will affect',
      'At 1× IΔn (30 mA), AC test, 0° then 180°: shall trip within 300 ms',
      'Press the integral test button as a functional check',
    ],
    result:
      'A pass is ≤300 ms at 1× IΔn on both half-cycles (S-type: 130–500 ms). No 5× test is recorded under A4:2026.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.3.3',
      clauseText:
        'Additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for socket-outlets with a rated current not exceeding 32 A, unless an exception in the Regulation applies.',
      sourceFacetIds: ['5ac5e6a3-e168-4715-9847-7a7fbb8f3e57'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.3.4',
      clauseText:
        'Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires.',
      sourceFacetIds: [
        'a2131a09-3b30-4981-8133-ac07d4dd6114',
        '4cbd1301-62fc-417f-86a6-1fffefc7e6d1',
      ],
    },
  ],

  quickReference: {
    title: 'Maximum trip times — 30 mA RCD (A4:2026)',
    columns: ['Test current', 'General (non-delayed)', '‘S’ (time-delayed)'],
    rows: [
      ['1× IΔn (30 mA), AC test', '≤ 300 ms', '130–500 ms'],
      ['5× IΔn (150 mA)', 'Deleted at A4:2026', 'Deleted at A4:2026'],
    ],
    footnote: 'Trip-time limits are set by the RCD product standards (BS EN 61008-1 / 61009-1).',
  },

  _grounding: {
    status: 'verified',
    generatedAt: '2026-09-02',
    notes:
      'Reg 411.3.3 and 411.3.4 verified against A4:2026 facets. Trip-time limits from the device product standards (BS EN 61008/61009). A4:2026 deletion of Appendix 3 Table 3A and the 5×IΔn test verified against the A4 facets (single AC test at IΔn regardless of Type) — explainer rewritten 2026-09-02 to match.',
  },
};
