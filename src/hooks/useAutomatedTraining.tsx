
import { useState, useEffect, useCallback } from "react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useAuthState } from "@/hooks/time-tracking/useAuthState";
import { useToast } from "@/components/ui/use-toast";
import { useActivityTracking } from "@/hooks/training-tracking/useActivityTracking";
import { useTrainingTimer } from "@/hooks/training-tracking/useTrainingTimer";
import { useAutoSave } from "@/hooks/training-tracking/useAutoSave";

export const useAutomatedTraining = (autoStart = false) => {
  const [currentActivity, setCurrentActivity] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  
  const { addTimeEntry } = useTimeEntries();
  const { userId } = useAuthState();
  const { toast } = useToast();
  
  // Use our new hooks
  const { sessionTime, isRunning, startTimer, pauseTimer, resetTimer } = useTrainingTimer();
  
  const handleInactivity = useCallback(() => {
    if (isTracking) {
      pauseTracking();
      toast({
        title: "Training paused",
        description: "Tracking paused due to inactivity",
      });
    }
  }, [isTracking, toast]);
  
  const { isActive, resetActivity } = useActivityTracking({
    onInactive: handleInactivity
  });
  
  const { saveCurrentProgress, resetAutoSave } = useAutoSave({
    sessionTime,
    isTracking,
    currentActivity,
    onSave: (minutes, activity) => {
      addTimeEntry(minutes, activity, "Auto-saved training time");
    }
  });

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
    startTimer();
    resetActivity();
    console.log(`Started tracking: ${activity}`);
  }, [userId, toast, startTimer, resetActivity]);

  // Pause tracking function
  const pauseTracking = useCallback(() => {
    setIsTracking(false);
    pauseTimer();
    
    // Save progress when paused
    if (currentActivity) {
      const savedMinutes = saveCurrentProgress();
      if (savedMinutes > 0) {
        console.log(`Saved ${savedMinutes} minutes on pause`);
      }
    }
    
    console.log("Tracking paused");
  }, [currentActivity, pauseTimer, saveCurrentProgress]);

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
      startTimer();
      resetActivity();
      console.log("Tracking resumed");
    }
  }, [currentActivity, userId, toast, startTimer, resetActivity]);

  // Stop and save tracking function
  const stopTracking = useCallback(() => {
    setIsTracking(false);
    
    // Save remaining time
    if (currentActivity) {
      const savedMinutes = saveCurrentProgress();
      
      if (savedMinutes > 0) {
        toast({
          title: "Training complete",
          description: `${savedMinutes} minutes of training time saved`,
        });
      }
    }
    
    // Reset values
    resetTimer();
    setCurrentActivity(null);
    resetAutoSave();
    
    console.log("Tracking stopped and saved");
  }, [currentActivity, resetTimer, saveCurrentProgress, resetAutoSave, toast]);

  // Auto-start based on the autoStart prop
  useEffect(() => {
    if (autoStart && userId && !currentActivity) {
      startTracking("Application Study");
    }
  }, [autoStart, userId, startTracking, currentActivity]);

  // Handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // If still tracking when unmounting, save the remaining time
      if (isTracking && currentActivity) {
        const savedMinutes = saveCurrentProgress();
        if (savedMinutes > 0) {
          console.log(`Saved ${savedMinutes} minutes before unmounting`);
        }
      }
    };
  }, [isTracking, currentActivity, saveCurrentProgress]);

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
