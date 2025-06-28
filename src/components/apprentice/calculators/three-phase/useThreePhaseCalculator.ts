
import { useState } from 'react';

export const useThreePhaseCalculator = () => {
  const [power, setPower] = useState('');
  const [voltage, setVoltage] = useState('400');
  const [powerFactor, setPowerFactor] = useState('0.85');
  const [efficiency, setEfficiency] = useState('0.9');
  const [calculationMethod, setCalculationMethod] = useState<'power-to-current' | 'current-to-power'>('power-to-current');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [results, setResults] = useState<any>({});

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!power || parseFloat(power) <= 0) {
      newErrors.power = 'Power must be greater than 0';
    }
    
    if (!voltage || parseFloat(voltage) <= 0) {
      newErrors.voltage = 'Voltage must be greater than 0';
    }
    
    const pfValue = parseFloat(powerFactor);
    if (!powerFactor || pfValue <= 0 || pfValue > 1) {
      newErrors.powerFactor = 'Power factor must be between 0 and 1';
    }
    
    const effValue = parseFloat(efficiency);
    if (!efficiency || effValue <= 0 || effValue > 1) {
      newErrors.efficiency = 'Efficiency must be between 0 and 1';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateThreePhase = () => {
    if (!validateInputs()) return;
    
    const P = parseFloat(power) * 1000; // Convert to watts
    const V = parseFloat(voltage);
    const pf = parseFloat(powerFactor);
    const eff = parseFloat(efficiency);
    
    // Calculate line current
    const I_line = P / (Math.sqrt(3) * V * pf * eff);
    
    // Calculate phase current (same as line current for star connection)
    const I_phase = I_line;
    
    // Calculate apparent power
    const S = P / pf;
    
    // Calculate reactive power
    const Q = Math.sqrt(Math.pow(S, 2) - Math.pow(P, 2));
    
    // Calculate phase voltage (for star connection)
    const V_phase = V / Math.sqrt(3);
    
    // Calculate power per phase
    const P_phase = P / 3;
    
    // Calculate current density (assuming 2.5mm² cable as reference)
    const cableArea = 2.5; // mm²
    const currentDensity = I_line / cableArea;
    
    // Load balance check (assume balanced load)
    const unbalance = 0; // Perfect balance for calculation
    
    const newResults = {
      lineCurrent: I_line,
      phaseCurrent: I_phase,
      phaseVoltage: V_phase,
      apparentPower: S / 1000, // Convert back to kVA
      reactivePower: Q / 1000, // Convert to kVAR
      powerPerPhase: P_phase / 1000, // Convert to kW
      currentDensity,
      unbalance,
      efficiency: eff * 100, // Convert to percentage
      powerFactor: pf
    };
    
    setResults(newResults);
  };

  const resetCalculator = () => {
    setPower('');
    setVoltage('400');
    setPowerFactor('0.85');
    setEfficiency('0.9');
    setCalculationMethod('power-to-current');
    setErrors({});
    setResults({});
  };

  return {
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
  };
};
