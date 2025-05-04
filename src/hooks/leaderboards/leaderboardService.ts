
import { supabase } from '@/integrations/supabase/client';
import { UserActivity, CommunityStats } from './types';

// Fetch top users for the leaderboard
export const fetchTopUsers = async (): Promise<UserActivity[]> => {
  const { data: rankingsData, error: rankingsError } = await supabase
    .from('user_activity')
    .select('*')
    .order('points', { ascending: false })
    .limit(10);

  if (rankingsError) {
    throw rankingsError;
  }

  // Get profiles separately to avoid join errors
  const userIds = rankingsData?.map(user => user.user_id) || [];
  let profilesData: Record<string, any> = {};
  
  if (userIds.length > 0) {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id, username, full_name, avatar_url')
      .in('id', userIds);
      
    if (!profilesError && profiles) {
      // Create a lookup object for profiles
      profilesData = profiles.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {} as Record<string, any>);
    }
  }
  
  // Combine user activity with profiles
  return rankingsData?.map(user => ({
    ...user,
    profiles: profilesData[user.user_id] || {
      username: 'Anonymous',
      full_name: null,
      avatar_url: null
    }
  })) as UserActivity[] || [];
};

// Fetch community statistics
export const fetchCommunityStats = async (): Promise<CommunityStats | null> => {
  const { data: statsData, error: statsError } = await supabase
    .from('community_stats')
    .select('*')
    .single();

  if (statsError && statsError.code !== 'PGRST116') {
    throw statsError;
  }

  return statsData;
};

// Fetch current user's rank
export const fetchCurrentUserRank = async (userId: string): Promise<UserActivity | null> => {
  if (!userId) return null;
  
  const { data: userData, error: userError } = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (userError && userError.code !== 'PGRST116') {
    console.error('Error fetching current user data:', userError);
    return null;
  }

  if (!userData) return null;

  // Get the user's profile
  const { data: userProfile } = await supabase
    .from('profiles')
    .select('username, full_name, avatar_url')
    .eq('id', userId)
    .single();
    
  return {
    ...userData,
    profiles: userProfile || {
      username: 'Anonymous',
      full_name: null,
      avatar_url: null
    }
  };
};

// Update user's activity points
export const updateUserActivity = async (userId: string, pointsToAdd: number = 10): Promise<void> => {
  if (!userId) return;

  try {
    // Check if user already has an activity record
    const { data: existingRecord, error: fetchError } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
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
        .eq('user_id', userId);

      if (updateError) throw updateError;
    } else {
      // Create new record
      const { error: insertError } = await supabase
        .from('user_activity')
        .insert({
          user_id: userId,
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
