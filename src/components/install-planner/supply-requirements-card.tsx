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
      <div className="space-y-6">
        {/* Current Requirements - Clean List */}
        <div className="space-y-3">
          <h4 className="font-medium text-elec-yellow mb-4">Calculated Requirements</h4>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Total Current</span>
            <span className="text-lg font-bold text-elec-yellow">{totalDesignCurrent.toFixed(1)}A</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Diversity</span>
            <span className="text-lg font-bold text-elec-yellow">{(diversityFactor * 100).toFixed(0)}%</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">After Diversity</span>
            <span className="text-lg font-bold text-elec-yellow">{diversifiedCurrent.toFixed(1)}A</span>
          </div>
        </div>

        {/* Recommended Supply - Clean List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-elec-yellow">Recommended Supply</h4>
            {isUpgradeRequired ? 
              <AlertTriangle className="h-5 w-5 text-amber-400" /> : 
              <CheckCircle className="h-5 w-5 text-green-400" />
            }
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Supply Rating</span>
            <span className="text-lg font-bold text-elec-yellow">{recommendedSupply.rating}A {recommendedSupply.type}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Install Cost</span>
            <span className="text-lg font-bold text-elec-yellow">{recommendedSupply.cost}</span>
          </div>

          {isUpgradeRequired && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3 mt-4">
              <p className="font-medium text-amber-300 mb-1">Supply Upgrade Required</p>
              <p className="text-sm text-amber-200">Professional assessment needed for supply upgrade. Contact qualified electrician for DNO liaison and installation quote.</p>
            </div>
          )}
        </div>

        {/* Earthing & Protection - Clean List */}
        <div className="space-y-3">
          <h4 className="font-medium text-elec-yellow mb-4">Earthing & Protection</h4>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Earthing System</span>
            <span className="text-lg font-bold text-elec-yellow">{earthingSystem}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Ze Value</span>
            <span className="text-lg font-bold text-elec-yellow">≤ {ze}Ω</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Main Earthing</span>
            <span className="text-lg font-bold text-elec-yellow">10mm² min</span>
          </div>
        </div>

        {/* Installation Costs - Clean List */}
        <div className="space-y-3">
          <h4 className="font-medium text-elec-yellow mb-4">Installation Costs</h4>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Consumer Unit</span>
            <span className="text-lg font-bold text-elec-yellow">£{isUpgradeRequired ? '800-1200' : '600-900'}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Installation</span>
            <span className="text-lg font-bold text-elec-yellow">£{isUpgradeRequired ? '1200-1800' : '800-1200'}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Testing</span>
            <span className="text-lg font-bold text-elec-yellow">£200-350</span>
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