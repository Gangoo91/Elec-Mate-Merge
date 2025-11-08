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
      description: 'AI parsing circuit descriptions',
      icon: '⚡',
      estimatedSeconds: 25
    },
    { 
      name: 'Searching Regulations', 
      description: 'Querying BS 7671 18th Edition',
      icon: '📚',
      estimatedSeconds: 10
    },
    { 
      name: 'AI Circuit Design', 
      description: 'Calculating cable sizes, protection',
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
      description: 'Transferring design to browser',
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
      <Card className="p-4 sm:p-6 lg:p-8 max-w-2xl w-full">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Generating Your Design</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            AI is analysing circuits and checking BS 7671 compliance
          </p>
        </div>

        {/* Retry Message */}
        {retryMessage && (
          <div className="mb-4 p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin flex-shrink-0" />
              <span className="line-clamp-2">{retryMessage}</span>
            </p>
          </div>
        )}

        {/* Time Statistics - Fixed width, monospace */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-muted-foreground mb-1">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>Elapsed</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-bold min-w-[70px] sm:min-w-[80px] mx-auto tabular-nums">
              {formatTime(elapsedTime)}
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs text-muted-foreground mb-1">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>Remaining</span>
            </div>
            <div className="text-base sm:text-lg font-mono font-bold text-primary min-w-[70px] sm:min-w-[80px] mx-auto tabular-nums">
              {formatTime(remainingSeconds)}
            </div>
          </div>
        </div>

        {/* Current Stage - Fixed height */}
        <div className="mb-4 p-3 sm:p-4 bg-elec-yellow/10 border-2 border-elec-yellow/40 rounded-lg min-h-[80px] sm:min-h-[90px] flex items-center shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3 w-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 text-2xl sm:text-3xl">
              {stageDetails[currentStage]?.icon || '⏳'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm sm:text-base font-bold truncate text-white">
                {progress?.message || 'Initialising...'}
              </div>
              <div className="text-xs sm:text-sm text-elec-light/90 line-clamp-1 mt-0.5">
                {stageDetails[currentStage]?.description || 'Please wait...'}
              </div>
            </div>
            <div className="text-base sm:text-lg font-mono font-bold text-primary flex-shrink-0 min-w-[40px] sm:min-w-[45px] text-right tabular-nums">
              {currentPercent}%
            </div>
          </div>
        </div>

        {/* Progress Bar - Larger touch target */}
        <div className="mb-4">
          <Progress value={currentPercent} className="h-2.5 sm:h-3" />
        </div>

        {/* Stage Timeline - Properly aligned with fixed icon column */}
        <div className="space-y-1 sm:space-y-1.5 mb-4">
          {stageDetails.map((stage, index) => {
            const isComplete = currentStage > index;
            const isCurrent = currentStage === index;

            return (
              <div
                key={index}
                className={`flex items-start gap-0 transition-all ${
                  isCurrent ? 'bg-primary/10 border-2 border-primary/30 rounded-lg -mx-1 px-3 py-3' : 'px-2 py-2.5'
                }`}
              >
                {/* Fixed-width icon column - 32px */}
                <div className="w-8 flex items-center justify-center flex-shrink-0 pt-0.5">
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted" />
                  )}
                </div>
                
                {/* Content - flex-grow to fill space */}
                <div className="flex-1 min-w-0 pl-3 text-left">
                  <div className={`text-base sm:text-lg font-semibold leading-tight text-left ${
                    isComplete ? 'text-elec-light/50 line-through' : 
                    isCurrent ? 'font-bold text-white' : 'text-elec-light/70'
                  }`}>
                    {stage.name}
                  </div>
                  <div className="text-sm sm:text-base text-elec-light/90 mt-1 leading-relaxed text-left">
                    {stage.description}
                  </div>
                </div>
                
                {/* Time estimate - fixed-width right column */}
                {!isComplete && !isCurrent && (
                  <div className="w-14 text-right flex-shrink-0 pt-0.5">
                    <span className="text-sm text-elec-yellow/90 font-mono font-semibold tabular-nums">
                      ~{stage.estimatedSeconds}s
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Cancel Button - Mobile optimized */}
        {onCancel && (
          <div className="flex justify-center pt-3 sm:pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={onCancel}
              className="gap-2 min-h-[44px] touch-manipulation"
              size="sm"
            >
              <XCircle className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Cancel Generation</span>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};