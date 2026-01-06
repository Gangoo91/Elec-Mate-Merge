import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Droplets, Info, BookOpen, ChevronDown, TrendingUp, Clock, PoundSterling, AlertTriangle, Wrench, Zap } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

const TURBINE_TYPES = {
  pelton: { name: "Pelton Wheel", minHead: 50, maxFlow: 2.0, efficiency: 0.90, costPerKw: 3500, description: "High-head, low-flow" },
  turgo: { name: "Turgo Impulse", minHead: 30, maxFlow: 5.0, efficiency: 0.87, costPerKw: 3200, description: "Medium-high head" },
  francis: { name: "Francis Turbine", minHead: 10, maxFlow: 20.0, efficiency: 0.92, costPerKw: 2800, description: "Medium head, high flow" },
  kaplan: { name: "Kaplan/Propeller", minHead: 2, maxFlow: 50.0, efficiency: 0.93, costPerKw: 4000, description: "Low head, high flow" },
  crossflow: { name: "Cross-flow (Banki)", minHead: 5, maxFlow: 10.0, efficiency: 0.85, costPerKw: 2500, description: "Versatile for varying flows" }
};

const QUICK_START_PRESETS = [
  { name: "High-head Pelton", flow: "0.05", head: "150", turbineType: "pelton", description: "Mountain stream" },
  { name: "Medium-head Francis", flow: "0.5", head: "25", turbineType: "francis", description: "River weir" },
  { name: "Low-head Kaplan", flow: "5.0", head: "8", turbineType: "kaplan", description: "Large river" },
  { name: "Small Crossflow", flow: "0.2", head: "12", turbineType: "crossflow", description: "Small stream" }
];

interface MicroHydroResult {
  theoreticalPower: number;
  practicalPower: number;
  annualGeneration: number;
  recommendedTurbine: string;
  turbineEfficiency: number;
  turbineSuitability: string;
  estimatedCost: number;
  costPerKw: number;
  annualRevenue: number;
  paybackPeriod: number;
  penstock: { diameter: number; length: number; material: string; cost: number; };
  environmentalNotes: string[];
  regulatoryRequirements: string[];
  viabilityAssessment: string;
}

