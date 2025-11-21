import { AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, XCircle, BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import DiagnosticStepCard from "./DiagnosticStepCard";
import CorrectiveActionCard from "./CorrectiveActionCard";
import LockoutTagoutPanel from "./LockoutTagoutPanel";
import type { FaultDiagnosis } from "@/types/commissioning-response";

interface FaultDiagnosisViewProps {
  diagnosis: FaultDiagnosis;
  onStartOver: () => void;
}

const FaultDiagnosisView = ({ diagnosis, onStartOver }: FaultDiagnosisViewProps) => {
  const riskConfig = {
    CRITICAL: { color: 'bg-red-500', textColor: 'text-red-100', icon: AlertTriangle },
    HIGH: { color: 'bg-orange-500', textColor: 'text-orange-100', icon: AlertTriangle },
    MODERATE: { color: 'bg-amber-500', textColor: 'text-amber-100', icon: AlertCircle },
    LOW: { color: 'bg-green-500', textColor: 'text-green-100', icon: CheckCircle2 }
  };

  const risk = riskConfig[diagnosis.faultSummary.safetyRisk];
  const RiskIcon = risk.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark to-blue-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Fault Diagnosis</h1>
            <p className="text-sm sm:text-base text-white/70">Structured troubleshooting workflow</p>
          </div>
          <Button onClick={onStartOver} variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </div>

        {/* Safety Alert Banner */}
        {(diagnosis.faultSummary.safetyRisk === 'HIGH' || diagnosis.faultSummary.safetyRisk === 'CRITICAL') && (
          <Card className={`${risk.color} border-none p-5 sm:p-6`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-white/20 rounded-lg">
                <RiskIcon className={`h-6 w-6 sm:h-8 sm:w-8 ${risk.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/30 text-white border-none">
                    {diagnosis.faultSummary.safetyRisk} RISK
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Safety Critical Issue</h3>
                </div>
                {diagnosis.faultSummary.immediateAction && (
                  <p className="text-sm sm:text-base text-white/90 font-medium">
                    Immediate Action: {diagnosis.faultSummary.immediateAction}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Fault Summary */}
        <Card className="bg-elec-dark/80 border-blue-500/30 p-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 p-2 rounded-lg ${risk.color}`}>
                <RiskIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Reported Symptom</h3>
                <p className="text-base text-white/80 mb-4">{diagnosis.faultSummary.reportedSymptom}</p>
                
                <h4 className="text-sm font-semibold text-white/70 mb-2">Likely Root Causes</h4>
                <ol className="space-y-2">
                  {diagnosis.faultSummary.likelyRootCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-xs font-semibold text-blue-300">
                        {idx + 1}
                      </span>
                      <span className="flex-1 pt-0.5">{cause}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/10">
              <span className="text-sm text-white/60">Safety Risk:</span>
              <Badge className={`${risk.color} text-white border-none`}>
                {diagnosis.faultSummary.safetyRisk}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Diagnostic Workflow */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-blue-400" />
            Diagnostic Workflow
          </h2>
          <div className="space-y-3">
            {diagnosis.diagnosticWorkflow.map((step) => (
              <DiagnosticStepCard key={step.stepNumber} step={step} />
            ))}
          </div>
        </div>

        {/* Lockout/Tagout */}
        {diagnosis.lockoutTagout && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Isolation Requirements
            </h2>
            <LockoutTagoutPanel lockoutTagout={diagnosis.lockoutTagout} />
          </div>
        )}

        {/* Corrective Actions */}
        {diagnosis.correctiveActions.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Corrective Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {diagnosis.correctiveActions.map((action, idx) => (
                <CorrectiveActionCard key={idx} action={action} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Additional Context */}
        {diagnosis.additionalContext && (
          <Accordion type="single" collapsible className="space-y-2">
            {diagnosis.additionalContext.commonMistakes && diagnosis.additionalContext.commonMistakes.length > 0 && (
              <AccordionItem value="mistakes" className="bg-elec-dark/80 border-amber-500/30 rounded-lg px-5">
                <AccordionTrigger className="text-white hover:text-white/80">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-amber-400" />
                    <span>Common Mistakes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pt-2">
                    {diagnosis.additionalContext.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="text-amber-400">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {diagnosis.additionalContext.proTips && diagnosis.additionalContext.proTips.length > 0 && (
              <AccordionItem value="tips" className="bg-elec-dark/80 border-blue-500/30 rounded-lg px-5">
                <AccordionTrigger className="text-white hover:text-white/80">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-blue-400" />
                    <span>Pro Tips</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pt-2">
                    {diagnosis.additionalContext.proTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="text-blue-400">💡</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {diagnosis.additionalContext.regulations && diagnosis.additionalContext.regulations.length > 0 && (
              <AccordionItem value="regs" className="bg-elec-dark/80 border-green-500/30 rounded-lg px-5">
                <AccordionTrigger className="text-white hover:text-white/80">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    <span>Relevant Regulations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {diagnosis.additionalContext.regulations.map((reg, idx) => (
                      <Badge key={idx} variant="outline" className="text-green-300 border-green-500/50">
                        {reg}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}

        {/* Footer */}
        <div className="flex justify-center pt-6">
          <Button onClick={onStartOver} variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Start New Diagnosis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaultDiagnosisView;
