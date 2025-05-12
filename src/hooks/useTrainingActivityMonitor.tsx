
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook to automatically monitor and track learning activities across the application
 */
export const useTrainingActivityMonitor = () => {
  const location = useLocation();
  const { 
    isTracking,
    startTracking,
    pauseTracking,
    stopTracking,
    isAuthenticated
  } = useAutomatedTraining();
  const { toast } = useToast();
  
  // Automatically track activity based on routes
  useEffect(() => {
    // Check if the current route is a learning/study related page
    const isLearningPage = (
      location.pathname.includes('/apprentice/course') ||
      location.pathname.includes('/apprentice/unit') ||
      location.pathname.includes('/apprentice/study') ||
      location.pathname.includes('/apprentice/section')
    );
    
    if (isLearningPage && !isTracking && isAuthenticated) {
      // Determine the activity type based on the route
      let activityType = 'Online Learning';
      
      if (location.pathname.includes('/study/ai-learning')) {
        activityType = 'AI Learning Tool';
      } else if (location.pathname.includes('/section')) {
        activityType = 'Section Study';
      } else if (location.pathname.includes('/unit')) {
        activityType = 'Unit Learning';
      }
      
      // Start tracking the learning activity
      startTracking(`${activityType}: ${location.pathname.split('/').pop()}`);
      
      toast({
        title: "Training time recording",
        description: "Your off-the-job training time is now being recorded",
        duration: 3000,
      });
    } else if (!isLearningPage && isTracking) {
      // When navigating away from learning pages, stop tracking
      stopTracking();
    }
    
    // Cleanup when component unmounts
    return () => {
      if (isTracking) {
        stopTracking();
      }
    };
  }, [location.pathname, isTracking, startTracking, stopTracking, isAuthenticated, toast]);
  
  return { isTracking };
};
