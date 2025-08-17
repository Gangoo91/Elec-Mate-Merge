import { useState, useEffect } from "react";

interface DiversityResult {
  diversityFactor: number;
  demandAfterDiversity: number;
  totalConnectedLoad: number;
  calculationMethod: string;
  loadReduction: number;
}

interface ValidationErrors {
  loadType?: string;
  connectedLoad?: string;
  numberOfUnits?: string;
}

// BS 7671 Table 311 - Assumed current demand factors
const DIVERSITY_FACTORS = {
  "lighting": {
    factor: 0.66,
    description: "Lighting circuits: 66% of total connected load",
    method: "percentage"
  },
  "socket-outlets": {
    factor: 0.4,
    description: "Socket outlets: 10A + 50% of remainder, or 40% if total ≤ 10A",
    method: "special"
  },
  "cooking": {
    factor: 0.6,
    description: "Cooking appliances: 10A + 30% of remainder, or 60% if total ≤ 10A",
    method: "special"
  },
  "water-heating": {
    factor: 1.0,
    description: "Water heating: 100% of connected load (no diversity)",
    method: "percentage"
  },
  "space-heating": {
    factor: 1.0,
    description: "Space heating: 100% of connected load (no diversity)",
    method: "percentage"
  },
  "motors": {
    factor: 0.75,
    description: "Motors: 75% of total connected load",
    method: "percentage"
  },
  "mixed-domestic": {
    factor: 0.45,
    description: "Mixed domestic loads: 45% of total connected load",
    method: "percentage"
  },
  "immersion-heater": {
    factor: 1.0,
    description: "Immersion heaters: 100% of connected load",
    method: "percentage"
  },
  "shower": {
    factor: 1.0,
    description: "Electric showers: 100% of connected load",
    method: "percentage"
  }
} as const;

export function useDiversityCalculator() {
  const [loadType, setLoadType] = useState("");
  const [connectedLoad, setConnectedLoad] = useState("");
  const [numberOfUnits, setNumberOfUnits] = useState("1");
  const [result, setResult] = useState<DiversityResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateInputs = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    if (!loadType) {
      newErrors.loadType = "Please select a load type";
    }

    const connected = parseFloat(connectedLoad);
    if (!connectedLoad) {
      newErrors.connectedLoad = "Please enter connected load";
    } else if (isNaN(connected) || connected <= 0) {
      newErrors.connectedLoad = "Connected load must be a positive number";
    } else if (connected > 1000) {
      newErrors.connectedLoad = "Connected load seems unreasonably high";
    }

    const units = parseInt(numberOfUnits);
    if (!numberOfUnits) {
      newErrors.numberOfUnits = "Please enter number of units";
    } else if (isNaN(units) || units < 1) {
      newErrors.numberOfUnits = "Number of units must be at least 1";
    } else if (units > 1000) {
      newErrors.numberOfUnits = "Number of units seems unreasonably high";
    }

    return newErrors;
  };

  const calculateDemand = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      return;
    }

    const connected = parseFloat(connectedLoad);
    const units = parseInt(numberOfUnits);
    const totalConnected = connected * units;

    const loadConfig = DIVERSITY_FACTORS[loadType as keyof typeof DIVERSITY_FACTORS];
    let demandAfterDiversity: number;
    let diversityFactor: number;
    let calculationMethod: string;

    if (loadConfig.method === "special") {
      if (loadType === "socket-outlets") {
        if (totalConnected <= 10) {
          // For loads ≤ 10A, use 40% factor
          demandAfterDiversity = totalConnected * 0.4;
          diversityFactor = 0.4;
          calculationMethod = "40% of total (≤10A)";
        } else {
          // For loads > 10A: 10A + 50% of remainder
          demandAfterDiversity = 10 + (totalConnected - 10) * 0.5;
          diversityFactor = demandAfterDiversity / totalConnected;
          calculationMethod = "10A + 50% of remainder";
        }
      } else if (loadType === "cooking") {
        if (totalConnected <= 10) {
          // For loads ≤ 10A, use 60% factor
          demandAfterDiversity = totalConnected * 0.6;
          diversityFactor = 0.6;
          calculationMethod = "60% of total (≤10A)";
        } else {
          // For loads > 10A: 10A + 30% of remainder
          demandAfterDiversity = 10 + (totalConnected - 10) * 0.3;
          diversityFactor = demandAfterDiversity / totalConnected;
          calculationMethod = "10A + 30% of remainder";
        }
      } else {
        // Fallback to percentage method
        diversityFactor = loadConfig.factor;
        demandAfterDiversity = totalConnected * diversityFactor;
        calculationMethod = `${(diversityFactor * 100).toFixed(0)}% of total`;
      }
    } else {
      // Standard percentage calculation
      diversityFactor = loadConfig.factor;
      demandAfterDiversity = totalConnected * diversityFactor;
      calculationMethod = `${(diversityFactor * 100).toFixed(0)}% of total`;
    }

    const loadReduction = totalConnected - demandAfterDiversity;

    setResult({
      diversityFactor: Math.round(diversityFactor * 1000) / 1000,
      demandAfterDiversity: Math.round(demandAfterDiversity * 100) / 100,
      totalConnectedLoad: totalConnected,
      calculationMethod,
      loadReduction: Math.round(loadReduction * 100) / 100
    });
  };

  const resetCalculator = () => {
    setLoadType("");
    setConnectedLoad("");
    setNumberOfUnits("1");
    setResult(null);
    setErrors({});
  };

  const clearError = (field: keyof ValidationErrors) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Auto-calculate when inputs change (after a brief delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadType && connectedLoad && numberOfUnits) {
        calculateDemand();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [loadType, connectedLoad, numberOfUnits]);

  return {
    // State
    loadType,
    connectedLoad,
    numberOfUnits,
    result,
    errors,
    
    // Actions
    setLoadType,
    setConnectedLoad,
    setNumberOfUnits,
    calculateDemand,
    resetCalculator,
    clearError,
    
    // Data
    diversityFactors: DIVERSITY_FACTORS
  };
}