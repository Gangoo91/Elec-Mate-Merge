
import { useState, useEffect, useCallback } from 'react';

interface InactivityDetectionOptions {
  timeoutSeconds: number;
  isVideoContent?: boolean;
  onInactive?: () => void;
}

export const useInactivityDetection = ({
  timeoutSeconds,
  isVideoContent = false,
  onInactive
}: InactivityDetectionOptions) => {
  const [isInactive, setIsInactive] = useState(false);

  const resetInactivityTimer = useCallback(() => {
    setIsInactive(false);
  }, []);

  useEffect(() => {
    // Skip inactivity detection for video content
    if (isVideoContent) {
      return;
    }

    let inactivityTimeout: number | null = null;
    
    const handleActivity = () => {
      resetInactivityTimer();
      
      if (inactivityTimeout) {
        window.clearTimeout(inactivityTimeout);
      }
      
      inactivityTimeout = window.setTimeout(() => {
        setIsInactive(true);
        if (onInactive) {
          onInactive();
        }
      }, timeoutSeconds * 1000);
    };

    // Set up event listeners for user activity
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });
    
    // Initial setup
    handleActivity();
    
    // Cleanup
    return () => {
      if (inactivityTimeout) {
        window.clearTimeout(inactivityTimeout);
      }
      
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [timeoutSeconds, isVideoContent, onInactive, resetInactivityTimer]);
  
  return { isInactive, resetInactivityTimer };
};
