
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Zap, Info, Calculator, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CableCurrentCapacityCalculator = () => {
  const [cableSize, setCableSize] = useState<string>("");
  const [cableType, setCableType] = useState<string>("pvc-single");
  const [conductorMaterial, setConductorMaterial] = useState<string>("copper");
  const [installationMethod, setInstallationMethod] = useState<string>("method-c");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");
  const [soilThermalResistivity, setSoilThermalResistivity] = useState<string>("2.5");
  const [result, setResult] = useState<{
    referenceMethod: string;
    baseCapacity: number;
    tempCorrectionFactor: number;
    groupingCorrectionFactor: number;
    soilCorrectionFactor: number;
    finalCapacity: number;
    voltageRating: string;
    standard: string;
  } | null>(null);

  // Cable sizes dropdown options
  const cableSizes = [
    "1.0", "1.5", "2.5", "4.0", "6.0", "10.0", "16.0", "25.0", "35.0", "50.0", 
    "70.0", "95.0", "120.0", "150.0", "185.0", "240.0", "300.0", "400.0", "500.0", "630.0"
  ];

  // Cable types with comprehensive options
  const cableTypes = [
    { value: "pvc-single", label: "Single Core PVC 70°C" },
    { value: "pvc-multicore", label: "Multicore PVC 70°C" },
    { value: "xlpe-single", label: "Single Core XLPE 90°C" },
    { value: "xlpe-multicore", label: "Multicore XLPE 90°C" },
    { value: "twin-earth", label: "Twin & Earth PVC" },
    { value: "swa-pvc", label: "SWA PVC 70°C" },
    { value: "swa-xlpe", label: "SWA XLPE 90°C" },
    { value: "lsf-single", label: "LSF Single Core 70°C" },
    { value: "lsf-multicore", label: "LSF Multicore 70°C" },
    { value: "mineral", label: "Mineral Insulated 70°C" },
    { value: "aerial-pvc", label: "Aerial Bundled PVC" },
    { value: "overhead", label: "Overhead Bare Conductor" }
  ];

  // Installation methods based on BS 7671 Reference Methods
  const installationMethods = [
    { value: "method-a1", label: "Method A1 - Enclosed in conduit on a wall" },
    { value: "method-a2", label: "Method A2 - Enclosed in trunking on a wall" },
    { value: "method-b1", label: "Method B1 - Enclosed in conduit in masonry" },
    { value: "method-b2", label: "Method B2 - Enclosed in trunking in masonry" },
    { value: "method-c", label: "Method C - Clipped direct to surface" },
    { value: "method-d1", label: "Method D1 - Direct in ground or duct" },
    { value: "method-d2", label: "Method D2 - In ducts in ground" },
    { value: "method-e", label: "Method E - In free air" },
    { value: "method-f", label: "Method F - On cable tray (perforated)" },
    { value: "method-g", label: "Method G - On cable tray (unperforated)" },
    { value: "method-h", label: "Method H - On cable ladder/cleats" }
  ];

  // Ambient temperature options
  const ambientTemperatures = [
    "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"
  ];

  // Grouping factors
  const groupingFactors = [
    { value: "1.0", label: "1.0 (Single circuit)" },
    { value: "0.8", label: "0.8 (2 circuits)" },
    { value: "0.7", label: "0.7 (3 circuits)" },
    { value: "0.65", label: "0.65 (4 circuits)" },
    { value: "0.6", label: "0.6 (5-6 circuits)" },
    { value: "0.55", label: "0.55 (7-9 circuits)" },
    { value: "0.5", label: "0.5 (10+ circuits)" }
  ];

  // Enhanced cable capacity data based on BS 7671
  const cableCapacities = {
    "pvc-single": {
      "1.0": { "method-c": 15, "method-a1": 13, "method-d1": 18, "method-e": 17 },
      "1.5": { "method-c": 20, "method-a1": 17, "method-d1": 23, "method-e": 22 },
      "2.5": { "method-c": 27, "method-a1": 23, "method-d1": 31, "method-e": 30 },
      "4.0": { "method-c": 37, "method-a1": 31, "method-d1": 42, "method-e": 40 },
      "6.0": { "method-c": 47, "method-a1": 39, "method-d1": 54, "method-e": 51 },
      "10.0": { "method-c": 65, "method-a1": 54, "method-d1": 75, "method-e": 70 },
      "16.0": { "method-c": 87, "method-a1": 73, "method-d1": 101, "method-e": 94 },
      "25.0": { "method-c": 114, "method-a1": 96, "method-d1": 133, "method-e": 119 },
      "35.0": { "method-c": 141, "method-a1": 119, "method-d1": 164, "method-e": 148 },
      "50.0": { "method-c": 182, "method-a1": 154, "method-d1": 213, "method-e": 185 },
      "70.0": { "method-c": 234, "method-a1": 196, "method-d1": 272, "method-e": 234 },
      "95.0": { "method-c": 289, "method-a1": 245, "method-d1": 336, "method-e": 291 },
      "120.0": { "method-c": 337, "method-a1": 286, "method-d1": 392, "method-e": 341 },
      "150.0": { "method-c": 390, "method-a1": 331, "method-d1": 454, "method-e": 396 },
      "185.0": { "method-c": 451, "method-a1": 383, "method-d1": 526, "method-e": 459 },
      "240.0": { "method-c": 533, "method-a1": 453, "method-d1": 622, "method-e": 542 },
      "300.0": { "method-c": 613, "method-a1": 521, "method-d1": 716, "method-e": 624 }
    },
    "xlpe-single": {
      "1.0": { "method-c": 18, "method-a1": 15, "method-d1": 21, "method-e": 20 },
      "1.5": { "method-c": 24, "method-a1": 20, "method-d1": 27, "method-e": 26 },
      "2.5": { "method-c": 33, "method-a1": 28, "method-d1": 37, "method-e": 36 },
      "4.0": { "method-c": 45, "method-a1": 38, "method-d1": 51, "method-e": 49 },
      "6.0": { "method-c": 58, "method-a1": 48, "method-d1": 65, "method-e": 62 },
      "10.0": { "method-c": 80, "method-a1": 66, "method-d1": 90, "method-e": 85 },
      "16.0": { "method-c": 107, "method-a1": 89, "method-d1": 121, "method-e": 115 },
      "25.0": { "method-c": 138, "method-a1": 115, "method-d1": 156, "method-e": 147 },
      "35.0": { "method-c": 171, "method-a1": 143, "method-d1": 193, "method-e": 182 },
      "50.0": { "method-c": 219, "method-a1": 183, "method-d1": 248, "method-e": 233 }
    },
    "swa-pvc": {
      "1.5": { "method-c": 19, "method-a1": 16, "method-d1": 21, "method-e": 20 },
      "2.5": { "method-c": 25, "method-a1": 21, "method-d1": 28, "method-e": 27 },
      "4.0": { "method-c": 34, "method-a1": 29, "method-d1": 38, "method-e": 36 },
      "6.0": { "method-c": 43, "method-a1": 36, "method-d1": 48, "method-e": 46 },
      "10.0": { "method-c": 59, "method-a1": 50, "method-d1": 66, "method-e": 63 },
      "16.0": { "method-c": 79, "method-a1": 67, "method-d1": 88, "method-e": 84 },
      "25.0": { "method-c": 103, "method-a1": 87, "method-d1": 115, "method-e": 109 },
      "35.0": { "method-c": 127, "method-a1": 108, "method-d1": 142, "method-e": 134 },
      "50.0": { "method-c": 163, "method-a1": 138, "method-d1": 182, "method-e": 172 }
    },
    "twin-earth": {
      "1.0": { "method-c": 13, "method-a1": 11, "method-d1": 15, "method-e": 14 },
      "1.5": { "method-c": 17, "method-a1": 14, "method-d1": 19, "method-e": 18 },
      "2.5": { "method-c": 23, "method-a1": 19, "method-d1": 26, "method-e": 25 },
      "4.0": { "method-c": 31, "method-a1": 26, "method-d1": 35, "method-e": 33 },
      "6.0": { "method-c": 39, "method-a1": 33, "method-d1": 45, "method-e": 42 },
      "10.0": { "method-c": 54, "method-a1": 45, "method-d1": 62, "method-e": 58 },
      "16.0": { "method-c": 73, "method-a1": 61, "method-d1": 85, "method-e": 79 }
    }
  };

  const calculateCapacity = () => {
    const size = parseFloat(cableSize);
    const ambient = parseFloat(ambientTemp);
    const grouping = parseFloat(groupingFactor);
    const soilResistivity = parseFloat(soilThermalResistivity);

    if (size > 0 && ambient > 0 && grouping > 0) {
      const capacityData = cableCapacities[cableType as keyof typeof cableCapacities];
      const sizeKey = size.toFixed(1);
      
      if (capacityData && capacityData[sizeKey as keyof typeof capacityData]) {
        const sizeData = capacityData[sizeKey as keyof typeof capacityData];
        const baseCapacity = sizeData[installationMethod as keyof typeof sizeData] || 0;
        
        if (baseCapacity > 0) {
          // Temperature correction factor based on cable type
          let refTemp = cableType.includes('xlpe') ? 90 : 70;
          let tempFactor = 1.0;
          
          if (ambient !== 30) {
            // Using BS 7671 temperature correction factors
            const tempDiff = ambient - 30;
            if (cableType.includes('xlpe')) {
              tempFactor = 1.0 - (tempDiff * 0.0067); // For 90°C cables
            } else {
              tempFactor = 1.0 - (tempDiff * 0.0125); // For 70°C cables
            }
          }
          
          // Soil thermal resistivity correction (for buried cables)
          let soilFactor = 1.0;
          if (installationMethod.includes('d1') || installationMethod.includes('d2')) {
            if (soilResistivity !== 2.5) {
              soilFactor = Math.sqrt(2.5 / soilResistivity);
            }
          }
          
          const finalCapacity = baseCapacity * tempFactor * grouping * soilFactor;
          
          // Determine voltage rating based on cable type
          let voltageRating = "600/1000V";
          if (cableType.includes('swa')) voltageRating = "600/1000V or 1900/3300V";
          if (cableType.includes('mineral')) voltageRating = "500V or 750V";
          if (cableType.includes('overhead')) voltageRating = "11kV/33kV";
          
          setResult({
            referenceMethod: installationMethods.find(m => m.value === installationMethod)?.label || installationMethod,
            baseCapacity,
            tempCorrectionFactor: tempFactor,
            groupingCorrectionFactor: grouping,
            soilCorrectionFactor: soilFactor,
            finalCapacity,
            voltageRating,
            standard: "BS 7671:2018+A2:2022"
          });
        }
      }
    }
  };

  const reset = () => {
    setCableSize("");
    setCableType("pvc-single");
    setConductorMaterial("copper");
    setInstallationMethod("method-c");
    setAmbientTemp("30");
    setGroupingFactor("1.0");
    setSoilThermalResistivity("2.5");
    setResult(null);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <CardTitle>Cable Current Capacity Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate current carrying capacity of cables based on BS 7671 installation methods.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
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

            <MobileSelect value={cableSize} onValueChange={setCableSize}>
              <MobileSelectTrigger label="Cable Size (mm²)">
                <MobileSelectValue placeholder="Select cable size" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {cableSizes.map((size) => (
                  <MobileSelectItem key={size} value={size}>
                    {size} mm²
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={conductorMaterial} onValueChange={setConductorMaterial}>
              <MobileSelectTrigger label="Conductor Material">
                <MobileSelectValue placeholder="Select conductor material" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                <MobileSelectItem value="copper">Copper</MobileSelectItem>
                <MobileSelectItem value="aluminium">Aluminium</MobileSelectItem>
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
                <MobileSelectValue placeholder="Select ambient temperature" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {ambientTemperatures.map((temp) => (
                  <MobileSelectItem key={temp} value={temp}>
                    {temp}°C
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <MobileSelect value={groupingFactor} onValueChange={setGroupingFactor}>
              <MobileSelectTrigger label="Grouping Factor">
                <MobileSelectValue placeholder="Select grouping factor" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {groupingFactors.map((factor) => (
                  <MobileSelectItem key={factor.value} value={factor.value}>
                    {factor.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            {(installationMethod.includes('d1') || installationMethod.includes('d2')) && (
              <MobileInput
                label="Soil Thermal Resistivity (K·m/W)"
                type="number"
                step="0.1"
                value={soilThermalResistivity}
                onChange={(e) => setSoilThermalResistivity(e.target.value)}
                placeholder="e.g., 2.5"
              />
            )}

            <div className="flex gap-2">
              <MobileButton onClick={calculateCapacity} className="flex-1" variant="elec" icon={<Calculator className="h-4 w-4" />}>
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
                    <h3 className="text-lg font-semibold text-elec-yellow mb-2">Current Capacity Results</h3>
                    <Badge variant="secondary" className="mb-4">
                      {result.standard}
                    </Badge>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Base Capacity:</span>
                      <div className="font-mono text-elec-yellow">{result.baseCapacity} A</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Temp Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.tempCorrectionFactor.toFixed(3)}</div>  
                    </div>
                    <div>
                      <span className="text-muted-foreground">Group Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.groupingCorrectionFactor}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Soil Factor:</span>
                      <div className="font-mono text-elec-yellow">{result.soilCorrectionFactor.toFixed(3)}</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-center">
                    <span className="text-muted-foreground">Final Current Capacity:</span>
                    <div className="font-mono text-elec-yellow text-2xl font-bold">{result.finalCapacity.toFixed(1)} A</div>
                    <div className="text-xs text-gray-400 mt-1">{result.voltageRating}</div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground pt-2 border-t border-elec-yellow/20">
                    <div>Method: {result.referenceMethod.split(' - ')[0]}</div>
                    <div>Calculation: {result.baseCapacity} × {result.tempCorrectionFactor.toFixed(3)} × {result.groupingCorrectionFactor} × {result.soilCorrectionFactor.toFixed(3)}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select cable parameters to calculate capacity
                </div>
              )}
            </div>

            <Alert className="border-blue-500/20 bg-blue-500/10">
              <Info className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-200">
                Current capacity calculations based on BS 7671:2018+A2:2022. Consider derating factors for specific installations.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CableCurrentCapacityCalculator;
