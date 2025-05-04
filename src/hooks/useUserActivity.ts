
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export function useUserActivity() {
  const { user } = useAuth();
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
        
        if (existingData) {
          // If last active date is not today, update the record
          if (existingData.last_active_date !== today) {
            const { error: updateError } = await supabase
              .from('user_activity')
              .update({
                last_active_date: today,
                updated_at: new Date().toISOString()
              })
              .eq('user_id', user.id);

            if (updateError) {
              console.error('Error updating user activity:', updateError);
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
              .select('*')
              .limit(1)
              .single();

            if (statsData) {
              await supabase
                .from('community_stats')
                .update({
                  active_users: (statsData.active_users || 0) + 1,
                  updated_at: new Date().toISOString()
                })
                .eq('id', statsData.id);
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

    trackUserActivity();
  }, [user, toast]);

  // Function to record lesson completion
  const recordLessonCompletion = async (lessonId: string) => {
    if (!user) return;
    
    try {
      // Update user points
      const { data: userData, error: userError } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }

      const pointsToAdd = 25;
      
      if (userData) {
        // Update existing record
        await supabase
          .from('user_activity')
          .update({
            points: userData.points + pointsToAdd,
            last_active_date: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);
      } else {
        // Create new record
        await supabase
          .from('user_activity')
          .insert({
            user_id: user.id,
            points: pointsToAdd,
            level: 'Apprentice',
            badge: 'Beginner',
            last_active_date: new Date().toISOString().split('T')[0]
          });
      }

      // Update community stats
      const { data: statsData } = await supabase
        .from('community_stats')
        .select('*')
        .single();

      if (statsData) {
        // Fixed the TypeScript errors by correctly handling the community stats update
        await supabase
          .from('community_stats')
          .update({
            lessons_completed_today: (statsData.lessons_completed_today || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', statsData.id);
      }

      // Show toast
      toast({
        title: "Lesson completed!",
        description: `You've earned ${pointsToAdd} points. Keep learning to gain more!`,
      });
    } catch (err) {
      console.error('Error recording lesson completion:', err);
    }
  };

  return { recordLessonCompletion };
}
