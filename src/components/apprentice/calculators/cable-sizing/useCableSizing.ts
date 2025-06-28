
import { useState } from "react";
import { cableSizes, CableSizeOption } from "./cableSizeData";
import { CalculatorValidator, ValidationResult } from "@/services/calculatorValidation";

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: "pvc" | "xlpe";
  voltageDrop: string;
  voltage: string;
  cableType: string;
}

export interface CableSizingErrors {
  [key: string]: string;
}

export interface CableSizingResult {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: CableSizingErrors;
  validation?: ValidationResult;
}

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: "",
    length: "",
    installationType: "pvc",
    voltageDrop: "5",
    voltage: "230",
    cableType: "single"
  });
  const [result, setResult] = useState<CableSizingResult>({
    recommendedCable: null,
    alternativeCables: [],
    errors: {},
  });

  const updateInput = (field: keyof CableSizingInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (result.errors[field]) {
      clearError(field);
    }
  };

  const setInstallationType = (type: "pvc" | "xlpe") => {
    setInputs(prev => ({ ...prev, installationType: type }));
  };

  const setCableType = (type: string) => {
    setInputs(prev => ({ ...prev, cableType: type }));
  };

  const clearError = (field: string) => {
    if (result.errors[field]) {
      setResult(prev => ({
        ...prev,
        errors: Object.keys(prev.errors).reduce((acc, key) => {
          if (key !== field) acc[key] = prev.errors[key];
          return acc;
        }, {} as CableSizingErrors)
      }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: CableSizingErrors = {};
    
    // Enhanced validation with professional standards
    if (!inputs.current) {
      newErrors.current = "Current is required";
    } else {
      const currentValue = parseFloat(inputs.current);
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
    
    if (!inputs.length) {
      newErrors.length = "Cable length is required";
    } else {
      const lengthValue = parseFloat(inputs.length);
      if (isNaN(lengthValue) || lengthValue <= 0) {
        newErrors.length = "Please enter a valid positive number";
      } else {
        // Professional range validation
        const lengthValidation = CalculatorValidator.validateInputRange(lengthValue, 'length');
        if (!lengthValidation.isValid) {
          newErrors.length = lengthValidation.errors[0];
        }
      }
    }
    
    if (!inputs.voltageDrop) {
      newErrors.voltageDrop = "Voltage drop percentage is required";
    } else {
      const voltageDropValue = parseFloat(inputs.voltageDrop);
      if (isNaN(voltageDropValue) || voltageDropValue <= 0 || voltageDropValue > 15) {
        newErrors.voltageDrop = "Please enter a voltage drop percentage between 0.1% and 15%";
      }
    }
    
    if (!inputs.voltage) {
      newErrors.voltage = "Voltage is required";
    } else {
      const voltageValue = parseFloat(inputs.voltage);
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

    if (!inputs.cableType) {
      newErrors.cableType = "Cable type is required";
    }
    
    setResult(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const calculateCableSize = () => {
    if (!validateInputs()) return;
    
    const currentAmp = parseFloat(inputs.current);
    const cableLength = parseFloat(inputs.length);
    const maxVoltageDropPercentage = parseFloat(inputs.voltageDrop);
    const supplyVoltage = parseFloat(inputs.voltage);
    
    // Calculate maximum allowable voltage drop in volts
    const maxVoltageDrop = (maxVoltageDropPercentage / 100) * supplyVoltage;
    
    console.log(`Professional calculation: ${currentAmp}A, ${cableLength}m, max ${maxVoltageDropPercentage}% (${maxVoltageDrop}V)`);
    
    // Filter by cable type first
    const cablesByType = cableSizes.filter(cable => 
      cable.cableType === inputs.cableType
    );
    
    if (cablesByType.length === 0) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          cableType: `No cables found for type: ${inputs.cableType}`
        }
      });
      return;
    }
    
    // Get the appropriate current rating for each cable with BS 7671 safety margin
    const safetyMargin = 1.25; // BS 7671 derating factor
    const requiredCurrentCapacity = currentAmp * safetyMargin;
    
    const suitableCables = cablesByType.filter(cable => {
      let currentRating = 0;
      
      // Choose the correct current rating based on cable type and insulation
      if (inputs.cableType === 'swa' && cable.currentRating.swa) {
        currentRating = cable.currentRating.swa;
      } else if (inputs.cableType === 'lsf' && cable.currentRating.lsf) {
        currentRating = cable.currentRating.lsf;
      } else if (inputs.cableType === 'armored' && cable.currentRating.armored) {
        currentRating = cable.currentRating.armored;
      } else {
        currentRating = cable.currentRating[inputs.installationType];
      }
      
      return currentRating >= requiredCurrentCapacity;
    });
    
    if (suitableCables.length === 0) {
      const maxCurrentAvailable = Math.max(...cablesByType.map(c => {
        if (inputs.cableType === 'swa' && c.currentRating.swa) return c.currentRating.swa;
        if (inputs.cableType === 'lsf' && c.currentRating.lsf) return c.currentRating.lsf;
        if (inputs.cableType === 'armored' && c.currentRating.armored) return c.currentRating.armored;
        return c.currentRating[inputs.installationType];
      }));
      
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          current: `Current (${currentAmp}A + 25% safety margin = ${requiredCurrentCapacity.toFixed(1)}A) exceeds maximum rating for ${inputs.cableType} cables (${maxCurrentAvailable}A max)`
        }
      });
      return;
    }
    
    // Enhanced voltage drop calculation with professional accuracy
    const cablesWithVoltageDrop = suitableCables.map(cable => {
      // Professional formula: Voltage Drop = (R × Current × Length) considering AC resistance
      const voltageDropVolts = cable.voltageDropPerAmpereMeter * currentAmp * cableLength;
      
      console.log(`Professional analysis - ${cable.size}: ${voltageDropVolts.toFixed(3)}V drop (${((voltageDropVolts/supplyVoltage)*100).toFixed(2)}%)`);
      
      return {
        ...cable,
        calculatedVoltageDrop: voltageDropVolts,
        meetsVoltageDrop: voltageDropVolts <= maxVoltageDrop
      };
    });
    
    // Sort by cable size (ascending) for professional presentation
    cablesWithVoltageDrop.sort((a, b) => {
      const sizeA = parseFloat(a.size.replace(/[^\d.]/g, ''));
      const sizeB = parseFloat(b.size.replace(/[^\d.]/g, ''));
      return sizeA - sizeB;
    });
    
    // Filter cables that meet voltage drop criteria
    const compliantCables = cablesWithVoltageDrop.filter(cable => cable.meetsVoltageDrop);
    
    if (compliantCables.length === 0) {
      // Professional feedback for non-compliant results
      const sortedByVoltageDrop = cablesWithVoltageDrop.sort((a, b) => 
        a.calculatedVoltageDrop! - b.calculatedVoltageDrop!
      );
      
      const bestCable = sortedByVoltageDrop[0];
      const actualVoltageDropPercent = ((bestCable.calculatedVoltageDrop!/supplyVoltage)*100);
      
      setResult({
        recommendedCable: null,
        alternativeCables: sortedByVoltageDrop.slice(0, 3),
        errors: {
          general: `No cable meets BS 7671 voltage drop requirements. Best available: ${bestCable.size} with ${bestCable.calculatedVoltageDrop?.toFixed(2)}V (${actualVoltageDropPercent.toFixed(1)}%) drop. Consider: larger cable, voltage boosting, or shorter route.`
        }
      });
      return;
    }
    
    // Professional recommendation: smallest compliant cable
    const recommended = compliantCables[0];
    const alternatives = compliantCables.slice(1, 4);
    
    // Professional validation using our enhanced validation service
    const validation = CalculatorValidator.validateCableSizing(
      currentAmp,
      recommended.size,
      inputs.installationType,
      recommended.calculatedVoltageDrop!,
      cableLength
    );
    
    setResult({
      recommendedCable: recommended,
      alternativeCables: alternatives,
      errors: {},
      validation
    });
  };

  const resetCalculator = () => {
    setInputs({
      current: "",
      length: "",
      installationType: "pvc",
      voltageDrop: "5",
      voltage: "230",
      cableType: "single",
    });
    setResult({
      recommendedCable: null,
      alternativeCables: [],
      errors: {},
    });
  };

  return {
    inputs,
    result,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator,
  };
};
