
import { useEffect } from "react";
import { useAutomatedTraining } from "@/hooks/useAutomatedTraining";
import { Clock, Timer } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TrackingStatusIndicator = () => {
  const { 
    isTracking, 
    stopTracking, 
    sessionTime,
    currentActivity
  } = useAutomatedTraining();
  const { toast } = useToast();
  
  // Stop tracking when this component mounts (user has arrived at the OJT page)
  useEffect(() => {
    let timeoutId: number | null = null;
    
    if (isTracking) {
      // Show a message that tracking will stop
      toast({
        title: "Training time will be saved",
        description: "Your training time is being saved automatically",
      });
      
      // Give a 10-second delay before stopping to allow the user to see the status
      timeoutId = window.setTimeout(() => {
        stopTracking();
        toast({
          title: "Training time saved",
          description: "Your accumulated training time has been recorded",
        });
      }, 10000); // 10 seconds
    }
    
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [isTracking, stopTracking, toast]);
  
  if (!isTracking) return null;
  
  return (
    <Alert className="mb-4 border-green-500/30 bg-green-500/10">
      <Timer className="h-5 w-5 text-green-500 animate-pulse" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <span className="font-medium text-green-500">Recording time:</span> {currentActivity}
        </div>
        <div className="font-semibold text-green-500">
          {formatTime(sessionTime)}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default TrackingStatusIndicator;
