import type { CalculatorContent } from './types';

/**
 * Adiabatic equation — grounded against BS 7671:2018+A4:2026.
 * Reg 543.1.3 (adiabatic formula, disconnection ≤ 5 s) verified against facets.
 * k-values are from Table 43.1 (material/insulation dependent).
 */
export const adiabaticContent: CalculatorContent = {
  slug: 'adiabatic',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'The adiabatic equation checks a conductor can carry the fault current for the time the protective device takes to operate, without its insulation reaching a damaging temperature.',
    'It sets the minimum cross-sectional area S = √(I²t) ÷ k — if the actual CPC or line conductor is smaller than S, it can be thermally damaged during a fault before disconnection.',
    'It only applies for disconnection times up to 5 s; for longer times the simple adiabatic check is not valid.',
  ],

  whenToCheck: [
    'Verifying a circuit protective conductor (CPC) smaller than the line conductor',
    'After establishing the fault current (I) and the device disconnection time (t)',
    'When using let-through energy (I²t) from a manufacturer’s device data instead of a calculated time',
    'On final circuits where the CPC is sized by calculation rather than by Table 54.7',
  ],

  commonMistakes: [
    'Using the wrong k-value for the conductor material and insulation type (see Table 43.1)',
    'Applying the adiabatic equation where disconnection exceeds 5 s — it is not valid there',
    'Using the prospective fault current at the origin rather than the value at the point of the fault',
    'Confusing I²t let-through energy (from the device) with (I²·t) calculated from a fixed time',
  ],

  workedExample: {
    scenario: 'CPC on a circuit with 2 kA fault current, device clears in 0.1 s, 70 °C thermoplastic copper (k = 115).',
    inputs: [
      { label: 'Fault current (I)', value: '2000 A' },
      { label: 'Disconnection time (t)', value: '0.1 s' },
      { label: 'k (Cu, 70 °C)', value: '115' },
    ],
    steps: [
      'S = √(I² × t) ÷ k',
      'S = √(2000² × 0.1) ÷ 115',
      'S = √400000 ÷ 115 = 632.5 ÷ 115',
      'S = 5.5 mm²',
    ],
    result: 'Minimum CPC ≈ 5.5 mm² → select the next standard size up (6 mm²).',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 543.1.3',
      clauseText:
        'Where the protective conductor cross-sectional area is calculated, it shall be not less than the value determined by the adiabatic equation S = √(I²t) ÷ k (or obtained by reference to BS 7454). The equation applies for disconnection times not exceeding 5 s.',
      tableRefs: ['Table 43.1', 'Table 54.7'],
      sourceFacetIds: ['0f5cbf3f-e631-449b-b81c-95253d00d287'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 434.5.2',
      clauseText:
        'A protective device shall have an operating characteristic such that it protects the wiring on the load side against the effects of fault current, so that the conductor temperature limit is not exceeded.',
      sourceFacetIds: ['ae0f3b79-c8a8-4183-85c0-d35e30baf822', 'e72dac3b-a097-4065-a1f8-01cee06e7334'],
    },
  ],

  quickReference: {
    title: 'Typical k-values (Table 43.1)',
    columns: ['Conductor / insulation', 'k'],
    rows: [
      ['Copper, 70 °C thermoplastic (PVC)', '115'],
      ['Copper, 90 °C thermosetting (XLPE)', '143'],
      ['Aluminium, 70 °C thermoplastic', '76'],
      ['Steel', '~50'],
    ],
    footnote: 'k depends on conductor material and insulation — always read the exact value from BS 7671 Table 43.1.',
  },

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 543.1.3 (adiabatic, ≤5 s) and 434.5.2 verified against A4:2026 facets. k-values from Table 43.1 (table not individually faceted); match the calculator engine.',
  },
};
