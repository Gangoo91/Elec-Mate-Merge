
import { useState } from "react";

export const useCalculator = () => {
  const [activePower, setActivePower] = useState<string>("");
  const [apparentPower, setApparentPower] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [calculationMethod, setCalculationMethod] = useState<"power" | "currentVoltage">("power");
  const [powerFactor, setPowerFactor] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (calculationMethod === "power") {
      if (!activePower) newErrors.activePower = "Active power is required";
      else if (isNaN(parseFloat(activePower)) || parseFloat(activePower) <= 0) 
        newErrors.activePower = "Please enter a valid positive number";
      
      if (!apparentPower) newErrors.apparentPower = "Apparent power is required";
      else if (isNaN(parseFloat(apparentPower)) || parseFloat(apparentPower) <= 0) 
        newErrors.apparentPower = "Please enter a valid positive number";
      
      if (apparentPower && activePower && parseFloat(activePower) > parseFloat(apparentPower)) 
        newErrors.activePower = "Active power cannot be greater than apparent power";
    } else {
      if (!current) newErrors.current = "Current is required";
      else if (isNaN(parseFloat(current)) || parseFloat(current) <= 0) 
        newErrors.current = "Please enter a valid positive number";
      
      if (!voltage) newErrors.voltage = "Voltage is required";
      else if (isNaN(parseFloat(voltage)) || parseFloat(voltage) <= 0) 
        newErrors.voltage = "Please enter a valid positive number";
      
      if (!activePower) newErrors.activePower = "Active power is required";
      else if (isNaN(parseFloat(activePower)) || parseFloat(activePower) <= 0) 
        newErrors.activePower = "Please enter a valid positive number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePowerFactor = () => {
    if (!validateInputs()) return;
    
    let pf: number;
    
    if (calculationMethod === "power") {
      const active = parseFloat(activePower);
      const apparent = parseFloat(apparentPower);
      pf = active / apparent;
    } else {
      const active = parseFloat(activePower);
      const volts = parseFloat(voltage);
      const amps = parseFloat(current);
      const apparent = volts * amps;
      pf = active / apparent;
    }
    
    // Power factor cannot be greater than 1 by definition
    pf = Math.min(pf, 1);
    setPowerFactor(pf.toFixed(3));
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      const newErrors = {...errors};
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const resetCalculator = () => {
    setActivePower("");
    setApparentPower("");
    setCurrent("");
    setVoltage("");
    setPowerFactor(null);
    setErrors({});
  };

  return {
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
    setPowerFactor,
    errors,
    setErrors,
    validateInputs,
    calculatePowerFactor,
    clearError,
    resetCalculator
  };
};
