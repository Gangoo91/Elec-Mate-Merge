import type { CalculatorContent } from './types';

/**
 * Earth electrode (TT systems) — BS 7671 Reg 411.5 / 542.2.
 */
export const earthElectrodeContent: CalculatorContent = {
  slug: 'earth-electrode',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'On a TT system the installation makes its own connection to earth through an electrode, and its resistance (RA) decides whether an earth fault can be cleared safely.',
    'The key condition is RA × IΔn ≤ 50 V: the electrode resistance times the RCD’s rated residual current must keep the touch voltage at or below 50 V.',
    'Electrode resistance depends on soil resistivity, electrode length and type — a single rod in poor soil can be hundreds of ohms.',
    'Because earth fault current on TT is low, an RCD (not just an overcurrent device) is essential for disconnection.',
  ],

  whenToCheck: [
    'Designing or testing any TT installation',
    'Selecting the RCD so RA × IΔn ≤ 50 V is satisfied',
    'When soil conditions are poor (sandy/rocky) and resistance is high',
    'Adding parallel rods to bring resistance down',
  ],

  commonMistakes: [
    'Relying on overcurrent devices alone on TT (the fault current is too low)',
    'Ignoring seasonal variation — soil dries out and resistance rises',
    'Spacing parallel rods too close (less than their driven depth) so they barely help',
    'Forgetting the 50 V touch-voltage limit drives the RCD choice',
  ],

  workedExample: {
    scenario: 'Single 2.4 m rod in loam (ρ ≈ 50 Ω·m), protected by a 100 mA RCD.',
    inputs: [
      { label: 'Electrode resistance RA', value: '~21 Ω' },
      { label: 'RCD rating IΔn', value: '100 mA' },
    ],
    steps: [
      'Check RA × IΔn ≤ 50 V',
      'RA × IΔn = 21 × 0.1 = 2.1 V',
      '2.1 V ≤ 50 V ✓',
    ],
    result: 'RA × IΔn = 2.1 V — well within the 50 V limit; the RCD will disconnect safely.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 411.5.3 — TT system disconnection',
      clauseText:
        'For a TT system protected by an RCD, the condition RA × IΔn ≤ 50 V shall be satisfied, where RA is the sum of the resistances of the earth electrode and protective conductor, and IΔn is the rated residual operating current. Earth electrodes shall comply with Regulation 542.2.',
      tableRefs: ['Reg 542.2'],
      sourceFacetIds: ['6f5b6619-63de-4d9d-bfc4-9402fbaa43fd'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'RA × IΔn ≤ 50 V and the rod-resistance model match the engine. Reg 542.2.1 (electrode robustness) confirmed in facets; confirm 411.5.3 wording against A4:2026.',
  },
};
