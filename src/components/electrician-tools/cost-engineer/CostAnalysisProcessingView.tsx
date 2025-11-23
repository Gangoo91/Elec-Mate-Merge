import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { Progress } from "@/components/ui/progress";
import { Calculator, Package, Clock, ShieldCheck, CheckCircle2, Loader2, XCircle } from "lucide-react";

interface ProcessingStage {
  id: string;
  title: string;
  icon: typeof Package;
  substeps: string[];
  duration: number; // seconds
}

const ANALYSIS_STAGES: ProcessingStage[] = [
  {
    id: 'rag',
    title: 'Finding Prices',
    icon: Package,
    substeps: [
      'Searching UK supplier databases...',
      'Matching materials to your project...',
      'Retrieving current prices...'
    ],
    duration: 18
  },
  {
    id: 'ai',
    title: 'Calculating Costs',
    icon: Calculator,
    substeps: [
      'Analysing costs and generating quotes...',
      'Calculating labour requirements...',
      'Creating quote options...',
      'Preparing recommendations...'
    ],
    duration: 120
  },
  {
    id: 'finalize',
    title: 'Finalising Report',
    icon: CheckCircle2,
    substeps: [
      'Formatting cost analysis...',
      'Generating material list...',
      'Preparing timescale estimates...'
    ],
    duration: 12
  }
];

interface CostAnalysisProcessingViewProps {
  onCancel: () => void;
}

