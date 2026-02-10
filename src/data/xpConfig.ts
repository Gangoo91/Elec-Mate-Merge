/**
 * xpConfig.ts
 *
 * XP values, level thresholds, and level titles for the
 * unified progress system. Data-driven — easy to tune.
 */

// ─── Activity Types ──────────────────────────────────────────────
export type ActivityType =
  | 'flashcard_session'
  | 'quiz_completed'
  | 'site_diary_entry'
  | 'portfolio_evidence'
  | 'mock_exam'
  | 'video_watched'
  | 'study_module';

// ─── XP Values ───────────────────────────────────────────────────
export interface XPRule {
  baseXP: number;
  /** Optional bonus multiplier applied to a score percent (0-100) */
  scoreMultiplier?: number;
  /** Bonus XP for perfect / mastery */
  bonusXP?: number;
  /** Estimated duration in minutes (for OJT auto-logging) */
  defaultDurationMinutes: number;
  /** If true, duration comes from the activity itself */
  usesActualDuration?: boolean;
  /** OJT compliance category for auto-logging */
  complianceCategory: string;
}

export const XP_RULES: Record<ActivityType, XPRule> = {
  flashcard_session: {
    baseXP: 5, // per card reviewed
    bonusXP: 15, // per card that reaches mastery level 5
    defaultDurationMinutes: 1, // per card
    complianceCategory: 'Self-study',
  },
  quiz_completed: {
    baseXP: 30,
    scoreMultiplier: 0.7, // + score% * 0.7
    bonusXP: 50, // perfect score bonus
    defaultDurationMinutes: 1, // per question
    complianceCategory: 'Self-study',
  },
  site_diary_entry: {
    baseXP: 20,
    defaultDurationMinutes: 10,
    complianceCategory: 'Reflective Practice',
  },
  portfolio_evidence: {
    baseXP: 30,
    defaultDurationMinutes: 15,
    complianceCategory: 'Portfolio Building',
  },
  mock_exam: {
    baseXP: 50,
    scoreMultiplier: 1.0,
    defaultDurationMinutes: 0, // uses actual time
    usesActualDuration: true,
    complianceCategory: 'Self-study',
  },
  video_watched: {
    baseXP: 10,
    defaultDurationMinutes: 0, // uses actual time
    usesActualDuration: true,
    complianceCategory: 'Self-study',
  },
  study_module: {
    baseXP: 25,
    defaultDurationMinutes: 15,
    complianceCategory: 'Online Learning',
  },
};

// ─── Levels ──────────────────────────────────────────────────────
export interface LevelDefinition {
  level: number;
  xpRequired: number;
  title: string;
}

export const LEVELS: LevelDefinition[] = [
  { level: 1, xpRequired: 0, title: 'Apprentice' },
  { level: 2, xpRequired: 250, title: 'Keen Apprentice' },
  { level: 3, xpRequired: 750, title: 'Developing Apprentice' },
  { level: 4, xpRequired: 1500, title: 'Competent Apprentice' },
  { level: 5, xpRequired: 3000, title: 'Skilled Apprentice' },
  { level: 6, xpRequired: 5000, title: 'Advanced Apprentice' },
  { level: 7, xpRequired: 8000, title: 'Expert Apprentice' },
  { level: 8, xpRequired: 12000, title: 'Master Apprentice' },
  { level: 9, xpRequired: 18000, title: 'Trade Ready' },
  { level: 10, xpRequired: 25000, title: 'Qualified Sparky' },
];

// ─── Daily Goal Options ──────────────────────────────────────────
export interface DailyGoalOption {
  value: number;
  label: string;
  description: string;
}

export const DAILY_GOAL_OPTIONS: DailyGoalOption[] = [
  { value: 50, label: 'Casual', description: '~10 flashcards' },
  { value: 100, label: 'Regular', description: '~1 quiz or 20 flashcards' },
  { value: 200, label: 'Serious', description: '~2 quizzes or mixed activities' },
  { value: 300, label: 'Intense', description: '~3 quizzes or heavy mixed session' },
];

// ─── Helper Functions ────────────────────────────────────────────

/** Get the level for a given total XP. */
export function getLevelForXP(totalXP: number): LevelDefinition {
  let result = LEVELS[0];
  for (const level of LEVELS) {
    if (totalXP >= level.xpRequired) {
      result = level;
    } else {
      break;
    }
  }
  return result;
}

/** Get XP needed to reach the next level. Returns 0 if max level. */
export function getXPToNextLevel(totalXP: number): number {
  const currentLevel = getLevelForXP(totalXP);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);
  if (!nextLevel) return 0;
  return nextLevel.xpRequired - totalXP;
}

/** Get progress percentage within current level (0-100). */
export function getLevelProgress(totalXP: number): number {
  const currentLevel = getLevelForXP(totalXP);
  const nextLevel = LEVELS.find((l) => l.level === currentLevel.level + 1);
  if (!nextLevel) return 100;
  const levelRange = nextLevel.xpRequired - currentLevel.xpRequired;
  const progress = totalXP - currentLevel.xpRequired;
  return Math.round((progress / levelRange) * 100);
}

/** Calculate XP earned for a given activity. */
export function calculateXP(
  activityType: ActivityType,
  opts: { cardsReviewed?: number; scorePercent?: number; cardsMastered?: number } = {}
): number {
  const rule = XP_RULES[activityType];
  let xp = rule.baseXP;

  // Flashcard: XP per card reviewed
  if (activityType === 'flashcard_session' && opts.cardsReviewed) {
    xp = rule.baseXP * opts.cardsReviewed;
    if (opts.cardsMastered && rule.bonusXP) {
      xp += rule.bonusXP * opts.cardsMastered;
    }
    return xp;
  }

  // Score-based activities
  if (rule.scoreMultiplier && opts.scorePercent !== undefined) {
    xp += Math.round(opts.scorePercent * rule.scoreMultiplier);
  }

  // Perfect score bonus
  if (rule.bonusXP && opts.scorePercent === 100) {
    xp += rule.bonusXP;
  }

  return xp;
}

/** Calculate duration in minutes for OJT auto-logging. */
export function calculateDuration(
  activityType: ActivityType,
  opts: { cardsReviewed?: number; questionCount?: number; actualMinutes?: number } = {}
): number {
  const rule = XP_RULES[activityType];

  if (rule.usesActualDuration && opts.actualMinutes) {
    return opts.actualMinutes;
  }

  if (activityType === 'flashcard_session' && opts.cardsReviewed) {
    return rule.defaultDurationMinutes * opts.cardsReviewed;
  }

  if (activityType === 'quiz_completed' && opts.questionCount) {
    return rule.defaultDurationMinutes * opts.questionCount;
  }

  return rule.defaultDurationMinutes;
}
