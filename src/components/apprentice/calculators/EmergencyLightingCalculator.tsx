import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Lightbulb, Calculator, RotateCcw, Clock, Battery, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const EmergencyLightingCalculator = () => {
  const [floorArea, setFloorArea] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("3");
  const [occupancyType, setOccupancyType] = useState<string>("office");
  const [exitRoutes, setExitRoutes] = useState<string>("2");
  const [emergencyDuration, setEmergencyDuration] = useState<string>("3");
  const [fixtureType, setFixtureType] = useState<string>("led-standard");
  const [result, setResult] = useState<{
    totalLuminaires: number;
    escapeRouteLights: number;
    openAreaLights: number;
    totalPower: number;
    batteryCapacity: number;
    cableSize: string;
    complianceNotes: string[];
  } | null>(null);

  const occupancyTypes = {
    office: { lux: 1, spacing: 20, description: "Office/Commercial" },
    retail: { lux: 1, spacing: 15, description: "Retail/Shopping" },
    industrial: { lux: 0.5, spacing: 25, description: "Industrial/Warehouse" },
    hospital: { lux: 5, spacing: 10, description: "Hospital/Healthcare" },
    school: { lux: 1, spacing: 18, description: "School/Educational" },
    hotel: { lux: 1, spacing: 20, description: "Hotel/Accommodation" }
  };

  const fixtureTypes = {
    "led-standard": { watts: 3, lumens: 200, description: "LED Standard (3W)" },
    "led-high": { watts: 5, lumens: 400, description: "LED High Output (5W)" },
    "fluorescent": { watts: 8, lumens: 320, description: "Fluorescent (8W)" },
    "halogen": { watts: 20, lumens: 200, description: "Halogen (20W)" }
  };

  const calculateEmergencyLighting = () => {
    const area = parseFloat(floorArea);
    const height = parseFloat(ceilingHeight);
    const exits = parseInt(exitRoutes);
    const duration = parseFloat(emergencyDuration);

    if (area > 0) {
      const occupancy = occupancyTypes[occupancyType as keyof typeof occupancyTypes];
      const fixture = fixtureTypes[fixtureType as keyof typeof fixtureTypes];

      // Calculate escape route lighting (every 2m along routes)
      const routeLength = Math.sqrt(area) * exits * 1.5; // Estimated route length
      const escapeRouteLights = Math.ceil(routeLength / 2); // Every 2m

      // Calculate open area lighting based on spacing
      const openAreaLights = Math.ceil(area / (occupancy.spacing * occupancy.spacing));

      const totalLuminaires = escapeRouteLights + openAreaLights;
      const totalPower = totalLuminaires * fixture.watts;

      // Battery capacity calculation (Ah at 12V with 20% safety margin)
      const batteryCapacity = Math.ceil((totalPower * duration / 12) * 1.2);

      // Cable sizing based on total current
      const totalCurrent = totalPower / 12; // Assuming 12V emergency lighting
      let cableSize = "";
      if (totalCurrent <= 6) cableSize = "1.0mm²";
      else if (totalCurrent <= 10) cableSize = "1.5mm²";
      else if (totalCurrent <= 16) cableSize = "2.5mm²";
      else if (totalCurrent <= 25) cableSize = "4.0mm²";
      else cableSize = "6.0mm² or larger";

      // Compliance notes
      const complianceNotes = [
        "BS 5266-1 Emergency lighting requirements",
        "Minimum 1 lux on escape routes",
        "0.2 lux minimum in open areas",
        "Monthly function tests required",
        "Annual full duration tests mandatory"
      ];

      if (occupancyType === "hospital") {
        complianceNotes.push("HTM 06-02 specialist healthcare requirements");
      }

      setResult({
        totalLuminaires,
        escapeRouteLights,
        openAreaLights,
        totalPower,
        batteryCapacity,
        cableSize,
        complianceNotes
      });
    }
  };

  const reset = () => {
    setFloorArea("");
    setCeilingHeight("3");
    setOccupancyType("office");
    setExitRoutes("2");
    setEmergencyDuration("3");
    setFixtureType("led-standard");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Emergency Lighting Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate emergency lighting requirements according to BS 5266-1 and fire safety regulations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Floor Area (m²)"
              type="number"
              value={floorArea}
              onChange={(e) => setFloorArea(e.target.value)}
              placeholder="e.g., 500"
              unit="m²"
            />

            <MobileInput
              label="Ceiling Height (m)"
              type="number"
              step="0.1"
              value={ceilingHeight}
              onChange={(e) => setCeilingHeight(e.target.value)}
              placeholder="e.g., 3.0"
              unit="m"
            />

            <MobileSelect
              label="Occupancy Type"
              placeholder="Select occupancy type"
              value={occupancyType}
              onValueChange={setOccupancyType}
              options={Object.entries(occupancyTypes).map(([key, type]) => ({ value: key, label: type.description }))}
            />

            <MobileInput
              label="Number of Exit Routes"
              type="number"
              min="1"
              value={exitRoutes}
              onChange={(e) => setExitRoutes(e.target.value)}
              placeholder="e.g., 2"
            />

            <MobileSelect
              label="Emergency Duration"
              placeholder="Select duration"
              value={emergencyDuration}
              onValueChange={setEmergencyDuration}
              options={[
                { value: "1", label: "1 Hour (Occupied premises)" },
                { value: "3", label: "3 Hours (Unoccupied premises)" },
                { value: "24", label: "24 Hours (High risk areas)" }
              ]}
            />

            <MobileSelect
              label="Fixture Type"
              placeholder="Select fixture type"
              value={fixtureType}
              onValueChange={setFixtureType}
              options={Object.entries(fixtureTypes).map(([key, fixture]) => ({ value: key, label: fixture.description }))}
            />

            <div className="flex gap-2">
              <MobileButton 
                onClick={calculateEmergencyLighting}
                variant="elec"
                size="wide"
                disabled={!floorArea}
                className="flex-1"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Emergency Lighting
              </MobileButton>
              <MobileButton 
                onClick={reset} 
                variant="outline" 
                size="default"
              >
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[400px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Emergency Lighting Design</h3>
                    <Badge variant="secondary" className="mb-4">
                      BS 5266-1 Compliant
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Total Luminaires:</span>
                      <div className="font-mono text-elec-yellow text-lg">{result.totalLuminaires}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-muted-foreground">Escape Route:</span>
                        <div className="font-mono text-elec-yellow">{result.escapeRouteLights}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Open Area:</span>
                        <div className="font-mono text-elec-yellow">{result.openAreaLights}</div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <span className="text-muted-foreground">Total System Power:</span>
                      <div className="font-mono text-elec-yellow">{result.totalPower} W</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4 text-blue-400" />
                        <span className="text-muted-foreground">Battery Capacity:</span>
                      </div>
                      <div className="font-mono text-elec-yellow pl-6">{result.batteryCapacity} Ah (12V)</div>
                    </div>

                    <div>
                      <span className="text-muted-foreground">Recommended Cable:</span>
                      <div className="font-mono text-elec-yellow">{result.cableSize}</div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-green-400" />
                        <span className="font-medium">Compliance Notes:</span>
                      </div>
                      <ul className="space-y-1 pl-6">
                        {result.complianceNotes.map((note, index) => (
                          <li key={index} className="text-xs text-muted-foreground">• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter building details to calculate emergency lighting requirements
                </div>
              )}
            </div>

            <Alert className="border-orange-500/20 bg-orange-500/10">
              <Info className="h-4 w-4 text-orange-500" />
              <AlertDescription className="text-orange-200">
                This calculation provides initial sizing. Professional emergency lighting design 
                should consider escape route layouts, risk assessments, and local authority requirements.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyLightingCalculator;