import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Zap, Calculator, RotateCcw, CheckCircle2, AlertTriangle, BookOpen, Shield, ArrowRight } from "lucide-react";
import { useState } from "react";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import InfoBox from "@/components/common/InfoBox";
import { calculateCableCapacity, getRecommendations, CableCapacityInputs, CableCapacityResult } from "@/lib/calculators/engines/cableCapacityEngine";
import { CableType } from "@/lib/calculators/bs7671-data/cableCapacities";
import { parseNumber, clamp } from "@/lib/calculators/utils/calculatorUtils";
import { getTemperatureFactor, getGroupingFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";

const CableCurrentCapacityCalculator = () => {
  const [cableSize, setCableSize] = useState<string>("");
  const [cableType, setCableType] = useState<string>("pvc-single");
  const [installationMethod, setInstallationMethod] = useState<string>("method-c");
  const [ambientTemp, setAmbientTemp] = useState<string>("30");
  const [groupingFactor, setGroupingFactor] = useState<string>("1.0");
  const [soilThermalResistivity, setSoilThermalResistivity] = useState<string>("2.5");
  
  // Enhanced inputs for design verification
  const [designCurrent, setDesignCurrent] = useState<string>("");
  const [deviceRating, setDeviceRating] = useState<string>("32");
  
  const [result, setResult] = useState<{
    referenceMethod: string;
    baseCapacity: number;
    tempCorrectionFactor: number;
    groupingCorrectionFactor: number;
    soilCorrectionFactor: number;
    finalCapacity: number;
    voltageRating: string;
    standard: string;
    compliance: {
      Ib: number;
      In: number;
      Iz: number;
      ibInCompliant: boolean;
      inIzCompliant: boolean;
      overallCompliant: boolean;
      safetyMargin: number;
    } | null;
    warnings: string[];
    actionableGuidance?: {
      failureMode: string;
      suggestions: string[];
    } | null;
  } | null>(null);

  // Cable sizes dropdown options
  const cableSizes = [
    "1.0", "1.5", "2.5", "4.0", "6.0", "10.0", "16.0", "25.0", "35.0", "50.0", 
    "70.0", "95.0", "120.0", "150.0", "185.0", "240.0", "300.0", "400.0", "500.0", "630.0"
  ];

  // Enhanced cable types with comprehensive options
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
  ];

  // Extended device ratings for better selection
  const deviceRatings = [
    { value: "6", label: "6A" },
    { value: "10", label: "10A" },
    { value: "16", label: "16A" },
    { value: "20", label: "20A" },
    { value: "25", label: "25A" },
    { value: "32", label: "32A" },
    { value: "40", label: "40A" },
    { value: "45", label: "45A" },
    { value: "50", label: "50A" },
    { value: "63", label: "63A" },
    { value: "80", label: "80A" },
    { value: "100", label: "100A" }
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

  // Helper function to get next cable size that works
  const getNextCableSize = (currentSize: string, targetIz: number) => {
    const currentIndex = cableSizes.indexOf(currentSize);
    const capacityData = cableCapacities[cableType as keyof typeof cableCapacities];
    
    for (let i = currentIndex + 1; i < cableSizes.length; i++) {
      const size = cableSizes[i];
      const sizeData = capacityData?.[size as keyof typeof capacityData];
      const baseCapacity = sizeData?.[installationMethod as keyof typeof sizeData];
      
      if (baseCapacity) {
        const ambient = parseFloat(ambientTemp);
        const grouping = parseFloat(groupingFactor);
        const soilResistivity = parseFloat(soilThermalResistivity);
        
        // Calculate derating factors
        let tempFactor = 1.0;
        
        if (ambient !== 30) {
          const tempDiff = ambient - 30;
          if (cableType.includes('xlpe')) {
            tempFactor = 1.0 - (tempDiff * 0.0067);
          } else {
            tempFactor = 1.0 - (tempDiff * 0.0125);
          }
        }
        
        let soilFactor = 1.0;
        if (installationMethod.includes('d1') || installationMethod.includes('d2')) {
          if (soilResistivity !== 2.5) {
            soilFactor = Math.sqrt(2.5 / soilResistivity);
          }
        }
        
        const finalCapacity = baseCapacity * tempFactor * grouping * soilFactor;
        
        if (finalCapacity >= targetIz) {
          return { size, capacity: finalCapacity };
        }
      }
    }
    return null;
  };

  // Helper to get the next valid device rating
  const getNextDeviceRating = (currentIn: number, maxIz: number) => {
    const deviceValues = deviceRatings.map(d => parseFloat(d.value));
    return deviceValues.find(rating => rating > currentIn && rating <= maxIz);
  };

  // Filter installation methods based on available data
  const getAvailableInstallationMethods = () => {
    if (!cableSize) return installationMethods;
    
    const capacityData = cableCapacities[cableType as keyof typeof cableCapacities];
    const sizeData = capacityData?.[cableSize as keyof typeof capacityData];
    
    if (!sizeData) return installationMethods;
    
    return installationMethods.filter(method => 
      sizeData[method.value as keyof typeof sizeData] !== undefined
    );
  };

  // Validation helper
  const isValidForCalculation = () => {
    return cableSize && designCurrent && deviceRating && parseFloat(designCurrent) > 0;
  };

  const calculateCapacity = () => {
    const size = parseFloat(cableSize);
    const ambient = Math.max(10, Math.min(60, parseFloat(ambientTemp))); // Clamp temperature
    const grouping = parseFloat(groupingFactor);
    const soilResistivity = Math.max(0.5, Math.min(4.0, parseFloat(soilThermalResistivity))); // Clamp soil resistivity

    if (size > 0 && ambient > 0 && grouping > 0) {
      const capacityData = cableCapacities[cableType as keyof typeof cableCapacities];
      const sizeKey = size.toFixed(1);
      
      if (capacityData && capacityData[sizeKey as keyof typeof capacityData]) {
        const sizeData = capacityData[sizeKey as keyof typeof capacityData];
        const baseCapacity = sizeData[installationMethod as keyof typeof sizeData] || 0;
        
        if (baseCapacity > 0) {
        // Temperature correction factor using BS 7671 Appendix 4 lookup
        let tempFactor = 1.0;
        
        if (ambient !== 30) {
          const cableRating = cableType.includes('xlpe') ? '90C' : '70C';
          tempFactor = getTemperatureFactor(ambient, cableRating);
        }
          
          // Soil thermal resistivity correction (for buried cables)
          let soilFactor = 1.0;
          if (installationMethod.includes('d1') || installationMethod.includes('d2')) {
            if (soilResistivity !== 2.5) {
              soilFactor = Math.sqrt(2.5 / soilResistivity);
            }
          }
          
          const finalCapacity = baseCapacity * tempFactor * grouping * soilFactor;
          
          // Calculate compliance if design current and device rating are provided
          let compliance = null;
          let warnings: string[] = [];
          let actionableGuidance: { failureMode: string; suggestions: string[] } | null = null;
          
          if (designCurrent && deviceRating) {
            const Ib = parseFloat(designCurrent);
            const In = parseFloat(deviceRating);
            const Iz = finalCapacity;
            
            const ibInCompliant = Ib <= In;
            const inIzCompliant = In <= Iz;
            const overallCompliant = ibInCompliant && inIzCompliant;
            const safetyMargin = Iz > 0 ? ((Iz - In) / Iz * 100) : 0;
            
            compliance = { Ib, In, Iz, ibInCompliant, inIzCompliant, overallCompliant, safetyMargin };
            
            // Generate actionable guidance for failures
            if (!overallCompliant) {
              if (!ibInCompliant && !inIzCompliant) {
                // Case C: Both fail
                const nextCable = getNextCableSize(cableSize, In);
                actionableGuidance = {
                  failureMode: "Both design current and device rating fail",
                  suggestions: [
                    nextCable ? `Upsize cable to ${nextCable.size}mm² (Iz ≈ ${nextCable.capacity.toFixed(0)}A)` : "Consider larger cable size",
                    "Switch to XLPE 90°C cable for higher capacity",
                    "Reduce grouping factor by separating circuits",
                    "Improve installation method (e.g., free air)",
                    "Reassess device rating requirements"
                  ]
                };
              } else if (!ibInCompliant) {
                // Case A: Ib > In
                const nextIn = getNextDeviceRating(Ib, Iz);
                actionableGuidance = {
                  failureMode: "Design current exceeds device rating",
                  suggestions: nextIn ? [
                    `Increase device rating to ${nextIn}A (if Iz allows)`,
                    "Verify protective coordination still works",
                    "Check if higher device rating affects selectivity"
                  ] : [
                    "Split load across multiple circuits",
                    "Reduce design current if possible",
                    "Upsize cable to allow higher device rating"
                  ]
                };
              } else if (!inIzCompliant) {
                // Case B: In > Iz
                const nextCable = getNextCableSize(cableSize, In);
                actionableGuidance = {
                  failureMode: "Device rating exceeds cable capacity",
                  suggestions: nextCable ? [
                    `Upsize cable to ${nextCable.size}mm² (Iz ≈ ${nextCable.capacity.toFixed(0)}A)`,
                    "Consider XLPE 90°C for higher capacity",
                    "Improve installation conditions (reduce grouping/temp)"
                  ] : [
                    "Consider XLPE 90°C cable",
                    "Improve installation method",
                    "Reduce ambient temperature if possible"
                  ]
                };
              }
              
              if (!ibInCompliant) warnings.push("Design current exceeds device rating");
              if (!inIzCompliant) warnings.push("Device rating exceeds cable capacity");
            }
            if (safetyMargin < 10) {
              warnings.push("Low safety margin - consider larger cable or lower device rating");
            }
          }
          
          // Additional warnings
          if (tempFactor < 0.8) {
            warnings.push("High ambient temperature significantly reducing capacity");
          }
          if (grouping < 0.7) {
            warnings.push("Cable grouping causing significant derating");
          }
          
          // Determine voltage rating based on cable type
          let voltageRating = "600/1000V";
          if (cableType.includes('swa')) voltageRating = "600/1000V or 1900/3300V";
          if (cableType.includes('mineral')) voltageRating = "500V or 750V";
          
          setResult({
            referenceMethod: installationMethods.find(m => m.value === installationMethod)?.label || installationMethod,
            baseCapacity,
            tempCorrectionFactor: tempFactor,
            groupingCorrectionFactor: grouping,
            soilCorrectionFactor: soilFactor,
            finalCapacity,
            voltageRating,
            standard: "BS 7671:2018+A2:2022",
            compliance,
            warnings,
            actionableGuidance
          });
        } else {
          // No capacity data found - show helpful message
          setResult({
            referenceMethod: installationMethods.find(m => m.value === installationMethod)?.label || installationMethod,
            baseCapacity: 0,
            tempCorrectionFactor: 0,
            groupingCorrectionFactor: 0,
            soilCorrectionFactor: 0,
            finalCapacity: 0,
            voltageRating: "",
            standard: "BS 7671:2018+A2:2022",
            compliance: null,
            warnings: [`No capacity data for ${cableSize}mm² ${cableTypes.find(t => t.value === cableType)?.label} with ${installationMethods.find(m => m.value === installationMethod)?.label}`],
            actionableGuidance: {
              failureMode: "No data available",
              suggestions: [
                "Try a different installation method",
                "Consider switching to XLPE cable type",
                "Select a different cable size"
              ]
            }
          });
        }
      } else {
        // No size data found
        setResult({
          referenceMethod: installationMethods.find(m => m.value === installationMethod)?.label || installationMethod,
          baseCapacity: 0,
          tempCorrectionFactor: 0,
          groupingCorrectionFactor: 0,
          soilCorrectionFactor: 0,
          finalCapacity: 0,
          voltageRating: "",
          standard: "BS 7671:2018+A2:2022",
          compliance: null,
          warnings: [`${cableSize}mm² not available for selected cable type`],
          actionableGuidance: {
            failureMode: "Cable size not available",
            suggestions: [
              "Select a different cable size",
              "Try a different cable type"
            ]
          }
        });
      }
    } else {
      // Invalid inputs
      setResult(null);
    }
  };

  const reset = () => {
    setCableSize("");
    setCableType("pvc-single");
    setInstallationMethod("method-c");
    setAmbientTemp("30");
    setGroupingFactor("1.0");
    setSoilThermalResistivity("2.5");
    setDesignCurrent("");
    setDeviceRating("32");
    setResult(null);
  };

  const formatValue = (value: number, unit?: string) => {
    if (value === 0) return "0";
    return `${value.toFixed(1)}${unit || ""}`;
  };

  const getSafetyMarginBadge = (margin: number, isCompliant: boolean) => {
    if (!isCompliant) return <Badge className="text-xs bg-red-500/20 text-red-600 border-red-500/30">Non-compliant</Badge>;
    if (margin >= 25) return <Badge className="text-xs bg-green-500/20 text-green-600 border-green-500/30">Excellent ({margin.toFixed(1)}%)</Badge>;
    if (margin >= 10) return <Badge className="text-xs bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Adequate ({margin.toFixed(1)}%)</Badge>;
    return <Badge className="text-xs bg-red-500/20 text-red-600 border-red-500/30">Low ({margin.toFixed(1)}%)</Badge>;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          <div>
            <CardTitle className="text-elec-light">Cable Current Capacity Calculator</CardTitle>
            <CardDescription className="mt-1">
              Calculate current carrying capacity with BS 7671 compliance verification
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto border-elec-yellow/30 text-elec-yellow">
            BS 7671
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Design Parameters */}
            <div className="space-y-4 p-3 sm:p-4 border border-elec-yellow/20 rounded-lg bg-elec-card/50">
              <h4 className="font-medium text-elec-light text-sm sm:text-base">Circuit Design</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <MobileInput
                  label="Design Current Ib (A) *"
                  type="number"
                  step="0.1"
                  value={designCurrent}
                  onChange={(e) => setDesignCurrent(e.target.value)}
                  placeholder="Enter design current"
                />
                <MobileSelect value={deviceRating} onValueChange={setDeviceRating}>
                  <MobileSelectTrigger label="Device Rating In (A) *">
                    <MobileSelectValue />
                  </MobileSelectTrigger>
                  <MobileSelectContent>
                    {deviceRatings.map((rating) => (
                      <MobileSelectItem key={rating.value} value={rating.value}>
                        {rating.label}
                      </MobileSelectItem>
                    ))}
                  </MobileSelectContent>
                </MobileSelect>
              </div>
            </div>

            <Separator className="border-elec-yellow/20" />

            <MobileSelect value={cableType} onValueChange={setCableType}>
              <MobileSelectTrigger label="Cable Type *">
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
              <MobileSelectTrigger label="Cable Size (mm²) *">
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

            <MobileSelect value={installationMethod} onValueChange={setInstallationMethod}>
              <MobileSelectTrigger label="Installation Method *">
                <MobileSelectValue placeholder="Select installation method" />
              </MobileSelectTrigger>
              <MobileSelectContent>
                {getAvailableInstallationMethods().map((method) => (
                  <MobileSelectItem key={method.value} value={method.value}>
                    {method.label}
                  </MobileSelectItem>
                ))}
              </MobileSelectContent>
            </MobileSelect>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <MobileSelect value={ambientTemp} onValueChange={setAmbientTemp}>
                <MobileSelectTrigger label="Ambient Temp (°C)">
                  <MobileSelectValue />
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
                  <MobileSelectValue />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  {groupingFactors.map((factor) => (
                    <MobileSelectItem key={factor.value} value={factor.value}>
                      {factor.label}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>
            </div>

            {/* Soil Thermal Resistivity - only for buried cables */}
            {(installationMethod.includes('d1') || installationMethod.includes('d2')) && (
              <MobileInput
                label="Soil Thermal Resistivity (K⋅m/W)"
                type="number"
                step="0.1"
                value={soilThermalResistivity}
                onChange={(e) => setSoilThermalResistivity(e.target.value)}
                placeholder="2.5"
              />
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <MobileButton
                onClick={calculateCapacity}
                className="flex-1 w-full"
                icon={<Calculator className="h-4 w-4" />}
                disabled={!isValidForCalculation()}
              >
                Calculate
              </MobileButton>
              <MobileButton
                variant="outline"
                onClick={reset}
                icon={<RotateCcw className="h-4 w-4" />}
                className="w-full sm:w-auto"
              >
                Reset
              </MobileButton>
            </div>
            
            {!isValidForCalculation() && (
              <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
                Please enter design current, device rating, and select cable details to calculate
              </p>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            {result && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 p-3 bg-elec-card/30 rounded-lg border border-elec-yellow/20">
                    <p className="text-xs sm:text-sm text-muted-foreground">Base Capacity</p>
                    <p className="text-lg sm:text-xl font-medium text-elec-light">{formatValue(result.baseCapacity, "A")}</p>
                  </div>
                  <div className="space-y-2 p-3 bg-elec-card/30 rounded-lg border border-elec-yellow/20">
                    <p className="text-xs sm:text-sm text-muted-foreground">Final Capacity Iz</p>
                    <p className="text-lg sm:text-xl font-medium text-elec-yellow">{formatValue(result.finalCapacity, "A")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="text-center p-2 sm:p-3 bg-elec-card/30 rounded border border-elec-yellow/20">
                    <p className="text-muted-foreground text-xs">Temp Factor</p>
                    <p className="font-medium text-elec-light text-sm sm:text-base">{result.tempCorrectionFactor.toFixed(3)}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-elec-card/30 rounded border border-elec-yellow/20">
                    <p className="text-muted-foreground text-xs">Group Factor</p>
                    <p className="font-medium text-elec-light text-sm sm:text-base">{result.groupingCorrectionFactor.toFixed(2)}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-elec-card/30 rounded border border-elec-yellow/20">
                    <p className="text-muted-foreground text-xs">Soil Factor</p>
                    <p className="font-medium text-elec-light text-sm sm:text-base">{result.soilCorrectionFactor.toFixed(3)}</p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground p-2 sm:p-3 bg-elec-card/20 rounded border border-elec-yellow/20 overflow-x-auto">
                  <p className="whitespace-nowrap sm:whitespace-normal">Iz = {result.baseCapacity} × {result.tempCorrectionFactor.toFixed(3)} × {result.groupingCorrectionFactor} × {result.soilCorrectionFactor.toFixed(3)} = {result.finalCapacity.toFixed(1)}A</p>
                </div>

                {/* Compliance Status - Moved here under results */}
                {result.compliance && (
                  <Alert className={`${result.compliance.overallCompliant ? 'border-green-500/20 bg-green-950/20' : 'border-red-500/20 bg-red-950/20'}`}>
                    {result.compliance.overallCompliant ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <AlertDescription className="w-full">
                      <div className="font-medium mb-2 text-sm sm:text-base">
                        {result.compliance.overallCompliant ? "Ib ≤ In ≤ Iz: ✓ COMPLIANT" : "Ib ≤ In ≤ Iz: ✗ NON-COMPLIANT"}
                      </div>
                      <div className="text-xs sm:text-sm grid grid-cols-3 gap-2 sm:gap-4 mb-2">
                        <div>Ib = {result.compliance.Ib}A</div>
                        <div>In = {result.compliance.In}A</div>
                        <div>Iz = {result.compliance.Iz.toFixed(1)}A</div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-xs">
                          {result.compliance.overallCompliant ? "Safety margin:" : "Status:"}
                        </span>
                        {getSafetyMarginBadge(result.compliance.safetyMargin, result.compliance.overallCompliant)}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Actionable Guidance */}
                {result.actionableGuidance && (
                  <Alert className="border-blue-500/20 bg-blue-950/20">
                    <ArrowRight className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <AlertDescription className="w-full">
                      <div className="font-medium mb-2 text-blue-400 text-sm sm:text-base">What to do next:</div>
                      <p className="text-xs sm:text-sm mb-2 text-blue-300">{result.actionableGuidance.failureMode}</p>
                      <ul className="text-xs sm:text-sm space-y-1">
                        {result.actionableGuidance.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                            <span className="flex-1">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <Alert className="border-yellow-500/20 bg-yellow-950/20">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <AlertDescription className="w-full">
                      <div className="font-medium mb-1 text-yellow-400 text-sm sm:text-base">Warnings:</div>
                      <ul className="text-xs sm:text-sm space-y-1">
                        {result.warnings.map((warning, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-yellow-400 mt-0.5 flex-shrink-0">•</span>
                            <span className="flex-1">{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>

        {/* Why This Matters */}
        {result && (
          <WhyThisMatters
            points={[
              "The Ib ≤ In ≤ Iz principle ensures protection from overloads whilst preventing nuisance trips",
              "Derating factors account for real installation conditions - heat buildup and circuit grouping reduce capacity",
              "Adequate safety margin helps accommodate real-world variability and future load growth",
              "Proper cable sizing prevents overheating, fire risk, and voltage drop issues"
            ]}
          />
        )}

        {/* BS 7671 References */}
        {result && (
          <InfoBox
            title="BS 7671 Quick References"
            icon={<BookOpen className="h-5 w-5 text-elec-yellow" />}
            points={[
              "Section 433 - Overload protection and the fundamental Ib ≤ In ≤ Iz principle",
              "Section 523 - Current-carrying capacities for various cable types and methods",
              "Appendix 4 - Correction factors for temperature, grouping, and soil conditions",
              "Note: Exact tables depend on cable construction and installation method"
            ]}
          />
        )}

        {/* Practical Guidance */}
        {result?.actionableGuidance && (
          <InfoBox
            title="Practical Guidance"
            icon={<Shield className="h-5 w-5 text-elec-yellow" />}
            points={[
              result.compliance?.overallCompliant 
                ? "Installation meets BS 7671 requirements - proceed with confidence"
                : "Non-compliance detected - follow the suggestions above before installation",
              "Always verify device characteristics and Zs comply for the selected protective device",
              "Consider future load expansion when selecting cable sizes",
              "Document all calculations and assumptions for inspection and compliance records"
            ]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CableCurrentCapacityCalculator;