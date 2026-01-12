import { useState, useMemo } from "react";
import { Zap, Info, BookOpen, ChevronDown, Plus, Trash2, AlertTriangle, Fuel } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
  CalculatorCard,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultValue,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";

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

// Standard generator sizes (kVA)
const standardGeneratorSizes = [10, 15, 20, 30, 40, 50, 60, 80, 100, 125, 150, 200, 250, 300, 400, 500, 630, 800, 1000, 1250, 1500, 2000];

// Fuel consumption rates (litres/kWh) - approximate
const fuelConsumptionRates = {
  diesel: 0.27,
  petrol: 0.35,
  lpg: 0.40,
};

const GeneratorSizingCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  // Inputs
  const [loads, setLoads] = useState<Load[]>([
    { id: "1", name: "General Lighting", kW: 5, startingMultiplier: 1, powerFactor: 0.95, isMotor: false },
  ]);
  const [diversity, setDiversity] = useState<string>("0.8");
  const [altitude, setAltitude] = useState<string>("0");
  const [ambientTemp, setAmbientTemp] = useState<string>("25");
  const [fuelType, setFuelType] = useState<string>("diesel");
  const [phases, setPhases] = useState<string>("3");
  const [voltage, setVoltage] = useState<string>("400");
  const [startingMethod, setStartingMethod] = useState<string>("sequence");

  const [showGuidance, setShowGuidance] = useState(false);
  const [showReference, setShowReference] = useState(false);

  const result = useMemo((): GeneratorResult | null => {
    if (loads.length === 0) return null;

    const diversityFactor = parseFloat(diversity);
    const alt = parseFloat(altitude);
    const temp = parseFloat(ambientTemp);

    // Calculate total running load
    let totalRunningKW = 0;
    let totalRunningKVA = 0;
    let maxStartingKVA = 0;

    loads.forEach(load => {
      if (load.kW > 0) {
        const kVA = load.kW / load.powerFactor;
        totalRunningKW += load.kW;
        totalRunningKVA += kVA;

        // Track largest motor start
        if (load.isMotor) {
          const startingKVA = kVA * load.startingMultiplier;
          if (startingKVA > maxStartingKVA) {
            maxStartingKVA = startingKVA;
          }
        }
      }
    });

    // Apply diversity
    totalRunningKW *= diversityFactor;
    totalRunningKVA *= diversityFactor;

    // Peak starting KVA (running load + largest motor start)
    let peakStartingKVA: number;
    if (startingMethod === "sequence") {
      // Sequential starting - consider largest motor only
      peakStartingKVA = totalRunningKVA + maxStartingKVA;
    } else {
      // All motors start together (worst case)
      let totalStartingKVA = 0;
      loads.forEach(load => {
        if (load.isMotor && load.kW > 0) {
          totalStartingKVA += (load.kW / load.powerFactor) * load.startingMultiplier;
        }
      });
      peakStartingKVA = totalRunningKVA + totalStartingKVA;
    }

    // Derating factors
    let deratingFactor = 1.0;

    // Altitude derating (above 1000m, derate 3.5% per 300m)
    if (alt > 1000) {
      deratingFactor *= 1 - (((alt - 1000) / 300) * 0.035);
    }

    // Temperature derating (above 25°C, derate ~2% per 5°C)
    if (temp > 25) {
      deratingFactor *= 1 - (((temp - 25) / 5) * 0.02);
    }

    // Required generator size with 20% margin
    const margin = 1.2;
    const recommendedKVA = Math.max(totalRunningKVA, peakStartingKVA * 0.7) * margin / deratingFactor;
    const recommendedKW = recommendedKVA * 0.8; // Assume 0.8 PF rating

    // Find nearest standard size
    const nearestStandardKVA = standardGeneratorSizes.find(size => size >= recommendedKVA) ||
      Math.ceil(recommendedKVA / 100) * 100;

    // Fuel consumption (at 75% load)
    const loadFactor = 0.75;
    const fuelRate = fuelConsumptionRates[fuelType as keyof typeof fuelConsumptionRates];
    const fuelConsumptionPerHour = nearestStandardKVA * 0.8 * loadFactor * fuelRate;
    const fuelConsumption8Hours = fuelConsumptionPerHour * 8;

    // Transfer switch rating (125% of generator rating)
    const transferSwitchRating = Math.ceil((nearestStandardKVA * 1000 / (Math.sqrt(3) * parseFloat(voltage))) * 1.25 / 100) * 100;

    // Warnings
    const warnings: string[] = [];
    if (peakStartingKVA > nearestStandardKVA * 0.8) {
      warnings.push("Large motor starting may cause voltage dip - consider soft starters or VFDs");
    }
    if (deratingFactor < 0.9) {
      warnings.push(`Significant derating applied (${((1 - deratingFactor) * 100).toFixed(0)}%) - verify manufacturer specifications`);
    }
    if (totalRunningKW < nearestStandardKVA * 0.3) {
      warnings.push("Generator may be oversized - consider smaller unit or ensure future expansion justified");
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
    const newId = Date.now().toString();
    setLoads([...loads, {
      id: newId,
      name: "New Load",
      kW: 0,
      startingMultiplier: 1,
      powerFactor: 0.85,
      isMotor: false,
    }]);
  };

  const updateLoad = (id: string, updates: Partial<Load>) => {
    setLoads(loads.map(load =>
      load.id === id ? { ...load, ...updates } : load
    ));
  };

  const removeLoad = (id: string) => {
    setLoads(loads.filter(load => load.id !== id));
  };

  const addPresetLoad = (preset: string) => {
    const presets: Record<string, Partial<Load>> = {
      "lighting": { name: "Lighting", kW: 5, startingMultiplier: 1, powerFactor: 0.95, isMotor: false },
      "hvac": { name: "HVAC System", kW: 15, startingMultiplier: 6, powerFactor: 0.85, isMotor: true },
      "lift": { name: "Lift Motor", kW: 11, startingMultiplier: 6, powerFactor: 0.8, isMotor: true },
      "pump": { name: "Pump Motor", kW: 7.5, startingMultiplier: 6, powerFactor: 0.85, isMotor: true },
      "it": { name: "IT Equipment", kW: 10, startingMultiplier: 1, powerFactor: 0.9, isMotor: false },
      "sockets": { name: "Socket Outlets", kW: 8, startingMultiplier: 1, powerFactor: 0.9, isMotor: false },
    };

    const preset_data = presets[preset];
    if (preset_data) {
      setLoads([...loads, {
        id: Date.now().toString(),
        name: preset_data.name || "Load",
        kW: preset_data.kW || 0,
        startingMultiplier: preset_data.startingMultiplier || 1,
        powerFactor: preset_data.powerFactor || 0.85,
        isMotor: preset_data.isMotor || false,
      }]);
    }
  };

  const reset = () => {
    setLoads([{ id: "1", name: "General Lighting", kW: 5, startingMultiplier: 1, powerFactor: 0.95, isMotor: false }]);
    setDiversity("0.8");
    setAltitude("0");
    setAmbientTemp("25");
    setFuelType("diesel");
    setPhases("3");
    setVoltage("400");
    setStartingMethod("sequence");
  };

  const fuelTypeOptions = [
    { value: "diesel", label: "Diesel" },
    { value: "petrol", label: "Petrol" },
    { value: "lpg", label: "LPG" },
  ];

  const startingMethodOptions = [
    { value: "sequence", label: "Sequential motor starting" },
    { value: "simultaneous", label: "Simultaneous (worst case)" },
  ];

  const presetOptions = [
    { value: "lighting", label: "Lighting (5kW)" },
    { value: "hvac", label: "HVAC System (15kW)" },
    { value: "lift", label: "Lift Motor (11kW)" },
    { value: "pump", label: "Pump Motor (7.5kW)" },
    { value: "it", label: "IT Equipment (10kW)" },
    { value: "sockets", label: "Socket Outlets (8kW)" },
  ];

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="power"
        title="Generator Sizing Calculator"
        description="Calculate standby generator kVA rating with motor starting allowance"
        badge="kVA"
      >
        {/* System Configuration */}
        <div className="grid grid-cols-2 gap-3">
          <CalculatorSelect
            label="System"
            value={phases}
            onChange={setPhases}
            options={[
              { value: "1", label: "Single Phase" },
              { value: "3", label: "Three Phase" },
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
        </div>

        <CalculatorSelect
          label="Motor Starting Method"
          value={startingMethod}
          onChange={setStartingMethod}
          options={startingMethodOptions}
        />
      </CalculatorCard>

      {/* Loads Section */}
      <div className="calculator-card p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400" />
            <h3 className="font-semibold text-white">Connected Loads</h3>
          </div>
          <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-lg">
            {loads.length} loads
          </span>
        </div>

        {/* Load List */}
        <div className="space-y-3">
          {loads.map((load) => (
            <div key={load.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={load.name}
                  onChange={(e) => updateLoad(load.id, { name: e.target.value })}
                  className="flex-1 h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                  placeholder="Load name"
                />
                <button
                  onClick={() => removeLoad(load.id)}
                  className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors touch-manipulation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs text-white/80 mb-1 block">Power</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={load.kW || ""}
                      onChange={(e) => updateLoad(load.id, { kW: parseFloat(e.target.value) || 0 })}
                      className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                      placeholder="0"
                    />
                    <span className="text-xs text-white/80 ml-1">kW</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/80 mb-1 block">PF</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={load.powerFactor || ""}
                    onChange={(e) => updateLoad(load.id, { powerFactor: parseFloat(e.target.value) || 0.85 })}
                    className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                    placeholder="0.85"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/80 mb-1 block">Start ×</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={load.startingMultiplier || ""}
                    onChange={(e) => updateLoad(load.id, { startingMultiplier: parseFloat(e.target.value) || 1 })}
                    className="w-full h-9 px-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
                    placeholder="1"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={load.isMotor}
                  onChange={(e) => updateLoad(load.id, {
                    isMotor: e.target.checked,
                    startingMultiplier: e.target.checked ? 6 : 1
                  })}
                  className="rounded border-white/20 bg-white/10 text-amber-400 focus:ring-amber-400/50"
                />
                <span className="text-xs text-white/80">Motor load (DOL starting ×6)</span>
              </label>
            </div>
          ))}
        </div>

        {/* Add Load */}
        <div className="flex gap-2">
          <select
            onChange={(e) => {
              if (e.target.value) addPresetLoad(e.target.value);
              e.target.value = "";
            }}
            className="flex-1 h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/50"
            defaultValue=""
          >
            <option value="" disabled>Add preset load...</option>
            {presetOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={addLoad}
            className="h-12 px-4 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm">Custom</span>
          </button>
        </div>
      </div>

      {/* Additional Parameters */}
      <div className="calculator-card p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Fuel className="h-5 w-5 text-amber-400" />
          <h3 className="font-semibold text-white">Generator Parameters</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
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
        </div>

        <div className="grid grid-cols-2 gap-3">
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
        </div>

        <CalculatorActions
          category="power"
          onCalculate={() => {}}
          onReset={reset}
          isDisabled={loads.length === 0}
          calculateLabel="Live Results Below"
        />
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="power">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-sm text-white/60">Recommended Generator</span>
              <span className="text-sm font-medium text-green-400">
                {phases === "3" ? "3-phase" : "Single phase"}
              </span>
            </div>

            <div className="text-center py-4">
              <p className="text-sm text-white/60 mb-1">Generator Rating</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.nearestStandardKVA} kVA
              </div>
              <p className="text-sm text-white/80 mt-1">
                ({(result.nearestStandardKVA * 0.8).toFixed(0)} kW prime rating)
              </p>
            </div>

            <ResultsGrid columns={2}>
              <ResultValue
                label="Running Load"
                value={result.totalRunningKW.toFixed(1)}
                unit="kW"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Running kVA"
                value={result.totalRunningKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Peak Starting"
                value={result.peakStartingKVA.toFixed(1)}
                unit="kVA"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Transfer Switch"
                value={result.transferSwitchRating.toString()}
                unit="A"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Fuel Consumption */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <p className="text-xs text-white/80 mb-2">Fuel Consumption (at 75% load)</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-400/70">Per Hour</p>
                  <p className="text-sm font-semibold text-amber-400">
                    {result.fuelConsumptionPerHour.toFixed(1)} L/hr
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-400/70">8 Hour Run</p>
                  <p className="text-sm font-semibold text-amber-400">
                    {result.fuelConsumption8Hours.toFixed(0)} L
                  </p>
                </div>
              </div>
            </div>
          </CalculatorResult>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <p key={idx} className="text-sm text-orange-200/80">{warning}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* How It Worked Out */}
          <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm sm:text-base font-medium text-blue-300">How It Worked Out</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/70 transition-transform duration-200",
                  showGuidance && "rotate-180"
                )} />
              </CollapsibleTrigger>

              <CollapsibleContent className="p-4 pt-0">
                <div className="space-y-3 text-sm">
                  {/* Why Sizing Matters */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 font-medium text-xs mb-1">If Undersized:</p>
                      <ul className="text-xs text-white/70 space-y-0.5">
                        <li>• Voltage/frequency drop on load</li>
                        <li>• Motors fail to start</li>
                        <li>• Overheating and shutdown</li>
                        <li>• Reduced engine life</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <p className="text-amber-400 font-medium text-xs mb-1">If Oversized:</p>
                      <ul className="text-xs text-white/70 space-y-0.5">
                        <li>• Higher capital cost</li>
                        <li>• Wet stacking (diesel)</li>
                        <li>• Inefficient fuel use</li>
                        <li>• Carbon build-up</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Running load calculation</p>
                    <p className="text-white/80 text-xs">
                      Total kW × Diversity = {(result.totalRunningKW / parseFloat(diversity)).toFixed(1)} × {diversity} = {result.totalRunningKW.toFixed(1)} kW
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Motor starting allowance</p>
                    <p className="text-white/80 text-xs">
                      {startingMethod === "sequence"
                        ? "Largest motor starting kVA added to running load"
                        : "All motor starting kVA added (worst case)"}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <p className="text-white/60 mb-1">Sizing with margin</p>
                    <p className="text-white/80 text-xs">
                      Required kVA × 1.2 margin = {result.recommendedKVA.toFixed(1)} kVA → {result.nearestStandardKVA} kVA standard
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-blue-400 font-medium text-xs mb-1">Derating Factors:</p>
                    <ul className="text-xs text-white/70 space-y-0.5">
                      <li>• <strong>Altitude:</strong> Derate 3.5% per 300m above 1000m</li>
                      <li>• <strong>Temperature:</strong> Derate 2% per 5°C above 40°C</li>
                      <li>• <strong>Target loading:</strong> 70-80% for optimal efficiency</li>
                    </ul>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Reference */}
      <Collapsible open={showReference} onOpenChange={setShowReference}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">Generator Guidance</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/70 transition-transform duration-200",
              showReference && "rotate-180"
            )} />
          </CollapsibleTrigger>

          <CollapsibleContent className="p-4 pt-0">
            <div className="space-y-3 text-sm text-amber-200/80">
              <p><strong className="text-amber-300">Motor Starting Multipliers:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• DOL (Direct On-Line): 6-8× full load current</li>
                <li>• Star-Delta: 2-3× full load current</li>
                <li>• Soft Starter: 2-4× full load current</li>
                <li>• VFD: 1.1-1.5× full load current</li>
              </ul>
              <p><strong className="text-amber-300">BS 7671 Requirements:</strong></p>
              <ul className="space-y-1 ml-4">
                <li>• Section 551: Low voltage generating sets</li>
                <li>• Earthing per 551.4 (TN-S recommended)</li>
                <li>• Transfer switch prevents parallel operation</li>
              </ul>
              <p className="text-xs text-white/80 pt-2 border-t border-white/10">
                Always consult manufacturer specifications for exact derating and starting capabilities. Consider noise regulations for installation location.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default GeneratorSizingCalculator;
