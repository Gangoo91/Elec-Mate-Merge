import type { CalculatorContent } from './types';

/**
 * Voltage Drop — grounded against BS 7671:2018+A4:2026.
 * Reg 525.202 and Reg 715.525 clause text verified against the standards corpus.
 * The 3%/5% figures are the limits referenced by Appendix 4, Section 6.4.
 */
export const voltageDropContent: CalculatorContent = {
  slug: 'voltage-drop',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Too much voltage drop starves equipment — motors struggle to start, lamps dim and electronics misbehave at the far end of a long run.',
    'BS 7671 caps the drop from the origin of the installation to the load: 3% for lighting and 5% for other circuits, measured from the supply terminals to the point of use.',
    'Voltage lost in a cable is dissipated as heat, so an undersized cable both wastes energy and runs warmer than it should.',
    'Persistent undervoltage can cause nuisance tripping and shortens the life of motors and ballasts.',
  ],

  whenToCheck: [
    'Long cable runs — anything beyond ~20 m is worth checking',
    'Higher-current final circuits (32 A and above)',
    'Sensitive loads such as IT equipment and dimmable lighting',
    'Motor circuits, where starting current can be 6–8× the running current',
    'Supplies to outbuildings, sheds and detached garages',
  ],

  commonMistakes: [
    'Forgetting that voltage drop is cumulative — measured from the origin to the furthest point, not just one leg',
    'Treating the 3% / 5% figure as the budget for one cable run. It is the whole path from the origin, so any submain drop has to come out of the same allowance',
    'Passing a cable on voltage drop and stopping there — Reg 433.1.1 still requires Ib ≤ In ≤ Iz, with Iz derated for ambient temperature, grouping and thermal insulation',
    'Using the two-core mV/A/m for a three-phase circuit. Appendix 4 tabulates a separate three/four-core column, and those values relate to the line voltage',
    'Ignoring motor starting current, which can dwarf the running current',
    'Overlooking the drop already present between the supply intake and the consumer unit',
  ],

  workedExample: {
    scenario: '20 A power radial in 2.5 mm² twin & earth, 25 m run, 230 V single phase.',
    inputs: [
      { label: 'mV/A/m (2.5 mm² T&E)', value: '18 mV/A/m' },
      { label: 'Design current (Ib)', value: '20 A' },
      { label: 'Route length (L)', value: '25 m' },
      { label: 'Limit (power circuit)', value: '5% (11.5 V)' },
    ],
    steps: [
      'Vd = (mV/A/m × Ib × L) ÷ 1000',
      'Vd = (18 × 20 × 25) ÷ 1000',
      'Vd = 9000 ÷ 1000 = 9.0 V',
      '% = (9.0 ÷ 230) × 100 = 3.9%',
    ],
    result: 'Vd = 9.0 V (3.9%) — within the 5% limit for a power circuit.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 525.202',
      clauseText:
        'The voltage drop between the origin of the installation (usually the supply terminals) and a socket-outlet or the terminals of fixed current-using equipment shall not exceed the values stated in Appendix 4, Section 6.4. The requirement is deemed satisfied when those values are met.',
      tableRefs: ['Appendix 4, Section 6.4'],
      sourceFacetIds: [
        '5008a32d-51a1-4a34-a1e7-c9acd78d99d7',
        '9ef99355-c225-44c9-bc70-65c07ead3a88',
        'fe711d8c-ffe9-4c3c-9a94-231e218d827d',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Appendix 4, Section 6.4 — Table 4Ab',
      clauseText:
        'The voltage drop between the origin of an installation and any load point should not be greater than the values in Table 4Ab, expressed with respect to the nominal voltage: (a) low voltage installations supplied directly from a public low voltage distribution system — lighting 3%, other uses 5%; (b) low voltage installations supplied from a private LV supply — lighting 6%, other uses 8%, the drop within each final circuit not exceeding the values in (a). Where the wiring systems of the installation are longer than 100 m the voltage drops may be increased by 0.005% per metre beyond 100 m, without that increase being greater than 0.5%.',
      tableRefs: ['Appendix 4, Table 4Ab'],
      sourceFacetIds: [
        '8fad5bc1-f72a-43fc-addf-3701dce5626d',
        '1b233bef-2105-4705-8718-a9192e247f17',
        '347fab0f-d452-4614-be5c-d23926d1907d',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 433.1.1 — coordination with current-carrying capacity',
      clauseText:
        'The rated current or current setting of the protective device (In) shall not be less than the design current of the circuit (Ib) and shall not exceed the lowest of the current-carrying capacities (Iz) of any of the conductors of the circuit. Meeting the Appendix 4 voltage-drop limit does not on its own establish that a conductor is suitable.',
      sourceFacetIds: [
        'd04e1708-23fb-446c-92c0-144c0d9b529e',
        '26a6dc39-9bbc-4a8a-87e3-e4459bf6cd05',
      ],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 715.525 — ELV lighting',
      clauseText:
        'In an ELV lighting installation, the voltage drop between the transformer and the furthest luminaire shall not exceed 5% of the nominal voltage of the ELV installation to be deemed to comply with Section 525.',
      sourceFacetIds: ['603ead7d-39a8-42d1-982c-9e33d716f0e0'],
    },
  ],

  quickReference: {
    title: 'Permitted voltage drop, origin to load point (Table 4Ab)',
    columns: ['Supply', 'Lighting', 'Other uses'],
    rows: [
      ['(a) Public LV distribution system', '3%', '5%'],
      ['(b) Private LV supply', '6%', '8%'],
    ],
    footnote:
      'BS 7671 Appendix 4, Table 4Ab (referenced by Reg 525.202). Row (b) footnote (*): the drop within each final circuit shall not exceed the row (a) values. Where the installation wiring is longer than 100 m the tabulated drops may be increased by 0.005% per metre beyond 100 m, capped at +0.5%. At 230 V, 3% = 6.9 V and 5% = 11.5 V.',
  },

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Reg 525.202 and 715.525 clause text verified against BS 7671:2018+A4:2026 facets. Table 4Ab rows (a) and (b), footnote (*) and the >100 m relaxation verified against the printed A4:2026 Appendix 4 §6.4 extract and facets 8fad5bc1 / 1b233bef / 347fab0f. Iz coordination (Reg 433.1.1) noted because the calculator evaluates voltage drop only.',
  },
};
