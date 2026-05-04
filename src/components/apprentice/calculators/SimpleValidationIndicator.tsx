import { CheckCircle, XCircle } from 'lucide-react';
import { SimpleValidationResult } from '@/services/simplifiedValidation';

interface SimpleValidationIndicatorProps {
  validation: SimpleValidationResult | null;
  calculationType: string;
}

const SimpleValidationIndicator = ({
  validation,
  calculationType,
}: SimpleValidationIndicatorProps) => {
  if (!validation) return null;

  const getStatusText = () => {
    if (validation.criticalAlerts.length > 0) return 'Critical issues';
    if (validation.warnings.length > 0) return 'Warnings';
    if (validation.isValid) return 'Compliant';
    return 'Issues found';
  };

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Safety validation
        </span>
        <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]">
          {getStatusText()}
        </span>
      </div>

      {/* Safety Factors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Temperature</div>
          <div className="text-[14px] font-mono text-white">
            {(validation.safetyFactors.temperatureDerating * 100).toFixed(0)}%
          </div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Grouping</div>
          <div className="text-[14px] font-mono text-white">
            {(validation.safetyFactors.groupingFactor * 100).toFixed(0)}%
          </div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">Safety margin</div>
          <div className="text-[14px] font-mono text-white">
            {(validation.safetyFactors.safetyMargin * 100).toFixed(0)}%
          </div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/55">BS 7671</div>
          <div className="text-[14px]">
            {validation.complianceChecks.bs7671 ? (
              <CheckCircle className="h-5 w-5 text-elec-yellow mx-auto" />
            ) : (
              <XCircle className="h-5 w-5 text-red-300 mx-auto" />
            )}
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {validation.criticalAlerts.length > 0 && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Critical safety alerts
          </span>
          <ul className="space-y-1.5">
            {validation.criticalAlerts.map((alert, index) => (
              <li
                key={index}
                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{alert}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Errors */}
      {validation.errors.length > 0 && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/[0.04] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Errors
          </span>
          <ul className="space-y-1.5">
            {validation.errors.map((error, index) => (
              <li
                key={index}
                className="text-[13px] text-white/85 leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                <span>{error}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {validation.warnings.length > 0 && (
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Warnings
          </span>
          <ul className="space-y-1.5">
            {validation.warnings.map((warning, index) => (
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

      {/* Success message */}
      {validation.isValid &&
        validation.warnings.length === 0 &&
        validation.criticalAlerts.length === 0 && (
          <p className="text-[13px] text-white/85 leading-relaxed">
            Calculation passed all safety validations. This design meets BS 7671 requirements.
          </p>
        )}
    </div>
  );
};

export default SimpleValidationIndicator;
