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
        <div className="space-y-3 border-b border-elec-yellow/20 pb-4">
          <h4 className="font-medium text-elec-yellow">Calculated Requirements</h4>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Total Current</p>
              <p className="text-lg font-bold text-elec-yellow">{totalDesignCurrent.toFixed(1)}A</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Diversity</p>
              <p className="text-lg font-bold text-elec-yellow">{(diversityFactor * 100).toFixed(0)}%</p>
            </div>
            <div className="text-center p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">After Diversity</p>
              <p className="text-lg font-bold text-elec-yellow">{diversifiedCurrent.toFixed(1)}A</p>
            </div>
          </div>
        </div>

        {/* Recommended Supply */}
        <div className="space-y-3 border-b border-elec-yellow/20 pb-4">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-elec-yellow">Recommended Supply</h4>
            {isUpgradeRequired ? 
              <AlertTriangle className="h-5 w-5 text-amber-400" /> : 
              <CheckCircle className="h-5 w-5 text-green-400" />
            }
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Supply Rating</p>
              <p className="font-bold text-elec-yellow">{recommendedSupply.rating}A {recommendedSupply.type}</p>
            </div>
            <div className="p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Installation Cost</p>
              <p className="font-bold text-elec-yellow">{recommendedSupply.cost}</p>
            </div>
          </div>

          {isUpgradeRequired && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
              <p className="font-medium text-amber-300 mb-1">Supply Upgrade Required</p>
              <p className="text-sm text-amber-200">Professional assessment needed for supply upgrade. Contact qualified electrician for DNO liaison and installation quote.</p>
            </div>
          )}
        </div>

        {/* Earthing & Protection */}
        <div className="space-y-3 border-b border-elec-yellow/20 pb-4">
          <h4 className="font-medium text-elec-yellow">Earthing & Protection</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Earthing System</p>
              <p className="font-medium text-elec-yellow">{earthingSystem}</p>
              <p className="text-xs text-muted-foreground mt-1">Ze ≤ {ze}Ω</p>
            </div>
            <div className="p-3 border border-elec-yellow/20">
              <p className="text-xs text-muted-foreground mb-1">Main Earthing</p>
              <p className="font-medium text-elec-yellow">10mm² minimum</p>
              <p className="text-xs text-muted-foreground mt-1">BS7671 Reg 544.1</p>
            </div>
          </div>
        </div>

        {/* Installation Costs */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-elec-yellow" />
            <p className="font-medium text-elec-yellow">Installation Costs</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 border border-elec-yellow/20">
              <span className="text-muted-foreground">Consumer unit upgrade:</span>
              <span className="font-medium text-elec-yellow">£{isUpgradeRequired ? '800-1200' : '600-900'}</span>
            </div>
            <div className="flex justify-between items-center p-2 border border-elec-yellow/20">
              <span className="text-muted-foreground">Electrical installation:</span>
              <span className="font-medium text-elec-yellow">£{isUpgradeRequired ? '1200-1800' : '800-1200'}</span>
            </div>
            <div className="flex justify-between items-center p-2 border border-elec-yellow/20">
              <span className="text-muted-foreground">Testing & certification:</span>
              <span className="font-medium text-elec-yellow">£200-350</span>
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow">
            BS7671 Compliant
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            Part P Notifiable
          </Badge>
          {isUpgradeRequired && (
            <Badge variant="outline" className="border-amber-500/50 text-amber-400">
              Professional Assessment Required
            </Badge>
          )}
        </div>
      </div>
    </ResultCard>
  );
};