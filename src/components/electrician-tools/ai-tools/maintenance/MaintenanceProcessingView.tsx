import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface MaintenanceProcessingViewProps {
  progress: string;
}

const STEPS = [
  { id: 1, text: 'Analysing equipment details...', icon: '📋' },
  { id: 2, text: 'Searching BS 7671 & GN3 regulations...', icon: '📚' },
  { id: 3, text: 'Calculating risk scores...', icon: '📊' },
  { id: 4, text: 'Generating maintenance tasks...', icon: '🛠️' },
  { id: 5, text: 'Estimating costs & durations...', icon: '💷' },
  { id: 6, text: 'Identifying failure modes...', icon: '⚠️' },
  { id: 7, text: 'Creating compliance checklist...', icon: '✅' },
  { id: 8, text: 'Finalizing maintenance plan...', icon: '📄' },
];

export const MaintenanceProcessingView = ({ progress }: MaintenanceProcessingViewProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepIndex = STEPS.findIndex(step => step.text === progress);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
    }
  }, [progress]);

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
              This typically takes 8-12 seconds
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="h-2 bg-elec-dark/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/60 transition-all duration-700 ease-out"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
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
