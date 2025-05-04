
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export function useUserActivity() {
  const { user, isSubscribed } = useAuth();
  const { toast } = useToast();

  // Mark user as active when the component mounts
  useEffect(() => {
    const trackUserActivity = async () => {
      if (!user) return;

      try {
        const categories = ['learning', 'community', 'safety', 'mentor', 'mental'];
        const today = new Date().toISOString().split('T')[0];
        
        for (const category of categories) {
          // Check if user already has a record for this category
          const { data: existingData, error: fetchError } = await supabase
            .from('user_activity')
            .select('*')
            .eq('user_id', user.id)
            .eq('category', category)
            .single();

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error(`Error checking user activity for ${category}:`, fetchError);
            continue;
          }

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
                .eq('user_id', user.id)
                .eq('category', category);

              if (updateError) {
                console.error(`Error updating user activity for ${category}:`, updateError);
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
                category: category,
                last_active_date: today
              });

            if (insertError) {
              console.error(`Error creating user activity record for ${category}:`, insertError);
            }
          }
        }
        
        // Update community stats if subscribed
        if (isSubscribed) {
          // Get stats for updating
          const { data: statsData } = await supabase
            .from('community_stats')
            .select('id')
            .single();
          
          if (statsData) {
            // Correctly update active users count
            await supabase
              .from('community_stats')
              .update({ 
                active_users: supabase.rpc('increment_counter', { 
                  row_id: statsData.id, 
                  counter_name: 'active_users' 
                }) 
              })
              .eq('id', statsData.id);
          }
            
          // Show welcome toast for new users
          toast({
            title: "Welcome to the community!",
            description: "You've earned your first points. Complete activities to earn more!",
          });
        }
      } catch (err) {
        console.error('Error tracking user activity:', err);
      }
    };

    trackUserActivity();
  }, [user, isSubscribed, toast]);

  // Function to record activity completion
  const recordActivity = async (activityType: string, pointsToAdd: number = 10) => {
    if (!user) return;
    
    try {
      // Update user points - fix the RPC call
      const { error } = await supabase
        .from('user_activity')
        .update({
          points: supabase.rpc('increment_counter', { 
            row_id: user.id, 
            counter_name: 'points',
            increment_by: pointsToAdd 
          }),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('category', activityType);

      if (error) {
        console.error(`Error recording ${activityType} completion:`, error);
        return;
      }

      // Show toast
      const activityLabels: Record<string, string> = {
        learning: "lesson",
        community: "community discussion",
        safety: "safety share",
        mentor: "mentor connect session",
        mental: "wellbeing activity"
      };

      toast({
        title: `${activityLabels[activityType] || activityType} completed!`,
        description: `You've earned ${pointsToAdd} points. Keep going to gain more!`,
      });
    } catch (err) {
      console.error(`Error recording ${activityType} completion:`, err);
    }
  };

  return { 
    recordLessonCompletion: () => recordActivity('learning', 25),
    recordCommunityActivity: () => recordActivity('community', 15),
    recordSafetyShare: () => recordActivity('safety', 20),
    recordMentorSession: () => recordActivity('mentor', 30),
    recordWellbeingActivity: () => recordActivity('mental', 20)
  };
}
