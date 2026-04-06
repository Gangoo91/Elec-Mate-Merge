import { Wrench, Clock, AlertTriangle, Shield, Hammer } from 'lucide-react';

interface InstallationSummaryStatsProps {
  totalSteps: number;
  estimatedDuration: string;
  riskLevel: 'low' | 'medium' | 'high';
  hazardsCount: number;
  toolsCount: number;
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

export const InstallationSummaryStats = ({
  totalSteps,
  estimatedDuration,
  riskLevel,
  hazardsCount,
  toolsCount,
}: InstallationSummaryStatsProps) => {
  const risk = getRiskColor(riskLevel);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
      {/* Steps */}
      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-2 py-2.5 text-center">
        <Wrench className="h-4 w-4 text-blue-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-blue-400">{totalSteps}</div>
        <div className="text-[10px] font-medium text-white">Steps</div>
      </div>

      {/* Duration */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-2 py-2.5 text-center">
        <Clock className="h-4 w-4 text-amber-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-amber-400 truncate" title={estimatedDuration}>
          {estimatedDuration?.split(' ')[0] || 'N/A'}
        </div>
        <div className="text-[10px] font-medium text-white">Duration</div>
      </div>

      {/* Hazards */}
      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-2 py-2.5 text-center">
        <AlertTriangle className="h-4 w-4 text-red-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-red-400">{hazardsCount}</div>
        <div className="text-[10px] font-medium text-white">Hazards</div>
      </div>

      {/* Risk */}
      <div className={`rounded-xl border ${risk.border} ${risk.bg} px-2 py-2.5 text-center`}>
        <Shield className="h-4 w-4 mx-auto mb-1" />
        <div className={`text-lg font-bold ${risk.text} uppercase`}>{riskLevel}</div>
        <div className="text-[10px] font-medium text-white">Risk</div>
      </div>

      {/* Tools */}
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-2 py-2.5 text-center">
        <Hammer className="h-4 w-4 text-green-400 mx-auto mb-1" />
        <div className="text-lg font-bold text-green-400">{toolsCount}</div>
        <div className="text-[10px] font-medium text-white">Tools</div>
      </div>
    </div>
  );
};
