import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, AlertTriangle, Shield, Hammer } from "lucide-react";

interface InstallationSummaryStatsProps {
  totalSteps: number;
  estimatedDuration: string;
  riskLevel: 'low' | 'medium' | 'high';
  hazardsCount: number;
  toolsCount: number;
}

const getRiskLevelColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return 'bg-success/10 text-success border-success/20';
    case 'medium':
      return 'bg-warning/10 text-warning border-warning/20';
    case 'high':
      return 'bg-destructive/10 text-destructive border-destructive/20';
  }
};

export const InstallationSummaryStats = ({
  totalSteps,
  estimatedDuration,
  riskLevel,
  hazardsCount,
  toolsCount
}: InstallationSummaryStatsProps) => {
  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-background to-background border-blue-500/20">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-foreground">Installation Procedure Summary</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Total Steps */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-3 border border-blue-500/20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wrench className="h-4 w-4" />
                <span className="text-xs font-medium">Steps</span>
              </div>
              <div className="text-2xl font-black text-foreground">{totalSteps}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-3 border border-blue-500/20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <div className="text-lg font-black text-foreground truncate" title={estimatedDuration}>
                {estimatedDuration?.split(' ')[0] || 'N/A'}
              </div>
            </div>
          </div>

          {/* Hazards */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-3 border border-amber-500/20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">Hazards</span>
              </div>
              <div className="text-2xl font-black text-foreground">{hazardsCount}</div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-3 border border-purple-500/20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-medium">Risk</span>
              </div>
              <Badge className={`${getRiskLevelColor(riskLevel)} text-xs font-bold uppercase w-fit`}>
                {riskLevel}
              </Badge>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-3 border border-green-500/20">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hammer className="h-4 w-4" />
                <span className="text-xs font-medium">Tools</span>
              </div>
              <div className="text-2xl font-black text-foreground">{toolsCount}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
