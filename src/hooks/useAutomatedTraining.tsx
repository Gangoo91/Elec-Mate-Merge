
import { useState, useEffect, useCallback, useRef } from "react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useAuthState } from "@/hooks/time-tracking/useAuthState";
import { useToast } from "@/components/ui/use-toast";

export const useAutomatedTraining = (autoStart = false) => {
  const [isTracking, setIsTracking] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  const { addTimeEntry } = useTimeEntries();
  const { userId } = useAuthState();
  const { toast } = useToast();
  
  // Auto-save interval (5 minutes in milliseconds)
  const AUTO_SAVE_INTERVAL = 5 * 60 * 1000;
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoSaveRef = useRef<number>(0);

  // Track user inactivity
  useEffect(() => {
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

  // Check for inactivity every minute and pause tracking if inactive
  useEffect(() => {
    const checkActivity = () => {
      if (isTracking) {
        const now = Date.now();
        const inactiveTime = now - lastActivityRef.current;
        
        // If inactive for more than 1 minute (60000 ms), pause tracking
        if (inactiveTime > 60000) {
          pauseTracking();
          
          toast({
            title: "Training paused",
            description: "Tracking paused due to inactivity",
          });
        }
      }
    };
    
    const activityInterval = setInterval(checkActivity, 60000);
    return () => clearInterval(activityInterval);
  }, [isTracking, toast]);

  // Timer logic
  useEffect(() => {
    if (isTracking) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
      
      // Set up auto-save
      if (!autoSaveRef.current) {
        autoSaveRef.current = setInterval(() => {
          if (sessionTime > lastAutoSaveRef.current && sessionTime - lastAutoSaveRef.current >= 60) {
            // Only auto-save if at least 1 minute has passed since the last save
            const minutesToSave = Math.floor((sessionTime - lastAutoSaveRef.current) / 60);
            if (minutesToSave > 0 && currentActivity) {
              // Convert seconds to minutes for storage
              addTimeEntry(minutesToSave, currentActivity, "Auto-saved training time");
              lastAutoSaveRef.current = sessionTime;
              
              toast({
                title: "Progress saved",
                description: `${minutesToSave} minutes of training time recorded`,
                variant: "default",
              });
            }
          }
        }, AUTO_SAVE_INTERVAL);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (autoSaveRef.current) {
        clearInterval(autoSaveRef.current);
        autoSaveRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (autoSaveRef.current) {
        clearInterval(autoSaveRef.current);
      }
    };
  }, [isTracking, sessionTime, addTimeEntry, currentActivity, toast]);

  // Auto-start based on the autoStart prop
  useEffect(() => {
    if (autoStart && userId) {
      startTracking("Application Study");
    }
  }, [autoStart, userId]);

  // Start tracking function
  const startTracking = useCallback((activity: string) => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track your training time",
        variant: "destructive",
      });
      return;
    }
    
    setIsTracking(true);
    setCurrentActivity(activity);
    lastActivityRef.current = Date.now();
    console.log(`Started tracking: ${activity}`);
  }, [userId, toast]);

  // Pause tracking function
  const pauseTracking = useCallback(() => {
    setIsTracking(false);
    
    // Save progress when paused
    if (sessionTime > lastAutoSaveRef.current && currentActivity) {
      const minutesToSave = Math.floor((sessionTime - lastAutoSaveRef.current) / 60);
      if (minutesToSave > 0) {
        addTimeEntry(minutesToSave, currentActivity, "Paused training time");
        lastAutoSaveRef.current = sessionTime;
      }
    }
    
    console.log("Tracking paused");
  }, [sessionTime, currentActivity, addTimeEntry]);

  // Resume tracking function
  const resumeTracking = useCallback(() => {
    if (!userId) {
      toast({
        title: "Authentication required",
        description: "Please sign in to track your training time",
        variant: "destructive",
      });
      return;
    }
    
    if (currentActivity) {
      setIsTracking(true);
      lastActivityRef.current = Date.now();
      console.log("Tracking resumed");
    }
  }, [currentActivity, userId, toast]);

  // Stop and save tracking function
  const stopTracking = useCallback(() => {
    setIsTracking(false);
    
    // Calculate minutes to save (convert seconds to minutes)
    if (currentActivity && sessionTime > 0) {
      // Add the time that hasn't been auto-saved yet
      const minutesToSave = Math.max(1, Math.floor((sessionTime - lastAutoSaveRef.current) / 60));
      
      if (minutesToSave > 0) {
        addTimeEntry(minutesToSave, currentActivity, "Manually saved training time");
      }
      
      toast({
        title: "Training complete",
        description: `${minutesToSave} minutes of training time saved`,
      });
    }
    
    // Reset values
    setSessionTime(0);
    setCurrentActivity(null);
    lastAutoSaveRef.current = 0;
    
    console.log("Tracking stopped and saved");
  }, [sessionTime, currentActivity, addTimeEntry, toast]);

  // Handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // If still tracking when unmounting, save the remaining time
      if (isTracking && currentActivity && sessionTime > lastAutoSaveRef.current) {
        const minutesToSave = Math.max(1, Math.floor((sessionTime - lastAutoSaveRef.current) / 60));
        
        if (minutesToSave > 0) {
          addTimeEntry(minutesToSave, currentActivity, "Session ended training time");
          console.log(`Saved ${minutesToSave} minutes before unmounting`);
        }
      }
    };
  }, [isTracking, sessionTime, currentActivity, addTimeEntry]);

  return {
    isTracking,
    sessionTime,
    currentActivity,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
    isAuthenticated: !!userId
  };
};
