import { useState } from 'react';
import { calculatePoolInstallation, PoolCalculationInputs, PoolCalculationResult } from '@/lib/swimming-pool';

export const useSwimmingPoolCalculator = () => {
  const [inputs, setInputs] = useState<PoolCalculationInputs>({
    poolType: 'private',
    poolVolume: 0,
    poolLength: 0,
    poolWidth: 0,
    poolDepth: 0,
    heaterPower: 0,
    pumpPower: 0,
    lighting: 0,
    filtrationSystem: 'sand',
    heatingType: 'electric',
    supplyVoltage: 230,
    earthingSystem: 'TN-C-S',
    zone: 'zone1',
    cableRunLength: 0,
    installationMethod: 'underground',
    ambientTemperature: 20,
    soilResistivity: 100,
    hasUnderwaterLighting: false,
    hasPoolCover: false,
    hasEmergencyStop: false,
    hasAccessibility: false
  });

  const [result, setResult] = useState<PoolCalculationResult | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: keyof PoolCalculationInputs, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (inputs.poolVolume <= 0) {
      newErrors.poolVolume = 'Pool volume must be greater than 0';
    }

    if (inputs.poolVolume > 0 && inputs.poolVolume < 1000) {
      newErrors.poolVolume = 'Pool volume seems too small (minimum 1000L recommended)';
    }

    if (inputs.heaterPower < 0) {
      newErrors.heaterPower = 'Heater power cannot be negative';
    }

    if (inputs.pumpPower <= 0) {
      newErrors.pumpPower = 'Pump power is required for pool circulation';
    }

    if (inputs.cableRunLength <= 0) {
      newErrors.cableRunLength = 'Cable run length must be specified';
    }

    if (inputs.cableRunLength > 100) {
      newErrors.cableRunLength = 'Cable runs over 100m require special consideration';
    }

    if (inputs.ambientTemperature < -20 || inputs.ambientTemperature > 60) {
      newErrors.ambientTemperature = 'Ambient temperature outside normal range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateValues = () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const calculationResult = calculatePoolInstallation(inputs);
      setResult(calculationResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'Calculation failed. Please check your inputs.' });
    }
  };

  const resetCalculator = () => {
    setInputs({
      poolType: 'private',
      poolVolume: 0,
      poolLength: 0,
      poolWidth: 0,
      poolDepth: 0,
      heaterPower: 0,
      pumpPower: 0,
      lighting: 0,
      filtrationSystem: 'sand',
      heatingType: 'electric',
      supplyVoltage: 230,
      earthingSystem: 'TN-C-S',
      zone: 'zone1',
      cableRunLength: 0,
      installationMethod: 'underground',
      ambientTemperature: 20,
      soilResistivity: 100,
      hasUnderwaterLighting: false,
      hasPoolCover: false,
      hasEmergencyStop: false,
      hasAccessibility: false
    });
    setResult(null);
    setErrors({});
  };

  return {
    inputs,
    result,
    errors,
    handleInputChange,
    calculateValues,
    resetCalculator,
    isValid: Object.keys(errors).length === 0
  };
};