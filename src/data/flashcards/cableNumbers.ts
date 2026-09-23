import type { FlashcardData } from './types';

/**
 * The cable figures you size a job from, and get asked for on a design paper.
 *
 * Same discipline as `maxZsAndTestLimits`: one card, one number, a source
 * under it. Every value is transcribed from a dataset already verified in
 * this repo, never from memory:
 *   · current-carrying capacity → src/lib/calculators/bs7671-data/
 *     appendix4CurrentCapacity.ts (BS 7671 Table 4D5, read page-by-page from
 *     the standard)
 *   · rating factors            → temperatureFactors.ts (Tables 4B1, 4C1) and
 *     thermalInsulationFactors.ts (Appendix 4 §2.6, Reg 523.9)
 *   · voltage drop              → voltageDropData.ts (Table 4D5 mV/A/m) and
 *     the Table 4Ab limits
 *   · conductor resistance      → the same file's resistance per km, which is
 *     the On-Site Guide Table I1 mΩ/m column
 *   · diversity                 → src/utils/diversity-table-a2.ts (On-Site
 *     Guide Appendix A, Table A2, transcribed from the printed pages)
 *
 * The On-Site Guide reprints these in Appendix F (cables and rating factors),
 * Appendix I (conductor resistance) and Appendix A (diversity). Where this
 * repo already asserts an OSG table number it is cited; otherwise the
 * appendix is named and the BS 7671 table gives the row.
 */
