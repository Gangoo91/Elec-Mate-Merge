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
      citation:
        'Regulation 552.1.1 — equipment must suit the STARTING current, not just the running current',
      clauseText:
        'All equipment, including cable, of every circuit carrying the starting, accelerating and load currents of a motor shall be suitable for a current at least equal to the full-load current rating of the motor when rated in accordance with the appropriate British or Harmonized Standard. Where the motor is intended for intermittent duty and for frequent starting and stopping, account shall be taken of any cumulative effects of the starting or braking currents upon the temperature rise of the equipment of the circuit.',
      tableRefs: ['Reg 552.1.1'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 552.1.2 — overload protection above 0.37 kW',
      clauseText:
        'Every electric motor having a rating exceeding 0.37 kW shall be provided with control equipment incorporating means of protection against overload of the motor. This requirement does not apply to a motor incorporated in an item of current-using equipment complying as a whole with an appropriate British or Harmonized Standard.',
      tableRefs: ['Reg 552.1.2'],
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 552.1.3 — no automatic restart',
      clauseText:
        'Except where failure to start after a brief interruption would be likely to cause greater danger, every motor shall be provided with means to prevent automatic restarting after a stoppage due to a drop in voltage or failure of supply, where unexpected restarting could cause danger. See also Regulation 463.3 (Motor control).',
      tableRefs: ['Reg 552.1.3', 'Reg 463.3'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      '552.1.1, 552.1.2 and 552.1.3 quoted verbatim from the printed BS 7671:2018+A4:2026 text (Desktop/BS7671_ocr.pdf). The file previously cited \u201cSection 552\u201d generically with paraphrased content; 552.1.1 is the clause that actually makes the starting current a design duty, and the 0.37 kW overload threshold in 552.1.2 is a hard number worth surfacing. \u26a0\ufe0f The 6\u20138\u00d7 DOL inrush multiplier used by the engine is a MANUFACTURER/typical figure \u2014 BS 7671 sets no multiplier; always use the motor nameplate or the manufacturer\u2019s data where available. \u221a3 handling in the engine verified.',
  },
};
