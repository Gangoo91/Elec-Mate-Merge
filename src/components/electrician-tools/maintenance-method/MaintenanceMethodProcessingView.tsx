import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, X, CheckCircle2, Search, Zap, Clock, ShieldCheck, FileText, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { MaintenanceEquipmentDetails } from "@/types/maintenance-method";
import { cn } from "@/lib/utils";

interface MaintenanceMethodProcessingViewProps {
  progress: number;
  currentStep: string | null;
  originalQuery?: string;
  equipmentDetails?: MaintenanceEquipmentDetails;
  startTime?: number;
  onCancel?: () => void;
  isCancelling?: boolean;
}

export const MaintenanceMethodProcessingView = ({
  progress,
  currentStep,
  originalQuery,
  equipmentDetails,
  startTime = Date.now(),
  onCancel,
  isCancelling
}: MaintenanceMethodProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(progress);
  const animationRef = useRef<number | null>(null);

  // Smooth progress animation - prevents jarring jumps
  useEffect(() => {
    if (progress > displayProgress) {
      const startProgress = displayProgress;
      const startTime = Date.now();
      const duration = 800; // 800ms animation

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const fraction = Math.min(elapsed / duration, 1);
        // Ease-out curve for smooth deceleration
        const eased = 1 - Math.pow(1 - fraction, 3);
        const newProgress = Math.round(startProgress + (progress - startProgress) * eased);
        setDisplayProgress(newProgress);

        if (fraction < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Map progress percentage to stages - use displayProgress for smooth UI
  const getStageFromProgress = (prog: number): 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete' => {
    if (prog < 10) return 'initializing';
    if (prog < 30) return 'rag';
    if (prog < 60) return 'ai';
    if (prog < 80) return 'generation';
    if (prog < 100) return 'validation';
    return 'complete';
  };

  const currentStage = getStageFromProgress(displayProgress);

  // Enhanced timer: 5 minutes for maintenance methods
  const estimatedTotal = 300; // 5 minutes
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsedTime);

  // Define all stages with their labels
  const allStages = [
    { stage: 'initializing', label: 'Initializing system' },
    { stage: 'rag', label: 'Searching BS 7671 maintenance requirements' },
    { stage: 'ai', label: 'Analysing equipment specifications' },
    { stage: 'generation', label: 'Generating step-by-step procedures' },
    { stage: 'validation', label: 'Verifying regulation compliance' },
    { stage: 'complete', label: 'Complete' }
  ];

  // Get current stage index
  const currentStageIndex = allStages.findIndex(s => s.stage === currentStage);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in px-2 sm:px-0">
      {/* Original Request Display */}
      {originalQuery && (
        <Card className="border-elec-yellow/20 bg-muted/30">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                What You Asked For
              </h4>
            </div>
            <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed text-left">
              {originalQuery}
            </p>
            {equipmentDetails && (
              <div className="mt-3 pt-3 border-t border-border text-xs text-foreground space-y-1 text-left">
                {equipmentDetails.equipmentType && (
                  <p>Equipment: <span className="text-foreground">{equipmentDetails.equipmentType}</span></p>
                )}
                {equipmentDetails.location && (
                  <p>Location: <span className="text-foreground">{equipmentDetails.location}</span></p>
                )}
                {equipmentDetails.installationType && (
                  <p>Type: <span className="text-foreground capitalize">{equipmentDetails.installationType}</span></p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Agent Card */}
      <Card className="overflow-hidden border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/10 via-background to-background">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-gradient-to-br from-elec-yellow to-elec-yellow/80 ${progress < 100 ? 'animate-pulse' : ''}`}>
                <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-foreground">Maintenance Method Specialist</h3>
                <p className="text-xs sm:text-sm text-foreground">
                  {displayProgress < 100 ? 'Generating maintenance instructions...' : 'Complete'}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Circular Progress Indicator */}
            <div className="flex flex-col items-center gap-4 py-4 sm:py-6">
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                {/* Background circle */}
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30 sm:hidden"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/30 hidden sm:block"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - displayProgress / 100)}`}
                    className="text-elec-yellow transition-all duration-300 sm:hidden"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - displayProgress / 100)}`}
                    className="text-elec-yellow transition-all duration-300 hidden sm:block"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-black text-foreground">{displayProgress}%</span>
                </div>
              </div>

              {/* Current step message */}
              {currentStep && (
                <div className="text-center px-2">
                  <p className="text-xs sm:text-sm text-foreground flex items-center justify-center gap-2">
                    <span className="inline-block w-2 h-2 bg-elec-yellow rounded-full animate-pulse"></span>
                    {currentStep}
                  </p>
                </div>
              )}
            </div>

            {/* Time Statistics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-border">
              <div className="text-center p-2 sm:p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-foreground mb-1">Elapsed</div>
                <div className={cn(
                  "text-2xl sm:text-3xl font-black transition-all",
                  "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                )}>
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className="text-center p-2 sm:p-3 bg-muted/30 rounded-lg">
                <div className="text-xs text-foreground mb-1">Remaining</div>
                <div className={cn(
                  "text-2xl sm:text-3xl font-black transition-all",
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
        <CardContent className="p-4 sm:p-6">
          <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-foreground">What's Happening?</h4>
          <div className="space-y-2">
            <div className={cn(
              "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all",
              currentStage === 'rag' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {currentStageIndex > allStages.findIndex(s => s.stage === 'rag') ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Search className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0",
                  currentStage === 'rag' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div className="min-w-0">
                <div className="font-medium text-foreground text-xs sm:text-sm">Searching BS 7671 maintenance requirements</div>
                <div className="text-xs text-foreground hidden sm:block">Finding relevant maintenance schedules and inspection procedures</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all",
              currentStage === 'ai' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {currentStageIndex > allStages.findIndex(s => s.stage === 'ai') ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Zap className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0",
                  currentStage === 'ai' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div className="min-w-0">
                <div className="font-medium text-foreground text-xs sm:text-sm">Analysing equipment specifications</div>
                <div className="text-xs text-foreground hidden sm:block">Determining maintenance intervals and safety requirements</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all",
              currentStage === 'generation' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {currentStageIndex > allStages.findIndex(s => s.stage === 'generation') ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <Clock className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0",
                  currentStage === 'generation' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div className="min-w-0">
                <div className="font-medium text-foreground text-xs sm:text-sm">Generating step-by-step procedures</div>
                <div className="text-xs text-foreground hidden sm:block">Creating detailed maintenance instructions with safety notes</div>
              </div>
            </div>
            
            <div className={cn(
              "flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all",
              currentStage === 'validation' ? 'bg-elec-yellow/10 border-2 border-elec-yellow/30' : 'border-2 border-transparent'
            )}>
              {currentStageIndex > allStages.findIndex(s => s.stage === 'validation') ? (
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success mt-0.5 shrink-0" />
              ) : (
                <ShieldCheck className={cn(
                  "h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0",
                  currentStage === 'validation' ? 'text-elec-yellow animate-pulse' : 'text-muted-foreground'
                )} />
              )}
              <div className="min-w-0">
                <div className="font-medium text-foreground text-xs sm:text-sm">Verifying regulation compliance</div>
                <div className="text-xs text-foreground hidden sm:block">Cross-checking with BS 7671 requirements and safety standards</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancel Button at Bottom */}
      {onCancel && (
        <div className="flex justify-center pt-2 sm:pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onCancel}
            disabled={isCancelling}
            className="border-red-500/30 hover:bg-red-500/10 text-red-400 hover:text-red-300 min-h-[44px] touch-manipulation active:scale-95 transition-all w-full sm:w-auto"
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
