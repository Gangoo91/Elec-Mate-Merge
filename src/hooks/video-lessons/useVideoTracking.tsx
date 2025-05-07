
import { useEffect } from 'react';
import { useAutomatedTraining } from '@/hooks/useAutomatedTraining';

export const useVideoTracking = () => {
  const { 
    isTracking,
    startTracking,
    pauseTracking,
    stopTracking,
    currentActivity 
  } = useAutomatedTraining(true); // Enable auto-start
  
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
    if (!isTracking) {
      startTracking(`Video: ${videoTitle}`);
    }
  };
  
  return {
    isTracking,
    trackVideoView,
    pauseTracking,
    currentActivity
  };
};
