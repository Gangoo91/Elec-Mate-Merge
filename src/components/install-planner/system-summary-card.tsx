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
      <div className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{circuits.length}</div>
            <div className="text-xs text-muted-foreground">Circuits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{(totalSystemLoad / 1000).toFixed(1)}kW</div>
            <div className="text-xs text-muted-foreground">Total Load</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{totalDesignCurrent.toFixed(1)}A</div>
            <div className="text-xs text-muted-foreground">Design Current</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">{(diversifiedLoad / 1000).toFixed(1)}kW</div>
            <div className="text-xs text-muted-foreground">After Diversity</div>
          </div>
        </div>

        {/* Installation Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
            <Building className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-muted-foreground">Installation Type</p>
              <p className="font-medium">Multi-Circuit System</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
            <Clock className="h-4 w-4 text-green-500" />
            <div>
              <p className="text-xs text-muted-foreground">Estimated Duration</p>
              <p className="font-medium">{totalInstallDays} day{totalInstallDays > 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-background/50 rounded-lg">
            <Zap className="h-4 w-4 text-amber-500" />
            <div>
              <p className="text-xs text-muted-foreground">Diversity Factor</p>
              <p className="font-medium">{(diversityFactor * 100).toFixed(0)}%</p>
            </div>
          </div>
        </div>

        {/* Compliance Status */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            BS7671:2018+A2:2022
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