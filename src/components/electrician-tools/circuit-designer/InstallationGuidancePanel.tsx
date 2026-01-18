import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle2, Wrench, Package, TestTube2, FileText } from "lucide-react";
import { EnhancedInstallationGuidance } from "@/types/circuit-design";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InstallationGuidancePanelProps {
  guidance: EnhancedInstallationGuidance;
}

export const InstallationGuidancePanel = ({ guidance }: InstallationGuidancePanelProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    safety: true,
    materials: false,
    tools: false,
    procedure: false,
    testing: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };


  return (
    <div className="space-y-4">
      {/* Executive Summary */}
      {guidance.executiveSummary && (
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              Installation Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-foreground text-left">
              {guidance.executiveSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Safety Considerations */}
      <Collapsible open={openSections.safety} onOpenChange={() => toggleSection('safety')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[48px] touch-manipulation">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Safety Considerations ({guidance.safetyConsiderations?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.safety ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {guidance.safetyConsiderations?.map((safety, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "rounded-lg p-4 text-left border-l-4",
                    safety.priority === 'critical' && "border-l-red-500 bg-red-500/10",
                    safety.priority === 'high' && "border-l-amber-500 bg-amber-500/10",
                    safety.priority === 'medium' && "border-l-yellow-500 bg-yellow-500/10"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={cn(
                        "h-5 w-5 shrink-0 mt-0.5",
                        safety.priority === 'critical' && "text-red-500",
                        safety.priority === 'high' && "text-amber-500",
                        safety.priority === 'medium' && "text-yellow-500"
                      )}
                    />
                    <div className="space-y-2 text-left flex-1">
                      <p className="font-semibold text-sm text-left text-foreground">{safety.consideration}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-foreground/70">
                        {safety.bsReference && (
                          <span className="inline-flex items-center gap-1">
                            <FileText className="h-3 w-3" /> BS 7671: {safety.bsReference}
                          </span>
                        )}
                        {safety.toolsRequired && safety.toolsRequired.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            <Wrench className="h-3 w-3" /> {safety.toolsRequired.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Materials Required */}
      <Collapsible open={openSections.materials} onOpenChange={() => toggleSection('materials')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[48px] touch-manipulation">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  Materials Required ({guidance.materialsRequired?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.materials ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-2">
              {guidance.materialsRequired?.map((material, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left space-y-2"
                >
                  {/* Row 1: Icon + Item name */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                      <Package className="h-3 w-3 text-blue-500" />
                    </div>
                    <p className="font-medium text-sm text-foreground">{material.item}</p>
                  </div>
                  {/* Row 2: Quantity badge */}
                  <Badge variant="secondary" className="font-mono text-xs ml-9">
                    {material.quantity}
                  </Badge>
                  {/* Row 3: Specification */}
                  <p className="text-xs text-foreground/70 ml-9">{material.specification}</p>
                  {/* Row 4: Source */}
                  {material.source && (
                    <p className="text-xs text-foreground/70 ml-9">Source: {material.source}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Tools Required */}
      <Collapsible open={openSections.tools} onOpenChange={() => toggleSection('tools')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[48px] touch-manipulation">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-purple-500" />
                  Tools Required ({guidance.toolsRequired?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.tools ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {guidance.toolsRequired?.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 text-left"
                  >
                  <Wrench className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm text-left text-foreground">{tool.tool}</p>
                    <p className="text-xs text-foreground/70 text-left">{tool.purpose}</p>
                    <Badge variant="secondary" className="mt-1.5 text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Installation Procedure */}
      <Collapsible open={openSections.procedure} onOpenChange={() => toggleSection('procedure')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[48px] touch-manipulation">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Installation Procedure ({guidance.installationProcedure?.length || 0} steps)
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.procedure ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="relative">
              {/* Vertical timeline line */}
              {guidance.installationProcedure && guidance.installationProcedure.length > 1 && (
                <div className="absolute left-4 top-8 bottom-4 w-0.5 bg-primary/20" />
              )}

              <div className="space-y-4">
                {guidance.installationProcedure?.map((step, idx) => (
                  <div key={idx} className="relative flex gap-4 text-left">
                    {/* Step number circle */}
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold z-10">
                      {step.stepNumber}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-4 text-left">
                      <p className="font-semibold text-sm text-left text-foreground">{step.title}</p>
                      <p className="text-sm text-foreground/70 mt-1 leading-relaxed text-left">
                        {step.description}
                      </p>

                      {/* Tools as inline badges */}
                      {step.toolsForStep && step.toolsForStep.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 justify-start">
                          {step.toolsForStep.map((tool, toolIdx) => (
                            <Badge key={toolIdx} variant="outline" className="text-xs">
                              <Wrench className="h-3 w-3 mr-1" />
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* BS Reference */}
                      {step.bsReferences && step.bsReferences.length > 0 && (
                        <p className="text-xs text-primary/70 mt-2 text-left">
                          📋 {step.bsReferences.join(' • ')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Testing Requirements */}
      <Collapsible open={openSections.testing} onOpenChange={() => toggleSection('testing')}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[48px] touch-manipulation">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TestTube2 className="h-5 w-5 text-teal-500" />
                  Testing Requirements ({guidance.testingRequirements?.tests?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.testing ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {guidance.testingRequirements?.intro && (
                <>
                  <p className="text-sm text-foreground text-left">{guidance.testingRequirements.intro}</p>
                  <Separator />
                </>
              )}
              {guidance.testingRequirements?.tests?.map((test, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-teal-500/30 bg-teal-500/5 text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-teal-500">{idx + 1}</span>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm text-left text-foreground">{test.testName}</p>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {test.regulation}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground/70 mt-1 text-left">{test.procedure}</p>

                      <div className="mt-3 p-2 rounded bg-background/50 text-left">
                        <div className="grid grid-cols-1 gap-1 text-xs">
                          {test.expectedReading && (
                            <p className="text-left text-foreground/80">
                              <span className="font-medium">Expected:</span> {test.expectedReading}
                            </p>
                          )}
                          <p className="text-left text-foreground/80">
                            <span className="font-medium text-green-500">Pass:</span>{' '}
                            {test.acceptanceCriteria}
                          </p>
                        </div>
                      </div>

                      {test.toolsRequired && test.toolsRequired.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 justify-start">
                          {test.toolsRequired.map((tool, toolIdx) => (
                            <Badge key={toolIdx} variant="secondary" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {guidance.testingRequirements?.recordingNote && (
                <>
                  <Separator />
                  <p className="text-xs text-foreground/70 italic text-left p-2 bg-primary/10 rounded">
                    {guidance.testingRequirements.recordingNote}
                  </p>
                </>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};
