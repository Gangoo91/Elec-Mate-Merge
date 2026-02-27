import {
  Info,
  Calculator,
  Trash2,
  Zap,
  BookOpen,
  ChevronDown,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { useState } from 'react';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  calculateDiversity,
  CircuitLoad,
  DiversityResult,
} from '@/lib/calculators/engines/diversityEngine';
import { Checkbox } from '@/components/ui/checkbox';

interface Load {
  id: number;
  name: string;
  power: string;
  loadType: string;
  hasCookerSocket: boolean;
  thermostaticallyControlled: boolean;
}

const LOAD_TYPE_OPTIONS = [
  { value: 'lighting', label: 'Lighting Circuits' },
  { value: 'ring-final', label: 'Ring Final Circuits' },
  { value: 'radial-sockets', label: 'Radial Socket Outlets' },
  { value: 'dedicated-outlet', label: 'Dedicated Outlets' },
  { value: 'cooking', label: 'Cooking Appliances' },
  { value: 'water-heating', label: 'Water Heating' },
  { value: 'space-heating', label: 'Space Heating' },
  { value: 'shower', label: 'Electric Showers' },
  { value: 'immersion', label: 'Immersion Heaters' },
  { value: 'ev-charging', label: 'EV Charging' },
  { value: 'floor-warming', label: 'Floor Warming' },
  { value: 'motors', label: 'Motors' },
  { value: 'custom', label: 'Custom Load' },
];

const mapToEngineType = (loadType: string): CircuitLoad['type'] => {
  const mapping: Record<string, CircuitLoad['type']> = {
    lighting: 'lighting',
    'ring-final': 'ring-final',
    'radial-sockets': 'radial-socket',
    'dedicated-outlet': 'dedicated-outlet',
    cooking: 'cooker',
    'water-heating': 'water-heating',
    'space-heating': 'space-heating',
    shower: 'shower',
    immersion: 'water-heating',
    'ev-charging': 'ev-charging',
    'floor-warming': 'floor-warming',
    motors: 'motor',
    custom: 'small-power',
  };
  return mapping[loadType] || 'small-power';
};

const MaximumDemandCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([
    {
      id: 1,
      name: 'Lighting',
      power: '',
      loadType: 'lighting',
      hasCookerSocket: false,
      thermostaticallyControlled: true,
    },
    {
      id: 2,
      name: 'Ring Final Circuits',
      power: '',
      loadType: 'ring-final',
      hasCookerSocket: false,
      thermostaticallyControlled: true,
    },
  ]);
  const [result, setResult] = useState<DiversityResult | null>(null);
  const [errors, setErrors] = useState<{ [key: number]: string }>({});
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showWorkings, setShowWorkings] = useState(false);
  const [location, setLocation] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [supplyType, setSupplyType] = useState<'single-phase' | 'three-phase'>('single-phase');
  const [supplyVoltage, setSupplyVoltage] = useState('230');

  const config = CALCULATOR_CONFIG['power'];

  const addLoad = (loadType: string = 'custom') => {
    const option = LOAD_TYPE_OPTIONS.find((o) => o.value === loadType);
    setLoads([
      ...loads,
      {
        id: Date.now(),
        name: option?.label || 'Custom Load',
        power: '',
        loadType,
        hasCookerSocket: false,
        thermostaticallyControlled: true,
      },
    ]);
  };

  const removeLoad = (id: number) => {
    if (loads.length > 1) setLoads(loads.filter((load) => load.id !== id));
  };

  const updateLoad = (id: number, field: keyof Load, value: string | boolean) => {
    setLoads(
      loads.map((load) => {
        if (load.id === id) {
          const updated = { ...load, [field]: value };
          if (field === 'loadType') {
            const option = LOAD_TYPE_OPTIONS.find((o) => o.value === value);
            updated.name = option?.label || 'Custom Load';
          }
          return updated;
        }
        return load;
      })
    );
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: '' }));
  };

  const validateAndCalculate = () => {
    const newErrors: { [key: number]: string } = {};
    loads.forEach((load) => {
      const power = parseFloat(load.power) || 0;
      if (power < 0) newErrors[load.id] = 'Power cannot be negative';
      else if (power > 1000) newErrors[load.id] = 'Power seems unreasonably high';
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setResult(null);
      return;
    }

    const voltage = parseFloat(supplyVoltage);
    const circuits: CircuitLoad[] = loads
      .filter((load) => parseFloat(load.power) > 0)
      .map((load) => ({
        id: load.id.toString(),
        type: mapToEngineType(load.loadType),
        designCurrent: (parseFloat(load.power) * 1000) / voltage,
        installedPower: parseFloat(load.power),
        quantity: 1,
        location,
        hasCookerSocket: load.hasCookerSocket,
        thermostaticallyControlled: load.thermostaticallyControlled,
      }));

    if (circuits.length === 0) {
      setResult(null);
      return;
    }

    try {
      setResult(calculateDiversity(circuits, voltage, supplyType));
    } catch (error) {
      console.error('Maximum demand calculation error:', error);
      setResult(null);
    }
  };

  const reset = () => {
    setLoads([
      {
        id: 1,
        name: 'Lighting',
        power: '',
        loadType: 'lighting',
        hasCookerSocket: false,
        thermostaticallyControlled: true,
      },
      {
        id: 2,
        name: 'Ring Final Circuits',
        power: '',
        loadType: 'ring-final',
        hasCookerSocket: false,
        thermostaticallyControlled: true,
      },
    ]);
    setResult(null);
    setErrors({});
  };

  const calculateSupplyRequirements = (diversifiedLoadKW: number) => {
    const voltage = parseFloat(supplyVoltage);
    const estimatedCurrent =
      supplyType === 'three-phase'
        ? (diversifiedLoadKW * 1000) / (Math.sqrt(3) * voltage)
        : (diversifiedLoadKW * 1000) / voltage;

    let supplyAdequacy = '';
    let mainSwitchRecommendation = '';

    if (supplyType === 'single-phase') {
      if (diversifiedLoadKW <= 23) {
        supplyAdequacy = 'Standard single-phase 100A supply adequate';
        if (estimatedCurrent <= 63) mainSwitchRecommendation = '63A Main Switch';
        else if (estimatedCurrent <= 80) mainSwitchRecommendation = '80A Main Switch';
        else mainSwitchRecommendation = '100A Main Switch';
      } else {
        supplyAdequacy = 'Demand exceeds single-phase capacity — DNO consultation required';
        mainSwitchRecommendation = 'Consider three-phase supply or load reduction';
      }
    } else {
      if (diversifiedLoadKW <= 69) {
        supplyAdequacy = 'Standard three-phase 100A/phase supply adequate';
        if (estimatedCurrent <= 63) mainSwitchRecommendation = '63A 3-Phase Main Switch';
        else if (estimatedCurrent <= 80) mainSwitchRecommendation = '80A 3-Phase Main Switch';
        else mainSwitchRecommendation = '100A 3-Phase Main Switch';
      } else {
        supplyAdequacy = 'Demand exceeds standard supply — DNO consultation required';
        mainSwitchRecommendation = 'DNO application for increased supply needed';
      }
    }
    return { estimatedCurrent, supplyAdequacy, mainSwitchRecommendation };
  };

  const loadsWithPower = loads.filter((l) => parseFloat(l.power) > 0);

  const locationOptions = [
    { value: 'domestic', label: 'Domestic' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
  ];
  const supplyTypeOptions = [
    { value: 'single-phase', label: 'Single Phase' },
    { value: 'three-phase', label: 'Three Phase' },
  ];
  const voltageOptions = [
    { value: '230', label: '230V' },
    { value: '400', label: '400V' },
  ];

  return (
    <CalculatorCard
      category="power"
      title="Maximum Demand Calculator"
      description="Calculate maximum demand with IET On-Site Guide diversity allowances"
    >
      {/* Configuration — stacked on mobile, row on desktop */}
      <CalculatorSelect
        label="Installation Type"
        value={location}
        onChange={(v) => setLocation(v as 'domestic' | 'commercial' | 'industrial')}
        options={locationOptions}
      />
      <div className="grid grid-cols-2 gap-3">
        <CalculatorSelect
          label="Supply Type"
          value={supplyType}
          onChange={(v) => setSupplyType(v as 'single-phase' | 'three-phase')}
          options={supplyTypeOptions}
        />
        <CalculatorSelect
          label="Voltage"
          value={supplyVoltage}
          onChange={setSupplyVoltage}
          options={voltageOptions}
        />
      </div>

      <CalculatorDivider category="power" />

      {/* Loads header + add button */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-400" />
          Loads
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: `${config.gradientFrom}20`, color: config.gradientFrom }}
          >
            {loads.length}
          </span>
        </h3>
        <CalculatorSelect
          label=""
          value=""
          onChange={(v) => {
            if (v) addLoad(v);
          }}
          options={LOAD_TYPE_OPTIONS}
          placeholder="+ Add load..."
          className="w-40"
        />
      </div>

      {/* Load rows — flat, no nested boxes */}
      <div className="space-y-2">
        {loads.map((load) => (
          <div
            key={load.id}
            className={cn(
              'rounded-xl transition-colors',
              errors[load.id] ? 'border border-red-500/50 bg-red-500/5 p-3' : ''
            )}
          >
            {/* Main row: type label + power input + delete */}
            <div className="flex items-end gap-2">
              <div className="flex-1 min-w-0">
                <CalculatorSelect
                  label="Load Type"
                  value={load.loadType}
                  onChange={(value) => updateLoad(load.id, 'loadType', value)}
                  options={LOAD_TYPE_OPTIONS}
                />
              </div>
              <div className="w-28 shrink-0">
                <CalculatorInput
                  label="Power"
                  unit="kW"
                  type="text"
                  inputMode="decimal"
                  value={load.power}
                  onChange={(value) => updateLoad(load.id, 'power', value)}
                  placeholder="kW"
                  error={errors[load.id]}
                />
              </div>
              {loads.length > 1 && (
                <button
                  onClick={() => removeLoad(load.id)}
                  className="h-12 w-10 shrink-0 flex items-center justify-center rounded-xl hover:bg-red-500/10 text-white hover:text-red-400 transition-colors touch-manipulation"
                  aria-label="Remove load"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Conditional extra options — inline, no extra card */}
            {load.loadType === 'cooking' && (
              <label className="flex items-center gap-3 mt-2 pl-1 touch-manipulation cursor-pointer min-h-[44px]">
                <Checkbox
                  checked={load.hasCookerSocket}
                  onCheckedChange={(checked) => updateLoad(load.id, 'hasCookerSocket', !!checked)}
                  className="border-white/40 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
                />
                <span className="text-sm text-white">Cooker unit has socket outlet? (+5A)</span>
              </label>
            )}
            {load.loadType === 'space-heating' && (
              <label className="flex items-center gap-3 mt-2 pl-1 touch-manipulation cursor-pointer min-h-[44px]">
                <Checkbox
                  checked={load.thermostaticallyControlled}
                  onCheckedChange={(checked) =>
                    updateLoad(load.id, 'thermostaticallyControlled', !!checked)
                  }
                  className="border-white/40 data-[state=checked]:bg-amber-400 data-[state=checked]:border-amber-400 data-[state=checked]:text-black"
                />
                <span className="text-sm text-white">Thermostatically controlled?</span>
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Quick add buttons for common loads */}
      <div className="flex flex-wrap gap-2">
        {['shower', 'ev-charging', 'cooking', 'immersion'].map((type) => {
          const option = LOAD_TYPE_OPTIONS.find((o) => o.value === type);
          return (
            <button
              key={type}
              onClick={() => addLoad(type)}
              className="h-9 px-3 text-xs font-medium rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors touch-manipulation flex items-center gap-1.5"
            >
              <Plus className="h-3 w-3" />
              {option?.label}
            </button>
          );
        })}
      </div>

      {/* Calculate */}
      <CalculatorActions
        category="power"
        onCalculate={validateAndCalculate}
        onReset={reset}
        isDisabled={!loadsWithPower.length}
      />

      {/* Results */}
      {result && (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-green-300">
                Maximum Demand Calculated
              </span>
            </div>

            {/* Hero */}
            <div className="rounded-xl p-4 bg-white/[0.04]">
              <p className="text-sm text-white mb-1">Maximum Demand</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.diversifiedLoad.toFixed(2)} kW
              </div>
              <p className="text-sm text-white mt-1">
                {result.diversifiedCurrent.toFixed(1)}A at {supplyVoltage}V{' '}
                {supplyType === 'three-phase' ? '3-phase' : '1-phase'}
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Connected Load"
                value={result.totalInstalledLoad.toFixed(2)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Load Reduction"
                value={(result.totalInstalledLoad - result.diversifiedLoad).toFixed(2)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Diversified Current"
                value={result.diversifiedCurrent.toFixed(1)}
                unit="A"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Overall Diversity"
                value={(result.overallDiversityFactor * 100).toFixed(0)}
                unit="%"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Load schedule table */}
            {result.breakdownByType.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-white">Load Schedule</p>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <div className="grid grid-cols-4 gap-px bg-white/5 text-xs font-medium text-white p-2">
                    <span>Type</span>
                    <span className="text-right">Installed</span>
                    <span className="text-right">Diversified</span>
                    <span className="text-right">% of MD</span>
                  </div>
                  {result.breakdownByType.map((b, i) => {
                    const pctOfTotal =
                      result.diversifiedLoad > 0
                        ? (b.diversifiedLoad / result.diversifiedLoad) * 100
                        : 0;
                    return (
                      <div
                        key={i}
                        className="grid grid-cols-4 gap-px text-xs text-white p-2 border-t border-white/5"
                      >
                        <span className="text-white font-medium truncate">{b.displayName}</span>
                        <span className="text-right">{b.installedLoad.toFixed(1)} kW</span>
                        <span className="text-right font-medium">
                          {b.diversifiedLoad.toFixed(1)} kW
                        </span>
                        <span className="text-right">{pctOfTotal.toFixed(0)}%</span>
                      </div>
                    );
                  })}
                  <div className="grid grid-cols-4 gap-px text-xs font-semibold text-white p-2 border-t border-white/10 bg-white/[0.04]">
                    <span>Total</span>
                    <span className="text-right">{result.totalInstalledLoad.toFixed(1)} kW</span>
                    <span className="text-right">{result.diversifiedLoad.toFixed(1)} kW</span>
                    <span className="text-right">100%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <CalculatorDivider category="power" />

          {/* Supply Assessment */}
          {(() => {
            const supplyInfo = calculateSupplyRequirements(result.diversifiedLoad);
            return (
              <div className="space-y-3">
                <h4 className="font-medium text-white flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4" style={{ color: config.gradientFrom }} />
                  Supply Assessment
                </h4>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-sm text-white">{supplyInfo.supplyAdequacy}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <p className="text-sm text-white font-medium">
                      {supplyInfo.mainSwitchRecommendation}
                    </p>
                  </div>
                </div>
                {supplyInfo.estimatedCurrent > 60 && (
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                    <p className="text-xs text-white">
                      <strong>Note:</strong> For loads exceeding 60A per phase, notify the DNO
                      before installation.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          <CalculatorDivider category="power" />

          {/* How It Worked Out */}
          <Collapsible open={showWorkings} onOpenChange={setShowWorkings}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Calculator className="h-4 w-4 text-purple-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  How It Worked Out
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showWorkings && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="text-sm font-mono text-white space-y-4 p-3 rounded-xl bg-white/[0.04] border border-white/5">
                <div>
                  <p className="text-xs text-purple-400 mb-2">Step 1: Installed loads</p>
                  {result.breakdownByType.map((b, i) => (
                    <div key={i} className="pl-3 border-l-2 border-purple-500/30 mb-1">
                      {b.displayName}: {b.installedLoad.toFixed(2)} kW (
                      {b.installedCurrent.toFixed(1)}A)
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-2">Step 2: Apply IET diversity</p>
                  {result.breakdownByType.map((b, i) => (
                    <div key={i} className="pl-3 border-l-2 border-purple-500/30 mb-2">
                      <p className="font-semibold text-white">{b.displayName}:</p>
                      {b.steps.map((step, si) => (
                        <p key={si} className="text-white text-xs ml-2">
                          {step}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">Step 3: Sum</p>
                  <p>
                    MD ={' '}
                    {result.breakdownByType.map((b) => b.diversifiedLoad.toFixed(2)).join(' + ')}
                  </p>
                  <p>
                    MD = <span className="font-bold">{result.diversifiedLoad.toFixed(2)} kW</span>
                  </p>
                </div>
                <div className="pt-2 border-t border-purple-500/20">
                  <p className="text-xs text-purple-400 mb-1">
                    Step 4: Current ({supplyType === 'three-phase' ? '3-phase' : '1-phase'})
                  </p>
                  {supplyType === 'three-phase' ? (
                    <p>
                      I = ({result.diversifiedLoad.toFixed(2)} × 1000) / (1.732 × {supplyVoltage}) ={' '}
                      <span className="font-bold">{result.diversifiedCurrent.toFixed(1)}A</span>
                    </p>
                  ) : (
                    <p>
                      I = ({result.diversifiedLoad.toFixed(2)} × 1000) / {supplyVoltage} ={' '}
                      <span className="font-bold">{result.diversifiedCurrent.toFixed(1)}A</span>
                    </p>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-sm sm:text-base font-medium text-white">What This Means</span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showGuidance && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Maximum Demand:</strong> The calculated peak load after applying IET
                    On-Site Guide diversity allowances based on realistic usage patterns.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Diversity Allowances:</strong> Published in the IET On-Site Guide (Table
                    1B for domestic, Table H2 for commercial/industrial), not in BS 7671 directly.
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Supply Assessment:</strong> Helps determine if your electrical supply is
                    adequate for the calculated demand.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* IET Guidance */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  IET Guidance Reference
                </span>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white transition-transform duration-200',
                  showBsRegs && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-3 pl-1">
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Reg. 311.1:</strong> Assessment of maximum demand shall take diversity
                    into account
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table 1B:</strong> Diversity allowances for domestic installations
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Table H2:</strong> Diversity allowances for commercial/industrial
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong>Note:</strong> Diversity allowances are in the IET On-Site Guide, not BS
                    7671 directly
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>MD</strong> = Sum of diversified loads per IET On-Site Guide. I = (MD × 1000) /
            V
          </p>
        </div>
      </div>
    </CalculatorCard>
  );
};

export default MaximumDemandCalculator;
