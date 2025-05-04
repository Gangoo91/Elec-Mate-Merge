
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  profiles?: {
    username?: string;
    full_name?: string;
    avatar_url?: string;
  };
}

export type CommunityStats = {
  id: string;
  active_users: number;
  lessons_completed_today: number;
  longest_streak: number;
  updated_at: string;
}

export function useLeaderboardData() {
  const [userRankings, setUserRankings] = useState<UserActivity[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [currentUserRank, setCurrentUserRank] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboardData = async () => {
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
        if (user) {
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
            .eq('user_id', user.id)
            .single();

          if (userError && userError.code !== 'PGRST116') {
            console.error('Error fetching current user data:', userError);
          } else {
            currentUserData = userData;
          }
        }

        // Process and set data
        setUserRankings(rankingsData || []);
        setCommunityStats(statsData || null);
        setCurrentUserRank(currentUserData);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.error('Error fetching leaderboard data:', message);
      } finally {
        setIsLoading(false);
      }
    };

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
  }, [user]);

  // Function to update user activity (e.g., when completing a lesson)
  const updateUserActivity = async (pointsToAdd: number = 10) => {
    if (!user) return;

    try {
      // Check if user already has an activity record
      const { data: existingRecord, error: fetchError } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('user_activity')
          .update({
            points: existingRecord.points + pointsToAdd,
            last_active_date: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('user_activity')
          .insert({
            user_id: user.id,
            points: pointsToAdd,
            level: 'Apprentice',
            badge: 'Beginner',
            streak: 1,
          });

        if (insertError) throw insertError;
      }

      // Update community stats
      const { data: statsData } = await supabase
        .from('community_stats')
        .select('*')
        .limit(1)
        .single();

      if (statsData) {
        await supabase
          .from('community_stats')
          .update({
            active_users: statsData.active_users + 1,
            lessons_completed_today: statsData.lessons_completed_today + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('id', statsData.id);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Error updating user activity:', message);
    }
  };

  return {
    userRankings,
    communityStats,
    currentUserRank,
    isLoading,
    error,
    updateUserActivity
  };
}
