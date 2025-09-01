
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
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
      'armored': 'Method D (Direct Burial)'
    };
    return methodMap[installationType] || installationType.toUpperCase();
  };

  const getBaseCapacityTooltip = (cable: CableSizeOption, installationType: string) => {
    return `This is the tabulated current-carrying capacity (It) for ${cable.size} ${cable.cableType} cable using ${getInstallationMethodDisplay(installationType)} at 30°C ambient temperature with no grouping factors. This value comes from BS 7671 Appendix 4.`;
  };
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
        <div className="space-y-6">
          <div>
            <h3 className="text-elec-yellow text-lg font-medium mb-3">Recommended Cable Size</h3>
            <div className="bg-elec-gray/30 rounded-md p-4 border border-elec-yellow/20">
              <div className="text-3xl font-bold text-elec-yellow mb-2">{recommendedCable.size}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Installation: </span>
                  <span className="font-medium">{getInstallationMethodDisplay(inputs.installationType)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Base Capacity: </span>
                  <span className="font-medium">{recommendedCable.currentRating[inputs.installationType]}A</span>
                  <RequiredFieldTooltip content={getBaseCapacityTooltip(recommendedCable, inputs.installationType)} />
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Voltage drop: </span>
                  <span className="font-medium">
                    {(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V 
                    ({((recommendedCable.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
              
              <Collapsible open={showDerivation} onOpenChange={setShowDerivation} className="mt-3">
                <CollapsibleTrigger className="flex items-center gap-2 text-xs text-elec-yellow/70 hover:text-elec-yellow transition-colors">
                  {showDerivation ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  Show calculation derivation
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 p-3 bg-elec-gray/20 rounded border border-elec-yellow/10">
                  <div className="space-y-2 text-xs">
                    <div className="font-medium text-elec-yellow">Source Data:</div>
                    <div className="text-muted-foreground">
                      • Cable: {recommendedCable.size} {recommendedCable.cableType}<br/>
                      • Method: {getInstallationMethodDisplay(inputs.installationType)}<br/>
                      • Tabulated It: {recommendedCable.currentRating[inputs.installationType]}A (BS 7671 Appendix 4)
                    </div>
                    <div className="font-medium text-elec-yellow mt-3">Effective Current Rating (Iz):</div>
                    <div className="text-muted-foreground">
                      Iz = It × Ca × Cg × Ci × Cc<br/>
                      Where: Ca=1.0 (30°C), Cg=1.0 (no grouping), Ci=1.0 (no derating), Cc=1.0 (no correction)<br/>
                      Iz = {recommendedCable.currentRating[inputs.installationType]} × 1.0 = {recommendedCable.currentRating[inputs.installationType]}A
                    </div>
                    <div className="font-medium text-elec-yellow mt-3">Compliance Check:</div>
                    <div className="text-muted-foreground">
                      • Design current (Ib): {inputs.current}A<br/>
                      • Applied derating factors: Ca=1.0, Cg=1.0, Ci=1.0, Cc=1.0<br/>
                      • Condition: Ib ≤ Iz ({inputs.current}A ≤ {recommendedCable.currentRating[inputs.installationType]}A) ✓
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
          
          {alternativeCables.length > 0 && (
            <div>
              <h3 className="text-elec-yellow text-sm font-medium mb-2">Alternative Options</h3>
              <div className="space-y-2">
                {alternativeCables.map((cable, index) => (
                  <div key={index} className="bg-elec-gray/30 rounded-md p-3 border border-elec-yellow/10 text-sm">
                    <div className="font-medium">{cable.size}</div>
                    <div className="text-muted-foreground text-xs">
                      Rating: {cable.currentRating[inputs.installationType]}A | 
                      V-Drop: {(cable.calculatedVoltageDrop || 0).toFixed(1)}V
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
