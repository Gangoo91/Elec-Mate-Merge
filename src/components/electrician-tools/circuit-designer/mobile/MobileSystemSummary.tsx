import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  TrendingDown, 
  ChevronDown, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Activity
} from 'lucide-react';
import { InstallationDesign } from '@/types/installation-design';
import { triggerHaptic } from '@/utils/animation-helpers';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileSystemSummaryProps {
  design: InstallationDesign;
  complianceStats: {
    compliant: number;
    warnings: number;
    fails: number;
  };
}

export const MobileSystemSummary = ({ design, complianceStats }: MobileSystemSummaryProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate key metrics
  const connectedLoadKw = (design.totalLoad / 1000).toFixed(1);
  const diversifiedLoad = design.diversifiedLoad || design.diversityBreakdown?.diversifiedLoad || design.totalLoad;
  const diversifiedLoadKw = (diversifiedLoad / 1000).toFixed(1);
  const diversityFactor = design.diversityFactor || (diversifiedLoad / design.totalLoad);
  const diversityPercent = ((1 - diversityFactor) * 100).toFixed(0);
  
  const mainSwitchRating = design.consumerUnit?.mainSwitchRating || 100;
  const voltage = design.consumerUnit?.incomingSupply?.voltage || 230;
  const designCurrent = diversifiedLoad / voltage;
  const utilization = ((designCurrent / mainSwitchRating) * 100);
  
  // Supply details
  const earthingSystem = design.consumerUnit?.incomingSupply?.earthingSystem || 'TN-S';
  const ze = design.consumerUnit?.incomingSupply?.Ze?.toFixed(2) || '0.35';
  const pscc = design.consumerUnit?.incomingSupply?.incomingPFC 
    ? (design.consumerUnit.incomingSupply.incomingPFC / 1000).toFixed(1) 
    : '1.5';
  
  const phaseType = design.circuits.some(c => c.phases === 'three') ? '3-Phase' : 'Single Phase';

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    triggerHaptic(10);
  };

  return (
    <Card className="bg-gradient-to-br from-elec-card via-elec-card to-elec-card/80 border-elec-yellow/20 shadow-lg">
      <div className="p-3 sm:p-4">
        {/* Always Visible - Load Comparison */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* Connected Load */}
          <motion.div 
            className="bg-elec-dark/50 rounded-lg p-3 border border-elec-yellow/10"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-1 mb-1">
              <Zap className="h-3 w-3 text-elec-yellow" />
              <p className="text-[10px] text-white/60 font-medium uppercase tracking-wide">Connected</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-elec-yellow">{connectedLoadKw}</p>
            <p className="text-[10px] text-white/40">kW Total</p>
          </motion.div>
          
          {/* Diversified Load */}
          <motion.div 
            className="bg-elec-dark/50 rounded-lg p-3 border border-green-500/20"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-1 mb-1">
              <TrendingDown className="h-3 w-3 text-green-400" />
              <p className="text-[10px] text-white/60 font-medium uppercase tracking-wide">After Diversity</p>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-green-400">{diversifiedLoadKw}</p>
            <p className="text-[10px] text-green-400/60">{diversityPercent}% reduction</p>
          </motion.div>
        </div>

        {/* Compliance Status Pills */}
        <div className="flex items-center gap-2 mb-3">
          {complianceStats.compliant > 0 && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] px-2 py-0.5">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              {complianceStats.compliant} Pass
            </Badge>
          )}
          {complianceStats.warnings > 0 && (
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-2 py-0.5">
              <AlertTriangle className="h-3 w-3 mr-1" />
              {complianceStats.warnings} Warning
            </Badge>
          )}
          {complianceStats.fails > 0 && (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] px-2 py-0.5">
              <XCircle className="h-3 w-3 mr-1" />
              {complianceStats.fails} Review
            </Badge>
          )}
        </div>

        {/* Review Reasons Summary */}
        {complianceStats.fails > 0 && (
          <div className="mt-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
            <p className="text-xs text-red-400 font-medium mb-1">Review Required:</p>
            {design.circuits
              .filter(c => (c as any).complianceStatus === 'fail' || (c as any).validationIssues?.length > 0)
              .map((c, idx) => (
                <div key={idx} className="text-[10px] text-white/80 mb-0.5">
                  • {c.name}: {(c as any).validationIssues?.[0]?.message || (c as any).warnings?.[0] || 'Requires manual review'}
                </div>
              ))
            }
          </div>
        )}

        {/* Expandable Details */}
        <Collapsible open={isExpanded} onOpenChange={handleToggle}>
          <CollapsibleTrigger asChild>
            <button 
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-elec-dark/30 hover:bg-elec-dark/50 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-all touch-manipulation min-h-[44px]"
            >
              <span className="text-xs text-white font-medium">
                {isExpanded ? 'Hide' : 'Show'} Details
              </span>
              <ChevronDown 
                className={`h-4 w-4 text-white/60 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>
          </CollapsibleTrigger>
          
          <AnimatePresence>
            {isExpanded && (
              <CollapsibleContent forceMount>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 space-y-3">
                    {/* Supply Details Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <StatPill 
                        label="Earthing" 
                        value={earthingSystem}
                        className="bg-blue-500/10 border-blue-500/20"
                      />
                      <StatPill 
                        label="Ze" 
                        value={`${ze}Ω`}
                        className="bg-purple-500/10 border-purple-500/20"
                      />
                      <StatPill 
                        label="PSCC" 
                        value={`${pscc}kA`}
                        className="bg-orange-500/10 border-orange-500/20"
                      />
                    </div>

                    {/* Additional Details Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <StatPill 
                        label="Phase Config" 
                        value={phaseType}
                        className="bg-cyan-500/10 border-cyan-500/20"
                      />
                      <StatPill 
                        label="Design Ib" 
                        value={`${designCurrent.toFixed(1)}A`}
                        className="bg-pink-500/10 border-pink-500/20"
                      />
                    </div>

                    {/* Diversity Factor Detail */}
                    <div className="bg-elec-dark/40 rounded-lg p-3 border border-elec-yellow/10">
                      <p className="text-[10px] text-white/60 uppercase tracking-wide mb-1">
                        Diversity Factor Applied
                      </p>
                      <p className="text-lg font-bold text-elec-yellow">
                        {diversityFactor.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-white/40 mt-1">
                        Reduces design current by {diversityPercent}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CollapsibleContent>
            )}
          </AnimatePresence>
        </Collapsible>
      </div>
    </Card>
  );
};

// Helper component for stat pills
interface StatPillProps {
  label: string;
  value: string;
  className?: string;
}

const StatPill = ({ label, value, className = '' }: StatPillProps) => (
  <div className={`rounded-lg p-2 border ${className}`}>
    <p className="text-[9px] text-white/60 uppercase tracking-wide truncate">{label}</p>
    <p className="text-sm font-bold text-white truncate mt-0.5">{value}</p>
  </div>
);
