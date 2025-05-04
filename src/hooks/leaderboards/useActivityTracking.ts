
import { supabase } from '@/integrations/supabase/client';

/**
 * Ensures that a subscriber is counted in community stats
 */
export async function ensureSubscriberCounted(statsId: string, userId: string, isSubscribed: boolean) {
  if (!userId || !isSubscribed) return;
  
  try {
    // First check if user already has an activity record for today
    const today = new Date().toISOString().split('T')[0];
    
    const { data: existingActivity } = await supabase
      .from('user_activity')
      .select('*')
      .eq('user_id', userId)
      .eq('last_active_date', today)
      .single();
    
    // If no activity record for today, we need to update the community stats
    if (!existingActivity) {
      // Update community stats to increment active users
      const { data: statsData } = await supabase
        .from('community_stats')
        .select('active_users')
        .eq('id', statsId)
        .single();
        
      if (statsData) {
        await supabase
          .from('community_stats')
          .update({
            active_users: statsData.active_users + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', statsId);
      }
      
      // Create or update user activity record to mark them as active today
      const { data: activityData } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (activityData) {
        await supabase
          .from('user_activity')
          .update({
            last_active_date: today,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userId);
      } else {
        await supabase
          .from('user_activity')
          .insert({
            user_id: userId,
            points: 10, // Starting points
            level: 'Apprentice',
            badge: 'Beginner',
            streak: 1,
            last_active_date: today
          });
      }
    }
  } catch (err) {
    console.error('Error ensuring subscriber is counted:', err);
  }
}

/**
 * Updates user activity and community stats when completing activities like lessons
 */
export async function updateUserActivity(userId: string, pointsToAdd: number = 10) {
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
          last_active_date: new Date().toISOString().split('T')[0],
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
          last_active_date: new Date().toISOString().split('T')[0]
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
}
