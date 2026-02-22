/**
 * Goal Setting & Continuous Growth Mock Exam Question Bank
 *
 * 200 questions across 5 categories, balanced by difficulty.
 */

import { StandardMockQuestion, MockExamConfig } from '@/types/standardMockExam';
import { getRandomQuestionsBalanced } from '@/utils/questionSelection';
import { gsCat1Questions } from './gsExamCat1';
import { gsCat2Questions } from './gsExamCat2';
import { gsCat3Questions } from './gsExamCat3';
import { gsCat4Questions } from './gsExamCat4';
import { gsCat5Questions } from './gsExamCat5';

export const gsCategories = [
  'Understanding Goals & Growth Mindset',
  'Setting Effective Goals',
  'Building Habits That Stick',
  'Tracking Progress & Continuous Improvement',
  'Your Growth Action Plan',
];

export const gsMockExamConfig: MockExamConfig = {
  examId: 'goal-setting-growth',
  examTitle: 'Goal Setting & Continuous Growth Mock Examination',
  totalQuestions: 20,
  timeLimit: 1800,
  passThreshold: 80,
  exitPath: '/study-centre/personal-development/goal-setting-growth',
  categories: gsCategories,
};

export const gsQuestionBank: StandardMockQuestion[] = [
  ...gsCat1Questions,
  ...gsCat2Questions,
  ...gsCat3Questions,
  ...gsCat4Questions,
  ...gsCat5Questions,
];

export const getRandomGSExamQuestions = (count: number): StandardMockQuestion[] => {
  return getRandomQuestionsBalanced(gsQuestionBank, count, gsCategories);
};
