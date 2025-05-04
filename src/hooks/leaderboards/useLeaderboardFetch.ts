
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { ensureSubscriberCounted } from './useActivityTracking';
import { toast } from '@/components/ui/use-toast';

// Define explicit types for our state management to avoid type recursion
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
  // Use separate state variables for each category to avoid deep type recursion
  const [learningData, setLearningData] = useState<UserActivity[]>([]);
  const [communityData, setCommunityData] = useState<UserActivity[]>([]);
  const [safetyData, setSafetyData] = useState<UserActivity[]>([]);
  const [mentorData, setMentorData] = useState<UserActivity[]>([]);
  const [mentalData, setMentalData] = useState<UserActivity[]>([]);
  
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  
  const [userRankLearning, setUserRankLearning] = useState<UserActivity | null>(null);
  const [userRankCommunity, setUserRankCommunity] = useState<UserActivity | null>(null);
  const [userRankSafety, setUserRankSafety] = useState<UserActivity | null>(null);
  const [userRankMentor, setUserRankMentor] = useState<UserActivity | null>(null);
  const [userRankMental, setUserRankMental] = useState<UserActivity | null>(null);
  
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
        .limit(10);

      if (rankingsError) {
        console.error('Error fetching rankings:', rankingsError);
        throw rankingsError;
      }

      // Fetch community stats
      const { data: statsData, error: statsError } = await supabase
        .from('community_stats')
        .select('*')
        .single();

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
          .single();

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
      
      // Update the appropriate state based on category
      switch (category) {
        case 'learning':
          setLearningData(processedRankingsData);
          break;
        case 'community':
          setCommunityData(processedRankingsData);
          break;
        case 'safety':
          setSafetyData(processedRankingsData);
          break;
        case 'mentor':
          setMentorData(processedRankingsData);
          break;
        case 'mental':
          setMentalData(processedRankingsData);
          break;
      }

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
      if (userData) {
        const processedUserData = {
          ...userData,
          category // Add the category property that's missing
        } as UserActivity;
        
        // Update the appropriate user rank state based on category
        switch (category) {
          case 'learning':
            setUserRankLearning(processedUserData);
            break;
          case 'community':
            setUserRankCommunity(processedUserData);
            break;
          case 'safety':
            setUserRankSafety(processedUserData);
            break;
          case 'mentor':
            setUserRankMentor(processedUserData);
            break;
          case 'mental':
            setUserRankMental(processedUserData);
            break;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      console.error('Error fetching leaderboard data:', err);
      
      toast({
        title: "Error loading leaderboard",
        description: "Could not load leaderboard data. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [userId, isSubscribed]);

  // Function to fetch data for all categories
  const fetchAllLeaderboardData = useCallback(async () => {
    const categories: LeaderboardCategory[] = ['learning', 'community', 'safety', 'mentor', 'mental'];
    
    try {
      for (const category of categories) {
        await fetchLeaderboardData(category);
      }
    } catch (err) {
      console.error("Error fetching all leaderboard data:", err);
    }
  }, [fetchLeaderboardData]);

  // Construct the full leaderboard data object from individual state pieces
  const leaderboardData: LeaderboardData = {
    learning: learningData,
    community: communityData,
    safety: safetyData,
    mentor: mentorData,
    mental: mentalData
  };

  // Construct the full user rank data object from individual state pieces
  const userRank: UserRankData = {
    learning: userRankLearning,
    community: userRankCommunity,
    safety: userRankSafety,
    mentor: userRankMentor,
    mental: userRankMental
  };

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
