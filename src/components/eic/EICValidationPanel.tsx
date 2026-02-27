import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, CheckCircle, Shield, FileText, XCircle } from 'lucide-react';
import { useEICValidation, ValidationRule } from '@/hooks/useEICValidation';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EICValidationPanelProps {
  formData: any;
  className?: string;
}

const EICValidationPanel: React.FC<EICValidationPanelProps> = ({ formData, className = '' }) => {
  const validation = useEICValidation(formData);
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        className,
        isMobile ? '-mx-4' : 'rounded-xl border border-white/10 bg-white/[0.02]'
      )}
    >
      {/* Header */}
      <div
        className={cn(
          'flex items-center justify-between gap-3',
          isMobile
            ? 'px-4 py-4 bg-card/30 border-y border-border/20'
            : 'p-4 border-b border-white/10'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-elec-yellow" />
          </div>
          <h3 className="font-semibold text-white">Validation & Compliance</h3>
        </div>
        <Badge
          className={cn(
            'gap-1.5 shrink-0 border',
            validation.isValid
              ? 'bg-green-500/15 text-green-400 border-green-500/30'
              : 'bg-red-500/15 text-red-400 border-red-500/30'
          )}
        >
          {validation.isValid ? (
            <>
              <CheckCircle className="h-3 w-3" />
              Valid
            </>
          ) : (
            <>
              <AlertTriangle className="h-3 w-3" />
              Issues Found
            </>
          )}
        </Badge>
      </div>

      {/* Content */}
      <div className={cn('space-y-5', isMobile ? 'px-4 py-5' : 'p-5')}>
        {/* Progress Bar */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-medium text-white">Completion Progress</span>
            <span className="text-sm font-semibold text-elec-yellow">
              {validation.completionPercentage}%
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500 ease-out',
                validation.completionPercentage >= 90
                  ? 'bg-green-500'
                  : validation.completionPercentage >= 50
                    ? 'bg-elec-yellow'
                    : 'bg-amber-500'
              )}
              style={{ width: `${validation.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
            <div className="text-2xl font-bold text-red-400">{validation.errors.length}</div>
            <div className="text-xs text-white mt-0.5">Errors</div>
          </div>
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 text-center">
            <div className="text-2xl font-bold text-amber-400">{validation.warnings.length}</div>
            <div className="text-xs text-white mt-0.5">Warnings</div>
          </div>
          <div
            className={cn(
              'rounded-xl border p-3 text-center',
              validation.isValid
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-white/[0.03] border-white/10'
            )}
          >
            <div className={cn('text-2xl font-bold', validation.isValid ? 'text-green-400' : 'text-white')}>
              {validation.isValid ? (
                <CheckCircle className="h-6 w-6 mx-auto" />
              ) : (
                <XCircle className="h-6 w-6 mx-auto" />
              )}
            </div>
            <div className="text-xs text-white mt-0.5">Status</div>
          </div>
        </div>

        {/* Critical Issues */}
        {validation.errors.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Critical Issues (Must Fix)
            </h4>
            <div className="space-y-2">
              {validation.errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-red-500/8 border-l-2 border-red-500"
                >
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium">{error.message}</p>
                    {error.regulation && (
                      <p className="text-xs text-amber-400 mt-1">Reference: {error.regulation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        {validation.warnings.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Recommendations
            </h4>
            <div className="space-y-2">
              {validation.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border-l-2 border-amber-500/50"
                >
                  <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-white">{warning.message}</p>
                    {warning.regulation && (
                      <p className="text-xs text-amber-400 mt-1">Reference: {warning.regulation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Success State */}
        {validation.isValid && validation.completionPercentage >= 90 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-400">EIC Ready for Generation!</p>
              <p className="text-xs text-white mt-1 leading-relaxed">
                All required fields are complete and validation checks have passed. You can now
                generate the official certificate.
              </p>
            </div>
          </div>
        )}

        {/* Legal Note */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-start gap-2.5">
            <FileText className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-white mb-1">Legal Requirements:</p>
              <p className="text-xs text-white leading-relaxed">
                This EIC must comply with BS 7671:2018 and Building Regulations. All declarations
                require competent person signatures. Keep records for minimum 6 years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EICValidationPanel;
