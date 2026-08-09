import type { CalculatorContent } from './types';

/**
 * BS 7671 Zs lookup — Tables 41.2–41.4.
 */
export const bs7671ZsLookupContent: CalculatorContent = {
  slug: 'bs7671-zs-lookup',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'The maximum earth fault loop impedance for a device is tabulated in BS 7671 (Tables 41.2–41.4) — look it up rather than re-derive it every time.',
    'The figure depends on the device type and rating and the required disconnection time (0.4 s or 5 s).',
    'Tabulated maxima assume the conductor at its operating temperature, so a cold measured value should be compared after applying the rule-of-thumb correction (×0.8).',
    'If measured Zs exceeds the tabulated maximum, the device will not disconnect in time and the circuit fails ADS.',
  ],

  whenToCheck: [
    'Verifying a measured Zs against the correct device maximum',
    'At design stage, to confirm a chosen device suits the expected loop impedance',
    'When selecting between Type B, C and D for the available Zs',
    'During periodic inspection and EICR coding',
  ],

  commonMistakes: [
    'Reading the wrong device-type column (B/C/D differ greatly)',
    'Comparing a cold measured Zs to the full tabulated value without the 0.8 correction',
    'Mixing the 0.4 s and 5 s tables',
    'Using a fuse table for an MCB (or vice versa)',
  ],

  workedExample: {
    scenario: '40 A Type B MCB, TN, 0.4 s.',
    inputs: [
      { label: 'Device', value: '40 A Type B' },
      { label: 'Trip multiple', value: '5 × In = 200 A' },
      { label: 'Tabulated max Zs', value: '1.09 Ω' },
    ],
    steps: [
      'Max Zs = U0 × Cmin ÷ Ia = 230 × 0.95 ÷ 200',
      'Max Zs = 218.5 ÷ 200 = 1.09 Ω (design)',
      'Apply ×0.8 for a cold measured comparison → 0.87 Ω',
    ],
    result: 'Measured Zs must be ≤ ~0.87 Ω (cold) against the 1.09 Ω design maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.4.202 — circuit-breakers (Table 41.3)',
      clauseText:
        'Where a circuit-breaker is used to satisfy Regulation 411.3.2.2 or 411.3.2.3, the maximum value of earth fault loop impedance (Zs) shall be determined by the formula in Regulation 411.4.4. Alternatively, for a nominal voltage (U0) of 230 V and a disconnection time of 0.4 s (411.3.2.2) or 5 s (411.3.2.3), the values specified in Table 41.3 for the types and ratings of overcurrent devices listed may be used instead. Table 41.3 is the ONLY one of the Zs tables that serves both disconnection times.',
      tableRefs: ['Table 41.3', 'Reg 411.4.4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.4.203 — fuses at 5 s (Table 41.4), and Table 41.2 at 0.4 s',
      clauseText:
        'Where a fuse is used for a distribution circuit or a final circuit in accordance with Regulation 411.3.2.3, maximum values of earth fault loop impedance (Zs) corresponding to a disconnection time of 5 s are stated in Table 41.4 for a nominal voltage (U0) of 230 V. Table 41.2 carries the corresponding 0.4 s fuse values. For types and rated currents of gG and gM fuses other than those mentioned, reference shall be made to the appropriate British or Harmonized Standard to determine Ia for compliance with Regulation 411.4.4.',
      tableRefs: ['Table 41.2', 'Table 41.4'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.5.3 — RCD-protected and TT circuits (Table 41.5)',
      clauseText:
        'A fourth table exists that a device-only lookup misses: where an RCD provides fault protection, the requirement is met if the earth fault loop impedance meets Table 41.5 — the 230 V TT values. Reg 411.5.3 also imposes RA × IΔn ≤ 50 V. Do not read a TT circuit against Tables 41.2–41.4.',
      tableRefs: ['Table 41.5'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Table roles verified individually against the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf): 41.2 = fuses @ 0.4 s, 41.3 = circuit-breakers @ BOTH 0.4 s and 5 s (Reg 411.4.202), 41.4 = fuses @ 5 s (Reg 411.4.203), 41.5 = RCD / 230 V TT (Reg 411.5.3). \u26a0\ufe0f The citation previously read \u201cTables 41.2\u201341.4\u201d, which OMITS Table 41.5 \u2014 the table a TT or RCD-protected circuit is actually judged against. The calculator engine itself does route RCDs to Table 41.5 correctly; it was the editorial that was short. Max-Zs relationship (U0\u00b7Cmin/Ia) and the 0.8 rule-of-thumb match the engine and src/data/zsLimits.ts.',
  },
};
