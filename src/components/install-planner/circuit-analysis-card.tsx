import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { Circuit } from "./types";

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

  return (
    <ResultCard 
      status={isCompliant ? "success" : "warning"}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Circuit Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">{circuit.name}</h3>
              <p className="text-sm text-muted-foreground">Circuit {index + 1}</p>
            </div>
            <div className="text-right">
              {isCompliant ? 
                <span className="text-sm text-success">✓ Compliant</span> : 
                <span className="text-sm text-warning">⚠ Review Required</span>
              }
            </div>
          </div>

          {/* Circuit Parameters - Stacked 1/1/1/1 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Load</span>
              <span className="font-bold text-primary">{circuit.totalLoad}W</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Voltage</span>
              <span className="font-bold text-primary">{circuit.voltage}V</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Length</span>
              <span className="font-bold text-primary">{circuit.cableLength}m</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="font-bold text-primary">{circuit.loadType}</span>
            </div>
          </div>
        </div>

        {/* Cable Recommendation */}
        {finalRecommendation && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary">Recommended Cable</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Size & Type</span>
                <span className="font-bold text-primary">{finalRecommendation.size} {finalRecommendation.type.toUpperCase()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Capacity</span>
                <span className="font-bold text-primary">{finalRecommendation.currentCarryingCapacity}A</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Voltage Drop</span>
                <span className="font-bold text-primary">{finalRecommendation.voltageDropPercentage.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Notes */}
        {bestRecommendation?.notes?.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-primary">Notes</h4>
            <div className="space-y-1">
              {bestRecommendation.notes.map((note: string, noteIndex: number) => (
                <div key={noteIndex} className="p-2 bg-amber-500/10 border border-amber-500/30 rounded">
                  <span className="text-sm text-amber-300">• {note}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ResultCard>
  );
};