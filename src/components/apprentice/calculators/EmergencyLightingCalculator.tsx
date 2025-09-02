import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelectWrapper as MobileSelect } from "@/components/ui/mobile-select-wrapper";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Lightbulb, Calculator, RotateCcw, Zap, Building, Route } from "lucide-react";
import { 
  calculateEmergencyLighting, 
  occupancyProfiles, 
  fixtureProfiles,
  EmergencyLightingInputs 
} from "@/lib/emergency-lighting";
import EmergencyLightingGuidance from "./emergency/EmergencyLightingGuidance";

const EmergencyLightingCalculator = () => {
  // Core inputs
  const [floorArea, setFloorArea] = useState<string>("");
  const [ceilingHeight, setCeilingHeight] = useState<string>("3");
  const [occupancyType, setOccupancyType] = useState<string>("office");
  const [exitRoutes, setExitRoutes] = useState<string>("2");
  const [emergencyDuration, setEmergencyDuration] = useState<string>("3");
  const [fixtureType, setFixtureType] = useState<string>("led-standard");
  
  // Advanced inputs
  const [corridorLength, setCorridorLength] = useState<string>("");
  const [corridorWidth, setCorridorWidth] = useState<string>("");
  const [staircaseFlights, setStaircaseFlights] = useState<string>("");
  const [hasHighRiskTasks, setHasHighRiskTasks] = useState<boolean>(false);
  const [hasDisabledAccess, setHasDisabledAccess] = useState<boolean>(false);
  const [buildingHeight, setBuildingHeight] = useState<string>("");
  const [complexLayout, setComplexLayout] = useState<boolean>(false);
  
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const area = parseFloat(floorArea);
    
    if (area > 0) {
      const inputs: EmergencyLightingInputs = {
        floorArea: area,
        ceilingHeight: parseFloat(ceilingHeight),
        occupancyType,
        corridorLength: corridorLength ? parseFloat(corridorLength) : undefined,
        corridorWidth: corridorWidth ? parseFloat(corridorWidth) : undefined,
        staircaseFlights: staircaseFlights ? parseInt(staircaseFlights) : undefined,
        hasHighRiskTasks,
        emergencyDuration: parseFloat(emergencyDuration),
        fixtureType,
        exitRoutes: parseInt(exitRoutes),
        hasDisabledAccess,
        buildingHeight: buildingHeight ? parseFloat(buildingHeight) : undefined,
        complexLayout
      };
      
      const calculationResult = calculateEmergencyLighting(inputs);
      setResult(calculationResult);
    }
  };

  const reset = () => {
    setFloorArea("");
    setCeilingHeight("3");
    setOccupancyType("office");
    setExitRoutes("2");
    setEmergencyDuration("3");
    setFixtureType("led-standard");
    setCorridorLength("");
    setCorridorWidth("");
    setStaircaseFlights("");
    setHasHighRiskTasks(false);
    setHasDisabledAccess(false);
    setBuildingHeight("");
    setComplexLayout(false);
    setResult(null);
  };


  return (
    <div className="space-y-6">
      {/* Input Card */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-elec-yellow/20 rounded-lg">
              <Lightbulb className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-elec-light">Emergency Lighting Calculator</CardTitle>
              <CardDescription className="text-elec-light/70">
                Calculate emergency lighting requirements according to BS 5266-1 and fire safety regulations.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Core Parameters */}
          <div className="space-y-4">
            <h4 className="text-elec-light font-medium flex items-center gap-2">
              <Building className="h-4 w-4 text-elec-yellow" />
              Core Parameters
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileInputWrapper
                label="Floor Area"
                type="number"
                value={floorArea}
                onChange={setFloorArea}
                placeholder="e.g., 500"
                unit="m²"
                icon={<Building className="h-4 w-4" />}
                hint="Total floor area requiring emergency lighting"
              />

              <MobileInputWrapper
                label="Ceiling Height"
                type="number"
                step="0.1"
                value={ceilingHeight}
                onChange={setCeilingHeight}
                placeholder="e.g., 3.0"
                unit="m"
                hint="Average ceiling height for spacing calculations"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MobileSelect
                label="Occupancy Type"
                placeholder="Select occupancy type"
                value={occupancyType}
                onValueChange={setOccupancyType}
                options={Object.entries(occupancyProfiles).map(([key, profile]) => ({
                  value: key,
                  label: profile.description
                }))}
              />

              <MobileInputWrapper
                label="Exit Routes"
                type="number"
                min="1"
                value={exitRoutes}
                onChange={setExitRoutes}
                placeholder="e.g., 2"
                icon={<Route className="h-4 w-4" />}
                hint="Number of primary escape routes"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                options={Object.entries(fixtureProfiles).map(([key, fixture]) => ({
                  value: key,
                  label: fixture.description
                }))}
              />
            </div>
          </div>

          {/* Advanced Parameters */}
          <div className="space-y-4 pt-4 border-t border-elec-gray/20">
            <h4 className="text-elec-light font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-elec-yellow" />
              Advanced Parameters (Optional)
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MobileInputWrapper
                label="Corridor Length"
                type="number"
                step="0.1"
                value={corridorLength}
                onChange={setCorridorLength}
                placeholder="Auto-calculated"
                unit="m"
                hint="Total length of escape route corridors"
              />

              <MobileInputWrapper
                label="Corridor Width"
                type="number"
                step="0.1"
                value={corridorWidth}
                onChange={setCorridorWidth}
                placeholder="Standard width"
                unit="m"
                hint="Average corridor width"
              />

              <MobileInputWrapper
                label="Staircase Flights"
                type="number"
                min="0"
                value={staircaseFlights}
                onChange={setStaircaseFlights}
                placeholder="0"
                hint="Number of staircase flights requiring lighting"
              />
            </div>

            <MobileInputWrapper
              label="Building Height"
              type="number"
              step="0.1"
              value={buildingHeight}
              onChange={setBuildingHeight}
              placeholder="Single storey"
              unit="m"
              hint="Total building height (affects regulations)"
            />

            {/* Boolean Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-elec-gray/20">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-elec-light">High Risk Tasks</Label>
                    <p className="text-xs text-elec-light/60">Areas requiring enhanced lighting levels</p>
                  </div>
                  <Switch 
                    checked={hasHighRiskTasks} 
                    onCheckedChange={setHasHighRiskTasks}
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-elec-gray/20">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-elec-light">Disabled Access</Label>
                    <p className="text-xs text-elec-light/60">Building includes accessible routes</p>
                  </div>
                  <Switch 
                    checked={hasDisabledAccess} 
                    onCheckedChange={setHasDisabledAccess}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-elec-gray/20">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-elec-light">Complex Layout</Label>
                    <p className="text-xs text-elec-light/60">Non-standard or complex building geometry</p>
                  </div>
                  <Switch 
                    checked={complexLayout} 
                    onCheckedChange={setComplexLayout}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <MobileButton 
              onClick={handleCalculate}
              variant="elec"
              size="wide"
              disabled={!floorArea}
              className="sm:flex-1"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Emergency Lighting
            </MobileButton>
            <MobileButton 
              onClick={reset} 
              variant="outline" 
              size="default"
              className="sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </MobileButton>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <EmergencyLightingGuidance 
          result={result}
          inputs={{
            floorArea: parseFloat(floorArea),
            occupancyType,
            emergencyDuration: parseFloat(emergencyDuration),
            fixtureType
          }}
        />
      )}
    </div>
  );
};

export default EmergencyLightingCalculator;