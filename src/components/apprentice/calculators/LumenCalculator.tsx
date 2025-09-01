
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Variable, Lightbulb, Copy, Calculator, ChevronDown, ChevronRight, Info, CheckCircle, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { MobileInput } from "@/components/ui/mobile-input";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
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
  const [inputMode, setInputMode] = useState<"area" | "dimensions">("area");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [lux, setLux] = useState("");
  const [lumens, setLumens] = useState("");
  const [fixtureOutput, setFixtureOutput] = useState("");
  const [mountingHeight, setMountingHeight] = useState("");
  const [workingHeight, setWorkingHeight] = useState("0.85");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Advanced calculation factors
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [utilizationFactor, setUtilizationFactor] = useState("0.6");
  const [maintenanceFactor, setMaintenanceFactor] = useState("0.8");
  const [fixtureEfficacy, setFixtureEfficacy] = useState("100");
  const [daylightContribution, setDaylightContribution] = useState("0");

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Area validation
    const finalArea = inputMode === "area" ? parseFloat(area) : (parseFloat(length) * parseFloat(width));
    if (inputMode === "area") {
      if (!area || parseFloat(area) <= 0) {
        newErrors.area = "Valid area is required";
      }
    } else {
      if (!length || parseFloat(length) <= 0) {
        newErrors.length = "Valid length is required";
      }
      if (!width || parseFloat(width) <= 0) {
        newErrors.width = "Valid width is required";
      }
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
    
    const areaVal = inputMode === "area" ? parseFloat(area) : (parseFloat(length) * parseFloat(width));
    
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
      
      // Calculate spacing suggestion
      const mountHeight = parseFloat(mountingHeight) || 3;
      const workHeight = parseFloat(workingHeight);
      const mountingToWork = mountHeight - workHeight;
      const spacingRatio = mountingToWork * 1.2; // Conservative spacing
      const fixturesPerRow = Math.ceil(Math.sqrt(areaVal) / spacingRatio);
      const totalFixtures = Math.ceil(calculatedLumens / efficacy / 40); // Assume 40W per fixture
      
      // Enhanced efficiency info
      let efficacyInfo = `Power: ${(calculatedLumens / efficacy).toFixed(1)}W`;
      if (mountingHeight) {
        efficacyInfo += ` | Suggested spacing: ${spacingRatio.toFixed(1)}m`;
      }
      efficacyInfo += ` | Est. ${totalFixtures} fixtures`;
      
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
      
      // Calculate spacing and additional details
      const mountHeight = parseFloat(mountingHeight) || 3;
      const workHeight = parseFloat(workingHeight);
      const mountingToWork = mountHeight - workHeight;
      const spacingDistance = mountingToWork * 1.2;
      const totalPower = (totalLumensNeeded / efficacy);
      const annualCost = (totalPower * 0.25 * 2500 * 8760) / 1000; // £0.25/kWh, 25% usage
      
      let additionalInfoText = `Total: ${totalLumensNeeded.toFixed(0)}lm | Power: ${totalPower.toFixed(1)}W | Annual cost: £${annualCost.toFixed(0)}`;
      if (mountingHeight) {
        additionalInfoText += ` | Spacing: ${spacingDistance.toFixed(1)}m`;
      }
      if (showAdvanced && (daylightReduction > 0 || uf !== 0.6 || mf !== 0.8)) {
        additionalInfoText += ` | Pro calc applied`;
      }
      setAdditionalInfo(additionalInfoText);
    }
  };

  const resetCalculator = () => {
    setArea("");
    setLength("");
    setWidth("");
    setLux("");
    setLumens("");
    setFixtureOutput("");
    setMountingHeight("");
    setWorkingHeight("0.85");
    setSelectedRoom("");
    setResult(null);
    setAdditionalInfo(null);
    setErrors({});
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

          <div className="space-y-6">
            {/* Input Section */}
            <div className="space-y-4">
              {/* Area Input Mode Toggle */}
              <div className="space-y-2">
                <Label>Area Input</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={inputMode === "area" ? "default" : "outline"}
                    onClick={() => setInputMode("area")}
                    className="flex-1 text-xs"
                  >
                    Direct Area
                  </Button>
                  <Button
                    type="button"
                    variant={inputMode === "dimensions" ? "default" : "outline"}
                    onClick={() => setInputMode("dimensions")}
                    className="flex-1 text-xs"
                  >
                    Length × Width
                  </Button>
                </div>
              </div>

              {/* Area/Dimension Inputs */}
              <div className="grid grid-cols-1 gap-4">
                {inputMode === "area" ? (
                  <MobileInput
                    label="Area"
                    type="number"
                    placeholder="Enter area"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      clearError('area');
                    }}
                    unit="m²"
                    error={errors.area}
                  />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <MobileInput
                      label="Length"
                      type="number"
                      placeholder="Length"
                      value={length}
                      onChange={(e) => {
                        setLength(e.target.value);
                        clearError('length');
                      }}
                      unit="m"
                      error={errors.length}
                    />
                    <MobileInput
                      label="Width"
                      type="number"
                      placeholder="Width"
                      value={width}
                      onChange={(e) => {
                        setWidth(e.target.value);
                        clearError('width');
                      }}
                      unit="m"
                      error={errors.width}
                    />
                  </div>
                )}
              </div>

              {/* Main calculation inputs */}
              <div className="grid grid-cols-1 gap-4">
                {calculationType === "lux-to-lumens" && (
                  <MobileInput
                    label="Required Illuminance"
                    type="number"
                    placeholder="Enter lux value"
                    value={lux}
                    onChange={(e) => {
                      setLux(e.target.value);
                      clearError('lux');
                    }}
                    unit="lx"
                    error={errors.lux}
                  />
                )}

                {calculationType === "lumens-to-lux" && (
                  <MobileInput
                    label="Total Light Output"
                    type="number"
                    placeholder="Enter lumens value"
                    value={lumens}
                    onChange={(e) => {
                      setLumens(e.target.value);
                      clearError('lumens');
                    }}
                    unit="lm"
                    error={errors.lumens}
                  />
                )}

                {calculationType === "fixtures-needed" && (
                  <div className="grid grid-cols-1 gap-4">
                    <MobileInput
                      label="Required Illuminance"
                      type="number"
                      placeholder="Enter lux value"
                      value={lux}
                      onChange={(e) => {
                        setLux(e.target.value);
                        clearError('lux');
                      }}
                      unit="lx"
                      error={errors.lux}
                    />
                    <MobileInput
                      label="Fixture Output"
                      type="number"
                      placeholder="Lumens per fixture"
                      value={fixtureOutput}
                      onChange={(e) => {
                        setFixtureOutput(e.target.value);
                        clearError('fixtureOutput');
                      }}
                      unit="lm"
                      error={errors.fixtureOutput}
                    />
                  </div>
                )}
              </div>

              {/* Optional height inputs */}
              <div className="grid grid-cols-2 gap-3">
                <MobileInput
                  label="Mounting Height (optional)"
                  type="number"
                  placeholder="3.0"
                  value={mountingHeight}
                  onChange={(e) => setMountingHeight(e.target.value)}
                  unit="m"
                  hint="For spacing calculations"
                />
                <MobileInput
                  label="Working Height"
                  type="number"
                  placeholder="0.85"
                  value={workingHeight}
                  onChange={(e) => setWorkingHeight(e.target.value)}
                  unit="m"
                  hint="Work plane level"
                />
              </div>

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
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Button 
                  onClick={calculate} 
                  className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetCalculator} 
                  className="flex-1 border-elec-yellow/20 hover:bg-elec-yellow/10"
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {result && (
              <Card className="bg-elec-card border-elec-yellow/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-elec-yellow" />
                    <CardTitle className="text-lg">
                      {calculationType === "lux-to-lumens" && "Lumens Required"}
                      {calculationType === "lumens-to-lux" && "Illuminance Level"}
                      {calculationType === "fixtures-needed" && "Fixtures Needed"}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-elec-yellow mb-2">{result}</div>
                    {additionalInfo && (
                      <div className="text-sm text-elec-light bg-elec-dark/30 px-3 py-2 rounded-md">
                        {additionalInfo}
                      </div>
                    )}
                  </div>
                  
                  {/* Compliance Badge */}
                  {calculationType === "lumens-to-lux" && (
                    <div className="flex justify-center">
                      {(() => {
                        const luxValue = parseFloat(result.replace(" lux", ""));
                        if (luxValue >= 500) return <Badge className="bg-green-500/10 text-green-400 border-green-500/20"><CheckCircle className="h-3 w-3 mr-1" />Excellent</Badge>;
                        if (luxValue >= 300) return <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20"><CheckCircle className="h-3 w-3 mr-1" />Good</Badge>;
                        if (luxValue >= 100) return <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20"><AlertTriangle className="h-3 w-3 mr-1" />Basic</Badge>;
                        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Poor</Badge>;
                      })()}
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyResult}
                    className="w-full border-elec-yellow/20 hover:bg-elec-yellow/10"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Result
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Guidance Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* What the Results Mean */}
            <InfoBox
              title="What the Results Mean"
              icon={<Info className="h-5 w-5 text-elec-yellow" />}
              points={[
                "Lux (lx): Light intensity per square metre - what you actually see",
                "Lumens (lm): Total light output from source - what the bulb produces",
                "Utilisation Factor (UF): How much light reaches the work surface",
                "Maintenance Factor (MF): Light reduction over time due to dirt and ageing",
                "Efficacy (lm/W): How efficient the light source is - higher is better"
              ]}
              className="mb-0"
            />

            {/* Why This Matters */}
            <WhyThisMatters
              points={[
                "Proper lighting reduces eye strain and improves productivity",
                "Under-lighting causes fatigue and increases accident risk",
                "Over-lighting wastes energy and increases running costs",
                "Correct spacing prevents dark spots and uneven illumination",
                "Energy efficient fixtures reduce carbon footprint and bills"
              ]}
              className="mb-0"
            />
          </div>

          {/* Practical Guidance */}
          <InfoBox
            title="Practical Tips & Regulations"
            icon={<CheckCircle className="h-5 w-5 text-elec-yellow" />}
            points={[
              "BS EN 12464-1 specifies UK workplace lighting standards",
              "Offices need 300-500 lx, detailed work areas need 750+ lx",
              "LED fixtures typically 80-150 lm/W, much better than older tech",
              "Mount fixtures 2.4-4m high, space at 1.2x mounting height",
              "Consider daylight sensors to reduce artificial lighting during day",
              "Use warm white (3000K) for comfort, cool white (4000K+) for focus",
              "Clean fixtures regularly - dirty lights can lose 30% output"
            ]}
            as="section"
          />

          {/* Quick Reference */}
          <Alert className="bg-elec-dark/50 border-elec-yellow/20">
            <Lightbulb className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <h3 className="font-medium text-elec-yellow">Quick Reference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-elec-light/80">
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Common Levels:</p>
                    <p>Corridors: 100 lx</p>
                    <p>Meetings: 300 lx</p>
                    <p>Offices: 500 lx</p>
                    <p>Workshops: 750 lx</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Energy Costs:</p>
                    <p>LED: £2-4 per year per 100W</p>
                    <p>Fluorescent: £6-8 per year</p>
                    <p>Halogen: £15-20 per year</p>
                  </div>
                  <div>
                    <p className="font-medium text-elec-yellow mb-1">Regulations:</p>
                    <p>BS EN 12464-1: Workplace</p>
                    <p>Building Regs Part L: Energy</p>
                    <p>CDM 2015: Construction sites</p>
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
