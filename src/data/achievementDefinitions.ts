/**
 * achievementDefinitions.ts
 *
 * 30+ achievements across all activity types.
 * Each has an XP bonus awarded on unlock.
 */

export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export type AchievementCategory =
  | 'flashcards'
  | 'quizzes'
  | 'streaks'
  | 'ojt'
  | 'portfolio'
  | 'diary'
  | 'xp'
  | 'epa';

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  xpBonus: number;
  /** Condition checker key — maps to logic in useAchievementChecker */
  conditionKey: string;
  /** Params for the condition checker */
  conditionParams: Record<string, number | string | boolean>;
}

export const ACHIEVEMENT_DEFINITIONS: AchievementDef[] = [
  // ─── Flashcard achievements ──────────────────────────────────
  {
    id: 'first-flip',
    title: 'First Flip',
    description: 'Review your first flashcard',
    icon: 'Layers',
    category: 'flashcards',
    rarity: 'common',
    xpBonus: 10,
    conditionKey: 'total_cards_reviewed',
    conditionParams: { count: 1 },
  },
  {
    id: 'set-master',
    title: 'Set Master',
    description: 'Master all cards in a set',
    icon: 'Crown',
    category: 'flashcards',
    rarity: 'rare',
    xpBonus: 50,
    conditionKey: 'any_set_mastered',
    conditionParams: { mastery: 100 },
  },
  {
    id: 'card-century',
    title: 'Century',
    description: 'Review 100 flashcards',
    icon: 'Hash',
    category: 'flashcards',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'total_cards_reviewed',
    conditionParams: { count: 100 },
  },
  {
    id: 'card-500',
    title: 'Card Shark',
    description: 'Review 500 flashcards',
    icon: 'Flame',
    category: 'flashcards',
    rarity: 'epic',
    xpBonus: 75,
    conditionKey: 'total_cards_reviewed',
    conditionParams: { count: 500 },
  },
  {
    id: 'all-sets',
    title: 'Complete Collection',
    description: 'Master all 12 flashcard sets',
    icon: 'Trophy',
    category: 'flashcards',
    rarity: 'legendary',
    xpBonus: 200,
    conditionKey: 'all_sets_mastered',
    conditionParams: { setCount: 12 },
  },

  // ─── Quiz achievements ───────────────────────────────────────
  {
    id: 'first-quiz',
    title: 'Quiz Starter',
    description: 'Complete your first quiz',
    icon: 'Target',
    category: 'quizzes',
    rarity: 'common',
    xpBonus: 10,
    conditionKey: 'total_quizzes',
    conditionParams: { count: 1 },
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: '100% on any quiz',
    icon: 'Award',
    category: 'quizzes',
    rarity: 'rare',
    xpBonus: 50,
    conditionKey: 'perfect_quiz',
    conditionParams: {},
  },
  {
    id: 'quiz-10',
    title: 'Quiz Regular',
    description: 'Complete 10 quizzes',
    icon: 'BookOpen',
    category: 'quizzes',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'total_quizzes',
    conditionParams: { count: 10 },
  },
  {
    id: 'quiz-50',
    title: 'Quiz Veteran',
    description: 'Complete 50 quizzes',
    icon: 'Medal',
    category: 'quizzes',
    rarity: 'epic',
    xpBonus: 100,
    conditionKey: 'total_quizzes',
    conditionParams: { count: 50 },
  },
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a quiz in under 5 minutes',
    icon: 'Zap',
    category: 'quizzes',
    rarity: 'uncommon',
    xpBonus: 25,
    conditionKey: 'fast_quiz',
    conditionParams: { maxMinutes: 5 },
  },
  {
    id: 'all-categories',
    title: 'Well Rounded',
    description: 'Score 70%+ in all quiz categories',
    icon: 'PieChart',
    category: 'quizzes',
    rarity: 'epic',
    xpBonus: 100,
    conditionKey: 'all_categories_above',
    conditionParams: { minScore: 70 },
  },

  // ─── Streak achievements ─────────────────────────────────────
  {
    id: 'streak-3',
    title: 'Getting Started',
    description: '3-day study streak',
    icon: 'Flame',
    category: 'streaks',
    rarity: 'common',
    xpBonus: 15,
    conditionKey: 'streak_days',
    conditionParams: { days: 3 },
  },
  {
    id: 'streak-7',
    title: 'Weekly Warrior',
    description: '7-day study streak',
    icon: 'Flame',
    category: 'streaks',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'streak_days',
    conditionParams: { days: 7 },
  },
  {
    id: 'streak-14',
    title: 'Fortnight Fighter',
    description: '14-day study streak',
    icon: 'Flame',
    category: 'streaks',
    rarity: 'rare',
    xpBonus: 50,
    conditionKey: 'streak_days',
    conditionParams: { days: 14 },
  },
  {
    id: 'streak-30',
    title: 'Monthly Master',
    description: '30-day study streak',
    icon: 'Flame',
    category: 'streaks',
    rarity: 'rare',
    xpBonus: 100,
    conditionKey: 'streak_days',
    conditionParams: { days: 30 },
  },
  {
    id: 'streak-100',
    title: 'Centurion',
    description: '100-day study streak',
    icon: 'Flame',
    category: 'streaks',
    rarity: 'legendary',
    xpBonus: 250,
    conditionKey: 'streak_days',
    conditionParams: { days: 100 },
  },

  // ─── OJT achievements ───────────────────────────────────────
  {
    id: 'first-hour',
    title: 'Clocked In',
    description: 'Log your first OJT hour',
    icon: 'Clock',
    category: 'ojt',
    rarity: 'common',
    xpBonus: 10,
    conditionKey: 'ojt_hours',
    conditionParams: { hours: 1 },
  },
  {
    id: 'ojt-50',
    title: 'Getting Experienced',
    description: 'Log 50 OJT hours',
    icon: 'Clock',
    category: 'ojt',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'ojt_hours',
    conditionParams: { hours: 50 },
  },
  {
    id: 'ojt-100',
    title: 'Century Hours',
    description: 'Log 100 OJT hours',
    icon: 'Clock',
    category: 'ojt',
    rarity: 'uncommon',
    xpBonus: 50,
    conditionKey: 'ojt_hours',
    conditionParams: { hours: 100 },
  },
  {
    id: 'ojt-400',
    title: 'Year Target',
    description: 'Hit 400 OJT hours',
    icon: 'Trophy',
    category: 'ojt',
    rarity: 'epic',
    xpBonus: 150,
    conditionKey: 'ojt_hours',
    conditionParams: { hours: 400 },
  },

  // ─── Portfolio achievements ──────────────────────────────────
  {
    id: 'first-evidence',
    title: 'Evidence Builder',
    description: 'Add first portfolio evidence',
    icon: 'FileText',
    category: 'portfolio',
    rarity: 'common',
    xpBonus: 15,
    conditionKey: 'portfolio_count',
    conditionParams: { count: 1 },
  },
  {
    id: 'portfolio-10',
    title: 'Portfolio Pro',
    description: 'Add 10 portfolio entries',
    icon: 'FolderOpen',
    category: 'portfolio',
    rarity: 'uncommon',
    xpBonus: 40,
    conditionKey: 'portfolio_count',
    conditionParams: { count: 10 },
  },
  {
    id: 'portfolio-complete',
    title: 'Portfolio Champion',
    description: 'Complete all portfolio categories',
    icon: 'Trophy',
    category: 'portfolio',
    rarity: 'legendary',
    xpBonus: 200,
    conditionKey: 'all_portfolio_categories',
    conditionParams: {},
  },

  // ─── Site diary achievements ─────────────────────────────────
  {
    id: 'first-reflection',
    title: 'Reflective Practitioner',
    description: 'Write your first diary entry',
    icon: 'BookOpen',
    category: 'diary',
    rarity: 'common',
    xpBonus: 10,
    conditionKey: 'diary_count',
    conditionParams: { count: 1 },
  },
  {
    id: 'diary-10',
    title: 'Diary Regular',
    description: '10 site diary entries',
    icon: 'PenLine',
    category: 'diary',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'diary_count',
    conditionParams: { count: 10 },
  },
  {
    id: 'diary-30',
    title: 'Diary Devotee',
    description: '30 site diary entries',
    icon: 'Notebook',
    category: 'diary',
    rarity: 'rare',
    xpBonus: 75,
    conditionKey: 'diary_count',
    conditionParams: { count: 30 },
  },

  // ─── XP / Level achievements ─────────────────────────────────
  {
    id: 'level-5',
    title: 'Skilled Up',
    description: 'Reach Level 5',
    icon: 'TrendingUp',
    category: 'xp',
    rarity: 'uncommon',
    xpBonus: 50,
    conditionKey: 'level_reached',
    conditionParams: { level: 5 },
  },
  {
    id: 'level-10',
    title: 'Trade Ready',
    description: 'Reach Level 10',
    icon: 'Star',
    category: 'xp',
    rarity: 'legendary',
    xpBonus: 500,
    conditionKey: 'level_reached',
    conditionParams: { level: 10 },
  },
  {
    id: 'xp-1000',
    title: 'First Thousand',
    description: 'Earn 1,000 total XP',
    icon: 'Sparkles',
    category: 'xp',
    rarity: 'uncommon',
    xpBonus: 25,
    conditionKey: 'total_xp',
    conditionParams: { xp: 1000 },
  },
  {
    id: 'xp-10000',
    title: 'XP Legend',
    description: 'Earn 10,000 total XP',
    icon: 'Sparkles',
    category: 'xp',
    rarity: 'epic',
    xpBonus: 100,
    conditionKey: 'total_xp',
    conditionParams: { xp: 10000 },
  },
  {
    id: 'daily-goal-7',
    title: 'Goal Getter',
    description: 'Meet daily goal 7 days in a row',
    icon: 'Target',
    category: 'xp',
    rarity: 'rare',
    xpBonus: 50,
    conditionKey: 'daily_goal_streak',
    conditionParams: { days: 7 },
  },

  // ─── EPA achievements ────────────────────────────────────────
  {
    id: 'epa-mock',
    title: 'EPA Ready',
    description: 'Complete an EPA mock session',
    icon: 'ClipboardCheck',
    category: 'epa',
    rarity: 'uncommon',
    xpBonus: 30,
    conditionKey: 'epa_mock_completed',
    conditionParams: { count: 1 },
  },
  {
    id: 'epa-distinction',
    title: 'Distinction Material',
    description: 'Get distinction prediction in EPA mock',
    icon: 'Award',
    category: 'epa',
    rarity: 'epic',
    xpBonus: 100,
    conditionKey: 'epa_distinction',
    conditionParams: {},
  },
];

/** Category display metadata */
export const ACHIEVEMENT_CATEGORY_META: Record<AchievementCategory, { name: string; colour: string }> = {
  flashcards: { name: 'Flashcards', colour: 'text-blue-400' },
  quizzes: { name: 'Quizzes', colour: 'text-green-400' },
  streaks: { name: 'Streaks', colour: 'text-orange-400' },
  ojt: { name: 'OJT Hours', colour: 'text-purple-400' },
  portfolio: { name: 'Portfolio', colour: 'text-cyan-400' },
  diary: { name: 'Site Diary', colour: 'text-pink-400' },
  xp: { name: 'XP & Levels', colour: 'text-elec-yellow' },
  epa: { name: 'EPA', colour: 'text-red-400' },
};

/** Rarity display colours */
export const RARITY_COLOURS: Record<AchievementRarity, string> = {
  common: 'text-gray-400',
  uncommon: 'text-green-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-elec-yellow',
};

export const RARITY_BG_COLOURS: Record<AchievementRarity, string> = {
  common: 'bg-gray-400/10',
  uncommon: 'bg-green-400/10',
  rare: 'bg-blue-400/10',
  epic: 'bg-purple-400/10',
  legendary: 'bg-elec-yellow/10',
};
