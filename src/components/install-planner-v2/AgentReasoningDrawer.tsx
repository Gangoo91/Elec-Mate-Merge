import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ReasoningStep {
  step: string;
  reasoning: string;
  timestamp?: string;
}

interface Regulation {
  section: string;
  title: string;
  relevance: string;
  source: string;
}

interface Assumption {
  parameter: string;
  assumed: string;
  reason: string;
  impact?: string;
}

interface AgentReasoningData {
  reasoningSteps?: ReasoningStep[];
  regulationsConsulted?: Regulation[];
  assumptionsMade?: Assumption[];
}

interface AgentReasoningDrawerProps {
  open: boolean;
  onClose: () => void;
  agentName: string;
  data: AgentReasoningData;
}

export const AgentReasoningDrawer = ({ 
  open, 
  onClose, 
  agentName, 
  data 
}: AgentReasoningDrawerProps) => {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {agentName} Reasoning
          </SheetTitle>
          <SheetDescription>
            Step-by-step decision process and regulatory compliance
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6 pr-4">
          <div className="space-y-6">
            {/* Reasoning Steps Timeline */}
            {data.reasoningSteps && data.reasoningSteps.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-elec-yellow" />
                  Decision Process
                </h3>
                <div className="space-y-3 border-l-2 border-elec-yellow/30 pl-4">
                  {data.reasoningSteps.map((step, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {step.step}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                            {step.reasoning}
                          </p>
                          {step.timestamp && (
                            <p className="text-[10px] text-muted-foreground/70 mt-1 flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(step.timestamp).toLocaleTimeString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Regulations Consulted */}
            {data.regulationsConsulted && data.regulationsConsulted.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-400" />
                  Regulations Consulted
                </h3>
                <div className="space-y-2">
                  {data.regulationsConsulted.map((reg, idx) => (
                    <div key={idx} className="bg-muted/30 rounded p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                          {reg.source}
                        </Badge>
                        <span className="text-xs font-mono text-foreground">
                          {reg.section}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {reg.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reg.relevance}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />

            {/* Assumptions Made */}
            {data.assumptionsMade && data.assumptionsMade.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  Assumptions Made
                </h3>
                <div className="space-y-2">
                  {data.assumptionsMade.map((assumption, idx) => (
                    <div key={idx} className="bg-yellow-500/5 border border-yellow-500/20 rounded p-3 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {assumption.parameter}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {assumption.assumed}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {assumption.reason}
                      </p>
                      {assumption.impact && (
                        <p className="text-xs text-yellow-400 italic">
                          Impact: {assumption.impact}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
