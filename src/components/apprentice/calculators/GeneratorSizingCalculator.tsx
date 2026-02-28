import { useState, useMemo, useCallback } from 'react';
import { Zap, Plus, Trash2, Copy, Check, ChevronDown } from 'lucide-react';
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

const CAT = 'power' as const;
const config = CALCULATOR_CONFIG[CAT];

interface Load {
  id: string;
  name: string;
  kW: number;
  startingMultiplier: number;
  powerFactor: number;
  isMotor: boolean;
}

interface GeneratorResult {
  totalRunningKW: number;
  totalRunningKVA: number;
  peakStartingKVA: number;
  recommendedKVA: number;
  recommendedKW: number;
  nearestStandardKVA: number;
  fuelConsumptionPerHour: number;
  fuelConsumption8Hours: number;
  transferSwitchRating: number;
  warnings: string[];
}

const standardGeneratorSizes = [
  10, 15, 20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 400, 500, 630, 800, 1000, 1250,
  1500, 2000,
];

const fuelConsumptionRates = { diesel: 0.27, petrol: 0.35, lpg: 0.4 };

const fuelTypeOptions = [
  { value: 'diesel', label: 'Diesel' },
  { value: 'petrol', label: 'Petrol' },
  { value: 'lpg', label: 'LPG' },
];

const startingMethodOptions = [
  { value: 'sequence', label: 'Sequential motor starting' },
  { value: 'simultaneous', label: 'Simultaneous (worst case)' },
];

const presetOptions = [
  { value: 'lighting', label: 'Lighting (5kW)' },
  { value: 'hvac', label: 'HVAC System (15kW)' },
  { value: 'lift', label: 'Lift Motor (11kW)' },
  { value: 'pump', label: 'Pump Motor (7.5kW)' },
  { value: 'it', label: 'IT Equipment (10kW)' },
  { value: 'sockets', label: 'Socket Outlets (8kW)' },
];

const presets: Record<string, Partial<Load>> = {
  lighting: { name: 'Lighting', kW: 5, startingMultiplier: 1, powerFactor: 0.95, isMotor: false },
  hvac: { name: 'HVAC System', kW: 15, startingMultiplier: 6, powerFactor: 0.85, isMotor: true },
  lift: { name: 'Lift Motor', kW: 11, startingMultiplier: 6, powerFactor: 0.8, isMotor: true },
  pump: { name: 'Pump Motor', kW: 7.5, startingMultiplier: 6, powerFactor: 0.85, isMotor: true },
  it: { name: 'IT Equipment', kW: 10, startingMultiplier: 1, powerFactor: 0.9, isMotor: false },
  sockets: {
    name: 'Socket Outlets',
    kW: 8,
    startingMultiplier: 1,
    powerFactor: 0.9,
    isMotor: false,
  },
};

const GeneratorSizingCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [loads, setLoads] = useState<Load[]>([
    {
      id: '1',
      name: 'General Lighting',
      kW: 5,
      startingMultiplier: 1,
      powerFactor: 0.95,
      isMotor: false,
    },
  ]);
  const [diversity, setDiversity] = useState('0.8');
  const [altitude, setAltitude] = useState('0');
  const [ambientTemp, setAmbientTemp] = useState('25');
  const [fuelType, setFuelType] = useState('diesel');
  const [phases, setPhases] = useState('3');
  const [voltage, setVoltage] = useState('400');
  const [startingMethod, setStartingMethod] = useState('sequence');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): GeneratorResult | null => {
    if (loads.length === 0) return null;

    const diversityFactor = parseFloat(diversity);
    const alt = parseFloat(altitude);
    const temp = parseFloat(ambientTemp);

    let totalRunningKW = 0;
    let totalRunningKVA = 0;
    let maxStartingKVA = 0;

    loads.forEach((load) => {
      if (load.kW > 0) {
        const kVA = load.kW / load.powerFactor;
        totalRunningKW += load.kW;
        totalRunningKVA += kVA;
        if (load.isMotor) {
          const startingKVA = kVA * load.startingMultiplier;
          if (startingKVA > maxStartingKVA) maxStartingKVA = startingKVA;
        }
      }
    });

    totalRunningKW *= diversityFactor;
    totalRunningKVA *= diversityFactor;

    let peakStartingKVA: number;
    if (startingMethod === 'sequence') {
      peakStartingKVA = totalRunningKVA + maxStartingKVA;
    } else {
      let totalStartingKVA = 0;
      loads.forEach((load) => {
        if (load.isMotor && load.kW > 0) {
          totalStartingKVA += (load.kW / load.powerFactor) * load.startingMultiplier;
        }
      });
      peakStartingKVA = totalRunningKVA + totalStartingKVA;
    }

    let deratingFactor = 1.0;
    if (alt > 1000) deratingFactor *= 1 - ((alt - 1000) / 300) * 0.035;
    if (temp > 25) deratingFactor *= 1 - ((temp - 25) / 5) * 0.02;

    const margin = 1.2;
    const recommendedKVA =
      (Math.max(totalRunningKVA, peakStartingKVA * 0.7) * margin) / deratingFactor;
    const recommendedKW = recommendedKVA * 0.8;

    const nearestStandardKVA =
      standardGeneratorSizes.find((size) => size >= recommendedKVA) ||
      Math.ceil(recommendedKVA / 100) * 100;

    const loadFactor = 0.75;
    const fuelRate = fuelConsumptionRates[fuelType as keyof typeof fuelConsumptionRates];
    const fuelConsumptionPerHour = nearestStandardKVA * 0.8 * loadFactor * fuelRate;
    const fuelConsumption8Hours = fuelConsumptionPerHour * 8;

    const transferSwitchRating =
      Math.ceil(
        (((nearestStandardKVA * 1000) / (Math.sqrt(3) * parseFloat(voltage))) * 1.25) / 100
      ) * 100;

    const warnings: string[] = [];
    if (peakStartingKVA > nearestStandardKVA * 0.8) {
      warnings.push('Large motor starting may cause voltage dip — consider soft starters or VFDs');
    }
    if (deratingFactor < 0.9) {
      warnings.push(
        `Significant derating applied (${((1 - deratingFactor) * 100).toFixed(0)}%) — verify manufacturer specifications`
      );
    }
    if (totalRunningKW < nearestStandardKVA * 0.3) {
      warnings.push(
        'Generator may be oversized — consider smaller unit or confirm future expansion'
      );
    }

    return {
      totalRunningKW,
      totalRunningKVA,
      peakStartingKVA,
      recommendedKVA,
      recommendedKW,
      nearestStandardKVA,
      fuelConsumptionPerHour,
      fuelConsumption8Hours,
      transferSwitchRating,
      warnings,
    };
  }, [loads, diversity, altitude, ambientTemp, fuelType, startingMethod, voltage]);

  const addLoad = () => {
    setLoads([
      ...loads,
      {
        id: Date.now().toString(),
        name: 'New Load',
        kW: 0,
        startingMultiplier: 1,
        powerFactor: 0.85,
        isMotor: false,
      },
    ]);
  };

  const updateLoad = (id: string, updates: Partial<Load>) => {
    setLoads(loads.map((load) => (load.id === id ? { ...load, ...updates } : load)));
  };

  const removeLoad = (id: string) => {
    setLoads(loads.filter((load) => load.id !== id));
  };

  const addPresetLoad = (preset: string) => {
    const data = presets[preset];
    if (data) {
      setLoads([
        ...loads,
        {
          id: Date.now().toString(),
          name: data.name || 'Load',
          kW: data.kW || 0,
          startingMultiplier: data.startingMultiplier || 1,
          powerFactor: data.powerFactor || 0.85,
          isMotor: data.isMotor || false,
        },
      ]);
    }
  };

  const reset = useCallback(() => {
    setLoads([
      {
        id: '1',
        name: 'General Lighting',
        kW: 5,
        startingMultiplier: 1,
        powerFactor: 0.95,
        isMotor: false,
      },
    ]);
    setDiversity('0.8');
    setAltitude('0');
    setAmbientTemp('25');
    setFuelType('diesel');
    setPhases('3');
    setVoltage('400');
    setStartingMethod('sequence');
  }, []);

  const handleCopy = () => {
    if (!result) return;
    let text = 'Generator Sizing Results';
    text += `\nRecommended: ${result.nearestStandardKVA} kVA (${(result.nearestStandardKVA * 0.8).toFixed(0)} kW prime)`;
    text += `\nRunning Load: ${result.totalRunningKW.toFixed(1)} kW / ${result.totalRunningKVA.toFixed(1)} kVA`;
    text += `\nPeak Starting: ${result.peakStartingKVA.toFixed(1)} kVA`;
    text += `\nTransfer Switch: ${result.transferSwitchRating}A`;
    text += `\nFuel: ${result.fuelConsumptionPerHour.toFixed(1)} L/hr (${fuelType})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getSizingVerdict = (): { status: 'pass' | 'warning' | 'fail'; label: string } => {
    if (!result) return { status: 'info' as 'pass', label: '' };
    const loadRatio = result.totalRunningKW / (result.nearestStandardKVA * 0.8);
    if (loadRatio < 0.3) return { status: 'warning', label: 'Possibly Oversized' };
    if (loadRatio > 0.85) return { status: 'fail', label: 'Near Capacity' };
    return { status: 'pass', label: 'Correctly Sized' };
  };

  return (
    <CalculatorCard
      category={CAT}
      title="Generator Sizing Calculator"
      description="Calculate standby generator kVA rating with motor starting allowance"
    >
      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorSelect
            label="System"
            value={phases}
            onChange={setPhases}
            options={[
              { value: '1', label: 'Single Phase' },
              { value: '3', label: 'Three Phase' },
            ]}
          />
          <CalculatorInput
            label="Voltage"
            unit="V"
            type="text"
            inputMode="decimal"
            value={voltage}
            onChange={setVoltage}
            placeholder="400"
          />
        </CalculatorInputGrid>
        <CalculatorSelect
          label="Motor Starting Method"
          value={startingMethod}
          onChange={setStartingMethod}
          options={startingMethodOptions}
        />
      </CalculatorSection>

      {/* Connected Loads */}
      <CalculatorSection title="Connected Loads">
        <div className="space-y-3">
          {loads.map((load) => (
            <div key={load.id} className="space-y-3">
              <div className="flex items-center gap-2">
                <CalculatorInput
                  label="Load Name"
                  type="text"
                  value={load.name}
                  onChange={(val) => updateLoad(load.id, { name: val })}
                  placeholder="Load name"
                />
                <button
                  onClick={() => removeLoad(load.id)}
                  className="h-11 w-11 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors touch-manipulation shrink-0 mt-6"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorInput
                  label="Power"
                  unit="kW"
                  type="text"
                  inputMode="decimal"
                  value={load.kW || ''}
                  onChange={(val) => updateLoad(load.id, { kW: parseFloat(val) || 0 })}
                  placeholder="0"
                />
                <CalculatorInput
                  label="Power Factor"
                  type="text"
                  inputMode="decimal"
                  value={load.powerFactor || ''}
                  onChange={(val) => updateLoad(load.id, { powerFactor: parseFloat(val) || 0.85 })}
                  placeholder="0.85"
                />
              </CalculatorInputGrid>

              <CalculatorInputGrid columns={2} className="grid-cols-2">
                <CalculatorInput
                  label="Starting Multiplier"
                  type="text"
                  inputMode="decimal"
                  value={load.startingMultiplier || ''}
                  onChange={(val) =>
                    updateLoad(load.id, { startingMultiplier: parseFloat(val) || 1 })
                  }
                  placeholder="1"
                  hint={load.isMotor ? 'DOL = 6-8×' : '1× for non-motor'}
                />
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer min-h-[44px] touch-manipulation">
                    <input
                      type="checkbox"
                      checked={load.isMotor}
                      onChange={(e) =>
                        updateLoad(load.id, {
                          isMotor: e.target.checked,
                          startingMultiplier: e.target.checked ? 6 : 1,
                        })
                      }
                      className="rounded border-white/20 bg-white/10 text-amber-400 focus:ring-amber-400/50 h-5 w-5"
                    />
                    <span className="text-sm text-white">Motor load</span>
                  </label>
                </div>
              </CalculatorInputGrid>

              <CalculatorDivider category={CAT} />
            </div>
          ))}
        </div>

        {/* Add Load */}
        <div className="flex gap-2">
          <CalculatorSelect
            label=""
            value=""
            onChange={(val) => {
              if (val) addPresetLoad(val);
            }}
            options={presetOptions}
            placeholder="Add preset load..."
          />
          <button
            onClick={addLoad}
            className="h-12 px-4 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation mt-auto shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Custom</span>
          </button>
        </div>
      </CalculatorSection>

      {/* Generator Parameters */}
      <CalculatorSection title="Generator Parameters">
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Diversity Factor"
            type="text"
            inputMode="decimal"
            value={diversity}
            onChange={setDiversity}
            placeholder="0.8"
            hint="0.7-1.0 typical"
          />
          <CalculatorSelect
            label="Fuel Type"
            value={fuelType}
            onChange={setFuelType}
            options={fuelTypeOptions}
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2} className="grid-cols-2">
          <CalculatorInput
            label="Altitude"
            unit="m"
            type="text"
            inputMode="numeric"
            value={altitude}
            onChange={setAltitude}
            placeholder="0"
            hint="Derate above 1000m"
          />
          <CalculatorInput
            label="Ambient Temp"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={ambientTemp}
            onChange={setAmbientTemp}
            placeholder="25"
            hint="Derate above 25°C"
          />
        </CalculatorInputGrid>
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={() => {}}
        onReset={reset}
        isDisabled={loads.length === 0}
        calculateLabel="Calculate"
        showReset
      />

      {/* ── Results ── */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge status={getSizingVerdict().status} label={getSizingVerdict().label} />
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
            <p className="text-sm font-medium text-white mb-1">Generator Rating</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.nearestStandardKVA} kVA
            </p>
            <p className="text-sm text-white mt-2">
              {(result.nearestStandardKVA * 0.8).toFixed(0)} kW prime |{' '}
              {phases === '3' ? '3-phase' : 'Single phase'}
            </p>
          </div>

          {/* Result cards */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Running Load"
              value={result.totalRunningKW.toFixed(1)}
              unit="kW"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Running kVA"
              value={result.totalRunningKVA.toFixed(1)}
              unit="kVA"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Peak Starting"
              value={result.peakStartingKVA.toFixed(1)}
              unit="kVA"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Transfer Switch"
              value={result.transferSwitchRating.toString()}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Fuel per Hour"
              value={result.fuelConsumptionPerHour.toFixed(1)}
              unit="L/hr"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Fuel (8hr run)"
              value={result.fuelConsumption8Hours.toFixed(0)}
              unit="L"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="space-y-1.5">
              {result.warnings.map((warning, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-white">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-amber-400" />
                  {warning}
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
                label: 'Running load calculation',
                formula: `Total kW × Diversity = ${(result.totalRunningKW / parseFloat(diversity)).toFixed(1)} × ${diversity}`,
                value: `${result.totalRunningKW.toFixed(1)} kW (${result.totalRunningKVA.toFixed(1)} kVA)`,
              },
              {
                label: 'Motor starting allowance',
                formula:
                  startingMethod === 'sequence'
                    ? 'Running kVA + largest motor start kVA'
                    : 'Running kVA + all motor start kVA (worst case)',
                value: `${result.peakStartingKVA.toFixed(1)} kVA peak`,
              },
              {
                label: 'Sizing with margin',
                formula: `Required kVA × 1.2 margin = ${result.recommendedKVA.toFixed(1)} kVA`,
                value: `${result.nearestStandardKVA} kVA (nearest standard size)`,
                description: `Loading ratio: ${((result.totalRunningKW / (result.nearestStandardKVA * 0.8)) * 100).toFixed(0)}% — target 70-80% for optimal efficiency.`,
              },
              {
                label: 'Fuel consumption at 75% load',
                formula: `${result.nearestStandardKVA} kVA × 0.8 PF × 0.75 load × ${fuelConsumptionRates[fuelType as keyof typeof fuelConsumptionRates]} L/kWh`,
                value: `${result.fuelConsumptionPerHour.toFixed(1)} L/hr (${result.fuelConsumption8Hours.toFixed(0)} L for 8 hours)`,
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
                  <p className="text-sm text-white font-medium">Why Correct Sizing Matters</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-sm text-white font-medium">If Undersized:</p>
                      <ul className="space-y-0.5">
                        {[
                          'Voltage/frequency drop on load',
                          'Motors fail to start',
                          'Overheating and shutdown',
                          'Reduced engine life',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-red-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white font-medium">If Oversized:</p>
                      <ul className="space-y-0.5">
                        {[
                          'Higher capital cost',
                          'Wet stacking (diesel)',
                          'Inefficient fuel use',
                          'Carbon build-up',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-white">
                            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 bg-amber-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Derating Factors</p>
                  <ul className="space-y-1">
                    {[
                      'Altitude: Derate 3.5% per 300m above 1000m',
                      'Temperature: Derate 2% per 5°C above 25°C',
                      'Target loading: 70-80% for optimal efficiency',
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

          {/* ── BS 7671 Reference ── */}
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
                      reg: 'Section 551',
                      desc: 'Low voltage generating sets — installation requirements, earthing, protection.',
                    },
                    {
                      reg: 'Regulation 551.4',
                      desc: 'Earthing arrangements for generators — TN-S recommended for standby sets.',
                    },
                    {
                      reg: 'Transfer switching',
                      desc: 'Automatic transfer switch must prevent parallel operation with mains supply.',
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
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <p className="text-sm text-white font-medium">Motor Starting Multipliers</p>
                  <ul className="space-y-1">
                    {[
                      'DOL (Direct On-Line): 6-8× full load current',
                      'Star-Delta: 2-3× full load current',
                      'Soft Starter: 2-4× full load current',
                      'VFD: 1.1-1.5× full load current',
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
        </div>
      )}

      {/* Formula reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Generator Sizing"
        formula="kVA = (kW ÷ PF) × Diversity × Margin ÷ Derating"
        variables={[
          { symbol: 'kVA', description: 'Generator apparent power rating' },
          { symbol: 'kW', description: 'Total connected real power' },
          { symbol: 'PF', description: 'Power factor (0.8 typical for generators)' },
          { symbol: 'Margin', description: '1.2 (20% safety margin)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default GeneratorSizingCalculator;
