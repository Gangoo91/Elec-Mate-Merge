
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ChevronDown, ChevronUp, CheckCircle2, Cable, Calculator } from "lucide-react";
import { CableSizingInputs, DeratingFactors } from "./useCableSizing";
import { CableSizeOption } from "./cableSizeData";
import { RequiredFieldTooltip } from "@/components/ui/required-field-tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface CableSizingResultProps {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: {
    general?: string;
  };
  inputs: CableSizingInputs;
  deratingFactors?: DeratingFactors;
}

const CableSizingResult = ({
  recommendedCable,
  alternativeCables,
  errors,
  inputs,
  deratingFactors,
}: CableSizingResultProps) => {
  const [showDerivation, setShowDerivation] = useState(false);

  const getInstallationMethodDisplay = (installationType: string) => {
    const methodMap: Record<string, string> = {
      'pvc': 'Method C (Clipped Direct)',
      'xlpe': 'Method E (In Conduit/Trunking)',
      'swa': 'Method D (Direct Burial)',
      'lsf': 'Method C (Clipped Direct)',
      'armored': 'Method D (Direct Burial)',
      'clipped-direct': 'Method C (Clipped Direct)',
      'in-conduit': 'Method B (In Conduit/Trunking)',
      'buried-direct': 'Method D (Direct Burial)',
      'cable-tray': 'Method F (On Cable Tray)',
      'free-air': 'Method E (Free Air)'
    };
    return methodMap[installationType] || installationType.toUpperCase();
  };

  const getCableTypeDisplay = (cableType: string) => {
    const typeMap: Record<string, string> = {
      'pvc-70': 'PVC 70°C Cable',
      'xlpe-90': 'XLPE 90°C Cable',
      'lsf-70': 'LSF 70°C Cable',
      'mineral-70': 'MI Cable 70°C',
      'pvc': 'PVC Cable',
      'xlpe': 'XLPE Cable',
      'swa': 'SWA Cable'
    };
    return typeMap[cableType] || cableType.toUpperCase();
  };

  const getBaseCapacityTooltip = (cable: CableSizeOption, installationType: string) => {
    return `This is the tabulated current-carrying capacity (It) for ${cable.size} cable using ${getInstallationMethodDisplay(installationType)} at 30°C ambient temperature with no grouping factors. This value comes from BS 7671 Appendix 4.`;
  };

  // Use actual derating factors if available, otherwise fall back to simple calculation
  const Ca = deratingFactors?.Ca ?? (parseFloat(inputs.ambientTemp || '30') === 30 ? 1.0 : 0.94);
  const Cg = deratingFactors?.Cg ?? (parseInt(inputs.cableGrouping || '1') === 1 ? 1.0 : 0.8);
  const Ci = deratingFactors?.Ci ?? 1.0;
  const Cs = deratingFactors?.Cs ?? 1.0;
  const Cd = deratingFactors?.Cd ?? 1.0;
  const totalDerating = deratingFactors?.total ?? (Ca * Cg * Ci);

  const voltageDropPercent = ((recommendedCable?.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage || '230')) * 100;

  return (
    <div className="space-y-6">
      {!recommendedCable ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Enter the circuit specifications and click "Calculate Cable Size" to get results
          </p>
        </div>
      ) : (
        <>
          {/* Recommended Cable - Streamlined without nested cards */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="h-6 w-6 text-elec-yellow" />
              <h3 className="text-xl font-semibold text-elec-yellow">Recommended Cable</h3>
            </div>

            {/* Cable Size - Centered, Prominent */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-elec-yellow">
                  {recommendedCable.size.replace('mm²', '').replace('mm2', '')}
                </span>
                <span className="text-3xl md:text-4xl text-elec-yellow/80">mm²</span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-white">
                  {getCableTypeDisplay(inputs.cableType)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getInstallationMethodDisplay(inputs.installationType)}
                </p>
              </div>
            </div>

            {/* Simplified Capacity Info - No nested boxes */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between py-3 border-b border-elec-yellow/20">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Base Capacity
                  <RequiredFieldTooltip 
                    content={getBaseCapacityTooltip(recommendedCable, inputs.installationType)}
                  />
                </span>
                <span className="text-2xl font-bold text-elec-yellow">
                  {recommendedCable.currentRating[inputs.installationType]}A
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-elec-yellow/20">
                <span className="text-sm text-muted-foreground">Derated Capacity</span>
                <span className="text-2xl font-bold text-elec-yellow">
                  {Math.round(recommendedCable.currentRating[inputs.installationType] * derating.temperature * derating.grouping)}A
                </span>
              </div>
              
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  Voltage Drop
                  <RequiredFieldTooltip 
                    content="Voltage drop must not exceed 3% for lighting or 5% for other circuits per BS 7671 regulations."
                  />
                </span>
                <div className="text-right">
                  <div className="text-xl font-bold text-white">
                    {(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V
                  </div>
                  <div className={`text-sm font-medium ${
                    voltageDropPercent <= 3 ? 'text-green-400' : 
                    voltageDropPercent <= 5 ? 'text-amber-400' : 
                    'text-red-400'
                  }`}>
                    ({voltageDropPercent.toFixed(2)}% of 230V)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Options - No Card wrapper */}
          {alternativeCables.length > 0 && (
            <div className="mt-8 pt-8 border-t border-elec-yellow/30">
              <h3 className="text-lg font-semibold text-elec-yellow mb-4 flex items-center gap-2">
                <Cable className="h-5 w-5" />
                Alternative Options
              </h3>
              <div className="space-y-3">
                {alternativeCables.map((cable, index) => {
                  const altDerating = inputs.ambientTemp ? (parseFloat(inputs.ambientTemp) - 30) * 0.01 : 0;
                  const altVoltageDropPercent = ((cable.calculatedVoltageDrop || 0) / 230) * 100;
                  
                  return (
                    <div 
                      key={index} 
                      className="p-4 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors bg-elec-dark/20"
                    >
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-white">
                          {cable.size.replace('mm²', '').replace('mm2', '')}
                        </span>
                        <span className="text-lg text-muted-foreground">mm²</span>
                        <span className="text-sm text-muted-foreground ml-auto">
                          {getCableTypeDisplay(inputs.cableType)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Base Capacity:</span>
                          <span className="font-bold text-white">
                            {cable.currentRating[inputs.installationType]}A
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Derated:</span>
                          <span className="font-bold text-white">
                            {Math.round(cable.currentRating[inputs.installationType] * derating.temperature * derating.grouping)}A
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Voltage Drop:</span>
                          <span className={`font-bold ${
                            altVoltageDropPercent <= 3 ? 'text-green-400' : 
                            altVoltageDropPercent <= 5 ? 'text-amber-400' : 
                            'text-red-400'
                          }`}>
                            {(cable.calculatedVoltageDrop || 0).toFixed(1)}V ({altVoltageDropPercent.toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Show Calculation Derivation - Streamlined */}
          <Collapsible open={showDerivation} onOpenChange={setShowDerivation} className="mt-6">
            <CollapsibleTrigger className="w-full flex items-center justify-center gap-2 p-4 text-sm text-elec-yellow/70 hover:text-elec-yellow transition-all bg-elec-gray/20 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-gray/40">
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
                  <h4 className="text-lg font-semibold text-elec-yellow">Calculation Steps</h4>
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">1</span>
                      Design Current (Ib)
                    </h4>
                    <p className="text-sm text-muted-foreground">Load current: <span className="text-white font-mono font-bold">{inputs.current}A</span></p>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">2</span>
                      Derating Factors
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Temperature factor (Ca): <span className="text-white font-mono">{derating.temperature.toFixed(3)}</span></p>
                      <p>Grouping factor (Cg): <span className="text-white font-mono">{derating.grouping.toFixed(3)}</span></p>
                      <p className="pt-2 border-t border-elec-yellow/10 mt-2">
                        Overall factor: <span className="text-white font-mono font-bold">{(derating.temperature * derating.grouping).toFixed(3)}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">3</span>
                      Required Tabulated Current (It)
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      It = Ib ÷ (Ca × Cg)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      It = {inputs.current}A ÷ {(derating.temperature * derating.grouping).toFixed(3)} = 
                      <span className="text-elec-yellow font-mono font-bold ml-1">
                        {(parseFloat(inputs.current) / (derating.temperature * derating.grouping)).toFixed(1)}A
                      </span>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">4</span>
                      Cable Selection
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Selected <span className="text-elec-yellow font-medium text-base">{recommendedCable.size}</span> with 
                      tabulated capacity of <span className="text-white font-mono font-bold">{recommendedCable.currentRating[inputs.installationType]}A</span>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">5</span>
                      Voltage Drop Verification
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Calculated: <span className="text-white font-mono font-bold">{(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V</span>
                      <span className="text-muted-foreground"> ({voltageDropPercent.toFixed(2)}%)</span>
                      {voltageDropPercent <= parseFloat(inputs.voltageDrop || '3') ? (
                        <span className="text-green-400 ml-2 font-medium">✓ Within limit</span>
                      ) : (
                        <span className="text-red-400 ml-2 font-medium">✗ Exceeds limit</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
