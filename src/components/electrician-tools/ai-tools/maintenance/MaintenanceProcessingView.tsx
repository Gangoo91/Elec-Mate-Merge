import { CheckCircle2, Loader2, Wrench, AlertTriangle, Calendar, CheckCircle, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface MaintenanceProcessingViewProps {
  progress: string;
  detailLevel?: 'quick' | 'full';
  startTime?: number | null;
}

const WHAT_HAPPENING_STAGES = [
  { 
    id: 1, 
    title: 'Searching BS 7671 maintenance requirements', 
    description: 'Finding relevant maintenance procedures, inspection intervals, and regulations',
    icon: Wrench, 
    minPercent: 0,
    maxPercent: 25
  },
  { 
    id: 2, 
    title: 'Analysing equipment risk factors', 
    description: 'Assessing failure modes, environmental conditions, and usage patterns',
    icon: AlertTriangle, 
    minPercent: 25,
    maxPercent: 50
  },
  { 
    id: 3, 
    title: 'Generating maintenance tasks and schedules', 
    description: 'Creating detailed maintenance procedures with optimal timing intervals',
    icon: Calendar, 
    minPercent: 50,
    maxPercent: 75
  },
  { 
    id: 4, 
    title: 'Creating compliance checklist', 
    description: 'Cross-checking with BS 7671 requirements and certification needs',
    icon: CheckCircle, 
    minPercent: 75,
    maxPercent: 95
  },
];

export const MaintenanceProcessingView = ({ progress, detailLevel = 'quick', startTime }: MaintenanceProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const ESTIMATED_TIME = detailLevel === 'quick' ? 25 : 70; // seconds

  // Time tracking
  useEffect(() => {
    if (!startTime) return;
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Calculate percentage-based progress (cap at 95% until complete)
  const progressPercent = Math.min(95, (elapsedTime / ESTIMATED_TIME) * 100);
  
  // Dynamically extend total time if processing takes longer than estimated
  const dynamicTotalTime = Math.max(ESTIMATED_TIME, elapsedTime + 10);
  const remainingTime = Math.max(0, dynamicTotalTime - elapsedTime);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Find current stage based on progress percentage
  const currentStage = WHAT_HAPPENING_STAGES.find(
    s => progressPercent >= s.minPercent && progressPercent < s.maxPercent
  );
  const currentStepText = currentStage?.title || 'Processing...';

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl border border-elec-yellow/20 bg-elec-card/50 backdrop-blur-sm rounded-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center w-14 h-14 bg-elec-yellow/10 border border-elec-yellow/20 rounded-full shrink-0">
            <Zap className="h-7 w-7 text-elec-yellow" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              AI Maintenance Specialist
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Searching BS 7671 regulations...
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-bold text-elec-yellow">{Math.round(progressPercent)}%</span>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-2 bg-elec-dark/50"
          />
        </div>

        {/* Current Step */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            <span className="inline-block w-1.5 h-1.5 bg-elec-yellow rounded-full mr-2 animate-pulse"></span>
            {currentStepText}
          </p>
        </div>

        {/* Time Tracker */}
        <div className="border border-elec-yellow/20 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Elapsed Time</div>
              <div className="text-xl font-bold text-elec-yellow">{formatTime(elapsedTime)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Estimated Remaining</div>
              <div className="text-xl font-bold text-foreground">{formatTime(remainingTime)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Total Estimate</div>
              <div className="text-xl font-bold text-muted-foreground">{formatTime(dynamicTotalTime)}</div>
            </div>
          </div>
        </div>

        {/* What's Happening Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-elec-yellow" />
            <h4 className="text-base font-semibold text-foreground">What's Happening?</h4>
          </div>
          <div className="space-y-3">
            {WHAT_HAPPENING_STAGES.map((stage) => {
              const isActive = progressPercent >= stage.minPercent && progressPercent < stage.maxPercent;
              const isComplete = progressPercent >= stage.maxPercent;
              const StageIcon = stage.icon;
              
              return (
                <div
                  key={stage.id}
                  className={`rounded-lg p-3 transition-all duration-300 ${
                    isActive
                      ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                      : 'border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-5 h-5 shrink-0 mt-0.5">
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : isActive ? (
                        <StageIcon className="h-5 w-5 text-elec-yellow" />
                      ) : (
                        <StageIcon className="h-5 w-5 text-muted-foreground/30" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`text-sm font-medium mb-0.5 ${
                          isActive
                            ? 'text-foreground'
                            : isComplete
                            ? 'text-muted-foreground'
                            : 'text-muted-foreground/50'
                        }`}
                      >
                        {stage.title}
                      </div>
                      <div
                        className={`text-xs ${
                          isActive
                            ? 'text-muted-foreground'
                            : isComplete
                            ? 'text-muted-foreground/60'
                            : 'text-muted-foreground/40'
                        }`}
                      >
                        {stage.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
