
import { useRef, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface AutoSaveOptions {
  sessionTime: number;
  isTracking: boolean;
  currentActivity: string | null;
  saveInterval?: number; // in milliseconds
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
  onSave
}: AutoSaveOptions) => {
  const { toast } = useToast();
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoSaveRef = useRef<number>(0);
  
  // Auto-save functionality
  useEffect(() => {
    if (isTracking) {
      if (!autoSaveRef.current) {
        autoSaveRef.current = setInterval(() => {
          if (sessionTime > lastAutoSaveRef.current && sessionTime - lastAutoSaveRef.current >= 60) {
            // Only auto-save if at least 1 minute has passed since the last save
            const minutesToSave = Math.floor((sessionTime - lastAutoSaveRef.current) / 60);
            
            if (minutesToSave > 0 && currentActivity) {
              onSave(minutesToSave, currentActivity);
              lastAutoSaveRef.current = sessionTime;
              
              toast({
                title: "Progress saved",
                description: `${minutesToSave} minutes of training time recorded`,
                variant: "default",
              });
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
  }, [isTracking, sessionTime, currentActivity, onSave, saveInterval, toast]);
  
  // Method to manually save current time
  const saveCurrentProgress = () => {
    if (currentActivity && sessionTime > lastAutoSaveRef.current) {
      const minutesToSave = Math.max(1, Math.floor((sessionTime - lastAutoSaveRef.current) / 60));
      
      if (minutesToSave > 0) {
        onSave(minutesToSave, currentActivity);
        lastAutoSaveRef.current = sessionTime;
        return minutesToSave;
      }
    }
    return 0;
  };
  
  // Reset auto-save state
  const resetAutoSave = () => {
    lastAutoSaveRef.current = 0;
  };

  return {
    lastSavedTime: lastAutoSaveRef.current,
    saveCurrentProgress,
    resetAutoSave
  };
};
