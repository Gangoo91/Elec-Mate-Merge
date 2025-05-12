
import { useRef, useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AutoSaveOptions {
  sessionTime: number;
  isTracking: boolean;
  currentActivity: string | null;
  saveInterval?: number; // in milliseconds
  minimumEntryDuration?: number; // in minutes
  onSave: (minutes: number, activity: string) => void;
}

/**
 * Hook to automatically save training progress at regular intervals
 */
export const useAutoSave = ({
  sessionTime,
  isTracking,
  currentActivity,
  saveInterval = 5 * 60 * 1000, // 5 minutes default
  minimumEntryDuration = 30, // 30 minutes default
  onSave
}: AutoSaveOptions) => {
  const { toast } = useToast();
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoSaveRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);
  const [isSaving, setIsSaving] = useState(false);
  
  // Auto-save functionality
  useEffect(() => {
    if (isTracking) {
      if (!autoSaveRef.current) {
        autoSaveRef.current = setInterval(() => {
          if (sessionTime > lastAutoSaveRef.current) {
            // Calculate elapsed seconds since last checkpoint
            const elapsedSeconds = sessionTime - lastAutoSaveRef.current;
            
            // Add to accumulated time
            accumulatedTimeRef.current += elapsedSeconds;
            lastAutoSaveRef.current = sessionTime;
            
            // Check if we've reached minimum entry duration (convert to seconds)
            const minimumSeconds = minimumEntryDuration * 60;
            
            if (accumulatedTimeRef.current >= minimumSeconds && currentActivity) {
              // Create a time entry for the accumulated time (in minutes)
              const minutesToSave = Math.floor(accumulatedTimeRef.current / 60);
              onSave(minutesToSave, currentActivity);
              
              // Reset accumulated time
              accumulatedTimeRef.current = 0;
              
              // Show notification
              setIsSaving(true);
              toast({
                title: "Training time saved",
                description: `${minutesToSave} minutes of training time recorded`,
                variant: "default",
              });
              setTimeout(() => setIsSaving(false), 3000);
            }
          }
        }, saveInterval);
      }
    } else if (autoSaveRef.current) {
      clearInterval(autoSaveRef.current);
      autoSaveRef.current = null;
    }
    
    return () => {
      if (autoSaveRef.current) {
        clearInterval(autoSaveRef.current);
      }
    };
  }, [isTracking, sessionTime, currentActivity, onSave, saveInterval, toast, minimumEntryDuration]);
  
  // Method to manually save current time
  const saveCurrentProgress = () => {
    if (currentActivity) {
      // Add any time since last auto-save to our accumulated time
      if (sessionTime > lastAutoSaveRef.current) {
        accumulatedTimeRef.current += (sessionTime - lastAutoSaveRef.current);
      }
      
      // Only save if we have accumulated time
      if (accumulatedTimeRef.current > 0) {
        const minutesToSave = Math.max(5, Math.floor(accumulatedTimeRef.current / 60));
        
        onSave(minutesToSave, currentActivity);
        lastAutoSaveRef.current = sessionTime;
        accumulatedTimeRef.current = 0;
        return minutesToSave;
      }
    }
    return 0;
  };
  
  // Reset auto-save state
  const resetAutoSave = () => {
    lastAutoSaveRef.current = 0;
    accumulatedTimeRef.current = 0;
  };

  return {
    lastSavedTime: lastAutoSaveRef.current,
    accumulatedTime: accumulatedTimeRef.current,
    isSaving,
    saveCurrentProgress,
    resetAutoSave
  };
};
