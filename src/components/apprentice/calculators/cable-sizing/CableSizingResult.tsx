
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ChevronDown, ChevronUp, HelpCircle, CheckCircle2, Cable, Calculator } from "lucide-react";
import { CableSizingInputs } from "./useCableSizing";
import { CableSizeOption } from "./cableSizeData";
import EmptyState from "./EmptyState";
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
}

const CableSizingResult = ({
  recommendedCable,
  alternativeCables,
  errors,
  inputs,
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

  const derating = {
    temperature: parseFloat(inputs.ambientTemp || '30') === 30 ? 1.0 : 0.94,
    grouping: parseInt(inputs.cableGrouping || '1') === 1 ? 1.0 : 0.8
  };

  const voltageDropPercent = ((recommendedCable?.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage || '230')) * 100;
  return (
    <div className="flex-grow flex flex-col">
      {errors.general && (
        <Alert className="mb-4 bg-amber-900/30 border-amber-500/50">
          <Info className="h-4 w-4 text-amber-500" />
          <AlertDescription className="text-amber-100">
            {errors.general}
          </AlertDescription>
        </Alert>
      )}
      
      {recommendedCable ? (
        <div className="space-y-6 animate-fade-in">
          {/* Recommended Cable Card - Enhanced */}
          <Card className="border-elec-yellow/40 bg-gradient-to-br from-elec-yellow/10 via-elec-gray to-elec-gray shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-elec-yellow">
                <CheckCircle2 className="h-5 w-5" />
                Recommended Cable
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Cable Size - Prominent Display with proper mm² */}
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl md:text-6xl font-bold text-elec-yellow">
                  {recommendedCable.size.replace('mm²', '').replace('mm2', '')}
                </span>
                <span className="text-2xl md:text-3xl text-elec-yellow/80">mm²</span>
              </div>

              {/* Cable Type & Installation */}
              <div className="mb-6">
                <p className="text-base font-medium text-white mb-1">
                  {getCableTypeDisplay(inputs.cableType)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {getInstallationMethodDisplay(inputs.installationType)}
                </p>
              </div>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      Base Capacity
                      <RequiredFieldTooltip content={getBaseCapacityTooltip(recommendedCable, inputs.installationType)} />
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {recommendedCable.currentRating[inputs.installationType]}A
                  </div>
                </div>

                <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                  <div className="text-xs text-muted-foreground mb-1">Derated Capacity</div>
                  <div className="text-2xl font-bold text-white">
                    {Math.round(recommendedCable.currentRating[inputs.installationType] * derating.temperature * derating.grouping)}A
                  </div>
                </div>
              </div>

              {/* Voltage Drop - Visual Indicator */}
              <div className="p-4 bg-elec-dark/30 rounded-lg border border-elec-yellow/20">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Voltage Drop:</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">
                      {(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V
                    </div>
                    <div className={`text-sm font-medium ${
                      voltageDropPercent <= 3 
                        ? 'text-green-400' 
                        : voltageDropPercent <= 5 
                        ? 'text-amber-400' 
                        : 'text-red-400'
                    }`}>
                      ({voltageDropPercent.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Alternative Cable Options - Enhanced */}
          {alternativeCables.length > 0 && (
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2 text-elec-yellow">
                  <Cable className="h-4 w-4" />
                  Alternative Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {alternativeCables.map((cable, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-elec-dark/20 rounded-lg border border-elec-yellow/20 hover:border-elec-yellow/40 transition-colors"
                    >
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-2xl font-bold text-white">
                          {cable.size.replace('mm²', '').replace('mm2', '')}
                        </span>
                        <span className="text-sm text-muted-foreground">mm²</span>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Capacity:</span>
                          <span className="font-medium text-white">
                            {cable.currentRating[inputs.installationType]}A
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">V-Drop:</span>
                          <span className="font-medium text-white">
                            {(cable.calculatedVoltageDrop || 0).toFixed(1)}V
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">V-Drop %:</span>
                          <span className={`font-medium ${
                            ((cable.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage || '230') * 100) <= 3
                              ? 'text-green-400'
                              : 'text-amber-400'
                          }`}>
                            {((cable.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage || '230') * 100).toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Show Calculation Derivation - Enhanced Collapsible */}
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
              <Card className="border-elec-yellow/20 bg-elec-gray/50">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-elec-yellow" />
                    Calculation Steps
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">1</span>
                      Design Current (Ib)
                    </h4>
                    <p className="text-muted-foreground">Load current: <span className="text-white font-mono font-bold">{inputs.current}A</span></p>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">2</span>
                      Derating Factors
                    </h4>
                    <div className="space-y-1 text-muted-foreground">
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
                    <p className="text-muted-foreground mb-2">
                      It = Ib ÷ (Ca × Cg)
                    </p>
                    <p className="text-muted-foreground">
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
                    <p className="text-muted-foreground">
                      Selected <span className="text-elec-yellow font-medium text-base">{recommendedCable.size}</span> with 
                      tabulated capacity of <span className="text-white font-mono font-bold">{recommendedCable.currentRating[inputs.installationType]}A</span>
                    </p>
                  </div>
                  
                  <div className="p-4 bg-elec-dark/30 rounded-lg">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow text-xs">5</span>
                      Voltage Drop Verification
                    </h4>
                    <p className="text-muted-foreground">
                      Calculated: <span className="text-white font-mono font-bold">{(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V</span>
                      <span className="text-muted-foreground"> ({voltageDropPercent.toFixed(2)}%)</span>
                      {voltageDropPercent <= parseFloat(inputs.voltageDrop || '3') ? (
                        <span className="text-green-400 ml-2 font-medium">✓ Within limit</span>
                      ) : (
                        <span className="text-red-400 ml-2 font-medium">✗ Exceeds limit</span>
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ) : alternativeCables.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-red-400 text-lg font-medium">Voltage Drop Too High</h3>
          <p className="text-sm text-muted-foreground">
            Even the largest available cable cannot meet the voltage drop requirements for this length and current.
          </p>
          <div>
            <h4 className="text-elec-yellow text-sm font-medium mb-2">Best Option (with high voltage drop)</h4>
            <div className="bg-elec-gray/30 rounded-md p-3 border border-red-500/20">
              <div className="font-medium">{alternativeCables[0].size}</div>
              <div className="text-muted-foreground text-xs">
                Rating: {alternativeCables[0].currentRating[inputs.installationType]}A<br/>
                Voltage Drop: {(alternativeCables[0].calculatedVoltageDrop || 0).toFixed(1)}V 
                ({((alternativeCables[0].calculatedVoltageDrop || 0) / parseFloat(inputs.voltage) * 100).toFixed(1)}%)
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Consider using parallel cables, a higher voltage system, or a different route with shorter cable length.
            </p>
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default CableSizingResult;
