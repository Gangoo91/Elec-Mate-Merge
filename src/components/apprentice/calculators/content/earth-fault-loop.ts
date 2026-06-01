import type { CalculatorContent } from './types';

/**
 * Earth fault loop impedance (Zs) — grounded against BS 7671:2018+A4:2026.
 * Reg 411.3.1.2 + Table 41.1 (disconnection times) verified against facets.
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
    'When establishing the maximum disconnection time (0.4 s or 5 s) per Reg 411.3.1.2',
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
      citation: 'Regulation 411.3.1.2',
      clauseText:
        'The maximum disconnection times in Table 41.1 shall apply to final circuits rated up to 63 A with one or more socket-outlets, and to final circuits rated up to 32 A supplying only fixed connected current-using equipment. The loop impedance Zs shall be low enough to disconnect within that time.',
      tableRefs: ['Table 41.1', 'Table 41.2', 'Table 41.3'],
      sourceFacetIds: ['9f714882-23a7-4f4a-8b27-08d21783177c', 'c60b151a-198d-4d1e-ba04-b5750c64a253'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 411.3.1.2 + Table 41.1 verified against A4:2026 facets. Zs = Ze + (R1+R2) and max-Zs figures (Tables 41.2–41.4) match the calculator engine.',
  },
};
