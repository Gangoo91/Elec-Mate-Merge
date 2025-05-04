
// Define user activity type
export type UserActivity = {
  id: string;
  user_id: string;
  points: number;
  level: string;
  badge: string;
  streak: number;
  last_active_date: string;
  created_at: string;
  updated_at: string;
  category: string;
  profiles?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

// Define community stats type
export type CommunityStats = {
  id: string;
  active_users: number;
  lessons_completed_today: number;
  longest_streak: number;
  updated_at: string;
}

// Define leaderboard category
export type LeaderboardCategory = 'learning' | 'community' | 'safety' | 'mentor' | 'mental';

// Define prize information
export type PrizeInfo = {
  amount: string;
  currency: string;
  period: string;
}
