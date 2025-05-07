
import { Card, CardContent } from "@/components/ui/card";
import LearningTimer from "@/components/apprentice/LearningTimer";
import TimerHeader from "./timer/TimerHeader";
import InactivityHandler from "./timer/InactivityHandler";
import { useEffect } from "react";
import { useAutomatedTraining } from "@/hooks/useAutomatedTraining";
import { useToast } from "@/components/ui/use-toast";

interface CourseTimerProps {
  courseSlug: string | undefined;
  isStudying: boolean;
  elapsedTime: number;
  todayTotal: number;
  currentResourceType: string | null;
  onStartStudy: () => void;
  onStopStudy: () => void;
}

const CourseTimer = ({
  courseSlug,
  isStudying,
  elapsedTime,
  todayTotal,
  currentResourceType,
  onStartStudy,
  onStopStudy
}: CourseTimerProps) => {
  const isVideoContent = currentResourceType === 'video';
  const { toast } = useToast();
  
  // Connect with the automated tracking system
  const { 
    isTracking, 
    startTracking, 
    stopTracking, 
    isAuthenticated 
  } = useAutomatedTraining();
  
  // When manual study is started or stopped, sync with auto tracking
  useEffect(() => {
    if (isStudying && !isTracking && isAuthenticated) {
      startTracking(`Course: ${courseSlug || 'Unknown'}`);
    }
  }, [isStudying, isTracking, startTracking, courseSlug, isAuthenticated]);

  // Handle study start with authentication check
  const handleStartStudy = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your study time",
        variant: "default"
      });
      return;
    }
    
    onStartStudy();
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-4">
        <InactivityHandler
          isStudying={isStudying}
          isVideoContent={isVideoContent}
          onStopStudy={onStopStudy}
        >
          {(isInactive) => (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <TimerHeader 
                isInactive={isInactive} 
                isVideoContent={isVideoContent} 
              />
              
              <div className="w-full md:w-auto">
                <LearningTimer 
                  isRunning={isStudying}
                  elapsedTime={elapsedTime} 
                  todayTotal={todayTotal}
                  onStart={handleStartStudy}
                  onStop={onStopStudy}
                  className="md:min-w-[280px]"
                />
              </div>
            </div>
          )}
        </InactivityHandler>
      </CardContent>
    </Card>
  );
};

export default CourseTimer;
