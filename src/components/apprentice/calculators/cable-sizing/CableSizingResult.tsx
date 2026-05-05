import { ChevronDown, AlertTriangle } from 'lucide-react';
import { CableSizingInputs, DeratingFactors, BS7671CableOption } from './useCableSizing';
import { RequiredFieldTooltip } from '@/components/ui/required-field-tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import ProtectiveDeviceSection from './ProtectiveDeviceSection';
import { CALCULATOR_CONFIG } from '@/components/calculators/shared';

const config = CALCULATOR_CONFIG['cable'];

interface CableSizingResultProps {
  recommendedCable: BS7671CableOption | null;
  alternativeCables: BS7671CableOption[];
  errors: {
    general?: string;
  };
  inputs: CableSizingInputs;
  deratingFactors?: DeratingFactors;
  nextCableSizeUp?: { size: number; capacity: number };
}

const CableSizingResult = ({
  recommendedCable,
  alternativeCables,
  errors,
  inputs,
  deratingFactors,
  nextCableSizeUp,
}: CableSizingResultProps) => {
  const [showDerivation, setShowDerivation] = useState(false);
  const designCurrent = parseFloat(inputs.current) || 0;

  const getInstallationMethodDisplay = (referenceMethod: string) => {
    const methodDescriptions: Record<string, string> = {
      A: 'Enclosed in insulation',
      A1: 'Conduit in masonry',
      A2: 'Conduit on surface',
      B1: 'Trunking on surface',
      B2: 'Trunking flush in wall',
      C: 'Clipped direct to surface',
      D1: 'Buried direct in ground',
      D2: 'In buried ducts',
      E: 'On perforated tray/ladder',
      F: 'Single-core on tray',
      G: 'Free air, spaced',
      '100': 'Above ceiling, insulation ≤100mm',
      '101': 'Above ceiling, insulation >100mm',
      '102': 'Stud wall, touching insulation',
      '103': 'Stud wall, not touching',
    };
    return methodDescriptions[referenceMethod] || referenceMethod;
  };

  const getCableTypeDisplay = (cableType: string) => {
    const typeMap: Record<string, string> = {
      'pvc-single': 'PVC Single-core 70°C',
      'xlpe-single': 'XLPE Single-core 90°C',
      'pvc-twin-earth': 'Flat Twin & Earth 70°C',
      'xlpe-twin-earth': 'XLPE Twin & Earth 90°C',
      swa: 'SWA Multicore',
      'swa-single-core': 'SWA Single-core',
      micc: 'MI Cable',
      'aluminium-xlpe': 'Aluminium XLPE',
    };
    return typeMap[cableType] || cableType.toUpperCase();
  };

  // Use actual derating factors if available
  const Ca = deratingFactors?.Ca ?? 1.0;
  const Cg = deratingFactors?.Cg ?? 1.0;
  const Ci = deratingFactors?.Ci ?? 1.0;
  const Cs = deratingFactors?.Cs ?? 1.0;
  const Cd = deratingFactors?.Cd ?? 1.0;
  const totalDerating = deratingFactors?.total ?? 1.0;

  return (
    <div className="space-y-6">
      {!recommendedCable ? (
        <div className="text-center py-12">
          <p className="text-[14px] text-white/55 leading-relaxed">
            Enter the circuit specifications and tap "Calculate" to get results
          </p>
        </div>
      ) : (
        <>
          {/* Recommended Cable */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Recommended cable
            </span>

            {/* Cable Size - Centred, Prominent */}
            <div className="text-center">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl md:text-6xl font-mono font-semibold text-white">
                  {recommendedCable.size}
                </span>
                <span className="text-2xl md:text-3xl font-mono text-white/85">mm²</span>
              </div>
              <div className="space-y-1">
                <p className="text-[14px] font-medium text-white">
                  {getCableTypeDisplay(inputs.cableType)}
                </p>
                <p className="text-[12px] text-white/55 font-mono">
                  {recommendedCable.tableReference} —{' '}
                  {getInstallationMethodDisplay(deratingFactors?.referenceMethod || 'C')}
                </p>
              </div>
            </div>

            {/* Capacity Info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                <span className="text-[13px] text-white/85 flex items-center gap-1">
                  Tabulated capacity (It)
                  <RequiredFieldTooltip content="Current-carrying capacity from BS 7671 Appendix 4 tables at reference conditions" />
                </span>
                <span className="text-2xl font-mono text-white">
                  {recommendedCable.tabulatedCapacity}A
                </span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                <span className="text-[13px] text-white/85 flex items-center gap-1">
                  Effective capacity
                  <RequiredFieldTooltip content="It × Ca × Cg × Ci — the current-carrying capacity adjusted for installation conditions" />
                </span>
                <span className="text-2xl font-mono text-white">
                  {recommendedCable.deratedCapacity}A
                </span>
              </div>

              <div className="flex items-center justify-between py-3">
                <span className="text-[13px] text-white/85 flex items-center gap-1">
                  Voltage drop
                  <RequiredFieldTooltip content="Voltage drop must not exceed 3% for lighting or 5% for other circuits per BS 7671" />
                </span>
                <div className="text-right">
                  <div className="text-xl font-mono text-white">
                    {recommendedCable.calculatedVoltageDrop}V
                  </div>
                  <div className="text-[12px] font-mono text-white/55">
                    ({recommendedCable.voltageDropPercent}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Options */}
          {alternativeCables.length > 0 && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Alternative options
              </span>
              <div className="space-y-3">
                {alternativeCables.map((cable, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-mono text-white">{cable.size}</span>
                      <span className="text-[14px] font-mono text-white/85">mm²</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/85">Tabulated</span>
                        <span className="font-mono text-white">{cable.tabulatedCapacity}A</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/85">Effective</span>
                        <span className="font-mono text-white">{cable.deratedCapacity}A</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-white/85">Voltage drop</span>
                        <span className="font-mono text-white">
                          {cable.calculatedVoltageDrop}V ({cable.voltageDropPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Show Calculation Derivation */}
          <Collapsible open={showDerivation} onOpenChange={setShowDerivation} className="mt-6">
            <CollapsibleTrigger className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between text-left touch-manipulation min-h-[44px]">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {showDerivation ? 'Hide calculation derivation' : 'Show calculation derivation'}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white/55 transition-transform duration-200',
                  showDerivation && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="space-y-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  BS 7671 calculation steps
                </span>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-mono flex-shrink-0 bg-white/[0.04] text-white/85">
                        1
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Design Current (Ib)</h4>
                        <p className="text-sm text-white mt-1">
                          Load current:{' '}
                          <span
                            className="font-mono font-bold"
                            style={{ color: config.gradientFrom }}
                          >
                            {inputs.current}A
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-mono flex-shrink-0 bg-white/[0.04] text-white/85">
                        2
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Correction Factors</h4>
                        <p className="text-xs text-white mb-2">BS 7671 Appendix 4</p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Ca (Temp):</span>
                            <span className="text-white font-mono whitespace-nowrap">
                              {Ca.toFixed(3)}{' '}
                              <span className="text-white text-xs hidden sm:inline">4B1</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Cg (Group):</span>
                            <span className="text-white font-mono whitespace-nowrap">
                              {Cg.toFixed(3)}{' '}
                              <span className="text-white text-xs hidden sm:inline">4C1</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Ci (Install):</span>
                            <span className="text-white font-mono whitespace-nowrap">
                              {Ci.toFixed(3)}
                            </span>
                          </div>
                          {Cs !== 1.0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white whitespace-nowrap">Cs (Soil):</span>
                              <span className="text-white font-mono whitespace-nowrap">
                                {Cs.toFixed(3)}{' '}
                                <span className="text-white text-xs hidden sm:inline">4B3</span>
                              </span>
                            </div>
                          )}
                          {Cd !== 1.0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white whitespace-nowrap">Cd (Depth):</span>
                              <span className="text-white font-mono whitespace-nowrap">
                                {Cd.toFixed(3)}{' '}
                                <span className="text-white text-xs hidden sm:inline">4B4</span>
                              </span>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2 pt-2 mt-2 border-t border-white/[0.06]">
                            <span className="text-white font-medium whitespace-nowrap">
                              Overall:
                            </span>
                            <span className="font-mono text-white">
                              {totalDerating.toFixed(3)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-mono flex-shrink-0 bg-white/[0.04] text-white/85">
                        3
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">
                          Required Tabulated Current (It)
                        </h4>
                        <p className="text-sm text-white mt-1">
                          It ≥ Ib ÷ (Ca × Cg × Ci{Cs !== 1.0 ? ' × Cs' : ''}
                          {Cd !== 1.0 ? ' × Cd' : ''})
                        </p>
                        <p className="text-sm text-white mt-1">
                          It ≥ {inputs.current}A ÷ {totalDerating.toFixed(3)} ={' '}
                          <span className="font-mono text-white">
                            {(parseFloat(inputs.current) / totalDerating).toFixed(1)}A
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-mono flex-shrink-0 bg-white/[0.04] text-white/85">
                        4
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Cable Selection</h4>
                        <p className="text-xs text-white mb-1">{recommendedCable.tableReference}</p>
                        <p className="text-sm text-white">
                          Selected <span className="font-medium">{recommendedCable.sizeLabel}</span>{' '}
                          with It ={' '}
                          <span className="font-mono">{recommendedCable.tabulatedCapacity}A</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-mono flex-shrink-0 bg-white/[0.04] text-white/85">
                        5
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Voltage Drop</h4>
                        <p className="text-xs text-white mb-1">
                          Table{' '}
                          {recommendedCable.tableReference.replace('4D', '4D').replace('A', 'B')}
                        </p>
                        <p className="text-sm text-white">
                          ΔV = {recommendedCable.voltageDropMvAm} mV/A/m × {inputs.current}A ×{' '}
                          {inputs.length}m ÷ 1000
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-mono text-white">
                            = {recommendedCable.calculatedVoltageDrop}V
                          </span>
                          <span className="text-white/55 ml-1">
                            ({recommendedCable.voltageDropPercent}%)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Protective Device Check */}
          <ProtectiveDeviceSection
            designCurrent={designCurrent}
            effectiveCapacity={recommendedCable.deratedCapacity}
            nextCableSizeUp={nextCableSizeUp}
          />
        </>
      )}

      {errors.general && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Error
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">{errors.general}</p>
        </div>
      )}
    </div>
  );
};

export default CableSizingResult;
