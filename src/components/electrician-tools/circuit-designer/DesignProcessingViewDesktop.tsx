import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveCircuitPreview } from './LiveCircuitPreview';
import { ProcessingStatsPanel } from './ProcessingStatsPanel';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { useState, useEffect } from 'react';

interface DesignProcessingViewDesktopProps {
  progress: DesignProgress | null;
  userRequest?: string;
  totalCircuits?: number;
  onCancel?: () => void;
  retryMessage?: string | null;
}

export const DesignProcessingViewDesktop = ({
  progress,
  userRequest,
  totalCircuits = 0,
  onCancel,
  retryMessage
}: DesignProcessingViewDesktopProps) => {
  const [startTime] = useState(Date.now());
  const [recentlyCompleted, setRecentlyCompleted] = useState<string[]>([]);

  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;
  const estimatedCompleted = totalCircuits > 0 
    ? Math.floor((currentPercent / 100) * totalCircuits)
    : 0;

  const stageDetails = [
    { name: 'Initialising', description: 'Preparing design service' },
    { name: 'Understanding Requirements', description: 'Analysing specifications' },
    { name: 'Extracting Circuits', description: 'AI parsing descriptions' },
    { name: 'Searching Regulations', description: 'Querying BS 7671' },
    { name: 'AI Circuit Design', description: 'Calculating cables & protection' },
    { name: 'Compliance Validation', description: 'Verifying compliance' },
    { name: 'Finalising Documentation', description: 'Generating docs' },
    { name: 'Downloading Data', description: 'Transferring to browser' }
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6">
      {/* Left Column - Live Preview Grid (65%) */}
      <div className="space-y-4">
        {/* User Request Recap */}
        {userRequest && (
          <Card className="bg-primary/5 border-primary/20">
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Your Request:</h3>
              <p className="text-base text-foreground">{userRequest}</p>
            </div>
          </Card>
        )}

        {/* Retry Message */}
        {retryMessage && (
          <Card className="bg-amber-500/10 border-amber-500/20">
            <div className="p-4">
              <p className="text-sm text-amber-600 dark:text-amber-400">{retryMessage}</p>
            </div>
          </Card>
        )}

        {/* Current Stage Card */}
        <Card className="bg-primary/10 border-primary/30">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {progress?.message || 'Processing...'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stageDetails[currentStage]?.description || 'Please wait...'}
                </p>
              </div>
              <div className="text-4xl font-bold text-primary">
                {currentPercent}%
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Stage {currentStage + 1} of {stageDetails.length}
            </div>
          </div>
        </Card>

        {/* Live Circuit Cards Grid */}
        {totalCircuits > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {Array.from({ length: Math.min(totalCircuits, 12) }, (_, i) => {
              const isCompleted = i < estimatedCompleted;
              const isCurrent = i === estimatedCompleted;
              
              return (
                <Card 
                  key={i}
                  className={
                    isCompleted 
                      ? "bg-primary/5 border-primary/20" 
                      : isCurrent 
                      ? "bg-primary/10 border-primary/30 animate-pulse" 
                      : "bg-muted/30 opacity-60"
                  }
                >
                  <div className="p-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold bg-primary/20 text-primary">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">
                        {isCompleted ? '✓ Complete' : isCurrent ? 'Designing...' : 'Pending'}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={onCancel} size="sm">
              Cancel Generation
            </Button>
          </div>
        )}
      </div>

      {/* Right Column - Stats Panel (35%) */}
      <div className="hidden lg:block">
        <ProcessingStatsPanel
          currentStage={currentStage}
          currentPercent={currentPercent}
          totalCircuits={totalCircuits}
          completedCircuits={estimatedCompleted}
          currentStepName={progress?.message}
          startTime={startTime}
        />
      </div>
    </div>
  );
};
