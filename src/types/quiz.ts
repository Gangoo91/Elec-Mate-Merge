
// This file is intentionally empty as we've removed all EAL content
// It exists to prevent build errors from missing imports
export interface QuizQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
}
