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
  onViewWorkings: () => void;
  onViewJustification: () => void;
}

const fmt = (n: unknown, dp = 1, fallback = '—') => 
  (typeof n === 'number' && !isNaN(n) ? n.toFixed(dp) : fallback);

export const CircuitCard = ({ circuit, onViewWorkings, onViewJustification }: CircuitCardProps) => {
  // Calculate compliance status
  const vdCompliant = circuit.calculations?.voltageDrop?.compliant ?? true;
  const zsCompliant = (circuit.calculations?.zs ?? 0) <= (circuit.calculations?.maxZs ?? 999);
  const hasWarnings = circuit.warnings && circuit.warnings.length > 0;
  
  const isCompliant = vdCompliant && zsCompliant;
  const status = !isCompliant ? 'fail' : hasWarnings ? 'warning' : 'pass';

  return (
    <Card className="bg-card border-elec-yellow/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5 border-b border-elec-yellow/20 p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h3 className="text-base font-bold text-elec-light">Way {circuit.circuitNumber}</h3>
            </div>
            <p className="text-sm text-elec-light/80">{circuit.name}</p>
            <p className="text-xs text-elec-light/60 mt-1 capitalize">{circuit.loadType.replace('-', ' ')}</p>
          </div>
          <Badge 
            variant={status === 'pass' ? 'default' : status === 'warning' ? 'outline' : 'destructive'}
            className={`${
              status === 'pass' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
              status === 'warning' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-red-500/20 text-red-400 border-red-500/30'
            } h-7`}
          >
            {status === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {status === 'fail' && <AlertCircle className="h-3 w-3 mr-1" />}
            {status === 'pass' ? 'Pass' : status === 'warning' ? 'Warning' : 'Review'}
          </Badge>
        </div>
      </div>

      {/* Protection Device - Hero Display */}
      <div className="bg-gradient-to-b from-elec-dark/40 to-transparent p-6 text-center border-b border-elec-yellow/10">
        <Shield className="h-12 w-12 text-elec-yellow/70 mx-auto mb-3" />
        <div className="text-2xl font-bold text-elec-light mb-1">
          {circuit.protectionDevice.rating}A Type {circuit.protectionDevice.curve}
        </div>
        <div className="text-sm text-elec-light/60">
          {circuit.protectionDevice.type} · {circuit.protectionDevice.kaRating}kA
        </div>
        {circuit.rcdProtected && (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-3">
            <Shield className="h-3 w-3 mr-1" />
            30mA RCD
          </Badge>
        )}
      </div>

      {/* Key Specifications */}
      <div className="p-4 space-y-3">
        {/* Load */}
        <div className="flex items-center justify-between p-3 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow/70" />
            <span className="text-sm text-elec-light/70">Load</span>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-elec-light">
              {(circuit.loadPower / 1000).toFixed(1)}kW
            </div>
            <div className="text-xs text-elec-light/60">
              {fmt(circuit.designCurrent, 1)}A
            </div>
          </div>
        </div>

        {/* Cable */}
        <div className="flex items-center justify-between p-3 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Cable className="h-4 w-4 text-elec-yellow/70" />
            <span className="text-sm text-elec-light/70">Cable</span>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-elec-light">
              {circuit.cableSize}mm² / {circuit.cpcSize}mm²
            </div>
            <div className="text-xs text-elec-light/60">
              {circuit.cableLength}m length
            </div>
          </div>
        </div>

        {/* Voltage Drop */}
        <div className="flex items-center justify-between p-3 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-elec-yellow/70" />
            <span className="text-sm text-elec-light/70">Voltage Drop</span>
          </div>
          <div className="text-right">
            <div className={`text-base font-semibold ${vdCompliant ? 'text-green-400' : 'text-red-400'}`}>
              {fmt(circuit.calculations?.voltageDrop?.percent, 2)}%
              {vdCompliant ? ' ✓' : ' ✗'}
            </div>
            <div className="text-xs text-elec-light/60">
              Limit: {circuit.calculations?.voltageDrop?.limit ?? 5}%
            </div>
          </div>
        </div>

        {/* Earth Loop Impedance */}
        <div className="flex items-center justify-between p-3 bg-elec-dark/40 rounded-lg border border-elec-yellow/10">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-elec-yellow/70" />
            <span className="text-sm text-elec-light/70">Earth Loop (Zs)</span>
          </div>
          <div className="text-right">
            <div className={`text-base font-semibold ${zsCompliant ? 'text-green-400' : 'text-red-400'}`}>
              {fmt(circuit.calculations?.zs, 2)}Ω
              {zsCompliant ? ' ✓' : ' ✗'}
            </div>
            <div className="text-xs text-elec-light/60">
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

      {/* Action Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-3">
        <MobileButton
          variant="outline"
          size="default"
          icon={<Calculator className="h-4 w-4" />}
          onClick={onViewWorkings}
          className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
        >
          Workings
        </MobileButton>
        <MobileButton
          variant="outline"
          size="default"
          icon={<FileText className="h-4 w-4" />}
          onClick={onViewJustification}
          className="border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
        >
          Why?
        </MobileButton>
      </div>
    </Card>
  );
};
