
import { useState } from "react";
import { cableSizes, CableSizeOption } from "./cableSizeData";
import { CalculatorValidator, ValidationResult } from "@/services/calculatorValidation";
import { getTemperatureFactor, getGroupingFactor, getSoilTemperatureFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";
import { getInstallationMethodFactor, getInstallationMethodCode, getInstallationMethodTableRef, isUndergroundMethod } from "@/lib/calculators/bs7671-data/installationMethodFactors";
import { getSoilResistivityFactor, getDepthOfLayingFactor } from "@/lib/calculators/bs7671-data/soilAndBurialFactors";

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: "pvc" | "xlpe";
  voltageDrop: string;
  voltage: string;
  cableType: string;
  // Enhanced inputs for professional calculations
  ambientTemp?: string;
  cableGrouping?: string;
  loadType?: string;
  diversityFactor?: string;
  powerFactor?: string;
  // Underground installation factors
  soilResistivity?: string;
  burialDepth?: string;
}

export interface CableSizingErrors {
  [key: string]: string;
}

export interface DeratingFactors {
  Ca: number; // Ambient/Soil temperature factor
  Cg: number; // Grouping factor
  Ci: number; // Installation method factor
  Cs: number; // Soil thermal resistivity factor
  Cd: number; // Depth of laying factor
  total: number;
  referenceMethod: string;
  tableRef: string;
}