export const cableNumbers: FlashcardData[] = [
  // ── Flat twin and earth, clipped direct (Method C) ────────────────────
  {
    id: 'cn1',
    question: 'Current-carrying capacity of 1.5 mm² flat twin and earth, clipped direct?',
    answer: '20 A',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 1.5 mm², Method C',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn2',
    question: 'Current-carrying capacity of 2.5 mm² flat twin and earth, clipped direct?',
    answer: '27 A',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 2.5 mm², Method C',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn3',
    question: 'Current-carrying capacity of 4 mm² flat twin and earth, clipped direct?',
    answer: '37 A',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 4 mm², Method C',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn4',
    question: 'Current-carrying capacity of 6 mm² flat twin and earth, clipped direct?',
    answer: '47 A',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 6 mm², Method C',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn5',
    question: 'Current-carrying capacity of 10 mm² flat twin and earth, clipped direct?',
    answer: '64 A',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 10 mm², Method C',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn6',
    question:
      'Capacity of 2.5 mm² flat twin and earth in an insulated stud wall, touching neither face?',
    answer: '13.5 A — half its clipped-direct rating.',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 2.5 mm², Method 103',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'cn7',
    question: 'Which reference method is flat twin and earth clipped direct to a surface?',
    answer: 'Method C.',
    reference: 'BS 7671 Table 4A2, reference methods',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn8',
    question:
      'Which method covers flat cable above a ceiling under more than 100 mm of insulation?',
    answer: 'Method 101. Up to 100 mm it is Method 100.',
    reference: 'BS 7671 Table 4A2, Methods 100 and 101',
    category: 'Installation',
    difficulty: 'hard',
  },

  // ── Ambient temperature (Ca) ──────────────────────────────────────────
  {
    id: 'cn9',
    question: 'Ambient rating factor for 70 °C thermoplastic cable at 40 °C?',
    answer: '0.87',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B1, 70 °C column, 40 °C row',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn10',
    question: 'Ambient rating factor for 70 °C thermoplastic cable at 35 °C?',
    answer: '0.94',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B1, 70 °C column, 35 °C row',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn11',
    question: 'Ambient rating factor for 90 °C thermosetting cable at 40 °C?',
    answer: '0.91 — thermosetting loses less than the 0.87 for thermoplastic.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B1, 90 °C column, 40 °C row',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn12',
    question: 'What ambient temperature do the tabulated capacities assume for cables in air?',
    answer: '30 °C — that row reads 1.00.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B1',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn13',
    question: 'Which table gives the ambient factor for a BURIED cable, and what does it assume?',
    answer: 'Table 4B2, assuming 20 °C soil — not Table 4B1, which is for air at 30 °C.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B2',
    category: 'Installation',
    difficulty: 'hard',
  },

  // ── Grouping (Cg) ─────────────────────────────────────────────────────
  {
    id: 'cn14',
    question: 'Grouping factor for two circuits bunched together?',
    answer: '0.80',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4C1, item 1, 2 circuits',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn15',
    question: 'Grouping factor for three circuits bunched together?',
    answer: '0.70',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4C1, item 1, 3 circuits',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn16',
    question: 'Grouping factor for four circuits bunched together?',
    answer: '0.65',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4C1, item 1, 4 circuits',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn17',
    question: 'Grouping factor for four cables in a single layer on a wall?',
    answer: '0.75 — item 2, not the 0.65 for bunched.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4C1, item 2, 4 cables',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'cn18',
    question: 'Do cables in trunking count as bunched or as a single layer?',
    answer: 'Bunched — item 1 of the grouping table.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4C1, item 1',
    category: 'Installation',
    difficulty: 'medium',
  },

  // ── Thermal insulation (Ci) ───────────────────────────────────────────
  {
    id: 'cn19',
    question: 'Rating factor for a cable totally surrounded by 100 mm of thermal insulation?',
    answer: '0.78',
    reference: 'On-Site Guide Table F2 — BS 7671 Appendix 4 §2.6, 100 mm row',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn20',
    question: 'Rating factor for a cable surrounded by insulation for 0.5 m or more?',
    answer: '0.5 times the Method C rating, in the absence of more precise information.',
    reference: 'BS 7671 Regulation 523.9',
    category: 'Installation',
    difficulty: 'medium',
  },

  // ── Voltage drop ──────────────────────────────────────────────────────
  {
    id: 'cn21',
    question: 'Voltage drop figure for 2.5 mm² flat twin and earth, single-phase?',
    answer: '18 mV/A/m',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 2.5 mm²',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn22',
    question: 'Voltage drop figure for 1.5 mm² flat twin and earth, single-phase?',
    answer: '29 mV/A/m',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 1.5 mm²',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn23',
    question: 'Voltage drop figure for 6 mm² flat twin and earth, single-phase?',
    answer: '7.3 mV/A/m',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5, 6 mm²',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn24',
    question: 'Maximum voltage drop for a lighting circuit on a 230 V public supply?',
    answer: '3%, which is 6.9 V.',
    reference: 'BS 7671 Appendix 4, Table 4Ab, lighting, public supply',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn25',
    question: 'Maximum voltage drop for a socket circuit on a 230 V public supply?',
    answer: '5%, which is 11.5 V.',
    reference: 'BS 7671 Appendix 4, Table 4Ab, other uses, public supply',
    category: 'Installation',
    difficulty: 'easy',
  },
  {
    id: 'cn26',
    question: 'How do you work out a voltage drop from the table figure?',
    answer: 'mV/A/m × current × length ÷ 1000.',
    reference: 'On-Site Guide Table F6 — BS 7671 Table 4D5',
    category: 'Installation',
    difficulty: 'medium',
  },

  // ── Conductor resistance ──────────────────────────────────────────────
  {
    id: 'cn27',
    question: 'Resistance of a 2.5 mm² copper conductor at 20 °C?',
    answer: '7.41 mΩ/m',
    reference: 'On-Site Guide Table I1, 2.5 mm² row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'cn28',
    question: 'Resistance of a 1.5 mm² copper conductor at 20 °C?',
    answer: '12.10 mΩ/m',
    reference: 'On-Site Guide Table I1, 1.5 mm² row',
    category: 'Testing & Inspection',
    difficulty: 'medium',
  },
  {
    id: 'cn29',
    question: '(r1 + r2) per metre for 2.5 mm² line with a 1.5 mm² cpc?',
    answer: '19.51 mΩ/m — 7.41 plus 12.10.',
    reference: 'On-Site Guide Table I1, 2.5 mm² and 1.5 mm² rows',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },
  {
    id: 'cn30',
    question: 'Multiplier from 20 °C to operating temperature for a 70 °C thermoplastic conductor?',
    answer: '1.20. Thermosetting at 90 °C takes 1.28.',
    reference: 'On-Site Guide Table I3',
    category: 'Testing & Inspection',
    difficulty: 'hard',
  },

  // ── Diversity ─────────────────────────────────────────────────────────
  {
    id: 'cn31',
    question: 'Diversity allowance for lighting in an individual household?',
    answer: '66% of the total current demand.',
    reference: 'On-Site Guide Appendix A, Table A2, row 1, household column',
    category: 'Installation',
    difficulty: 'medium',
  },
  {
    id: 'cn32',
    question: 'Diversity allowance for a household cooker?',
    answer: '10 A, plus 30% of the load above 10 A, plus 5 A if the control unit has a socket.',
    reference: 'On-Site Guide Appendix A, Table A2, row 3, household column',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'cn33',
    question: 'Which loads does Table A2 allow no diversity on at all?',
    answer: 'Thermostatic water heaters, floor warming, and thermal storage heating.',
    reference: 'On-Site Guide Appendix A, Table A2, rows 6, 7 and 8',
    category: 'Installation',
    difficulty: 'hard',
  },
  {
    id: 'cn34',
    question: 'Must a consumer unit be rated for the diversified load or the connected load?',
    answer: 'The full connected load, with no diversity applied.',
    reference: 'On-Site Guide Appendix A, note † to Table A2',
    category: 'Installation',
    difficulty: 'hard',
  },
];
