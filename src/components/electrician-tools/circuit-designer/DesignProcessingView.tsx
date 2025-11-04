import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { CheckCircle2, Loader2, Clock, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
  retryMessage?: string | null;
  onCancel?: () => void;
}

export const DesignProcessingView = ({ progress, retryMessage, onCancel }: DesignProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());

  // Track elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Enhanced stage definitions with detailed descriptions
  const stageDetails = [
    { 
      name: 'Initialising', 
      description: 'Preparing design service',
      icon: '🔧',
      estimatedSeconds: 5
    },
    { 
      name: 'Understanding Requirements', 
      description: 'Analysing your project specifications',
      icon: '📋',
      estimatedSeconds: 5
    },
    { 
      name: 'Extracting Circuits', 
      description: 'AI parsing circuit descriptions (20-30s)',
      icon: '⚡',
      estimatedSeconds: 25
    },
    { 
      name: 'Searching Regulations', 
      description: 'Querying BS 7671 18th Edition database',
      icon: '📚',
      estimatedSeconds: 10
    },
    { 
      name: 'AI Circuit Design', 
      description: 'Calculating cable sizes, protection devices (2-3 min)',
      icon: '🤖',
      estimatedSeconds: 125
    },
    { 
      name: 'Compliance Validation', 
      description: 'Verifying BS 7671 compliance',
      icon: '✓',
      estimatedSeconds: 10
    },
    { 
      name: 'Finalising Documentation', 
      description: 'Generating design documentation',
      icon: '📄',
      estimatedSeconds: 3
    },
    { 
      name: 'Downloading Data', 
      description: 'Transferring design to your browser',
      icon: '⬇️',
      estimatedSeconds: 5
    }
  ];

  // Calculate estimated completion time
  const totalEstimatedSeconds = stageDetails.reduce((sum, stage) => sum + stage.estimatedSeconds, 0);
  const remainingSeconds = Math.max(0, totalEstimatedSeconds - elapsedTime);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Determine current stage based on progress
  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="p-6 sm:p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Generating Your Design</h2>
          <p className="text-muted-foreground text-sm">
            AI is analysing circuits and checking BS 7671 18th Edition compliance
          </p>
        </div>

        {/* Retry Message */}
        {retryMessage && (
          <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {retryMessage}
            </p>
          </div>
        )}

        {/* Time Statistics */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              Elapsed
            </div>
            <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              Remaining
            </div>
            <div className="text-2xl font-bold text-primary">{formatTime(remainingSeconds)}</div>
          </div>
        </div>

        {/* Current Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{stageDetails[currentStage]?.icon || '⏳'}</span>
              <div>
                <div className="text-sm font-medium">
                  {progress?.message || 'Initialising...'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stageDetails[currentStage]?.description || 'Please wait...'}
                </div>
              </div>
            </div>
            <span className="text-lg font-bold text-primary">{currentPercent}%</span>
          </div>
          <Progress value={currentPercent} className="h-2" />
        </div>

        {/* Stage Timeline */}
        <div className="space-y-2 mb-6">
          {stageDetails.map((stage, index) => {
            const isComplete = currentStage > index;
            const isCurrent = currentStage === index;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCurrent ? 'bg-primary/5 border border-primary/20 shadow-sm' : ''
                }`}
              >
                {isComplete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm ${
                      isComplete 
                        ? 'text-muted-foreground line-through' 
                        : isCurrent 
                        ? 'font-medium' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {stage.name}
                  </div>
                  {isCurrent && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {stage.description}
                    </div>
                  )}
                </div>
                {!isComplete && !isCurrent && (
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    ~{stage.estimatedSeconds}s
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <div className="flex justify-center pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="gap-2"
              size="sm"
            >
              <XCircle className="h-4 w-4" />
              Cancel Generation
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
