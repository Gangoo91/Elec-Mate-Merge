import { useState } from 'react';
import { Info, BookOpen, ChevronDown, AlertTriangle, Activity } from 'lucide-react';
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

interface ACCircuitResult {
  impedance?: number;
  current?: number;
  phaseAngle?: number;
  activePower?: number;
  reactivePower?: number;
  apparentPower?: number;
  powerFactor?: number;
  leadLag?: string;
  xrRatio?: number;
  resonantFreq?: number;
  qFactor?: number;
  protectiveDeviceRange?: string;
}

const BasicACCircuitCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [circuitType, setCircuitType] = useState('');
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');
  const [reactance, setReactance] = useState('');
  const [frequency, setFrequency] = useState('50');
  const [inductance, setInductance] = useState('');
  const [capacitance, setCapacitance] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<ACCircuitResult | null>(null);

  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = 'Valid voltage required';
    }
    if (!resistance && !reactance && !inductance && !capacitance) {
      newErrors.general = 'Enter at least one circuit parameter (R, X, L, or C)';
    }
    if (frequency && (parseFloat(frequency) <= 0 || parseFloat(frequency) > 1000)) {
      newErrors.frequency = 'Frequency must be between 0 and 1000 Hz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCircuit = () => {
    if (!validateInputs()) return;

    const V = parseFloat(voltage);
    const R = parseFloat(resistance) || 0;
    const f = parseFloat(frequency);
    let X = parseFloat(reactance) || 0;
    let XL = 0,
      XC = 0;

    // Calculate reactance from component values if provided
    if (inductance && !reactance) {
      const L = parseFloat(inductance) / 1000; // Convert mH to H
      XL = 2 * Math.PI * f * L;
      X = XL;
    }
    if (capacitance && !reactance) {
      const C = parseFloat(capacitance) / 1000000; // Convert µF to F
      XC = 1 / (2 * Math.PI * f * C);
      X = -XC;
    }

    // For RLC circuits, combine both
    if (inductance && capacitance) {
      const L = parseFloat(inductance) / 1000;
      const C = parseFloat(capacitance) / 1000000;
      XL = 2 * Math.PI * f * L;
      XC = 1 / (2 * Math.PI * f * C);
      X = XL - XC;
    }

    // Calculate impedance
    const Z = Math.sqrt(R * R + X * X);

    // Calculate current
    const I = V / Z;

    // Calculate phase angle
    const phaseAngle = Math.atan2(X, R) * (180 / Math.PI);

    // Determine lead/lag
    const leadLag =
      X > 0
        ? 'Current lags voltage (Inductive)'
        : X < 0
          ? 'Current leads voltage (Capacitive)'
          : 'Resistive (In phase)';

    // Calculate X/R ratio
    const xrRatio = R > 0 ? Math.abs(X) / R : Infinity;

    // Calculate powers
    const activePower = I * I * R;
    const reactivePower = I * I * Math.abs(X);
    const apparentPower = V * I;
    const powerFactor = Math.abs(Math.cos((phaseAngle * Math.PI) / 180));

    // Calculate resonant frequency for RLC
    let resonantFreq = 0;
    let qFactor = 0;
    if (inductance && capacitance) {
      const L = parseFloat(inductance) / 1000;
      const C = parseFloat(capacitance) / 1000000;
      resonantFreq = 1 / (2 * Math.PI * Math.sqrt(L * C));
      qFactor = R > 0 ? (1 / R) * Math.sqrt(L / C) : 0;
    }

    // Protective device range
    const protectiveDeviceRange =
      I <= 6
        ? '6A MCB'
        : I <= 10
          ? '10A MCB'
          : I <= 16
            ? '16A MCB'
            : I <= 32
              ? '32A MCB'
              : 'Consider larger protection';

    setResults({
      impedance: Z,
      current: I,
      phaseAngle: phaseAngle,
      activePower: activePower,
      reactivePower: reactivePower,
      apparentPower: apparentPower,
      powerFactor: powerFactor,
      leadLag: leadLag,
      xrRatio: xrRatio,
      resonantFreq: resonantFreq,
      qFactor: qFactor,
      protectiveDeviceRange: protectiveDeviceRange,
    });
    setErrors({});
  };

  const resetCalculator = () => {
    setCircuitType('');
    setVoltage('');
    setResistance('');
    setReactance('');
    setFrequency('50');
    setInductance('');
    setCapacitance('');
    setErrors({});
    setResults(null);
  };

  const getCircuitStatus = () => {
    if (!results) return { text: 'Enter values', color: 'text-white' };
    if (results.resonantFreq && Math.abs(parseFloat(frequency) - results.resonantFreq) < 5) {
      return { text: 'Near Resonance', color: 'text-red-400' };
    }
    if (results.xrRatio && results.xrRatio > 10) {
      return { text: 'Highly Reactive', color: 'text-amber-400' };
    }
    if (results.powerFactor && results.powerFactor > 0.9) {
      return { text: 'Good PF', color: 'text-green-400' };
    }
    return { text: 'Standard Circuit', color: 'text-blue-400' };
  };

  const hasValidInputs = () => voltage && (resistance || reactance || inductance || capacitance);
  const status = getCircuitStatus();

  return (
    <CalculatorCard
      category="power"
      title="Basic AC Circuit Calculator"
      description="Calculate impedance, current, and power in AC circuits with reactive components"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Circuit Type"
          value={circuitType}
          onChange={setCircuitType}
          options={[
            { value: 'resistive', label: 'Pure Resistive' },
            { value: 'inductive', label: 'Resistive-Inductive (RL)' },
            { value: 'capacitive', label: 'Resistive-Capacitive (RC)' },
            { value: 'rlc', label: 'RLC Circuit' },
          ]}
          placeholder="Select circuit type"
        />
        <CalculatorSelect
          label="Frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: '50', label: '50 Hz (UK Standard)' },
            { value: '60', label: '60 Hz' },
            { value: '400', label: '400 Hz (Aircraft)' },
          ]}
        />
      </CalculatorInputGrid>

      <CalculatorInputGrid columns={2}>
        <CalculatorInput
          label="Voltage (V RMS)"
          unit="V"
          type="text"
          inputMode="decimal"
          value={voltage}
          onChange={setVoltage}
          placeholder="230"
          hint="UK domestic: 230V"
          error={errors.voltage}
        />
        <CalculatorInput
          label="Resistance"
          unit="Ω"
          type="text"
          inputMode="decimal"
          value={resistance}
          onChange={setResistance}
          placeholder="10"
          hint="Real component"
        />
      </CalculatorInputGrid>

      <CalculatorInput
        label="Reactance (Ω) - Optional"
        unit="Ω"
        type="text"
        inputMode="decimal"
        value={reactance}
        onChange={setReactance}
        placeholder="Enter directly or use L/C below"
        hint="+ for inductive, - for capacitive"
      />

      {(circuitType === 'inductive' || circuitType === 'rlc') && (
        <CalculatorInput
          label="Inductance"
          unit="mH"
          type="text"
          inputMode="decimal"
          value={inductance}
          onChange={setInductance}
          placeholder="100"
          hint="Will calculate XL = 2πfL"
        />
      )}

      {(circuitType === 'capacitive' || circuitType === 'rlc') && (
        <CalculatorInput
          label="Capacitance"
          unit="µF"
          type="text"
          inputMode="decimal"
          value={capacitance}
          onChange={setCapacitance}
          placeholder="100"
          hint="Will calculate XC = 1/(2πfC)"
        />
      )}

      {errors.general && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <p className="text-sm text-white">{errors.general}</p>
          </div>
        </div>
      )}

      <CalculatorActions
        category="power"
        onCalculate={calculateCircuit}
        onReset={resetCalculator}
        isDisabled={!hasValidInputs()}
        calculateLabel="Calculate Circuit"
      />

      {/* Results */}
      {results && (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
              <span className="text-xs font-semibold text-amber-300">Circuit</span>
              <span className={cn('text-sm font-semibold', status.color)}>{status.text}</span>
            </div>

            {/* Hero — Impedance & Current */}
            <div className="grid grid-cols-2 gap-4 py-3">
              <div className="text-center">
                <p className="text-sm text-white mb-1">Impedance (Z)</p>
                <div
                  className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {results.impedance?.toFixed(2)} Ω
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-white mb-1">Current (I)</p>
                <div
                  className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                  }}
                >
                  {results.current?.toFixed(3)} A
                </div>
              </div>
            </div>

            {/* Result Cards */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Phase Angle"
                value={results.phaseAngle?.toFixed(1) || '0'}
                unit="°"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Power Factor"
                value={results.powerFactor?.toFixed(3) || '0'}
                category="power"
                size="sm"
              />
              <ResultValue
                label="Active Power"
                value={results.activePower?.toFixed(2) || '0'}
                unit="W"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Reactive Power"
                value={results.reactivePower?.toFixed(2) || '0'}
                unit="VAr"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Circuit Type & X/R Ratio */}
            <div className="rounded-xl p-3 bg-white/[0.04] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Circuit Type:</span>
                <span className="text-amber-400">{results.leadLag}</span>
              </div>
              {results.xrRatio !== undefined && results.xrRatio !== Infinity && (
                <div className="flex justify-between text-sm">
                  <span className="text-white">X/R Ratio:</span>
                  <span className="text-amber-400 font-mono">{results.xrRatio.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Resonance Info for RLC */}
            {results.resonantFreq && results.resonantFreq > 0 && (
              <div className="rounded-xl p-3 bg-white/[0.04] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">Resonant Frequency:</span>
                  <span className="text-amber-400 font-mono">
                    {results.resonantFreq.toFixed(1)} Hz
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white">Q Factor:</span>
                  <span className="text-amber-400 font-mono">{results.qFactor?.toFixed(1)}</span>
                </div>
              </div>
            )}

            {/* Resonance Warning */}
            {results.resonantFreq &&
              Math.abs(parseFloat(frequency) - results.resonantFreq) < 10 && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-white">
                      <strong>Warning:</strong> Operating near resonant frequency (
                      {results.resonantFreq.toFixed(1)} Hz) - High currents possible!
                    </p>
                  </div>
                </div>
              )}

            {/* Protection Guidance */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-sm text-white">
                  <strong>Indicative Protection:</strong> {results.protectiveDeviceRange} (advisory
                  only)
                </p>
              </div>
            </div>
          </div>

          <CalculatorDivider category="power" />

          {/* How It Worked Out */}
          <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-purple-400" />
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
                      Voltage (V): {voltage}V RMS at {frequency}Hz
                    </span>
                    <span className="block">Resistance (R): {resistance || '0'}Ω</span>
                    {inductance && <span className="block">Inductance (L): {inductance}mH</span>}
                    {capacitance && <span className="block">Capacitance (C): {capacitance}µF</span>}
                    {reactance && !inductance && !capacitance && (
                      <span className="block">Reactance (X): {reactance}Ω</span>
                    )}
                  </code>
                </div>

                {/* Step 2: Reactance Calculation (if L or C provided) */}
                {(inductance || capacitance) && (
                  <div className="border-l-2 border-purple-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-purple-300">Step 2: Reactance Calculation</strong>
                    </p>
                    <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                      {inductance && (
                        <span className="block">
                          XL = 2πfL = 2 × π × {frequency} × ({inductance}/1000) ={' '}
                          {(
                            (2 * Math.PI * parseFloat(frequency) * parseFloat(inductance)) /
                            1000
                          ).toFixed(2)}
                          Ω
                        </span>
                      )}
                      {capacitance && (
                        <span className="block">
                          XC = 1/(2πfC) = 1/(2 × π × {frequency} × ({capacitance}/1000000)) ={' '}
                          {(
                            1 /
                            ((2 * Math.PI * parseFloat(frequency) * parseFloat(capacitance)) /
                              1000000)
                          ).toFixed(2)}
                          Ω
                        </span>
                      )}
                      {inductance && capacitance && (
                        <span className="block text-amber-300">
                          Net X = XL - XC ={' '}
                          {(
                            (2 * Math.PI * parseFloat(frequency) * parseFloat(inductance)) / 1000 -
                            1 /
                              ((2 * Math.PI * parseFloat(frequency) * parseFloat(capacitance)) /
                                1000000)
                          ).toFixed(2)}
                          Ω
                        </span>
                      )}
                    </code>
                  </div>
                )}

                {/* Impedance */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">
                      Step {inductance || capacitance ? '3' : '2'}: Impedance
                    </strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">Z = √(R² + X²)</span>
                    <span className="block text-amber-300">
                      Z = {results.impedance?.toFixed(2)}Ω
                    </span>
                  </code>
                </div>

                {/* Current */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">
                      Step {inductance || capacitance ? '4' : '3'}: Current (Ohm's Law)
                    </strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">
                      I = V / Z = {voltage} / {results.impedance?.toFixed(2)}
                    </span>
                    <span className="block text-amber-300">I = {results.current?.toFixed(3)}A</span>
                  </code>
                </div>

                {/* Phase Angle */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">
                      Step {inductance || capacitance ? '5' : '4'}: Phase Angle
                    </strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">φ = tan⁻¹(X / R)</span>
                    <span className="block text-amber-300">
                      φ = {results.phaseAngle?.toFixed(1)}° ({results.leadLag})
                    </span>
                  </code>
                </div>

                {/* Power */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">
                      Step {inductance || capacitance ? '6' : '5'}: Power
                    </strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">
                      P = I²R = {results.current?.toFixed(3)}² × {resistance || '0'} ={' '}
                      {results.activePower?.toFixed(2)}W (Active)
                    </span>
                    <span className="block">
                      Q = I²X = {results.reactivePower?.toFixed(2)}VAr (Reactive)
                    </span>
                    <span className="block">
                      S = V × I = {voltage} × {results.current?.toFixed(3)} ={' '}
                      {results.apparentPower?.toFixed(2)}VA (Apparent)
                    </span>
                    <span className="block text-amber-300">
                      PF = cos(φ) = {results.powerFactor?.toFixed(3)}
                    </span>
                  </code>
                </div>

                {/* Resonant Frequency */}
                {results.resonantFreq && results.resonantFreq > 0 && (
                  <div className="border-l-2 border-amber-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-amber-300">Resonant Frequency (RLC)</strong>
                    </p>
                    <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                      <span className="block">
                        fr = 1 / (2π√LC) = {results.resonantFreq.toFixed(1)}Hz
                      </span>
                      {Math.abs(parseFloat(frequency) - results.resonantFreq) < 10 && (
                        <span className="block text-red-400">
                          Operating near resonance - high currents possible!
                        </span>
                      )}
                    </code>
                  </div>
                )}
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
                    <strong className="text-blue-300">Circuit Behaviour</strong> {'—'}{' '}
                    {results.leadLag}
                  </p>
                </div>
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-blue-300">X/R Ratio</strong> {'—'}{' '}
                    {results.xrRatio && results.xrRatio > 5
                      ? 'Highly reactive - consider power factor correction'
                      : 'Reasonable reactive component'}
                  </p>
                </div>
                {results.resonantFreq && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Resonance</strong> {'—'} Avoid operating at{' '}
                      {results.resonantFreq.toFixed(1)} Hz - can cause excessive currents and
                      voltage stress
                    </p>
                  </div>
                )}
                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-blue-300">Power Factor</strong> {'—'}{' '}
                    {results.powerFactor && results.powerFactor < 0.8
                      ? 'Poor PF may increase energy costs'
                      : 'Acceptable power factor'}
                  </p>
                </div>
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
                    <strong className="text-amber-300">512.1.2</strong> {'—'} Equipment selection
                    must consider voltage, current, frequency and power factor
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">525</strong> {'—'} Voltage drop calculations
                    must include reactive components
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">331</strong> {'—'} Equipment suitability for
                    AC circuits and harmonic distortion
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">534</strong> {'—'} Transient overvoltages -
                    consider resonance effects in reactive circuits
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
                <strong>Key Formulas:</strong> Z = √(R² + X²) | XL = 2πfL | XC = 1/(2πfC) | I = V/Z
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorCard>
  );
};

export default BasicACCircuitCalculator;
