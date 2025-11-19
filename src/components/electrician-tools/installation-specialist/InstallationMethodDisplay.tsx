import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Wrench, Package, AlertTriangle, ShieldCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CategorisedToolsList } from "./CategorisedToolsList";
import { categorizeTools, categorizeMaterials } from "@/utils/toolsCategorisation";

interface InstallationMethodDisplayProps {
  jobTitle?: string;
  installationType?: string;
  installationGuide: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    content: string;
    safety?: string[];
    toolsRequired?: string[];
    materialsNeeded?: string[];
    estimatedDuration?: string;
    riskLevel?: 'low' | 'medium' | 'high';
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
  jobTitle,
  installationType,
  installationGuide,
  steps,
  summary
}: InstallationMethodDisplayProps) => {
  const riskColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20'
  };

  const formatStepDuration = (duration: string | number): string => {
    if (typeof duration === 'number') {
      return duration < 60 ? `${duration}m` : `${Math.floor(duration / 60)}h ${duration % 60}m`;
    }
    return duration;
  };

  return (
    <div className="space-y-4">
      {/* Installation Title */}
      {jobTitle && (
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-foreground mb-1">{jobTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {installationType ? `${installationType.charAt(0).toUpperCase()}${installationType.slice(1)} Installation` : 'Installation Method Statement'}
          </p>
        </div>
      )}

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
                {(summary.overallRiskLevel || 'medium').toUpperCase()}
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
            {/* Header: Step number + title + duration + risk */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {step.stepNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base">{step.title}</h3>
                </div>
              </div>
              <div className="flex gap-2 items-center flex-shrink-0">
                {step.estimatedDuration && (
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Clock className="h-3 w-3" />
                    {formatStepDuration(step.estimatedDuration)}
                  </Badge>
                )}
                {step.riskLevel && (
                  <Badge className={riskColors[step.riskLevel]}>
                    {(step.riskLevel || 'medium').toUpperCase()}
                  </Badge>
                )}
              </div>
            </div>

            {/* Main description */}
            <div className="text-sm text-muted-foreground whitespace-pre-wrap mb-3">
              {step.content}
            </div>

            {/* Tools & Materials for THIS STEP */}
            {(step.toolsRequired && step.toolsRequired.length > 0) || (step.materialsNeeded && step.materialsNeeded.length > 0) ? (
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                {step.toolsRequired && step.toolsRequired.length > 0 && (
                  <div className="p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-1 mb-1">
                      <Wrench className="h-3 w-3 text-primary" />
                      <span className="text-xs font-semibold">Tools for this step</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {step.toolsRequired.slice(0, 3).map((tool, i) => (
                        <li key={i}>• {tool}</li>
                      ))}
                      {step.toolsRequired.length > 3 && (
                        <li className="text-primary">+ {step.toolsRequired.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
                {step.materialsNeeded && step.materialsNeeded.length > 0 && (
                  <div className="p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-1 mb-1">
                      <Package className="h-3 w-3 text-primary" />
                      <span className="text-xs font-semibold">Materials needed</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-0.5">
                      {step.materialsNeeded.slice(0, 3).map((material, i) => (
                        <li key={i}>• {material}</li>
                      ))}
                      {step.materialsNeeded.length > 3 && (
                        <li className="text-primary">+ {step.materialsNeeded.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : null}

            {/* Safety notes */}
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
          </Card>
        ))}
      </div>
    </div>
  );
};
