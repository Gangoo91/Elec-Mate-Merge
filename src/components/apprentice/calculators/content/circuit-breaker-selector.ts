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
    scenario: '20 A resistive circuit, TN, measured Zs 0.6 Ω.',
    inputs: [
      { label: 'Design current Ib', value: '20 A' },
      { label: 'Device', value: '20 A Type B' },
      { label: 'Max Zs (Type B 20 A)', value: '1.75 Ω' },
    ],
    steps: [
      'Overload: Ib ≤ In ≤ Iz → 20 ≤ 20 ≤ derated cable Iz',
      'Earth fault: measured Zs 0.6 Ω ≤ 1.75 Ω (×0.8 corrected 1.40 Ω) ✓',
      'Confirm breaking capacity ≥ fault level',
    ],
    result: '20 A Type B suits a resistive load with Zs well within the maximum.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 433.1 / 411.4 / 434.5.2',
      clauseText:
        'Device selection must satisfy overload coordination (433.1, Ib ≤ In ≤ Iz), earth-fault disconnection within the required time (411.4, Zs ≤ maximum for the device), and breaking capacity not less than the prospective fault current (434.5.2).',
      tableRefs: ['Tables 41.2–41.4', 'Appendix 3'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Device-type trip multiples (B 5×, C 10×, D 20×) and the three selection checks match the engine and BS 7671. Confirm sub-clauses against A4:2026 facets.',
  },
};
