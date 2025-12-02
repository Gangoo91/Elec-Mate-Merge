import { Card } from '@/components/ui/card';
import { Zap, CheckCircle2 } from 'lucide-react';

interface AtAGlanceSummaryProps {
  summary: {
    loadKw: number;
    loadIb: string;
    cable: string;
    protectiveDevice: string;
    voltageDrop: string;
    zs: string;
    complianceTick: boolean;
    notes: string;
  };
  circuit?: {
    cableSize: number;
    cpcSize: number;
    cableType?: string;
    protectionDevice: {
      type: string;
      rating: number;
      curve: string;
      rcdRating?: number;
    };
    calculations: {
      zs: number;
      maxZs: number;
      voltageDrop: {
        percent: number;
        compliant: boolean;
        limit: number;
      };
    };
    rcdProtected: boolean;
    expectedTests?: {
      zs?: {
        expected?: number;
        maxPermitted?: number;
        compliant?: boolean;
      };
    };
  };
}

const SummaryField = ({ label, value }: { label: string; value: string }) => (
  <div className="p-2.5 sm:p-3 bg-elec-dark/40 rounded border border-elec-yellow/20">
    <p className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-elec-light">{value}</p>
  </div>
);

export const AtAGlanceSummary = ({ summary, circuit }: AtAGlanceSummaryProps) => {
  // Defensive checks for missing/undefined values
  const safeLoadKw = summary?.loadKw ?? 0;
  const safeLoadIb = summary?.loadIb || 'N/A';
  
  // Use calculated values when available, fall back to AI prose
  // Parse cableType to remove any size prefix (e.g., "4mm² twin and earth" -> "twin and earth")
  const parseCableType = (type?: string) => {
    if (!type) return 'T&E';
    // Remove leading size prefix like "2.5mm²", "4mm²", etc.
    return type.replace(/^\d+(\.\d+)?mm²\s*/i, '').trim() || type;
  };
  
  const safeCable = circuit 
    ? `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC, ${parseCableType(circuit.cableType)}`
    : (summary?.cable || 'Not specified');
  
  // PRIORITY: Use summary.protectiveDevice from AI justification (single source of truth)
  const safeProtectiveDevice = summary?.protectiveDevice 
    ? summary.protectiveDevice
    : circuit
      ? `${circuit.protectionDevice.rating}A Type ${circuit.protectionDevice.curve} ${circuit.protectionDevice.type}${circuit.rcdProtected ? ` + ${circuit.protectionDevice.rcdRating || 30}mA RCD` : ''}`
      : 'Not specified';
  
  const safeVoltageDrop = circuit
    ? `${circuit.calculations.voltageDrop.percent.toFixed(2)}% ${circuit.calculations.voltageDrop.compliant ? '✓' : '✗'} (Limit: ${circuit.calculations.voltageDrop.limit}%)`
    : (summary?.voltageDrop || 'N/A');
  
  const safeZs = circuit
    ? (() => {
        const zsValue = circuit.expectedTests?.zs?.expected ?? circuit.calculations.zs;
        const maxZs = circuit.expectedTests?.zs?.maxPermitted ?? circuit.calculations.maxZs;
        const compliant = circuit.expectedTests?.zs?.compliant ?? (zsValue <= maxZs);
        return `${zsValue.toFixed(3)}Ω ${compliant ? '✓' : '✗'} (Max: ${maxZs.toFixed(3)}Ω)`;
      })()
    : (summary?.zs || 'N/A');
  
  const safeComplianceTick = circuit 
    ? (circuit.calculations.voltageDrop.compliant && 
       (circuit.expectedTests?.zs?.compliant ?? (circuit.calculations.zs <= circuit.calculations.maxZs)))
    : (summary?.complianceTick ?? false);
  
  const safeNotes = summary?.notes || '';

  return (
    <Card className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/40 mb-4 sm:mb-6">
      <div className="p-4 sm:p-5 md:p-6">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-elec-light flex items-center gap-2">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
            At a Glance
          </h3>
          {safeComplianceTick && (
            <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 animate-pulse-subtle" />
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4">
          <SummaryField label="Load" value={`${safeLoadKw}kW (${safeLoadIb})`} />
          <SummaryField label="Cable" value={safeCable} />
          <SummaryField label="Protective Device" value={safeProtectiveDevice} />
          <SummaryField label="Voltage Drop" value={safeVoltageDrop} />
          <SummaryField label="Zs" value={safeZs} />
        </div>
        
        {safeNotes && (
          <div className="mt-4 p-3 sm:p-4 bg-elec-dark/40 rounded border border-elec-yellow/20">
            <p className="text-xs text-white/60 mb-1">Notes</p>
            <p className="text-sm text-white/90">{safeNotes}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
