import { useCalculator } from './power-factor/useCalculator';
import {
  CalculatorCard,
  CalculatorInputGrid,
  CalculatorInput,
  CalculatorSelect,
  CalculatorActions,
  CalculatorResult,
  ResultHeadline,
  ResultValue,
  ResultsGrid,
  CalculatorEditorial,
  CalculatorPanes,
} from '@/components/calculators/shared';
import { powerFactorContent } from './content/power-factor';

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
    phases,
    setPhases,
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

  const getResultStatus = () => {
    if (powerFactor === null) return { text: 'Enter values to calculate', color: 'text-white' };
    const pf = parseFloat(powerFactor);
    if (pf >= 0.95) return { text: 'Excellent efficiency', color: 'text-green-400' };
    if (pf >= 0.85) return { text: 'Good efficiency', color: 'text-amber-400' };
    // A leading power factor is corrected by removing capacitance or adding
    // inductance. The old copy said "consider correction" for both types, which on
    // a leading system reads as "add capacitors" — that makes it worse. These
    // thresholds are UI guidance only: BS 7671 sets no numeric power-factor limit
    // (Reg 331.1(l) requires power factor to be assessed, no value given).
    return pfType === 'leading'
      ? { text: 'Poor efficiency - reduce capacitance', color: 'text-red-400' }
      : { text: 'Poor efficiency - consider correction', color: 'text-red-400' };
  };

  const hasValidInputs = () => {
    if (calculationMethod === 'power') {
      return activePower && apparentPower;
    }
    return voltage && current && activePower;
  };

  const status = getResultStatus();
  const pf = powerFactor === null ? null : parseFloat(powerFactor);
  const rating = pf === null ? '' : pf >= 0.95 ? 'Excellent' : pf >= 0.85 ? 'Good' : 'Poor';
  const methodLabel =
    calculationMethod === 'power'
      ? 'Power values'
      : `V/I (${phases === 'three' ? 'three-phase' : 'single-phase'})`;
  const showCorrection = Boolean(capacitorKVAr && targetPF && pfType === 'lagging');

  /*
    The answer, rebuilt on the shared result kit.

    It was a centred 4xl figure painted with `bg-clip-text` over the category
    gradient, above a Method/Efficiency box whose labels sat hard left and values
    hard right — on a wide window that is a label and a value separated by more
    than a thousand pixels of nothing. Everything else on the page is left
    aligned, so the one number you came for was the only centred thing on it.

    Now: one headline, then the supporting figures in a 2-up grid. A poor power
    factor renders red rather than volt — volt is the good answer throughout the
    app, and showing 0.107 in the same colour as 0.99 is worse than no colour.
  */
  const resultPane =
    pf === null ? null : (
      <CalculatorResult category="power" variant={pf < 0.85 ? 'warning' : 'success'}>
        <ResultHeadline
          label="Power factor"
          value={pf.toFixed(3)}
          caption={status.text}
          tone={pf < 0.85 ? 'negative' : 'default'}
        />

        <ResultsGrid columns={2}>
          <ResultValue label="Efficiency" value={rating} category="power" size="sm" />
          <ResultValue label="Method" value={methodLabel} category="power" size="sm" />
          {showCorrection && (
            <ResultValue
              label="Capacitor needed"
              value={capacitorKVAr}
              unit="kVAr"
              category="power"
              size="sm"
            />
          )}
          {showCorrection && currentAfterCorrection && (
            <ResultValue
              label="Current after correction"
              value={currentAfterCorrection}
              unit="A"
              category="power"
              size="sm"
            />
          )}
        </ResultsGrid>

        {capacitorKVAr && currentAfterCorrection && parseFloat(current) > 0 && (
          <p className="text-[12.5px] leading-relaxed text-white">
            Correction cuts the current by{' '}
            {(
              ((parseFloat(current) - parseFloat(currentAfterCorrection)) / parseFloat(current)) *
              100
            ).toFixed(1)}
            %.
          </p>
        )}

        {/* The kVAr figure was previously given with no mention of stored charge.
            Reg 416.2.5 requires a warning label where a capacitor that may retain a
            dangerous charge is behind a barrier or in an enclosure; Reg 559.7
            requires discharge resistors over 0.5 uF and compliance with BS EN 61048. */}
        {showCorrection && (
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3">
            <p className="text-[12.5px] leading-relaxed text-white">
              <strong>Before you fit it</strong> — a capacitor can hold a dangerous charge after
              switch-off. Reg 416.2.5 requires a warning label where such a capacitor is behind a
              barrier or in an enclosure, and Reg 559.7 requires discharge resistors for
              compensation capacitors over 0.5 µF (to BS EN 61048). Where the installation has
              significant harmonic content, capacitor banks can resonate with the supply inductance
              — that needs a specialist harmonic study, which this calculator does not do.
            </p>
          </div>
        )}
      </CalculatorResult>
    );

  return (
    <CalculatorCard
      category="power"
      title="Power Factor Calculator"
      description="Calculate power factor from power values or electrical parameters"
    >
      <CalculatorPanes
        copyTitle="Power Factor"
        result={resultPane}
        placeholder="Enter your values and press Calculate — the power factor, efficiency rating and any correction figure appear here."
        footer={<CalculatorEditorial content={powerFactorContent} category="power" />}
        form={
          <>
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
              <>
                {/* Apparent power from V and I depends on the supply arrangement:
              single-phase S = V x I; three-phase S = sqrt(3) x V(line) x I(line). */}
                <CalculatorSelect
                  label="Supply"
                  value={phases}
                  onChange={(value) => setPhases(value as 'single' | 'three')}
                  options={[
                    { value: 'single', label: 'Single-phase (S = V × I)' },
                    { value: 'three', label: 'Three-phase (S = √3 × V × I)' },
                  ]}
                />
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
              </>
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
          </>
        }
      />
    </CalculatorCard>
  );
};

export default PowerFactorCalculator;
