
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Activity, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { useAutomatedTraining } from "@/hooks/useAutomatedTraining";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AutomatedTrackingCardProps {
  className?: string;
  autoStart?: boolean;
}

const AutomatedTrackingCard = ({ className, autoStart = true }: AutomatedTrackingCardProps) => {
  const isMobile = useIsMobile();
  
  const {
    isTracking,
    sessionTime,
    currentActivity,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking
  } = useAutomatedTraining(autoStart);
  
  const handleStartStop = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking("Learning Portal Study");
    }
  };
  
  const handlePauseResume = () => {
    if (isTracking) {
      pauseTracking();
    } else {
      resumeTracking();
    }
  };
  
  return (
    <Card className={`border-elec-yellow/20 bg-elec-gray ${className || ''}`}>
      <CardHeader className={isMobile ? 'pb-2 px-4' : ''}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            Auto-Tracking
            {autoStart && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertCircle className="h-4 w-4 text-elec-yellow cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Automatically tracks time when you're in study or video content areas</p>
                </TooltipContent>
              </Tooltip>
            )}
          </CardTitle>
          <Badge variant="outline" className={isTracking ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}>
            {isTracking ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? 'p-4' : ''}>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-center sm:text-left w-full sm:w-auto">
              <div className="text-sm text-muted-foreground mb-1">Current session</div>
              <div className="text-3xl font-bold text-elec-yellow">{formatTime(sessionTime)}</div>
            </div>
            <div className="text-center sm:text-right w-full sm:w-auto">
              <div className="text-sm text-muted-foreground mb-1">Activity</div>
              <div className="font-medium truncate max-w-[200px]">
                {currentActivity || "Not tracking"}
              </div>
            </div>
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
            <Button
              onClick={handleStartStop}
              variant={isTracking ? "destructive" : "default"}
              className="gap-2"
            >
              {isTracking ? (
                <>
                  <Activity className="h-4 w-4" />
                  Stop & Save
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Start Tracking
                </>
              )}
            </Button>
            
            {currentActivity && (
              <Button
                onClick={handlePauseResume}
                variant="outline"
                className="gap-2"
                disabled={!currentActivity}
              >
                {isTracking ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Resume
                  </>
                )}
              </Button>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            <div className="flex items-start gap-1">
              <Activity className="h-3 w-3 mt-0.5 text-green-400" />
              <span>
                {autoStart ? 
                  "Auto-tracking automatically starts when you view study materials or videos, and pauses after 1 minute of inactivity." :
                  "Tracking records your active study time and automatically pauses after 1 minute of inactivity."
                }
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomatedTrackingCard;
