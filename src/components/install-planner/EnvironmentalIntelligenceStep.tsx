import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { InstallPlanData } from "./types";
import { MapPin, Thermometer, Shield, AlertTriangle, Zap, Building, Trees, Gauge } from "lucide-react";

interface EnvironmentalIntelligenceStepProps {
  planData: InstallPlanData;
  updatePlanData: (updates: Partial<InstallPlanData>) => void;
}

const EnvironmentalIntelligenceStep = ({ planData, updatePlanData }: EnvironmentalIntelligenceStepProps) => {
  
  // Smart environmental analysis
  const getEnvironmentalProfile = () => {
    const profiles = {
      "indoor-domestic": {
        icon: <Building className="h-5 w-5" />,
        color: "green",
        description: "Controlled indoor environment",
        ambientTemp: 20,
        recommendedCables: ["pvc-twin-earth"],
        installationMethods: ["clipped-direct", "in-conduit"]
      },
      "outdoor-exposed": {
        icon: <Trees className="h-5 w-5" />,
        color: "amber",
        description: "Weather exposed outdoor installation",
        ambientTemp: 30,
        recommendedCables: ["swa-xlpe"],
        installationMethods: ["underground", "clipped-direct"]
      },
      "underground": {
        icon: <MapPin className="h-5 w-5" />,
        color: "blue",
        description: "Underground or buried installation",
        ambientTemp: 20,
        recommendedCables: ["swa-xlpe"],
        installationMethods: ["underground"]
      },
      "fire-critical": {
        icon: <Shield className="h-5 w-5" />,
        color: "red",
        description: "Fire performance critical area",
        ambientTemp: 30,
        recommendedCables: ["xlpe-lsoh", "micc"],
        installationMethods: ["clipped-direct", "in-trunking"]
      },
      "high-temperature": {
        icon: <Thermometer className="h-5 w-5" />,
        color: "orange",
        description: "High temperature environment",
        ambientTemp: 50,
        recommendedCables: ["micc", "xlpe-lsoh"],
        installationMethods: ["clipped-direct", "cable-tray"]
      },
      "industrial": {
        icon: <Zap className="h-5 w-5" />,
        color: "purple",
        description: "Industrial environment",
        ambientTemp: 35,
        recommendedCables: ["swa-xlpe", "xlpe-lsoh"],
        installationMethods: ["cable-tray", "in-trunking"]
      }
    };
    
    return profiles[planData.environmentalConditions as keyof typeof profiles] || profiles["indoor-domestic"];
  };

  const environmentalOptions = [
    { value: "indoor-domestic", label: "Indoor Domestic", description: "Standard indoor home/office environment" },
    { value: "outdoor-exposed", label: "Outdoor Exposed", description: "Weather exposed installation" },
    { value: "underground", label: "Underground", description: "Buried or ducted underground" },
    { value: "fire-critical", label: "Fire Critical Area", description: "Escape routes, public areas" },
    { value: "high-temperature", label: "High Temperature", description: "Plant rooms, near heat sources" },
    { value: "industrial", label: "Industrial", description: "Factory, workshop environment" }
  ];

  const currentProfile = getEnvironmentalProfile();

  // Auto-update related fields when environment changes
  const handleEnvironmentChange = (value: string) => {
    const profile = getEnvironmentalProfile();
    updatePlanData({ 
      environmentalConditions: value,
      ambientTemperature: profile.ambientTemp,
      // Let the system auto-select cable type and installation method
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Environmental Intelligence</h3>
        <p className="text-sm text-muted-foreground">
          Tell us about your installation environment and we'll recommend the optimal cable and installation method.
        </p>
      </div>

      {/* Environmental Profile Selection */}
      <MobileSelectWrapper
        label="Installation Environment"
        placeholder="Select installation environment"
        value={planData.environmentalConditions || ""}
        onValueChange={handleEnvironmentChange}
        options={environmentalOptions.map(option => ({
          value: option.value,
          label: option.label
        }))}
        hint={planData.environmentalConditions ? 
          environmentalOptions.find(o => o.value === planData.environmentalConditions)?.description || "Smart recommendations will be applied" 
          : "This determines cable type and installation method recommendations"}
      />

      {/* Environmental Profile Card */}
      {planData.environmentalConditions && (
        <Card className={`bg-gradient-to-r from-${currentProfile.color}-500/10 to-${currentProfile.color}-600/10 border border-${currentProfile.color}-500/30 rounded-xl`}>
          <CardHeader className="pb-4">
            <CardTitle className={`text-${currentProfile.color}-300 flex items-center gap-3`}>
              <div className={`p-2 bg-${currentProfile.color}-500/20 rounded-lg`}>
                {currentProfile.icon}
              </div>
              <div>
                <div className="text-lg">Environmental Profile</div>
                <div className={`text-sm font-normal text-${currentProfile.color}-200/80`}>
                  {currentProfile.description}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-4 bg-${currentProfile.color}-500/10 rounded-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4" />
                  <span className="text-sm font-medium">Design Temperature</span>
                </div>
                <p className={`text-lg font-bold text-${currentProfile.color}-300`}>
                  {currentProfile.ambientTemp}°C
                </p>
              </div>
              
              <div className={`p-4 bg-${currentProfile.color}-500/10 rounded-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="h-4 w-4" />
                  <span className="text-sm font-medium">Temperature Rating</span>
                </div>
                <p className={`text-lg font-bold text-${currentProfile.color}-300`}>
                  {currentProfile.recommendedCables.includes("micc") ? "250°C" :
                   currentProfile.recommendedCables.includes("xlpe-lsoh") ? "90°C" :
                   currentProfile.recommendedCables.includes("swa-xlpe") ? "90°C" : "70°C"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium mb-2 block">Recommended Cable Types:</span>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.recommendedCables.map((cable, index) => (
                    <Badge key={index} variant="outline" className={`text-${currentProfile.color}-300 border-${currentProfile.color}-500/30`}>
                      {cable === "pvc-twin-earth" ? "PVC Twin & Earth" :
                       cable === "xlpe-lsoh" ? "XLPE-LSOH" :
                       cable === "swa-xlpe" ? "SWA XLPE" :
                       cable === "micc" ? "MICC" : cable.toUpperCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-sm font-medium mb-2 block">Suitable Installation Methods:</span>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.installationMethods.map((method, index) => (
                    <Badge key={index} variant="outline" className={`text-${currentProfile.color}-300 border-${currentProfile.color}-500/30`}>
                      {method.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Special Requirements Detection */}
      {planData.environmentalConditions === "fire-critical" && (
        <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-red-300 flex items-center gap-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg">Fire Performance Requirements</div>
                <div className="text-sm font-normal text-red-200/80">BS 7671 Section 527</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-red-200">LSOH (Low Smoke Zero Halogen) cables required for public escape routes</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-red-200">Fire-resistant cables may be required for emergency circuits</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-red-200">Additional fire stopping and compartmentation required</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* High Temperature Warning */}
      {planData.ambientTemperature > 40 && (
        <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-orange-300 flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <Thermometer className="h-5 w-5" />
              </div>
              <div>
                <div className="text-lg">High Temperature Detection</div>
                <div className="text-sm font-normal text-orange-200/80">{planData.ambientTemperature}°C Ambient</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-orange-200">Temperature derating factors will significantly reduce cable capacity</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-orange-200">Consider XLPE (90°C) or MICC (250°C) cables for high temperature areas</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-orange-200">Ensure adequate ventilation and spacing from heat sources</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnvironmentalIntelligenceStep;