import { useState, useCallback } from 'react';
import {
  Wind,
  Copy,
  Check,
  ChevronDown,
  TrendingUp,
  Clock,
  PoundSterling,
  Leaf,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  CalculatorSection,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

interface WindPowerResult {
  grossAEP: number;
  netAEP: number;
  capacityFactor: number;
  averagePower: number;
  dailyGeneration: number;
  monthlyGeneration: number;
  yearlyValue: number;
  selfConsumption: number;
  gridExport: number;
  co2Savings: number;
  paybackPeriod: number;
  windSpeedAtHub: number;
  turbulenceDerating: number;
  noablWarning: boolean;
  planningEligibility: {
    permittedDevelopment: boolean;
    reasons: string[];
  };
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

interface TurbinePreset {
  value: string;
  label: string;
  ratingKw: number;
  ratedSpeed: number;
}

const turbinePresets: TurbinePreset[] = [
  { value: '2.5kW', label: '2.5 kW Domestic', ratingKw: 2.5, ratedSpeed: 12 },
  { value: '5kW', label: '5 kW Small Commercial', ratingKw: 5, ratedSpeed: 11 },
  { value: '10kW', label: '10 kW Farm/Estate', ratingKw: 10, ratedSpeed: 12 },
  { value: '20kW', label: '20 kW Small Wind Farm', ratingKw: 20, ratedSpeed: 12 },
  { value: '50kW', label: '50 kW Commercial', ratingKw: 50, ratedSpeed: 12 },
];

const hubHeights = [
  { value: '10', label: '10m (Domestic)' },
  { value: '15', label: '15m (Standard)' },
  { value: '20', label: '20m (Small Commercial)' },
  { value: '25', label: '25m (Farm)' },
  { value: '30', label: '30m (Commercial)' },
  { value: '40', label: '40m (Large Commercial)' },
  { value: '50', label: '50m (Wind Farm)' },
];

const windClasses = [
  { value: '1', label: 'Class 1 (Poor — <14.3 mph)' },
  { value: '2', label: 'Class 2 (Marginal — 14.3–15.7 mph)' },
  { value: '3', label: 'Class 3 (Fair — 15.7–16.8 mph)' },
  { value: '4', label: 'Class 4 (Good — 16.8–17.9 mph)' },
  { value: '5', label: 'Class 5 (Excellent — 17.9–19.7 mph)' },
  { value: '6', label: 'Class 6 (Outstanding — 19.7–21.0 mph)' },
  { value: '7', label: 'Class 7 (Superb — >21.0 mph)' },
];

const terrainTypes = [
  { value: 'smooth', label: 'Smooth (Water, Ice, Flat Desert)' },
  { value: 'open', label: 'Open Country (Grassland)' },
  { value: 'rough', label: 'Rough Open (Farmland)' },
  { value: 'wooded', label: 'Wooded Country' },
  { value: 'urban', label: 'Urban/Suburban' },
];

const altitudeBands = [
  { value: '0', label: 'Sea Level (0–100m)' },
  { value: '200', label: 'Low Hills (100–300m)' },
  { value: '500', label: 'Moderate Hills (300–700m)' },
  { value: '1000', label: 'High Hills (700–1500m)' },
  { value: '1500', label: 'Mountains (>1500m)' },
];

const lossesPresets = [
  { value: 'low', label: 'Low Losses (5%)' },
  { value: 'medium', label: 'Medium Losses (10%)' },
  { value: 'high', label: 'High Losses (15%)' },
];

const electricityPrices = [
  { value: '0.20', label: '£0.20/kWh (Economy)' },
  { value: '0.25', label: '£0.25/kWh (Standard)' },
  { value: '0.30', label: '£0.30/kWh (Peak)' },
  { value: '0.35', label: '£0.35/kWh (Premium)' },
];

const exportRates = [
  { value: '0.03', label: '£0.03/kWh (Low SEG)' },
  { value: '0.05', label: '£0.05/kWh (Standard SEG)' },
  { value: '0.07', label: '£0.07/kWh (Good SEG)' },
  { value: '0.12', label: '£0.12/kWh (Premium SEG)' },
];

const annualConsumptions = [
  { value: '2900', label: '2,900 kWh (1–2 bed flat)' },
  { value: '3800', label: '3,800 kWh (3 bed house)' },
  { value: '4600', label: '4,600 kWh (4 bed house)' },
  { value: '5500', label: '5,500 kWh (5+ bed house)' },
  { value: '10000', label: '10,000 kWh (Small business)' },
  { value: '25000', label: '25,000 kWh (Medium business)' },
];

const selfConsumptionRates = [
  { value: '30', label: '30% (Standard household)' },
  { value: '50', label: '50% (Home office)' },
  { value: '70', label: '70% (Battery storage/EV)' },
  { value: '90', label: '90% (Commercial)' },
];

export function WindPowerCalculator() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [turbineModel, setTurbineModel] = useState('');
  const [hubHeight, setHubHeight] = useState('');
  const [averageWindSpeed, setAverageWindSpeed] = useState('');
  const [windClass, setWindClass] = useState('');
  const [terrain, setTerrain] = useState('');
  const [altitude, setAltitude] = useState('');
  const [losses, setLosses] = useState('');
  const [electricityPrice, setElectricityPrice] = useState('');
  const [exportRate, setExportRate] = useState('');
  const [annualConsumption, setAnnualConsumption] = useState('');
  const [selfConsumptionRate, setSelfConsumptionRate] = useState('');
  const [result, setResult] = useState<WindPowerResult | null>(null);

  const [showCosts, setShowCosts] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const getSelectedTurbine = (): TurbinePreset | undefined =>
    turbinePresets.find((t) => t.value === turbineModel);

  const calculateCostEstimate = (rating: number, height: number) => {
    let baseCostPerKw = 0;
    let category = '';

    if (rating <= 5) {
      baseCostPerKw = 4500;
      category = 'Small Domestic System';
    } else if (rating <= 15) {
      baseCostPerKw = 3500;
      category = 'Medium Domestic System';
    } else if (rating <= 30) {
      baseCostPerKw = 2800;
      category = 'Small Commercial System';
    } else {
      baseCostPerKw = 2200;
      category = 'Commercial System';
    }

    const turbine = rating * baseCostPerKw * 0.45;
    const tower = Math.max(15000, height * 800);
    const foundation = Math.max(8000, rating * 600);
    const electrical = 5000 + rating * 400;
    const planning = rating <= 10 ? 3000 : 8000;
    const installation = rating * 800;
    const commissioning = Math.max(2000, rating * 150);

    const subtotal =
      turbine + tower + foundation + electrical + planning + installation + commissioning;
    const vat = subtotal * 0.2;
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
        vat: Math.round(vat),
      },
      costPerKw: Math.round(totalCost / rating),
      category,
      annualMaintenance: Math.round(annualMaintenance),
    };
  };

  const handleCalculate = useCallback(() => {
    const preset = getSelectedTurbine();
    if (!preset) return;

    const rating = preset.ratingKw;
    const ratedSpeed = preset.ratedSpeed;
    const height = parseFloat(hubHeight);
    const windSpeedMph = parseFloat(averageWindSpeed);
    const windSpeed = windSpeedMph * 0.44704;
    const price = parseFloat(electricityPrice);
    const exportP = parseFloat(exportRate);
    const windClassNum = parseInt(windClass);
    const altitudeM = parseFloat(altitude);
    const consumption = parseFloat(annualConsumption);
    const selfConsRate = parseFloat(selfConsumptionRate) / 100;

    if (
      !rating ||
      !height ||
      !windSpeed ||
      !windClassNum ||
      !price ||
      !exportP ||
      !terrain ||
      !losses
    ) {
      return;
    }

    // Air density decreases with altitude (barometric formula)
    const airDensity = 1.225 * Math.exp(-altitudeM / 8400);
    const densityFactor = airDensity / 1.225;

    // Wind shear exponent by terrain roughness
    const roughnessFactors: Record<string, number> = {
      smooth: 0.1,
      open: 0.15,
      rough: 0.2,
      wooded: 0.25,
      urban: 0.3,
    };
    const alpha = roughnessFactors[terrain] || 0.15;

    // Power law wind speed extrapolation from 10m reference height
    const referenceHeight = 10;
    const windSpeedAtHub = windSpeed * Math.pow(height / referenceHeight, alpha);

    // Weibull distribution parameters (k=2 = Rayleigh distribution)
    const weibullK = 2.0;
    const weibullC = windSpeedAtHub / 0.887;

    // Turbine power curve parameters from preset data
    const cutIn = 3.0;
    const cutOut = 25;

    // Numerical integration of capacity factor using Weibull PDF × power curve
    let capacityFactor = 0;
    for (let v = 0; v <= 30; v += 0.5) {
      const probability =
        (weibullK / weibullC) *
        Math.pow(v / weibullC, weibullK - 1) *
        Math.exp(-Math.pow(v / weibullC, weibullK)) *
        0.5;

      let powerRatio = 0;
      if (v >= cutIn && v < ratedSpeed) {
        powerRatio = Math.pow((v - cutIn) / (ratedSpeed - cutIn), 3);
      } else if (v >= ratedSpeed && v < cutOut) {
        powerRatio = 1.0;
      }

      capacityFactor += probability * powerRatio;
    }

    // Turbulence intensity derating — urban/suburban sites lose more energy
    // to turbulent flow than clean open-country sites
    const turbulenceFactors: Record<string, number> = {
      smooth: 1.0,
      open: 0.97,
      rough: 0.93,
      wooded: 0.88,
      urban: 0.82,
    };
    const turbulenceDerating = turbulenceFactors[terrain] ?? 0.93;

    const lossFactors: Record<string, number> = { low: 0.95, medium: 0.9, high: 0.85 };
    const lossFactor = lossFactors[losses] || 0.9;

    const grossAEP = rating * capacityFactor * 8760 * densityFactor;
    const netAEP = grossAEP * lossFactor * turbulenceDerating;

    const averagePower = netAEP / 8760;
    const dailyGeneration = netAEP / 365;
    const monthlyGeneration = netAEP / 12;

    const selfConsumption = Math.min(netAEP, consumption * selfConsRate);
    const gridExport = netAEP - selfConsumption;
    const yearlyValue = selfConsumption * price + gridExport * exportP;

    const costEstimate = calculateCostEstimate(rating, height);
    // CO2 factor: 0.207 kg CO2/kWh — BEIS 2024 UK grid average
    const co2Savings = netAEP * 0.207;
    const paybackPeriod = costEstimate.totalCost / yearlyValue;

    // NOABL warning — database tends to overestimate wind speeds by ~23%
    const noablWarning = true; // Always show — it applies to all NOABL-sourced data

    // Permitted Development eligibility (England — standalone domestic turbine)
    // Max 11.1m to blade tip, max 3.8m² swept area, one per property
    const pdReasons: string[] = [];
    const tipHeight = height + 3; // approximate blade radius above hub
    if (tipHeight > 11.1) {
      pdReasons.push(`Blade tip height (${tipHeight.toFixed(0)}m) exceeds 11.1m PD limit`);
    }
    if (rating > 10) {
      pdReasons.push(`${rating}kW rating likely exceeds 3.8m² swept area PD limit`);
    }
    if (terrain === 'urban') {
      pdReasons.push('Urban location may have additional restrictions (conservation area, AONB)');
    }
    const planningEligibility = {
      permittedDevelopment: pdReasons.length === 0,
      reasons:
        pdReasons.length > 0
          ? pdReasons
          : ['May qualify for Permitted Development (standalone domestic)'],
    };

    setResult({
      grossAEP,
      netAEP,
      capacityFactor: capacityFactor * 100,
      averagePower,
      dailyGeneration,
      monthlyGeneration,
      yearlyValue,
      selfConsumption,
      gridExport,
      co2Savings,
      paybackPeriod,
      windSpeedAtHub,
      turbulenceDerating,
      noablWarning,
      planningEligibility,
      costEstimate,
    });
  }, [
    turbineModel,
    hubHeight,
    averageWindSpeed,
    windClass,
    terrain,
    altitude,
    losses,
    electricityPrice,
    exportRate,
    annualConsumption,
    selfConsumptionRate,
  ]);

  const handleReset = useCallback(() => {
    setTurbineModel('');
    setHubHeight('');
    setAverageWindSpeed('');
    setWindClass('');
    setTerrain('');
    setAltitude('');
    setLosses('');
    setElectricityPrice('');
    setExportRate('');
    setAnnualConsumption('');
    setSelfConsumptionRate('');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const preset = getSelectedTurbine();
    const text = [
      'Wind Power Analysis',
      `Turbine: ${preset?.label ?? turbineModel}`,
      `Hub Height: ${hubHeight}m`,
      `Wind at Hub: ${(result.windSpeedAtHub * 2.23694).toFixed(1)} mph`,
      `Capacity Factor: ${result.capacityFactor.toFixed(1)}%`,
      `Net Annual Energy: ${result.netAEP.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh`,
      `Annual Value: £${result.yearlyValue.toFixed(0)}`,
      `Payback: ${result.paybackPeriod.toFixed(1)} years`,
      `CO₂ Savings: ${result.co2Savings.toFixed(0)} kg/yr`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const hasValidInputs =
    turbineModel &&
    hubHeight &&
    averageWindSpeed &&
    windClass &&
    terrain &&
    altitude &&
    losses &&
    electricityPrice &&
    exportRate &&
    annualConsumption &&
    selfConsumptionRate;

  return (
    <CalculatorCard
      category={CAT}
      title="Wind Power Calculator"
      description="Design and analyse wind turbine installations"
      badge="G98/G99"
    >
      {/* Turbine Specification */}
      <CalculatorSection title="Turbine Specification">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Turbine Model"
            value={turbineModel}
            onChange={setTurbineModel}
            options={turbinePresets.map((t) => ({ value: t.value, label: t.label }))}
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
      </CalculatorSection>

      {/* Site Conditions */}
      <CalculatorSection title="Site Conditions">
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
      </CalculatorSection>

      {/* Economic Parameters */}
      <CalculatorSection title="Economic Parameters">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Electricity Price"
            value={electricityPrice}
            onChange={setElectricityPrice}
            options={electricityPrices}
            placeholder="Select price"
          />
          <CalculatorSelect
            label="Export Rate (SEG)"
            value={exportRate}
            onChange={setExportRate}
            options={exportRates}
            placeholder="Select rate"
          />
          <CalculatorSelect
            label="Annual Consumption"
            value={annualConsumption}
            onChange={setAnnualConsumption}
            options={annualConsumptions}
            placeholder="Select usage"
          />
          <CalculatorSelect
            label="Self-Consumption Rate"
            value={selfConsumptionRate}
            onChange={setSelfConsumptionRate}
            options={selfConsumptionRates}
            placeholder="Select rate"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!hasValidInputs}
        calculateLabel="Calculate Wind Power"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={
                result.capacityFactor >= 25
                  ? 'pass'
                  : result.capacityFactor >= 15
                    ? 'warning'
                    : 'fail'
              }
              label={
                result.capacityFactor >= 30
                  ? 'Excellent Site'
                  : result.capacityFactor >= 20
                    ? 'Good Site'
                    : result.capacityFactor >= 15
                      ? 'Marginal Site'
                      : 'Poor Site'
              }
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-colors touch-manipulation min-h-[44px]"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          {/* Hero value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Net Annual Energy</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.netAEP.toLocaleString(undefined, { maximumFractionDigits: 0 })} kWh
            </p>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Wind at Hub"
              value={(result.windSpeedAtHub * 2.23694).toFixed(1)}
              unit="mph"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Capacity Factor"
              value={result.capacityFactor.toFixed(1)}
              unit="%"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Avg Power"
              value={result.averagePower.toFixed(2)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Daily Output"
              value={result.dailyGeneration.toFixed(0)}
              unit="kWh"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Financial summary */}
          <div className="grid grid-cols-2 gap-3 pt-4 mt-4 border-t border-white/10">
            <div className="text-center p-3 rounded-lg bg-white/5">
              <Clock className="h-4 w-4 mx-auto mb-1 text-white" />
              <p className="text-xs text-white">Payback</p>
              <p
                className={cn(
                  'text-lg font-bold',
                  result.paybackPeriod <= 10
                    ? 'text-green-400'
                    : result.paybackPeriod <= 15
                      ? 'text-amber-400'
                      : 'text-red-400'
                )}
              >
                {result.paybackPeriod.toFixed(1)} yrs
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/5">
              <PoundSterling className="h-4 w-4 mx-auto mb-1 text-white" />
              <p className="text-xs text-white">Annual Value</p>
              <p className="text-lg font-bold text-green-400">£{result.yearlyValue.toFixed(0)}</p>
            </div>
          </div>

          <CalculatorDivider category={CAT} />

          {/* Financial breakdown */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Self-Consumed"
              value={result.selfConsumption.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              unit="kWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Grid Export"
              value={result.gridExport.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              unit="kWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="System Cost"
              value={`£${(result.costEstimate.totalCost / 1000).toFixed(0)}k`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Cost/kW"
              value={`£${result.costEstimate.costPerKw.toLocaleString()}`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Environmental Impact */}
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-400" />
              <p className="text-sm font-medium text-green-300">Environmental Impact</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-white">CO₂ Savings</p>
                <p className="font-semibold text-green-300">
                  {result.co2Savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} kg/yr
                </p>
              </div>
              <div>
                <p className="text-white">Equivalent Trees</p>
                <p className="font-semibold text-green-300">
                  {(result.co2Savings / 21.8).toFixed(0)} trees/yr
                </p>
              </div>
            </div>
          </div>

          {/* Turbulence derating */}
          {result.turbulenceDerating < 1.0 && (
            <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Turbulence Derating</p>
                <p className="text-xs text-white">
                  Energy loss due to turbulent airflow at this terrain type
                </p>
              </div>
              <p className="text-sm font-bold text-amber-400">
                {((1 - result.turbulenceDerating) * 100).toFixed(0)}% loss
              </p>
            </div>
          )}

          {/* NOABL warning */}
          {result.noablWarning && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">NOABL Wind Data Warning</p>
                  <p className="text-xs text-white">
                    NOABL database typically overestimates wind speeds by ~23%. If using NOABL data,
                    actual generation may be lower. 12+ months of on-site anemometer data is
                    strongly recommended.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Planning eligibility */}
          <div
            className={cn(
              'p-3 rounded-xl border',
              result.planningEligibility.permittedDevelopment
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            )}
          >
            <p className="text-sm font-medium text-white mb-1">
              Planning:{' '}
              {result.planningEligibility.permittedDevelopment
                ? 'May Qualify for Permitted Development'
                : 'Full Planning Permission Required'}
            </p>
            <ul className="space-y-0.5">
              {result.planningEligibility.reasons.map((r, i) => (
                <li key={i} className="text-xs text-white flex items-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white mt-1.5 shrink-0" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={(() => {
              const preset = getSelectedTurbine();
              const windSpeedMs = parseFloat(averageWindSpeed) * 0.44704;
              const height = parseFloat(hubHeight);
              return [
                {
                  label: 'Wind speed at hub height',
                  formula: `V_hub = V_ref × (H / H_ref)^α = ${windSpeedMs.toFixed(2)} × (${height} / 10)^α`,
                  value: `${(result.windSpeedAtHub * 2.23694).toFixed(1)} mph (${result.windSpeedAtHub.toFixed(2)} m/s)`,
                  description: `Power law extrapolation from 10m reference, terrain shear exponent α`,
                },
                {
                  label: 'Air density correction',
                  formula: `ρ = 1.225 × e^(−${altitude} / 8400)`,
                  value: `${(1.225 * Math.exp(-parseFloat(altitude) / 8400)).toFixed(3)} kg/m³`,
                },
                {
                  label: 'Capacity factor (Weibull integration)',
                  formula: `CF = Σ f(v) × P(v) / P_rated, k=2 (Rayleigh), rated=${preset?.ratedSpeed ?? 12} m/s`,
                  value: `${result.capacityFactor.toFixed(1)}%`,
                  description: 'Numerical integration of Weibull PDF × cubic power curve',
                },
                {
                  label: 'Gross annual energy production',
                  formula: `AEP_gross = ${preset?.ratingKw ?? '?'} kW × ${(result.capacityFactor / 100).toFixed(3)} × 8,760 h × density factor`,
                  value: `${result.grossAEP.toFixed(0)} kWh`,
                },
                {
                  label: 'Net AEP (after losses)',
                  formula: `AEP_net = ${result.grossAEP.toFixed(0)} × ${losses === 'low' ? '0.95' : losses === 'high' ? '0.85' : '0.90'}`,
                  value: `${result.netAEP.toFixed(0)} kWh`,
                },
                {
                  label: 'Annual value',
                  formula: `Value = ${result.selfConsumption.toFixed(0)} kWh × £${electricityPrice} + ${result.gridExport.toFixed(0)} kWh × £${exportRate}`,
                  value: `£${result.yearlyValue.toFixed(0)}/yr`,
                },
                {
                  label: 'Simple payback',
                  formula: `Payback = £${result.costEstimate.totalCost.toLocaleString()} / £${result.yearlyValue.toFixed(0)}`,
                  value: `${result.paybackPeriod.toFixed(1)} years`,
                },
              ];
            })()}
          />

          {/* Cost Breakdown */}
          <Collapsible open={showCosts} onOpenChange={setShowCosts}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <div className="flex items-center gap-2">
                <PoundSterling className="h-4 w-4 text-green-400" />
                <span>2025 Installation Cost Breakdown</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showCosts && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="text-center pb-3 border-b border-white/10">
                  <p className="text-2xl font-bold text-green-400">
                    £{result.costEstimate.totalCost.toLocaleString()}
                  </p>
                  <p className="text-sm text-white">{result.costEstimate.category}</p>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { label: 'Turbine', value: result.costEstimate.breakdown.turbine },
                    { label: 'Tower', value: result.costEstimate.breakdown.tower },
                    { label: 'Foundation', value: result.costEstimate.breakdown.foundation },
                    { label: 'Electrical', value: result.costEstimate.breakdown.electrical },
                    { label: 'Planning', value: result.costEstimate.breakdown.planning },
                    { label: 'Installation', value: result.costEstimate.breakdown.installation },
                    { label: 'Commissioning', value: result.costEstimate.breakdown.commissioning },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between">
                      <span className="text-white">{item.label}</span>
                      <span className="text-white">£{item.value.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-white">VAT (20%)</span>
                    <span className="text-green-400 font-semibold">
                      £{result.costEstimate.breakdown.vat.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white">Annual Maintenance</span>
                    <span className="text-amber-400">
                      £{result.costEstimate.annualMaintenance.toLocaleString()}/yr
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What This Means</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">
                    Capacity Factor ({result.capacityFactor.toFixed(1)}%)
                  </p>
                  <p className="text-sm text-white">
                    {result.capacityFactor < 20
                      ? 'Poor wind resource — turbine will run at low efficiency. Consider alternative location.'
                      : result.capacityFactor < 30
                        ? 'Moderate wind resource — viable but ensure proper feasibility study.'
                        : result.capacityFactor < 40
                          ? 'Good wind resource — commercially viable with reasonable returns.'
                          : 'Excellent wind resource — highly profitable installation.'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Wind Speed Enhancement</p>
                  <p className="text-sm text-white">
                    Your {hubHeight}m hub height increases wind speed from {averageWindSpeed}mph to{' '}
                    {(result.windSpeedAtHub * 2.23694).toFixed(1)}mph, demonstrating the importance
                    of turbine height.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Financial Viability</p>
                  <p className="text-sm text-white">
                    {result.paybackPeriod > 15
                      ? 'May not be financially viable without grants or subsidies.'
                      : result.paybackPeriod > 10
                        ? 'Moderate returns — consider incentives and electricity price trends.'
                        : "Strong financial returns over the turbine's 20–25 year lifespan."}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 & Planning */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 & Planning</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2 text-sm text-white">
                  <p>
                    <strong>Section 537:</strong> Install appropriate DC and AC isolators
                  </p>
                  <p>
                    <strong>Chapter 54:</strong> Earthing and bonding requirements
                  </p>
                  <p>
                    <strong>Chapter 44:</strong> Surge protection required
                  </p>
                  <p>
                    <strong>Appendix 4:</strong> Cable sizing for voltage drop
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10 space-y-2 text-sm text-white">
                  <p>
                    <strong>Planning:</strong> Turbines &gt;15m typically require full planning
                    permission
                  </p>
                  <p>
                    <strong>Noise:</strong> 45dB limit at nearest property boundary
                  </p>
                  <p>
                    <strong>Grid:</strong> G98 for ≤16A/phase, G99 for larger systems
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Professional assessment note */}
      <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
        <div className="flex items-start gap-2">
          <Wind className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Professional assessment essential.</strong> 12+ months anemometer data required
            for commercial viability.
          </p>
        </div>
      </div>

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Wind Power Formulas"
        formula="AEP = P_rated × CF × 8,760 h × ρ/ρ₀"
        variables={[
          { symbol: 'P_rated', description: 'Turbine rated power (kW)' },
          { symbol: 'CF', description: 'Capacity factor from Weibull integration' },
          { symbol: '8,760', description: 'Hours per year' },
          { symbol: 'ρ/ρ₀', description: 'Air density ratio (altitude correction)' },
        ]}
      />
    </CalculatorCard>
  );
}

export default WindPowerCalculator;
