import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

// Expanded UK locations with solar irradiance data (kWh/m²/year)
const UK_LOCATIONS = [
  { name: 'London', irradiance: 1100 },
  { name: 'Manchester', irradiance: 950 },
  { name: 'Birmingham', irradiance: 1000 },
  { name: 'Leeds', irradiance: 950 },
  { name: 'Glasgow', irradiance: 850 },
  { name: 'Edinburgh', irradiance: 900 },
  { name: 'Cardiff', irradiance: 1050 },
  { name: 'Belfast', irradiance: 850 },
  { name: 'Bristol', irradiance: 1100 },
  { name: 'Liverpool', irradiance: 950 },
  { name: 'Newcastle', irradiance: 900 },
  { name: 'Nottingham', irradiance: 1000 },
  { name: 'Sheffield', irradiance: 950 },
  { name: 'Brighton', irradiance: 1150 },
  { name: 'Plymouth', irradiance: 1100 },
  { name: 'Norwich', irradiance: 1050 },
  { name: 'York', irradiance: 950 },
  { name: 'Bath', irradiance: 1050 },
  { name: 'Oxford', irradiance: 1050 },
  { name: 'Cambridge', irradiance: 1000 },
  { name: 'Exeter', irradiance: 1100 },
  { name: 'Canterbury', irradiance: 1100 },
  { name: 'Winchester', irradiance: 1100 },
  { name: 'Inverness', irradiance: 800 },
  { name: 'Aberdeen', irradiance: 850 },
  { name: 'Dundee', irradiance: 850 },
  { name: 'Stirling', irradiance: 850 },
  { name: 'Perth', irradiance: 850 },
  { name: 'Swansea', irradiance: 1000 },
  { name: 'Newport', irradiance: 1050 },
  { name: 'Bangor', irradiance: 950 },
  { name: 'Derry', irradiance: 800 },
  { name: 'Armagh', irradiance: 850 },
];

const locationOptions = UK_LOCATIONS.map((loc) => ({
  value: loc.name,
  label: `${loc.name} (${loc.irradiance} kWh/m²/year)`,
}));

// Performance Ratio (PR) options — typical UK range 0.70–0.85
const efficiencyOptions = [
  { value: '70', label: '70% (Poor — shading, old system)' },
  { value: '75', label: '75% (Below average)' },
  { value: '80', label: '80% (Typical UK system)' },
  { value: '85', label: '85% (Excellent — new, unshaded)' },
];

const orientationOptions = [
  { value: 'south', label: 'South (Best - 100%)' },
  { value: 'southeast', label: 'South-East (95%)' },
  { value: 'southwest', label: 'South-West (95%)' },
  { value: 'east', label: 'East (85%)' },
  { value: 'west', label: 'West (85%)' },
  { value: 'north', label: 'North (60%)' },
];

const selfConsumptionOptions = [
  { value: '25', label: '25% (Low - mostly away)' },
  { value: '35', label: '35% (Average UK)' },
  { value: '50', label: '50% (Working from home)' },
  { value: '70', label: '70% (With battery storage)' },
];

interface DegradationSnapshot {
  year: number;
  output: number;
  cumulative: number;
}

interface SolarPVResult {
  annualGeneration: number;
  dailyGeneration: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Savings: number;
  systemPR: number;
  orientationFactor: number;
  tiltFactor: number;
  dnoConnectionType: string;
  viability: string;
  selfConsumedEnergy: number;
  exportedEnergy: number;
  savingsFromSelfConsumption: number;
  incomeFromExport: number;
  irradiance: number;
  degradation: DegradationSnapshot[];
  lifetimeGeneration: number;
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
}

const SolarPVCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [systemSize, setSystemSize] = useState('');
  const [location, setLocation] = useState('');
  const [panelEfficiency, setPanelEfficiency] = useState('80');
  const [roofOrientation, setRoofOrientation] = useState('south');
  const [roofTilt, setRoofTilt] = useState('35');
  const [electricityRate, setElectricityRate] = useState('0.25');
  const [selfConsumptionRate, setSelfConsumptionRate] = useState('35');
  const [exportRate, setExportRate] = useState('0.10');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [result, setResult] = useState<SolarPVResult | null>(null);

  const calculateCostEstimate = (size: number, pr: number) => {
    let baseCostPerKw = 0;
    let category = '';

    if (pr <= 0.72) {
      baseCostPerKw = 1000;
      category = 'Budget System';
    } else if (pr <= 0.77) {
      baseCostPerKw = 1400;
      category = 'Standard System';
    } else if (pr <= 0.82) {
      baseCostPerKw = 1800;
      category = 'Premium System';
    } else {
      baseCostPerKw = 2600;
      category = 'High-Efficiency System';
    }

    const panels = size * baseCostPerKw * 0.4;
    const inverter = size * 600;
    const installation = size * 800;
    const electrical = 800 + size * 200;
    const scaffolding = size > 4 ? 1200 : 800;
    const mcsAndDno = size <= 3.68 ? 400 : 800;

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
        vat: Math.round(vat),
      },
      costPerKw: Math.round(totalCost / size),
      category,
    };
  };

  const handleCalculate = useCallback(() => {
    const size = parseFloat(systemSize);
    const pr = parseFloat(panelEfficiency) / 100;
    const rate = parseFloat(electricityRate);
    const tilt = parseFloat(roofTilt);

    if (!(size > 0 && location && pr > 0)) return;

    const locationData = UK_LOCATIONS.find((loc) => loc.name === location);
    if (!locationData) return;

    const irradiance = locationData.irradiance;

    let orientationFactor = 1.0;
    switch (roofOrientation) {
      case 'south':
        orientationFactor = 1.0;
        break;
      case 'southwest':
      case 'southeast':
        orientationFactor = 0.95;
        break;
      case 'east':
      case 'west':
        orientationFactor = 0.85;
        break;
      case 'north':
        orientationFactor = 0.6;
        break;
    }

    const optimalTilt = 35;
    const tiltDifference = Math.abs(tilt - optimalTilt);
    const tiltFactor = Math.max(0.7, 1 - tiltDifference / 100);

    // Performance Ratio (PR) — accounts for inverter losses, cable losses,
    // temperature derating, soiling etc. Typical UK value: 0.75–0.85.
    // The kWp rating already incorporates panel efficiency, so we do NOT
    // multiply by panel efficiency here — doing so would double-count it.
    const systemPR = pr;
    const annualGeneration = size * irradiance * orientationFactor * tiltFactor * systemPR;
    const dailyGeneration = annualGeneration / 365;

    const costEstimate = calculateCostEstimate(size, pr);

    const selfConsumption = parseFloat(selfConsumptionRate) / 100;
    const segExportRate = parseFloat(exportRate);

    const selfConsumedEnergy = annualGeneration * selfConsumption;
    const exportedEnergy = annualGeneration * (1 - selfConsumption);

    const savingsFromSelfConsumption = selfConsumedEnergy * rate;
    const incomeFromExport = exportedEnergy * segExportRate;
    const annualSavings = savingsFromSelfConsumption + incomeFromExport;

    const paybackPeriod = costEstimate.totalCost / annualSavings;
    // CO2 factor: 0.207 kg CO2/kWh — BEIS 2024 UK grid average
    const co2Savings = annualGeneration * 0.207;
    const dnoConnectionType = size <= 3.68 ? 'G98' : 'G99';

    // 25-year degradation curve (NREL: ~2% year 1, then 0.5%/yr)
    const degradation: DegradationSnapshot[] = [];
    let cumulative = 0;
    const snapshotYears = [1, 5, 10, 15, 20, 25];
    for (const yr of snapshotYears) {
      // Year 1: 98% of nominal, then 0.5%/yr thereafter
      const factor = yr === 1 ? 0.98 : 0.98 * Math.pow(0.995, yr - 1);
      const yearOutput = Math.round(annualGeneration * factor);
      // Approximate cumulative by averaging adjacent snapshots
      if (degradation.length === 0) {
        cumulative = yearOutput;
      } else {
        const prev = degradation[degradation.length - 1];
        const yearsBetween = yr - prev.year;
        const avgOutput = (prev.output + yearOutput) / 2;
        cumulative = prev.cumulative + avgOutput * yearsBetween;
      }
      degradation.push({ year: yr, output: yearOutput, cumulative: Math.round(cumulative) });
    }
    const lifetimeGeneration =
      degradation[degradation.length - 1]?.cumulative ?? annualGeneration * 25;

    let viability = 'Poor';
    if (paybackPeriod < 8) viability = 'Excellent';
    else if (paybackPeriod < 12) viability = 'Good';
    else if (paybackPeriod < 16) viability = 'Fair';

    setResult({
      annualGeneration: Math.round(annualGeneration),
      dailyGeneration: Math.round(dailyGeneration * 10) / 10,
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Savings: Math.round(co2Savings),
      systemPR: Math.round(systemPR * 100),
      orientationFactor: Math.round(orientationFactor * 100),
      tiltFactor: Math.round(tiltFactor * 100),
      dnoConnectionType,
      viability,
      selfConsumedEnergy: Math.round(selfConsumedEnergy),
      exportedEnergy: Math.round(exportedEnergy),
      savingsFromSelfConsumption: Math.round(savingsFromSelfConsumption),
      incomeFromExport: Math.round(incomeFromExport),
      irradiance,
      degradation,
      lifetimeGeneration,
      costEstimate,
    });
  }, [
    systemSize,
    location,
    panelEfficiency,
    roofOrientation,
    roofTilt,
    electricityRate,
    selfConsumptionRate,
    exportRate,
  ]);

  const handleReset = useCallback(() => {
    setSystemSize('');
    setLocation('');
    setPanelEfficiency('80');
    setRoofOrientation('south');
    setRoofTilt('35');
    setElectricityRate('0.25');
    setSelfConsumptionRate('35');
    setExportRate('0.10');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Solar PV System Calculator',
      `System Size: ${systemSize} kWp`,
      `Location: ${location} (${result.irradiance} kWh/m²/yr)`,
      `Orientation: ${roofOrientation} (${result.orientationFactor}%)`,
      `Tilt: ${roofTilt}° (${result.tiltFactor}%)`,
      `Performance Ratio: ${result.systemPR}%`,
      `Annual Generation: ${result.annualGeneration.toLocaleString()} kWh`,
      `Daily Average: ${result.dailyGeneration} kWh`,
      `Self-consumed: ${result.selfConsumedEnergy.toLocaleString()} kWh (£${result.savingsFromSelfConsumption})`,
      `Exported: ${result.exportedEnergy.toLocaleString()} kWh (£${result.incomeFromExport})`,
      `Annual Savings: £${result.annualSavings}`,
      `System Cost: £${result.costEstimate.totalCost.toLocaleString()}`,
      `Payback: ${result.paybackPeriod} years`,
      `CO₂ Savings: ${result.co2Savings} kg/year`,
      `DNO: ${result.dnoConnectionType}`,
      `Viability: ${result.viability}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Solar PV System Calculator"
      description="Calculate solar panel performance, energy generation, and financial returns for UK installations"
    >
      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="System Size"
            unit="kWp"
            inputMode="decimal"
            value={systemSize}
            onChange={setSystemSize}
            placeholder="e.g. 4.0"
            hint="Typical UK homes: 3-6kWp"
          />
          <CalculatorSelect
            label="Performance Ratio"
            value={panelEfficiency}
            onChange={setPanelEfficiency}
            options={efficiencyOptions}
          />
          <CalculatorSelect
            label="Location"
            value={location}
            onChange={setLocation}
            options={locationOptions}
            placeholder="Select location"
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
            inputMode="decimal"
            value={roofTilt}
            onChange={setRoofTilt}
            placeholder="35"
            hint="Optimal: 35°"
          />
          <CalculatorInput
            label="Electricity Rate"
            unit="£/kWh"
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
            inputMode="decimal"
            value={exportRate}
            onChange={setExportRate}
            placeholder="0.10"
            hint="Typical: £0.04-0.15"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!systemSize || !location}
        showReset={!!result}
      />

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={
                result.viability === 'Excellent'
                  ? 'pass'
                  : result.viability === 'Good'
                    ? 'pass'
                    : result.viability === 'Fair'
                      ? 'warning'
                      : 'fail'
              }
              label={`${result.viability} Viability`}
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
            <p className="text-sm font-medium text-white mb-1">Annual Generation</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.annualGeneration.toLocaleString()} kWh
            </p>
            <p className="text-sm text-white mt-2">
              {result.dailyGeneration} kWh/day | {result.systemPR}% Performance Ratio
            </p>
          </div>

          <ResultsGrid columns={3}>
            <ResultValue
              category={CAT}
              label="Daily Generation"
              value={result.dailyGeneration.toString()}
              unit="kWh"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Annual Savings"
              value={`£${result.annualSavings}`}
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Payback Period"
              value={result.paybackPeriod.toString()}
              unit="years"
              size="sm"
            />
          </ResultsGrid>

          {/* Cost Estimate */}
          <CalculatorSection title="2025 Cost Estimate">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  £{result.costEstimate.totalCost.toLocaleString()}
                </p>
                <p className="text-xs text-white">{result.costEstimate.category}</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <p
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  £{result.costEstimate.costPerKw.toLocaleString()}
                </p>
                <p className="text-xs text-white">Per kW installed</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Panels', value: result.costEstimate.breakdown.panels },
                { label: 'Inverter', value: result.costEstimate.breakdown.inverter },
                { label: 'Installation', value: result.costEstimate.breakdown.installation },
                { label: 'Electrical', value: result.costEstimate.breakdown.electrical },
                { label: 'Scaffolding', value: result.costEstimate.breakdown.scaffolding },
                { label: 'MCS & DNO', value: result.costEstimate.breakdown.mcsAndDno },
              ].map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-white">{item.label}</span>
                  <span className="text-white">£{item.value.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="text-white font-medium">VAT (5%)</span>
                <span className="text-white font-semibold">
                  £{result.costEstimate.breakdown.vat.toLocaleString()}
                </span>
              </div>
            </div>
          </CalculatorSection>

          {/* Environmental Impact */}
          <CalculatorSection title="Environmental Impact">
            <ResultsGrid columns={2}>
              <ResultValue
                category={CAT}
                label="CO₂ Saved / Year"
                value={result.co2Savings.toString()}
                unit="kg"
                size="sm"
              />
              <ResultValue
                category={CAT}
                label="Trees Equivalent"
                value={Math.round(result.co2Savings / 21).toString()}
                size="sm"
              />
            </ResultsGrid>
          </CalculatorSection>

          {/* 25-Year Degradation */}
          <CalculatorSection title="25-Year Output Forecast">
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-medium text-white border-b border-white/10 pb-1.5">
                <span>Year</span>
                <span className="text-right">Annual Output</span>
                <span className="text-right">Cumulative</span>
              </div>
              {result.degradation.map((d) => (
                <div key={d.year} className="grid grid-cols-3 gap-2 text-sm text-white">
                  <span>Year {d.year}</span>
                  <span className="text-right">{d.output.toLocaleString()} kWh</span>
                  <span className="text-right">{(d.cumulative / 1000).toFixed(1)} MWh</span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-sm">
                <span className="text-white font-medium">Lifetime Generation</span>
                <span className="text-white font-bold">
                  {(result.lifetimeGeneration / 1000).toFixed(1)} MWh
                </span>
              </div>
              <p className="text-xs text-white">
                Based on ~2% first-year loss + 0.5%/yr degradation (NREL data)
              </p>
            </div>
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'System factors',
                formula: `Orientation: ${roofOrientation} = ${result.orientationFactor}% | Tilt: ${roofTilt}° = ${result.tiltFactor}% | PR: ${result.systemPR}%`,
              },
              {
                label: 'Annual generation',
                formula: `E = ${systemSize}kWp × ${result.irradiance} kWh/m²/yr × ${result.orientationFactor}% × ${result.tiltFactor}% × ${result.systemPR}%`,
                value: `${result.annualGeneration.toLocaleString()} kWh/year`,
              },
              {
                label: 'Self-consumption savings',
                formula: `${result.selfConsumedEnergy.toLocaleString()} kWh × £${electricityRate}`,
                value: `£${result.savingsFromSelfConsumption}`,
              },
              {
                label: 'Export income',
                formula: `${result.exportedEnergy.toLocaleString()} kWh × £${exportRate}`,
                value: `£${result.incomeFromExport}`,
              },
              {
                label: 'Total annual savings',
                value: `£${result.annualSavings}/year`,
              },
              {
                label: 'Payback period',
                formula: `£${result.costEstimate.totalCost.toLocaleString()} ÷ £${result.annualSavings}`,
                value: `${result.paybackPeriod} years`,
              },
            ]}
          />

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
                  <p className="text-sm text-white font-medium">System Performance</p>
                  <p className="text-sm text-white">
                    {systemSize}kWp system with {result.systemPR}% performance ratio.{' '}
                    {roofOrientation} orientation provides {result.orientationFactor}% of optimal.{' '}
                    {roofTilt}° tilt achieves {result.tiltFactor}% efficiency. Expected 25-year
                    generation: {(result.lifetimeGeneration / 1000).toFixed(1)} MWh (includes panel
                    degradation).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Financial Analysis</p>
                  <p className="text-sm text-white">
                    Payback: {result.paybackPeriod} years using £
                    {result.costEstimate.totalCost.toLocaleString()}. Monthly savings: ~£
                    {Math.round(result.annualSavings / 12)}. 25-year total savings: ~£
                    {Math.round(result.annualSavings * 25 * 0.94).toLocaleString()} (adjusted for
                    degradation).
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Installation Tips</p>
                  <ul className="space-y-1">
                    {[
                      'Use MCS-certified installer for warranty and SEG',
                      `Submit ${result.dnoConnectionType} application before installation`,
                      'Consider optimisers if partial shading exists',
                      'Install bird guards and cleaning access points',
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Reference */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showReference && 'rotate-180'
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
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Section 712',
                      desc: 'Solar PV power supply systems',
                    },
                    {
                      reg: 'Reg 712.512.2',
                      desc: 'DC isolation within 3m of PV array',
                    },
                    {
                      reg: result.dnoConnectionType === 'G98' ? 'G98' : 'G99',
                      desc:
                        result.dnoConnectionType === 'G98'
                          ? 'Simplified notification for systems ≤3.68kW'
                          : 'Full application required for systems >3.68kW',
                    },
                    {
                      reg: 'MCS 012',
                      desc: 'MCS certification required for SEG payments',
                    },
                    {
                      reg: 'Section 534',
                      desc: 'Type 2 SPDs at DC and AC sides',
                    },
                    {
                      reg: 'Fire safety',
                      desc: '1m setback from roof edges, AC isolator accessible to firefighters',
                    },
                  ].map((item) => (
                    <li key={item.reg} className="flex items-start gap-2 text-sm">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      <span className="text-white">
                        <span className="font-medium">{item.reg}:</span> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Solar PV Generation"
        formula="E = P_kWp × G × F_orient × F_tilt × PR"
        variables={[
          { symbol: 'P_kWp', description: 'System size (kWp)' },
          { symbol: 'G', description: 'Annual irradiance (kWh/m²/yr)' },
          { symbol: 'F_orient', description: 'Orientation factor' },
          { symbol: 'F_tilt', description: 'Tilt factor' },
          { symbol: 'PR', description: 'Performance ratio (accounts for all system losses)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default SolarPVCalculator;
