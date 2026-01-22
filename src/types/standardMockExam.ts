/**
 * Standardised Mock Exam Types
 *
 * Used across all upskilling mock exams to ensure consistency
 * with the AM2 mock exam design pattern.
 */

export interface StandardMockQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  section: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  topic: string;
  category: string;
}

export interface MockExamConfig {
  examId: string;
  examTitle: string;
  totalQuestions: number;
  timeLimit: number;  // seconds
  passThreshold: number;  // percentage
  exitPath: string;
  categories: string[];
}

export interface DifficultyDistribution {
  basic: number;      // 0-1 (e.g., 0.35 = 35%)
  intermediate: number;
  advanced: number;
}

export const DEFAULT_DIFFICULTY_DISTRIBUTION: DifficultyDistribution = {
  basic: 0.35,
  intermediate: 0.45,
  advanced: 0.2
};

export interface CategoryBreakdown {
  category: string;
  total: number;
  correct: number;
  percent: number;
}

export type ReviewFilter = 'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged';

export type QuestionStatus = 'correct' | 'incorrect' | 'unanswered';
