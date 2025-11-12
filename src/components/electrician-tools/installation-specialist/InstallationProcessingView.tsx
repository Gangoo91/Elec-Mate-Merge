import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Wrench, X, CheckCircle2, Circle, Loader2, Search, Zap, Clock, ShieldCheck, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InstallationProjectDetails } from "@/types/installation-method";

interface InstallationProcessingViewProps {
  originalQuery?: string;
  projectDetails?: InstallationProjectDetails;
  progress: {
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  onQuickMode?: () => void;
}

export const InstallationProcessingView = ({ originalQuery, projectDetails, progress, startTime, onCancel, onQuickMode }: InstallationProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [simulatedProgress, setSimulatedProgress] = useState<{
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance stages based on elapsed time if real progress hasn't updated
  useEffect(() => {
    if (!progress) return;

    const elapsed = elapsedTime;
    
    // Time-based stage advancement (similar to simple agent)
    if (elapsed <= 5) {
      setSimulatedProgress({ stage: 'initializing', message: 'Starting up systems...' });
    } else if (elapsed <= 20) {
      setSimulatedProgress({ stage: 'rag', message: 'Searching BS 7671 regulations...' });
    } else if (elapsed <= 50) {
      setSimulatedProgress({ stage: 'ai', message: 'Calculating requirements...' });
    } else if (elapsed <= 70) {
      setSimulatedProgress({ stage: 'generation', message: 'Generating procedures...' });
    } else if (elapsed <= 90) {
      setSimulatedProgress({ stage: 'validation', message: 'Validating compliance...' });
    }
  }, [elapsedTime, progress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Map stages to percentage values
  const progressMap: Record<string, number> = {
    'initializing': 10,
    'rag': 25,
    'ai': 50,
    'generation': 60,
    'validation': 75,
    'complete': 100
  };

  // Use real progress if available, otherwise use simulated
  const displayProgress = progress?.stage !== 'initializing' ? progress : (simulatedProgress || progress);
  const progressValue = displayProgress ? progressMap[displayProgress.stage] : 0;
  const currentStep = displayProgress?.message || 'Initializing...';

  const estimatedTotal = 180; // 3 minutes estimate
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsedTime);

  // Define all stages with their labels
  const allStages = [
    { stage: 'initializing', label: 'Initializing system' },
    { stage: 'rag', label: 'Searching BS 7671 regulations' },
    { stage: 'ai', label: 'Calculating cable sizes' },
    { stage: 'generation', label: 'Generating step-by-step procedures' },
    { stage: 'validation', label: 'Validating compliance' },
    { stage: 'complete', label: 'Complete' }
  ];

  // Get current stage index using display progress
  const currentStageIndex = displayProgress ? allStages.findIndex(s => s.stage === displayProgress.stage) : -1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Original Request Display */}
      {originalQuery && (
        <Card className="border-blue-500/20 bg-muted/30">
          <CardContent className="p-4 sm:p-6">
            <h4 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              What You Asked For
            </h4>
            <p className="text-base text-foreground font-medium leading-relaxed">
              {originalQuery}
            </p>
            {projectDetails && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                {projectDetails.projectName && (
                  <p>Project: <span className="text-foreground">{projectDetails.projectName}</span></p>
                )}
                {projectDetails.location && (
                  <p>Location: <span className="text-foreground">{projectDetails.location}</span></p>
                )}
                {projectDetails.installationType && (
                  <p>Type: <span className="text-foreground">{projectDetails.installationType}</span></p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

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
            
            {currentStep && displayProgress && (
              <div className="pt-3 mt-3 border-t border-border text-xs text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                  {currentStep}
                </p>
              </div>
            )}

            {/* Time Statistics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-border">
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Elapsed Time</div>
                <div className="text-2xl font-bold text-purple-400">{formatTime(elapsedTime)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Estimated Remaining</div>
                <div className="text-2xl font-bold text-pink-400">{formatTime(estimatedRemaining)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Estimate</div>
                <div className="text-2xl font-bold text-purple-400">{formatTime(estimatedTotal)}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Happening */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">What's Happening?</h4>
          <div className="space-y-3">
            <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              displayProgress?.stage === 'rag' ? 'bg-purple-500/10' : ''
            }`}>
              <Search className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-foreground">Searching BS 7671 installation requirements</div>
                <div className="text-sm text-muted-foreground">Finding relevant cable routing, protection, and accessory regulations</div>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              displayProgress?.stage === 'ai' ? 'bg-purple-500/10' : ''
            }`}>
              <Zap className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-foreground">Calculating cable sizes and protection</div>
                <div className="text-sm text-muted-foreground">Determining conductor CSA, voltage drop, and protective device ratings</div>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              displayProgress?.stage === 'generation' ? 'bg-purple-500/10' : ''
            }`}>
              <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-foreground">Generating step-by-step procedures</div>
                <div className="text-sm text-muted-foreground">Creating detailed installation instructions with first fix and second fix</div>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
              displayProgress?.stage === 'validation' ? 'bg-purple-500/10' : ''
            }`}>
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <div className="font-medium text-foreground">Verifying regulation compliance</div>
                <div className="text-sm text-muted-foreground">Cross-checking with BS 7671 requirements and certification needs</div>
              </div>
            </div>
          </div>
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
