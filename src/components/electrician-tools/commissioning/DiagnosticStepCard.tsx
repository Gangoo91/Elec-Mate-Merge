import { AlertTriangle, CheckCircle2, AlertCircle, Wrench, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import type { DiagnosticStep } from "@/types/commissioning-response";

interface DiagnosticStepCardProps {
  step: DiagnosticStep;
}

const DiagnosticStepCard = ({ step }: DiagnosticStepCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ragConfig = {
    RED: {
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500',
      textColor: 'text-red-300',
      icon: AlertTriangle,
      label: 'Critical'
    },
    AMBER: {
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500',
      textColor: 'text-amber-300',
      icon: AlertCircle,
      label: 'Investigation Required'
    },
    GREEN: {
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      textColor: 'text-green-300',
      icon: CheckCircle2,
      label: 'Normal Check'
    }
  };

  const config = ragConfig[step.ragStatus];
  const StatusIcon = config.icon;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className={`${config.bgColor} border-2 ${config.borderColor} overflow-hidden`}>
        <CollapsibleTrigger className="w-full p-4 sm:p-5 text-left hover:bg-white/5 transition-colors">
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 p-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
              <StatusIcon className={`h-5 w-5 ${config.textColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="outline" className={`${config.textColor} ${config.borderColor}`}>
                  Step {step.stepNumber}
                </Badge>
                <Badge variant="outline" className={`${config.textColor} ${config.borderColor}`}>
                  {config.label}
                </Badge>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
                {step.stepTitle}
              </h4>
              <p className="text-sm text-white/70 line-clamp-2">
                {step.action}
              </p>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-4 border-t border-white/10 pt-4 mt-2">
            {/* Action */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-400" />
                <h5 className="text-sm font-semibold text-white">Action Required</h5>
              </div>
              <p className="text-sm text-white/80 ml-6">{step.action}</p>
            </div>

            {/* What to Test */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-blue-400" />
                <h5 className="text-sm font-semibold text-white">What to Test</h5>
              </div>
              <p className="text-sm text-white/80 ml-6">{step.whatToTest}</p>
            </div>

            {/* Expected Readings */}
            {(step.whatToMeasure || step.expectedReading || step.acceptableRange) && (
              <div className="bg-elec-dark/50 rounded-lg p-4 space-y-2">
                <h5 className="text-sm font-semibold text-white mb-2">Expected Readings</h5>
                {step.whatToMeasure && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs text-white/60 sm:min-w-[120px]">Measurement:</span>
                    <span className="text-sm text-white font-mono">{step.whatToMeasure}</span>
                  </div>
                )}
                {step.expectedReading && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs text-white/60 sm:min-w-[120px]">Expected:</span>
                    <span className="text-sm text-green-400 font-mono font-semibold">{step.expectedReading}</span>
                  </div>
                )}
                {step.acceptableRange && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs text-white/60 sm:min-w-[120px]">Acceptable Range:</span>
                    <span className="text-sm text-blue-400 font-mono">{step.acceptableRange}</span>
                  </div>
                )}
              </div>
            )}

            {/* Instrument Setup */}
            {step.instrumentSetup && (
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-white">Instrument Setup</h5>
                <p className="text-sm text-white/80 bg-elec-dark/50 rounded-lg p-3 font-mono text-xs">
                  {step.instrumentSetup}
                </p>
              </div>
            )}

            {/* Safety Warnings */}
            {step.safetyWarnings && step.safetyWarnings.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <h5 className="text-sm font-semibold text-red-300">Safety Warnings</h5>
                </div>
                <ul className="space-y-1">
                  {step.safetyWarnings.map((warning, idx) => (
                    <li key={idx} className="text-sm text-red-200 flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span className="text-left">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* If Failed */}
            {step.ifFailed && (
              <div className="space-y-2">
                <h5 className="text-sm font-semibold text-amber-300">If Check Fails</h5>
                <p className="text-sm text-white/80 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  {step.ifFailed}
                </p>
              </div>
            )}

            {/* Regulation */}
            {step.regulation && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <Badge variant="outline" className="text-blue-300 border-blue-500/50">
                  {step.regulation}
                </Badge>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default DiagnosticStepCard;
