
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLeaderboardFetch } from './useLeaderboardFetch';
import { updateUserActivity } from './useActivityTracking';
import { UserActivity, CommunityStats } from './types';

export { UserActivity, CommunityStats };

export function useLeaderboardData() {
  const { user, isSubscribed } = useAuth();
  const { 
    userRankings, 
    communityStats, 
    currentUserRank, 
    isLoading, 
    error, 
    fetchLeaderboardData 
  } = useLeaderboardFetch(user?.id, isSubscribed);

  // Fetch leaderboard data and set up realtime subscription
  useEffect(() => {
    fetchLeaderboardData();

    // Set up realtime subscription
    const userActivityChannel = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_activity'
      }, () => {
        fetchLeaderboardData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'community_stats'
      }, () => {
        fetchLeaderboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(userActivityChannel);
    };
  }, [user, isSubscribed, fetchLeaderboardData]);

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    updateUserActivity: (pointsToAdd: number = 10) => {
      if (user) {
        return updateUserActivity(user.id, pointsToAdd);
      }
    }
  };
}
