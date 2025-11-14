import { CircuitDesign } from '@/types/installation-design';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileButton } from '@/components/ui/mobile-button';
import { 
  CheckCircle2, AlertTriangle, AlertCircle, Zap, Cable, 
  Shield, TrendingDown, FileText, Calculator
} from 'lucide-react';

interface CircuitCardProps {
  circuit: CircuitDesign;
  onViewWorkings?: () => void;
  onViewJustification?: () => void;
  className?: string;
}

const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

export const CircuitCard = ({ circuit, onViewWorkings, onViewJustification, className = '' }: CircuitCardProps) => {
  // Calculate compliance status
  const vdCompliant = circuit.calculations?.voltageDrop?.compliant ?? true;
  const zsCompliant = (circuit.calculations?.zs ?? 0) <= (circuit.calculations?.maxZs ?? 999);
  const hasWarnings = circuit.warnings && circuit.warnings.length > 0;
  
  const isCompliant = vdCompliant && zsCompliant;
  const status = !isCompliant ? 'fail' : hasWarnings ? 'warning' : 'pass';

  return (
    <Card className={`bg-card border-elec-yellow/30 overflow-hidden shadow-lg shadow-elec-yellow/5 transition-all duration-300 hover:shadow-elec-yellow/10 mx-auto max-w-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20 p-5 sm:p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-lg sm:text-xl font-bold text-elec-light">
                Way {circuit.circuitNumber || 'N/A'}
                {circuit.phases === 'three' && (
                  <span className="text-sm font-normal text-elec-yellow/80 ml-2">
                    (L1, L2, L3)
                  </span>
                )}
              </h3>
            </div>
            <p className="text-base sm:text-lg font-semibold text-elec-light/90">{circuit.name}</p>
            <p className="text-sm text-white/90 mt-1 capitalize">
              {circuit.loadType.replace('-', ' ')}
            </p>
          </div>
          <Badge 
            variant={status === 'pass' ? 'default' : status === 'warning' ? 'outline' : 'destructive'}
            className={`${
              status === 'pass' ? 'bg-green-500/20 text-green-400 border-green-500/30 animate-pulse-subtle' :
              status === 'warning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse-subtle'
            } h-7 transition-all duration-300`}
          >
            {status === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {status === 'fail' && <AlertCircle className="h-3 w-3 mr-1" />}
            {status === 'pass' ? 'Pass' : status === 'warning' ? 'Warning' : 'Review'}
          </Badge>
        </div>
      </div>

      {/* Protection Device - Hero Display */}
      <div className="bg-gradient-to-b from-elec-dark/40 to-transparent p-6 sm:p-8 text-center border-b border-elec-yellow/10">
        <Shield className="h-14 w-14 sm:h-16 sm:w-16 text-elec-yellow/70 mx-auto mb-4" />
        <div className="text-3xl sm:text-4xl font-bold text-elec-light mb-2">
          {circuit.protectionDevice.rating}A Type {circuit.protectionDevice.curve}
        </div>
        <div className="text-base sm:text-lg text-white/90 mb-2">
          {circuit.protectionDevice.type} · {circuit.protectionDevice.kaRating}kA
          {circuit.phases === 'three' && (
            <span className="text-elec-yellow/70 ml-2">· 3-Phase</span>
          )}
        </div>
        {circuit.rcdProtected && (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-3 px-4 py-1.5">
            <Shield className="h-3.5 w-3.5 mr-1.5" />
            30mA RCD
          </Badge>
        )}
      </div>

      {/* Key Specifications */}
      <div className="p-4 sm:p-6 space-y-3">
        {/* Load */}
        <div className="flex items-center justify-between p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-elec-yellow/70" />
            <span className="text-base sm:text-lg text-elec-light/70">Load</span>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl font-semibold text-elec-light">
              {(circuit.loadPower / 1000).toFixed(1)}kW
            </div>
            <div className="text-sm text-elec-light/60">
              {fmt(circuit.designCurrent, 1)}A
            </div>
          </div>
        </div>

        {/* Cable */}
        <div className="flex items-center justify-between p-4 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-3">
            <Cable className="h-5 w-5 text-elec-yellow/70" />
            <span className="text-base sm:text-lg text-elec-light/70">Cable</span>
          </div>
          <div className="text-right">
            <div className="text-lg sm:text-xl font-semibold text-elec-light">
              {circuit.cableSize}mm² / {circuit.cpcSize}mm²
            </div>
            <div className="text-sm text-elec-light/60">
              {circuit.cableLength}m length
            </div>
          </div>
        </div>

        {/* Inline Justification Preview - Cable */}
        {circuit.justifications?.cableSize && circuit.justifications.cableSize !== 'No specific justification provided.' && (
          <div className="p-3 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-3.5 w-3.5 text-elec-yellow/80" />
              <span className="text-xs font-semibold text-elec-light/70">Why this cable size?</span>
            </div>
            <p className="text-xs text-elec-light/70 leading-relaxed line-clamp-3">
              {circuit.justifications.cableSize}
            </p>
            <button
              onClick={onViewJustification}
              className="text-sm py-2 px-3 mt-3 bg-elec-yellow/10 hover:bg-elec-yellow/20 rounded-md text-elec-yellow/90 hover:text-elec-yellow w-full text-center transition-colors touch-manipulation"
            >
              See full justification →
            </button>
          </div>
        )}

        {/* Inline Justification Preview - Protection */}
        {circuit.justifications?.protection && circuit.justifications.protection !== 'No specific justification provided.' && (
          <div className="p-3 bg-blue-500/5 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-3.5 w-3.5 text-blue-400/80" />
              <span className="text-xs font-semibold text-blue-100/70">Why this protection device?</span>
            </div>
            <p className="text-xs text-blue-100/70 leading-relaxed line-clamp-3">
              {circuit.justifications.protection}
            </p>
            <button
              onClick={onViewJustification}
              className="text-sm py-2 px-3 mt-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-md text-blue-400/90 hover:text-blue-400 w-full text-center transition-colors touch-manipulation"
            >
              See full justification →
            </button>
          </div>
        )}

        {/* Voltage Drop */}
        <div className="flex items-center justify-between p-5 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-elec-yellow/70" />
            <span className="text-base sm:text-lg text-white/90">Voltage Drop</span>
          </div>
          <div className="text-right">
            <div className={`text-lg sm:text-xl font-semibold ${vdCompliant ? 'text-green-400' : 'text-red-400'}`}>
              {fmt(circuit.calculations?.voltageDrop?.percent, 2)}%
              {vdCompliant ? ' ✓' : ' ✗'}
            </div>
            <div className="text-sm text-white/90">
              Limit: {circuit.calculations?.voltageDrop?.limit ?? 5}%
            </div>
          </div>
        </div>

        {/* Earth Loop Impedance */}
        <div className="flex items-center justify-between p-5 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-elec-yellow/70" />
            <span className="text-base sm:text-lg text-white/90">Earth Loop (Zs)</span>
          </div>
          <div className="text-right">
            <div className={`text-lg sm:text-xl font-semibold ${zsCompliant ? 'text-green-400' : 'text-red-400'}`}>
              {fmt(circuit.calculations?.zs, 2)}Ω
              {zsCompliant ? ' ✓' : ' ✗'}
            </div>
            <div className="text-sm text-white/90">
              Max: {fmt(circuit.calculations?.maxZs, 2)}Ω
            </div>
          </div>
        </div>

        {/* Warnings */}
        {hasWarnings && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-semibold text-amber-400 mb-1">Warnings</p>
                {circuit.warnings.map((warning, idx) => (
                  <p key={idx} className="text-xs text-amber-400/90 leading-relaxed">
                    • {warning}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Single Action - More Details (optional for desktop) */}
      {onViewWorkings && (
        <div className="p-4 pt-2 border-t border-elec-yellow/10">
          <MobileButton
            variant="elec-outline"
            size="default"
            icon={<Calculator className="h-4 w-4" />}
            onClick={onViewWorkings}
            className="w-full border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            View Detailed Calculations
          </MobileButton>
        </div>
      )}
    </Card>
  );
};