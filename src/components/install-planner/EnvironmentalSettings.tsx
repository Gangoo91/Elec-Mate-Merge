import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { 
  Thermometer, 
  Cloud, 
  Shield, 
  AlertTriangle, 
  Droplets,
  Wind,
  Zap,
  Map
} from "lucide-react";

interface EnvironmentalSettingsProps {
  settings: any;
  onUpdate: (updates: any) => void;
  installationType: string;
}

const EnvironmentalSettings: React.FC<EnvironmentalSettingsProps> = ({
  settings,
  onUpdate,
  installationType
}) => {
  const updateSetting = (key: string, value: any) => {
    onUpdate({ [key]: value });
  };

  const hazardousAreaOptions = [
    { value: "safe-area", label: "Safe Area (No hazard)", description: "Normal industrial environment" },
    { value: "zone-2", label: "Zone 2 (Gas)", description: "Explosive atmosphere unlikely" },
    { value: "zone-1", label: "Zone 1 (Gas)", description: "Explosive atmosphere occasionally" },
    { value: "zone-0", label: "Zone 0 (Gas)", description: "Explosive atmosphere continuously" },
    { value: "zone-22", label: "Zone 22 (Dust)", description: "Combustible dust unlikely" },
    { value: "zone-21", label: "Zone 21 (Dust)", description: "Combustible dust occasionally" },
    { value: "zone-20", label: "Zone 20 (Dust)", description: "Combustible dust continuously" }
  ];

  const temperatureClassOptions = [
    { value: "T1", label: "T1 (450°C)", description: "Normal temperature equipment" },
    { value: "T2", label: "T2 (300°C)", description: "Moderate temperature" },
    { value: "T3", label: "T3 (200°C)", description: "Lower temperature" },
    { value: "T4", label: "T4 (135°C)", description: "Low temperature" },
    { value: "T5", label: "T5 (100°C)", description: "Very low temperature" },
    { value: "T6", label: "T6 (85°C)", description: "Extremely low temperature" }
  ];

  const ipRatingOptions = [
    { value: "IP20", label: "IP20", description: "Indoor use only" },
    { value: "IP44", label: "IP44", description: "Splash proof" },
    { value: "IP54", label: "IP54", description: "Dust and splash resistant" },
    { value: "IP65", label: "IP65", description: "Dust tight and water jet proof" },
    { value: "IP66", label: "IP66", description: "Dust tight and water jet resistant" },
    { value: "IP67", label: "IP67", description: "Dust tight and water immersion proof" },
    { value: "IP68", label: "IP68", description: "Dust tight and continuous immersion" }
  ];

  const environmentalConditionsOptions = [
    { value: "dry", label: "Dry", description: "Normal dry conditions" },
    { value: "humid", label: "Humid", description: "High humidity environment" },
    { value: "wet", label: "Wet", description: "Water present" },
    { value: "corrosive", label: "Corrosive", description: "Chemical corrosion risk" },
    { value: "dusty", label: "Dusty", description: "Significant dust presence" },
    { value: "vibration", label: "Vibration", description: "Mechanical vibration present" },
    { value: "extreme-cold", label: "Extreme Cold", description: "Below -20°C operation" },
    { value: "extreme-heat", label: "Extreme Heat", description: "Above 60°C operation" }
  ];

  const installationZoneOptions = [
    { value: "indoor-controlled", label: "Indoor Controlled", description: "Climate controlled indoor space" },
    { value: "indoor-uncontrolled", label: "Indoor Uncontrolled", description: "Unheated indoor space" },
    { value: "outdoor-sheltered", label: "Outdoor Sheltered", description: "Covered outdoor area" },
    { value: "outdoor-exposed", label: "Outdoor Exposed", description: "Fully exposed to weather" },
    { value: "underground", label: "Underground", description: "Below ground installation" },
    { value: "underwater", label: "Underwater", description: "Submersible installation" },
    { value: "confined-space", label: "Confined Space", description: "Restricted access area" }
  ];

  return (
    <div className="space-y-6">
      {/* Basic Environmental Settings */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Thermometer className="h-5 w-5 text-elec-yellow" />
            Basic Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="text-sm">Ambient Temperature (°C)</Label>
              <Input
                type="number"
                value={settings.ambientTemperature || 30}
                onChange={(e) => updateSetting('ambientTemperature', Number(e.target.value))}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
            
            <MobileSelectWrapper
              label="Environmental Conditions"
              value={settings.environmentalConditions || "dry"}
              onValueChange={(value) => updateSetting('environmentalConditions', value)}
              options={environmentalConditionsOptions}
            />

            <MobileSelectWrapper
              label="Installation Zone"
              value={settings.installationZone || "indoor-controlled"}
              onValueChange={(value) => updateSetting('installationZone', value)}
              options={installationZoneOptions}
            />
          </div>
        </CardContent>
      </Card>

      {/* Hazardous Area Classification */}
      <Card className="border-orange-500/20 bg-orange-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Hazardous Area Classification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileSelectWrapper
            label="Hazardous Area Zone"
            value={settings.hazardousAreaClassification || "safe-area"}
            onValueChange={(value) => updateSetting('hazardousAreaClassification', value)}
            options={hazardousAreaOptions}
          />

          {settings.hazardousAreaClassification && 
           settings.hazardousAreaClassification !== "safe-area" && (
            <>
              <MobileSelectWrapper
                label="Temperature Class"
                value={settings.temperatureClass || "T3"}
                onValueChange={(value) => updateSetting('temperatureClass', value)}
                options={temperatureClassOptions}
              />

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-md p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-300">Explosion Protection Required</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All equipment must be ATEX/IECEx certified for this zone classification.
                  Specialist installation methods and cables required.
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weather Protection */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Cloud className="h-5 w-5 text-blue-500" />
            Weather Protection & IP Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MobileSelectWrapper
            label="IP Rating Required"
            value={settings.ipRating || "IP20"}
            onValueChange={(value) => updateSetting('ipRating', value)}
            options={ipRatingOptions}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">UV Exposure</Label>
              <Button
                variant={settings.uvExposure ? "default" : "outline"}
                size="sm"
                className="w-full mt-1"
                onClick={() => updateSetting('uvExposure', !settings.uvExposure)}
              >
                {settings.uvExposure ? "Yes" : "No"}
              </Button>
            </div>
            
            <div>
              <Label className="text-sm">Salt Spray</Label>
              <Button
                variant={settings.saltSprayExposure ? "default" : "outline"}
                size="sm"
                className="w-full mt-1"
                onClick={() => updateSetting('saltSprayExposure', !settings.saltSprayExposure)}
              >
                {settings.saltSprayExposure ? "Yes" : "No"}
              </Button>
            </div>
          </div>

          {(settings.uvExposure || settings.saltSprayExposure) && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-300">Enhanced Protection Required</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Corrosion-resistant materials and enhanced sealing required.
                Consider marine-grade equipment and additional protective measures.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Extreme Conditions */}
      <Card className="border-red-500/20 bg-red-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Wind className="h-5 w-5 text-red-500" />
            Extreme Environmental Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Min Temp (°C)</Label>
              <Input
                type="number"
                value={settings.minimumTemperature || -10}
                onChange={(e) => updateSetting('minimumTemperature', Number(e.target.value))}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
            
            <div>
              <Label className="text-sm">Max Temp (°C)</Label>
              <Input
                type="number"
                value={settings.maximumTemperature || 60}
                onChange={(e) => updateSetting('maximumTemperature', Number(e.target.value))}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm">Altitude (m)</Label>
              <Input
                type="number"
                value={settings.altitude || 0}
                onChange={(e) => updateSetting('altitude', Number(e.target.value))}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
            
            <div>
              <Label className="text-sm">Humidity (%)</Label>
              <Input
                type="number"
                value={settings.humidity || 65}
                onChange={(e) => updateSetting('humidity', Number(e.target.value))}
                className="bg-elec-dark border-elec-yellow/30"
              />
            </div>
          </div>

          {(settings.altitude > 2000 || settings.humidity > 85 || 
            settings.minimumTemperature < -20 || settings.maximumTemperature > 60) && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-red-300">Extreme Conditions Detected</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Special equipment and installation methods required. Consider derating factors
                and enhanced protection measures.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Installation-Specific Factors */}
      {(installationType === "marine-offshore" || installationType === "mining" || 
        installationType === "hazardous-areas") && (
        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-5 w-5 text-purple-500" />
              Industry-Specific Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {installationType === "marine-offshore" && (
              <div className="space-y-2">
                <Badge variant="outline" className="border-blue-400/30 text-blue-400">
                  Marine Environment
                </Badge>
                <p className="text-xs text-muted-foreground">
                  • Marine-grade cables and equipment required<br/>
                  • Enhanced corrosion protection<br/>
                  • Vibration-resistant installations<br/>
                  • Emergency shutdown systems
                </p>
              </div>
            )}
            
            {installationType === "mining" && (
              <div className="space-y-2">
                <Badge variant="outline" className="border-orange-400/30 text-orange-400">
                  Mining Environment
                </Badge>
                <p className="text-xs text-muted-foreground">
                  • Flame-retardant cables required<br/>
                  • Enhanced mechanical protection<br/>
                  • Dust and moisture sealing<br/>
                  • Emergency communication systems
                </p>
              </div>
            )}
            
            {installationType === "hazardous-areas" && (
              <div className="space-y-2">
                <Badge variant="outline" className="border-red-400/30 text-red-400">
                  Hazardous Area Requirements
                </Badge>
                <p className="text-xs text-muted-foreground">
                  • ATEX/IECEx certified equipment only<br/>
                  • Intrinsically safe circuits where applicable<br/>
                  • Explosion-proof enclosures<br/>
                  • Specialized cable glands and terminations
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Environmental Summary */}
      <Card className="border-green-500/20 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Map className="h-5 w-5 text-green-500" />
            Environmental Impact Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Derating Factor:</span>
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                {((settings.ambientTemperature > 30 ? 0.9 : 1.0) * 
                  (settings.altitude > 1000 ? 0.95 : 1.0) * 
                  (settings.humidity > 85 ? 0.9 : 1.0)).toFixed(2)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Protection Level:</span>
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                {settings.ipRating || "IP20"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Installation Complexity:</span>
              <Badge variant="outline" className="border-green-400/30 text-green-400">
                {settings.hazardousAreaClassification !== "safe-area" ? "High" : 
                 settings.environmentalConditions === "corrosive" ? "Medium" : "Standard"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentalSettings;