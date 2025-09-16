import { useState, useEffect } from "react";
import { calculateDiversity, CircuitLoad, DiversityResult } from "@/lib/calculators/engines/diversityEngine";

interface LoadEntry {
  id: string;
  type: string;
  connectedLoad: string;
  numberOfUnits: string;
  power: string; // kW
}

interface ValidationErrors {
  [key: string]: string;
}

// BS 7671 Table 311 - Load types for diversity calculations
const LOAD_TYPES = {
  "lighting": "Lighting circuits: 66% of total connected load",
  "socket-outlet": "Socket outlets: 10A + 50% of remainder, or 40% if total ≤ 10A", 
  "cooker": "Cooking appliances: 10A + 30% of remainder, or 60% if total ≤ 10A",
  "water-heating": "Water heating: 100% of connected load (no diversity)",
  "space-heating": "Space heating: 100% of connected load (no diversity)",
  "motor": "Motors: 75% of total connected load",
  "shower": "Electric showers: 100% of connected load",
  "small-power": "Small power: 40% after first 10A at 100%"
} as const;

export function useMultiLoadDiversityCalculator() {
  const [loads, setLoads] = useState<LoadEntry[]>([
    { id: '1', type: '', connectedLoad: '', numberOfUnits: '1', power: '' }
  ]);
  const [location, setLocation] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [supplyVoltage, setSupplyVoltage] = useState("230");
  const [result, setResult] = useState<DiversityResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const addLoad = () => {
    const newId = (Math.max(...loads.map(l => parseInt(l.id))) + 1).toString();
    setLoads([...loads, { id: newId, type: '', connectedLoad: '', numberOfUnits: '1', power: '' }]);
  };

  const removeLoad = (id: string) => {
    if (loads.length > 1) {
      setLoads(loads.filter(load => load.id !== id));
      // Clear errors for removed load
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach(key => {
        if (key.includes(id)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const updateLoad = (id: string, field: keyof LoadEntry, value: string) => {
    setLoads(loads.map(load => 
      load.id === id ? { ...load, [field]: value } : load
    ));
    // Clear error when user updates field
    clearError(`${id}_${field}`);
    
    // Auto-calculate power when load or units change
    if (field === 'connectedLoad' || field === 'numberOfUnits') {
      const load = loads.find(l => l.id === id);
      if (load) {
        const current = parseFloat(field === 'connectedLoad' ? value : load.connectedLoad);
        const units = parseInt(field === 'numberOfUnits' ? value : load.numberOfUnits);
        const voltage = parseFloat(supplyVoltage);
        
        if (!isNaN(current) && !isNaN(units) && !isNaN(voltage)) {
          const totalCurrent = current * units;
          const powerKW = (totalCurrent * voltage) / 1000;
          setLoads(loads.map(l => 
            l.id === id ? { ...l, [field]: value, power: powerKW.toFixed(2) } : l
          ));
        }
      }
    }
  };

  const validateInputs = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    loads.forEach(load => {
      if (!load.type) {
        newErrors[`${load.id}_type`] = "Please select a load type";
      }

      const connected = parseFloat(load.connectedLoad);
      if (!load.connectedLoad) {
        newErrors[`${load.id}_connectedLoad`] = "Please enter connected load";
      } else if (isNaN(connected) || connected <= 0) {
        newErrors[`${load.id}_connectedLoad`] = "Connected load must be a positive number";
      } else if (connected > 1000) {
        newErrors[`${load.id}_connectedLoad`] = "Connected load seems unreasonably high";
      }

      const units = parseInt(load.numberOfUnits);
      if (!load.numberOfUnits) {
        newErrors[`${load.id}_numberOfUnits`] = "Please enter number of units";
      } else if (isNaN(units) || units < 1) {
        newErrors[`${load.id}_numberOfUnits`] = "Number of units must be at least 1";
      } else if (units > 1000) {
        newErrors[`${load.id}_numberOfUnits`] = "Number of units seems unreasonably high";
      }
    });

    return newErrors;
  };

  const calculateDemand = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      return;
    }

    // Convert loads to CircuitLoad format
    const circuits: CircuitLoad[] = loads.map(load => {
      const connected = parseFloat(load.connectedLoad);
      const units = parseInt(load.numberOfUnits);
      const voltage = parseFloat(supplyVoltage);
      const totalCurrent = connected * units;
      const powerKW = (totalCurrent * voltage) / 1000;

      return {
        id: load.id,
        type: load.type as any,
        designCurrent: totalCurrent,
        installedPower: powerKW,
        quantity: units,
        location
      };
    });

    try {
      const diversityResult = calculateDiversity(circuits, parseFloat(supplyVoltage));
      setResult(diversityResult);
    } catch (error) {
      console.error('Diversity calculation error:', error);
      setResult(null);
    }
  };

  const resetCalculator = () => {
    setLoads([{ id: '1', type: '', connectedLoad: '', numberOfUnits: '1', power: '' }]);
    setLocation('domestic');
    setSupplyVoltage("230");
    setResult(null);
    setErrors({});
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Auto-calculate when inputs change (after a brief delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasValidLoads = loads.some(load => 
        load.type && load.connectedLoad && load.numberOfUnits
      );
      if (hasValidLoads) {
        calculateDemand();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [loads, location, supplyVoltage]);

  return {
    // State
    loads,
    location,
    supplyVoltage,
    result,
    errors,
    
    // Actions
    addLoad,
    removeLoad,
    updateLoad,
    setLocation: (value: string) => setLocation(value as 'domestic' | 'commercial' | 'industrial'),
    setSupplyVoltage,
    calculateDemand,
    resetCalculator,
    clearError,
    
    // Data
    loadTypes: LOAD_TYPES
  };
}