
import { useEffect } from 'react';
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useNotifications } from "@/components/notifications/NotificationProvider";

// Define milestone thresholds in minutes
const MILESTONES = [
  { minutes: 30, title: "Quick Study Session", message: "You've completed your first 30 minutes of learning!" },
  { minutes: 60, title: "One Hour Milestone", message: "Great job! You've studied for a full hour." },
  { minutes: 180, title: "Serious Dedication", message: "Three hours of learning completed. You're making excellent progress!" },
  { minutes: 300, title: "Professional Development", message: "Five hours of learning completed. You're well on your way to expertise!" },
  { minutes: 600, title: "Master in Training", message: "Ten hours of focused learning. Your dedication is impressive!" },
];

export const useTrackMilestones = () => {
  const { totalTime } = useTimeEntries();
  const { addNotification } = useNotifications();
  
  // Convert hours and minutes to total minutes for easier comparison
  const totalMinutes = (totalTime.hours * 60) + totalTime.minutes;
  
  useEffect(() => {
    // Check if we've reached any milestones
    MILESTONES.forEach(milestone => {
      if (totalMinutes === milestone.minutes) {
        // Trigger notification for achieved milestone
        addNotification({
          title: milestone.title,
          message: milestone.message,
          type: 'success'
        });
        
        // Store this milestone as achieved
        const achievedMilestones = JSON.parse(localStorage.getItem('achievedMilestones') || '[]');
        if (!achievedMilestones.includes(milestone.minutes)) {
          achievedMilestones.push(milestone.minutes);
          localStorage.setItem('achievedMilestones', JSON.stringify(achievedMilestones));
        }
      }
    });
  }, [totalMinutes, addNotification]);
  
  return null; // This hook doesn't return anything
};
