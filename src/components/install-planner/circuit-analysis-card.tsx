import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, DollarSign, Clock, Wrench } from "lucide-react";
import { Circuit } from "./types";
import { getCablePricing } from "./consumer-unit-database";

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
  const isCompliant = bestRecommendation?.suitability === "suitable";
  const cablePricing = getCablePricing(bestRecommendation?.size, bestRecommendation?.type);
  
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
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{circuit.name}</h3>
            <p className="text-sm text-muted-foreground">Circuit {index + 1}</p>
          </div>
          <div className="flex items-center gap-2">
            {isCompliant ? 
              <CheckCircle className="h-5 w-5 text-green-400" /> : 
              <AlertTriangle className="h-5 w-5 text-amber-400" />
            }
            <Badge variant={isCompliant ? "default" : "destructive"}>
              {isCompliant ? "BS7671 Compliant" : "Review Required"}
            </Badge>
          </div>
        </div>

        {/* Circuit Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Load</p>
            <p className="font-bold text-primary">{circuit.totalLoad}W</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Voltage</p>
            <p className="font-bold text-primary">{circuit.voltage}V</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Length</p>
            <p className="font-bold text-primary">{circuit.cableLength}m</p>
          </div>
          <div className="bg-background/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Current</p>
            <p className="font-bold text-primary">{analysis.designCurrent.toFixed(1)}A</p>
          </div>
        </div>

        {/* Cable Recommendation */}
        {bestRecommendation && (
          <div className="space-y-3">
            <div className="bg-primary/10 rounded-lg p-4">
              <h4 className="font-medium mb-2">Recommended Cable</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Size & Type</p>
                  <p className="font-medium">{bestRecommendation.size} {bestRecommendation.type.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{bestRecommendation.currentCarryingCapacity}A</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Voltage Drop</p>
                  <p className="font-medium">{bestRecommendation.voltageDropPercentage.toFixed(2)}%</p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            {cablePricing && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cable Cost</p>
                    <p className="font-medium">£{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.min)}-{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.max)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Install Time</p>
                    <p className="font-medium">{installationTime[cablePricing.installationComplexity as keyof typeof installationTime]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
                  <Wrench className="h-4 w-4 text-purple-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Complexity</p>
                    <p className="font-medium capitalize">{cablePricing.installationComplexity}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Notes */}
            {bestRecommendation.notes.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-sm font-medium mb-2">Analysis Notes:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {bestRecommendation.notes.map((note: string, noteIndex: number) => (
                    <li key={noteIndex}>• {note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </ResultCard>
  );
};