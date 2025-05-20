
import { useEffect } from "react";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useToast } from "@/components/ui/use-toast";

export const useTrackMilestones = () => {
  const { entries, totalTime } = useTimeEntries();
  const { toast } = useToast();
  
  // Track milestones based on total time
  useEffect(() => {
    // Get previous milestone from localStorage
    const previousMilestone = parseInt(localStorage.getItem('lastMilestone') || '0');
    const currentHours = totalTime.hours + (totalTime.minutes / 60);
    
    // Define milestones in hours
    const milestones = [1, 5, 10, 20, 50, 100, 200];
    
    // Find the next milestone
    for (const milestone of milestones) {
      if (currentHours >= milestone && previousMilestone < milestone) {
        // Save new milestone
        localStorage.setItem('lastMilestone', milestone.toString());
        
        // Show toast for milestone achievement
        toast({
          title: `Milestone Achieved: ${milestone} Hours!`,
          description: `You've logged ${milestone} hours of off-the-job training. Keep up the good work!`,
          duration: 5000,
        });
        
        break;
      }
    }
  }, [totalTime, toast]);
  
  return { milestoneReached: false }; // Simple return for now, could be expanded
};
