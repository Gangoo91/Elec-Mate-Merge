import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { CheckCircle2, Loader2, Clock, XCircle, Zap, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StageIndicator } from './StageIndicator';

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

  const EXPECTED_TOTAL_SECONDS = 70;
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
    <div className="min-h-[60vh] flex items-center justify-center px-3 py-6">
      <div className="max-w-5xl w-full space-y-4">
        {/* Main Progress Card */}
        <Card className="border-elec-yellow/20 bg-elec-card">
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-6">
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-elec-yellow" />
              </div>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Parallel AI Circuit Design</h2>
                <p className="text-gray-100 text-sm">
                  Two specialized agents working simultaneously...
                </p>
              </div>

              {/* Dual Agent Progress */}
              <div className="w-full space-y-6">
                {/* Designer Agent Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Zap className="h-4 w-4 text-elec-yellow" />
                      Circuit Designer
                    </span>
                    <Badge variant={getStatusVariant(designerStatus)} className="text-xs">
                      {getStatusBadgeText(designerStatus)}
                    </Badge>
                  </div>
                  <Progress value={designerProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Calculating cable sizes, protection devices, and BS 7671 compliance
                  </p>
                </div>

                {/* Installation Specialist Progress */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <Wrench className="h-4 w-4 text-blue-400" />
                      Installation Specialist
                    </span>
                    <Badge variant={getStatusVariant(installerStatus)} className="text-xs">
                      {getStatusBadgeText(installerStatus)}
                    </Badge>
                  </div>
                  <Progress value={installerProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Generating tools, materials, and installation procedures
                  </p>
                </div>

                {/* Overall Progress */}
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm font-bold text-elec-yellow">{currentPercent}%</span>
                  </div>
                  <Progress value={currentPercent} className="h-3" />
                </div>
              </div>

              {/* Current Step Alert */}
              <Alert className="w-full bg-elec-card/50 border-elec-yellow/30">
                <AlertDescription className="text-sm text-center">
                  {progress?.message || 'Processing in parallel...'}
                </AlertDescription>
              </Alert>

              {/* Progress Bar */}
              <div className="w-full space-y-4">
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow transition-all duration-700 ease-out shadow-lg shadow-elec-yellow/30"
                    style={{ width: `${currentPercent}%` }}
                  />
                </div>

                {/* Stats Row */}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-elec-yellow text-base">{currentPercent}%</span>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(elapsedTime)}</span>
                    <span>•</span>
                    <span>~{formatTime(estimatedTimeRemaining)} remaining</span>
                  </div>
                </div>

                {/* Stage Info */}
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Stage {currentStage + 1} of {stageDetails.length}: {stageDetails[currentStage]?.name}
                  </p>
                  <StageIndicator 
                    currentStage={currentStage} 
                    totalStages={stageDetails.length}
                    className="justify-center"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Request Recap */}
        {userRequest && (
          <Card className="bg-elec-yellow/5 border-elec-yellow/20">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-elec-yellow mb-2">Your Requirements:</p>
              <p className="text-sm text-muted-foreground line-clamp-3">{userRequest}</p>
            </CardContent>
          </Card>
        )}

        {/* Retry Message */}
        {retryMessage && (
          <Card className="bg-amber-500/10 border-amber-500/30">
            <CardContent className="p-4 flex items-start gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-500 mb-1">Recovery Mode</p>
                <p className="text-sm text-muted-foreground">{retryMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Circuit Progress */}
        {totalCircuits > 0 && (
          <Card className="bg-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-400">Circuits Completed</span>
                <span className="text-lg font-bold text-green-400">
                  {estimatedCompleted}/{totalCircuits}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stage Timeline - Horizontal scrollable */}
        <div className="-mx-3 px-3">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              {stageDetails.map((stage, idx) => (
                <div
                  key={idx}
                  className={`
                    flex-shrink-0 px-3 py-3 rounded-lg border text-center
                    transition-all duration-300 w-24
                    ${idx < currentStage 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : idx === currentStage
                      ? 'bg-elec-yellow/10 border-elec-yellow/30 shadow-sm'
                      : 'bg-muted/5 border-border/50'
                    }
                  `}
                >
                  <div className="text-xl mb-1">{stage.icon}</div>
                  <div className={`
                    text-xs font-medium line-clamp-2
                    ${idx <= currentStage ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {stage.name}
                  </div>
                  {idx < currentStage && (
                    <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto mt-1" />
                  )}
                  {idx === currentStage && (
                    <Loader2 className="w-4 h-4 text-elec-yellow mx-auto mt-1 animate-spin" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        {onCancel && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={onCancel}
              className="w-full sm:w-auto"
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
