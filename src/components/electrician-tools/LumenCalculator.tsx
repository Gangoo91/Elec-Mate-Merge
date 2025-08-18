import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Variable, Lightbulb, Copy, Calculator, Building, Zap } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { copyToClipboard } from "@/lib/calc-utils";

// Professional lighting standards for UK commercial/domestic applications
const PROFESSIONAL_LIGHTING_STANDARDS = {
  // Commercial spaces
  office_general: { name: "Office - General Work", lux: 500, description: "BS EN 12464-1: General office tasks" },
  office_drawing: { name: "Office - CAD/Drawing", lux: 750, description: "BS EN 12464-1: Technical drawing" },
  meeting_room: { name: "Meeting/Conference Room", lux: 500, description: "BS EN 12464-1: Meeting spaces" },
  corridor_commercial: { name: "Commercial Corridor", lux: 100, description: "BS EN 12464-1: Circulation areas" },
  warehouse_general: { name: "Warehouse - General", lux: 200, description: "BS EN 12464-1: General storage" },
  warehouse_detailed: { name: "Warehouse - Detailed Work", lux: 500, description: "BS EN 12464-1: Packing/sorting" },
  workshop_general: { name: "Workshop - General", lux: 500, description: "BS EN 12464-1: General workshop" },
  workshop_precision: { name: "Workshop - Precision", lux: 1000, description: "BS EN 12464-1: Fine assembly" },
  classroom: { name: "Classroom/Training", lux: 500, description: "BS EN 12464-1: Educational spaces" },
  retail_general: { name: "Retail - General Area", lux: 500, description: "BS EN 12464-1: General retail" },
  retail_display: { name: "Retail - Display Area", lux: 1000, description: "BS EN 12464-1: Product display" },
  kitchen_commercial: { name: "Commercial Kitchen", lux: 500, description: "BS EN 12464-1: Food preparation" },
  
  // Domestic spaces (BS 8206-2)
  living_room: { name: "Living Room", lux: 150, description: "BS 8206-2: General domestic living" },
  kitchen_domestic: { name: "Kitchen - Domestic", lux: 300, description: "BS 8206-2: Food preparation area" },
  bathroom: { name: "Bathroom", lux: 200, description: "BS 8206-2: Bathroom/WC" },
  bedroom: { name: "Bedroom", lux: 100, description: "BS 8206-2: General bedroom" },
  hallway: { name: "Hallway/Landing", lux: 100, description: "BS 8206-2: Circulation areas" },
  stairwell: { name: "Stairwell", lux: 150, description: "BS 8206-2: Safety lighting" },
  garage: { name: "Garage/Workshop", lux: 300, description: "BS 8206-2: Vehicle storage/work" },
  
  // Outdoor (BS 5489)
  car_park: { name: "Car Park", lux: 20, description: "BS 5489: Vehicle parking areas" },
  pedestrian_area: { name: "Pedestrian Areas", lux: 10, description: "BS 5489: Walkways/paths" },
  building_entrance: { name: "Building Entrance", lux: 50, description: "BS 5489: Main entrances" }
};

