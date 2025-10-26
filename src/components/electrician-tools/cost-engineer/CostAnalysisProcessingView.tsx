import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    duration: 15
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
    duration: 4
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

  const totalDuration = ANALYSIS_STAGES.reduce((sum, stage) => sum + stage.duration, 0);
  const estimatedTime = `${totalDuration - 10}-${totalDuration + 10} seconds`;
  const isOverdue = elapsedTime > totalDuration + 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-[600px] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl border-elec-yellow/20 bg-gradient-to-br from-elec-card to-elec-dark/50">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-elec-yellow/20 to-green-500/20 flex items-center justify-center">
              <Calculator className="h-10 w-10 text-elec-yellow" />
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
              AI Cost Analysis In Progress
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              ⏱️ Typically takes: {estimatedTime}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              AI is searching 45,000+ pricing items and generating detailed cost breakdown...
              <br />
              <span className="text-elec-yellow/70">This process requires thorough analysis for accurate results</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-elec-yellow font-semibold">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Elapsed: {formatTime(elapsedTime)}</span>
              {isOverdue ? (
                <span className="text-orange-400">Still processing... AI is being thorough</span>
              ) : (
                <span>~{formatTime(Math.max(0, totalDuration - elapsedTime))} remaining</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground/60 text-center mt-1">
              ⏱️ Progress estimate based on typical request duration
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pb-8">
          {/* Timeline */}
          <div className="space-y-4">
            {ANALYSIS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isActive = idx === currentStage;
              const isComplete = idx < currentStage;
              const isPending = idx > currentStage;

              return (
                <div
                  key={stage.id}
                  className={`
                    flex gap-4 p-4 rounded-lg transition-all duration-300
                    ${isActive ? 'bg-elec-yellow/10 border border-elec-yellow/30 scale-[1.02]' : ''}
                    ${isComplete ? 'bg-green-500/5 border border-green-500/20' : ''}
                    ${isPending ? 'bg-elec-dark/30 border border-elec-yellow/10 opacity-60' : ''}
                  `}
                >
                  <div className="shrink-0">
                    {isComplete ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      </div>
                    ) : isActive ? (
                      <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-elec-yellow" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-elec-grey/50 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-semibold text-sm sm:text-base ${isActive ? 'text-elec-yellow' : isComplete ? 'text-green-500' : 'text-muted-foreground'}`}>
                        {stage.title}
                      </h3>
                      {isComplete && (
                        <span className="text-xs text-green-500 font-medium">Complete ✓</span>
                      )}
                      {isActive && (
                        <span className="text-xs text-elec-yellow font-medium">In Progress...</span>
                      )}
                    </div>

                    {isActive && (
                      <p className="text-xs sm:text-sm text-muted-foreground animate-fade-in">
                        {stage.substeps[currentSubstep]}
                      </p>
                    )}
                    {isComplete && (
                      <p className="text-xs text-green-500/70">Analysis complete</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cancel Button */}
          <div className="pt-4 border-t border-elec-yellow/10">
            <Button
              variant="destructive"
              onClick={onCancel}
              className="w-full sm:w-auto touch-manipulation"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostAnalysisProcessingView;
