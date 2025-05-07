
import { useEffect } from 'react';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';
import { useToast } from '@/components/ui/use-toast';
import { useAuthState } from "@/hooks/time-tracking/useAuthState";

export const useVideoTracking = () => {
  const { 
    isTracking,
    startTracking,
    pauseTracking,
    stopTracking,
    currentActivity,
    isAuthenticated
  } = useAutomatedTraining(true); // Enable auto-start
  
  const { toast } = useToast();
  const { userId } = useAuthState();
  
  // Handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // If still tracking when leaving the page, save progress
      if (isTracking) {
        stopTracking();
      }
    };
  }, [isTracking, stopTracking]);
  
  // Manually trigger video tracking if needed
  const trackVideoView = (videoTitle: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in to track progress",
        description: "Sign in to keep track of your learning progress",
        variant: "default"
      });
      return;
    }
    
    if (!isTracking) {
      startTracking(`Video: ${videoTitle}`);
      toast({
        title: "Video tracking started",
        description: "Your learning time is being tracked automatically",
      });
    }
  };
  
  return {
    isTracking,
    trackVideoView,
    pauseTracking,
    currentActivity,
    isAuthenticated
  };
};
