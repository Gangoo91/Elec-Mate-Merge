import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedInstallationGuidance } from "@/types/circuit-design";
import { CircuitDesign } from "@/types/installation-design";
import { InstallationGuidancePanel } from "./InstallationGuidancePanel";
import { Wrench, AlertCircle } from "lucide-react";

// The backend may return either EnhancedInstallationGuidance directly or wrapped in { guidance: EnhancedInstallationGuidance }
type GuidanceEntry = EnhancedInstallationGuidance | { guidance: EnhancedInstallationGuidance };

interface InstallationGuidancePerCircuitPanelProps {
  guidance: Record<string, GuidanceEntry>;
  circuits: CircuitDesign[];
}

// Helper to extract the actual guidance object
const extractGuidance = (entry: GuidanceEntry): EnhancedInstallationGuidance | undefined => {
  if (!entry) return undefined;
  // Check if it's wrapped in { guidance: ... }
  if ('guidance' in entry && entry.guidance && typeof entry.guidance === 'object') {
    return entry.guidance as EnhancedInstallationGuidance;
  }
  // Otherwise it's the direct object - check for expected properties
  if ('safetyConsiderations' in entry || 'materialsRequired' in entry || 'executiveSummary' in entry) {
    return entry as EnhancedInstallationGuidance;
  }
  return undefined;
};

export const InstallationGuidancePerCircuitPanel = ({ 
  guidance, 
  circuits 
}: InstallationGuidancePerCircuitPanelProps) => {
  const [selectedCircuitKey, setSelectedCircuitKey] = useState<string>(
    Object.keys(guidance)[0] || 'circuit_0'
  );

  // Handle case where no guidance available
  if (!guidance || Object.keys(guidance).length === 0) {
    return (
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium">No installation guidance available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Installation guidance will be generated when circuits are designed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Extract circuit identifiers from guidance keys
  const circuitKeys = Object.keys(guidance);
  const currentGuidance = guidance[selectedCircuitKey];

  // Find matching circuit to show its name
  const circuitIndex = parseInt(selectedCircuitKey.replace('circuit_', ''));
  const currentCircuit = circuits[circuitIndex];

  return (
    <div className="space-y-4">
      {/* Circuit Selector */}
      <Tabs value={selectedCircuitKey} onValueChange={setSelectedCircuitKey}>
        <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-muted/50 p-2">
          {circuitKeys.map((key) => {
            const idx = parseInt(key.replace('circuit_', ''));
            const circuit = circuits[idx];
            const circuitName = circuit?.name || `Circuit ${idx + 1}`;
            
            return (
              <TabsTrigger 
                key={key} 
                value={key}
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm"
              >
                <Wrench className="h-4 w-4 mr-2" />
                {circuitName}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Display guidance for selected circuit */}
        {circuitKeys.map((key) => {
          const extractedGuidance = extractGuidance(guidance[key]);
          return (
            <TabsContent key={key} value={key} className="mt-4">
              {extractedGuidance ? (
                <>
                  {/* Circuit Header */}
                  <Card className="mb-4 border-primary/20 bg-primary/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wrench className="h-5 w-5 text-primary" />
                        {currentCircuit?.name || `Circuit ${circuitIndex + 1}`}
                        <Badge variant="outline" className="ml-auto">
                          {currentCircuit?.loadType || 'Unknown Load'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Cable Size</p>
                          <p className="font-medium">{currentCircuit?.cableSize || '—'}mm²</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Protection</p>
                          <p className="font-medium">
                            {typeof currentCircuit?.protectionDevice === 'object' 
                              ? `${currentCircuit.protectionDevice.rating}A ${currentCircuit.protectionDevice.type} ${currentCircuit.protectionDevice.curve}`
                              : currentCircuit?.protectionDevice || '—'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Power</p>
                          <p className="font-medium">{currentCircuit?.loadPower || '—'}W</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Length</p>
                          <p className="font-medium">{currentCircuit?.cableLength || '—'}m</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Render guidance using existing component */}
                  <InstallationGuidancePanel guidance={extractedGuidance} />
              </>
            ) : (
              <Card className="border-warning/50 bg-warning/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">No guidance available for this circuit</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        This circuit may not have been fully processed yet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
