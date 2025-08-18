
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Variable, Lightbulb, Copy, Calculator } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/calc-utils";

// Room type presets with recommended lux levels
const ROOM_PRESETS = {
  office: { name: "Office/Workspace", lux: 500, description: "General office work" },
  meeting: { name: "Meeting Room", lux: 300, description: "Conference and meetings" },
  corridor: { name: "Corridor/Hallway", lux: 100, description: "Navigation areas" },
  warehouse: { name: "Warehouse", lux: 200, description: "General storage areas" },
  workshop: { name: "Workshop", lux: 750, description: "Detailed manual work" },
  classroom: { name: "Classroom", lux: 500, description: "Educational spaces" },
  retail: { name: "Retail Shop", lux: 750, description: "Customer areas" },
  kitchen: { name: "Kitchen", lux: 500, description: "Food preparation" },
  bathroom: { name: "Bathroom", lux: 200, description: "General use" },
  stairwell: { name: "Stairwell", lux: 150, description: "Safety lighting" }
};

const LumenCalculator = () => {
  const [calculationType, setCalculationType] = useState<"lux-to-lumens" | "lumens-to-lux" | "fixtures-needed">("lux-to-lumens");
  const [area, setArea] = useState("");
  const [lux, setLux] = useState("");
  const [lumens, setLumens] = useState("");
  const [fixtureOutput, setFixtureOutput] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!area || parseFloat(area) <= 0) {
      newErrors.area = "Valid area is required";
    }
    
    if (calculationType === "lux-to-lumens") {
      if (!lux || parseFloat(lux) <= 0) {
        newErrors.lux = "Valid lux value is required";
      }
    } else if (calculationType === "lumens-to-lux") {
      if (!lumens || parseFloat(lumens) <= 0) {
        newErrors.lumens = "Valid lumens value is required";
      }
    } else if (calculationType === "fixtures-needed") {
      if (!lux || parseFloat(lux) <= 0) {
        newErrors.lux = "Valid lux value is required";
      }
      if (!fixtureOutput || parseFloat(fixtureOutput) <= 0) {
        newErrors.fixtureOutput = "Valid fixture output is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;
    
    const areaVal = parseFloat(area);
    
    if (calculationType === "lux-to-lumens") {
      const luxVal = parseFloat(lux);
      const calculatedLumens = luxVal * areaVal;
      setResult(`${calculatedLumens.toFixed(0)} lumens`);
      
      // Add efficiency info
      const efficacyInfo = `For LED lighting (100+ lm/W), approximately ${(calculatedLumens / 100).toFixed(1)}W power required`;
      setAdditionalInfo(efficacyInfo);
      
    } else if (calculationType === "lumens-to-lux") {
      const lumensVal = parseFloat(lumens);
      const calculatedLux = lumensVal / areaVal;
      setResult(`${calculatedLux.toFixed(1)} lux`);
      
      // Add compliance info
      let complianceInfo = "Illuminance level: ";
      if (calculatedLux < 100) complianceInfo += "Below minimum for most tasks";
      else if (calculatedLux < 300) complianceInfo += "Suitable for basic navigation";
      else if (calculatedLux < 500) complianceInfo += "Adequate for general work";
      else if (calculatedLux < 750) complianceInfo += "Good for detailed tasks";
      else complianceInfo += "Excellent for precision work";
      setAdditionalInfo(complianceInfo);
      
    } else if (calculationType === "fixtures-needed") {
      const luxVal = parseFloat(lux);
      const fixtureVal = parseFloat(fixtureOutput);
      const totalLumensNeeded = luxVal * areaVal;
      const fixturesNeeded = Math.ceil(totalLumensNeeded / fixtureVal);
      
      setResult(`${fixturesNeeded} fixtures`);
      setAdditionalInfo(`Total lumens needed: ${totalLumensNeeded.toFixed(0)} lm | Power: ~${(totalLumensNeeded / 100).toFixed(1)}W`);
    }
  };

  const resetCalculator = () => {
    setArea("");
    setLux("");
    setLumens("");
    setFixtureOutput("");
    setSelectedRoom("");
    setResult(null);
    setAdditionalInfo(null);
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleRoomPreset = (roomKey: string) => {
    const preset = ROOM_PRESETS[roomKey as keyof typeof ROOM_PRESETS];
    if (preset) {
      setLux(preset.lux.toString());
      setSelectedRoom(roomKey);
      clearError('lux');
    }
  };

  const copyResult = async () => {
    if (result) {
      const copyText = `Lighting Calculation Result: ${result}${additionalInfo ? ' | ' + additionalInfo : ''}`;
      const success = await copyToClipboard(copyText);
      // You could add a toast notification here if you have one
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Professional Lighting Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate lighting requirements with room presets and fixture planning
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Calculation Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="calculation-type">Calculation Type</Label>
            <Select
              value={calculationType}
              onValueChange={(value) => setCalculationType(value as typeof calculationType)}
            >
              <SelectTrigger id="calculation-type" className="bg-elec-dark border-elec-yellow/20">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                <SelectItem value="lux-to-lumens">Lux to Lumens</SelectItem>
                <SelectItem value="lumens-to-lux">Lumens to Lux</SelectItem>
                <SelectItem value="fixtures-needed">Fixtures Required</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Room Presets */}
          {(calculationType === "lux-to-lumens" || calculationType === "fixtures-needed") && (
            <div className="space-y-2">
              <Label htmlFor="room-preset">Room Type (Optional Preset)</Label>
              <Select
                value={selectedRoom}
                onValueChange={handleRoomPreset}
              >
                <SelectTrigger id="room-preset" className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select room type for recommended lux" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  {Object.entries(ROOM_PRESETS).map(([key, preset]) => (
                    <SelectItem key={key} value={key}>
                      {preset.name} ({preset.lux} lx)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedRoom && (
                <div className="text-xs text-elec-light/70">
                  {ROOM_PRESETS[selectedRoom as keyof typeof ROOM_PRESETS].description}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              {/* Area Input */}
              <div className="space-y-2">
                <Label htmlFor="area">Area (m²)</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter area in square metres"
                  value={area}
                  onChange={(e) => {
                    setArea(e.target.value);
                    clearError('area');
                  }}
                  className={`bg-elec-dark border-elec-yellow/20 ${errors.area ? "border-destructive" : ""}`}
                />
                {errors.area && <p className="text-xs text-destructive">{errors.area}</p>}
              </div>

              {/* Conditional Inputs based on calculation type */}
              {calculationType === "lux-to-lumens" && (
                <div className="space-y-2">
                  <Label htmlFor="lux">Required Illuminance (lx)</Label>
                  <Input
                    id="lux"
                    type="number"
                    placeholder="Enter lux value"
                    value={lux}
                    onChange={(e) => {
                      setLux(e.target.value);
                      clearError('lux');
                    }}
                    className={`bg-elec-dark border-elec-yellow/20 ${errors.lux ? "border-destructive" : ""}`}
                  />
                  {errors.lux && <p className="text-xs text-destructive">{errors.lux}</p>}
                </div>
              )}

              {calculationType === "lumens-to-lux" && (
                <div className="space-y-2">
                  <Label htmlFor="lumens">Total Light Output (lm)</Label>
                  <Input
                    id="lumens"
                    type="number"
                    placeholder="Enter lumens value"
                    value={lumens}
                    onChange={(e) => {
                      setLumens(e.target.value);
                      clearError('lumens');
                    }}
                    className={`bg-elec-dark border-elec-yellow/20 ${errors.lumens ? "border-destructive" : ""}`}
                  />
                  {errors.lumens && <p className="text-xs text-destructive">{errors.lumens}</p>}
                </div>
              )}

              {calculationType === "fixtures-needed" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="lux">Required Illuminance (lx)</Label>
                    <Input
                      id="lux"
                      type="number"
                      placeholder="Enter lux value"
                      value={lux}
                      onChange={(e) => {
                        setLux(e.target.value);
                        clearError('lux');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.lux ? "border-destructive" : ""}`}
                    />
                    {errors.lux && <p className="text-xs text-destructive">{errors.lux}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fixture-output">Fixture Output (lm each)</Label>
                    <Input
                      id="fixture-output"
                      type="number"
                      placeholder="Enter lumens per fixture"
                      value={fixtureOutput}
                      onChange={(e) => {
                        setFixtureOutput(e.target.value);
                        clearError('fixtureOutput');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.fixtureOutput ? "border-destructive" : ""}`}
                    />
                    {errors.fixtureOutput && <p className="text-xs text-destructive">{errors.fixtureOutput}</p>}
                  </div>
                </>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 mt-6">
                <Button 
                  onClick={calculate} 
                  className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetCalculator} 
                  className="w-full border-elec-yellow/20 hover:bg-elec-yellow/10"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex flex-col space-y-4">
              <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center min-h-48">
                {result ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-elec-yellow" />
                      <span className="text-elec-yellow text-lg font-medium">Result</span>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-sm text-muted-foreground">
                        {calculationType === "lux-to-lumens" && "Total Lumens Required:"}
                        {calculationType === "lumens-to-lux" && "Illuminance Level:"}
                        {calculationType === "fixtures-needed" && "Fixtures Required:"}
                      </div>
                      <div className="text-3xl font-bold text-elec-yellow mb-3">{result}</div>
                      {additionalInfo && (
                        <Badge variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                          {additionalInfo}
                        </Badge>
                      )}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyResult}
                      className="mt-4 border-elec-yellow/20 hover:bg-elec-yellow/10"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Result
                    </Button>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    <Variable className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter values to calculate</p>
                    <p className="text-xs mt-1">
                      {calculationType === "lux-to-lumens" && "lumens required"}
                      {calculationType === "lumens-to-lux" && "illuminance level"}
                      {calculationType === "fixtures-needed" && "number of fixtures"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Panel */}
          <Alert className="bg-elec-dark/50 border-elec-yellow/20">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h3 className="font-medium text-elec-yellow">Professional Lighting Guide</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-elec-light/80">
                  <div>
                    <p><span className="text-elec-yellow">Lux (lx):</span> Illuminance per square metre</p>
                    <p><span className="text-elec-yellow">Lumen (lm):</span> Total light output</p>
                    <p><span className="text-elec-yellow">Formula:</span> Lumens = Lux × Area</p>
                  </div>
                  <div>
                    <p><span className="text-elec-yellow">Typical Levels:</span></p>
                    <p>Offices: 300-500 lx | Workshops: 750 lx</p>
                    <p>Corridors: 100 lx | Detailed work: 1000+ lx</p>
                  </div>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default LumenCalculator;
