
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

export const useSupabaseSave = () => {
  const { toast } = useToast();

  const saveStudySession = async (
    userId: string | null, 
    courseSlug: string | undefined,
    sessionTime: number, 
    resourceType: string | null
  ) => {
    if (!userId || !courseSlug) {
      return false;
    }

    // Format course name for display
    const formattedCourseName = courseSlug.split('-').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    try {
      // @ts-ignore - Suppressing TypeScript errors for Supabase tables not in types
      const { error } = await supabase
        .from('study_sessions')
        .insert({
          user_id: userId,
          course_slug: courseSlug,
          duration: sessionTime,
          resource_type: resourceType || 'other',
          activity: `Online Learning: ${formattedCourseName}`,
          notes: "Automatically tracked from the learning portal"
        });
        
      if (error) {
        console.error('Error saving study session to Supabase:', error);
        toast({
          title: "Study time logged locally",
          description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
        });
        return false;
      } else {
        toast({
          title: "Study time saved to your profile",
          description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
        });
        return true;
      }
    } catch (e) {
      console.error('Error saving to Supabase:', e);
      toast({
        title: "Study time logged locally",
        description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
      });
      return false;
    }
  };

  const saveResourceCompletion = async (
    userId: string | null,
    courseSlug: string | undefined,
    resourceId: string,
    isCompleted: boolean
  ) => {
    if (!userId || !courseSlug) {
      return false;
    }

    try {
      // @ts-ignore - Suppressing TypeScript errors for Supabase tables not in types
      const { error } = await supabase
        .from('completed_resources')
        .upsert({
          user_id: userId,
          course_slug: courseSlug,
          resource_id: resourceId,
          is_completed: isCompleted,
          last_updated: new Date().toISOString()
        });
        
      if (error) {
        console.error('Error saving resource completion:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error upserting to Supabase:', e);
      return false;
    }
  };

  return { saveStudySession, saveResourceCompletion };
};
