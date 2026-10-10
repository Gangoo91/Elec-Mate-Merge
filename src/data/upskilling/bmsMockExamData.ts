/**
 * BMS mock examination — rebuilt 10 Oct 2026.
 *
 * The old bank stitched 25 of the 42 section quizzes together (243 questions),
 * labelled them by slicing the list into seven equal parts (48% wrong), guessed
 * difficulty from keywords, and had nothing on BACnet or Modbus. 35 questions
 * were doubtful or wrong (KNX "24 V", EN 15232 as current, the BMS as the
 * life-safety path, invented case-study figures as correct answers).
 *
 * This bank is written per module from the rebuilt, fact-checked lesson pages:
 * 30 questions a module (10 basic, 14 intermediate, 6 advanced), labelled with
 * the module they test, none copied from the section quizzes. Ids are
 * module × 1000 + n (1001…7030) so per-question telemetry recorded against the
 * old ids 1–243 can never attach to a different question.
 */
import type { StandardMockQuestion } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';
import { bmsMockModule1 } from './bms-mock/module1';
import { bmsMockModule2 } from './bms-mock/module2';
import { bmsMockModule3 } from './bms-mock/module3';
import { bmsMockModule4 } from './bms-mock/module4';
import { bmsMockModule5 } from './bms-mock/module5';
import { bmsMockModule6 } from './bms-mock/module6';
import { bmsMockModule7 } from './bms-mock/module7';

// Categories are the seven course modules — the exam draws evenly across them.
export const bmsCategories = [
  'What a BMS is, and the rules around it',
  'Field devices and signals',
  'Controlling heating, ventilation and air conditioning',
  'Lighting, access, blinds and metering',
  'Networks and protocols',
  'Alarms, data and monitoring',
  'Design, installation, commissioning and handover',
];

export const bmsMockExamConfig = {
  examId: 'bms',
  examTitle: 'Building management systems mock examination',
  totalQuestions: 30,
  timeLimit: 2700, // 45 minutes
  passThreshold: 60,
  exitPath: '/study-centre/upskilling/bms-course',
  categories: bmsCategories,
};

export const bmsStandardQuestionBank: StandardMockQuestion[] = [
  ...bmsMockModule1,
  ...bmsMockModule2,
  ...bmsMockModule3,
  ...bmsMockModule4,
  ...bmsMockModule5,
  ...bmsMockModule6,
  ...bmsMockModule7,
];

/** 30 questions: about four per module, 35 / 45 / 20 basic / intermediate / advanced. */
export const getRandomBMSMockExamQuestions = (numQuestions: number = 30): StandardMockQuestion[] =>
  getRandomQuestionsBalanced(bmsStandardQuestionBank, numQuestions, bmsCategories, {
    basic: 0.35,
    intermediate: 0.45,
    advanced: 0.2,
  });
