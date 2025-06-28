
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lightbulb } from "lucide-react";

const EmergencyLightingCalculator = () => {
  const [areaType, setAreaType] = useState("");
  const [floorArea, setFloorArea] = useState("");
  const [exitRoutes, setExitRoutes] = useState("");
  const [result, setResult] = useState<{
    luminaires: number;
    spacing: number;
    batteryCapacity: number;
    testingSchedule: string;
  } | null>(null);

  const calculateEmergencyLighting = () => {
    if (!areaType || !floorArea || !exitRoutes) return;

    const area = parseFloat(floorArea);
    const routes = parseFloat(exitRoutes);
    
    // BS 5266 requirements (simplified)
    const requirements: { [key: string]: { lux: number, spacing: number } } = {
      'open-area': { lux: 0.5, spacing: 60 },
      'escape-route': { lux: 1.0, spacing: 30 },
      'high-risk': { lux: 15, spacing: 15 },
      'stairway': { lux: 1.0, spacing: 20 }
    };
    
    const req = requirements[areaType] || { lux: 1.0, spacing: 30 };
    const luminaires = Math.ceil(area / (req.spacing * req.spacing)) + routes;
    const batteryCapacity = luminaires * 8; // 8Ah typical per luminaire
    
    setResult({
      luminaires,
      spacing: req.spacing,
      batteryCapacity,
      testingSchedule: "Daily: Function test, Monthly: 30min test, Annual: 3hr test"
    });
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Emergency Lighting Calculator</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Calculate emergency lighting requirements per BS 5266
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="area-type">Area Type</Label>
              <Select value={areaType} onValueChange={setAreaType}>
                <SelectTrigger id="area-type">
                  <SelectValue placeholder="Select area type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open-area">Open Area (0.5 lux)</SelectItem>
                  <SelectItem value="escape-route">Escape Route (1.0 lux)</SelectItem>
                  <SelectItem value="high-risk">High Risk Area (15 lux)</SelectItem>
                  <SelectItem value="stairway">Stairway (1.0 lux)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor-area">Floor Area (m²)</Label>
              <input
                id="floor-area"
                type="number"
                value={floorArea}
                onChange={(e) => setFloorArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exit-routes">Number of Exit Routes</Label>
              <input
                id="exit-routes"
                type="number"
                value={exitRoutes}
                onChange={(e) => setExitRoutes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. 2"
              />
            </div>

            <Button onClick={calculateEmergencyLighting} className="w-full">
              Calculate Emergency Lighting
            </Button>
          </div>

          <div className="space-y-4">
            {result ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-300 text-lg">Emergency Lighting Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-green-200">Luminaires Required</div>
                      <div className="text-green-300 font-mono text-xl font-bold">{result.luminaires}</div>
                    </div>
                    <div>
                      <div className="text-green-200">Max Spacing</div>
                      <div className="text-green-300 font-mono text-xl font-bold">{result.spacing}m</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-green-200 text-sm">Battery Capacity</div>
                    <div className="text-green-300 font-mono text-lg">{result.batteryCapacity} Ah</div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                    <div className="text-blue-300 text-sm font-medium">Testing Schedule</div>
                    <div className="text-blue-200 text-xs mt-1">{result.testingSchedule}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-elec-yellow/20 bg-elec-yellow/5">
                <CardContent className="pt-4">
                  <div className="text-center text-elec-yellow/80">
                    <Lightbulb className="h-8 w-8 mx-auto mb-2" />
                    <p>Enter area details to calculate emergency lighting</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyLightingCalculator;
