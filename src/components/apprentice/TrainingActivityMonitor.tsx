
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';
import { useToast } from "@/components/ui/use-toast";

/**
 * Component that monitors training activity across the application
 * This is a "virtual" component that doesn't render anything visible
 */
const TrainingActivityMonitor = () => {
  const location = useLocation();
  const { 
    isTracking,
    startTracking,
    stopTracking,
    isAuthenticated,
    sessionTime
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
    
    // We should stop tracking if user lands on the OJT page
    const isOJTPage = location.pathname.includes('/apprentice/ojt');
    
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
        description: "Your off-the-job training time is now being automatically recorded",
        duration: 3000,
      });
    } else if (isOJTPage && isTracking) {
      // When navigating to the OJT page, don't immediately stop tracking
      // This is now handled by the TrackingStatusIndicator component
    } else if (!isLearningPage && !isOJTPage && isTracking) {
      // When navigating to other non-learning pages, stop tracking
      stopTracking();
    }
    
    // Cleanup when component unmounts
    return () => {
      // Don't automatically stop tracking here, as it will be handled
      // by the TrackingStatusIndicator when on OJT page
    };
  }, [location.pathname, isTracking, startTracking, stopTracking, isAuthenticated, toast]);
  
  // This component doesn't render anything visible
  return null;
};

export default TrainingActivityMonitor;
