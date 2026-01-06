import { Badge } from "@/components/ui/badge";
import { Sun, Info, Calculator, Zap, TrendingUp, Lightbulb, CheckCircle, AlertTriangle, FileText, Shield, PoundSterling, BookOpen, ChevronDown } from "lucide-react";
import { useState } from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// Expanded UK locations with solar irradiance data (kWh/m²/year)
const UK_LOCATIONS = [
  { name: "London", irradiance: 1100 },
  { name: "Manchester", irradiance: 950 },
  { name: "Birmingham", irradiance: 1000 },
  { name: "Leeds", irradiance: 950 },
  { name: "Glasgow", irradiance: 850 },
  { name: "Edinburgh", irradiance: 900 },
  { name: "Cardiff", irradiance: 1050 },
  { name: "Belfast", irradiance: 850 },
  { name: "Bristol", irradiance: 1100 },
  { name: "Liverpool", irradiance: 950 },
  { name: "Newcastle", irradiance: 900 },
  { name: "Nottingham", irradiance: 1000 },
  { name: "Sheffield", irradiance: 950 },
  { name: "Brighton", irradiance: 1150 },
  { name: "Plymouth", irradiance: 1100 },
  { name: "Norwich", irradiance: 1050 },
  { name: "York", irradiance: 950 },
  { name: "Bath", irradiance: 1050 },
  { name: "Oxford", irradiance: 1050 },
  { name: "Cambridge", irradiance: 1000 },
  { name: "Exeter", irradiance: 1100 },
  { name: "Canterbury", irradiance: 1100 },
  { name: "Winchester", irradiance: 1100 },
  { name: "Inverness", irradiance: 800 },
  { name: "Aberdeen", irradiance: 850 },
  { name: "Dundee", irradiance: 850 },
  { name: "Stirling", irradiance: 850 },
  { name: "Perth", irradiance: 850 },
  { name: "Swansea", irradiance: 1000 },
  { name: "Newport", irradiance: 1050 },
  { name: "Bangor", irradiance: 950 },
  { name: "Derry", irradiance: 800 },
  { name: "Armagh", irradiance: 850 }
];

const locationOptions = UK_LOCATIONS.map(loc => ({
  value: loc.name,
  label: `${loc.name} (${loc.irradiance} kWh/m²/year)`
}));

const efficiencyOptions = [
  { value: "15", label: "15% (Budget panels - £1,000/kW)" },
  { value: "18", label: "18% (Standard panels - £1,400/kW)" },
  { value: "20", label: "20% (Premium panels - £1,800/kW)" },
  { value: "22", label: "22% (High-efficiency - £2,600/kW)" },
];

const orientationOptions = [
  { value: "south", label: "South (Best - 100%)" },
  { value: "southeast", label: "South-East (95%)" },
  { value: "southwest", label: "South-West (95%)" },
  { value: "east", label: "East (85%)" },
  { value: "west", label: "West (85%)" },
  { value: "north", label: "North (60%)" },
];

const selfConsumptionOptions = [
  { value: "25", label: "25% (Low - mostly away)" },
  { value: "35", label: "35% (Average UK)" },
  { value: "50", label: "50% (Working from home)" },
  { value: "70", label: "70% (With battery storage)" },
];

