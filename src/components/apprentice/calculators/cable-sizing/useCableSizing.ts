import { useState } from "react";
import { CalculatorValidator, ValidationResult } from "@/services/calculatorValidation";
import { getTemperatureFactor, getGroupingFactor, getSoilTemperatureFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";
import { getInstallationMethodFactor, getInstallationMethodCode, getInstallationMethodTableRef, isUndergroundMethod, isDomesticInsulationMethod, getReferenceMethod } from "@/lib/calculators/bs7671-data/installationMethodFactors";
import { getSoilResistivityFactor, getDepthOfLayingFactor } from "@/lib/calculators/bs7671-data/soilAndBurialFactors";
import { 
  getCableCapacity, 
  getNextCableSize, 
  CableType, 
  cableCapacityData,
  getThermalInsulationCapacity,
  flatTwinEarthThermalCapacities
} from "@/lib/calculators/bs7671-data/cableCapacities";
import { getVoltageDropValue } from "@/lib/calculators/bs7671-data/voltageDropTables";

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: "pvc" | "xlpe";
  voltageDrop: string;
  voltage: string;
  cableType: CableType;
  cores: '2' | '3' | '4';
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

export interface BS7671CableOption {
  size: number;
  sizeLabel: string;
  tabulatedCapacity: number;
  deratedCapacity: number;
  voltageDropMvAm: number;
  calculatedVoltageDrop: number;
  voltageDropPercent: number;
  meetsVoltageDrop: boolean;
  meetsCurrentCapacity: boolean;
  tableReference: string;
}

export interface CableSizingResult {
  recommendedCable: BS7671CableOption | null;
  alternativeCables: BS7671CableOption[];
  errors: CableSizingErrors;
  validation?: ValidationResult;
  deratingFactors?: DeratingFactors;
}

// Map cable type to BS 7671 table reference
const getCableTableReference = (cableType: CableType): string => {
  const tableRefs: Record<CableType, string> = {
    'pvc-single': '4D1A',
    'xlpe-single': '4D2A',
    'pvc-twin-earth': '4D4A',
    'xlpe-twin-earth': '4D4B',
    'swa': '4D4A',
    'swa-single-core': '4D3A',
    'micc': '4E1A',
    'aluminium-xlpe': '4J2A'
  };
  return tableRefs[cableType] || '4D1A';
};

// Map cable type to voltage drop table
const getVoltageDropTableRef = (cableType: CableType): string => {
  const tableRefs: Record<CableType, string> = {
    'pvc-single': '4D1B',
    'xlpe-single': '4D2B',
    'pvc-twin-earth': '4D2B',
    'xlpe-twin-earth': '4D2B',
    'swa': '4D4B',
    'swa-single-core': '4D3B',
    'micc': '4E1B',
    'aluminium-xlpe': '4J2B'
  };
  return tableRefs[cableType] || '4D1B';
};

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: "",
    length: "",
    installationType: "pvc",
    voltageDrop: "5",
    voltage: "230",
    cableType: "pvc-twin-earth",
    cores: '2',
    soilResistivity: "2.5",
    burialDepth: "0.7"
  });
  
  // UI state for dropdowns to display selected values correctly
  const [uiSelections, setUiSelections] = useState({
    installationMethodUI: "clipped-direct",
    cableTypeUI: "pvc-twin-earth"
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
      "buried-duct": "xlpe",
      "cable-tray": "pvc",
      "free-air": "pvc",
      "pvc": "pvc",
      "xlpe": "xlpe"
    };
    
    const mappedType = installationMapping[type] || "pvc";
    setInputs(prev => ({ ...prev, installationType: mappedType }));
    setUiSelections(prev => ({ ...prev, installationMethodUI: type }));
  };

  const setCableType = (type: CableType) => {
    // Determine insulation type from cable type
    const xlpeTypes: CableType[] = ['xlpe-single', 'xlpe-twin-earth', 'aluminium-xlpe'];
    const installationType = xlpeTypes.includes(type) ? 'xlpe' : 'pvc';
    
    setInputs(prev => ({ 
      ...prev, 
      cableType: type,
      installationType 
    }));
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
    
    if (!inputs.current) {
      newErrors.current = "Current is required";
    } else {
      const currentValue = parseFloat(inputs.current);
      if (isNaN(currentValue) || currentValue <= 0) {
        newErrors.current = "Please enter a valid positive number";
      } else {
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
    
    const designCurrent = parseFloat(inputs.current);
    const cableLength = parseFloat(inputs.length);
    const maxVoltageDropPercentage = parseFloat(inputs.voltageDrop);
    const supplyVoltage = parseFloat(inputs.voltage);
    const cableType = inputs.cableType;
    const cores = inputs.cores;
    
    // Enhanced calculations with professional factors
    const ambientTemp = parseFloat(inputs.ambientTemp || '30');
    const cableGrouping = parseInt(inputs.cableGrouping || '1');
    const diversityFactor = parseFloat(inputs.diversityFactor || '1.0');
    const powerFactor = parseFloat(inputs.powerFactor || '1.0');
    const soilResistivity = parseFloat(inputs.soilResistivity || '2.5');
    const burialDepth = parseFloat(inputs.burialDepth || '0.7');
    
    // Calculate maximum allowable voltage drop in volts
    const maxVoltageDrop = (maxVoltageDropPercentage / 100) * supplyVoltage;
    
    // Get installation method details
    const installationMethod = uiSelections.installationMethodUI;
    const isUnderground = isUndergroundMethod(installationMethod);
    const isDomesticInsulation = isDomesticInsulationMethod(installationMethod);
    const referenceMethod = getReferenceMethod(installationMethod);
    const tableRef = getInstallationMethodTableRef(installationMethod);
    
    // Determine temperature rating based on cable type
    const cableRating = cableType.includes('xlpe') ? '90C' : '70C';
    
    // Calculate all BS 7671 Appendix 4 correction factors
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
    
    // Required tabulated current capacity: It ≥ Ib / (Ca × Cg × Ci × Cs × Cd)
    const requiredTabulatedCapacity = designCurrent / totalDerating;
    
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
    
    // Get all available cable sizes for this type from BS 7671 tables
    const cableDataArray = cableCapacityData[cableType];
    if (!cableDataArray || cableDataArray.length === 0) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          cableType: `No cable data available for ${cableType}. Available types: ${Object.keys(cableCapacityData).join(', ')}`
        }
      });
      return;
    }
    
    // Build cable options with BS 7671 data
    const cableOptions: BS7671CableOption[] = [];
    
    for (const cableData of cableDataArray) {
      // Get tabulated capacity for the reference method
      let tabulatedCapacity: number | null = null;
      
      // Handle domestic thermal insulation methods (100-103)
      if (isDomesticInsulation && (cableType === 'pvc-twin-earth' || cableType === 'xlpe-twin-earth')) {
        const thermalMethod = installationMethod.includes('below100') ? '100e' :
                              installationMethod.includes('over100') ? '101e' :
                              installationMethod.includes('not-touching') ? '103e' : '102e';
        const thermalCap = getThermalInsulationCapacity(cableData.size, thermalMethod as '100e' | '101e' | '102e' | '103e');
        if (thermalCap) tabulatedCapacity = thermalCap;
      }
      
      // Standard reference method lookup
      if (!tabulatedCapacity) {
        // Try different reference method keys
        const methodKeys = [
          referenceMethod,
          `${referenceMethod}${cores === '3' || cores === '4' ? '3' : '2'}`, // C2, C3, D2, D3, E2, E3
          referenceMethod.charAt(0), // Just the letter (A, B, C, D, E, F, G)
          'C' // Default fallback
        ];
        
        for (const key of methodKeys) {
          if (cableData.capacities[key]) {
            tabulatedCapacity = cableData.capacities[key];
            break;
          }
        }
        
        // Final fallback: get minimum of all available capacities
        if (!tabulatedCapacity) {
          const capacityValues = Object.values(cableData.capacities).filter(v => typeof v === 'number') as number[];
          if (capacityValues.length > 0) {
            tabulatedCapacity = Math.min(...capacityValues);
          }
        }
      }
      
      if (!tabulatedCapacity) continue;
      
      // Calculate derated capacity
      const deratedCapacity = tabulatedCapacity * totalDerating;
      
      // Get voltage drop from BS 7671 tables
      const isThreePhase = supplyVoltage > 250;
      const voltageDropMvAm = getVoltageDropValue(cableType, cableData.size, isThreePhase, referenceMethod);
      
      // Calculate actual voltage drop: ΔV = mV/A/m × Ib × L / 1000
      const calculatedVoltageDrop = (voltageDropMvAm * designCurrent * cableLength * powerFactor) / 1000;
      const voltageDropPercent = (calculatedVoltageDrop / supplyVoltage) * 100;
      
      cableOptions.push({
        size: cableData.size,
        sizeLabel: `${cableData.size}mm²`,
        tabulatedCapacity,
        deratedCapacity: Math.round(deratedCapacity * 10) / 10,
        voltageDropMvAm,
        calculatedVoltageDrop: Math.round(calculatedVoltageDrop * 100) / 100,
        voltageDropPercent: Math.round(voltageDropPercent * 100) / 100,
        meetsVoltageDrop: voltageDropPercent <= maxVoltageDropPercentage,
        meetsCurrentCapacity: deratedCapacity >= designCurrent,
        tableReference: `Table ${getCableTableReference(cableType)} Col ${referenceMethod}`
      });
    }
    
    // Sort by size ascending
    cableOptions.sort((a, b) => a.size - b.size);
    
    // Find cables that meet both criteria
    const compliantCables = cableOptions.filter(c => c.meetsCurrentCapacity && c.meetsVoltageDrop);
    
    if (compliantCables.length === 0) {
      // Find best available options for feedback
      const byCurrentCapacity = [...cableOptions].filter(c => c.meetsCurrentCapacity);
      const byVoltageDrop = [...cableOptions].sort((a, b) => a.voltageDropPercent - b.voltageDropPercent);
      
      let errorMessage = '';
      if (byCurrentCapacity.length === 0) {
        const maxCapacity = Math.max(...cableOptions.map(c => c.deratedCapacity));
        errorMessage = `No cable meets current capacity requirement of ${designCurrent}A. Maximum available is ${maxCapacity}A derated. Consider using parallel cables or a different cable type.`;
      } else {
        const bestVD = byCurrentCapacity[byCurrentCapacity.length - 1];
        errorMessage = `No cable meets both current capacity and voltage drop requirements. Best option: ${bestVD.sizeLabel} with ${bestVD.voltageDropPercent.toFixed(1)}% voltage drop (limit: ${maxVoltageDropPercentage}%). Consider shorter route or larger cable.`;
      }
      
      setResult({
        recommendedCable: null,
        alternativeCables: byVoltageDrop.slice(0, 3),
        errors: { general: errorMessage },
        deratingFactors
      });
      return;
    }
    
    // Recommended: smallest compliant cable
    const recommended = compliantCables[0];
    const alternatives = compliantCables.slice(1, 4);
    
    // Professional validation
    const validation = CalculatorValidator.validateCableSizing(
      designCurrent,
      recommended.sizeLabel,
      inputs.installationType,
      recommended.calculatedVoltageDrop,
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
      cableType: "pvc-twin-earth",
      cores: '2',
      ambientTemp: "30",
      cableGrouping: "1",
      loadType: "resistive",
      diversityFactor: "1.0",
      powerFactor: "1.0",
      soilResistivity: "2.5",
      burialDepth: "0.7"
    });
    setUiSelections({
      installationMethodUI: "clipped-direct",
      cableTypeUI: "pvc-twin-earth"
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
