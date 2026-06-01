import type { CalculatorContent } from './types';

/**
 * RCD discrimination (selectivity) — BS 7671 Reg 536.4.1.4.
 */
export const rcdDiscriminationContent: CalculatorContent = {
  slug: 'rcd-discrimination',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'RCD discrimination means an earth fault on one circuit trips only its own RCD, not the upstream one — so a single fault doesn’t take out the whole installation.',
    'It needs both a current margin (the upstream rated residual current at least 3× the downstream) and a time margin (an upstream time-delayed ‘S’-type).',
    'Without discrimination, a front-end 30 mA RCD trips for any downstream fault, causing wide, hard-to-diagnose outages.',
    'It matters most where continuity of supply is important or where many circuits share one RCD.',
  ],

  whenToCheck: [
    'Designing boards with RCDs in series (e.g. an incomer RCD plus RCBOs)',
    'Where loss of supply to the whole board is unacceptable',
    'Selecting an S-type time-delayed RCD upstream',
    'Verifying the 3:1 current and time margins',
  ],

  commonMistakes: [
    'Putting two non-delayed 30 mA RCDs in series (no time discrimination)',
    'Relying on the current ratio alone without an S-type upstream',
    'Using a ratio below 3:1 between upstream and downstream IΔn',
    'Assuming discrimination where the devices’ trip-time bands overlap',
  ],

  workedExample: {
    scenario: 'Upstream 100 mA S-type, downstream 30 mA non-delayed.',
    inputs: [
      { label: 'Current ratio', value: '100 ÷ 30 = 3.3' },
      { label: 'Upstream type', value: 'S (time-delayed)' },
      { label: 'Downstream type', value: 'Instantaneous' },
    ],
    steps: [
      'Current margin ≥ 3:1 → 3.3:1 ✓',
      'Time margin: S-type upstream delays operation vs the instantaneous downstream ✓',
      'Both conditions met → discrimination achieved',
    ],
    result: '3.3:1 ratio with an S-type upstream gives full RCD discrimination.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.1.4 — RCD selectivity',
      clauseText:
        'Where selectivity between RCDs is required, the upstream device should be time-delayed (S-type) and have a rated residual operating current sufficiently higher than the downstream device (typically at least three times), so only the downstream RCD operates for a downstream fault.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 536.4.1.4 confirmed against A4:2026 facets as the clause defining selectivity between RCDs (536.4.1.3 explicitly points to it). 3:1 current + S-type time margin matches the engine. (The engine UI references an older 531.2.9 — content uses the correct A4 number.)',
  },
};
