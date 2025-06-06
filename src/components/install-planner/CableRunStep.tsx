
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstallPlanData } from "./types";
import { Cable, Route, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";

interface CableRunStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const CableRunStep = ({ planData, updatePlanData }: CableRunStepProps) => {
  const isMobile = useIsMobile();
  
  const installationMethods = [
    { value: "clipped-direct", label: "Clipped Direct", description: "Cable clipped direct to surface" },
    { value: "conduit-surface", label: "Surface Conduit", description: "In conduit on surface" },
    { value: "conduit-embedded", label: "Embedded Conduit", description: "In conduit in masonry" },
    { value: "trunking", label: "Trunking", description: "In cable trunking system" },
    { value: "ducting", label: "Ducting", description: "In cable ducting underground" },
    { value: "direct-buried", label: "Direct Buried", description: "Cable buried direct in ground" },
    { value: "overhead", label: "Overhead", description: "Overhead line installation" }
  ];

  const cableTypes = [
    { value: "pvc-pvc", label: "PVC/PVC", description: "70°C PVC insulated and sheathed" },
    { value: "xlpe-pvc", label: "XLPE/PVC", description: "90°C XLPE insulated, PVC sheathed" },
    { value: "xlpe-lsoh", label: "XLPE/LSOH", description: "90°C XLPE insulated, LSOH sheathed" },
    { value: "swa", label: "SWA", description: "Steel wire armoured cable" },
    { value: "mineral", label: "Mineral", description: "Mineral insulated cable" },
    { value: "singles", label: "Singles", description: "Single core cables in conduit/trunking" }
  ];

  const getVoltageDropGuidance = () => {
    const maxVoltageDropPercentage = planData.loadType === "lighting" ? 3 : 5;
    const maxVoltageDropVolts = (planData.voltage * maxVoltageDropPercentage) / 100;
    
    return {
      percentage: maxVoltageDropPercentage,
      volts: maxVoltageDropVolts.toFixed(1)
    };
  };

  const voltageDropGuidance = getVoltageDropGuidance();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold">Cable Run Details</h2>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Specify the cable route and installation method to determine appropriate cable sizing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="space-y-6">
          {/* Cable Length Input - Enhanced mobile layout */}
          <div className="space-y-3">
            <Label htmlFor="cableLength" className="text-base font-medium">
              Cable Length (m)
            </Label>
            <Input
              id="cableLength"
              type="number"
              inputMode="decimal"
              value={planData.cableLength || ""}
              onChange={(e) => updatePlanData({ cableLength: parseFloat(e.target.value) || 0 })}
              placeholder="Enter cable length in metres"
              className="bg-elec-dark border-elec-yellow/20 h-11 sm:h-10 text-base sm:text-sm"
            />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Measure the actual cable route distance, including any vertical runs
            </p>
          </div>

          {/* Installation Method - Mobile optimized cards */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Installation Method</Label>
            <div className="grid gap-2 sm:gap-3">
              {installationMethods.map((method) => (
                <Card
                  key={method.value}
                  className={`cursor-pointer border transition-all touch-manipulation ${
                    planData.installationMethod === method.value
                      ? 'border-elec-yellow bg-elec-yellow/10 ring-1 ring-elec-yellow/20'
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40 active:border-elec-yellow/60'
                  }`}
                  onClick={() => updatePlanData({ installationMethod: method.value })}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Route className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base leading-tight">{method.label}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                          {method.description}
                        </p>
                      </div>
                      {planData.installationMethod === method.value && (
                        <div className="w-2 h-2 rounded-full bg-elec-yellow flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cable Type - Mobile optimized cards */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Cable Type</Label>
            <div className="grid gap-2 sm:gap-3">
              {cableTypes.map((cable) => (
                <Card
                  key={cable.value}
                  className={`cursor-pointer border transition-all touch-manipulation ${
                    planData.cableType === cable.value
                      ? 'border-elec-yellow bg-elec-yellow/10 ring-1 ring-elec-yellow/20'
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40 active:border-elec-yellow/60'
                  }`}
                  onClick={() => updatePlanData({ cableType: cable.value })}
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start gap-3">
                      <Cable className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium text-sm sm:text-base leading-tight">{cable.label}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                          {cable.description}
                        </p>
                      </div>
                      {planData.cableType === cable.value && (
                        <div className="w-2 h-2 rounded-full bg-elec-yellow flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Voltage Drop Alert - Enhanced mobile layout */}
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300 flex-shrink-0" />
            <AlertDescription className="text-blue-200 text-sm sm:text-base leading-relaxed">
              <strong>Voltage Drop Limits:</strong><br />
              Maximum {voltageDropGuidance.percentage}% ({voltageDropGuidance.volts}V) for {planData.loadType} circuits.
              Longer cable runs may require larger cable sizes.
            </AlertDescription>
          </Alert>

          {/* Installation Notes - Enhanced mobile layout */}
          {planData.cableLength > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-amber-300 text-sm sm:text-base flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Installation Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-xs sm:text-sm text-amber-200 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Cable length: {planData.cableLength}m</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Consider cable supports every 300-600mm for horizontal runs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Allow for thermal expansion on long runs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 flex-shrink-0">•</span>
                    <span>Ensure adequate protection against mechanical damage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CableRunStep;
