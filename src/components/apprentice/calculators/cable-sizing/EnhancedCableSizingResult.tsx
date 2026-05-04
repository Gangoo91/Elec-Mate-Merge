import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, XCircle, Download, Save } from 'lucide-react';
import type { EnhancedCableSizingResult as EnhancedCableSizingResultType } from './useEnhancedCableSizing';

interface EnhancedCableSizingResultProps {
  result: EnhancedCableSizingResultType;
  onSaveToHistory: () => void;
  onExportReport: () => void;
}

const EnhancedCableSizingResult: React.FC<EnhancedCableSizingResultProps> = ({
  result,
  onSaveToHistory,
  onExportReport,
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-elec-yellow" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-white/55" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-300" />;
      default:
        return <CheckCircle className="h-4 w-4 text-white/55" />;
    }
  };

  if (!result.recommendedCable && Object.keys(result.errors).length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-center p-4 sm:p-6">
        <div className="space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 block">
            Enhanced cable calculator
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed max-w-md">
            Enter your project details and calculation parameters to get cable sizing
            recommendations with compliance checking.
          </p>
        </div>
      </div>
    );
  }

  if (Object.keys(result.errors).length > 0) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
          Calculation errors
        </span>
        <div className="space-y-1">
          {Object.entries(result.errors).map(([field, error]) => (
            <p key={field} className="text-[14px] text-white/85 leading-relaxed">
              {error}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 h-full overflow-y-auto">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-sm py-2 -my-2">
        <Button
          onClick={onSaveToHistory}
          className="w-full sm:w-auto h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        >
          <Save className="h-4 w-4 mr-2" />
          Save to history
        </Button>
        <Button
          onClick={onExportReport}
          variant="outline"
          className="w-full sm:w-auto h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <Download className="h-4 w-4 mr-2" />
          Export report
        </Button>
      </div>

      {/* Recommended Cable */}
      {result.recommendedCable && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recommended cable
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <div className="text-2xl sm:text-3xl font-mono text-white">
                {result.recommendedCable.cable.size}
              </div>
              <div className="text-[13px] text-white/55 mt-1">
                {result.recommendedCable.cable.coreConfig} •{' '}
                {result.recommendedCable.cable.cableType}
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                Suitability: {result.recommendedCable.suitabilityScore}%
              </span>
              <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                {result.recommendedCable.costEffectiveness}
              </span>
            </div>
          </div>

          {/* Cable Properties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55 mb-1">
                Current rating
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.recommendedCable.cable.currentRating.pvc}A (PVC)
              </div>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55 mb-1">
                Max operating temp
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.recommendedCable.cable.maxOperatingTemp}°C
              </div>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] sm:col-span-2 lg:col-span-1">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55 mb-1">
                Voltage drop
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.recommendedCable.cable.calculatedVoltageDrop?.toFixed(2)}V
              </div>
            </div>
          </div>

          {/* Warning Notes */}
          {result.recommendedCable.warningNotes.length > 0 && (
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Important notes
              </span>
              <div className="space-y-1">
                {result.recommendedCable.warningNotes.map((note, index) => (
                  <p key={index} className="text-[13px] text-white/85 leading-relaxed">
                    {note}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Calculation Summary */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Calculation summary
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Design current
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.designCurrent.toFixed(1)}A
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Protective device rating
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.protectiveDeviceRating}A
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Environmental derating
              </div>
              <div className="text-[14px] font-mono text-white">
                {(result.environmentalFactors.overallDerating * 100).toFixed(0)}%
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                Zs calculation
              </div>
              <div className="text-[14px] font-mono text-white">
                {result.zsCalculation.zs.toFixed(2)}Ω (Max: {result.zsCalculation.maxZs.toFixed(2)}Ω)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Checks */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Compliance checks
        </span>
        <div className="space-y-2">
          {result.complianceChecks.map((check, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="mt-0.5">{getStatusIcon(check.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                  <div className="text-[14px] font-medium text-white">{check.requirement}</div>
                  <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] w-fit font-mono">
                    {check.regulation}
                  </span>
                </div>
                {check.details && (
                  <p className="text-[13px] text-white/55 leading-relaxed mt-1">{check.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Cables */}
      {result.alternativeCables.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Alternative options ({result.alternativeCables.length})
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {result.alternativeCables.slice(0, 4).map((alt, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[14px] font-mono text-white">{alt.cable.size}</div>
                  <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
                    {alt.suitabilityScore}% match
                  </span>
                </div>
                <div className="text-[12px] text-white/55">
                  {alt.cable.coreConfig} • Rating: {alt.cable.currentRating.pvc}A
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warnings and Recommendations */}
      {(result.warnings.length > 0 || result.recommendations.length > 0) && (
        <div className="space-y-3">
          {result.warnings.length > 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Warnings
              </span>
              <ul className="space-y-1.5">
                {result.warnings.map((warning, index) => (
                  <li
                    key={index}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.recommendations.length > 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Recommendations
              </span>
              <ul className="space-y-1.5">
                {result.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EnhancedCableSizingResult;
