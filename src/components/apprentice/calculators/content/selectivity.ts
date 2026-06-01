import type { CalculatorContent } from './types';

/**
 * Selectivity / discrimination — BS 7671 Reg 536.4.
 */
export const selectivityContent: CalculatorContent = {
  slug: 'selectivity',
  governingStandards: ['BS 7671'],

  whyItMatters: [
    'Selectivity (discrimination) means only the protective device nearest a fault operates, leaving the rest of the installation energised — a fault on one circuit shouldn’t black out the whole board.',
    'It is achieved by separating the devices’ time–current characteristics: the upstream device must be slower and/or higher-rated than the downstream one across the fault range.',
    'A rule-of-thumb current ratio (often around 1.6:1 or more for MCBs) and time-grading help, but full selectivity needs the manufacturers’ let-through (I²t) data.',
    'Poor coordination causes nuisance wider outages; good coordination keeps supplies resilient and safe.',
  ],

  whenToCheck: [
    'Designing distribution where an upstream device feeds several downstream circuits',
    'On critical supplies that must stay up if one circuit faults',
    'When choosing device types/ratings for a board hierarchy',
    'Verifying with manufacturers’ selectivity tables for high fault currents',
  ],

  commonMistakes: [
    'Assuming a current ratio guarantees selectivity at high fault levels (check I²t)',
    'Using the same device type and rating upstream and downstream',
    'Ignoring the instantaneous magnetic region where MCBs lose discrimination',
    'Confusing selectivity with simple back-up protection',
  ],

  workedExample: {
    scenario: 'Upstream 63 A Type C MCB feeding a downstream 20 A Type C MCB.',
    inputs: [
      { label: 'Upstream', value: '63 A Type C' },
      { label: 'Downstream', value: '20 A Type C' },
      { label: 'Current ratio', value: '63 ÷ 20 = 3.15' },
    ],
    steps: [
      'Check the rating ratio gives time separation in the overload region',
      '3.15:1 exceeds the ~1.6:1 guide, so overload selectivity is likely',
      'For high fault currents, confirm with the manufacturers’ I²t / selectivity tables',
    ],
    result: '3.15:1 ratio gives good overload selectivity; verify the fault region with let-through data.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4 — Selectivity between protective devices',
      clauseText:
        'Where selectivity (discrimination) is necessary for safety or to maintain supply, the operating characteristics of devices in series shall be coordinated so that the device nearest the fault operates while upstream devices do not.',
    },
  ],

  _grounding: {
    status: 'thin',
    generatedAt: '2026-06-01',
    notes:
      'Selectivity principles (Reg 536.4) and the ratio/I²t approach match the engine. Confirm 536.4 wording against A4:2026 facets.',
  },
};
