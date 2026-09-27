/**
 * Welsh Level 3 — Module 9, the final paper.
 *
 * Four hundred questions covering the whole of Building Services Engineering
 * Level 3 (Electrotechnical Installation) as the Study Centre teaches it. The
 * bank is split one file per module under `welsh-level3-exam/` and assembled
 * here, so a category in the results screen is a module in the course and a
 * weak category points the learner at somewhere specific to go back to.
 *
 * The category names are deliberately short. They are the chips on the start
 * panel and the row labels in the results breakdown, and the full module
 * titles were sentences in both places.
 *
 * ┌ Category ──────────────┬ Module ┬ Questions ┐
 * │ Working practice       │   1    │    40     │
 * │ Health & safety        │   2    │    50     │
 * │ Electrical science     │   3    │    55     │
 * │ Advanced science       │   4    │    50     │
 * │ Planning & coordination│   5    │    40     │
 * │ Installation & wiring  │   6    │    60     │
 * │ Inspection & testing   │   7    │    60     │
 * │ Fault diagnosis        │   8    │    45     │
 * └────────────────────────┴────────┴──── 400 ──┘
 *
 * ACCURACY. Every question was written from the course's own teaching, which
 * had already been checked against the BS 7671 extract from the regulation
 * data (`bs7671_regulations`), and every tabulated figure quoted — maximum Zs,
 * bonding conductor sizes, mV/A/m, disconnection times — was taken from this
 * repo's own transcription of the standard rather than from recall. Nothing
 * here asserts a regulation number, a statute or a figure the course does not
 * already teach.
 *
 * 🔴 EAL qualification. No EAL mapping or endorsement is held, and nothing in
 * this paper may be described as EAL-approved or EAL-mapped.
 */

import type {
  DifficultyDistribution,
  MockExamConfig,
  StandardMockQuestion,
} from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';
import { MODULE_1_QUESTIONS } from './welsh-level3-exam/module1';
import { MODULE_2_QUESTIONS } from './welsh-level3-exam/module2';
import { MODULE_3_QUESTIONS } from './welsh-level3-exam/module3';
import { MODULE_4_QUESTIONS } from './welsh-level3-exam/module4';
import { MODULE_5_QUESTIONS } from './welsh-level3-exam/module5';
import { MODULE_6_QUESTIONS } from './welsh-level3-exam/module6';
import { MODULE_7_QUESTIONS } from './welsh-level3-exam/module7';
import { MODULE_8_QUESTIONS } from './welsh-level3-exam/module8';

/** Category names, in module order — the results screen reads in this order. */
export const welshLevel3ExamCategories = [
  'Working practice',
  'Health & safety',
  'Electrical science',
  'Advanced science',
  'Planning & coordination',
  'Installation & wiring',
  'Inspection & testing',
  'Fault diagnosis',
];

export const welshLevel3QuestionBank: StandardMockQuestion[] = [
  ...MODULE_1_QUESTIONS,
  ...MODULE_2_QUESTIONS,
  ...MODULE_3_QUESTIONS,
  ...MODULE_4_QUESTIONS,
  ...MODULE_5_QUESTIONS,
  ...MODULE_6_QUESTIONS,
  ...MODULE_7_QUESTIONS,
  ...MODULE_8_QUESTIONS,
];

/**
 * The bank's real shape, passed to the selector instead of the 35/45/20
 * default. This is a capstone paper for a whole Level 3 qualification, so it
 * leans intermediate with a genuine advanced tail — and the selector draws
 * per category, so asking it for a third basic questions in a category that
 * holds four of them would fall through to its shortfall fill and quietly
 * unbalance the categories instead.
 */
const WELSH_L3_DIFFICULTY: DifficultyDistribution = {
  basic: 0.2,
  intermediate: 0.45,
  advanced: 0.35,
};

export const welshLevel3MockExamConfig: MockExamConfig = {
  examId: 'welsh-level3-final',
  examTitle: 'Welsh Level 3 — final paper',
  totalQuestions: 60,
  timeLimit: 5400, // 90 minutes — 90 seconds a question, with reading time
  passThreshold: 70,
  exitPath: '/study-centre/apprentice/welsh-level3',
  categories: welshLevel3ExamCategories,
  subtitle: 'Sixty questions across all eight modules',
  // Only what the panel above it does not already say. The question count,
  // the bank size, the time and the retakes are all on screen already, and
  // repeating them pushed the one useful sentence onto a third line.
  note:
    'Your result breaks down by module, so a weak category tells you which part of the course to go back to rather than leaving you to revise all of it.',
};

export const getRandomWelshLevel3Questions = (numQuestions: number = 60) =>
  getRandomQuestionsBalanced(
    welshLevel3QuestionBank,
    numQuestions,
    welshLevel3ExamCategories,
    WELSH_L3_DIFFICULTY
  );
