import { Info, BookOpen, TrendingDown, ChevronDown } from 'lucide-react';
import { useCalculator } from './power-factor/useCalculator';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const PowerFactorCalculator = () => {
  const {
    activePower,
    setActivePower,
    apparentPower,
    setApparentPower,
    current,
    setCurrent,
    voltage,
    setVoltage,
    calculationMethod,
    setCalculationMethod,
    powerFactor,
    errors,
    calculatePowerFactor,
    clearError,
    resetCalculator,
    targetPF,
    setTargetPF,
    pfType,
    setPfType,
    capacitorKVAr,
    currentAfterCorrection,
  } = useCalculator();

  const [showGuidance, setShowGuidance] = useState(false);
  const [showBsRegs, setShowBsRegs] = useState(false);
  const config = CALCULATOR_CONFIG['power'];

  const getResultStatus = () => {
    if (powerFactor === null) return { text: 'Enter values to calculate', color: 'text-white' };
    const pf = parseFloat(powerFactor);
    if (pf >= 0.95) return { text: 'Excellent efficiency', color: 'text-green-400' };
    if (pf >= 0.85) return { text: 'Good efficiency', color: 'text-amber-400' };
    return { text: 'Poor efficiency - consider correction', color: 'text-red-400' };
  };

  const hasValidInputs = () => {
    if (calculationMethod === 'power') {
      return activePower && apparentPower;
    }
    return voltage && current && activePower;
  };

  const status = getResultStatus();

  return (
    <CalculatorCard
      category="power"
      title="Power Factor Calculator"
      description="Calculate power factor from power values or electrical parameters"
    >
      {/* Calculation Method Selector */}
      <CalculatorSelect
        label="Calculation Method"
        value={calculationMethod}
        onChange={(value) => setCalculationMethod(value as 'power' | 'currentVoltage')}
        options={[
          { value: 'power', label: 'From Power Values' },
          { value: 'currentVoltage', label: 'From Electrical Parameters' },
        ]}
      />

      {/* Input Fields based on method */}
      {calculationMethod === 'power' ? (
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Active Power"
            unit="W"
            type="text"
            inputMode="decimal"
            value={activePower}
            onChange={setActivePower}
            placeholder="e.g., 2000"
            error={errors.activePower}
          />
          <CalculatorInput
            label="Apparent Power"
            unit="VA"
            type="text"
            inputMode="decimal"
            value={apparentPower}
            onChange={setApparentPower}
            placeholder="e.g., 2300"
            error={errors.apparentPower}
          />
        </CalculatorInputGrid>
      ) : (
        <CalculatorInputGrid columns={2}>
          <CalculatorInput
            label="Voltage"
            unit="V"
            type="text"
            inputMode="decimal"
            value={voltage}
            onChange={setVoltage}
            placeholder="e.g., 230"
            error={errors.voltage}
          />
          <CalculatorInput
            label="Current"
            unit="A"
            type="text"
            inputMode="decimal"
            value={current}
            onChange={setCurrent}
            placeholder="e.g., 10"
            error={errors.current}
          />
          <CalculatorInput
            label="Active Power"
            unit="W"
            type="text"
            inputMode="decimal"
            value={activePower}
            onChange={setActivePower}
            placeholder="e.g., 2000"
            error={errors.activePower}
            className="sm:col-span-2"
          />
        </CalculatorInputGrid>
      )}

      {/* PF Type and Target */}
      <CalculatorInputGrid columns={2}>
        <CalculatorSelect
          label="Power Factor Type"
          value={pfType}
          onChange={setPfType}
          options={[
            { value: 'lagging', label: 'Lagging (Inductive loads)' },
            { value: 'leading', label: 'Leading (Capacitive loads)' },
          ]}
        />
        {pfType === 'lagging' && (
          <CalculatorInput
            label="Target PF for Correction"
            type="text"
            inputMode="decimal"
            value={targetPF}
            onChange={setTargetPF}
            placeholder="0.95"
            hint="Typical target: 0.95"
          />
        )}
      </CalculatorInputGrid>

      {/* Action Buttons */}
      <CalculatorActions
        category="power"
        onCalculate={calculatePowerFactor}
        onReset={resetCalculator}
        isDisabled={!hasValidInputs()}
      />

      {/* Results */}
      {powerFactor && (
        <>
          <CalculatorDivider category="power" />

          <div className="space-y-4 animate-fade-in">
            {/* Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20">
              <span className="text-xs font-semibold text-amber-300">PF</span>
              <span className={cn('text-sm font-semibold', status.color)}>{status.text}</span>
            </div>

            {/* Hero — Power Factor */}
            <div className="text-center py-3">
              <p className="text-sm text-white mb-1">Power Factor</p>
              <div
                className="text-4xl font-bold bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
                }}
              >
                {parseFloat(powerFactor).toFixed(3)}
              </div>
            </div>

            {/* Method & Efficiency */}
            <div className="rounded-xl p-3 bg-white/[0.04] space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white">Method:</span>
                <span className="text-white">
                  {calculationMethod === 'power' ? 'Power Values' : 'V/I Parameters'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white">Efficiency Rating:</span>
                <span
                  className={
                    parseFloat(powerFactor) >= 0.95
                      ? 'text-green-400'
                      : parseFloat(powerFactor) >= 0.85
                        ? 'text-amber-400'
                        : 'text-red-400'
                  }
                >
                  {parseFloat(powerFactor) >= 0.95
                    ? 'Excellent'
                    : parseFloat(powerFactor) >= 0.85
                      ? 'Good'
                      : 'Poor'}
                </span>
              </div>
            </div>

            {/* Correction Results */}
            {capacitorKVAr && targetPF && pfType === 'lagging' && (
              <ResultsGrid columns={2}>
                <ResultValue
                  label="Capacitor Needed"
                  value={capacitorKVAr}
                  unit="kVAr"
                  category="power"
                  size="sm"
                />
                {currentAfterCorrection && (
                  <ResultValue
                    label="Current After Correction"
                    value={currentAfterCorrection}
                    unit="A"
                    category="power"
                    size="sm"
                  />
                )}
              </ResultsGrid>
            )}
          </div>

          {/* Current Reduction Alert */}
          {capacitorKVAr && currentAfterCorrection && parseFloat(current) > 0 && (
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-400" />
                <p className="text-sm text-white">
                  Current reduction with PF correction:{' '}
                  {(
                    ((parseFloat(current) - parseFloat(currentAfterCorrection)) /
                      parseFloat(current)) *
                    100
                  ).toFixed(1)}
                  % lower
                </p>
              </div>
            </div>
          )}

          <CalculatorDivider category="power" />

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
                    <strong className="text-blue-300">Power Factor Quality</strong> {'—'}{' '}
                    {parseFloat(powerFactor) >= 0.95
                      ? 'Excellent - minimal reactive power waste'
                      : parseFloat(powerFactor) >= 0.85
                        ? 'Acceptable for most applications'
                        : 'Poor - significant energy inefficiency'}
                  </p>
                </div>
                {pfType === 'lagging' && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Inductive Load</strong> {'—'} Current lags
                      voltage - typical of motors, transformers, fluorescent lighting
                    </p>
                  </div>
                )}
                {pfType === 'leading' && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Capacitive Load</strong> {'—'} Current leads
                      voltage - can cause voltage regulation issues
                    </p>
                  </div>
                )}
                {capacitorKVAr && (
                  <div className="border-l-2 border-blue-400/40 pl-3">
                    <p className="text-sm text-white">
                      <strong className="text-blue-300">Correction Benefits</strong> {'—'} Reduced
                      kVA demand, lower energy costs, improved voltage regulation, reduced cable
                      losses
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
                    <strong className="text-amber-300">512.1.2</strong> {'—'} Equipment selection
                    must consider power factor and efficiency
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">525</strong> {'—'} Voltage drop calculations
                    must account for both active and reactive power
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">523</strong> {'—'} Conductor sizing based on
                    design current, not reduced current from poor PF
                  </p>
                </div>
                <div className="border-l-2 border-amber-400/40 pl-3">
                  <p className="text-sm text-white">
                    <strong className="text-amber-300">534</strong> {'—'} Capacitor banks require
                    appropriate protection and switching
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
                <strong>Power Factor</strong> = Active Power ÷ Apparent Power. Typical target: 0.95.
              </p>
            </div>
          </div>
        </>
      )}
    </CalculatorCard>
  );
};

export default PowerFactorCalculator;
