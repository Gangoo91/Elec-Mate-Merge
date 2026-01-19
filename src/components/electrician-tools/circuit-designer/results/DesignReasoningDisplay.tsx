import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface DesignReasoningDisplayProps {
  reasoning?: {
    voltageContext: string;
    cableSelectionLogic: string;
    protectionLogic: string;
    complianceChecks: string;
    correctionsApplied?: string;
  };
  correctionApplied?: boolean;
  correctionAttempts?: number;
}

export const DesignReasoningDisplay = ({ 
  reasoning, 
  correctionApplied,
  correctionAttempts 
}: DesignReasoningDisplayProps) => {
  const [isOpen, setIsOpen] = useState(correctionApplied);

  if (!reasoning) return null;

  return (
    <Card className="p-4 border-blue-500/30 bg-blue-500/5">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-400" />
            <h3 className="font-semibold text-lg">Design Reasoning</h3>
            {correctionApplied && (
              <Badge variant="outline" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Self-Corrected ({correctionAttempts} attempts)
              </Badge>
            )}
          </div>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-4 space-y-3">
          {correctionApplied && reasoning.correctionsApplied && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-orange-300">Corrections Applied</p>
                  <p className="text-xs text-muted-foreground mt-1">{reasoning.correctionsApplied}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3 text-sm">
            <div>
              <p className="font-semibold text-foreground mb-1">⚡ Voltage Context</p>
              <p className="text-muted-foreground">{reasoning.voltageContext}</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-1">🔌 Cable Selection Logic</p>
              <p className="text-muted-foreground">{reasoning.cableSelectionLogic}</p>
            </div>

            <div>
              <p className="font-semibold text-foreground mb-1">🛡️ Protection Logic</p>
              <p className="text-muted-foreground">{reasoning.protectionLogic}</p>
            </div>

            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-green-300">Compliance Checks</p>
                  <p className="text-xs text-muted-foreground mt-1">{reasoning.complianceChecks}</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
