import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, BookOpen, Wrench, ClipboardCheck, FileText, MessageSquare, Shield } from "lucide-react";
import ConfidenceMeter from "./ConfidenceMeter";

export interface EICRDefectEnhanced {
  classification?: 'C1' | 'C2' | 'C3' | 'FI' | 'NONE';
  defectSummary: string;
  primaryCode?: {
    code: 'C1' | 'C2' | 'C3' | 'FI';
    title: string;
    urgency: string;
  };
  bs7671Regulations?: Array<{
    regulation: string;
    description: string;
  }>;
  gn3Guidance?: {
    section: string;
    content: string;
  };
  hazardExplanation?: string;
  makingSafe?: {
    immediateSteps: string[];
    isolationRequired: boolean;
    signageRequired: string;
  };
  clientCommunication?: {
    plainLanguage: string;
    severityExplanation: string;
    risksIfUnfixed: string[];
    urgencyLevel: 'IMMEDIATE' | 'WITHIN_48HRS' | 'WITHIN_WEEK' | 'PLANNED';
    estimatedCost?: string;
  };
  rectification?: {
    steps: string[];
    estimatedTime?: string;
    requiredMaterials?: string[];
  };
  verificationProcedure?: {
    tests: string[];
    acceptanceCriteria: string[];
  };
  confidenceAssessment: {
    level: 'high' | 'medium' | 'low';
    score: number;
    reasoning: string;
  };
  contextFactors?: {
    bathroomZone?: string;
    outdoorLocation?: boolean;
    rcdPresent?: boolean;
    conductorSize?: string;
    enclosureRating?: string;
    supplementaryBonding?: boolean;
  };
  compliantSummary?: string;
  goodPracticeNotes?: string[];
  noActionRequired?: boolean;
}

interface EICRDefectCardEnhancedProps {
  defect: EICRDefectEnhanced;
}

