
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { ensureSubscriberCounted } from './useActivityTracking';

// Define concrete types instead of using Record to avoid deep type instantiation
type CategoryRankings = {
  learning: UserActivity[];
  community: UserActivity[];
  safety: UserActivity[];
  mentor: UserActivity[];
  mental: UserActivity[];
};

type UserRank = {
  learning: UserActivity | null;
  community: UserActivity | null;
  safety: UserActivity | null;
  mentor: UserActivity | null;
  mental: UserActivity | null;
};

export function useLeaderboardFetch(userId: string | undefined, isSubscribed: boolean) {
  const [userRankings, setUserRankings] = useState<CategoryRankings>({
    learning: [],
    community: [],
    safety: [],
    mentor: [],
    mental: []
  });
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<UserRank>({
    learning: null,
    community: null,
    safety: null,
    mentor: null,
    mental: null
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboardData = useCallback(async (category: LeaderboardCategory = 'learning') => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch top users by points for the specified category
      const { data: rankingsData, error: rankingsError } = await supabase
        .from('user_activity')
        .select(`
          *,
          profiles:user_id(
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('category', category)
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
            profiles:user_id(
              username,
              full_name,
              avatar_url
            )
          `)
          .eq('user_id', userId)
          .eq('category', category)
          .single();

        if (userError && userError.code !== 'PGRST116') {
          console.error('Error fetching current user data:', userError);
        } else {
          currentUserData = userData;
        }
      }

      // Process and set data
      // Cast the data to UserActivity[] to ensure type safety
      const typedRankingsData = rankingsData as unknown as UserActivity[];
      
      setUserRankings(prev => ({
        ...prev,
        [category]: typedRankingsData || []
      }));

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
      }

      setCurrentUserRank(prev => ({
        ...prev,
        [category]: currentUserData as UserActivity | null
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Error fetching leaderboard data:', message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isSubscribed]);

  const fetchAllLeaderboardData = useCallback(async () => {
    const categories: LeaderboardCategory[] = ['learning', 'community', 'safety', 'mentor', 'mental'];
    
    for (const category of categories) {
      await fetchLeaderboardData(category);
    }
  }, [fetchLeaderboardData]);

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    fetchLeaderboardData,
    fetchAllLeaderboardData
  };
}
