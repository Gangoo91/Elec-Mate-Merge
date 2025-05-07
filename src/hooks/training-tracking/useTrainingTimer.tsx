
import { useState, useEffect, useRef } from 'react';

/**
 * Hook for managing time tracking functionality
 */
export const useTrainingTimer = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Timer management
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);
  
  const startTimer = () => {
    setIsRunning(true);
  };
  
  const pauseTimer = () => {
    setIsRunning(false);
  };
  
  const resetTimer = () => {
    pauseTimer();
    setSessionTime(0);
  };

  return {
    sessionTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
  };
};
