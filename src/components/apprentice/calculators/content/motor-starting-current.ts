import type { CalculatorContent } from './types';

/**
 * Motor starting current — engineering theory (BS 7671 552 context).
 */
export const motorStartingCurrentContent: CalculatorContent = {
  slug: 'motor-starting-current',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'A direct-on-line motor draws a large inrush at start — typically 6–8× its full-load current — for a short time, which dominates the design of its circuit.',
    'That inrush causes a brief voltage dip; on long runs it can be enough to disturb other equipment or stop the motor reaching speed.',
    'It drives the choice of protective device (one that rides through the inrush without nuisance-tripping) and starting method (DOL, star-delta, soft-start).',
    'The cable must keep the starting voltage drop within acceptable limits, not just the running drop.',
  ],

  whenToCheck: [
    'Sizing the circuit and device for a motor (allow for inrush)',
    'Deciding the starting method (DOL vs star-delta vs soft-start)',
    'Checking the starting voltage drop on a long run',
    'Diagnosing nuisance tripping on motor start',
  ],

  commonMistakes: [
    'Sizing the device on full-load current and ignoring inrush',
    'Checking only the running voltage drop, not the starting drop',
    'Using a Type B device where the inrush trips it (Type C/D often needed)',
    'Forgetting star-delta or soft-start to cut inrush on larger motors',
  ],

  workedExample: {
    scenario: '11 kW DOL motor, 400 V, η 0.85, pf 0.85, inrush 6×.',
    inputs: [
      { label: 'FLC', value: 'P ÷ (√3·V·η·pf)' },
      { label: 'Starting multiple', value: '6×' },
    ],
    steps: [
      'FLC = 11 000 ÷ (1.732 × 400 × 0.85 × 0.85) ≈ 22 A',
      'Starting current = 22 × 6 = 132 A',
      'Size the device to ride through ~132 A inrush; check starting Vd',
    ],
    result: 'FLC ≈ 22 A, inrush ≈ 132 A — device and cable must handle the start.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'BS 7671 Section 552 — Rotating machines',
      clauseText:
        'Motor circuits must account for starting conditions: the protective device and conductors shall be suitable for the starting current and duty, and starting should not cause excessive voltage disturbance.',
      tableRefs: ['Section 552'],
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'FLC and 6–8× inrush are standard; engine uses √3 correctly. Section 552 (rotating machines) is the relevant BS 7671 context; confirm sub-clauses against A4:2026 facets.',
  },
};
