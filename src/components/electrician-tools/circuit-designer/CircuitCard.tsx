import { CircuitDesign } from '@/types/installation-design';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MobileButton } from '@/components/ui/mobile-button';
import { AtAGlanceSummary } from './AtAGlanceSummary';
import { StructuredDesignSections } from './StructuredDesignSections';
import { MobileJustificationAccordion, buildJustificationSections } from './mobile/MobileJustificationAccordion';
import { MobileTestResultsCompact } from './mobile/MobileTestResultsCompact';
import { MobileInstallationGuidanceSection } from './mobile/MobileInstallationGuidanceSection';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  CheckCircle2, AlertTriangle, AlertCircle, Zap, Calculator
} from 'lucide-react';

interface CircuitCardProps {
  circuit: CircuitDesign;
  onViewWorkings?: () => void;
  onViewJustification?: () => void;
  className?: string;
  showFullDetails?: boolean; // New prop for mobile full details
  displayNumber?: number; // Override circuit number display (for array index consistency)
}

export const CircuitCard = ({ circuit, onViewWorkings, onViewJustification, className = '', showFullDetails = false, displayNumber }: CircuitCardProps) => {
  const isMobile = useIsMobile();
  
  // Use backend complianceStatus when available (same as desktop)
  // Fall back to simple calculation check for legacy data
  let status: 'pass' | 'warning' | 'fail' = 'pass';

  if ((circuit as any).complianceStatus) {
    // Backend Phase 5.5 has determined status with all 14 validation rules
    status = (circuit as any).complianceStatus;
  } else {
    // Fallback for legacy data without complianceStatus
    const vdCompliant = circuit.calculations?.voltageDrop?.compliant ?? true;
    const zsCompliant = (circuit.calculations?.zs ?? 0) <= (circuit.calculations?.maxZs ?? 999);
    const hasWarnings = circuit.warnings && circuit.warnings.length > 0;
    const isCompliant = vdCompliant && zsCompliant;
    status = !isCompliant ? 'fail' : hasWarnings ? 'warning' : 'pass';
  }

  return (
    <Card className={`bg-card border-elec-yellow/30 overflow-hidden shadow-lg shadow-elec-yellow/5 transition-all duration-300 hover:shadow-elec-yellow/10 mx-auto max-w-2xl ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-br from-elec-yellow/15 via-elec-yellow/10 to-transparent border-b border-elec-yellow/20 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-elec-yellow shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-elec-light">
                Way {displayNumber ?? circuit.circuitNumber ?? 'N/A'}
              </h3>
            </div>
            {circuit.phases === 'three' && (
              <p className="text-sm font-medium text-elec-yellow/80 mb-1 pl-7">
                (L1, L2, L3)
              </p>
            )}
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
            } h-7 shrink-0 transition-all duration-300`}
          >
            {status === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
            {status === 'fail' && <AlertCircle className="h-3 w-3 mr-1" />}
            {status === 'pass' ? 'Pass' : status === 'warning' ? 'Warning' : 'Review'}
          </Badge>
        </div>

        {/* Show validation issues when status is not pass */}
        {status !== 'pass' && (circuit as any).validationIssues && (circuit as any).validationIssues.length > 0 && (
          <div className="mt-2 bg-red-500/10 border border-red-500/20 rounded-lg p-2">
            {(circuit as any).validationIssues.map((issue: any, idx: number) => (
              <p key={idx} className="text-[10px] text-red-300 mb-1">
                • {issue.message} {issue.regulation && `(${issue.regulation})`}
              </p>
            ))}
          </div>
        )}

        {/* Also show warnings if present */}
        {status === 'warning' && circuit.warnings && circuit.warnings.length > 0 && !(circuit as any).validationIssues?.length && (
          <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
            {circuit.warnings.map((warning: string, idx: number) => (
              <p key={idx} className="text-[10px] text-amber-300 mb-1">• {warning}</p>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 sm:p-6">
        {/* PHASE 5: Structured Output Display */}
        {circuit.structuredOutput ? (
          <>
            {/* At a Glance Summary */}
            <AtAGlanceSummary 
              summary={circuit.structuredOutput.atAGlanceSummary}
              circuit={circuit}
            />
            
            {/* 9 Structured Sections */}
            <StructuredDesignSections sections={circuit.structuredOutput.sections} />

            {/* Mobile Full Details Section (Inline Justifications) */}
            {(showFullDetails || !isMobile) && (
              <div className="space-y-6 mt-6">
                {/* Detailed Justifications Accordion */}
                <MobileJustificationAccordion sections={buildJustificationSections(circuit)} />
                
                {/* Installation Guidance - Always shown on desktop, opt-in on mobile */}
                <MobileInstallationGuidanceSection circuit={circuit} />
                
                {/* Expected Test Results */}
                <MobileTestResultsCompact circuit={circuit} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 text-white/60">
            <p className="text-sm mb-2">Legacy design format detected</p>
            <p className="text-xs text-white/40">Regenerate this circuit to see the new structured output format</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="border-t border-elec-yellow/20 p-4 sm:p-5 bg-gradient-to-br from-elec-dark/40 to-transparent">
        {onViewWorkings && (
          <MobileButton
            variant="elec-outline"
            size="default"
            icon={<Calculator className="h-4 w-4" />}
            onClick={onViewWorkings}
            className="w-full border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            View Detailed Calculations
          </MobileButton>
        )}
      </div>
    </Card>
  );
};