const EICRDefectCardEnhanced = ({ defect }: EICRDefectCardEnhancedProps) => {
  const codeConfig = {
    C1: {
      color: 'bg-red-500',
      textColor: 'text-red-100',
      borderColor: 'border-red-500',
      bgLight: 'bg-elec-dark'
    },
    C2: {
      color: 'bg-orange-500',
      textColor: 'text-orange-100',
      borderColor: 'border-orange-500',
      bgLight: 'bg-elec-dark'
    },
    C3: {
      color: 'bg-amber-500',
      textColor: 'text-amber-100',
      borderColor: 'border-amber-500',
      bgLight: 'bg-elec-dark'
    },
    FI: {
      color: 'bg-elec-yellow',
      textColor: 'text-black',
      borderColor: 'border-elec-yellow',
      bgLight: 'bg-elec-dark'
    }
  };

  const primaryConfig = defect.primaryCode ? codeConfig[defect.primaryCode.code] : null;

  return (
    <Card className={`${primaryConfig ? primaryConfig.bgLight : 'bg-elec-dark/80'} border-2 ${primaryConfig ? primaryConfig.borderColor : 'border-blue-500/30'} overflow-hidden shadow-lg`}>
      {/* Header */}
      {defect.primaryCode && primaryConfig && (
        <div className={`${primaryConfig.color} p-5 sm:p-6`}>
          <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start sm:justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 flex-wrap">
                <Badge className="bg-white/20 text-white border-none text-lg px-4 py-1.5">
                  {defect.primaryCode.code}
                </Badge>
                <Badge className="bg-white/20 text-white border-none text-base">
                  {defect.primaryCode.urgency}
                </Badge>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 text-center sm:text-left leading-relaxed">
                {defect.primaryCode.title}
              </h3>
              <p className="text-lg text-white leading-relaxed text-center sm:text-left">
                {defect.defectSummary}
              </p>
            </div>
            <div className="flex-shrink-0">
              <AlertTriangle className="h-10 w-10 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Confidence Meter */}
      <div className="p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">Confidence Assessment</h3>
          <ConfidenceMeter 
            level={defect.confidenceAssessment.level}
            score={defect.confidenceAssessment.score}
            reasoning={defect.confidenceAssessment.reasoning}
          />
        </div>
      </div>

      {/* Context Factors */}
      {defect.contextFactors && (
        <div className="px-5 sm:px-6 pb-5">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-white">Installation Context</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {defect.contextFactors.bathroomZone && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">Zone</p>
                  <p className="text-base font-semibold text-white mt-1">Zone {defect.contextFactors.bathroomZone}</p>
                </div>
              )}
              {defect.contextFactors.outdoorLocation !== undefined && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">Location</p>
                  <p className="text-base font-semibold text-white mt-1">{defect.contextFactors.outdoorLocation ? 'Outdoor' : 'Indoor'}</p>
                </div>
              )}
              {defect.contextFactors.rcdPresent !== undefined && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">RCD Protected</p>
                  <p className="text-base font-semibold text-white mt-1">{defect.contextFactors.rcdPresent ? 'Yes' : 'No'}</p>
                </div>
              )}
              {defect.contextFactors.conductorSize && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">Conductor Size</p>
                  <p className="text-base font-semibold text-white mt-1">{defect.contextFactors.conductorSize}</p>
                </div>
              )}
              {defect.contextFactors.enclosureRating && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">Enclosure Rating</p>
                  <p className="text-base font-semibold text-white mt-1">{defect.contextFactors.enclosureRating}</p>
                </div>
              )}
              {defect.contextFactors.supplementaryBonding !== undefined && (
                <div className="bg-elec-dark/50 p-4 rounded-lg border border-elec-yellow/10">
                  <p className="text-sm text-white/60">Bonding</p>
                  <p className="text-base font-semibold text-white mt-1">{defect.contextFactors.supplementaryBonding ? 'Yes' : 'No'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ALWAYS EXPANDED: Make Safe Now */}
      {defect.makingSafe && (
        <div className="px-2 sm:px-4 pb-5">
          <div className="bg-elec-dark border-2 border-elec-yellow rounded-lg p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-7 w-7 text-red-400" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-left">🚨 Make Safe Now</h3>
            </div>
            <div className="space-y-3">
              {defect.makingSafe.immediateSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-elec-dark/50 p-4 sm:p-5 rounded-lg min-h-[56px]">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center text-base font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-base sm:text-lg text-white leading-relaxed flex-1 text-left">{step}</p>
                </div>
              ))}
            </div>
            {defect.makingSafe.isolationRequired && (
              <Badge className="bg-red-500 text-white border-none text-base px-4 py-2">
                ⚡ Isolation Required
              </Badge>
            )}
            {defect.makingSafe.signageRequired && (
              <p className="text-base sm:text-lg text-white leading-relaxed text-left">
                <span className="font-semibold">Signage: </span>{defect.makingSafe.signageRequired}
              </p>
            )}
          </div>
        </div>
      )}

      {/* ALWAYS EXPANDED: Client Communication */}
      {defect.clientCommunication && (
        <div className="px-2 sm:px-4 pb-5">
          <div className="bg-elec-dark border-2 border-elec-yellow rounded-lg p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-elec-yellow" />
              <h3 className="text-xl sm:text-2xl font-semibold text-white text-left">💬 Tell the Client</h3>
            </div>
            
            <div className="space-y-5">
              {defect.clientCommunication.plainLanguage && (
                <div>
                  <p className="text-base text-white font-semibold mb-2 text-left">What's wrong:</p>
                  <p className="text-base sm:text-lg text-white leading-relaxed text-left">{defect.clientCommunication.plainLanguage}</p>
                </div>
              )}
              
              {defect.clientCommunication.severityExplanation && (
                <div>
                  <p className="text-base text-white font-semibold mb-2 text-left">Why it matters:</p>
                  <p className="text-base sm:text-lg text-white leading-relaxed text-left">{defect.clientCommunication.severityExplanation}</p>
                </div>
              )}
              
              {defect.clientCommunication.risksIfUnfixed && defect.clientCommunication.risksIfUnfixed.length > 0 && (
                <div>
                  <p className="text-base text-white font-semibold mb-2 text-left">If not fixed:</p>
                  <ul className="space-y-2">
                    {defect.clientCommunication.risksIfUnfixed.map((risk, idx) => (
                      <li key={idx} className="text-base sm:text-lg text-white flex items-start gap-2 leading-relaxed text-left">
                        <span className="text-orange-400 text-xl">⚠</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-elec-yellow text-black border-none text-base px-4 py-2">
                Urgency: {defect.clientCommunication.urgencyLevel.replace('_', ' ')}
              </Badge>
              {defect.clientCommunication.estimatedCost && (
                <Badge variant="outline" className="text-white border-elec-yellow/50 text-base px-4 py-2">
                  Est. Cost: {defect.clientCommunication.estimatedCost}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accordion Sections (Technical Details) */}
      <Accordion type="multiple" className="px-5 sm:px-6 pb-5 space-y-3">
        {/* Hazard Explanation */}
        {defect.hazardExplanation && (
          <AccordionItem value="hazard" className="border-white/10 bg-elec-dark/50 rounded-lg px-4">
            <AccordionTrigger className="text-white hover:text-white/80 py-5 min-h-[60px]">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <span className="font-semibold text-lg">Technical Hazard Explanation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <p className="text-lg text-white leading-loose">
                {defect.hazardExplanation}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Regulations */}
        {defect.bs7671Regulations && defect.bs7671Regulations.length > 0 && (
          <AccordionItem value="regulations" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-base">BS 7671 Regulations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-3">
                {defect.bs7671Regulations.map((reg, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-left">
                    <Badge variant="outline" className="text-blue-300 border-blue-500/50 flex-shrink-0 text-base px-3 py-1.5">
                      {reg.regulation}
                    </Badge>
                    <span className="text-base text-white leading-relaxed text-center sm:text-left">{reg.description}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* BS 7671 & Guidance References */}
        {defect.gn3Guidance && (
          <AccordionItem value="references" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-400" />
                <span className="font-semibold text-base">BS 7671 & Guidance References</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-3">
                <div className="bg-elec-dark/50 rounded p-4">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/50 mb-3 text-base px-3 py-1.5">
                    {defect.gn3Guidance.section}
                  </Badge>
                  <p className="text-base text-white text-left leading-relaxed">{defect.gn3Guidance.content}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Rectification (Proper Fix) */}
        {defect.rectification && defect.rectification.steps.length > 0 && (
          <AccordionItem value="rectification" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-amber-400" />
                <span className="font-semibold text-base">🔧 Proper Fix (Rectification)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                {defect.rectification.estimatedTime && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-base px-4 py-2">Estimated Time: {defect.rectification.estimatedTime}</Badge>
                  </div>
                )}
                <ol className="space-y-3">
                  {defect.rectification.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-white text-left leading-relaxed">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500/50 flex items-center justify-center text-sm font-bold text-amber-300">
                        {idx + 1}
                      </span>
                      <span className="flex-1 pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
                {defect.rectification.requiredMaterials && defect.rectification.requiredMaterials.length > 0 && (
                  <div className="mt-4 bg-elec-dark/50 rounded p-4">
                    <h6 className="text-sm font-semibold text-white mb-3 text-left">Required Materials:</h6>
                    <div className="flex flex-wrap gap-2">
                      {defect.rectification.requiredMaterials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-white text-base px-3 py-1.5">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Verification */}
        {defect.verificationProcedure && (
          <AccordionItem value="verification" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80 py-4 min-h-[56px]">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-blue-400" />
                <span className="font-semibold text-base">✓ Verify the Fix</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-4">
                {defect.verificationProcedure.tests && defect.verificationProcedure.tests.length > 0 && (
                  <div>
                    <h6 className="text-base font-semibold text-white mb-3 text-left">Required Tests:</h6>
                    <ul className="space-y-2">
                      {defect.verificationProcedure.tests.map((test, idx) => (
                        <li key={idx} className="text-base text-white flex items-start gap-2 text-left leading-relaxed">
                          <span className="text-blue-400">•</span>
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {defect.verificationProcedure.acceptanceCriteria && defect.verificationProcedure.acceptanceCriteria.length > 0 && (
                  <div className="bg-green-500/10 border-2 border-green-500/30 rounded p-4">
                    <h6 className="text-base font-semibold text-green-300 mb-3 text-left">Acceptance Criteria:</h6>
                    <ul className="space-y-2">
                      {defect.verificationProcedure.acceptanceCriteria.map((criteria, idx) => (
                        <li key={idx} className="text-base text-white flex items-start gap-2 text-left leading-relaxed">
                          <span className="text-green-400">✓</span>
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </Card>
  );
};

export default EICRDefectCardEnhanced;
