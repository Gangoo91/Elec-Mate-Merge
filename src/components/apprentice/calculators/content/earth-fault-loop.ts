import type { CalculatorContent } from './types';

/**
 * Earth fault loop impedance (Zs) — grounded against BS 7671:2018+A4:2026.
 *
 * WAS WRONG: this file cited "Regulation 411.3.1.2" as the source of the maximum
 * disconnection times. In A4:2026, Reg 411.3.1.1 is *Protective earthing* and
 * Reg 411.3.1.2 is *Protective equipotential bonding* — neither says anything
 * about disconnection times. The operative regulation is **411.3.2.2**
 * ("Maximum disconnection times stated in Table 41.1 shall be applied to final
 * circuits with a rated current not exceeding: (a) 63 A with one or more
 * socket-outlets; and (b) 32 A supplying only fixed connected current-using
 * equipment"), with 411.3.2.3 (TN, 5 s) and 411.3.2.4 (TT, 1 s) for distribution
 * circuits and circuits not covered by 411.3.2.2.
 *
 * NOTE for future edits: the bs7671_facets RAG mis-numbers this cluster — it
 * files the Table 41.1 text under "Reg 411.3.1.2". Verified against the printed
 * A4:2026 text, which is the tiebreaker. Do not "correct" it back.
 */
export const earthFaultLoopContent: CalculatorContent = {
  slug: 'earth-fault-loop',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'The earth fault loop is the path fault current takes back to the source; its impedance (Zs) decides how fast the protective device operates.',
    'Zs = Ze + (R1 + R2): the external loop impedance plus the resistance of the line and protective conductors of the circuit.',
    'A loop impedance that is too high means the device cannot disconnect within the required time, so the design fails automatic disconnection of supply (ADS).',
  ],

  whenToCheck: [
    'When designing a circuit, to confirm Zs will be within the device maximum',
    'During testing, by measuring Ze at the origin and (R1 + R2) on the circuit',
    'For TT systems, where Ze is usually high and an RCD is normally required',
    'When establishing the maximum disconnection time: Table 41.1 via Reg 411.3.2.2, or 5 s (TN) via Reg 411.3.2.3 / 1 s (TT) via Reg 411.3.2.4 for distribution circuits',
  ],

  commonMistakes: [
    'Adding measured Ze to an uncorrected (R1 + R2) and comparing against a cold maximum',
    'Ignoring conductor temperature — operating resistance is higher than the test value',
    'Assuming a TN-C-S (PME) Ze of 0.35 Ω without enquiry or measurement',
    'Forgetting parallel paths can lower the measured loop impedance',
    'On a TT system, relying on overcurrent protection — the high external impedance needs an RCD to disconnect',
  ],

  workedExample: {
    scenario: 'TN-C-S supply, Ze = 0.35 Ω, circuit (R1 + R2) = 0.52 Ω.',
    inputs: [
      { label: 'External loop (Ze)', value: '0.35 Ω' },
      { label: 'Circuit (R1 + R2)', value: '0.52 Ω' },
      { label: 'Device max Zs', value: '1.37 Ω (32 A Type B)' },
    ],
    steps: [
      'Zs = Ze + (R1 + R2)',
      'Zs = 0.35 + 0.52',
      'Zs = 0.87 Ω',
      'Compare against the device maximum (1.37 Ω design / ~1.09 Ω corrected)',
    ],
    result: 'Zs = 0.87 Ω — within the maximum, so ADS is satisfied.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.3.2.2',
      clauseText:
        'Maximum disconnection times stated in Table 41.1 shall be applied to final circuits with a rated current not exceeding: (a) 63 A with one or more socket-outlets; and (b) 32 A supplying only fixed connected current-using equipment. For a TN system at 230 V that time is 0.4 s. A disconnection time not exceeding 5 s is permitted by Regulation 411.3.2.3 for a TN distribution circuit and for a circuit not covered by 411.3.2.2; in a TT system Regulation 411.3.2.4 permits 1 s in the same cases.',
      tableRefs: ['Table 41.1', 'Table 41.2', 'Table 41.3', 'Table 41.4'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Reg 411.3.2.2 / 411.3.2.3 / 411.3.2.4 + Table 41.1 verified word-for-word against the printed BS 7671:2018+A4:2026 text (NOT the facets, which mis-file this cluster under 411.3.1.2). Zs = Ze + (R1+R2) and the max-Zs figures (Tables 41.2–41.5) match src/data/zsLimits.ts, the canonical source.',
  },
};
