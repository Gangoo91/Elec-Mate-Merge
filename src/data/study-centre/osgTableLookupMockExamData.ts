/**
 * On-Site Guide table-lookup paper (ELE-1761).
 *
 * Matt Horne, tutor at Riverside College: "some OSG specific mocks for them to
 * work through tables for the correct values — I find this helps them a lot to
 * navigate the book and retain for the exams."
 *
 * Every question here can only be answered by opening the IET On-Site Guide
 * (or BS 7671) and reading a value off a table. Nothing is recall. Marking
 * names the table and the row, so a wrong answer teaches where to look.
 *
 * Every figure is transcribed from a source already verified in this repo —
 * never from memory:
 *   · Maximum Zs           → src/data/zsLimits.ts (BS 7671 Tables 41.2, 41.3,
 *                            41.4 and 41.5, Cmin 0.95 applied; OSG Table B6 for
 *                            BS 3871)
 *   · Rating factors       → src/lib/calculators/bs7671-data/temperatureFactors.ts
 *                            (Tables 4B1, 4B2, 4C1) and thermalInsulationFactors.ts
 *                            (Appendix 4 §2.6, Reg 523.9)
 *   · Cable capacity       → bs7671-data/appendix4CurrentCapacity.ts (Tables 4D5
 *                            and 4D2A, read page-by-page from the standard)
 *   · Voltage drop         → bs7671-data/voltageDropData.ts (Table 4D5 mV/A/m),
 *                            Table 4Ab limits
 *   · Conductor resistance → the same file's resistance per km, which is the
 *                            On-Site Guide Table I1 mΩ/m column; Table I3 multipliers
 *   · Diversity            → src/utils/diversity-table-a2.ts (OSG Appendix A,
 *                            Table A2, transcribed from the printed pages)
 *   · Installation methods → the Table 4A2 reference-method descriptions in
 *                            appendix4CurrentCapacity.ts METHOD_LABELS
 *
 * The On-Site Guide reprints these BS 7671 tables in its appendices (F for
 * cables and rating factors, B for earth fault loop impedance, I for conductor
 * resistance, A for diversity). Where the OSG table number is asserted
 * elsewhere in this codebase it is cited; where it is not, the appendix is
 * named and the BS 7671 table gives the row. Do not add an OSG table number
 * from memory.
 *
 * The 0.8 factor on measured Zs is Guidance Note 3's Appendix 3 acceptance
 * equation (Zs measured ≤ 0.8 × Uo ÷ (Ia × Cmin), i.e. 0.8 × the table value),
 * confirmed against the GN3 facets in the RAG. It is asked as such.
 *
 * Writing rules that keep the paper honest (check-question-quality enforces
 * the first two): options are the same shape and length; every distractor is
 * a real neighbouring row, column or arithmetic slip, never a throwaway;
 * every explanation says what the wrong options were.
 */

