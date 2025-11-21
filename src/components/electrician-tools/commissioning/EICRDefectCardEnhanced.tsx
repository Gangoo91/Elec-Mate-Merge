import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertTriangle, BookOpen, Wrench, ClipboardCheck, Info, FileText, MessageSquare, Shield } from "lucide-react";
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
  napitReference?: {
    code: string;
    description: string;
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
      bgLight: 'bg-red-500/10'
    },
    C2: {
      color: 'bg-orange-500',
      textColor: 'text-orange-100',
      borderColor: 'border-orange-500',
      bgLight: 'bg-orange-500/10'
    },
    C3: {
      color: 'bg-amber-500',
      textColor: 'text-amber-100',
      borderColor: 'border-amber-500',
      bgLight: 'bg-amber-500/10'
    },
    FI: {
      color: 'bg-purple-500',
      textColor: 'text-purple-100',
      borderColor: 'border-purple-500',
      bgLight: 'bg-purple-500/10'
    }
  };

  const primaryConfig = defect.primaryCode ? codeConfig[defect.primaryCode.code] : null;

  return (
    <Card className={`${primaryConfig ? primaryConfig.bgLight : 'bg-elec-dark/80'} border-2 ${primaryConfig ? primaryConfig.borderColor : 'border-blue-500/30'} overflow-hidden`}>
      {/* Header */}
      {defect.primaryCode && primaryConfig && (
        <div className={`${primaryConfig.color} p-4 sm:p-5`}>
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className="bg-white/20 text-white border-none text-base sm:text-lg px-3 py-1">
                  {defect.primaryCode.code}
                </Badge>
                <Badge className="bg-white/20 text-white border-none">
                  {defect.primaryCode.urgency}
                </Badge>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                {defect.primaryCode.title}
              </h3>
              <p className="text-sm sm:text-base text-white/90">
                {defect.defectSummary}
              </p>
            </div>
            <div className="flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Confidence Meter */}
      <div className="p-4 sm:p-5">
        <ConfidenceMeter 
          level={defect.confidenceAssessment.level}
          score={defect.confidenceAssessment.score}
          reasoning={defect.confidenceAssessment.reasoning}
        />
      </div>

      {/* Context Factors */}
      {defect.contextFactors && (
        <div className="px-4 sm:px-5 pb-4">
          <div className="bg-elec-dark/50 rounded-lg p-3">
            <h5 className="text-sm font-semibold text-white mb-2">Installation Context</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {defect.contextFactors.bathroomZone && (
                <Badge variant="outline" className="justify-center">
                  Zone {defect.contextFactors.bathroomZone}
                </Badge>
              )}
              {defect.contextFactors.outdoorLocation !== undefined && (
                <Badge variant="outline" className="justify-center">
                  {defect.contextFactors.outdoorLocation ? 'Outdoor' : 'Indoor'}
                </Badge>
              )}
              {defect.contextFactors.rcdPresent !== undefined && (
                <Badge variant="outline" className="justify-center">
                  RCD: {defect.contextFactors.rcdPresent ? 'Yes' : 'No'}
                </Badge>
              )}
              {defect.contextFactors.conductorSize && (
                <Badge variant="outline" className="justify-center">
                  {defect.contextFactors.conductorSize}
                </Badge>
              )}
              {defect.contextFactors.enclosureRating && (
                <Badge variant="outline" className="justify-center">
                  {defect.contextFactors.enclosureRating}
                </Badge>
              )}
              {defect.contextFactors.supplementaryBonding !== undefined && (
                <Badge variant="outline" className="justify-center">
                  Bonding: {defect.contextFactors.supplementaryBonding ? 'Yes' : 'No'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Accordion Sections */}
      <Accordion type="multiple" className="px-4 sm:px-5 pb-4">
        {/* Making Safe (Immediate Action) */}
        {defect.makingSafe && (
          <AccordionItem value="making-safe" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                <span className="font-semibold">🚨 Make Safe Now (Immediate Action)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                  <p className="text-xs font-semibold text-red-300 mb-2">IMMEDIATE SAFETY MEASURES (before fixing):</p>
                  <ol className="space-y-2">
                    {defect.makingSafe.immediateSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center text-xs font-semibold text-red-300">
                          {idx + 1}
                        </span>
                        <span className="flex-1 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                {defect.makingSafe.isolationRequired && (
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/50">
                    ⚡ Isolation Required
                  </Badge>
                )}
                {defect.makingSafe.signageRequired && (
                  <p className="text-sm text-white/70">
                    <span className="font-semibold">Signage: </span>{defect.makingSafe.signageRequired}
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Client Communication */}
        {defect.clientCommunication && (
          <AccordionItem value="client-communication" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-400" />
                <span className="font-semibold">💬 Tell the Client (Plain Language)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-sm text-white/80 mb-3">
                    {defect.clientCommunication.plainLanguage}
                  </p>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-white/70 mb-1">What this means:</p>
                      <p className="text-sm text-white/80">{defect.clientCommunication.severityExplanation}</p>
                    </div>
                    {defect.clientCommunication.risksIfUnfixed && defect.clientCommunication.risksIfUnfixed.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-white/70 mb-1">Risks if not fixed:</p>
                        <ul className="space-y-1">
                          {defect.clientCommunication.risksIfUnfixed.map((risk, idx) => (
                            <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                              <span className="text-orange-400">⚠</span>
                              <span>{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
                    Urgency: {defect.clientCommunication.urgencyLevel.replace('_', ' ')}
                  </Badge>
                  {defect.clientCommunication.estimatedCost && (
                    <Badge variant="outline">
                      Est. Cost: {defect.clientCommunication.estimatedCost}
                    </Badge>
                  )}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Hazard Explanation */}
        {defect.hazardExplanation && (
          <AccordionItem value="hazard" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="font-semibold">Technical Hazard Explanation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-white/80 leading-relaxed">
                {defect.hazardExplanation}
              </p>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Regulations */}
        {defect.bs7671Regulations && defect.bs7671Regulations.length > 0 && (
          <AccordionItem value="regulations" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-400" />
                <span className="font-semibold">BS 7671 Regulations</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {defect.bs7671Regulations.map((reg, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Badge variant="outline" className="text-blue-300 border-blue-500/50 flex-shrink-0">
                      {reg.regulation}
                    </Badge>
                    <span className="text-sm text-white/80">{reg.description}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* GN3 & NAPIT */}
        {(defect.gn3Guidance || defect.napitReference) && (
          <AccordionItem value="references" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-400" />
                <span className="font-semibold">GN3 & NAPIT References</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {defect.gn3Guidance && (
                  <div className="bg-elec-dark/50 rounded p-3">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/50 mb-2">
                      {defect.gn3Guidance.section}
                    </Badge>
                    <p className="text-sm text-white/80">{defect.gn3Guidance.content}</p>
                  </div>
                )}
                {defect.napitReference && (
                  <div className="bg-elec-dark/50 rounded p-3">
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-2">
                      NAPIT {defect.napitReference.code}
                    </Badge>
                    <p className="text-sm text-white/80">{defect.napitReference.description}</p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Rectification (Proper Fix) */}
        {defect.rectification && defect.rectification.steps.length > 0 && (
          <AccordionItem value="rectification" className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-amber-400" />
                <span className="font-semibold">🔧 Proper Fix (Rectification)</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {defect.rectification.estimatedTime && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Estimated Time: {defect.rectification.estimatedTime}</Badge>
                  </div>
                )}
                <ol className="space-y-2">
                  {defect.rectification.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-xs font-semibold text-amber-300">
                        {idx + 1}
                      </span>
                      <span className="flex-1 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                {defect.rectification.requiredMaterials && defect.rectification.requiredMaterials.length > 0 && (
                  <div className="mt-3 bg-elec-dark/50 rounded p-3">
                    <h6 className="text-xs font-semibold text-white/70 mb-2">Required Materials:</h6>
                    <div className="flex flex-wrap gap-2">
                      {defect.rectification.requiredMaterials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-white/70">
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
            <AccordionTrigger className="text-white hover:text-white/80">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-blue-400" />
                <span className="font-semibold">✓ Verify the Fix</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {defect.verificationProcedure.tests && defect.verificationProcedure.tests.length > 0 && (
                  <div>
                    <h6 className="text-sm font-semibold text-white mb-2">Required Tests:</h6>
                    <ul className="space-y-1">
                      {defect.verificationProcedure.tests.map((test, idx) => (
                        <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {defect.verificationProcedure.acceptanceCriteria && defect.verificationProcedure.acceptanceCriteria.length > 0 && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <h6 className="text-sm font-semibold text-green-300 mb-2">Acceptance Criteria:</h6>
                    <ul className="space-y-1">
                      {defect.verificationProcedure.acceptanceCriteria.map((criteria, idx) => (
                        <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
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
