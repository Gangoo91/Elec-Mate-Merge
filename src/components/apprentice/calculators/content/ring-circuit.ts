import type { CalculatorContent } from './types';

/**
 * Ring final circuit continuity — BS 7671 Part 6 + GN3.
 */
export const ringCircuitContent: CalculatorContent = {
  slug: 'ring-circuit',
  governingStandards: ['BS 7671', 'IET Guidance Note 3'],

  whyItMatters: [
    'The three-step ring continuity test proves the ring is a complete loop with no breaks, no interconnections and no spurs wired as part of the ring.',
    'Measuring the end-to-end resistances of line (r1), neutral (rn) and CPC (r2) lets you predict the R1 + R2 at every socket — at the midpoint it is a quarter of (r1 + r2).',
    'On flat twin and earth the cpc is a reduced csa, so GN3 Ch 2 Reg 2.20 expects the line-to-cpc readings to vary around the ring rather than be identical: lowest at the origin, highest at the midpoint. Table 2.9 puts the spread at about 6 % of the highest reading for 2.5/1.5 mm², which up to a 60 m ring is below what the instrument can resolve.',
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
      'Cross-connect line and CPC; the highest reading, at the midpoint, is (r1 + r2) ÷ 4',
      '(0.50 + 0.82) ÷ 4 = 1.32 ÷ 4',
      '≈ 0.33 Ω at the midpoint; at the origin (r1 × r2) ÷ (r1 + r2) = 0.41 ÷ 1.32 ≈ 0.31 Ω',
    ],
    result:
      'Expected R1 + R2 ≈ 0.33 Ω at the midpoint, easing to ≈ 0.31 Ω towards the ends — a smooth rise and fall of about 6 % (GN3 Table 2.9) confirms a healthy 2.5/1.5 mm² ring. Record the 0.33 Ω midpoint value.',
  },

  standards: [
    {
      standard: 'BS 7671',
      citation: 'Regulation 643.2.1(b) — live conductors, in the case of ring final circuits',
      clauseText:
        'Reg 643.2 is titled simply “Continuity of conductors”, and it has one sub-clause. Reg 643.2.1: the continuity of conductors and connections to exposed-conductive-parts and extraneous-conductive-parts, if any, shall be verified by a measurement of resistance of (a) protective conductors, including protective bonding conductors; and (b) IN THE CASE OF RING FINAL CIRCUITS, LIVE CONDUCTORS. That single item (b) is the whole of the ring-continuity requirement in BS 7671 — there is no regulation numbered 643.2.2, and no separate “continuity of ring final circuit conductors” regulation.',
      tableRefs: ['Reg 643.2.1'],
    },
    {
      standard: 'IET Guidance Note 3',
      citation: 'GN3 — the three-step method is GUIDANCE, not the regulation',
      clauseText:
        'BS 7671 requires the measurement but does not prescribe how to take it. The familiar three-step procedure — end-to-end readings of line, neutral and cpc (r1, rn, r2), then cross-connecting line to neutral and measuring at each socket, then line to cpc and measuring at each socket to obtain (r1+r2)/4 — comes from IET Guidance Note 3. It is the accepted method for demonstrating a complete ring with no break, interconnection or unintended spur, but it is guidance, and this tool presents it as such.',
      tableRefs: ['GN3'],
    },
  ],
  _grounding: {
    status: 'verified',
    generatedAt: '2026-08-06',
    notes:
      'CITATION CORRECTED against the printed BS 7671:2018+A4:2026 (Desktop/BS7671_ocr.pdf). The file cited \u201cRegulation 643.2 \u2014 Continuity of ring final circuit conductors\u201d. Reg 643.2 is titled \u201cContinuity of conductors\u201d and carries no such heading; \u26a0\ufe0f there is NO Reg 643.2.2 \u2014 643.2 has exactly one sub-clause, 643.2.1, and the ring requirement is item (b) of it: \u201cin the case of ring final circuits, live conductors\u201d. The old clauseText also stated the no-break/no-interconnection/no-spur wording as though it were regulation text; it is not in BS 7671, so it has been moved into the GN3 entry and labelled guidance. The r1/rn/r2 arithmetic and the (r1+r2)/4 relationship match the engine.',
  },
};
