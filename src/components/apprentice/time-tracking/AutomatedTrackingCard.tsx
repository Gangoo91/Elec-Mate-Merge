
import { useState, useEffect } from "react";
import { useAutomatedTraining } from "@/hooks/useAutomatedTraining";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Clock, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";
import LearningTimer from "@/components/apprentice/LearningTimer";
import RecordingIndicator from "@/components/apprentice/timer/RecordingIndicator";

const AutomatedTrackingCard = () => {
  const [elapsedTimeDisplay, setElapsedTimeDisplay] = useState(0);
  const { toast } = useToast();
  const { 
    isTracking, 
    startTracking, 
    pauseTracking, 
    resumeTracking, 
    stopTracking, 
    sessionTime,
    currentActivity,
    isSaving,
    isAuthenticated
  } = useAutomatedTraining();
  
  // For continuous time display
  useEffect(() => {
    let timer: number | null = null;
    
    if (isTracking) {
      // Update immediately to show current time
      setElapsedTimeDisplay(sessionTime);
      
      timer = window.setInterval(() => {
        setElapsedTimeDisplay(sessionTime);
      }, 1000);
    } else {
      setElapsedTimeDisplay(sessionTime);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTracking, sessionTime]);
  
  const handleStart = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your training time",
        variant: "destructive",
      });
      return;
    }
    
    startTracking("Manual Training Time");
    toast({
      title: "Training tracking started",
      description: "Your off-the-job training time is now being recorded",
    });
  };
  
  const handleStop = () => {
    stopTracking();
  };
  
  const handlePauseResume = () => {
    if (isTracking) {
      pauseTracking();
      toast({
        title: "Training tracking paused",
        description: "Your training time recording is paused",
      });
    } else {
      resumeTracking();
      toast({
        title: "Training tracking resumed",
        description: "Your training time recording has resumed",
      });
    }
  };
  
  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Automated Training Tracker</CardTitle>
            <RecordingIndicator showText={true} />
          </div>
          <CardDescription>
            {isTracking 
              ? "Your learning time is being recorded automatically" 
              : "Track your study and learning time"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isTracking && currentActivity && (
              <div className="rounded-md border border-elec-yellow/20 bg-elec-dark p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm text-elec-yellow">Currently tracking:</span>
                  </div>
                  <span className="text-sm font-medium">{formatTime(sessionTime)}</span>
                </div>
                <div className="mt-1 text-white">{currentActivity}</div>
                
                {/* Tracking status message */}
                <div className="mt-2 text-xs text-muted-foreground">
                  {isSaving ? (
                    <div className="text-green-400">Saving training record...</div>
                  ) : (
                    <div>Accumulating time - entries recorded after 30 minutes</div>
                  )}
                </div>
              </div>
            )}
            
            <LearningTimer
              isRunning={isTracking}
              elapsedTime={elapsedTimeDisplay}
              todayTotal={0} // This would ideally come from a total for today
              onStart={handleStart}
              onStop={handleStop}
            />
            
            {isTracking && (
              <Button 
                variant="outline" 
                onClick={handlePauseResume} 
                className="w-full"
              >
                {isTracking ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Tracking
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume Tracking
                  </>
                )}
              </Button>
            )}
            
            <div className="text-sm text-muted-foreground mt-2">
              <p className="mb-1">This tracker will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Automatically track time spent on learning pages</li>
                <li>Create entries after 30 minutes of accumulated time</li>
                <li>Save all remaining time when you stop tracking</li>
                <li>Pause when you're inactive for over 5 minutes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomatedTrackingCard;
