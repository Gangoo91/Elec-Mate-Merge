import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, Hammer, AlertTriangle, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSummaryProps {
  steps: number;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  toolsCount: number;
  hazardsCount: number;
}

const riskColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20'
};

// Parse duration intelligently - extract primary value
const parseDuration = (duration: string): string => {
  if (!duration) return 'N/A';
  
  // Extract patterns like "8-24 hours" from "8-24 hours (typical: 1-2 working days...)"
  const match = duration.match(/(\d+(?:-\d+)?)\s*(hours?|hrs?|minutes?|mins?|days?)/i);
  if (match) {
    const value = match[1];
    const unit = match[2].toLowerCase();
    // Abbreviate unit
    if (unit.startsWith('hour') || unit.startsWith('hr')) return `${value} hrs`;
    if (unit.startsWith('minute') || unit.startsWith('min')) return `${value} mins`;
    if (unit.startsWith('day')) return `${value} days`;
  }
  
  // Fallback: take first part before parenthesis
  const firstPart = duration.split('(')[0].trim();
  return firstPart || duration;
};

export const InstallationHeroSummary = ({
  steps,
  duration,
  riskLevel,
  toolsCount,
  hazardsCount
}: HeroSummaryProps) => {
  const displayDuration = parseDuration(duration);
  
  return (
    <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-background to-background border-blue-500/20 shadow-lg hover:shadow-xl transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-foreground">Installation Overview</h3>
        </div>
        
        {/* Desktop Layout - 5 columns */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-4">
          {/* Steps */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Wrench className="h-4 w-4" />
                <span className="text-xs font-medium">Steps</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{steps}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 hover:border-blue-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-medium">Duration</span>
              </div>
              <div className="text-xl font-black text-foreground text-center truncate" title={duration}>
                {displayDuration}
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 hover:border-green-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Hammer className="h-4 w-4" />
                <span className="text-xs font-medium">Tools</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{toolsCount}</div>
            </div>
          </div>

          {/* Hazards */}
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 hover:border-amber-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-medium">Hazards</span>
              </div>
              <div className="text-3xl font-black text-foreground text-center">{hazardsCount}</div>
            </div>
          </div>

          {/* Risk Level */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20 hover:border-purple-500/30 transition-colors">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-muted-foreground text-left">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-medium">Risk</span>
              </div>
              <Badge className={cn(riskColors[riskLevel], "text-sm font-bold uppercase w-full justify-center")}>
                {riskLevel}
              </Badge>
            </div>
          </div>
        </div>

        {/* Mobile Layout - 2 columns + full-width risk */}
        <div className="sm:hidden space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Steps */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wrench className="h-5 w-5" />
                <span className="text-xs font-medium">STEPS</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{steps}</div>
            </div>

            {/* Duration */}
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-4 border border-blue-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span className="text-xs font-medium">DURATION</span>
              </div>
              <div className="text-2xl font-black text-foreground text-center truncate" title={duration}>
                {displayDuration}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-4 border border-green-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Hammer className="h-5 w-5" />
                <span className="text-xs font-medium">TOOLS</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{toolsCount}</div>
            </div>

            {/* Hazards */}
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-lg p-4 border border-amber-500/20 min-h-[100px] flex flex-col justify-between touch-manipulation">
              <div className="flex items-center gap-2 text-muted-foreground">
                <AlertTriangle className="h-5 w-5" />
                <span className="text-xs font-medium">HAZARDS</span>
              </div>
              <div className="text-4xl font-black text-foreground text-center">{hazardsCount}</div>
            </div>
          </div>

          {/* Risk Level - Full Width on Mobile */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-lg p-4 border border-purple-500/20 touch-manipulation">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">RISK LEVEL</span>
              </div>
              <Badge className={cn(riskColors[riskLevel], "text-lg font-bold uppercase px-6 py-2")}>
                {riskLevel}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
