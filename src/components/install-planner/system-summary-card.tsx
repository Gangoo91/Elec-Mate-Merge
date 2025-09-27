import React from "react";
import { ResultCard } from "@/components/ui/result-card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Zap, Building, Clock } from "lucide-react";
import { Circuit } from "./types";

interface SystemSummaryCardProps {
  circuits: Circuit[];
  totalSystemLoad: number;
  totalDesignCurrent: number;
  diversityFactor: number;
  diversifiedLoad: number;
}

export const SystemSummaryCard: React.FC<SystemSummaryCardProps> = ({
  circuits,
  totalSystemLoad,
  totalDesignCurrent,
  diversityFactor,
  diversifiedLoad
}) => {
  const estimatedInstallTime = circuits.length * 4; // 4 hours per circuit average
  const totalInstallDays = Math.ceil(estimatedInstallTime / 8);
  
  return (
    <ResultCard 
      icon={<Calculator className="h-5 w-5" />}
      title="System Overview"
      status="info"
      className="w-full"
    >
      <div className="space-y-6">
        {/* Key Metrics - Clean List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Circuits</span>
            <span className="text-lg font-bold text-elec-yellow">{circuits.length}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Total Load</span>
            <span className="text-lg font-bold text-elec-yellow">{(totalSystemLoad / 1000).toFixed(1)}kW</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Design</span>
            <span className="text-lg font-bold text-elec-yellow">{totalDesignCurrent.toFixed(1)}A</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Diversity</span>
            <span className="text-lg font-bold text-elec-yellow">{(diversifiedLoad / 1000).toFixed(1)}kW</span>
          </div>
        </div>

        {/* Installation Details - Clean List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Install</span>
            <span className="text-lg font-bold text-elec-yellow text-right">Multi-Circuit</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Duration</span>
            <span className="text-lg font-bold text-elec-yellow">{totalInstallDays} day{totalInstallDays > 1 ? 's' : ''}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-elec-yellow/20">
            <span className="text-sm text-muted-foreground">Factor</span>
            <span className="text-lg font-bold text-elec-yellow">{(diversityFactor * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-elec-yellow/20">
          <Badge variant="outline" className="border-elec-yellow/50 text-elec-yellow">
            BS7671:2018+A3:2024
          </Badge>
          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
            Part P Compliant
          </Badge>
          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
            Building Regs
          </Badge>
        </div>
      </div>
    </ResultCard>
  );
};