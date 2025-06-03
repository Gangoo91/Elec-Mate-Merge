
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InstallPlanData } from "./types";
import { Thermometer, Shield, Zap } from "lucide-react";

interface EnvironmentStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const EnvironmentStep = ({ planData, updatePlanData }: EnvironmentStepProps) => {
  const protectiveDevices = [
    { value: "mcb-b", label: "MCB Type B", description: "3-5 x In trip current" },
    { value: "mcb-c", label: "MCB Type C", description: "5-10 x In trip current" },
    { value: "mcb-d", label: "MCB Type D", description: "10-20 x In trip current" },
    { value: "rcbo", label: "RCBO", description: "MCB + RCD protection" },
    { value: "fuse", label: "Fuse", description: "BS 88 or BS 1361 fuse" }
  ];

  const earthingSystems = [
    { value: "TN-S", label: "TN-S", description: "Separate neutral and earth" },
    { value: "TN-C-S", label: "TN-C-S (PME)", description: "Combined then separate N & E" },
    { value: "TT", label: "TT", description: "Earth electrode system" },
    { value: "IT", label: "IT", description: "Isolated or impedance earthed" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Environmental Conditions</h2>
        <p className="text-muted-foreground mb-6">
          Specify environmental factors and protection requirements for accurate cable sizing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Thermometer className="h-5 w-5 text-elec-yellow" />
                Environmental Factors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ambientTemp" className="text-base font-medium">Ambient Temperature (°C)</Label>
                <Input
                  id="ambientTemp"
                  type="number"
                  value={planData.ambientTemperature || ""}
                  onChange={(e) => updatePlanData({ ambientTemperature: parseFloat(e.target.value) || 30 })}
                  placeholder="30"
                  className="bg-elec-dark border-elec-yellow/20 mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Standard reference: 30°C</p>
              </div>

              <div>
                <Label htmlFor="grouping" className="text-base font-medium">Grouping Factor (Ca)</Label>
                <Select value={planData.groupingFactor.toString()} onValueChange={(value) => updatePlanData({ groupingFactor: parseFloat(value) })}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="1">1.0 (Single circuit)</SelectItem>
                    <SelectItem value="0.8">0.8 (2-3 circuits)</SelectItem>
                    <SelectItem value="0.7">0.7 (4-6 circuits)</SelectItem>
                    <SelectItem value="0.65">0.65 (7-9 circuits)</SelectItem>
                    <SelectItem value="0.6">0.6 (10+ circuits)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="derating" className="text-base font-medium">Overall Derating Factor</Label>
                <Input
                  id="derating"
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="1.0"
                  value={planData.derating || ""}
                  onChange={(e) => updatePlanData({ derating: parseFloat(e.target.value) || 1 })}
                  placeholder="1.0"
                  className="bg-elec-dark border-elec-yellow/20 mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Combined derating (thermal, grouping, etc.)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Protection & Earthing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-3 block">Protective Device</Label>
                <div className="grid gap-2">
                  {protectiveDevices.map((device) => (
                    <Card
                      key={device.value}
                      className={`cursor-pointer border transition-all ${
                        planData.protectiveDevice === device.value
                          ? 'border-elec-yellow bg-elec-yellow/10'
                          : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                      }`}
                      onClick={() => updatePlanData({ protectiveDevice: device.value })}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-elec-yellow" />
                          <div>
                            <h4 className="font-medium text-sm">{device.label}</h4>
                            <p className="text-xs text-muted-foreground">{device.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-elec-yellow" />
                Earthing System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium mb-3 block">System Type</Label>
                <Select value={planData.earthingSystem} onValueChange={(value) => updatePlanData({ earthingSystem: value })}>
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {earthingSystems.map((system) => (
                      <SelectItem key={system.value} value={system.value}>
                        {system.label} - {system.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ze" className="text-base font-medium">Ze (External Earth Fault Loop Impedance) Ω</Label>
                <Input
                  id="ze"
                  type="number"
                  step="0.01"
                  value={planData.ze || ""}
                  onChange={(e) => updatePlanData({ ze: parseFloat(e.target.value) || 0.35 })}
                  placeholder="0.35"
                  className="bg-elec-dark border-elec-yellow/20 mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Typical values: TN-S: 0.35Ω, TN-C-S: 0.35Ω, TT: varies
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentStep;
