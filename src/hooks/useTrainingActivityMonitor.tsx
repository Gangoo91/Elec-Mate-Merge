import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";

export const useTrainingActivityMonitor = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Track activity based on page visits
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Only record activity for apprentice-related paths
    if (currentPath.includes('/apprentice')) {
      // Log the visit for analytics
      console.log(`Training activity recorded: ${currentPath}`);
      
      // Store the visit in localStorage for persistence
      const activityKey = `training_activity_${Date.now()}`;
      const activityData = {
        path: currentPath,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(activityKey, JSON.stringify(activityData));
      
      // Cleanup old records (keep only last 100)
      const allKeys = Object.keys(localStorage)
        .filter(key => key.startsWith('training_activity_'))
        .sort((a, b) => {
          const numA = parseInt(a.split('_')[2]);
          const numB = parseInt(b.split('_')[2]);
          return numB - numA;
        });
      
      if (allKeys.length > 100) {
        allKeys.slice(100).forEach(key => localStorage.removeItem(key));
      }
    }
  }, [location.pathname]);
  
  return { isTracking: true };
};
