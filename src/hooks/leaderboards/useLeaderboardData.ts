
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserActivity, CommunityStats, LeaderboardData } from './types';
import { 
  fetchTopUsers, 
  fetchCommunityStats, 
  fetchCurrentUserRank, 
  updateUserActivity as updateActivity
} from './leaderboardService';
import { useLeaderboardRealtime } from './useLeaderboardRealtime';

export type { UserActivity, CommunityStats };

export function useLeaderboardData(): LeaderboardData {
  const [userRankings, setUserRankings] = useState<UserActivity[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch leaderboard data
  const fetchLeaderboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch top users by points
      const topUsers = await fetchTopUsers();
      setUserRankings(topUsers || []);

      // Fetch community stats
      const stats = await fetchCommunityStats();
      setCommunityStats(stats);

      // Fetch current user's rank if logged in
      if (user) {
        const currentUser = await fetchCurrentUserRank(user.id);
        setCurrentUserRank(currentUser);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Error fetching leaderboard data:', message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  // Set up realtime subscription
  useLeaderboardRealtime(fetchLeaderboardData);

  // Function to update user activity (e.g., when completing a lesson)
  const updateUserActivity = useCallback(async (pointsToAdd: number = 10) => {
    if (!user) return;
    await updateActivity(user.id, pointsToAdd);
  }, [user]);

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    updateUserActivity
  };
}
