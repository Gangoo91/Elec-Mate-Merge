import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Wrench, Package, AlertTriangle, CheckCircle2, FileText, TestTube2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { EnhancedInstallationGuidance } from '@/types/circuit-design';

interface MobileInstallationGuidanceSectionProps {
  circuit: any;
}

export const MobileInstallationGuidanceSection = ({ circuit }: MobileInstallationGuidanceSectionProps) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    summary: true,
    safety: false,
    materials: false,
    tools: false,
    procedure: false,
    testing: false
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Check if we have structured installation guidance
  const isStructured = circuit.installationGuidance && 
    typeof circuit.installationGuidance === 'object' && 
    !Array.isArray(circuit.installationGuidance);

  // If it's just a string or not available
  if (!circuit.installationGuidance || typeof circuit.installationGuidance === 'string') {
    return (
      <Card className="bg-elec-card border-elec-yellow/20">
        <CardContent className="p-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-elec-yellow" />
            <span className="font-semibold text-foreground">Installation Guidance</span>
          </div>
          {typeof circuit.installationGuidance === 'string' ? (
            <p className="text-foreground leading-relaxed text-left whitespace-pre-line">
              {circuit.installationGuidance}
            </p>
          ) : (
            <p className="text-foreground/70">
              Installation guidance not yet available. Regenerate this circuit to get practical installation advice.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  const guidance = circuit.installationGuidance as EnhancedInstallationGuidance;

  return (
    <div className="space-y-3">
      {/* Executive Summary - Featured Card with elec-yellow gradient */}
      {guidance.executiveSummary && (
        <Card className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <h3 className="font-bold text-foreground text-lg">Installation Overview</h3>
            </div>
            <p className="text-sm text-foreground leading-relaxed text-left">
              {guidance.executiveSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Safety Considerations - Collapsible */}
      {guidance.safetyConsiderations && guidance.safetyConsiderations.length > 0 && (
        <Collapsible open={openSections.safety} onOpenChange={() => toggleSection('safety')}>
          <Card className="bg-elec-card border-elec-yellow/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[52px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Safety Considerations ({guidance.safetyConsiderations.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-foreground",
                    openSections.safety && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-0">
                {guidance.safetyConsiderations.map((safety, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-lg p-4 text-left border-l-4",
                      safety.priority === 'critical' && "border-l-red-500 bg-red-500/10",
                      safety.priority === 'high' && "border-l-orange-500 bg-orange-500/10",
                      safety.priority === 'medium' && "border-l-yellow-500 bg-yellow-500/10"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={cn(
                          "h-5 w-5 shrink-0 mt-0.5",
                          safety.priority === 'critical' && "text-red-500",
                          safety.priority === 'high' && "text-orange-500",
                          safety.priority === 'medium' && "text-yellow-500"
                        )}
                      />
                      <div className="space-y-2 text-left flex-1">
                        <p className="font-semibold text-sm text-left text-foreground leading-relaxed">
                          {safety.consideration}
                        </p>
                        {(safety.bsReference || (safety.toolsRequired && safety.toolsRequired.length > 0)) && (
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
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Materials Required - Collapsible with elec-yellow accents */}
      {guidance.materialsRequired && guidance.materialsRequired.length > 0 && (
        <Collapsible open={openSections.materials} onOpenChange={() => toggleSection('materials')}>
          <Card className="bg-elec-card border-elec-yellow/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[52px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-elec-yellow" />
                    Materials Required ({guidance.materialsRequired.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-foreground",
                    openSections.materials && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-0">
                {guidance.materialsRequired.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors text-left"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center">
                      <Package className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-sm text-left text-foreground">{material.item}</p>
                      <p className="text-xs text-foreground/70 text-left mt-0.5 leading-relaxed">
                        {material.specification}
                      </p>
                      {material.source && (
                        <p className="text-xs text-foreground/70 text-left mt-0.5">
                          Source: {material.source}
                        </p>
                      )}
                    </div>
                    <Badge variant="secondary" className="font-mono text-xs shrink-0 border-elec-yellow/30">
                      {material.quantity}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Tools Required - Collapsible */}
      {guidance.toolsRequired && guidance.toolsRequired.length > 0 && (
        <Collapsible open={openSections.tools} onOpenChange={() => toggleSection('tools')}>
          <Card className="bg-elec-card border-elec-yellow/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[52px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-purple-500" />
                    Tools Required ({guidance.toolsRequired.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-foreground",
                    openSections.tools && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 gap-3 pt-0">
                {guidance.toolsRequired.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-elec-card/50 border-elec-yellow/10 text-left"
                  >
                    <Wrench className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm text-left text-foreground">{tool.tool}</p>
                      <p className="text-xs text-foreground/70 text-left leading-relaxed">{tool.purpose}</p>
                      <Badge variant="secondary" className="mt-1.5 text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Installation Procedure - Collapsible with elec-yellow timeline */}
      {guidance.installationProcedure && guidance.installationProcedure.length > 0 && (
        <Collapsible open={openSections.procedure} onOpenChange={() => toggleSection('procedure')}>
          <Card className="bg-elec-card border-elec-yellow/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[52px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Installation Procedure ({guidance.installationProcedure.length} steps)
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-foreground",
                    openSections.procedure && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="relative pt-0">
                {/* Vertical timeline line - elec-yellow */}
                {guidance.installationProcedure.length > 1 && (
                  <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-elec-yellow/20" />
                )}

                <div className="space-y-4">
                  {guidance.installationProcedure.map((step, idx) => (
                    <div key={idx} className="relative flex gap-4 text-left">
                      {/* Step number circle - elec-yellow */}
                      <div className="shrink-0 w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center text-sm font-bold z-10">
                        {step.stepNumber}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2 text-left">
                        <p className="font-semibold text-sm text-left text-foreground leading-relaxed">
                          {step.title}
                        </p>
                        <p className="text-xs text-foreground/70 mt-1 leading-relaxed text-left">
                          {step.description}
                        </p>

                        {/* Tools as inline badges */}
                        {step.toolsForStep && step.toolsForStep.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2 justify-start">
                            {step.toolsForStep.map((tool, toolIdx) => (
                              <Badge key={toolIdx} variant="outline" className="text-xs border-elec-yellow/30">
                                <Wrench className="h-3 w-3 mr-1" />
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* BS Reference */}
                        {step.bsReferences && step.bsReferences.length > 0 && (
                          <p className="text-xs text-elec-yellow/70 mt-2 text-left">
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
      )}

      {/* Testing Requirements - Collapsible */}
      {guidance.testingRequirements?.tests && guidance.testingRequirements.tests.length > 0 && (
        <Collapsible open={openSections.testing} onOpenChange={() => toggleSection('testing')}>
          <Card className="bg-elec-card border-elec-yellow/20">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 active:bg-accent/10 transition-all min-h-[52px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-foreground">
                  <span className="flex items-center gap-2">
                    <TestTube2 className="h-5 w-5 text-teal-500" />
                    Testing Requirements ({guidance.testingRequirements.tests.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform text-foreground",
                    openSections.testing && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-3 pt-0">
                {guidance.testingRequirements.intro && (
                  <>
                    <p className="text-sm text-foreground text-left leading-relaxed">{guidance.testingRequirements.intro}</p>
                    <Separator className="my-2" />
                  </>
                )}
                {guidance.testingRequirements.tests.map((test, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg border border-teal-500/30 bg-teal-500/5 text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-teal-500">{idx + 1}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm text-left text-foreground leading-relaxed">
                            {test.testName}
                          </p>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {test.regulation}
                          </Badge>
                        </div>
                        <p className="text-xs text-foreground/70 text-left leading-relaxed">
                          {test.procedure}
                        </p>

                        <div className="mt-3 p-2 rounded bg-background/30 text-left">
                          <div className="space-y-1 text-xs">
                            {test.expectedReading && (
                              <p className="text-left text-foreground/80">
                                <span className="font-medium text-foreground">Expected:</span> {test.expectedReading}
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
                {guidance.testingRequirements.recordingNote && (
                  <>
                    <Separator className="my-2" />
                    <p className="text-xs text-foreground/70 italic text-left p-3 bg-elec-yellow/10 rounded border border-elec-yellow/20">
                      {guidance.testingRequirements.recordingNote}
                    </p>
                  </>
                )}
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  );
};
