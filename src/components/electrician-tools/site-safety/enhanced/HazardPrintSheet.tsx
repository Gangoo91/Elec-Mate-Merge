import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { getRiskLevel } from '@/utils/risk-level-helpers';

interface HazardPrintSheetProps {
  hazard: any;
}

export const HazardPrintSheet = forwardRef<HTMLDivElement, HazardPrintSheetProps>(
  ({ hazard }, ref) => {
    const riskScore = hazard.likelihood * hazard.severity;
    const riskLevel = getRiskLevel(riskScore);

    return (
      <div 
        ref={ref} 
        className="bg-background p-8 max-w-[210mm] mx-auto print:p-0 print:max-w-full"
        style={{ minHeight: '297mm' }}
      >
        {/* Header */}
        <div className="border-b-4 border-elec-yellow pb-4 mb-6">
          <h1 className="text-2xl font-bold mb-2">HAZARD SAFETY SHEET</h1>
          <div className="flex items-center gap-3">
            <Badge className="text-sm px-3 py-1">
              {hazard.category}
            </Badge>
            <Badge 
              variant="outline"
              className={`text-sm px-3 py-1 ${
                riskLevel === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                'bg-green-500/20 text-green-400 border-green-500/30'
              }`}
            >
              Risk Score: {riskScore}/25 ({riskLevel.toUpperCase()})
            </Badge>
          </div>
        </div>

        {/* Hazard Name */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-elec-yellow mb-2">
            {hazard.hazard}
          </h2>
          <p className="text-base">{hazard.consequence}</p>
        </div>

        {/* Risk Assessment */}
        <div className="bg-elec-card/30 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Risk Assessment</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Likelihood</div>
              <div className="text-lg font-bold">{hazard.likelihood}/5</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Severity</div>
              <div className="text-lg font-bold">{hazard.severity}/5</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Combined Score</div>
              <div className="text-lg font-bold">{riskScore}/25</div>
            </div>
          </div>
        </div>

        {/* Control Measures */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm border-b border-border/30 pb-2">
            Control Measures (Hierarchy of Controls)
          </h3>

          {/* Elimination */}
          {hazard.controlMeasures?.elimination && hazard.controlMeasures.elimination.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🚫</span>
                <h4 className="font-semibold text-sm">ELIMINATION (Priority 1)</h4>
              </div>
              <ul className="list-disc pl-8 space-y-1">
                {hazard.controlMeasures.elimination.map((measure: string, idx: number) => (
                  <li key={idx} className="text-sm">{measure}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Substitution */}
          {hazard.controlMeasures?.substitution && hazard.controlMeasures.substitution.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔄</span>
                <h4 className="font-semibold text-sm">SUBSTITUTION (Priority 2)</h4>
              </div>
              <ul className="list-disc pl-8 space-y-1">
                {hazard.controlMeasures.substitution.map((measure: string, idx: number) => (
                  <li key={idx} className="text-sm">{measure}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Engineering */}
          {hazard.controlMeasures?.engineering && hazard.controlMeasures.engineering.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔧</span>
                <h4 className="font-semibold text-sm">ENGINEERING CONTROLS (Priority 3)</h4>
              </div>
              <ul className="list-disc pl-8 space-y-1">
                {hazard.controlMeasures.engineering.map((measure: string, idx: number) => (
                  <li key={idx} className="text-sm">{measure}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Administrative */}
          {hazard.controlMeasures?.administrative && hazard.controlMeasures.administrative.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">📋</span>
                <h4 className="font-semibold text-sm">ADMINISTRATIVE CONTROLS (Priority 4)</h4>
              </div>
              <ul className="list-disc pl-8 space-y-1">
                {hazard.controlMeasures.administrative.map((measure: string, idx: number) => (
                  <li key={idx} className="text-sm">{measure}</li>
                ))}
              </ul>
            </div>
          )}

          {/* PPE */}
          {hazard.controlMeasures?.ppe && hazard.controlMeasures.ppe.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🦺</span>
                <h4 className="font-semibold text-sm">PPE (Priority 5 - Last Resort)</h4>
              </div>
              <ul className="list-disc pl-8 space-y-1">
                {hazard.controlMeasures.ppe.map((measure: string, idx: number) => (
                  <li key={idx} className="text-sm">{measure}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Regulations */}
        {hazard.bs7671References && hazard.bs7671References.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2 uppercase text-sm">Applicable Regulations</h3>
            <div className="flex flex-wrap gap-2">
              {hazard.bs7671References.map((reg: string, idx: number) => (
                <Badge key={idx} variant="outline" className="font-mono text-xs">
                  BS7671: {reg}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-border/30 pt-4 mt-8 text-xs text-muted-foreground">
          <p>Generated: {new Date().toLocaleDateString('en-GB')}</p>
          <p className="mt-1">This safety sheet should be used as part of your risk assessment process.</p>
        </div>
      </div>
    );
  }
);

HazardPrintSheet.displayName = 'HazardPrintSheet';
