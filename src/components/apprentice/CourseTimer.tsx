
import { Card, CardContent } from "@/components/ui/card";
import LearningTimer from "@/components/apprentice/LearningTimer";
import TimerHeader from "./timer/TimerHeader";
import InactivityHandler from "./timer/InactivityHandler";

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
                  onStart={onStartStudy}
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
