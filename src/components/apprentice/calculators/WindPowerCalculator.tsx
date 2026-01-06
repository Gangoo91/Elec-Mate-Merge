import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Wind, Info, BookOpen, ChevronDown, TrendingUp, Clock, PoundSterling, Leaf } from "lucide-react";
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

interface WindPowerResult {
  grossAEP: number;
  netAEP: number;
  capacityFactor: number;
  averagePower: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyGeneration: number;
  yearlyValue: number;
  selfConsumption: number;
  gridExport: number;
  co2Savings: number;
  paybackPeriod: number;
  windSpeedAtHub: number;
  costEstimate: {
    totalCost: number;
    breakdown: {
      turbine: number;
      tower: number;
      foundation: number;
      electrical: number;
      planning: number;
      installation: number;
      commissioning: number;
      vat: number;
    };
    costPerKw: number;
    category: string;
    annualMaintenance: number;
  };
}

export function WindPowerCalculator() {
  const config = CALCULATOR_CONFIG['renewable'];

  const [turbineModel, setTurbineModel] = useState('');
  const [hubHeight, setHubHeight] = useState('');
  const [averageWindSpeed, setAverageWindSpeed] = useState('');
  const [windClass, setWindClass] = useState('');
  const [terrain, setTerrain] = useState('');
  const [altitude, setAltitude] = useState('');
  const [losses, setLosses] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [annualConsumption, setAnnualConsumption] = useState('');
  const [selfConsumptionRate, setSelfConsumptionRate] = useState('');
  const [result, setResult] = useState<WindPowerResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showCosts, setShowCosts] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const turbineModels = [
    { value: '2.5kW', label: '2.5 kW Domestic' },
    { value: '5kW', label: '5 kW Small Commercial' },
    { value: '10kW', label: '10 kW Farm/Estate' },
    { value: '20kW', label: '20 kW Small Wind Farm' },
    { value: '50kW', label: '50 kW Commercial' },
  ];

  const hubHeights = [
    { value: '10', label: '10m (Domestic)' },
    { value: '15', label: '15m (Standard)' },
    { value: '20', label: '20m (Small Commercial)' },
    { value: '25', label: '25m (Farm)' },
    { value: '30', label: '30m (Commercial)' },
    { value: '40', label: '40m (Large Commercial)' },
    { value: '50', label: '50m (Wind Farm)' }
  ];

  const windClasses = [
    { value: '1', label: 'Class 1 (Poor - <14.3 mph)' },
    { value: '2', label: 'Class 2 (Marginal - 14.3-15.7 mph)' },
    { value: '3', label: 'Class 3 (Fair - 15.7-16.8 mph)' },
    { value: '4', label: 'Class 4 (Good - 16.8-17.9 mph)' },
    { value: '5', label: 'Class 5 (Excellent - 17.9-19.7 mph)' },
    { value: '6', label: 'Class 6 (Outstanding - 19.7-21.0 mph)' },
    { value: '7', label: 'Class 7 (Superb - >21.0 mph)' }
  ];

  const terrainTypes = [
    { value: 'smooth', label: 'Smooth (Water, Ice, Flat Desert)' },
    { value: 'open', label: 'Open Country (Grassland)' },
    { value: 'rough', label: 'Rough Open (Farmland)' },
    { value: 'wooded', label: 'Wooded Country' },
    { value: 'urban', label: 'Urban/Suburban' }
  ];

  const altitudeBands = [
    { value: '0', label: 'Sea Level (0-100m)' },
    { value: '200', label: 'Low Hills (100-300m)' },
    { value: '500', label: 'Moderate Hills (300-700m)' },
    { value: '1000', label: 'High Hills (700-1500m)' },
    { value: '1500', label: 'Mountains (>1500m)' }
  ];

  const lossesPresets = [
    { value: 'low', label: 'Low Losses (5%)' },
    { value: 'medium', label: 'Medium Losses (10%)' },
    { value: 'high', label: 'High Losses (15%)' }
  ];

  const electricityPrices = [
    { value: '0.20', label: '£0.20/kWh (Economy)' },
    { value: '0.25', label: '£0.25/kWh (Standard)' },
    { value: '0.30', label: '£0.30/kWh (Peak)' },
    { value: '0.35', label: '£0.35/kWh (Premium)' }
  ];

  const annualConsumptions = [
    { value: '2900', label: '2,900 kWh (1-2 bed flat)' },
    { value: '3800', label: '3,800 kWh (3 bed house)' },
    { value: '4600', label: '4,600 kWh (4 bed house)' },
    { value: '5500', label: '5,500 kWh (5+ bed house)' },
    { value: '10000', label: '10,000 kWh (Small business)' },
    { value: '25000', label: '25,000 kWh (Medium business)' }
  ];

  const selfConsumptionRates = [
    { value: '30', label: '30% (Standard household)' },
    { value: '50', label: '50% (Home office)' },
    { value: '70', label: '70% (Battery storage/EV)' },
    { value: '90', label: '90% (Commercial)' }
  ];

  const getTurbineRating = () => {
    if (turbineModel === 'custom') return 0;
    return parseFloat(turbineModel.split('kW')[0]);
  };

  const calculateCostEstimate = (rating: number, height: number) => {
    let baseCostPerKw = 0;
    let category = "";

    if (rating <= 5) {
      baseCostPerKw = 4500;
      category = "Small Domestic System";
    } else if (rating <= 15) {
      baseCostPerKw = 3500;
      category = "Medium Domestic System";
    } else if (rating <= 30) {
      baseCostPerKw = 2800;
      category = "Small Commercial System";
    } else {
      baseCostPerKw = 2200;
      category = "Commercial System";
    }

    const turbine = rating * baseCostPerKw * 0.45;
    const tower = Math.max(15000, height * 800);
    const foundation = Math.max(8000, rating * 600);
    const electrical = 5000 + (rating * 400);
    const planning = rating <= 10 ? 3000 : 8000;
    const installation = rating * 800;
    const commissioning = Math.max(2000, rating * 150);

    const subtotal = turbine + tower + foundation + electrical + planning + installation + commissioning;
    const vat = subtotal * 0.20;
    const totalCost = subtotal + vat;
    const annualMaintenance = totalCost * 0.03;

    return {
      totalCost: Math.round(totalCost),
      breakdown: {
        turbine: Math.round(turbine),
        tower: Math.round(tower),
        foundation: Math.round(foundation),
        electrical: Math.round(electrical),
        planning: Math.round(planning),
        installation: Math.round(installation),
        commissioning: Math.round(commissioning),
        vat: Math.round(vat)
      },
      costPerKw: Math.round(totalCost / rating),
      category,
      annualMaintenance: Math.round(annualMaintenance)
    };
  };

  const calculateWindPower = () => {
    const rating = getTurbineRating();
    const height = parseFloat(hubHeight);
    const windSpeedMph = parseFloat(averageWindSpeed);
    const windSpeed = windSpeedMph * 0.44704;
    const price = parseFloat(electricityPrice);
    const windClassNum = parseInt(windClass);
    const altitudeM = parseFloat(altitude);
    const consumption = parseFloat(annualConsumption);
    const selfConsRate = parseFloat(selfConsumptionRate) / 100;

    if (!rating || !height || !windSpeed || !windClassNum || !price || !terrain || !losses) {
      return;
    }

    const airDensity = 1.225 * Math.exp(-altitudeM / 8400);
    const densityFactor = airDensity / 1.225;

    const roughnessFactors = {
      smooth: 0.10,
      open: 0.15,
      rough: 0.20,
      wooded: 0.25,
      urban: 0.30
    };
    const alpha = roughnessFactors[terrain as keyof typeof roughnessFactors] || 0.15;

    const referenceHeight = 10;
    const windSpeedAtHub = windSpeed * Math.pow(height / referenceHeight, alpha);

    const weibullK = 2.0;
    const weibullC = windSpeedAtHub / 0.887;

    const cutIn = 3.0;
    const rated = turbineModel.includes('2.5') ? 12 : turbineModel.includes('5') ? 11 : 12;
    const cutOut = 25;

    let capacityFactor = 0;
    for (let v = 0; v <= 30; v += 0.5) {
      const probability = (weibullK / weibullC) * Math.pow(v / weibullC, weibullK - 1) *
                         Math.exp(-Math.pow(v / weibullC, weibullK)) * 0.5;

      let powerRatio = 0;
      if (v >= cutIn && v < rated) {
        powerRatio = Math.pow((v - cutIn) / (rated - cutIn), 3);
      } else if (v >= rated && v < cutOut) {
        powerRatio = 1.0;
      }

      capacityFactor += probability * powerRatio;
    }

    const lossFactors = { low: 0.95, medium: 0.90, high: 0.85 };
    const lossFactor = lossFactors[losses as keyof typeof lossFactors] || 0.90;

    const grossAEP = rating * capacityFactor * 8760 * densityFactor;
    const netAEP = grossAEP * lossFactor;

    const averagePower = netAEP / 8760;
    const dailyGeneration = netAEP / 365;
    const monthlyGeneration = netAEP / 12;

    const selfConsumption = Math.min(netAEP, consumption * selfConsRate);
    const gridExport = netAEP - selfConsumption;
    const exportPrice = price * 0.75;
    const yearlyValue = (selfConsumption * price) + (gridExport * exportPrice);

    const costEstimate = calculateCostEstimate(rating, height);
    const co2Savings = netAEP * 0.193;
    const paybackPeriod = costEstimate.totalCost / yearlyValue;

    setResult({
      grossAEP,
      netAEP,
      capacityFactor: capacityFactor * 100,
      averagePower,
      dailyGeneration,
      monthlyGeneration,
      yearlyGeneration: netAEP,
      yearlyValue,
      selfConsumption,
      gridExport,
      co2Savings,
      paybackPeriod,
      windSpeedAtHub,
      costEstimate
    });
  };

  const reset = () => {
    setTurbineModel('');
    setHubHeight('');
    setAverageWindSpeed('');
    setWindClass('');
    setTerrain('');
    setAltitude('');
    setLosses('');
    setElectricityPrice('');
    setAnnualConsumption('');
    setSelfConsumptionRate('');
    setResult(null);
  };

  const hasValidInputs = () => turbineModel && hubHeight && averageWindSpeed && windClass && terrain && altitude && losses && electricityPrice && annualConsumption && selfConsumptionRate;

  const getPaybackColor = (years: number) => years <= 10 ? 'text-green-400' : years <= 15 ? 'text-amber-400' : 'text-red-400';
  const getCapacityColor = (cf: number) => cf >= 30 ? 'text-green-400' : cf >= 20 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="renewable"
        title="Wind Power Calculator"
        description="Design and analyse wind turbine installations"
        badge="G98/G99"
      >
        {/* Turbine Specification */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Turbine Specification</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Turbine Model"
              value={turbineModel}
              onChange={setTurbineModel}
              options={turbineModels}
              placeholder="Select turbine"
            />
            <CalculatorSelect
              label="Hub Height"
              value={hubHeight}
              onChange={setHubHeight}
              options={hubHeights}
              placeholder="Select height"
            />
          </CalculatorInputGrid>
        </div>

        {/* Site Conditions */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Site Conditions</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Wind Speed (at 10m)"
              unit="mph"
              type="text"
              inputMode="decimal"
              value={averageWindSpeed}
              onChange={setAverageWindSpeed}
              placeholder="e.g., 14"
            />
            <CalculatorSelect
              label="Wind Class"
              value={windClass}
              onChange={setWindClass}
              options={windClasses}
              placeholder="Select class"
            />
            <CalculatorSelect
              label="Terrain Type"
              value={terrain}
              onChange={setTerrain}
              options={terrainTypes}
              placeholder="Select terrain"
            />
            <CalculatorSelect
              label="Site Altitude"
              value={altitude}
              onChange={setAltitude}
              options={altitudeBands}
              placeholder="Select altitude"
            />
          </CalculatorInputGrid>
          <CalculatorSelect
            label="System Losses"
            value={losses}
            onChange={setLosses}
            options={lossesPresets}
            placeholder="Select losses"
          />
        </div>

        {/* Economic Parameters */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Economic Parameters</p>
          <CalculatorInputGrid columns={2}>
            <CalculatorSelect
              label="Electricity Price"
              value={electricityPrice}
              onChange={setElectricityPrice}
              options={electricityPrices}
              placeholder="Select price"
            />
            <CalculatorSelect
              label="Annual Consumption"
              value={annualConsumption}
              onChange={setAnnualConsumption}
              options={annualConsumptions}
              placeholder="Select usage"
            />
          </CalculatorInputGrid>
          <CalculatorSelect
            label="Self-Consumption Rate"
            value={selfConsumptionRate}
            onChange={setSelfConsumptionRate}
            options={selfConsumptionRates}
            placeholder="Select rate"
          />
        </div>

        <CalculatorActions
          category="renewable"
          onCalculate={calculateWindPower}
          onReset={reset}
          isDisabled={!hasValidInputs()}
          calculateLabel="Calculate Wind Power"
        />
      </CalculatorCard>

      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="renewable">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Wind Power Analysis</span>
              <Badge variant="outline" className={cn(
                result.capacityFactor >= 25 ? "text-green-400 border-green-400/50" : "text-amber-400 border-amber-400/50"
              )}>
                {result.capacityFactor >= 30 ? "Excellent Site" : result.capacityFactor >= 20 ? "Good Site" : "Marginal Site"}
              </Badge>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Net Annual Energy</p>
              <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                {result.netAEP.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Wind at Hub" value={(result.windSpeedAtHub * 2.23694).toFixed(1)} unit="mph" category="renewable" size="sm" />
              <ResultValue label="Capacity Factor" value={result.capacityFactor.toFixed(1)} unit="%" category="renewable" size="sm" />
              <ResultValue label="Avg Power" value={result.averagePower.toFixed(2)} unit="kW" category="renewable" size="sm" />
              <ResultValue label="Daily Output" value={result.dailyGeneration.toFixed(0)} unit="kWh" category="renewable" size="sm" />
            </ResultsGrid>

            <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-white/10">
              <div className="text-center p-3 rounded-lg bg-white/5">
                <Clock className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <p className="text-xs text-white/60">Payback</p>
                <p className={cn("text-lg font-bold", getPaybackColor(result.paybackPeriod))}>
                  {result.paybackPeriod.toFixed(1)} yrs
                </p>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5">
                <PoundSterling className="h-4 w-4 mx-auto mb-1 text-white/60" />
                <p className="text-xs text-white/60">Annual Value</p>
                <p className="text-lg font-bold text-green-400">
                  £{result.yearlyValue.toFixed(0)}
                </p>
              </div>
            </div>
          </CalculatorResult>

          {/* Financial Summary */}
          <CalculatorResult category="renewable">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-white">Financial Summary</span>
            </div>
            <ResultsGrid columns={2}>
              <ResultValue label="Self-Consumed" value={result.selfConsumption.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="kWh" category="renewable" size="sm" />
              <ResultValue label="Grid Export" value={result.gridExport.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="kWh" category="renewable" size="sm" />
              <ResultValue label="System Cost" value={`£${(result.costEstimate.totalCost / 1000).toFixed(0)}k`} category="renewable" size="sm" />
              <ResultValue label="Cost/kW" value={`£${result.costEstimate.costPerKw.toLocaleString()}`} category="renewable" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Environmental Impact */}
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <p className="text-sm font-medium text-green-300">Environmental Impact</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-green-200/80">CO₂ Savings</p>
                <p className="font-semibold text-green-300">{result.co2Savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg/yr</p>
              </div>
              <div>
                <p className="text-green-200/80">Equivalent Trees</p>
                <p className="font-semibold text-green-300">{(result.co2Savings / 21.8).toFixed(0)} trees/yr</p>
              </div>
            </div>
          </div>

          {/* Cost Breakdown Collapsible */}
          <Collapsible open={showCosts} onOpenChange={setShowCosts}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#22c55e15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <PoundSterling className="h-4 w-4 text-green-400" />
                  <span className="text-sm sm:text-base font-medium text-green-300">2025 Installation Cost Breakdown</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform duration-200", showCosts && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="text-center pb-3 border-b border-white/10">
                  <p className="text-2xl font-bold text-green-400">£{result.costEstimate.totalCost.toLocaleString()}</p>
                  <p className="text-sm text-white/60">{result.costEstimate.category}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-white/70">Turbine</span><span className="text-white">£{result.costEstimate.breakdown.turbine.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Tower</span><span className="text-white">£{result.costEstimate.breakdown.tower.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Foundation</span><span className="text-white">£{result.costEstimate.breakdown.foundation.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Electrical</span><span className="text-white">£{result.costEstimate.breakdown.electrical.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Planning</span><span className="text-white">£{result.costEstimate.breakdown.planning.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Installation</span><span className="text-white">£{result.costEstimate.breakdown.installation.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Commissioning</span><span className="text-white">£{result.costEstimate.breakdown.commissioning.toLocaleString()}</span></div>
                  <div className="flex justify-between pt-2 border-t border-white/10"><span className="text-white/70">VAT (20%)</span><span className="text-green-400 font-semibold">£{result.costEstimate.breakdown.vat.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-white/70">Annual Maintenance</span><span className="text-amber-400">£{result.costEstimate.annualMaintenance.toLocaleString()}/yr</span></div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-blue-300 mb-1">Capacity Factor ({result.capacityFactor.toFixed(1)}%)</p>
                  <p className="text-sm text-blue-200/80">
                    {result.capacityFactor < 20 ? "Poor wind resource - turbine will run at low efficiency. Consider alternative location." :
                    result.capacityFactor < 30 ? "Moderate wind resource - viable but ensure proper feasibility study." :
                    result.capacityFactor < 40 ? "Good wind resource - commercially viable with reasonable returns." :
                    "Excellent wind resource - highly profitable installation."}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-blue-300 mb-1">Wind Speed Enhancement</p>
                  <p className="text-sm text-blue-200/80">
                    Your {hubHeight}m hub height increases wind speed from {averageWindSpeed}mph to {(result.windSpeedAtHub * 2.23694).toFixed(1)}mph, demonstrating the importance of turbine height.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-blue-300 mb-1">Financial Viability</p>
                  <p className="text-sm text-blue-200/80">
                    {result.paybackPeriod > 15 ? "May not be financially viable without grants or subsidies." :
                    result.paybackPeriod > 10 ? "Moderate returns - consider incentives and electricity price trends." :
                    "Strong financial returns over the turbine's 20-25 year lifespan."}
                  </p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 & Planning */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 & Planning</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/40 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-3">
                <div className="space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Section 537:</strong> Install appropriate DC and AC isolators</p>
                  <p><strong className="text-amber-300">Chapter 54:</strong> Earthing and bonding requirements</p>
                  <p><strong className="text-amber-300">Chapter 44:</strong> Surge protection required</p>
                  <p><strong className="text-amber-300">Appendix 4:</strong> Cable sizing for voltage drop</p>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-2 text-sm text-amber-200/80">
                  <p><strong className="text-amber-300">Planning:</strong> Turbines &gt;15m typically require full planning permission</p>
                  <p><strong className="text-amber-300">Noise:</strong> 45dB limit at nearest property boundary</p>
                  <p><strong className="text-amber-300">Grid:</strong> G98 for ≤16A/phase, G99 for larger systems</p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Wind className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-green-200">
            <strong>Professional assessment essential.</strong> 12+ months anemometer data required for commercial viability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WindPowerCalculator;
