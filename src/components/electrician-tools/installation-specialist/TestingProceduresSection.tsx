import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { FlaskConical, FileCheck } from "lucide-react";

interface TestingProcedure {
  testName: string;
  standard: string;
  acceptanceCriteria: string;
  certificateRequired?: string;
  regulationRef?: string;
}

interface TestingProceduresSectionProps {
  procedures: TestingProcedure[];
}

export const TestingProceduresSection = ({ procedures }: TestingProceduresSectionProps) => {
  if (!procedures || procedures.length === 0) return null;

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <FlaskConical className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Testing & Commissioning</h3>
          <p className="text-sm text-muted-foreground">BS 7671 Compliance Requirements</p>
        </div>
      </div>

      <MobileAccordion type="multiple" className="space-y-2">
        {procedures.map((procedure, index) => (
          <MobileAccordionItem key={index} value={`test-${index}`}>
            <MobileAccordionTrigger className="text-left">
              <div className="flex items-start justify-between w-full pr-8">
                <div>
                  <div className="font-semibold text-sm">{procedure.testName}</div>
                  {procedure.regulationRef && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {procedure.regulationRef}
                    </div>
                  )}
                </div>
              </div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="p-4 bg-card border border-primary/20 rounded-b-lg space-y-3">
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Standard</div>
                  <div className="text-sm text-foreground">{procedure.standard}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-muted-foreground mb-1">Acceptance Criteria</div>
                  <div className="text-sm text-foreground">{procedure.acceptanceCriteria}</div>
                </div>
                {procedure.certificateRequired && (
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <FileCheck className="h-4 w-4 text-primary" />
                    <div className="text-xs">
                      <span className="font-semibold">Certificate: </span>
                      <Badge variant="outline" className="ml-1">{procedure.certificateRequired}</Badge>
                    </div>
                  </div>
                )}
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </Card>
  );
};
