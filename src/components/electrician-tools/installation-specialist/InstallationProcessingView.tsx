import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Wrench, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface InstallationProcessingViewProps {
  progress: {
    stage: 'initializing' | 'parsing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  onQuickMode?: () => void;
}

export const InstallationProcessingView = ({ progress, startTime, onCancel, onQuickMode }: InstallationProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Map stages to percentage values
  const progressMap: Record<string, number> = {
    'initializing': 10,
    'parsing': 25,
    'rag': 50,
    'ai': 75,
    'validation': 90,
    'complete': 100
  };

  const progressValue = progress ? progressMap[progress.stage] : 0;
  const currentStep = progress?.message || 'Initializing...';

  const estimatedTotal = 180; // 3 minutes estimate
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsedTime);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Agent Card */}
      <Card className="overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-background to-background">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ${progressValue < 100 ? 'animate-pulse' : ''}`}>
                <Wrench className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Installation Specialist</h3>
                <p className="text-sm text-muted-foreground">
                  {progressValue < 100 ? 'Generating installation method...' : 'Complete'}
                </p>
              </div>
            </div>
            {onCancel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onCancel}
                className="text-muted-foreground hover:text-destructive touch-manipulation"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="h-2" />
            
            <div className="pt-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                {currentStep}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Generation Timeline</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elapsed Time</span>
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Remaining</span>
              <span className="font-mono">{formatTime(estimatedRemaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Estimate</span>
              <span className="font-mono">{formatTime(estimatedTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Happening */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3">What's Happening?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Analysing installation requirements against BS 7671 regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Searching for compliant installation methods and procedures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Generating step-by-step installation guidance with safety controls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 mt-1">•</span>
              <span>Creating equipment lists and inspection checkpoints</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {onQuickMode && (
        <div className="flex justify-center pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onQuickMode}
            className="min-h-[44px] touch-manipulation"
          >
            Switch to Quick Mode
          </Button>
        </div>
      )}
    </div>
  );
};
