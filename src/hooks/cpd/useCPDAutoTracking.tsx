
import { useEffect, useRef } from 'react';
import { useCPDData } from './useCPDData';
import { useToast } from '@/components/ui/use-toast';

interface AutoTrackingOptions {
  enabled?: boolean;
  minimumMinutes?: number;
  sources?: string[];
}

export const useCPDAutoTracking = (options: AutoTrackingOptions = {}) => {
  const { 
    enabled = true, 
    minimumMinutes = 30, 
    sources = ['Study Area', 'Video Lessons', 'Learning Platform'] 
  } = options;
  
  const { addAutoTrackedHours } = useCPDData();
  const { toast } = useToast();
  const sessionRef = useRef<{
    startTime: number;
    activity: string;
    source: string;
  } | null>(null);

  const startTracking = (activity: string, source: string = 'Learning Platform') => {
    if (!enabled) return;
    
    sessionRef.current = {
      startTime: Date.now(),
      activity,
      source,
    };
    
    console.log(`CPD Auto-tracking started: ${activity} from ${source}`);
  };

  const stopTracking = () => {
    if (!enabled || !sessionRef.current) return;
    
    const { startTime, activity, source } = sessionRef.current;
    const duration = Date.now() - startTime;
    const minutes = Math.floor(duration / (1000 * 60));
    
    if (minutes >= minimumMinutes) {
      const hours = parseFloat((minutes / 60).toFixed(1));
      addAutoTrackedHours(activity, hours, source);
      
      toast({
        title: "CPD Hours Recorded",
        description: `${hours} hours automatically added for ${activity}`,
      });
    }
    
    sessionRef.current = null;
    console.log(`CPD Auto-tracking stopped: ${minutes} minutes recorded`);
  };

  const pauseTracking = () => {
    if (!enabled || !sessionRef.current) return;
    
    // Save current session progress
    const { startTime, activity, source } = sessionRef.current;
    const duration = Date.now() - startTime;
    const minutes = Math.floor(duration / (1000 * 60));
    
    if (minutes >= minimumMinutes) {
      const hours = parseFloat((minutes / 60).toFixed(1));
      addAutoTrackedHours(activity, hours, source);
    }
    
    sessionRef.current = null;
    console.log(`CPD Auto-tracking paused: ${minutes} minutes recorded`);
  };

  // Auto-save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (sessionRef.current) {
        stopTracking();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      if (sessionRef.current) {
        stopTracking();
      }
    };
  }, []);

  return {
    startTracking,
    stopTracking,
    pauseTracking,
    isTracking: !!sessionRef.current,
    currentSession: sessionRef.current,
  };
};
