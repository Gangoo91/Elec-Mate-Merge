import { Shield, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HazardStatsDashboardProps {
  totalHazards: number;
  veryHighRisk: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  totalControls: number;
  categoryBreakdown: { category: string; count: number; color: string }[];
}

export const HazardStatsDashboard = ({
  totalHazards,
  veryHighRisk,
  highRisk,
  mediumRisk,
  lowRisk,
  totalControls,
  categoryBreakdown,
}: HazardStatsDashboardProps) => {
  return (
    <div className="bg-gradient-to-br from-elec-card/80 to-elec-card/50 rounded-xl border border-border/50 p-4 md:p-6 mb-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
          <Shield className="w-6 h-6 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Hazard Database</h2>
          <p className="text-sm text-white">Professional Safety Reference</p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-background/50 rounded-lg p-3 border border-border/30">
          <div className="text-2xl font-bold text-elec-yellow">{totalHazards}</div>
          <div className="text-xs text-white">Total Hazards</div>
        </div>
        
        <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{veryHighRisk}</div>
          <div className="text-xs text-white">Very High Risk</div>
        </div>
        
        <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/30">
          <div className="text-2xl font-bold text-orange-400">{highRisk}</div>
          <div className="text-xs text-white">High Risk</div>
        </div>
        
        <div className="bg-background/50 rounded-lg p-3 border border-border/30">
          <div className="text-2xl font-bold text-foreground">{totalControls}</div>
          <div className="text-xs text-white">Controls</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-white mb-2">
          <TrendingUp className="w-3 h-3" />
          <span>Category Breakdown</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoryBreakdown.slice(0, 6).map((cat) => (
            <Badge 
              key={cat.category} 
              variant="outline" 
              className={`${cat.color} text-xs`}
            >
              {cat.category} ({cat.count})
            </Badge>
          ))}
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/30">
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
          ✓ BS7671 Compliant
        </Badge>
        <Badge variant="outline" className="text-xs">
          <Clock className="w-3 h-3 mr-1" />
          Updated Nov 2025
        </Badge>
      </div>
    </div>
  );
};
