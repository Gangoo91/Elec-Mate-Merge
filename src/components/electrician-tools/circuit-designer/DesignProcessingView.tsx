import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { CheckCircle2, Loader2, Clock, XCircle, Zap, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
  retryMessage?: string | null;
  onCancel?: () => void;
  userRequest?: string;
  totalCircuits?: number;
}

export const DesignProcessingView = ({ 
  progress, 
  retryMessage, 
  onCancel, 
  userRequest,
  totalCircuits = 0 
}: DesignProcessingViewProps) => {
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
      name: 'Searching Regulations', 
      description: 'Querying BS 7671 intelligence database',
      icon: '📚',
      estimatedSeconds: 8
    },
    { 
      name: 'AI Circuit Design', 
      description: 'Calculating cable sizes, protection devices',
      icon: '🤖',
      estimatedSeconds: 40
    },
    { 
      name: 'Compliance Validation', 
      description: 'Verifying BS 7671 compliance',
      icon: '✓',
      estimatedSeconds: 5
    },
    { 
      name: 'Finalising Documentation', 
      description: 'Generating materials list and guidance',
      icon: '📄',
      estimatedSeconds: 3
    },
    { 
      name: 'Downloading Data', 
      description: 'Transferring design to browser',
      icon: '⬇️',
      estimatedSeconds: 2
    }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  // Determine current stage based on progress
  const currentStage = progress?.stage || 0;
  const currentPercent = progress?.percent || 0;

  // Estimate completed circuits based on progress
  const estimatedCompleted = totalCircuits > 0 
    ? Math.floor((currentPercent / 100) * totalCircuits)
    : 0;

  const EXPECTED_TOTAL_SECONDS = 180; // 3 minutes for parallel agent processing
  const estimatedTimeRemaining = Math.max(0, EXPECTED_TOTAL_SECONDS - elapsedTime);

  // Get agent statuses from progress object
  const designerProgress = progress?.designer_progress || 0;
  const designerStatus = progress?.designer_status || 'pending';
  const installerProgress = progress?.installer_progress || 0;
  const installerStatus = progress?.installer_status || 'pending';

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'complete': return 'default';
      case 'processing': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusBadgeText = (status: string): string => {
    switch (status) {
      case 'complete': return 'Complete ✓';
      case 'processing': return 'Processing...';
      case 'failed': return 'Failed';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-6">
      <div className="max-w-6xl w-full space-y-6">
        {/* Status Banner - Top */}
        <Alert className="bg-elec-yellow/10 border-l-4 border-l-elec-yellow border-y-elec-yellow/30 border-r-elec-yellow/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <AlertDescription className="text-base font-medium text-white flex-1">
              {progress?.message || 'Processing in parallel...'}
            </AlertDescription>
            <div className="flex items-center gap-4 text-sm text-white">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">{formatTime(elapsedTime)}</span>
              </div>
              <span className="text-white/70">•</span>
              <span className="text-white/90">~{formatTime(estimatedTimeRemaining)} remaining</span>
            </div>
          </div>
        </Alert>

        {/* Main Progress Card - Compact */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-5">
            {/* Title Section */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-elec-yellow/10 mb-3">
                <Zap className="w-7 h-7 text-elec-yellow" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Parallel AI Circuit Design</h2>
              <p className="text-white text-sm">
                Two specialised agents working simultaneously on your design
              </p>
            </div>

            {/* Dual Agent Progress */}
            <div className="space-y-5 mb-6">
              {/* Circuit Designer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm font-semibold text-white">Circuit Designer</span>
                    <Badge variant={getStatusVariant(designerStatus)} className="text-xs">
                      {designerProgress}%
                    </Badge>
                  </div>
                  <span className="text-xs font-medium text-white">{getStatusBadgeText(designerStatus)}</span>
                </div>
                <Progress value={designerProgress} className="h-3" />
                <p className="text-xs text-white">
                  Calculating cable sizes, protection devices, and BS 7671 compliance
                </p>
              </div>

              {/* Installation Specialist */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-white">Installation Specialist</span>
                    <Badge variant={getStatusVariant(installerStatus)} className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {installerProgress}%
                    </Badge>
                  </div>
                  <span className="text-xs font-medium text-white">{getStatusBadgeText(installerStatus)}</span>
                </div>
                <Progress value={installerProgress} className="h-3 [&>div]:bg-blue-500" />
                <p className="text-xs text-white">
                  Generating tools, materials, and installation procedures
                </p>
              </div>
            </div>

            {/* Overall Progress - Prominent */}
            <div className="pt-5 border-t border-border/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-base font-semibold text-white">Overall Progress</span>
                <span className="text-3xl font-bold text-elec-yellow">{currentPercent}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out shadow-lg shadow-elec-yellow/30"
                  style={{ width: `${currentPercent}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-sm text-white">
                <span>Stage {currentStage + 1} of {stageDetails.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stage Progress Grid - Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stageDetails.map((stage, idx) => {
            const isCompleted = idx < currentStage;
            const isCurrent = idx === currentStage;
            const isPending = idx > currentStage;
            
            return (
              <Card
                key={idx}
                className={cn(
                  "transition-all duration-300 hover:scale-105 min-h-[100px]",
                  isCompleted && "bg-green-500/10 border-green-500/30 shadow-sm shadow-green-500/20",
                  isCurrent && "bg-elec-yellow/10 border-elec-yellow border-2 shadow-md shadow-elec-yellow/40 animate-pulse",
                  isPending && "bg-muted/5 border-border/30 opacity-60"
                )}
              >
                <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                  <div className="text-3xl mb-2">{stage.icon}</div>
                  <div className={cn(
                    "text-xs font-semibold mb-2 line-clamp-2",
                    isCompleted && "text-green-400",
                    isCurrent && "text-elec-yellow",
                    isPending && "text-white/50"
                  )}>
                    {stage.name}
                  </div>
                  {isCompleted && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {isCurrent && (
                    <Loader2 className="w-5 h-5 text-elec-yellow animate-spin" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Row - Requirements and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User Requirements */}
          {userRequest && (
            <Card className="bg-elec-yellow/5 border-elec-yellow/20">
              <CardContent className="p-4">
                <p className="text-sm font-semibold text-elec-yellow mb-2">Your Requirements:</p>
                <p className="text-sm text-white leading-relaxed line-clamp-3">{userRequest}</p>
              </CardContent>
            </Card>
          )}

          {/* Circuits Completed */}
          {totalCircuits > 0 && (
            <Card className="bg-green-500/10 border-green-500/20">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="text-base font-semibold text-white">Circuits Completed</span>
                <span className="text-3xl font-bold text-green-400">
                  {estimatedCompleted}<span className="text-xl text-white/70">/{totalCircuits}</span>
                </span>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Retry Message */}
        {retryMessage && (
          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-400 mb-1">Recovery Mode</p>
                <p className="text-sm text-white">{retryMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Design
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
