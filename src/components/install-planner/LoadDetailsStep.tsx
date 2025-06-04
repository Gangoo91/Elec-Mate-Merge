
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallPlanData } from "./types";
import { Calculator, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoadDetailsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const LoadDetailsStep = ({ planData, updatePlanData }: LoadDetailsStepProps) => {
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
      
      // Specialized installations
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
        example: "Server racks: 5-20kW, Data centers: 50-100kW",
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Load Details & Specifications</h2>
        <p className="text-muted-foreground mb-6">
          Specify the electrical load requirements for your {planData.loadType} circuit.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="totalLoad" className="text-base font-medium">Total Load (W)</Label>
            <Input
              id="totalLoad"
              type="number"
              value={planData.totalLoad || ""}
              onChange={(e) => updatePlanData({ totalLoad: parseFloat(e.target.value) || 0 })}
              placeholder="Enter load in watts"
              className="bg-elec-dark border-elec-yellow/20 mt-2"
            />
          </div>

          <div>
            <Label htmlFor="voltage" className="text-base font-medium">Supply Voltage (V)</Label>
            <Select value={planData.voltage.toString()} onValueChange={(value) => updatePlanData({ voltage: parseInt(value) })}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {guidance.voltageOptions.includes("110") && <SelectItem value="110">110V (Site Supply)</SelectItem>}
                {guidance.voltageOptions.includes("230") && <SelectItem value="230">230V (Single Phase)</SelectItem>}
                {guidance.voltageOptions.includes("400") && <SelectItem value="400">400V (Three Phase)</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="phases" className="text-base font-medium">System Type</Label>
            <Select value={planData.phases} onValueChange={(value: "single" | "three") => updatePlanData({ phases: value })}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {guidance.phaseOptions.includes("single") && <SelectItem value="single">Single Phase</SelectItem>}
                {guidance.phaseOptions.includes("three") && <SelectItem value="three">Three Phase</SelectItem>}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="powerFactor" className="text-base font-medium">Power Factor</Label>
            <Input
              id="powerFactor"
              type="number"
              step="0.1"
              min="0.1"
              max="1.0"
              value={planData.powerFactor || guidance.defaultPF}
              onChange={(e) => updatePlanData({ powerFactor: parseFloat(e.target.value) || guidance.defaultPF })}
              placeholder="0.85"
              className="bg-elec-dark border-elec-yellow/20 mt-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="bg-blue-500/10 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Load Guidance - {planData.loadType}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><strong>Typical Load:</strong> {guidance.typical}</p>
                <p><strong>Example:</strong> {guidance.example}</p>
                <p><strong>Suggested Power Factor:</strong> {guidance.defaultPF}</p>
              </div>
            </CardContent>
          </Card>

          {specialConsiderations.length > 0 && (
            <Alert className="bg-amber-500/10 border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-300" />
              <AlertDescription className="text-amber-200">
                <strong>Special Considerations:</strong>
                <ul className="mt-2 space-y-1">
                  {specialConsiderations.map((consideration, index) => (
                    <li key={index} className="text-sm">• {consideration}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {planData.totalLoad > 0 && (
            <Card className="bg-elec-yellow/10 border-elec-yellow/30">
              <CardHeader>
                <CardTitle className="text-elec-yellow flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Calculated Current
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {calculateCurrent()}A
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Design current for {planData.phases} phase system
                </p>
              </CardContent>
            </Card>
          )}

          <Alert className="bg-amber-500/10 border-amber-500/30">
            <Info className="h-4 w-4 text-amber-300" />
            <AlertDescription className="text-amber-200">
              Consider diversity factors and future expansion when determining total load. 
              For motor loads, include starting current considerations.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default LoadDetailsStep;
