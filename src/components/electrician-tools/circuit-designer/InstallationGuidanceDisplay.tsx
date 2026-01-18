import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Cable, CheckSquare, AlertTriangle, HardHat, Hammer, Package, FileText } from "lucide-react";
import type { 
  EnhancedInstallationGuidance, 
  TestingRequirements 
} from "@/types/circuit-design";
import { cn } from "@/lib/utils";

interface InstallationGuidanceDisplayProps {
  installationGuidance: EnhancedInstallationGuidance;
  testingRequirements?: TestingRequirements;
}

export const InstallationGuidanceDisplay = ({
  installationGuidance,
  testingRequirements
}: InstallationGuidanceDisplayProps) => {
  return (
    <div className="space-y-4">
      {/* Safety Considerations */}
      {installationGuidance.safetyConsiderations && 
       Array.isArray(installationGuidance.safetyConsiderations) && 
       installationGuidance.safetyConsiderations.length > 0 && (
        <Card className="bg-card/30 border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Safety Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {installationGuidance.safetyConsiderations.map((safety, idx) => (
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
        </Card>
      )}

      {/* Materials Required */}
      {installationGuidance.materialsRequired && 
       Array.isArray(installationGuidance.materialsRequired) && 
       installationGuidance.materialsRequired.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-500" />
              Materials Required
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {installationGuidance.materialsRequired.map((material, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Package className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm text-left text-foreground">{material.item}</p>
                  <p className="text-xs text-foreground/70 text-left mt-0.5">
                    {material.specification}
                  </p>
                  {material.source && (
                    <p className="text-xs text-foreground/70 text-left mt-0.5">
                      Source: {material.source}
                    </p>
                  )}
                </div>
                <div className="shrink-0 text-right">
                  <Badge variant="secondary" className="font-mono">
                    {material.quantity}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tools Required */}
      {installationGuidance.toolsRequired && 
       Array.isArray(installationGuidance.toolsRequired) && 
       installationGuidance.toolsRequired.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Wrench className="h-5 w-5 text-purple-500" />
              Tools Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {installationGuidance.toolsRequired.map((tool, idx) => (
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
        </Card>
      )}

      {/* Cable Routing */}
      {installationGuidance.cableRouting && 
       Array.isArray(installationGuidance.cableRouting) && 
       installationGuidance.cableRouting.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Cable className="h-5 w-5 text-primary" />
              Cable Routing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {installationGuidance.cableRouting.map((route, idx) => (
                <div key={idx} className="p-3 bg-background/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{route.step}</p>
                      <p className="text-xs text-foreground/70">Method: {route.method}</p>
                      {route.bsReference && (
                        <Badge variant="outline" className="text-xs">
                          {route.bsReference}
                        </Badge>
                      )}
                      {route.notes && (
                        <p className="text-xs text-foreground/70 italic">{route.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Termination Requirements */}
      {installationGuidance.terminationRequirements && 
       Array.isArray(installationGuidance.terminationRequirements) && 
       installationGuidance.terminationRequirements.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <HardHat className="h-5 w-5 text-primary" />
              Termination Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {installationGuidance.terminationRequirements.map((term, idx) => (
                <div key={idx} className="p-3 bg-background/30 rounded-lg">
                  <p className="text-sm font-semibold mb-1 text-foreground">{term.location}</p>
                  <p className="text-sm text-foreground/70 mb-2">{term.procedure}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-foreground/70">Tools:</span>
                    {term.toolsNeeded.map((tool, toolIdx) => (
                      <Badge key={toolIdx} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                  {term.torqueSettings && (
                    <p className="text-xs text-foreground/70 mt-1">
                      Torque: {term.torqueSettings}
                    </p>
                  )}
                  {term.bsReference && (
                    <p className="text-xs text-foreground/70 mt-1">Ref: {term.bsReference}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Installation Procedure */}
      {installationGuidance.installationProcedure && 
       Array.isArray(installationGuidance.installationProcedure) && 
       installationGuidance.installationProcedure.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-green-500" />
              Installation Procedure
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {/* Vertical timeline line */}
            {installationGuidance.installationProcedure.length > 1 && (
              <div className="absolute left-4 top-8 bottom-4 w-0.5 bg-primary/20" />
            )}

            <div className="space-y-4">
              {installationGuidance.installationProcedure.map((step, idx) => (
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
        </Card>
      )}

      {/* Testing Requirements */}
      {testingRequirements && 
       testingRequirements.tests && 
       Array.isArray(testingRequirements.tests) && 
       testingRequirements.tests.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <CheckSquare className="h-5 w-5 text-teal-500" />
              Testing Requirements
            </CardTitle>
            {testingRequirements.intro && (
              <p className="text-sm text-foreground/70 text-left">{testingRequirements.intro}</p>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {testingRequirements.tests.map((test, idx) => (
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
            {testingRequirements.recordingNote && (
              <p className="text-xs text-foreground/70 italic text-left p-2 bg-primary/10 rounded mt-3">
                {testingRequirements.recordingNote}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
