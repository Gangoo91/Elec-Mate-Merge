export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
}
