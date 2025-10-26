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
    id: 'materials',
    title: 'Materials Research',
    icon: Package,
    substeps: [
      'Cataloguing components...',
      'Checking current pricing...',
      'Calculating quantities...'
    ],
    duration: 10
  },
  {
    id: 'labour',
    title: 'Labour Calculation',
    icon: Clock,
    substeps: [
      'Estimating installation time...',
      'Applying trade rates...',
      'Adding complexity factors...'
    ],
    duration: 8
  },
  {
    id: 'compliance',
    title: 'Compliance Check',
    icon: ShieldCheck,
    substeps: [
      'Reviewing BS 7671 requirements...',
      'Adding certification costs...',
      'Checking testing needs...'
    ],
    duration: 6
  },
  {
    id: 'breakdown',
    title: 'Cost Breakdown',
    icon: Calculator,
    substeps: [
      'Generating itemised quote...',
      'Calculating totals...',
      'Formatting report...'
    ],
    duration: 8
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
  const estimatedTime = `${totalDuration - 5}-${totalDuration + 5} seconds`;

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
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-elec-yellow/20 to-green-500/20 flex items-center justify-center animate-pulse">
                <Calculator className="h-10 w-10 text-elec-yellow" />
              </div>
              <div className="absolute inset-0 rounded-full bg-elec-yellow/20 animate-ping" />
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
              AI Cost Analysis In Progress
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              ⏱️ Expected completion: {estimatedTime}
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              AI is analysing materials, labour, and compliance requirements...
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
              <span>~{formatTime(totalDuration - elapsedTime)} remaining</span>
            </div>
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
                      <div className="w-10 h-10 rounded-full bg-elec-yellow/20 flex items-center justify-center animate-pulse">
                        <Loader2 className="h-6 w-6 text-elec-yellow animate-spin" />
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
                        <span className="text-xs text-elec-yellow font-medium animate-pulse">In Progress...</span>
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
