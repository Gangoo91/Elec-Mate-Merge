
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallPlanData } from "./types";
import { Calculator, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoadDetailsStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const LoadDetailsStep = ({ planData, updatePlanData }: LoadDetailsStepProps) => {
  const getLoadGuidance = () => {
    switch (planData.loadType) {
      case "lighting":
        return {
          typical: "100-200W per room",
          example: "LED downlights: 6W each, halogen: 50W each",
          defaultPF: 0.9
        };
      case "power":
        return {
          typical: "2.5kW per socket circuit",
          example: "13A socket outlets, general power",
          defaultPF: 0.85
        };
      case "heating":
        return {
          typical: "1-3kW per room",
          example: "Electric radiators, underfloor heating",
          defaultPF: 1.0
        };
      case "cooker":
        return {
          typical: "6-10kW",
          example: "Electric oven: 3kW, hob: 7kW",
          defaultPF: 1.0
        };
      case "immersion":
        return {
          typical: "3kW",
          example: "Standard immersion heater",
          defaultPF: 1.0
        };
      case "motor":
        return {
          typical: "0.5-5kW",
          example: "Pumps, fans, compressors",
          defaultPF: 0.8
        };
      default:
        return {
          typical: "Varies",
          example: "Check manufacturer specifications",
          defaultPF: 0.85
        };
    }
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Load Details</h2>
        <p className="text-muted-foreground mb-6">
          Specify the electrical load requirements for your {planData.loadType} circuit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <SelectItem value="230">230V (Single Phase)</SelectItem>
                <SelectItem value="400">400V (Three Phase)</SelectItem>
                <SelectItem value="110">110V (Site Supply)</SelectItem>
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
                <SelectItem value="single">Single Phase</SelectItem>
                <SelectItem value="three">Three Phase</SelectItem>
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
                Load Guidance
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
              This calculator uses the full load for conservative calculations.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default LoadDetailsStep;
