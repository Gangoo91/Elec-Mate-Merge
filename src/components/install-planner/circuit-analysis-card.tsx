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
  // Use same logic as single circuit - only show suitable cables as recommended
  const suitableCables = analysis.recommendations.filter((rec: any) => rec.suitability === "suitable");
  const recommendedCable = suitableCables.length > 0 ? suitableCables[0] : null;
  const closestNonCompliant = suitableCables.length === 0 ? analysis.recommendations[0] : null;
  
  const isCompliant = recommendedCable !== null;
  const finalRecommendation = recommendedCable || closestNonCompliant;

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
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">✓ BS 7671 Compliant</Badge> : 
                <Badge className="bg-red-500/20 text-red-300 border-red-500/30">❌ Non-Compliant</Badge>
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

        {/* Non-Compliance Warning */}
        {!isCompliant && closestNonCompliant && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
            <p className="text-sm text-red-300">
              <strong>No compliant cable found.</strong> Closest option ({closestNonCompliant.size}) has {closestNonCompliant.voltageDropPercentage.toFixed(2)}% voltage drop, 
              exceeding BS 7671 limits. Consider design modifications.
            </p>
          </div>
        )}

        {/* Cable Recommendation */}
        {finalRecommendation && (
          <div className="space-y-3">
            <h4 className="font-medium text-primary">
              {isCompliant ? "Recommended Cable" : "Closest Non-Compliant Option"}
            </h4>
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
                <span className={`font-bold ${isCompliant ? 'text-primary' : 'text-red-400'}`}>
                  {finalRecommendation.voltageDropPercentage.toFixed(2)}%
                  {!isCompliant && (
                    <span className="text-xs text-red-400 ml-1">EXCEEDS LIMIT</span>
                  )}
                </span>
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