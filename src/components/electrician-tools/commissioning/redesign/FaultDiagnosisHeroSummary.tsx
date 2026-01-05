import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Wrench, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaultDiagnosisHeroSummaryProps {
  faultType: string;
  safetyRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  diagnosticStepsCount: number;
  correctiveActionsCount: number;
  estimatedRepairTime?: string;
  rootCausesCount: number;
}

const riskColors = {
  LOW: 'bg-success/10 text-success border-success/20',
  MODERATE: 'bg-warning/10 text-warning border-warning/20',
  HIGH: 'bg-destructive/10 text-destructive border-destructive/20',
  CRITICAL: 'bg-red-600/20 text-red-300 border-red-600/40'
};

export const FaultDiagnosisHeroSummary = ({
  faultType,
  safetyRisk,
  diagnosticStepsCount,
  correctiveActionsCount,
  estimatedRepairTime = "Unknown",
  rootCausesCount
}: FaultDiagnosisHeroSummaryProps) => {
  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-red-500/10 via-background to-background border-red-500/30 shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <h3 className="text-lg font-semibold text-foreground">Fault Overview</h3>
        </div>
        
        {/* Desktop Layout - 5 columns */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-4">
          {/* Risk Level */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg p-4 border border-red-500/20 hover:border-red-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">Risk</span>
              </div>
              <Badge className={cn(riskColors[safetyRisk], "text-sm font-bold uppercase w-full justify-center")}>
                {safetyRisk}
              </Badge>
            </div>
          </div>

          {/* Diagnostic Steps */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 hover:border-amber-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Search className="h-4 w-4" />
                <span className="text-xs font-medium">Diagnostic Steps</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{diagnosticStepsCount}</div>
            </div>
          </div>

          {/* Corrective Actions */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 hover:border-green-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Wrench className="h-4 w-4" />
                <span className="text-xs font-medium">Fix Actions</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{correctiveActionsCount}</div>
            </div>
          </div>

          {/* Root Causes */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">Root Causes</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{rootCausesCount}</div>
            </div>
          </div>

          {/* Repair Time */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Est. Time</span>
              </div>
              <div className="text-xl font-black text-foreground text-center truncate" title={estimatedRepairTime}>
                {estimatedRepairTime}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout - 2 columns grid */}
        <div className="sm:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Risk Level */}
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg p-4 border border-red-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-medium">RISK</span>
              </div>
              <Badge className={cn(riskColors[safetyRisk], "text-base font-bold uppercase w-full justify-center py-2")}>
                {safetyRisk}
              </Badge>
            </div>

            {/* Repair Time */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-medium">EST. TIME</span>
              </div>
              <div className="text-2xl font-black text-foreground text-center truncate" title={estimatedRepairTime}>
                {estimatedRepairTime}
              </div>
            </div>

            {/* Diagnostic Steps */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Search className="h-5 w-5" />
                <span className="text-xs font-medium">DIAGNOSTIC</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{diagnosticStepsCount}</div>
            </div>

            {/* Corrective Actions */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wrench className="h-5 w-5" />
                <span className="text-xs font-medium">FIX ACTIONS</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{correctiveActionsCount}</div>
            </div>
          </div>

          {/* Root Causes - Full Width on Mobile */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20 touch-manipulation">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-medium">LIKELY ROOT CAUSES</span>
              </div>
              <span className="text-3xl font-black text-foreground">{rootCausesCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
