import { AlertTriangle, AlertCircle, CheckCircle2, Lightbulb, XCircle, BookOpen, ArrowLeft, FileText, Image as ImageIcon, PoundSterling, MessageSquare, Clock } from "lucide-react";
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
  imageUrls?: string[];
  onStartOver: () => void;
}

const FaultDiagnosisView = ({ diagnosis, eicrDefects, imageUrl, imageUrls, onStartOver }: FaultDiagnosisViewProps) => {
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
              {isCompliantPhoto ? 'Photo Analysis' : eicrDefects && eicrDefects.length > 0 ? 'EICR Photo Analysis' : 'Fault Diagnosis'}
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

        {/* Uploaded Photos Display */}
        {(imageUrls && imageUrls.length > 0) || imageUrl ? (
          <Card className="bg-elec-dark/80 border-2 border-blue-500/30 p-5 sm:p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white flex items-center gap-2 text-left">
                <ImageIcon className="h-6 w-6 text-blue-400" />
                Installation Photo{(imageUrls && imageUrls.length > 1) ? 's' : ''}
                {imageUrls && imageUrls.length > 0 && (
                  <Badge className="ml-2 bg-blue-500/20 text-blue-300 border-blue-500/50">
                    {imageUrls.length} Photo{imageUrls.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </h3>
              
              {/* Photo Gallery */}
              {imageUrls && imageUrls.length > 1 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden bg-black/50 border border-blue-500/20">
                      <img 
                        src={url} 
                        alt={`Installation photo ${index + 1}`} 
                        className="w-full h-auto aspect-video object-cover"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white font-medium">
                        Photo #{index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden bg-black/50">
                  <img 
                    src={imageUrls?.[0] || imageUrl!} 
                    alt="Installation photo" 
                    className="w-full h-auto max-h-[300px] sm:max-h-[400px] object-contain"
                  />
                </div>
              )}
            </div>
          </Card>
        ) : null}

        {/* Compliant Installation Banner (NONE classification) */}
        {isCompliantPhoto && eicrDefects[0] && (
          <Card className="bg-green-500/20 border-2 border-green-500/50 p-6 sm:p-7 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-white/10 rounded-lg">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-400/80" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
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
                          <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
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
          <Card className="bg-red-500/20 border-2 border-red-500/50 p-6 sm:p-7 shadow-xl">
            <div className="space-y-4">
              {/* Mobile: Icon centered on top, Desktop: Icon on left */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="flex-shrink-0 p-5 sm:p-4 bg-white/10 rounded-2xl sm:rounded-lg">
                  <RiskIcon className="h-12 w-12 sm:h-8 sm:w-8 text-red-400/80" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-2 mb-4 sm:mb-3">
                    <Badge className="bg-white/30 text-white border-none text-lg sm:text-base px-5 py-2 sm:px-4 sm:py-1.5 font-bold">
                      {diagnosis.faultSummary.safetyRisk} RISK
                    </Badge>
                    <h3 className="text-2xl sm:text-xl font-bold text-white">Safety Critical Issue</h3>
                  </div>
                  {diagnosis.faultSummary.immediateAction && (
                    <div className="space-y-2">
                      <p className="text-lg sm:text-base text-white font-bold">Immediate Action:</p>
                      <p className="text-lg sm:text-base text-white leading-relaxed">
                        {diagnosis.faultSummary.immediateAction}
                      </p>
                    </div>
                  )}
                </div>
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

        {/* Fault Summary - ENHANCED */}
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
                  
                  {/* Secondary Symptoms */}
                  {diagnosis.faultSummary.secondarySymptoms && diagnosis.faultSummary.secondarySymptoms.length > 0 && (
                    <div className="mb-6 sm:mb-5">
                      <h4 className="text-base font-bold text-white mb-2">Also Look For:</h4>
                      <ul className="space-y-1 text-left">
                        {diagnosis.faultSummary.secondarySymptoms.map((symptom, idx) => (
                          <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                            <span className="text-blue-400">•</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

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

              {/* Risk Details */}
              <div className="space-y-3 pt-5 sm:pt-4 border-t-2 border-white/10">
                <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center sm:justify-start gap-3">
                  <span className="text-lg sm:text-base text-white font-bold sm:font-medium">Safety Risk:</span>
                  <Badge className={`${risk.color} text-white border-none text-lg sm:text-base px-6 py-3 sm:px-4 sm:py-2 rounded-full`}>
                    {diagnosis.faultSummary.safetyRisk}
                  </Badge>
                </div>

                {diagnosis.faultSummary.riskToOccupants && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                    <h5 className="text-sm font-semibold text-red-300 mb-1">Risk to Occupants</h5>
                    <p className="text-sm text-white/80">{diagnosis.faultSummary.riskToOccupants}</p>
                  </div>
                )}

                {diagnosis.faultSummary.riskToProperty && (
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                    <h5 className="text-sm font-semibold text-amber-300 mb-1">Risk to Property</h5>
                    <p className="text-sm text-white/80">{diagnosis.faultSummary.riskToProperty}</p>
                  </div>
                )}

                {diagnosis.faultSummary.typicalRepairTime && (
                  <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-semibold text-blue-300">Typical Repair Time:</span>
                    <span className="text-sm text-white/80">{diagnosis.faultSummary.typicalRepairTime}</span>
                  </div>
                )}
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

        {/* Cost Estimate */}
        {diagnosis && diagnosis.costEstimate && (
          <Card className="bg-elec-dark/80 border-2 border-green-500/30 p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <PoundSterling className="h-7 w-7 text-green-400" />
              Cost Estimate
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-base text-white/70">Materials</span>
                <span className="text-lg font-semibold text-white">{diagnosis.costEstimate.materials}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base text-white/70">Labour</span>
                <span className="text-lg font-semibold text-white">{diagnosis.costEstimate.labour}</span>
              </div>
              <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-white">Total</span>
                <span className="text-xl font-bold text-green-400">{diagnosis.costEstimate.total}</span>
              </div>
              {diagnosis.costEstimate.notes && (
                <p className="text-sm text-white/70 italic pt-2">{diagnosis.costEstimate.notes}</p>
              )}
            </div>
          </Card>
        )}

        {/* Client Communication */}
        {diagnosis && diagnosis.clientCommunication && (
          <Card className="bg-elec-dark/80 border-2 border-purple-500/30 p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <MessageSquare className="h-7 w-7 text-purple-400" />
              Client Communication
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Summary for Client</h4>
                <p className="text-base text-white/80 leading-relaxed">{diagnosis.clientCommunication.summary}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Why This Matters</h4>
                <p className="text-base text-white/80 leading-relaxed">{diagnosis.clientCommunication.urgencyExplanation}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-2">What to Expect</h4>
                <p className="text-base text-white/80 leading-relaxed">{diagnosis.clientCommunication.whatToExpect}</p>
              </div>
              {diagnosis.clientCommunication.quotationNotes && (
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-purple-300 mb-1">Quotation Notes</h4>
                  <p className="text-sm text-white/80">{diagnosis.clientCommunication.quotationNotes}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Documentation Requirements */}
        {diagnosis && diagnosis.documentationRequirements && (
          <Card className="bg-elec-dark/80 border-2 border-blue-500/30 p-5 sm:p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
              <FileText className="h-7 w-7 text-blue-400" />
              Documentation Requirements
            </h2>
            <div className="space-y-4">
              {diagnosis.documentationRequirements.testsToRecord && diagnosis.documentationRequirements.testsToRecord.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Tests to Record</h4>
                  <ul className="space-y-1">
                    {diagnosis.documentationRequirements.testsToRecord.map((test, idx) => (
                      <li key={idx} className="text-base text-white/80 flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {diagnosis.documentationRequirements.certificatesNeeded && diagnosis.documentationRequirements.certificatesNeeded.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-blue-300 mb-2">Certificates Needed</h4>
                  <div className="flex flex-wrap gap-2">
                    {diagnosis.documentationRequirements.certificatesNeeded.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-blue-300 border-blue-500/50">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {diagnosis.documentationRequirements.notesForEIC && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <h4 className="text-sm font-semibold text-blue-300 mb-1">Notes for EIC/EICR</h4>
                  <p className="text-sm text-white/80">{diagnosis.documentationRequirements.notesForEIC}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Additional Context - DEFAULT EXPANDED */}
        {diagnosis && diagnosis.additionalContext && (
          <Accordion type="single" collapsible defaultValue="mistakes" className="space-y-3">
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
                        <span className="text-amber-500/70 text-xl">•</span>
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
                        <Lightbulb className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
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
