
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { ensureSubscriberCounted, updateUserActivity } from './leaderboards/useActivityTracking';

export function useUserActivity() {
  const { user, isSubscribed } = useAuth();
  const { toast } = useToast();

  // Mark user as active when the component mounts
  useEffect(() => {
    const trackUserActivity = async () => {
      if (!user) return;

      try {
        // Check if user already has a record
        const { data: existingData, error: fetchError } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error checking user activity:', fetchError);
          return;
        }

        const today = new Date().toISOString().split('T')[0];
        
        // Prioritize marking subscribed users as active
        const isNewDay = !existingData || existingData.last_active_date !== today;
        
        if (existingData) {
          // If last active date is not today, update the record
          if (isNewDay) {
            const { error: updateError } = await supabase
              .from('user_activity')
              .update({
                last_active_date: today,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', user.id);

            if (updateError) {
              console.error('Error updating user activity:', updateError);
            } else if (isSubscribed) {
              // If subscribed user becomes active on a new day, update community stats
              const { data: statsData } = await supabase
                .from('community_stats')
                .select('id')
                .single();
              
              if (statsData) {
                updateCommunityStats(statsData.id);
              }
            }
          }
        } else {
          // Create a new record for the user
          const { error: insertError } = await supabase
            .from('user_activity')
            .insert({
              user_id: user.id,
              points: 10, // Starting points
              level: 'Apprentice',
              badge: 'Beginner',
              streak: 1,
              last_active_date: today
            });

          if (insertError) {
            console.error('Error creating user activity record:', insertError);
          } else {
            // Increment active users in community stats
            const { data: statsData } = await supabase
              .from('community_stats')
              .select('id')
              .single();
            
            if (statsData) {
              updateCommunityStats(statsData.id);
            }

            // Show welcome toast
            toast({
              title: "Welcome to the community!",
              description: "You've earned your first 10 points. Complete lessons to earn more and climb the leaderboard.",
            });
          }
        }
      } catch (err) {
        console.error('Error tracking user activity:', err);
      }
    };

    // Helper function to update community stats
    const updateCommunityStats = async (statsId: string) => {
      try {
        if (user && isSubscribed) {
          await ensureSubscriberCounted(statsId, user.id, isSubscribed);
        }
      } catch (err) {
        console.error('Error updating community stats:', err);
      }
    };

    trackUserActivity();
  }, [user, isSubscribed, toast]);

  // Function to record lesson completion
  const recordLessonCompletion = async (lessonId: string) => {
    if (!user) return;
    
    try {
      // Update user points using the shared function
      await updateUserActivity(user.id, 25);

      // Show toast
      toast({
        title: "Lesson completed!",
        description: `You've earned 25 points. Keep learning to gain more!`,
      });
    } catch (err) {
      console.error('Error recording lesson completion:', err);
    }
  };

  return { recordLessonCompletion };
}
