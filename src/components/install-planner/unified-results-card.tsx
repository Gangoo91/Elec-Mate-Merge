import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Zap, Shield, Cable } from "lucide-react";
import { InstallPlanData, CableRecommendation } from "./types";

interface UnifiedResultsCardProps {
  planData: InstallPlanData;
  recommendations: CableRecommendation[];
  designCurrent: number;
  zsValue: number;
  maxZs: number;
  circuitName?: string;
  circuitIndex?: number;
}

export const UnifiedResultsCard: React.FC<UnifiedResultsCardProps> = ({
  planData,
  recommendations,
  designCurrent,
  zsValue,
  maxZs,
  circuitName,
  circuitIndex
}) => {
  const suitableCables = recommendations.filter(rec => rec.suitability === "suitable");
  const recommendedCable = suitableCables.length > 0 ? suitableCables[0] : null;
  const closestNonCompliant = suitableCables.length === 0 ? recommendations[0] : null;
  const finalRecommendation = recommendedCable || closestNonCompliant;
  
  const isCompliant = recommendedCable !== null;
  const zsCompliance = zsValue <= maxZs;

  const getMaxVoltageDropPercentage = (loadType: string): number => {
    const lightingLoads = ["lighting", "emergency", "emergency-lighting"];
    return lightingLoads.includes(loadType) ? 3 : 5;
  };

  const maxVdPercent = getMaxVoltageDropPercentage(planData.loadType);
  const voltageDropCompliance = finalRecommendation ? 
    finalRecommendation.voltageDropPercentage <= maxVdPercent : false;

  return (
    <ResultCard 
      status={isCompliant ? "success" : "warning"}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Circuit Header */}
        {circuitName && (
          <div className="flex items-center justify-between border-b border-elec-yellow/20 pb-3">
            <div>
              <h3 className="font-semibold text-lg text-white">{circuitName}</h3>
              {circuitIndex !== undefined && (
                <p className="text-sm text-muted-foreground">Circuit {circuitIndex + 1}</p>
              )}
            </div>
            <Badge className={`${
              isCompliant 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-red-500/20 text-red-300 border-red-500/30'
            }`}>
              {isCompliant ? '✓ BS 7671 Compliant' : '❌ Non-Compliant'}
            </Badge>
          </div>
        )}

        {/* Circuit Parameters - Clean Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
              <span className="text-sm text-white/70">Load</span>
              <span className="font-bold text-elec-yellow tabular-nums">{planData.totalLoad}W</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
              <span className="text-sm text-white/70">Voltage</span>
              <span className="font-bold text-elec-yellow tabular-nums">{planData.voltage}V</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
              <span className="text-sm text-white/70">Length</span>
              <span className="font-bold text-elec-yellow tabular-nums">{planData.cableLength}m</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
              <span className="text-sm text-white/70">Current</span>
              <span className="font-bold text-elec-yellow tabular-nums">{designCurrent.toFixed(1)}A</span>
            </div>
          </div>
        </div>

        {/* Non-Compliance Warning */}
        {!isCompliant && closestNonCompliant && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-300 font-medium">No Compliant Cable Found</p>
                <p className="text-xs text-red-200/80 mt-1">
                  Closest option: {closestNonCompliant.size} cable with {closestNonCompliant.voltageDropPercentage.toFixed(2)}% voltage drop 
                  (exceeds {maxVdPercent}% BS 7671 limit)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Cable Recommendation */}
        {finalRecommendation && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cable className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-medium text-white">
                {isCompliant ? "Recommended Cable" : "Closest Available Option"}
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                  <span className="text-sm text-white/70">Size</span>
                  <span className="font-bold text-white tabular-nums">{finalRecommendation.size}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                  <span className="text-sm text-white/70">Type</span>
                  <span className="font-bold text-white">{finalRecommendation.type.toUpperCase()}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                  <span className="text-sm text-white/70">Capacity</span>
                  <span className="font-bold text-white tabular-nums">{finalRecommendation.currentCarryingCapacity}A</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-elec-yellow/10">
                  <span className="text-sm text-white/70">V.Drop</span>
                  <span className={`font-bold tabular-nums ${voltageDropCompliance ? 'text-green-400' : 'text-red-400'}`}>
                    {finalRecommendation.voltageDropPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Checks */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-elec-yellow" />
            <h4 className="font-medium text-white">BS 7671 Compliance</h4>
          </div>

          <div className="space-y-2">
            {/* Current Capacity Check */}
            <div className="flex items-center justify-between py-2 px-3 bg-muted/10 rounded">
              <span className="text-sm text-white/80">Current Capacity</span>
              <div className="flex items-center gap-2">
                {finalRecommendation && finalRecommendation.currentCarryingCapacity >= designCurrent ? 
                  <CheckCircle className="h-4 w-4 text-green-400" /> : 
                  <XCircle className="h-4 w-4 text-red-400" />
                }
                <span className="text-sm font-medium">
                  {finalRecommendation && finalRecommendation.currentCarryingCapacity >= designCurrent ? "OK" : "FAIL"}
                </span>
              </div>
            </div>

            {/* Voltage Drop Check */}
            <div className="flex items-center justify-between py-2 px-3 bg-muted/10 rounded">
              <span className="text-sm text-white/80">Voltage Drop ≤ {maxVdPercent}%</span>
              <div className="flex items-center gap-2">
                {voltageDropCompliance ? 
                  <CheckCircle className="h-4 w-4 text-green-400" /> : 
                  <XCircle className="h-4 w-4 text-red-400" />
                }
                <span className="text-sm font-medium">
                  {voltageDropCompliance ? "OK" : "FAIL"}
                </span>
              </div>
            </div>

            {/* Zs Check */}
            <div className="flex items-center justify-between py-2 px-3 bg-muted/10 rounded">
              <span className="text-sm text-white/80">Earth Loop (Zs)</span>
              <div className="flex items-center gap-2">
                {zsCompliance ? 
                  <CheckCircle className="h-4 w-4 text-green-400" /> : 
                  <XCircle className="h-4 w-4 text-red-400" />
                }
                <span className="text-sm font-medium tabular-nums">
                  {zsValue.toFixed(3)}Ω / {maxZs.toFixed(3)}Ω
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Technical Notes - Collapsed by default */}
        {finalRecommendation?.notes && finalRecommendation.notes.length > 0 && (
          <div className="pt-3 border-t border-elec-yellow/20">
            <div className="space-y-1">
              {/* Show only first note by default, could add expand later */}
              <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded">
                <span className="text-xs text-amber-300">
                  {finalRecommendation.notes[0]}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ResultCard>
  );
};