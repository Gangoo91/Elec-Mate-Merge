import { useState, useEffect, useMemo } from 'react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { RequiredFieldTooltip } from '@/components/ui/required-field-tooltip';
import { 
  DeviceType, 
  deviceTypeOptions, 
  ratingsByDevice, 
  getFilteredRatings,
  validateProtectiveDevice,
  getDeviceInfo,
  getI2Multiplier
} from './useProtectiveDeviceCheck';

interface ProtectiveDeviceSectionProps {
  designCurrent: number;
  effectiveCapacity: number; // Iz
  nextCableSizeUp?: { size: number; capacity: number };
}

const ProtectiveDeviceSection = ({
  designCurrent,
  effectiveCapacity,
  nextCableSizeUp
}: ProtectiveDeviceSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [deviceType, setDeviceType] = useState<DeviceType>('mcb-b');
  const [rating, setRating] = useState<number>(0);

  // Get available ratings for selected device type
  const availableRatings = useMemo(() => {
    return getFilteredRatings(deviceType, designCurrent);
  }, [deviceType, designCurrent]);

  // Auto-select sensible default rating when device type changes
  useEffect(() => {
    const ratings = ratingsByDevice[deviceType];
    // Find the smallest rating >= design current
    const defaultRating = ratings.find(r => r >= designCurrent) || ratings[0];
    setRating(defaultRating);
  }, [deviceType, designCurrent]);

  // Validate the current selection
  const validation = useMemo(() => {
    if (!rating || !effectiveCapacity) return null;
    return validateProtectiveDevice(designCurrent, effectiveCapacity, deviceType, rating, nextCableSizeUp);
  }, [designCurrent, effectiveCapacity, deviceType, rating, nextCableSizeUp]);

  const deviceInfo = getDeviceInfo(deviceType);
  const i2Multiplier = getI2Multiplier(deviceType);

  const CheckIcon = ({ passed }: { passed: boolean }) => (
    passed 
      ? <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
      : <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
  );

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-8 pt-8 border-t border-elec-yellow/30">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-4 text-elec-yellow hover:text-elec-yellow/80 transition-all duration-200 bg-elec-gray/20 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 min-h-[56px] active:scale-[0.98]">
        <div className="flex items-center gap-2 sm:gap-3">
          <Shield className="h-5 w-5 flex-shrink-0" />
          <span className="font-semibold text-sm sm:text-base">Protective Device Check</span>
          <span className="text-xs text-white font-normal hidden sm:inline">(BS 7671 Reg 433.1)</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4 flex-shrink-0" /> : <ChevronDown className="h-4 w-4 flex-shrink-0" />}
      </CollapsibleTrigger>

      <CollapsibleContent className="pt-6 space-y-6">
        {/* Device Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center gap-1">
              Device Type
              <RequiredFieldTooltip content="Select the type of protective device for overload protection" />
            </label>
            <Select value={deviceType} onValueChange={(v) => setDeviceType(v as DeviceType)}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30 min-h-[48px] text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {deviceTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="py-3">
                    <div className="flex flex-col">
                      <span className="text-white">{option.label}</span>
                      <span className="text-xs text-white/70">{option.standard}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {deviceInfo && (
              <p className="text-xs text-white">
                I₂ = {i2Multiplier} × In ({deviceInfo.standard})
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-white flex items-center gap-1">
              Rating (In)
              <RequiredFieldTooltip content="Nominal current rating of the protective device" />
            </label>
            <Select value={rating.toString()} onValueChange={(v) => setRating(parseInt(v))}>
              <SelectTrigger className="bg-elec-dark/50 border-elec-yellow/30 min-h-[48px] text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {availableRatings.map(r => (
                  <SelectItem key={r} value={r.toString()} className="py-3 text-white">
                    {r}A
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Validation Results */}
        {validation && (
          <div className="space-y-4">
            {/* Overall Status */}
            <div className={`p-4 rounded-lg border ${
              validation.allPassed 
                ? 'bg-green-900/20 border-green-500/30' 
                : 'bg-red-900/20 border-red-500/30'
            }`}>
              <div className="flex items-center gap-2">
                {validation.allPassed 
                  ? <CheckCircle2 className="h-6 w-6 text-green-400" />
                  : <AlertTriangle className="h-6 w-6 text-red-400" />
                }
                <span className={`font-semibold ${validation.allPassed ? 'text-green-400' : 'text-red-400'}`}>
                  {validation.allPassed 
                    ? 'All BS 7671 Coordination Checks Passed' 
                    : 'Coordination Check Failed'
                  }
                </span>
              </div>
            </div>

            {/* Individual Checks */}
            <div className="space-y-3">
              {/* Check 1: Ib ≤ In */}
              <div className="p-4 bg-elec-dark/30 rounded-lg">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.ibLessEqualIn.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-base">Check 1: Ib ≤ In</span>
                      <span className={`text-sm font-bold flex-shrink-0 ${validation.checks.ibLessEqualIn.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {validation.checks.ibLessEqualIn.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="text-sm text-white mt-1">
                      Design current ({validation.checks.ibLessEqualIn.ib}A) {validation.checks.ibLessEqualIn.passed ? '≤' : '>'} Device rating ({validation.checks.ibLessEqualIn.in_}A)
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 2: In ≤ Iz */}
              <div className="p-4 bg-elec-dark/30 rounded-lg">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.inLessEqualIz.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-base">Check 2: In ≤ Iz</span>
                      <span className={`text-sm font-bold flex-shrink-0 ${validation.checks.inLessEqualIz.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {validation.checks.inLessEqualIz.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="text-sm text-white mt-1">
                      Device rating ({validation.checks.inLessEqualIz.in_}A) {validation.checks.inLessEqualIz.passed ? '≤' : '>'} Effective capacity ({validation.checks.inLessEqualIz.iz}A)
                    </p>
                  </div>
                </div>
              </div>

              {/* Check 3: I2 ≤ 1.45 × Iz */}
              <div className="p-4 bg-elec-dark/30 rounded-lg">
                <div className="flex items-start gap-3 text-left">
                  <CheckIcon passed={validation.checks.i2LessEqual145Iz.passed} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-white text-base">Check 3: I₂ ≤ 1.45 × Iz</span>
                      <span className={`text-sm font-bold flex-shrink-0 ${validation.checks.i2LessEqual145Iz.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {validation.checks.i2LessEqual145Iz.passed ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <p className="text-sm text-white mt-1">
                      Overload trip ({validation.checks.i2LessEqual145Iz.i2}A) {validation.checks.i2LessEqual145Iz.passed ? '≤' : '>'} 1.45 × Iz ({validation.checks.i2LessEqual145Iz.limit}A)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Suggestions if failed */}
            {validation.suggestions.length > 0 && (
              <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-5 w-5 text-amber-400" />
                  <span className="font-medium text-amber-400">Suggestions</span>
                </div>
                <ul className="space-y-2">
                  {validation.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-sm text-white flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Device Reference Info */}
            <div className="p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/10">
              <div className="flex items-center gap-2 mb-3 text-left">
                <Info className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <span className="text-sm font-medium text-white">Device I₂ Values</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white">
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>MCB/RCBO</span>
                  <span className="font-mono">1.45 × In</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>BS 88 gG</span>
                  <span className="font-mono">1.6 × In</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>BS 3036</span>
                  <span className="font-mono">2.0 × In</span>
                </div>
                <div className="flex justify-between p-2 bg-white/5 rounded">
                  <span>MCCB</span>
                  <span className="font-mono">1.3 × In</span>
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
