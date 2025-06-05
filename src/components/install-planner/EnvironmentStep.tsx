
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InstallPlanData } from "./types";
import { Thermometer, Shield, Zap, AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EnvironmentStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const EnvironmentStep = ({ planData, updatePlanData }: EnvironmentStepProps) => {
  const protectiveDevices = [
    { value: "mcb-b", label: "MCB Type B", description: "3-5 x In trip characteristic" },
    { value: "mcb-c", label: "MCB Type C", description: "5-10 x In trip characteristic" },
    { value: "mcb-d", label: "MCB Type D", description: "10-20 x In trip characteristic" },
    { value: "rcbo-b", label: "RCBO Type B", description: "Combined MCB + RCD protection" },
    { value: "rcbo-c", label: "RCBO Type C", description: "Combined MCB + RCD protection" },
    { value: "fuse-bs88", label: "BS88 Fuse", description: "High breaking capacity fuse" },
    { value: "fuse-bs1361", label: "BS1361 Fuse", description: "Domestic cartridge fuse" }
  ];

  const earthingSystems = [
    { value: "TN-S", label: "TN-S", description: "Separate neutral and earth", ze: 0.35 },
    { value: "TN-C-S", label: "TN-C-S (PME)", description: "Combined neutral-earth", ze: 0.35 },
    { value: "TT", label: "TT", description: "Earth electrode system", ze: 21 },
    { value: "IT", label: "IT", description: "Isolated or impedance earthed", ze: 1000 }
  ];

  const environmentalConditions = [
    "Indoor dry locations",
    "Indoor damp locations", 
    "Outdoor protected",
    "Outdoor exposed",
    "Underground",
    "Corrosive atmosphere",
    "High temperature areas",
    "Dusty environments",
    "Potentially explosive atmospheres",
    "Agricultural/farming environments"
  ];

  const specialRequirements = [
    "Fire alarm circuits",
    "Emergency lighting",
    "Essential services",
    "Medical equipment",
    "Swimming pool areas",
    "Bathroom zones",
    "Sauna/steam rooms",
    "Mobile equipment",
    "Outdoor lighting",
    "HVAC equipment"
  ];

  const getZeValue = (earthingSystem: string): number => {
    const system = earthingSystems.find(sys => sys.value === earthingSystem);
    return system?.ze || 0.35;
  };

  const updateZeBasedOnEarthing = (earthingSystem: string) => {
    const zeValue = getZeValue(earthingSystem);
    updatePlanData({ 
      earthingSystem,
      ze: zeValue 
    });
  };

  const getTemperatureGuidance = () => {
    if (planData.ambientTemperature <= 25) {
      return { color: "text-green-400", message: "Ideal temperature conditions" };
    } else if (planData.ambientTemperature <= 35) {
      return { color: "text-yellow-400", message: "Moderate temperature - may require derating" };
    } else if (planData.ambientTemperature <= 45) {
      return { color: "text-orange-400", message: "High temperature - derating required" };
    } else {
      return { color: "text-red-400", message: "Very high temperature - special cable may be needed" };
    }
  };

  const temperatureGuidance = getTemperatureGuidance();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Environmental Conditions & Protection</h2>
        <p className="text-muted-foreground mb-6">
          Specify environmental conditions, protective devices, and earthing arrangements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Conditions */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-dark/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-elec-yellow" />
                Environmental Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ambientTemp" className="text-base font-medium">
                  Ambient Temperature (°C)
                </Label>
                <Input
                  id="ambientTemp"
                  type="number"
                  value={planData.ambientTemperature || ""}
                  onChange={(e) => updatePlanData({ ambientTemperature: parseFloat(e.target.value) || 30 })}
                  className="bg-elec-dark border-elec-yellow/20 mt-2"
                  placeholder="30"
                />
                <p className={`text-sm mt-1 ${temperatureGuidance.color}`}>
                  {temperatureGuidance.message}
                </p>
              </div>

              <div>
                <Label className="text-base font-medium">Environmental Conditions</Label>
                <Select 
                  value={planData.environmentalConditions || ""} 
                  onValueChange={(value) => updatePlanData({ environmentalConditions: value })}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-2">
                    <SelectValue placeholder="Select environmental conditions" />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    {environmentalConditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="groupingFactor" className="text-base font-medium">
                  Grouping Factor
                </Label>
                <Select 
                  value={planData.groupingFactor?.toString() || "1"} 
                  onValueChange={(value) => updatePlanData({ groupingFactor: parseFloat(value) })}
                >
                  <SelectTrigger className="bg-elec-dark border-elec-yellow/20 mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-dark border-elec-yellow/20">
                    <SelectItem value="1">1.0 (Single circuit)</SelectItem>
                    <SelectItem value="0.8">0.8 (2-3 circuits grouped)</SelectItem>
                    <SelectItem value="0.7">0.7 (4-6 circuits grouped)</SelectItem>
                    <SelectItem value="0.65">0.65 (7-12 circuits grouped)</SelectItem>
                    <SelectItem value="0.6">0.6 (13+ circuits grouped)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Protection & Earthing */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-dark/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Protection & Earthing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Protective Device</Label>
                <div className="grid gap-2 mt-2">
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

              <div>
                <Label className="text-base font-medium">Earthing System</Label>
                <div className="grid gap-2 mt-2">
                  {earthingSystems.map((system) => (
                    <Card
                      key={system.value}
                      className={`cursor-pointer border transition-all ${
                        planData.earthingSystem === system.value
                          ? 'border-elec-yellow bg-elec-yellow/10'
                          : 'border-elec-yellow/20 hover:border-elec-yellow/40'
                      }`}
                      onClick={() => updateZeBasedOnEarthing(system.value)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-elec-yellow" />
                            <div>
                              <h4 className="font-medium text-sm">{system.label}</h4>
                              <p className="text-xs text-muted-foreground">{system.description}</p>
                            </div>
                          </div>
                          <div className="text-xs text-elec-yellow">
                            Ze: {system.ze}Ω
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="ze" className="text-base font-medium">
                  Ze Value (Ω)
                </Label>
                <Input
                  id="ze"
                  type="number"
                  step="0.01"
                  value={planData.ze || ""}
                  onChange={(e) => updatePlanData({ ze: parseFloat(e.target.value) || 0.35 })}
                  className="bg-elec-dark border-elec-yellow/20 mt-2"
                  placeholder="0.35"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Special Requirements */}
      <Card className="border-elec-yellow/20 bg-elec-dark/50">
        <CardHeader>
          <CardTitle className="text-lg">Special Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {specialRequirements.map((requirement) => (
              <div key={requirement} className="flex items-center space-x-2">
                <Checkbox
                  id={requirement}
                  checked={planData.specialRequirements?.includes(requirement) || false}
                  onCheckedChange={(checked) => {
                    const current = planData.specialRequirements || [];
                    if (checked) {
                      updatePlanData({ 
                        specialRequirements: [...current, requirement] 
                      });
                    } else {
                      updatePlanData({ 
                        specialRequirements: current.filter(req => req !== requirement) 
                      });
                    }
                  }}
                  className="border-elec-yellow data-[state=checked]:bg-elec-yellow data-[state=checked]:text-black"
                />
                <Label 
                  htmlFor={requirement} 
                  className="text-sm cursor-pointer"
                >
                  {requirement}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environment Warnings */}
      {planData.ambientTemperature > 40 && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-300" />
          <AlertDescription className="text-red-200">
            <strong>High Temperature Warning:</strong> Ambient temperature above 40°C requires special consideration for cable selection and derating factors.
          </AlertDescription>
        </Alert>
      )}

      {planData.earthingSystem === "TT" && (
        <Alert className="bg-amber-500/10 border-amber-500/30">
          <Info className="h-4 w-4 text-amber-300" />
          <AlertDescription className="text-amber-200">
            <strong>TT System:</strong> Additional earth electrode required. RCD protection mandatory for all circuits.
          </AlertDescription>
        </Alert>
      )}

      {planData.specialRequirements?.includes("Swimming pool areas") && (
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-300" />
          <AlertDescription className="text-blue-200">
            <strong>Swimming Pool Installation:</strong> Special requirements apply under BS 7671 Section 702. Zone classifications and additional protection required.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EnvironmentStep;
