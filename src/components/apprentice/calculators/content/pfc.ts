import type { CalculatorContent } from './types';

/**
 * Prospective fault current (PFC) — grounded against BS 7671:2018+A4:2026.
 * Reg 434.5.2 (fault-current protection) verified against facets; PFC is the
 * greater of prospective short-circuit current and prospective earth fault current.
 */
export const pfcContent: CalculatorContent = {
  slug: 'pfc',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Prospective fault current (PFC) is the highest current that would flow on a dead short at a point in the installation — it sets the breaking capacity every protective device must meet.',
    'PFC is taken as the greater of the prospective short-circuit current (line–neutral) and the prospective earth fault current (line–earth); this tool estimates it from the loop impedance as I = U₀ ÷ Zs.',
    'A device with a breaking capacity below the PFC at its location can fail catastrophically during a fault, so this value must be established and recorded.',
    'PFC is highest at the origin and falls with distance as cable impedance is added.',
  ],

  whenToCheck: [
    'At the origin of the installation, to confirm the main device’s breaking capacity (Icn / Ics)',
    'When measuring PFC during initial verification (it is a recorded test result)',
    'Before selecting devices for a new board or sub-distribution',
    'When the DNO declares a maximum prospective fault current at the supply',
  ],

  commonMistakes: [
    'Recording only the line–neutral value and ignoring the line–earth value (PFC is the greater of the two)',
    'Selecting a device whose breaking capacity is below the PFC at its position',
    'Assuming PFC is the same throughout the installation — it falls with distance from the source',
    'Confusing the measured PFC with the design fault current used in the adiabatic check',
  ],

  workedExample: {
    scenario: 'Estimating PFC from the earth fault loop: Ze 0.35 Ω plus a short circuit tail (R1+R2 0.05 Ω), 230 V.',
    inputs: [
      { label: 'External loop (Ze)', value: '0.35 Ω' },
      { label: 'Circuit (R1+R2)', value: '0.05 Ω' },
      { label: 'Nominal voltage (U₀)', value: '230 V' },
    ],
    steps: [
      'Zs = Ze + (R1 + R2) = 0.35 + 0.05 = 0.40 Ω',
      'PFC = U₀ ÷ Zs = 230 ÷ 0.40',
      'PFC = 575 A ≈ 0.58 kA',
    ],
    result: '≈ 0.58 kA here; the device breaking capacity must exceed the highest PFC (greatest at the origin).',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.2',
      clauseText:
        'The breaking capacity of each protective device shall be not less than the prospective fault current at the point where the device is installed, so that it can interrupt the fault current without damage.',
      tableRefs: ['Regulation 643.7.3.201'],
      sourceFacetIds: ['ae0f3b79-c8a8-4183-85c0-d35e30baf822', 'e72dac3b-a097-4065-a1f8-01cee06e7334'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 434.5.2 verified against A4:2026 facets. PFC determination/measurement also relates to Reg 643.7.3.201 (measurement during verification).',
  },
};
