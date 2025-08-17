
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Cable, Info, Calculator, RotateCcw, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableDeratingCalculator = () => {
  const [baseRating, setBaseRating] = useState("");
  const [cableType, setCableType] = useState("pvc-70");
  const [installationMethod, setInstallationMethod] = useState("method-c");
  const [ambientTemp, setAmbientTemp] = useState("30");
  const [numberOfCables, setNumberOfCables] = useState("1");
  const [thermalInsulation, setThermalInsulation] = useState("none");
  const [soilThermalResistivity, setSoilThermalResistivity] = useState("2.5");
  const [result, setResult] = useState<{
    temperatureFactor: number;
    groupingFactor: number;
    thermalInsulationFactor: number;
    soilFactor: number;
    totalDerating: number;
    finalRating: number;
    deratingPercentage: number;
    warnings: string[];
  } | null>(null);

  // Cable types with reference temperatures
  const cableTypes = [
    { value: "pvc-70", label: "PVC Insulated 70°C", refTemp: 70 },
    { value: "xlpe-90", label: "XLPE Insulated 90°C", refTemp: 90 },
    { value: "lsf-70", label: "LSF Insulated 70°C", refTemp: 70 },
    { value: "mineral-70", label: "Mineral Insulated 70°C", refTemp: 70 },
    { value: "mineral-105", label: "Mineral Insulated 105°C", refTemp: 105 },
    { value: "silicone-180", label: "Silicone Insulated 180°C", refTemp: 180 }
  ];

  // BS 7671 Reference Installation Methods
  const installationMethods = [
    { value: "method-a1", label: "Method A1 - Enclosed in conduit on wall" },
    { value: "method-a2", label: "Method A2 - Enclosed in trunking on wall" },
    { value: "method-b1", label: "Method B1 - Enclosed in conduit in masonry" },
    { value: "method-b2", label: "Method B2 - Enclosed in trunking in masonry" },
    { value: "method-c", label: "Method C - Clipped direct to surface" },
    { value: "method-d1", label: "Method D1 - Direct in ground or duct" },
    { value: "method-d2", label: "Method D2 - In ducts in ground" },
    { value: "method-e", label: "Method E - In free air" },
    { value: "method-f", label: "Method F - On cable tray (perforated)" },
    { value: "method-g", label: "Method G - On cable tray (unperforated)" }
  ];

  // Ambient temperatures
  const ambientTemperatures = [
    "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60", "65", "70"
  ];

  // Number of cables for grouping
  const cableQuantities = [
    { value: "1", label: "1 (Single cable)" },
    { value: "2", label: "2 cables" },
    { value: "3", label: "3 cables" },
    { value: "4", label: "4-5 cables" },
    { value: "6", label: "6-8 cables" },
    { value: "9", label: "9-11 cables" },
    { value: "12", label: "12-15 cables" },
    { value: "16", label: "16-19 cables" },
    { value: "20", label: "20+ cables" }
  ];

  // Thermal insulation conditions
  const thermalInsulationTypes = [
    { value: "none", label: "No thermal insulation" },
    { value: "touching-one", label: "Touching thermal insulation (one side)" },
    { value: "touching-narrow", label: "Touching narrow strip (<225mm)" },
    { value: "touching-wide", label: "Touching wide area (>225mm)" },
    { value: "surrounded-50", label: "Surrounded by insulation ≤50mm" },
    { value: "surrounded-100", label: "Surrounded by insulation 50-100mm" },
    { value: "surrounded-200", label: "Surrounded by insulation 100-200mm" },
    { value: "surrounded-400", label: "Surrounded by insulation 200-400mm" },
    { value: "surrounded-over", label: "Surrounded by insulation >400mm" }
  ];

  // Calculate temperature correction factor based on BS 7671
  const calculateTemperatureFactor = (ambient: number, cableTypeValue: string): number => {
    const cable = cableTypes.find(c => c.value === cableTypeValue);
    const refTemp = cable?.refTemp || 70;
    const refAmbient = installationMethod.includes('d') ? 20 : 30; // 20°C for buried, 30°C for air
    
    if (ambient === refAmbient) return 1.00;
    
    // BS 7671 temperature correction formula
    const factor = Math.sqrt((refTemp - ambient) / (refTemp - refAmbient));
    return Math.max(0.1, Math.min(1.2, factor)); // Limit between 0.1 and 1.2
  };

  // BS 7671 Grouping factors (Table 4C1)
  const getGroupingFactor = (numCables: string, method: string): number => {
    const num = parseInt(numCables);
    
    // Different factors for different installation methods
    if (method.includes('a') || method.includes('b')) { // Enclosed methods
      const factors = { 1: 1.00, 2: 0.80, 3: 0.70, 4: 0.65, 6: 0.60, 9: 0.55, 12: 0.50, 16: 0.45, 20: 0.40 };
      return factors[num as keyof typeof factors] || 0.35;
    } else if (method === 'method-c') { // Clipped direct
      const factors = { 1: 1.00, 2: 0.85, 3: 0.79, 4: 0.75, 6: 0.73, 9: 0.72, 12: 0.72, 16: 0.72, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    } else if (method.includes('d')) { // Buried
      const factors = { 1: 1.00, 2: 0.90, 3: 0.85, 4: 0.82, 6: 0.80, 9: 0.78, 12: 0.76, 16: 0.74, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    } else { // Cable tray and free air
      const factors = { 1: 1.00, 2: 0.88, 3: 0.82, 4: 0.77, 6: 0.75, 9: 0.73, 12: 0.72, 16: 0.72, 20: 0.72 };
      return factors[num as keyof typeof factors] || 0.70;
    }
  };

  // BS 7671 Thermal insulation factors (Table 4C4)
  const getThermalInsulationFactor = (insulation: string): number => {
    const factors = {
      "none": 1.00,
      "touching-one": 0.89,
      "touching-narrow": 0.81,
      "touching-wide": 0.68,
      "surrounded-50": 0.63,
      "surrounded-100": 0.51,
      "surrounded-200": 0.46,
      "surrounded-400": 0.42,
      "surrounded-over": 0.36
    };
    return factors[insulation as keyof typeof factors] || 1.00;
  };

  // Soil thermal resistivity correction factor
  const getSoilCorrectionFactor = (resistivity: number, method: string): number => {
    if (!method.includes('d')) return 1.00; // Only applies to buried cables
    
    // Standard soil thermal resistivity is 2.5 K⋅m/W
    const standardResistivity = 2.5;
    return Math.sqrt(standardResistivity / resistivity);
  };

  const calculateDerating = () => {
    if (!baseRating) return;

    const baseRatingValue = parseFloat(baseRating);
    const ambientValue = parseFloat(ambientTemp);
    const soilResistivity = parseFloat(soilThermalResistivity);

    // Calculate all derating factors
    const tempFactor = calculateTemperatureFactor(ambientValue, cableType);
    const groupFactor = getGroupingFactor(numberOfCables, installationMethod);
    const thermalFactor = getThermalInsulationFactor(thermalInsulation);
    const soilFactor = getSoilCorrectionFactor(soilResistivity, installationMethod);

    // Total derating factor
    const totalDerating = tempFactor * groupFactor * thermalFactor * soilFactor;
    
    // Final current rating
    const finalRating = baseRatingValue * totalDerating;
    
    // Calculate percentage reduction
    const deratingPercentage = ((baseRatingValue - finalRating) / baseRatingValue) * 100;

    // Generate warnings
    const warnings: string[] = [];
    
    if (totalDerating < 0.5) {
      warnings.push("Severe derating detected - consider larger cable or alternative installation");
    }
    if (tempFactor < 0.8) {
      warnings.push("High ambient temperature significantly reducing capacity");
    }
    if (groupFactor < 0.7) {
      warnings.push("Cable grouping causing significant derating");
    }
    if (thermalFactor < 0.7) {
      warnings.push("Thermal insulation causing significant derating");
    }
    if (soilFactor < 0.9 && soilFactor !== 1.0) {
      warnings.push("Poor soil thermal conditions reducing capacity");
    }

    setResult({
      temperatureFactor: tempFactor,
      groupingFactor: groupFactor,
      thermalInsulationFactor: thermalFactor,
      soilFactor: soilFactor,
      totalDerating: totalDerating,
      finalRating: finalRating,
      deratingPercentage: deratingPercentage,
      warnings: warnings
    });
  };

  const reset = () => {
    setBaseRating("");
    setCableType("pvc-70");
    setInstallationMethod("method-c");
    setAmbientTemp("30");
    setNumberOfCables("1");
    setThermalInsulation("none");
    setSoilThermalResistivity("2.5");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Cable className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Derating Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate cable current carrying capacity with accurate BS 7671 derating factors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <MobileInput
              label="Base Current Rating (A)"
              type="number"
              value={baseRating}
              onChange={(e) => setBaseRating(e.target.value)}
              placeholder="e.g., 32"
            />

            <MobileSelect value={cableType} onValueChange={setCableType}>
              <MobileSelectTrigger label="Cable Type">
                <MobileSelectValue placeholder="Select cable type" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {cableTypes.map((type) => (
                  <MobileSelectItem key={type.value} value={type.value}>
                    {type.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={installationMethod} onValueChange={setInstallationMethod}>
              <MobileSelectTrigger label="Installation Method">
                <MobileSelectValue placeholder="Select installation method" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {installationMethods.map((method) => (
                  <MobileSelectItem key={method.value} value={method.value}>
                    {method.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={ambientTemp} onValueChange={setAmbientTemp}>
              <MobileSelectTrigger label="Ambient Temperature (°C)">
                <MobileSelectValue placeholder="Select temperature" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {ambientTemperatures.map((temp) => (
                  <MobileSelectItem key={temp} value={temp}>
                    {temp}°C {temp === "30" && "(Reference)"}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={numberOfCables} onValueChange={setNumberOfCables}>
              <MobileSelectTrigger label="Number of Cables">
                <MobileSelectValue placeholder="Select cable quantity" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {cableQuantities.map((qty) => (
                  <MobileSelectItem key={qty.value} value={qty.value}>
                    {qty.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={thermalInsulation} onValueChange={setThermalInsulation}>
              <MobileSelectTrigger label="Thermal Insulation">
                <MobileSelectValue placeholder="Select insulation condition" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {thermalInsulationTypes.map((insulation) => (
                  <MobileSelectItem key={insulation.value} value={insulation.value}>
                    {insulation.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            {installationMethod.includes('d') && (
              <MobileInput
                label="Soil Thermal Resistivity (K⋅m/W)"
                type="number"
                step="0.1"
                value={soilThermalResistivity}
                onChange={(e) => setSoilThermalResistivity(e.target.value)}
                placeholder="e.g., 2.5"
              />
            )}

            <div className="flex gap-2">
              <MobileButton onClick={calculateDerating} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
                Calculate
              </MobileButton>
              <MobileButton variant="elec-outline" onClick={reset}>
                <RotateCcw className="h-4 w-4" />
              </MobileButton>
            </div>
          </div>

          {/* Result Section */}
          <div className="space-y-4">
            <div className="rounded-md bg-elec-dark p-6 min-h-[200px]">
              {result ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Derating Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      BS 7671:2018+A2:2022
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Temperature:</span>
                      <div className="font-mono text-elec-yellow">{result.temperatureFactor.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Grouping:</span>
                      <div className="font-mono text-elec-yellow">{result.groupingFactor.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Thermal Insul:</span>
                      <div className="font-mono text-elec-yellow">{result.thermalInsulationFactor.toFixed(3)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Soil:</span>
                      <div className="font-mono text-elec-yellow">{result.soilFactor.toFixed(3)}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Base Rating:</span>
                      <span className="font-mono text-white">{baseRating} A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Derating:</span>
                      <span className="font-mono text-white">{result.totalDerating.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-elec-yellow/20">
                      <span className="text-muted-foreground font-semibold">Derated Capacity:</span>
                      <span className="font-mono text-elec-yellow text-xl font-bold">{result.finalRating.toFixed(1)} A</span>
                    </div>
                    <div className="text-center text-xs text-gray-400">
                      Reduction: {result.deratingPercentage.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t border-elec-yellow/20">
                    Calculation: {baseRating} × {result.temperatureFactor.toFixed(3)} × {result.groupingFactor.toFixed(3)} × {result.thermalInsulationFactor.toFixed(3)} × {result.soilFactor.toFixed(3)}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Enter cable parameters to calculate derating
                </div>
              )}
            </div>

            {result && result.warnings.length > 0 && (
              <Alert className="border-orange-500/20 bg-orange-500/10">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <AlertDescription className="text-orange-200">
                  <div className="space-y-1">
                    {result.warnings.map((warning, index) => (
                      <div key={index}>• {warning}</div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Derating factors calculated per BS 7671:2018+A2:2022. Consider all installation conditions and safety factors.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableDeratingCalculator;
