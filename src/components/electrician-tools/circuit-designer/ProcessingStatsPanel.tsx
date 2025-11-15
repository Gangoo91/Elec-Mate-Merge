import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProcessingStatsPanelProps {
  currentStage: number;
  currentPercent: number;
  totalCircuits: number;
  completedCircuits: number;
  currentStepName?: string;
  startTime: number;
}

export const ProcessingStatsPanel = ({
  currentStage,
  currentPercent,
  totalCircuits,
  completedCircuits,
  currentStepName,
  startTime
}: ProcessingStatsPanelProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const estimatedTotal = 180; // 3 minutes
  const remainingSeconds = Math.max(0, estimatedTotal - elapsedTime);

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card className="lg:sticky lg:top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-bold text-foreground">{currentPercent}%</span>
              <span className="text-sm text-muted-foreground">Complete</span>
            </div>
            <Progress value={currentPercent} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Elapsed</div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-semibold">{formatTime(elapsedTime)}</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Remaining</div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-semibold">~{formatTime(remainingSeconds)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circuit Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Circuit Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">{completedCircuits}</span>
              <span className="text-sm text-muted-foreground">of {totalCircuits}</span>
            </div>
            <Progress 
              value={(completedCircuits / totalCircuits) * 100} 
              className="h-2"
            />
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {totalCircuits - completedCircuits} circuits remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Happening Now */}
      <Card className="bg-primary/5 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">What's Happening Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">{currentStepName || 'Processing...'}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Stage {currentStage} of 8 • AI calculating cable sizes, protection devices, and compliance checks
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
