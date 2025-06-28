
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { CableSizingInputs } from "./useCableSizing";
import { CableSizeOption } from "./cableSizeData";
import EmptyState from "./EmptyState";

interface CableSizingResultProps {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: {
    general?: string;
  } | null;
  inputs: CableSizingInputs;
}

const CableSizingResult = ({
  recommendedCable,
  alternativeCables,
  errors,
  inputs,
}: CableSizingResultProps) => {
  return (
    <div className="flex-grow flex flex-col">
      {errors?.general && (
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
                  <span className="text-muted-foreground">Insulation: </span>
                  <span className="font-medium">{inputs.installationType.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rating: </span>
                  <span className="font-medium">{recommendedCable.currentRating[inputs.installationType]}A</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Voltage drop: </span>
                  <span className="font-medium">
                    {(recommendedCable.calculatedVoltageDrop || 0).toFixed(2)}V 
                    ({((recommendedCable.calculatedVoltageDrop || 0) / parseFloat(inputs.voltage) * 100).toFixed(2)}%)
                  </span>
                </div>
              </div>
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
