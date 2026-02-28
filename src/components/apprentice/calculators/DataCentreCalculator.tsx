import { useState, useCallback } from 'react';
import { Copy, Check, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorSection,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  calculateDataCentre,
  redundancyOptions,
  coolingMethodOptions,
  facilityTypeOptions,
  climateZoneOptions,
  type DataCentreResults,
} from '@/lib/datacentre';

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

const DataCentreCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<DataCentreResults | null>(null);

  // Core inputs
  const [itLoad, setItLoad] = useState('');
  const [redundancy, setRedundancy] = useState('2n');
  const [facilityType, setFacilityType] = useState('enterprise');
  const [climateZone, setClimateZone] = useState('temperate');

  // Infrastructure inputs
  const [coolingMethod, setCoolingMethod] = useState('air');
  const [designMargin, setDesignMargin] = useState('20');
  const [powerRedundancy, setPowerRedundancy] = useState('2n');
  const [coolingRedundancy, setCoolingRedundancy] = useState('n+1');
  const [upsBatteryHours, setUpsBatteryHours] = useState('15');
  const [upsEfficiency, setUpsEfficiency] = useState('95');

  // Advanced inputs
  const [lightsAndMisc, setLightsAndMisc] = useState('5');
  const [energyCost, setEnergyCost] = useState('0.15');
  const [carbonFactor, setCarbonFactor] = useState('0.233');

  // Collapsibles
  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const canCalculate = () => {
    const load = parseFloat(itLoad);
    return !!(load && load > 0);
  };

  const handleCalculate = useCallback(() => {
    const baseItLoad = parseFloat(itLoad);
    if (!baseItLoad || baseItLoad <= 0) return;

    const inputs = {
      itLoad: baseItLoad,
      redundancy,
      coolingMethod,
      coolingRatio: 1.5,
      lightsAndMisc: parseFloat(lightsAndMisc) || 5,
      upsBatteryHours: parseFloat(upsBatteryHours) || 15,
      upsEfficiency: parseFloat(upsEfficiency) || 95,
      powerRedundancy,
      coolingRedundancy,
      energyCost: parseFloat(energyCost) || 0.15,
      carbonFactor: parseFloat(carbonFactor) || 0.233,
      designMargin: parseFloat(designMargin) || 20,
      facilityType,
      climateZone,
    };

    setResult(calculateDataCentre(inputs));
  }, [
    itLoad,
    redundancy,
    coolingMethod,
    lightsAndMisc,
    upsBatteryHours,
    upsEfficiency,
    powerRedundancy,
    coolingRedundancy,
    energyCost,
    carbonFactor,
    designMargin,
    facilityType,
    climateZone,
  ]);

  const handleReset = useCallback(() => {
    setItLoad('');
    setRedundancy('2n');
    setFacilityType('enterprise');
    setClimateZone('temperate');
    setCoolingMethod('air');
    setDesignMargin('20');
    setPowerRedundancy('2n');
    setCoolingRedundancy('n+1');
    setUpsBatteryHours('15');
    setUpsEfficiency('95');
    setLightsAndMisc('5');
    setEnergyCost('0.15');
    setCarbonFactor('0.233');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = 'Data Centre Calculator Results';
    text += `\nTotal IT Load: ${result.totalItLoad.toFixed(0)} kW`;
    text += `\nCooling Load: ${result.coolingLoad.toFixed(0)} kW`;
    text += `\nTotal Facility Load: ${result.totalFacilityLoad.toFixed(0)} kW`;
    text += `\nPUE: ${result.pue.toFixed(2)}`;
    text += `\nDCiE: ${result.dcie.toFixed(1)}%`;
    text += `\nUPS Capacity: ${result.upsCapacity.toFixed(0)} kW`;
    text += `\nGenerator: ${result.generatorCapacity.toFixed(0)} kW`;
    text += `\nBattery: ${result.batteryCapacity.toFixed(0)} kWh`;
    text += `\nAnnual Energy: ${(result.annualKwh / 1000).toFixed(0)} MWh`;
    text += `\nAnnual Cost: £${result.annualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
    text += `\nAnnual CO₂e: ${(result.annualCo2e / 1000).toFixed(1)}t`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getPueRating = (pue: number): { status: 'pass' | 'warning' | 'fail'; label: string } => {
    if (pue <= 1.4) return { status: 'pass', label: 'Excellent PUE' };
    if (pue <= 1.8) return { status: 'warning', label: 'Average PUE' };
    return { status: 'fail', label: 'Poor PUE' };
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Data Centre Calculator"
      description="Load analysis, PUE, infrastructure sizing and cost estimation"
    >
      {/* Core Parameters */}
      <CalculatorSection title="Core Parameters">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="IT Load"
            unit="kW"
            type="text"
            inputMode="decimal"
            value={itLoad}
            onChange={setItLoad}
            placeholder="e.g., 500"
          />
          <CalculatorSelect
            label="Redundancy Level"
            value={redundancy}
            onChange={setRedundancy}
            options={redundancyOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Facility Type"
            value={facilityType}
            onChange={setFacilityType}
            options={facilityTypeOptions}
          />
          <CalculatorSelect
            label="Climate Zone"
            value={climateZone}
            onChange={setClimateZone}
            options={climateZoneOptions}
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Infrastructure */}
      <CalculatorSection title="Infrastructure">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Cooling Method"
            value={coolingMethod}
            onChange={setCoolingMethod}
            options={coolingMethodOptions}
          />
          <CalculatorInput
            label="Design Margin"
            unit="%"
            type="text"
            inputMode="decimal"
            value={designMargin}
            onChange={setDesignMargin}
            placeholder="20"
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="Power Redundancy"
            value={powerRedundancy}
            onChange={setPowerRedundancy}
            options={redundancyOptions}
          />
          <CalculatorSelect
            label="Cooling Redundancy"
            value={coolingRedundancy}
            onChange={setCoolingRedundancy}
            options={redundancyOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="UPS Battery Runtime"
            unit="min"
            type="text"
            inputMode="numeric"
            value={upsBatteryHours}
            onChange={setUpsBatteryHours}
            placeholder="15"
          />
          <CalculatorInput
            label="UPS Efficiency"
            unit="%"
            type="text"
            inputMode="decimal"
            value={upsEfficiency}
            onChange={setUpsEfficiency}
            placeholder="95"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      {/* Advanced */}
      <CalculatorSection title="Advanced">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Lights & Misc"
            unit="%"
            type="text"
            inputMode="decimal"
            value={lightsAndMisc}
            onChange={setLightsAndMisc}
            placeholder="5"
          />
          <CalculatorInput
            label="Energy Cost"
            unit="£/kWh"
            type="text"
            inputMode="decimal"
            value={energyCost}
            onChange={setEnergyCost}
            placeholder="0.15"
          />
        </CalculatorInputGrid>
        <CalculatorInput
          label="Carbon Factor"
          unit="kg CO₂e/kWh"
          type="text"
          inputMode="decimal"
          value={carbonFactor}
          onChange={setCarbonFactor}
          placeholder="0.233"
          hint="UK grid carbon intensity"
        />
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate()}
        calculateLabel="Calculate"
        showReset={!!result}
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={getPueRating(result.pue).status}
              label={getPueRating(result.pue).label}
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
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">Power Usage Effectiveness</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.pue.toFixed(2)}
            </p>
            <p className="text-sm text-white mt-2">
              DCiE: {result.dcie.toFixed(1)}% | Headroom: {result.capacityHeadroom.toFixed(0)}%
            </p>
          </div>

          {/* Key metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Total IT Load"
              value={result.totalItLoad.toFixed(0)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Cooling Load"
              value={result.coolingLoad.toFixed(0)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Total Facility"
              value={result.totalFacilityLoad.toFixed(0)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="UPS Capacity"
              value={result.upsCapacity.toFixed(0)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Generator"
              value={result.generatorCapacity.toFixed(0)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Battery"
              value={result.batteryCapacity.toFixed(0)}
              unit="kWh"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Annual figures */}
          <ResultsGrid columns={3} className="grid-cols-3">
            <ResultValue
              label="Annual Energy"
              value={`${(result.annualKwh / 1000).toFixed(0)}`}
              unit="MWh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Annual Cost"
              value={`£${(result.annualCost / 1000).toFixed(0)}k`}
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Annual CO₂e"
              value={`${(result.annualCo2e / 1000).toFixed(1)}`}
              unit="t"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Compliance status */}
          {result.complianceStatus.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'flex items-center justify-between p-3 rounded-lg border text-sm',
                item.status === 'compliant'
                  ? 'bg-green-500/5 border-green-500/20'
                  : item.status === 'warning'
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : 'bg-red-500/5 border-red-500/20'
              )}
            >
              <div className="flex items-center gap-2">
                {item.status === 'compliant' ? (
                  <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                )}
                <span className="text-white font-medium">{item.standard}</span>
              </div>
              <span className="text-white shrink-0 ml-2 text-xs">{item.message}</span>
            </div>
          ))}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-white">Recommendations</p>
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-white">
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: config.gradientFrom }}
                  />
                  <span>
                    <span className="font-medium">{rec.category}:</span> {rec.message}
                  </span>
                </div>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* ── How It Worked Out ── */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Total power with redundancy',
                formula: `IT Load × Power Redundancy = ${parseFloat(itLoad)} kW × multiplier`,
                value: `${result.totalItLoad.toFixed(0)} kW (IT) + ${result.coolingLoad.toFixed(0)} kW (cooling) + ${result.lightsLoad.toFixed(0)} kW (misc)`,
                description:
                  'IT load is multiplied by power redundancy level, then cooling and ancillary loads are added based on cooling method and climate.',
              },
              {
                label: 'Total facility load',
                formula: `IT + Cooling + Misc = ${result.totalItLoad.toFixed(0)} + ${result.coolingLoad.toFixed(0)} + ${result.lightsLoad.toFixed(0)}`,
                value: `${result.totalFacilityLoad.toFixed(0)} kW`,
              },
              {
                label: 'PUE calculation',
                formula: `PUE = Total Facility ÷ IT Load = ${result.totalFacilityLoad.toFixed(0)} ÷ ${result.totalItLoad.toFixed(0)}`,
                value: result.pue.toFixed(2),
                description:
                  result.pue <= 1.4
                    ? 'Excellent — world-class efficiency. Modern hyperscale facilities target 1.1-1.2.'
                    : result.pue <= 1.8
                      ? 'Good — typical of well-designed modern facilities. Hot/cold aisle containment and free cooling could improve further.'
                      : 'Above average — significant optimisation opportunities exist. Consider containment, variable speed drives, or cooling upgrades.',
              },
              {
                label: 'UPS and battery sizing',
                formula: `UPS = ${result.totalFacilityLoad.toFixed(0)} kW ÷ ${upsEfficiency}% × ${designMargin}% margin`,
                value: `${result.upsCapacity.toFixed(0)} kW UPS, ${result.batteryCapacity.toFixed(0)} kWh battery`,
                description: `Battery provides ${upsBatteryHours} minutes runtime at full load, bridging to generator start.`,
              },
              {
                label: 'Annual cost and carbon',
                formula: `${result.totalFacilityLoad.toFixed(0)} kW × 8,760 hrs × £${energyCost}/kWh`,
                value: `£${result.annualCost.toLocaleString('en-GB', { maximumFractionDigits: 0 })}/year | ${(result.annualCo2e / 1000).toFixed(1)}t CO₂e`,
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
                  <p className="text-sm text-white font-medium">PUE Benchmarks</p>
                  <ul className="space-y-1">
                    {[
                      '1.0 = Perfect (impossible) — all power goes to IT',
                      '1.2-1.4 = Excellent — hyperscale/modern efficient facilities',
                      '1.5-1.8 = Good — typical well-designed data centre',
                      '2.0+ = Poor — significant overhead from cooling and losses',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Efficiency Improvements</p>
                  <ul className="space-y-1">
                    {[
                      'Hot/cold aisle containment can improve PUE by 20-30%',
                      'Variable speed drive fans reduce cooling energy by 10-15%',
                      'Free cooling in temperate climates saves 30% cooling energy',
                      'Higher inlet temperatures (27°C) reduce cooling demand',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Why Data Centre Design Matters</p>
                  <ul className="space-y-1">
                    {[
                      'Downtime costs average £4,500 per minute for enterprise facilities',
                      'Data centres consume around 1% of global electricity',
                      'Proper redundancy planning prevents single points of failure',
                      'Efficient design reduces both carbon footprint and operating costs',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: config.gradientFrom }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ── Standards Reference ── */}
          <Collapsible open={showReference} onOpenChange={setShowReference}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>Standards Reference</span>
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
                      reg: 'BS EN 50600',
                      desc: 'Information technology — Data centre facilities and infrastructures. Covers availability classes, power distribution, environmental control.',
                    },
                    {
                      reg: 'TIA-942 / Uptime Institute',
                      desc: 'Tier classification (I-IV) for data centre availability — Tier III (N+1, concurrently maintainable) is standard for enterprise.',
                    },
                    {
                      reg: 'ASHRAE TC 9.9',
                      desc: 'Thermal guidelines for data processing environments — recommended inlet temperatures 18-27°C, humidity 8-60% RH.',
                    },
                    {
                      reg: 'ISO/IEC 30134',
                      desc: 'Data centre key performance indicators including PUE, REF (Renewable Energy Factor), and CUE (Carbon Usage Effectiveness).',
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
        name="Power Usage Effectiveness"
        formula="PUE = Total Facility Power ÷ IT Equipment Power"
        variables={[
          { symbol: 'PUE', description: 'Power Usage Effectiveness (dimensionless, ideal = 1.0)' },
          {
            symbol: 'DCiE',
            description: '1 ÷ PUE × 100 = Data Centre Infrastructure Efficiency (%)',
          },
          {
            symbol: 'Total',
            description: 'IT load + cooling + UPS losses + lighting + misc',
          },
        ]}
      />
    </CalculatorCard>
  );
};

export default DataCentreCalculator;