import type { MockExamConfig, StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';

export const osgTableLookupCategories = [
  'Maximum Zs',
  'Rating factors',
  'Cable capacity',
  'Voltage drop',
  'Conductor resistance',
  'Demand and diversity',
  'Installation methods',
  'Armoured and XLPE cables',
  'Testing limits',
];

export const osgTableLookupMockExamConfig: MockExamConfig = {
  examId: 'osg-table-lookup',
  examTitle: 'On-Site Guide table lookup',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes — every question means opening the book
  passThreshold: 70,
  exitPath: '/study-centre/mock-exams',
  categories: osgTableLookupCategories,
  subtitle: 'Have the books in front of you',
  note:
    'Every answer is read off a table, so sit this with BS 7671, the On-Site Guide and Guidance Note 3 open — not from memory. In the On-Site Guide: Appendix A for diversity, Appendix B for earth fault loop impedance, Appendix F for cables and rating factors, Appendix I for conductor resistance. BS 7671 Appendix 4 and Chapter 41 carry the same tables; Guidance Note 3 carries the testing conventions.',
};

export const getRandomOsgTableLookupQuestions = (numQuestions: number = 30) =>
  getRandomQuestionsBalanced(osgTableLookupQuestionBank, numQuestions, osgTableLookupCategories);

const ZS_MCB = (row: string) =>
  `On-Site Guide Appendix B, earth fault loop impedance — BS 7671 Table 41.3, ${row}`;
const ZS_FUSE = (row: string) =>
  `On-Site Guide Appendix B, earth fault loop impedance — BS 7671 Table 41.2, ${row}`;
const GN3_08 = 'Guidance Note 3 Appendix 3 — measured Zs ≤ 0.8 × the table value';
const ZS_5S = (row: string) =>
  `On-Site Guide Appendix B, earth fault loop impedance — BS 7671 Table 41.4 (5 s), ${row}`;
const CA_REF = (row: string) =>
  `On-Site Guide Appendix F, rating factors for ambient temperature — BS 7671 Table 4B1, ${row}`;
const CG_REF = (row: string) =>
  `On-Site Guide Appendix F, rating factors for grouping — BS 7671 Table 4C1, ${row}`;
const CI_REF = (row: string) =>
  `On-Site Guide Table F2, cables in thermal insulation — BS 7671 Appendix 4 section 2.6, ${row}`;
const CCC_REF = (row: string) =>
  `On-Site Guide Table F6, flat twin and earth — BS 7671 Table 4D5, ${row}`;
const MULTI_REF = (row: string) =>
  `On-Site Guide Appendix F, multicore 70 °C thermoplastic — BS 7671 Table 4D2A, ${row}`;
const VD_REF = (row: string) =>
  `On-Site Guide Table F6, voltage drop column — BS 7671 Table 4D5, ${row}`;
const VD_LIMIT = 'BS 7671 Appendix 4, Table 4Ab — voltage drop limits';
const I1_REF = (row: string) => `On-Site Guide Table I1, conductor resistance at 20 °C — ${row}`;
const I3_REF = 'On-Site Guide Table I3, multipliers from 20 °C to conductor operating temperature';
const A2_REF = (row: string) => `On-Site Guide Appendix A, Table A2 allowances for diversity — ${row}`;
const RLV_REF = (row: string) =>
  `On-Site Guide Appendix B, reduced low voltage systems — BS 7671 Table 41.6, ${row}`;
const SOIL_REF = (row: string) =>
  `On-Site Guide Appendix F, buried cables — BS 7671 Table 4B3 (soil thermal resistivity), ${row}`;
const DEPTH_REF = (row: string) =>
  `On-Site Guide Appendix F, buried cables — BS 7671 Table 4B4 (depth of laying), ${row}`;
const TROUGH_REF = (row: string) =>
  `On-Site Guide Appendix F, cables in concrete troughs — BS 7671 Table 4C6, ${row}`;
const VD3_REF = (row: string) =>
  `On-Site Guide Table F6, three-phase voltage drop column — BS 7671 Table 4D5, ${row}`;
const ARM_REF = (table: string, row: string) =>
  `On-Site Guide Appendix F, armoured and thermosetting cables — BS 7671 ${table}, ${row}`;
const IR_REF = 'BS 7671 Table 64 (Regulation 643.3.2) — insulation resistance test voltages and minima';
const RCD_REF = 'BS 7671 Chapter 64 — RCD effectiveness, and Guidance Note 3 on test currents';
const METHOD_REF = (row: string) =>
  `On-Site Guide Appendix F, installation methods — BS 7671 Table 4A2, ${row}`;

type Q = Omit<StandardMockQuestion, 'section' | 'topic'>;
const family = (name: string, qs: Q[]): StandardMockQuestion[] =>
  qs.map((q) => ({ ...q, section: name, topic: name, category: name }));

// ═══════════════════════════════════════════════════════════════════════════
// MAXIMUM Zs — Tables 41.2, 41.3, 41.4, 41.5 (ids 1–30)
// ═══════════════════════════════════════════════════════════════════════════
const MAX_ZS: Q[] = [
  {
    id: 1,
    question:
      'A 32 A Type B circuit-breaker to BS EN 60898 protects a radial. Look up the maximum earth fault loop impedance (Zs) permitted for 0.4 s disconnection.',
    options: ['1.37 Ω', '1.44 Ω', '2.19 Ω', '1.10 Ω'],
    correctAnswer: 0,
    explanation:
      'The Type B row for 32 A gives 1.37 Ω. That figure already includes the Cmin factor of 0.95. 1.44 Ω is the pre-Cmin value from older editions and 1.10 Ω is the site limit after the 0.8 factor, so neither is the table value asked for. 2.19 Ω is the 20 A row.',
    reference: ZS_MCB('Type B, 32 A row'),
    difficulty: 'basic',
    category: 'Maximum Zs',
  },
  {
    id: 2,
    question:
      'A 20 A Type B circuit-breaker protects a radial. The cold measured Zs is 1.90 Ω. Look up the table value, apply Guidance Note 3\'s 0.8 factor, and give your verdict.',
    options: ['Under the 2.19 Ω table value, so it passes without any further checks', 'Above the 2.19 Ω table value, so it fails outright and must be rewired', 'Above the 1.75 Ω site limit though under 2.19 Ω — investigate before signing', 'Under the 1.75 Ω site limit, so it passes with a comfortable margin in hand'],
    correctAnswer: 2,
    explanation:
      'Type B at 20 A is 2.19 Ω; × 0.8 gives a cold site limit of 1.75 Ω. 1.90 Ω sits between the two: it clears the printed value but the conductors were cold, so once warm the loop may exceed 2.19 Ω. Investigate rather than sign off. It is not above 2.19 Ω, and it is not under 1.75 Ω.',
    reference: `${ZS_MCB('Type B, 20 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 3,
    question:
      'Two lighting circuits are both on 6 A devices, one Type B and one Type C. Look up both rows. How does the Type C limit compare?',
    options: ['Double — 14.57 Ω against 7.28 Ω', 'Half — 3.64 Ω against 7.28 Ω', 'A quarter — 1.82 Ω against 7.28 Ω', 'The same — 7.28 Ω for both'],
    correctAnswer: 1,
    explanation:
      'Type B at 6 A is 7.28 Ω and Type C at 6 A is 3.64 Ω — half, because a Type C device needs twice the current to trip magnetically. 1.82 Ω is the Type D row, a quarter; 14.57 Ω is the Type B 3 A row. The two curves never share a value at the same rating.',
    reference: `${ZS_MCB('Type B and Type C, 6 A rows')}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 4,
    question:
      'A 16 A Type C circuit-breaker protects a small motor circuit. Look up its maximum Zs for 0.4 s disconnection.',
    options: ['2.73 Ω', '1.37 Ω', '0.68 Ω', '1.09 Ω'],
    correctAnswer: 1,
    explanation:
      'Type C at 16 A is 1.37 Ω — half the Type B figure for the same rating (2.73 Ω), because a Type C device needs twice the current to trip magnetically. The Type C 32 A row is 0.68 Ω. 1.09 Ω is Type C at 20 A.',
    reference: ZS_MCB('Type C, 16 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 5,
    question:
      'A 32 A Type D circuit-breaker protects a circuit with a high inrush load. What is the maximum Zs for 0.4 s disconnection?',
    options: ['1.37 Ω', '0.34 Ω', '0.27 Ω', '0.68 Ω'],
    correctAnswer: 1,
    explanation:
      'Type D at 32 A for 0.4 s is 0.34 Ω. Type D is the one curve in Table 41.3 that prints separate 0.4 s and 5 s rows; the 5 s value is double, at 0.68 Ω. 1.37 Ω is the Type B row. 0.27 Ω is the Type D 40 A row.',
    reference: ZS_MCB('Type D, 32 A row, 0.4 s'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 6,
    question: 'Find the maximum Zs for a 40 A Type C circuit-breaker.',
    options: ['0.44 Ω', '0.27 Ω', '1.09 Ω', '0.55 Ω'],
    correctAnswer: 3,
    explanation:
      'Type C at 40 A is 0.55 Ω. 1.09 Ω is the Type B 40 A value, 0.44 Ω is the Type C 50 A row and 0.27 Ω is the Type C 80 A row.',
    reference: ZS_MCB('Type C, 40 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 7,
    question:
      'You measure Zs on a cold circuit protected by a 32 A Type B circuit-breaker. Applying Guidance Note 3\'s 0.8 factor to the table value, what is the maximum you should accept on site?',
    options: ['1.44 Ω', '1.10 Ω', '1.30 Ω', '1.37 Ω'],
    correctAnswer: 1,
    explanation:
      'The table value is 1.37 Ω at conductor operating temperature. Measured cold, the conductors will warm and the loop will rise, so Guidance Note 3 Appendix 3 accepts a measured Zs only up to 0.8 × the table value: 1.37 × 0.8 = 1.10 Ω. 1.30 Ω uses the 0.95 practical factor some testers apply instead; 1.37 Ω is the uncorrected table value; 1.44 Ω is the pre-Cmin figure from older editions.',
    reference: `${ZS_MCB('Type B, 32 A row')}; ${GN3_08}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 8,
    question:
      'A cold measurement gives Zs = 0.92 Ω on a circuit protected by a 20 A Type C circuit-breaker. Using the table value and Guidance Note 3\'s 0.8 factor, what do you conclude?',
    options: ['Above the 0.87 Ω site limit though below the 1.09 Ω table value — investigate', 'Below the 1.09 Ω table value, so the circuit passes without further checks', 'Above the 1.09 Ω table value, so the circuit fails outright', 'Below the 0.87 Ω site limit, so the circuit passes with margin to spare'],
    correctAnswer: 0,
    explanation:
      'Type C at 20 A is 1.09 Ω. The cold site limit is 1.09 × 0.8 = 0.87 Ω. A reading of 0.92 Ω sits between the two: it would pass at the printed value but the conductors were cold when you measured, so once warm the loop may exceed 1.09 Ω. That is a result to investigate, not to sign off.',
    reference: `${ZS_MCB('Type C, 20 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 9,
    question:
      'A 10 A Type B lighting circuit measures 4.50 Ω cold. Look up the table value and apply the 0.8 factor. What is the verdict?',
    options: ['Under the 4.37 Ω table value, so it passes on the printed figure alone', 'Above the 3.50 Ω site limit but under 4.37 Ω — investigate before signing', 'Under the 3.50 Ω site limit, so it passes with a comfortable margin in hand', 'Above the 4.37 Ω table value — it fails before the 0.8 factor is applied'],
    correctAnswer: 3,
    explanation:
      'Type B at 10 A is 4.37 Ω, and the cold site limit would be 4.37 × 0.8 = 3.50 Ω. A reading of 4.50 Ω is above even the uncorrected table value, so it fails outright — there is nothing to investigate. It is not under 4.37 Ω and nowhere near 3.50 Ω.',
    reference: `${ZS_MCB('Type B, 10 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 10,
    question:
      'A 40 A Type B circuit-breaker feeds a shower on a TN-C-S supply with Ze = 0.35 Ω. From the table value, how much loop impedance can the circuit conductors themselves add at operating temperature?',
    options: ['1.44 Ω', '0.52 Ω', '0.74 Ω', '1.02 Ω'],
    correctAnswer: 2,
    explanation:
      'Type B at 40 A is 1.09 Ω. Subtract Ze: 1.09 − 0.35 = 0.74 Ω is the most the hot (R1 + R2) may be. 1.02 Ω uses the 32 A row (1.37 Ω); 1.44 Ω adds Ze instead of subtracting it; 0.52 Ω uses the 50 A row (0.87 Ω).',
    reference: `${ZS_MCB('Type B, 40 A row, then minus Ze')}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 11,
    question:
      'A 63 A Type B circuit-breaker protects a sub-main to an outbuilding and needs 0.4 s disconnection. Find the maximum Zs.',
    options: ['0.35 Ω', '0.87 Ω', '0.69 Ω', '0.55 Ω'],
    correctAnswer: 2,
    explanation:
      'Type B at 63 A is 0.69 Ω. 0.87 Ω is the 50 A row, 0.55 Ω the 80 A row and 0.35 Ω the Type C 63 A value.',
    reference: ZS_MCB('Type B, 63 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 12,
    question:
      'A 6 A Type C circuit-breaker protects a control circuit on a TN-S supply with Ze = 0.80 Ω. How much loop impedance can the circuit add before the table limit is reached?',
    options: ['2.84 Ω', '6.48 Ω', '1.39 Ω', '4.44 Ω'],
    correctAnswer: 0,
    explanation:
      'Type C at 6 A is 3.64 Ω; 3.64 − 0.80 = 2.84 Ω of headroom. 6.48 Ω uses the Type B row (7.28 Ω); 1.39 Ω uses the Type C 10 A row (2.19 Ω); 4.44 Ω adds Ze instead of subtracting.',
    reference: `${ZS_MCB('Type C, 6 A row, then minus Ze')}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 13,
    question:
      'A 16 A Type D circuit-breaker protects a transformer circuit. What is the maximum Zs for 0.4 s?',
    options: ['0.68 Ω', '2.73 Ω', '0.34 Ω', '1.37 Ω'],
    correctAnswer: 0,
    explanation:
      'Type D at 16 A for 0.4 s is 0.68 Ω — a quarter of the Type B value (2.73 Ω), since Type D trips magnetically at twenty times its rating. 1.37 Ω is Type C at 16 A and 0.34 Ω is Type D at 32 A.',
    reference: ZS_MCB('Type D, 16 A row, 0.4 s'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 14,
    question:
      'A distribution circuit is protected by a 32 A Type D circuit-breaker and may disconnect in 5 s. What maximum Zs applies?',
    options: ['1.37 Ω', '1.09 Ω', '0.34 Ω', '0.68 Ω'],
    correctAnswer: 3,
    explanation:
      'Type D prints a separate 5 s row: 0.68 Ω for 32 A, double the 0.4 s figure of 0.34 Ω. It happens to match the Type C value because both use the ten-times-rating multiplier. Type B and C do not print a second row — one value serves both times. 1.37 Ω and 1.09 Ω are Type B at 32 A and 40 A — the wrong curve altogether.',
    reference: ZS_MCB('Type D, 32 A row, 5 s'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 15,
    question:
      'Reading down the Type B column, which rating first drops below 1.0 Ω?',
    options: ['63 A', '32 A', '40 A', '50 A'],
    correctAnswer: 3,
    explanation:
      'Type B reads 1.37 Ω at 32 A, 1.09 Ω at 40 A and 0.87 Ω at 50 A — so 50 A is the first rating under 1 Ω. Scanning a column for a threshold is a skill the table rewards. 63 A reads 0.69 Ω, already below the line.',
    reference: ZS_MCB('Type B column, 40 A and 50 A rows'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 16,
    question:
      'A 100 A main device could be Type B or Type C. Look up both rows. Which gives the tighter maximum Zs, and by how much?',
    options: ['Type C — 0.22 Ω against 0.44 Ω', 'Type B — 0.44 Ω against 0.55 Ω', 'Neither — 0.44 Ω for both', 'Type C — 0.35 Ω against 0.44 Ω'],
    correctAnswer: 0,
    explanation:
      'Type B at 100 A is 0.44 Ω and Type C at 100 A is 0.22 Ω — the Type C limit is half. 0.55 Ω is the Type B 80 A row and 0.35 Ω the Type B 125 A row, both the wrong rating.',
    reference: `${ZS_MCB('Type B and Type C, 100 A rows')}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 17,
    question:
      'A 32 A BS 88-2 fuse (system E or G) protects a cooker circuit requiring 0.4 s disconnection. Find the maximum Zs.',
    options: ['0.99 Ω', '0.75 Ω', '1.37 Ω', '1.29 Ω'],
    correctAnswer: 0,
    explanation:
      'Table 41.2 gives 0.99 Ω for a 32 A BS 88-2 fuse at 0.4 s. 1.29 Ω is the 25 A row, 0.75 Ω the 40 A row, and 1.37 Ω is the circuit-breaker table — a fuse and a breaker of the same rating do not share a value.',
    reference: ZS_FUSE('BS 88-2 fuse, 32 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 18,
    question:
      'A 16 A BS 88-2 fuse protects a radial. What is the maximum Zs for 0.4 s disconnection?',
    options: ['1.68 Ω', '2.73 Ω', '4.65 Ω', '2.43 Ω'],
    correctAnswer: 3,
    explanation:
      'BS 88-2 at 16 A is 2.43 Ω. 4.65 Ω is the 10 A row, 1.68 Ω the 20 A row, and 2.73 Ω is the Type B breaker value that a hurried look at the wrong table gives.',
    reference: ZS_FUSE('BS 88-2 fuse, 16 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 19,
    question:
      'An older board uses a 30 A BS 3036 semi-enclosed (rewirable) fuse on a ring final. Look up the maximum Zs for 0.4 s.',
    options: ['2.43 Ω', '1.68 Ω', '1.04 Ω', '0.56 Ω'],
    correctAnswer: 2,
    explanation:
      'BS 3036 at 30 A is 1.04 Ω. 1.68 Ω is the 20 A row, 2.43 Ω the 15 A row and 0.56 Ω the 45 A row. Rewirable fuses have their own column — the ratings run 5, 15, 20, 30, 45, 60 A.',
    reference: ZS_FUSE('BS 3036 fuse, 30 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 20,
    question:
      'A 13 A BS 1362 fuse in a fused connection unit protects a fixed appliance. What maximum Zs applies for 0.4 s?',
    options: ['15.6 Ω', '2.3 Ω', '3.64 Ω', '2.73 Ω'],
    correctAnswer: 1,
    explanation:
      'The BS 1362 column gives 2.3 Ω at 13 A. 15.6 Ω is the 3 A row of the same column, 3.64 Ω is the BS 1362 13 A value at 5 s, and 2.73 Ω is a Type B 16 A breaker.',
    reference: ZS_FUSE('BS 1362 fuse, 13 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 21,
    question:
      'A 63 A BS 88-2 fuse protects a distribution circuit that may disconnect in 5 s. Look up the maximum Zs.',
    options: ['0.78 Ω', '0.99 Ω', '0.55 Ω', '0.44 Ω'],
    correctAnswer: 0,
    explanation:
      'The 5 s table gives 0.78 Ω for a 63 A BS 88-2 fuse. 0.44 Ω is the same fuse at 0.4 s, 0.99 Ω is the 50 A row of the 5 s table and 0.55 Ω the 80 A row. Distribution circuits get the longer time, and the larger value.',
    reference: ZS_5S('BS 88-2 fuse, 63 A row'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 22,
    question:
      'A 100 A BS 88-2 fuse at the origin of a distribution circuit, 5 s disconnection permitted. Find the maximum Zs.',
    options: ['0.32 Ω', '0.44 Ω', '0.55 Ω', '0.42 Ω'],
    correctAnswer: 3,
    explanation:
      'The 5 s table gives 0.42 Ω for 100 A BS 88-2. 0.55 Ω is the 80 A row, 0.32 Ω the 125 A row and 0.44 Ω is the Type B 100 A breaker figure.',
    reference: ZS_5S('BS 88-2 fuse, 100 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 23,
    question:
      'A 30 mA RCD provides fault protection on a TT installation and the measured Zs is 210 Ω. What does Table 41.5 and its note tell you?',
    options: ['Under 1667 Ω, so it passes and there is nothing further to check on the electrode', 'Under 1667 Ω, but above the 200 Ω stability figure in Note 2 — check the electrode', 'Above 1667 Ω, so the RCD cannot be relied on for fault protection on this circuit', 'Under 500 Ω, the figure for a 100 mA device, so it passes on that row instead'],
    correctAnswer: 1,
    explanation:
      'Table 41.5 allows up to 1667 Ω for a 30 mA RCD (50 V ÷ 0.03 A), so 210 Ω satisfies the regulation. But Note 2 to the table says an electrode resistance above 200 Ω may not be stable as the soil dries or freezes, so 210 Ω is a prompt to improve the electrode. 500 Ω is the 100 mA row and does not apply.',
    reference: 'On-Site Guide Appendix B — BS 7671 Table 41.5, 30 mA row and Note 2',
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 24,
    question:
      'A TT installation\'s main RCD is changed from 30 mA to 100 mA. Look up both rows of Table 41.5. How does the maximum Zs change?',
    options: ['Falls from 1667 Ω to 500 Ω', 'Rises from 500 Ω to 1667 Ω', 'Falls from 1667 Ω to 167 Ω', 'Stays at 1667 Ω for both'],
    correctAnswer: 0,
    explanation:
      'Table 41.5 gives 1667 Ω for 30 mA and 500 Ω for 100 mA — a bigger trip current needs a lower loop to keep the touch voltage at 50 V. 167 Ω is the 300 mA row. The value does not stay the same, and it falls rather than rises.',
    reference: 'On-Site Guide Appendix B — BS 7671 Table 41.5, 30 mA and 100 mA rows',
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 25,
    question:
      'An old consumer unit has a 30 A BS 3871 Type 2 miniature circuit-breaker. Which On-Site Guide table gives its maximum Zs, and what is the value?',
    options: ['Table 41.3 — 1.37 Ω', 'Table B6 — 1.82 Ω', 'Table 41.3 — 0.68 Ω', 'Table B6 — 1.04 Ω'],
    correctAnswer: 3,
    explanation:
      'BS 3871 devices are a withdrawn standard and are not in BS 7671 Table 41.3 at all — the On-Site Guide keeps them in Table B6. The Type 2 row at 30 A reads 1.04 Ω. 1.82 Ω is the Type 1 30 A row. Substituting a Type B or C value is the classic error.',
    reference: 'On-Site Guide Table B6 — BS 3871 Type 2, 30 A row',
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 26,
    question: 'Look up the maximum Zs for a 45 A BS 3036 rewirable fuse at 0.4 s.',
    options: ['0.40 Ω', '0.57 Ω', '1.04 Ω', '0.56 Ω'],
    correctAnswer: 3,
    explanation:
      'BS 3036 at 45 A is 0.56 Ω. 1.04 Ω is the 30 A row and 0.40 Ω the 60 A row; 0.57 Ω is the BS 88-3 45 A value one column across.',
    reference: ZS_FUSE('BS 3036 fuse, 45 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 27,
    question:
      'A 20 A Type B circuit-breaker protects a radial and the measured cold Zs is 1.60 Ω. With Guidance Note 3\'s 0.8 factor, does it comply?',
    options: ['No — 1.60 Ω is above the 1.09 Ω table value', 'Yes — 1.60 Ω is below the 1.75 Ω site limit', 'Yes — 1.60 Ω is below the 2.19 Ω table value and no factor is needed', 'No — 1.60 Ω is above the 1.37 Ω site limit'],
    correctAnswer: 1,
    explanation:
      'Type B at 20 A is 2.19 Ω; × 0.8 gives a cold site limit of 1.75 Ω. 1.60 Ω is under that, so it complies with margin. 1.37 Ω and 1.09 Ω are the 32 A and 40 A rows — the wrong row, not the wrong method.',
    reference: `${ZS_MCB('Type B, 20 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 28,
    question:
      'For a 25 A Type B circuit-breaker, what is the maximum Zs and the cold site limit after Guidance Note 3\'s 0.8 factor?',
    options: ['1.75 Ω and 1.40 Ω', '2.19 Ω and 1.75 Ω', '1.37 Ω and 1.10 Ω', '1.75 Ω and 1.66 Ω'],
    correctAnswer: 0,
    explanation:
      'Type B at 25 A is 1.75 Ω, and 1.75 × 0.8 = 1.40 Ω. The 2.19/1.75 pair belongs to 20 A and the 1.37/1.10 pair to 32 A. 1.66 Ω would be the 0.95 practical factor, not the 0.8 that Guidance Note 3 Appendix 3 requires.',
    reference: `${ZS_MCB('Type B, 25 A row')}; ${GN3_08}`,
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 29,
    question:
      'A 50 A Type C circuit-breaker feeds a three-phase machine. Look up the maximum Zs.',
    options: ['0.55 Ω', '0.44 Ω', '0.35 Ω', '0.87 Ω'],
    correctAnswer: 1,
    explanation:
      'Type C at 50 A is 0.44 Ω. 0.87 Ω is the Type B 50 A value, 0.55 Ω the Type C 40 A row and 0.35 Ω the Type C 63 A row.',
    reference: ZS_MCB('Type C, 50 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 30,
    question:
      'A 20 A BS 88-3 (BS 1361 type) fuse in a switch-fuse protects a final circuit. Find the maximum Zs for 0.4 s.',
    options: ['1.68 Ω', '0.91 Ω', '2.30 Ω', '1.93 Ω'],
    correctAnswer: 3,
    explanation:
      'The BS 88-3 column gives 1.93 Ω at 20 A. 2.30 Ω is its 16 A row, 0.91 Ω its 32 A row, and 1.68 Ω is the 20 A value in the BS 88-2 column next door.',
    reference: ZS_FUSE('BS 88-3 fuse, 20 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// RATING FACTORS — Ca (4B1, 4B2), Cg (4C1), Ci (Appendix 4 §2.6) (ids 31–60)
// ═══════════════════════════════════════════════════════════════════════════
const RATING: Q[] = [
  {
    id: 31,
    question:
      '6 mm² flat twin and earth clipped direct (47 A) runs through a plant room at 40 °C. Look up Ca for 70 °C thermoplastic and give the corrected capacity.',
    options: ['42.8 A', '40.9 A', '44.2 A', '37.1 A'],
    correctAnswer: 1,
    explanation:
      'Ca at 40 °C for 70 °C thermoplastic is 0.87: 47 × 0.87 = 40.9 A. 44.2 A uses the 35 °C factor (0.94), 37.1 A the 45 °C factor (0.79), and 42.8 A the 90 °C thermosetting column (0.91).',
    reference: `${CA_REF('70 °C thermoplastic column, 40 °C row')}`,
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 32,
    question:
      'The same 40 °C plant room is wired in 90 °C thermosetting (XLPE) cable instead. What is Ca now?',
    options: ['0.87', '0.82', '0.91', '0.96'],
    correctAnswer: 2,
    explanation:
      'The 90 °C thermosetting column at 40 °C reads 0.91. Thermosetting insulation tolerates heat better, so it loses less capacity than the 0.87 for PVC. 0.96 is the 35 °C row and 0.82 the 50 °C row of the same column.',
    reference: CA_REF('90 °C thermosetting column, 40 °C row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 33,
    question:
      'A 32 A Type B circuit-breaker feeds a load in 4 mm² flat twin and earth clipped direct (37 A) through a loft at 45 °C. Look up Ca. Can the cable still carry the device rating?',
    options: ['Yes — 32.2 A, just over the 32 A device', 'Yes — 34.8 A, with margin over 32 A', 'No — 26.3 A, well under the 32 A device', 'No — 29.2 A, under the 32 A device'],
    correctAnswer: 3,
    explanation:
      'Ca at 45 °C for thermoplastic is 0.79: 37 × 0.79 = 29.2 A, under 32 A, so the cable is undersized for this loft. 32.2 A uses the 40 °C factor (0.87), 34.8 A the 35 °C factor (0.94), and 26.3 A the 50 °C factor (0.71).',
    reference: `${CA_REF('70 °C thermoplastic column, 45 °C row')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 34,
    question: 'Three circuits are bunched together in the same trunking. Look up the grouping factor Cg.',
    options: ['0.70', '0.60', '0.80', '0.65'],
    correctAnswer: 0,
    explanation:
      'Item 1 of the grouping table, bunched cables, gives 0.70 for three circuits. 0.80 is two circuits, 0.65 is four and 0.60 is five.',
    reference: CG_REF('item 1 (bunched), 3 circuits'),
    difficulty: 'basic',
    category: 'Rating factors',
  },
  {
    id: 35,
    question: 'Four multicore cables are clipped to a wall in a single layer, touching. What is Cg?',
    options: ['0.85', '0.65', '0.75', '0.79'],
    correctAnswer: 2,
    explanation:
      'Item 2, single layer on a wall or floor, gives 0.75 for four cables. 0.65 is the bunched figure for four — a common mistake is to use item 1 for every arrangement. 0.79 and 0.85 are the three-cable and two-cable rows of item 2.',
    reference: CG_REF('item 2 (single layer on wall), 4 cables'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 36,
    question:
      '2.5 mm² flat twin and earth clipped direct (27 A) passes through 100 mm of loft insulation, totally surrounded. Look up Ci. Can it still serve a 20 A radial?',
    options: ['Yes — 21.1 A, just over 20 A', 'No — 17.0 A, under 20 A', 'Yes — 23.8 A, with margin', 'No — 13.8 A, well under'],
    correctAnswer: 0,
    explanation:
      'Ci for 100 mm is 0.78: 27 × 0.78 = 21.1 A, which just clears 20 A. 17.0 A uses the 200 mm row (0.63), 23.8 A the 50 mm row (0.88), and 13.8 A the 400 mm row (0.51).',
    reference: `${CI_REF('100 mm row, applied to the Method C rating')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 37,
    question:
      'A cable is buried in insulation for 600 mm with no more precise information available. What factor applies to its Reference Method C rating?',
    options: ['0.63', '0.50', '0.55', '0.51'],
    correctAnswer: 1,
    explanation:
      'Regulation 523.9 sets the floor: for a length of 0.5 m or more the capacity is taken as 0.5 times the Method C rating. 0.51 is the 400 mm row, which the 600 mm case has passed. 0.63 is the 200 mm row; 0.55 is not a figure the table prints.',
    reference: CI_REF('0.5 m or more row, and Regulation 523.9'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 38,
    question:
      '2.5 mm² flat twin and earth is clipped direct (Method C, 27 A) and runs bunched with one other circuit in an ambient of 35 °C. Look up both factors and give the corrected capacity.',
    options: ['25.4 A', '27.0 A', '20.3 A', '21.6 A'],
    correctAnswer: 2,
    explanation:
      'Cg for two circuits bunched is 0.80 and Ca for 70 °C thermoplastic at 35 °C is 0.94. Iz = 27 × 0.80 × 0.94 = 20.3 A. 21.6 A applies only the grouping factor; 25.4 A applies only the temperature factor. 27.0 A applies neither factor.',
    reference: `${CG_REF('item 1, 2 circuits')}; ${CA_REF('35 °C row')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 39,
    question:
      'A cable route runs through a boiler room at 50 °C. Look up Ca for both insulation types. Which keeps more capacity, and by what factors?',
    options: ['Thermosetting — 0.87 against 0.79 for thermoplastic', 'Thermosetting — 0.82 against 0.71 for thermoplastic', 'Thermoplastic — 0.79 against 0.71 for thermosetting', 'Both the same — 0.71'],
    correctAnswer: 1,
    explanation:
      'At 50 °C the 90 °C thermosetting column reads 0.82 and the 70 °C thermoplastic column 0.71, so thermosetting keeps more. 0.79 is thermoplastic at 45 °C and 0.87 is thermosetting at 45 °C — the wrong row. The two columns are never the same above 30 °C.',
    reference: `${CA_REF('both columns, 50 °C row')}`,
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 40,
    question:
      'A cable runs through a cold store held at 25 °C. What Ca does the 70 °C thermoplastic column give?',
    options: ['1.00', '1.03', '0.94', '1.04'],
    correctAnswer: 1,
    explanation:
      'Below the 30 °C reference the factor rises: the 70 °C column reads 1.03 at 25 °C. 1.04 is the 90 °C thermosetting column at 25 °C, and 1.00 is the 30 °C reference row. A cooler ambient lets the cable carry slightly more. 0.94 is the 35 °C row — a derate in the wrong direction.',
    reference: CA_REF('70 °C thermoplastic column, 25 °C row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 41,
    question:
      'A 70 °C thermoplastic cable is proposed for a location at 65 °C. What does Table 4B1 say?',
    options: ['Ca = 0.50, carried forward from the 60 °C row', 'Ca = 0.65, read across from the 90 °C column', 'Ca = 0.35, found by extending the column down', 'No factor is printed — the column stops at 60 °C'],
    correctAnswer: 3,
    explanation:
      'The 70 °C thermoplastic column stops at 60 °C (0.50) and prints a dash above it — there is no published factor. 0.65 is the 90 °C thermosetting value at 65 °C; that cable type is the answer, not an invented factor for PVC. 0.35 is an extrapolation the table does not print.',
    reference: CA_REF('70 °C thermoplastic column, rows above 60 °C'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 42,
    question:
      'A 90 °C thermosetting cable runs where the ambient is 55 °C. Look up Ca.',
    options: ['0.76', '0.82', '0.61', '0.71'],
    correctAnswer: 0,
    explanation:
      'The 90 °C column at 55 °C is 0.76. 0.82 is the 50 °C row, 0.71 the 60 °C row and 0.61 is the 70 °C thermoplastic column at 55 °C.',
    reference: CA_REF('90 °C thermosetting column, 55 °C row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 43,
    question:
      'A 70 °C thermoplastic cable is buried where the soil temperature is 30 °C. Which table applies and what is the factor?',
    options: ['Table 4B1 — 0.94', 'Table 4B2 — 0.89', 'Table 4B1 — 1.00', 'Table 4B2 — 0.95'],
    correctAnswer: 1,
    explanation:
      'Buried cables use the soil temperature table, 4B2, whose reference is 20 °C — so 30 °C in the ground is a derate to 0.89. Table 4B1 is for air and would wrongly give 1.00 at 30 °C. 0.95 is the 4B2 row for 25 °C.',
    reference: 'On-Site Guide Appendix F — BS 7671 Table 4B2, 70 °C thermoplastic column, 30 °C row',
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 44,
    question:
      'A 40 A load must run in trunking with five other circuits at 30 °C. Look up Cg for six circuits. What minimum tabulated capacity must the cable have?',
    options: ['70.2 A', '66.7 A', '74.1 A', '61.5 A'],
    correctAnswer: 0,
    explanation:
      'Item 1, bunched, gives 0.57 for six circuits: required It = 40 ÷ 0.57 = 70.2 A. 66.7 A divides by the five-circuit factor (0.60), 74.1 A by the seven-circuit factor (0.54), and 61.5 A by the four-circuit factor (0.65).',
    reference: `${CG_REF('item 1 (bunched), 6 circuits, then In ÷ Cg')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 45,
    question:
      'Two 2.5 mm² flat twin and earth circuits share a length of trunking (Method B, 23 A each). Look up Cg. What can each carry?',
    options: ['19.6 A', '21.6 A', '16.1 A', '18.4 A'],
    correctAnswer: 3,
    explanation:
      'Cables in trunking are bunched, item 1: two circuits give 0.80, so 23 × 0.80 = 18.4 A. 19.6 A uses item 2 (0.85, single layer on a wall); 21.6 A uses the clipped-direct 27 A by mistake; 16.1 A uses the three-circuit factor (0.70).',
    reference: `${CG_REF('item 1 (bunched), 2 circuits')}`,
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 46,
    question:
      'Three multicore cables lie in a single layer on a perforated cable tray, touching. Look up Cg.',
    options: ['0.82', '0.88', '0.70', '0.79'],
    correctAnswer: 0,
    explanation:
      'Item 3, single layer on perforated tray, gives 0.82 for three cables. 0.79 is item 2 (on a wall), 0.70 is bunched, and 0.88 is the two-cable row of item 3.',
    reference: CG_REF('item 3 (single layer on perforated tray), 3 cables'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 47,
    question:
      'Four cables run in a single layer on cable ladder. What is Cg?',
    options: ['0.65', '0.75', '0.77', '0.80'],
    correctAnswer: 3,
    explanation:
      'Item 4, single layer on ladder or cleats, gives 0.80 for four cables — ladder gives the best airflow, so the least derating. 0.77 is item 3 (tray), 0.75 item 2 (wall) and 0.65 item 1 (bunched).',
    reference: CG_REF('item 4 (single layer on ladder), 4 cables'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 48,
    question:
      'Twelve circuits are bunched together behind a distribution board. Look up Cg.',
    options: ['0.50', '0.45', '0.41', '0.38'],
    correctAnswer: 1,
    explanation:
      'Item 1 at twelve circuits gives 0.45. 0.50 is the nine-circuit row, 0.41 is sixteen and 0.38 is twenty. Bunching this many nearly halves the capacity of every cable in the group.',
    reference: CG_REF('item 1 (bunched), 12 circuits'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 49,
    question:
      'Nine cables lie in a single layer on a wall. Look up Cg.',
    options: ['0.70', '0.72', '0.78', '0.50'],
    correctAnswer: 0,
    explanation:
      'Item 2 at nine cables gives 0.70 — and the item 2 column has levelled off by then, staying at 0.70 for twelve, sixteen and twenty. 0.50 is the bunched figure for nine; 0.72 is item 3 and 0.78 item 4.',
    reference: CG_REF('item 2 (single layer on wall), 9 cables'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 50,
    question:
      'A 4 mm² cable is totally surrounded by insulation for 50 mm where it passes through a wall. Look up Ci.',
    options: ['0.93', '0.63', '0.88', '0.78'],
    correctAnswer: 2,
    explanation:
      'The 50 mm row gives 0.88. 0.78 is the 100 mm row and 0.63 the 200 mm row; 0.93 is not in the table.',
    reference: CI_REF('50 mm row'),
    difficulty: 'basic',
    category: 'Rating factors',
  },
  {
    id: 51,
    question:
      'A cable is surrounded by loft insulation for 200 mm. What is Ci?',
    options: ['0.50', '0.78', '0.63', '0.51'],
    correctAnswer: 2,
    explanation:
      'The 200 mm row gives 0.63. 0.78 is 100 mm, 0.51 is 400 mm and 0.50 is the floor for 0.5 m or more.',
    reference: CI_REF('200 mm row'),
    difficulty: 'basic',
    category: 'Rating factors',
  },
  {
    id: 52,
    question:
      'A cable runs through 300 mm of insulation. The table prints 200 mm and 400 mm rows. Which factor do you use?',
    options: ['0.63 — round the length down to the 200 mm row', '0.51 — use the next tabulated length above, 400 mm', '0.57 — interpolate between the 200 mm and 400 mm rows', '0.50 — treat anything over 200 mm as 0.5 m or more'],
    correctAnswer: 1,
    explanation:
      'Between printed lengths, step down to the next tabulated factor rather than interpolating — the standard prints discrete values and a longer run in insulation can only be worse. 300 mm therefore takes the 400 mm row, 0.51. Rounding the length down to 200 mm would overstate the capacity. 0.63 is the 200 mm row and would overstate the capacity; 0.57 interpolates, which the standard never does; 0.50 is the floor for 0.5 m or more, which 300 mm has not reached.',
    reference: CI_REF('200 mm and 400 mm rows — step to the more onerous'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 53,
    question:
      'The thermal insulation table applies to conductors up to what size?',
    options: ['6 mm²', '10 mm²', '16 mm²', '4 mm²'],
    correctAnswer: 1,
    explanation:
      'The Ci table is for conductor sizes up to 10 mm² in insulation with a thermal conductivity greater than 0.04 W/m·K. Larger conductors run cooler for their load and are outside its scope. 6 mm² and 16 mm² are not the stated limit, and 4 mm² is well inside it.',
    reference: CI_REF('scope note at the head of the table'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 54,
    question:
      'A 4 mm² twin and earth (Method C, 37 A) is bunched with two other circuits in a 40 °C ceiling void. Look up both factors and give the corrected capacity.',
    options: ['32.2 A', '29.6 A', '22.5 A', '25.9 A'],
    correctAnswer: 2,
    explanation:
      'Three circuits bunched gives Cg = 0.70 and 70 °C thermoplastic at 40 °C gives Ca = 0.87. Iz = 37 × 0.70 × 0.87 = 22.5 A. 25.9 A applies only the grouping factor and 32.2 A only the temperature factor; 29.6 A uses the two-circuit factor by mistake.',
    reference: `${CG_REF('item 1, 3 circuits')}; ${CA_REF('40 °C row')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 55,
    question:
      'A 6 mm² cable clipped direct (47 A) runs alone but is totally surrounded by insulation for 100 mm. What is the corrected capacity?',
    options: ['47.0 A', '36.7 A', '41.4 A', '29.6 A'],
    correctAnswer: 1,
    explanation:
      'Ci for 100 mm is 0.78: 47 × 0.78 = 36.7 A. 41.4 A uses the 50 mm row (0.88), 29.6 A the 200 mm row (0.63). No grouping or temperature factor applies here. 47.0 A applies no factor at all.',
    reference: CI_REF('100 mm row, applied to the Method C rating'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 56,
    question:
      'A design needs a 32 A circuit. The cable runs bunched with three others (four in total) at 30 °C. What minimum tabulated capacity must the chosen cable have?',
    options: ['49.2 A', '45.7 A', '40.0 A', '53.3 A'],
    correctAnswer: 0,
    explanation:
      'Four circuits bunched gives Cg = 0.65; at 30 °C, Ca = 1.00. Required It = 32 ÷ 0.65 = 49.2 A. 45.7 A divides by the three-circuit factor and 53.3 A by the five-circuit one; 40.0 A divides by 0.80.',
    reference: CG_REF('item 1 (bunched), 4 circuits, then In ÷ Cg'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 57,
    question:
      'A 90 °C thermosetting cable runs at 70 °C ambient near an oven. Look up Ca.',
    options: ['0.58', '0.50', '0.41', '0.65'],
    correctAnswer: 0,
    explanation:
      'The 90 °C column at 70 °C reads 0.58. 0.65 is the 65 °C row, 0.50 the 75 °C row and 0.41 the 80 °C row. The 70 °C thermoplastic column has no value at all here.',
    reference: CA_REF('90 °C thermosetting column, 70 °C row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 58,
    question:
      'A 70 °C thermoplastic cable is at 55 °C ambient. Look up Ca.',
    options: ['0.50', '0.76', '0.71', '0.61'],
    correctAnswer: 3,
    explanation:
      'The 70 °C column at 55 °C is 0.61. 0.71 is the 50 °C row, 0.50 the 60 °C row and 0.76 the 90 °C column at 55 °C.',
    reference: CA_REF('70 °C thermoplastic column, 55 °C row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 59,
    question: 'Five circuits are bunched in a single conduit. What is Cg?',
    options: ['0.73', '0.65', '0.60', '0.57'],
    correctAnswer: 2,
    explanation:
      'Item 1 at five circuits gives 0.60. 0.65 is four, 0.57 is six, and 0.73 is item 2 (single layer on wall) for five cables.',
    reference: CG_REF('item 1 (bunched), 5 circuits'),
    difficulty: 'basic',
    category: 'Rating factors',
  },
  {
    id: 60,
    question:
      'Two circuits lie side by side in a single layer on a wall. Look up Cg.',
    options: ['0.80', '0.85', '0.88', '0.87'],
    correctAnswer: 1,
    explanation:
      'Item 2 at two cables gives 0.85. 0.80 is the bunched figure, 0.88 is item 3 (perforated tray) and 0.87 item 4 (ladder). The arrangement changes the answer as much as the count does.',
    reference: CG_REF('item 2 (single layer on wall), 2 cables'),
    difficulty: 'basic',
    category: 'Rating factors',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CABLE CAPACITY — Table 4D5 flat twin and earth, Table 4D2A multicore (ids 61–90)
// ═══════════════════════════════════════════════════════════════════════════
const CAPACITY: Q[] = [
  {
    id: 61,
    question:
      'A 2.5 mm² flat twin and earth radial clipped direct is protected by a 32 A Type B circuit-breaker. Does the table allow it?',
    options: ['Yes — 27 A is within a 32 A device', 'No — 23 A is under 32 A; 4 mm² at 30 A is needed', 'Yes — 37 A is over 32 A', 'No — 27 A is under 32 A; 4 mm² at 37 A is needed'],
    correctAnswer: 3,
    explanation:
      'Method C for 2.5 mm² is 27 A, less than the 32 A device, so the cable is not protected against overload. The next size, 4 mm², reads 37 A and is. The 23/30 pair is the Method B column, and 37 A belongs to 4 mm², not 2.5 mm².',
    reference: `${CCC_REF('2.5 mm² and 4 mm² rows, Reference Method C column')}`,
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 62,
    question:
      'A 9.5 kW shower at 230 V draws 41.3 A. Is 6 mm² flat twin and earth clipped direct enough, from the table?',
    options: ['No — 37 A against 41.3 A', 'Yes — 64 A against 41.3 A', 'Yes — 47 A against 41.3 A', 'No — 38 A against 41.3 A'],
    correctAnswer: 2,
    explanation:
      '6 mm² at Method C is 47 A, above 41.3 A, so it serves. 38 A is the 6 mm² Method B value, 37 A is the 4 mm² row and 64 A is 10 mm².',
    reference: `${CCC_REF('6 mm² row, Reference Method C column')}`,
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 63,
    question:
      '2.5 mm² flat twin and earth is run in conduit inside a thermally insulating wall (Reference Method A). Find its capacity.',
    options: ['17 A', '27 A', '23 A', '20 A'],
    correctAnswer: 3,
    explanation:
      'Method A for 2.5 mm² is 20 A — seven amps less than the same cable clipped direct. 23 A is Method B, 27 A is Method C and 17 A is Method 101.',
    reference: CCC_REF('2.5 mm² row, Reference Method A column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 64,
    question:
      '4 mm² flat twin and earth runs in surface trunking on a wall (Reference Method B). What is its capacity?',
    options: ['37 A', '30 A', '26 A', '22 A'],
    correctAnswer: 1,
    explanation:
      'Method B for 4 mm² reads 30 A. 37 A is clipped direct, 26 A is Method A and 22 A is Method 101.',
    reference: CCC_REF('4 mm² row, Reference Method B column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 65,
    question:
      '6 mm² flat twin and earth is clipped to a joist above a plasterboard ceiling with insulation not exceeding 100 mm on top of it (Method 100). Find its capacity.',
    options: ['38 A', '34 A', '27 A', '47 A'],
    correctAnswer: 1,
    explanation:
      'Method 100 for 6 mm² is 34 A. 47 A is clipped direct in free air, 38 A is Method B and 27 A is Method 101, where the insulation exceeds 100 mm.',
    reference: CCC_REF('6 mm² row, Method 100 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 66,
    question:
      'A 63 A sub-main is to run in flat twin and earth clipped direct. Does 10 mm² do it, and with what margin?',
    options: ['No — 52 A, which is 11 A short', 'No — 45 A, which is 18 A short', 'Yes — 64 A, a margin of just 1 A', 'Yes — 85 A, a margin of 22 A'],
    correctAnswer: 2,
    explanation:
      '10 mm² at Method C is 64 A: it clears 63 A by a single amp, so any rating factor at all would push it to 16 mm². 52 A is the 10 mm² Method B value, 85 A is 16 mm² and 45 A is 10 mm² at Method 100.',
    reference: `${CCC_REF('10 mm² row, Reference Method C column')}`,
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 67,
    question:
      '4 mm² flat twin and earth lies above a plasterboard ceiling under more than 100 mm of insulation (Method 101). What capacity does the table give?',
    options: ['30 A', '26 A', '27 A', '22 A'],
    correctAnswer: 3,
    explanation:
      'Method 101 for 4 mm² is 22 A. 27 A is Method 100 (insulation up to 100 mm), 26 A is Method A and 30 A is Method B. Deeper insulation, lower figure.',
    reference: CCC_REF('4 mm² row, Method 101 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 68,
    question:
      'A 40 A load is to be wired in flat twin and earth clipped direct with no other rating factors. Using the table, what is the smallest size that will carry it?',
    options: ['4.0 mm²', '6.0 mm²', '10.0 mm²', '2.5 mm²'],
    correctAnswer: 1,
    explanation:
      'Read down the Method C column: 4 mm² carries 37 A, which is short, and 6 mm² carries 47 A, which is the first size to clear 40 A. 10 mm² at 64 A would work but is not the smallest. In full: 2.5 mm² carries 27 A and 4.0 mm² carries 37 A, both short of 40 A; 6.0 mm² carries 47 A; 10.0 mm² at 64 A works but is not the smallest.',
    reference: CCC_REF('Reference Method C column, 4 mm² and 6 mm² rows'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 69,
    question:
      'A 16 A Type B radial for a fixed heater is wired in 1.5 mm² flat twin and earth clipped direct. Is the cable big enough?',
    options: ['No — 14.5 A against 16 A', 'No — 13 A against 16 A', 'Yes — 27 A against 16 A', 'Yes — 20 A against 16 A'],
    correctAnswer: 3,
    explanation:
      '1.5 mm² at Method C is 20 A, above 16 A, so it serves. 14.5 A is its Method A value, 13 A its Method 101 value and 27 A is the 2.5 mm² row.',
    reference: `${CCC_REF('1.5 mm² row, Reference Method C column')}`,
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 70,
    question:
      'A 10 A Type B lighting circuit in 1.0 mm² flat twin and earth is clipped direct (16 A) but passes through 200 mm of insulation, totally surrounded. Look up Ci. Is it still adequate?',
    options: ['Yes — 12.5 A, with margin', 'No — 8.0 A, under 10 A', 'Yes — 10.1 A, just over 10 A', 'No — 8.2 A, under 10 A'],
    correctAnswer: 2,
    explanation:
      'Ci for 200 mm is 0.63: 16 × 0.63 = 10.1 A, which only just covers the 10 A device. 8.2 A uses the 400 mm row (0.51), 12.5 A the 100 mm row (0.78), and 8.0 A is the 1.0 mm² Method 103 value.',
    reference: `${CI_REF('200 mm row, applied to the Method C rating')}`,
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 71,
    question:
      'An 80 A supply to an outbuilding is to run in flat twin and earth clipped direct. Reading down the table, what is the smallest size?',
    options: ['6 mm², at 47 A', '16 mm², at 85 A', '10 mm², at 64 A', '16 mm², at 69 A (Method B)'],
    correctAnswer: 1,
    explanation:
      'Method C reads 64 A for 10 mm² and 85 A for 16 mm², so 16 mm² is the first size to clear 80 A. 69 A is the 16 mm² Method B value and 47 A is 6 mm².',
    reference: `${CCC_REF('Reference Method C column, 10 mm² and 16 mm² rows')}`,
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 72,
    question:
      '2.5 mm² flat twin and earth runs inside an insulated stud wall, touching the inner wall surface (Method 102). Look up its capacity.',
    options: ['17 A', '21 A', '13.5 A', '27 A'],
    correctAnswer: 1,
    explanation:
      'Method 102 for 2.5 mm² is 21 A — the cable touching the plasterboard can shed heat into it. 13.5 A is Method 103 (not touching), 17 A is Method 101 and 27 A is clipped direct.',
    reference: CCC_REF('2.5 mm² row, Method 102 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 73,
    question:
      '2.5 mm² flat twin and earth runs inside an insulated stud wall without touching either surface (Method 103). What does the table give?',
    options: ['17 A', '13.5 A', '20 A', '21 A'],
    correctAnswer: 1,
    explanation:
      'Method 103 for 2.5 mm² is 13.5 A — the worst case in the table, fully surrounded and touching nothing. 21 A is Method 102, 17 A is Method 101 and 20 A is Method A.',
    reference: CCC_REF('2.5 mm² row, Method 103 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 74,
    question:
      '6 mm² flat twin and earth is in an insulated stud wall, not touching the inner surface (Method 103). Look up its capacity.',
    options: ['23.5 A', '32 A', '35 A', '27 A'],
    correctAnswer: 0,
    explanation:
      'Method 103 for 6 mm² is 23.5 A — exactly half its clipped-direct rating of 47 A. 35 A is Method 102, 27 A is Method 101 and 32 A is Method A.',
    reference: CCC_REF('6 mm² row, Method 103 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 75,
    question:
      'A 32 A radial is to be run in flat twin and earth inside an insulated stud wall, not touching either face (Method 103). What is the smallest size the table allows?',
    options: ['16 mm²', '4 mm²', '6 mm²', '10 mm²'],
    correctAnswer: 3,
    explanation:
      'Method 103 reads 18.5 A for 4 mm², 23.5 A for 6 mm² and 32 A for 10 mm² — so 10 mm² is the first size to reach 32 A. The same load clipped direct would need only 4 mm². 16 mm² at 42.5 A would also work but is not the smallest.',
    reference: CCC_REF('Method 103 column, 6 mm² and 10 mm² rows'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 76,
    question:
      'A 20 A radial is to be wired in flat twin and earth in conduit in a thermally insulating wall (Method A). Smallest size?',
    options: ['1.5 mm²', '2.5 mm²', '4 mm²', '6 mm²'],
    correctAnswer: 1,
    explanation:
      'Method A reads 14.5 A for 1.5 mm² and 20 A for 2.5 mm² — 2.5 mm² just meets 20 A. Any grouping or temperature factor would push it to 4 mm². 4 mm² and 6 mm² carry more than is needed.',
    reference: CCC_REF('Reference Method A column, 1.5 mm² and 2.5 mm² rows'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 77,
    question:
      'A 2.5 mm² 70 °C thermoplastic multicore cable (not flat twin and earth) is clipped direct, single-phase. Look up its capacity in the multicore table.',
    options: ['23 A', '18.5 A', '36 A', '27 A'],
    correctAnswer: 3,
    explanation:
      'Table 4D2A, Method C, single-phase, 2.5 mm² reads 27 A — the same as flat twin and earth at this size. 23 A is Method B, 18.5 A is Method A and 36 A is the 4 mm² row.',
    reference: MULTI_REF('2.5 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 78,
    question:
      'A 10 mm² 70 °C multicore cable in trunking (Method B) feeds a single-phase load. What capacity does the multicore table give?',
    options: ['63 A', '46 A', '43 A', '52 A'],
    correctAnswer: 3,
    explanation:
      'Table 4D2A, Method B, single-phase, 10 mm² reads 52 A. 43 A is Method A, 63 A is Method C and 46 A is the three-phase Method B value one column across.',
    reference: MULTI_REF('10 mm² row, Reference Method B, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 79,
    question:
      'A 4 mm² three-core 70 °C thermoplastic cable in conduit on a wall (Method B) supplies a three-phase load. Look up its capacity.',
    options: ['36 A', '30 A', '27 A', '23 A'],
    correctAnswer: 2,
    explanation:
      'Table 4D2A, Method B, three loaded conductors, 4 mm² reads 27 A. 30 A is the single-phase column for the same row — three loaded cores run warmer, so the figure is lower. 23 A is Method A three-phase and 36 A is Method C single-phase.',
    reference: MULTI_REF('4 mm² row, Reference Method B, three loaded conductors'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 80,
    question:
      'A 25 mm² 70 °C multicore cable is clipped direct, single-phase. Find its capacity.',
    options: ['90 A', '112 A', '138 A', '85 A'],
    correctAnswer: 1,
    explanation:
      'Table 4D2A, Method C, single-phase, 25 mm² is 112 A. 90 A is Method B, 138 A is the 35 mm² row and 85 A is 16 mm².',
    reference: MULTI_REF('25 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 81,
    question:
      'A 16 mm² 70 °C multicore cable in conduit in an insulating wall (Method A), single-phase. Look up its capacity.',
    options: ['57 A', '52 A', '85 A', '69 A'],
    correctAnswer: 0,
    explanation:
      'Table 4D2A, Method A, single-phase, 16 mm² is 57 A. 69 A is Method B, 85 A is Method C and 52 A is the three-phase Method A value.',
    reference: MULTI_REF('16 mm² row, Reference Method A, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 82,
    question:
      'Compare 4 mm² flat twin and earth clipped direct with the same size run in an insulated stud wall touching the inner face (Method 102). By how much does the capacity fall?',
    options: ['From 37 A to 30 A', 'From 47 A to 35 A', 'From 37 A to 27 A', 'From 37 A to 22 A'],
    correctAnswer: 2,
    explanation:
      '4 mm² reads 37 A at Method C and 27 A at Method 102. 22 A is Method 101 and 30 A is Method B; the 47/35 pair is the 6 mm² row.',
    reference: CCC_REF('4 mm² row, Method C and Method 102 columns'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 83,
    question: 'Look up the capacity of 10 mm² flat twin and earth in Method 100.',
    options: ['47 A', '52 A', '45 A', '36 A'],
    correctAnswer: 2,
    explanation:
      'Method 100 for 10 mm² is 45 A. 52 A is Method B, 36 A is Method 101 and 47 A is Method 102.',
    reference: CCC_REF('10 mm² row, Method 100 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 84,
    question: 'What is the Method A capacity of 6 mm² flat twin and earth?',
    options: ['38 A', '34 A', '32 A', '47 A'],
    correctAnswer: 2,
    explanation:
      'Method A for 6 mm² is 32 A. 38 A is Method B, 34 A is Method 100 and 47 A is Method C.',
    reference: CCC_REF('6 mm² row, Reference Method A column'),
    difficulty: 'basic',
    category: 'Cable capacity',
  },
  {
    id: 85,
    question:
      'A shower needs a 45 A circuit in flat twin and earth, run above a plasterboard ceiling under more than 100 mm of insulation (Method 101). Smallest size?',
    options: ['10 mm²', '16 mm²', '4 mm²', '6 mm²'],
    correctAnswer: 1,
    explanation:
      'Method 101 reads 27 A for 6 mm², 36 A for 10 mm² and 46 A for 16 mm² — only 16 mm² clears 45 A. Clipped direct the same load would fit in 6 mm² (47 A). The route decides the size.',
    reference: CCC_REF('Method 101 column, 10 mm² and 16 mm² rows'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 86,
    question: 'Look up the capacity of 1.5 mm² flat twin and earth in Method 103.',
    options: ['16 A', '14.5 A', '13 A', '10 A'],
    correctAnswer: 3,
    explanation:
      'Method 103 for 1.5 mm² is 10 A — half its clipped-direct rating. 13 A is Method 101, 16 A is Method 100 and 14.5 A is Method A.',
    reference: CCC_REF('1.5 mm² row, Method 103 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 87,
    question:
      'Which column of the flat twin and earth table gives the highest capacity for any given size?',
    options: ['Method 102', 'Reference Method C', 'Reference Method B', 'Method 100'],
    correctAnswer: 1,
    explanation:
      'Clipped direct (Method C) is the best case for flat cable, with the cable able to shed heat on all sides. Method B (trunking) and 100/102 (partly insulated) all read lower at every size. Flat twin and earth has no Method E column at all.',
    reference: CCC_REF('compare the columns for any row'),
    difficulty: 'basic',
    category: 'Cable capacity',
  },
  {
    id: 88,
    question:
      'A 6 mm² 70 °C multicore cable is clipped direct, single-phase. Look up its capacity in the multicore table.',
    options: ['46 A', '47 A', '38 A', '36 A'],
    correctAnswer: 0,
    explanation:
      'Table 4D2A, Method C, single-phase, 6 mm² reads 46 A — one amp under the flat twin and earth figure of 47 A, because the two tables are not the same. 38 A is Method B and 36 A is the 4 mm² row.',
    reference: MULTI_REF('6 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
  {
    id: 89,
    question:
      'A 1.5 mm² three-core 70 °C thermoplastic cable in conduit in an insulating wall (Method A) feeds a three-phase pump. Look up its capacity.',
    options: ['13 A', '16.5 A', '15 A', '14 A'],
    correctAnswer: 0,
    explanation:
      'Table 4D2A, Method A, three loaded conductors, 1.5 mm² is 13 A. 14 A is the single-phase column, 16.5 A is Method B single-phase and 15 A is Method B three-phase.',
    reference: MULTI_REF('1.5 mm² row, Reference Method A, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 90,
    question:
      '16 mm² flat twin and earth runs in an insulated stud wall touching the inner face (Method 102). What capacity applies?',
    options: ['46 A', '42.5 A', '57 A', '63 A'],
    correctAnswer: 3,
    explanation:
      'Method 102 for 16 mm² is 63 A. 57 A is Method 100 (and also Method A), 46 A is Method 101 and 42.5 A is Method 103.',
    reference: CCC_REF('16 mm² row, Method 102 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// VOLTAGE DROP — Table 4D5 mV/A/m and the Table 4Ab limits (ids 91–120)
// ═══════════════════════════════════════════════════════════════════════════
const VOLT_DROP: Q[] = [
  {
    id: 91,
    question:
      'A 2.5 mm² circuit at 20 A over 40 m drops 14.4 V, over the 11.5 V limit. Using the table, what does moving to 4 mm² give over the same run?',
    options: ['8.8 V — over the 6.9 V limit', '8.8 V — inside the 11.5 V limit', '14.4 V — still over the limit', '5.84 V — inside the limit'],
    correctAnswer: 1,
    explanation:
      '4 mm² is 11 mV/A/m: 11 × 20 × 40 ÷ 1000 = 8.8 V, inside the 11.5 V other-uses limit. 14.4 V is the 2.5 mm² figure unchanged; 5.84 V is what 6 mm² (7.3) would give; 6.9 V is the lighting limit and does not apply to a power circuit.',
    reference: `${VD_REF('4 mm² row, then 11 × 20 A × 40 m ÷ 1000, against Table 4Ab')}`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 92,
    question:
      'A 40 A load over 30 m: compare 6 mm² with 10 mm² using the table figures. How much does the larger cable save?',
    options: ['From 8.76 V to 5.28 V', 'From 8.76 V to 3.36 V', 'From 13.2 V to 8.76 V', 'From 8.76 V to 7.3 V'],
    correctAnswer: 0,
    explanation:
      '6 mm² is 7.3 mV/A/m: 7.3 × 40 × 30 ÷ 1000 = 8.76 V. 10 mm² is 4.4: 4.4 × 40 × 30 ÷ 1000 = 5.28 V. 3.36 V would be 16 mm² (2.8), 13.2 V is 4 mm² (11), and 7.3 V mistakes the mV/A/m figure for a drop.',
    reference: `${VD_REF('6 mm² and 10 mm² rows, same current and length')}`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 93,
    question:
      'A 2.5 mm² radial carries 20 A over a 25 m run. Using the table figure, what is the voltage drop?',
    options: ['9.0 V', '11.5 V', '18.0 V', '4.5 V'],
    correctAnswer: 0,
    explanation:
      'Volt drop = mV/A/m × current × length ÷ 1000 = 18 × 20 × 25 ÷ 1000 = 9.0 V. 4.5 V halves the length by mistake; 18.0 V doubles it. 11.5 V is the limit the drop is compared with, not the drop itself.',
    reference: VD_REF('2.5 mm² row, then 18 × 20 A × 25 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 94,
    question:
      'A 1.5 mm² lighting circuit carries 6 A over 30 m. What is the voltage drop from the table figure?',
    options: ['6.90 V', '8.70 V', '2.61 V', '5.22 V'],
    correctAnswer: 3,
    explanation:
      '1.5 mm² is 29 mV/A/m: 29 × 6 × 30 ÷ 1000 = 5.22 V. 6.90 V is the 3% lighting limit it is being compared with, not the drop itself. 2.61 V halves the length; 8.70 V uses 10 A instead of 6 A.',
    reference: VD_REF('1.5 mm² row, then 29 × 6 A × 30 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 95,
    question: 'On a 230 V public supply, look up the maximum permitted voltage drop for a lighting circuit.',
    options: ['9.2 V', '11.5 V', '6.9 V', '4.6 V'],
    correctAnswer: 2,
    explanation:
      'Table 4Ab allows 3% for lighting on a low voltage installation supplied directly from a public distribution system: 3% of 230 V is 6.9 V. Other uses are allowed 5%, which is 11.5 V. 4.6 V (2%) and 9.2 V (4%) are not limits the table gives.',
    reference: `${VD_LIMIT}, lighting row, public supply column`,
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 96,
    question:
      'A 4 mm² circuit carries 32 A to a power load. Using the table figure and the 5% limit (11.5 V), what is the longest run before the limit is reached?',
    options: ['About 20 m', 'About 32 m', 'About 49 m', 'About 82 m'],
    correctAnswer: 1,
    explanation:
      '4 mm² is 11 mV/A/m. Length = 11 500 ÷ (11 × 32) = 32.7 m, so about 32 m. 20 m applies the 6.9 V lighting limit to a power circuit by mistake; 49 m and 82 m use the 6 mm² and 10 mm² figures of 7.3 and 4.4 mV/A/m.',
    reference: VD_REF('4 mm² row, then 11.5 V ÷ (11 mV/A/m × 32 A)'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 97,
    question:
      'A 10 mm² sub-main carries 45 A over 40 m. Using the table figure, what is the drop and is it within the 5% limit?',
    options: ['7.9 V, over the 6.9 V limit', '15.8 V, over the 11.5 V limit', '3.96 V, within the 6.9 V limit', '7.9 V, within the 11.5 V limit'],
    correctAnswer: 3,
    explanation:
      '10 mm² is 4.4 mV/A/m: 4.4 × 45 × 40 ÷ 1000 = 7.92 V. A sub-main to power is an "other use", so the limit is 5% of 230 V, which is 11.5 V. The run passes. 15.8 V doubles the current, 3.96 V halves the length, and 6.9 V is the lighting limit, which a power sub-main does not use.',
    reference: VD_REF('10 mm² row, then 4.4 × 45 A × 40 m ÷ 1000, against Table 4Ab'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 98,
    question:
      'A 6 mm² shower circuit carries 40 A over 25 m. What voltage drop does the table figure give?',
    options: ['4.4 V', '14.6 V', '7.3 V', '11.0 V'],
    correctAnswer: 2,
    explanation:
      '6 mm² is 7.3 mV/A/m: 7.3 × 40 × 25 ÷ 1000 = 7.3 V. The 40 A and 25 m happen to multiply to 1000, so the drop equals the table figure — a useful sanity check. 11.0 V uses the 4 mm² figure, 4.4 V the 10 mm² figure, and 14.6 V doubles the length.',
    reference: VD_REF('6 mm² row, then 7.3 × 40 A × 25 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 99,
    question:
      'A 1.0 mm² lighting circuit carries 6 A. Using the table figure and the 6.9 V limit, what is the longest permitted run?',
    options: ['About 16 m', 'About 26 m', 'About 40 m', 'About 44 m'],
    correctAnswer: 1,
    explanation:
      '1.0 mm² is 44 mV/A/m. Length = 6900 ÷ (44 × 6) = 26.1 m. 40 m uses the 1.5 mm² figure (29), 44 m mistakes the mV/A/m figure for a length, and 16 m uses 10 A instead of 6 A.',
    reference: `${VD_REF('1.0 mm² row, then 6.9 V ÷ (44 mV/A/m × 6 A)')}`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 100,
    question:
      'A 16 mm² sub-main carries 100 A. Using the table figure and the 11.5 V limit, what is the longest permitted run?',
    options: ['About 41 m', 'About 26 m', 'About 66 m', 'About 25 m'],
    correctAnswer: 0,
    explanation:
      '16 mm² is 2.8 mV/A/m. Length = 11 500 ÷ (2.8 × 100) = 41.1 m. 26 m uses the 10 mm² figure (4.4), 66 m the 25 mm² figure (1.75), and 25 m applies the 6.9 V lighting limit.',
    reference: `${VD_REF('16 mm² row, then 11.5 V ÷ (2.8 mV/A/m × 100 A)')}`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 101,
    question:
      'On a 230 V public supply, what is the maximum permitted voltage drop for a socket-outlet circuit?',
    options: ['11.5 V', '13.8 V', '18.4 V', '6.9 V'],
    correctAnswer: 0,
    explanation:
      'Sockets are "other uses": 5% of 230 V is 11.5 V. 6.9 V is the lighting limit, and 13.8 V and 18.4 V are the 6% and 8% limits for a private supply.',
    reference: `${VD_LIMIT}, other uses row, public supply column`,
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 102,
    question:
      'An installation is fed from its own private LV generator. What voltage drop limits does Table 4Ab give?',
    options: ['4% lighting, 6% other uses', '5% lighting, 8% other uses', '6% lighting, 8% other uses', '3% lighting, 5% other uses'],
    correctAnswer: 2,
    explanation:
      'The second column of Table 4Ab, for a private LV supply, allows 6% for lighting and 8% for other uses — more than the 3% and 5% for a public supply, because the supply itself is not already at the limit.',
    reference: `${VD_LIMIT}, private LV supply column`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 103,
    question:
      'A 2.5 mm² circuit carries 16 A over 45 m. What is the drop, and does it pass for a socket circuit on a public supply?',
    options: ['12.96 V — fails the 6.9 V limit', '12.96 V — fails the 11.5 V limit', '12.96 V — passes the 13.8 V limit', '6.48 V — passes the 11.5 V limit'],
    correctAnswer: 1,
    explanation:
      '18 × 16 × 45 ÷ 1000 = 12.96 V, over the 11.5 V allowed for other uses on a public supply. 13.8 V is the private-supply lighting limit, which does not apply; 6.48 V halves the length.',
    reference: VD_REF('2.5 mm² row, then 18 × 16 A × 45 m ÷ 1000, against Table 4Ab'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 104,
    question:
      'A 1.5 mm² lighting circuit carries 5 A. Using the table figure and the 6.9 V limit, what is the longest permitted run?',
    options: ['About 48 m', 'About 79 m', 'About 40 m', 'About 24 m'],
    correctAnswer: 0,
    explanation:
      '1.5 mm² is 29 mV/A/m. Length = 6900 ÷ (29 × 5) = 47.6 m, so about 48 m. 79 m uses the 11.5 V power limit; 24 m halves the answer. 40 m uses 6 A instead of 5 A.',
    reference: VD_REF('1.5 mm² row, then 6.9 V ÷ (29 mV/A/m × 5 A)'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 105,
    question:
      'A 25 mm² sub-main carries 120 A over 45 m. Using the table figure, what is the drop and the verdict against the 5% limit?',
    options: ['15.1 V — over the 11.5 V limit', '6.75 V — within the 11.5 V limit', '9.45 V — over the 6.9 V limit', '9.45 V — within the 11.5 V limit'],
    correctAnswer: 3,
    explanation:
      '25 mm² is 1.75 mV/A/m: 1.75 × 120 × 45 ÷ 1000 = 9.45 V, inside 11.5 V. 15.1 V uses the 16 mm² figure (2.8), 6.75 V the 35 mm² figure (1.25), and 6.9 V is the lighting limit, which does not apply.',
    reference: `${VD_REF('25 mm² row, then 1.75 × 120 A × 45 m ÷ 1000, against Table 4Ab')}`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 106,
    question:
      'A 16 mm² sub-main carries 80 A over 50 m. What is the voltage drop from the table figure?',
    options: ['17.6 V', '7.0 V', '11.2 V', '5.6 V'],
    correctAnswer: 2,
    explanation:
      '16 mm² is 2.8 mV/A/m: 2.8 × 80 × 50 ÷ 1000 = 11.2 V — just inside the 11.5 V limit for other uses. 17.6 V uses the 10 mm² figure; 5.6 V halves the length. 7.0 V uses the 25 mm² figure of 1.75.',
    reference: VD_REF('16 mm² row, then 2.8 × 80 A × 50 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 107,
    question:
      'A 4 mm² cooker circuit carries 30 A over 18 m. Find the voltage drop.',
    options: ['11.9 V', '5.94 V', '9.72 V', '3.94 V'],
    correctAnswer: 1,
    explanation:
      '4 mm² is 11 mV/A/m: 11 × 30 × 18 ÷ 1000 = 5.94 V. 9.72 V uses the 2.5 mm² figure of 18; 3.94 V uses 7.3 from the 6 mm² row. 11.9 V doubles the answer.',
    reference: VD_REF('4 mm² row, then 11 × 30 A × 18 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 108,
    question:
      'Two runs are compared: 25 m of 2.5 mm² at 20 A, and 25 m of 4 mm² at 20 A. By how much does the larger cable reduce the drop?',
    options: ['From 9.0 V to 5.5 V', 'From 9.0 V to 3.65 V', 'From 14.5 V to 9.0 V', 'From 9.0 V to 7.3 V'],
    correctAnswer: 0,
    explanation:
      '2.5 mm²: 18 × 20 × 25 ÷ 1000 = 9.0 V. 4 mm²: 11 × 20 × 25 ÷ 1000 = 5.5 V. 3.65 V would be 6 mm² (7.3 mV/A/m). 14.5 V is what 1.5 mm² (29 mV/A/m) would give, and 7.3 V mistakes the 6 mm² mV/A/m figure for a drop.',
    reference: VD_REF('2.5 mm² and 4 mm² rows, same current and length'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 109,
    question:
      'A run of wiring is 140 m long. What does Table 4Ab allow on top of the percentage limit?',
    options: ['0.5% per metre beyond 100 m, with no cap on the total', 'Nothing — the percentage limits hold at any length', '0.005% per metre measured from the origin, no cap', '0.005% per metre beyond 100 m, capped at 0.5% in total'],
    correctAnswer: 3,
    explanation:
      'For wiring longer than 100 m the limit may be increased by 0.005% per metre beyond 100 m, but never by more than 0.5% in total. 40 m beyond 100 m gives 0.2% extra. The allowance starts at 100 m, not at the origin.',
    reference: `${VD_LIMIT}, note on runs over 100 m`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 110,
    question:
      'A 10 mm² circuit carries 50 A over 55 m on a public supply. Using the table figure, what is the drop and the verdict?',
    options: ['7.7 V — within the 11.5 V limit', '20.1 V — over the 11.5 V limit', '12.1 V — over the 11.5 V limit', '12.1 V — within the 13.8 V limit'],
    correctAnswer: 2,
    explanation:
      '10 mm² is 4.4 mV/A/m: 4.4 × 50 × 55 ÷ 1000 = 12.1 V, over the 11.5 V allowed for other uses on a public supply. 13.8 V is a private-supply limit and does not apply; 7.7 V uses the 16 mm² figure (2.8); 20.1 V uses the 6 mm² figure (7.3).',
    reference: `${VD_REF('10 mm² row, then 4.4 × 50 A × 55 m ÷ 1000, against Table 4Ab')}`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 111,
    question:
      'A 6 mm² circuit carries 32 A. Using the table figure and the 11.5 V limit, what is the longest permitted run?',
    options: ['About 39 m', 'About 49 m', 'About 30 m', 'About 82 m'],
    correctAnswer: 1,
    explanation:
      '6 mm² is 7.3 mV/A/m. Length = 11 500 ÷ (7.3 × 32) = 49.2 m. 30 m uses the 6.9 V lighting limit; 82 m uses the 10 mm² figure of 4.4 mV/A/m. 39 m uses 40 A instead of 32 A.',
    reference: VD_REF('6 mm² row, then 11.5 V ÷ (7.3 mV/A/m × 32 A)'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 112,
    question:
      'A 1.0 mm² lighting circuit carries 4 A over 35 m. What is the drop, and does it comply on a public supply?',
    options: ['6.16 V — passes the 6.9 V limit', '6.16 V — fails the 6.9 V limit', '4.06 V — passes the 6.9 V limit', '12.3 V — fails the 11.5 V limit'],
    correctAnswer: 0,
    explanation:
      '1.0 mm² is 44 mV/A/m: 44 × 4 × 35 ÷ 1000 = 6.16 V, inside the 6.9 V lighting limit with little to spare. 4.06 V uses the 1.5 mm² figure; 12.3 V doubles the current.',
    reference: VD_REF('1.0 mm² row, then 44 × 4 A × 35 m ÷ 1000, against Table 4Ab'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 113,
    question: 'What is the voltage drop figure for 4 mm² flat twin and earth?',
    options: ['11 mV/A/m', '7.3 mV/A/m', '4.61 mV/A/m', '18 mV/A/m'],
    correctAnswer: 0,
    explanation:
      '4 mm² reads 11 mV/A/m. 18 is 2.5 mm², 7.3 is 6 mm², and 4.61 is the 4 mm² conductor resistance in mΩ/m from Table I1.',
    reference: VD_REF('4 mm² row, voltage drop column'),
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 114,
    question:
      'A 2.5 mm² immersion heater circuit carries 13 A over 22 m. Find the voltage drop.',
    options: ['8.29 V', '2.57 V', '5.15 V', '3.15 V'],
    correctAnswer: 2,
    explanation:
      '18 × 13 × 22 ÷ 1000 = 5.15 V. 3.15 V uses the 4 mm² figure, 8.29 V the 1.5 mm² figure and 2.57 V halves the answer.',
    reference: VD_REF('2.5 mm² row, then 18 × 13 A × 22 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 115,
    question: 'Look up the voltage drop figure for 35 mm² flat twin and earth.',
    options: ['2.8 mV/A/m', '1.75 mV/A/m', '1.25 mV/A/m', '0.93 mV/A/m'],
    correctAnswer: 2,
    explanation: '35 mm² reads 1.25 mV/A/m. 1.75 is 25 mm², 0.93 is 50 mm² and 2.8 is 16 mm².',
    reference: VD_REF('35 mm² row, voltage drop column'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 116,
    question:
      'A 25 mm² sub-main carries 100 A over 60 m. What is the drop, and is it within 5%?',
    options: ['10.5 V — within 11.5 V', '10.5 V — over 6.9 V', '16.8 V — over 11.5 V', '7.5 V — within 11.5 V'],
    correctAnswer: 0,
    explanation:
      '25 mm² is 1.75 mV/A/m: 1.75 × 100 × 60 ÷ 1000 = 10.5 V, within the 11.5 V other-uses limit. 16.8 V uses the 16 mm² figure and 7.5 V the 35 mm² figure.',
    reference: VD_REF('25 mm² row, then 1.75 × 100 A × 60 m ÷ 1000, against Table 4Ab'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 117,
    question:
      'A 10 mm² circuit carries 63 A. Using the table figure and the 11.5 V limit, what is the longest permitted run?',
    options: ['About 25 m', 'About 65 m', 'About 33 m', 'About 41 m'],
    correctAnswer: 3,
    explanation:
      '10 mm² is 4.4 mV/A/m. Length = 11 500 ÷ (4.4 × 63) = 41.5 m. 25 m uses the 6.9 V lighting limit, 65 m the 16 mm² figure of 2.8, and 33 m uses 80 A instead of 63 A.',
    reference: VD_REF('10 mm² row, then 11.5 V ÷ (4.4 mV/A/m × 63 A)'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 118,
    question:
      'A lighting circuit in 1.5 mm² runs 60 m and carries 6 A. What do you conclude from the table figure?',
    options: ['5.22 V — passes the 6.9 V lighting limit', '10.44 V — passes the 13.8 V private limit', '10.44 V — fails the 6.9 V lighting limit', '10.44 V — passes the 11.5 V other-uses limit'],
    correctAnswer: 2,
    explanation:
      '29 × 6 × 60 ÷ 1000 = 10.44 V, well over the 6.9 V allowed for lighting on a public supply. The 11.5 V and 13.8 V figures belong to other uses and to private supplies. Going to 2.5 mm² (18 mV/A/m) brings it to 6.48 V. 5.22 V halves the length.',
    reference: VD_REF('1.5 mm² row, then 29 × 6 A × 60 m ÷ 1000, against Table 4Ab'),
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 119,
    question: 'Look up the voltage drop figure for 1.5 mm² flat twin and earth.',
    options: ['12.1 mV/A/m', '44 mV/A/m', '29 mV/A/m', '18 mV/A/m'],
    correctAnswer: 2,
    explanation:
      '1.5 mm² reads 29 mV/A/m. 44 is 1.0 mm², 18 is 2.5 mm², and 12.1 is the 1.5 mm² conductor resistance in mΩ/m from Table I1.',
    reference: VD_REF('1.5 mm² row, voltage drop column'),
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 120,
    question:
      'A 4 mm² circuit carries 25 A over 40 m to a workshop socket. Find the drop and the verdict on a public supply.',
    options: ['11.0 V — within the 11.5 V limit', '11.0 V — over the 6.9 V limit', '18.0 V — over the 11.5 V limit', '7.3 V — within the 11.5 V limit'],
    correctAnswer: 0,
    explanation:
      '11 × 25 × 40 ÷ 1000 = 11.0 V, just inside the 11.5 V other-uses limit. 18.0 V uses the 2.5 mm² figure and 7.3 V the 6 mm² figure; 6.9 V is the lighting limit and does not apply to sockets.',
    reference: VD_REF('4 mm² row, then 11 × 25 A × 40 m ÷ 1000, against Table 4Ab'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// CONDUCTOR RESISTANCE — OSG Table I1 mΩ/m at 20 °C, Table I3 (ids 121–150)
// ═══════════════════════════════════════════════════════════════════════════
const RESISTANCE: Q[] = [
  {
    id: 121,
    question:
      'A 2.5 mm² line conductor runs 48 m. Using Table I1, what is R1 alone at 20 °C?',
    options: ['0.581 Ω', '0.936 Ω', '0.221 Ω', '0.356 Ω'],
    correctAnswer: 3,
    explanation:
      '7.41 mΩ/m × 48 m ÷ 1000 = 0.356 Ω. 0.581 Ω uses the 1.5 mm² row (12.10), 0.936 Ω uses r1 + r2 for 2.5/1.5 (19.51), and 0.221 Ω uses the 4 mm² row (4.61).',
    reference: `${I1_REF('2.5 mm² row, × 48 m ÷ 1000')}`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 122,
    question:
      'A 1.5 mm² circuit protective conductor runs 52 m. Using Table I1, what is R2 alone at 20 °C?',
    options: ['1.015 Ω', '0.941 Ω', '0.629 Ω', '0.385 Ω'],
    correctAnswer: 2,
    explanation:
      '12.10 mΩ/m × 52 m ÷ 1000 = 0.629 Ω. 0.385 Ω uses the 2.5 mm² row (7.41), 1.015 Ω uses r1 + r2 (19.51), and 0.941 Ω uses the 1.0 mm² row (18.10).',
    reference: `${I1_REF('1.5 mm² row, × 52 m ÷ 1000')}`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 123,
    question:
      'A ring final is wired in 2.5 mm² flat twin and earth with a 1.5 mm² cpc. Look up the combined (r1 + r2) figure per metre at 20 °C.',
    options: ['30.20 mΩ/m', '12.10 mΩ/m', '19.51 mΩ/m', '16.71 mΩ/m'],
    correctAnswer: 2,
    explanation:
      'Add the two rows: 7.41 (2.5 mm²) + 12.10 (1.5 mm²) = 19.51 mΩ/m. 16.71 is the 4/1.5 combination and 30.20 is 1.5/1.0.',
    reference: I1_REF('2.5 mm² row plus 1.5 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 124,
    question:
      'A cooker circuit is wired in 4 mm² flat twin and earth with a 1.5 mm² cpc. What is (r1 + r2) per metre at 20 °C?',
    options: ['19.51 mΩ/m', '10.49 mΩ/m', '16.71 mΩ/m', '12.10 mΩ/m'],
    correctAnswer: 2,
    explanation: '4.61 (4 mm²) + 12.10 (1.5 mm²) = 16.71 mΩ/m. 10.49 is the 6/2.5 combination. 19.51 is the 2.5/1.5 combination and 12.10 is the cpc row alone.',
    reference: I1_REF('4 mm² row plus 1.5 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 125,
    question:
      'A 30 m radial in 2.5/1.5 mm² flat twin and earth is tested cold. What (R1 + R2) should you expect at 20 °C?',
    options: ['0.585 Ω', '0.702 Ω', '0.363 Ω', '0.222 Ω'],
    correctAnswer: 0,
    explanation:
      '19.51 mΩ/m × 30 m ÷ 1000 = 0.585 Ω. 0.702 Ω is that figure after the 1.20 correction to 70 °C, which does not apply to a cold reading; 0.222 Ω uses the 2.5 mm² row alone. 0.363 Ω uses the 1.5 mm² cpc alone.',
    reference: I1_REF('2.5 mm² plus 1.5 mm² rows, × 30 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 126,
    question:
      'The same 30 m circuit gives (R1 + R2) = 0.585 Ω at 20 °C. Using the multiplier for 70 °C thermoplastic conductors, what is the value at operating temperature?',
    options: ['0.75 Ω', '0.49 Ω', '0.585 Ω', '0.70 Ω'],
    correctAnswer: 3,
    explanation:
      'The multiplier from 20 °C to 70 °C for thermoplastic insulated copper is 1.20: 0.585 × 1.20 = 0.70 Ω. 0.75 Ω would use the 1.28 factor, which belongs to 90 °C thermosetting cable. 0.585 Ω is the cold value left uncorrected; 0.49 Ω divides by 1.20 instead of multiplying.',
    reference: `${I3_REF} — 70 °C thermoplastic row (1.20)`,
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 127,
    question:
      'A shower is wired in 6 mm² flat twin and earth with a 2.5 mm² cpc. Look up (r1 + r2) per metre at 20 °C.',
    options: ['4.61 mΩ/m', '10.49 mΩ/m', '7.41 mΩ/m', '3.08 mΩ/m'],
    correctAnswer: 1,
    explanation: '3.08 (6 mm²) + 7.41 (2.5 mm²) = 10.49 mΩ/m. 3.08 alone is the line conductor and 7.41 alone is the cpc. 4.61 is the 4 mm² row, the wrong size.',
    reference: I1_REF('6 mm² row plus 2.5 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 128,
    question:
      'A 32 A Type B RCBO protects a 40 m radial in 4/1.5 mm² flat twin and earth. Ze is 0.35 Ω. Using Table I1, the 1.20 multiplier and the maximum Zs table, what is the design Zs and does it comply?',
    options: ['1.15 Ω — passes against 1.37 Ω', '1.02 Ω — passes against 1.37 Ω', '1.15 Ω — fails against 1.10 Ω', '1.44 Ω — fails against 1.37 Ω'],
    correctAnswer: 0,
    explanation:
      '(r1 + r2) = 16.71 mΩ/m × 40 m ÷ 1000 = 0.668 Ω cold; × 1.20 = 0.802 Ω at 70 °C. Zs = 0.35 + 0.802 = 1.15 Ω, under the Type B 32 A maximum of 1.37 Ω, so the design passes. 1.02 Ω omits the 1.20 factor; 1.44 Ω divides by the 0.8 factor, which belongs to measured values, not designs; 1.10 Ω is the site limit for a cold measurement, not the design limit — Cmin is already inside the 1.37 Ω.',
    reference: `${I1_REF('4 mm² plus 1.5 mm² rows')}; Table I3 (× 1.20); ${ZS_MCB('Type B, 32 A row')}`,
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 129,
    question:
      'A lighting circuit is wired in 1.0 mm² flat twin and earth with a 1.0 mm² cpc over 20 m. Using Table I1, what (R1 + R2) do you expect cold?',
    options: ['0.362 Ω', '0.604 Ω', '0.869 Ω', '0.724 Ω'],
    correctAnswer: 3,
    explanation:
      'Equal sizes, so double the row: 18.10 × 2 = 36.20 mΩ/m; × 20 ÷ 1000 = 0.724 Ω. 0.362 Ω is one conductor only, 0.604 Ω uses 1.5/1.0 (30.20), and 0.869 Ω is the hot figure after × 1.20.',
    reference: `${I1_REF('1.0 mm² row, twice, × 20 m ÷ 1000')}`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 130,
    question:
      'A shower circuit in 6 mm² flat twin and earth with a 2.5 mm² cpc runs 28 m. Using Tables I1 and I3, what is (R1 + R2) at 70 °C?',
    options: ['0.376 Ω', '0.103 Ω', '0.352 Ω', '0.294 Ω'],
    correctAnswer: 2,
    explanation:
      '10.49 mΩ/m × 28 m ÷ 1000 = 0.294 Ω cold; × 1.20 = 0.352 Ω at 70 °C. 0.294 Ω is the cold value left uncorrected, 0.376 Ω uses the 1.28 thermosetting multiplier, and 0.103 Ω corrects the 6 mm² line alone.',
    reference: `${I1_REF('6 mm² plus 2.5 mm² rows')}; ${I3_REF} (× 1.20)`,
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 131,
    question:
      'A 10 mm² circuit with a 4 mm² cpc runs 40 m. Using Table I1, what cold (R1 + R2) do you expect?',
    options: ['0.196 Ω', '0.258 Ω', '0.073 Ω', '0.184 Ω'],
    correctAnswer: 1,
    explanation:
      '1.83 + 4.61 = 6.44 mΩ/m; × 40 ÷ 1000 = 0.258 Ω. 0.073 Ω is the 10 mm² line alone, 0.184 Ω the 4 mm² cpc alone, and 0.196 Ω pairs 10 mm² with a 6 mm² cpc (4.91).',
    reference: `${I1_REF('10 mm² plus 4 mm² rows, × 40 m ÷ 1000')}`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 132,
    question:
      'A 16 mm² sub-main with a 10 mm² cpc runs 60 m. Using Table I1, what cold (R1 + R2) do you expect?',
    options: ['0.179 Ω', '0.069 Ω', '0.110 Ω', '0.254 Ω'],
    correctAnswer: 0,
    explanation:
      '1.15 + 1.83 = 2.98 mΩ/m; × 60 ÷ 1000 = 0.179 Ω. 0.069 Ω is the 16 mm² line alone, 0.110 Ω the 10 mm² cpc alone, and 0.254 Ω pairs 16 mm² with a 6 mm² cpc (4.23).',
    reference: `${I1_REF('16 mm² plus 10 mm² rows, × 60 m ÷ 1000')}`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 133,
    question:
      'A lighting circuit is wired in 1.5 mm² flat twin and earth with a 1.0 mm² cpc. Look up (r1 + r2) per metre at 20 °C.',
    options: ['30.20 mΩ/m', '19.51 mΩ/m', '36.20 mΩ/m', '24.20 mΩ/m'],
    correctAnswer: 0,
    explanation:
      '12.10 (1.5 mm²) + 18.10 (1.0 mm²) = 30.20 mΩ/m. 24.20 doubles the 1.5 mm² figure as if the cpc were the same size; 36.20 is 1.0/1.0 and 19.51 is 2.5/1.5.',
    reference: I1_REF('1.5 mm² row plus 1.0 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 134,
    question:
      'A 10 mm² shower circuit has a 4 mm² cpc. Look up (r1 + r2) per metre at 20 °C.',
    options: ['3.66 mΩ/m', '10.49 mΩ/m', '6.44 mΩ/m', '4.91 mΩ/m'],
    correctAnswer: 2,
    explanation:
      '1.83 (10 mm²) + 4.61 (4 mm²) = 6.44 mΩ/m. 4.91 pairs 10 mm² with a 6 mm² cpc; 3.66 doubles the 10 mm² figure; 10.49 is 6/2.5.',
    reference: I1_REF('10 mm² row plus 4 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 135,
    question:
      'A 25 m lighting radial in 1.5/1.0 mm² is tested cold. What (R1 + R2) do you expect?',
    options: ['0.453 Ω', '0.755 Ω', '0.605 Ω', '0.906 Ω'],
    correctAnswer: 1,
    explanation:
      '30.20 mΩ/m × 25 m ÷ 1000 = 0.755 Ω. 0.605 Ω doubles the 1.5 mm² figure; 0.906 Ω is the cold value after the 1.20 factor, which a cold test does not need. 0.453 Ω uses the 1.0 mm² cpc alone.',
    reference: I1_REF('1.5 mm² plus 1.0 mm² rows, × 25 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 136,
    question:
      'A 45 m circuit in 6/2.5 mm² flat twin and earth: what (R1 + R2) do you expect at 20 °C?',
    options: ['0.472 Ω', '0.333 Ω', '0.139 Ω', '0.566 Ω'],
    correctAnswer: 0,
    explanation:
      '10.49 mΩ/m × 45 m ÷ 1000 = 0.472 Ω. 0.333 Ω uses the 2.5 mm² cpc alone; 0.139 Ω uses the 6 mm² line alone; 0.566 Ω is the hot figure after × 1.20.',
    reference: I1_REF('6 mm² plus 2.5 mm² rows, × 45 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 137,
    question:
      'A measured cold (R1 + R2) of 0.60 Ω on 2.5/1.5 mm² cable suggests roughly what circuit length?',
    options: ['About 81 m', 'About 50 m', 'About 16 m', 'About 31 m'],
    correctAnswer: 3,
    explanation:
      '0.60 Ω ÷ 19.51 mΩ/m = 30.8 m. 81 m divides by the 2.5 mm² figure alone and 50 m by the 1.5 mm² figure alone. Working backwards from a reading to a length is how you spot a run that is longer than the drawing says. 16 m halves the answer.',
    reference: I1_REF('2.5 mm² plus 1.5 mm² rows, then R ÷ (r1 + r2)'),
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 138,
    question:
      'Which multiplier does Table I3 give for a 90 °C thermosetting conductor from 20 °C to its operating temperature?',
    options: ['1.04', '1.16', '1.20', '1.28'],
    correctAnswer: 3,
    explanation:
      '90 °C thermosetting insulation takes 1.28; 70 °C thermoplastic takes 1.20. Using 1.20 on a thermosetting cable understates the hot resistance. 1.04 is an ambient rating factor from Table 4B1, not a resistance multiplier; 1.16 is not printed anywhere.',
    reference: `${I3_REF} — 90 °C thermosetting row`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 139,
    question:
      'A 16 A Type B MCB protects a 50 m radial in 1.5/1.0 mm² flat twin and earth on a TN-S supply with Ze = 0.80 Ω. Using Table I1, × 1.20, and the Zs table, does the design pass?',
    options: ['1.81 Ω — passes against 2.73 Ω', '2.61 Ω — passes against 2.73 Ω', '2.31 Ω — passes against 2.73 Ω', '2.61 Ω — fails against 2.19 Ω'],
    correctAnswer: 1,
    explanation:
      '(r1 + r2) = 30.20 × 50 ÷ 1000 = 1.51 Ω cold; × 1.20 = 1.81 Ω hot. Zs = 0.80 + 1.81 = 2.61 Ω, under the Type B 16 A maximum of 2.73 Ω — it passes, with only 0.12 Ω in hand. 2.31 Ω forgets the 1.20 factor; 2.19 Ω is the 20 A row.',
    reference: `${I1_REF('1.5 mm² plus 1.0 mm² rows')}; Table I3 (× 1.20); ${ZS_MCB('Type B, 16 A row')}`,
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 140,
    question: 'Look up the resistance of a 4 mm² copper conductor at 20 °C.',
    options: ['7.41 mΩ/m', '4.61 mΩ/m', '3.08 mΩ/m', '11 mΩ/m'],
    correctAnswer: 1,
    explanation:
      '4 mm² is 4.61 mΩ/m. 7.41 is 2.5 mm², 3.08 is 6 mm², and 11 is the 4 mm² voltage drop figure in mV/A/m from the cable table.',
    reference: I1_REF('4 mm² row'),
    difficulty: 'basic',
    category: 'Conductor resistance',
  },
  {
    id: 141,
    question: 'What is the resistance per metre of a 25 mm² copper conductor at 20 °C?',
    options: ['0.727 mΩ/m', '0.524 mΩ/m', '0.387 mΩ/m', '1.15 mΩ/m'],
    correctAnswer: 0,
    explanation: '25 mm² is 0.727 mΩ/m. 1.15 is 16 mm², 0.524 is 35 mm² and 0.387 is 50 mm².',
    reference: I1_REF('25 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 142,
    question:
      'A 16 mm² sub-main with a 6 mm² cpc runs 35 m. What (R1 + R2) do you expect at 20 °C?',
    options: ['0.108 Ω', '0.178 Ω', '0.148 Ω', '0.040 Ω'],
    correctAnswer: 2,
    explanation:
      '1.15 + 3.08 = 4.23 mΩ/m; × 35 ÷ 1000 = 0.148 Ω. 0.040 Ω uses the 16 mm² line alone and 0.108 Ω the 6 mm² cpc alone; 0.178 Ω is the hot figure after × 1.20.',
    reference: I1_REF('16 mm² plus 6 mm² rows, × 35 m ÷ 1000'),
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 143,
    question:
      'A 2.5 mm² conductor at 20 °C reads 7.41 mΩ/m. Using Table I3, what is it at 70 °C?',
    options: ['6.18 mΩ/m', '8.89 mΩ/m', '9.48 mΩ/m', '7.41 mΩ/m'],
    correctAnswer: 1,
    explanation:
      '7.41 × 1.20 = 8.89 mΩ/m. 9.48 uses the 1.28 thermosetting factor; 6.18 divides instead of multiplying.',
    reference: `${I1_REF('2.5 mm² row')}; ${I3_REF} (× 1.20)`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 144,
    question:
      'A ring final in 2.5/1.5 mm² is 60 m end to end. What end-to-end resistance of the line conductor (r1) do you expect at 20 °C?',
    options: ['0.445 Ω', '0.726 Ω', '1.171 Ω', '0.222 Ω'],
    correctAnswer: 0,
    explanation:
      'r1 end to end = 7.41 mΩ/m × 60 m ÷ 1000 = 0.445 Ω. 0.726 Ω is the cpc (12.10 × 60), 1.171 Ω is r1 + r2 end to end, and 0.222 Ω halves the length.',
    reference: I1_REF('2.5 mm² row, × 60 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 145,
    question:
      'For the same 60 m ring, what end-to-end resistance of the cpc (r2) do you expect?',
    options: ['0.726 Ω', '1.171 Ω', '0.363 Ω', '0.445 Ω'],
    correctAnswer: 0,
    explanation:
      'r2 end to end = 12.10 mΩ/m × 60 m ÷ 1000 = 0.726 Ω. 0.445 Ω is r1, and the ratio r2/r1 of about 1.6 is the tell-tale of a 2.5/1.5 cable when you check a ring. 1.171 Ω is r1 + r2 together, and 0.363 Ω halves r2.',
    reference: I1_REF('1.5 mm² row, × 60 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 146,
    question:
      'A 4 mm² line conductor with a 4 mm² cpc (singles in conduit). Look up (r1 + r2) per metre at 20 °C.',
    options: ['16.71 mΩ/m', '14.82 mΩ/m', '9.22 mΩ/m', '4.61 mΩ/m'],
    correctAnswer: 2,
    explanation:
      'With equal sizes, double the row: 4.61 × 2 = 9.22 mΩ/m. 16.71 pairs 4 mm² with a 1.5 mm² cpc (the flat cable figure), and 14.82 doubles the 2.5 mm² row.',
    reference: I1_REF('4 mm² row, twice'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 147,
    question:
      'A 20 A Type B MCB protects a 35 m radial in 2.5/1.5 mm² on a TN-C-S supply with Ze = 0.35 Ω. Using Table I1 and × 1.20, what is the design Zs?',
    options: ['1.46 Ω', '1.17 Ω', '1.03 Ω', '0.82 Ω'],
    correctAnswer: 1,
    explanation:
      '19.51 × 35 ÷ 1000 = 0.683 Ω; × 1.20 = 0.819 Ω; + 0.35 = 1.17 Ω. 1.03 Ω omits the 1.20 factor, 0.82 Ω omits Ze, and 1.46 Ω divides by the 0.8 measured-value factor, which a design does not use. Against the Type B 20 A limit of 2.19 Ω it passes comfortably.',
    reference: `${I1_REF('2.5 mm² plus 1.5 mm² rows')}; Table I3 (× 1.20); Ze added`,
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 148,
    question: 'What is the resistance per metre of a 35 mm² copper conductor at 20 °C?',
    options: ['0.727 mΩ/m', '0.524 mΩ/m', '0.387 mΩ/m', '1.25 mΩ/m'],
    correctAnswer: 1,
    explanation:
      '35 mm² is 0.524 mΩ/m. 0.727 is 25 mm² and 0.387 is 50 mm²; 1.25 is the 35 mm² voltage drop figure in mV/A/m.',
    reference: I1_REF('35 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 149,
    question:
      'A 6 mm² line conductor with a 6 mm² cpc runs 20 m. What (R1 + R2) do you expect at 20 °C?',
    options: ['0.062 Ω', '0.210 Ω', '0.148 Ω', '0.123 Ω'],
    correctAnswer: 3,
    explanation:
      '3.08 × 2 = 6.16 mΩ/m; × 20 ÷ 1000 = 0.123 Ω. 0.062 Ω is one conductor only; 0.210 Ω pairs 6 mm² with a 2.5 mm² cpc; 0.148 Ω is the hot figure.',
    reference: I1_REF('6 mm² row, twice, × 20 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 150,
    question:
      'You expect (R1 + R2) = 0.585 Ω cold on a 30 m 2.5/1.5 mm² radial but measure 0.95 Ω. What does Table I1 tell you?',
    options: ['It matches the hot value of 0.70 Ω, so the circuit is sound', 'The cable must be 1.5/1.0 mm², which gives 0.906 Ω for 30 m', 'Far above the expected 0.585 Ω — suspect a joint or a longer route', 'Within tolerance of the expected 0.585 Ω — record it and move on'],
    correctAnswer: 2,
    explanation:
      'A 30 m run of 2.5/1.5 mm² should read about 0.585 Ω. 0.95 Ω is more than 60% high — well outside the usual ±10% working band — so either the run is much longer than believed or a joint is poor. The hot value would only be 0.70 Ω, so that does not explain it either.',
    reference: I1_REF('2.5 mm² plus 1.5 mm² rows, × 30 m, compared with the reading'),
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// DEMAND AND DIVERSITY — OSG Appendix A, Table A2 (ids 151–175)
// ═══════════════════════════════════════════════════════════════════════════
const DIVERSITY: Q[] = [
  {
    id: 151,
    question:
      'A house has three lighting circuits with current demands of 6 A, 5 A and 4 A. Apply the Table A2 household allowance for lighting.',
    options: ['15 A', '9.9 A', '13.5 A', '11.25 A'],
    correctAnswer: 1,
    explanation:
      'Row 1, household: 66% of total current demand. 0.66 × 15 = 9.9 A. 13.5 A uses the shops column (90%), 11.25 A the hotels column (75%), and 15 A applies no diversity.',
    reference: `${A2_REF('row 1 (lighting), individual household column')}`,
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 152,
    question: 'Look up the household allowance for cooking appliances in Table A2.',
    options: ['Ten amps plus 30% of the load above 10 A, plus 5 A if the unit has a socket', '100% of the largest appliance plus 80% of the second plus 60% of the rest', '100% of the total demand up to 10 A plus 50% of any demand above 10 A', '100% of the largest appliance plus 100% of the second plus 25% of the rest'],
    correctAnswer: 0,
    explanation:
      'Row 3, household column: 10 A + 30% of the connected cooking load in excess of 10 A + 5 A if a socket-outlet is incorporated in the control unit. The 100/80/60 rule is the shops and hotels column of the same row; the 10 A + 50% rule is row 2, heating and power.',
    reference: A2_REF('row 3 (cooking appliances), individual household column'),
    difficulty: 'basic',
    category: 'Demand and diversity',
  },
  {
    id: 153,
    question: 'A house has two thermostatically controlled water heaters. What diversity does Table A2 allow for them?',
    options: ['100% of the largest plus 25% of the rest', '66% of total current demand', '100% up to 10 A plus 50% above', 'No diversity allowable'],
    correctAnswer: 3,
    explanation:
      'Row 6, thermostatically controlled water heaters: no diversity allowable, in every column. The 100% + 100% + 25% rule belongs to row 5, instantaneous water heaters, which is a different type of appliance. 66% is the lighting row; the 10 A + 50% rule is row 2.',
    reference: A2_REF('row 6 (water heaters, thermostatically controlled)'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 154,
    question: 'A house has three standard socket-outlet final circuits. What does Table A2 allow for standard final circuits in a household?',
    options: ['100% of every circuit, no diversity allowable', '66% of the total current demand of all circuits', '100% of the largest circuit plus 50% of every other circuit', '100% of the largest circuit plus 40% of every other circuit'],
    correctAnswer: 3,
    explanation:
      'Row 9, household column: 100% of the current demand of the largest circuit + 40% of every other circuit. The 50% version is the shops and hotels column. 66% is the lighting allowance, not a circuit rule.',
    reference: A2_REF('row 9 (standard final circuits), individual household column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 155,
    question: 'A household cooker has a connected load of 45 A and its control unit includes a socket-outlet. Apply the Table A2 allowance.',
    options: ['45.0 A', '25.5 A', '30.5 A', '20.5 A'],
    correctAnswer: 1,
    explanation:
      '10 A + 30% of (45 − 10) + 5 A for the socket = 10 + 10.5 + 5 = 25.5 A. 20.5 A forgets the socket; 30.5 A takes 30% of the whole 45 A instead of the excess over 10 A. 45.0 A applies no diversity.',
    reference: A2_REF('row 3 (cooking appliances), household: 10 A + 30% of excess + 5 A'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 156,
    question: 'A household heating and power circuit not listed elsewhere in Table A2 has a total demand of 26 A. Apply the allowance.',
    options: ['18 A', '13 A', '26 A', '23 A'],
    correctAnswer: 0,
    explanation:
      'Row 2, household: 100% up to 10 A + 50% of the excess. 10 + 0.5 × 16 = 18 A. 13 A halves the whole load; 23 A adds 50% of the whole 26 A to the first 10 A instead of 50% of the excess; 26 A applies no diversity.',
    reference: A2_REF('row 2 (heating and power), household: 100% to 10 A + 50% of excess'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 157,
    question: 'A guest house has three instantaneous water heaters rated 40 A, 30 A and 20 A. Apply the Table A2 allowance.',
    options: ['90 A', '70 A', '45 A', '75 A'],
    correctAnswer: 3,
    explanation:
      'Row 5, every column: 100% of the largest + 100% of the second largest + 25% of the remainder. 40 + 30 + 0.25 × 20 = 75 A. 90 A applies no diversity; 70 A forgets the third heater altogether. 45 A forgets the second heater and takes 25% of the third.',
    reference: A2_REF('row 5 (water heaters, instantaneous type)'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 158,
    question:
      'A small shop\'s lighting demand totals 24 A. The designer is tempted to use the household allowance. What does Table A2 give for a shop, and what would the household figure have been?',
    options: ['15.8 A — the household 66% applies to any premises type', '18 A — the 75% hotel column, the nearest match', '21.6 A — the household 66% (15.8 A) is the wrong column', '24 A — shops get no lighting diversity at all'],
    correctAnswer: 2,
    explanation:
      'Row 1, shops column: 90% of total demand, 0.9 × 24 = 21.6 A. The household column would give 0.66 × 24 = 15.8 A, but that column is for dwellings. 18 A is the 75% hotel column, and shops do get diversity — 90%, not 100%.',
    reference: `${A2_REF('row 1 (lighting), small shops column')}`,
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 159,
    question: 'What allowance does Table A2 give for lighting in a small hotel or guest house?',
    options: ['80% of total current demand', '66% of total current demand', '75% of total current demand', '90% of total current demand'],
    correctAnswer: 2,
    explanation: 'Row 1, small hotels, boarding houses and guest houses: 75%. 66% is household and 90% is shops; 80% is not in the row.',
    reference: A2_REF('row 1 (lighting), small hotels column'),
    difficulty: 'basic',
    category: 'Demand and diversity',
  },
  {
    id: 160,
    question: 'A small shop has three cooking appliances rated 30 A, 20 A and 15 A. Apply the Table A2 allowance for shops.',
    options: ['55 A', '65 A', '46 A', '35 A'],
    correctAnswer: 0,
    explanation:
      'Row 3, shops column: 100% of the largest + 80% of the second + 60% of the remainder. 30 + 16 + 9 = 55 A. 65 A applies no diversity; 46 A forgets the third appliance; 35 A applies the water-heater row by mistake.',
    reference: A2_REF('row 3 (cooking appliances), small shops column'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 161,
    question: 'In Table A2, which household loads get no diversity at all?',
    options: ['Lighting, cooking appliances and socket-outlet circuits', 'Instantaneous water heaters and standard final circuits', 'Motors, heating and power, and cooking appliances', 'Thermostatic water heaters, floor warming, thermal storage'],
    correctAnswer: 3,
    explanation:
      'Rows 6, 7 and 8 — thermostatically controlled water heaters, floor warming installations and thermal storage space heating — read "no diversity allowable" in every column. They run for long periods at full load, so nothing can be knocked off.',
    reference: A2_REF('rows 6, 7 and 8'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 162,
    question: 'A small hotel has motors (not lift motors) rated 20 A, 15 A and 10 A. Apply the Table A2 allowance for hotels.',
    options: ['45 A', '35 A', '32.5 A', '38 A'],
    correctAnswer: 2,
    explanation:
      'Row 4, hotels column: 100% of the largest motor + 50% of the remaining motors. 20 + 0.5 × 25 = 32.5 A. 38 A uses the shops rule (100/80/60); 45 A applies no diversity. For a household the row reads "not applicable". 35 A takes the second motor in full and ignores the third.',
    reference: A2_REF('row 4 (motors), small hotels column'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 163,
    question: 'What does Table A2 say about motors in an individual household?',
    options: ['No diversity allowable', 'Not applicable', '100% of the largest plus 50% of the rest', '100% of the largest plus 80% of the second plus 60% of the rest'],
    correctAnswer: 1,
    explanation:
      'Row 4, household column: not applicable — a dwelling is not assessed on motor loads. The 100/50 rule is the hotels column and 100/80/60 the shops column.',
    reference: A2_REF('row 4 (motors), individual household column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 164,
    question: 'A house has four standard final circuits with demands of 32 A, 32 A, 20 A and 16 A. Apply the household allowance for standard circuits.',
    options: ['59.2 A', '66 A', '100 A', '51.2 A'],
    correctAnswer: 0,
    explanation:
      'Row 9, household: 100% of the largest + 40% of every other circuit. 32 + 0.4 × (32 + 20 + 16) = 32 + 27.2 = 59.2 A. 66 A uses the shops 50% rule; 100 A applies no diversity; 51.2 A forgets one 32 A circuit.',
    reference: A2_REF('row 9 (standard final circuits), household: 100% + 40% of the others'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 165,
    question: 'A small office has two heating and power appliances rated 20 A and 12 A. Apply the Table A2 allowance for shops and offices.',
    options: ['32 A', '21 A', '26 A', '29 A'],
    correctAnswer: 3,
    explanation:
      'Row 2, shops column: 100% of the largest appliance + 75% of the remaining appliances. 20 + 0.75 × 12 = 29 A. 32 A applies no diversity; 21 A uses the household 10 A + 50% rule; 26 A uses 50% of the rest.',
    reference: A2_REF('row 2 (heating and power), small shops and offices column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 166,
    question: 'Table A2 works in which units, applied how?',
    options: ['Kilovolt-amperes, per distribution board', 'Watts per square metre of floor area', 'Amperes, per circuit or point of utilisation', 'Kilowatts, as a flat percentage of the total'],
    correctAnswer: 2,
    explanation:
      'The Appendix A preamble is explicit: the allowances are applied to current demand in amperes, per circuit or per point of utilisation, and most rows are "100% of the largest plus x% of the others". They cannot be expressed as a flat percentage of a kW total.',
    reference: 'On-Site Guide Appendix A, the preamble to Table A2',
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 167,
    question: 'A house has three instantaneous water heaters rated 45 A, 40 A and 40 A. Apply the Table A2 allowance.',
    options: ['105 A', '95 A', '125 A', '85 A'],
    correctAnswer: 1,
    explanation:
      'Row 5, household: 100% + 100% + 25% of the remainder. 45 + 40 + 0.25 × 40 = 95 A. 125 A applies no diversity and 85 A forgets the third heater. 105 A uses 50% of the third heater instead of 25%.',
    reference: A2_REF('row 5 (water heaters, instantaneous type), household'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 168,
    question: 'A household cooker has a connected load of 32 A and no socket in the control unit. Apply the Table A2 allowance.',
    options: ['16.6 A', '21.6 A', '19.6 A', '32.0 A'],
    correctAnswer: 0,
    explanation:
      '10 + 30% of (32 − 10) = 10 + 6.6 = 16.6 A, with no 5 A added because there is no socket. 21.6 A adds the socket allowance anyway; 19.6 A takes 30% of the whole 32 A. 32.0 A applies no diversity.',
    reference: A2_REF('row 3 (cooking appliances), household, no socket'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 169,
    question: 'A guest house has standard final circuits with demands of 32 A, 32 A and 20 A. Apply the Table A2 allowance for hotels.',
    options: ['52.8 A', '84 A', '42 A', '58 A'],
    correctAnswer: 3,
    explanation:
      'Row 9, hotels column: 100% of the largest + 50% of every other circuit. 32 + 0.5 × 52 = 58 A. 52.8 A uses the household 40% rule; 84 A applies no diversity. 42 A takes the largest circuit plus 50% of just one other.',
    reference: A2_REF('row 9 (standard final circuits), small hotels column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 170,
    question: 'What caution does Appendix A attach to Table A2 itself?',
    options: ['Its figures are mandatory and the designer may not vary them either way', 'It applies only to industrial and large commercial premises, not dwellings', 'Not updated for some time — the designer may increase or decrease the values', 'It must always be read together with Table A1 and never applied on its own'],
    correctAnswer: 2,
    explanation:
      'Appendix A says the recommendations in Table A2 "have not been updated for some time" and "do not necessarily align with modern loads", so they "may be increased or decreased as decided by the installation designer". It is guidance, not a rule. Table A1 is the separate table of typical demands; A2 stands on its own. The table is not mandatory and is not limited to industrial premises.',
    reference: 'On-Site Guide Appendix A, note under Table A2',
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 171,
    question: 'What does the dagger note to Table A2 say about distribution boards and consumer units?',
    options: ['Rated for the diversified load, as assessed from Table A2', 'Rated for the total connected load with no diversity applied', 'Rated for 66% of the connected load, as for household lighting', 'Rated for the largest circuit plus 40% of the other circuits'],
    correctAnswer: 1,
    explanation:
      'The note says it is important to ensure boards are of sufficient rating to take the total load connected to them without the application of any diversity. Diversity sizes the supply; it does not shrink the board. The diversified load from Table A2, the 66% lighting figure and the largest-plus-40% rule are all diversity allowances — exactly what the note says must not be applied to the board.',
    reference: 'On-Site Guide Appendix A, note † to Table A2',
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 172,
    question: 'A small shop has lighting with a total current demand of 40 A. Apply the Table A2 allowance.',
    options: ['36 A', '26.4 A', '30 A', '40 A'],
    correctAnswer: 0,
    explanation:
      'Row 1, shops column: 90% of total current demand. 0.9 × 40 = 36 A. 26.4 A uses the household 66% and 30 A the hotel 75%.',
    reference: A2_REF('row 1 (lighting), small shops column'),
    difficulty: 'basic',
    category: 'Demand and diversity',
  },
  {
    id: 173,
    question: 'A household has lighting with a total current demand of 12 A. Apply the Table A2 allowance.',
    options: ['10.8 A', '9 A', '12 A', '7.9 A'],
    correctAnswer: 3,
    explanation:
      'Row 1, household: 66%. 0.66 × 12 = 7.9 A. 10.8 A uses the shops 90% and 9 A the hotels 75%.',
    reference: A2_REF('row 1 (lighting), individual household column'),
    difficulty: 'basic',
    category: 'Demand and diversity',
  },
  {
    id: 174,
    question: 'A small hotel has heating and power appliances rated 30 A, 20 A and 15 A. Apply the Table A2 allowance for hotels.',
    options: ['56.3 A', '47.5 A', '55 A', '65 A'],
    correctAnswer: 2,
    explanation:
      'Row 2, hotels column: 100% of the largest + 80% of the second + 60% of the remainder. 30 + 16 + 9 = 55 A. 65 A applies no diversity; 56.3 A uses the shops 100% + 75% rule; 47.5 A uses 100% + 50%.',
    reference: A2_REF('row 2 (heating and power), small hotels column'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 175,
    question: 'For socket-outlets and stationary equipment in a household, what does Table A2 allow?',
    options: ['No diversity allowable', '100% of the largest point of utilisation plus 40% of every other point', '100% of the largest point of utilisation plus 50% of every other point', '66% of the total current demand'],
    correctAnswer: 1,
    explanation:
      'Row 10, household column: 100% of the current demand of the largest point of utilisation + 40% of every other point. The 50% version is the shops and hotels column. 66% is the lighting row.',
    reference: A2_REF('row 10 (socket-outlets and stationary equipment), household column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// INSTALLATION METHODS — Table 4A2 reference methods (ids 176–200)
// ═══════════════════════════════════════════════════════════════════════════
const METHODS: Q[] = [
  {
    id: 176,
    question:
      'A 2.5 mm² flat twin and earth radial for a 20 A load is clipped direct along a wall, then drops into conduit buried in an insulated wall to reach the socket. Which capacity governs?',
    options: ['Method A, 20 A — the conduit-in-insulation section governs', 'Method C, 27 A — the longer clipped-direct section governs', 'Method B, 23 A — conduit on the surface of the wall governs', 'Method 102, 21 A — inside an insulated stud wall governs'],
    correctAnswer: 0,
    explanation:
      'A circuit is rated by its most onerous section. Conduit in a thermally insulating wall is Reference Method A, 20 A for 2.5 mm² — which just meets the 20 A load. The clipped section (Method C, 27 A) is not the limiting case; Method B (23 A) is conduit on the surface, and Method 102 (21 A) is flat cable in a stud wall without conduit.',
    reference: `${METHOD_REF('choose the most onerous method — Reference Method A')}; ${CCC_REF('2.5 mm² row')}`,
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 177,
    question:
      'A 32 A cooker circuit is to run in 4 mm² flat twin and earth in surface conduit on a wall. Which reference method applies, and does the table allow it?',
    options: ['Yes — Method C gives 37 A, over 32 A', 'No — Method A gives 26 A, under 32 A; 6 mm² at 32 A is needed', 'Yes — Method B gives 30 A, close enough to 32 A', 'No — Method B gives 30 A, under 32 A; 6 mm² at 38 A is needed'],
    correctAnswer: 3,
    explanation:
      'Conduit on a wall is Reference Method B: 4 mm² reads 30 A, less than the 32 A device, so 6 mm² (38 A at Method B) is needed. 37 A is the clipped-direct column, the 26/32 pair is Method A, and 30 A is not close enough — the cable must carry at least the device rating.',
    reference: `${METHOD_REF('conduit on a wall — Reference Method B')}; ${CCC_REF('4 mm² and 6 mm² rows, Method B')}`,
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 178,
    question: 'Cables are enclosed in conduit buried in a thermally insulating wall. Which reference method applies?',
    options: ['Reference Method C', 'Method 102', 'Reference Method A', 'Reference Method B'],
    correctAnswer: 2,
    explanation:
      'Conduit in a thermally insulating wall is Reference Method A — the lowest of the lettered columns. Method 102 is for flat cable in an insulated stud wall without conduit.',
    reference: METHOD_REF('conduit in an insulating wall — Reference Method A'),
    difficulty: 'basic',
    category: 'Installation methods',
  },
  {
    id: 179,
    question: 'Flat twin and earth lies above a plasterboard ceiling, covered by insulation not exceeding 100 mm. Which method column?',
    options: ['Method 103', 'Method 100', 'Method 101', 'Method 102'],
    correctAnswer: 1,
    explanation:
      'Method 100 is above a plasterboard ceiling with insulation not exceeding 100 mm. Method 101 is the same position with insulation exceeding 100 mm; 102 and 103 are in a stud wall.',
    reference: METHOD_REF('Method 100'),
    difficulty: 'basic',
    category: 'Installation methods',
  },
  {
    id: 180,
    question: 'Flat twin and earth lies above a plasterboard ceiling under 270 mm of loft insulation. Which method column?',
    options: ['Method 100', 'Method 101', 'Method 102', 'Reference Method A'],
    correctAnswer: 1,
    explanation:
      'Insulation exceeding 100 mm above a plasterboard ceiling is Method 101. Method 100 stops at 100 mm. Modern loft insulation depths make 101 the usual case. Method 102 is in a stud wall, not above a ceiling; Method A is conduit in an insulating wall.',
    reference: METHOD_REF('Method 101'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 181,
    question: 'Flat twin and earth runs inside an insulated stud wall, touching the inner face of the plasterboard. Which method column?',
    options: ['Method 102', 'Method 103', 'Reference Method A', 'Method 101'],
    correctAnswer: 0,
    explanation:
      'Method 102 is in a stud wall with thermal insulation, cable touching the inner wall surface. Method 103 is the same wall with the cable not touching either surface. Method 101 is above a ceiling under deep insulation; Method A is conduit.',
    reference: METHOD_REF('Method 102'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 182,
    question: 'Flat twin and earth runs through the middle of an insulated stud wall, touching neither face. Which method column?',
    options: ['Reference Method A', 'Method 101', 'Method 102', 'Method 103'],
    correctAnswer: 3,
    explanation:
      'Method 103 is in an insulated stud wall with the cable not touching the inner surface — the most onerous column in the flat cable table. Method 102 needs the cable in contact with the plasterboard. Method 101 is above a ceiling; Method A is conduit in an insulating wall.',
    reference: METHOD_REF('Method 103'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 183,
    question: 'A multicore cable lies on a perforated cable tray in free air. Which reference method applies?',
    options: ['Reference Method B', 'Reference Method C', 'Reference Method E', 'Reference Method F'],
    correctAnswer: 2,
    explanation:
      'Reference Method E is a multicore cable in free air or on a perforated tray. Method F is for single-core cables touching in free air; Method C is clipped direct to a surface.',
    reference: METHOD_REF('multicore on perforated tray — Reference Method E'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 184,
    question: 'Single-core cables run touching each other on a cable tray in free air. Which reference method applies?',
    options: ['Reference Method E', 'Reference Method F', 'Reference Method G', 'Reference Method C'],
    correctAnswer: 1,
    explanation:
      'Reference Method F is single-core cables touching in free air or on tray. Method E is the multicore equivalent, and Method G is single-core cables spaced apart.',
    reference: METHOD_REF('single-core touching in free air — Reference Method F'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 185,
    question: 'Single-core cables are spaced apart on cleats in free air, running horizontally. Which reference method applies?',
    options: ['Reference Method G', 'Reference Method E', 'Reference Method D2', 'Reference Method F'],
    correctAnswer: 0,
    explanation:
      'Reference Method G is single-core cables spaced in free air; the horizontal and vertical arrangements have separate columns. Method F is single-core cables touching. Method E is for multicore cables and D2 is buried direct.',
    reference: METHOD_REF('single-core spaced in free air — Reference Method G'),
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 186,
    question: 'An armoured cable is buried directly in the ground. Which reference method applies?',
    options: ['Reference Method C', 'Reference Method E', 'Reference Method D1', 'Reference Method D2'],
    correctAnswer: 3,
    explanation:
      'Buried direct in the ground is Reference Method D2. Method D1 is in ducting in the ground. Both then use the soil temperature and soil resistivity factors rather than the air ones.',
    reference: METHOD_REF('buried direct — Reference Method D2'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 187,
    question: 'An armoured cable is pulled through a duct laid in the ground. Which reference method applies?',
    options: ['Reference Method A', 'Reference Method D1', 'Reference Method D2', 'Reference Method B'],
    correctAnswer: 1,
    explanation:
      'In ducting in the ground is Reference Method D1. Method D2 is buried direct. Method B is conduit or trunking on a wall above ground.',
    reference: METHOD_REF('in ducting in the ground — Reference Method D1'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 188,
    question: 'Which reference methods are NOT printed in the flat twin and earth table (Table 4D5)?',
    options: ['Methods D and E', 'Methods A and B', 'Methods 100 and 101', 'Methods B and C'],
    correctAnswer: 0,
    explanation:
      'Table 4D5 has no Method D or E columns: flat twin and earth is not buried in the ground and is not rated in free air on tray. It prints A, B, C and the 100-series methods only.',
    reference: METHOD_REF('columns present in Table 4D5'),
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 189,
    question:
      'Three 2.5 mm² flat twin and earth circuits run together in surface trunking along a corridor. Which reference method and grouping item apply, and what can each circuit carry?',
    options: ['18.4 A — Method B, 23 A × 0.80 for two bunched', '18.9 A — Method C, 27 A × 0.70', '21.6 A — Method C, 27 A × 0.80', '16.1 A — Method B, 23 A × 0.70 for three bunched'],
    correctAnswer: 3,
    explanation:
      'Trunking on a wall is Reference Method B, 23 A for 2.5 mm², and cables in trunking are bunched (grouping item 1), 0.70 for three circuits: 23 × 0.70 = 16.1 A. 18.4 A uses the two-circuit factor; 18.9 A and 21.6 A both use the clipped-direct 27 A, the wrong column.',
    reference: `${METHOD_REF('trunking on a wall — Reference Method B')}; ${CG_REF('item 1, 3 circuits')}`,
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 190,
    question: 'Reading across the 2.5 mm² row of the flat twin and earth table, which two method columns give the same capacity?',
    options: ['Reference Method B and Method 100, both 23 A', 'Method 101 and Method 103, both 17 A', 'Method 100 and Method 102, both 21 A', 'Reference Method A and Method 101, both 20 A'],
    correctAnswer: 2,
    explanation:
      'The 2.5 mm² row reads A 20, B 23, C 27, 100 21, 101 17, 102 21, 103 13.5. Only Methods 100 and 102 share a value, 21 A. Method 101 is 17 A, not 20 A, and Method 103 is 13.5 A. Checking every column of a row is the skill here.',
    reference: CCC_REF('2.5 mm² row, every column'),
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 191,
    question: 'Which reference method gives the LOWEST capacity for a 6 mm² flat twin and earth?',
    options: ['Method 100', 'Reference Method A', 'Method 101', 'Method 103'],
    correctAnswer: 3,
    explanation:
      'The 6 mm² row reads 32 A at Method A, 27 A at Method 101, 34 A at Method 100 and 23.5 A at Method 103 — the stud wall with the cable touching nothing is the worst case.',
    reference: CCC_REF('6 mm² row, compare the columns'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 192,
    question: 'A cable is clipped to the underside of a wooden joist above a plasterboard ceiling, with 100 mm of insulation on top. Which method?',
    options: ['Method 100', 'Method 101', 'Reference Method C', 'Method 102'],
    correctAnswer: 0,
    explanation:
      'Clipped to a joist or touching the plasterboard above a ceiling, with insulation not exceeding 100 mm, is Method 100. It is not Method C: the insulation above changes how the cable sheds heat. Method 101 needs more than 100 mm of insulation; Method 102 is a stud wall.',
    reference: METHOD_REF('Method 100 description'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 193,
    question: 'A single-core cable is enclosed in conduit on a wall, single-phase. In the single-core table, which column?',
    options: ['Reference Method B', 'Reference Method C', 'Reference Method F', 'Reference Method A'],
    correctAnswer: 0,
    explanation:
      'Conduit on a wall is Reference Method B whatever the cable type. Method F would be single-cores touching in free air, not in conduit.',
    reference: METHOD_REF('single-core in conduit on a wall — Reference Method B'),
    difficulty: 'basic',
    category: 'Installation methods',
  },
  {
    id: 194,
    question: 'For which of these is the ambient factor taken from the SOIL temperature table (4B2) rather than the air table (4B1)?',
    options: ['Method 101', 'Reference Method E', 'Reference Method D2', 'Reference Method C'],
    correctAnswer: 2,
    explanation:
      'Methods D1 and D2 are in the ground, so their ambient is the soil temperature and the factor comes from Table 4B2 (reference 20 °C). Every other method is in air and uses Table 4B1 (reference 30 °C). Method 101 sits in a ceiling void in air, so it uses Table 4B1 like Method C and Method E.',
    reference: 'On-Site Guide Appendix F — Tables 4B1 and 4B2, which method each serves',
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 195,
    question: 'Two flat twin and earth cables lie touching each other in a single layer clipped to a wall. Which grouping item and factor?',
    options: ['Item 4, 0.87', 'Item 2, 0.85', 'Item 1, 0.80', 'Item 3, 0.88'],
    correctAnswer: 1,
    explanation:
      'A single layer on a wall is item 2 of the grouping table: 0.85 for two cables. Item 1 (bunched) would be 0.80 and is for cables in an enclosure or bundled. 0.88 and 0.87 are the two-cable rows of item 3 (perforated tray) and item 4 (ladder).',
    reference: CG_REF('item 2, 2 cables'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 196,
    question: 'For 16 mm² flat twin and earth, how much capacity is lost going from clipped direct to Method 101?',
    options: ['From 85 A to 46 A', 'From 85 A to 57 A', 'From 85 A to 63 A', 'From 64 A to 36 A'],
    correctAnswer: 0,
    explanation:
      '16 mm² reads 85 A at Method C and 46 A at Method 101. 57 A is Method 100 and 63 A is Method 102; the 64/36 pair is the 10 mm² row.',
    reference: CCC_REF('16 mm² row, Method C and Method 101 columns'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 197,
    question: 'Which reference method is the best case for a multicore cable in the 70 °C thermoplastic table?',
    options: ['Reference Method C', 'Reference Method B', 'Reference Method A', 'Reference Method E'],
    correctAnswer: 3,
    explanation:
      'Free air or perforated tray (Method E) lets a multicore cable shed heat on every side and gives the highest figure. Clipped direct (C) is next, then trunking (B), then conduit in an insulating wall (A).',
    reference: METHOD_REF('order of the lettered columns'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 198,
    question: 'A flat twin and earth cable is fixed to the ceiling side of the joists in a loft with no insulation over it. Which method?',
    options: ['Method 101', 'Reference Method E', 'Reference Method C', 'Method 100'],
    correctAnswer: 2,
    explanation:
      'With no insulation the cable is simply clipped direct — Reference Method C. Methods 100 and 101 need insulation on the cable; Method E is not a flat cable method.',
    reference: METHOD_REF('clipped direct with no insulation — Reference Method C'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
  {
    id: 199,
    question: 'Reading the 4 mm² row of the flat twin and earth table, put these methods in order from highest to lowest capacity.',
    options: ['C (37 A), B (30 A), A (26 A), 100 and 102 (27 A), 103 (18.5 A), 101 (22 A)', 'C (37 A), B (30 A), 100 and 102 (27 A), A (26 A), 101 (22 A), 103 (18.5 A)', 'C (37 A), A (26 A), B (30 A), 100 and 102 (27 A), 101 (22 A), 103 (18.5 A)', 'B (30 A), C (37 A), 100 and 102 (27 A), A (26 A), 101 (22 A), 103 (18.5 A)'],
    correctAnswer: 1,
    explanation:
      'The 4 mm² row reads C 37, B 30, 100 and 102 both 27, A 26, 101 22, 103 18.5. Only the first option keeps every pair in descending order; the others swap A and B, B and C, or 101 and 103.',
    reference: CCC_REF('4 mm² row, every column'),
    difficulty: 'advanced',
    category: 'Installation methods',
  },
  {
    id: 200,
    question: 'A cable runs in trunking for part of its route and clipped direct for the rest. Which method column must the whole circuit be sized from?',
    options: ['The more onerous — Reference Method B (trunking)', 'The less onerous — Reference Method C (clipped direct)', 'The average of the two columns', 'Whichever section is longer'],
    correctAnswer: 0,
    explanation:
      'A circuit is only as good as its hottest section, so the capacity is read from the more onerous method along the route — here Method B. Averaging or going by length would leave the trunking section overloaded.',
    reference: METHOD_REF('choose the most onerous method along the route'),
    difficulty: 'intermediate',
    category: 'Installation methods',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// ARMOURED AND THERMOSETTING CABLES — Tables 4D4A, 4E4A, 4E2A, 4E1A, 4G1A
// ═══════════════════════════════════════════════════════════════════════════
const ARMOURED: Q[] = [
  {
    id: 201,
    question:
      'A 4 mm² armoured PVC cable (SWA) is clipped direct, single-phase. Look up its current-carrying capacity.',
    options: ['33 A', '41 A', '38 A', '49 A'],
    correctAnswer: 2,
    explanation:
      'Table 4D4A, Method C, two loaded conductors, 4 mm² reads 38 A. 33 A is the three-phase column of the same row, 41 A is Method E (on tray), and 49 A is the 6 mm² row.',
    reference: ARM_REF('Table 4D4A', '4 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'basic',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 202,
    question: 'A 10 mm² armoured PVC cable is clipped direct and feeds a three-phase machine. What capacity applies?',
    options: ['67 A', '62 A', '42 A', '58 A'],
    correctAnswer: 3,
    explanation:
      'Table 4D4A, Method C, three loaded conductors, 10 mm² reads 58 A. 67 A is the single-phase column, 62 A is Method E three-phase, and 42 A is the 6 mm² three-phase row.',
    reference: ARM_REF('Table 4D4A', '10 mm² row, Reference Method C, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 203,
    question: 'A 16 mm² armoured thermosetting (XLPE) cable is clipped direct, single-phase. Look up its capacity.',
    options: ['110 A', '89 A', '94 A', '115 A'],
    correctAnswer: 0,
    explanation:
      'Table 4E4A, Method C, two loaded conductors, 16 mm² reads 110 A. 89 A is the same size in armoured PVC (Table 4D4A), 94 A is the three-phase column, and 115 A is Method E.',
    reference: ARM_REF('Table 4E4A', '16 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 204,
    question:
      'A 25 mm² three-phase sub-main clipped direct could be armoured PVC or armoured XLPE. Look up both. How much more does the thermosetting cable carry?',
    options: ['124 A against 102 A', '146 A against 118 A', '124 A against 118 A', '131 A against 110 A'],
    correctAnswer: 0,
    explanation:
      'Method C, three loaded conductors: Table 4D4A gives 102 A for armoured PVC and Table 4E4A gives 124 A for armoured XLPE. The 146/118 pair is the single-phase column of the same two rows; 131 A and 110 A come from the Method E and buried columns.',
    reference: `${ARM_REF('Table 4D4A', '25 mm² row')}; ${ARM_REF('Table 4E4A', '25 mm² row')}`,
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 205,
    question: 'A 6 mm² armoured PVC cable is buried direct in the ground (Method D2) and feeds a three-phase supply. Look up its capacity.',
    options: ['38 A', '48 A', '42 A', '41 A'],
    correctAnswer: 3,
    explanation:
      'Table 4D4A, Method D2, three loaded conductors, 6 mm² reads 41 A. 38 A is Method D1 (in ducting), 42 A is Method C three-phase, and 48 A is the D2 single-phase column.',
    reference: ARM_REF('Table 4D4A', '6 mm² row, Reference Method D2, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 206,
    question: 'A 25 mm² armoured PVC cable runs in ducting in the ground (Method D1), three-phase. What capacity does the table give?',
    options: ['92 A', '82 A', '99 A', '102 A'],
    correctAnswer: 1,
    explanation:
      'Table 4D4A, Method D1, three loaded conductors, 25 mm² reads 82 A. 92 A is Method D2 (buried direct) three-phase, 99 A is the D1 single-phase column, and 102 A is Method C three-phase.',
    reference: ARM_REF('Table 4D4A', '25 mm² row, Reference Method D1, three loaded conductors'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 207,
    question: 'A 35 mm² armoured XLPE cable lies on a perforated tray (Method E), three-phase. Look up its capacity.',
    options: ['154 A', '188 A', '162 A', '180 A'],
    correctAnswer: 2,
    explanation:
      'Table 4E4A, Method E, three loaded conductors, 35 mm² reads 162 A. 154 A is Method C three-phase, 188 A is Method E single-phase, and 180 A is Method C single-phase.',
    reference: ARM_REF('Table 4E4A', '35 mm² row, Reference Method E, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 208,
    question: 'A 100 A three-phase sub-main is to run in armoured PVC clipped direct. Reading down the table, what is the smallest size?',
    options: ['16 mm², at 77 A', '25 mm², at 102 A', '35 mm², at 125 A', '25 mm², at 118 A'],
    correctAnswer: 1,
    explanation:
      'Method C, three loaded conductors: 16 mm² reads 77 A, short of 100 A, and 25 mm² reads 102 A, which serves. 125 A is the 35 mm² row, larger than needed; 118 A is the 25 mm² single-phase column, the wrong column for a three-phase circuit.',
    reference: ARM_REF('Table 4D4A', 'Reference Method C, three loaded conductors, 16 mm² and 25 mm² rows'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 209,
    question: 'A 150 A three-phase sub-main is to run in armoured XLPE clipped direct. What is the smallest size the table allows?',
    options: ['25 mm², at 124 A', '35 mm², at 154 A', '50 mm², at 187 A', '35 mm², at 180 A'],
    correctAnswer: 1,
    explanation:
      'Method C, three loaded conductors: 25 mm² reads 124 A, short of 150 A, and 35 mm² reads 154 A, which serves. 187 A is the 50 mm² row, larger than needed; 180 A is the 35 mm² single-phase column.',
    reference: ARM_REF('Table 4E4A', 'Reference Method C, three loaded conductors, 25 mm² and 35 mm² rows'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 210,
    question: 'A 2.5 mm² multicore thermosetting (XLPE) cable is clipped direct, single-phase. Look up its capacity.',
    options: ['27 A', '36 A', '30 A', '33 A'],
    correctAnswer: 3,
    explanation:
      'Table 4E2A, Method C, two loaded conductors, 2.5 mm² reads 33 A. 27 A is the same size in multicore PVC (Table 4D2A), 30 A is the three-phase column, and 36 A is Method E.',
    reference: ARM_REF('Table 4E2A', '2.5 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'basic',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 211,
    question: 'A 10 mm² multicore XLPE cable runs in trunking on a wall (Method B) and supplies a three-phase load. What capacity applies?',
    options: ['69 A', '60 A', '51 A', '71 A'],
    correctAnswer: 1,
    explanation:
      'Table 4E2A, Method B, three loaded conductors, 10 mm² reads 60 A. 69 A is the single-phase column, 51 A is Method A three-phase, and 71 A is Method C three-phase.',
    reference: ARM_REF('Table 4E2A', '10 mm² row, Reference Method B, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 212,
    question: 'Single-core XLPE cables run touching in free air (Method F), 25 mm², three-phase. Look up the capacity.',
    options: ['161 A', '130 A', '182 A', '141 A'],
    correctAnswer: 3,
    explanation:
      'Table 4E1A, Method F, three loaded conductors, 25 mm² reads 141 A. 161 A is the single-phase column, 130 A is Method C three-phase, and 182 A is Method G (spaced, horizontal).',
    reference: ARM_REF('Table 4E1A', '25 mm² row, Reference Method F, three loaded conductors'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 213,
    question: 'Single-core XLPE cables are spaced horizontally in free air (Method G), 50 mm². What capacity does the table give?',
    options: ['242 A', '275 A', '246 A', '228 A'],
    correctAnswer: 1,
    explanation:
      'Table 4E1A, Method G horizontal, 50 mm² reads 275 A — and the single- and three-phase columns are the same for spaced cables, because spacing removes the mutual heating. 242 A is Method F single-phase, 246 A is Method G vertical, and 228 A is Method C single-phase.',
    reference: ARM_REF('Table 4E1A', '50 mm² row, Reference Method G horizontal'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 214,
    question: 'For 95 mm² single-core XLPE spaced in free air, how do the horizontal and vertical arrangements compare?',
    options: ['430 A horizontal against 389 A vertical', '389 A horizontal against 430 A vertical', '377 A horizontal against 342 A vertical', '430 A horizontal against 355 A vertical'],
    correctAnswer: 0,
    explanation:
      'Table 4E1A gives 430 A for Method G horizontal and 389 A for Method G vertical at 95 mm² — a vertical run traps rising warm air, so it carries less. 377 A and 342 A are the Method F rows, and 355 A is Method C single-phase.',
    reference: ARM_REF('Table 4E1A', '95 mm² row, Reference Method G horizontal and vertical'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 215,
    question: 'A 2.5 mm² light duty mineral-insulated (MICC) cable is clipped direct, single-phase. Look up its capacity.',
    options: ['26 A', '33 A', '31 A', '27 A'],
    correctAnswer: 2,
    explanation:
      'Table 4G1A, light duty, Method C, two loaded conductors, 2.5 mm² reads 31 A. 26 A is the three-phase column, 33 A is Method E, and 27 A is flat twin and earth at the same size.',
    reference: ARM_REF('Table 4G1A', '2.5 mm² row, light duty, Reference Method C'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 216,
    question:
      'A 6 mm² multicore cable clipped direct, single-phase, could be 70 °C PVC or 90 °C XLPE. Look up both. What is the difference?',
    options: ['58 A XLPE against 46 A PVC', '51 A XLPE against 46 A PVC', '58 A XLPE against 47 A PVC', '63 A XLPE against 51 A PVC'],
    correctAnswer: 0,
    explanation:
      'Method C, two loaded conductors: Table 4D2A gives 46 A for 70 °C PVC and Table 4E2A gives 58 A for 90 °C XLPE. Thermosetting insulation tolerates a higher conductor temperature, so the same copper carries more. 51 A is the XLPE Method B figure, 47 A is flat twin and earth, and 63 A is XLPE at Method E.',
    reference: `${ARM_REF('Table 4D2A', '6 mm² row')}; ${ARM_REF('Table 4E2A', '6 mm² row')}`,
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 217,
    question: 'A 70 mm² armoured PVC cable lies on a perforated tray (Method E), single-phase. Look up its capacity.',
    options: ['222 A', '207 A', '241 A', '192 A'],
    correctAnswer: 2,
    explanation:
      'Table 4D4A, Method E, two loaded conductors, 70 mm² reads 241 A. 222 A is Method C single-phase, 207 A is Method E three-phase, and 192 A is Method C three-phase.',
    reference: ARM_REF('Table 4D4A', '70 mm² row, Reference Method E, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 218,
    question: 'A 4 mm² multicore XLPE cable runs in conduit in an insulating wall (Method A), three-phase. What capacity applies?',
    options: ['33 A', '35 A', '30 A', '25 A'],
    correctAnswer: 2,
    explanation:
      'Table 4E2A, Method A, three loaded conductors, 4 mm² reads 30 A. 33 A is the single-phase column, 35 A is Method B three-phase, and 25 A is the same cell in multicore PVC.',
    reference: ARM_REF('Table 4E2A', '4 mm² row, Reference Method A, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 219,
    question: 'A 16 mm² armoured XLPE cable is buried direct in the ground (Method D2), three-phase. Look up its capacity.',
    options: ['75 A', '100 A', '94 A', '84 A'],
    correctAnswer: 3,
    explanation:
      'Table 4E4A, Method D2, three loaded conductors, 16 mm² reads 84 A. 75 A is Method D1 three-phase, 100 A is the D2 single-phase column, and 94 A is Method C three-phase.',
    reference: ARM_REF('Table 4E4A', '16 mm² row, Reference Method D2, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 220,
    question: 'A 50 mm² armoured PVC cable is clipped direct. How do its single-phase and three-phase capacities compare?',
    options: ['175 A single against 151 A three', '190 A single against 163 A three', '151 A single against 175 A three', '175 A single against 163 A three'],
    correctAnswer: 0,
    explanation:
      'Table 4D4A, Method C, 50 mm²: 175 A with two loaded conductors and 151 A with three. Three loaded cores generate more heat inside the same sheath, so the figure is lower. The 190/163 pair is Method E, and the third option has the columns the wrong way round.',
    reference: ARM_REF('Table 4D4A', '50 mm² row, Reference Method C, both columns'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 221,
    question: 'A 63 A single-phase supply is to run in multicore XLPE in trunking (Method B). What is the smallest size?',
    options: ['6 mm², at 51 A', '10 mm², at 69 A', '16 mm², at 91 A', '10 mm², at 60 A'],
    correctAnswer: 1,
    explanation:
      'Table 4E2A, Method B, two loaded conductors: 6 mm² reads 51 A, short of 63 A, and 10 mm² reads 69 A, which serves. 91 A is the 16 mm² row, larger than needed; 60 A is the 10 mm² three-phase column.',
    reference: ARM_REF('Table 4E2A', 'Reference Method B, two loaded conductors, 6 mm² and 10 mm² rows'),
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 222,
    question: 'A 1.5 mm² armoured PVC cable is clipped direct, single-phase. Look up its capacity.',
    options: ['18 A', '22 A', '21 A', '28 A'],
    correctAnswer: 2,
    explanation:
      'Table 4D4A, Method C, two loaded conductors, 1.5 mm² reads 21 A. 18 A is the three-phase column, 22 A is Method E, and 28 A is the 2.5 mm² row.',
    reference: ARM_REF('Table 4D4A', '1.5 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'basic',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 223,
    question: 'A 120 mm² armoured XLPE cable lies on a perforated tray (Method E), three-phase. Look up its capacity.',
    options: ['335 A', '410 A', '392 A', '353 A'],
    correctAnswer: 3,
    explanation:
      'Table 4E4A, Method E, three loaded conductors, 120 mm² reads 353 A. 335 A is Method C three-phase, 410 A is Method E single-phase, and 392 A is Method C single-phase.',
    reference: ARM_REF('Table 4E4A', '120 mm² row, Reference Method E, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 224,
    question: 'Single-core XLPE cables run in trunking on a wall (Method B), 16 mm², single-phase. What capacity applies?',
    options: ['88 A', '81 A', '100 A', '109 A'],
    correctAnswer: 2,
    explanation:
      'Table 4E1A, Method B, two loaded conductors, 16 mm² reads 100 A. 88 A is the three-phase column, 81 A is Method A single-phase, and 109 A is Method C single-phase.',
    reference: ARM_REF('Table 4E1A', '16 mm² row, Reference Method B, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Armoured and XLPE cables',
  },
  {
    id: 225,
    question:
      'A 90 °C thermosetting cable is terminated into a consumer unit whose terminals are rated for 70 °C. Which capacity column must the design use?',
    options: [
      'The 90 °C column, because the cable rating is what matters',
      'The 70 °C column, because the terminal limits the temperature',
      'The 90 °C column, with a 70 °C rating factor applied to it',
      'Either column, provided the cable is derated by 0.9 overall',
    ],
    correctAnswer: 1,
    explanation:
      'Regulation 512.1.5 limits every part of a circuit to the lowest temperature its equipment can stand, and the note to Table 52.2 says that where a conductor is sized this way the maximum permitted operating temperature is taken as 70 °C. So the 70 °C column governs, even though the 90 °C cable itself could run hotter. There is no 0.9 factor, and there is no 70 °C rating factor to apply to the 90 °C column.',
    reference: 'BS 7671 Regulation 512.1.5 and the note to Table 52.2 — equipment temperature limits the conductor',
    difficulty: 'advanced',
    category: 'Armoured and XLPE cables',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// TESTING LIMITS — BS 7671 Table 64 and Chapter 64, with Guidance Note 3
// ═══════════════════════════════════════════════════════════════════════════
const TESTING: Q[] = [
  {
    id: 226,
    question: 'A 230 V final circuit is to be tested for insulation resistance. Look up the test voltage and the minimum acceptable value.',
    options: ['250 V DC, 0.5 MΩ', '500 V DC, 1.0 MΩ', '500 V DC, 0.5 MΩ', '1000 V DC, 1.0 MΩ'],
    correctAnswer: 1,
    explanation:
      'Table 64 gives 500 V DC and a minimum of 1.0 MΩ for circuits up to and including 500 V. 250 V DC and 0.5 MΩ is the SELV and PELV row, 1000 V DC is for circuits above 500 V, and the third option mixes the two rows.',
    reference: IR_REF,
    difficulty: 'basic',
    category: 'Testing limits',
  },
  {
    id: 227,
    question: 'A SELV lighting circuit is to be tested for insulation resistance. What does Table 64 require?',
    options: ['500 V DC, 1.0 MΩ', '250 V DC, 0.5 MΩ', '250 V DC, 1.0 MΩ', '500 V DC, 0.5 MΩ'],
    correctAnswer: 1,
    explanation:
      'Table 64 lists SELV and PELV on their own row: 250 V DC, minimum 0.5 MΩ. 500 V DC and 1.0 MΩ belongs to circuits up to and including 500 V, which the row explicitly excludes SELV and PELV from; the other two options pair a voltage from one row with a value from the other.',
    reference: IR_REF,
    difficulty: 'basic',
    category: 'Testing limits',
  },
  {
    id: 228,
    question: 'A circuit operating above 500 V is to be tested for insulation resistance. What does Table 64 require?',
    options: ['500 V DC, 1.0 MΩ', '1000 V DC, 2.0 MΩ', '1000 V DC, 1.0 MΩ', '500 V DC, 2.0 MΩ'],
    correctAnswer: 2,
    explanation:
      'Table 64 gives 1000 V DC and a minimum of 1.0 MΩ for circuits above 500 V. The minimum stays at 1.0 MΩ — only the test voltage rises. 2.0 MΩ is not a figure the table prints, and 500 V DC is the row below.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 229,
    question: 'A 230 V circuit tested at 500 V DC reads 0.7 MΩ. What is the verdict against Table 64?',
    options: [
      'Fails — 0.7 MΩ is under the 1.0 MΩ minimum for this row',
      'Passes — 0.7 MΩ is above the 0.5 MΩ minimum for this row',
      'Passes — any reading above 0.5 MΩ is acceptable on any circuit',
      'Fails — the minimum for this row is 2.0 MΩ',
    ],
    correctAnswer: 0,
    explanation:
      'The row for circuits up to and including 500 V requires at least 1.0 MΩ at 500 V DC, so 0.7 MΩ fails. The 0.5 MΩ figure belongs to the SELV and PELV row and does not apply to a 230 V final circuit; 2.0 MΩ is not in the table at all.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 230,
    question: 'A PELV circuit tested at 250 V DC reads 0.6 MΩ. What is the verdict against Table 64?',
    options: [
      'Fails — the minimum is 1.0 MΩ on every circuit',
      'Fails — PELV must be tested at 500 V DC instead',
      'Passes — 0.6 MΩ clears the 0.5 MΩ minimum for this row',
      'Passes — but only because the circuit is under 50 V',
    ],
    correctAnswer: 2,
    explanation:
      'SELV and PELV are tested at 250 V DC with a minimum of 0.5 MΩ, so 0.6 MΩ passes. The 1.0 MΩ minimum belongs to the rows above, PELV is not tested at 500 V DC, and the verdict comes from the table row, not the circuit voltage on its own.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 231,
    question:
      'A general non-delay RCD is tested with an alternating current at its rated residual operating current. Within what time must it disconnect?',
    options: ['40 ms', '150 ms', '300 ms', '200 ms'],
    correctAnswer: 2,
    explanation:
      'BS 7671 deems effectiveness verified where a general non-delay type RCD disconnects within 300 ms maximum at its rated residual operating current, whatever its Type. 40 ms is the limit for the five-times test, and 150 ms and 200 ms are not figures the standard gives here.',
    reference: RCD_REF,
    difficulty: 'basic',
    category: 'Testing limits',
  },
  {
    id: 232,
    question:
      'A Type AC RCD fails to trip within 40 ms at five times its rated residual current, but the manufacturer declares 250 mA for that test. What does Guidance Note 3 say?',
    options: [
      'The declared 250 mA takes precedence — this is not evidence of a fault',
      'The device is faulty and must be replaced before the certificate is issued',
      'The test must be repeated at the rated residual current of 30 mA instead',
      'The 40 ms limit does not apply to Type AC devices at all',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 says the manufacturer may declare 250 mA for the Type AC 40 ms test in place of five times the rated current, and the declared figure takes precedence when interpreting the result. Failing at five times the rated current is therefore not definitive of a fault. Repeating at the 30 mA rated current would be the 300 ms test, a different check, and the 40 ms limit does apply — at the declared current.',
    reference: RCD_REF,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 233,
    question:
      'A time-delayed RCD to BS EN 60947-2 is tested. How does Guidance Note 3 say the delay should be recorded?',
    options: [
      'In the Remarks column, as t and the delay, for example t=40 ms',
      'In the disconnection time column, as the total measured time',
      'On a separate sheet attached to the schedule of results',
      'It is not recorded — such devices are outside the schedule',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 says to identify time-delayed characteristics by recording t followed by the delay in the Remarks column of the Schedule of Test Results, for example t=40 ms. Burying it in the disconnection time column loses the distinction, and these devices are certainly recorded.',
    reference: RCD_REF,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 234,
    question:
      'You look for a maximum permitted value for the continuity of protective conductors. What do the tables give?',
    options: [
      'No numeric limit — compare with the value you calculate',
      'A fixed maximum of 0.05 Ω for any protective conductor',
      'A fixed maximum of 1.0 Ω for circuits rated up to 32 A',
      'The maximum Zs table values, divided by ten throughout',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 sets no numeric ceiling for continuity. Acceptance is judged against the expected value you calculate from the conductor sizes and route length using the resistance per metre in Table I1. 0.05 Ω is a rule of thumb sometimes quoted for a short bonding conductor and 1.0 Ω appears nowhere in the standard for this test; the Zs tables serve a different test again.',
    reference: `BS 7671 Regulation 643.2.1 — no numeric limit; ${I1_REF('calculate the expected value')}`,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 235,
    question:
      'Guidance Note 3 Appendix 3 gives an acceptance equation for a measured earth fault loop impedance. What is it?',
    options: [
      'The measured Zs must not exceed 0.8 times the value from the table',
      'The measured Zs must not exceed 0.95 times the value from the table',
      'The measured Zs must not exceed the table value, with no factor applied',
      'The measured Zs must not exceed 1.2 times the value from the table',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 Appendix 3 accepts a measured Zs only up to 0.8 times the tabulated value, because the table assumes conductors at operating temperature and the test is made cold. 0.95 is a looser factor some testers apply, the table value alone ignores the temperature difference, and 1.2 is the resistance multiplier for 70 °C, not an acceptance factor.',
    reference: GN3_08,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 236,
    question:
      'The insulation of an extraneous-conductive-part is used to satisfy Regulation 418.1.4(c). What must it achieve when tested?',
    options: [
      'Not less than 1 MΩ when tested at 500 V DC',
      'Not less than 0.5 MΩ when tested at 250 V DC',
      'Not less than 2 MΩ when tested at 500 V DC',
      'Not less than 1 MΩ when tested at 250 V DC',
    ],
    correctAnswer: 0,
    explanation:
      'The regulation requires an insulation resistance of not less than 1 MΩ when tested at 500 V DC. The 0.5 MΩ at 250 V DC figure belongs to SELV and PELV circuits in Table 64, 2 MΩ is not a published value, and the fourth option pairs the right value with the wrong test voltage.',
    reference: 'BS 7671 Regulation 418.1.4(c) — insulation of extraneous-conductive-parts',
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 237,
    question: 'A 400 V three-phase distribution circuit is to be tested for insulation resistance. What does Table 64 require?',
    options: ['1000 V DC, 1.0 MΩ', '500 V DC, 1.0 MΩ', '500 V DC, 0.5 MΩ', '400 V DC, 1.0 MΩ'],
    correctAnswer: 1,
    explanation:
      'At 400 V the circuit falls in the row for circuits up to and including 500 V: 500 V DC, minimum 1.0 MΩ. 1000 V DC is only for circuits above 500 V, 0.5 MΩ is the SELV and PELV minimum, and the test voltage is never matched to the circuit voltage.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 238,
    question: 'Which table and regulation give the insulation resistance test voltages and minimum values?',
    options: ['Table 41.3, Regulation 411.4.202', 'Table 4Ab, Regulation 525.1', 'Table 64, Regulation 643.3.2', 'Table 54.7, Regulation 543.1.4'],
    correctAnswer: 2,
    explanation:
      'Table 64 sits in Regulation 643.3.2, in the inspection and testing chapter. Table 41.3 is maximum Zs for circuit-breakers, Table 4Ab is voltage drop, and Table 54.7 concerns protective conductor sizing.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 239,
    question:
      'An apprentice tests a SELV circuit at 500 V DC and reads 0.8 MΩ, then records it as a pass. What is wrong?',
    options: [
      'The test voltage — SELV is tested at 250 V DC, where the minimum is 0.5 MΩ',
      'The reading — 0.8 MΩ fails whichever row of the table is applied to it',
      'Nothing — 500 V DC is the correct test voltage for every circuit',
      'The record — a SELV circuit is not subject to an insulation test at all',
    ],
    correctAnswer: 0,
    explanation:
      'Table 64 lists SELV and PELV separately at 250 V DC with a 0.5 MΩ minimum, so testing at 500 V DC applies the wrong row and risks damaging connected equipment. Against its own row the 0.8 MΩ reading would pass, 500 V is not universal, and SELV circuits are certainly tested.',
    reference: IR_REF,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 240,
    question:
      'The Table 64 row for circuits up to and including 500 V is qualified "with the exception of the above systems". What does that exclude?',
    options: ['SELV and PELV circuits, which have their own row', 'FELV circuits, which are tested at 1000 V DC', 'Circuits protected by a 30 mA RCD', 'Three-phase circuits, which are tested separately'],
    correctAnswer: 0,
    explanation:
      'The exception points back to the SELV and PELV row above it, which is tested at 250 V DC to a 0.5 MΩ minimum. FELV is not tested at 1000 V DC, and neither 30 mA RCD protection nor the number of phases changes which row applies.',
    reference: IR_REF,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 241,
    question: 'At what current is the 300 ms RCD disconnection test carried out?',
    options: ['Five times the rated residual operating current', 'The rated residual operating current', 'Half the rated residual operating current', 'The rated load current of the circuit'],
    correctAnswer: 1,
    explanation:
      'The 300 ms figure applies to a test at the rated residual operating current, written IΔn — 30 mA for a 30 mA device. Five times that current is the separate faster test, half is the no-trip check, and the circuit load current is not used for this test at all.',
    reference: RCD_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 242,
    question: 'A 230 V circuit tested at 500 V DC reads 999 MΩ, the top of the instrument range. What do you record?',
    options: [
      'A pass — the reading is far above the 1.0 MΩ minimum',
      'A fail — a reading at the instrument limit is not a valid measurement',
      'A pass — but only after repeating the test at 1000 V DC',
      'A fail — anything above 500 MΩ indicates a disconnected circuit',
    ],
    correctAnswer: 0,
    explanation:
      'Table 64 sets a minimum of 1.0 MΩ, so a very high reading is a good result and is recorded as measured. A reading at the top of the range is valid, 1000 V DC belongs to circuits above 500 V, and a high insulation reading is not evidence of a disconnection.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 243,
    question: 'Which is tested at the higher DC voltage: a 230 V final circuit or a SELV circuit?',
    options: ['The SELV circuit — 500 V against 250 V', 'The 230 V circuit — 500 V against 250 V', 'Both the same — 500 V DC', 'The SELV circuit — 1000 V against 500 V'],
    correctAnswer: 1,
    explanation:
      'The 230 V circuit is tested at 500 V DC and the SELV circuit at 250 V DC, because SELV equipment would be damaged by the higher voltage. 1000 V DC is reserved for circuits above 500 V.',
    reference: IR_REF,
    difficulty: 'basic',
    category: 'Testing limits',
  },
  {
    id: 244,
    question: 'A 100 mA general non-delay RCD is tested at its rated residual operating current. What is the time limit?',
    options: ['40 ms, as for the five-times test', '300 ms, the same as for a 30 mA device', '150 ms, scaled from the 30 mA figure', '500 ms, because the rating is higher'],
    correctAnswer: 1,
    explanation:
      'The 300 ms limit for a general non-delay type applies at the rated residual operating current whatever that rating is, so a 100 mA device gets the same 300 ms as a 30 mA one. 40 ms is the five-times test, and neither 150 ms nor 500 ms appears in the standard.',
    reference: RCD_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 245,
    question:
      'A 32 A Type B circuit-breaker protects a circuit whose cold measured Zs is exactly 1.37 Ω. Apply the Guidance Note 3 acceptance equation.',
    options: [
      'It fails — the acceptance limit is 1.10 Ω, not the 1.37 Ω table value',
      'It passes — 1.37 Ω is exactly the tabulated maximum for the device',
      'It passes — the 0.8 factor applies only to circuits rated over 32 A',
      'It fails — the acceptance limit is 1.30 Ω once 0.95 is applied to it',
    ],
    correctAnswer: 0,
    explanation:
      'The 1.37 Ω in the table is the limit at conductor operating temperature. Guidance Note 3 accepts a cold measurement only up to 0.8 times that, which is 1.10 Ω, so a reading of 1.37 Ω cold fails. The factor applies at every rating, and the 1.30 Ω that 0.95 would give is the looser convention some testers use, not the one Guidance Note 3 sets.',
    reference: `${ZS_MCB('Type B, 32 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 246,
    question:
      'You measure 1.2 MΩ between live conductors and earth on a 230 V circuit at 500 V DC. Against Table 64, what do you do?',
    options: [
      'Record a pass — it clears the 1.0 MΩ minimum, if not by much',
      'Record a fail — the minimum for a final circuit is 2.0 MΩ',
      'Retest at 250 V DC, which is the correct voltage for a final circuit',
      'Record a fail — readings under 2.0 MΩ must be investigated first',
    ],
    correctAnswer: 0,
    explanation:
      'The minimum is 1.0 MΩ, so 1.2 MΩ passes, though a reading that close to the floor is worth noting for comparison at the next inspection. 2.0 MΩ is not a figure the table gives, and 250 V DC is the SELV and PELV row.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 247,
    question:
      'A 30 m radial in 2.5/1.5 mm² reads 0.58 Ω on the continuity test. What does that tell you, and against what?',
    options: [
      'It matches the 0.585 Ω expected from Table I1 — the circuit is sound',
      'It fails the 0.5 Ω maximum that BS 7671 sets for continuity',
      'It cannot be judged — continuity has no expected value to compare with',
      'It fails, because the figure should be 0.70 Ω at operating temperature',
    ],
    correctAnswer: 0,
    explanation:
      'Table I1 gives 19.51 mΩ/m for 2.5/1.5 mm², so a 30 m run should read about 0.585 Ω cold — the measurement agrees. BS 7671 sets no numeric maximum for continuity, and 0.70 Ω is the hot value, which a cold test would not produce.',
    reference: `${I1_REF('2.5 mm² plus 1.5 mm² rows, × 30 m')}; BS 7671 Regulation 643.2.1`,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
  {
    id: 248,
    question: 'Across the three rows of Table 64, how does the minimum insulation resistance change?',
    options: [
      'It is 0.5 MΩ for SELV and PELV and 1.0 MΩ for both other rows',
      'It rises with the test voltage: 0.5, 1.0 and 2.0 MΩ',
      'It is 1.0 MΩ on every row, with only the test voltage changing',
      'It falls as the circuit voltage rises: 1.0, 0.5 and 0.5 MΩ',
    ],
    correctAnswer: 0,
    explanation:
      'Table 64 gives 0.5 MΩ for SELV and PELV at 250 V DC, then 1.0 MΩ for circuits up to and including 500 V and 1.0 MΩ again for circuits above 500 V. Only the test voltage rises across the last two rows; the minimum does not reach 2.0 MΩ anywhere, and it does not fall.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 249,
    question: 'Why does Table 64 give SELV and PELV a lower test voltage than other circuits?',
    options: [
      'The equipment on those circuits would be damaged by 500 V DC',
      'Those circuits carry less current, so they need less test voltage',
      'The insulation on those circuits is thinner and fails the higher test',
      'It matches the 50 V limit for touch voltage on a faulty circuit',
    ],
    correctAnswer: 0,
    explanation:
      'SELV and PELV circuits operate at extra-low voltage and their connected equipment is not built to withstand 500 V DC, so the table sets 250 V DC with a 0.5 MΩ minimum. Current rating, insulation thickness and the 50 V touch voltage limit are separate matters.',
    reference: IR_REF,
    difficulty: 'intermediate',
    category: 'Testing limits',
  },
  {
    id: 250,
    question:
      'A 20 A Type C circuit-breaker protects a circuit measuring 0.85 Ω cold. Apply the acceptance equation and give the verdict.',
    options: [
      'Passes — the limit is 0.87 Ω, and 0.85 Ω is inside it',
      'Fails — the limit is 0.87 Ω, and 0.85 Ω exceeds it',
      'Passes — 0.85 Ω is under the 1.09 Ω tabulated maximum',
      'Fails — the limit is 0.55 Ω once the factor is applied',
    ],
    correctAnswer: 0,
    explanation:
      'Type C at 20 A is 1.09 Ω; 1.09 × 0.8 = 0.87 Ω is the acceptance limit for a cold measurement, and 0.85 Ω is just inside it. Comparing against 1.09 Ω alone skips the factor, and 0.55 Ω is the Type C 40 A row.',
    reference: `${ZS_MCB('Type C, 20 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Testing limits',
  },
];

// ── Top-ups: reduced low voltage, buried cables, concrete troughs, ──────────
// ── three-phase voltage drop, and further rows of the main tables ───────────
const MAX_ZS_MORE: Q[] = [
  {
    id: 251,
    question:
      'A 110 V centre-tapped site transformer (Uo = 55 V to earth) feeds a 16 A Type B circuit-breaker. Look up the maximum Zs.',
    options: ['2.73 Ω', '0.33 Ω', '0.65 Ω', '0.52 Ω'],
    correctAnswer: 2,
    explanation:
      'Table 41.6 covers reduced low voltage systems: Type B at 16 A reads 0.65 Ω. 2.73 Ω is the 230 V value from Table 41.3, 0.33 Ω is Type C at 16 A, and 0.52 Ω is Type B at 20 A.',
    reference: RLV_REF('Type B, 16 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 252,
    question: 'A 32 A Type B circuit-breaker protects a 110 V site distribution board. What maximum Zs applies?',
    options: ['1.37 Ω', '0.26 Ω', '0.16 Ω', '0.33 Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.6, Type B at 32 A, reads 0.33 Ω. 1.37 Ω is the 230 V figure, 0.26 Ω is the 40 A row, and 0.16 Ω is Type C at 32 A.',
    reference: RLV_REF('Type B, 32 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 253,
    question: 'A 16 A Type C circuit-breaker feeds a 110 V transformer circuit. Look up the maximum Zs.',
    options: ['0.65 Ω', '0.16 Ω', '1.37 Ω', '0.33 Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.6, Type C at 16 A, reads 0.33 Ω — half the Type B figure of 0.65 Ω, as at 230 V. 0.16 Ω is Type D at 16 A, and 1.37 Ω is the 230 V Type C value.',
    reference: RLV_REF('Type C, 16 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 254,
    question: 'A 20 A Type D circuit-breaker protects a 110 V supply to a site tool. What is the maximum Zs?',
    options: ['0.26 Ω', '0.13 Ω', '0.52 Ω', '0.55 Ω'],
    correctAnswer: 1,
    explanation:
      'Table 41.6, Type D at 20 A, reads 0.13 Ω. 0.26 Ω is Type C at 20 A, 0.52 Ω is Type B at 20 A, and 0.55 Ω is the 230 V Type D value.',
    reference: RLV_REF('Type D, 20 A row'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 255,
    question: 'A 32 A BS 88-2 fuse protects a 110 V site distribution circuit. Look up the maximum Zs.',
    options: ['0.99 Ω', '0.52 Ω', '0.42 Ω', '0.31 Ω'],
    correctAnswer: 2,
    explanation:
      'Table 41.6, BS 88-2 fuse at 32 A, reads 0.42 Ω. 0.99 Ω is the 230 V figure from Table 41.2, 0.52 Ω is the 25 A row, and 0.31 Ω is the 40 A row.',
    reference: RLV_REF('BS 88-2 fuse, 32 A row'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 256,
    question: 'Why are the reduced low voltage values so much lower than the 230 V ones for the same device?',
    options: [
      'Uo is 55 V, not 230 V, so the same current needs a quarter of the loop',
      'The tables assume a higher ambient temperature on a construction site',
      'A centre-tapped transformer has twice the earth fault current available',
      'Site cables are shorter, so the tables assume a smaller circuit length',
    ],
    correctAnswer: 0,
    explanation:
      'The maximum Zs is Uo divided by the current that operates the device. On a 110 V centre-tapped supply Uo to earth is 55 V rather than 230 V, so the permitted loop is roughly a quarter. Ambient temperature, fault current and circuit length are not what the table is derived from.',
    reference: RLV_REF('the derivation of the table'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 257,
    question: 'A 6 A Type B circuit-breaker protects a 110 V lighting string. Look up the maximum Zs.',
    options: ['7.28 Ω', '1.05 Ω', '0.87 Ω', '1.74 Ω'],
    correctAnswer: 3,
    explanation:
      'Table 41.6, Type B at 6 A, reads 1.74 Ω. 7.28 Ω is the 230 V value, 1.05 Ω is the 10 A row, and 0.87 Ω is Type C at 6 A.',
    reference: RLV_REF('Type B, 6 A row'),
    difficulty: 'intermediate',
    category: 'Maximum Zs',
  },
  {
    id: 258,
    question: 'A 63 A BS 88-2 fuse protects the incoming side of a 110 V site board. What maximum Zs applies?',
    options: ['0.44 Ω', '0.31 Ω', '0.19 Ω', '0.13 Ω'],
    correctAnswer: 2,
    explanation:
      'Table 41.6, BS 88-2 at 63 A, reads 0.19 Ω. 0.44 Ω is the 230 V figure, 0.31 Ω is the 40 A row, and 0.13 Ω is the 80 A row.',
    reference: RLV_REF('BS 88-2 fuse, 63 A row'),
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 259,
    question: 'The same 16 A Type B device is used at 230 V and on a 110 V site supply. Compare the two table values.',
    options: ['2.73 Ω at 230 V against 0.65 Ω at 110 V', '2.73 Ω at 230 V against 1.37 Ω at 110 V', '1.37 Ω at 230 V against 0.33 Ω at 110 V', '2.19 Ω at 230 V against 0.52 Ω at 110 V'],
    correctAnswer: 0,
    explanation:
      'Table 41.3 gives 2.73 Ω at 230 V and Table 41.6 gives 0.65 Ω on a 110 V centre-tapped supply. The 1.37/0.33 pair belongs to 32 A and the 2.19/0.52 pair to 20 A — the right relationship, the wrong rating.',
    reference: `${ZS_MCB('Type B, 16 A row')}; ${RLV_REF('Type B, 16 A row')}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
  {
    id: 260,
    question:
      'A 110 V site circuit on a 16 A Type B breaker measures 0.70 Ω cold. Look up Table 41.6 and give the verdict.',
    options: [
      'Fails — 0.70 Ω is above the 0.65 Ω table value before any factor',
      'Passes — 0.70 Ω is under the 2.73 Ω limit for a 16 A Type B',
      'Passes — 0.70 Ω is under the 0.52 Ω limit after the 0.8 factor',
      'Fails — but only because the 0.8 factor gives 0.52 Ω',
    ],
    correctAnswer: 0,
    explanation:
      'Table 41.6 gives 0.65 Ω, and the cold acceptance limit would be 0.65 × 0.8 = 0.52 Ω. A reading of 0.70 Ω is above even the uncorrected value, so it fails outright rather than on the factor. 2.73 Ω is the 230 V figure and does not apply to a 110 V supply.',
    reference: `${RLV_REF('Type B, 16 A row')}; ${GN3_08}`,
    difficulty: 'advanced',
    category: 'Maximum Zs',
  },
];

const RATING_MORE: Q[] = [
  {
    id: 261,
    question: 'A cable is buried direct in soil of thermal resistivity 1.5 K·m/W. Look up the rating factor.',
    options: ['1.10', '1.12', '1.28', '1.50'],
    correctAnswer: 2,
    explanation:
      'Table 4B3, direct buried column, 1.5 K·m/W reads 1.28 — better than the assumed 2.5 K·m/W, so the cable carries more. 1.10 is the same row for cables in ducts, 1.12 is 2.0 K·m/W direct buried, and 1.50 is 1.0 K·m/W.',
    reference: SOIL_REF('1.5 K·m/W row, direct buried column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 262,
    question: 'A cable is buried direct in dry sandy soil of thermal resistivity 3.0 K·m/W. Look up the factor.',
    options: ['0.96', '1.00', '1.12', '0.90'],
    correctAnswer: 3,
    explanation:
      'Table 4B3, direct buried, 3.0 K·m/W reads 0.90 — worse than the assumed 2.5, so the cable is derated. 0.96 is the same row in ducts, 1.00 is the 2.5 reference, and 1.12 is 2.0 K·m/W.',
    reference: SOIL_REF('3.0 K·m/W row, direct buried column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 263,
    question: 'What soil thermal resistivity do the buried-cable tables assume, and what factor goes with it?',
    options: ['1.0 K·m/W, factor 1.50', '2.5 K·m/W, factor 1.00', '2.0 K·m/W, factor 1.12', '0.7 K·m/W, factor 1.62'],
    correctAnswer: 1,
    explanation:
      'The tabulated buried capacities assume 2.5 K·m/W, which is why that row reads 1.00 in both columns. The 1.0/1.50, 2.0/1.12 and 0.7/1.62 pairs are all real rows of the same table, but each is a departure from the assumption rather than the assumption itself.',
    reference: SOIL_REF('2.5 K·m/W reference row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 264,
    question: 'A cable runs in a buried duct through soil of thermal resistivity 1.0 K·m/W. Look up the factor.',
    options: ['1.50', '1.20', '1.10', '1.18'],
    correctAnswer: 3,
    explanation:
      'Table 4B3, in-duct column, 1.0 K·m/W reads 1.18. 1.50 is the direct buried figure for the same soil, 1.20 is 0.7 K·m/W in duct, and 1.10 is 1.5 K·m/W in duct.',
    reference: SOIL_REF('1.0 K·m/W row, in-duct column'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 265,
    question: 'A cable is buried direct in permanently wet ground of thermal resistivity 0.5 K·m/W. Look up the factor.',
    options: ['1.28', '1.62', '1.88', '1.50'],
    correctAnswer: 2,
    explanation:
      'Table 4B3, direct buried, 0.5 K·m/W reads 1.88 — the highest figure in the column, because wet ground carries heat away well. 1.28 is the same row in ducts, 1.62 is 0.7 K·m/W direct, and 1.50 is 1.0 K·m/W direct.',
    reference: SOIL_REF('0.5 K·m/W row, direct buried column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 266,
    question: 'A site investigation finds the soil is wetter than the tables assume. What happens to the buried cable rating?',
    options: [
      'It rises — a factor above 1.00 applies, so the cable carries more',
      'It falls — wet ground increases the thermal resistivity of the soil',
      'It is unchanged — soil resistivity affects only cables in ducts',
      'It falls — the depth of laying factor cancels out the improvement',
    ],
    correctAnswer: 0,
    explanation:
      'Lower thermal resistivity means the ground removes heat more readily, so every row below the 2.5 K·m/W assumption carries a factor above 1.00 and the capacity rises. Wet ground lowers resistivity rather than raising it, the factor applies to both direct-buried and ducted cables, and depth is a separate table.',
    reference: SOIL_REF('rows below the 2.5 K·m/W assumption'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 267,
    question: 'A cable is buried direct at a depth of 1.0 m. Look up the depth of laying factor.',
    options: ['1.00', '0.98', '0.95', '0.97'],
    correctAnswer: 3,
    explanation:
      'Table 4B4, direct buried, 1.0 m reads 0.97. 1.00 is the 0.7 m reference row, 0.98 is 1.0 m for a cable in a duct, and 0.95 is 1.25 m direct buried.',
    reference: DEPTH_REF('1.0 m row, direct buried column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 268,
    question: 'At which burial depth do both columns of the depth table read 1.00?',
    options: ['0.5 m', '0.7 m', '1.0 m', '1.25 m'],
    correctAnswer: 1,
    explanation:
      'The 0.7 m row is the reference, reading 1.00 for both direct-buried and ducted cables. At 0.5 m the factors rise slightly, to 1.03 and 1.02, because the cable is nearer the surface. Below 0.7 m they fall — 0.97 at 1.0 m and 0.95 at 1.25 m for a direct-buried cable.',
    reference: DEPTH_REF('0.7 m reference row'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 269,
    question: 'A cable runs in a duct buried 2.0 m deep. Look up the depth of laying factor.',
    options: ['0.92', '0.95', '0.93', '0.90'],
    correctAnswer: 2,
    explanation:
      'Table 4B4, in-duct column, 2.0 m reads 0.93. 0.92 is the direct-buried figure at the same depth, 0.95 is 1.5 m in duct, and 0.90 is 2.5 m direct buried.',
    reference: DEPTH_REF('2.0 m row, in-duct column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 270,
    question: 'A cable is buried direct at 3.0 m to pass under a road. Look up the factor.',
    options: ['0.91', '0.92', '0.90', '0.89'],
    correctAnswer: 3,
    explanation:
      'Table 4B4, direct buried, 3.0 m reads 0.89 — the deepest row in the table. 0.91 is the same depth in a duct, 0.92 is 2.0 m direct, and 0.90 is 2.5 m direct.',
    reference: DEPTH_REF('3.0 m row, direct buried column'),
    difficulty: 'intermediate',
    category: 'Rating factors',
  },
  {
    id: 271,
    question:
      'A cable is buried direct at 1.5 m in soil of 1.0 K·m/W. Look up both factors and give the combined multiplier.',
    options: ['1.41', '1.50', '1.13', '1.32'],
    correctAnswer: 0,
    explanation:
      'Depth 1.5 m direct buried gives 0.94 and soil resistivity 1.0 K·m/W gives 1.50: 0.94 × 1.50 = 1.41. 1.50 applies the soil factor alone, 1.13 uses the in-duct soil figure of 1.18 with the depth factor, and 1.32 uses the 1.5 K·m/W soil row.',
    reference: `${DEPTH_REF('1.5 m row')}; ${SOIL_REF('1.0 K·m/W row')}`,
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 272,
    question:
      'Three circuits of 4 mm² single-core cable lie touching in the centre of an in-floor concrete trough (Method 118). Look up the grouping factor.',
    options: ['0.93', '0.91', '0.92', '0.90'],
    correctAnswer: 3,
    explanation:
      'Table 4C6, Method 118, 4 mm², three circuits reads 0.90. 0.93 is the two-circuit figure, 0.91 is Method 119 at three circuits, and 0.92 is Method 120 at three circuits.',
    reference: TROUGH_REF('Method 118, 4 mm², 3 circuits'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 273,
    question:
      'Four circuits of 10 mm² cable lie touching at the edge of a concrete trough (Method 120). Look up the factor.',
    options: ['0.84', '0.86', '0.87', '0.90'],
    correctAnswer: 2,
    explanation:
      'Table 4C6, Method 120, 10 mm², four circuits reads 0.87. 0.84 is Method 118 at the same cell, 0.86 is Method 119, and 0.90 is Method 120 at three circuits.',
    reference: TROUGH_REF('Method 120, 10 mm², 4 circuits'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 274,
    question:
      'Two circuits of 16 mm² cable are spaced in the centre of a concrete trough (Method 119). Look up the factor.',
    options: ['0.88', '0.92', '0.87', '0.90'],
    correctAnswer: 3,
    explanation:
      'Table 4C6, Method 119, 16 mm², two circuits reads 0.90. 0.88 is Method 118 at the same cell, 0.92 is Method 120, and 0.87 is Method 119 at three circuits.',
    reference: TROUGH_REF('Method 119, 16 mm², 2 circuits'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 275,
    question:
      'Eight circuits of 25 mm² cable lie touching in the centre of a concrete trough (Method 118). Look up the factor.',
    options: ['0.68', '0.72', '0.63', '0.71'],
    correctAnswer: 2,
    explanation:
      'Table 4C6, Method 118, 25 mm², eight circuits reads 0.63. 0.68 is Method 119 at the same cell, 0.72 is Method 120, and 0.71 is Method 118 at five circuits.',
    reference: TROUGH_REF('Method 118, 25 mm², 8 circuits'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
  {
    id: 276,
    question: 'Of the three concrete trough arrangements, which derates the cables least, and why?',
    options: [
      'Method 120 — touching at the edge, where heat escapes to the trough wall',
      'Method 118 — touching in the centre, where the cables support each other',
      'Method 119 — spaced in the centre, because spacing always wins',
      'All three are equal — the trough itself governs, not the arrangement',
    ],
    correctAnswer: 0,
    explanation:
      'Method 120, cables touching at the edge of the trough, reads the highest factor at every size and circuit count, because the trough wall draws heat away. Method 119 (spaced in the centre) is next and Method 118 (touching in the centre) the most onerous, so the three are not equal.',
    reference: TROUGH_REF('compare Methods 118, 119 and 120 at any cell'),
    difficulty: 'advanced',
    category: 'Rating factors',
  },
];

const VD_MORE: Q[] = [
  {
    id: 277,
    question: 'Look up the three-phase voltage drop figure for 2.5 mm² flat twin and earth.',
    options: ['18 mV/A/m', '25 mV/A/m', '9.5 mV/A/m', '15 mV/A/m'],
    correctAnswer: 3,
    explanation:
      'The three-phase column reads 15 mV/A/m for 2.5 mm². 18 is the single-phase figure for the same size, 25 is 1.5 mm² three-phase, and 9.5 is 4 mm² three-phase.',
    reference: VD3_REF('2.5 mm² row, three-phase column'),
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 278,
    question: 'Look up the three-phase voltage drop figure for 10 mm² cable.',
    options: ['4.4 mV/A/m', '2.4 mV/A/m', '3.8 mV/A/m', '6.4 mV/A/m'],
    correctAnswer: 2,
    explanation:
      'The three-phase column reads 3.8 mV/A/m for 10 mm². 4.4 is the single-phase figure, 2.4 is 16 mm² three-phase, and 6.4 is 6 mm² three-phase.',
    reference: VD3_REF('10 mm² row, three-phase column'),
    difficulty: 'basic',
    category: 'Voltage drop',
  },
  {
    id: 279,
    question: 'A 25 mm² three-phase sub-main carries 60 A over 40 m. Using the three-phase figure, what is the voltage drop?',
    options: ['4.2 V', '3.6 V', '5.8 V', '2.9 V'],
    correctAnswer: 1,
    explanation:
      '25 mm² three-phase is 1.5 mV/A/m: 1.5 × 60 × 40 ÷ 1000 = 3.6 V. 4.2 V uses the single-phase figure of 1.75, 5.8 V uses the 16 mm² three-phase figure of 2.4, and 2.9 V uses the 35 mm² figure.',
    reference: VD3_REF('25 mm² row, then 1.5 × 60 A × 40 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 280,
    question:
      'A 16 mm² three-phase sub-main carries 80 A over 50 m on a 400 V supply. Find the drop and the verdict against the 5% limit.',
    options: [
      '9.6 V — within the 20 V limit for a 400 V circuit',
      '11.2 V — within the 20 V limit for a 400 V circuit',
      '9.6 V — over the 11.5 V limit for a 230 V circuit',
      '9.6 V — within the 12 V limit for lighting',
    ],
    correctAnswer: 0,
    explanation:
      '16 mm² three-phase is 2.4 mV/A/m: 2.4 × 80 × 50 ÷ 1000 = 9.6 V. Table 4Ab is expressed with respect to the nominal voltage, which for this circuit is 400 V, so the 5% limit is 20 V and the run passes. 11.2 V uses the single-phase figure, 11.5 V is the 5% limit at 230 V, and 12 V is the 3% lighting limit at 400 V.',
    reference: `${VD3_REF('16 mm² row')}; ${VD_LIMIT}`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 281,
    question: 'On a 400 V three-phase supply, what is the 5% voltage drop limit in volts?',
    options: ['11.5 V', '12 V', '20 V', '23 V'],
    correctAnswer: 2,
    explanation:
      'Table 4Ab is expressed with respect to the nominal voltage, so 5% of 400 V is 20 V. 11.5 V is 5% of 230 V, 12 V is the 3% lighting limit at 400 V, and 23 V would be 10%.',
    reference: `${VD_LIMIT}, other uses, applied to 400 V`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 282,
    question: 'A three-phase lighting distribution board is fed at 400 V. What is the 3% limit in volts?',
    options: ['6.9 V', '20 V', '13.8 V', '12 V'],
    correctAnswer: 3,
    explanation:
      '3% of the 400 V nominal is 12 V. 6.9 V is 3% of 230 V, 20 V is the 5% limit at 400 V, and 13.8 V is 6% of 230 V.',
    reference: `${VD_LIMIT}, lighting, applied to 400 V`,
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 283,
    question: 'A 4 mm² three-phase circuit carries 25 A over 30 m. Using the three-phase figure, what is the drop?',
    options: ['8.25 V', '7.13 V', '4.8 V', '11.3 V'],
    correctAnswer: 1,
    explanation:
      '4 mm² three-phase is 9.5 mV/A/m: 9.5 × 25 × 30 ÷ 1000 = 7.13 V. 8.25 V uses the single-phase figure of 11, 4.8 V uses the 6 mm² figure of 6.4, and 11.3 V uses the 2.5 mm² figure of 15.',
    reference: VD3_REF('4 mm² row, then 9.5 × 25 A × 30 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 284,
    question: 'A 6 mm² three-phase circuit carries 32 A over 45 m. Find the voltage drop.',
    options: ['10.5 V', '5.47 V', '9.22 V', '12.6 V'],
    correctAnswer: 2,
    explanation:
      '6 mm² three-phase is 6.4 mV/A/m: 6.4 × 32 × 45 ÷ 1000 = 9.22 V. 10.5 V uses the single-phase figure of 7.3, 5.47 V uses the 10 mm² figure of 3.8, and 12.6 V uses the 4 mm² figure of 9.5 with the wrong length.',
    reference: VD3_REF('6 mm² row, then 6.4 × 32 A × 45 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 285,
    question: 'For a 10 mm² cable, how do the single-phase and three-phase voltage drop figures compare?',
    options: ['4.4 single against 3.8 three', '3.8 single against 4.4 three', '4.4 single against 2.4 three', '7.3 single against 6.4 three'],
    correctAnswer: 0,
    explanation:
      '10 mm² reads 4.4 mV/A/m single-phase and 3.8 mV/A/m three-phase — the three-phase figure is always the lower of the two. 2.4 is the 16 mm² three-phase value, and the 7.3/6.4 pair is 6 mm².',
    reference: VD3_REF('10 mm² row, both columns'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 286,
    question: 'A 35 mm² three-phase sub-main carries 100 A over 60 m. Find the voltage drop.',
    options: ['7.5 V', '9.0 V', '4.8 V', '6.54 V'],
    correctAnswer: 3,
    explanation:
      '35 mm² three-phase is 1.09 mV/A/m: 1.09 × 100 × 60 ÷ 1000 = 6.54 V. 7.5 V uses the single-phase figure of 1.25, 9.0 V uses the 25 mm² three-phase figure of 1.5, and 4.8 V uses the 50 mm² figure of 0.8.',
    reference: VD3_REF('35 mm² row, then 1.09 × 100 A × 60 m ÷ 1000'),
    difficulty: 'intermediate',
    category: 'Voltage drop',
  },
  {
    id: 287,
    question:
      'A 16 mm² three-phase circuit carries 100 A on a 400 V supply. Using the 5% limit, what is the longest permitted run?',
    options: ['About 48 m', 'About 83 m', 'About 71 m', 'About 60 m'],
    correctAnswer: 1,
    explanation:
      '16 mm² three-phase is 2.4 mV/A/m and the limit is 5% of 400 V, which is 20 V. Length = 20 000 ÷ (2.4 × 100) = 83.3 m. 48 m applies the 11.5 V limit from a 230 V circuit, 71 m uses the single-phase figure of 2.8, and 60 m uses the 12 V lighting limit.',
    reference: `${VD3_REF('16 mm² row')}; ${VD_LIMIT}`,
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
  {
    id: 288,
    question: 'Look up the three-phase voltage drop figure for 95 mm² aluminium XLPE cable.',
    options: ['0.61 mV/A/m', '0.73 mV/A/m', '0.42 mV/A/m', '0.53 mV/A/m'],
    correctAnswer: 3,
    explanation:
      'The aluminium XLPE table reads 0.53 mV/A/m at 95 mm² three-phase. 0.61 is the single-phase figure, 0.73 is 70 mm² three-phase, and 0.42 is 120 mm² three-phase.',
    reference: 'On-Site Guide Appendix F, aluminium thermosetting cables — voltage drop, 95 mm² row, three-phase column',
    difficulty: 'advanced',
    category: 'Voltage drop',
  },
];

const CAPACITY_MORE: Q[] = [
  {
    id: 289,
    question: 'A 35 mm² multicore 70 °C thermoplastic cable is clipped direct, single-phase. Look up its capacity.',
    options: ['111 A', '119 A', '138 A', '148 A'],
    correctAnswer: 2,
    explanation:
      'Table 4D2A, Method C, two loaded conductors, 35 mm² reads 138 A. 111 A is Method B, 119 A is the three-phase column of Method C, and 148 A is Method E.',
    reference: MULTI_REF('35 mm² row, Reference Method C, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 290,
    question: 'A 70 mm² multicore thermoplastic cable lies on a perforated tray (Method E) feeding a three-phase load. What capacity applies?',
    options: ['232 A', '184 A', '213 A', '196 A'],
    correctAnswer: 3,
    explanation:
      'Table 4D2A, Method E, three loaded conductors, 70 mm² reads 196 A. 232 A is the single-phase column, 184 A is Method C three-phase, and 213 A is Method C single-phase.',
    reference: MULTI_REF('70 mm² row, Reference Method E, three loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 291,
    question: '1.0 mm² flat twin and earth runs in an insulated stud wall, touching neither face (Method 103). Look up its capacity.',
    options: ['13 A', '16 A', '10.5 A', '8 A'],
    correctAnswer: 3,
    explanation:
      'Method 103 for 1.0 mm² is 8 A — half its clipped-direct rating of 16 A. 13 A is Methods 100 and 102, and 10.5 A is Method 101.',
    reference: CCC_REF('1.0 mm² row, Method 103 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 292,
    question: '16 mm² flat twin and earth is clipped to a joist above a ceiling with insulation not exceeding 100 mm (Method 100). Look up its capacity.',
    options: ['63 A', '46 A', '42.5 A', '57 A'],
    correctAnswer: 3,
    explanation:
      'Method 100 for 16 mm² reads 57 A. 63 A is Method 102, 46 A is Method 101, and 42.5 A is Method 103.',
    reference: CCC_REF('16 mm² row, Method 100 column'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 293,
    question: 'A 120 mm² multicore thermoplastic cable runs in trunking (Method B), single-phase. Look up its capacity.',
    options: ['206 A', '232 A', '259 A', '299 A'],
    correctAnswer: 1,
    explanation:
      'Table 4D2A, Method B, two loaded conductors, 120 mm² reads 232 A. 206 A is the three-phase column, 259 A is Method C three-phase, and 299 A is Method C single-phase.',
    reference: MULTI_REF('120 mm² row, Reference Method B, two loaded conductors'),
    difficulty: 'intermediate',
    category: 'Cable capacity',
  },
  {
    id: 294,
    question:
      'A 200 A three-phase load is to run in multicore thermoplastic cable on a perforated tray (Method E). What is the smallest size?',
    options: ['50 mm², at 153 A', '70 mm², at 196 A', '95 mm², at 238 A', '70 mm², at 232 A'],
    correctAnswer: 2,
    explanation:
      'Method E, three loaded conductors: 70 mm² reads 196 A, four amps short of 200 A, so 95 mm² at 238 A is the smallest that serves. 153 A is the 50 mm² row, and 232 A is the 70 mm² single-phase column, the wrong column for a three-phase load.',
    reference: MULTI_REF('Reference Method E, three loaded conductors, 70 mm² and 95 mm² rows'),
    difficulty: 'advanced',
    category: 'Cable capacity',
  },
];

const RESISTANCE_MORE: Q[] = [
  {
    id: 295,
    question: 'Look up the resistance of a 50 mm² copper conductor at 20 °C.',
    options: ['0.727 mΩ/m', '0.524 mΩ/m', '0.93 mΩ/m', '0.387 mΩ/m'],
    correctAnswer: 3,
    explanation:
      '50 mm² is 0.387 mΩ/m. 0.727 is 25 mm², 0.524 is 35 mm², and 0.93 is the 50 mm² voltage drop figure in mV/A/m from a different table.',
    reference: I1_REF('50 mm² row'),
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
  {
    id: 296,
    question: 'A 25 mm² sub-main with a 16 mm² cpc runs 80 m. Using Table I1, what cold (R1 + R2) do you expect?',
    options: ['0.058 Ω', '0.092 Ω', '0.150 Ω', '0.180 Ω'],
    correctAnswer: 2,
    explanation:
      '0.727 + 1.15 = 1.877 mΩ/m; × 80 ÷ 1000 = 0.150 Ω. 0.058 Ω is the 25 mm² line alone, 0.092 Ω the 16 mm² cpc alone, and 0.180 Ω is the hot figure after × 1.20.',
    reference: I1_REF('25 mm² plus 16 mm² rows, × 80 m ÷ 1000'),
    difficulty: 'advanced',
    category: 'Conductor resistance',
  },
  {
    id: 297,
    question:
      'A circuit in 90 °C thermosetting cable has a cold (R1 + R2) of 0.50 Ω. Using Table I3, what is it at operating temperature?',
    options: ['0.60 Ω', '0.64 Ω', '0.50 Ω', '0.39 Ω'],
    correctAnswer: 1,
    explanation:
      '90 °C thermosetting takes the 1.28 multiplier: 0.50 × 1.28 = 0.64 Ω. 0.60 Ω uses the 1.20 figure for thermoplastic, 0.50 Ω leaves it uncorrected, and 0.39 Ω divides instead of multiplying.',
    reference: `${I3_REF} — 90 °C thermosetting row (1.28)`,
    difficulty: 'intermediate',
    category: 'Conductor resistance',
  },
];

const DIVERSITY_MORE: Q[] = [
  {
    id: 298,
    question:
      'A house has four points of utilisation drawing 32 A, 20 A, 16 A and 13 A. Apply the Table A2 household allowance for socket-outlets and stationary equipment.',
    options: ['62.5 A', '81.0 A', '48.4 A', '51.6 A'],
    correctAnswer: 3,
    explanation:
      'Row 10, household: 100% of the largest point + 40% of every other. 32 + 0.4 × 49 = 51.6 A. 62.5 A uses the 50% shops figure, 81.0 A applies no diversity, and 48.4 A takes 40% of all four points including the largest.',
    reference: A2_REF('row 10 (socket-outlets and stationary equipment), household column'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
  {
    id: 299,
    question:
      'A small shop has standard final circuits drawing 32 A, 32 A and 20 A. Apply the Table A2 allowance for shops.',
    options: ['52.8 A', '84.0 A', '58.0 A', '42.0 A'],
    correctAnswer: 2,
    explanation:
      'Row 9, shops column: 100% of the largest circuit + 50% of every other. 32 + 0.5 × 52 = 58 A. 52.8 A uses the household 40% figure, 84.0 A applies no diversity, and 42.0 A takes 50% of just one other circuit.',
    reference: A2_REF('row 9 (standard final circuits), small shops column'),
    difficulty: 'intermediate',
    category: 'Demand and diversity',
  },
  {
    id: 300,
    question:
      'A small hotel has cooking appliances drawing 40 A, 25 A and 15 A. Apply the Table A2 allowance for hotels.',
    options: ['80.0 A', '69.0 A', '55.0 A', '36.0 A'],
    correctAnswer: 1,
    explanation:
      'Row 3, hotels column: 100% of the largest + 80% of the second + 60% of the remainder. 40 + 20 + 9 = 69 A. 80.0 A applies no diversity, 55.0 A uses the household rule, and 36.0 A applies 60% to everything after the largest.',
    reference: A2_REF('row 3 (cooking appliances), small hotels column'),
    difficulty: 'advanced',
    category: 'Demand and diversity',
  },
];

export const osgTableLookupQuestionBank: StandardMockQuestion[] = [
  ...family('Maximum Zs', [...MAX_ZS, ...MAX_ZS_MORE]),
  ...family('Rating factors', [...RATING, ...RATING_MORE]),
  ...family('Cable capacity', [...CAPACITY, ...CAPACITY_MORE]),
  ...family('Voltage drop', [...VOLT_DROP, ...VD_MORE]),
  ...family('Conductor resistance', [...RESISTANCE, ...RESISTANCE_MORE]),
  ...family('Demand and diversity', [...DIVERSITY, ...DIVERSITY_MORE]),
  ...family('Installation methods', METHODS),
  ...family('Armoured and XLPE cables', ARMOURED),
  ...family('Testing limits', TESTING),
];
