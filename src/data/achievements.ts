import { Achievement } from '@/types/achievements';

export const ACHIEVEMENTS: Achievement[] = [
  // Essential Progress Achievement
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Complete your first quiz assessment',
    icon: 'Target',
    category: 'progress',
    rarity: 'common',
    condition: {
      type: 'total_quizzes',
      params: { count: 1 }
    },
    unlocked: false
  },

  // Performance Achievement
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Achieve 100% on any quiz assessment',
    icon: 'Award',
    category: 'performance',
    rarity: 'rare',
    condition: {
      type: 'perfect_score',
      params: { percentage: 100 }
    },
    unlocked: false
  },

  // Speed Achievement
  {
    id: 'speed-demon',
    title: 'Speed Demon',
    description: 'Complete a quiz in under 10 minutes',
    icon: 'Zap',
    category: 'performance',
    rarity: 'uncommon',
    condition: {
      type: 'speed',
      params: { maxTimeMinutes: 10 }
    },
    unlocked: false
  },

  // Progress Milestone
  {
    id: 'dedicated-learner',
    title: 'Dedicated Learner',
    description: 'Complete 10 quiz assessments',
    icon: 'BookOpen',
    category: 'milestone',
    rarity: 'uncommon',
    condition: {
      type: 'total_quizzes',
      params: { count: 10 }
    },
    unlocked: false
  },

  // Category Mastery
  {
    id: 'well-rounded',
    title: 'Well Rounded',
    description: 'Complete quizzes in 5 different categories',
    icon: 'Trophy',
    category: 'progress',
    rarity: 'rare',
    condition: {
      type: 'category_mastery',
      params: { uniqueCategories: 5 }
    },
    unlocked: false
  },

  // Ultimate Achievement
  {
    id: 'testing-expert',
    title: 'Testing Expert',
    description: 'Score 85%+ average across 20 completed assessments',
    icon: 'Crown',
    category: 'advanced',
    rarity: 'epic',
    condition: {
      type: 'total_quizzes',
      params: { count: 20, averageScore: 85 }
    },
    unlocked: false
  }
];

export const ACHIEVEMENT_CATEGORIES = {
  'test-specific': { name: 'Test Specific', color: 'text-blue-400' },
  'progress': { name: 'Progress', color: 'text-green-400' },
  'performance': { name: 'Performance', color: 'text-elec-yellow' },
  'regulation': { name: 'Regulation & Standards', color: 'text-purple-400' },
  'milestone': { name: 'Milestone', color: 'text-orange-400' },
  'advanced': { name: 'Advanced', color: 'text-red-400' }
};

export const RARITY_COLORS = {
  'common': 'text-gray-400',
  'uncommon': 'text-green-400',
  'rare': 'text-blue-400',
  'epic': 'text-purple-400',
  'legendary': 'text-elec-yellow'
};