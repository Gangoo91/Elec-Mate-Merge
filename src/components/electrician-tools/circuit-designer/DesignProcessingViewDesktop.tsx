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

  // Estimate remaining time
  const EXPECTED_TOTAL_SECONDS = 70;
  const estimatedTimeRemaining = Math.max(0, Math.floor((EXPECTED_TOTAL_SECONDS * (100 - currentPercent)) / 100));

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const stageDetails = [
    { name: 'Initialising', description: 'Preparing design service', icon: '🔧' },
    { name: 'Understanding Requirements', description: 'Analysing specifications', icon: '📋' },
    { name: 'Searching Regulations', description: 'Querying BS 7671 database', icon: '📚' },
    { name: 'AI Circuit Design', description: 'Calculating cables & protection', icon: '🤖' },
    { name: 'Compliance Validation', description: 'Verifying compliance', icon: '✓' },
    { name: 'Finalising Documentation', description: 'Generating docs', icon: '📄' },
    { name: 'Downloading Data', description: 'Transferring to browser', icon: '⬇️' }
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
                <h2 className="text-xl font-semibold text-foreground">AI Circuit Design</h2>
                <p className="text-sm text-gray-200 mt-0.5">{stageDetails[currentStage]?.description}</p>
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
                <div className="flex items-center gap-3 text-gray-200">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {formatTime(elapsedTime)}
                  </span>
                  <span className="text-gray-600">•</span>
                  <span>~{formatTime(estimatedTimeRemaining)} remaining</span>
                </div>
              </div>

            </div>

            {/* Stage Timeline - Clean Card-Based Design */}
            <div className="mt-6 space-y-2">
              {stageDetails.map((stage, idx) => {
                const isActive = idx === currentStage;
                const isComplete = idx < currentStage;
                const isPending = idx > currentStage;

                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                      isActive ? 'border-elec-yellow bg-elec-yellow/10' : 
                      isComplete ? 'border-green-500/30 bg-green-500/5' : 
                      'border-gray-700/30 bg-gray-800/20'
                    }`}
                  >
                    {/* Stage Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                      isActive ? 'bg-elec-yellow/20 animate-pulse' : 
                      isComplete ? 'bg-green-500/20' : 
                      'bg-gray-700/30'
                    }`}>
                      {isComplete ? '✓' : stage.icon}
                    </div>
                    
                    {/* Stage Info */}
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${
                        isActive ? 'text-elec-yellow' : 
                        isComplete ? 'text-green-400' : 
                        'text-gray-400'
                      }`}>
                        {stage.name}
                      </div>
                      <div className="text-xs text-gray-200 mt-0.5">
                        {stage.description}
                      </div>
                    </div>
                    
                    {/* Status Indicator */}
                    <div className="text-xs">
                      {isComplete && <span className="text-green-400">✓ Done</span>}
                      {isActive && <span className="text-elec-yellow animate-pulse">In Progress</span>}
                      {isPending && <span className="text-gray-500">Pending</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User Request */}
            {userRequest && (
              <div className="mt-4 pt-4 border-t border-elec-yellow/10">
                <p className="text-xs text-gray-500 mb-1">Your Request:</p>
                <p className="text-sm text-gray-200 leading-relaxed">{userRequest}</p>
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
              <div className="text-xs text-gray-200 mt-1">Complete</div>
            </CardContent>
          </Card>
          <Card className="border-elec-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-foreground">{estimatedCompleted}/{totalCircuits}</div>
              <div className="text-xs text-gray-200 mt-1">Circuits Designed</div>
            </CardContent>
          </Card>
          <Card className="border-elec-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl font-bold text-foreground">{formatTime(elapsedTime)}</div>
              <div className="text-xs text-gray-200 mt-1">Time Elapsed</div>
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
