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

  // Determine current stage based on progress (clamped to valid range)
  const currentStage = Math.min(progress?.stage || 0, stageDetails.length - 1);
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
    <div className="min-h-[60vh] flex items-center justify-center px-3 sm:px-4 py-4 sm:py-6 pb-safe">
      <Card className="border-elec-yellow/20 bg-elec-card max-w-2xl mx-auto w-full">
        <CardContent className="p-4 sm:p-6">
          {/* Header Section */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center shrink-0">
              <Loader2 className="w-5 h-5 text-elec-yellow animate-spin" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-foreground">Designing Your Installation</h2>
              <p className="text-xs text-muted-foreground">BS 7671 compliant circuit design in progress</p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-2xl font-bold text-elec-yellow">{currentPercent}%</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${currentPercent}%` }}
              />
            </div>
          </div>

          {/* Current Activity */}
          <div className="bg-muted/10 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-elec-yellow/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-lg">{stageDetails[currentStage].icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground mb-1">
                  {stageDetails[currentStage].name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stageDetails[currentStage].description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-muted/10 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Elapsed Time</span>
              </div>
              <p className="text-lg font-semibold text-foreground">{formatTime(elapsedTime)}</p>
            </div>
            
            {totalCircuits > 0 && (
              <div className="bg-muted/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Circuits</span>
                </div>
                <p className="text-lg font-semibold text-foreground">
                  {estimatedCompleted}<span className="text-muted-foreground">/{totalCircuits}</span>
                </p>
              </div>
            )}
          </div>

          {/* Parallel Agents */}
          <div className="space-y-3 mb-4 pt-4 border-t border-border/20">
            <p className="text-xs font-medium text-muted-foreground mb-2">Parallel Processing</p>
            
            {/* Designer */}
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-elec-yellow shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">Circuit Designer</span>
                  <span className="text-xs text-muted-foreground">{designerProgress}%</span>
                </div>
                <Progress value={designerProgress} className="h-1.5" />
              </div>
            </div>
            
            {/* Installer */}
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">Installation Specialist</span>
                  <span className="text-xs text-muted-foreground">{installerProgress}%</span>
                </div>
                <Progress value={installerProgress} className="h-1.5 [&>div]:bg-blue-500" />
              </div>
            </div>
          </div>

          {/* Estimated Time Remaining */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/20">
            <Clock className="w-3.5 h-3.5" />
            <span>Estimated time remaining: ~{formatTime(estimatedTimeRemaining)}</span>
          </div>

          {/* Retry Message */}
          {retryMessage && (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-amber-400 mb-0.5">Recovery Mode</p>
                <p className="text-xs text-muted-foreground">{retryMessage}</p>
              </div>
            </div>
          )}

          {/* Cancel Button */}
          {onCancel && (
            <div className="mt-6 pt-4 border-t border-border/20">
              <Button
                variant="outline"
                onClick={onCancel}
                className="w-full min-h-[44px] border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-foreground touch-manipulation"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Cancel Design
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
