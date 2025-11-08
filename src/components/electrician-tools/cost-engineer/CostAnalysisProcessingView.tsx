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
    title: 'Searching Pricing Database',
    icon: Package,
    substeps: [
      'Querying 45,000+ UK pricing items...',
      'Finding matching materials and suppliers...',
      'Retrieving current 2025 prices...'
    ],
    duration: 18
  },
  {
    id: 'ai',
    title: 'AI Cost Analysis',
    icon: Calculator,
    substeps: [
      'Generating detailed cost breakdown...',
      'Calculating labour requirements...',
      'Creating alternative quotes...',
      'Preparing value engineering suggestions...'
    ],
    duration: 120
  },
  {
    id: 'finalize',
    title: 'Finalising Report',
    icon: CheckCircle2,
    substeps: [
      'Formatting cost analysis...',
      'Generating material order list...',
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

  const totalDuration = ANALYSIS_STAGES.reduce((sum, stage) => sum + stage.duration, 0);
  const estimatedTime = `${totalDuration - 10}-${totalDuration + 10} seconds`;
  const isOverdue = elapsedTime > totalDuration + 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Progress messages at key milestones
  useEffect(() => {
    if (elapsedTime >= 30 && elapsedTime < 90) {
      setProgressMessage("Searching regulations and pricing database...");
    } else if (elapsedTime >= 90 && elapsedTime < 150) {
      setProgressMessage("Generating detailed estimate with AI...");
    } else if (elapsedTime >= 150 && elapsedTime < 210) {
      setProgressMessage("Calculating profitability and business insights...");
    } else if (elapsedTime >= 210) {
      setProgressMessage("Almost complete, finalising report...");
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
    <div className="mobile-safe-area min-h-[600px] flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <Card className="w-full max-w-2xl border-2 border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50 shadow-xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-elec-yellow/20 to-green-500/20 flex items-center justify-center">
              <Calculator className="h-8 w-8 sm:h-10 sm:w-10 text-elec-yellow" />
            </div>
          </div>

          <div className="space-y-3">
            <CardTitle className="mobile-heading font-bold text-foreground">
              AI Cost Analysis In Progress
            </CardTitle>
            
            <p className="mobile-text text-muted-foreground font-medium">
              ⏱️ Typically takes: {estimatedTime}
            </p>
            
            <p className="mobile-small-text text-muted-foreground leading-relaxed">
              AI is searching 45,000+ pricing items and generating detailed cost breakdown...
            </p>
            
            <p className="mobile-text text-elec-yellow font-semibold">
              This typically takes 2-3 minutes for accurate results
            </p>
            
            {progressMessage && (
              <p className="mobile-text text-elec-yellow font-medium mt-3 animate-fade-in">
                {progressMessage}
              </p>
            )}
          </div>

          <div className="space-y-3 mobile-card-spacing">
            <div className="flex justify-between items-baseline">
              <span className="mobile-text text-muted-foreground font-medium">Overall Progress</span>
              <span className="text-2xl sm:text-3xl font-bold text-elec-yellow tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
            
            <Progress value={progress} className="h-4 sm:h-3" />
            
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="mobile-small-text text-muted-foreground font-medium tabular-nums">
                  Elapsed: {formatTime(elapsedTime)}
                </span>
              </div>
              {isOverdue ? (
                <span className="mobile-small-text text-orange-400 font-medium">
                  Still processing...
                </span>
              ) : (
                <span className="mobile-small-text text-muted-foreground font-medium tabular-nums">
                  ~{formatTime(Math.max(0, totalDuration - elapsedTime))} remaining
                </span>
              )}
            </div>
            
            <p className="mobile-small-text text-muted-foreground/60 text-center">
              ⏱️ Progress estimate based on typical request duration
            </p>
          </div>

          {elapsedTime > 120 && (
            <div className="mt-4 p-4 bg-orange-500/10 border-2 border-orange-500/30 rounded-xl shadow-sm">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                <p className="mobile-small-text text-orange-400 leading-relaxed">
                  Still processing... Generating alternative quotes and order lists takes time for accuracy.
                </p>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
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
                    flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl transition-all duration-300
                    ${isActive ? 'bg-elec-yellow/10 border-2 border-elec-yellow/40 shadow-lg shadow-elec-yellow/5 scale-[1.01] sm:scale-[1.02]' : ''}
                    ${isComplete ? 'bg-green-500/5 border-2 border-green-500/30' : ''}
                    ${isPending ? 'bg-elec-dark/30 border border-elec-yellow/10 opacity-60' : ''}
                  `}
                >
                  <div className="shrink-0">
                    {isComplete ? (
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-7 w-7 sm:h-6 sm:w-6 text-green-500" />
                      </div>
                    ) : isActive ? (
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center relative">
                        <Icon className="h-7 w-7 sm:h-6 sm:w-6 text-elec-yellow" />
                        <div className="absolute inset-0 rounded-full bg-elec-yellow/20 animate-ping" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-elec-grey/50 flex items-center justify-center">
                        <Icon className="h-7 w-7 sm:h-6 sm:w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className={`mobile-text font-bold ${
                        isActive ? 'text-elec-yellow' : 
                        isComplete ? 'text-green-500' : 
                        'text-muted-foreground'
                      }`}>
                        {stage.title}
                      </h3>
                      {isComplete && (
                        <span className="mobile-small-text text-green-500 font-semibold shrink-0">
                          Complete ✓
                        </span>
                      )}
                      {isActive && (
                        <span className="mobile-small-text text-elec-yellow font-semibold shrink-0 flex items-center gap-1">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          In Progress...
                        </span>
                      )}
                    </div>

                    {isActive && (
                      <p className="mobile-small-text text-muted-foreground leading-relaxed animate-fade-in">
                        {stage.substeps[currentSubstep]}
                      </p>
                    )}
                    {isComplete && (
                      <p className="mobile-small-text text-green-500/70">
                        Analysis complete
                      </p>
                    )}
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
