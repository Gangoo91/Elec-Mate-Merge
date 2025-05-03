
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import { useSessionStorage } from "./study-session/useSessionStorage";
import { useAuthUser } from "./study-session/useAuthUser";
import { useSupabaseSave } from "./study-session/useSupabaseSave";

interface UseStudySessionProps {
  courseSlug?: string;
}

export const useStudySession = ({ courseSlug }: UseStudySessionProps) => {
  const { toast } = useToast();
  const [currentResourceType, setCurrentResourceType] = useState<string | null>(null);
  
  const { userId } = useAuthUser();
  const { saveStudySession, saveResourceCompletion } = useSupabaseSave();
  const {
    isStudying,
    setIsStudying,
    elapsedTime,
    setElapsedTime,
    sessionStartTime,
    setSessionStartTime,
    todayTotal,
    updateTodayTotal,
    completedResources,
    setCompletedResources,
    saveCompletedResources
  } = useSessionStorage(courseSlug);

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
    updateTodayTotal(newTodayTotal);
    
    // Clean up session start time from localStorage
    localStorage.removeItem(`course_${courseSlug}_sessionStartTime`);
    
    // Log time entry
    try {
      // If user is authenticated, save to Supabase
      if (userId) {
        const saved = await saveStudySession(userId, courseSlug, sessionTime, currentResourceType);
        if (!saved) {
          // Already handled in the save function
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
      saveCompletedResources(updated);
      
      // Try to save to Supabase if user is authenticated
      if (userId && courseSlug) {
        setTimeout(() => {
          saveResourceCompletion(userId, courseSlug, resourceId, updated[resourceId]);
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
