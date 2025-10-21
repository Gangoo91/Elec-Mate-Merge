import { CheckCircle2, XCircle, AlertCircle, ChevronDown, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BS7671ReferenceTooltip } from "./BS7671ReferenceTooltip";

interface VerificationCheck {
  check_name: string;
  status: 'pass' | 'fail' | 'requires_testing';
  details: string;
  bs7671_references: string[];
  confidence: number;
}

interface VerificationCheckAccordionProps {
  checks: VerificationCheck[];
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pass':
      return {
        icon: CheckCircle2,
        color: 'text-green-500',
        bg: 'bg-green-500/10',
        border: 'border-green-500/20',
        label: 'PASS'
      };
    case 'fail':
      return {
        icon: XCircle,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        label: 'FAIL'
      };
    default:
      return {
        icon: AlertCircle,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20',
        label: 'REQUIRES TESTING'
      };
  }
};

const getExplanation = (checkName: string): { what: string; why: string } => {
  const explanations: Record<string, { what: string; why: string }> = {
    "Protective Device Verification": {
      what: "Verifies that circuit breakers, RCDs, or fuses are correctly rated and properly installed.",
      why: "Incorrect protective devices can fail to disconnect the circuit during faults, leading to fire or electric shock hazards."
    },
    "Earth Continuity": {
      what: "Checks that protective conductors (earth wires) are continuous and properly connected throughout the installation.",
      why: "A break in the earth path means equipment won't be safely earthed, creating a lethal shock risk if a fault occurs."
    },
    "Cable Sizing": {
      what: "Confirms cables are adequately sized for the load they carry and their installation method.",
      why: "Undersized cables can overheat under load, potentially causing fires or premature cable failure."
    },
    "Segregation of Circuits": {
      what: "Ensures different voltage or safety levels (e.g., SELV, mains) are properly separated.",
      why: "Mixing incompatible circuits can lead to dangerous voltages appearing on low-voltage systems."
    },
    "Circuit Protection Coordination": {
      what: "Verifies that protective devices are coordinated so the correct device operates during a fault.",
      why: "Poor coordination can lead to loss of supply to unaffected circuits or failure to clear dangerous faults."
    }
  };

  return explanations[checkName] || {
    what: "This verification check ensures compliance with BS 7671 wiring regulations.",
    why: "Non-compliance can create safety hazards and may invalidate insurance or certification."
  };
};

export const VerificationCheckAccordion = ({ checks }: VerificationCheckAccordionProps) => {
  return (
    <Accordion type="multiple" className="space-y-3">
      {checks.map((check, index) => {
        const config = getStatusConfig(check.status);
        const StatusIcon = config.icon;
        const explanation = getExplanation(check.check_name);
        const confidencePercent = Math.round((check.confidence || 0.7) * 100);

        return (
          <AccordionItem 
            key={index} 
            value={`check-${index}`}
            className={`border ${config.border} rounded-lg overflow-hidden bg-card/50`}
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/30 [&[data-state=open]]:bg-muted/40 transition-colors hover:no-underline">
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className={`${config.bg} p-2 rounded-lg shrink-0`}>
                  <StatusIcon className={`h-5 w-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm sm:text-base">
                    {check.check_name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${config.color}`}>
                      {config.label}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {confidencePercent}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-4">
              {/* What This Means */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-1 flex-1">
                    <h5 className="text-sm font-medium text-foreground">What This Check Means</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{explanation.what}</p>
                  </div>
                </div>
                <div className="pl-6">
                  <h5 className="text-sm font-medium text-foreground mb-1">Why It Matters</h5>
                  <p className="text-xs text-muted-foreground leading-relaxed">{explanation.why}</p>
                </div>
              </div>

              {/* Details */}
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Assessment Details</h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{check.details}</p>
              </div>

              {/* BS 7671 References */}
              {check.bs7671_references && check.bs7671_references.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">BS 7671 References</h5>
                  <div className="flex flex-wrap gap-2">
                    {check.bs7671_references.map((ref, idx) => (
                      <BS7671ReferenceTooltip key={idx} reference={ref} />
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence Score */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-foreground">AI Confidence</h5>
                  <span className="text-xs text-muted-foreground">{confidencePercent}%</span>
                </div>
                <Progress value={confidencePercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {confidencePercent >= 90 ? 'High confidence - assessment is reliable' :
                   confidencePercent >= 70 ? 'Good confidence - assessment is likely accurate' :
                   'Moderate confidence - consider professional verification'}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
