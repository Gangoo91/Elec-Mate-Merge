import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { ValidationResult } from '@/services/calculatorValidation';

interface ValidationIndicatorProps {
  validation: ValidationResult | null;
  calculationType: string;
}

const ValidationIndicator: React.FC<ValidationIndicatorProps> = ({
  validation,
  calculationType,
}) => {
  if (!validation) {
    return null;
  }

  const Pill = ({ label, ok }: { label: string; ok: boolean }) => (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-md border ${
        ok ? 'border-white/10 bg-white/[0.03] text-white/85' : 'border-red-500/30 bg-red-500/[0.04] text-red-300'
      }`}
    >
      {ok ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {label}
    </span>
  );

  return (
    <div className="space-y-3">
      {/* Standards Compliance */}
      <div className="flex flex-wrap gap-2">
        <Pill label="BS 7671" ok={validation.standardsCompliance.bs7671} />
        <Pill label="IET" ok={validation.standardsCompliance.iet} />
        <Pill label="Safety" ok={validation.standardsCompliance.safety} />
      </div>

      {/* Validation Status */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          {validation.isValid ? 'Calculation valid' : 'Validation issues detected'}
        </span>
      </div>

      {/* Errors */}
      {validation.errors.length > 0 && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
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
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
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

      {/* Professional Notice */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Professional notice
        </span>
        <p className="text-[13px] text-white/85 leading-relaxed">
          This {calculationType} calculation has been validated against BS 7671 and IET standards.
          Always verify critical calculations with a qualified electrician before implementation.
        </p>
      </div>
    </div>
  );
};

export default ValidationIndicator;
