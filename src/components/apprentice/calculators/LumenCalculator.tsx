
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Variable, Lightbulb, Copy, Calculator, ChevronDown, ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
  
  // Advanced calculation factors
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [utilizationFactor, setUtilizationFactor] = useState("0.6"); // UF - typical 0.4-0.8
  const [maintenanceFactor, setMaintenanceFactor] = useState("0.8"); // MF - typical 0.7-0.9
  const [fixtureEfficacy, setFixtureEfficacy] = useState("100"); // lm/W - typical LED 80-150
  const [daylightContribution, setDaylightContribution] = useState("0"); // % reduction 0-50%

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!area || parseFloat(area) <= 0) {
      newErrors.area = "Valid area is required";
    }
    
    // Basic validation
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
    
    // Advanced factors validation (soft warnings)
    if (showAdvanced) {
      const uf = parseFloat(utilizationFactor);
      const mf = parseFloat(maintenanceFactor);
      const efficacy = parseFloat(fixtureEfficacy);
      const daylight = parseFloat(daylightContribution);
      
      if (uf < 0.2 || uf > 1.0) {
        newErrors.utilizationFactor = "UF should be between 0.2-1.0";
      }
      if (mf < 0.5 || mf > 1.0) {
        newErrors.maintenanceFactor = "MF should be between 0.5-1.0";
      }
      if (efficacy < 20 || efficacy > 200) {
        newErrors.fixtureEfficacy = "Efficacy should be between 20-200 lm/W";
      }
      if (daylight < 0 || daylight > 80) {
        newErrors.daylightContribution = "Daylight contribution should be 0-80%";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;
    
    const areaVal = parseFloat(area);
    
    // Get advanced factors with defaults
    const uf = parseFloat(utilizationFactor);
    const mf = parseFloat(maintenanceFactor);
    const efficacy = parseFloat(fixtureEfficacy);
    const daylightReduction = parseFloat(daylightContribution) / 100;
    
    if (calculationType === "lux-to-lumens") {
      const luxVal = parseFloat(lux);
      let calculatedLumens = luxVal * areaVal;
      
      // Apply advanced factors if using advanced mode
      if (showAdvanced) {
        // Account for utilization and maintenance factors
        calculatedLumens = calculatedLumens / (uf * mf);
        // Reduce for daylight contribution
        calculatedLumens = calculatedLumens * (1 - daylightReduction);
      }
      
      setResult(`${calculatedLumens.toFixed(0)} lumens`);
      
      // Enhanced efficiency info with advanced factors
      let efficacyInfo = `For LED lighting (${efficacy} lm/W), approximately ${(calculatedLumens / efficacy).toFixed(1)}W power required`;
      if (showAdvanced) {
        efficacyInfo += ` | UF: ${uf} | MF: ${mf}`;
        if (daylightReduction > 0) {
          efficacyInfo += ` | Daylight: -${(daylightReduction * 100).toFixed(0)}%`;
        }
      }
      setAdditionalInfo(efficacyInfo);
      
    } else if (calculationType === "lumens-to-lux") {
      const lumensVal = parseFloat(lumens);
      let calculatedLux = lumensVal / areaVal;
      
      // Apply advanced factors if using advanced mode
      if (showAdvanced) {
        // Apply utilization and maintenance factors
        calculatedLux = calculatedLux * uf * mf;
        // Add daylight contribution
        calculatedLux = calculatedLux / (1 - daylightReduction);
      }
      
      setResult(`${calculatedLux.toFixed(1)} lux`);
      
      // Add compliance info
      let complianceInfo = "Illuminance level: ";
      if (calculatedLux < 100) complianceInfo += "Below minimum for most tasks";
      else if (calculatedLux < 300) complianceInfo += "Suitable for basic navigation";
      else if (calculatedLux < 500) complianceInfo += "Adequate for general work";
      else if (calculatedLux < 750) complianceInfo += "Good for detailed tasks";
      else complianceInfo += "Excellent for precision work";
      
      if (showAdvanced) {
        complianceInfo += ` | Applied factors: UF ${uf}, MF ${mf}`;
      }
      setAdditionalInfo(complianceInfo);
      
    } else if (calculationType === "fixtures-needed") {
      const luxVal = parseFloat(lux);
      const fixtureVal = parseFloat(fixtureOutput);
      let totalLumensNeeded = luxVal * areaVal;
      
      // Apply advanced factors if using advanced mode
      if (showAdvanced) {
        totalLumensNeeded = totalLumensNeeded / (uf * mf);
        totalLumensNeeded = totalLumensNeeded * (1 - daylightReduction);
      }
      
      const fixturesNeeded = Math.ceil(totalLumensNeeded / fixtureVal);
      
      setResult(`${fixturesNeeded} fixtures`);
      
      let additionalInfoText = `Total lumens needed: ${totalLumensNeeded.toFixed(0)} lm | Power: ~${(totalLumensNeeded / efficacy).toFixed(1)}W`;
      if (showAdvanced && (daylightReduction > 0 || uf !== 0.6 || mf !== 0.8)) {
        additionalInfoText += ` | Professional calculation applied`;
      }
      setAdditionalInfo(additionalInfoText);
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
    // Reset advanced factors to defaults
    setUtilizationFactor("0.6");
    setMaintenanceFactor("0.8");
    setFixtureEfficacy("100");
    setDaylightContribution("0");
    setShowAdvanced(false);
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

              {/* Advanced Options */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-2 h-auto border border-elec-yellow/20 hover:bg-elec-yellow/10"
                  >
                    <span className="text-sm font-medium">Advanced Options</span>
                    {showAdvanced ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="p-4 border border-elec-yellow/10 rounded-md bg-elec-dark/30">
                    <div className="grid grid-cols-1 gap-4">
                      {/* Utilization Factor */}
                      <div className="space-y-2">
                        <Label htmlFor="utilization-factor" className="text-xs">
                          Utilization Factor (UF)
                          <span className="text-elec-light/50 ml-1">0.2-1.0</span>
                        </Label>
                        <Input
                          id="utilization-factor"
                          type="number"
                          step="0.1"
                          min="0.2"
                          max="1.0"
                          placeholder="0.6"
                          value={utilizationFactor}
                          onChange={(e) => {
                            setUtilizationFactor(e.target.value);
                            clearError('utilizationFactor');
                          }}
                          className={`bg-elec-dark border-elec-yellow/20 text-xs ${errors.utilizationFactor ? "border-destructive" : ""}`}
                        />
                        {errors.utilizationFactor && <p className="text-xs text-destructive">{errors.utilizationFactor}</p>}
                        <p className="text-xs text-elec-light/60">Light reaching work plane (room geometry & reflectances)</p>
                      </div>

                      {/* Maintenance Factor */}
                      <div className="space-y-2">
                        <Label htmlFor="maintenance-factor" className="text-xs">
                          Maintenance Factor (MF)
                          <span className="text-elec-light/50 ml-1">0.5-1.0</span>
                        </Label>
                        <Input
                          id="maintenance-factor"
                          type="number"
                          step="0.1"
                          min="0.5"
                          max="1.0"
                          placeholder="0.8"
                          value={maintenanceFactor}
                          onChange={(e) => {
                            setMaintenanceFactor(e.target.value);
                            clearError('maintenanceFactor');
                          }}
                          className={`bg-elec-dark border-elec-yellow/20 text-xs ${errors.maintenanceFactor ? "border-destructive" : ""}`}
                        />
                        {errors.maintenanceFactor && <p className="text-xs text-destructive">{errors.maintenanceFactor}</p>}
                        <p className="text-xs text-elec-light/60">Light depreciation over time (dirt, age)</p>
                      </div>

                      {/* Fixture Efficacy */}
                      <div className="space-y-2">
                        <Label htmlFor="fixture-efficacy" className="text-xs">
                          Fixture Efficacy (lm/W)
                          <span className="text-elec-light/50 ml-1">20-200</span>
                        </Label>
                        <Input
                          id="fixture-efficacy"
                          type="number"
                          min="20"
                          max="200"
                          placeholder="100"
                          value={fixtureEfficacy}
                          onChange={(e) => {
                            setFixtureEfficacy(e.target.value);
                            clearError('fixtureEfficacy');
                          }}
                          className={`bg-elec-dark border-elec-yellow/20 text-xs ${errors.fixtureEfficacy ? "border-destructive" : ""}`}
                        />
                        {errors.fixtureEfficacy && <p className="text-xs text-destructive">{errors.fixtureEfficacy}</p>}
                        <p className="text-xs text-elec-light/60">LED: 80-150, Fluorescent: 60-100, Halogen: 15-25</p>
                      </div>

                      {/* Daylight Contribution */}
                      <div className="space-y-2">
                        <Label htmlFor="daylight-contribution" className="text-xs">
                          Daylight Contribution (%)
                          <span className="text-elec-light/50 ml-1">0-80%</span>
                        </Label>
                        <Input
                          id="daylight-contribution"
                          type="number"
                          min="0"
                          max="80"
                          placeholder="0"
                          value={daylightContribution}
                          onChange={(e) => {
                            setDaylightContribution(e.target.value);
                            clearError('daylightContribution');
                          }}
                          className={`bg-elec-dark border-elec-yellow/20 text-xs ${errors.daylightContribution ? "border-destructive" : ""}`}
                        />
                        {errors.daylightContribution && <p className="text-xs text-destructive">{errors.daylightContribution}</p>}
                        <p className="text-xs text-elec-light/60">Natural light reduction in artificial lighting needs</p>
                      </div>
                    </div>
                    
                    <Alert className="mt-4 bg-elec-yellow/5 border-elec-yellow/20">
                      <AlertDescription className="text-xs text-elec-light/70">
                        <strong className="text-elec-yellow">Pro Tip:</strong> Use UF 0.4-0.6 for most rooms, MF 0.8 for clean environments. 
                        Higher efficacy LEDs reduce power consumption significantly.
                      </AlertDescription>
                    </Alert>
                  </div>
                </CollapsibleContent>
              </Collapsible>

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
