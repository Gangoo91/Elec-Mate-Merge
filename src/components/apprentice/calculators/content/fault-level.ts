import type { CalculatorContent } from './types';

/**
 * Fault level — BS 7671 Reg 434.5.2 (breaking capacity).
 */
export const faultLevelContent: CalculatorContent = {
  slug: 'fault-level',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Fault level is the prospective current on a dead short; every protective device must be able to break that current safely — its breaking capacity must equal or exceed the fault level at its location.',
    'It is highest at the origin (close to the source/transformer) and falls with distance as cable impedance adds up.',
    'Fed from a transformer, the fault level depends on the transformer rating and its percentage impedance.',
    'A device with too low a breaking capacity can fail explosively during a fault — this is a fundamental safety check.',
  ],

  whenToCheck: [
    'Selecting devices at the origin and at sub-distribution boards',
    'When a transformer or DNO supply fault level is declared',
    'Confirming the breaking capacity (Icn / Ics) of MCBs and MCCBs',
    'After supply changes that raise the available fault current',
  ],

  commonMistakes: [
    'Choosing a device whose breaking capacity is below the fault level',
    'Assuming the same fault level throughout (it falls with distance)',
    'Ignoring motor contribution to fault current on larger systems',
    'Mixing up percentage impedance and per-unit values',
  ],

  workedExample: {
    scenario: '500 kVA transformer, 4% impedance, 400 V secondary.',
    inputs: [
      { label: 'Transformer', value: '500 kVA' },
      { label: 'Impedance', value: '4%' },
      { label: 'Secondary voltage', value: '400 V' },
    ],
    steps: [
      'Full-load current = 500 000 ÷ (√3 × 400) ≈ 722 A',
      'Fault level ≈ FLC ÷ (Z% / 100) = 722 ÷ 0.04',
      'Fault level ≈ 18 kA at the transformer terminals',
    ],
    result: '≈ 18 kA at the LV terminals — devices there need breaking capacity ≥ 18 kA.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.2 — Breaking capacity',
      clauseText:
        'The breaking capacity of each protective device shall be not less than the prospective fault current at the point where it is installed, so it can interrupt the fault current without damage.',
      sourceFacetIds: ['ae0f3b79-c8a8-4183-85c0-d35e30baf822'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Reg 434.5.2 verified in facets; transformer fault-level formula (FLC ÷ Z%) matches the engine.',
  },
};
