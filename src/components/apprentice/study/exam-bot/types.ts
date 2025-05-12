
export type QuizQuestion = {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

export type QuizResult = {
  correct: number;
  total: number;
  percentage: number;
};
