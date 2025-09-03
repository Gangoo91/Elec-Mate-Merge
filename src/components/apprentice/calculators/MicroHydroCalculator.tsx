import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileSelect, MobileSelectContent, MobileSelectItem, MobileSelectTrigger, MobileSelectValue } from "@/components/ui/mobile-select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResultCard } from "@/components/ui/result-card";
import { Droplets, Calculator, RotateCcw, Zap, AlertTriangle, Info, TrendingUp, Wrench } from "lucide-react";

// Turbine specifications based on head and flow characteristics
const TURBINE_TYPES = {
  pelton: {
    name: "Pelton Wheel",
    minHead: 50, // metres
    maxFlow: 2.0, // m³/s
    efficiency: 0.90,
    description: "High-head, low-flow applications",
    costPerKw: 3500
  },
  turgo: {
    name: "Turgo Impulse",
    minHead: 30,
    maxFlow: 5.0,
    efficiency: 0.87,
    description: "Medium-high head applications",
    costPerKw: 3200
  },
  francis: {
    name: "Francis Turbine",
    minHead: 10,
    maxFlow: 20.0,
    efficiency: 0.92,
    description: "Medium head with high flow",
    costPerKw: 2800
  },
  kaplan: {
    name: "Kaplan/Propeller",
    minHead: 2,
    maxFlow: 50.0,
    efficiency: 0.93,
    description: "Low head, high flow applications",
    costPerKw: 4000
  },
  crossflow: {
    name: "Cross-flow (Banki)",
    minHead: 5,
    maxFlow: 10.0,
    efficiency: 0.85,
    description: "Versatile for varying flows",
    costPerKw: 2500
  }
};

// Quick start presets matching the image
const QUICK_START_PRESETS = [
  {
    name: "High-head Pelton (Mountain stream)",
    flow: "0.05",
    head: "150",
    turbineType: "pelton",
    description: "Mountain stream with high elevation drop"
  },
  {
    name: "Medium-head Francis (River weir)",
    flow: "0.5",
    head: "25",
    turbineType: "francis",
    description: "River weir with medium head"
  },
  {
    name: "Low-head Kaplan (Large river)",
    flow: "5.0",
    head: "8",
    turbineType: "kaplan",
    description: "Large river with low head"
  },
  {
    name: "Small Crossflow (Stream)",
    flow: "0.2",
    head: "12",
    turbineType: "crossflow",
    description: "Small stream with moderate head"
  }
];

interface MicroHydroResult {
  // Power calculations
  theoreticalPower: number; // kW
  practicalPower: number; // kW accounting for efficiency
  annualGeneration: number; // kWh/year
  
  // Turbine analysis
  recommendedTurbine: string;
  turbineEfficiency: number;
  turbineSuitability: string;
  
  // Economic analysis
  estimatedCost: number;
  costPerKw: number;
  annualRevenue: number;
  paybackPeriod: number;
  
  // Technical specifications
  penstock: {
    diameter: number; // mm
    length: number; // estimated metres
    material: string;
    cost: number;
  };
  
  // Environmental and regulatory
  environmentalNotes: string[];
  regulatoryRequirements: string[];
  viabilityAssessment: string;
}

