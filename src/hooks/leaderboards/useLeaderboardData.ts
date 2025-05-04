
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLeaderboardFetch } from './useLeaderboardFetch';
import { updateUserActivity } from './useActivityTracking';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';

// Re-export the types correctly with 'export type'
export type { UserActivity, CommunityStats, LeaderboardCategory };

export function useLeaderboardData() {
  const { user, isSubscribed } = useAuth();
  const { 
    userRankings, 
    communityStats, 
    currentUserRank, 
    isLoading, 
    error, 
    fetchLeaderboardData,
    fetchAllLeaderboardData
  } = useLeaderboardFetch(user?.id, isSubscribed);

  // Fetch leaderboard data and set up realtime subscription
  useEffect(() => {
    fetchAllLeaderboardData();

    // Set up realtime subscription
    const userActivityChannel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_activity'
      }, () => {
        fetchAllLeaderboardData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_stats'
      }, () => {
        fetchAllLeaderboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userActivityChannel);
    };
  }, [user, isSubscribed, fetchAllLeaderboardData]);

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    updateUserActivity: (pointsToAdd: number = 10, category: LeaderboardCategory = 'learning') => {
      if (user) {
        return updateUserActivity(user.id, pointsToAdd, category);
      }
    }
  };
}
