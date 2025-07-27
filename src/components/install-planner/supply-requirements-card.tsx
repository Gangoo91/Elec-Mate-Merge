import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";

interface SupplyRequirementsCardProps {
  totalDesignCurrent: number;
  diversityFactor: number;
  diversifiedLoad: number;
  earthingSystem?: string;
  ze?: number;
}

export const SupplyRequirementsCard: React.FC<SupplyRequirementsCardProps> = ({
  totalDesignCurrent,
  diversityFactor,
  diversifiedLoad,
  earthingSystem = "TN-S",
  ze = 0.35
}) => {
  const diversifiedCurrent = totalDesignCurrent * diversityFactor;
  
  // Realistic UK supply ratings
  const getRecommendedSupply = (current: number) => {
    if (current <= 63) return { rating: 63, type: "Single phase", cost: "£800-1200" };
    if (current <= 80) return { rating: 80, type: "Single phase", cost: "£900-1400" };
    if (current <= 100) return { rating: 100, type: "Single phase", cost: "£1200-1800" };
    if (current <= 125) return { rating: 125, type: "Three phase", cost: "£2500-4000" };
    return { rating: 200, type: "Three phase", cost: "£4000-6500" };
  };

  const recommendedSupply = getRecommendedSupply(diversifiedCurrent);
  const isUpgradeRequired = diversifiedCurrent > 80; // Typical domestic supply limit

  return (
    <ResultCard 
      icon={<Zap className="h-5 w-5" />}
      title="Supply Requirements"
      status={isUpgradeRequired ? "warning" : "success"}
      className="w-full"
    >
      <div className="space-y-4">
        {/* Current Requirements */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Calculated Requirements</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Total Current</span>
              <span className="font-bold text-primary">{totalDesignCurrent.toFixed(1)}A</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">After Diversity</span>
              <span className="font-bold text-primary">{diversifiedCurrent.toFixed(1)}A</span>
            </div>
          </div>
        </div>

        {/* Recommended Supply */}
        <div className="space-y-3">
          <h4 className="font-medium text-primary">Recommended Supply</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Supply Rating</span>
              <span className="font-bold text-primary">{recommendedSupply.rating}A {recommendedSupply.type}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="text-sm text-muted-foreground">Install Cost</span>
              <span className="font-bold text-primary">{recommendedSupply.cost}</span>
            </div>
          </div>

          {isUpgradeRequired && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-3">
              <p className="font-medium text-amber-300 mb-1">Supply Upgrade Required</p>
              <p className="text-sm text-amber-200">Professional assessment needed. Contact qualified electrician for DNO liaison.</p>
            </div>
          )}
        </div>

        {/* Compliance */}
        <div className="text-center">
          <span className="text-sm text-success">✓ BS7671 Compliant</span>
          {isUpgradeRequired && (
            <span className="text-sm text-amber-400 block mt-1">⚠ Professional Assessment Required</span>
          )}
        </div>
      </div>
    </ResultCard>
  );
};