
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { SupabaseResponse } from './supabaseUtils';
import { ensureSubscriberCounted } from './useActivityTracking';
import { toast } from '@/components/ui/use-toast';

/**
 * Fetches leaderboard data for a specific category
 */
export async function fetchCategoryLeaderboard(
  category: LeaderboardCategory,
  userId?: string,
  isSubscribed?: boolean
): Promise<{
  rankings: UserActivity[];
  userRank: UserActivity | null;
  communityStats: CommunityStats | null;
  error: string | null;
}> {
  try {
    // Fetch top users for the specified category
    const { data: rankingsData, error: rankingsError } = await supabase
      .from('user_activity')
      .select(`
        id, 
        user_id, 
        points, 
        level, 
        badge, 
        streak, 
        last_active_date, 
        created_at,
        updated_at,
        profiles:user_id(
          username,
          full_name,
          avatar_url
        )
      `)
      .eq('category', category)
      .order('points', { ascending: false })
      .limit(10) as SupabaseResponse<any[]>;

    if (rankingsError) {
      console.error('Error fetching rankings:', rankingsError);
      throw rankingsError;
    }

    // Fetch community stats
    const { data: statsData, error: statsError } = await supabase
      .from('community_stats')
      .select('*')
      .single() as SupabaseResponse<CommunityStats>;

    if (statsError && statsError.code !== 'PGRST116') {
      console.error('Error fetching community stats:', statsError);
      throw statsError;
    }

    // Fetch current user's rank if logged in
    let userData = null;
    if (userId) {
      const { data: userRankData, error: userError } = await supabase
        .from('user_activity')
        .select(`
          id, 
          user_id, 
          points, 
          level, 
          badge, 
          streak, 
          last_active_date, 
          created_at,
          updated_at,
          profiles:user_id(
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', userId)
        .eq('category', category)
        .single() as SupabaseResponse<UserActivity>;

      if (userError && userError.code !== 'PGRST116') {
        console.error('Error fetching user rank:', userError);
      } else {
        userData = userRankData;
      }
    }

    // Process the fetched data - add category to each item explicitly 
    const processedRankingsData = rankingsData ? rankingsData.map(item => ({
      ...item,
      category // Add the category property that's missing
    })) as UserActivity[] : [];
    
    // Process user data and add the category
    let processedUserData = null;
    if (userData) {
      processedUserData = {
        ...userData,
        category // Add the category property that's missing
      } as UserActivity;
    }

    // Update community stats for active users
    let updatedStatsData = statsData;
    
    if (statsData && isSubscribed && userId) {
      const todayDate = new Date().toISOString().split('T')[0];
      const userIsActive = userData?.last_active_date === todayDate;
      
      if (!userIsActive) {
        await ensureSubscriberCounted(statsData.id, userId, isSubscribed);
        
        updatedStatsData = {
          ...statsData,
          active_users: Math.max(1, (statsData.active_users || 0))
        };
      }
    }

    return {
      rankings: processedRankingsData,
      userRank: processedUserData,
      communityStats: updatedStatsData,
      error: null
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Error fetching leaderboard data:', err);
    
    toast({
      title: "Error loading leaderboard",
      description: "Could not load leaderboard data. Please try again later.",
      variant: "destructive"
    });
    
    return {
      rankings: [],
      userRank: null,
      communityStats: null,
      error: message
    };
  }
}
