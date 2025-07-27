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
        <div className="grid grid-cols-1 gap-3">
          <div className="text-center p-3 border border-elec-yellow/20">
            <p className="text-xs text-muted-foreground mb-1">Load</p>
            <p className="font-bold text-elec-yellow">{circuit.totalLoad}W</p>
          </div>
          <div className="text-center p-3 border border-elec-yellow/20">
            <p className="text-xs text-muted-foreground mb-1">Voltage</p>
            <p className="font-bold text-elec-yellow">{circuit.voltage}V</p>
          </div>
          <div className="text-center p-3 border border-elec-yellow/20">
            <p className="text-xs text-muted-foreground mb-1">Length</p>
            <p className="font-bold text-elec-yellow">{circuit.cableLength}m</p>
          </div>
          <div className="text-center p-3 border border-elec-yellow/20">
            <p className="text-xs text-muted-foreground mb-1">Current</p>
            <p className="font-bold text-elec-yellow">{analysis.designCurrent.toFixed(1)}A</p>
          </div>
        </div>

        {/* Cable Recommendation */}
        {bestRecommendation && (
          <div className="space-y-3">
          <div className="space-y-3 border-b border-elec-yellow/20 pb-4">
            <h4 className="font-medium text-elec-yellow">Recommended Cable</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Size & Type</p>
                <p className="font-medium text-elec-yellow">{bestRecommendation.size} {bestRecommendation.type.toUpperCase()}</p>
              </div>
              <div className="p-3 border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Capacity</p>
                <p className="font-medium text-elec-yellow">{bestRecommendation.currentCarryingCapacity}A</p>
              </div>
              <div className="p-3 border border-elec-yellow/20 text-center">
                <p className="text-xs text-muted-foreground mb-1">Voltage Drop</p>
                <p className="font-medium text-elec-yellow">{bestRecommendation.voltageDropPercentage.toFixed(2)}%</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          {cablePricing && (
            <div className="space-y-3 border-b border-elec-yellow/20 pb-4">
              <h4 className="font-medium text-elec-yellow">Cost & Time Estimates</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-3 p-3 border border-elec-yellow/20">
                  <DollarSign className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cable Cost</p>
                    <p className="font-medium text-elec-yellow">£{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.min)}-{Math.round((circuit.cableLength / 100) * cablePricing.priceRange.max)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-elec-yellow/20">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <p className="text-xs text-muted-foreground">Install Time</p>
                    <p className="font-medium text-elec-yellow">{installationTime[cablePricing.installationComplexity as keyof typeof installationTime]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-elec-yellow/20">
                  <Wrench className="h-4 w-4 text-elec-yellow" />
                  <div>
                    <p className="text-xs text-muted-foreground">Complexity</p>
                    <p className="font-medium text-elec-yellow capitalize">{cablePricing.installationComplexity}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis Notes */}
          {bestRecommendation.notes.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-elec-yellow">Analysis Notes:</p>
              <div className="space-y-1">
                {bestRecommendation.notes.map((note: string, noteIndex: number) => (
                  <div key={noteIndex} className="p-2 border border-elec-yellow/20">
                    <span className="text-xs text-muted-foreground">• {note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        )}
      </div>
    </ResultCard>
  );
};