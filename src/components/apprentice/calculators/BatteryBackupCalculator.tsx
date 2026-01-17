import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Battery, Info, BookOpen, ChevronDown, AlertTriangle, Plus, X, Clock, Zap } from 'lucide-react';
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
import {
  calculateBatteryBackup,
  BATTERY_CHEMISTRIES,
  INVERTER_TYPES,
  LOAD_PRESETS,
  formatRuntime,
  type BatteryInputs,
  type CalculationResults
} from '@/lib/battery-backup-calcs';

interface Load {
  name: string;
  watts: number;
  dutyCycle: number;
  surgeMultiplier: number;
  priority: 'essential' | 'important' | 'convenience';
}

const BatteryBackupCalculator = () => {
  const config = CALCULATOR_CONFIG['ev-storage'];

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
  const [newLoadPriority, setNewLoadPriority] = useState<'essential' | 'important' | 'convenience'>('essential');
  const [requiredRuntime, setRequiredRuntime] = useState('');
  const [results, setResults] = useState<CalculationResults | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const chemistryOptions = Object.entries(BATTERY_CHEMISTRIES).map(([key, chem]) => ({
    value: key,
    label: chem.name
  }));

  const inverterOptions = Object.entries(INVERTER_TYPES).map(([key, inv]) => ({
    value: key,
    label: inv.name
  }));

  const priorityOptions = [
    { value: 'essential', label: 'Essential' },
    { value: 'important', label: 'Important' },
    { value: 'convenience', label: 'Convenience' }
  ];

  const addLoad = () => {
    if (!newLoadName || !newLoadWatts || parseFloat(newLoadWatts) <= 0) return;

    const newLoad: Load = {
      name: newLoadName,
      watts: parseFloat(newLoadWatts),
      dutyCycle: 1.0,
      surgeMultiplier: 1.0,
      priority: newLoadPriority
    };

    setLoads([...loads, newLoad]);
    setNewLoadName('');
    setNewLoadWatts('');
    setNewLoadPriority('essential');
  };

  const removeLoad = (index: number) => {
    setLoads(loads.filter((_, i) => i !== index));
  };

  const handleLoadPresetSelect = (preset: typeof LOAD_PRESETS[0]) => {
    setNewLoadName(preset.name);
    setNewLoadWatts(preset.watts.toString());
    setNewLoadPriority(preset.category);
  };

  const calculateBackup = () => {
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
      requiredRuntime: mode === 'sizing' && requiredRuntime ? parseFloat(requiredRuntime) : undefined
    };

    try {
      const calculationResults = calculateBatteryBackup(inputs);
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  const reset = () => {
    setCapacityAh('');
    setLoads([]);
    setResults(null);
    setRequiredRuntime('');
    setNewLoadName('');
    setNewLoadWatts('');
  };

  const getTotalLoadWatts = () => loads.reduce((sum, load) => sum + load.watts, 0);
  const selectedChemistry = BATTERY_CHEMISTRIES[chemistry];
  const selectedInverter = INVERTER_TYPES[inverterType];

  const getRuntimeColor = (runtime: number) => runtime >= 8 ? 'text-green-400' : runtime >= 3 ? 'text-amber-400' : 'text-red-400';
  const getCRateColor = (cRate: number, maxCRate: number) => cRate <= maxCRate * 0.5 ? 'text-green-400' : cRate <= maxCRate * 0.8 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="ev-storage"
        title="Battery Backup Calculator"
        description="Calculate runtime for battery backup systems with chemistry modelling"
        badge="Peukert's"
      >
        {/* Mode Selection */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Calculation Mode</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('runtime')}
              className={cn(
                "p-3 rounded-xl border transition-colors flex items-center justify-center gap-2",
                mode === 'runtime' ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
              )}
            >
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Runtime</span>
            </button>
            <button
              onClick={() => setMode('sizing')}
              className={cn(
                "p-3 rounded-xl border transition-colors flex items-center justify-center gap-2",
                mode === 'sizing' ? "bg-blue-500/20 border-blue-500/50 text-blue-300" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
              )}
            >
              <Battery className="h-4 w-4" />
              <span className="text-sm font-medium">Sizing</span>
            </button>
          </div>
        </div>

        {/* Battery Configuration */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-white/80">Battery Configuration</p>
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
            <p className="text-sm font-medium text-white/80">Load Management</p>
            <Badge variant="outline" className="text-blue-400 border-blue-400/50">
              {getTotalLoadWatts()}W total
            </Badge>
          </div>

          {/* Quick Add Presets */}
          <div className="grid grid-cols-3 gap-2">
            {LOAD_PRESETS.slice(0, 6).map((preset, index) => (
              <button
                key={index}
                onClick={() => handleLoadPresetSelect(preset)}
                className="p-2 text-xs rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors text-white/80 truncate"
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
                className="self-end h-12 px-4 rounded-xl bg-blue-500/20 border border-blue-500/50 text-blue-300 hover:bg-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Load List */}
          {loads.length > 0 && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {loads.map((load, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5 text-sm">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-white block truncate">{load.name}</span>
                    <span className="text-white/80 text-xs">{load.watts}W • {load.priority}</span>
                  </div>
                  <button
                    onClick={() => removeLoad(index)}
                    className="ml-2 p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
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
          category="ev-storage"
          onCalculate={calculateBackup}
          onReset={reset}
          isDisabled={!capacityAh || loads.length === 0}
          calculateLabel={mode === 'runtime' ? 'Calculate Runtime' : 'Calculate Size'}
        />
      </CalculatorCard>

      {results && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Results */}
          <CalculatorResult category="ev-storage">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">{mode === 'runtime' ? 'Runtime Analysis' : 'Battery Sizing'}</span>
              <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                {selectedChemistry.name}
              </Badge>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">{mode === 'runtime' ? 'Estimated Runtime' : 'Required Capacity'}</p>
              <div className="text-4xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}>
                {mode === 'runtime' ? formatRuntime(results.runtime) : `${results.requiredAh?.toFixed(0) || 'N/A'} Ah`}
              </div>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue label="Usable Energy" value={results.usableEnergyWh.toFixed(0)} unit="Wh" category="ev-storage" size="sm" />
              <ResultValue label="DC Current" value={results.dcCurrent.toFixed(1)} unit="A" category="ev-storage" size="sm" />
              <ResultValue label="C-Rate" value={results.cRate.toFixed(2)} unit="C" category="ev-storage" size="sm" />
              <ResultValue label="Max C-Rate" value={selectedChemistry.maxCRate.toFixed(1)} unit="C" category="ev-storage" size="sm" />
            </ResultsGrid>
          </CalculatorResult>

          {/* Runtime Assessment */}
          <div className={cn(
            "p-3 rounded-xl border",
            results.runtime >= 8 ? "bg-green-500/10 border-green-500/30" :
            results.runtime >= 3 ? "bg-amber-500/10 border-amber-500/30" :
            "bg-red-500/10 border-red-500/30"
          )}>
            <div className="flex items-start gap-2">
              <Clock className={cn("h-4 w-4 mt-0.5 shrink-0", getRuntimeColor(results.runtime))} />
              <div>
                <p className={cn("text-sm font-medium", getRuntimeColor(results.runtime))}>
                  {results.runtime >= 8 ? "Excellent Runtime" : results.runtime >= 3 ? "Moderate Runtime" : "Short Runtime"}
                </p>
                <p className="text-sm text-white/60 mt-1">
                  {results.runtime >= 8 ? "Exceeds typical 8-hour requirement" :
                   results.runtime >= 3 ? "Consider if adequate for your needs" :
                   "May need larger battery or reduced loads"}
                </p>
              </div>
            </div>
          </div>

          {/* C-Rate Warning */}
          {results.cRate > selectedChemistry.maxCRate * 0.8 && (
            <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-300">High Discharge Rate</p>
                  <p className="text-sm text-orange-200/80 mt-1">
                    Current C-rate ({results.cRate.toFixed(2)}C) is high. Consider parallel batteries to reduce discharge rate and extend battery life.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* What This Means */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">What This Means</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showGuidance && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-blue-200/80">
                <p><strong className="text-blue-300">Usable Energy:</strong> {results.usableEnergyWh.toFixed(0)}Wh available after accounting for depth of discharge ({(selectedChemistry.recommendedDoD * 100).toFixed(0)}% DoD for {selectedChemistry.name})</p>
                <p><strong className="text-blue-300">C-Rate:</strong> Discharge rate of {results.cRate.toFixed(2)}C means the battery would fully discharge in {(1 / results.cRate).toFixed(1)} hours at this load. Lower C-rates extend battery life.</p>
                <p><strong className="text-blue-300">Inverter Efficiency:</strong> {selectedInverter.name} at {(selectedInverter.efficiency * 100).toFixed(0)}% efficiency - {(1 - selectedInverter.efficiency) * 100}% energy lost as heat.</p>
              </CollapsibleContent>
            </div>
          </Collapsible>

          {/* BS 7671 & Safety */}
          <Collapsible open={showRegs} onOpenChange={setShowRegs}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <span className="text-sm sm:text-base font-medium text-amber-300">BS 7671 & Safety</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 text-white/70 transition-transform duration-200", showRegs && "rotate-180")} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-amber-200/80">
                <p>• DC current ({results.dcCurrent.toFixed(1)}A) must not exceed cable rating</p>
                <p>• Battery system requires appropriate DC protection (fuses/MCBs)</p>
                <p>• Ventilation required for lead-acid batteries (hydrogen gas risk)</p>
                <p>• Temperature monitoring recommended above 25°C ambient</p>
                <p>• Regular testing required - monthly for critical systems</p>
                <p>• BS 5266 emergency lighting: minimum 3 hours duration</p>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-2">
          <Battery className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-200">
            <strong>Peukert's equation</strong> used for accurate runtime. DoD and chemistry affect usable capacity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BatteryBackupCalculator;
