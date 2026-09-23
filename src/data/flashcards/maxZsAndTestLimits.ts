import type { FlashcardData } from './types';

/**
 * The figures you get asked for at a board, and on a 2391 paper.
 *
 * Built deliberately short. The decks written before this one average 310
 * characters an answer and 553 of them run past 300 — a paragraph you cannot
 * honestly mark yourself against, which matters now that the self-marking
 * drives the review schedule. One card, one fact, and a source under it.
 *
 * Every value is transcribed from a dataset already verified in this repo,
 * never from memory:
 *   · maximum Zs      → src/data/zsLimits.ts (BS 7671 Tables 41.2–41.5, with
 *                       the Cmin factor of 0.95 already applied)
 *   · the 0.8 factor  → Guidance Note 3 Appendix 3's acceptance equation,
 *                       confirmed against the GN3 facets in the RAG
 *   · insulation resistance and RCD times → BS 7671 Table 64 (Reg 643.3.2)
 *                       and Chapter 64, confirmed against the RAG
 *
 * The On-Site Guide reprints the Zs tables in its Appendix B. Where this repo
 * already asserts an OSG table number it is cited; otherwise the appendix is
 * named and the BS 7671 table gives the row. Never add an OSG table number
 * from memory.
 */
export const maxZsAndTestLimits: FlashcardData[] = [
  // ── Type B circuit-breakers ───────────────────────────────────────────
  {
    id: 'zs1',
    question: 'Maximum Zs for a 6 A Type B circuit-breaker?',
    answer: '7.28 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 6 A row (Cmin 0.95 applied)',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs2',
    question: 'Maximum Zs for a 16 A Type B circuit-breaker?',
    answer: '2.73 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 16 A row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs3',
    question: 'Maximum Zs for a 20 A Type B circuit-breaker?',
    answer: '2.19 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 20 A row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs4',
    question: 'Maximum Zs for a 32 A Type B circuit-breaker?',
    answer: '1.37 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 32 A row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs5',
    question: 'Maximum Zs for a 40 A Type B circuit-breaker?',
    answer: '1.09 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 40 A row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs6',
    question: 'Maximum Zs for a 10 A Type B circuit-breaker?',
    answer: '4.37 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 10 A row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs7',
    question: 'Maximum Zs for a 50 A Type B circuit-breaker?',
    answer: '0.87 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 50 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs8',
    question: 'Maximum Zs for a 63 A Type B circuit-breaker?',
    answer: '0.69 Ω',
    reference: 'BS 7671 Table 41.3, Type B, 63 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── Type C and D ──────────────────────────────────────────────────────
  {
    id: 'zs9',
    question: 'Maximum Zs for a 16 A Type C circuit-breaker?',
    answer: '1.37 Ω — half the Type B figure, because Type C needs twice the current to trip.',
    reference: 'BS 7671 Table 41.3, Type C, 16 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs10',
    question: 'Maximum Zs for a 32 A Type C circuit-breaker?',
    answer: '0.68 Ω',
    reference: 'BS 7671 Table 41.3, Type C, 32 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs11',
    question: 'Maximum Zs for a 32 A Type D circuit-breaker at 0.4 s?',
    answer: '0.34 Ω',
    reference: 'BS 7671 Table 41.3, Type D, 32 A row, 0.4 s',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs12',
    question: 'Which circuit-breaker curve prints separate 0.4 s and 5 s rows in Table 41.3?',
    answer:
      'Type D only. The 5 s values are double the 0.4 s ones; Type B and C print one row that serves both times.',
    reference: 'BS 7671 Table 41.3(c)',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },

  // ── Fuses ─────────────────────────────────────────────────────────────
  {
    id: 'zs13',
    question: 'Maximum Zs for a 32 A BS 88-2 fuse at 0.4 s?',
    answer: '0.99 Ω',
    reference: 'BS 7671 Table 41.2, BS 88-2 fuse, 32 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs14',
    question: 'Maximum Zs for a 16 A BS 88-2 fuse at 0.4 s?',
    answer: '2.43 Ω',
    reference: 'BS 7671 Table 41.2, BS 88-2 fuse, 16 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs15',
    question: 'Maximum Zs for a 30 A BS 3036 rewirable fuse at 0.4 s?',
    answer: '1.04 Ω',
    reference: 'BS 7671 Table 41.2, BS 3036 fuse, 30 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs16',
    question: 'Maximum Zs for a 13 A BS 1362 fuse at 0.4 s?',
    answer: '2.3 Ω',
    reference: 'BS 7671 Table 41.2, BS 1362 fuse, 13 A row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs17',
    question: 'Where do you find the maximum Zs for an old BS 3871 circuit-breaker?',
    answer:
      'On-Site Guide Table B6 — BS 3871 is a withdrawn standard and is not in BS 7671 Table 41.3 at all.',
    reference: 'On-Site Guide Table B6',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },

  // ── RCDs ──────────────────────────────────────────────────────────────
  {
    id: 'zs18',
    question: 'Maximum Zs for a 30 mA RCD on a TT system?',
    answer: '1667 Ω — that is 50 V divided by 0.03 A.',
    reference: 'BS 7671 Table 41.5, 30 mA row',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs19',
    question: 'Maximum Zs for a 100 mA RCD?',
    answer: '500 Ω',
    reference: 'BS 7671 Table 41.5, 100 mA row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs20',
    question:
      'Above what earth electrode resistance does BS 7671 warn the value may not be stable?',
    answer: '200 Ω — it can drift as the soil dries or freezes.',
    reference: 'BS 7671 Note 2 to Table 41.5',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },

  // ── The 0.8 factor ────────────────────────────────────────────────────
  {
    id: 'zs21',
    question: 'What factor does Guidance Note 3 apply to a Zs measured on a cold circuit?',
    answer: '0.8 — the measured value must not exceed 0.8 × the tabulated maximum.',
    reference: 'Guidance Note 3 Appendix 3, acceptance equation',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs22',
    question: 'Site limit for a cold Zs reading on a 32 A Type B circuit-breaker?',
    answer: '1.10 Ω — 1.37 × 0.8.',
    reference: 'BS 7671 Table 41.3 (1.37 Ω); Guidance Note 3 Appendix 3 (× 0.8)',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'zs23',
    question:
      'Why is a measured Zs compared against 0.8 of the table value rather than the value itself?',
    answer:
      'The table assumes conductors at operating temperature. You test them cold, so they will rise once loaded.',
    reference: 'Guidance Note 3 Appendix 3; NOTE to BS 7671 Tables 41.2–41.4',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },

  // ── Insulation resistance ─────────────────────────────────────────────
  {
    id: 'zs24',
    question: 'Insulation resistance test voltage and minimum for a 230 V final circuit?',
    answer: '500 V DC, minimum 1.0 MΩ',
    reference: 'BS 7671 Table 64 (Reg 643.3.2), circuits up to and including 500 V',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs25',
    question: 'Insulation resistance test voltage and minimum for a SELV or PELV circuit?',
    answer: '250 V DC, minimum 0.5 MΩ',
    reference: 'BS 7671 Table 64 (Reg 643.3.2), SELV and PELV row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs26',
    question: 'Insulation resistance test voltage and minimum for a circuit above 500 V?',
    answer: '1000 V DC, minimum 1.0 MΩ — the minimum does not rise, only the test voltage.',
    reference: 'BS 7671 Table 64 (Reg 643.3.2), circuits above 500 V',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'zs27',
    question: 'Which table and regulation give the insulation resistance minima?',
    answer: 'Table 64, in Regulation 643.3.2.',
    reference: 'BS 7671 Reg 643.3.2',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },

  // ── RCD testing ───────────────────────────────────────────────────────
  {
    id: 'zs28',
    question:
      'Within what time must a general non-delay RCD disconnect at its rated residual operating current?',
    answer: '300 ms',
    reference: 'BS 7671 Chapter 64, RCD effectiveness',
    category: 'Testing & Inspection',
    difficulty: 'easy',
  },
  {
    id: 'zs29',
    question:
      'How is a time-delayed RCD to BS EN 60947-2 recorded on the schedule of test results?',
    answer: 'In the Remarks column, as t followed by the delay — for example t=40 ms.',
    reference: 'Guidance Note 3, Schedule of Test Results, Remarks column',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'zs30',
    question: 'What maximum value does BS 7671 give for the continuity of protective conductors?',
    answer:
      'None. Compare the reading against the value you calculate from the conductor sizes and length.',
    reference: 'BS 7671 Reg 643.2.1; On-Site Guide Table I1 for the calculation',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
];
