import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, ChevronDown, AlertTriangle, Shield } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  calculateArcFlash,
  getEquipmentDefaults,
  EQUIPMENT_TYPE_LABELS,
  ELECTRODE_CONFIG_LABELS,
  type EquipmentType,
  type ElectrodeConfig,
  type EnclosureType,
  type ArcFlashResult,
} from '@/lib/arcflash';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorSection,
  ResultValue,
  ResultsGrid,
  ResultBadge,
  CalculatorFormula,
  CalculatorDivider,
  FormulaReference,
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const CAT = 'protection' as const;
const config = CALCULATOR_CONFIG[CAT];

const voltageOptions = [
  { value: '230', label: '230V - Single phase' },
  { value: '400', label: '400V - 3-phase (new)' },
  { value: '415', label: '415V - 3-phase (legacy)' },
  { value: '690', label: '690V - 3-phase industrial' },
  { value: '1000', label: '1000V - LV maximum' },
  { value: '3300', label: '3.3kV - HV distribution' },
  { value: '6600', label: '6.6kV - HV distribution' },
  { value: '11000', label: '11kV - HV primary' },
];

const equipmentOptions = Object.entries(EQUIPMENT_TYPE_LABELS).map(([key, label]) => ({
  value: key,
  label,
}));

const electrodeOptions = Object.entries(ELECTRODE_CONFIG_LABELS).map(([key, label]) => ({
  value: key,
  label,
}));

const ArcFlashCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [voltage, setVoltage] = useState<string>('415');
  const [faultCurrent, setFaultCurrent] = useState<string>('');
  const [clearingTime, setClearingTime] = useState<string>('');
  const [workingDistance, setWorkingDistance] = useState<string>('450');
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('panelboard');
  const [electrodeConfig, setElectrodeConfig] = useState<ElectrodeConfig>('VCB');
  const [enclosureType, setEnclosureType] = useState<EnclosureType>('box');
  const [conductorGap, setConductorGap] = useState<string>('');
  const [useAutoGap, setUseAutoGap] = useState<boolean>(true);
  const [result, setResult] = useState<ArcFlashResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [whatIfDistance, setWhatIfDistance] = useState<number>(450);
  const [whatIfTime, setWhatIfTime] = useState<number>(0.1);
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

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

    if (!V || V <= 0) newErrors.voltage = 'Voltage must be positive';
    if (V < 208 || V > 15000) newErrors.voltage = 'Outside IEEE 1584 range (208-15000V)';
    if (!I || I <= 0) newErrors.faultCurrent = 'Fault current must be positive';
    if (I < 700 || I > 106000) newErrors.faultCurrent = 'Outside typical range (700-106000A)';
    if (!t || t <= 0) newErrors.clearingTime = 'Clearing time must be positive';
    if (t > 2.0) newErrors.clearingTime = '>2s indicates sustained arc risk';
    if (!D || D <= 0) newErrors.workingDistance = 'Working distance must be positive';
    if (D < 200) newErrors.workingDistance = 'Below 200mm not recommended';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = useCallback(() => {
    if (!validateInputs()) return;

    const inputs = {
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: parseFloat(clearingTime),
      workingDistance: parseFloat(workingDistance),
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap),
    };

    const calcResult = calculateArcFlash(inputs);
    setResult(calcResult);
    setWhatIfDistance(parseFloat(workingDistance));
    setWhatIfTime(parseFloat(clearingTime));
  }, [
    voltage,
    faultCurrent,
    clearingTime,
    workingDistance,
    equipmentType,
    electrodeConfig,
    enclosureType,
    useAutoGap,
    conductorGap,
  ]);

  const calculateWhatIf = (newDistance?: number, newTime?: number) => {
    if (!result) return null;
    return calculateArcFlash({
      voltage: parseFloat(voltage),
      boltedFaultCurrent: parseFloat(faultCurrent),
      clearingTime: newTime ?? whatIfTime,
      workingDistance: newDistance ?? whatIfDistance,
      equipmentType,
      electrodeConfig,
      enclosureType,
      conductorGap: useAutoGap ? undefined : parseFloat(conductorGap),
    });
  };

  const handleReset = useCallback(() => {
    setVoltage('415');
    setFaultCurrent('');
    setClearingTime('');
    setWorkingDistance('450');
    setEquipmentType('panelboard');
    setElectrodeConfig('VCB');
    setEnclosureType('box');
    setConductorGap('');
    setUseAutoGap(true);
    setResult(null);
    setErrors({});
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'Arc Flash Energy Calculator',
      `Voltage: ${voltage}V`,
      `Fault Current: ${faultCurrent}A`,
      `Clearing Time: ${clearingTime}s`,
      `Working Distance: ${workingDistance}mm`,
      `Equipment: ${EQUIPMENT_TYPE_LABELS[equipmentType]}`,
      `Electrode Config: ${electrodeConfig}`,
      '',
      `Incident Energy: ${result.incidentEnergy.toFixed(2)} cal/cm² (${result.incidentEnergyJoules.toFixed(1)} J/cm²)`,
      `Arcing Current: ${result.arcingCurrent.toFixed(1)} kA`,
      `Arc Flash Boundary: ${Math.round(result.arcFlashBoundary)}mm`,
      `PPE Category: ${result.ppeCategory}`,
      `Min Arc Rating: ${result.minArcRatingRequired} cal/cm²`,
      `Energy Let-Through (I²t): ${result.energyLetThrough.toLocaleString()} A²s`,
      `BS 7671: ${result.bs7671DisconnectionCheck}`,
      `Method: ${result.calculationMethod}`,
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const canCalculate = faultCurrent && clearingTime && workingDistance;

  return (
    <CalculatorCard
      category={CAT}
      title="Arc Flash Energy Calculator"
      description="Calculate arc flash incident energy and PPE requirements per IEEE 1584-2018"
    >
      {/* System Configuration */}
      <CalculatorSection title="System Configuration">
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
      </CalculatorSection>

      {/* Fault Parameters */}
      <CalculatorSection title="Fault Parameters">
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
      </CalculatorSection>

      {/* Electrode Configuration */}
      <CalculatorSection title="Electrode Configuration">
        <CalculatorSelect
          label="Electrode Configuration"
          value={electrodeConfig}
          onChange={(value) => setElectrodeConfig(value as ElectrodeConfig)}
          options={electrodeOptions}
        />
        <div
          className="p-4 rounded-xl border space-y-3"
          style={{
            borderColor: `${config.gradientFrom}30`,
            background: `${config.gradientFrom}08`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">Conductor Gap</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white">Auto</span>
              <label className="relative inline-flex items-center cursor-pointer touch-manipulation">
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
      </CalculatorSection>

      <CalculatorActions
        category={CAT}
        onCalculate={handleCalculate}
        onReset={handleReset}
        isDisabled={!canCalculate}
        showReset={!!result}
        calculateLabel="Calculate Arc Flash"
      />

      {/* Critical Warning */}
      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-white">
            <strong>Warning:</strong> This calculation is for estimation only. Formal arc flash
            studies must be conducted by qualified engineers.
          </p>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Status + Copy */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <ResultBadge
                status={
                  result.ppeCategory <= 2 ? 'pass' : result.ppeCategory <= 3 ? 'warning' : 'fail'
                }
                label={`PPE Category ${result.ppeCategory}`}
              />
              <ResultBadge
                status={result.isWithinIEEEBounds ? 'info' : 'warning'}
                label={result.calculationMethod}
              />
            </div>
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
            <p className="text-sm font-medium text-white mb-1">Incident Energy</p>
            <p
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
              }}
            >
              {result.incidentEnergy.toFixed(2)} cal/cm²
            </p>
            <p className="text-sm text-white mt-2">
              {result.incidentEnergyJoules.toFixed(1)} J/cm² | Min Rating:{' '}
              {result.minArcRatingRequired} cal/cm²
            </p>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
              {result.warnings.map((warning, i) => (
                <p key={i} className="text-xs text-white flex items-start gap-2">
                  <AlertTriangle className="h-3 w-3 mt-0.5 shrink-0 text-amber-400" />
                  {warning}
                </p>
              ))}
            </div>
          )}

          <CalculatorDivider category={CAT} />

          {/* Key Metrics */}
          <ResultsGrid columns={2}>
            <ResultValue
              category={CAT}
              label="Arc Flash Boundary"
              value={`${Math.round(result.arcFlashBoundary)}`}
              unit="mm"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Arcing Current"
              value={result.arcingCurrent.toFixed(1)}
              unit="kA"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Energy Let-Through (I²t)"
              value={result.energyLetThrough.toLocaleString()}
              unit="A²s"
              size="sm"
            />
            <ResultValue
              category={CAT}
              label="Arc Duration"
              value={`${(result.arcDuration * 1000).toFixed(0)}`}
              unit="ms"
              size="sm"
            />
          </ResultsGrid>

          {/* BS 7671 Disconnection Check */}
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium text-white mb-1">BS 7671 Disconnection Time</p>
            <p className="text-sm text-white">{result.bs7671DisconnectionCheck}</p>
          </div>

          {/* Boundary Distance Table */}
          <CalculatorSection title="Energy at Distance">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2 text-xs font-medium text-white border-b border-white/10 pb-1.5">
                <span>Distance</span>
                <span className="text-right">Incident Energy</span>
              </div>
              {result.boundaryTable.map((row) => (
                <div
                  key={row.distance}
                  className={cn(
                    'grid grid-cols-2 gap-2 text-sm text-white',
                    row.distance === parseFloat(workingDistance) && 'font-bold'
                  )}
                >
                  <span>{row.distance}mm</span>
                  <span className="text-right">{row.energy} cal/cm²</span>
                </div>
              ))}
            </div>
          </CalculatorSection>

          {/* PPE Requirements */}
          <CalculatorSection title="PPE Requirements">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4" style={{ color: config.gradientFrom }} />
              <span className="font-medium text-white text-sm">
                Category {result.ppeCategory} ({result.minArcRatingRequired} cal/cm² minimum)
              </span>
            </div>
            {result.isUnrealistic ? (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                <p className="text-sm text-white mb-2">
                  <strong>Energy level exceeds safe PPE limits</strong>
                </p>
                <p className="text-xs text-white">
                  Consider: De-energisation, Remote operation, Engineering controls
                </p>
              </div>
            ) : (
              <ul className="space-y-1">
                {result.ppeRecommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-white">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ backgroundColor: config.gradientFrom }}
                    />
                    {rec}
                  </li>
                ))}
              </ul>
            )}
          </CalculatorSection>

          <CalculatorDivider category={CAT} />

          {/* What-if Analysis */}
          <Collapsible open={showWhatIf} onOpenChange={setShowWhatIf}>
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
              <span>What-if Analysis</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  showWhatIf && 'rotate-180'
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div
                className="rounded-xl border p-3 space-y-4"
                style={{
                  borderColor: `${config.gradientFrom}15`,
                  background: `${config.gradientFrom}05`,
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">Working Distance:</span>
                    <span className="font-mono text-white">{whatIfDistance}mm</span>
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
                    <span className="text-white">Clearing Time:</span>
                    <span className="font-mono text-white">{whatIfTime.toFixed(2)}s</span>
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
                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-xs text-white mb-1">What-if Energy</p>
                      <p
                        className="text-xl font-bold bg-clip-text text-transparent"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                        }}
                      >
                        {whatIfResult.incidentEnergy.toFixed(2)} cal/cm²
                      </p>
                      <p className="text-xs text-white">PPE Category {whatIfResult.ppeCategory}</p>
                    </div>
                  ) : null;
                })()}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Calculation Steps */}
          <CalculatorFormula
            category={CAT}
            title="How It Worked Out"
            defaultOpen
            steps={[
              {
                label: 'Arcing current from bolted fault',
                formula: `log(I_arc) = k1 + k2 × log(${faultCurrent}) + k3 × log(gap)`,
                value: `${result.arcingCurrent.toFixed(1)} kA`,
                description:
                  'An arc has lower current than a bolted fault because the arc itself has impedance. The arcing current depends on voltage, bolted fault current, conductor gap, and electrode configuration.',
              },
              {
                label: 'Normalised energy at 610mm, 0.2s',
                formula: `log(En) = k1 + k2 + 1.081 × log(${result.arcingCurrent.toFixed(1)}) + 0.0011 × ${voltage}`,
                description:
                  'IEEE 1584-2018 first calculates the energy at a standard reference distance (610mm) and time (0.2s), then scales from there. The coefficients k1 and k2 depend on equipment type.',
              },
              {
                label: 'Scale for distance and time',
                formula: `E = Cf × En × (${clearingTime}/0.2) × (610/${workingDistance})²`,
                value: `${result.incidentEnergy.toFixed(2)} cal/cm²`,
                description:
                  'Energy scales linearly with clearing time — halving the clearing time halves the energy. It falls off with the square of distance, so stepping back significantly reduces exposure.',
              },
              {
                label: 'Energy let-through',
                formula: `I²t = (${result.arcingCurrent.toFixed(1)} × 1000)² × ${clearingTime}`,
                value: `${result.energyLetThrough.toLocaleString()} A²s`,
                description:
                  'I²t (energy let-through) represents the total thermal energy the arc delivers. It determines the damage to cables, busbars, and equipment — and is used for selectivity coordination.',
              },
              {
                label: 'Arc flash boundary (at 1.2 cal/cm²)',
                formula: `D_afb = 610 × √(Cf × 4.184 × En × (t/0.2) / 1.2)`,
                value: `${Math.round(result.arcFlashBoundary)}mm`,
                description:
                  'The arc flash boundary is the distance where incident energy drops to 1.2 cal/cm² — the threshold for second-degree burns. Anyone inside this boundary must wear appropriate PPE.',
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
                  <p className="text-sm text-white font-medium">Arc Flash Hazard</p>
                  <p className="text-sm text-white">
                    An arc flash is an explosive release of energy caused by an electrical fault
                    through air. Temperatures can exceed 20,000°C — hotter than the surface of the
                    sun. The blast produces intense heat, blinding light, a pressure wave, and
                    molten metal spray.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">
                    PPE Categories (NFPA 70E / IEEE 1584)
                  </p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Category 1 (4 cal/cm²): Single-layer FR clothing, safety glasses, leather
                      gloves
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Category 2 (8 cal/cm²): Double-layer FR clothing, face shield, hard hat,
                      leather gloves
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Category 3 (25 cal/cm²): FR coverall + FR shirt/trousers, arc-rated face
                      shield, balaclava
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Category 4 (40 cal/cm²): Full arc flash suit, arc-rated hood with lens, rubber
                      insulating gloves
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white font-medium">Reducing Arc Flash Risk</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Faster protection: Faster-acting devices (current-limiting MCCBs, fuses)
                      dramatically reduce energy
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Increase distance: Working further from the source reduces exposure by the
                      square of distance
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      De-energise: The safest approach is always to work dead — arc flash risk is
                      zero when isolated
                    </li>
                    <li className="flex items-start gap-2 text-sm text-white">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: config.gradientFrom }}
                      />
                      Arc flash relays: Detect light from an arc and trip the upstream device in
                      under 5ms
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Formula reference */}
      <FormulaReference
        category={CAT}
        name="IEEE 1584-2018 Incident Energy"
        formula="E = Cf × En × (t/0.2) × (610/D)^x"
        variables={[
          { symbol: 'E', description: 'Incident energy (cal/cm²)' },
          { symbol: 'Cf', description: 'Configuration correction factor' },
          { symbol: 'En', description: 'Normalised energy at 610mm, 0.2s' },
          { symbol: 't', description: 'Arc clearing time (s)' },
          { symbol: 'D', description: 'Working distance (mm)' },
          { symbol: 'x', description: 'Distance exponent (typically 2.0)' },
        ]}
      />
    </CalculatorCard>
  );
};

export default ArcFlashCalculator;
