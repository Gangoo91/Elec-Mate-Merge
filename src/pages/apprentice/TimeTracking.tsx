
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import TrainingManagementCard from "@/components/apprentice/time-tracking/ojt/TrainingManagementCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTrackMilestones } from "@/hooks/useTrackMilestones";
import { useTimeEntries } from "@/hooks/time-tracking/useTimeEntries";
import { useTrainingActivityMonitor } from "@/hooks/useTrainingActivityMonitor";

const TimeTracking = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { totalTime } = useTimeEntries();
  
  // Use milestone tracking
  useTrackMilestones();
  
  // Monitor training activity across the app
  useTrainingActivityMonitor();
  
  // Notify user on page load for better UX
  useEffect(() => {
    // Only show toast on first load
    const hasShownToast = sessionStorage.getItem('timeTrackingToastShown');
    
    if (!hasShownToast) {
      toast({
        title: "Time Tracking Loaded",
        description: "Track your off-the-job training time here.",
      });
      sessionStorage.setItem('timeTrackingToastShown', 'true');
    }
  }, [toast]);

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Time Tracking</h1>
          <p className="text-muted-foreground">Track your off-the-job training hours</p>
        </div>
        
        <Link to="/apprentice">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
      </div>
      
      {/* Main content */}
      <TrainingManagementCard 
        initialActiveTab="auto"
        className="border-elec-yellow/20"
      />
      
      {/* Additional stats for desktop */}
      {!isMobile && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-elec-gray rounded-lg p-4 flex items-center border border-elec-yellow/20">
            <Clock className="h-5 w-5 text-elec-yellow mr-3" />
            <div>
              <h3 className="text-lg font-medium">Total Hours</h3>
              <p className="text-2xl font-bold">{totalTime.hours}h {totalTime.minutes}m</p>
            </div>
          </div>
          <div className="bg-elec-gray rounded-lg p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-medium">Weekly Goal</h3>
            <p className="text-2xl font-bold">8h 0m</p>
            <p className="text-xs text-muted-foreground">
              {Math.min(Math.round((totalTime.hours * 60 + totalTime.minutes) / (8 * 60) * 100), 100)}% complete
            </p>
          </div>
          <div className="bg-elec-gray rounded-lg p-4 border border-elec-yellow/20">
            <h3 className="text-lg font-medium">Required (20%)</h3>
            <p className="text-2xl font-bold">320h</p>
            <p className="text-xs text-muted-foreground">
              {Math.min(Math.round((totalTime.hours) / 320 * 100), 100)}% complete
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTracking;
