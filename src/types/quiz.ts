
export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  // For compatibility with existing components
  question?: string;
  correctAnswer?: number;
}

export interface QuizNavigationProps {
  questionsCount: number;
  activeQuestion: number;
  userAnswers: (number | null)[];
  onNavigate: (index: number) => void;
}

export interface QuestionProps {
  question: any;
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: (selectedIndex: number) => void;
}

export interface QuizControlsProps {
  isAnswered: boolean;
  isLastQuestion: boolean;
  answeredCount: number;
  totalQuestions: number;
  onNext: () => void;
  onSubmit: () => void;
}

export interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: any[];
  userAnswers: (number | null)[];
  onRetry: () => void;
}

export interface QuizProps {
  unitCode: string;
  questions: any[];
  onQuizComplete: (score: number, totalQuestions: number) => void;
  questionCount?: number;
  timeLimit?: number;
  currentTime?: number;
  isSubmitted?: boolean;
}
