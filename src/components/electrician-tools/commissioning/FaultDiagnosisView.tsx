import { AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, XCircle, BookOpen, ArrowLeft, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import DiagnosticStepCard from "./DiagnosticStepCard";
import CorrectiveActionCard from "./CorrectiveActionCard";
import LockoutTagoutPanel from "./LockoutTagoutPanel";
import EICRDefectCard, { type EICRDefect } from "./EICRDefectCard";
import EICRDefectCardEnhanced from "./EICRDefectCardEnhanced";
import type { FaultDiagnosis } from "@/types/commissioning-response";

interface FaultDiagnosisViewProps {
  diagnosis: FaultDiagnosis | null;
  eicrDefects?: EICRDefect[];
  onStartOver: () => void;
}

const FaultDiagnosisView = ({ diagnosis, eicrDefects, onStartOver }: FaultDiagnosisViewProps) => {
  const [showEICRCodes, setShowEICRCodes] = useState(true);
  
  // Check if this is a NONE classification (compliant installation)
  const isCompliantPhoto = eicrDefects?.length === 1 && eicrDefects[0].classification === 'NONE';
  
  const riskConfig = {
    CRITICAL: { color: 'bg-red-500', textColor: 'text-red-100', icon: AlertTriangle },
    HIGH: { color: 'bg-orange-500', textColor: 'text-orange-100', icon: AlertTriangle },
    MODERATE: { color: 'bg-amber-500', textColor: 'text-amber-100', icon: AlertCircle },
    LOW: { color: 'bg-green-500', textColor: 'text-green-100', icon: CheckCircle2 }
  };

  const risk = diagnosis ? riskConfig[diagnosis.faultSummary.safetyRisk] : null;
  const RiskIcon = risk?.icon;

  return (
    <div className="min-h-screen bg-elec-gray p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isCompliantPhoto ? '📸 Photo Analysis' : eicrDefects && eicrDefects.length > 0 ? '📸 EICR Photo Analysis' : 'Fault Diagnosis'}
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              {isCompliantPhoto ? 'Installation appears compliant' : eicrDefects && eicrDefects.length > 0 ? 'EICR defect coding with BS 7671 compliance' : 'Structured troubleshooting workflow'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {eicrDefects && eicrDefects.length > 0 && (
              <Button 
                onClick={() => setShowEICRCodes(!showEICRCodes)}
                variant={showEICRCodes ? "default" : "outline"}
                size="sm" 
                className="gap-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">EICR Codes</span>
              </Button>
            )}
            <Button onClick={onStartOver} variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
        </div>

        {/* Compliant Installation Banner (NONE classification) */}
        {isCompliantPhoto && eicrDefects[0] && (
          <Card className="bg-green-500 border-none p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-white/20 rounded-lg">
                <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-100" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/30 text-white border-none">
                    NO DEFECTS FOUND
                  </Badge>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Installation Appears Compliant</h3>
                </div>
                <p className="text-sm sm:text-base text-white/90 mb-3">
                  {eicrDefects[0].compliantSummary || eicrDefects[0].defectSummary}
                </p>
                {eicrDefects[0].goodPracticeNotes && eicrDefects[0].goodPracticeNotes.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white/80">Good Practice Observed:</p>
                    <ul className="space-y-1">
                      {eicrDefects[0].goodPracticeNotes.map((note: string, idx: number) => (
                        <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                          <span className="text-green-300">✓</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-4 pt-3 border-t border-white/20">
                  <p className="text-xs text-white/70">
                    This classification adds credibility to the AI system. If an installation is compliant, we'll say so.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Safety Alert Banner */}
        {diagnosis && risk && (diagnosis.faultSummary.safetyRisk === 'HIGH' || diagnosis.faultSummary.safetyRisk === 'CRITICAL') && (
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

        {/* EICR Defect Codes */}
        {eicrDefects && eicrDefects.length > 0 && showEICRCodes && !isCompliantPhoto && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">EICR Defect Analysis</h2>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                {eicrDefects.length} Defect{eicrDefects.length > 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="space-y-4">
              {eicrDefects.map((defect, idx) => (
                // Use enhanced card if defect has makingSafe or clientCommunication
                defect.makingSafe || defect.clientCommunication ? (
                  <EICRDefectCardEnhanced key={idx} defect={defect} />
                ) : (
                  <EICRDefectCard key={idx} defect={defect} />
                )
              ))}
            </div>
          </div>
        )}

        {/* Fault Summary */}
        {diagnosis && risk && (
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
        )}

        {/* Diagnostic Workflow */}
        {diagnosis && diagnosis.diagnosticWorkflow && (
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
        )}

        {/* Lockout/Tagout */}
        {diagnosis && diagnosis.lockoutTagout && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-400" />
              Isolation Requirements
            </h2>
            <LockoutTagoutPanel lockoutTagout={diagnosis.lockoutTagout} />
          </div>
        )}

        {/* Corrective Actions */}
        {diagnosis && diagnosis.correctiveActions && diagnosis.correctiveActions.length > 0 && (
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
        {diagnosis && diagnosis.additionalContext && (
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
