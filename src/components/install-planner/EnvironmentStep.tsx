
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { InstallPlanData } from "./types";
import { Thermometer, Shield, AlertTriangle, Flame, Droplets } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EnvironmentStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const EnvironmentStep = ({ planData, updatePlanData }: EnvironmentStepProps) => {
  const protectiveDevices = [
    { value: "mcb-b", label: "MCB Type B", description: "General purpose, 3-5 x In" },
    { value: "mcb-c", label: "MCB Type C", description: "Motor loads, 5-10 x In" },
    { value: "mcb-d", label: "MCB Type D", description: "High inrush loads, 10-20 x In" },
    { value: "rcbo-b", label: "RCBO Type B", description: "RCD + MCB Type B protection" },
    { value: "rcbo-c", label: "RCBO Type C", description: "RCD + MCB Type C protection" },
    { value: "afdd", label: "AFDD", description: "Arc fault detection device" },
    { value: "contactor", label: "Contactor", description: "Motor control applications" },
    { value: "fuse", label: "Fuse", description: "HRC fuses for motor protection" }
  ];

  const earthingSystems = [
    { value: "TN-S", label: "TN-S", description: "Separate neutral and earth" },
    { value: "TN-C-S", label: "TN-C-S (PME)", description: "Combined then separate N-E" },
    { value: "TT", label: "TT", description: "Earth electrode system" },
    { value: "IT", label: "IT", description: "Isolated or impedance earthed" }
  ];

  const environmentalConditions = [
    { value: "indoor-dry", label: "Indoor Dry", description: "Normal domestic/office environment" },
    { value: "indoor-damp", label: "Indoor Damp", description: "Kitchens, bathrooms, basements" },
    { value: "outdoor", label: "Outdoor", description: "Weather exposed installations" },
    { value: "corrosive", label: "Corrosive", description: "Chemical plants, swimming pools" },
    { value: "explosive", label: "Explosive Atmosphere", description: "Hazardous area installations" },
    { value: "high-temp", label: "High Temperature", description: "Furnaces, boiler rooms" },
    { value: "vibration", label: "High Vibration", description: "Industrial machinery areas" }
  ];

  const specialRequirements = [
    { id: "fire-alarm", label: "Fire Alarm System Integration" },
    { id: "emergency-lighting", label: "Emergency Lighting Circuit" },
    { id: "surge-protection", label: "Surge Protection Required" },
    { id: "isolation", label: "Galvanic Isolation Required" },
    { id: "monitoring", label: "Remote Monitoring System" },
    { id: "backup-power", label: "Backup Power Supply" },
    { id: "load-shedding", label: "Load Shedding Capability" },
    { id: "harmonic-filtering", label: "Harmonic Filtering Required" }
  ];

  const getProtectionGuidance = () => {
    const guidance = {
      "lighting": "MCB Type B or RCBO typically suitable",
      "power": "RCBO recommended for socket circuits",
      "motor": "MCB Type C or D depending on starting method",
      "hvac": "Contactor with overload protection required",
      "welding": "MCB Type D or HRC fuses for high inrush",
      "ev-charging": "RCBO with Type A RCD minimum",
      "medical": "IT system monitoring recommended",
      "emergency": "Dedicated supply with battery backup",
      "solar-pv": "DC isolation and AC protection required"
    };
    
    return guidance[planData.loadType as keyof typeof guidance] || "Select appropriate protection based on load characteristics";
  };

  const handleSpecialRequirementChange = (requirementId: string, checked: boolean) => {
    const current = planData.specialRequirements || [];
    const updated = checked 
      ? [...current, requirementId]
      : current.filter(id => id !== requirementId);
    updatePlanData({ specialRequirements: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Environmental Conditions & Protection</h2>
        <p className="text-muted-foreground mb-6">
          Specify the environmental conditions and protection requirements for your installation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="ambientTemperature" className="text-base font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Ambient Temperature (°C)
            </Label>
            <Input
              id="ambientTemperature"
              type="number"
              value={planData.ambientTemperature || 30}
              onChange={(e) => updatePlanData({ ambientTemperature: parseFloat(e.target.value) || 30 })}
              className="bg-elec-dark border-elec-yellow/20 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Standard assumption: 30°C for derating calculations
            </p>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Environmental Conditions</Label>
            <Select 
              value={planData.environmentalConditions || "indoor-dry"} 
              onValueChange={(value) => updatePlanData({ environmentalConditions: value })}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {environmentalConditions.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    <div>
                      <div className="font-medium">{condition.label}</div>
                      <div className="text-xs text-muted-foreground">{condition.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="groupingFactor" className="text-base font-medium">Grouping Factor</Label>
              <Input
                id="groupingFactor"
                type="number"
                step="0.1"
                min="0.1"
                max="1.0"
                value={planData.groupingFactor || 1}
                onChange={(e) => updatePlanData({ groupingFactor: parseFloat(e.target.value) || 1 })}
                className="bg-elec-dark border-elec-yellow/20 mt-2"
              />
            </div>
            <div>
              <Label htmlFor="derating" className="text-base font-medium">Thermal Derating</Label>
              <Input
                id="derating"
                type="number"
                step="0.1"
                min="0.1"
                max="1.0"
                value={planData.derating || 1}
                onChange={(e) => updatePlanData({ derating: parseFloat(e.target.value) || 1 })}
                className="bg-elec-dark border-elec-yellow/20 mt-2"
              />
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Protective Device
            </Label>
            <Select 
              value={planData.protectiveDevice} 
              onValueChange={(value) => updatePlanData({ protectiveDevice: value })}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select protective device" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {protectiveDevices.map((device) => (
                  <SelectItem key={device.value} value={device.value}>
                    <div>
                      <div className="font-medium">{device.label}</div>
                      <div className="text-xs text-muted-foreground">{device.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium mb-3 block">Earthing System</Label>
            <Select 
              value={planData.earthingSystem} 
              onValueChange={(value) => updatePlanData({ earthingSystem: value })}
            >
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {earthingSystems.map((system) => (
                  <SelectItem key={system.value} value={system.value}>
                    <div>
                      <div className="font-medium">{system.label}</div>
                      <div className="text-xs text-muted-foreground">{system.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="ze" className="text-base font-medium">Ze Value (Ω)</Label>
            <Input
              id="ze"
              type="number"
              step="0.01"
              value={planData.ze || 0.35}
              onChange={(e) => updatePlanData({ ze: parseFloat(e.target.value) || 0.35 })}
              className="bg-elec-dark border-elec-yellow/20 mt-2"
            />
            <p className="text-sm text-muted-foreground mt-1">
              External earth loop impedance (typical: 0.35Ω for TN-S, 0.8Ω for TT)
            </p>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Special Requirements</Label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {specialRequirements.map((requirement) => (
                <div key={requirement.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={requirement.id}
                    checked={(planData.specialRequirements || []).includes(requirement.id)}
                    onCheckedChange={(checked) => 
                      handleSpecialRequirementChange(requirement.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={requirement.id} className="text-sm font-normal">
                    {requirement.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Alert className="bg-blue-500/10 border-blue-500/30">
        <Shield className="h-4 w-4 text-blue-300" />
        <AlertDescription className="text-blue-200">
          <strong>Protection Guidance for {planData.loadType}:</strong><br />
          {getProtectionGuidance()}
        </AlertDescription>
      </Alert>

      {(planData.environmentalConditions === "explosive" || planData.environmentalConditions === "corrosive") && (
        <Alert className="bg-red-500/10 border-red-500/30">
          <AlertTriangle className="h-4 w-4 text-red-300" />
          <AlertDescription className="text-red-200">
            <strong>Hazardous Environment Detected:</strong> Special cable types, enclosures, and certification 
            may be required. Consult DSEAR and ATEX regulations for explosive atmospheres.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EnvironmentStep;
