import { AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, XCircle, BookOpen, ArrowLeft, FileText, Image as ImageIcon } from "lucide-react";
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
import EICRCriticalAlertBanner from "./EICRCriticalAlertBanner";
import type { FaultDiagnosis } from "@/types/commissioning-response";

interface FaultDiagnosisViewProps {
  diagnosis: FaultDiagnosis | null;
  eicrDefects?: EICRDefect[];
  imageUrl?: string | null;
  onStartOver: () => void;
}

const FaultDiagnosisView = ({ diagnosis, eicrDefects, imageUrl, onStartOver }: FaultDiagnosisViewProps) => {
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
    <div className="min-h-screen sm:bg-elec-gray py-4 px-0 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {isCompliantPhoto ? '📸 Photo Analysis' : eicrDefects && eicrDefects.length > 0 ? '📸 EICR Photo Analysis' : 'Fault Diagnosis'}
            </h1>
            <p className="text-base text-white/90">
              {isCompliantPhoto ? 'Installation appears compliant' : eicrDefects && eicrDefects.length > 0 ? 'EICR defect coding with BS 7671 compliance' : 'Structured troubleshooting workflow'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {eicrDefects && eicrDefects.length > 0 && (
              <Button 
                onClick={() => setShowEICRCodes(!showEICRCodes)}
                variant={showEICRCodes ? "default" : "outline"}
                size="lg" 
                className="gap-2 min-h-[48px]"
              >
                <FileText className="h-5 w-5" />
                <span className="hidden sm:inline">EICR Codes</span>
              </Button>
            )}
            <Button onClick={onStartOver} variant="outline" size="lg" className="gap-2 min-h-[48px]">
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Back</span>
            </Button>
          </div>
        </div>

        {/* Critical Alert Banner */}
        {eicrDefects && eicrDefects.length > 0 && !isCompliantPhoto && eicrDefects[0].classification !== 'NONE' && (
          <EICRCriticalAlertBanner
            classification={eicrDefects[0].classification as 'C1' | 'C2' | 'C3' | 'FI'}
            confidenceScore={eicrDefects[0].confidenceAssessment?.score || 
                            (eicrDefects[0].confidenceAssessment?.level === 'high' ? 90 : 
                             eicrDefects[0].confidenceAssessment?.level === 'medium' ? 70 : 50)}
            primaryDefect={eicrDefects[0].defectSummary}
            urgency={eicrDefects[0].classification === 'C1' ? 'Immediate isolation required' :
                    eicrDefects[0].classification === 'C2' ? 'Urgent rectification needed' :
                    eicrDefects[0].classification === 'C3' ? 'Improvement recommended' :
                    'Further investigation required'}
          />
        )}

        {/* Uploaded Photo Display */}
        {imageUrl && (
          <Card className="bg-elec-dark/80 border-2 border-blue-500/30 p-5 sm:p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 text-left">
                <ImageIcon className="h-6 w-6 text-blue-400" />
                Installation Photo
              </h3>
              <div className="relative rounded-lg overflow-hidden bg-black/50">
                <img 
                  src={imageUrl} 
                  alt="Installation photo" 
                  className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Compliant Installation Banner (NONE classification) */}
        {isCompliantPhoto && eicrDefects[0] && (
          <Card className="bg-green-500 border-none p-6 sm:p-7 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-white/20 rounded-lg">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-100" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/30 text-white border-none text-base px-4 py-1.5">
                    NO DEFECTS FOUND
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-left">Installation Appears Compliant</h3>
                </div>
                <p className="text-base text-white mb-4 text-left leading-relaxed">
                  {eicrDefects[0].compliantSummary || eicrDefects[0].defectSummary}
                </p>
                {eicrDefects[0].goodPracticeNotes && eicrDefects[0].goodPracticeNotes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white text-left">Good Practice Observed:</p>
                    <ul className="space-y-2">
                      {eicrDefects[0].goodPracticeNotes.map((note: string, idx: number) => (
                        <li key={idx} className="text-base text-white flex items-start gap-2 text-left leading-relaxed">
                          <span className="text-green-300 text-xl">✓</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-5 pt-4 border-t border-white/20">
                  <p className="text-sm text-white/90 text-left leading-relaxed">
                    This classification adds credibility to the AI system. If an installation is compliant, we'll say so.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Safety Alert Banner */}
        {diagnosis && risk && (diagnosis.faultSummary.safetyRisk === 'HIGH' || diagnosis.faultSummary.safetyRisk === 'CRITICAL') && (
          <Card className={`${risk.color} border-none p-6 sm:p-7 shadow-xl`}>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-white/20 rounded-lg">
                <RiskIcon className={`h-8 w-8 sm:h-10 sm:w-10 ${risk.textColor}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-white/30 text-white border-none text-base px-4 py-1.5">
                    {diagnosis.faultSummary.safetyRisk} RISK
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-white text-left">Safety Critical Issue</h3>
                </div>
                {diagnosis.faultSummary.immediateAction && (
                  <p className="text-base text-white font-semibold text-left leading-relaxed">
                    Immediate Action: {diagnosis.faultSummary.immediateAction}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* EICR Defect Codes */}
        {eicrDefects && eicrDefects.length > 0 && showEICRCodes && !isCompliantPhoto && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">EICR Defect Analysis</h2>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 text-base px-4 py-1.5">
                {eicrDefects.length} Defect{eicrDefects.length > 1 ? 's' : ''}
              </Badge>
            </div>
            <div className="space-y-5">
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

        {/* Fault Summary - ALWAYS EXPANDED */}
        {diagnosis && risk && (
          <Card className="bg-elec-dark/80 border-2 border-blue-500/30 p-5 sm:p-7 shadow-lg">
            <div className="space-y-6">
              {/* Mobile: Icon on top, centered. Desktop: Icon on left */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className={`flex-shrink-0 p-4 sm:p-3 rounded-xl sm:rounded-lg ${risk.color}`}>
                  <RiskIcon className="h-10 w-10 sm:h-6 sm:w-6 text-white" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="text-2xl sm:text-xl font-bold text-white mb-4 sm:mb-3">Reported Symptom</h3>
                  <p className="text-lg sm:text-base text-white mb-6 sm:mb-5 leading-relaxed">{diagnosis.faultSummary.reportedSymptom}</p>
                  
                  <h4 className="text-xl sm:text-base font-bold text-white mb-5 sm:mb-3">Likely Root Causes</h4>
                  <ol className="space-y-4 sm:space-y-3 text-left">
                    {diagnosis.faultSummary.likelyRootCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-4 sm:gap-3 text-lg sm:text-base text-white leading-relaxed">
                        <span className="flex-shrink-0 w-9 h-9 sm:w-7 sm:h-7 rounded-full bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center text-base sm:text-sm font-bold text-blue-300">
                          {idx + 1}
                        </span>
                        <span className="flex-1 pt-1 sm:pt-0.5">{cause}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-3 pt-5 sm:pt-4 border-t-2 border-white/10">
                <span className="text-lg sm:text-base text-white font-bold sm:font-medium">Safety Risk:</span>
                <Badge className={`${risk.color} text-white border-none text-lg sm:text-base px-6 py-3 sm:px-4 sm:py-2 rounded-full`}>
                  {diagnosis.faultSummary.safetyRisk}
                </Badge>
              </div>
            </div>
          </Card>
        )}

        {/* Diagnostic Workflow - First Step EXPANDED */}
        {diagnosis && diagnosis.diagnosticWorkflow && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="h-7 w-7 text-blue-400" />
              Diagnostic Workflow
            </h2>
            <div className="space-y-4">
              {diagnosis.diagnosticWorkflow.map((step) => (
                <DiagnosticStepCard key={step.stepNumber} step={step} />
              ))}
            </div>
          </div>
        )}

        {/* Lockout/Tagout - ALWAYS EXPANDED if Required */}
        {diagnosis && diagnosis.lockoutTagout && diagnosis.lockoutTagout.required && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="h-7 w-7 text-red-400" />
              Isolation Requirements
            </h2>
            <LockoutTagoutPanel lockoutTagout={diagnosis.lockoutTagout} />
          </div>
        )}

        {/* Corrective Actions */}
        {diagnosis && diagnosis.correctiveActions && diagnosis.correctiveActions.length > 0 && (
          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-white">Corrective Actions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {diagnosis.correctiveActions.map((action, idx) => (
                <CorrectiveActionCard key={idx} action={action} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Additional Context */}
        {diagnosis && diagnosis.additionalContext && (
          <Accordion type="single" collapsible className="space-y-3">
            {diagnosis.additionalContext.commonMistakes && diagnosis.additionalContext.commonMistakes.length > 0 && (
              <AccordionItem value="mistakes" className="bg-elec-dark/80 border-2 border-amber-500/30 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-amber-400" />
                    <span className="text-lg font-semibold">Common Mistakes</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pt-2">
                    {diagnosis.additionalContext.commonMistakes.map((mistake, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                        <span className="text-amber-400 text-xl">•</span>
                        <span className="text-left">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {diagnosis.additionalContext.proTips && diagnosis.additionalContext.proTips.length > 0 && (
              <AccordionItem value="tips" className="bg-elec-dark/80 border-2 border-blue-500/30 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-blue-400" />
                    <span className="text-lg font-semibold">Pro Tips</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3 pt-2">
                    {diagnosis.additionalContext.proTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-base text-white leading-relaxed">
                        <span className="text-blue-400 text-xl">💡</span>
                        <span className="text-left">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )}

            {diagnosis.additionalContext.regulations && diagnosis.additionalContext.regulations.length > 0 && (
              <AccordionItem value="regs" className="bg-elec-dark/80 border-2 border-green-500/30 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-green-400" />
                    <span className="text-lg font-semibold">Relevant Regulations</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {diagnosis.additionalContext.regulations.map((reg, idx) => (
                      <Badge key={idx} variant="outline" className="text-green-300 border-green-500/50 text-base px-3 py-1.5">
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
          <Button onClick={onStartOver} variant="outline" size="lg" className="gap-2 min-h-[48px]">
            <ArrowLeft className="h-5 w-5" />
            Start New Diagnosis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FaultDiagnosisView;
