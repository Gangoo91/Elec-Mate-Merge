import { useState, useCallback } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import {
  Car,
  Copy,
  Check,
  Info,
  AlertTriangle,
  ChevronDown,
  Zap,
  Plus,
  Trash2,
} from 'lucide-react';
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
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { evseLoadContent } from './content/evse-load';
import {
  calculateEVSELoad,
  type ChargingPoint,
  type CalculationInputs,
  type CalculationResult,
} from '@/lib/evse-calculations';
import {
  CHARGER_TYPES,
  EARTHING_SYSTEMS,
  DIVERSITY_FACTORS,
  CA_OPTIONS,
  CI_OPTIONS,
  CG_OPTIONS,
  LOAD_CURTAILMENT_NOTE,
  RDC_DD,
} from '@/lib/ev-constants';

const CAT = 'ev-storage' as const;
const config = CALCULATOR_CONFIG[CAT];

/**
 * 🔴 The supply voltage was a free-text field defaulting to 415 V. BS 7671
 * nominal low voltages are 230 V AC single-phase and 400 V AC three-phase
 * (see Reg 722.312.2.1 context, Section 730/717 supply clauses and the
 * Table 41.5 header "for Uo of 230 V"). 240/415 V is the pre-harmonisation
 * pair, withdrawn from the Regulations — it survives only in legacy product
 * standard titles. Making this a two-option select also removes the ambiguity
 * that let a single-phase job be costed against a three-phase headroom.
 */
const SUPPLY_OPTIONS = [
  { value: '230', label: '230 V single-phase' },
  { value: '400', label: '400 V three-phase' },
];

const EVSELoadCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const [chargingPoints, setChargingPoints] = useState<ChargingPoint[]>([]);
  const [quantityInputs, setQuantityInputs] = useState<string[]>([]);
  const [supplyVoltage, setSupplyVoltage] = useState('400');
  const [earthingSystem, setEarthingSystem] = useState('tn-c-s');
  const [availableCapacity, setAvailableCapacity] = useState('100');
  const [cableLength, setCableLength] = useState('50');
  // Defaulted to 'single' (1.0). It used to default to 'domestic_multiple',
  // which silently knocked 20% off the load of a SINGLE charge point. BS 7671
  // publishes no EV diversity table, so nothing is reduced unless asked for.
  const [diversityScenario, setDiversityScenario] = useState('single');
  const [powerFactor, setPowerFactor] = useState('0.95');
  const [ambientTemp, setAmbientTemp] = useState('30');
  const [insulationLengthMm, setInsulationLengthMm] = useState('0');
  const [groupedCircuits, setGroupedCircuits] = useState('1');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showRegs, setShowRegs] = useState(false);

  const chargerOptions = Object.entries(CHARGER_TYPES).map(([key, charger]) => ({
    value: key,
    label: charger.label,
  }));

  const earthingOptions = Object.entries(EARTHING_SYSTEMS).map(([key, system]) => ({
    value: key,
    label: system.label,
  }));

  const diversityOptions = Object.entries(DIVERSITY_FACTORS).map(([key, factor]) => ({
    value: key,
    label: `${factor.label} (${(factor.value * 100).toFixed(0)}%)`,
  }));

  // Ca / Ci / Cg now come from src/lib/calculators/bs7671-data/ via ev-constants.
  // The old inline copies were truncated (Ca stopped at 50 °C, Cg at 6 circuits)
  // and the Ci list offered a 0.75 "touching one side" factor that BS 7671 does
  // not publish — see the block comment in ev-constants.ts.
  const ambientTempOptions = CA_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
  const insulationOptions = CI_OPTIONS.map((o) => ({ value: o.value, label: o.label }));
  const groupingOptions = CG_OPTIONS.map((o) => ({ value: o.value, label: o.label }));

  const diversityEntry =
    DIVERSITY_FACTORS[diversityScenario as keyof typeof DIVERSITY_FACTORS] ??
    DIVERSITY_FACTORS.single;

  const addChargingPoint = () => {
    const newPoint: ChargingPoint = { chargerType: '7kw-ac', quantity: 1 };
    setChargingPoints([...chargingPoints, newPoint]);
    setQuantityInputs([...quantityInputs, '1']);
  };

  const removeChargingPoint = (index: number) => {
    setChargingPoints(chargingPoints.filter((_, i) => i !== index));
    setQuantityInputs(quantityInputs.filter((_, i) => i !== index));
  };

  const updateChargingPoint = (
    index: number,
    field: keyof ChargingPoint,
    value: string | number
  ) => {
    const updatedPoints = [...chargingPoints];
    updatedPoints[index] = { ...updatedPoints[index], [field]: value };
    setChargingPoints(updatedPoints);
  };

  const handleCalculate = useCallback(() => {
    if (chargingPoints.length === 0) {
      toast({
        title: 'No Charging Points',
        description: 'Add at least one charging point.',
        variant: 'destructive',
      });
      return;
    }

    const inputs: CalculationInputs = {
      chargingPoints,
      supplyVoltage: parseFloat(supplyVoltage),
      supplyPhases: supplyVoltage === '230' ? 1 : 3,
      earthingSystem,
      availableCapacity: parseFloat(availableCapacity),
      cableLength: parseFloat(cableLength),
      diversityScenario,
      powerFactor: parseFloat(powerFactor),
      ambientTemp: parseInt(ambientTemp),
      thermalInsulationLengthMm: parseInt(insulationLengthMm),
      groupedCircuits: parseInt(groupedCircuits),
    };

    try {
      const calculations = calculateEVSELoad(inputs);
      setResult(calculations);
    } catch (error) {
      toast({
        title: 'Calculation Error',
        description: error instanceof Error ? error.message : 'An error occurred.',
        variant: 'destructive',
      });
    }
  }, [
    chargingPoints,
    supplyVoltage,
    earthingSystem,
    availableCapacity,
    cableLength,
    diversityScenario,
    powerFactor,
    ambientTemp,
    insulationLengthMm,
    groupedCircuits,
    toast,
  ]);

  const handleReset = useCallback(() => {
    setChargingPoints([]);
    setQuantityInputs([]);
    setSupplyVoltage('400');
    setEarthingSystem('tn-c-s');
    setAvailableCapacity('100');
    setCableLength('50');
    setDiversityScenario('single');
    setPowerFactor('0.95');
    setAmbientTemp('30');
    setInsulationLengthMm('0');
    setGroupedCircuits('1');
    setResult(null);
  }, []);

  const handleCopy = () => {
    if (!result) return;
    const text = [
      'EVSE Load Analysis',
      `Total Points: ${getTotalPoints()}`,
      `Nominal Load: ${result.totalNominalPower.toFixed(0)} kW`,
      `Diversified Load: ${result.totalDiversifiedLoad.toFixed(1)} kW`,
      `Design Current (Ib): ${result.designCurrent.toFixed(0)}A`,
      `Device Rating (In): ${result.protectiveDeviceRating ?? 'TBD'}A`,
      `Cable: ${result.selectedCable ?? 'TBD'}`,
      `Voltage Drop: ${result.voltageDropPercent.toFixed(1)}%`,
      `Protection: ${result.selectedProtection ?? 'TBD'}`,
      `Headroom: ${result.headroom.toFixed(0)}A`,
    ].join('\n');
    copyToClipboard(text);
    setCopied(true);
    toast({ title: 'Copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const getTotalPoints = () => chargingPoints.reduce((sum, cp) => sum + cp.quantity, 0);

  // earthFaultLoop is tri-state: null means "could not be assessed from these
  // inputs" (e.g. TT, where Ra must be measured), which must not read as a fail
  // and must not read as a pass either — it simply is not a failure.
  const allCompliant = result
    ? result.compliance.voltageDrop &&
      result.compliance.earthFaultLoop !== false &&
      result.compliance.rcdProtection &&
      result.compliance.overloadCoordination
    : false;

  return (
    <CalculatorCard
      category={CAT}
      title="EVSE Load Calculator"
      description="Calculate electrical load and infrastructure requirements"
      badge="BS 7671"
    >
      <CalculatorPanes
        form={
          <>
            {/* Charging Points Section */}
            <CalculatorSection title="Charging Points">
              <button
                onClick={addChargingPoint}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-elec-yellow/60 hover:bg-white/[0.06] transition-colors flex items-center justify-center gap-2 touch-manipulation min-h-[44px]"
              >
                <Plus className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Add Charging Point</span>
              </button>

              {chargingPoints.length > 0 && (
                <div className="space-y-2">
                  {chargingPoints.map((point, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Point {index + 1}</span>
                        <button
                          onClick={() => removeChargingPoint(index)}
                          className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                      <CalculatorInputGrid columns={2}>
                        <CalculatorSelect
                          label="Charger Type"
                          value={point.chargerType}
                          onChange={(value) => updateChargingPoint(index, 'chargerType', value)}
                          options={chargerOptions}
                        />
                        <CalculatorInput
                          label="Quantity"
                          type="text"
                          inputMode="numeric"
                          value={quantityInputs[index] ?? ''}
                          onChange={(value) => {
                            if (value === '' || /^[0-9]+$/.test(value)) {
                              const updatedInputs = [...quantityInputs];
                              updatedInputs[index] = value;
                              setQuantityInputs(updatedInputs);
                              if (value !== '' && parseInt(value) > 0) {
                                updateChargingPoint(index, 'quantity', parseInt(value));
                              }
                            }
                          }}
                          placeholder="1"
                        />
                      </CalculatorInputGrid>
                    </div>
                  ))}
                </div>
              )}

              {chargingPoints.length === 0 && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                  <Car className="h-8 w-8 mx-auto mb-2 text-white" />
                  <p className="text-sm text-white">
                    Add charging points to calculate EVSE load requirements
                  </p>
                </div>
              )}
            </CalculatorSection>

            {/* Supply & Installation */}
            <CalculatorSection title="Supply & Installation">
              <CalculatorInputGrid columns={2}>
                <CalculatorSelect
                  label="Supply"
                  value={supplyVoltage}
                  onChange={setSupplyVoltage}
                  options={SUPPLY_OPTIONS}
                />
                <CalculatorInput
                  label="Available Capacity"
                  unit="kW"
                  type="text"
                  inputMode="decimal"
                  value={availableCapacity}
                  onChange={setAvailableCapacity}
                  placeholder="100"
                />
                <CalculatorSelect
                  label="Earthing System"
                  value={earthingSystem}
                  onChange={setEarthingSystem}
                  options={earthingOptions}
                />
                <CalculatorSelect
                  label="Diversity Scenario"
                  value={diversityScenario}
                  onChange={setDiversityScenario}
                  options={diversityOptions}
                />
                <CalculatorInput
                  label="Cable Length"
                  unit="m"
                  type="text"
                  inputMode="decimal"
                  value={cableLength}
                  onChange={setCableLength}
                  placeholder="50"
                />
                <CalculatorInput
                  label="Power Factor"
                  type="text"
                  inputMode="decimal"
                  value={powerFactor}
                  onChange={setPowerFactor}
                  placeholder="0.95"
                />
              </CalculatorInputGrid>
            </CalculatorSection>

            {/* Cable Derating Factors — BS 7671 Appendix 4 (Tables 4B1, 4C1, s2.6) */}
            <CalculatorSection title="Cable Derating (BS 7671 Appendix 4)">
              <CalculatorInputGrid columns={3}>
                <CalculatorSelect
                  label="Ambient Temp (Ca)"
                  value={ambientTemp}
                  onChange={setAmbientTemp}
                  options={ambientTempOptions}
                />
                <CalculatorSelect
                  label="Insulation (Ci)"
                  value={insulationLengthMm}
                  onChange={setInsulationLengthMm}
                  options={insulationOptions}
                />
                <CalculatorSelect
                  label="Grouping (Cg)"
                  value={groupedCircuits}
                  onChange={setGroupedCircuits}
                  options={groupingOptions}
                />
              </CalculatorInputGrid>
            </CalculatorSection>

            <CalculatorActions
              category={CAT}
              onCalculate={handleCalculate}
              onReset={handleReset}
              isDisabled={chargingPoints.length === 0}
              calculateLabel="Calculate Load"
              showReset={!!result}
            />
          </>
        }
        result={
          <>
            {/* ── Results ── */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Status + Copy */}
                <div className="flex items-center justify-between">
                  <ResultBadge
                    status={allCompliant ? 'pass' : 'fail'}
                    label={allCompliant ? 'Compliant' : 'Review Required'}
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
                  <ResultHeadline
                    label="Diversified Load"
                    value={`${result.totalDiversifiedLoad.toFixed(1)} kW`}
                  />
                  <ResultValue
                    label="Design Current"
                    value={`${result.designCurrent.toFixed(0)} A`}
                    category={CAT}
                    size="sm"
                  />
                </div>

                <ResultsGrid columns={2}>
                  <ResultValue
                    label="Nominal Load"
                    value={result.totalNominalPower.toFixed(0)}
                    unit="kW"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Voltage Drop"
                    value={result.voltageDropPercent.toFixed(1)}
                    unit="%"
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Cable Size"
                    value={result.selectedCable || 'TBD'}
                    category={CAT}
                    size="sm"
                  />
                  <ResultValue
                    label="Device Rating (In)"
                    value={
                      result.protectiveDeviceRating ? String(result.protectiveDeviceRating) : 'TBD'
                    }
                    unit="A"
                    category={CAT}
                    size="sm"
                  />
                </ResultsGrid>

                {/* Protection — full text, Reg 722.531.3.101 */}
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm font-medium text-white mb-1">Protection</p>
                  <p className="text-sm text-white">{result.selectedProtection}</p>
                </div>

                {/* Earth fault loop impedance — BS 7671 Tables 41.3 / 41.5 */}
                <div className="p-3 rounded-lg bg-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white">Earth Fault Loop (Zs)</span>
                    <span className="text-sm text-white">
                      {result.estimatedZs !== null && result.maxZs !== null
                        ? `${result.estimatedZs.toFixed(2)} Ω / max ${result.maxZs} Ω`
                        : 'Not assessed'}
                    </span>
                  </div>
                  <p className="text-xs text-white">{result.zsBasis}</p>
                </div>

                {/* Diversity — Reg 722.311.201 */}
                {result.diversityRequiresCurtailment && (
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">Diversity Applied</p>
                        <p className="text-xs text-white">{LOAD_CURTAILMENT_NOTE}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Headroom */}
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white">Headroom Available</span>
                    <span
                      className={cn(
                        'text-lg font-bold',
                        result.headroom > 10
                          ? 'text-green-400'
                          : result.headroom > 0
                            ? 'text-amber-400'
                            : 'text-red-400'
                      )}
                    >
                      {result.headroom.toFixed(0)}A
                    </span>
                  </div>
                </div>

                {/* Cable derating summary */}
                {result.deratingFactors.combined < 1.0 && (
                  <div className="p-3 rounded-lg bg-white/5 space-y-1.5">
                    <p className="text-sm font-medium text-white">Cable Derating Applied</p>
                    <div className="grid grid-cols-4 gap-2 text-xs text-white">
                      <div>
                        <p className="font-medium">Ca</p>
                        <p>{result.deratingFactors.ca.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Ci</p>
                        <p>{result.deratingFactors.ci.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Cg</p>
                        <p>{result.deratingFactors.cg.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="font-medium">Combined</p>
                        <p>{result.deratingFactors.combined.toFixed(2)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white">
                      Derated capacity: {result.deratedCapacity.toFixed(0)}A (tabulated:{' '}
                      {result.cableCapacity}A)
                    </p>
                  </div>
                )}

                {/* PME/PEN warning */}
                {result.pmeWarning && (
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-white">PME Supply Detected</p>
                        <p className="text-xs text-white">
                          Reg 722.411.4.1 — Outdoor EV charge points on TN-C-S (PME) supplies
                          require additional earth electrode or PEN fault detection device. Consult
                          DNO and ensure protective earthing arrangements are adequate.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* DNO guidance */}
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">DNO Notification</span>
                    <span className="text-sm text-white">{result.dnoGuidance}</span>
                  </div>
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.14]">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-white" />
                      <p className="text-sm font-medium text-elec-yellow">Recommendations</p>
                    </div>
                    <ul className="space-y-1 text-sm text-white">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Low Headroom Warning */}
                {result.headroom < 10 && (
                  <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-white">
                        <strong>Low Headroom:</strong> Consider future expansion and load growth
                        requirements.
                      </p>
                    </div>
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
                      label: 'Nominal power',
                      formula: `P_total = Σ (charger power × quantity)`,
                      value: `${result.totalNominalPower.toFixed(0)} kW`,
                    },
                    {
                      label: 'Diversified load',
                      formula: `P_div = ${result.totalNominalPower.toFixed(0)} kW × ${diversityEntry.value}`,
                      value: `${result.totalDiversifiedLoad.toFixed(1)} kW`,
                      description: diversityEntry.description,
                    },
                    {
                      label: 'Design current (Ib)',
                      formula: `I = P / (Uo × PF) single-phase (Uo = 230 V), I = P / (√3 × U × PF) three-phase (U = 400 V) — per point, then apply diversity`,
                      value: `${result.designCurrent.toFixed(0)}A`,
                    },
                    {
                      label: 'Device coordination',
                      formula: `Reg 433.1.1: Ib ≤ In ≤ Iz — ${result.designCurrent.toFixed(1)}A ≤ ${result.protectiveDeviceRating ?? '?'}A ≤ ${result.deratedCapacity.toFixed(1)}A`,
                      value: result.compliance.overloadCoordination ? 'Satisfied' : 'Not satisfied',
                      description:
                        'Reg 433.1.201 — for a BS EN 60898 circuit-breaker or BS EN 61009-1 RCBO, meeting (a) and (b) also meets (c) I2 ≤ 1.45 Iz',
                    },
                    {
                      label: 'Voltage drop',
                      formula: `ΔV% = (I × z × L) / (${supplyVoltage} × 1000) × 100`,
                      value: `${result.voltageDropPercent.toFixed(1)}%`,
                      description: result.compliance.voltageDrop
                        ? 'Within 5% limit — indicative only, see note below'
                        : 'Exceeds 5% limit — upgrade cable',
                    },
                    {
                      label: 'Supply headroom',
                      formula:
                        supplyVoltage === '230'
                          ? `I_avail = (${availableCapacity} × 1000) / (230 × PF), then − Ib`
                          : `I_avail = (${availableCapacity} × 1000) / (√3 × 400 × PF), then − Ib`,
                      value: `${result.headroom.toFixed(0)}A`,
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
                      className="p-3 rounded-xl border space-y-3"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Design Current</p>
                        <p className="text-sm text-white">
                          Determines cable sizing and protection device rating.{' '}
                          {result.designCurrent > 100
                            ? 'High current — consider 3-phase supply.'
                            : 'Standard residential/commercial load.'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Voltage Drop</p>
                        <p className="text-sm text-white">
                          Must stay below 5% — Reg 525.202, Appendix 4 Section 6.4, Table 4Ab (3%
                          for lighting, 5% for other uses on a public LV supply).{' '}
                          {result.voltageDropPercent > 5
                            ? 'EXCESSIVE — increase cable size or reduce run length.'
                            : 'Within acceptable limits.'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-white font-medium">Diversity Factor</p>
                        <p className="text-sm text-white">{LOAD_CURTAILMENT_NOTE}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* BS 7671 Requirements */}
                <Collapsible open={showRegs} onOpenChange={setShowRegs}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full min-h-11 py-2.5 px-3 rounded-lg text-sm font-medium text-white hover:bg-white/5 transition-all touch-manipulation">
                    <span>BS 7671 Requirements</span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        showRegs && 'rotate-180'
                      )}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    <div
                      className="p-3 rounded-xl border space-y-2"
                      style={{
                        borderColor: `${config.gradientFrom}15`,
                        background: `${config.gradientFrom}05`,
                      }}
                    >
                      <div className="space-y-2 text-sm text-white">
                        <p>
                          <strong>Section 722:</strong> EV charging installations — RCD protection
                          mandatory (30 mA, Type A minimum)
                        </p>
                        <p>
                          <strong>Reg 433.1.1:</strong> Ib ≤ In ≤ Iz, with I2 ≤ 1.45 Iz. Reg
                          433.1.201 — for a BS EN 60898 circuit-breaker or BS EN 61009-1 RCBO,
                          satisfying (a) and (b) also satisfies (c).
                        </p>
                        <p>
                          <strong>Reg 722.311.201:</strong> load curtailment may be taken into
                          account when determining maximum demand. BS 7671 publishes no EV diversity
                          table.
                        </p>
                        <p>
                          <strong>Earthing:</strong>{' '}
                          {
                            EARTHING_SYSTEMS[earthingSystem as keyof typeof EARTHING_SYSTEMS]
                              ?.description
                          }
                        </p>
                        {result.dcFaultProtectionRequired && (
                          <p>
                            {/* 🔴 This block used to fire only for DC rapid chargers. RDC-DD to
                            BS IEC 62955 is specified for MODE 3 — AC — charging. */}
                            <strong>DC fault protection ({RDC_DD.regulation}):</strong>{' '}
                            {RDC_DD.note} Applies to {RDC_DD.appliesTo}.
                          </p>
                        )}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}

            {/* Info note */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.12]">
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-white mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  <strong>Professional design required.</strong> Voltage drop and Zs here are
                  indicative: the conductor figures are loop resistance at 20 °C, not the Appendix 4
                  tabulated mV/A/m at operating temperature, and the Zs estimate assumes a cpc of
                  the same size as the line conductor. Confirm against Appendix 4 and by
                  measurement, and verify the supply with the distributor for commercial
                  installations.
                </p>
              </div>
            </div>

            {/* Formula reference (always visible) */}
            <FormulaReference
              category={CAT}
              name="EVSE Load Formulas"
              formula="I = P / (Uo × PF) 1-ph  ·  I = P / (√3 × U × PF) 3-ph"
              variables={[
                { symbol: 'I', description: 'Design current Ib (A)' },
                { symbol: 'P', description: 'Diversified power (W)' },
                { symbol: 'Uo', description: 'Nominal line-to-earth voltage, 230 V' },
                { symbol: 'U', description: 'Nominal line voltage, 400 V three-phase' },
                { symbol: 'PF', description: 'Power factor' },
              ]}
            />
          </>
        }
        footer={<CalculatorEditorial content={evseLoadContent} category={CAT} />}
      />
    </CalculatorCard>
  );
};

export default EVSELoadCalculator;
