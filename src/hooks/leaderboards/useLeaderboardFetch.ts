
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { UserActivity, CommunityStats, LeaderboardCategory } from './types';
import { LeaderboardData, UserRankData } from './supabaseUtils';
import { fetchCategoryLeaderboard } from './leaderboardDataService';

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
    setIsLoading(true);
    setError(null);

    const result = await fetchCategoryLeaderboard(category, userId, isSubscribed);
    
    // Update the appropriate state based on category
    if (category === 'learning') {
      setLearningData(result.rankings);
      setUserRankLearning(result.userRank);
    } else if (category === 'community') {
      setCommunityData(result.rankings);
      setUserRankCommunity(result.userRank);
    } else if (category === 'safety') {
      setSafetyData(result.rankings);
      setUserRankSafety(result.userRank);
    } else if (category === 'mentor') {
      setMentorData(result.rankings);
      setUserRankMentor(result.userRank);
    } else if (category === 'mental') {
      setMentalData(result.rankings);
      setUserRankMental(result.userRank);
    }
    
    // Update community stats if available
    if (result.communityStats) {
      setCommunityStats(result.communityStats);
    }
    
    // Update error state if there was an error
    if (result.error) {
      setError(result.error);
    }
    
    setIsLoading(false);
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
