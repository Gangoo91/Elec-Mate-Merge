
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { ensureSubscriberCounted } from './useActivityTracking';

export function useLeaderboardFetch(userId: string | undefined, isSubscribed: boolean) {
  // Define state with explicit non-recursive types
  const [userRankings, setUserRankings] = useState<{
    learning: UserActivity[];
    community: UserActivity[];
    safety: UserActivity[];
    mentor: UserActivity[];
    mental: UserActivity[];
  }>({
    learning: [],
    community: [],
    safety: [],
    mentor: [],
    mental: []
  });
  
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  
  const [currentUserRank, setCurrentUserRank] = useState<{
    learning: UserActivity | null;
    community: UserActivity | null;
    safety: UserActivity | null;
    mentor: UserActivity | null;
    mental: UserActivity | null;
  }>({
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
      const typedRankingsData = rankingsData as unknown as UserActivity[];
      
      // Update rankings with typesafe approach
      setUserRankings(prev => {
        const newState = { ...prev };
        newState[category] = typedRankingsData || [];
        return newState;
      });

      // Update community stats with subscription status
      if (statsData) {
        if (isSubscribed && userId) {
          const shouldUpdateStats = !(currentUserData?.last_active_date === new Date().toISOString().split('T')[0]);
          
          if (shouldUpdateStats) {
            await ensureSubscriberCounted(statsData.id, userId, isSubscribed);
            
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

      // Update user rank with typesafe approach
      const typedUserData = currentUserData as UserActivity | null;
      
      // Explicitly handle each category case to avoid using computed property access
      switch (category) {
        case 'learning':
          setCurrentUserRank(prev => ({ ...prev, learning: typedUserData }));
          break;
        case 'community':
          setCurrentUserRank(prev => ({ ...prev, community: typedUserData }));
          break;
        case 'safety':
          setCurrentUserRank(prev => ({ ...prev, safety: typedUserData }));
          break;
        case 'mentor':
          setCurrentUserRank(prev => ({ ...prev, mentor: typedUserData }));
          break;
        case 'mental':
          setCurrentUserRank(prev => ({ ...prev, mental: typedUserData }));
          break;
      }
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
