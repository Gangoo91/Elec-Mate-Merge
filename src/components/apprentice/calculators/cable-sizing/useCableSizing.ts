
import { useState } from "react";
import { cableSizes, CableSizeOption } from "./cableSizeData";

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

    if (!inputs.cableType) newErrors.cableType = "Cable type is required";
    
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
    
    console.log(`Calculating for: ${currentAmp}A, ${cableLength}m, max ${maxVoltageDropPercentage}% (${maxVoltageDrop}V)`);
    
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
    
    // Get the appropriate current rating for each cable
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
      
      return currentRating >= currentAmp;
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
          current: `Current (${currentAmp}A) exceeds maximum rating for ${inputs.cableType} cables (${maxCurrentAvailable}A max)`
        }
      });
      return;
    }
    
    // Calculate voltage drop for each suitable cable
    // Formula: Voltage Drop = (mV/A/m × Current × Length) / 1000
    const cablesWithVoltageDrop = suitableCables.map(cable => {
      const voltageDropMillivolts = cable.voltageDropPerAmpereMeter * currentAmp * cableLength;
      const voltageDropVolts = voltageDropMillivolts; // Data is already in V/A/m, not mV/A/m
      
      console.log(`${cable.size}: ${voltageDropVolts.toFixed(3)}V drop (${((voltageDropVolts/supplyVoltage)*100).toFixed(2)}%)`);
      
      return {
        ...cable,
        calculatedVoltageDrop: voltageDropVolts,
        meetsVoltageDrop: voltageDropVolts <= maxVoltageDrop
      };
    });
    
    // Sort by cable size (ascending)
    cablesWithVoltageDrop.sort((a, b) => {
      const sizeA = parseFloat(a.size.replace(/[^\d.]/g, ''));
      const sizeB = parseFloat(b.size.replace(/[^\d.]/g, ''));
      return sizeA - sizeB;
    });
    
    // Filter cables that meet voltage drop criteria
    const compliantCables = cablesWithVoltageDrop.filter(cable => cable.meetsVoltageDrop);
    
    if (compliantCables.length === 0) {
      // Show the best options even if none are compliant
      const sortedByVoltageDrop = cablesWithVoltageDrop.sort((a, b) => 
        a.calculatedVoltageDrop! - b.calculatedVoltageDrop!
      );
      
      setResult({
        recommendedCable: null,
        alternativeCables: sortedByVoltageDrop.slice(0, 3),
        errors: {
          general: `No cable meets both requirements. Minimum voltage drop: ${sortedByVoltageDrop[0].calculatedVoltageDrop?.toFixed(2)}V (${((sortedByVoltageDrop[0].calculatedVoltageDrop!/supplyVoltage)*100).toFixed(1)}%)`
        }
      });
      return;
    }
    
    // Recommend the smallest compliant cable
    const recommended = compliantCables[0];
    
    // Suggest alternatives (next sizes up that are also compliant)
    const alternatives = compliantCables.slice(1, 4);
    
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
