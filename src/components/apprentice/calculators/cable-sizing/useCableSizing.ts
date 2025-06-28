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

  const validateCableSize = (current: number, cableSize: number, installationType: string) => {
    const currentRatings = {
      'Method A (enclosed in conduit)': { 1.0: 11, 1.5: 14.5, 2.5: 20, 4.0: 26, 6.0: 34 },
      'Method B (on cable tray)': { 1.0: 13, 1.5: 17.5, 2.5: 24, 4.0: 32, 6.0: 41 },
      'Method C (clipped direct)': { 1.0: 15, 1.5: 19.5, 2.5: 27, 4.0: 36, 6.0: 46 }
    };

    const ratings = currentRatings[installationType as keyof typeof currentRatings] || currentRatings['Method C (clipped direct)'];
    const rating = ratings[cableSize as keyof typeof ratings];

    return rating ? current <= rating : false;
  };

  const calculateCableSize = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!inputs.current) newErrors.current = 'Current is required';
    if (!inputs.length) newErrors.length = 'Length is required';
    if (!inputs.voltage) newErrors.voltage = 'Voltage is required';
    if (!inputs.voltageDrop) newErrors.voltageDrop = 'Voltage drop is required';

    if (Object.keys(newErrors).length > 0) {
      setResult({ errors: newErrors });
      return;
    }

    // Convert string inputs to numbers
    const current = parseFloat(inputs.current);
    const length = parseFloat(inputs.length);
    const voltage = parseFloat(inputs.voltage);
    const voltageDropPercent = parseFloat(inputs.voltageDrop);
    const allowedVoltageDrop = (voltage * voltageDropPercent) / 100;

    // Find suitable cable sizes
    const suitableCables = cableSizes[inputs.cableType]?.filter(cable => {
      const currentOk = validateCableSize(current, parseFloat(cable.size), inputs.installationType);
      const voltageDropOk = (cable.voltageDropPerAmpereMeter * current * length) <= allowedVoltageDrop;
      return currentOk && voltageDropOk;
    });

    if (!suitableCables || suitableCables.length === 0) {
      setResult({ 
        errors: { 
          calculation: 'No suitable cable size found for these parameters. Consider higher rated cable or shorter run length.' 
        } 
      });
      return;
    }

    // Get the smallest suitable cable
    const recommendedCable = suitableCables[0];
    const alternativeCables = suitableCables.slice(1, 3);

    setResult({
      recommendedCable,
      alternativeCables,
      errors: {}
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
