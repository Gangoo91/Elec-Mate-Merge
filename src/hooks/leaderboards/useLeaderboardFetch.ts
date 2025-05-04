
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats } from './types';
import { ensureSubscriberCounted } from './useActivityTracking';

export function useLeaderboardFetch(userId: string | undefined, isSubscribed: boolean) {
  const [userRankings, setUserRankings] = useState<UserActivity[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch top users by points
      const { data: rankingsData, error: rankingsError } = await supabase
        .from('user_activity')
        .select(`
          *,
          profiles:profiles(
            username,
            full_name,
            avatar_url
          )
        `)
        .order('points', { ascending: false })
        .limit(10);

      if (rankingsError) {
        throw rankingsError;
      }

      // Fetch community stats
      const { data: statsData, error: statsError } = await supabase
        .from('community_stats')
        .select('*')
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      // Fetch current user's rank if logged in
      let currentUserData = null;
      if (userId) {
        const { data: userData, error: userError } = await supabase
          .from('user_activity')
          .select(`
            *,
            profiles:profiles(
              username,
              full_name,
              avatar_url
            )
          `)
          .eq('user_id', userId)
          .single();

        if (userError && userError.code !== 'PGRST116') {
          console.error('Error fetching current user data:', userError);
        } else {
          currentUserData = userData;
        }
      }

      // Process and set data
      if (rankingsData) {
        setUserRankings(rankingsData as UserActivity[]);
      } else {
        setUserRankings([]);
      }

      // Update community stats with subscription status
      if (statsData) {
        // If the user is subscribed but not counted in active_users, we'll increment
        if (isSubscribed && userId) {
          // We'll update the community stats in the database to reflect subscribed users
          const shouldUpdateStats = !(currentUserData?.last_active_date === new Date().toISOString().split('T')[0]);
          
          if (shouldUpdateStats) {
            await ensureSubscriberCounted(statsData.id, userId, isSubscribed);
            
            // Update the local state with the incremented value
            setCommunityStats({
              ...statsData,
              active_users: Math.max(1, (statsData.active_users || 0))
            });
          } else {
            setCommunityStats(statsData);
          }
        } else {
          setCommunityStats(statsData);
        }
      } else {
        setCommunityStats(null);
      }

      setCurrentUserRank(currentUserData as UserActivity | null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Error fetching leaderboard data:', message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isSubscribed]);

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    fetchLeaderboardData
  };
}
