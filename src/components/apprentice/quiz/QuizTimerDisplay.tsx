
import { Progress } from "@/components/ui/progress";
import { Clock } from "lucide-react";

interface QuizTimerDisplayProps {
  timeRemaining: number;
  totalTime: number;
}

const QuizTimerDisplay = ({ timeRemaining, totalTime }: QuizTimerDisplayProps) => {
  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const timeProgress = 100 - ((timeRemaining / totalTime) * 100);
  const isTimeRunningLow = timeRemaining < 300; // Less than 5 minutes
  
  return (
    <div className="p-4 border border-elec-yellow/20 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          <span className="font-semibold">Time Remaining</span>
        </div>
        <span className={`font-mono text-lg ${isTimeRunningLow ? 'text-red-500 animate-pulse' : 'text-elec-yellow'}`}>
          {formatTime(timeRemaining)}
        </span>
      </div>
      <Progress 
        value={timeProgress} 
        className={`h-2 ${isTimeRunningLow ? '[&>div]:bg-red-500' : '[&>div]:bg-elec-yellow'}`}
      />
    </div>
  );
};

export default QuizTimerDisplay;
