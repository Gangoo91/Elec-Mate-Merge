import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { AlertTriangle, Calculator, Shield, Info, Lightbulb, HelpCircle, BookOpen, ChevronDown, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  calculateArcFlash,
  getEquipmentDefaults,
  EQUIPMENT_TYPE_LABELS,
  ELECTRODE_CONFIG_LABELS,
  type EquipmentType,
  type ElectrodeConfig,
  type EnclosureType,
  type ArcFlashResult
} from "@/lib/arcflash";
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultsGrid,
  CALCULATOR_CONFIG,
} from "@/components/calculators/shared";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const voltageOptions = [
  { value: "230", label: "230V - Single phase" },
  { value: "400", label: "400V - 3-phase (new)" },
  { value: "415", label: "415V - 3-phase (legacy)" },
  { value: "690", label: "690V - 3-phase industrial" },
  { value: "1000", label: "1000V - LV maximum" },
  { value: "3300", label: "3.3kV - HV distribution" },
  { value: "6600", label: "6.6kV - HV distribution" },
  { value: "11000", label: "11kV - HV primary" }
];

const equipmentOptions = Object.entries(EQUIPMENT_TYPE_LABELS).map(([key, label]) => ({
  value: key,
  label
}));

const electrodeOptions = Object.entries(ELECTRODE_CONFIG_LABELS).map(([key, label]) => ({
  value: key,
  label
}));

