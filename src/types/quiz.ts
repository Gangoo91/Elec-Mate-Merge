export type QuizMode = 'practice' | 'test' | 'study';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  regulation?: string; // BS7671 regulation reference
  imageUrl?: string; // Optional image for visual questions
}

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  viewedFeedback?: boolean;
  bookmarked?: boolean;
}

export interface QuizSession {
  id: string;
  assessmentId: string;
  questions: QuizQuestion[];
  answers: QuizAnswer[];
  startTime: Date;
  endTime?: Date;
  score: number;
  totalQuestions: number;
  isCompleted: boolean;
  mode: QuizMode;
  allowReview?: boolean;
  showFeedback?: boolean;
  pausedAt?: Date;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  score: number | null;
  category: string;
  color: string;
  regulation?: string; // BS7671 regulation reference
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  correctAnswers: number;
  incorrectAnswers: number;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}