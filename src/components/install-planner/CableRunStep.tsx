import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { InstallPlanData } from "./types";
import { Cable, Route, Info, Ruler, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CableRunStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const CableRunStep = ({ planData, updatePlanData }: CableRunStepProps) => {
  // Simplified to 6 proven installation methods that actually impact calculations
  const installationMethods = [
    { value: "clipped-direct", label: "Clipped Direct", description: "Most common - cable clipped to surface" },
    { value: "in-conduit", label: "In Conduit", description: "Cable in plastic/metal conduit" },
    { value: "in-trunking", label: "In Trunking", description: "Cable in cable trunking" },
    { value: "through-insulation", label: "Through Insulation", description: "Cable passing through thermal insulation" },
    { value: "underground", label: "Underground", description: "Direct buried or ducted underground" },
    { value: "cable-tray", label: "Cable Tray", description: "On cable tray or ladder" }
  ];

  // Simplified to 4 bulletproof cable types with verified calculations
  const cableTypes = [
    { value: "pvc-twin-earth", label: "PVC Twin & Earth", description: "Standard domestic/commercial - 70°C rating" },
    { value: "xlpe-lsoh", label: "XLPE-LSOH", description: "Fire performance - 90°C rating, low smoke" },
    { value: "swa-xlpe", label: "SWA XLPE", description: "Armoured outdoor cable - 90°C rating" },
    { value: "micc", label: "MICC", description: "Mineral insulated - high temperature/fire resistance" }
  ];

  const getVoltageDropGuidance = () => {
    const maxVoltageDropPercentage = planData.loadType === "lighting" ? 3 : 5;
    const maxVoltageDropVolts = planData.voltage ? (planData.voltage * maxVoltageDropPercentage) / 100 : 0;
    
    return {
      percentage: maxVoltageDropPercentage,
      volts: maxVoltageDropVolts.toFixed(1)
    };
  };

  const voltageDropGuidance = getVoltageDropGuidance();

  // Smart stepping for cable length based on typical run lengths
  const getCableLengthStep = () => {
    const length = planData.cableLength || 0;
    if (length < 10) return "0.5"; // 0.5m steps for short runs
    if (length < 50) return "1"; // 1m steps for medium runs
    return "5"; // 5m steps for long runs
  };

  const getCableLengthMin = () => "0.1"; // Minimum 10cm

  return (
    <div className="space-y-8">
      {/* Cable Length Input */}
      <div className="space-y-8">
        <MobileInputWrapper
          label="Cable Length"
          placeholder={`Enter length (±${getCableLengthStep()}m steps)`}
          value={planData.cableLength || ""}
          onChange={(value) => updatePlanData({ cableLength: parseFloat(value) || 0 })}
          type="number"
          step={getCableLengthStep()}
          min={getCableLengthMin()}
          icon={<Ruler className="h-5 w-5" />}
          unit="m"
          hint="Measure the actual cable route distance, including vertical runs"
        />

        <MobileSelectWrapper
          label="Installation Method"
          placeholder="Select installation method"
          value={planData.installationMethod || ""}
          onValueChange={(value) => updatePlanData({ installationMethod: value })}
          options={installationMethods.map(method => ({
            value: method.value,
            label: method.label
          }))}
          hint={planData.installationMethod ? 
            installationMethods.find(m => m.value === planData.installationMethod)?.description || "Choose the method that matches your cable route" 
            : "Choose the method that matches your cable route"}
        />

        <MobileSelectWrapper
          label="Cable Type"
          placeholder="Select cable type"
          value={planData.cableType || ""}
          onValueChange={(value) => updatePlanData({ cableType: value })}
          options={cableTypes.map(cable => ({
            value: cable.value,
            label: cable.label
          }))}
          hint={planData.cableType ? 
            cableTypes.find(c => c.value === planData.cableType)?.description || "Choose cable type based on installation environment" 
            : "Choose cable type based on installation environment"}
        />
      </div>

      {/* Voltage Drop Guidance */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-blue-300 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg">Voltage Drop Limits</div>
              <div className="text-sm font-normal text-blue-200/80">BS 7671 Compliance Requirements</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-200/90">
                <span className="font-semibold">Maximum Voltage Drop:</span> {voltageDropGuidance.percentage}% ({voltageDropGuidance.volts}V) for {planData.loadType || 'this'} circuit type
              </p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-200/90">
                <span className="font-semibold">Design Consideration:</span> Longer cable runs may require larger cable sizes to maintain compliance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Method Guidance */}
      {planData.installationMethod && (
        <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-amber-300 flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Route className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg">Installation Guidance</div>
                <div className="text-sm font-normal text-amber-200/80 capitalize">{planData.installationMethod?.replace('-', ' ')}</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planData.installationMethod === "clipped-direct" && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Cable clips every 300-400mm horizontally, 250mm vertically</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Maintain 50mm separation from other services</span>
                  </div>
                </>
              )}
              {(planData.installationMethod === "conduit-surface" || planData.installationMethod === "conduit-embedded" || planData.installationMethod === "conduit-underground") && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Conduit supports every 1m horizontally, 0.75m vertically</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Use appropriate conduit size for cable fill factor (max 45%)</span>
                  </div>
                </>
              )}
              {planData.installationMethod === "direct-buried" && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Minimum burial depth 450mm, 750mm under roads</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Warning tape 150mm above cable, marker posts required</span>
                  </div>
                </>
              )}
              {(planData.installationMethod === "trunking-metal" || planData.installationMethod === "trunking-plastic") && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Trunking supports every 1.5m, use appropriate size for cable quantity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Separate power and data cables in different compartments</span>
                  </div>
                </>
              )}
              {(planData.installationMethod === "cable-tray" || planData.installationMethod === "cable-ladder" || planData.installationMethod === "basket-tray") && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Support intervals every 2m for cable trays, 3m for ladders</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Consider cable segregation and fire stopping requirements</span>
                  </div>
                </>
              )}
              {planData.installationMethod === "overhead" && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Minimum clearance heights: 5.2m roads, 5.8m HGV routes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Weather protection and wind loading considerations</span>
                  </div>
                </>
              )}
              {(planData.installationMethod === "ceiling-void" || planData.installationMethod === "floor-duct") && (
                <>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Fire stopping required at compartment boundaries</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Adequate ventilation and access for maintenance</span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cable Length Analysis */}
      {planData.cableLength > 0 && (
        <Alert className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Info className="h-5 w-5 text-green-300" />
            </div>
            <AlertDescription className="text-green-200">
              <div className="font-semibold text-green-100 mb-3">Cable Run Analysis</div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm">Cable length: {planData.cableLength}m</span>
                </div>
                {planData.cableLength > 50 && (
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-amber-200">Long run detected - voltage drop calculations critical</span>
                  </div>
                )}
                {planData.cableLength > 100 && (
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm text-red-200">Very long run - consider intermediate switching or larger cable sizes</span>
                  </div>
                )}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* General Design Considerations */}
      <Alert className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl">
        <div className="flex flex-col items-center text-center space-y-4 p-2">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-purple-300" />
          </div>
          <AlertDescription className="text-purple-200 w-full">
            <div className="font-semibold text-purple-100 mb-4 text-lg">BS 7671 Requirements</div>
            <div className="space-y-3 text-sm max-w-md mx-auto">
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Cable selection must consider current-carrying capacity, voltage drop, and fault conditions</span>
              </div>
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Installation method affects current rating - reference methods apply</span>
              </div>
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Ensure adequate mechanical protection and earthing arrangements</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default CableRunStep;