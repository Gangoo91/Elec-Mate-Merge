import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, X, CheckCircle2, Search, Zap, Clock, ShieldCheck, FileText, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { InstallationProjectDetails } from "@/types/installation-method";
import { AIQualityConfidenceBadge } from "./AIQualityConfidenceBadge";
import { cn } from "@/lib/utils";

interface InstallationProcessingViewProps {
  originalQuery?: string;
  projectDetails?: InstallationProjectDetails;
  progress: {
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  isCancelling?: boolean;
  onQuickMode?: () => void;
  qualityMetrics?: {
    overallConfidence: number;
    ragDataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    bs7671Coverage: number;
    practicalWorkCoverage: number;
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
  };
}

export const InstallationProcessingView = ({ originalQuery, projectDetails, progress, startTime, onCancel, isCancelling, onQuickMode, qualityMetrics }: InstallationProcessingViewProps) => {
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

  // Enhanced timer: 4 minutes for detailed 15-18 steps at 150-200 words
  const estimatedTotal = 240; // 4 minutes
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
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                What You Asked For
              </h4>
            </div>
            <p className="text-base text-foreground font-medium leading-relaxed text-left">
              {originalQuery}
            </p>
            {projectDetails && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1 text-left">
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

      {/* AI Quality Confidence Badge */}
      <AIQualityConfidenceBadge 
        metrics={qualityMetrics}
        isGenerating={progressValue < 100}
      />

      {/* Agent Card */}
      <Card className="overflow-hidden border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-background to-background">
        <CardContent className="p-6">
          <div className="flex items-start mb-4">
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
          </div>

          <div className="space-y-4">
            {/* Circular Progress Indicator */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="relative w-32 h-32">
                {/* Background circle */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressValue / 100)}`}
                    className="text-elec-yellow transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-foreground">{progressValue}%</span>
                </div>
              </div>

              {/* Current step message */}
              {currentStep && displayProgress && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-elec-yellow rounded-full animate-pulse"></span>
                    {currentStep}
                  </p>
                </div>
              )}
            </div>

            {/* Time Statistics - Improved Display */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Elapsed</div>
                <div className={cn(
                  "text-3xl font-black transition-all",
                  "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                )}>
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Remaining</div>
                <div className={cn(
                  "text-3xl font-black transition-all",
                  "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                )}>
                  {formatTime(estimatedRemaining)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Cards with Visual Indicators */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">What's Happening?</h4>
          <div className="space-y-2">
            <div className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all",
              displayProgress?.stage === 'rag' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {displayProgress && allStages.findIndex(s => s.stage === 'rag') < currentStageIndex ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Search className={cn(
                  "h-5 w-5 mt-0.5 shrink-0",
                  displayProgress?.stage === 'rag' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div>
                <div className="font-medium text-foreground">Searching BS 7671 installation requirements</div>
                <div className="text-sm text-muted-foreground">Finding relevant cable routing, protection, and accessory regulations</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all",
              displayProgress?.stage === 'ai' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {displayProgress && allStages.findIndex(s => s.stage === 'ai') < currentStageIndex ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Zap className={cn(
                  "h-5 w-5 mt-0.5 shrink-0",
                  displayProgress?.stage === 'ai' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div>
                <div className="font-medium text-foreground">Calculating cable sizes and protection</div>
                <div className="text-sm text-muted-foreground">Determining conductor CSA, voltage drop, and protective device ratings</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all",
              displayProgress?.stage === 'generation' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {displayProgress && allStages.findIndex(s => s.stage === 'generation') < currentStageIndex ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Clock className={cn(
                  "h-5 w-5 mt-0.5 shrink-0",
                  displayProgress?.stage === 'generation' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div>
                <div className="font-medium text-foreground">Generating step-by-step procedures</div>
                <div className="text-sm text-muted-foreground">Creating detailed installation instructions with first fix and second fix</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all",
              displayProgress?.stage === 'validation' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {displayProgress && allStages.findIndex(s => s.stage === 'validation') < currentStageIndex ? (
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <ShieldCheck className={cn(
                  "h-5 w-5 mt-0.5 shrink-0",
                  displayProgress?.stage === 'validation' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
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

      {/* Cancel Button at Bottom */}
      {onCancel && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={isCancelling}
            className="border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300 min-h-[44px] touch-manipulation w-full sm:w-auto"
          >
            {isCancelling ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel Generation
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
