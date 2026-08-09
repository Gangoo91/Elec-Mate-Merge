import { useState } from 'react';
import { Info, BookOpen, ChevronDown, AlertTriangle, Zap } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import {
  CalculatorCard,
  CalculatorDivider,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CALCULATOR_CONFIG,
  CalculatorPanes,
  ResultHeadline,
} from '@/components/calculators/shared';
import { threePhasePowerContent } from './content/three-phase-power';
// AUDIT FIX (consolidation): this component previously inlined its own protective-device
// ladder. The canonical BS 7671 ratings live in bs7671-data/protectiveDevices.ts and are
// already used by TransformerCalculator / CircuitBreakerSelectorCalculator — import, never copy.
import { standardDeviceRatings } from '@/lib/calculators/bs7671-data/protectiveDevices';

const ROOT3 = Math.sqrt(3);
const KW_PER_HP = 0.746;

/**
 * Smallest standard device rating that satisfies Ib <= In (BS 7671 Reg 433.1.1).
 *
 * AUDIT FIX: the old in-component ladder stopped at 63 A for MCB/RCBO, labelled 80 A and
 * 100 A as "MCCB" (BS EN 60898 MCBs are published up to 125 A), omitted the 13 A and 125 A
 * standard ratings, and above 100 A fell back to `Math.ceil(I / 50) * 50`, which emits
 * 150/300/350/450 A — frame sizes that are not standard ratings — while skipping 125 A and
 * 160 A entirely. Rounding up past the next standard rating over-states the protection the
 * circuit actually has.
 */
const selectProtectiveDevice = (designCurrent: number): string => {
  const mcbRating = standardDeviceRatings.mcb.find((rating) => rating >= designCurrent);
  if (mcbRating !== undefined) {
    return standardDeviceRatings.rcbo.includes(mcbRating)
      ? `${mcbRating}A MCB/RCBO`
      : `${mcbRating}A MCB`;
  }
  const mccbRating = standardDeviceRatings.mccb.find((rating) => rating >= designCurrent);
  if (mccbRating !== undefined) return `${mccbRating}A MCCB`;
  return 'Above standard MCCB ratings — specialist selection required';
};

interface ThreePhaseResult {
  apparentPower: number;
  activePower: number;
  reactivePower: number;
  phaseVoltage: number;
  phaseCurrent: number;
  lineVoltage: number;
  lineCurrent: number;
  phaseAngle: number;
  pfQuality: 'Good' | 'Acceptable' | 'Poor';
  protectiveDevice: string;
  unbalance?: number;
  correctionCapacitor?: number;
  /** Set when a target PF is given but shunt capacitance is not the right correction. */
  correctionNote?: string;
  /** How the line current used for sizing was arrived at. */
  currentSource: 'entered' | 'from-power' | 'from-motor';
  /** Motor electrical INPUT power (kW) — P_mech / efficiency. Motor Sizing mode only. */
  motorInputPower?: number;
  /** True when the selected frequency is not the UK nominal 50 Hz. */
  frequencyMismatch: boolean;
  perPhase: {
    voltage: number;
    current: number;
    power: number;
  };
}

const ThreePhasePowerCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [voltage, setVoltage] = useState<string>('');
  const [current, setCurrent] = useState<string>('');
  const [powerFactor, setPowerFactor] = useState<string>('0.85');
  const [connection, setConnection] = useState<string>('star');
  const [voltageType, setVoltageType] = useState<string>('line-line');
  const [currentType, setCurrentType] = useState<string>('line');
  const [pfType, setPfType] = useState<string>('lagging');
  const [frequency, setFrequency] = useState<string>('50');
  const [mode, setMode] = useState<string>('power');
  const [solveFor, setSolveFor] = useState<string>('power');
  const [activePowerInput, setActivePowerInput] = useState<string>('');
  const [mechanicalPower, setMechanicalPower] = useState<string>('');
  const [mechanicalPowerUnit, setMechanicalPowerUnit] = useState<string>('kW');
  const [efficiency, setEfficiency] = useState<string>('85');
  const [targetPf, setTargetPf] = useState<string>('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentA, setCurrentA] = useState<string>('');
  const [currentB, setCurrentB] = useState<string>('');
  const [currentC, setCurrentC] = useState<string>('');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const [result, setResult] = useState<ThreePhaseResult | null>(null);

  const calculateThreePhasePower = () => {
    const V = parseFloat(voltage);
    const pf = parseFloat(powerFactor);

    if (!Number.isFinite(V) || V <= 0 || !Number.isFinite(pf) || pf <= 0 || pf > 1) return;

    // ---- Voltage: normalise to line-to-line -------------------------------------------
    // AUDIT FIX: the previous code applied the √3 conversion only when the connection was
    // "star", and left VLN untouched for "delta" on the reasoning that "in delta,
    // line-neutral doesn't apply". Star/delta describes how the LOAD is wound; it does not
    // change the supply. On a UK 230/400 V supply (nominal voltage per Reg 512.1.1) the
    // line-to-line voltage is VLN × √3 = 400 V however the load is connected, so entering
    // 230 V line-to-neutral with a delta load produced S = √3 × 230 × IL — every power and
    // sizing figure low by a factor of √3. The conversion now depends on the voltage type
    // only. (The "How It Worked Out" panel already printed VLL = VLN × √3 unconditionally,
    // so it had been contradicting the engine.)
    const VLL = voltageType === 'line-neutral' ? V * ROOT3 : V;

    // ---- Current: derive or normalise to line current ---------------------------------
    let IL: number;
    let currentSource: ThreePhaseResult['currentSource'] = 'entered';
    let motorInputPower: number | undefined;

    if (mode === 'motor') {
      // AUDIT FIX: Motor Sizing mode parsed mechanical power, its unit and the efficiency
      // and then discarded all three — the answer was identical to Power mode. The design
      // current of a motor circuit is the motor's electrical INPUT current, not its shaft
      // rating: P_in = P_mech / η, with 1 HP = 0.746 kW. Selecting equipment on the duty
      // actually demanded is Reg 512.1.4 (Power); the load to be expected is Reg 132.3.
      const mechPower = parseFloat(mechanicalPower);
      const eff = parseFloat(efficiency) / 100;
      if (!Number.isFinite(mechPower) || mechPower <= 0) return;
      if (!Number.isFinite(eff) || eff <= 0 || eff > 1) return;
      const mechKw = mechanicalPowerUnit === 'HP' ? mechPower * KW_PER_HP : mechPower;
      motorInputPower = mechKw / eff;
      IL = (motorInputPower * 1000) / (ROOT3 * VLL * pf);
      currentSource = 'from-motor';
    } else if (solveFor === 'current') {
      // AUDIT FIX: the "Current (from V & P)" option was wired to state that nothing read —
      // choosing it silently produced a power calculation instead. It now solves the
      // relationship the editorial worked example teaches: IL = P ÷ (√3 × VL × pf).
      const P = parseFloat(activePowerInput);
      if (!Number.isFinite(P) || P <= 0) return;
      IL = (P * 1000) / (ROOT3 * VLL * pf);
      currentSource = 'from-power';
    } else {
      const I = parseFloat(current);
      if (!Number.isFinite(I) || I <= 0) return;
      // In star the line current equals the phase current; in delta IL = √3 × IP.
      IL = currentType === 'phase' && connection === 'delta' ? I * ROOT3 : I;
    }

    // Calculate power values
    const apparentPower = (ROOT3 * VLL * IL) / 1000; // kVA
    const activePower = apparentPower * pf; // kW
    const phaseAngle = Math.acos(pf) * (180 / Math.PI);
    const reactivePower = apparentPower * Math.sin(Math.acos(pf)) * (pfType === 'lagging' ? 1 : -1); // kVAR

    // Calculate per-phase values
    const phaseVoltage = connection === 'star' ? VLL / ROOT3 : VLL;
    const phaseCurrent = connection === 'star' ? IL : IL / ROOT3;
    // NOTE: P/3 holds only for a BALANCED load. Unbalanced loads are an assessable
    // characteristic in their own right — Reg 331.1(c). Labelled as such in the results.
    const phasePower = activePower / 3;

    // Power factor quality assessment
    let pfQuality: 'Good' | 'Acceptable' | 'Poor';
    if (pf >= 0.95) pfQuality = 'Good';
    else if (pf >= 0.85) pfQuality = 'Acceptable';
    else pfQuality = 'Poor';

    // Protective device sizing (indicative only) — Ib <= In, Reg 433.1.1.
    const protectiveDevice = selectProtectiveDevice(IL);

    // Calculate unbalance if all phase currents provided
    let unbalance: number | undefined = undefined;
    if (currentA && currentB && currentC) {
      const IA = parseFloat(currentA);
      const IB = parseFloat(currentB);
      const IC = parseFloat(currentC);
      const avgCurrent = (IA + IB + IC) / 3;
      // AUDIT FIX: guard against NaN/all-zero entries, which previously produced NaN% or
      // Infinity% and rendered as a red "High unbalance" chip.
      if (
        Number.isFinite(IA) &&
        Number.isFinite(IB) &&
        Number.isFinite(IC) &&
        IA >= 0 &&
        IB >= 0 &&
        IC >= 0 &&
        avgCurrent > 0
      ) {
        const maxDeviation = Math.max(
          Math.abs(IA - avgCurrent),
          Math.abs(IB - avgCurrent),
          Math.abs(IC - avgCurrent)
        );
        unbalance = (maxDeviation / avgCurrent) * 100;
      }
    }

    // Calculate power factor correction capacitor if target PF provided
    // AUDIT FIX: Qc = P(tan φ1 − tan φ2) sizes SHUNT CAPACITANCE, which is only the right
    // correction for a LAGGING (inductive) load. The leading/lagging selector was ignored,
    // so a leading load was told to add capacitors — which drives the power factor further
    // from unity. Power factor is an assessable characteristic under Reg 331.1(l).
    let correctionCapacitor: number | undefined = undefined;
    let correctionNote: string | undefined = undefined;
    const targetPfValue = parseFloat(targetPf);
    if (targetPf && Number.isFinite(targetPfValue) && targetPfValue > pf && targetPfValue <= 1) {
      if (pfType === 'lagging') {
        const targetAngle = Math.acos(targetPfValue);
        const currentAngle = Math.acos(pf);
        correctionCapacitor = activePower * (Math.tan(currentAngle) - Math.tan(targetAngle)); // kVAR
      } else {
        correctionNote =
          'Load power factor is leading (capacitive), so the reactive power is already capacitive. Adding shunt capacitors would move the power factor further from unity — leading power factor is corrected with inductive compensation, and the cause (over-sized capacitor bank, lightly loaded cable runs) should be investigated first.';
      }
    }

    setResult({
      apparentPower,
      activePower,
      reactivePower,
      phaseVoltage,
      phaseCurrent,
      lineVoltage: VLL,
      lineCurrent: IL,
      phaseAngle,
      pfQuality,
      protectiveDevice,
      unbalance,
      correctionCapacitor,
      correctionNote,
      currentSource,
      motorInputPower,
      // Reg 512.1.3 — where frequency influences equipment characteristics, rated frequency
      // shall correspond to the nominal frequency of the supply. UK nominal is 50 Hz.
      frequencyMismatch: frequency !== '50',
      perPhase: {
        voltage: phaseVoltage,
        current: phaseCurrent,
        power: phasePower,
      },
    });
  };

  const reset = () => {
    setVoltage('');
    setCurrent('');
    setPowerFactor('0.85');
    setConnection('star');
    setVoltageType('line-line');
    setCurrentType('line');
    setPfType('lagging');
    setFrequency('50');
    setMode('power');
    setSolveFor('power');
    setActivePowerInput('');
    setMechanicalPower('');
    setMechanicalPowerUnit('kW');
    setEfficiency('85');
    setTargetPf('');
    setCurrentA('');
    setCurrentB('');
    setCurrentC('');
    setAdvancedOpen(false);
    setResult(null);
  };

  // Which quantity the user supplies changes with the mode, so the guard has to follow it —
  // Motor Sizing needs the mechanical rating, "Current (from V & P)" needs the power.
  const hasValidInputs = () => {
    if (!voltage || !powerFactor) return false;
    if (mode === 'motor') return Boolean(mechanicalPower && efficiency);
    if (solveFor === 'current') return Boolean(activePowerInput);
    return Boolean(current);
  };

  /** True when the line current is derived rather than entered (motor rating, or P & V). */
  const derivesCurrent = mode === 'motor' || solveFor === 'current';

  const getPfStatusColour = () => {
    if (!result) return 'text-white';
    if (result.pfQuality === 'Good') return 'text-green-400';
    if (result.pfQuality === 'Acceptable') return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <CalculatorCard
      category="power"
      title="Three Phase Power Calculator"
      description="Calculate power values for three-phase electrical systems including apparent, active, and reactive power"
    >
      <CalculatorPanes
        copyTitle="Three Phase Power"
        form={
          <>
            <CalculatorSelect
              label="Calculation Mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'power', label: 'Power Calculation' },
                { value: 'motor', label: 'Motor Sizing' },
              ]}
            />

            {mode === 'power' && (
              <CalculatorSelect
                label="Solve For"
                value={solveFor}
                onChange={setSolveFor}
                options={[
                  { value: 'power', label: 'Power (from V & I)' },
                  { value: 'current', label: 'Current (from V & P)' },
                ]}
              />
            )}

            <CalculatorInputGrid columns={2}>
              <CalculatorSelect
                label="Connection Type"
                value={connection}
                onChange={setConnection}
                options={[
                  { value: 'star', label: 'Star (Y)' },
                  { value: 'delta', label: 'Delta (Δ)' },
                ]}
              />
              <CalculatorSelect
                label="Voltage Type"
                value={voltageType}
                onChange={setVoltageType}
                options={[
                  { value: 'line-line', label: 'Line-to-Line' },
                  { value: 'line-neutral', label: 'Line-to-Neutral' },
                ]}
              />
            </CalculatorInputGrid>

            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label={
                  voltageType === 'line-line'
                    ? 'Line Voltage (VLL)'
                    : 'Line-to-Neutral Voltage (VLN)'
                }
                unit="V"
                type="text"
                inputMode="decimal"
                value={voltage}
                onChange={setVoltage}
                placeholder={voltageType === 'line-line' ? 'e.g., 400' : 'e.g., 230'}
                hint={
                  voltageType === 'line-neutral'
                    ? 'Converted to VLL × √3 — the supply voltage does not change with load connection'
                    : undefined
                }
              />
              {mode === 'motor' ? null : solveFor === 'current' ? (
                <CalculatorInput
                  label="Active Power (P)"
                  unit="kW"
                  type="text"
                  inputMode="decimal"
                  value={activePowerInput}
                  onChange={setActivePowerInput}
                  placeholder="e.g., 15"
                  hint="Real power drawn by the load"
                />
              ) : (
                <CalculatorInput
                  label={currentType === 'line' ? 'Line Current' : 'Phase Current'}
                  unit="A"
                  type="text"
                  inputMode="decimal"
                  value={current}
                  onChange={setCurrent}
                  placeholder="e.g., 25"
                />
              )}
            </CalculatorInputGrid>

            <CalculatorInputGrid columns={2}>
              {derivesCurrent ? null : (
                <CalculatorSelect
                  label="Current Type"
                  value={currentType}
                  onChange={setCurrentType}
                  options={[
                    { value: 'line', label: 'Line Current' },
                    { value: 'phase', label: 'Phase Current' },
                  ]}
                />
              )}
              <CalculatorSelect
                label="Frequency"
                value={frequency}
                onChange={setFrequency}
                options={[
                  { value: '50', label: '50 Hz (UK)' },
                  { value: '60', label: '60 Hz' },
                ]}
              />
            </CalculatorInputGrid>

            <CalculatorInputGrid columns={2}>
              <CalculatorInput
                label="Power Factor"
                type="text"
                inputMode="decimal"
                value={powerFactor}
                onChange={setPowerFactor}
                placeholder="e.g., 0.85"
                hint="0 to 1"
              />
              <CalculatorSelect
                label="PF Type"
                value={pfType}
                onChange={setPfType}
                options={[
                  { value: 'lagging', label: 'Lagging (Inductive)' },
                  { value: 'leading', label: 'Leading (Capacitive)' },
                ]}
              />
            </CalculatorInputGrid>

            {mode === 'motor' && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="font-medium text-amber-400 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Motor Sizing Parameters
                </h4>
                <CalculatorInputGrid columns={2}>
                  <CalculatorInput
                    label="Mechanical Power"
                    unit={mechanicalPowerUnit}
                    type="text"
                    inputMode="decimal"
                    value={mechanicalPower}
                    onChange={setMechanicalPower}
                    placeholder="e.g., 15"
                  />
                  <CalculatorSelect
                    label="Power Unit"
                    value={mechanicalPowerUnit}
                    onChange={setMechanicalPowerUnit}
                    options={[
                      { value: 'kW', label: 'kW' },
                      { value: 'HP', label: 'HP' },
                    ]}
                  />
                </CalculatorInputGrid>
                <CalculatorInput
                  label="Efficiency"
                  unit="%"
                  type="text"
                  inputMode="decimal"
                  value={efficiency}
                  onChange={setEfficiency}
                  placeholder="85"
                />
              </div>
            )}

            <CalculatorInput
              label="Target Power Factor (optional)"
              type="text"
              inputMode="decimal"
              value={targetPf}
              onChange={setTargetPf}
              placeholder="e.g., 0.95"
              hint="For PF correction calculation"
            />

            {/* Advanced Options */}
            <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                <span className="text-sm font-medium text-white">Advanced Options</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform',
                    advancedOpen && 'rotate-180'
                  )}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 space-y-3">
                <h5 className="text-sm font-medium text-amber-400">Current Unbalance Analysis</h5>
                <CalculatorInputGrid columns={3}>
                  <CalculatorInput
                    label="IA"
                    unit="A"
                    type="text"
                    inputMode="decimal"
                    value={currentA}
                    onChange={setCurrentA}
                    placeholder="25"
                  />
                  <CalculatorInput
                    label="IB"
                    unit="A"
                    type="text"
                    inputMode="decimal"
                    value={currentB}
                    onChange={setCurrentB}
                    placeholder="24"
                  />
                  <CalculatorInput
                    label="IC"
                    unit="A"
                    type="text"
                    inputMode="decimal"
                    value={currentC}
                    onChange={setCurrentC}
                    placeholder="26"
                  />
                </CalculatorInputGrid>
              </CollapsibleContent>
            </Collapsible>

            <CalculatorActions
              category="power"
              onCalculate={calculateThreePhasePower}
              onReset={reset}
              isDisabled={!hasValidInputs()}
            />
          </>
        }
        result={
          <>
            {/* Results */}
            {result && (
              <>
                <CalculatorDivider category="power" />

                <div className="space-y-4 animate-fade-in">
                  {/* Status Chips */}
                  <div className="flex flex-wrap gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      <span className="text-xs font-semibold text-amber-300">
                        {connection === 'star' ? 'Star (Y)' : 'Delta (Δ)'}
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      <span className="text-xs font-semibold text-amber-300">PF</span>
                      <span className={cn('text-sm font-semibold', getPfStatusColour())}>
                        {result.pfQuality}
                      </span>
                    </div>
                  </div>

                  {/* Hero — Apparent Power */}
                  <ResultHeadline
                    label="Apparent Power (S)"
                    value={`${result.apparentPower.toFixed(2)} kVA`}
                    caption={`φ = ${result.phaseAngle.toFixed(1)}° • √3 = 1.732`}
                  />

                  {/* Power Triangle */}
                  <ResultsGrid columns={2}>
                    <ResultValue
                      label="Active Power (P)"
                      value={result.activePower.toFixed(2)}
                      unit="kW"
                      category="power"
                      size="sm"
                    />
                    <ResultValue
                      label="Reactive Power (Q)"
                      value={`${Math.abs(result.reactivePower).toFixed(2)}`}
                      unit={`kVAR ${pfType === 'lagging' ? '(Ind)' : '(Cap)'}`}
                      category="power"
                      size="sm"
                    />
                  </ResultsGrid>

                  {/* Voltage & Current */}
                  <ResultsGrid columns={2}>
                    <ResultValue
                      label="Line Voltage"
                      value={result.lineVoltage.toFixed(1)}
                      unit="V"
                      category="power"
                      size="sm"
                    />
                    <ResultValue
                      label="Line Current"
                      value={result.lineCurrent.toFixed(2)}
                      unit="A"
                      category="power"
                      size="sm"
                    />
                    <ResultValue
                      label="Phase Voltage"
                      value={result.phaseVoltage.toFixed(1)}
                      unit="V"
                      category="power"
                      size="sm"
                    />
                    <ResultValue
                      label="Phase Current"
                      value={result.phaseCurrent.toFixed(2)}
                      unit="A"
                      category="power"
                      size="sm"
                    />
                  </ResultsGrid>

                  {/* Motor input power — Reg 512.1.4, duty demanded of the equipment */}
                  {result.motorInputPower !== undefined && (
                    <div className="rounded-xl p-3 bg-white/[0.04]">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">Motor Input Power (P ÷ η):</span>
                        <span className="text-amber-400 font-mono text-lg font-bold">
                          {result.motorInputPower.toFixed(2)} kW
                        </span>
                      </div>
                      <p className="text-xs text-white mt-1">
                        Design current (Ib) is the motor&apos;s electrical input current, not its
                        shaft rating.
                      </p>
                    </div>
                  )}

                  {/* Per-Phase Power */}
                  <div className="rounded-xl p-3 bg-white/[0.04]">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">Power per Phase:</span>
                      <span className="text-amber-400 font-mono text-lg font-bold">
                        {result.perPhase.power.toFixed(2)} kW
                      </span>
                    </div>
                    {/* P/3 is only true for a balanced load — unbalanced loads are an assessable
                    characteristic in their own right (Reg 331.1(c)). */}
                    <p className="text-xs text-white mt-1">
                      Assumes a balanced load. Where the three phases differ, work each phase from
                      its own current — unbalanced loads must be assessed under Reg 331.1(c).
                    </p>
                  </div>

                  {/* Unbalance Analysis */}
                  {result.unbalance !== undefined && (
                    <div
                      className={cn(
                        'rounded-xl p-3 border',
                        result.unbalance > 5
                          ? 'bg-red-500/10 border-red-500/20'
                          : 'bg-green-500/10 border-green-500/20'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">Current Unbalance:</span>
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              'font-mono font-bold',
                              result.unbalance > 5 ? 'text-red-400' : 'text-green-400'
                            )}
                          >
                            {result.unbalance.toFixed(1)}%
                          </span>
                          {result.unbalance > 5 && (
                            <span className="text-xs text-red-400 flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              High
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Power Factor Correction */}
                  {result.correctionCapacitor !== undefined && (
                    <div className="rounded-xl p-3 bg-green-500/10 border border-green-500/20">
                      <h4 className="text-sm font-medium text-green-400 mb-2">
                        Power Factor Correction
                      </h4>
                      <div className="flex justify-between">
                        <span className="text-sm text-white">Capacitor Required:</span>
                        <span className="text-green-400 font-mono font-bold">
                          {result.correctionCapacitor.toFixed(2)} kVAR
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Leading PF — shunt capacitance is the wrong correction (see engine comment) */}
                  {result.correctionNote !== undefined && (
                    <div className="rounded-xl p-3 bg-orange-500/10 border border-orange-500/30">
                      <h4 className="text-sm font-medium text-orange-300 mb-1">
                        Power Factor Correction
                      </h4>
                      <p className="text-sm text-white">{result.correctionNote}</p>
                    </div>
                  )}

                  {/* Frequency — Reg 512.1.3 */}
                  {result.frequencyMismatch && (
                    <div className="rounded-xl p-3 bg-orange-500/10 border border-orange-500/30">
                      <p className="text-sm text-white">
                        <strong className="text-orange-300">Frequency</strong> {'—'} {frequency} Hz
                        is not the UK nominal supply frequency of 50 Hz. None of the figures above
                        are frequency-dependent, but where frequency influences equipment
                        characteristics the rated frequency of the equipment must correspond to the
                        nominal frequency of the supply (Reg 512.1.3).
                      </p>
                    </div>
                  )}

                  {/* Protective Device */}
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.12]">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-white mt-0.5 shrink-0" />
                      <div className="text-sm text-white">
                        <div className="flex justify-between">
                          <span>
                            <strong>Suggested Protection:</strong>
                          </span>
                          <span className="text-amber-400 font-mono ml-2">
                            {result.protectiveDevice}
                          </span>
                        </div>
                        <p className="text-xs text-white mt-1">
                          Smallest standard rating satisfying Ib ≤ In. Reg 433.1.1 requires Ib ≤ In
                          ≤ Iz — Iz is not checked here, so the cable must still be sized and the
                          device coordinated to it. Motor circuits also need starting current and,
                          where a starter is used, coordination per Reg 435.2.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <CalculatorDivider category="power" />

                {/* How It Worked Out */}
                <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
                  <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                    <div className="flex items-center gap-3">
                      <Zap className="h-4 w-4 text-purple-400" />
                      <span className="text-sm sm:text-base font-medium text-white">
                        How It Worked Out
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white transition-transform duration-200',
                        showCalculation && 'rotate-180'
                      )}
                    />
                  </CollapsibleTrigger>

                  <CollapsibleContent className="pt-2">
                    <div className="space-y-3 pl-1">
                      {/* Step 1: Input Values */}
                      <div className="border-l-2 border-purple-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-purple-300">Step 1: Input Values</strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          <span className="block">
                            Connection: {connection === 'star' ? 'Star (Y)' : 'Delta (Δ)'}
                          </span>
                          <span className="block">
                            Voltage: {voltage}V (
                            {voltageType === 'line-line' ? 'Line-to-Line' : 'Line-to-Neutral'})
                          </span>
                          {result.currentSource === 'from-motor' ? (
                            <span className="block">
                              Motor: {mechanicalPower}
                              {mechanicalPowerUnit} shaft, η = {efficiency}%
                            </span>
                          ) : result.currentSource === 'from-power' ? (
                            <span className="block">Active Power: {activePowerInput} kW</span>
                          ) : (
                            <span className="block">
                              Current: {current}A ({currentType === 'line' ? 'Line' : 'Phase'})
                            </span>
                          )}
                          <span className="block">
                            Power Factor: {powerFactor} {pfType}
                          </span>
                        </code>
                      </div>

                      {/* Step 2: Normalize to Line Values */}
                      <div className="border-l-2 border-purple-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-purple-300">
                            Step 2: Normalise to Line Values
                          </strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          {voltageType === 'line-neutral' ? (
                            <span className="block">
                              VLL = VLN × √3 = {voltage} × 1.732 = {result.lineVoltage.toFixed(1)}V
                            </span>
                          ) : (
                            <span className="block">VLL = {voltage}V (already line-to-line)</span>
                          )}
                          {result.currentSource === 'from-motor' ? (
                            <>
                              <span className="block">
                                P_in = P_mech ÷ η ={' '}
                                {mechanicalPowerUnit === 'HP'
                                  ? `${mechanicalPower} × 0.746 ÷ ${efficiency}%`
                                  : `${mechanicalPower} ÷ ${efficiency}%`}{' '}
                                = {result.motorInputPower?.toFixed(2)} kW
                              </span>
                              <span className="block">
                                IL = P_in ÷ (√3 × VLL × pf) = {result.lineCurrent.toFixed(2)}A
                              </span>
                            </>
                          ) : result.currentSource === 'from-power' ? (
                            <span className="block">
                              IL = P ÷ (√3 × VLL × pf) ={' '}
                              {(parseFloat(activePowerInput) * 1000).toFixed(0)} ÷ (1.732 ×{' '}
                              {result.lineVoltage.toFixed(1)} × {powerFactor}) ={' '}
                              {result.lineCurrent.toFixed(2)}A
                            </span>
                          ) : currentType === 'phase' && connection === 'delta' ? (
                            <span className="block">
                              IL = IP × √3 = {current} × 1.732 = {result.lineCurrent.toFixed(2)}A
                            </span>
                          ) : (
                            <span className="block">IL = {current}A (line current)</span>
                          )}
                        </code>
                      </div>

                      {/* Step 3: Apparent Power */}
                      <div className="border-l-2 border-purple-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-purple-300">Step 3: Apparent Power</strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          <span className="block">S = √3 × VLL × IL</span>
                          <span className="block">
                            S = 1.732 × {result.lineVoltage.toFixed(1)} ×{' '}
                            {result.lineCurrent.toFixed(2)}
                          </span>
                          <span className="block text-amber-300">
                            S = {(result.apparentPower * 1000).toFixed(0)}VA ={' '}
                            {result.apparentPower.toFixed(2)} kVA
                          </span>
                        </code>
                      </div>

                      {/* Step 4: Power Triangle */}
                      <div className="border-l-2 border-purple-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-purple-300">Step 4: Power Triangle</strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          <span className="block">
                            P = S × cos(φ) = {result.apparentPower.toFixed(2)} × {powerFactor}
                          </span>
                          <span className="block text-amber-300">
                            P = {result.activePower.toFixed(2)} kW
                          </span>
                          <span className="block">
                            Q = S × sin(φ) = {result.apparentPower.toFixed(2)} × sin(
                            {result.phaseAngle.toFixed(1)}°)
                          </span>
                          <span className="block text-amber-300">
                            Q = {Math.abs(result.reactivePower).toFixed(2)} kVAR
                          </span>
                        </code>
                      </div>

                      {/* Step 5: Per-Phase Values */}
                      <div className="border-l-2 border-purple-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-purple-300">
                            Step 5: Per-Phase Values ({connection === 'star' ? 'Star' : 'Delta'})
                          </strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          {connection === 'star' ? (
                            <>
                              <span className="block">
                                VP = VLL / √3 = {result.lineVoltage.toFixed(1)} / 1.732 ={' '}
                                {result.phaseVoltage.toFixed(1)}V
                              </span>
                              <span className="block">
                                IP = IL = {result.phaseCurrent.toFixed(2)}A
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="block">
                                VP = VLL = {result.phaseVoltage.toFixed(1)}V
                              </span>
                              <span className="block">
                                IP = IL / √3 = {result.lineCurrent.toFixed(2)} / 1.732 ={' '}
                                {result.phaseCurrent.toFixed(2)}A
                              </span>
                            </>
                          )}
                          <span className="block text-amber-300">
                            Power per phase = {result.perPhase.power.toFixed(2)} kW
                          </span>
                        </code>
                      </div>

                      {/* Power Triangle Verification */}
                      <div className="border-l-2 border-amber-400/40 pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-amber-300">Power Triangle Verification</strong>
                        </p>
                        <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                          <span className="block">
                            S² = P² + Q² → {result.apparentPower.toFixed(2)}² ={' '}
                            {result.activePower.toFixed(2)}² +{' '}
                            {Math.abs(result.reactivePower).toFixed(2)}²
                          </span>
                          <span className="block">
                            {(result.apparentPower * result.apparentPower).toFixed(2)} ≈{' '}
                            {(
                              result.activePower * result.activePower +
                              result.reactivePower * result.reactivePower
                            ).toFixed(2)}{' '}
                            ✓
                          </span>
                        </code>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* What This Means */}
                <Collapsible open={showGuidance} onOpenChange={setShowGuidance}>
                  <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
                    <div className="flex items-center gap-3">
                      <Info className="h-4 w-4 text-white" />
                      <span className="text-sm sm:text-base font-medium text-white">
                        What This Means
                      </span>
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
                      <div className="border-l-2 border-white/[0.14] pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-elec-yellow">Power Factor</strong> {'—'}{' '}
                          {result.pfQuality === 'Poor'
                            ? 'Values below 0.85 may require correction per supply authority requirements. Poor power factor increases current draw and cable sizing.'
                            : result.pfQuality === 'Acceptable'
                              ? 'Acceptable for most applications. Consider correction for improved efficiency.'
                              : 'Excellent efficiency - minimal reactive power losses.'}
                        </p>
                      </div>
                      <div className="border-l-2 border-white/[0.14] pl-3">
                        <p className="text-sm text-white">
                          <strong className="text-elec-yellow">Star vs Delta</strong> {'—'} Star
                          connection provides neutral for single-phase loads. Delta connection is
                          common for motors and balanced loads.
                        </p>
                      </div>
                      {result.unbalance !== undefined && (
                        <div className="border-l-2 border-white/[0.14] pl-3">
                          <p className="text-sm text-white">
                            <strong className="text-elec-yellow">Current Unbalance</strong> {'—'}{' '}
                            {result.unbalance > 5
                              ? '>5% unbalance causes neutral current in star systems and reduces motor efficiency. >10% requires investigation.'
                              : 'Unbalance within acceptable limits.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Formula Reference */}
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.12]">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-white mt-0.5 shrink-0" />
                    <p className="text-sm text-white">
                      <strong>UK Standard:</strong> Three-phase supply is 400V line-to-line, 230V
                      line-to-neutral, 50Hz (BS 7671:2018+A4:2026)
                    </p>
                  </div>
                </div>
              </>
            )}
          </>
        }
        footer={<CalculatorEditorial content={threePhasePowerContent} category="power" />}
      />
    </CalculatorCard>
  );
};

export default ThreePhasePowerCalculator;
