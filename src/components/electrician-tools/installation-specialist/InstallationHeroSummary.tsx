import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, Hammer, AlertTriangle, Shield, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroSummaryProps {
  steps: number;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  toolsCount: number;
  hazardsCount: number;
  regulationsCount: number;
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
  hazardsCount,
  regulationsCount
}: HeroSummaryProps) => {
  const displayDuration = parseDuration(duration);

  return (
    <div className="space-y-4">
      {/* Desktop Layout - 6 columns */}
      <div className="hidden sm:grid sm:grid-cols-6 gap-4">
        {/* Steps */}
        <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Wrench className="h-4 w-4" />
            <span className="text-xs font-medium">Steps</span>
          </div>
          <div className="text-3xl font-black text-foreground">{steps}</div>
        </div>

        {/* Duration */}
        <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">Duration</span>
          </div>
          <div className="text-xl font-black text-foreground truncate" title={duration}>
            {displayDuration}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-green-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Hammer className="h-4 w-4" />
            <span className="text-xs font-medium">Tools</span>
          </div>
          <div className="text-3xl font-black text-foreground">{toolsCount}</div>
        </div>

        {/* Hazards */}
        <div className="bg-amber-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs font-medium">Hazards</span>
          </div>
          <div className="text-3xl font-black text-foreground">{hazardsCount}</div>
        </div>

        {/* Regulations */}
        <div className="bg-purple-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs font-medium">Regulations</span>
          </div>
          <div className="text-3xl font-black text-foreground">{regulationsCount}</div>
        </div>

        {/* Risk Level */}
        <div className="bg-red-500/10 rounded-xl p-4 min-h-[44px]">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Shield className="h-4 w-4" />
            <span className="text-xs font-medium">Risk</span>
          </div>
          <Badge className={cn(riskColors[riskLevel], "text-sm font-bold uppercase")}>
            {riskLevel}
          </Badge>
        </div>
      </div>

      {/* Mobile Layout - 2 columns grid */}
      <div className="sm:hidden space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {/* Steps */}
          <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Wrench className="h-4 w-4" />
              <span className="text-xs font-medium">STEPS</span>
            </div>
            <div className="text-3xl font-black text-foreground">{steps}</div>
          </div>

          {/* Duration */}
          <div className="bg-blue-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">DURATION</span>
            </div>
            <div className="text-xl font-black text-foreground truncate" title={duration}>
              {displayDuration}
            </div>
          </div>

          {/* Tools */}
          <div className="bg-green-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Hammer className="h-4 w-4" />
              <span className="text-xs font-medium">TOOLS</span>
            </div>
            <div className="text-3xl font-black text-foreground">{toolsCount}</div>
          </div>

          {/* Hazards */}
          <div className="bg-amber-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">HAZARDS</span>
            </div>
            <div className="text-3xl font-black text-foreground">{hazardsCount}</div>
          </div>

          {/* Regulations */}
          <div className="bg-purple-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="text-xs font-medium">REGULATIONS</span>
            </div>
            <div className="text-3xl font-black text-foreground">{regulationsCount}</div>
          </div>

          {/* Risk Level */}
          <div className="bg-red-500/10 rounded-xl p-4 min-h-[44px] touch-manipulation">
            <div className="flex items-center gap-2 text-muted-foreground mb-1">
              <Shield className="h-4 w-4" />
              <span className="text-xs font-medium">RISK</span>
            </div>
            <Badge className={cn(riskColors[riskLevel], "text-base font-bold uppercase")}>
              {riskLevel}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
