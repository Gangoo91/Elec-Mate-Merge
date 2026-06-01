import type { CalculatorContent } from './types';

/**
 * Ring final circuit continuity — BS 7671 Part 6 + GN3.
 */
export const ringCircuitContent: CalculatorContent = {
  slug: 'ring-circuit',
  governingStandards: ['BS 7671', 'IET Guidance Note 3'],

  whyItMatters: [
    'The three-step ring continuity test proves the ring is a complete loop with no breaks, no interconnections and no spurs wired as part of the ring.',
    'Measuring the end-to-end resistances of line (r1), neutral (rn) and CPC (r2) lets you predict the R1 + R2 at every socket — it should be roughly a quarter of (r1 + r2) and even across the ring.',
    'A break in the ring turns it into two long radials, overloading the cable; an undetected interconnection defeats the design.',
    'It is one of the most-failed tests on an EICR, so doing it methodically matters.',
  ],

  whenToCheck: [
    'Initial verification of every ring final circuit',
    'Periodic inspection where a ring is suspected of being broken or interconnected',
    'After alterations that add sockets or spurs',
    'When socket R1 + R2 readings vary oddly around the ring',
  ],

  commonMistakes: [
    'Not proving the instrument before the test',
    'Recording combined ring values instead of measuring each conductor separately',
    'Cross-connecting the wrong ends (line to CPC) in step 2',
    'Not nulling the leads, inflating the readings',
    'Mistaking a multi-socket spur for part of the ring',
  ],

  workedExample: {
    scenario: 'Ring in 2.5/1.5 mm² T&E: end-to-end r1 = 0.50 Ω, r2 = 0.82 Ω.',
    inputs: [
      { label: 'r1 (line end-to-end)', value: '0.50 Ω' },
      { label: 'r2 (CPC end-to-end)', value: '0.82 Ω' },
    ],
    steps: [
      'Cross-connect line and CPC; reading at any socket ≈ (r1 + r2) ÷ 4',
      '(0.50 + 0.82) ÷ 4 = 1.32 ÷ 4',
      '≈ 0.33 Ω, and roughly equal at every socket',
    ],
    result: 'Expected R1 + R2 ≈ 0.33 Ω at each socket — even readings confirm a healthy ring.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.2 — Continuity of ring final circuit conductors',
      clauseText:
        'A test shall verify the continuity of each conductor of every ring final circuit, confirming a complete ring with no break, interconnection or unintended spur. The IET GN3 three-step method gives the procedure.',
    },
  ],

  _grounding: {
    status: 'verified',
    generatedAt: '2026-06-01',
    notes:
      'Three-step ring test and (r1+r2)/4 relationship are standard (Part 6 / GN3). Common mistakes and step-1 procedure corroborated by the practical-work intelligence corpus (Elec-Mate). Confirm 643.2 wording against A4:2026 facets.',
  },
};
