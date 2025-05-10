
// Types for leaderboard data
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
  previous_position?: number;
  position?: number;
  profiles?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
    country_code?: string;
    country?: string;
    bio?: string;
    is_verified?: boolean;
  };
  achievements?: Array<{
    id: string;
    name: string;
    description: string;
    awarded_at: string;
  }>;
  top_skills?: string[];
}

export type CommunityStats = {
  id: string;
  active_users: number;
  lessons_completed_today: number;
  longest_streak: number;
  updated_at: string;
}

export interface LeaderboardData {
  userRankings: UserActivity[];
  communityStats: CommunityStats | null;
  currentUserRank: UserActivity | null;
  isLoading: boolean;
  error: string | null;
  updateUserActivity: (pointsToAdd?: number) => Promise<void>;
}
