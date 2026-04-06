import { Wrench, Clock, Hammer, AlertTriangle, Shield, BookOpen } from 'lucide-react';

interface HeroSummaryProps {
  steps: number;
  duration: string;
  riskLevel: 'low' | 'medium' | 'high';
  toolsCount: number;
  hazardsCount: number;
  regulationsCount: number;
}

const getRiskColor = (level: 'low' | 'medium' | 'high') => {
  switch (level) {
    case 'low':
      return { border: 'border-green-500/30', bg: 'bg-green-500/10', text: 'text-green-400' };
    case 'medium':
      return { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400' };
    case 'high':
      return { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400' };
  }
};

// Parse duration intelligently - extract primary value
const parseDuration = (duration: string): string => {
  if (!duration) return 'N/A';

  // Extract patterns like "8-24 hours" from "8-24 hours (typical: 1-2 working days...)"
  const match = duration.match(/(\d+(?:-\d+)?)\s*(hours?|hrs?|minutes?|mins?|days?)/i);
  if (match) {
    const value = match[1];
    const unit = match[2].toLowerCase();
    if (unit.startsWith('hour') || unit.startsWith('hr')) return `${value} hrs`;
    if (unit.startsWith('minute') || unit.startsWith('min')) return `${value} mins`;
    if (unit.startsWith('day')) return `${value} days`;
  }

  const firstPart = duration.split('(')[0].trim();
  return firstPart || duration;
};

export const InstallationHeroSummary = ({
  steps,
  duration,
  riskLevel,
  toolsCount,
  hazardsCount,
  regulationsCount,
}: HeroSummaryProps) => {
  const displayDuration = parseDuration(duration);
  const risk = getRiskColor(riskLevel);

  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {/* Steps */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-2 py-2.5 text-center">
        <Wrench className="h-4 w-4 text-blue-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-blue-400">{steps}</div>
        <div className="text-[10px] font-medium text-white">Steps</div>
      </div>

      {/* Duration */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-2 py-2.5 text-center">
        <Clock className="h-4 w-4 text-amber-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-amber-400 truncate" title={duration}>
          {displayDuration}
        </div>
        <div className="text-[10px] font-medium text-white">Duration</div>
      </div>

      {/* Tools */}
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-2 py-2.5 text-center">
        <Hammer className="h-4 w-4 text-green-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-green-400">{toolsCount}</div>
        <div className="text-[10px] font-medium text-white">Tools</div>
      </div>

      {/* Hazards */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-2 py-2.5 text-center">
        <AlertTriangle className="h-4 w-4 text-red-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-red-400">{hazardsCount}</div>
        <div className="text-[10px] font-medium text-white">Hazards</div>
      </div>

      {/* Regulations */}
      <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 px-2 py-2.5 text-center">
        <BookOpen className="h-4 w-4 text-purple-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-purple-400">{regulationsCount}</div>
        <div className="text-[10px] font-medium text-white">Regs</div>
      </div>

      {/* Risk Level */}
      <div className={`rounded-xl border ${risk.border} ${risk.bg} px-2 py-2.5 text-center`}>
        <Shield className="h-4 w-4 mx-auto mb-1" />
        <div className={`text-lg font-bold ${risk.text} uppercase`}>{riskLevel}</div>
        <div className="text-[10px] font-medium text-white">Risk</div>
      </div>
    </div>
  );
};
