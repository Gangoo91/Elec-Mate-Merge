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
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-4 text-center text-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-white">Installation Guidance</span>
          </div>
          {typeof circuit.installationGuidance === 'string' ? (
            <p className="text-white leading-relaxed text-left whitespace-pre-line">
              {circuit.installationGuidance}
            </p>
          ) : (
            <p className="text-white/70">
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
      {/* Executive Summary */}
      {guidance.executiveSummary && (
        <Card className="bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-400" />
              <h3 className="font-bold text-white text-base">Installation Overview</h3>
            </div>
            <p className="text-sm text-white leading-relaxed text-left">
              {guidance.executiveSummary}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Safety Considerations - Collapsible */}
      {guidance.safetyConsiderations && guidance.safetyConsiderations.length > 0 && (
        <Collapsible open={openSections.safety} onOpenChange={() => toggleSection('safety')}>
          <Card className="bg-card/50 border-red-500/30">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors min-h-[48px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Safety ({guidance.safetyConsiderations.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform text-white",
                    openSections.safety && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2 pt-0">
                {guidance.safetyConsiderations.map((safety, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-lg p-3 text-left border-l-4",
                      safety.priority === 'critical' && "border-l-red-500 bg-red-500/10",
                      safety.priority === 'high' && "border-l-orange-500 bg-orange-500/10",
                      safety.priority === 'medium' && "border-l-yellow-500 bg-yellow-500/10"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle
                        className={cn(
                          "h-4 w-4 shrink-0 mt-0.5",
                          safety.priority === 'critical' && "text-red-500",
                          safety.priority === 'high' && "text-orange-500",
                          safety.priority === 'medium' && "text-yellow-500"
                        )}
                      />
                      <div className="space-y-1.5 text-left flex-1">
                        <p className="font-semibold text-xs text-left text-white leading-relaxed">
                          {safety.consideration}
                        </p>
                        {(safety.bsReference || (safety.toolsRequired && safety.toolsRequired.length > 0)) && (
                          <div className="flex flex-wrap gap-1.5 text-[10px] text-white/60">
                            {safety.bsReference && (
                              <span className="inline-flex items-center gap-1">
                                <FileText className="h-3 w-3" /> {safety.bsReference}
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

      {/* Materials Required - Collapsible */}
      {guidance.materialsRequired && guidance.materialsRequired.length > 0 && (
        <Collapsible open={openSections.materials} onOpenChange={() => toggleSection('materials')}>
          <Card className="bg-card/50 border-blue-500/30">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors min-h-[48px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-500" />
                    Materials ({guidance.materialsRequired.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform text-white",
                    openSections.materials && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2 pt-0">
                {guidance.materialsRequired.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-muted/20 text-left"
                  >
                    <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Package className="h-3 w-3 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="font-medium text-xs text-left text-white">{material.item}</p>
                      <p className="text-[10px] text-white/60 text-left mt-0.5 leading-relaxed">
                        {material.specification}
                      </p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px] shrink-0">
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
          <Card className="bg-card/50 border-purple-500/30">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors min-h-[48px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-purple-500" />
                    Tools ({guidance.toolsRequired.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform text-white",
                    openSections.tools && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="grid grid-cols-1 gap-2 pt-0">
                {guidance.toolsRequired.map((tool, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2 rounded-lg border bg-card/30 text-left"
                  >
                    <Wrench className="h-3 w-3 text-purple-500 shrink-0 mt-0.5" />
                    <div className="flex-1 text-left">
                      <p className="font-medium text-xs text-left text-white">{tool.tool}</p>
                      <p className="text-[10px] text-white/60 text-left leading-relaxed">{tool.purpose}</p>
                      <Badge variant="secondary" className="mt-1 text-[10px]">
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

      {/* Installation Procedure - Collapsible */}
      {guidance.installationProcedure && guidance.installationProcedure.length > 0 && (
        <Collapsible open={openSections.procedure} onOpenChange={() => toggleSection('procedure')}>
          <Card className="bg-card/50 border-green-500/30">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors min-h-[48px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Procedure ({guidance.installationProcedure.length} steps)
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform text-white",
                    openSections.procedure && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="relative pt-0">
                {/* Vertical timeline line */}
                {guidance.installationProcedure.length > 1 && (
                  <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-primary/20" />
                )}

                <div className="space-y-3">
                  {guidance.installationProcedure.map((step, idx) => (
                    <div key={idx} className="relative flex gap-3 text-left">
                      {/* Step number circle */}
                      <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10">
                        {step.stepNumber}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2 text-left">
                        <p className="font-semibold text-xs text-left text-white leading-relaxed">
                          {step.title}
                        </p>
                        <p className="text-[10px] text-white/70 mt-1 leading-relaxed text-left">
                          {step.description}
                        </p>

                        {/* Tools as inline badges */}
                        {step.toolsForStep && step.toolsForStep.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5 justify-start">
                            {step.toolsForStep.map((tool, toolIdx) => (
                              <Badge key={toolIdx} variant="outline" className="text-[9px]">
                                <Wrench className="h-2.5 w-2.5 mr-0.5" />
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* BS Reference */}
                        {step.bsReferences && step.bsReferences.length > 0 && (
                          <p className="text-[10px] text-primary/70 mt-1.5 text-left">
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
          <Card className="bg-card/50 border-teal-500/30">
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer hover:bg-accent/5 transition-colors min-h-[48px] touch-manipulation pb-3">
                <CardTitle className="text-sm font-bold flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <TestTube2 className="h-4 w-4 text-teal-500" />
                    Testing ({guidance.testingRequirements.tests.length})
                  </span>
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform text-white",
                    openSections.testing && "rotate-180"
                  )} />
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-2 pt-0">
                {guidance.testingRequirements.intro && (
                  <>
                    <p className="text-xs text-white text-left leading-relaxed">{guidance.testingRequirements.intro}</p>
                    <Separator className="my-2" />
                  </>
                )}
                {guidance.testingRequirements.tests.map((test, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-teal-500/30 bg-teal-500/5 text-left"
                  >
                    <div className="flex items-start gap-2">
                      <div className="shrink-0 w-5 h-5 rounded-full border-2 border-teal-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-teal-500">{idx + 1}</span>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-xs text-left text-white leading-relaxed">
                            {test.testName}
                          </p>
                          <Badge variant="outline" className="text-[9px] shrink-0">
                            {test.regulation}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-white/70 text-left leading-relaxed">
                          {test.procedure}
                        </p>

                        <div className="mt-2 p-2 rounded bg-background/30 text-left">
                          <div className="space-y-0.5 text-[10px]">
                            {test.expectedReading && (
                              <p className="text-left text-white/70">
                                <span className="font-medium text-white">Expected:</span> {test.expectedReading}
                              </p>
                            )}
                            <p className="text-left text-white/70">
                              <span className="font-medium text-green-500">Pass:</span>{' '}
                              {test.acceptanceCriteria}
                            </p>
                          </div>
                        </div>

                        {test.toolsRequired && test.toolsRequired.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1.5 justify-start">
                            {test.toolsRequired.map((tool, toolIdx) => (
                              <Badge key={toolIdx} variant="secondary" className="text-[9px]">
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
                    <p className="text-[10px] text-white/60 italic text-left p-2 bg-primary/10 rounded leading-relaxed">
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
