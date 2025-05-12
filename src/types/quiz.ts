
import { QuizQuestion } from "@/data/unitQuizzes";

export interface QuizProps {
  unitCode: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number, totalQuestions: number) => void;
  questionCount?: number; // Default is now 30 in the UnitQuiz component
  timeLimit?: number;
  currentTime?: number;
  isSubmitted?: boolean;
}

export interface QuizNavigationProps {
  questionsCount: number;
  activeQuestion: number;
  userAnswers: (number | null)[];
  onNavigate: (index: number) => void;
}

export interface QuestionProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: (index: number) => void;
}

export interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  userAnswers: (number | null)[];
  onRetry: () => void;
}

export interface QuizControlsProps {
  isAnswered: boolean;
  isLastQuestion: boolean;
  answeredCount: number;
  totalQuestions: number;
  onNext: () => void;
  onSubmit: () => void;
}
