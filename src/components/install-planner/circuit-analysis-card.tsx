import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, AlertTriangle, DollarSign, Clock, Wrench, ShoppingCart, Hammer } from "lucide-react";
import { Circuit } from "./types";
import { getCablePricing, getRecommendedConsumerUnit } from "./consumer-unit-database";

interface CircuitAnalysisCardProps {
  circuit: Circuit;
  analysis: any;
  index: number;
}

export const CircuitAnalysisCard: React.FC<CircuitAnalysisCardProps> = ({ 
  circuit, 
  analysis, 
  index 
}) => {
  const bestRecommendation = analysis.recommendations[0];
  
  // Check if voltage drop > 3% and get next cable size if needed
  let finalRecommendation = bestRecommendation;
  if (bestRecommendation?.voltageDropPercentage > 3) {
    const nextSizeUp = analysis.recommendations.find((rec: any) => 
      rec.voltageDropPercentage <= 3 && rec.size !== bestRecommendation.size
    );
    if (nextSizeUp) {
      finalRecommendation = nextSizeUp;
    }
  }
  
  const isCompliant = finalRecommendation?.suitability === "suitable";
  const cablePricing = getCablePricing(finalRecommendation?.size, finalRecommendation?.type);
  
  const installationTime = {
    low: "2-4 hours",
    medium: "4-6 hours", 
    high: "6-8 hours"
  };

  return (
    <ResultCard 
      status={isCompliant ? "success" : "warning"}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Circuit Header */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg">{circuit.name}</h3>
              <p className="text-sm text-muted-foreground">Circuit {index + 1}</p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-center">
              {isCompliant ? 
                <CheckCircle className="h-4 w-4 text-success" /> : 
                <AlertTriangle className="h-4 w-4 text-warning" />
              }
              <Badge variant={isCompliant ? "success" : "destructive"} className="text-xs">
                {isCompliant ? "Compliant" : "Review Required"}
              </Badge>
            </div>
          </div>

          {/* Circuit Specs - Mobile First Grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="text-center p-2 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Load</p>
              <p className="font-bold text-primary">{circuit.totalLoad}W</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Voltage</p>
              <p className="font-bold text-primary">{circuit.voltage}V</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Length</p>
              <p className="font-bold text-primary">{circuit.cableLength}m</p>
            </div>
            <div className="text-center p-2 bg-muted/30 rounded">
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <p className="font-bold text-primary">{circuit.loadType}</p>
            </div>
          </div>
        </div>

        {/* Tabbed Interface for Materials and Tools */}
        {bestRecommendation && (
          <Tabs defaultValue="cable" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cable" className="text-xs">Cable</TabsTrigger>
              <TabsTrigger value="materials" className="text-xs">
                <ShoppingCart className="h-3 w-3 mr-1" />
                Materials
              </TabsTrigger>
              <TabsTrigger value="tools" className="text-xs">
                <Hammer className="h-3 w-3 mr-1" />
                Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cable" className="space-y-4 mt-4">
              {/* Cable Specification */}
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Recommended Cable</h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Size & Type</p>
                    <p className="font-medium text-primary text-sm">{finalRecommendation.size} {finalRecommendation.type.toUpperCase()}</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                    <p className="font-medium text-primary text-sm">{finalRecommendation.currentCarryingCapacity}A</p>
                  </div>
                  <div className="text-center p-2 bg-muted/30 rounded">
                    <p className="text-xs text-muted-foreground mb-1">Voltage Drop</p>
                    <p className="font-medium text-primary text-sm">{finalRecommendation.voltageDropPercentage.toFixed(2)}%</p>
                  </div>
                </div>
              </div>

              {/* Cost & Time */}
              {cablePricing && (
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">Cost & Time</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm">Cable Cost</span>
                      </div>
                      <span className="font-medium text-primary text-sm">£{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.min)}-{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.max)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Install Time</span>
                      </div>
                      <span className="font-medium text-primary text-sm">{installationTime[cablePricing.installationComplexity as keyof typeof installationTime]}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-primary" />
                        <span className="text-sm">Complexity</span>
                      </div>
                      <span className="font-medium text-primary text-sm capitalize">{cablePricing.installationComplexity}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Analysis Notes */}
              {bestRecommendation.notes.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-primary">Analysis Notes</h4>
                  <div className="space-y-1">
                    {bestRecommendation.notes.map((note: string, noteIndex: number) => (
                      <div key={noteIndex} className="p-2 bg-muted/30 rounded">
                        <span className="text-xs text-muted-foreground">• {note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="materials" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Required Materials</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">{finalRecommendation.size} {finalRecommendation.type.toUpperCase()} Cable</span>
                    <span className="text-xs text-muted-foreground">{circuit.cableLength}m</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Cable Glands</span>
                    <span className="text-xs text-muted-foreground">2 units</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Earth Sleeving</span>
                    <span className="text-xs text-muted-foreground">1m</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Cable Ties</span>
                    <span className="text-xs text-muted-foreground">10 units</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h4 className="font-medium text-primary">Required Tools</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-muted/30 rounded">
                    <span className="text-sm">Cable stripping tools</span>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <span className="text-sm">Multimeter</span>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <span className="text-sm">Drill & bits</span>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <span className="text-sm">Spirit level</span>
                  </div>
                  <div className="p-2 bg-muted/30 rounded">
                    <span className="text-sm">Insulation tester</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </ResultCard>
  );
};