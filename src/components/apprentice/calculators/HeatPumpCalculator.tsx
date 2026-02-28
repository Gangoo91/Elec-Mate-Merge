import { useState, useCallback } from 'react';
import { Copy, Check, ChevronDown, Zap, AlertTriangle, Info } from 'lucide-react';
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
import {
  INSULATION_LEVELS,
  AIR_TIGHTNESS_LEVELS,
  UK_REGIONS,
  HEAT_PUMP_TYPES,
  EMITTER_TYPES,
  DHW_OPTIONS,
  BUILDING_ARCHETYPES,
} from '@/lib/heat-pump-constants';
import {
  calculateHeatPumpLoad,
  getRecommendations,
  type HeatPumpInputs,
  type HeatPumpResults,
} from '@/lib/heat-pump-calculations';

const CAT = 'renewable' as const;
const config = CALCULATOR_CONFIG[CAT];

const insulationOptions = Object.entries(INSULATION_LEVELS).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const airTightnessOptions = Object.entries(AIR_TIGHTNESS_LEVELS).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const regionOptions = Object.entries(UK_REGIONS).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const heatPumpOptions = Object.entries(HEAT_PUMP_TYPES).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const emitterOptions = Object.entries(EMITTER_TYPES).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const dhwOptions = Object.entries(DHW_OPTIONS).map(([key, value]) => ({
  value: key,
  label: value.label,
}));

const archetypeOptions = [
  { value: 'custom', label: 'Custom / Manual' },
  ...Object.entries(BUILDING_ARCHETYPES).map(([key, value]) => ({
    value: key,
    label: `${value.label} (${value.floorArea} m²)`,
  })),
];

const HeatPumpCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [floorArea, setFloorArea] = useState('');
  const [insulationLevel, setInsulationLevel] = useState('average');
  const [airTightness, setAirTightness] = useState('average');
  const [region, setRegion] = useState('midlands');
  const [designTemp, setDesignTemp] = useState('');
  const [indoorTemp, setIndoorTemp] = useState('21');
  const [heatPumpType, setHeatPumpType] = useState('air-source');
  const [emitterType, setEmitterType] = useState('radiators');
  const [dhwOption, setDhwOption] = useState('cylinder');
  const [electricityRate, setElectricityRate] = useState('0.30');

  const [archetype, setArchetype] = useState('custom');

  const [result, setResult] = useState<HeatPumpResults | null>(null);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const handleArchetypeChange = useCallback((value: string) => {
    setArchetype(value);
    if (value !== 'custom') {
      const preset = BUILDING_ARCHETYPES[value as keyof typeof BUILDING_ARCHETYPES];
      if (preset) {
        setFloorArea(preset.floorArea.toString());
        setInsulationLevel(preset.insulationLevel);
        setAirTightness(preset.airTightness);
      }
    }
  }, []);

  const handleRegionChange = useCallback((value: string) => {
    const regionData = UK_REGIONS[value as keyof typeof UK_REGIONS];
    setRegion(value);
    if (regionData) {
      setDesignTemp(regionData.designTemp.toString());
    }
  }, []);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const fuelLines = result.fuelComparison.map(
      (f) =>
        `  ${f.label}: £${f.annualCost.toFixed(0)}/yr (${f.saving > 0 ? `saves £${f.saving.toFixed(0)}` : 'n/a'})`
    );
    const text = [
      'Heat Pump Load Calculation',
      `Total Heat Load: ${result.totalHeatLoad.toFixed(1)} kW`,
      `  Space Heating: ${result.spaceHeatingLoad.toFixed(1)} kW`,
      `  DHW: ${result.dhwLoad.toFixed(1)} kW`,
      `COP: ${result.cop.toFixed(2)}`,
      `Seasonal COP: ${result.performance.seasonalCOP.toFixed(2)}`,
      `Electrical Power: ${result.electricalPower.toFixed(1)} kW`,
      `Flow Temperature: ${result.flowTemperature}°C`,
      `Daily Cost: £${result.dailyCost.toFixed(2)}`,
      `Annual Cost: £${result.annualCost.toFixed(0)}`,
      result.defrostPenaltyKwh > 0
        ? `Defrost Penalty: ${result.defrostPenaltyKwh.toFixed(0)} kWh/yr`
        : '',
      `Carbon Savings: ${result.carbonSavings.toFixed(0)} kg CO₂/yr vs gas`,
      '',
      'Fuel Comparison:',
      ...fuelLines,
      '',
      `BUS Grant: ${result.busGrant.reason}`,
      `MCS Sizing: ${result.sizing.withinMCS ? 'Within guidelines' : 'Outside range'}`,
      `Recommended Size: ${result.sizing.recommended.toFixed(1)} kW`,
      `Efficiency: ${result.performance.efficiency}`,
      `Suitability: ${result.performance.suitability}`,
    ]
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  }, [result, toast]);

  const handleCalculate = useCallback(() => {
    const area = parseFloat(floorArea);
    const dTemp = parseFloat(designTemp);
    const iTemp = parseFloat(indoorTemp);
    const rate = parseFloat(electricityRate);

    if (!area || area <= 0) return;
    if (isNaN(dTemp)) return;
    if (!iTemp || iTemp < 18 || iTemp > 25) return;
    if (!rate || rate <= 0) return;

    const inputs: HeatPumpInputs = {
      floorArea: area,
      insulationLevel: insulationLevel as keyof typeof INSULATION_LEVELS,
      airTightness: airTightness as keyof typeof AIR_TIGHTNESS_LEVELS,
      designTemp: dTemp,
      indoorTemp: iTemp,
      heatPumpType: heatPumpType as keyof typeof HEAT_PUMP_TYPES,
      emitterType: emitterType as keyof typeof EMITTER_TYPES,
      dhwOption: dhwOption as keyof typeof DHW_OPTIONS,
      electricityRate: rate,
    };

    setResult(calculateHeatPumpLoad(inputs));
  }, [
    floorArea,
    designTemp,
    indoorTemp,
    electricityRate,
    insulationLevel,
    airTightness,
    heatPumpType,
    emitterType,
    dhwOption,
  ]);

  const handleReset = useCallback(() => {
    setArchetype('custom');
    setFloorArea('');
    setInsulationLevel('average');
    setAirTightness('average');
    setRegion('midlands');
    setDesignTemp('');
    setIndoorTemp('21');
    setHeatPumpType('air-source');
    setEmitterType('radiators');
    setDhwOption('cylinder');
    setElectricityRate('0.30');
    setResult(null);
  }, []);

  // Compute recommendations only when we have a result
  const recommendations = result
    ? getRecommendations(
        {
          floorArea: parseFloat(floorArea),
          insulationLevel: insulationLevel as keyof typeof INSULATION_LEVELS,
          airTightness: airTightness as keyof typeof AIR_TIGHTNESS_LEVELS,
          designTemp: parseFloat(designTemp),
          indoorTemp: parseFloat(indoorTemp),
          heatPumpType: heatPumpType as keyof typeof HEAT_PUMP_TYPES,
          emitterType: emitterType as keyof typeof EMITTER_TYPES,
          dhwOption: dhwOption as keyof typeof DHW_OPTIONS,
          electricityRate: parseFloat(electricityRate),
        },
        result
      )
    : [];

  const hasCritical = result?.reviewFindings.some((f) => f.type === 'critical') ?? false;

  return (
    <CalculatorCard
      category={CAT}
      title="Heat Pump Load Calculator"
      description="Calculate heat pump sizing, performance, and running costs"
      badge="MCS / BS 7671"
    >
      {/* Building Details */}
      <CalculatorSection title="Building Details">
        <CalculatorInputGrid columns={2}>
          <div className="col-span-2">
            <CalculatorSelect
              label="Building Type"
              value={archetype}
              onChange={handleArchetypeChange}
              options={archetypeOptions}
            />
          </div>
          <CalculatorInput
            label="Floor Area"
            unit="m²"
            type="text"
            inputMode="decimal"
            value={floorArea}
            onChange={(v) => {
              setFloorArea(v);
              setArchetype('custom');
            }}
            placeholder="120"
          />
          <CalculatorSelect
            label="Insulation Level"
            value={insulationLevel}
            onChange={(v) => {
              setInsulationLevel(v);
              setArchetype('custom');
            }}
            options={insulationOptions}
          />
          <CalculatorSelect
            label="Air Tightness"
            value={airTightness}
            onChange={(v) => {
              setAirTightness(v);
              setArchetype('custom');
            }}
            options={airTightnessOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Location & Climate */}
      <CalculatorSection title="Location & Climate">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="UK Region"
            value={region}
            onChange={handleRegionChange}
            options={regionOptions}
          />
          <CalculatorInput
            label="Design Temp"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={designTemp}
            onChange={setDesignTemp}
            placeholder="-3"
          />
          <CalculatorInput
            label="Indoor Temp"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={indoorTemp}
            onChange={setIndoorTemp}
            placeholder="21"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Heat Pump Type"
            value={heatPumpType}
            onChange={setHeatPumpType}
            options={heatPumpOptions}
          />
          <CalculatorSelect
            label="Emitter Type"
            value={emitterType}
            onChange={setEmitterType}
            options={emitterOptions}
          />
          <CalculatorSelect
            label="Hot Water"
            value={dhwOption}
            onChange={setDhwOption}
            options={dhwOptions}
          />
          <CalculatorInput
            label="Electricity Rate"
            unit="£/kWh"
            type="text"
            inputMode="decimal"
            value={electricityRate}
            onChange={setElectricityRate}
            placeholder="0.30"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        calculateLabel="Calculate Heat Pump Load"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={hasCritical ? 'fail' : result.sizing.withinMCS ? 'pass' : 'warning'}
              label={
                hasCritical
                  ? 'Critical Issues'
                  : result.sizing.withinMCS
                    ? 'Within MCS Guidelines'
                    : 'Review Sizing'
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

          {/* Hero values */}
          <div className="grid grid-cols-2 gap-4 py-3">
            <div className="text-center">
              <p className="text-sm text-white mb-1">Total Heat Load</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.totalHeatLoad.toFixed(1)}
              </p>
              <p className="text-xs text-white">kW</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-white mb-1">COP</p>
              <p
                className="text-3xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.cop.toFixed(2)}
              </p>
              <p className="text-xs text-white">
                Seasonal: {result.performance.seasonalCOP.toFixed(2)}
              </p>
            </div>
          </div>

          <ResultsGrid columns={2}>
            <ResultValue
              label="Space Heating"
              value={result.spaceHeatingLoad.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="DHW Load"
              value={result.dhwLoad.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Electrical Power"
              value={result.electricalPower.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Flow Temperature"
              value={`${result.flowTemperature}`}
              unit="°C"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Daily Cost"
              value={`£${result.dailyCost.toFixed(2)}`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Annual Cost"
              value={`£${result.annualCost.toFixed(0)}`}
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Carbon & sizing row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-xs text-white mb-1">Carbon Savings</p>
              <p className="text-lg font-bold text-green-400">
                {result.carbonSavings.toFixed(0)} kg
              </p>
              <p className="text-xs text-white">CO₂/year vs gas</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-xs text-white mb-1">Recommended Size</p>
              <p className="text-lg font-bold text-white">
                {result.sizing.recommended.toFixed(1)} kW
              </p>
              <p className="text-xs text-white">
                {result.sizing.withinMCS ? 'Within MCS range' : 'Outside MCS range'}
              </p>
            </div>
          </div>

          {/* Fuel comparison */}
          <div className="p-3 rounded-xl bg-white/5 space-y-2">
            <p className="text-sm font-medium text-white">Fuel Cost Comparison (Annual)</p>
            <div className="space-y-1.5">
              {result.fuelComparison.map((f) => (
                <div key={f.fuel} className="flex items-center justify-between text-sm">
                  <span className="text-white">{f.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">£{f.annualCost.toFixed(0)}</span>
                    {f.saving > 0 && (
                      <span className="text-green-400 text-xs">saves £{f.saving.toFixed(0)}</span>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-sm pt-1 border-t border-white/10">
                <span className="text-white font-medium">Heat Pump</span>
                <span className="text-white font-bold">£{result.annualCost.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* BUS Grant */}
          <div
            className={cn(
              'p-3 rounded-xl border',
              result.busGrant.eligible
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/5 border-white/10'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Boiler Upgrade Scheme (BUS)</p>
                <p className="text-xs text-white">{result.busGrant.reason}</p>
              </div>
              {result.busGrant.eligible && (
                <p className="text-lg font-bold text-green-400">
                  £{result.busGrant.amount.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Defrost penalty (air-source only) */}
          {result.defrostPenaltyKwh > 0 && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Defrost Cycle Penalty</p>
                  <p className="text-xs text-white">
                    Additional energy lost to defrost cycles in cold weather
                  </p>
                </div>
                <p className="text-sm font-bold text-white">
                  {result.defrostPenaltyKwh.toFixed(0)} kWh/yr
                </p>
              </div>
            </div>
          )}

          {/* Performance summary bar */}
          <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
            <div>
              <span className="text-sm text-white">Efficiency: </span>
              <span
                className={cn(
                  'text-sm font-bold',
                  result.performance.efficiency === 'Excellent'
                    ? 'text-green-400'
                    : result.performance.efficiency === 'Good'
                      ? 'text-emerald-400'
                      : result.performance.efficiency === 'Average'
                        ? 'text-amber-400'
                        : 'text-red-400'
                )}
              >
                {result.performance.efficiency}
              </span>
            </div>
            <div>
              <span className="text-sm text-white">Suitability: </span>
              <span
                className={cn(
                  'text-sm font-bold',
                  result.performance.suitability === 'Highly Suitable'
                    ? 'text-green-400'
                    : result.performance.suitability === 'Suitable'
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                )}
              >
                {result.performance.suitability}
              </span>
            </div>
          </div>

          {/* Review findings */}
          {result.reviewFindings.length > 0 && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30 space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />
                <p className="text-sm font-medium text-white">
                  {result.reviewFindings.length} finding
                  {result.reviewFindings.length !== 1 ? 's' : ''} require attention
                </p>
              </div>
              {result.reviewFindings.map((finding) => (
                <div key={finding.id} className="pl-3 border-l-2 border-white/10 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        finding.type === 'critical'
                          ? 'bg-red-500'
                          : finding.type === 'warning'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                      )}
                    />
                    <p className="text-sm font-medium text-white">{finding.title}</p>
                  </div>
                  <p className="text-xs text-white">{finding.description}</p>
                  <p className="text-xs text-white">{finding.recommendation}</p>
                  {finding.regulation && (
                    <p className="text-xs text-green-400 italic">{finding.regulation}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-medium text-blue-300">Recommendations</p>
              </div>
              <ul className="space-y-1 text-sm text-white">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* How It Worked Out */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Base heat loss',
                formula: `Q = (A × U × ΔT) / 1000 = (${floorArea} × ${INSULATION_LEVELS[insulationLevel as keyof typeof INSULATION_LEVELS]?.factor} × ${(parseFloat(indoorTemp) - parseFloat(designTemp)).toFixed(0)}) / 1000`,
                value: `${result.spaceHeatingLoad.toFixed(1)} kW (after air tightness factor)`,
                description: `Insulation: ${INSULATION_LEVELS[insulationLevel as keyof typeof INSULATION_LEVELS]?.label}, Air tightness: ×${AIR_TIGHTNESS_LEVELS[airTightness as keyof typeof AIR_TIGHTNESS_LEVELS]?.multiplier}`,
              },
              {
                label: 'DHW load',
                formula: `DHW = ${DHW_OPTIONS[dhwOption as keyof typeof DHW_OPTIONS]?.label}`,
                value: `${result.dhwLoad.toFixed(1)} kW`,
              },
              {
                label: 'Total heat load',
                formula: `Q_total = ${result.spaceHeatingLoad.toFixed(1)} + ${result.dhwLoad.toFixed(1)}`,
                value: `${result.totalHeatLoad.toFixed(1)} kW`,
              },
              {
                label: 'COP calculation',
                formula: `COP = base (${HEAT_PUMP_TYPES[heatPumpType as keyof typeof HEAT_PUMP_TYPES]?.baseCOP}) × temp derating × flow temp derating`,
                value: `${result.cop.toFixed(2)}`,
                description: `Flow temp: ${result.flowTemperature}°C (${EMITTER_TYPES[emitterType as keyof typeof EMITTER_TYPES]?.label})`,
              },
              {
                label: 'Electrical power',
                formula: `P_elec = Q_total / (emitter eff × COP) = ${result.totalHeatLoad.toFixed(1)} / (${EMITTER_TYPES[emitterType as keyof typeof EMITTER_TYPES]?.efficiency} × ${result.cop.toFixed(2)})`,
                value: `${result.electricalPower.toFixed(1)} kW`,
              },
              ...(result.defrostPenaltyKwh > 0
                ? [
                    {
                      label: 'Defrost penalty',
                      formula: `Additional energy for defrost cycles`,
                      value: `+${result.defrostPenaltyKwh.toFixed(0)} kWh/yr`,
                      description:
                        'Energy lost to defrost cycles in cold weather (included in annual cost)',
                    },
                  ]
                : []),
              {
                label: 'Annual cost',
                formula: `Cost = (annual kWh + defrost) / COP × £${electricityRate}/kWh`,
                value: `£${result.annualCost.toFixed(0)}`,
              },
            ]}
          />

          {/* Performance Detail */}
          <Collapsible open={showPerformance} onOpenChange={setShowPerformance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Performance Detail</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showPerformance && 'rotate-180'
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
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white font-medium">System Efficiency</p>
                    <p className="text-white">{result.performance.efficiency}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Suitability</p>
                    <p className="text-white">{result.performance.suitability}</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">Carbon Savings</p>
                    <p className="text-white">{result.carbonSavings.toFixed(0)} kg CO₂/yr vs gas</p>
                  </div>
                  <div>
                    <p className="text-white font-medium">MCS Compliance</p>
                    <p className="text-white">
                      {result.sizing.withinMCS ? 'Within guidelines' : 'Outside recommended range'}
                    </p>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Installation Notes */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Installation Notes</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="p-3 rounded-xl border space-y-2 text-sm text-white"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <p>
                  <strong>Electrical:</strong> Single phase suitable up to 12 kW input. Three-phase
                  required for larger systems. Dedicated circuit with appropriate protective devices
                  required.
                </p>
                <p>
                  <strong>Design:</strong> Weather compensation controls improve efficiency. Buffer
                  tanks may be needed to prevent short cycling.
                </p>
                <p>
                  <strong>MCS:</strong> Installation by MCS certified installer required for RHI
                  eligibility. Annual maintenance required to maintain warranty.
                </p>
                <p>
                  <strong>Noise:</strong> ASHP installations must meet 42 dB(A) daytime and 35 dB(A)
                  night-time limits at nearest neighbour boundary.
                </p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Info note */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Zap className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>MCS certified installer required.</strong> This calculator provides estimates
            for guidance. A full MCS design assessment is required before installation.
          </p>
        </div>
      </div>

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Heat Load Formula"
        formula="Q = (A × U × ΔT) / 1000"
        variables={[
          { symbol: 'Q', description: 'Heat load (kW)' },
          { symbol: 'A', description: 'Floor area (m²)' },
          { symbol: 'U', description: 'Insulation factor (W/m²·K)' },
          { symbol: 'ΔT', description: 'Temperature difference (°C)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default HeatPumpCalculator;