const ElectricianLumenCalculator = () => {
  const [calculationType, setCalculationType] = useState<"lux-to-lumens" | "lumens-to-lux" | "fixtures-needed" | "energy-analysis">("lux-to-lumens");
  const [area, setArea] = useState("");
  const [lux, setLux] = useState("");
  const [lumens, setLumens] = useState("");
  const [fixtureOutput, setFixtureOutput] = useState("");
  const [fixtureWattage, setFixtureWattage] = useState("");
  const [operatingHours, setOperatingHours] = useState("8");
  const [selectedStandard, setSelectedStandard] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(null);
  const [energyAnalysis, setEnergyAnalysis] = useState<string | null>(null);
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
    } else if (calculationType === "energy-analysis") {
      if (!lux || parseFloat(lux) <= 0) {
        newErrors.lux = "Valid lux value is required";
      }
      if (!fixtureWattage || parseFloat(fixtureWattage) <= 0) {
        newErrors.fixtureWattage = "Valid fixture wattage is required";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculate = () => {
    if (!validateInputs()) return;
    
    const areaVal = parseFloat(area);
    const hoursVal = parseFloat(operatingHours);
    
    if (calculationType === "lux-to-lumens") {
      const luxVal = parseFloat(lux);
      const calculatedLumens = luxVal * areaVal;
      const maintenanceFactor = 0.8; // Standard maintenance factor
      const actualLumens = calculatedLumens / maintenanceFactor;
      
      setResult(`${actualLumens.toFixed(0)} lumens (with maintenance factor)`);
      setAdditionalInfo(`Raw calculation: ${calculatedLumens.toFixed(0)} lm | LED power estimate: ${(actualLumens / 120).toFixed(1)}W`);
      
    } else if (calculationType === "lumens-to-lux") {
      const lumensVal = parseFloat(lumens);
      const calculatedLux = lumensVal / areaVal;
      setResult(`${calculatedLux.toFixed(1)} lux`);
      
      // Professional compliance assessment
      let complianceInfo = "Standard compliance: ";
      if (calculatedLux < 50) complianceInfo += "Below minimum commercial standards";
      else if (calculatedLux < 200) complianceInfo += "Suitable for basic navigation/storage";
      else if (calculatedLux < 500) complianceInfo += "Meets general work requirements (BS EN 12464-1)";
      else if (calculatedLux < 750) complianceInfo += "Suitable for detailed work tasks";
      else complianceInfo += "Exceeds standards - suitable for precision work";
      setAdditionalInfo(complianceInfo);
      
    } else if (calculationType === "fixtures-needed") {
      const luxVal = parseFloat(lux);
      const fixtureVal = parseFloat(fixtureOutput);
      const totalLumensNeeded = luxVal * areaVal;
      const maintenanceFactor = 0.8;
      const actualLumensNeeded = totalLumensNeeded / maintenanceFactor;
      const fixturesNeeded = Math.ceil(actualLumensNeeded / fixtureVal);
      
      setResult(`${fixturesNeeded} fixtures required`);
      setAdditionalInfo(`Total system lumens: ${(fixturesNeeded * fixtureVal).toFixed(0)} lm | System power: ~${((fixturesNeeded * fixtureVal) / 120).toFixed(1)}W`);
      
    } else if (calculationType === "energy-analysis") {
      const luxVal = parseFloat(lux);
      const wattageVal = parseFloat(fixtureWattage);
      const totalLumensNeeded = luxVal * areaVal;
      const fixtureEfficiency = 120; // lm/W for modern LED
      const systemWatts = totalLumensNeeded / fixtureEfficiency;
      
      const dailyKwh = (systemWatts * hoursVal) / 1000;
      const annualKwh = dailyKwh * 365;
      const annualCost = annualKwh * 0.30; // £0.30 per kWh average UK rate
      
      setResult(`${systemWatts.toFixed(0)}W total system power`);
      setAdditionalInfo(`Daily: ${dailyKwh.toFixed(2)} kWh | Annual: ${annualKwh.toFixed(0)} kWh`);
      setEnergyAnalysis(`Annual electricity cost: £${annualCost.toFixed(0)} | CO₂ impact: ${(annualKwh * 0.21).toFixed(0)}kg`);
    }
  };

  const resetCalculator = () => {
    setArea("");
    setLux("");
    setLumens("");
    setFixtureOutput("");
    setFixtureWattage("");
    setOperatingHours("8");
    setSelectedStandard("");
    setResult(null);
    setAdditionalInfo(null);
    setEnergyAnalysis(null);
    setErrors({});
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleStandardPreset = (standardKey: string) => {
    const standard = PROFESSIONAL_LIGHTING_STANDARDS[standardKey as keyof typeof PROFESSIONAL_LIGHTING_STANDARDS];
    if (standard) {
      setLux(standard.lux.toString());
      setSelectedStandard(standardKey);
      clearError('lux');
    }
  };

  const copyResult = async () => {
    if (result) {
      const copyText = `Professional Lighting Calculation: ${result}${additionalInfo ? ' | ' + additionalInfo : ''}${energyAnalysis ? ' | ' + energyAnalysis : ''}`;
      await copyToClipboard(copyText);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Professional Lighting Design Calculator</CardTitle>
        </div>
        <CardDescription>
          Professional lighting calculations compliant with BS EN 12464-1, BS 8206-2 and BS 5489 standards
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
                <SelectItem value="lux-to-lumens">Lux to Lumens (Design)</SelectItem>
                <SelectItem value="lumens-to-lux">Lumens to Lux (Verification)</SelectItem>
                <SelectItem value="fixtures-needed">Fixture Quantity</SelectItem>
                <SelectItem value="energy-analysis">Energy Analysis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Standards Presets */}
          {(calculationType !== "lumens-to-lux") && (
            <div className="space-y-2">
              <Label htmlFor="standard-preset">Lighting Standard (BS Compliance)</Label>
              <Select
                value={selectedStandard}
                onValueChange={handleStandardPreset}
              >
                <SelectTrigger id="standard-preset" className="bg-elec-dark border-elec-yellow/20">
                  <SelectValue placeholder="Select application for recommended lux levels" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <optgroup label="Commercial (BS EN 12464-1)">
                    {Object.entries(PROFESSIONAL_LIGHTING_STANDARDS)
                      .filter(([_, standard]) => standard.description.includes("BS EN 12464-1"))
                      .map(([key, standard]) => (
                        <SelectItem key={key} value={key}>
                          {standard.name} ({standard.lux} lx)
                        </SelectItem>
                      ))}
                  </optgroup>
                  <optgroup label="Domestic (BS 8206-2)">
                    {Object.entries(PROFESSIONAL_LIGHTING_STANDARDS)
                      .filter(([_, standard]) => standard.description.includes("BS 8206-2"))
                      .map(([key, standard]) => (
                        <SelectItem key={key} value={key}>
                          {standard.name} ({standard.lux} lx)
                        </SelectItem>
                      ))}
                  </optgroup>
                  <optgroup label="Outdoor (BS 5489)">
                    {Object.entries(PROFESSIONAL_LIGHTING_STANDARDS)
                      .filter(([_, standard]) => standard.description.includes("BS 5489"))
                      .map(([key, standard]) => (
                        <SelectItem key={key} value={key}>
                          {standard.name} ({standard.lux} lx)
                        </SelectItem>
                      ))}
                  </optgroup>
                </SelectContent>
              </Select>
              {selectedStandard && (
                <div className="text-xs text-elec-light/70 bg-elec-dark/50 p-2 rounded">
                  <strong>Standard:</strong> {PROFESSIONAL_LIGHTING_STANDARDS[selectedStandard as keyof typeof PROFESSIONAL_LIGHTING_STANDARDS].description}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              {/* Area Input */}
              <div className="space-y-2">
                <Label htmlFor="area">Floor Area (m²)</Label>
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

              {/* Conditional Inputs */}
              {(calculationType === "lux-to-lumens" || calculationType === "fixtures-needed" || calculationType === "energy-analysis") && (
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
                    placeholder="Enter total lumens"
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
                <div className="space-y-2">
                  <Label htmlFor="fixture-output">Fixture Output (lm per fixture)</Label>
                  <Input
                    id="fixture-output"
                    type="number"
                    placeholder="e.g. 4000 for typical LED panel"
                    value={fixtureOutput}
                    onChange={(e) => {
                      setFixtureOutput(e.target.value);
                      clearError('fixtureOutput');
                    }}
                    className={`bg-elec-dark border-elec-yellow/20 ${errors.fixtureOutput ? "border-destructive" : ""}`}
                  />
                  {errors.fixtureOutput && <p className="text-xs text-destructive">{errors.fixtureOutput}</p>}
                </div>
              )}

              {calculationType === "energy-analysis" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fixture-wattage">Fixture Wattage (W per fixture)</Label>
                    <Input
                      id="fixture-wattage"
                      type="number"
                      placeholder="e.g. 36 for typical LED panel"
                      value={fixtureWattage}
                      onChange={(e) => {
                        setFixtureWattage(e.target.value);
                        clearError('fixtureWattage');
                      }}
                      className={`bg-elec-dark border-elec-yellow/20 ${errors.fixtureWattage ? "border-destructive" : ""}`}
                    />
                    {errors.fixtureWattage && <p className="text-xs text-destructive">{errors.fixtureWattage}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="operating-hours">Daily Operating Hours</Label>
                    <Input
                      id="operating-hours"
                      type="number"
                      placeholder="Hours per day"
                      value={operatingHours}
                      onChange={(e) => setOperatingHours(e.target.value)}
                      className="bg-elec-dark border-elec-yellow/20"
                    />
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
              <div className="flex-grow rounded-md bg-elec-dark p-6 flex flex-col items-center justify-center text-center min-h-64">
                {result ? (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="h-5 w-5 text-elec-yellow" />
                      <span className="text-elec-yellow text-lg font-medium">Professional Result</span>
                    </div>
                    <div className="text-center space-y-3">
                      <div className="text-sm text-muted-foreground font-medium">
                        {calculationType === "lux-to-lumens" && "Required System Output:"}
                        {calculationType === "lumens-to-lux" && "Achieved Illuminance:"}
                        {calculationType === "fixtures-needed" && "Professional Installation:"}
                        {calculationType === "energy-analysis" && "System Power Requirement:"}
                      </div>
                      
                      <div className="text-3xl font-bold text-elec-yellow mb-3">{result}</div>
                      
                      {additionalInfo && (
                        <Badge variant="secondary" className="text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 mb-2">
                          {additionalInfo}
                        </Badge>
                      )}
                      
                      {energyAnalysis && (
                        <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                          {energyAnalysis}
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
                      Copy Professional Report
                    </Button>
                  </>
                ) : (
                  <div className="text-muted-foreground">
                    <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">Professional Lighting Design</p>
                    <p className="text-sm mt-1">
                      {calculationType === "lux-to-lumens" && "Calculate required lumens for design"}
                      {calculationType === "lumens-to-lux" && "Verify illuminance levels"}
                      {calculationType === "fixtures-needed" && "Determine fixture quantities"}
                      {calculationType === "energy-analysis" && "Analyse energy consumption"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Professional Information Panel */}
          <Alert className="bg-elec-dark/50 border-elec-yellow/20">
            <Building className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <h3 className="font-medium text-elec-yellow">UK Professional Lighting Standards</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-elec-light/80">
                  <div>
                    <p><span className="text-elec-yellow">BS EN 12464-1:</span> Commercial workplace lighting</p>
                    <p><span className="text-elec-yellow">BS 8206-2:</span> Domestic lighting recommendations</p>
                    <p><span className="text-elec-yellow">BS 5489:</span> Road and external lighting</p>
                  </div>
                  <div>
                    <p><span className="text-elec-yellow">Maintenance Factor:</span> 0.8 (standard)</p>
                    <p><span className="text-elec-yellow">Modern LED Efficacy:</span> 120+ lm/W</p>
                    <p><span className="text-elec-yellow">Emergency Lighting:</span> BS 5266 (separate calc)</p>
                  </div>
                </div>
                <div className="text-xs bg-elec-yellow/5 p-2 rounded border border-elec-yellow/10">
                  <strong>Professional Note:</strong> Results include maintenance factor and comply with current UK lighting standards. 
                  For critical applications, conduct detailed photometric calculations and consider uniformity ratios.
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElectricianLumenCalculator;