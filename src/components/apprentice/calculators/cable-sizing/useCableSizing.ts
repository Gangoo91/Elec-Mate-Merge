
import { useState } from "react";
import { cableSizes, CableSizeOption } from "./cableSizeData";

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: "pvc" | "xlpe";
  voltageDrop: string;
  voltage: string;
}

export interface CableSizingErrors {
  [key: string]: string;
}

export interface CableSizingResult {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: CableSizingErrors;
}

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: "",
    length: "",
    installationType: "pvc",
    voltageDrop: "5",
    voltage: "230",
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
    
    if (!inputs.current) newErrors.current = "Current is required";
    else if (isNaN(parseFloat(inputs.current)) || parseFloat(inputs.current) <= 0) 
      newErrors.current = "Please enter a valid positive number";
    
    if (!inputs.length) newErrors.length = "Cable length is required";
    else if (isNaN(parseFloat(inputs.length)) || parseFloat(inputs.length) <= 0) 
      newErrors.length = "Please enter a valid positive number";
    
    if (!inputs.voltageDrop) newErrors.voltageDrop = "Voltage drop percentage is required";
    else if (isNaN(parseFloat(inputs.voltageDrop)) || parseFloat(inputs.voltageDrop) <= 0) 
      newErrors.voltageDrop = "Please enter a valid positive number";
    
    if (!inputs.voltage) newErrors.voltage = "Voltage is required";
    else if (isNaN(parseFloat(inputs.voltage)) || parseFloat(inputs.voltage) <= 0) 
      newErrors.voltage = "Please enter a valid positive number";
    
    setResult(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const calculateCableSize = () => {
    if (!validateInputs()) return;
    
    const currentAmp = parseFloat(inputs.current);
    const cableLength = parseFloat(inputs.length);
    const maxVoltageDrop = (parseFloat(inputs.voltageDrop) / 100) * parseFloat(inputs.voltage);
    
    // First filter by current carrying capacity
    const suitableCables = cableSizes.filter(cable => 
      cable.currentRating[inputs.installationType] >= currentAmp
    );
    
    if (suitableCables.length === 0) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          current: `Current exceeds maximum rating for available cables. Maximum current for ${inputs.installationType.toUpperCase()} insulation is ${
            Math.max(...cableSizes.map(c => c.currentRating[inputs.installationType]))
          }A`
        }
      });
      return;
    }
    
    // Then check voltage drop for each suitable cable
    const cablesWithVoltageDrop = suitableCables.map(cable => {
      const vDrop = cable.voltageDropPerAmpereMeter * currentAmp * cableLength;
      return {
        ...cable,
        calculatedVoltageDrop: vDrop,
        meetsVoltageDrop: vDrop <= maxVoltageDrop
      };
    });
    
    // Filter cables that meet voltage drop criteria
    const compliantCables = cablesWithVoltageDrop.filter(cable => cable.meetsVoltageDrop);
    
    if (compliantCables.length === 0) {
      // If no cables meet criteria, recommend parallel cables or higher voltage
      setResult({
        recommendedCable: null,
        alternativeCables: cablesWithVoltageDrop.sort((a, b) => 
          a.calculatedVoltageDrop! - b.calculatedVoltageDrop!
        ),
        errors: {
          general: "No single cable meets both current capacity and voltage drop requirements. Consider parallel cables or a higher voltage system."
        }
      });
      return;
    }
    
    // Recommend the smallest compliant cable
    const recommended = compliantCables[0];
    
    // Suggest alternatives (next size up)
    const alternatives = compliantCables.slice(1, 3);
    
    setResult({
      recommendedCable: recommended,
      alternativeCables: alternatives,
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
    calculateCableSize,
    resetCalculator,
  };
};
