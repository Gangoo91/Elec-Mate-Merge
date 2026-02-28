import { useState } from 'react';
import { Battery, ChevronDown, AlertTriangle, Plus, X, Clock, Copy, Check } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorDivider,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import {
  calculateBatteryBackup,
  BATTERY_CHEMISTRIES,
  INVERTER_TYPES,
  LOAD_PRESETS,
  formatRuntime,
  type BatteryInputs,
  type CalculationResults,
} from '@/lib/battery-backup-calcs';

interface Load {
  name: string;
  watts: number;
  dutyCycle: number;
  surgeMultiplier: number;
  priority: 'essential' | 'important' | 'convenience';
}

const CAT = 'ev-storage' as const;
const config = CALCULATOR_CONFIG[CAT];

const BatteryBackupCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [mode, setMode] = useState<'runtime' | 'sizing'>('runtime');
  const [chemistry, setChemistry] = useState('lead-acid-agm');
  const [nominalVoltage, setNominalVoltage] = useState('12');
  const [capacityAh, setCapacityAh] = useState('');
  const [inverterType, setInverterType] = useState('line-interactive');
  const [ambientTemp, setAmbientTemp] = useState('20');
  const [batteryHealth, setBatteryHealth] = useState('100');
  const [loads, setLoads] = useState<Load[]>([]);
  const [newLoadName, setNewLoadName] = useState('');
  const [newLoadWatts, setNewLoadWatts] = useState('');
  const [newLoadPriority, setNewLoadPriority] = useState<'essential' | 'important' | 'convenience'>(
    'essential'
  );
  const [requiredRuntime, setRequiredRuntime] = useState('');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const chemistryOptions = Object.entries(BATTERY_CHEMISTRIES).map(([key, chem]) => ({
    value: key,
    label: chem.name,
  }));

  const inverterOptions = Object.entries(INVERTER_TYPES).map(([key, inv]) => ({
    value: key,
    label: inv.name,
  }));

  const priorityOptions = [
    { value: 'essential', label: 'Essential' },
    { value: 'important', label: 'Important' },
    { value: 'convenience', label: 'Convenience' },
  ];

  const addLoad = () => {
    if (!newLoadName || !newLoadWatts || parseFloat(newLoadWatts) <= 0) return;

    const newLoad: Load = {
      name: newLoadName,
      watts: parseFloat(newLoadWatts),
      dutyCycle: 1.0,
      surgeMultiplier: 1.0,
      priority: newLoadPriority,
    };

    setLoads([...loads, newLoad]);
    setNewLoadName('');
    setNewLoadWatts('');
    setNewLoadPriority('essential');
  };

  const removeLoad = (index: number) => {
    setLoads(loads.filter((_, i) => i !== index));
  };

  const handleLoadPresetSelect = (preset: (typeof LOAD_PRESETS)[0]) => {
    setNewLoadName(preset.name);
    setNewLoadWatts(preset.watts.toString());
    setNewLoadPriority(preset.category);
  };

  const handleCalculate = () => {
    if (!capacityAh || loads.length === 0) return;

    const inputs: BatteryInputs = {
      mode,
      chemistry,
      nominalVoltage: parseFloat(nominalVoltage),
      capacityAh: parseFloat(capacityAh),
      seriesStrings: 1,
      parallelStrings: 1,
      ambientTemp: parseFloat(ambientTemp),
      batteryHealth: parseFloat(batteryHealth),
      loads,
      inverterType,
      dcCableLength: 2,
      maxVoltDrop: 3,
      requiredRuntime:
        mode === 'sizing' && requiredRuntime ? parseFloat(requiredRuntime) : undefined,
    };

    try {
      const calculationResults = calculateBatteryBackup(inputs);
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const handleReset = () => {
    setCapacityAh('');
    setLoads([]);
    setResults(null);
    setRequiredRuntime('');
    setNewLoadName('');
    setNewLoadWatts('');
  };

  const handleCopy = () => {
    if (!results) return;
    const selectedChemistry = BATTERY_CHEMISTRIES[chemistry];
    const runtimeStatus =
      results.runtime >= 8 ? 'ADEQUATE' : results.runtime >= 3 ? 'MARGINAL' : 'INSUFFICIENT';
    const text = [
      'Battery Backup Calculator Results',
      `Chemistry: ${selectedChemistry.name}`,
      `Mode: ${mode === 'runtime' ? 'Runtime' : 'Sizing'}`,
      mode === 'runtime'
        ? `Runtime: ${formatRuntime(results.runtime)}`
        : `Required Capacity: ${results.requiredAh?.toFixed(0) || 'N/A'} Ah`,
      `Usable Energy: ${results.usableEnergyWh.toFixed(0)} Wh`,
      `DC Current: ${results.dcCurrent.toFixed(1)} A`,
      `C-Rate: ${results.cRate.toFixed(2)} C`,
      `Total Load: ${results.averagePower.toFixed(0)} W`,
      `Assessment: ${runtimeStatus}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getTotalLoadWatts = () => loads.reduce((sum, load) => sum + load.watts, 0);
  const selectedChemistry = BATTERY_CHEMISTRIES[chemistry];
  const selectedInverter = INVERTER_TYPES[inverterType];

  return (
    <CalculatorCard
      category={CAT}
      title="Battery Backup Calculator"
      description="Calculate runtime for battery backup systems with Peukert's equation"
    >
      {/* Mode Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white">Calculation Mode</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'runtime' as const, label: 'Runtime', icon: Clock },
            { value: 'sizing' as const, label: 'Sizing', icon: Battery },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={cn(
                'p-3 rounded-xl border transition-colors flex items-center justify-center gap-2 min-h-11 touch-manipulation',
                mode === opt.value
                  ? 'bg-blue-500/20 border-blue-500/50 text-white'
                  : 'bg-white/5 border-white/10 text-white hover:border-white/20'
              )}
            >
              <opt.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Battery Configuration */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white">Battery Configuration</p>
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="Battery Chemistry"
            value={chemistry}
            onChange={setChemistry}
            options={chemistryOptions}
          />
          <CalculatorSelect
            label="Inverter Type"
            value={inverterType}
            onChange={setInverterType}
            options={inverterOptions}
          />
          <CalculatorInput
            label="Voltage"
            unit="V"
            type="text"
            inputMode="decimal"
            value={nominalVoltage}
            onChange={setNominalVoltage}
            placeholder="12"
          />
          <CalculatorInput
            label="Capacity"
            unit="Ah"
            type="text"
            inputMode="decimal"
            value={capacityAh}
            onChange={setCapacityAh}
            placeholder="100"
          />
        </CalculatorInputGrid>
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Temperature"
            unit="°C"
            type="text"
            inputMode="decimal"
            value={ambientTemp}
            onChange={setAmbientTemp}
            placeholder="20"
          />
          <CalculatorInput
            label="Battery Health"
            unit="%"
            type="text"
            inputMode="decimal"
            value={batteryHealth}
            onChange={setBatteryHealth}
            placeholder="100"
          />
        </CalculatorInputGrid>
      </div>

      {/* Load Management */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white">Load Management</p>
          <span className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-semibold border bg-blue-500/20 text-blue-400 border-blue-500/30">
            {getTotalLoadWatts()}W total
          </span>
        </div>

        {/* Quick Add Presets */}
        <div className="grid grid-cols-3 gap-2">
          {LOAD_PRESETS.slice(0, 6).map((preset, index) => (
            <button
              key={index}
              onClick={() => handleLoadPresetSelect(preset)}
              className="p-2 text-xs rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors text-white truncate min-h-11 touch-manipulation"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Manual Load Entry */}
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label="Load Name"
              type="text"
              value={newLoadName}
              onChange={setNewLoadName}
              placeholder="e.g., LED Lights"
            />
            <CalculatorInput
              label="Power"
              unit="W"
              type="text"
              inputMode="decimal"
              value={newLoadWatts}
              onChange={setNewLoadWatts}
              placeholder="50"
            />
          </CalculatorInputGrid>
          <div className="flex gap-2">
            <div className="flex-1">
              <CalculatorSelect
                label="Priority"
                value={newLoadPriority}
                onChange={(v) => setNewLoadPriority(v as typeof newLoadPriority)}
                options={priorityOptions}
              />
            </div>
            <button
              onClick={addLoad}
              disabled={!newLoadName || !newLoadWatts || parseFloat(newLoadWatts) <= 0}
              className="self-end h-12 px-4 rounded-xl bg-blue-500/20 border border-blue-500/50 text-white hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-11 touch-manipulation"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Load List */}
        {loads.length > 0 && (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {loads.map((load, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-sm"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white block truncate">{load.name}</span>
                  <span className="text-white text-xs">
                    {load.watts}W · {load.priority}
                  </span>
                </div>
                <button
                  onClick={() => removeLoad(index)}
                  className="ml-2 p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors min-h-11 min-w-[44px] flex items-center justify-center touch-manipulation"
                >
                  <X className="h-3.5 w-3.5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sizing Mode Input */}
      {mode === 'sizing' && (
        <CalculatorInput
          label="Required Runtime"
          unit="hours"
          type="text"
          inputMode="decimal"
          value={requiredRuntime}
          onChange={setRequiredRuntime}
          placeholder="8"
        />
      )}

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!capacityAh || loads.length === 0}
        calculateLabel={mode === 'runtime' ? 'Calculate Runtime' : 'Calculate Size'}
        showReset={!!results}
      />

      {/* ── Results ── */}
      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <ResultBadge
              status={results.runtime >= 8 ? 'pass' : results.runtime >= 3 ? 'warning' : 'fail'}
              label={
                results.runtime >= 8
                  ? 'Adequate Runtime'
                  : results.runtime >= 3
                    ? 'Marginal Runtime'
                    : 'Insufficient Runtime'
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

          {/* Hero Value */}
          <div className="text-center py-3">
            <p className="text-sm font-medium text-white mb-1">
              {mode === 'runtime' ? 'Estimated Runtime' : 'Required Capacity'}
            </p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {mode === 'runtime'
                ? formatRuntime(results.runtime)
                : `${results.requiredAh?.toFixed(0) || 'N/A'} Ah`}
            </p>
            <p className="text-sm text-white mt-2">
              {selectedChemistry.name} · {getTotalLoadWatts()}W total load
            </p>
          </div>

          {/* Result Values */}
          <ResultsGrid columns={2}>
            <ResultValue
              label="Usable Energy"
              value={results.usableEnergyWh.toFixed(0)}
              unit="Wh"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="DC Current"
              value={results.dcCurrent.toFixed(1)}
              unit="A"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="C-Rate"
              value={results.cRate.toFixed(2)}
              unit="C"
              category={CAT}
              size="sm"
            />
            <ResultValue
              label="Max C-Rate"
              value={selectedChemistry.maxCRate.toFixed(1)}
              unit="C"
              category={CAT}
              size="sm"
            />
          </ResultsGrid>

          {/* C-Rate Warning */}
          {results.cRate > selectedChemistry.maxCRate * 0.8 && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                C-rate ({results.cRate.toFixed(2)}C) is high for {selectedChemistry.name}. Consider
                parallel batteries to reduce discharge rate and extend battery life.
              </p>
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
                label: 'Input values',
                formula: `Battery: ${nominalVoltage}V × ${capacityAh}Ah | Chemistry: ${selectedChemistry.name} | Load: ${results.averagePower.toFixed(0)}W`,
              },
              {
                label: 'Usable energy',
                formula: `V × Ah × DoD × health% × tempFactor = ${nominalVoltage} × ${capacityAh} × ${selectedChemistry.defaultDoD} × ${(parseFloat(batteryHealth) / 100).toFixed(2)}`,
                value: `${results.usableEnergyWh.toFixed(0)} Wh`,
                description: `Depth of discharge: ${(selectedChemistry.defaultDoD * 100).toFixed(0)}% for ${selectedChemistry.name}`,
              },
              {
                label: 'DC current draw',
                formula: `(totalWatts ÷ inverterEff) ÷ voltage = (${results.averagePower.toFixed(0)} ÷ ${selectedInverter.efficiency}) ÷ ${nominalVoltage}`,
                value: `${results.dcCurrent.toFixed(1)} A`,
                description: `${selectedInverter.name} efficiency: ${(selectedInverter.efficiency * 100).toFixed(0)}%`,
              },
              {
                label: 'C-rate',
                formula: `dcCurrent ÷ capacityAh = ${results.dcCurrent.toFixed(1)} ÷ ${capacityAh}`,
                value: `${results.cRate.toFixed(2)} C`,
                description: `Max recommended: ${selectedChemistry.maxCRate}C for ${selectedChemistry.name}`,
              },
              {
                label: 'Runtime (Peukert-adjusted)',
                formula: `usableEnergy ÷ totalLoad = ${results.usableEnergyWh.toFixed(0)} ÷ ${results.averagePower.toFixed(0)}`,
                value: formatRuntime(results.runtime),
                description: `Peukert exponent: ${selectedChemistry.peukertExponent} — accounts for capacity reduction at higher discharge rates`,
              },
              {
                label: 'Assessment',
                value:
                  results.runtime >= 8
                    ? 'ADEQUATE — exceeds typical 8-hour requirement'
                    : results.runtime >= 3
                      ? 'MARGINAL — consider if adequate for your needs'
                      : 'INSUFFICIENT — larger battery or reduced loads needed',
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
                className="p-3 rounded-xl border space-y-3"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Usable Energy</p>
                  <p className="text-sm text-white">
                    {results.usableEnergyWh.toFixed(0)}Wh available after accounting for depth of
                    discharge ({(selectedChemistry.defaultDoD * 100).toFixed(0)}% DoD for{' '}
                    {selectedChemistry.name}), battery health, and temperature effects.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">C-Rate</p>
                  <p className="text-sm text-white">
                    Discharge rate of {results.cRate.toFixed(2)}C means the battery would fully
                    discharge in {(1 / results.cRate).toFixed(1)} hours at this load. Lower C-rates
                    extend battery life.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Inverter Efficiency</p>
                  <p className="text-sm text-white">
                    {selectedInverter.name} at {(selectedInverter.efficiency * 100).toFixed(0)}%
                    efficiency — {((1 - selectedInverter.efficiency) * 100).toFixed(0)}% energy lost
                    as heat.
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
                      reg: 'Regulation 560.7',
                      desc: 'Safety services — battery backup requirements',
                    },
                    {
                      reg: 'Regulation 313.2',
                      desc: 'Supplies for safety services classification',
                    },
                    {
                      reg: 'BS 5266-1',
                      desc: 'Emergency lighting — minimum 3 hours duration',
                    },
                    {
                      reg: 'IEC 62040',
                      desc: 'UPS systems standard — performance and safety',
                    },
                    {
                      reg: 'DC Protection',
                      desc: `DC current (${results.dcCurrent.toFixed(1)}A) must not exceed cable rating — install appropriate DC OCPD`,
                    },
                    {
                      reg: 'Ventilation',
                      desc: 'Required for lead-acid batteries (hydrogen gas risk)',
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

      {/* Formula Reference (always visible) */}
      <FormulaReference
        category={CAT}
        name="Battery Backup Runtime"
        formula="Runtime = UsableEnergy ÷ TotalLoad"
        variables={[
          {
            symbol: 'UsableEnergy',
            description: 'V × Ah × DoD × η (usable watt-hours)',
          },
          {
            symbol: 'TotalLoad',
            description: 'Sum of all loads (watts ÷ inverter efficiency)',
          },
          {
            symbol: 'C-rate',
            description: 'Discharge rate relative to capacity (A ÷ Ah)',
          },
        ]}
      />
    </CalculatorCard>
  );
};

export default BatteryBackupCalculator;