const SolarPVCalculator = () => {
  const [systemSize, setSystemSize] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [panelEfficiency, setPanelEfficiency] = useState<string>("20");
  const [roofOrientation, setRoofOrientation] = useState<string>("south");
  const [roofTilt, setRoofTilt] = useState<string>("35");
  const [electricityRate, setElectricityRate] = useState<string>("0.25");
  const [selfConsumptionRate, setSelfConsumptionRate] = useState<string>("35");
  const [exportRate, setExportRate] = useState<string>("0.05");
  const [showWorkings, setShowWorkings] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [result, setResult] = useState<{
    annualGeneration: number;
    dailyGeneration: number;
    annualSavings: number;
    paybackPeriod: number;
    co2Savings: number;
    systemEfficiency: number;
    orientationFactor: number;
    tiltFactor: number;
    dnoConnectionType: string;
    viability: string;
    costEstimate: {
      totalCost: number;
      breakdown: {
        panels: number;
        inverter: number;
        installation: number;
        electrical: number;
        scaffolding: number;
        mcsAndDno: number;
        vat: number;
      };
      costPerKw: number;
      category: string;
    };
  } | null>(null);

  const config = CALCULATOR_CONFIG['renewable'];

  const calculateCostEstimate = (systemSize: number, efficiency: number) => {
    let baseCostPerKw = 0;
    let category = "";

    if (efficiency <= 0.15) {
      baseCostPerKw = 1000;
      category = "Budget System";
    } else if (efficiency <= 0.18) {
      baseCostPerKw = 1400;
      category = "Standard System";
    } else if (efficiency <= 0.20) {
      baseCostPerKw = 1800;
      category = "Premium System";
    } else {
      baseCostPerKw = 2600;
      category = "High-Efficiency System";
    }

    const panels = systemSize * baseCostPerKw * 0.4;
    const inverter = systemSize * 600;
    const installation = systemSize * 800;
    const electrical = 800 + (systemSize * 200);
    const scaffolding = systemSize > 4 ? 1200 : 800;
    const mcsAndDno = systemSize <= 3.68 ? 400 : 800;

    const subtotal = panels + inverter + installation + electrical + scaffolding + mcsAndDno;
    const vat = subtotal * 0.05;
    const totalCost = subtotal + vat;

    return {
      totalCost: Math.round(totalCost),
      breakdown: {
        panels: Math.round(panels),
        inverter: Math.round(inverter),
        installation: Math.round(installation),
        electrical: Math.round(electrical),
        scaffolding: Math.round(scaffolding),
        mcsAndDno: Math.round(mcsAndDno),
        vat: Math.round(vat)
      },
      costPerKw: Math.round(totalCost / systemSize),
      category
    };
  };

  const calculateSolarPV = () => {
    const size = parseFloat(systemSize);
    const efficiency = parseFloat(panelEfficiency) / 100;
    const rate = parseFloat(electricityRate);
    const tilt = parseFloat(roofTilt);

    if (size > 0 && location && efficiency > 0) {
      const locationData = UK_LOCATIONS.find(loc => loc.name === location);
      if (!locationData) return;

      let irradiance = locationData.irradiance;

      let orientationFactor = 1.0;
      switch (roofOrientation) {
        case "south": orientationFactor = 1.0; break;
        case "southwest":
        case "southeast": orientationFactor = 0.95; break;
        case "east":
        case "west": orientationFactor = 0.85; break;
        case "north": orientationFactor = 0.6; break;
      }

      const optimalTilt = 35;
      const tiltDifference = Math.abs(tilt - optimalTilt);
      const tiltFactor = Math.max(0.7, 1 - (tiltDifference / 100));

      const systemEfficiency = efficiency * 0.85;
      const annualGeneration = size * irradiance * orientationFactor * tiltFactor * systemEfficiency;
      const dailyGeneration = annualGeneration / 365;

      const costEstimate = calculateCostEstimate(size, efficiency);

      const selfConsumption = parseFloat(selfConsumptionRate) / 100;
      const segExportRate = parseFloat(exportRate);

      const selfConsumedEnergy = annualGeneration * selfConsumption;
      const exportedEnergy = annualGeneration * (1 - selfConsumption);

      const savingsFromSelfConsumption = selfConsumedEnergy * rate;
      const incomeFromExport = exportedEnergy * segExportRate;
      const annualSavings = savingsFromSelfConsumption + incomeFromExport;

      const paybackPeriod = costEstimate.totalCost / annualSavings;
      const co2Savings = annualGeneration * 0.233;
      const dnoConnectionType = size <= 3.68 ? "G98" : "G99";

      let viability = "Poor";
      if (paybackPeriod < 8) viability = "Excellent";
      else if (paybackPeriod < 12) viability = "Good";
      else if (paybackPeriod < 16) viability = "Fair";

      setResult({
        annualGeneration: Math.round(annualGeneration),
        dailyGeneration: Math.round(dailyGeneration * 10) / 10,
        annualSavings: Math.round(annualSavings),
        paybackPeriod: Math.round(paybackPeriod * 10) / 10,
        co2Savings: Math.round(co2Savings),
        systemEfficiency: Math.round(systemEfficiency * 100),
        orientationFactor: Math.round(orientationFactor * 100),
        tiltFactor: Math.round(tiltFactor * 100),
        dnoConnectionType,
        viability,
        costEstimate
      });
    }
  };

  const reset = () => {
    setSystemSize("");
    setLocation("");
    setPanelEfficiency("20");
    setRoofOrientation("south");
    setRoofTilt("35");
    setElectricityRate("0.25");
    setSelfConsumptionRate("35");
    setExportRate("0.05");
    setResult(null);
  };

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="Solar PV System Calculator"
        description="Calculate solar panel performance, energy generation, and financial returns for UK installations"
      >
        {/* System Configuration */}
        <div
          className="space-y-4 p-4 rounded-xl border"
          style={{
            borderColor: `${config.gradientFrom}30`,
            background: `${config.gradientFrom}08`
          }}
        >
          <h4 className="font-medium text-white flex items-center gap-2 text-sm">
            <Sun className="h-4 w-4" style={{ color: config.gradientFrom }} />
            System Configuration
          </h4>

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="System Size"
              unit="kW"
              type="text"
              inputMode="decimal"
              value={systemSize}
              onChange={setSystemSize}
              placeholder="e.g. 4.0"
              hint="Typical UK homes: 3-6kW"
            />
            <CalculatorSelect
              label="Panel Efficiency"
              value={panelEfficiency}
              onChange={setPanelEfficiency}
              options={efficiencyOptions}
            />
            <CalculatorSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={[{ value: "", label: "Select location" }, ...locationOptions]}
            />
            <CalculatorSelect
              label="Roof Orientation"
              value={roofOrientation}
              onChange={setRoofOrientation}
              options={orientationOptions}
            />
            <CalculatorInput
              label="Roof Tilt"
              unit="°"
              type="text"
              inputMode="decimal"
              value={roofTilt}
              onChange={setRoofTilt}
              placeholder="35"
              hint="Optimal: 35°"
            />
            <CalculatorInput
              label="Electricity Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={electricityRate}
              onChange={setElectricityRate}
              placeholder="0.25"
              hint="UK average: £0.25"
            />
            <CalculatorSelect
              label="Self-consumption Rate"
              value={selfConsumptionRate}
              onChange={setSelfConsumptionRate}
              options={selfConsumptionOptions}
            />
            <CalculatorInput
              label="SEG Export Rate"
              unit="£/kWh"
              type="text"
              inputMode="decimal"
              value={exportRate}
              onChange={setExportRate}
              placeholder="0.05"
              hint="Typical: £0.04-0.15"
            />
          </CalculatorInputGrid>
        </div>

        <CalculatorActions
          category="renewable"
          onCalculate={calculateSolarPV}
          onReset={reset}
          isDisabled={!systemSize || !location}
        />
      </CalculatorCard>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="renewable">
            <div className="text-center pb-4 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Annual Generation</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.annualGeneration.toLocaleString()} kWh
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{ borderColor: `${config.gradientFrom}40`, color: config.gradientFrom }}
                >
                  {result.systemEfficiency}% Efficiency
                </Badge>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    result.viability === 'Excellent' ? 'border-green-500/40 text-green-400' :
                      result.viability === 'Good' ? 'border-blue-500/40 text-blue-400' :
                        result.viability === 'Fair' ? 'border-amber-500/40 text-amber-400' :
                          'border-red-500/40 text-red-400'
                  )}
                >
                  {result.viability} Viability
                </Badge>
              </div>
            </div>

            <ResultsGrid columns={3}>
              <ResultValue
                label="Daily Generation"
                value={result.dailyGeneration.toString()}
                unit="kWh"
                category="renewable"
                size="sm"
              />
              <ResultValue
                label="Annual Savings"
                value={`£${result.annualSavings}`}
                category="renewable"
                size="sm"
              />
              <ResultValue
                label="Payback Period"
                value={result.paybackPeriod.toString()}
                unit="years"
                category="renewable"
                size="sm"
              />
            </ResultsGrid>
          </CalculatorResult>

          {/* 2025 Cost Estimate */}
          <div className="calculator-card p-4" style={{ borderColor: '#fbbf2430' }}>
            <div className="flex items-center gap-2 mb-4">
              <PoundSterling className="h-5 w-5 text-amber-400" />
              <h3 className="font-semibold text-amber-300">2025 Cost Estimate</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-2xl font-bold text-amber-400">£{result.costEstimate.totalCost.toLocaleString()}</p>
                <p className="text-xs text-white/60">{result.costEstimate.category}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-2xl font-bold text-emerald-400">£{result.costEstimate.costPerKw.toLocaleString()}</p>
                <p className="text-xs text-white/60">Per kW installed</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Panels:</span>
                <span className="text-white">£{result.costEstimate.breakdown.panels.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Inverter:</span>
                <span className="text-white">£{result.costEstimate.breakdown.inverter.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Installation:</span>
                <span className="text-white">£{result.costEstimate.breakdown.installation.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Electrical:</span>
                <span className="text-white">£{result.costEstimate.breakdown.electrical.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Scaffolding:</span>
                <span className="text-white">£{result.costEstimate.breakdown.scaffolding.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>MCS & DNO:</span>
                <span className="text-white">£{result.costEstimate.breakdown.mcsAndDno.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white">VAT (5%):</span>
                <span className="text-amber-400 font-semibold">£{result.costEstimate.breakdown.vat.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="calculator-card p-4" style={{ borderColor: '#22c55e30' }}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-emerald-400" />
              <h3 className="font-semibold text-emerald-300">Environmental Impact</h3>
            </div>

            <ResultsGrid columns={2}>
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-2xl font-bold text-emerald-400">{result.co2Savings} kg</p>
                <p className="text-xs text-white/60">CO₂ Saved / Year</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-2xl font-bold text-emerald-400">{Math.round(result.co2Savings / 21)}</p>
                <p className="text-xs text-white/60">Trees Equivalent</p>
              </div>
            </ResultsGrid>
          </div>

          {/* Analysis & Recommendations - Collapsible */}
          <Collapsible open={showAnalysis} onOpenChange={setShowAnalysis}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa30' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">Analysis & Recommendations</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showAnalysis && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0 space-y-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <span className="font-medium text-emerald-300 text-sm">System Performance</span>
                  </div>
                  <div className="text-xs text-emerald-200/80 space-y-1">
                    <p>• {systemSize}kW system with {result.systemEfficiency}% overall efficiency</p>
                    <p>• {roofOrientation} orientation provides {result.orientationFactor}% of optimal</p>
                    <p>• {roofTilt}° tilt achieves {result.tiltFactor}% efficiency</p>
                    <p>• Expected 25-year generation: {Math.round(result.annualGeneration * 22.5 / 1000)} MWh</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    <span className="font-medium text-amber-300 text-sm">Financial Analysis</span>
                  </div>
                  <div className="text-xs text-amber-200/80 space-y-1">
                    <p>• Payback: {result.paybackPeriod} years using £{result.costEstimate.totalCost.toLocaleString()}</p>
                    <p>• Monthly savings: ~£{Math.round(result.annualSavings / 12)}</p>
                    <p>• 25-year total savings: £{Math.round(result.annualSavings * 22.5).toLocaleString()}</p>
                    <p>• Monthly financing: ~£{Math.round(result.costEstimate.totalCost / 120)} over 10 years</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                    <span className="font-medium text-blue-300 text-sm">Installation Tips</span>
                  </div>
                  <div className="text-xs text-blue-200/80 space-y-1">
                    <p>• Use MCS-certified installer for warranty and SEG</p>
                    <p>• Submit {result.dnoConnectionType} application before installation</p>
                    <p>• Consider optimisers if partial shading exists</p>
                    <p>• Install bird guards and cleaning access points</p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* Regulations & Standards - Collapsible */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">Regulations & Standards</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showRegs && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="font-medium text-amber-300 text-sm mb-2">BS 7671 (18th Edition)</p>
                  <div className="text-xs text-amber-200/80 space-y-1">
                    <p>• RCD protection required (411.3.3)</p>
                    <p>• DC isolator within 3m of PV array</p>
                    <p>• AC isolator accessible to firefighters</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="font-medium text-blue-300 text-sm mb-2">DNO Connection ({result.dnoConnectionType})</p>
                  <div className="text-xs text-blue-200/80 space-y-1">
                    <p>• {result.dnoConnectionType === 'G98' ? 'Simplified notification for ≤3.68kW' : 'Full application for >3.68kW'}</p>
                    <p>• Must not exceed 16A per phase</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="font-medium text-emerald-300 text-sm mb-2">MCS Certification</p>
                  <div className="text-xs text-emerald-200/80 space-y-1">
                    <p>• Required for SEG payments</p>
                    <p>• Ensures quality installation</p>
                    <p>• Insurance compliance</p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* How It Worked Out - Collapsible */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Calculator className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showWorkings && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="text-sm font-mono text-purple-300 space-y-3">
                  <div>
                    <p className="text-xs text-purple-400 mb-1">Step 1: System factors</p>
                    <p>Orientation: {roofOrientation} = {result.orientationFactor}%</p>
                    <p>Tilt: {roofTilt}° vs 35° optimal = {result.tiltFactor}%</p>
                    <p>Panel: {panelEfficiency}% × 0.85 = <span className="text-purple-200 font-bold">{result.systemEfficiency}%</span></p>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 2: Annual generation</p>
                    <p>E = Size × Irradiance × Factors</p>
                    <p>E = {systemSize}kW × {UK_LOCATIONS.find(l => l.name === location)?.irradiance}</p>
                    <p>E = <span className="text-purple-200 font-bold">{result.annualGeneration.toLocaleString()} kWh/year</span></p>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 3: Annual savings</p>
                    <p>Self: {Math.round(result.annualGeneration * parseFloat(selfConsumptionRate) / 100)} kWh × £{electricityRate}</p>
                    <p>Export: {Math.round(result.annualGeneration * (1 - parseFloat(selfConsumptionRate) / 100))} kWh × £{exportRate}</p>
                    <p>Total: <span className="text-purple-200 font-bold">£{result.annualSavings}/year</span></p>
                  </div>

                  <div className="pt-2 border-t border-purple-500/20">
                    <p className="text-xs text-purple-400 mb-1">Step 4: Payback</p>
                    <p>= £{result.costEstimate.totalCost.toLocaleString()} ÷ £{result.annualSavings}</p>
                    <p>= <span className="text-purple-200 font-bold">{result.paybackPeriod} years</span></p>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Annual Generation</strong> = System Size × Solar Irradiance × Orientation Factor × Tilt Factor × System Efficiency
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolarPVCalculator;
