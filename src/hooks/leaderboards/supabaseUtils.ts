
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';

// Define a generic helper type for Supabase responses to avoid deep type instantiation
export type SupabaseResponse<T> = {
  data: T | null;
  error: { code: string; message?: string } | null;
  count?: number;
};

// Interface for leaderboard ranking data
export interface LeaderboardData {
  learning: UserActivity[];
  community: UserActivity[];
  safety: UserActivity[];
  mentor: UserActivity[];
  mental: UserActivity[];
}

// Interface for user rank data
export interface UserRankData {
  learning: UserActivity | null;
  community: UserActivity | null;
  safety: UserActivity | null;
  mentor: UserActivity | null;
  mental: UserActivity | null;
}