const ArcFlashCalculator = () => {
  const config = CALCULATOR_CONFIG['protection'];

  const [voltage, setVoltage] = useState<string>("415");
  const [faultCurrent, setFaultCurrent] = useState<string>("");
  const [clearingTime, setClearingTime] = useState<string>("");
  const [workingDistance, setWorkingDistance] = useState<string>("450");
  const [equipmentType, setEquipmentType] = useState<EquipmentType>("panelboard");
  const [electrodeConfig, setElectrodeConfig] = useState<ElectrodeConfig>("VCB");
  const [enclosureType, setEnclosureType] = useState<EnclosureType>("box");
  const [conductorGap, setConductorGap] = useState<string>("");
  const [useAutoGap, setUseAutoGap] = useState<boolean>(true);
  const [result, setResult] = useState<ArcFlashResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatIfDistance, setWhatIfDistance] = useState<number>(450);
  const [whatIfTime, setWhatIfTime] = useState<number>(0.1);

  // Collapsible states
  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);
  const [showWhatIf, setShowWhatIf] = useState(false);

  useEffect(() => {
    const defaults = getEquipmentDefaults(equipmentType);
    setWorkingDistance(defaults.workingDistance.toString());
    setEnclosureType(defaults.enclosureType);
    setElectrodeConfig(defaults.defaultConfig);
  }, [equipmentType]);

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    const V = parseFloat(voltage);
    const I = parseFloat(faultCurrent);
    const t = parseFloat(clearingTime);
    const D = parseFloat(workingDistance);

    if (!V || V <= 0) newErrors.voltage = "Voltage must be positive";
    if (V < 208 || V > 15000) newErrors.voltage = "Outside IEEE 1584 range (208-15000V)";
    if (!I || I <= 0) newErrors.faultCurrent = "Fault current must be positive";
    if (I < 700 || I > 106000) newErrors.faultCurrent = "Outside typical range (700-106000A)";
    if (!t || t <= 0) newErrors.clearingTime = "Clearing time must be positive";
    if (t > 2.0) newErrors.clearingTime = ">2s indicates sustained arc risk";
    if (!D || D <= 0) newErrors.workingDistance = "Working distance must be positive";
    if (D < 200) newErrors.workingDistance = "Below 200mm not recommended";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const performCalculation = () => {
    if (!validateInputs()) return;

    const inputs = {
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: parseFloat(clearingTime),
      workingDistance: parseFloat(workingDistance),
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap)
    };

    const calcResult = calculateArcFlash(inputs);
    setResult(calcResult);
    setWhatIfDistance(parseFloat(workingDistance));
    setWhatIfTime(parseFloat(clearingTime));
  };

  const calculateWhatIf = (newDistance?: number, newTime?: number) => {
    if (!result) return null;

    const inputs = {
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: newTime ?? whatIfTime,
      workingDistance: newDistance ?? whatIfDistance,
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap)
    };

    return calculateArcFlash(inputs);
  };

  const getMostImpactfulLever = () => {
    if (!result) return "";

    const baseEnergy = result.incidentEnergy;
    const timeReduced = calculateWhatIf(undefined, whatIfTime * 0.5);
    const distanceIncreased = calculateWhatIf(whatIfDistance * 1.5, undefined);

    if (!timeReduced || !distanceIncreased) return "";

    const timeReduction = ((baseEnergy - timeReduced.incidentEnergy) / baseEnergy) * 100;
    const distanceReduction = ((baseEnergy - distanceIncreased.incidentEnergy) / baseEnergy) * 100;

    return timeReduction > distanceReduction
      ? `Reducing clearing time by 50% would decrease energy by ${timeReduction.toFixed(0)}%`
      : `Increasing working distance by 50% would decrease energy by ${distanceReduction.toFixed(0)}%`;
  };

  const reset = () => {
    setVoltage("415");
    setFaultCurrent("");
    setClearingTime("");
    setWorkingDistance("450");
    setEquipmentType("panelboard");
    setElectrodeConfig("VCB");
    setEnclosureType("box");
    setConductorGap("");
    setUseAutoGap(true);
    setResult(null);
    setErrors({});
  };

  const canCalculate = faultCurrent && clearingTime && workingDistance;

  return (
    <div className="space-y-4">
      <CalculatorCard
        category="protection"
        title="Arc Flash Energy Calculator"
        description="Calculate arc flash incident energy and PPE requirements per IEEE 1584-2018"
      >
        <CalculatorInputGrid columns={2}>
          <CalculatorSelect
            label="System Voltage"
            value={voltage}
            onChange={setVoltage}
            options={voltageOptions}
            error={errors.voltage}
          />
          <CalculatorSelect
            label="Equipment Type"
            value={equipmentType}
            onChange={(value) => setEquipmentType(value as EquipmentType)}
            options={equipmentOptions}
          />
        </CalculatorInputGrid>

        <CalculatorInput
          label="Prospective Fault Current"
          unit="A"
          type="text"
          inputMode="decimal"
          value={faultCurrent}
          onChange={setFaultCurrent}
          placeholder="25000"
          error={errors.faultCurrent}
          hint="Available short-circuit current at work point"
        />

        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Arc Clearing Time"
            unit="s"
            type="text"
            inputMode="decimal"
            value={clearingTime}
            onChange={setClearingTime}
            placeholder="0.1"
            error={errors.clearingTime}
            hint="Time for protective device to clear"
          />
          <CalculatorInput
            label="Working Distance"
            unit="mm"
            type="text"
            inputMode="decimal"
            value={workingDistance}
            onChange={setWorkingDistance}
            placeholder="450"
            error={errors.workingDistance}
            hint="Distance from worker to arc source"
          />
        </CalculatorInputGrid>

        <CalculatorSelect
          label="Electrode Configuration"
          value={electrodeConfig}
          onChange={(value) => setElectrodeConfig(value as ElectrodeConfig)}
          options={electrodeOptions}
        />

        <div
          className="p-4 rounded-xl border space-y-3"
          style={{ borderColor: `${config.gradientFrom}30`, background: `${config.gradientFrom}08` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Conductor Gap</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Auto</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={useAutoGap}
                  onChange={(e) => setUseAutoGap(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>
          </div>

          {!useAutoGap && (
            <CalculatorInput
              label="Conductor Gap"
              unit="mm"
              type="text"
              inputMode="decimal"
              value={conductorGap}
              onChange={setConductorGap}
              placeholder="25"
            />
          )}
        </div>

        <CalculatorActions
          category="protection"
          onCalculate={performCalculation}
          onReset={reset}
          isDisabled={!canCalculate}
          calculateLabel="Calculate Arc Flash"
        />
      </CalculatorCard>

      {/* Critical Warning */}
      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-200">
            <strong>Warning:</strong> This calculation is for estimation only.
            Formal arc flash studies must be conducted by qualified engineers.
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <CalculatorResult category="protection">
            <div className="text-center pb-3 border-b border-white/10">
              <p className="text-sm text-white/60 mb-1">Incident Energy</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})` }}
              >
                {result.incidentEnergy.toFixed(2)}
              </div>
              <p className="text-sm text-white/60">cal/cm² ({result.incidentEnergyJoules.toFixed(1)} J/cm²)</p>
              <Badge
                variant="outline"
                className={cn(
                  "mt-2",
                  result.incidentEnergy <= 8 ? "border-green-500/50 text-green-400" :
                  result.incidentEnergy <= 25 ? "border-yellow-500/50 text-yellow-400" :
                  "border-red-500/50 text-red-400"
                )}
              >
                {result.isUnrealistic ? "Dangerous Energy Level" : `Min Arc Rating: ${result.minArcRatingRequired} cal/cm²`}
              </Badge>
            </div>

            {result.warnings.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                {result.warnings.map((warning, i) => (
                  <p key={i} className="text-xs text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0" />
                    {warning}
                  </p>
                ))}
              </div>
            )}

            <ResultsGrid columns={2}>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Arc Flash Boundary</p>
                <p className="text-xl font-bold text-white font-mono">{Math.round(result.arcFlashBoundary)}mm</p>
                <p className="text-xs text-white/50">({(result.arcFlashBoundary/1000).toFixed(2)}m)</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-white/60 mb-1">Arcing Current</p>
                <p className="text-xl font-bold text-white font-mono">{result.arcingCurrent.toFixed(1)} kA</p>
                <p className="text-xs text-white/50">{result.calculationMethod}</p>
              </div>
            </ResultsGrid>

            {/* PPE Requirements */}
            <div className="pt-3 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
                <span className="font-medium text-white text-sm">PPE Requirements</span>
              </div>
              {result.isUnrealistic ? (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                  <p className="text-sm text-red-300 mb-2">
                    <strong>Energy level exceeds safe PPE limits</strong>
                  </p>
                  <p className="text-xs text-red-200">
                    Consider: De-energisation, Remote operation, Engineering controls
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {result.ppeRecommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: config.gradientFrom }} />
                      {rec}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Most Impactful Change */}
            {getMostImpactfulLever() && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Lightbulb className="h-4 w-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300">Most Impactful Change</span>
                </div>
                <p className="text-xs text-amber-200">{getMostImpactfulLever()}</p>
              </div>
            )}
          </CalculatorResult>

          {/* What-if Analysis */}
          <Collapsible open={showWhatIf} onOpenChange={setShowWhatIf}>
            <div className="calculator-card overflow-hidden" style={{ borderColor: '#a78bfa15' }}>
              <CollapsibleTrigger className="agent-collapsible-trigger w-full">
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-purple-400" />
                  <span className="text-sm sm:text-base font-medium text-purple-300">What-if Analysis</span>
                </div>
                <ChevronDown className={cn(
                  "h-4 w-4 text-white/40 transition-transform duration-200",
                  showWhatIf && "rotate-180"
                )} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Working Distance:</span>
                    <span className="font-mono text-purple-400">{whatIfDistance}mm</span>
                  </div>
                  <Slider
                    value={[whatIfDistance]}
                    onValueChange={(value) => setWhatIfDistance(value[0])}
                    min={200}
                    max={1200}
                    step={50}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Clearing Time:</span>
                    <span className="font-mono text-purple-400">{whatIfTime.toFixed(2)}s</span>
                  </div>
                  <Slider
                    value={[whatIfTime]}
                    onValueChange={(value) => setWhatIfTime(value[0])}
                    min={0.02}
                    max={2.0}
                    step={0.01}
                    className="w-full"
                  />
                </div>

                {(() => {
                  const whatIfResult = calculateWhatIf(whatIfDistance, whatIfTime);
                  return whatIfResult ? (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <p className="text-xs text-white/60 mb-1">What-if Energy</p>
                      <p className="text-xl font-bold text-purple-400 font-mono">
                        {whatIfResult.incidentEnergy.toFixed(2)} cal/cm²
                      </p>
                      <p className="text-xs text-white/50">PPE Category {whatIfResult.ppeCategory}</p>
                    </div>
                  ) : null;
                })()}
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      )}

      {/* Why This Matters */}
      <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#60a5fa15' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <Info className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base font-medium text-blue-300">Why This Matters</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showGuidance && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-blue-200/80">
            <p>• Arc flash assessment required for electrical work on live systems above 50V AC</p>
            <p>• Energy calculations determine minimum PPE requirements</p>
            <p>• Arc flash boundary calculated at 1.2 cal/cm² threshold per UK standards</p>
            <p>• High energy readings (&gt;40 cal/cm²) may indicate calculation errors</p>
            <p>• Consider de-energisation as primary control for high-energy situations</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Regulations */}
      <Collapsible open={showRegs} onOpenChange={setShowRegs}>
        <div className="calculator-card overflow-hidden" style={{ borderColor: '#fbbf2415' }}>
          <CollapsibleTrigger className="agent-collapsible-trigger w-full">
            <div className="flex items-center gap-3">
              <BookOpen className="h-4 w-4 text-amber-400" />
              <span className="text-sm sm:text-base font-medium text-amber-300">Regulations & Standards</span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 text-white/40 transition-transform duration-200",
              showRegs && "rotate-180"
            )} />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2 text-sm text-amber-200/80">
            <p><strong className="text-amber-300">IEEE 1584-2018:</strong> International standard for arc flash calculations</p>
            <p><strong className="text-amber-300">NFPA 70E:</strong> PPE categories and safety requirements</p>
            <p><strong className="text-amber-300">UK EAWR 1989:</strong> Electrical safety regulations</p>
            <p><strong className="text-amber-300">BS 7671 (18th Ed):</strong> UK wiring regulations for fault clearing</p>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Formula Reference */}
      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
          <div className="text-sm text-orange-200">
            <p><strong>IEEE 1584-2018:</strong> E = 4.184 × Cf × En × (t/0.2) × (610^x / D^x)</p>
            <p className="text-xs mt-1">Where E = incident energy (cal/cm²), t = clearing time, D = working distance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcFlashCalculator;
