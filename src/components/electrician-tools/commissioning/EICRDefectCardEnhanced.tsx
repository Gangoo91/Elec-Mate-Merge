import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from "@/components/ui/mobile-accordion";
import { 
  AlertTriangle, 
  BookOpen, 
  Wrench, 
  ClipboardCheck, 
  MessageSquare, 
  Shield,
  Zap,
  CheckCircle2
} from "lucide-react";

export interface EICRDefectEnhanced {
  classification?: 'C1' | 'C2' | 'C3' | 'FI' | 'NONE';
  defectSummary: string;
  primaryCode?: {
    code: 'C1' | 'C2' | 'C3' | 'FI';
    title: string;
    urgency: string;
  };
  classificationReasoningBullets?: string[];
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

// Summary field component matching circuit designer style
const SummaryField = ({ label, value }: { label: string; value: string }) => (
  <div className="p-2.5 sm:p-3 bg-elec-dark/40 rounded border border-elec-yellow/20">
    <p className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-white">{value}</p>
  </div>
);

const EICRDefectCardEnhanced = ({ defect }: EICRDefectCardEnhancedProps) => {
  // Classification color config for small accents only
  const getClassificationColors = (code: 'C1' | 'C2' | 'C3' | 'FI') => {
    switch (code) {
      case 'C1':
        return {
          badge: 'bg-red-500/20 text-red-400 border-red-500/30',
          border: 'border-red-500/50',
          status: 'fail'
        };
      case 'C2':
        return {
          badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          border: 'border-orange-500/50',
          status: 'warning'
        };
      case 'C3':
        return {
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          border: 'border-amber-500/50',
          status: 'warning'
        };
      case 'FI':
        return {
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          border: 'border-blue-500/50',
          status: 'pass'
        };
    }
  };

  const colors = defect.primaryCode ? getClassificationColors(defect.primaryCode.code) : null;
  const isCompliant = defect.noActionRequired || defect.primaryCode?.code === 'FI';

  return (
    <Card className="bg-card border-elec-yellow/30 overflow-hidden shadow-lg shadow-elec-yellow/5 transition-all duration-300 hover:shadow-elec-yellow/10 mx-auto max-w-2xl">
      {/* Header - Subtle gradient like circuit designer */}
      <div className="bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20 p-5 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                EICR Defect Analysis
              </h3>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white/90">{defect.defectSummary}</p>
          </div>
          {colors && (
            <Badge className={`${colors.badge} h-7 transition-all duration-300`}>
              {defect.primaryCode?.code}
            </Badge>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6">
        {/* At a Glance Summary */}
        <Card className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/40 mb-4 sm:mb-6">
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
                At a Glance
              </h3>
              {isCompliant && (
                <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse-subtle" />
              )}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <SummaryField 
                label="Classification" 
                value={defect.primaryCode?.code || 'NONE'} 
              />
              <SummaryField 
                label="Urgency" 
                value={defect.primaryCode?.urgency || 'N/A'} 
              />
              <SummaryField 
                label="Confidence" 
                value={`${defect.confidenceAssessment.score}%`} 
              />
              <SummaryField 
                label="Level" 
                value={defect.confidenceAssessment.level.toUpperCase()} 
              />
            </div>

            {/* Context Factors Grid */}
            {defect.contextFactors && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mt-3">
                {defect.contextFactors.bathroomZone && (
                  <SummaryField label="Zone" value={`Zone ${defect.contextFactors.bathroomZone}`} />
                )}
                {defect.contextFactors.outdoorLocation !== undefined && (
                  <SummaryField label="Location" value={defect.contextFactors.outdoorLocation ? 'Outdoor' : 'Indoor'} />
                )}
                {defect.contextFactors.rcdPresent !== undefined && (
                  <SummaryField label="RCD" value={defect.contextFactors.rcdPresent ? 'Yes' : 'No'} />
                )}
                {defect.contextFactors.conductorSize && (
                  <SummaryField label="Conductor" value={defect.contextFactors.conductorSize} />
                )}
                {defect.contextFactors.enclosureRating && (
                  <SummaryField label="IP Rating" value={defect.contextFactors.enclosureRating} />
                )}
                {defect.contextFactors.supplementaryBonding !== undefined && (
                  <SummaryField label="Bonding" value={defect.contextFactors.supplementaryBonding ? 'Yes' : 'No'} />
                )}
              </div>
            )}
          </div>
        </Card>

        {/* Classification Justification - Clean card with border-l-4 accent */}
        {defect.classificationReasoningBullets && defect.classificationReasoningBullets.length > 0 && defect.primaryCode && colors && (
          <div className={`border-l-4 ${colors.border} rounded-lg bg-card border border-elec-yellow/20 p-4 sm:p-5 mb-4`}>
            <h3 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-elec-yellow" />
              Classification Justification
            </h3>
            
            <p className="text-sm font-semibold text-white/90 mb-2">
              Why {defect.primaryCode.code} ({defect.primaryCode.title}):
            </p>
            <ul className="space-y-2 mb-4">
              {defect.classificationReasoningBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-white/90 leading-relaxed">
                  <span className="text-elec-yellow mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Supporting Regulations */}
            {defect.bs7671Regulations && defect.bs7671Regulations.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-elec-yellow/10">
                <p className="text-sm font-semibold text-white/90 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  Supporting Regulations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {defect.bs7671Regulations.map((reg, idx) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className="text-blue-300 border-blue-500/50 text-xs"
                    >
                      {reg.regulation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Accordion Sections */}
        <MobileAccordion type="multiple" className="space-y-2">
          {/* Safety Actions */}
          {defect.makingSafe && (
            <MobileAccordionItem 
              value="safety" 
              className="border-l-4 border-red-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Make Safe Now</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                  {defect.makingSafe.immediateSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold border border-red-500/30">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-white/90 leading-relaxed flex-1">{step}</p>
                    </div>
                  ))}
                  {defect.makingSafe.isolationRequired && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Isolation Required
                    </Badge>
                  )}
                  {defect.makingSafe.signageRequired && (
                    <p className="text-sm text-white/90">
                      <span className="font-semibold">Signage: </span>{defect.makingSafe.signageRequired}
                    </p>
                  )}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* Client Communication */}
          {defect.clientCommunication && (
            <MobileAccordionItem 
              value="client" 
              className="border-l-4 border-blue-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<MessageSquare className="h-5 w-5 text-blue-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Client Communication</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-4">
                  {defect.clientCommunication.plainLanguage && (
                    <div>
                      <p className="text-xs text-white/60 mb-1">What's wrong:</p>
                      <p className="text-sm text-white/90 leading-relaxed">{defect.clientCommunication.plainLanguage}</p>
                    </div>
                  )}
                  
                  {defect.clientCommunication.severityExplanation && (
                    <div>
                      <p className="text-xs text-white/60 mb-1">Why it matters:</p>
                      <p className="text-sm text-white/90 leading-relaxed">{defect.clientCommunication.severityExplanation}</p>
                    </div>
                  )}
                  
                  {defect.clientCommunication.risksIfUnfixed && defect.clientCommunication.risksIfUnfixed.length > 0 && (
                    <div>
                      <p className="text-xs text-white/60 mb-2">If not fixed:</p>
                      <ul className="space-y-2">
                        {defect.clientCommunication.risksIfUnfixed.map((risk, idx) => (
                          <li key={idx} className="text-sm text-white/90 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-elec-yellow/10">
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                      {defect.clientCommunication.urgencyLevel.replace('_', ' ')}
                    </Badge>
                    {defect.clientCommunication.estimatedCost && (
                      <Badge variant="outline" className="text-white/80 border-elec-yellow/30 text-xs">
                        {defect.clientCommunication.estimatedCost}
                      </Badge>
                    )}
                  </div>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* Technical Details */}
          {defect.hazardExplanation && (
            <MobileAccordionItem 
              value="technical" 
              className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<BookOpen className="h-5 w-5 text-green-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Technical Hazard Explanation</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
                  <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
                    {defect.hazardExplanation}
                  </p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* BS 7671 & Guidance References */}
          {defect.gn3Guidance && (
            <MobileAccordionItem 
              value="regulations" 
              className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<BookOpen className="h-5 w-5 text-green-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">BS 7671 & Guidance</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-3 text-xs">
                    {defect.gn3Guidance.section}
                  </Badge>
                  <p className="text-sm text-white/90 leading-relaxed">{defect.gn3Guidance.content}</p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* Rectification Procedure */}
          {defect.rectification && defect.rectification.steps.length > 0 && (
            <MobileAccordionItem 
              value="rectification" 
              className="border-l-4 border-amber-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<Wrench className="h-5 w-5 text-amber-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Rectification Procedure</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                  {defect.rectification.estimatedTime && (
                    <Badge variant="outline" className="text-white/80 border-elec-yellow/30 text-xs">
                      Estimated Time: {defect.rectification.estimatedTime}
                    </Badge>
                  )}
                  <ol className="space-y-3">
                    {defect.rectification.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-white/90 leading-relaxed flex-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {defect.rectification.requiredMaterials && defect.rectification.requiredMaterials.length > 0 && (
                    <div className="pt-3 border-t border-elec-yellow/10">
                      <p className="text-xs text-white/60 mb-2">Required Materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {defect.rectification.requiredMaterials.map((material, idx) => (
                          <Badge key={idx} variant="outline" className="text-white/80 border-amber-500/30 text-xs">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* Verification Procedure */}
          {defect.verificationProcedure && (
            <MobileAccordionItem 
              value="verification" 
              className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<ClipboardCheck className="h-5 w-5 text-green-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Verification Tests</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-4">
                  {defect.verificationProcedure.tests && defect.verificationProcedure.tests.length > 0 && (
                    <div>
                      <p className="text-xs text-white/60 mb-2">Required Tests:</p>
                      <ul className="space-y-2">
                        {defect.verificationProcedure.tests.map((test, idx) => (
                          <li key={idx} className="text-sm text-white/90 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            <span>{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {defect.verificationProcedure.acceptanceCriteria && defect.verificationProcedure.acceptanceCriteria.length > 0 && (
                    <div>
                      <p className="text-xs text-white/60 mb-2">Acceptance Criteria:</p>
                      <ul className="space-y-2">
                        {defect.verificationProcedure.acceptanceCriteria.map((criteria, idx) => (
                          <li key={idx} className="text-sm text-white/90 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">•</span>
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}
        </MobileAccordion>

        {/* Good Practice Notes (if compliant) */}
        {defect.goodPracticeNotes && defect.goodPracticeNotes.length > 0 && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
            <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Good Practice Notes
            </h4>
            <ul className="space-y-2">
              {defect.goodPracticeNotes.map((note, idx) => (
                <li key={idx} className="text-sm text-white/90 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EICRDefectCardEnhanced;
