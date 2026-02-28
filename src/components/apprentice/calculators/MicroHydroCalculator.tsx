import { useState, useCallback, useMemo } from 'react';
import { Copy, Check, ChevronDown, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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

const TURBINE_TYPES = {
  pelton: {
    name: 'Pelton Wheel',
    minHead: 50,
    maxFlow: 2.0,
    efficiency: 0.9,
    costPerKw: 3500,
    description: 'High-head, low-flow',
  },
  turgo: {
    name: 'Turgo Impulse',
    minHead: 30,
    maxFlow: 5.0,
    efficiency: 0.87,
    costPerKw: 3200,
    description: 'Medium-high head',
  },
  francis: {
    name: 'Francis Turbine',
    minHead: 10,
    maxFlow: 20.0,
    efficiency: 0.92,
    costPerKw: 2800,
    description: 'Medium head, high flow',
  },
  kaplan: {
    name: 'Kaplan/Propeller',
    minHead: 2,
    maxFlow: 50.0,
    efficiency: 0.93,
    costPerKw: 4000,
    description: 'Low head, high flow',
  },
  crossflow: {
    name: 'Cross-flow (Banki)',
    minHead: 5,
    maxFlow: 10.0,
    efficiency: 0.85,
    costPerKw: 2500,
    description: 'Versatile for varying flows',
  },
};

const QUICK_START_PRESETS = [
  {
    name: 'High-head Pelton',
    flow: '0.05',
    head: '150',
    turbineType: 'pelton',
    description: 'Mountain stream',
  },
  {
    name: 'Medium-head Francis',
    flow: '0.5',
    head: '25',
    turbineType: 'francis',
    description: 'River weir',
  },
  {
    name: 'Low-head Kaplan',
    flow: '5.0',
    head: '8',
    turbineType: 'kaplan',
    description: 'Large river',
  },
  {
    name: 'Small Crossflow',
    flow: '0.2',
    head: '12',
    turbineType: 'crossflow',
    description: 'Small stream',
  },
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
  penstock: {
    diameter: number;
    length: number;
    material: string;
    cost: number;
    pressureBar: number;
  };
  turbineCost: number;
  civilWorksCost: number;
  electricalCost: number;
  installationCost: number;
  viabilityAssessment: string;
  flowValue: number;
  headValue: number;
  availabilityPct: number;
}

const MicroHydroCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [flow, setFlow] = useState('');
  const [head, setHead] = useState('');
  const [turbineType, setTurbineType] = useState('');
  const [availabilityFactor, setAvailabilityFactor] = useState('85');
  const [electricityRate, setElectricityRate] = useState('0.15');
  const [penstockLength, setPenstockLength] = useState('100');
  const [result, setResult] = useState<MicroHydroResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const turbineOptions = [
    { value: 'auto', label: 'Auto-select best turbine' },
    ...Object.entries(TURBINE_TYPES).map(([key, t]) => ({
      value: key,
      label: `${t.name} — ${t.description}`,
    })),
  ];

  const determineBestTurbine = (headVal: number, flowVal: number): string => {
    if (headVal >= 50 && flowVal <= 2.0) return 'pelton';
    if (headVal >= 30 && headVal < 50) return 'turgo';
    if (headVal >= 10 && headVal < 30) return 'francis';
    if (headVal >= 2 && headVal < 10) return 'kaplan';
    return 'crossflow';
  };

  const assessTurbineSuitability = (headVal: number, flowVal: number, turbine: string): string => {
    const turbineData = TURBINE_TYPES[turbine as keyof typeof TURBINE_TYPES];
    if (headVal < turbineData.minHead) return 'Head too low for optimal efficiency';
    if (flowVal > turbineData.maxFlow) return 'Flow too high — consider multiple units';
    return 'Excellent match for site conditions';
  };

  const assessViability = (power: number, payback: number): string => {
    if (power < 5) return 'Very small system — check economics carefully';
    if (payback > 20) return 'Poor economics — payback too long';
    if (payback > 15) return 'Marginal economics — consider improvements';
    if (payback > 10) return 'Reasonable economics';
    return 'Excellent economics — highly viable';
  };

  const canCalculate = useMemo(
    () => flow.trim() !== '' && head.trim() !== '' && parseFloat(flow) > 0 && parseFloat(head) > 0,
    [flow, head]
  );

  const handleCalculate = useCallback(() => {
    const flowValue = parseFloat(flow);
    const headValue = parseFloat(head);
    const availabilityValue = parseFloat(availabilityFactor) / 100;
    const rateValue = parseFloat(electricityRate);
    const penstockLengthValue = parseFloat(penstockLength);

    if (!flowValue || !headValue || flowValue <= 0 || headValue <= 0) return;

    let selectedTurbine = turbineType;
    if (!selectedTurbine || selectedTurbine === 'auto') {
      selectedTurbine = determineBestTurbine(headValue, flowValue);
    }

    const turbineData = TURBINE_TYPES[selectedTurbine as keyof typeof TURBINE_TYPES];

    // Power: P = ρ × g × Q × H × η (kW)
    const theoreticalPower = (1000 * 9.81 * flowValue * headValue) / 1000;
    const practicalPower = theoreticalPower * turbineData.efficiency * 0.95; // 0.95 = generator efficiency
    const annualGeneration = practicalPower * 8760 * availabilityValue;

    // Penstock sizing
    const velocity = 2.5; // m/s design velocity
    const area = flowValue / velocity;
    const diameter = Math.sqrt((4 * area) / Math.PI) * 1000; // mm

    // Pressure check for material selection: pressure = ρ × g × H (Pa) → bar
    const pressureBar = (1000 * 9.81 * headValue) / 100000;
    // HDPE for <10 bar, Steel for ≥10 bar
    const penstockMaterial = pressureBar >= 10 ? 'Steel' : 'HDPE';

    // Penstock cost: diameter-scaled formula instead of flat rate
    const penstockCostPerMetre = 80 + (diameter / 10) * 15;
    const penstockCost = penstockLengthValue * penstockCostPerMetre;

    // Cost estimation
    const turbineCost = practicalPower * turbineData.costPerKw;
    // Civil works: £12,000 minimum for micro (<10kW), scale up for larger
    const civilWorksCost =
      practicalPower < 10
        ? Math.max(12000, practicalPower * 800)
        : Math.max(20000, practicalPower * 800);
    const electricalCost = practicalPower * 600;
    // Installation: 18% of equipment (UK micro-hydro average)
    const installationCost = (turbineCost + civilWorksCost + electricalCost) * 0.18;
    const totalCost =
      turbineCost + civilWorksCost + electricalCost + installationCost + penstockCost;

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
      penstock: {
        diameter: Math.round(diameter),
        length: penstockLengthValue,
        material: penstockMaterial,
        cost: Math.round(penstockCost),
        pressureBar,
      },
      turbineCost,
      civilWorksCost,
      electricalCost,
      installationCost,
      viabilityAssessment: viability,
      flowValue,
      headValue,
      availabilityPct: availabilityValue,
    });
  }, [flow, head, turbineType, availabilityFactor, electricityRate, penstockLength]);

  const applyPreset = (preset: (typeof QUICK_START_PRESETS)[0]) => {
    setFlow(preset.flow);
    setHead(preset.head);
    setTurbineType(preset.turbineType);
  };

  const handleReset = useCallback(() => {
    setFlow('');
    setHead('');
    setTurbineType('');
    setAvailabilityFactor('85');
    setElectricityRate('0.15');
    setPenstockLength('100');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Micro-Hydro System Analysis',
      `Flow: ${result.flowValue} m³/s | Head: ${result.headValue} m`,
      `Turbine: ${result.recommendedTurbine} (${(result.turbineEfficiency * 100).toFixed(0)}%)`,
      `Theoretical Power: ${result.theoreticalPower.toFixed(1)} kW`,
      `Practical Power: ${result.practicalPower.toFixed(1)} kW`,
      `Annual Generation: ${result.annualGeneration.toFixed(0)} kWh`,
      `Penstock: ${result.penstock.diameter}mm ${result.penstock.material} × ${result.penstock.length}m`,
      `Estimated Cost: £${Math.round(result.estimatedCost).toLocaleString()}`,
      `Annual Revenue: £${Math.round(result.annualRevenue).toLocaleString()}`,
      `Payback: ${result.paybackPeriod.toFixed(1)} years`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Micro-Hydro Calculator"
      description="Professional micro-hydro system analysis with accurate hydraulics"
    >
      {/* Quick Start Presets */}
      <CalculatorSection title="Quick Start Presets">
        <div className="grid grid-cols-2 gap-2">
          {QUICK_START_PRESETS.map((preset, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => applyPreset(preset)}
              className="h-auto p-3 text-left rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white touch-manipulation flex flex-col items-start"
            >
              <span className="text-sm font-medium">{preset.name}</span>
              <span className="text-xs text-white">
                {preset.flow} m³/s · {preset.head}m head
              </span>
            </Button>
          ))}
        </div>
      </CalculatorSection>

      <CalculatorDivider category={CAT} />

      {/* Site Parameters */}
      <CalculatorSection title="Site Parameters">
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
      </CalculatorSection>

      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
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
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={result.paybackPeriod <= 15 ? 'pass' : 'warning'}
              label={
                result.practicalPower >= 50
                  ? 'Commercial Scale'
                  : result.practicalPower >= 10
                    ? 'Small Commercial'
                    : 'Micro System'
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

          {/* Hero power output */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Practical Power Output</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.practicalPower.toFixed(1)} kW
            </p>
            <p className="text-sm text-white mt-2">
              {(result.annualGeneration / 1000).toFixed(1)} MWh/yr · {result.recommendedTurbine} at{' '}
              {(result.turbineEfficiency * 100).toFixed(0)}%
            </p>
          </div>

          {/* Power results */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Theoretical Power"
              value={result.theoreticalPower.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Annual Generation"
              value={(result.annualGeneration / 1000).toFixed(1)}
              unit="MWh"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Turbine suitability */}
          <div
            className={cn(
              'flex items-center gap-2 p-3 rounded-lg border text-sm',
              result.turbineSuitability.includes('Excellent')
                ? 'bg-green-500/5 border-green-500/20'
                : 'bg-amber-500/5 border-amber-500/20'
            )}
          >
            <span className="text-white font-medium">Turbine Match:</span>
            <span className="text-white">{result.turbineSuitability}</span>
          </div>

          <CalculatorDivider category={CAT} />

          {/* Penstock */}
          <CalculatorSection title="Penstock Specifications">
            <ResultsGrid columns={2}>
              <ResultValue
                label="Diameter"
                value={result.penstock.diameter}
                unit="mm"
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Material"
                value={result.penstock.material}
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Pressure"
                value={result.penstock.pressureBar.toFixed(1)}
                unit="bar"
                category={CAT}
                size="sm"
              />
              <ResultValue
                label="Cost"
                value={`£${result.penstock.cost.toLocaleString()}`}
                category={CAT}
                size="sm"
              />
            </ResultsGrid>
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* Economics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Total Cost"
              value={`£${Math.round(result.estimatedCost / 1000)}k`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Cost/kW"
              value={`£${Math.round(result.costPerKw).toLocaleString()}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Annual Revenue"
              value={`£${Math.round(result.annualRevenue).toLocaleString()}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Payback"
              value={result.paybackPeriod.toFixed(1)}
              unit="years"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Viability */}
          <div
            className={cn(
              'flex items-center gap-2 p-3 rounded-lg border text-sm',
              result.paybackPeriod <= 10
                ? 'bg-green-500/5 border-green-500/20'
                : result.paybackPeriod <= 15
                  ? 'bg-amber-500/5 border-amber-500/20'
                  : 'bg-red-500/5 border-red-500/20'
            )}
          >
            <span className="text-white">{result.viabilityAssessment}</span>
          </div>

          {/* Environmental warning */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm text-white font-medium">Environmental Considerations</p>
              <ul className="space-y-0.5">
                {[
                  'Environmental Impact Assessment may be required',
                  'Fish passage provisions typically needed',
                  'Minimum flow requirements for downstream ecology',
                  'Seasonal flow variation assessment required',
                ].map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: config.gradientFrom }}
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Gross power (ρgQH)',
                formula: `1000 × 9.81 × ${result.flowValue} × ${result.headValue} / 1000`,
                value: `${result.theoreticalPower.toFixed(2)} kW`,
              },
              {
                label: 'Net power (turbine × generator efficiency)',
                formula: `${result.theoreticalPower.toFixed(2)} × ${(result.turbineEfficiency * 100).toFixed(0)}% × 95%`,
                value: `${result.practicalPower.toFixed(2)} kW`,
              },
              {
                label: 'Annual generation',
                formula: `${result.practicalPower.toFixed(2)} × 8760 hours × ${(result.availabilityPct * 100).toFixed(0)}%`,
                value: `${result.annualGeneration.toFixed(0)} kWh/yr`,
              },
              {
                label: 'Penstock sizing',
                formula: `Q / v = ${result.flowValue} / 2.5 m/s → A = ${(result.flowValue / 2.5).toFixed(4)} m² → D = ${result.penstock.diameter}mm`,
                value: `${result.penstock.material} (${result.penstock.pressureBar.toFixed(1)} bar ${result.penstock.pressureBar >= 10 ? '≥' : '<'} 10 bar threshold)`,
              },
              {
                label: 'Cost breakdown',
                formula: `Turbine £${Math.round(result.turbineCost).toLocaleString()} + Civil £${Math.round(result.civilWorksCost).toLocaleString()} + Electrical £${Math.round(result.electricalCost).toLocaleString()} + Install 18% £${Math.round(result.installationCost).toLocaleString()} + Penstock £${result.penstock.cost.toLocaleString()}`,
                value: `£${Math.round(result.estimatedCost).toLocaleString()} total`,
              },
              {
                label: 'Payback',
                formula: `£${Math.round(result.estimatedCost).toLocaleString()} / £${Math.round(result.annualRevenue).toLocaleString()}`,
                value: `${result.paybackPeriod.toFixed(1)} years`,
              },
            ]}
          />

          {/* ── What This Means ── */}
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
                  <p className="text-sm text-white font-medium">Power Output</p>
                  <p className="text-sm text-white">
                    Your {result.flowValue} m³/s flow rate with {result.headValue}m head produces{' '}
                    {result.practicalPower.toFixed(1)}kW — enough to power approximately{' '}
                    {Math.round(result.practicalPower / 3)} average UK homes.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Economics</p>
                  <p className="text-sm text-white">
                    {result.paybackPeriod < 10
                      ? 'Strong returns expected — good investment opportunity. Hydro has the highest capacity factor of any renewable source.'
                      : result.paybackPeriod < 15
                        ? 'Moderate returns — consider grants or incentives to improve payback. The Rural Development Programme for England may offer support.'
                        : 'Long payback — may need subsidies or grant funding to be economically viable at this scale.'}
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── BS 7671 Reference ── */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>BS 7671 Reference</span>
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
                <ul className="space-y-2">
                  {[
                    {
                      reg: 'Reg 551.7',
                      desc: 'Generating sets — requirements for installations with generators',
                    },
                    {
                      reg: 'Environment Agency',
                      desc: 'Abstraction licence required for water extraction',
                    },
                    {
                      reg: 'G98/G99',
                      desc: 'Grid connection requirements for embedded generation',
                    },
                    {
                      reg: 'Planning Permission',
                      desc: 'Required for structures, weirs, and powerhouse buildings',
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
        name="Hydro Power Formula"
        formula="P = ρ × g × Q × H × η"
        variables={[
          { symbol: 'ρ', description: 'Water density (1000 kg/m³)' },
          { symbol: 'g', description: 'Gravitational acceleration (9.81 m/s²)' },
          { symbol: 'Q', description: 'Flow rate (m³/s)' },
          { symbol: 'H', description: 'Net head (m)' },
          { symbol: 'η', description: 'Overall efficiency (turbine × generator)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default MicroHydroCalculator;
