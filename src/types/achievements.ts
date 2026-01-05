export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'test-specific' | 'progress' | 'performance' | 'regulation' | 'milestone' | 'advanced';
  condition: AchievementCondition;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementCondition {
  type: 'quiz_completed' | 'perfect_score' | 'speed' | 'total_quizzes' | 'category_mastery' | 'streak' | 'difficulty_cleared' | 'regulation_focus';
  params: Record<string, any>;
}

export interface AchievementProgress {
  achievementId: string;
  currentValue: number;
  targetValue: number;
  percentage: number;
}