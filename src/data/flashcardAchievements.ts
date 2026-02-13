export type FlashcardAchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export type FlashcardAchievementConditionType =
  | 'first_session'
  | 'cards_reviewed'
  | 'set_mastered'
  | 'sets_mastered_count'
  | 'all_sets_mastered'
  | 'streak_days'
  | 'perfect_session'
  | 'quick_review'
  | 'level_mastered';

export interface FlashcardAchievementDef {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tier: FlashcardAchievementTier;
  condition: {
    type: FlashcardAchievementConditionType;
    target: number;
    /** For level_mastered: which level */
    level?: 'Level 2' | 'Level 3';
  };
}

export const FLASHCARD_ACHIEVEMENTS: FlashcardAchievementDef[] = [
  // ── Bronze ──────────────────────────────────────────────────────
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Complete your first flashcard session',
    iconName: 'Footprints',
    tier: 'bronze',
    condition: { type: 'first_session', target: 1 },
  },
  {
    id: 'card-collector',
    title: 'Card Collector',
    description: 'Review 50 flashcards in total',
    iconName: 'Layers',
    tier: 'bronze',
    condition: { type: 'cards_reviewed', target: 50 },
  },
  {
    id: 'on-fire',
    title: 'On Fire',
    description: 'Maintain a 7-day study streak',
    iconName: 'Flame',
    tier: 'bronze',
    condition: { type: 'streak_days', target: 7 },
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Finish a Quick Review session in under 2 minutes',
    iconName: 'Zap',
    tier: 'bronze',
    condition: { type: 'quick_review', target: 120 },
  },

  // ── Silver ──────────────────────────────────────────────────────
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    description: 'Review 250 flashcards in total',
    iconName: 'BookOpen',
    tier: 'silver',
    condition: { type: 'cards_reviewed', target: 250 },
  },
  {
    id: 'set-master',
    title: 'Set Master',
    description: 'Achieve 100% mastery on any flashcard set',
    iconName: 'Star',
    tier: 'silver',
    condition: { type: 'set_mastered', target: 1 },
  },
  {
    id: 'five-star',
    title: 'Five Star',
    description: 'Achieve 100% mastery on 5 flashcard sets',
    iconName: 'Award',
    tier: 'silver',
    condition: { type: 'sets_mastered_count', target: 5 },
  },
  {
    id: 'perfect-session',
    title: 'Perfect Session',
    description: 'Score 100% accuracy in a session with 10+ cards',
    iconName: 'CheckCircle',
    tier: 'silver',
    condition: { type: 'perfect_session', target: 10 },
  },

  // ── Gold ────────────────────────────────────────────────────────
  {
    id: 'knowledge-machine',
    title: 'Knowledge Machine',
    description: 'Review 1,000 flashcards in total',
    iconName: 'Brain',
    tier: 'gold',
    condition: { type: 'cards_reviewed', target: 1000 },
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Maintain a 30-day study streak',
    iconName: 'Crown',
    tier: 'gold',
    condition: { type: 'streak_days', target: 30 },
  },
  {
    id: 'level-2-pro',
    title: 'Level 2 Pro',
    description: 'Master all Level 2 flashcard sets',
    iconName: 'Shield',
    tier: 'gold',
    condition: { type: 'level_mastered', target: 100, level: 'Level 2' },
  },
  {
    id: 'level-3-pro',
    title: 'Level 3 Pro',
    description: 'Master all Level 3 flashcard sets',
    iconName: 'ShieldCheck',
    tier: 'gold',
    condition: { type: 'level_mastered', target: 100, level: 'Level 3' },
  },

  // ── Platinum ────────────────────────────────────────────────────
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: 'Maintain a 100-day study streak',
    iconName: 'Rocket',
    tier: 'platinum',
    condition: { type: 'streak_days', target: 100 },
  },
  {
    id: 'complete-scholar',
    title: 'Complete Scholar',
    description: 'Achieve 100% mastery on all 24 flashcard sets',
    iconName: 'Trophy',
    tier: 'platinum',
    condition: { type: 'all_sets_mastered', target: 24 },
  },
];

export const TIER_CONFIG: Record<
  FlashcardAchievementTier,
  { label: string; colour: string; bgColour: string; borderColour: string }
> = {
  bronze: {
    label: 'Bronze',
    colour: 'text-amber-400',
    bgColour: 'bg-amber-500/10',
    borderColour: 'border-amber-500/30',
  },
  silver: {
    label: 'Silver',
    colour: 'text-blue-300',
    bgColour: 'bg-blue-400/10',
    borderColour: 'border-blue-400/30',
  },
  gold: {
    label: 'Gold',
    colour: 'text-elec-yellow',
    bgColour: 'bg-elec-yellow/10',
    borderColour: 'border-elec-yellow/30',
  },
  platinum: {
    label: 'Platinum',
    colour: 'text-purple-400',
    bgColour: 'bg-purple-500/10',
    borderColour: 'border-purple-500/30',
  },
};
