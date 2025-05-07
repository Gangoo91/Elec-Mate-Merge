
import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useAuthState } from '@/hooks/time-tracking/useAuthState';
import { formatTime } from '@/lib/utils';

// Inactivity timeout in milliseconds
const INACTIVITY_TIMEOUT = 60000; // 1 minute
const SAVE_INTERVAL = 300000; // Save every 5 minutes

export const useAutomatedTraining = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const { toast } = useToast();
  const { userId } = useAuthState();
  const { addTimeEntry } = useTimeEntries();
  
  const timerRef = useRef<number | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const activityLogRef = useRef<{timestamp: number, action: string}[]>([]);
  
  // Function to log user activity
  const logActivity = (action: string) => {
    lastActivityRef.current = Date.now();
    
    activityLogRef.current.push({
      timestamp: Date.now(),
      action
    });
    
    // Limit activity log size
    if (activityLogRef.current.length > 100) {
      activityLogRef.current = activityLogRef.current.slice(-100);
    }
  };
  
  // Function to start tracking time
  const startTracking = (activity: string) => {
    if (isTracking) return;
    
    setCurrentActivity(activity);
    setIsTracking(true);
    setSessionTime(0);
    lastActivityRef.current = Date.now();
    activityLogRef.current = [];
    setLastSaveTime(Date.now());
    
    logActivity(`Started ${activity}`);
    
    toast({
      title: "Time tracking started",
      description: `Your ${activity} time is now being tracked.`
    });
    
    // Start timer
    timerRef.current = window.setInterval(() => {
      // Check for inactivity
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityRef.current;
      
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        logActivity('Inactivity detected');
        pauseTracking();
        return;
      }
      
      setSessionTime(prev => prev + 1);
      
      // Save progress periodically
      if (currentTime - lastSaveTime > SAVE_INTERVAL) {
        saveTempProgress();
        setLastSaveTime(currentTime);
      }
    }, 1000);
  };
  
  // Function to pause tracking
  const pauseTracking = () => {
    if (!isTracking) return;
    
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsTracking(false);
    
    logActivity('Paused tracking');
    
    toast({
      title: "Time tracking paused",
      description: "Your training time tracking has been paused due to inactivity."
    });
  };
  
  // Function to resume tracking
  const resumeTracking = () => {
    if (isTracking || !currentActivity) return;
    
    setIsTracking(true);
    lastActivityRef.current = Date.now();
    
    logActivity('Resumed tracking');
    
    toast({
      title: "Time tracking resumed",
      description: `Your ${currentActivity} time tracking has been resumed.`
    });
    
    // Restart timer
    timerRef.current = window.setInterval(() => {
      const currentTime = Date.now();
      const timeSinceLastActivity = currentTime - lastActivityRef.current;
      
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        pauseTracking();
        return;
      }
      
      setSessionTime(prev => prev + 1);
      
      // Save progress periodically
      if (currentTime - lastSaveTime > SAVE_INTERVAL) {
        saveTempProgress();
        setLastSaveTime(currentTime);
      }
    }, 1000);
  };
  
  // Function to stop tracking and save time
  const stopTracking = () => {
    if (!isTracking && !currentActivity) return;
    
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const finalActivity = currentActivity || 'training';
    const finalTime = sessionTime;
    
    setIsTracking(false);
    setCurrentActivity(null);
    setSessionTime(0);
    
    // Only save if there's actually time to record
    if (finalTime > 0) {
      // Convert seconds to minutes for the time entry
      const durationInMinutes = Math.ceil(finalTime / 60);
      
      logActivity(`Completed ${finalActivity} - ${formatTime(finalTime)}`);
      
      // Add the time entry
      addTimeEntry(
        durationInMinutes, 
        finalActivity, 
        `Automatically tracked: ${formatTime(finalTime)} of ${finalActivity} with activity verification`
      );
      
      toast({
        title: "Time saved",
        description: `${formatTime(finalTime)} of ${finalActivity} has been added to your training log with verification.`
      });
    }
    
    // Clear activity log
    activityLogRef.current = [];
  };
  
  // Function to save temporary progress without stopping
  const saveTempProgress = () => {
    if (!isTracking || sessionTime === 0 || !currentActivity) return;
    
    // Convert seconds to minutes for the time entry
    const durationInMinutes = Math.ceil(sessionTime / 60);
    
    logActivity(`Auto-saved progress: ${formatTime(sessionTime)}`);
    
    // Add the time entry
    addTimeEntry(
      durationInMinutes, 
      currentActivity, 
      `Auto-saved progress: ${formatTime(sessionTime)} of ${currentActivity} with activity verification`
    );
    
    // Reset the session time but continue tracking
    setSessionTime(0);
    
    toast({
      title: "Progress saved",
      description: `${formatTime(sessionTime)} of ${currentActivity} has been saved to your training log.`,
    });
  };
  
  // User activity detection
  useEffect(() => {
    const trackUserActivity = () => {
      // Only update if we're currently tracking
      if (isTracking) {
        lastActivityRef.current = Date.now();
        
        // If we were paused due to inactivity, resume
        if (!timerRef.current) {
          resumeTracking();
        }
      }
    };
    
    // Events to track for user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    
    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, trackUserActivity);
    });
    
    // Cleanup event listeners
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, trackUserActivity);
      });
    };
  }, [isTracking]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        
        // If we have time tracked, save it before unmounting
        if (sessionTime > 0 && currentActivity) {
          const durationInMinutes = Math.ceil(sessionTime / 60);
          addTimeEntry(
            durationInMinutes, 
            currentActivity, 
            `Session ended: ${formatTime(sessionTime)} of ${currentActivity}`
          );
        }
      }
    };
  }, [sessionTime, currentActivity, addTimeEntry]);
  
  // Check for page changes to log activity
  useEffect(() => {
    // Log page navigation
    logActivity(`Navigated to ${window.location.pathname}`);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (isTracking) pauseTracking();
        logActivity('Left page');
      } else {
        logActivity('Returned to page');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTracking]);
  
  return {
    isTracking,
    sessionTime,
    currentActivity,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
    activityLog: activityLogRef.current
  };
};
