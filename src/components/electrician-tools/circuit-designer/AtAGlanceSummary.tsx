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
}

const SummaryField = ({ label, value }: { label: string; value: string }) => (
  <div className="p-2.5 sm:p-3 bg-elec-dark/40 rounded border border-elec-yellow/20">
    <p className="text-[10px] sm:text-xs text-white/60 mb-0.5 sm:mb-1">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-elec-light">{value}</p>
  </div>
);

export const AtAGlanceSummary = ({ summary }: AtAGlanceSummaryProps) => {
  // Defensive checks for missing/undefined values
  const safeLoadKw = summary?.loadKw ?? 0;
  const safeLoadIb = summary?.loadIb || 'N/A';
  const safeCable = summary?.cable || 'Not specified';
  const safeProtectiveDevice = summary?.protectiveDevice || 'Not specified';
  const safeVoltageDrop = summary?.voltageDrop || 'N/A';
  const safeZs = summary?.zs || 'N/A';
  const safeComplianceTick = summary?.complianceTick ?? false;
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
