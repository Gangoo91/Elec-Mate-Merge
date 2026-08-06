import type { CalculatorContent } from './types';

/**
 * Circuit-breaker selector — BS 7671 Reg 433.1 / 411 / 434.
 */
export const circuitBreakerSelectorContent: CalculatorContent = {
  slug: 'circuit-breaker-selector',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Choosing a protective device means satisfying several requirements at once: overload (Ib ≤ In ≤ Iz), earth-fault disconnection (Zs ≤ max for the device), and adequate breaking capacity for the fault level.',
    'The device type (B, C, D) sets the magnetic trip multiple — Type B (5×) suits resistive loads, C (10×) handles moderate inrush, D (20×) is for high-inrush plant.',
    'The wrong type either nuisance-trips on inrush or fails to disconnect fast enough on a low-current earth fault.',
    'Getting the selection right is the heart of safe, reliable circuit protection.',
  ],

  whenToCheck: [
    'Selecting a device for a new circuit',
    'Matching device type to the load’s inrush characteristics',
    'Confirming the measured/expected Zs is within the device maximum',
    'Checking breaking capacity against the fault level',
  ],

  commonMistakes: [
    'Using Type B where inrush needs Type C/D (nuisance tripping)',
    'Ignoring the maximum Zs for the chosen device and rating',
    'Overlooking breaking capacity at the device’s location',
    'Letting the device rating fall outside Ib ≤ In ≤ Iz',
  ],

  workedExample: {
    // WAS WRONG: this listed "Max Zs (Type B 20 A) 1.75 Ω" and then corrected it
    // again by 0.8 to 1.40 Ω. Table 41.3(a) gives 2.19 Ω for a 20 A Type B; 1.75 Ω
    // IS the 0.8 × Zs ambient-temperature value of Appendix 3, so the factor was
    // being applied twice.
    scenario: '20 A resistive circuit, TN, cable Iz 24 A, measured Zs 0.6 Ω.',
    inputs: [
      { label: 'Design current Ib', value: '20 A' },
      { label: 'Cable capacity Iz', value: '24 A' },
      { label: 'Device', value: '20 A Type B' },
      { label: 'Max Zs (Table 41.3(a), Type B 20 A)', value: '2.19 Ω' },
    ],
    steps: [
      'Overload: Ib ≤ In ≤ Iz → 20 ≤ 20 ≤ 24 ✓ (Reg 433.1.1(a) and (b))',
      'Reg 433.1.201: for a BS EN 60898 circuit-breaker, meeting (a) and (b) also meets (c)',
      'Earth fault: measured Zs 0.6 Ω ≤ 0.8 × 2.19 = 1.75 Ω, the Appendix 3 ambient-temperature value ✓',
      'Confirm the breaking capacity is not less than the prospective fault current (Reg 434.1 / 432.1)',
    ],
    result: '20 A Type B suits a resistive load with Zs well within the maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      // WAS WRONG: breaking capacity was cited to Reg 434.5.2, which is the
      // let-through energy (adiabatic) requirement. The breaking-capacity duty is
      // Reg 432.1, with Reg 434.1 requiring the prospective fault current to be
      // determined and Reg 434.5.1 permitting back-up protection.
      citation: 'Regulation 433.1.1 / 411.4.4 / 434.1 / 432.1',
      clauseText:
        'Device selection must satisfy all three overload conditions of Reg 433.1.1 (In ≥ Ib, In ≤ Iz, I2 ≤ 1.45 Iz), earth-fault disconnection within the required time (Reg 411.4.4, Zs × Ia ≤ U0 × Cmin), and a breaking capacity not less than the prospective fault current determined under Reg 434.1 (Reg 432.1, except where back-up protection to Reg 434.5.1 is provided).',
      tableRefs: ['Table 41.2', 'Table 41.3', 'Table 41.4', 'Table 41.5', 'Appendix 3'],
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'Checked against BS 7671:2018+A4:2026. Reg 433.1.1(a)(b)(c) and Reg 433.1.201 confirmed; Table 41.3(a) 20 A Type B = 2.19 Ω confirmed from the printed table; Appendix 3 gives Zs(m) ≤ 0.8 × U0 × Cmin / Ia for an ambient-temperature measurement; breaking-capacity citation corrected from 434.5.2 to 432.1 / 434.1.',
  },
};
