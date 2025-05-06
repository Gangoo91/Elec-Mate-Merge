
// This file is intentionally minimal as we've removed all EAL content
// It exists to prevent build errors from missing imports

export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  // For legacy component compatibility
  question?: string;
  correctAnswer?: number;
}

// Empty array to prevent errors
export const healthAndSafetyQuizzes = {
  id: "placeholder",
  title: "Placeholder Quiz",
  questions: [] as QuizQuestion[]
};

