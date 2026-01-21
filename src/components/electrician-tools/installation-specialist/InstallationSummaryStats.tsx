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
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      {/* Total Steps */}
      <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px]">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Wrench className="h-4 w-4" />
          <span className="text-xs font-medium">Steps</span>
        </div>
        <div className="text-2xl lg:text-3xl font-black text-foreground">{totalSteps}</div>
      </div>

      {/* Duration */}
      <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px]">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Clock className="h-4 w-4" />
          <span className="text-xs font-medium">Duration</span>
        </div>
        <div className="text-lg lg:text-2xl font-black text-foreground truncate" title={estimatedDuration}>
          {estimatedDuration?.split(' ')[0] || 'N/A'}
        </div>
      </div>

      {/* Hazards */}
      <div className="bg-amber-500/10 rounded-xl p-4 min-h-[44px]">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-xs font-medium">Hazards</span>
        </div>
        <div className="text-2xl lg:text-3xl font-black text-foreground">{hazardsCount}</div>
      </div>

      {/* Risk Level */}
      <div className="bg-purple-500/10 rounded-xl p-4 min-h-[44px]">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Shield className="h-4 w-4" />
          <span className="text-xs font-medium">Risk</span>
        </div>
        <Badge className={`${getRiskLevelColor(riskLevel)} text-sm font-bold uppercase`}>
          {riskLevel}
        </Badge>
      </div>

      {/* Tools */}
      <div className="bg-green-500/10 rounded-xl p-4 min-h-[44px]">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Hammer className="h-4 w-4" />
          <span className="text-xs font-medium">Tools</span>
        </div>
        <div className="text-2xl lg:text-3xl font-black text-foreground">{toolsCount}</div>
      </div>
    </div>
  );
};
