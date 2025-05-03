
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface UseStudySessionProps {
  courseSlug?: string;
}

export const useStudySession = ({ courseSlug }: UseStudySessionProps) => {
  const { toast } = useToast();
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentResourceType, setCurrentResourceType] = useState<string | null>(null);
  const [completedResources, setCompletedResources] = useState<Record<string, boolean>>({});
  const [userId, setUserId] = useState<string | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Load timer state and completed resources from localStorage
  useEffect(() => {
    if (!courseSlug) return;

    // Load today's total from localStorage
    const storedTime = localStorage.getItem(`course_${courseSlug}_todayTime`);
    if (storedTime) {
      setTodayTotal(parseInt(storedTime));
    }
    
    // Load completed resources from localStorage
    const storedCompletedResources = localStorage.getItem(`course_${courseSlug}_completedResources`);
    if (storedCompletedResources) {
      try {
        setCompletedResources(JSON.parse(storedCompletedResources));
      } catch (e) {
        console.error("Error parsing completed resources from localStorage:", e);
      }
    }
    
    // Load timer state from localStorage
    const storedIsStudying = localStorage.getItem(`course_${courseSlug}_isStudying`);
    if (storedIsStudying) {
      setIsStudying(storedIsStudying === 'true');
    }
    
    const storedElapsedTime = localStorage.getItem(`course_${courseSlug}_elapsedTime`);
    if (storedElapsedTime) {
      setElapsedTime(parseInt(storedElapsedTime));
    }
    
    const storedSessionStartTime = localStorage.getItem(`course_${courseSlug}_sessionStartTime`);
    if (storedSessionStartTime) {
      setSessionStartTime(parseInt(storedSessionStartTime));
    }
  }, [courseSlug]);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (!courseSlug) return;
    
    localStorage.setItem(`course_${courseSlug}_isStudying`, isStudying ? 'true' : 'false');
    localStorage.setItem(`course_${courseSlug}_elapsedTime`, elapsedTime.toString());
    if (sessionStartTime) {
      localStorage.setItem(`course_${courseSlug}_sessionStartTime`, sessionStartTime.toString());
    }
  }, [isStudying, elapsedTime, sessionStartTime, courseSlug]);

  const handleStartStudy = () => {
    setIsStudying(true);
    setSessionStartTime(Date.now());
    toast({
      title: "Study session started",
      description: "Your off-the-job training time is now being recorded."
    });
  };

  const handleStopStudy = async () => {
    if (!sessionStartTime || !courseSlug) return;
    
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
    setElapsedTime(prev => prev + sessionTime);
    setIsStudying(false);
    setSessionStartTime(null);
    
    // Update today's total
    const newTodayTotal = todayTotal + sessionTime;
    setTodayTotal(newTodayTotal);
    
    // Save to localStorage
    localStorage.setItem(`course_${courseSlug}_todayTime`, newTodayTotal.toString());
    
    // Clean up session start time from localStorage
    localStorage.removeItem(`course_${courseSlug}_sessionStartTime`);
    
    // Format course name for display
    const formattedCourseName = courseSlug.split('-').map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    // Log time entry
    try {
      // If user is authenticated, save to Supabase
      if (userId) {
        try {
          // Using type assertion to bypass the type error since we know this table exists
          const { error } = await supabase
            .from('study_sessions' as any)
            .insert({
              user_id: userId,
              course_slug: courseSlug,
              duration: sessionTime,
              resource_type: currentResourceType || 'other',
              activity: `Online Learning: ${formattedCourseName}`,
              notes: "Automatically tracked from the learning portal"
            } as any);
            
          if (error) {
            console.error('Error saving study session to Supabase:', error);
            // Fallback to local notification
            toast({
              title: "Study time logged locally",
              description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
            });
          } else {
            toast({
              title: "Study time saved to your profile",
              description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
            });
          }
        } catch (e) {
          console.error('Error saving to Supabase:', e);
          toast({
            title: "Study time logged locally",
            description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
          });
        }
      } else {
        // Not authenticated - just show local notification
        toast({
          title: "Study time logged",
          description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
        });
      }
    } catch (error) {
      console.error('Error saving time record:', error);
      toast({
        title: "Error saving time record",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleResourceClick = (type: string) => {
    setCurrentResourceType(type);
    if (!isStudying) {
      toast({
        title: "Start study timer",
        description: "Click 'Start Learning' to record your training time for this activity.",
      });
    }
  };

  const handleToggleResourceComplete = async (resourceId: string) => {
    setCompletedResources(prev => {
      const updated = {
        ...prev,
        [resourceId]: !prev[resourceId]
      };
      
      // Save to localStorage
      if (courseSlug) {
        localStorage.setItem(`course_${courseSlug}_completedResources`, JSON.stringify(updated));
      }
      
      // Try to save to Supabase if user is authenticated
      if (userId && courseSlug) {
        setTimeout(() => {
          try {
            // Using type assertion to bypass the type error
            supabase
              .from('completed_resources' as any)
              .upsert({
                user_id: userId,
                course_slug: courseSlug,
                resource_id: resourceId,
                is_completed: updated[resourceId],
                last_updated: new Date().toISOString()
              } as any)
              .then(({ error }) => {
                if (error) console.error('Error saving resource completion:', error);
              });
          } catch (e) {
            console.error('Error upserting to Supabase:', e);
          }
        }, 0);
      }
      
      // Show toast notification
      toast({
        title: updated[resourceId] ? "Resource marked as completed" : "Resource marked as incomplete",
        description: "Your progress has been updated.",
      });
      
      return updated;
    });
  };

  return {
    isStudying,
    elapsedTime,
    sessionStartTime,
    todayTotal,
    currentResourceType,
    completedResources,
    handleStartStudy,
    handleStopStudy,
    handleResourceClick,
    handleToggleResourceComplete,
    setCurrentResourceType
  };
};
