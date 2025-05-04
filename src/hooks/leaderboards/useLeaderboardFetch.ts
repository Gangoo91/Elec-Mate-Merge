
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { ensureSubscriberCounted } from './useActivityTracking';

// Create explicit types that avoid deep nesting
type LeaderboardData = {
  learning: UserActivity[];
  community: UserActivity[];
  safety: UserActivity[];
  mentor: UserActivity[];
  mental: UserActivity[];
};

type UserRankData = {
  learning: UserActivity | null;
  community: UserActivity | null;
  safety: UserActivity | null;
  mentor: UserActivity | null;
  mental: UserActivity | null;
};

export function useLeaderboardFetch(userId: string | undefined, isSubscribed: boolean) {
  // Initialize state with explicit types
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData>({
    learning: [],
    community: [],
    safety: [],
    mentor: [],
    mental: []
  });
  
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  
  const [userRank, setUserRank] = useState<UserRankData>({
    learning: null,
    community: null,
    safety: null,
    mentor: null,
    mental: null
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data for a specific category
  const fetchLeaderboardData = useCallback(async (category: LeaderboardCategory = 'learning') => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch top users for the specified category
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
      let userData = null;
      if (userId) {
        const { data: userRankData, error: userError } = await supabase
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
          console.error('Error fetching user rank:', userError);
        } else {
          userData = userRankData;
        }
      }

      // Process the fetched data
      const typedRankingsData = rankingsData as UserActivity[];
      
      // Update leaderboard data for the specific category
      setLeaderboardData(prev => {
        const updated = { ...prev };
        updated[category] = typedRankingsData || [];
        return updated;
      });

      // Update community stats
      if (statsData) {
        if (isSubscribed && userId) {
          const todayDate = new Date().toISOString().split('T')[0];
          const userIsActive = userData?.last_active_date === todayDate;
          
          if (!userIsActive) {
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

      // Update user's rank for the specific category
      const typedUserData = userData as UserActivity | null;
      
      // Use a safer approach to update the specific category
      if (category === 'learning') {
        setUserRank(prev => ({ ...prev, learning: typedUserData }));
      } else if (category === 'community') {
        setUserRank(prev => ({ ...prev, community: typedUserData }));
      } else if (category === 'safety') {
        setUserRank(prev => ({ ...prev, safety: typedUserData }));
      } else if (category === 'mentor') {
        setUserRank(prev => ({ ...prev, mentor: typedUserData }));
      } else if (category === 'mental') {
        setUserRank(prev => ({ ...prev, mental: typedUserData }));
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Error fetching leaderboard data:', message);
    } finally {
      setIsLoading(false);
    }
  }, [userId, isSubscribed]);

  // Function to fetch data for all categories
  const fetchAllLeaderboardData = useCallback(async () => {
    const categories: LeaderboardCategory[] = ['learning', 'community', 'safety', 'mentor', 'mental'];
    
    for (const category of categories) {
      await fetchLeaderboardData(category);
    }
  }, [fetchLeaderboardData]);

  return {
    userRankings: leaderboardData,
    communityStats,
    currentUserRank: userRank,
    isLoading,
    error,
    fetchLeaderboardData,
    fetchAllLeaderboardData
  };
}
