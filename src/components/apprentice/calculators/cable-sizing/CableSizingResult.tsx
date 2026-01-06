import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ChevronDown, ChevronUp, CheckCircle2, Cable, Calculator } from "lucide-react";
import { CableSizingInputs, DeratingFactors, BS7671CableOption } from "./useCableSizing";
import { RequiredFieldTooltip } from "@/components/ui/required-field-tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import ProtectiveDeviceSection from "./ProtectiveDeviceSection";

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
      'A': 'Enclosed in insulation',
      'A1': 'Conduit in masonry',
      'A2': 'Conduit on surface',
      'B1': 'Trunking on surface',
      'B2': 'Trunking flush in wall',
      'C': 'Clipped direct to surface',
      'D1': 'Buried direct in ground',
      'D2': 'In buried ducts',
      'E': 'On perforated tray/ladder',
      'F': 'Single-core on tray',
      'G': 'Free air, spaced',
      '100': 'Above ceiling, insulation ≤100mm',
      '101': 'Above ceiling, insulation >100mm',
      '102': 'Stud wall, touching insulation',
      '103': 'Stud wall, not touching'
    };
    return methodDescriptions[referenceMethod] || referenceMethod;
  };

  const getCableTypeDisplay = (cableType: string) => {
    const typeMap: Record<string, string> = {
      'pvc-single': 'PVC Single-core 70°C',
      'xlpe-single': 'XLPE Single-core 90°C',
      'pvc-twin-earth': 'Flat Twin & Earth 70°C',
      'xlpe-twin-earth': 'XLPE Twin & Earth 90°C',
      'swa': 'SWA Multicore',
      'swa-single-core': 'SWA Single-core',
      'micc': 'MI Cable',
      'aluminium-xlpe': 'Aluminium XLPE'
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
          <p className="text-white">
            Enter the circuit specifications and click "Calculate Cable Size" to get results
          </p>
        </div>
      ) : (
        <>
          {/* Recommended Cable */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-6 w-6 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-elec-yellow">Recommended Cable</h3>
            </div>

            {/* Cable Size - Centered, Prominent */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-elec-yellow">
                  {recommendedCable.size}
                </span>
                <span className="text-3xl md:text-4xl text-elec-yellow/80">mm²</span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-white">
                  {getCableTypeDisplay(inputs.cableType)}
                </p>
                <p className="text-sm text-white">
                  {recommendedCable.tableReference} — {getInstallationMethodDisplay(deratingFactors?.referenceMethod || 'C')}
                </p>
              </div>
            </div>

            {/* Capacity Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-elec-yellow/20">
                <span className="text-sm text-white flex items-center gap-1">
                  Tabulated Capacity (It)
                  <RequiredFieldTooltip 
                    content="Current-carrying capacity from BS 7671 Appendix 4 tables at reference conditions"
                  />
                </span>
                <span className="text-2xl font-bold text-elec-yellow">
                  {recommendedCable.tabulatedCapacity}A
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-elec-yellow/20">
                <span className="text-sm text-white flex items-center gap-1">
                  Effective Capacity
                  <RequiredFieldTooltip 
                    content="It × Ca × Cg × Ci — the current-carrying capacity adjusted for installation conditions"
                  />
                </span>
                <span className="text-2xl font-bold text-elec-yellow">
                  {recommendedCable.deratedCapacity}A
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-white flex items-center gap-1">
                  Voltage Drop
                  <RequiredFieldTooltip 
                    content="Voltage drop must not exceed 3% for lighting or 5% for other circuits per BS 7671"
                  />
                </span>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {recommendedCable.calculatedVoltageDrop}V
                  </div>
                  <div className={`text-sm font-medium ${
                    recommendedCable.voltageDropPercent <= 3 ? 'text-green-400' : 
                    recommendedCable.voltageDropPercent <= 5 ? 'text-amber-400' : 
                    'text-red-400'
                  }`}>
                    ({recommendedCable.voltageDropPercent}%)
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Alternative Options */}
          {alternativeCables.length > 0 && (
            <div className="mt-8 pt-8 border-t border-elec-yellow/30">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Cable className="h-5 w-5" />
                Alternative Options
              </h3>
              <div className="space-y-3">
                {alternativeCables.map((cable, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors bg-white/10"
                  >
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-bold text-white">{cable.size}</span>
                      <span className="text-lg text-white">mm²</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Tabulated:</span>
                        <span className="font-bold text-white">{cable.tabulatedCapacity}A</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Effective:</span>
                        <span className="font-bold text-white">{cable.deratedCapacity}A</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Voltage Drop:</span>
                        <span className={`font-bold ${
                          cable.voltageDropPercent <= 3 ? 'text-green-400' : 
                          cable.voltageDropPercent <= 5 ? 'text-amber-400' : 
                          'text-red-400'
                        }`}>
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
            <CollapsibleTrigger className="w-full flex items-center justify-center gap-2 p-4 text-sm text-elec-yellow/70 hover:text-elec-yellow transition-all bg-white/5 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-white/5">
              {showDerivation ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Hide calculation derivation
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show calculation derivation
                </>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5 text-elec-yellow" />
                  <h4 className="text-lg font-semibold text-elec-yellow">BS 7671 Calculation Steps</h4>
                </div>

                <div className="space-y-3">
                  {/* Step 1 */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex-shrink-0">1</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Design Current (Ib)</h4>
                        <p className="text-sm text-white mt-1">
                          Load current: <span className="text-elec-yellow font-mono font-bold">{inputs.current}A</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex-shrink-0">2</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Correction Factors</h4>
                        <p className="text-xs text-white/70 mb-2">BS 7671 Appendix 4</p>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Ca (Temp):</span>
                            <span className="text-white font-mono whitespace-nowrap">{Ca.toFixed(3)} <span className="text-white/60 text-xs hidden sm:inline">4B1</span></span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Cg (Group):</span>
                            <span className="text-white font-mono whitespace-nowrap">{Cg.toFixed(3)} <span className="text-white/60 text-xs hidden sm:inline">4C1</span></span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-white whitespace-nowrap">Ci (Install):</span>
                            <span className="text-white font-mono whitespace-nowrap">{Ci.toFixed(3)}</span>
                          </div>
                          {Cs !== 1.0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white whitespace-nowrap">Cs (Soil):</span>
                              <span className="text-white font-mono whitespace-nowrap">{Cs.toFixed(3)} <span className="text-white/60 text-xs hidden sm:inline">4B3</span></span>
                            </div>
                          )}
                          {Cd !== 1.0 && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-white whitespace-nowrap">Cd (Depth):</span>
                              <span className="text-white font-mono whitespace-nowrap">{Cd.toFixed(3)} <span className="text-white/60 text-xs hidden sm:inline">4B4</span></span>
                            </div>
                          )}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-elec-yellow/10 mt-2">
                            <span className="text-white font-medium whitespace-nowrap">Overall:</span>
                            <span className="text-elec-yellow font-mono font-bold">{totalDerating.toFixed(3)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex-shrink-0">3</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Required Tabulated Current (It)</h4>
                        <p className="text-sm text-white/80 mt-1">
                          It ≥ Ib ÷ (Ca × Cg × Ci{Cs !== 1.0 ? ' × Cs' : ''}{Cd !== 1.0 ? ' × Cd' : ''})
                        </p>
                        <p className="text-sm text-white mt-1">
                          It ≥ {inputs.current}A ÷ {totalDerating.toFixed(3)} = <span className="text-elec-yellow font-mono font-bold">{(parseFloat(inputs.current) / totalDerating).toFixed(1)}A</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex-shrink-0">4</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Cable Selection</h4>
                        <p className="text-xs text-white/70 mb-1">{recommendedCable.tableReference}</p>
                        <p className="text-sm text-white">
                          Selected <span className="text-elec-yellow font-medium">{recommendedCable.sizeLabel}</span> with It = <span className="font-mono font-bold">{recommendedCable.tabulatedCapacity}A</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 5 */}
                  <div className="p-4 bg-white/10 rounded-lg">
                    <div className="flex items-start gap-3 text-left">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-elec-yellow/20 text-elec-yellow text-sm font-bold flex-shrink-0">5</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-base">Voltage Drop</h4>
                        <p className="text-xs text-white/70 mb-1">Table {recommendedCable.tableReference.replace('4D', '4D').replace('A', 'B')}</p>
                        <p className="text-sm text-white">
                          ΔV = {recommendedCable.voltageDropMvAm} mV/A/m × {inputs.current}A × {inputs.length}m ÷ 1000
                        </p>
                        <p className="text-sm mt-1">
                          <span className={`font-mono font-bold ${recommendedCable.meetsVoltageDrop ? 'text-green-400' : 'text-red-400'}`}>
                            = {recommendedCable.calculatedVoltageDrop}V
                          </span>
                          <span className="text-white/70 ml-1">({recommendedCable.voltageDropPercent}%)</span>
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
        <Alert className="bg-amber-900/30 border-amber-500/50">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-100">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CableSizingResult;
