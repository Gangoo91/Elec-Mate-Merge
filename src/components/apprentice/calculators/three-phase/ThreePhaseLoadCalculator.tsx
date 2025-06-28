
import React, { useState } from 'react';
import { Zap } from 'lucide-react';
import EnhancedCalculatorWrapper from '../enhanced/EnhancedCalculatorWrapper';
import ThreePhaseInputs from './ThreePhaseInputs';
import ThreePhaseResults from './ThreePhaseResults';
import ThreePhaseInfo from './ThreePhaseInfo';
import { useThreePhaseCalculator } from './useThreePhaseCalculator';

const ThreePhaseLoadCalculator = () => {
  const {
    power,
    setPower,
    voltage,
    setVoltage,
    powerFactor,
    setPowerFactor,
    efficiency,
    setEfficiency,
    calculationMethod,
    setCalculationMethod,
    results,
    errors,
    clearError,
    calculateThreePhase,
    resetCalculator
  } = useThreePhaseCalculator();

  const inputs = {
    power,
    voltage,
    powerFactor,
    efficiency,
    calculationMethod
  };

  const handlePresetSelect = (preset: any) => {
    if (preset.inputs.power) setPower(preset.inputs.power);
    if (preset.inputs.voltage) setVoltage(preset.inputs.voltage);
    if (preset.inputs.powerFactor) setPowerFactor(preset.inputs.powerFactor);
    if (preset.inputs.efficiency) setEfficiency(preset.inputs.efficiency);
  };

  return (
    <EnhancedCalculatorWrapper
      calculatorType="three-phase-load"
      title="Three Phase Load Calculator"
      description="Calculate current, power distribution, and load balance for three-phase electrical systems with BS 7671 compliance validation."
      icon={<Zap className="h-5 w-5 text-elec-yellow" />}
      inputsComponent={
        <ThreePhaseInputs
          power={power}
          setPower={setPower}
          voltage={voltage}
          setVoltage={setVoltage}
          powerFactor={powerFactor}
          setPowerFactor={setPowerFactor}
          efficiency={efficiency}
          setEfficiency={setEfficiency}
          calculationMethod={calculationMethod}
          setCalculationMethod={setCalculationMethod}
          errors={errors}
          clearError={clearError}
          onCalculate={calculateThreePhase}
          onReset={resetCalculator}
        />
      }
      resultsComponent={<ThreePhaseResults results={results} />}
      infoComponent={<ThreePhaseInfo />}
      inputs={inputs}
      results={results}
      onCalculate={calculateThreePhase}
      onReset={resetCalculator}
      onPresetSelect={handlePresetSelect}
      professionalMode={true}
    />
  );
};

export { ThreePhaseLoadCalculator };
