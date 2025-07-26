
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { InstallPlanData } from "./types";
import { Calculator, Info, AlertTriangle, Zap, Activity, Settings } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoadDetailsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const LoadDetailsStep = ({ planData, updatePlanData }: LoadDetailsStepProps) => {
  // Smart stepping based on load type
  const getStepValue = (loadType: string) => {
    // Small loads: 10W steps
    if (['lighting', 'emergency', 'power'].includes(loadType)) {
      return "10";
    }
    // Medium loads: 100W steps  
    if (['cooker', 'heating', 'motor', 'hvac'].includes(loadType)) {
      return "100";
    }
    // Large loads: 500W steps
    if (['welding', 'furnace', 'crane', 'solar-pv', 'battery-storage'].includes(loadType)) {
      return "500";
    }
    // Default: 50W steps
    return "50";
  };

  // Minimum value based on load type
  const getMinValue = (loadType: string) => {
    if (['lighting', 'emergency'].includes(loadType)) {
      return "10";
    }
    if (['power'].includes(loadType)) {
      return "100";
    }
    if (['cooker', 'heating', 'motor'].includes(loadType)) {
      return "500";
    }
    if (['hvac', 'welding', 'furnace', 'crane'].includes(loadType)) {
      return "1000";
    }
    return "50";
  };

  const getLoadGuidance = () => {
    const guidanceMap = {
      // Standard loads
      "lighting": {
        typical: "100-200W per room",
        example: "LED downlights: 6W each, halogen: 50W each",
        defaultPF: 0.9,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "power": {
        typical: "2.5kW per socket circuit",
        example: "13A socket outlets, general power",
        defaultPF: 0.85,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "heating": {
        typical: "1-3kW per room",
        example: "Electric radiators, underfloor heating",
        defaultPF: 1.0,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "cooker": {
        typical: "6-10kW",
        example: "Electric oven: 3kW, hob: 7kW",
        defaultPF: 1.0,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      
      // Motor loads
      "motor": {
        typical: "0.5-50kW",
        example: "Pumps: 1-5kW, Fans: 0.5-10kW, Compressors: 5-50kW",
        defaultPF: 0.8,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "hvac": {
        typical: "5-100kW",
        example: "Split units: 5-15kW, Central systems: 20-100kW",
        defaultPF: 0.85,
        voltageOptions: ["400"],
        phaseOptions: ["three"]
      },
      
      // Industrial loads
      "welding": {
        typical: "5-50kW",
        example: "MIG welders: 5-15kW, Arc welders: 10-50kW",
        defaultPF: 0.7,
        voltageOptions: ["400"],
        phaseOptions: ["three"]
      },
      "furnace": {
        typical: "10-500kW",
        example: "Small kilns: 10-50kW, Industrial furnaces: 100-500kW",
        defaultPF: 1.0,
        voltageOptions: ["400"],
        phaseOptions: ["three"]
      },
      "crane": {
        typical: "10-200kW",
        example: "Workshop cranes: 10-50kW, Industrial cranes: 50-200kW",
        defaultPF: 0.75,
        voltageOptions: ["400"],
        phaseOptions: ["three"]
      },
      
      // Specialised installations
      "ev-charging": {
        typical: "3.7-350kW",
        example: "Home chargers: 3.7-22kW, Rapid chargers: 50-350kW",
        defaultPF: 0.95,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "emergency": {
        typical: "0.5-5kW",
        example: "Emergency lighting: 0.5-2kW, Fire alarms: 1-5kW",
        defaultPF: 0.9,
        voltageOptions: ["230"],
        phaseOptions: ["single"]
      },
      "it-equipment": {
        typical: "1-100kW",
        example: "Server racks: 5-20kW, Data centres: 50-100kW",
        defaultPF: 0.9,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "medical": {
        typical: "0.5-50kW",
        example: "Life support: 0.5-5kW, MRI scanners: 20-50kW",
        defaultPF: 0.85,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "solar-pv": {
        typical: "1-1000kW",
        example: "Domestic: 1-10kW, Commercial: 50-1000kW",
        defaultPF: 0.95,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      },
      "battery-storage": {
        typical: "5-1000kWh",
        example: "Home storage: 5-20kWh, Grid storage: 100-1000kWh",
        defaultPF: 0.95,
        voltageOptions: ["230", "400"],
        phaseOptions: ["single", "three"]
      }
    };

    return guidanceMap[planData.loadType as keyof typeof guidanceMap] || {
      typical: "Varies",
      example: "Check manufacturer specifications",
      defaultPF: 0.85,
      voltageOptions: ["230", "400"],
      phaseOptions: ["single", "three"]
    };
  };

  const guidance = getLoadGuidance();

  const calculateCurrent = () => {
    if (planData.totalLoad && planData.voltage) {
      if (planData.phases === "single") {
        return (planData.totalLoad / planData.voltage).toFixed(2);
      } else {
        return (planData.totalLoad / (planData.voltage * Math.sqrt(3))).toFixed(2);
      }
    }
    return "0";
  };

  const getSpecialConsiderations = () => {
    const specialConsiderations = {
      "motor": ["Starting current typically 5-8x full load current", "DOL, Star-Delta, or VFD starting methods may be required"],
      "hvac": ["Seasonal diversity factors apply", "Consider heat pump COP variations"],
      "welding": ["High inrush currents and voltage fluctuations", "Dedicated supply may be required"],
      "ev-charging": ["Smart charging and load balancing considerations", "DNO notification may be required for >7kW"],
      "medical": ["Isolated supply systems (IT systems) may be required", "Backup power supply essential"],
      "solar-pv": ["DNO G99 application required", "Export limitation may apply"],
      "emergency": ["Battery backup duration requirements", "Monthly testing regime required"]
    };

    return specialConsiderations[planData.loadType as keyof typeof specialConsiderations] || [];
  };

  const specialConsiderations = getSpecialConsiderations();

  return (
    <div className="space-y-8">
      {/* Load Input Section */}
      <div className="space-y-8">
        <MobileInputWrapper
          label="Total Load"
          placeholder={`Enter load (±${getStepValue(planData.loadType || "")}W steps)`}
          value={planData.totalLoad || ""}
          onChange={(value) => updatePlanData({ totalLoad: parseFloat(value) || 0 })}
          type="number"
          step={getStepValue(planData.loadType || "")}
          min={getMinValue(planData.loadType || "")}
          icon={<Zap className="h-5 w-5" />}
          unit="W"
          hint={`Typical for ${planData.loadType}: ${guidance.typical}`}
        />

        <MobileSelectWrapper
          label="Supply Voltage"
          placeholder="Select supply voltage"
          value={planData.voltage?.toString() || ""}
          onValueChange={(value) => updatePlanData({ voltage: parseInt(value) })}
          options={[
            ...(guidance.voltageOptions.includes("110") ? [{ value: "110", label: "110V (Site Supply)" }] : []),
            ...(guidance.voltageOptions.includes("230") ? [{ value: "230", label: "230V (Single Phase)" }] : []),
            ...(guidance.voltageOptions.includes("400") ? [{ value: "400", label: "400V (Three Phase)" }] : [])
          ]}
        />

        <MobileSelectWrapper
          label="System Type"
          placeholder="Select system type"
          value={planData.phases || ""}
          onValueChange={(value: "single" | "three") => updatePlanData({ phases: value })}
          options={[
            ...(guidance.phaseOptions.includes("single") ? [{ value: "single", label: "Single Phase" }] : []),
            ...(guidance.phaseOptions.includes("three") ? [{ value: "three", label: "Three Phase" }] : [])
          ]}
        />

        <MobileInputWrapper
          label="Power Factor"
          placeholder="0.85"
          value={planData.powerFactor || guidance.defaultPF}
          onChange={(value) => updatePlanData({ powerFactor: parseFloat(value) || guidance.defaultPF })}
          type="number"
          step="0.01"
          min="0.1"
          max="1.0"
          icon={<Activity className="h-5 w-5" />}
          hint={`Suggested for ${planData.loadType}: ${guidance.defaultPF}`}
        />
      </div>

      {/* Guidance Card */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-blue-300 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg">Load Guidance</div>
              <div className="text-sm font-normal text-blue-200/80 capitalize">{planData.loadType?.replace('-', ' ')}</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-200/90"><span className="font-semibold">Typical Load:</span> {guidance.typical}</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-200/90"><span className="font-semibold">Example:</span> {guidance.example}</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-200/90"><span className="font-semibold">Power Factor:</span> {guidance.defaultPF}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Considerations */}
      {specialConsiderations.length > 0 && (
        <Alert className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-300" />
            </div>
            <AlertDescription className="text-amber-200">
              <div className="font-semibold text-amber-100 mb-3">Special Considerations</div>
              <div className="space-y-2">
                {specialConsiderations.map((consideration, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm">{consideration}</span>
                  </div>
                ))}
              </div>
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Calculated Current */}
      {planData.totalLoad > 0 && planData.voltage && (
        <Card className="bg-gradient-to-r from-elec-yellow/10 to-amber-500/10 border border-elec-yellow/30 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-elec-yellow flex items-center gap-3">
              <div className="p-2 bg-elec-yellow/20 rounded-lg">
                <Calculator className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <div className="text-lg">Calculated Current</div>
                <div className="text-sm font-normal text-elec-yellow/80">Design current for {planData.phases} phase system</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {calculateCurrent()}A
            </div>
            <p className="text-sm text-elec-light/70">
              This is the design current that will be used for cable sizing and protective device selection.
            </p>
          </CardContent>
        </Card>
      )}

      {/* General Advice */}
      <Alert className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl">
        <div className="flex flex-col items-center text-center space-y-4 p-2">
          <div className="p-3 bg-green-500/20 rounded-lg">
            <Info className="h-6 w-6 text-green-300" />
          </div>
          <AlertDescription className="text-green-200 w-full">
            <div className="font-semibold text-green-100 mb-4 text-lg">Design Considerations</div>
            <div className="space-y-3 text-sm max-w-md mx-auto">
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Consider diversity factors and future expansion when determining total load</span>
              </div>
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>For motor loads, include starting current considerations</span>
              </div>
              <div className="flex items-start gap-2 text-left">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Verify manufacturer specifications for actual power consumption</span>
              </div>
            </div>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};

export default LoadDetailsStep;
