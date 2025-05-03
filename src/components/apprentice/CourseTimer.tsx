
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import LearningTimer from "@/components/apprentice/LearningTimer";
import { useInactivityDetection } from "@/hooks/useInactivityDetection";
import TimerHeader from "./timer/TimerHeader";

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

  const isVideoContent = currentResourceType === 'video';

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-4">
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
      </CardContent>
    </Card>
  );
};

export default CourseTimer;
