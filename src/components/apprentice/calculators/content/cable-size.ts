import type { CalculatorContent } from './types';

/**
 * Cable sizing — grounded against BS 7671:2018+A4:2026 (Reg 433.1 coordination, Appendix 4).
 */
export const cableSizeContent: CalculatorContent = {
  slug: 'cable-size',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Cable sizing is a coordination problem: the design current (Ib), the device rating (In) and the cable’s current-carrying capacity (Iz) must satisfy Ib ≤ In ≤ Iz.',
    'The tabulated rating from Appendix 4 must be derated for the real installation — ambient temperature, grouping and thermal insulation all reduce how much current a cable can safely carry.',
    'Voltage drop and the adiabatic (fault) check can both force a larger size than current-carrying capacity alone.',
    'Under-sizing risks overheating and fire; over-sizing wastes copper and money.',
  ],

  whenToCheck: [
    'For every circuit at design stage — establish Ib, pick In, then size the cable',
    'When the installation method, grouping or ambient temperature is non-standard',
    'On long runs where voltage drop dominates',
    'Where a reduced CPC needs the adiabatic check',
  ],

  commonMistakes: [
    'Sizing on tabulated capacity without applying the derating factors',
    'Letting In sit below Ib, or Iz below In (the coordination fails)',
    'Forgetting voltage drop on long circuits',
    'Ignoring grouped cables in a shared containment',
  ],

  workedExample: {
    scenario: '6 kW shower, 230 V, 32 A Type B MCB, 6 mm² T&E clipped direct (Iz ≈ 46 A derated).',
    inputs: [
      { label: 'Design current Ib', value: '26.1 A' },
      { label: 'Device In', value: '32 A' },
      { label: 'Cable Iz (derated)', value: '~46 A' },
    ],
    steps: [
      'Ib = P ÷ V = 6000 ÷ 230 = 26.1 A',
      'Choose In ≥ Ib: a 32 A device',
      'Cable Iz must be ≥ In: 46 ≥ 32 ✓',
    ],
    result: '26.1 ≤ 32 ≤ 46 — Ib ≤ In ≤ Iz satisfied; the 6 mm² cable is adequate.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 433.1.1',
      clauseText:
        'The operating characteristics of a device protecting a conductor against overload shall satisfy Ib ≤ In ≤ Iz, and I2 ≤ 1.45 × Iz, where Ib is the design current, In the device rating, Iz the conductor current-carrying capacity, and I2 the operating current of the device.',
      tableRefs: ['Appendix 4'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Reg 433.1 coordination (Ib ≤ In ≤ Iz, I2 ≤ 1.45 Iz) is foundational and matches the engine; tabulated ratings and derating from Appendix 4. Confirm exact 433.1.1 wording against A4:2026 facets.',
  },
};
