import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Wrench, Package, AlertTriangle, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CategorisedToolsList } from "./CategorisedToolsList";
import { categorizeTools, categorizeMaterials } from "@/utils/toolsCategorisation";

interface InstallationMethodDisplayProps {
  installationGuide: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    content: string;
    safety?: string[];
  }>;
  summary: {
    totalSteps: number;
    estimatedDuration: string;
    requiredQualifications: string[];
    toolsRequired: string[];
    materialsRequired: string[];
    overallRiskLevel: 'low' | 'medium' | 'high';
  };
}

export const InstallationMethodDisplay = ({
  installationGuide,
  steps,
  summary
}: InstallationMethodDisplayProps) => {
  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <Card className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 to-background">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-bold">{summary.totalSteps}</div>
              <div className="text-xs text-muted-foreground">Steps</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <div className="text-lg font-semibold">{summary.estimatedDuration}</div>
              <div className="text-xs text-muted-foreground">Duration</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <div>
              <div className="text-lg font-semibold">{summary.toolsRequired.length}</div>
              <div className="text-xs text-muted-foreground">Tools</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <div>
              <Badge className={riskColors[summary.overallRiskLevel]}>
                {summary.overallRiskLevel.toUpperCase()}
              </Badge>
              <div className="text-xs text-muted-foreground mt-1">Risk Level</div>
            </div>
          </div>
        </div>

        {/* Tools & Materials - Categorised */}
        {(summary.toolsRequired.length > 0 || summary.materialsRequired.length > 0) && (
          <>
            <Separator className="my-4" />
            <div className="grid sm:grid-cols-2 gap-4">
              {summary.toolsRequired.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">Tools Required</span>
                  </div>
                  <CategorisedToolsList 
                    categorisedItems={categorizeTools(summary.toolsRequired)} 
                    icon={<Wrench className="h-4 w-4 text-primary" />}
                  />
                </div>
              )}
              {summary.materialsRequired.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-3">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm text-foreground">Materials Required</span>
                  </div>
                  <CategorisedToolsList 
                    categorisedItems={categorizeMaterials(summary.materialsRequired)} 
                    icon={<Package className="h-4 w-4 text-primary" />}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </Card>

      {/* Installation Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <Card key={index} className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                {step.stepNumber}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base mb-2">{step.title}</h3>
                <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {step.content}
                </div>
                
                {step.safety && step.safety.length > 0 && (
                  <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-warning mb-1">Safety Notes</div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {step.safety.map((note, i) => (
                            <li key={i}>• {note}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
