import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiveCircuitPreview } from "./LiveCircuitPreview";
import { DesignProgress } from "@/hooks/useAIDesigner";
import { useState, useEffect } from "react";
import { Zap, Clock, AlertCircle } from "lucide-react";

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
  const [startTime] = useState(new Date());
  const [recentlyCompleted] = useState<string[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;
  const estimatedCompleted = totalCircuits > 0 ? Math.floor((currentPercent / 100) * totalCircuits) : 0;

  // Time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Estimate remaining time (assuming 3 minutes total for circuit design)
  const EXPECTED_TOTAL_SECONDS = 180;
  const estimatedTimeRemaining = Math.max(0, Math.floor((EXPECTED_TOTAL_SECONDS * (100 - currentPercent)) / 100));

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="min-h-screen bg-elec-grey">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Overall Progress Card */}
        <Card className="border-elec-yellow/20 shadow-lg">
          <CardContent className="pt-6 pb-5 space-y-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white">AI Circuit Design</h2>
                <p className="text-sm text-gray-400 mt-0.5">{stageDetails[currentStage]?.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2.5">
              <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out shadow-lg shadow-elec-yellow/30"
                  style={{ width: `${currentPercent}%` }}
                />
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-elec-yellow text-base">{currentPercent}%</span>
                <div className="flex items-center gap-3 text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {formatTime(elapsedTime)}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span>~{formatTime(estimatedTimeRemaining)} remaining</span>
                </div>
              </div>

              {/* Step Indicator - Centered */}
              <div className="text-center text-sm text-gray-400 pt-1">
                Stage {currentStage + 1} of 8
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Indicator Dots */}
        <div className="flex justify-center">
          <StageIndicator currentStage={currentStage} totalStages={8} />
        </div>
        {userRequest && (
          <Card className="p-4 border border-elec-yellow/20 bg-elec-gray">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🤖</div>
              <div className="flex-1">
                <div className="text-xs font-medium text-muted-foreground mb-1">
                  Your Request
                </div>
                <p className="text-sm">{userRequest}</p>
              </div>
            </div>
          </Card>
        )}
        
        {retryMessage && (
          <Card className="p-4 bg-amber-500/10 border border-amber-500/30">
            <p className="text-sm text-amber-600 dark:text-amber-400">{retryMessage}</p>
          </Card>
        )}

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Live Circuit Generation</h3>
              <LiveCircuitPreview totalCircuits={totalCircuits} completedCircuits={estimatedCompleted} currentCircuitName={`Circuit ${estimatedCompleted + 1}`} recentlyCompleted={recentlyCompleted} />
            </div>
            {onCancel && (
              <div className="flex justify-center pt-4">
                <Button variant="outline" onClick={onCancel} className="border-elec-yellow/20 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 transition-colors">Cancel Generation</Button>
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            <ProcessingStatsPanel currentStage={currentStage + 1} currentPercent={currentPercent} totalCircuits={totalCircuits} completedCircuits={estimatedCompleted} currentStepName={progress?.message || stageDetails[currentStage]?.name || 'Processing...'} startTime={startTime} />
          </div>
        </div>
      </div>
    </div>
  );
};
