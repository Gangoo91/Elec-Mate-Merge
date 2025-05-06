
// This file is intentionally minimal as we've removed all EAL content
// It exists to prevent build errors from missing imports

export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}

// Empty array to prevent errors
export const healthAndSafetyQuizzes = [
  {
    id: "placeholder",
    title: "Placeholder Quiz",
    questions: [] as QuizQuestion[]
  }
];
