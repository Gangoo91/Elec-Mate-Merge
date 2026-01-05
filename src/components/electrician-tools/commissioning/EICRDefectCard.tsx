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
  Info, 
  FileText,
  Zap,
  CheckCircle2
} from "lucide-react";
import ConfidenceMeter from "./ConfidenceMeter";

export interface EICRDefect {
  classification?: 'C1' | 'C2' | 'C3' | 'FI' | 'NONE';
  defectSummary: string;
  primaryCode?: {
    code: 'C1' | 'C2' | 'C3' | 'FI';
    title: string;
    urgency: string;
  };
  classificationReasoningBullets?: string[];
  secondaryCode?: {
    code: 'C1' | 'C2' | 'C3' | 'FI';
    condition: string;
    reasoning: string;
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

interface EICRDefectCardProps {
  defect: EICRDefect;
}

const EICRDefectCard = ({ defect }: EICRDefectCardProps) => {
  // Classification color config for small accents only
  const getClassificationColors = (code: 'C1' | 'C2' | 'C3' | 'FI') => {
    switch (code) {
      case 'C1':
        return {
          badge: 'bg-red-500/20 text-red-400 border-red-500/30',
          border: 'border-red-500/50'
        };
      case 'C2':
        return {
          badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          border: 'border-orange-500/50'
        };
      case 'C3':
        return {
          badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          border: 'border-amber-500/50'
        };
      case 'FI':
        return {
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          border: 'border-blue-500/50'
        };
    }
  };

  const colors = getClassificationColors(defect.primaryCode.code);
  const isCompliant = defect.noActionRequired || defect.primaryCode?.code === 'FI';

  return (
    <Card className="bg-card border-elec-yellow/30 overflow-hidden shadow-lg shadow-elec-yellow/5 transition-all duration-300 hover:shadow-elec-yellow/10 mx-auto max-w-2xl print:break-inside-avoid">
      {/* Header - Subtle gradient */}
      <div className="bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20 p-5 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-lg sm:text-xl font-bold text-foreground">
                EICR Defect
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge className={colors.badge}>
                {defect.primaryCode.code}
              </Badge>
              <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                {defect.primaryCode.urgency}
              </Badge>
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground/90 mb-1">
              {defect.primaryCode.title}
            </h4>
            <p className="text-sm text-foreground/80">
              {defect.defectSummary}
            </p>
          </div>
          {isCompliant && (
            <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6">
        {/* Confidence Assessment - Inline */}
        <div className="mb-4">
          <ConfidenceMeter 
            level={defect.confidenceAssessment.level}
            score={defect.confidenceAssessment.score}
            reasoning={defect.confidenceAssessment.reasoning}
          />
        </div>

        {/* Secondary Code (Context-Aware) */}
        {defect.secondaryCode && (
          <div className={`border-l-4 ${getClassificationColors(defect.secondaryCode.code).border} rounded-lg bg-card border border-elec-yellow/20 p-4 mb-4`}>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <Badge className={`${getClassificationColors(defect.secondaryCode.code).badge} mb-2`}>
                  Alternative: {defect.secondaryCode.code}
                </Badge>
                <p className="text-sm text-foreground/90 font-semibold mb-1">
                  {defect.secondaryCode.condition}
                </p>
                <p className="text-sm text-foreground/70">
                  {defect.secondaryCode.reasoning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Context Factors */}
        {defect.contextFactors && (
          <div className="bg-elec-dark/40 border border-elec-yellow/20 rounded-lg p-4 mb-4">
            <h5 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Installation Context
            </h5>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
              {defect.contextFactors.bathroomZone && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  Zone {defect.contextFactors.bathroomZone}
                </Badge>
              )}
              {defect.contextFactors.outdoorLocation !== undefined && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  {defect.contextFactors.outdoorLocation ? 'Outdoor' : 'Indoor'}
                </Badge>
              )}
              {defect.contextFactors.rcdPresent !== undefined && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  RCD: {defect.contextFactors.rcdPresent ? 'Yes' : 'No'}
                </Badge>
              )}
              {defect.contextFactors.conductorSize && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  {defect.contextFactors.conductorSize}
                </Badge>
              )}
              {defect.contextFactors.enclosureRating && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  {defect.contextFactors.enclosureRating}
                </Badge>
              )}
              {defect.contextFactors.supplementaryBonding !== undefined && (
                <Badge variant="outline" className="justify-center text-foreground/80 border-elec-yellow/30">
                  Bonding: {defect.contextFactors.supplementaryBonding ? 'Yes' : 'No'}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Accordion Sections */}
        <MobileAccordion type="multiple" className="space-y-2">
          {/* Hazard Explanation */}
          {defect.hazardExplanation && (
            <MobileAccordionItem 
              value="hazard" 
              className="border-l-4 border-red-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Hazard Explanation</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
                  <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap text-left">
                    {defect.hazardExplanation}
                  </p>
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* BS 7671 Regulations */}
          {defect.bs7671Regulations && defect.bs7671Regulations.length > 0 && (
            <MobileAccordionItem 
              value="regulations" 
              className="border-l-4 border-blue-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<BookOpen className="h-5 w-5 text-blue-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">BS 7671 Regulations</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                  {defect.bs7671Regulations.map((reg, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Badge variant="outline" className="text-blue-300 border-blue-500/50 flex-shrink-0 text-xs">
                        {reg.regulation}
                      </Badge>
                      <span className="text-sm text-foreground/90 leading-relaxed text-left">{reg.description}</span>
                    </div>
                  ))}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* GN3 & NAPIT References */}
          {(defect.gn3Guidance || defect.napitReference) && (
            <MobileAccordionItem 
              value="references" 
              className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<FileText className="h-5 w-5 text-green-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">GN3 & NAPIT References</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                  {defect.gn3Guidance && (
                    <div>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 mb-2 text-xs">
                        {defect.gn3Guidance.section}
                      </Badge>
                      <p className="text-sm text-foreground/90 leading-relaxed text-left">{defect.gn3Guidance.content}</p>
                    </div>
                  )}
                  {defect.napitReference && (
                    <div className="pt-3 border-t border-elec-yellow/10">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 mb-2 text-xs">
                        NAPIT {defect.napitReference.code}
                      </Badge>
                      <p className="text-sm text-foreground/90 leading-relaxed text-left">{defect.napitReference.description}</p>
                    </div>
                  )}
                </div>
              </MobileAccordionContent>
            </MobileAccordionItem>
          )}

          {/* Rectification */}
          {defect.rectification && defect.rectification.steps.length > 0 && (
            <MobileAccordionItem 
              value="rectification" 
              className="border-l-4 border-amber-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<Wrench className="h-5 w-5 text-amber-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Recommended Rectification</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-3">
                  {defect.rectification.estimatedTime && (
                    <Badge variant="outline" className="text-foreground/80 border-elec-yellow/30 text-xs">
                      Estimated Time: {defect.rectification.estimatedTime}
                    </Badge>
                  )}
                  <ol className="space-y-3">
                    {defect.rectification.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm font-bold text-amber-300">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-foreground/90 leading-relaxed flex-1 text-left">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {defect.rectification.requiredMaterials && defect.rectification.requiredMaterials.length > 0 && (
                    <div className="pt-3 border-t border-elec-yellow/10">
                      <p className="text-xs text-foreground/60 mb-2">Required Materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {defect.rectification.requiredMaterials.map((material, idx) => (
                          <Badge key={idx} variant="outline" className="text-foreground/80 border-amber-500/30 text-xs">
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

          {/* Verification */}
          {defect.verificationProcedure && (
            <MobileAccordionItem 
              value="verification" 
              className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
            >
              <MobileAccordionTrigger
                icon={<ClipboardCheck className="h-5 w-5 text-green-400" />}
                className="bg-elec-gray/50 hover:bg-elec-gray/70"
              >
                <span className="text-sm font-medium">Verification After Fix</span>
              </MobileAccordionTrigger>
              <MobileAccordionContent>
                <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10 space-y-4">
                  {defect.verificationProcedure.tests && defect.verificationProcedure.tests.length > 0 && (
                    <div>
                      <p className="text-xs text-foreground/60 mb-2">Required Tests:</p>
                      <ul className="space-y-2">
                        {defect.verificationProcedure.tests.map((test, idx) => (
                          <li key={idx} className="text-sm text-foreground/90 flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5">•</span>
                            <span className="text-left">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {defect.verificationProcedure.acceptanceCriteria && defect.verificationProcedure.acceptanceCriteria.length > 0 && (
                    <div className="pt-3 border-t border-green-500/20">
                      <p className="text-xs text-green-300 mb-2 font-semibold">Acceptance Criteria:</p>
                      <ul className="space-y-2">
                        {defect.verificationProcedure.acceptanceCriteria.map((criteria, idx) => (
                          <li key={idx} className="text-sm text-foreground/90 flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">✓</span>
                            <span className="text-left">{criteria}</span>
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
                <li key={idx} className="text-sm text-foreground/90 flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">•</span>
                  <span className="text-left">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default EICRDefectCard;
