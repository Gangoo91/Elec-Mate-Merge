import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface ProcessingStatsPanelProps {
  currentStage: number;
  currentPercent: number;
  totalCircuits: number;
  completedCircuits: number;
  currentStepName: string;
  startTime: Date;
}

export const ProcessingStatsPanel = ({ currentStage, currentPercent, totalCircuits, completedCircuits, currentStepName, startTime }: ProcessingStatsPanelProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000)); }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const estimatedRemaining = Math.max(0, 180 - elapsedTime);

  return (
    <div className="space-y-4 lg:sticky lg:top-6">
      <Card className="p-4 border-elec-yellow/20 bg-elec-gray">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-semibold text-elec-yellow">{currentPercent}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-elec-yellow transition-all duration-300" style={{ width: `${currentPercent}%` }} />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-elec-yellow/20 bg-elec-gray">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Circuits</div>
          <div className="text-2xl font-bold text-elec-yellow">{completedCircuits}<span className="text-muted-foreground">/{totalCircuits}</span></div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${(completedCircuits / totalCircuits) * 100}%` }} />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-elec-yellow/20 bg-elec-gray">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Current Step</div>
          <div className="text-sm font-medium">{currentStepName}</div>
          <div className="text-xs text-muted-foreground">Stage {currentStage + 1} of 8</div>
        </div>
      </Card>

      <Card className="p-4 border-elec-yellow/20 bg-elec-gray">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />Elapsed
            </div>
            <div className="font-semibold">{formatTime(elapsedTime)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />Est.
            </div>
            <div className="font-semibold">~{formatTime(estimatedRemaining)}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