export interface CableSizingResult {
  recommendedCable: CableSizeOption | null;
  alternativeCables: CableSizeOption[];
  errors: CableSizingErrors;
  validation?: ValidationResult;
  deratingFactors?: DeratingFactors;
}

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: "",
    length: "",
    installationType: "pvc",
    voltageDrop: "5",
    voltage: "230",
    cableType: "single",
    soilResistivity: "2.5",
    burialDepth: "0.7"
  });
  
  // UI state for dropdowns to display selected values correctly
  const [uiSelections, setUiSelections] = useState({
    installationMethodUI: "clipped-direct",
    cableTypeUI: "pvc-70"
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

  const setInstallationType = (type: string) => {
    // Map professional terminology to simple insulation types
    const installationMapping: Record<string, "pvc" | "xlpe"> = {
      "clipped-direct": "pvc",
      "in-conduit": "pvc", 
      "buried-direct": "xlpe",
      "cable-tray": "pvc",
      "free-air": "pvc",
      "pvc": "pvc",
      "xlpe": "xlpe"
    };
    
    const mappedType = installationMapping[type] || "pvc";
    console.log(`Installation type mapping: ${type} -> ${mappedType}`);
    setInputs(prev => ({ ...prev, installationType: mappedType }));
    setUiSelections(prev => ({ ...prev, installationMethodUI: type }));
  };

  const setCableType = (type: string) => {
    // Map professional terminology to simple cable types
    const cableTypeMapping: Record<string, string> = {
      "pvc-70": "single",
      "xlpe-90": "single", 
      "lsf-70": "lsf",
      "mineral-70": "heat-resistant",
      "single": "single",
      "twin-and-earth": "twin-and-earth",
      "swa": "swa",
      "lsf": "lsf",
      "armored": "swa", // Map armored to SWA as they're similar
      "heat-resistant": "heat-resistant"
    };
    
    const mappedType = cableTypeMapping[type] || type;
    console.log(`Cable type mapping: ${type} -> ${mappedType}`);
    setInputs(prev => ({ ...prev, cableType: mappedType }));
    setUiSelections(prev => ({ ...prev, cableTypeUI: type }));
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
    
    // Enhanced calculations with professional factors
    const ambientTemp = parseFloat(inputs.ambientTemp || '30');
    const cableGrouping = parseInt(inputs.cableGrouping || '1');
    const diversityFactor = parseFloat(inputs.diversityFactor || '1.0');
    const powerFactor = parseFloat(inputs.powerFactor || '0.9');
    const soilResistivity = parseFloat(inputs.soilResistivity || '2.5');
    const burialDepth = parseFloat(inputs.burialDepth || '0.7');
    
    // Apply diversity factor to current
    const effectiveCurrent = currentAmp * diversityFactor;
    
    // Calculate maximum allowable voltage drop in volts
    const maxVoltageDrop = (maxVoltageDropPercentage / 100) * supplyVoltage;
    
    // Get installation method details
    const installationMethod = uiSelections.installationMethodUI;
    const isUnderground = isUndergroundMethod(installationMethod);
    const referenceMethod = getInstallationMethodCode(installationMethod);
    const tableRef = getInstallationMethodTableRef(installationMethod);
    
    console.log(`Enhanced calculation - Current: ${currentAmp}A (effective: ${effectiveCurrent}A), Length: ${cableLength}m, VD: ${maxVoltageDropPercentage}% (${maxVoltageDrop}V)`);
    console.log(`Installation Method: ${installationMethod} (Reference ${referenceMethod})`);
    console.log(`Environmental - Ambient: ${ambientTemp}°C, Grouping: ${cableGrouping}, Diversity: ${diversityFactor}, PF: ${powerFactor}`);
    
    // Filter by cable type first
    const cablesByType = cableSizes.filter(cable => 
      cable.cableType === inputs.cableType
    );
    
    console.log(`Found ${cablesByType.length} cables of type ${inputs.cableType}:`, cablesByType.map(c => c.size));
    
    if (cablesByType.length === 0) {
      console.error(`No cables found for type: ${inputs.cableType}. Available types:`, [...new Set(cableSizes.map(c => c.cableType))]);
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          cableType: `No cables found for type: ${inputs.cableType}. Available types: ${[...new Set(cableSizes.map(c => c.cableType))].join(', ')}`
        }
      });
      return;
    }
    
    // Get the appropriate current rating for each cable with enhanced derating factors
    const safetyMargin = 1.25; // BS 7671 derating factor
    
    // Calculate all BS 7671 Appendix 4 correction factors
    const cableRating = inputs.installationType === 'xlpe' ? '90C' : '70C';
    
    // Ca - Temperature factor (use soil temp for underground, ambient for others)
    const Ca = isUnderground 
      ? getSoilTemperatureFactor(ambientTemp, cableRating)
      : getTemperatureFactor(ambientTemp, cableRating);
    
    // Cg - Grouping factor
    const Cg = getGroupingFactor(cableGrouping);
    
    // Ci - Installation method factor
    const Ci = getInstallationMethodFactor(installationMethod);
    
    // Cs - Soil thermal resistivity factor (underground only)
    const burialType = installationMethod === 'buried-duct' ? 'duct' : 'direct';
    const Cs = isUnderground ? getSoilResistivityFactor(soilResistivity, burialType) : 1.0;
    
    // Cd - Depth of laying factor (underground only)
    const Cd = isUnderground ? getDepthOfLayingFactor(burialDepth, burialType) : 1.0;
    
    // Calculate total derating
    const totalDerating = Ca * Cg * Ci * Cs * Cd;
    const requiredCurrentCapacity = effectiveCurrent * safetyMargin / totalDerating;
    
    // Store derating factors for display
    const deratingFactors: DeratingFactors = {
      Ca,
      Cg,
      Ci,
      Cs,
      Cd,
      total: totalDerating,
      referenceMethod,
      tableRef
    };
    
    console.log(`BS 7671 Derating Factors:`);
    console.log(`  Ca (Temperature): ${Ca.toFixed(3)}`);
    console.log(`  Cg (Grouping): ${Cg.toFixed(3)}`);
    console.log(`  Ci (Installation): ${Ci.toFixed(3)}`);
    if (isUnderground) {
      console.log(`  Cs (Soil Resistivity): ${Cs.toFixed(3)}`);
      console.log(`  Cd (Burial Depth): ${Cd.toFixed(3)}`);
    }
    console.log(`  Total: ${totalDerating.toFixed(3)}`);
    console.log(`Required capacity: ${requiredCurrentCapacity.toFixed(1)}A (${effectiveCurrent}A × ${safetyMargin} ÷ ${totalDerating.toFixed(3)})`);
    
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
      
      // Suggest better cable types for high currents
      let suggestion = "";
      if (currentAmp > 50 && inputs.cableType === 'twin-and-earth') {
        suggestion = " Consider using SWA or single core cables for higher current applications.";
      } else if (currentAmp > 100 && inputs.cableType !== 'swa') {
        suggestion = " Consider using SWA (Steel Wire Armoured) cables for very high current applications.";
      }
      
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          current: `Current (${currentAmp}A + 25% safety margin = ${requiredCurrentCapacity.toFixed(1)}A) exceeds maximum rating for ${inputs.cableType} cables (${maxCurrentAvailable}A max).${suggestion}`
        },
        deratingFactors
      });
      return;
    }
    
    // Enhanced voltage drop calculation with professional accuracy
    const cablesWithVoltageDrop = suitableCables.map(cable => {
      // Professional formula with power factor consideration for AC circuits
      const voltageDropVolts = cable.voltageDropPerAmpereMeter * effectiveCurrent * cableLength * powerFactor;
      
      console.log(`Enhanced analysis - ${cable.size}: ${voltageDropVolts.toFixed(3)}V drop (${((voltageDropVolts/supplyVoltage)*100).toFixed(2)}%) at ${effectiveCurrent}A`);
      
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
        },
        deratingFactors
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
      validation,
      deratingFactors
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
      ambientTemp: "30",
      cableGrouping: "1",
      loadType: "resistive",
      diversityFactor: "1.0",
      powerFactor: "0.9",
      soilResistivity: "2.5",
      burialDepth: "0.7"
    });
    setUiSelections({
      installationMethodUI: "clipped-direct",
      cableTypeUI: "pvc-70"
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
    uiSelections,
    updateInput,
    setInstallationType,
    setCableType,
    calculateCableSize,
    resetCalculator,
  };
};
