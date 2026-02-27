import { useState } from 'react';
import { Info, BookOpen, ChevronDown, TrendingDown, Zap, Battery } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface ACPowerResult {
  activePower?: number;
  reactivePower?: number;
  apparentPower?: number;
  powerFactor?: number;
  phaseAngle?: number;
  current?: number;
  currentAtUnity?: number;
  efficiency?: number;
  protectiveDeviceRange?: string;
}

const ACPowerCalculator = () => {
  const config = CALCULATOR_CONFIG['power'];

  const [phaseSystem, setPhaseSystem] = useState('single');
  const [voltage, setVoltage] = useState('');
  const [voltageType, setVoltageType] = useState('L-N');
  const [current, setCurrent] = useState('');
  const [currentType, setCurrentType] = useState('line');
  const [powerFactor, setPowerFactor] = useState('');
  const [pfType, setPfType] = useState('lagging');
  const [frequency, setFrequency] = useState('50');
  const [efficiency, setEfficiency] = useState('');
  const [activePower, setActivePower] = useState('');
  const [reactivePower, setReactivePower] = useState('');
  const [apparentPower, setApparentPower] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<ACPowerResult | null>(null);

  const [activeTab, setActiveTab] = useState('voltage-current');
  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  const validateInputs = () => {
    const newErrors: { [key: string]: string } = {};

    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = 'Valid voltage required';
    }
    if (!current || parseFloat(current) <= 0) {
      newErrors.current = 'Valid current required';
    }
    if (powerFactor && (parseFloat(powerFactor) <= 0 || parseFloat(powerFactor) > 1)) {
      newErrors.powerFactor = 'Power factor must be between 0 and 1';
    }
    if (efficiency && (parseFloat(efficiency) <= 0 || parseFloat(efficiency) > 100)) {
      newErrors.efficiency = 'Efficiency must be between 0 and 100%';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePower = () => {
    if (!validateInputs()) return;

    let V = parseFloat(voltage);
    const I = parseFloat(current);
    const pf = parseFloat(powerFactor) || 1;
    const eff = parseFloat(efficiency) || 100;
    const f = parseFloat(frequency);

    // Normalize voltage based on system type
    if (phaseSystem === 'three' && voltageType === 'L-N') {
      V = V * Math.sqrt(3);
    }

    // Calculate power values
    let S, P, Q, phaseAngle;

    if (phaseSystem === 'single') {
      S = V * I;
      P = S * pf;
      phaseAngle = Math.acos(pf) * (180 / Math.PI);
      Q = S * Math.sin(Math.acos(pf));
      if (pfType === 'leading') Q = -Q;
    } else {
      S = Math.sqrt(3) * V * I;
      P = S * pf;
      phaseAngle = Math.acos(pf) * (180 / Math.PI);
      Q = S * Math.sin(Math.acos(pf));
      if (pfType === 'leading') Q = -Q;
    }

    // Calculate current at unity power factor
    const currentAtUnity = P / (phaseSystem === 'single' ? V : Math.sqrt(3) * V);

    // Estimate protective device range
    const protectiveDeviceRange =
      I <= 6
        ? '6A MCB'
        : I <= 10
          ? '10A MCB'
          : I <= 16
            ? '16A MCB'
            : I <= 32
              ? '32A MCB'
              : I <= 63
                ? '63A MCB'
                : 'Consider larger protection';

    setResults({
      activePower: P,
      reactivePower: Math.abs(Q),
      apparentPower: S,
      powerFactor: pf,
      phaseAngle: phaseAngle,
      current: I,
      currentAtUnity: currentAtUnity,
      efficiency: eff,
      protectiveDeviceRange: protectiveDeviceRange,
    });
  };

  const calculateFromPowers = () => {
    const P = parseFloat(activePower);
    const Q = parseFloat(reactivePower);

    if (!isNaN(P) && !isNaN(Q)) {
      const S = Math.sqrt(P * P + Q * Q);
      const pf = P / S;
      const phaseAngle = Math.atan(Q / P) * (180 / Math.PI);

      setResults({
        activePower: P,
        reactivePower: Q,
        apparentPower: S,
        powerFactor: pf,
        phaseAngle: phaseAngle,
      });
    } else if (!isNaN(P)) {
      const S = parseFloat(apparentPower);
      if (!isNaN(S)) {
        const pf = P / S;
        const Q = Math.sqrt(S * S - P * P);
        const phaseAngle = Math.acos(pf) * (180 / Math.PI);

        setResults({
          activePower: P,
          reactivePower: Q,
          apparentPower: S,
          powerFactor: pf,
          phaseAngle: phaseAngle,
        });
      }
    }
  };

  const resetCalculator = () => {
    setPhaseSystem('single');
    setVoltage('');
    setVoltageType('L-N');
    setCurrent('');
    setCurrentType('line');
    setPowerFactor('');
    setPfType('lagging');
    setFrequency('50');
    setEfficiency('');
    setActivePower('');
    setReactivePower('');
    setApparentPower('');
    setErrors({});
    setResults(null);
  };

  const getPowerFactorStatus = () => {
    if (!results?.powerFactor) return { text: 'Unknown', color: 'text-white' };
    const pf = results.powerFactor;
    if (pf >= 0.95) return { text: 'Excellent', color: 'text-green-400' };
    if (pf >= 0.85) return { text: 'Good', color: 'text-amber-400' };
    return { text: 'Poor - Correction needed', color: 'text-red-400' };
  };

  const hasValidInputsVI = () => voltage && current;
  const hasValidInputsPower = () =>
    (activePower && reactivePower) || (activePower && apparentPower);

  const status = getPowerFactorStatus();

  return (
    <CalculatorCard
      category="power"
      title="AC Power Calculator"
      description="Calculate AC power relationships: Active (P), Reactive (Q), and Apparent (S) power"
    >
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="System Type"
          value={phaseSystem}
          onChange={setPhaseSystem}
          options={[
            { value: 'single', label: 'Single Phase' },
            { value: 'three', label: 'Three Phase' },
          ]}
        />
        <CalculatorSelect
          label="Frequency"
          value={frequency}
          onChange={setFrequency}
          options={[
            { value: '50', label: '50 Hz (UK Standard)' },
            { value: '60', label: '60 Hz' },
          ]}
        />
      </CalculatorInputGrid>

      {/* Tabbed Input Methods */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 h-12 bg-white/5 rounded-xl p-1">
          <TabsTrigger
            value="voltage-current"
            className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400"
          >
            <Zap className="h-4 w-4" />
            <span>From V & I</span>
          </TabsTrigger>
          <TabsTrigger
            value="power-components"
            className="flex items-center gap-2 text-sm font-semibold rounded-lg data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-400"
          >
            <Battery className="h-4 w-4" />
            <span>From Power</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voltage-current" className="mt-4 space-y-4">
          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label={`Voltage (${voltageType})`}
              unit="V"
              type="text"
              inputMode="decimal"
              value={voltage}
              onChange={setVoltage}
              placeholder={phaseSystem === 'single' ? '230' : '400'}
              error={errors.voltage}
            />
            <CalculatorSelect
              label="Voltage Type"
              value={voltageType}
              onChange={setVoltageType}
              options={[
                { value: 'L-N', label: 'Line to Neutral' },
                ...(phaseSystem === 'three' ? [{ value: 'L-L', label: 'Line to Line' }] : []),
              ]}
            />
          </CalculatorInputGrid>

          <CalculatorInputGrid columns={2}>
            <CalculatorInput
              label={`Current (${currentType})`}
              unit="A"
              type="text"
              inputMode="decimal"
              value={current}
              onChange={setCurrent}
              placeholder="10"
              error={errors.current}
            />
            <CalculatorSelect
              label="Current Type"
              value={currentType}
              onChange={setCurrentType}
              options={[
                { value: 'line', label: 'Line Current' },
                ...(phaseSystem === 'three' ? [{ value: 'phase', label: 'Phase Current' }] : []),
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
              placeholder="0.85"
              hint="0 to 1"
              error={errors.powerFactor}
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

          <CalculatorInput
            label="Efficiency (%) - Optional"
            unit="%"
            type="text"
            inputMode="decimal"
            value={efficiency}
            onChange={setEfficiency}
            placeholder="90"
            error={errors.efficiency}
          />

          <CalculatorActions
            category="power"
            onCalculate={calculatePower}
            onReset={resetCalculator}
            isDisabled={!hasValidInputsVI()}
            calculateLabel="Calculate Power"
          />
        </TabsContent>

        <TabsContent value="power-components" className="mt-4 space-y-4">
          <CalculatorInputGrid columns={3}>
            <CalculatorInput
              label="Active Power (W)"
              unit="W"
              type="text"
              inputMode="decimal"
              value={activePower}
              onChange={setActivePower}
              placeholder="1000"
            />
            <CalculatorInput
              label="Reactive Power (VAr)"
              unit="VAr"
              type="text"
              inputMode="decimal"
              value={reactivePower}
              onChange={setReactivePower}
              placeholder="750"
            />
            <CalculatorInput
              label="Apparent Power (VA)"
              unit="VA"
              type="text"
              inputMode="decimal"
              value={apparentPower}
              onChange={setApparentPower}
              placeholder="1250"
            />
          </CalculatorInputGrid>

          <CalculatorActions
            category="power"
            onCalculate={calculateFromPowers}
            onReset={resetCalculator}
            isDisabled={!hasValidInputsPower()}
            calculateLabel="Calculate from Powers"
          />
        </TabsContent>
      </Tabs>

      {/* Results */}
      {results && (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            {/* PF Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
              <span className="text-xs font-semibold text-amber-300">PF</span>
              <span className={cn('text-sm font-semibold', status.color)}>{status.text}</span>
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
                {results.apparentPower?.toFixed(2)} VA
              </div>
            </div>

            {/* Result Cards */}
            <ResultsGrid columns={2}>
              <ResultValue
                label="Active Power (P)"
                value={results.activePower?.toFixed(2) || '0'}
                unit="W"
                category="power"
                size="sm"
              />
              <ResultValue
                label="Reactive Power (Q)"
                value={results.reactivePower?.toFixed(2) || '0'}
                unit="VAr"
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
                label="Phase Angle"
                value={results.phaseAngle?.toFixed(1) || '0'}
                unit="°"
                category="power"
                size="sm"
              />
            </ResultsGrid>

            {/* Current at Unity PF */}
            {results.currentAtUnity && (
              <div className="rounded-xl p-3 bg-white/[0.04]">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-sm text-white">Current at Unity PF:</span>
                  <span className="text-amber-400 font-mono text-lg font-bold">
                    {results.currentAtUnity.toFixed(2)} A
                  </span>
                </div>
              </div>
            )}

            {/* Protection Guidance */}
            {results.protectiveDeviceRange && (
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-white">
                    <strong>Indicative Protection:</strong> {results.protectiveDeviceRange}{' '}
                    (advisory only)
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Current Reduction Alert */}
          {results.currentAtUnity && results.current && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-400" />
                <p className="text-sm text-white">
                  Current reduction with unity PF:{' '}
                  {(((results.current - results.currentAtUnity) / results.current) * 100).toFixed(
                    1
                  )}
                  % lower
                </p>
              </div>
            </div>
          )}

          <CalculatorDivider category="power" />

          {/* How It Worked Out */}
          <Collapsible open={showCalculation} onOpenChange={setShowCalculation}>
            <CollapsibleTrigger className="calculator-collapsible-trigger w-full">
              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-purple-400" />
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
                      System: {phaseSystem === 'single' ? 'Single Phase' : 'Three Phase'}
                    </span>
                    {voltage && (
                      <span className="block">
                        Voltage (V): {voltage}V ({voltageType})
                      </span>
                    )}
                    {current && <span className="block">Current (I): {current}A</span>}
                    <span className="block">
                      Power Factor (cos φ): {powerFactor || '1.00'} {pfType}
                    </span>
                  </code>
                </div>

                {/* Step 2: Formula Applied */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">Step 2: Formula Applied</strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    {phaseSystem === 'single' ? (
                      <>
                        <span className="block text-amber-300">Single Phase Power:</span>
                        {voltage && current && (
                          <>
                            <span className="block">
                              S = V × I = {voltage} × {current} ={' '}
                              {results.apparentPower?.toFixed(2)} VA
                            </span>
                            <span className="block">
                              P = S × cos(φ) = {results.apparentPower?.toFixed(2)} ×{' '}
                              {powerFactor || '1'} = {results.activePower?.toFixed(2)} W
                            </span>
                            <span className="block">
                              Q = S × sin(φ) = {results.reactivePower?.toFixed(2)} VAr
                            </span>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="block text-amber-300">Three Phase Power:</span>
                        {voltage && current && (
                          <>
                            <span className="block">
                              S = √3 × V × I = 1.732 ×{' '}
                              {voltageType === 'L-N'
                                ? (parseFloat(voltage) * Math.sqrt(3)).toFixed(0)
                                : voltage}{' '}
                              × {current} = {results.apparentPower?.toFixed(2)} VA
                            </span>
                            <span className="block">
                              P = S × cos(φ) = {results.apparentPower?.toFixed(2)} ×{' '}
                              {powerFactor || '1'} = {results.activePower?.toFixed(2)} W
                            </span>
                            <span className="block">
                              Q = S × sin(φ) = {results.reactivePower?.toFixed(2)} VAr
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </code>
                </div>

                {/* Step 3: Phase Angle */}
                <div className="border-l-2 border-purple-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-purple-300">Step 3: Phase Angle</strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">
                      φ = cos⁻¹(PF) = cos⁻¹({powerFactor || '1'}) = {results.phaseAngle?.toFixed(1)}
                      °
                    </span>
                    <span className="block text-amber-300">
                      (
                      {pfType === 'lagging'
                        ? 'Current lags voltage (inductive load)'
                        : 'Current leads voltage (capacitive load)'}
                      )
                    </span>
                  </code>
                </div>

                {/* Step 4: Unity PF Comparison */}
                {results.currentAtUnity && (
                  <div className="border-l-2 border-purple-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-purple-300">Step 4: Unity PF Comparison</strong>
                    </p>
                    <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                      {phaseSystem === 'single' ? (
                        <span className="block">
                          I@unity = P / V = {results.activePower?.toFixed(2)} / {voltage} ={' '}
                          {results.currentAtUnity?.toFixed(2)} A
                        </span>
                      ) : (
                        <span className="block">
                          I@unity = P / (√3 × V) = {results.activePower?.toFixed(2)} / (1.732 ×{' '}
                          {voltageType === 'L-N'
                            ? (parseFloat(voltage) * Math.sqrt(3)).toFixed(0)
                            : voltage}
                          ) = {results.currentAtUnity?.toFixed(2)} A
                        </span>
                      )}
                      <span className="block text-green-400">
                        ✓ Improving PF to 1.0 would reduce current by{' '}
                        {(
                          ((results.current! - results.currentAtUnity) / results.current!) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </code>
                  </div>
                )}

                {/* Power Triangle Verification */}
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Power Triangle Verification</strong>
                  </p>
                  <code className="block mt-1 text-xs px-2.5 py-1.5 rounded-lg bg-black/20 text-white font-mono space-y-0.5">
                    <span className="block">
                      S² = P² + Q² → {results.apparentPower?.toFixed(0)}² ={' '}
                      {results.activePower?.toFixed(0)}² + {results.reactivePower?.toFixed(0)}²
                    </span>
                    <span className="block">
                      {(results.apparentPower! * results.apparentPower!).toFixed(0)} ≈{' '}
                      {(
                        results.activePower! * results.activePower! +
                        results.reactivePower! * results.reactivePower!
                      ).toFixed(0)}{' '}
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
                    <strong className="text-blue-300">Power Factor Impact</strong> {'—'} Lower PF
                    means higher current for same power output, increasing energy costs and cable
                    losses
                  </p>
                </div>

                {results.currentAtUnity && results.current && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Current Difference</strong> {'—'} At unity
                      PF, current would be {results.currentAtUnity?.toFixed(1)}A vs actual{' '}
                      {results.current?.toFixed(1)}A
                    </p>
                  </div>
                )}

                <div className="border-l-2 border-blue-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-blue-300">Energy Efficiency</strong> {'—'}{' '}
                    {results.powerFactor && results.powerFactor >= 0.95
                      ? 'Excellent efficiency - minimal reactive power'
                      : 'Consider power factor correction to reduce kVA demand'}
                  </p>
                </div>

                {phaseSystem === 'three' && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Three-Phase</strong> {'—'} Balanced loading
                      assumed - check individual phases for unbalance
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
                    <strong className="text-amber-300">Part 5 (Selection)</strong> {'—'} Equipment
                    rated for actual kVA, not just kW
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Voltage Drop</strong> {'—'} Calculate using
                    apparent power and actual current
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Protection</strong> {'—'} Overcurrent devices
                    sized for line current, not reduced current
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">Thermal Effects</strong> {'—'} Conductor
                    sizing based on design current including power factor
                  </p>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Power Triangle Reference */}
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-sm text-white">
                <strong>Power Triangle:</strong> S² = P² + Q² | Power Factor = P/S = cos(φ)
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorCard>
  );
};

export default ACPowerCalculator;