const MicroHydroCalculator = () => {
  const config = CALCULATOR_CONFIG['renewable'];

  const [flow, setFlow] = useState("");
  const [head, setHead] = useState("");
  const [turbineType, setTurbineType] = useState("");
  const [availabilityFactor, setAvailabilityFactor] = useState("85");
  const [electricityRate, setElectricityRate] = useState("0.15");
  const [penstockLength, setPenstockLength] = useState("100");
  const [result, setResult] = useState<MicroHydroResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const turbineOptions = [
    { value: "auto", label: "Auto-select best turbine" },
    ...Object.entries(TURBINE_TYPES).map(([key, t]) => ({ value: key, label: `${t.name} - ${t.description}` }))
  ];

  const determineBestTurbine = (head: number, flow: number): string => {
    if (head >= 50 && flow <= 2.0) return "pelton";
    if (head >= 30 && head < 50) return "turgo";
    if (head >= 10 && head < 30) return "francis";
    if (head >= 2 && head < 10) return "kaplan";
    return "crossflow";
  };

  const assessTurbineSuitability = (head: number, flow: number, turbine: string): string => {
    const turbineData = TURBINE_TYPES[turbine as keyof typeof TURBINE_TYPES];
    if (head < turbineData.minHead) return "⚠️ Head too low for optimal efficiency";
    if (flow > turbineData.maxFlow) return "⚠️ Flow too high, consider multiple units";
    return "✅ Excellent match for site conditions";
  };

  const assessViability = (power: number, payback: number): string => {
    if (power < 5) return "⚠️ Very small system - check economics carefully";
    if (payback > 20) return "❌ Poor economics - payback too long";
    if (payback > 15) return "⚠️ Marginal economics - consider improvements";
    if (payback > 10) return "✅ Reasonable economics";
    return "✅ Excellent economics - highly viable";
  };

  const calculateMicroHydro = () => {
    const flowValue = parseFloat(flow);
    const headValue = parseFloat(head);
    const availabilityValue = parseFloat(availabilityFactor) / 100;
    const rateValue = parseFloat(electricityRate);
    const penstockLengthValue = parseFloat(penstockLength);

    if (!flowValue || !headValue || flowValue <= 0 || headValue <= 0) return;

    let selectedTurbine = turbineType;
    if (!selectedTurbine || selectedTurbine === "auto") {
      selectedTurbine = determineBestTurbine(headValue, flowValue);
    }

    const turbineData = TURBINE_TYPES[selectedTurbine as keyof typeof TURBINE_TYPES];

    // Power: P = ρ × g × Q × H × η (kW)
    const theoreticalPower = (1000 * 9.81 * flowValue * headValue) / 1000;
    const practicalPower = theoreticalPower * turbineData.efficiency * 0.95;
    const annualGeneration = practicalPower * 8760 * availabilityValue;

    // Penstock sizing
    const velocity = 2.5;
    const area = flowValue / velocity;
    const diameter = Math.sqrt(4 * area / Math.PI) * 1000;
    const penstockCost = penstockLengthValue * 150;

    // Cost estimation
    const turbineCost = practicalPower * turbineData.costPerKw;
    const civilWorks = Math.max(20000, practicalPower * 800);
    const electrical = practicalPower * 600;
    const installation = (turbineCost + civilWorks + electrical) * 0.25;
    const totalCost = turbineCost + civilWorks + electrical + installation + penstockCost;

    const annualRevenue = annualGeneration * rateValue;
    const paybackPeriod = totalCost / annualRevenue;
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
      penstock: { diameter: Math.round(diameter), length: penstockLengthValue, material: diameter > 600 ? "Steel" : "HDPE", cost: penstockCost },
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

  const hasValidInputs = () => flow && head && parseFloat(flow) > 0 && parseFloat(head) > 0;

  const getPaybackColor = (years: number) => years <= 10 ? 'text-green-400' : years <= 15 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="Micro-Hydro Calculator"
        description="Professional micro-hydro system analysis with accurate hydraulics"
        badge="G59/G83"
      >
        {/* Quick Start Presets */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Quick Start Presets</p>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_START_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="p-3 text-left rounded-xl bg-white/5 border border-white/10 hover:border-green-500/50 hover:bg-green-500/10 transition-colors"
              >
                <p className="text-sm font-medium text-white">{preset.name}</p>
                <p className="text-xs text-white/60">{preset.flow} m³/s • {preset.head}m head</p>
              </button>
            ))}
          </div>
        </div>

        {/* Site Parameters */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Site Parameters</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Flow Rate"
              unit="m³/s"
              type="text"
              inputMode="decimal"
              value={flow}
              onChange={setFlow}
              placeholder="e.g., 0.5"
            />
            <CalculatorInput
              label="Head"
              unit="m"
              type="text"
              inputMode="decimal"
              value={head}
              onChange={setHead}
              placeholder="e.g., 25"
            />
          </CalculatorInputGrid>
        </div>

        {/* System Configuration */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">System Configuration</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Turbine Type"
              value={turbineType}
              onChange={setTurbineType}
              options={turbineOptions}
              placeholder="Auto-select"
            />
            <CalculatorInput
              label="Penstock Length"
              unit="m"
              type="text"
              inputMode="decimal"
              value={penstockLength}
              onChange={setPenstockLength}
              placeholder="e.g., 100"
            />
            <CalculatorInput
              label="Availability Factor"
              unit="%"
              type="text"
              inputMode="decimal"
              value={availabilityFactor}
              onChange={setAvailabilityFactor}
              placeholder="85"
            />
            <CalculatorInput
              label="Electricity Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={electricityRate}
              onChange={setElectricityRate}
              placeholder="0.15"
            />
          </CalculatorInputGrid>
        </div>

        <CalculatorActions
          category="renewable"
          onCalculate={calculateMicroHydro}
          onReset={resetCalculator}
          isDisabled={!hasValidInputs()}
          calculateLabel="Calculate"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Power Generation */}
          <CalculatorResult category="renewable">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white">Power Generation</span>
              </div>
              <Badge variant="outline" className={cn(
                result.practicalPower >= 10 ? "text-green-400 border-green-400/50" : "text-amber-400 border-amber-400/50"
              )}>
                {result.practicalPower >= 50 ? "Commercial" : result.practicalPower >= 10 ? "Small Commercial" : "Micro System"}
              </Badge>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Practical Power Output</p>
              <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                {result.practicalPower.toFixed(1)} kW
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Theoretical Power" value={result.theoreticalPower.toFixed(1)} unit="kW" category="renewable" size="sm" />
              <ResultValue label="Annual Generation" value={(result.annualGeneration / 1000).toFixed(0)} unit="MWh" category="renewable" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Turbine Analysis */}
          <CalculatorResult category="renewable">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Wrench className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Turbine Analysis</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Recommended" value={result.recommendedTurbine} category="renewable" size="sm" />
              <ResultValue label="Efficiency" value={(result.turbineEfficiency * 100).toFixed(0)} unit="%" category="renewable" size="sm" />
            </ResultsGrid>
            <div className="mt-3 p-2 rounded-lg bg-white/5 text-sm text-white/80">
              {result.turbineSuitability}
            </div>
          </CalculatorResult>

          {/* Economic Analysis */}
          <CalculatorResult category="renewable">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white">Economic Analysis</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Total Cost" value={`£${Math.round(result.estimatedCost / 1000)}k`} category="renewable" size="sm" />
              <ResultValue label="Cost/kW" value={`£${Math.round(result.costPerKw).toLocaleString()}`} category="renewable" size="sm" />
              <ResultValue label="Annual Revenue" value={`£${Math.round(result.annualRevenue).toLocaleString()}`} category="renewable" size="sm" />
              <div className="text-center p-2">
                <p className="text-xs text-white/60">Payback</p>
                <p className={cn("text-lg font-bold", getPaybackColor(result.paybackPeriod))}>
                  {result.paybackPeriod.toFixed(1)} yrs
                </p>
              </div>
            </ResultsGrid>
            <div className="mt-3 p-2 rounded-lg bg-white/5 text-sm text-white/80">
              {result.viabilityAssessment}
            </div>
          </CalculatorResult>

          {/* Penstock Specifications */}
          <CalculatorResult category="renewable">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <Droplets className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-white">Penstock Specifications</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Diameter" value={result.penstock.diameter} unit="mm" category="renewable" size="sm" />
              <ResultValue label="Material" value={result.penstock.material} category="renewable" size="sm" />
              <ResultValue label="Length" value={result.penstock.length} unit="m" category="renewable" size="sm" />
              <ResultValue label="Cost" value={`£${result.penstock.cost.toLocaleString()}`} category="renewable" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Environmental Considerations */}
          <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <p className="text-sm font-medium text-orange-300">Environmental Considerations</p>
            </div>
            <ul className="space-y-1 text-sm text-orange-200/80">
              {result.environmentalNotes.map((note, idx) => (
                <li key={idx}>• {note}</li>
              ))}
            </ul>
          </div>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2">
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Power Output:</strong> Your {flow} m³/s flow rate with {head}m head produces {result.practicalPower.toFixed(1)}kW - enough to power approximately {Math.round(result.practicalPower / 3)} average homes.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Turbine Selection:</strong> {result.recommendedTurbine} at {(result.turbineEfficiency * 100).toFixed(0)}% efficiency is optimal for your site conditions.
                </p>
                <p className="text-sm text-blue-200/80">
                  <strong className="text-blue-300">Economics:</strong> {result.paybackPeriod < 10 ? "Strong returns expected - good investment opportunity." : result.paybackPeriod < 15 ? "Moderate returns - consider grants or incentives." : "Long payback - may need subsidies to be viable."}
                </p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Regulatory Requirements */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Regulatory Requirements</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <ul className="space-y-2 text-sm text-amber-200/80">
                  {result.regulatoryRequirements.map((req, idx) => (
                    <li key={idx}>• {req}</li>
                  ))}
                </ul>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-200">
            <strong>Preliminary estimates only.</strong> Professional feasibility study essential. Consider seasonal flow variations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MicroHydroCalculator;