const CostAnalysisProcessingView = ({ onCancel }: CostAnalysisProcessingViewProps) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [currentSubstep, setCurrentSubstep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");

  const totalDuration = 180; // 3 minutes
  const estimatedTime = "3 minutes";
  const isOverdue = elapsedTime > 210;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress messages at key milestones (3-minute workflow)
  useEffect(() => {
    if (elapsedTime >= 20 && elapsedTime < 80) {
      setProgressMessage("Searching pricing database...");
    } else if (elapsedTime >= 80 && elapsedTime < 150) {
      setProgressMessage("Analysing costs...");
    } else if (elapsedTime >= 150 && elapsedTime < 180) {
      setProgressMessage("Finalising quote...");
    } else if (elapsedTime >= 180) {
      setProgressMessage("Almost complete...");
    }
  }, [elapsedTime]);

  useEffect(() => {
    let stageStartTime = 0;
    let currentStageIndex = 0;

    for (let i = 0; i < ANALYSIS_STAGES.length; i++) {
      const stageDuration = ANALYSIS_STAGES[i].duration;
      if (elapsedTime >= stageStartTime && elapsedTime < stageStartTime + stageDuration) {
        currentStageIndex = i;
        const stageProgress = (elapsedTime - stageStartTime) / stageDuration;
        const substepIndex = Math.floor(stageProgress * ANALYSIS_STAGES[i].substeps.length);
        setCurrentSubstep(Math.min(substepIndex, ANALYSIS_STAGES[i].substeps.length - 1));
        break;
      }
      stageStartTime += stageDuration;
    }

    setCurrentStage(currentStageIndex);
    setProgress(Math.min((elapsedTime / totalDuration) * 100, 99));
  }, [elapsedTime, totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <div className="mobile-safe-area min-h-[600px] flex items-center justify-center px-0 sm:p-6 animate-fade-in">
      <Card className="w-full max-w-7xl border-0 sm:border-2 border-elec-yellow/30 rounded-none sm:rounded-2xl bg-gradient-to-br from-elec-card via-elec-dark/70 to-elec-dark shadow-2xl">
        <CardHeader className="text-center space-y-4 sm:space-y-5 pb-6 px-4 sm:px-8 py-6 sm:py-8">
          <div className="flex justify-center mb-2">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-elec-yellow/30 to-green-500/30 flex items-center justify-center shadow-lg">
              <Calculator className="h-10 w-10 sm:h-12 sm:w-12 text-elec-yellow" />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
              AI Cost Analysis
            </CardTitle>
            
            <p className="text-xl text-white font-semibold">
              ⏱️ Estimated Time: 3 minutes
            </p>
            
            <p className="text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
              Searching 45,000+ UK pricing items for accurate quotes
            </p>
            
            {progressMessage && (
              <p className="text-sm sm:text-base text-elec-yellow font-medium mt-3 animate-fade-in">
                {progressMessage}
              </p>
            )}
          </div>

          <div className="space-y-4 sm:space-y-5 mt-6 px-2 sm:px-4">
            <div className="flex justify-between items-baseline gap-4">
              <span className="text-base sm:text-lg text-white font-semibold">
                Overall Progress
              </span>
              <span className="text-4xl sm:text-5xl font-bold text-elec-yellow tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-4 sm:h-3" />
            
            <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-3 xs:gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-white shrink-0" />
                <span className="text-sm sm:text-base text-white font-semibold tabular-nums">
                  Elapsed: {formatTime(elapsedTime)}
                </span>
              </div>
              {isOverdue ? (
                <span className="text-sm sm:text-base text-orange-400 font-semibold">
                  Still processing...
                </span>
              ) : (
                <span className="text-sm sm:text-base text-white font-semibold tabular-nums">
                  ~{formatTime(Math.max(0, totalDuration - elapsedTime))} remaining
                </span>
              )}
            </div>
          </div>

          {elapsedTime > 180 && (
            <div className="mt-6 mx-2 p-4 sm:p-5 bg-orange-500/10 border-2 border-orange-500/40 rounded-xl shadow-lg">
              <div className="flex items-start gap-3">
                <Clock className="h-6 w-6 sm:h-5 sm:w-5 text-orange-400 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-orange-400 leading-relaxed font-medium">
                  Still processing... Complex estimates can take up to 4 minutes for full accuracy.
                </p>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pb-8 px-4 sm:px-6">
          {/* Timeline */}
          <div className="space-y-3 sm:space-y-4">
            {ANALYSIS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === currentStage;
              const isComplete = idx < currentStage;
              const isPending = idx > currentStage;

              return (
                <div
                  key={stage.id}
                  className={`
                    rounded-xl sm:rounded-2xl transition-all duration-300 p-5 sm:p-6
                    ${isActive ? 'bg-elec-yellow/10 border-2 border-elec-yellow/50 shadow-xl border-l-4' : ''}
                    ${isComplete ? 'bg-green-500/10 border-2 border-green-500/40 shadow-lg' : ''}
                    ${isPending ? 'bg-elec-dark/40 border border-elec-yellow/20 opacity-70' : ''}
                  `}
                >
                  <div className="flex flex-col xs:flex-row gap-4 sm:gap-5">
                    {/* Icon - Centered on mobile, left-aligned on desktop */}
                    <div className="shrink-0 self-center xs:self-start">
                      {isComplete ? (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500/20 flex items-center justify-center shadow-md">
                          <CheckCircle2 className="h-8 w-8 sm:h-9 sm:w-9 text-green-400" />
                        </div>
                      ) : isActive ? (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-elec-yellow/20 flex items-center justify-center relative shadow-md">
                          <Icon className="h-8 w-8 sm:h-9 sm:w-9 text-elec-yellow" />
                          {/* Subtle static glow instead of animation */}
                          <div className="absolute inset-0 rounded-full bg-elec-yellow/10 blur-sm" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-elec-grey/50 flex items-center justify-center">
                          <Icon className="h-8 w-8 sm:h-9 sm:w-9 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Content area - Full width on mobile */}
                    <div className="flex-1 space-y-3 text-center xs:text-left">
                      {/* Title - Full width on mobile */}
                      <h3 className={`text-lg sm:text-xl font-bold ${
                        isActive ? 'text-elec-yellow' : 
                        isComplete ? 'text-green-400' : 
                        'text-white'
                      }`}>
                        {stage.title}
                      </h3>

                      {/* Status Badge - Full width on mobile, fits content on desktop */}
                      <div className="flex justify-center xs:justify-start">
                        {isComplete && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 font-semibold text-sm">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Complete</span>
                          </div>
                        )}
                        {isActive && (
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-elec-yellow/20 text-elec-yellow font-semibold text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>In Progress</span>
                          </div>
                        )}
                      </div>

                      {/* Description - Full width, better spacing */}
                      {isActive && (
                        <p className="text-base sm:text-lg text-white leading-relaxed pt-1 font-medium">
                          {stage.substeps[currentSubstep]}
                        </p>
                      )}
                      {isComplete && (
                        <p className="text-sm sm:text-base text-green-400/90 font-medium">
                          Analysis complete
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cancel Button */}
          <div className="pt-6 border-t border-elec-yellow/10">
            <MobileButton
              variant="outline"
              size="lg"
              onClick={onCancel}
              className="w-full border-2 border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Cancel Analysis
            </MobileButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysisProcessingView;
