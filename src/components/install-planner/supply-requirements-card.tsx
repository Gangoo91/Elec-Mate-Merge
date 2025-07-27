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
        <div className="bg-primary/10 rounded-lg p-4">
          <h4 className="font-medium mb-3">Calculated Requirements</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <p className="text-muted-foreground">Total Current</p>
              <p className="text-xl font-bold text-primary">{totalDesignCurrent.toFixed(1)}A</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">Diversity Factor</p>
              <p className="text-xl font-bold text-primary">{(diversityFactor * 100).toFixed(0)}%</p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground">After Diversity</p>
              <p className="text-xl font-bold text-primary">{diversifiedCurrent.toFixed(1)}A</p>
            </div>
          </div>
        </div>

        {/* Recommended Supply */}
        <div className={`rounded-lg p-4 ${isUpgradeRequired ? 'bg-amber-500/10' : 'bg-green-500/10'}`}>
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-medium">Recommended Supply</h4>
            {isUpgradeRequired ? 
              <AlertTriangle className="h-5 w-5 text-amber-400" /> : 
              <CheckCircle className="h-5 w-5 text-green-400" />
            }
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Supply Rating</p>
                <p className="font-bold">{recommendedSupply.rating}A {recommendedSupply.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Estimated Cost</p>
                <p className="font-bold text-green-400">{recommendedSupply.cost}</p>
              </div>
            </div>

            {isUpgradeRequired && (
              <div className="bg-amber-500/20 rounded p-3 text-sm">
                <p className="font-medium text-amber-300 mb-1">Supply Upgrade Required</p>
                <p className="text-amber-200">Contact your DNO (Distribution Network Operator) to arrange supply upgrade. Typical lead time: 6-12 weeks.</p>
              </div>
            )}
          </div>
        </div>

        {/* Earthing & Protection */}
        <div className="space-y-3">
          <h4 className="font-medium">Earthing & Protection</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Earthing System</p>
              <p className="font-medium">{earthingSystem}</p>
              <p className="text-xs text-muted-foreground mt-1">Ze ≤ {ze}Ω</p>
            </div>
            <div className="bg-background/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">Main Earthing</p>
              <p className="font-medium">10mm² minimum</p>
              <p className="text-xs text-muted-foreground mt-1">BS7671 Reg 544.1</p>
            </div>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-green-500" />
            <p className="text-sm font-medium">Supply Connection Costs</p>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex justify-between">
              <span>DNO connection charge:</span>
              <span>£{isUpgradeRequired ? '2000-3500' : '500-800'}</span>
            </div>
            <div className="flex justify-between">
              <span>Meter upgrade:</span>
              <span>£{recommendedSupply.type === "Three phase" ? '400-600' : '200-350'}</span>
            </div>
            <div className="flex justify-between">
              <span>Electrical work:</span>
              <span>£{isUpgradeRequired ? '1500-2500' : '800-1200'}</span>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            BS7671 Compliant
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            Part P Notifiable
          </Badge>
          {isUpgradeRequired && (
            <Badge variant="outline" className="border-amber-500/50 text-amber-400">
              DNO Approval Required
            </Badge>
          )}
        </div>
      </div>
    </ResultCard>
  );
};