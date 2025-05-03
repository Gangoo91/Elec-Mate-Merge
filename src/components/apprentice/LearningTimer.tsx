
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Save } from "lucide-react";
import { formatTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface LearningTimerProps {
  isRunning: boolean;
  elapsedTime: number;
  todayTotal: number;
  onStart: () => void;
  onStop: () => void;
  className?: string;
}

const LearningTimer = ({ 
  isRunning, 
  elapsedTime, 
  todayTotal, 
  onStart, 
  onStop,
  className
}: LearningTimerProps) => {
  const [displayTime, setDisplayTime] = useState(elapsedTime);
  
  useEffect(() => {
    let timer: number | null = null;
    
    if (isRunning) {
      timer = window.setInterval(() => {
        setDisplayTime(prev => prev + 1);
      }, 1000);
    } else {
      setDisplayTime(elapsedTime);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, elapsedTime]);
  
  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground mb-1">Current session</div>
          <div className="text-3xl font-bold text-elec-yellow">
            {formatTime(displayTime)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground mb-1">Today's total</div>
          <div className="text-xl font-semibold">
            {formatTime(todayTotal + (isRunning ? displayTime - elapsedTime : 0))}
          </div>
        </div>
      </div>
      
      <Button
        onClick={isRunning ? onStop : onStart}
        variant={isRunning ? "destructive" : "default"}
        className="w-full gap-2"
      >
        {isRunning ? (
          <>
            <Pause className="h-4 w-4" />
            Stop & Save Time
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            Start Learning
          </>
        )}
      </Button>
    </div>
  );
};

export default LearningTimer;
