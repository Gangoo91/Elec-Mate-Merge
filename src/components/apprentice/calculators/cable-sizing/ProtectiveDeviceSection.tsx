import { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  DeviceType,
  validateProtectiveDevice,
  getDeviceInfo,
  getI2Multiplier,
} from './useProtectiveDeviceCheck';

interface ProtectiveDeviceSectionProps {
  designCurrent: number;
  effectiveCapacity: number; // Iz
  nextCableSizeUp?: { size: number; capacity: number };
  /** The device the cable was sized on — selected on the input form so that
      the coordination check and the sizing cannot disagree. */
  deviceType: DeviceType;
  rating: number;
}

const ProtectiveDeviceSection = ({
  designCurrent,
  effectiveCapacity,
  nextCableSizeUp,
  deviceType,
  rating,
}: ProtectiveDeviceSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);

  // Validate the current selection
  const validation = useMemo(() => {
    if (!rating || !effectiveCapacity) return null;
    return validateProtectiveDevice(
      designCurrent,
      effectiveCapacity,
      deviceType,
      rating,
      nextCableSizeUp
    );
  }, [designCurrent, effectiveCapacity, deviceType, rating, nextCableSizeUp]);

  const deviceInfo = getDeviceInfo(deviceType);
  const i2Multiplier = getI2Multiplier(deviceType);

  const CheckIcon = ({ passed }: { passed: boolean }) =>
    passed ? (
      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
    ) : (
      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
    );

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-8 pt-8 border-t border-white/[0.06]"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between touch-manipulation min-h-[44px]">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Protective device check
          </span>
          <span className="text-[11px] text-white font-mono hidden sm:inline">
            BS 7671 Reg 433.1
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 text-white flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-6 space-y-6">
        {/* Device summary — the selection itself lives on the input form, since
            App 4 §5.1.1 sizes the cable on In and Cf depends on the device. */}
        <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Device sized on
          </span>
          <p className="text-[14px] font-medium text-white">
            {deviceInfo?.label ?? deviceType} — {rating}A
          </p>
          {deviceInfo && (
            <p className="text-[12px] text-white font-mono">
              I₂ = {i2Multiplier} × In ({deviceInfo.standard})
            </p>
          )}
        </div>

        {/* Validation Results */}
        {validation && (
          <div className="space-y-4">
            {/* Overall Status */}
            <div
              className={`rounded-xl border p-4 ${
                validation.allPassed
                  ? 'border-white/[0.06] bg-white/[0.02]'
                  : 'border-red-500/30 bg-red-500/[0.04]'
              }`}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                {validation.allPassed
                  ? 'All BS 7671 coordination checks passed'
                  : 'Coordination check failed'}
              </span>
            </div>

            {/* Individual Checks */}
            <div className="space-y-3">
              {/* Check 1: Ib ≤ In */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.ibLessEqualIn.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-medium text-white">Check 1: Ib ≤ In</span>
                      <span
                        className={`text-[11px] font-medium uppercase tracking-[0.18em] flex-shrink-0 ${validation.checks.ibLessEqualIn.passed ? 'text-white' : 'text-red-300'}`}
                      >
                        {validation.checks.ibLessEqualIn.passed ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                    <p className="text-[13px] text-white leading-relaxed mt-1 font-mono">
                      Design current ({validation.checks.ibLessEqualIn.ib}A){' '}
                      {validation.checks.ibLessEqualIn.passed ? '≤' : '>'} Device rating (
                      {validation.checks.ibLessEqualIn.in_}A)
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 2: In ≤ Iz */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.inLessEqualIz.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-medium text-white">Check 2: In ≤ Iz</span>
                      <span
                        className={`text-[11px] font-medium uppercase tracking-[0.18em] flex-shrink-0 ${validation.checks.inLessEqualIz.passed ? 'text-white' : 'text-red-300'}`}
                      >
                        {validation.checks.inLessEqualIz.passed ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                    <p className="text-[13px] text-white leading-relaxed mt-1 font-mono">
                      Device rating ({validation.checks.inLessEqualIz.in_}A){' '}
                      {validation.checks.inLessEqualIz.passed ? '≤' : '>'} Effective capacity (
                      {validation.checks.inLessEqualIz.iz}A)
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 3: I2 ≤ 1.45 × Iz */}
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.i2LessEqual145Iz.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-medium text-white">
                        Check 3: I₂ ≤ 1.45 × Iz
                      </span>
                      <span
                        className={`text-[11px] font-medium uppercase tracking-[0.18em] flex-shrink-0 ${validation.checks.i2LessEqual145Iz.passed ? 'text-white' : 'text-red-300'}`}
                      >
                        {validation.checks.i2LessEqual145Iz.passed ? 'Pass' : 'Fail'}
                      </span>
                    </div>
                    <p className="text-[13px] text-white leading-relaxed mt-1 font-mono">
                      Overload trip ({validation.checks.i2LessEqual145Iz.i2}A){' '}
                      {validation.checks.i2LessEqual145Iz.passed ? '≤' : '>'} 1.45 × Iz (
                      {validation.checks.i2LessEqual145Iz.limit}A)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions if failed */}
            {validation.suggestions.length > 0 && (
              <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  Suggestions
                </span>
                <ul className="space-y-1.5">
                  {validation.suggestions.map((suggestion, idx) => (
                    <li
                      key={idx}
                      className="text-[13px] text-white leading-relaxed flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Device Reference Info */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Device I₂ values
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                <div className="flex items-baseline justify-between p-2 text-[13px]">
                  <span className="text-white">MCB / RCBO</span>
                  <span className="font-mono text-white">1.45 × In</span>
                </div>
                <div className="flex items-baseline justify-between p-2 text-[13px]">
                  <span className="text-white">BS 88 gG</span>
                  <span className="font-mono text-white">1.6 × In</span>
                </div>
                <div className="flex items-baseline justify-between p-2 text-[13px]">
                  <span className="text-white">BS 3036</span>
                  <span className="font-mono text-white">2.0 × In</span>
                </div>
                <div className="flex items-baseline justify-between p-2 text-[13px]">
                  <span className="text-white">MCCB</span>
                  <span className="font-mono text-white">1.3 × In</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProtectiveDeviceSection;
