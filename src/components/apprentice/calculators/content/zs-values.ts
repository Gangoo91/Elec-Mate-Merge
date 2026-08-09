import type { CalculatorContent } from './types';

/**
 * Maximum Zs values — grounded against BS 7671:2018+A4:2026.
 *
 * 🔴 WAS WRONG: this file cited "Regulation 411.3.1.2" as the source of the
 * maximum disconnection times. Reg 411.3.1.2 is *Protective equipotential
 * bonding* — it says nothing about disconnection times. The clause that applies
 * Table 41.1 to final circuits is Reg 411.3.2.2, verified word-for-word against
 * the printed standard (Desktop/BS7671_ocr.pdf).
 *
 * The RAG corpus files the Table 41.1 text under "Reg 411.3.1.2" — a breadcrumb
 * mis-attribution. earth-fault-loop.ts caught this and was fixed; this sibling
 * file was left carrying the same error, which is why it is corrected here too.
 *
 * Maximum Zs figures are tabulated in Tables 41.2–41.5 (41.5 = RCD / 230 V TT).
 */
export const zsValuesContent: CalculatorContent = {
  slug: 'zs-values',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Earth fault loop impedance (Zs) must be low enough that the protective device disconnects within the required time during an earth fault.',
    'If measured Zs exceeds the maximum for the device, the fault current may be too low to trip it quickly, leaving dangerous touch voltages present.',
    'The limits depend on the device type and rating, the earthing system, and the required disconnection time (0.4 s or 5 s).',
  ],

  whenToCheck: [
    'After installation, comparing measured Zs against the maximum for the protective device',
    'At design stage, to confirm the chosen device will disconnect in time',
    'When the maximum disconnection time is 0.4 s (final circuits ≤ 63 A with socket-outlets, or ≤ 32 A fixed equipment) per Reg 411.3.2.2',
    'Remember to correct tabulated maxima for conductor temperature (the 0.8 / Cmin rule of thumb)',
  ],

  commonMistakes: [
    'Comparing measured (cold) Zs against the full tabulated maximum without applying the temperature/rule-of-thumb correction',
    'Using the wrong device type column (Type B vs C vs D have very different maxima)',
    'Mixing up the 0.4 s and 5 s disconnection-time requirements',
    'Forgetting that Zs = Ze + (R1 + R2)',
  ],

  workedExample: {
    scenario:
      '32 A Type B MCB on a TN system, final circuit with socket-outlets (0.4 s disconnection).',
    inputs: [
      { label: 'Device', value: '32 A Type B' },
      { label: 'Disconnection time', value: '0.4 s' },
      { label: 'Tabulated max Zs (Table 41.3)', value: '1.37 Ω' },
    ],
    steps: [
      'Type B trips at 5 × In → Ia = 5 × 32 = 160 A',
      'Max Zs = U0 × Cmin ÷ Ia = 230 × 0.95 ÷ 160',
      'Max Zs = 218.5 ÷ 160 = 1.37 Ω',
      'Apply the rule-of-thumb correction (× 0.8) when comparing a cold measured value: 1.09 Ω',
    ],
    result: 'Measured Zs must be ≤ ~1.09 Ω (cold) to satisfy the 1.37 Ω design maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.3.2.2 — when the Table 41.1 times apply',
      clauseText:
        'Maximum disconnection times stated in Table 41.1 shall be applied to final circuits with a rated current not exceeding: (a) 63 A with one or more socket-outlets; and (b) 32 A supplying only fixed connected current-using equipment. Reg 411.3.1.2, under which the RAG corpus files this text, is Protective equipotential bonding and is a different requirement entirely.',
      tableRefs: ['Reg 411.3.2.2', 'Table 41.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Tables 41.2 to 41.5 — and which one your circuit is judged against',
      clauseText:
        'Table 41.2 gives maximum Zs for fuses at 0.4 s and Table 41.4 for fuses at 5 s (Reg 411.4.203). Table 41.3 covers circuit-breakers and serves BOTH 0.4 s and 5 s (Reg 411.4.202). Table 41.5 is separate again: it carries the 230 V TT values for circuits where an RCD provides fault protection (Reg 411.5.3). A device-only lookup that stops at 41.4 will silently mis-judge a TT circuit.',
      tableRefs: ['Table 41.2', 'Table 41.3', 'Table 41.4', 'Table 41.5'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'CITATION CORRECTED. Reg 411.3.2.2 quoted word-for-word from the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf). \u26a0\ufe0f This file previously cited Reg 411.3.1.2 for the maximum disconnection times and recorded it as \u201cverified against facets\u201d \u2014 but 411.3.1.2 is Protective equipotential bonding. The RAG mis-files the Table 41.1 text under that number; earth-fault-loop.ts had already identified and fixed the same error, and this sibling file was missed at the time. The stale sourceFacetIds were removed with it. Table 41.5 (RCD / 230 V TT) added \u2014 the citation previously stopped at 41.4. Max Zs figures match src/data/zsLimits.ts, the canonical source.',
  },
};
