import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, CheckCircle2, Wrench, Package, TestTube2, FileText } from "lucide-react";
import { EnhancedInstallationGuidance } from "@/types/circuit-design";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      default: return 'text-yellow-500';
    }
  };

  return (
    <div className="space-y-4">
      {/* Executive Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Installation Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {guidance.executiveSummary}
          </p>
        </CardContent>
      </Card>

      {/* Safety Considerations */}
      <Collapsible open={openSections.safety} onOpenChange={() => toggleSection('safety')}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('safety')}>
            <CollapsibleTrigger className="w-full">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Safety Considerations ({guidance.safetyConsiderations?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.safety ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {guidance.safetyConsiderations?.map((safety, idx) => (
                <div key={idx} className="border-l-2 border-red-500/50 pl-3 py-2">
                  <div className="flex items-start gap-2 mb-1">
                    <Badge variant="outline" className={getPriorityColor(safety.priority)}>
                      {safety.priority}
                    </Badge>
                    <p className="text-sm font-medium flex-1">{safety.consideration}</p>
                  </div>
                  {safety.bsReference && (
                    <p className="text-xs text-muted-foreground mt-1">
                      BS 7671: {safety.bsReference}
                    </p>
                  )}
                  {safety.toolsRequired && safety.toolsRequired.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Tools: {safety.toolsRequired.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Materials Required */}
      <Collapsible open={openSections.materials} onOpenChange={() => toggleSection('materials')}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('materials')}>
            <CollapsibleTrigger className="w-full">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-500" />
                  Materials Required ({guidance.materialsRequired?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.materials ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {guidance.materialsRequired?.map((material, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <p className="text-sm font-medium">{material.item}</p>
                    <p className="text-xs text-muted-foreground mt-1">{material.specification}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-medium">Qty: {material.quantity}</span>
                      {material.source && (
                        <span className="text-xs text-muted-foreground">{material.source}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Tools Required */}
      <Collapsible open={openSections.tools} onOpenChange={() => toggleSection('tools')}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('tools')}>
            <CollapsibleTrigger className="w-full">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-purple-500" />
                  Tools Required ({guidance.toolsRequired?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.tools ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {guidance.toolsRequired?.map((tool, idx) => (
                  <div key={idx} className="border rounded-lg p-2">
                    <p className="text-sm font-medium">{tool.tool}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tool.purpose}</p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {tool.category}
                    </Badge>
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
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('procedure')}>
            <CollapsibleTrigger className="w-full">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Installation Procedure ({guidance.installationProcedure?.length || 0} steps)
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.procedure ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {guidance.installationProcedure?.map((step, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Badge variant="outline" className="shrink-0">Step {step.stepNumber}</Badge>
                    <p className="text-sm font-medium">{step.title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-12">
                    {step.description}
                  </p>
                  {step.toolsForStep && step.toolsForStep.length > 0 && (
                    <div className="ml-12 mt-2 flex flex-wrap gap-1">
                      {step.toolsForStep.map((tool, toolIdx) => (
                        <Badge key={toolIdx} variant="secondary" className="text-xs">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {step.bsReferences && step.bsReferences.length > 0 && (
                    <p className="text-xs text-muted-foreground ml-12 mt-2">
                      BS 7671: {step.bsReferences.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Testing Requirements */}
      <Collapsible open={openSections.testing} onOpenChange={() => toggleSection('testing')}>
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => toggleSection('testing')}>
            <CollapsibleTrigger className="w-full">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <TestTube2 className="h-5 w-5 text-teal-500" />
                  Testing Requirements ({guidance.testingRequirements?.tests?.length || 0})
                </span>
                <ChevronDown className={`h-5 w-5 transition-transform ${openSections.testing ? 'rotate-180' : ''}`} />
              </CardTitle>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="space-y-3">
              {guidance.testingRequirements?.intro && (
                <>
                  <p className="text-sm text-muted-foreground">{guidance.testingRequirements.intro}</p>
                  <Separator />
                </>
              )}
              {guidance.testingRequirements?.tests?.map((test, idx) => (
                <div key={idx} className="border rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Badge variant="outline">{idx + 1}</Badge>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{test.testName}</p>
                      <p className="text-xs text-muted-foreground">{test.regulation}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{test.procedure}</p>
                  {test.expectedReading && (
                    <p className="text-xs mt-2"><strong>Expected:</strong> {test.expectedReading}</p>
                  )}
                  <p className="text-xs mt-1"><strong>Pass Criteria:</strong> {test.acceptanceCriteria}</p>
                </div>
              ))}
              {guidance.testingRequirements?.recordingNote && (
                <>
                  <Separator />
                  <p className="text-xs text-muted-foreground italic">
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
