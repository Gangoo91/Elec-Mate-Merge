import { AlertTriangle, Search, Wrench, ArrowLeft, FileText, Image as ImageIcon, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import EICRDefectCard, { type EICRDefect } from "./EICRDefectCard";
import EICRDefectCardEnhanced from "./EICRDefectCardEnhanced";
import EICRCriticalAlertBanner from "./EICRCriticalAlertBanner";
import { FaultDiagnosisHeroSummary } from "./redesign/FaultDiagnosisHeroSummary";
import { FaultDiagnosisSection } from "./redesign/FaultDiagnosisSection";
import { FaultDiagnosisStepCard } from "./redesign/FaultDiagnosisStepCard";
import { CorrectiveActionStepCard } from "./redesign/CorrectiveActionStepCard";
import { useFaultDiagnosisProgress } from "@/hooks/useFaultDiagnosisProgress";
import type { FaultDiagnosis } from "@/types/commissioning-response";

interface FaultDiagnosisViewProps {
  diagnosis: FaultDiagnosis | null;
  eicrDefects?: EICRDefect[];
  imageUrl?: string | null;
  imageUrls?: string[];
  originalQuery?: string;
  onStartOver: () => void;
  projectName?: string;
  location?: string;
  clientName?: string;
  installationType?: string;
}

const FaultDiagnosisView = ({ 
  diagnosis, 
  eicrDefects, 
  imageUrl, 
  imageUrls,
  originalQuery, 
  onStartOver,
  projectName,
  location,
  clientName,
  installationType
}: FaultDiagnosisViewProps) => {
  const [showEICRCodes, setShowEICRCodes] = useState(true);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const { toast } = useToast();
  
  // Progress tracking for diagnostic workflow
  const { toggleStepComplete, isStepCompleted, getCompletionStats } = useFaultDiagnosisProgress();
  
  const totalDiagnosticSteps = diagnosis?.diagnosticWorkflow?.length || 0;
  const { completed: completedSteps, percentage: completionPercentage } = getCompletionStats(totalDiagnosticSteps);
  
  // Check if this is a NONE classification (compliant installation)
  const isCompliantPhoto = eicrDefects?.length === 1 && eicrDefects[0].classification === 'NONE';

  const handleExportPDF = async () => {
    if (!diagnosis) {
      toast({
        title: "No Data",
        description: "Cannot export PDF without fault diagnosis data.",
        variant: "destructive"
      });
      return;
    }

    setIsExportingPDF(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-fault-diagnosis-pdf', {
        body: {
          faultDiagnosisData: {
            projectName: projectName || 'Fault Diagnosis Report',
            location: location || 'Not specified',
            clientName: clientName || 'Not specified',
            installationType: installationType || 'General',
            structuredDiagnosis: diagnosis
          }
        }
      });

      if (error) throw error;

      if (data?.success && data?.downloadUrl) {
        window.open(data.downloadUrl, '_blank');
        toast({
          title: "PDF Generated",
          description: "Your fault diagnosis PDF has been generated successfully."
        });
      } else if (data?.useFallback) {
        toast({
          title: "PDF Service Unavailable",
          description: data.message || "PDF generation service is not configured.",
          variant: "destructive"
        });
      } else {
        throw new Error('PDF generation failed');
      }
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Export Failed",
        description: error instanceof Error ? error.message : "Failed to generate PDF.",
        variant: "destructive"
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="min-h-screen sm:bg-elec-gray py-4 px-0 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isCompliantPhoto ? 'Photo Analysis' : eicrDefects && eicrDefects.length > 0 ? 'EICR Photo Analysis' : 'Fault Diagnosis'}
            </h1>
            <p className="text-base text-foreground/90">
              {isCompliantPhoto ? 'Installation appears compliant' : eicrDefects && eicrDefects.length > 0 ? 'EICR defect coding with BS 7671 compliance' : 'Structured troubleshooting workflow'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {diagnosis && (
              <Button 
                onClick={handleExportPDF}
                disabled={isExportingPDF}
                variant="default"
                size="lg" 
                className="gap-2 min-h-[48px] bg-elec-yellow/20 hover:bg-elec-yellow/30 text-elec-yellow border-elec-yellow/30"
              >
                <Download className="h-5 w-5" />
                <span className="hidden sm:inline">{isExportingPDF ? 'Generating...' : 'Export PDF'}</span>
              </Button>
            )}
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

        {/* Original Query Display - For fault diagnosis mode */}
        {originalQuery && diagnosis && !eicrDefects?.length && (
          <Card className="bg-gradient-to-r from-red-500/10 to-red-500/5 border-2 border-red-500/30 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground/70 mb-2 uppercase tracking-wide">
                  Reported Fault
                </h3>
                <p className="text-lg text-foreground leading-relaxed">
                  {originalQuery}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* EICR Mode: Critical Alert Banner */}
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
              <h3 className="text-xl font-semibold text-foreground flex items-center gap-2 text-left">
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
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-foreground font-medium">
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

        {/* EICR Mode: Compliant Installation Banner (NONE classification) */}
        {isCompliantPhoto && eicrDefects[0] && (
          <Card className="bg-green-500/20 border-2 border-green-500/50 p-6 sm:p-7 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-4 bg-white/10 rounded-lg">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-400/80" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-3">
                  <Badge className="bg-white/30 text-foreground border-none text-base px-4 py-1.5">
                    NO DEFECTS FOUND
                  </Badge>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground text-left">Installation Appears Compliant</h3>
                </div>
                <p className="text-base text-foreground mb-4 text-left leading-relaxed">
                  {eicrDefects[0].compliantSummary || eicrDefects[0].defectSummary}
                </p>
                {eicrDefects[0].goodPracticeNotes && eicrDefects[0].goodPracticeNotes.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground text-left">Good Practice Observed:</p>
                    <ul className="space-y-2">
                      {eicrDefects[0].goodPracticeNotes.map((note: string, idx: number) => (
                        <li key={idx} className="text-base text-foreground flex items-start gap-2 text-left leading-relaxed">
                          <CheckCircle2 className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-5 pt-4 border-t border-white/20">
                  <p className="text-sm text-foreground/90 text-left leading-relaxed">
                    This classification adds credibility to the AI system. If an installation is compliant, we'll say so.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Fault Mode: Hero Summary */}
        {diagnosis && !eicrDefects?.length && (
          <FaultDiagnosisHeroSummary
            faultType={diagnosis.faultSummary.reportedSymptom}
            safetyRisk={diagnosis.faultSummary.safetyRisk}
            diagnosticStepsCount={diagnosis.diagnosticWorkflow?.length || 0}
            correctiveActionsCount={diagnosis.correctiveActions?.length || 0}
            estimatedRepairTime={diagnosis.faultSummary.typicalRepairTime}
            rootCausesCount={diagnosis.faultSummary.likelyRootCauses?.length || 0}
          />
        )}

        {/* Fault Mode: Progress Bar */}
        {diagnosis && !eicrDefects?.length && totalDiagnosticSteps > 0 && (
          <Card className="p-4 sm:p-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Diagnostic Progress</span>
                <span className="text-lg font-bold text-foreground">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-background/50 rounded-full h-3">
                <div 
                  className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {completedSteps} of {totalDiagnosticSteps} steps completed
              </p>
            </div>
          </Card>
        )}

        {/* Fault Mode: Immediate Action Alert (HIGH/CRITICAL Risk Only) */}
        {diagnosis && !eicrDefects?.length && (diagnosis.faultSummary.safetyRisk === 'HIGH' || diagnosis.faultSummary.safetyRisk === 'CRITICAL') && diagnosis.faultSummary.immediateAction && (
          <Card className="bg-red-500/20 border-2 border-red-500/50 p-6 sm:p-7 shadow-xl">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="flex-shrink-0 p-5 sm:p-4 bg-white/10 rounded-2xl sm:rounded-lg">
                  <AlertTriangle className="h-12 w-12 sm:h-8 sm:w-8 text-red-400/80" />
                </div>
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-2 mb-4 sm:mb-3">
                    <Badge className="bg-white/30 text-foreground border-none text-lg sm:text-base px-5 py-2 sm:px-4 sm:py-1.5 font-bold">
                      {diagnosis.faultSummary.safetyRisk} RISK
                    </Badge>
                    <h3 className="text-2xl sm:text-xl font-bold text-foreground">Safety Critical Issue</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg sm:text-base text-foreground font-bold">Immediate Action:</p>
                    <p className="text-lg sm:text-base text-foreground leading-relaxed">
                      {diagnosis.faultSummary.immediateAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* EICR Mode: Defect Codes */}
        {eicrDefects && eicrDefects.length > 0 && showEICRCodes && !isCompliantPhoto && (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <FileText className="h-7 w-7 text-blue-400" />
              <h2 className="text-2xl font-bold text-foreground">EICR Defect Analysis</h2>
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

        {/* Fault Mode: Reported Symptom & Root Causes */}
        {diagnosis && !eicrDefects?.length && (
          <Card className="p-5 sm:p-6 bg-card border-border/40">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Reported Symptom</h3>
                <p className="text-base text-foreground leading-relaxed">{diagnosis.faultSummary.reportedSymptom}</p>
              </div>
              
              {diagnosis.faultSummary.likelyRootCauses && diagnosis.faultSummary.likelyRootCauses.length > 0 && (
                <div className="pt-4 border-t border-border/40">
                  <h4 className="text-lg font-bold text-foreground mb-3">Likely Root Causes</h4>
                  <ol className="space-y-3 text-left">
                    {diagnosis.faultSummary.likelyRootCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-base text-foreground leading-relaxed">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center text-sm font-bold text-red-300">
                          {idx + 1}
                        </span>
                        <span className="flex-1 pt-0.5">{cause}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Fault Mode: Diagnostic Workflow Steps */}
        {diagnosis && !eicrDefects?.length && diagnosis.diagnosticWorkflow && diagnosis.diagnosticWorkflow.length > 0 && (
          <FaultDiagnosisSection
            title="Diagnostic Workflow"
            icon={<Search className="h-6 w-6" />}
            count={diagnosis.diagnosticWorkflow.length}
            variant="diagnostic"
          >
            {diagnosis.diagnosticWorkflow.map((step) => (
              <FaultDiagnosisStepCard
                key={step.stepNumber}
                step={step}
                onToggleComplete={toggleStepComplete}
                isCompleted={isStepCompleted(`diagnostic-step-${step.stepNumber}`)}
              />
            ))}
          </FaultDiagnosisSection>
        )}

        {/* Fault Mode: Corrective Actions */}
        {diagnosis && !eicrDefects?.length && diagnosis.correctiveActions && diagnosis.correctiveActions.length > 0 && (
          <FaultDiagnosisSection
            title="Corrective Actions"
            icon={<Wrench className="h-6 w-6" />}
            count={diagnosis.correctiveActions.length}
            variant="fix"
          >
            {diagnosis.correctiveActions.map((action, idx) => (
              <CorrectiveActionStepCard
                key={idx}
                action={action}
                stepNumber={totalDiagnosticSteps + idx + 1}
              />
            ))}
          </FaultDiagnosisSection>
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
