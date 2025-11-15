import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <div className="max-w-6xl mx-auto p-6 space-y-6">
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

            </div>

            {/* Integrated Stage Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2 pb-1">
              {stageDetails.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx <= currentStage ? 'w-8 bg-elec-yellow' : 'w-6 bg-gray-700'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-gray-400">
                Stage {currentStage + 1} of {stageDetails.length}
              </span>
            </div>

            {/* User Request - Integrated */}
            {userRequest && (
              <div className="mt-4 pt-4 border-t border-elec-yellow/10">
                <p className="text-xs text-gray-500 mb-1">Your Request:</p>
                <p className="text-sm text-gray-300 leading-relaxed">{userRequest}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Retry Message */}
        {retryMessage && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-amber-100">{retryMessage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Horizontal Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-elec-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-elec-yellow">{currentPercent}%</div>
              <div className="text-xs text-gray-400 mt-1">Complete</div>
            </CardContent>
          </Card>
          <Card className="border-elec-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-white">{estimatedCompleted}/{totalCircuits}</div>
              <div className="text-xs text-gray-400 mt-1">Circuits Designed</div>
            </CardContent>
          </Card>
          <Card className="border-elec-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-white">{formatTime(elapsedTime)}</div>
              <div className="text-xs text-gray-400 mt-1">Time Elapsed</div>
            </CardContent>
          </Card>
        </div>

        {/* Cancel Button - Bottom Right */}
        {onCancel && (
          <div className="flex justify-end pt-2">
            <Button 
              variant="outline" 
              onClick={onCancel} 
              className="border-elec-yellow/20 hover:bg-elec-yellow/10 hover:border-elec-yellow/50 transition-colors"
            >
              Cancel Generation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
