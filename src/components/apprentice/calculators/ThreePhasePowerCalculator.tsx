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
  CALCULATOR_CONFIG,
} from '@/components/calculators/shared';

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
  const [mechanicalPower, setMechanicalPower] = useState<string>('');
  const [mechanicalPowerUnit, setMechanicalPowerUnit] = useState<string>('kW');
  const [efficiency, setEfficiency] = useState<string>('85');
  const [targetPf, setTargetPf] = useState<string>('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentA, setCurrentA] = useState<string>('');
  const [currentB, setCurrentB] = useState<string>('');
  const [currentC, setCurrentC] = useState<string>('');

  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const [result, setResult] = useState<ThreePhaseResult | null>(null);

  const calculateThreePhasePower = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor);
    const freq = parseFloat(frequency);
    const eff = parseFloat(efficiency) / 100;
    const mechPower = parseFloat(mechanicalPower);

    if (V <= 0 || I <= 0 || pf <= 0 || pf > 1) return;

    // Normalize inputs to line-to-line voltage and line current
    let VLL = V;
    let IL = I;

    // Convert voltage based on type and connection
    if (voltageType === 'line-neutral' && connection === 'star') {
      VLL = V * Math.sqrt(3);
    } else if (voltageType === 'line-neutral' && connection === 'delta') {
      VLL = V; // In delta, line-neutral doesn't apply
    }

    // Convert current based on type and connection
    if (currentType === 'phase' && connection === 'star') {
      IL = I; // In star, line current = phase current
    } else if (currentType === 'phase' && connection === 'delta') {
      IL = I * Math.sqrt(3); // In delta, line current = √3 × phase current
    }

    // Calculate power values
    const apparentPower = (Math.sqrt(3) * VLL * IL) / 1000; // kVA
    const activePower = apparentPower * pf; // kW
    const phaseAngle = Math.acos(pf) * (180 / Math.PI);
    const reactivePower = apparentPower * Math.sin(Math.acos(pf)) * (pfType === 'lagging' ? 1 : -1); // kVAR

    // Calculate per-phase values
    const phaseVoltage = connection === 'star' ? VLL / Math.sqrt(3) : VLL;
    const phaseCurrent = connection === 'star' ? IL : IL / Math.sqrt(3);
    const phasePower = activePower / 3;

    // Power factor quality assessment
    let pfQuality: 'Good' | 'Acceptable' | 'Poor';
    if (pf >= 0.95) pfQuality = 'Good';
    else if (pf >= 0.85) pfQuality = 'Acceptable';
    else pfQuality = 'Poor';

    // Protective device sizing (indicative only)
    const ratedCurrent = IL;
    let protectiveDevice = '';
    if (ratedCurrent <= 6) protectiveDevice = '6A MCB/RCBO';
    else if (ratedCurrent <= 10) protectiveDevice = '10A MCB/RCBO';
    else if (ratedCurrent <= 16) protectiveDevice = '16A MCB/RCBO';
    else if (ratedCurrent <= 20) protectiveDevice = '20A MCB/RCBO';
    else if (ratedCurrent <= 25) protectiveDevice = '25A MCB/RCBO';
    else if (ratedCurrent <= 32) protectiveDevice = '32A MCB/RCBO';
    else if (ratedCurrent <= 40) protectiveDevice = '40A MCB/RCBO';
    else if (ratedCurrent <= 50) protectiveDevice = '50A MCB/RCBO';
    else if (ratedCurrent <= 63) protectiveDevice = '63A MCB/RCBO';
    else if (ratedCurrent <= 80) protectiveDevice = '80A MCCB';
    else if (ratedCurrent <= 100) protectiveDevice = '100A MCCB';
    else protectiveDevice = `${Math.ceil(ratedCurrent / 50) * 50}A MCCB`;

    // Calculate unbalance if all phase currents provided
    let unbalance = undefined;
    if (currentA && currentB && currentC) {
      const IA = parseFloat(currentA);
      const IB = parseFloat(currentB);
      const IC = parseFloat(currentC);
      const avgCurrent = (IA + IB + IC) / 3;
      const maxDeviation = Math.max(
        Math.abs(IA - avgCurrent),
        Math.abs(IB - avgCurrent),
        Math.abs(IC - avgCurrent)
      );
      unbalance = (maxDeviation / avgCurrent) * 100;
    }

    // Calculate power factor correction capacitor if target PF provided
    let correctionCapacitor = undefined;
    if (targetPf && parseFloat(targetPf) > pf) {
      const targetPfValue = parseFloat(targetPf);
      const targetAngle = Math.acos(targetPfValue);
      const currentAngle = Math.acos(pf);
      const Qc = activePower * (Math.tan(currentAngle) - Math.tan(targetAngle));
      correctionCapacitor = Qc; // kVAR
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

  const hasValidInputs = () => {
    return voltage && current && powerFactor;
  };

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
          label={voltageType === 'line-line' ? 'Line Voltage' : 'Phase Voltage'}
          unit="V"
          type="text"
          inputMode="decimal"
          value={voltage}
          onChange={setVoltage}
          placeholder={voltageType === 'line-line' ? 'e.g., 400' : 'e.g., 230'}
        />
        <CalculatorInput
          label={currentType === 'line' ? 'Line Current' : 'Phase Current'}
          unit="A"
          type="text"
          inputMode="decimal"
          value={current}
          onChange={setCurrent}
          placeholder="e.g., 25"
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Current Type"
          value={currentType}
          onChange={setCurrentType}
          options={[
            { value: 'line', label: 'Line Current' },
            { value: 'phase', label: 'Phase Current' },
          ]}
        />
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
            className={cn('h-4 w-4 text-white transition-transform', advancedOpen && 'rotate-180')}
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
            <div className="text-center py-3">
              <p className="text-sm text-white mb-1">Apparent Power (S)</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {result.apparentPower.toFixed(2)} kVA
              </div>
              <p className="text-xs text-white mt-1">
                φ = {result.phaseAngle.toFixed(1)}° • √3 = 1.732
              </p>
            </div>

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

            {/* Per-Phase Power */}
            <div className="rounded-xl p-3 bg-white/[0.04]">
              <div className="flex justify-between text-sm">
                <span className="text-white">Power per Phase:</span>
                <span className="text-amber-400 font-mono text-lg font-bold">
                  {result.perPhase.power.toFixed(2)} kW
                </span>
              </div>
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
                <h4 className="text-sm font-medium text-green-400 mb-2">Power Factor Correction</h4>
                <div className="flex justify-between">
                  <span className="text-sm text-white">Capacitor Required:</span>
                  <span className="text-green-400 font-mono font-bold">
                    {result.correctionCapacitor.toFixed(2)} kVAR
                  </span>
                </div>
              </div>
            )}

            {/* Protective Device */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <div className="text-sm text-white">
                  <div className="flex justify-between">
                    <span>
                      <strong>Suggested Protection:</strong>
                    </span>
                    <span className="text-amber-400 font-mono ml-2">{result.protectiveDevice}</span>
                  </div>
                  <p className="text-xs text-white mt-1">
                    Indicative only - proper circuit design required per BS 7671
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
                    <span className="block">
                      Current: {current}A ({currentType === 'line' ? 'Line' : 'Phase'})
                    </span>
                    <span className="block">
                      Power Factor: {powerFactor} {pfType}
                    </span>
                  </code>
                </div>

                {/* Step 2: Normalize to Line Values */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">Step 2: Normalise to Line Values</strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    {voltageType === 'line-neutral' ? (
                      <span className="block">
                        VLL = VLN × √3 = {voltage} × 1.732 = {result.lineVoltage.toFixed(1)}V
                      </span>
                    ) : (
                      <span className="block">VLL = {voltage}V (already line-to-line)</span>
                    )}
                    {currentType === 'phase' && connection === 'delta' ? (
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
                      S = 1.732 × {result.lineVoltage.toFixed(1)} × {result.lineCurrent.toFixed(2)}
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
                        <span className="block">IP = IL = {result.phaseCurrent.toFixed(2)}A</span>
                      </>
                    ) : (
                      <>
                        <span className="block">VP = VLL = {result.phaseVoltage.toFixed(1)}V</span>
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
                      {result.activePower.toFixed(2)}² + {Math.abs(result.reactivePower).toFixed(2)}
                      ²
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
                    <strong className="text-blue-300">Power Factor</strong> {'—'}{' '}
                    {result.pfQuality === 'Poor'
                      ? 'Values below 0.85 may require correction per supply authority requirements. Poor power factor increases current draw and cable sizing.'
                      : result.pfQuality === 'Acceptable'
                        ? 'Acceptable for most applications. Consider correction for improved efficiency.'
                        : 'Excellent efficiency - minimal reactive power losses.'}
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-blue-300">Star vs Delta</strong> {'—'} Star connection
                    provides neutral for single-phase loads. Delta connection is common for motors
                    and balanced loads.
                  </p>
                </div>
                {result.unbalance !== undefined && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Current Unbalance</strong> {'—'}{' '}
                      {result.unbalance > 5
                        ? '>5% unbalance causes neutral current in star systems and reduces motor efficiency. >10% requires investigation.'
                        : 'Unbalance within acceptable limits.'}
                    </p>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* BS 7671 Regs at a Glance */}
          <Collapsible open={showBsRegs} onOpenChange={setShowBsRegs}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-amber-400" />
                <span className="text-sm sm:text-base font-medium text-white">
                  BS 7671 Regs at a Glance
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
                    <strong className="text-amber-300">Protection</strong> {'—'} Final circuit
                    protection must account for motor starting currents (typically 6-8× full load).
                    Use BS EN 60947-4-1 rated devices.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Cable Sizing</strong> {'—'} Consider voltage
                    drop (Section 525), current-carrying capacity with grouping/temperature factors.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">512.1.2</strong> {'—'} Equipment selection
                    must consider power factor and efficiency.
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">523</strong> {'—'} Conductor sizing based on
                    design current, not reduced current from poor PF.
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Formula Reference */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                <strong>UK Standard:</strong> Three-phase supply is 400V line-to-line, 230V
                line-to-neutral, 50Hz (BS 7671:2018+A3:2024)
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorCard>
  );
};

export default ThreePhasePowerCalculator;
