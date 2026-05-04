import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { SafetyValidationResult } from '@/services/safetyValidation';

interface EnhancedValidationIndicatorProps {
  validation: SafetyValidationResult | null;
  calculationType: string;
}

const EnhancedValidationIndicator: React.FC<EnhancedValidationIndicatorProps> = ({
  validation,
  calculationType,
}) => {
  if (!validation) {
    return null;
  }

  const Pill = ({ label, ok }: { label: string; ok: boolean }) => (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-md border justify-center ${
        ok ? 'border-white/10 bg-white/[0.03] text-white/85' : 'border-red-500/30 bg-red-500/[0.04] text-red-300'
      }`}
    >
      {ok ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </span>
  );

  return (
    <div className="space-y-4">
      {/* Status Header */}
      <div className="flex flex-wrap gap-2 items-center">
        <Pill
          label={validation.isValid ? 'Safety compliant' : 'Safety issues detected'}
          ok={validation.isValid}
        />
        {validation.safetyFactors.safetyMargin > 0 && (
          <span className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
            Safety margin: {validation.safetyFactors.safetyMargin.toFixed(2)}
          </span>
        )}
      </div>

      {/* Critical Safety Alerts */}
      {validation.criticalAlerts.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Critical safety alert
          </span>
          <ul className="space-y-1.5">
            {validation.criticalAlerts.map((alert, index) => (
              <li
                key={index}
                className="text-[14px] text-white leading-relaxed flex items-start gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-red-300 mt-2 flex-shrink-0" />
                <span>{alert}</span>
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-white/85 leading-relaxed">
            Do not proceed with installation until these issues are resolved. Consult a qualified
            electrician immediately.
          </p>
        </div>
      )}

      {/* Errors */}
      {validation.errors.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Calculation errors
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
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Safety warnings
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

      {/* Compliance Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Pill label="BS 7671" ok={validation.complianceChecks.bs7671} />
        <Pill label="IET" ok={validation.complianceChecks.iet} />
        <Pill label="Building Regs" ok={validation.complianceChecks.buildingRegs} />
        <Pill label="CDM" ok={validation.complianceChecks.cdm} />
      </div>

      {/* Safety Factors Detail */}
      {(validation.safetyFactors.temperatureDerating < 1.0 ||
        validation.safetyFactors.groupingFactor < 1.0) && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Applied safety factors
          </span>
          <div className="grid grid-cols-2 gap-2 text-[13px] text-white/85 font-mono">
            {validation.safetyFactors.temperatureDerating < 1.0 && (
              <div>
                Temperature derating:{' '}
                {(validation.safetyFactors.temperatureDerating * 100).toFixed(0)}%
              </div>
            )}
            {validation.safetyFactors.groupingFactor < 1.0 && (
              <div>
                Grouping factor: {(validation.safetyFactors.groupingFactor * 100).toFixed(0)}%
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Disclaimer */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Professional notice
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">
          These calculations include safety factors and real-world conditions. However, all
          electrical work must be designed, installed, and certified by qualified personnel. This
          tool is for guidance only and does not replace professional electrical design or
          inspection.
        </p>
      </div>
    </div>
  );
};

export default EnhancedValidationIndicator;
