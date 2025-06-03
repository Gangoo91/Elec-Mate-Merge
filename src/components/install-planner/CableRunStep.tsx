
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallPlanData } from "./types";
import { Cable, Route, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CableRunStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const CableRunStep = ({ planData, updatePlanData }: CableRunStepProps) => {
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
      <div>
        <h2 className="text-2xl font-bold mb-2">Cable Run Details</h2>
        <p className="text-muted-foreground mb-6">
          Specify the cable route and installation method to determine appropriate cable sizing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="cableLength" className="text-base font-medium">Cable Length (m)</Label>
            <Input
              id="cableLength"
              type="number"
              value={planData.cableLength || ""}
              onChange={(e) => updatePlanData({ cableLength: parseFloat(e.target.value) || 0 })}
              placeholder="Enter cable length in meters"
              className="bg-elec-dark border-elec-yellow/20 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Measure the actual cable route distance, including any vertical runs
            </p>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Installation Method</Label>
            <div className="grid gap-2">
              {installationMethods.map((method) => (
                <Card
                  key={method.value}
                  className={`cursor-pointer border transition-all ${
                    planData.installationMethod === method.value
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                  }`}
                  onClick={() => updatePlanData({ installationMethod: method.value })}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Route className="h-4 w-4 text-elec-yellow" />
                      <div>
                        <h4 className="font-medium text-sm">{method.label}</h4>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-3 block">Cable Type</Label>
            <div className="grid gap-2">
              {cableTypes.map((cable) => (
                <Card
                  key={cable.value}
                  className={`cursor-pointer border transition-all ${
                    planData.cableType === cable.value
                      ? 'border-elec-yellow bg-elec-yellow/10'
                      : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                  }`}
                  onClick={() => updatePlanData({ cableType: cable.value })}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2">
                      <Cable className="h-4 w-4 text-elec-yellow" />
                      <div>
                        <h4 className="font-medium text-sm">{cable.label}</h4>
                        <p className="text-xs text-muted-foreground">{cable.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Info className="h-4 w-4 text-blue-300" />
            <AlertDescription className="text-blue-200">
              <strong>Voltage Drop Limits:</strong><br />
              Maximum {voltageDropGuidance.percentage}% ({voltageDropGuidance.volts}V) for {planData.loadType} circuits.
              Longer cable runs may require larger cable sizes.
            </AlertDescription>
          </Alert>

          {planData.cableLength > 0 && (
            <Card className="bg-amber-500/10 border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-amber-300 text-sm">Installation Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-xs text-amber-200 space-y-1">
                  <li>• Cable length: {planData.cableLength}m</li>
                  <li>• Consider cable supports every 300-600mm for horizontal runs</li>
                  <li>• Allow for thermal expansion on long runs</li>
                  <li>• Ensure adequate protection against mechanical damage</li>
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