const MicroHydroCalculator = () => {
  const [flow, setFlow] = useState("");
  const [head, setHead] = useState("");
  const [turbineType, setTurbineType] = useState("");
  const [availabilityFactor, setAvailabilityFactor] = useState("85");
  const [electricityRate, setElectricityRate] = useState("0.15");
  const [penstockLength, setPenstockLength] = useState("100");
  const [result, setResult] = useState<MicroHydroResult | null>(null);

  const calculateMicroHydro = () => {
    const flowValue = parseFloat(flow);
    const headValue = parseFloat(head);
    const availabilityValue = parseFloat(availabilityFactor) / 100;
    const rateValue = parseFloat(electricityRate);
    const penstockLengthValue = parseFloat(penstockLength);

    if (!flowValue || !headValue || flowValue <= 0 || headValue <= 0) {
      return;
    }

    // Determine best turbine if not specified or set to auto
    let selectedTurbine = turbineType;
    if (!selectedTurbine || selectedTurbine === "auto") {
      selectedTurbine = determineBestTurbine(headValue, flowValue);
    }

    const turbineData = TURBINE_TYPES[selectedTurbine as keyof typeof TURBINE_TYPES];
    
    // Power calculations (P = ρ × g × Q × H × η)
    // Where: ρ = 1000 kg/m³, g = 9.81 m/s², Q = flow m³/s, H = head m, η = efficiency
    const theoreticalPower = (1000 * 9.81 * flowValue * headValue) / 1000; // kW
    const practicalPower = theoreticalPower * turbineData.efficiency * 0.95; // 5% loss for generator/transmission
    const annualGeneration = practicalPower * 8760 * availabilityValue; // kWh/year

    // Penstock sizing (simplified)
    const velocity = 2.5; // m/s typical for efficiency
    const area = flowValue / velocity;
    const diameter = Math.sqrt(4 * area / Math.PI) * 1000; // mm
    const penstockCost = penstockLengthValue * 150; // £150/m for HDPE

    // Cost estimation
    const turbineCost = practicalPower * turbineData.costPerKw;
    const civilWorks = Math.max(20000, practicalPower * 800); // Weir, intake, tailrace
    const electrical = practicalPower * 600; // Generator, controls, grid connection
    const installation = (turbineCost + civilWorks + electrical) * 0.25;
    const totalCost = turbineCost + civilWorks + electrical + installation + penstockCost;

    // Economic analysis
    const annualRevenue = annualGeneration * rateValue;
    const paybackPeriod = totalCost / annualRevenue;

    // Suitability assessment
    const suitability = assessTurbineSuitability(headValue, flowValue, selectedTurbine);
    const viability = assessViability(practicalPower, paybackPeriod);

    setResult({
      theoreticalPower,
      practicalPower,
      annualGeneration,
      recommendedTurbine: turbineData.name,
      turbineEfficiency: turbineData.efficiency,
      turbineSuitability: suitability,
      estimatedCost: totalCost,
      costPerKw: totalCost / practicalPower,
      annualRevenue,
      paybackPeriod,
      penstock: {
        diameter: Math.round(diameter),
        length: penstockLengthValue,
        material: diameter > 600 ? "Steel" : "HDPE",
        cost: penstockCost
      },
      environmentalNotes: [
        "Environmental Impact Assessment may be required",
        "Fish passage provisions typically needed",
        "Minimum flow requirements for downstream ecology",
        "Seasonal flow variation assessment required"
      ],
      regulatoryRequirements: [
        "Environment Agency abstraction licence",
        "Planning permission for structures",
        "Grid connection agreement (G59/G83)",
        "Health & Safety Executive notification if >1MW"
      ],
      viabilityAssessment: viability
    });
  };

  const determineBestTurbine = (head: number, flow: number): string => {
    // Logic to determine best turbine based on head and flow
    if (head >= 50 && flow <= 2.0) return "pelton";
    if (head >= 30 && head < 50) return "turgo";
    if (head >= 10 && head < 30) return "francis";
    if (head >= 2 && head < 10) return "kaplan";
    return "crossflow"; // Default versatile option
  };

  const assessTurbineSuitability = (head: number, flow: number, turbine: string): string => {
    const turbineData = TURBINE_TYPES[turbine as keyof typeof TURBINE_TYPES];
    
    if (head < turbineData.minHead) {
      return "⚠️ Head too low for optimal efficiency";
    }
    if (flow > turbineData.maxFlow) {
      return "⚠️ Flow too high, consider multiple units";
    }
    
    return "✅ Excellent match for site conditions";
  };

  const assessViability = (power: number, payback: number): string => {
    if (power < 5) return "⚠️ Very small system - check economics carefully";
    if (payback > 20) return "❌ Poor economics - payback too long";
    if (payback > 15) return "⚠️ Marginal economics - consider improvements";
    if (payback > 10) return "✅ Reasonable economics";
    return "✅ Excellent economics - highly viable";
  };

  const applyPreset = (preset: typeof QUICK_START_PRESETS[0]) => {
    setFlow(preset.flow);
    setHead(preset.head);
    setTurbineType(preset.turbineType);
  };

  const resetCalculator = () => {
    setFlow("");
    setHead("");
    setTurbineType("");
    setAvailabilityFactor("85");
    setElectricityRate("0.15");
    setPenstockLength("100");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-elec-yellow/20 p-2 rounded-md">
              <Droplets className="h-6 w-6 text-elec-yellow" />
            </div>
            <CardTitle>Micro-Hydro Calculator</CardTitle>
          </div>
          <p className="text-muted-foreground">
            Professional micro-hydro system analysis with accurate hydraulics and economics
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Quick Start Presets */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Quick Start Presets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {QUICK_START_PRESETS.map((preset, index) => (
                <Card 
                  key={index} 
                  className="cursor-pointer hover:border-elec-yellow/40 transition-colors"
                  onClick={() => applyPreset(preset)}
                >
                  <CardContent className="p-4">
                    <h4 className="font-medium text-white mb-2">{preset.name}</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>Flow: {preset.flow} m³/s</div>
                      <div>Head: {preset.head}m</div>
                      <div>Turbine: {TURBINE_TYPES[preset.turbineType as keyof typeof TURBINE_TYPES].name}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Site Parameters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">Site Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="Flow Rate (m³/s)"
                value={flow}
                onChange={(e) => setFlow(e.target.value)}
                placeholder="0.5"
                type="number"
                step="0.01"
              />
              <MobileInput
                label="Head (metres)"
                value={head}
                onChange={(e) => setHead(e.target.value)}
                placeholder="25"
                type="number"
                step="0.1"
              />
            </div>
          </div>

          {/* System Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-elec-yellow">System Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelect value={turbineType} onValueChange={setTurbineType}>
                <MobileSelectTrigger>
                  <MobileSelectValue placeholder="Auto-select turbine" />
                </MobileSelectTrigger>
                <MobileSelectContent>
                  <MobileSelectItem value="auto">Auto-select best turbine</MobileSelectItem>
                  {Object.entries(TURBINE_TYPES).map(([key, turbine]) => (
                    <MobileSelectItem key={key} value={key}>
                      {turbine.name} - {turbine.description}
                    </MobileSelectItem>
                  ))}
                </MobileSelectContent>
              </MobileSelect>

              <MobileInput
                label="Penstock Length (m)"
                value={penstockLength}
                onChange={(e) => setPenstockLength(e.target.value)}
                placeholder="100"
                type="number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileInput
                label="Availability Factor (%)"
                value={availabilityFactor}
                onChange={(e) => setAvailabilityFactor(e.target.value)}
                placeholder="85"
                type="number"
                step="1"
                min="0"
                max="100"
              />
              <MobileInput
                label="Electricity Rate (£/kWh)"
                value={electricityRate}
                onChange={(e) => setElectricityRate(e.target.value)}
                placeholder="0.15"
                type="number"
                step="0.01"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <MobileButton 
              onClick={calculateMicroHydro} 
              className="flex-1" 
              variant="elec"
              icon={<Calculator className="h-4 w-4" />}
            >
              Calculate
            </MobileButton>
            <MobileButton 
              onClick={resetCalculator} 
              variant="elec-outline"
              icon={<RotateCcw className="h-4 w-4" />}
            >
              Reset
            </MobileButton>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-elec-yellow">Results</h3>
              
              {/* Power Generation */}
              <ResultCard
                title="Power Generation"
                icon={<Zap className="h-5 w-5" />}
                className="border-elec-yellow/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Theoretical Power:</span>
                    <span className="font-medium text-right">{result.theoreticalPower.toFixed(1)} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Practical Power:</span>
                    <span className="font-medium text-elec-yellow text-right">{result.practicalPower.toFixed(1)} kW</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Generation:</span>
                    <span className="font-medium text-right">{(result.annualGeneration / 1000).toFixed(0)} MWh/year</span>
                  </div>
                </div>
              </ResultCard>

              {/* Turbine Analysis */}
              <ResultCard
                title="Turbine Analysis"
                icon={<Wrench className="h-5 w-5" />}
                className="border-blue-500/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Recommended:</span>
                    <span className="font-medium text-right">{result.recommendedTurbine}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Efficiency:</span>
                    <span className="font-medium text-right">{(result.turbineEfficiency * 100).toFixed(0)}%</span>
                  </div>
                  <div className="text-sm p-2 bg-muted/20 rounded">
                    <span className="font-medium">Suitability: </span>
                    <span>{result.turbineSuitability}</span>
                  </div>
                </div>
              </ResultCard>

              {/* Economic Analysis */}
              <ResultCard
                title="Economic Analysis"
                icon={<TrendingUp className="h-5 w-5" />}
                className="border-green-500/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Cost:</span>
                    <span className="font-medium text-right">£{Math.round(result.estimatedCost).toLocaleString()}</span>
                  </div>
                  
                  {/* Cost Breakdown */}
                  <div className="text-xs text-muted-foreground space-y-1 pl-2 border-l border-muted/20">
                    <div className="flex justify-between">
                      <span>• Turbine & Generator:</span>
                      <span>£{Math.round(result.practicalPower * TURBINE_TYPES[turbineType as keyof typeof TURBINE_TYPES]?.costPerKw || 3000).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Civil Works:</span>
                      <span>£{Math.round(Math.max(20000, result.practicalPower * 800)).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Electrical Systems:</span>
                      <span>£{Math.round(result.practicalPower * 600).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Penstock ({result.penstock.length}m):</span>
                      <span>£{Math.round(result.penstock.cost).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Installation (25%):</span>
                      <span>£{Math.round((result.estimatedCost - result.penstock.cost) * 0.2).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Cost per kW:</span>
                    <span className="font-medium text-right">£{Math.round(result.costPerKw).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Annual Revenue:</span>
                    <span className="font-medium text-right">£{Math.round(result.annualRevenue).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Payback Period:</span>
                    <span className="font-medium text-right">{result.paybackPeriod.toFixed(1)} years</span>
                  </div>
                  <div className="text-sm mt-2 p-2 bg-muted/20 rounded">
                    <span className="font-medium">Assessment: </span>
                    <span>{result.viabilityAssessment}</span>
                  </div>
                </div>
              </ResultCard>

              {/* Penstock Specifications */}
              <ResultCard
                title="Penstock Specifications"
                icon={<Droplets className="h-5 w-5" />}
                className="border-cyan-500/20"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Diameter:</span>
                    <span className="font-medium text-right">{result.penstock.diameter}mm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Material:</span>
                    <span className="font-medium text-right">{result.penstock.material}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Length:</span>
                    <span className="font-medium text-right">{result.penstock.length}m</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Cost:</span>
                    <span className="font-medium text-right">£{Math.round(result.penstock.cost).toLocaleString()}</span>
                  </div>
                </div>
              </ResultCard>

              {/* Important Notes */}
              <Alert className="border-orange-500/30 bg-orange-500/10">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-200">
                  <div className="space-y-2">
                    <div className="font-medium">Environmental Considerations:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.environmentalNotes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>

              <Alert className="border-blue-500/30 bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-200">
                  <div className="space-y-2">
                    <div className="font-medium">Regulatory Requirements:</div>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.regulatoryRequirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          <Alert className="border-elec-yellow/30 bg-elec-yellow/10">
            <Info className="h-4 w-4 text-elec-yellow" />
            <AlertDescription className="text-elec-yellow/90">
              This calculator provides preliminary estimates. Professional feasibility study and detailed design are essential for any micro-hydro project. Consider seasonal flow variations and environmental impact assessments.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default MicroHydroCalculator;