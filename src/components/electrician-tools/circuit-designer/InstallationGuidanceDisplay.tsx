import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Cable, CheckSquare, AlertTriangle, HardHat, Hammer } from "lucide-react";
import type { 
  EnhancedInstallationGuidance, 
  TestingRequirements 
} from "@/types/circuit-design";

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
      {installationGuidance.safetyConsiderations && installationGuidance.safetyConsiderations.length > 0 && (
        <Card className="bg-card/30 border-destructive/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Safety Considerations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {installationGuidance.safetyConsiderations.map((safety, idx) => (
              <div key={idx} className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <div className="flex items-start gap-3">
                  <Badge variant={safety.priority === 'critical' ? 'destructive' : 'secondary'} className="mt-0.5">
                    {safety.priority}
                  </Badge>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{safety.consideration}</p>
                    {safety.toolsRequired && safety.toolsRequired.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Tools: {safety.toolsRequired.join(', ')}
                      </p>
                    )}
                    {safety.bsReference && (
                      <p className="text-xs text-muted-foreground">Ref: {safety.bsReference}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Materials Required */}
      {installationGuidance.materialsRequired && installationGuidance.materialsRequired.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Hammer className="h-5 w-5 text-primary" />
              Materials Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {installationGuidance.materialsRequired.map((material, idx) => (
                <div key={idx} className="flex items-start gap-3 p-2 bg-background/30 rounded">
                  <CheckSquare className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <p className="font-medium">{material.item}</p>
                    <p className="text-xs text-muted-foreground">{material.specification}</p>
                    <p className="text-xs text-muted-foreground">Quantity: {material.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tools Required */}
      {installationGuidance.toolsRequired && installationGuidance.toolsRequired.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Tools Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {installationGuidance.toolsRequired.map((tool, idx) => (
                <div key={idx} className="p-2 bg-background/30 rounded text-sm">
                  <p className="font-medium">{tool.tool}</p>
                  <p className="text-xs text-muted-foreground">{tool.purpose}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cable Routing */}
      {installationGuidance.cableRouting && installationGuidance.cableRouting.length > 0 && (
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
                      <p className="text-sm font-medium">{route.step}</p>
                      <p className="text-xs text-muted-foreground">Method: {route.method}</p>
                      {route.bsReference && (
                        <Badge variant="outline" className="text-xs">
                          {route.bsReference}
                        </Badge>
                      )}
                      {route.notes && (
                        <p className="text-xs text-muted-foreground italic">{route.notes}</p>
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
      {installationGuidance.terminationRequirements && installationGuidance.terminationRequirements.length > 0 && (
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
                  <p className="text-sm font-semibold mb-1">{term.location}</p>
                  <p className="text-sm text-muted-foreground mb-2">{term.procedure}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-muted-foreground">Tools:</span>
                    {term.toolsNeeded.map((tool, toolIdx) => (
                      <Badge key={toolIdx} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                  {term.torqueSettings && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Torque: {term.torqueSettings}
                    </p>
                  )}
                  {term.bsReference && (
                    <p className="text-xs text-muted-foreground mt-1">Ref: {term.bsReference}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Installation Procedure */}
      {installationGuidance.installationProcedure && installationGuidance.installationProcedure.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">
              Installation Procedure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {installationGuidance.installationProcedure.map((step, idx) => (
                <div key={idx} className="p-3 bg-background/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-semibold text-sm">{step.title}</p>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      {step.toolsForStep && step.toolsForStep.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {step.toolsForStep.map((tool, toolIdx) => (
                            <Badge key={toolIdx} variant="outline" className="text-xs">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {step.bsReferences && step.bsReferences.length > 0 && (
                        <p className="text-xs text-muted-foreground">
                          Refs: {step.bsReferences.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Requirements */}
      {testingRequirements && testingRequirements.tests && testingRequirements.tests.length > 0 && (
        <Card className="bg-card/30 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-base sm:text-lg">
              Testing Requirements
            </CardTitle>
            {testingRequirements.intro && (
              <p className="text-sm text-muted-foreground">{testingRequirements.intro}</p>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testingRequirements.tests.map((test, idx) => (
                <div key={idx} className="p-3 bg-background/30 rounded-lg">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-semibold text-sm">{test.testName}</p>
                    <Badge variant="outline" className="text-xs">
                      {test.regulation}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{test.procedure}</p>
                  {test.expectedReading && (
                    <p className="text-xs text-muted-foreground mb-1">
                      Expected: {test.expectedReading}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mb-2">
                    Acceptance: {test.acceptanceCriteria}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {test.toolsRequired.map((tool, toolIdx) => (
                      <Badge key={toolIdx} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {testingRequirements.recordingNote && (
              <p className="text-xs text-muted-foreground mt-3 p-2 bg-primary/10 rounded">
                {testingRequirements.recordingNote}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
