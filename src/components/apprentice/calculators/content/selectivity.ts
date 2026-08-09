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
    result:
      '3.15:1 ratio gives good overload selectivity; verify the fault region with let-through data.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4 — Selectivity between protective devices',
      clauseText:
        'Where selectivity (discrimination) is necessary for safety or to maintain supply, the operating characteristics of devices in series shall be coordinated so that the device nearest the fault operates while upstream devices do not.',
    },
    /*
      Verified against the printed regulations (Desktop/BS7671_ocr.pdf), Reg 536.4.
      The file previously carried one line — "selectivity principles (Reg 536.4)" —
      which understates what the regulation actually requires: it is not enough for
      the curves to look separated, the design has to be VERIFIED by one of four
      named routes.
    */
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.1.2.1 — verifying selectivity',
      clauseText:
        'Where selectivity is required, the design shall be verified either by (a) desk study taking into account the relevant product standards and the manufacturer\u2019s literature, (b) appropriate software tools where the manufacturer provides information for that specific use, (c) tests in accordance with the applicable product standard, or (d) manufacturer\u2019s declaration. A ratio or time/current comparison is an aid to the desk study in (a) — it is not, by itself, verification.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.1.4 — selectivity between RCDs',
      clauseText:
        'Selectivity in the case of residual currents is given where (i) the upstream RCD is of selective type — type S or a time-delayed type with an appropriate time delay setting — and (ii) the ratio of the rated residual operating current of the upstream RCD to that of the downstream RCD is at least 3:1. Where either device has an adjustable rated residual operating current or time delay, the manufacturer\u2019s instructions govern.',
    },
    {
      standard: 'BS 7671',
      citation: 'Regulation 536.4.1 — what is defined where',
      clauseText:
        'Selectivity between overcurrent protective devices is defined in Reg 536.4.1.2 for overload conditions and Reg 536.4.1.3 for short-circuit conditions; between RCDs in Reg 536.4.1.4; and between an OCPD and an RCD in Reg 536.4.1.5. Throughout Reg 536.4 the OCPD may be replaced by an SCPD.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Reg 536.4.1, 536.4.1.2.1 and 536.4.1.4 verified word-for-word against the printed A4:2026 text (Desktop/BS7671_ocr.pdf). The 3:1 residual-current ratio and the type S / time-delayed upstream condition match the RCD discrimination engine (currentRatio >= 3 plus a time difference). Note the regulation requires verification by desk study, software, test or manufacturer declaration — this tool supports the desk study, it does not discharge the duty.',
  },
};
