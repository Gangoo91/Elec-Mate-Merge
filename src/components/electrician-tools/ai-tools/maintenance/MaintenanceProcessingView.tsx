import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, Wrench, AlertTriangle, Calendar, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface MaintenanceProcessingViewProps {
  progress: string;
  detailLevel?: 'quick' | 'full';
  startTime?: number | null;
}

const QUICK_STEPS = [
  { id: 1, text: 'Analysing equipment...', icon: '📋' },
  { id: 2, text: 'Generating schedule...', icon: '🛠️' },
  { id: 3, text: 'Calculating costs...', icon: '💷' },
  { id: 4, text: 'Finalising plan...', icon: '📄' },
];

const FULL_STEPS = [
  { id: 1, text: 'Analysing equipment details...', icon: '📋' },
  { id: 2, text: 'Searching BS 7671 & GN3 regulations...', icon: '📚' },
  { id: 3, text: 'Calculating risk scores...', icon: '📊' },
  { id: 4, text: 'Generating detailed tasks...', icon: '🛠️' },
  { id: 5, text: 'Expanding procedures...', icon: '📝' },
  { id: 6, text: 'Analysing failure modes...', icon: '⚠️' },
  { id: 7, text: 'Creating compliance checklist...', icon: '✅' },
  { id: 8, text: 'Finalising maintenance plan...', icon: '📄' },
];

const WHAT_HAPPENING_STAGES = [
  { id: 1, text: 'Searching BS 7671 maintenance requirements', icon: Wrench, activeSteps: [0, 1] },
  { id: 2, text: 'Analysing equipment risk factors', icon: AlertTriangle, activeSteps: [2, 3] },
  { id: 3, text: 'Generating maintenance tasks and schedules', icon: Calendar, activeSteps: [4, 5] },
  { id: 4, text: 'Creating compliance checklist', icon: CheckCircle, activeSteps: [6, 7] },
];

export const MaintenanceProcessingView = ({ progress, detailLevel = 'quick', startTime }: MaintenanceProcessingViewProps) => {
  const STEPS = detailLevel === 'quick' ? QUICK_STEPS : FULL_STEPS;
  const [currentStep, setCurrentStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const ESTIMATED_TIME = detailLevel === 'quick' ? 25 : 70; // seconds

  useEffect(() => {
    const stepIndex = STEPS.findIndex(step => step.text === progress);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [progress, STEPS]);

  // Time tracking
  useEffect(() => {
    if (!startTime) return;
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;
  const remainingTime = Math.max(0, ESTIMATED_TIME - elapsedTime);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl border-elec-yellow/20 bg-elec-card/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-elec-yellow/10 border border-elec-yellow/20 rounded-full mb-4 animate-pulse">
              <Loader2 className="h-8 w-8 text-elec-yellow animate-spin" />
            </div>
            <h3 className="text-2xl font-bold text-elec-light mb-2">
              Generating Your Maintenance Plan
            </h3>
            <p className="text-sm text-elec-light/60">
              {detailLevel === 'quick' ? 'This typically takes 20-45 seconds' : 'This typically takes 1-3 minutes'}
            </p>
          </div>

          {/* Time Tracker */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-elec-dark/30 border border-elec-yellow/10 rounded-lg p-3 text-center">
              <div className="text-xs text-elec-light/50 mb-1">Elapsed</div>
              <div className="text-lg font-bold text-elec-yellow">{formatTime(elapsedTime)}</div>
            </div>
            <div className="bg-elec-dark/30 border border-elec-yellow/10 rounded-lg p-3 text-center">
              <div className="text-xs text-elec-light/50 mb-1">Remaining</div>
              <div className="text-lg font-bold text-elec-light">{formatTime(remainingTime)}</div>
            </div>
            <div className="bg-elec-dark/30 border border-elec-yellow/10 rounded-lg p-3 text-center">
              <div className="text-xs text-elec-light/50 mb-1">Total</div>
              <div className="text-lg font-bold text-elec-light/70">{formatTime(ESTIMATED_TIME)}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-elec-light/70">Progress</span>
              <span className="text-sm font-bold text-elec-yellow">{Math.round(progressPercent)}%</span>
            </div>
            <div className="h-2 bg-elec-dark/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow to-amber-500 transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* What's Happening Section */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-elec-light mb-3">What's Happening?</h4>
            <div className="space-y-2">
              {WHAT_HAPPENING_STAGES.map((stage) => {
                const isActive = stage.activeSteps.includes(currentStep);
                const isComplete = currentStep > Math.max(...stage.activeSteps);
                
                return (
                  <div
                    key={stage.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                        : isComplete
                        ? 'bg-elec-dark/20'
                        : 'bg-elec-dark/10 opacity-40'
                    }`}
                  >
                    <div className="flex items-center justify-center w-6 h-6 shrink-0">
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-green-400" />
                      ) : isActive ? (
                        <stage.icon className="h-4 w-4 text-elec-yellow" />
                      ) : (
                        <stage.icon className="h-4 w-4 text-elec-light/30" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        isActive
                          ? 'text-elec-yellow'
                          : isComplete
                          ? 'text-elec-light/60'
                          : 'text-elec-light/30'
                      }`}
                    >
                      {stage.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {STEPS.map((step, index) => {
              const isComplete = index < currentStep;
              const isCurrent = index === currentStep;
              const isPending = index > currentStep;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isCurrent
                      ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                      : isComplete
                      ? 'bg-elec-dark/30'
                      : 'bg-elec-dark/10 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-center w-8 h-8 shrink-0">
                    {isComplete ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                    ) : (
                      <span className="text-xl">{step.icon}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      isCurrent
                        ? 'text-elec-yellow'
                        : isComplete
                        ? 'text-elec-light/70'
                        : 'text-elec-light/40'
                    }`}
                  >
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-elec-light/50">
              Powered by AI • BS 7671:2018+A3:2024 Compliant
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
