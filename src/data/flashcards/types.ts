export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export type FlashcardLevel = 'Level 2' | 'Level 3' | 'Both';

export interface FlashcardSetMeta {
  id: string;
  title: string;
  iconName: string;
  description: string;
  count: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  category: string;
  level: FlashcardLevel;
}
