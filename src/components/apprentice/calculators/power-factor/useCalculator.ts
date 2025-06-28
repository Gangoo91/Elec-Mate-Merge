
import { useState } from "react";
import { CalculatorValidator, ValidationResult } from "@/services/calculatorValidation";

export const useCalculator = () => {
  const [activePower, setActivePower] = useState<string>("");
  const [apparentPower, setApparentPower] = useState<string>("");
  const [current, setCurrent] = useState<string>("");
  const [voltage, setVoltage] = useState<string>("");
  const [calculationMethod, setCalculationMethod] = useState<"power" | "currentVoltage">("power");
  const [powerFactor, setPowerFactor] = useState<string | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateInputs = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (calculationMethod === "power") {
      // Enhanced validation for power method
      if (!activePower) {
        newErrors.activePower = "Active power is required";
      } else {
        const activeValue = parseFloat(activePower);
        if (isNaN(activeValue) || activeValue <= 0) {
          newErrors.activePower = "Please enter a valid positive number";
        } else if (activeValue > 1000000) { // 1MW limit for practical applications
          newErrors.activePower = "Active power exceeds practical limit (1MW max)";
        }
      }
      
      if (!apparentPower) {
        newErrors.apparentPower = "Apparent power is required";
      } else {
        const apparentValue = parseFloat(apparentPower);
        if (isNaN(apparentValue) || apparentValue <= 0) {
          newErrors.apparentPower = "Please enter a valid positive number";
        } else if (apparentValue > 1000000) { // 1MVA limit
          newErrors.apparentPower = "Apparent power exceeds practical limit (1MVA max)";
        }
      }
      
      // Professional validation: Active power cannot exceed apparent power
      if (apparentPower && activePower) {
        const activeValue = parseFloat(activePower);
        const apparentValue = parseFloat(apparentPower);
        if (!isNaN(activeValue) && !isNaN(apparentValue) && activeValue > apparentValue) {
          newErrors.activePower = "Active power cannot exceed apparent power (violates fundamental electrical principles)";
        }
      }
    } else {
      // Enhanced validation for current/voltage method
      if (!current) {
        newErrors.current = "Current is required";
      } else {
        const currentValue = parseFloat(current);
        if (isNaN(currentValue) || currentValue <= 0) {
          newErrors.current = "Please enter a valid positive number";
        } else {
          // Professional range validation
          const currentValidation = CalculatorValidator.validateInputRange(currentValue, 'current');
          if (!currentValidation.isValid) {
            newErrors.current = currentValidation.errors[0];
          }
        }
      }
      
      if (!voltage) {
        newErrors.voltage = "Voltage is required";
      } else {
        const voltageValue = parseFloat(voltage);
        if (isNaN(voltageValue) || voltageValue <= 0) {
          newErrors.voltage = "Please enter a valid positive number";
        } else {
          // Professional range validation
          const voltageValidation = CalculatorValidator.validateInputRange(voltageValue, 'voltage');
          if (!voltageValidation.isValid) {
            newErrors.voltage = voltageValidation.errors[0];
          }
        }
      }
      
      if (!activePower) {
        newErrors.activePower = "Active power is required for this calculation method";
      } else {
        const activeValue = parseFloat(activePower);
        if (isNaN(activeValue) || activeValue <= 0) {
          newErrors.activePower = "Please enter a valid positive number";
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculatePowerFactor = () => {
    if (!validateInputs()) return;
    
    let pf: number;
    let activeValue: number;
    let apparentValue: number;
    
    if (calculationMethod === "power") {
      // Professional calculation: Power Factor = Active Power / Apparent Power
      activeValue = parseFloat(activePower);
      apparentValue = parseFloat(apparentPower);
      pf = activeValue / apparentValue;
    } else {
      // Professional calculation: Power Factor = Active Power / (Voltage × Current)
      activeValue = parseFloat(activePower);
      const volts = parseFloat(voltage);
      const amps = parseFloat(current);
      apparentValue = volts * amps;
      
      // Enhanced validation: Active power cannot exceed apparent power
      if (activeValue > apparentValue) {
        setErrors({ 
          activePower: `Active power (${activeValue}W) cannot exceed apparent power (${apparentValue.toFixed(1)}VA) - Check input values` 
        });
        return;
      }
      
      pf = activeValue / apparentValue;
    }
    
    // Professional bounds checking
    pf = Math.min(Math.max(pf, 0), 1);
    
    // Enhanced validation using professional standards
    const pfValidation = CalculatorValidator.validatePowerFactor(
      activeValue,
      apparentValue,
      pf
    );
    
    setValidation(pfValidation);
    setPowerFactor(pf.toFixed(4)); // Professional precision to 4 decimal places
    
    // Clear any previous errors if calculation is successful
    if (pfValidation.isValid) {
      setErrors({});
    } else {
      // Set professional error messages
      const validationErrors: {[key: string]: string} = {};
      pfValidation.errors.forEach(error => {
        validationErrors.general = error;
      });
      setErrors(validationErrors);
    }
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
    setValidation(null);
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
    validation,
    errors,
    setErrors,
    validateInputs,
    calculatePowerFactor,
    clearError,
    resetCalculator
  };
};
