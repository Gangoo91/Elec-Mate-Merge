
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LearningTimer from "@/components/apprentice/LearningTimer";
import { useInactivityDetection } from "@/hooks/useInactivityDetection";

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
  const { toast } = useToast();
  
  // Set up inactivity detection - don't stop timer for video content
  const { isInactive } = useInactivityDetection({
    timeoutSeconds: 30,
    isVideoContent: currentResourceType === 'video',
    onInactive: () => {
      if (isStudying) {
        onStopStudy();
        toast({
          title: "Study session paused",
          description: "Your study session was paused due to inactivity.",
        });
      }
    }
  });

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <h3 className="font-semibold">Off-the-Job Training Timer</h3>
            
            {isInactive && !currentResourceType?.includes('video') && (
              <span className="text-xs text-amber-500 bg-amber-950/30 px-2 py-1 rounded-full ml-2">
                Inactive
              </span>
            )}
          </div>
          
          <div className="w-full md:w-auto">
            <LearningTimer 
              isRunning={isStudying}
              elapsedTime={elapsedTime} 
              todayTotal={todayTotal}
              onStart={onStartStudy}
              onStop={onStopStudy}
              className="md:min-w-[280px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTimer;
