
import { useState, useEffect, useRef } from 'react';

interface ActivityTrackingOptions {
  onInactive?: () => void;
  inactivityThreshold?: number; // in milliseconds
}

/**
 * Hook to track user activity and detect inactivity periods
 */
export const useActivityTracking = ({
  onInactive,
  inactivityThreshold = 60000 // Default: 1 minute
}: ActivityTrackingOptions = {}) => {
  const [isActive, setIsActive] = useState(true);
  const lastActivityRef = useRef<number>(Date.now());
  
  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setIsActive(true);
      lastActivityRef.current = Date.now();
    };

    const events = [
      'mousemove', 
      'keypress', 
      'click', 
      'scroll',
      'touchstart'
    ];
    
    // Add event listeners for user activity
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });
    
    return () => {
      // Remove event listeners on cleanup
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  // Check for inactivity at regular intervals
  useEffect(() => {
    const checkActivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivityRef.current;
      
      if (inactiveTime > inactivityThreshold) {
        setIsActive(false);
        if (onInactive) {
          onInactive();
        }
      }
    };
    
    // Check every 30 seconds (adjust as needed for your use case)
    const activityInterval = setInterval(checkActivity, 30000);
    return () => clearInterval(activityInterval);
  }, [onInactive, inactivityThreshold]);

  const resetActivity = () => {
    setIsActive(true);
    lastActivityRef.current = Date.now();
  };

  return { 
    isActive, 
    resetActivity,
    lastActivity: lastActivityRef.current 
  };
};
