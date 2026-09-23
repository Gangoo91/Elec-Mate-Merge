export interface FlashcardData {
  id: string;
  question: string;
  answer: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  /**
   * Where the answer comes from — the regulation, table or clause.
   *
   * Shown under the answer so a learner can go and check, and so the card can
   * be verified against the standards rather than trusted. The fire-alarm
   * cards that reached a customer with wrong figures (ELE-1754) carried no
   * source, which is why nothing caught them. New cards must have one; the
   * field is optional only because 966 older cards do not yet.
   */
  reference?: string;
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
