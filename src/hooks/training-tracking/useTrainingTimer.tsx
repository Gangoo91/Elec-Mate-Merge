
import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Hook for tracking training time with a timer
 */
export const useTrainingTimer = () => {
  const [sessionTime, setSessionTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef<number | null>(null);
  const lastTimestamp = useRef<number>(Date.now());
  
  // Start the timer
  const startTimer = useCallback(() => {
    if (timer.current !== null) return;
    
    setIsRunning(true);
    lastTimestamp.current = Date.now();
    
    timer.current = window.setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastTimestamp.current;
      lastTimestamp.current = now;
      
      // Only increment time if delta is reasonable (less than 10 seconds)
      // This helps prevent large jumps if the browser tab was inactive
      if (deltaTime < 10000) {
        setSessionTime(prev => prev + Math.floor(deltaTime / 1000));
      }
    }, 1000);
  }, []);
  
  // Pause the timer
  const pauseTimer = useCallback(() => {
    if (timer.current === null) return;
    
    clearInterval(timer.current);
    timer.current = null;
    setIsRunning(false);
  }, []);
  
  // Reset the timer
  const resetTimer = useCallback(() => {
    pauseTimer();
    setSessionTime(0);
  }, [pauseTimer]);
  
  // Handle tab visibility changes (pause when tab is hidden, resume when visible)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && isRunning) {
        // Pause when tab becomes invisible
        pauseTimer();
      } else if (document.visibilityState === 'visible' && isRunning) {
        // Resume when tab becomes visible again
        startTimer();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, pauseTimer, startTimer]);
  
  // Cleanup when unmounting
  useEffect(() => {
    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current);
      }
    };
  }, []);
  
  return {
    sessionTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer
  };
};
