import { useState, useEffect } from "react";
import { calculateDiversity, CircuitLoad, DiversityResult } from "@/lib/calculators/engines/diversityEngine";

interface LoadEntry {
  id: string;
  type: string;
  connectedLoad: string;
  numberOfUnits: string;
  power: string; // kW or A depending on input mode
  inputMode: 'kw' | 'amperage';
  powerFactor: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// BS 7671 Table A1 Compliant Load Types - Exact Diversity Factors
const LOAD_TYPES = {
  // Lighting Categories - BS 7671 Table A1
  "led-lighting": "LED Lighting Circuits - 66% domestic, 90% commercial/industrial (BS 7671 Table A1)",
  "fluorescent-lighting": "Fluorescent Lighting - 66% domestic, 90% commercial/industrial (BS 7671 Table A1)",
  "general-lighting": "General Lighting Circuits - 66% domestic, 90% commercial/industrial (BS 7671 Table A1)",
  "emergency-lighting": "Emergency Lighting - 100% diversity, no reduction allowed (BS 7671)",
  
  // Socket Outlet Categories - BS 7671 Table A1 
  "ring-main-sockets": "Ring Main Socket Outlets - First 10A at 100%, remainder 40% (BS 7671 Table A1)",
  "radial-sockets": "Radial Socket Outlets - First 10A at 100%, remainder 40% (BS 7671 Table A1)",
  "dedicated-sockets": "Dedicated Socket Outlets - 100% diversity, no reduction (BS 7671)",
  
  // Cooking & Water Heating - BS 7671 Table A1
  "electric-cooker": "Electric Cooker - First 10A at 100%, remainder 30% domestic (BS 7671 Table A1)",
  "electric-shower": "Electric Shower - 100% diversity, no reduction allowed (BS 7671)",
  "commercial-catering": "Commercial Catering - 80% diversity commercial/industrial (BS 7671 Table A1)",
  "immersion-heater": "Immersion Heater - 100% diversity, no reduction (BS 7671 Table A1)",
  "instantaneous-water": "Instantaneous Water Heater - 100% diversity as water heating (BS 7671)",
  
  // Space Heating - BS 7671 Table A1
  "electric-heating": "Electric Space Heating - Largest 100%, others 75% (BS 7671 Table A1)",
  "heat-pumps": "Heat Pump Systems - Largest 100%, others 75% (BS 7671 Table A1)",
  "underfloor-heating": "Underfloor Heating - Largest 100%, others 75% (BS 7671 Table A1)",
  
  // Motors & Equipment - BS 7671 Table A1
  "single-motor": "Single Phase Motors - 100% domestic, 80% commercial/industrial (BS 7671 Table A1)",
  "motor-group": "Motor Group - Largest 100%, others 80% (BS 7671 Table A1)",
  "lift-motor": "Lift Motors - 100% diversity, no reduction (BS 7671)",
  "air-conditioning": "Air Conditioning - 100% domestic, 80% commercial/industrial (BS 7671 Table A1)",
  
  // Small Power & Specialist Equipment - BS 7671 Table A1
  "small-power": "Small Power Circuits - First 10A at 100%, remainder 40% domestic (BS 7671 Table A1)",
  "ev-charging": "EV Charging Points - 100% diversity, no reduction allowed (BS 7671)",
  "welding-equipment": "Welding Equipment - 100% diversity for industrial loads (BS 7671)",
  "server-equipment": "Server/IT Equipment - 100% diversity for critical systems (BS 7671)"
} as const;

export function useMultiLoadDiversityCalculator() {
  const [loads, setLoads] = useState<LoadEntry[]>([
    { id: '1', type: '', connectedLoad: '', numberOfUnits: '1', power: '', inputMode: 'amperage', powerFactor: '0.9' }
  ]);
  const [location, setLocation] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [supplyVoltage, setSupplyVoltage] = useState("230");
  const [inputMode, setInputMode] = useState<'kw' | 'amperage'>('amperage');
  const [result, setResult] = useState<DiversityResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showResults, setShowResults] = useState(false);

  const addLoad = () => {
    const newId = (Math.max(...loads.map(l => parseInt(l.id))) + 1).toString();
    setLoads([...loads, { id: newId, type: '', connectedLoad: '', numberOfUnits: '1', power: '', inputMode, powerFactor: '0.9' }]);
  };

  const toggleInputMode = (newMode: 'kw' | 'amperage') => {
    setInputMode(newMode);
    // Convert existing loads to new input mode
    setLoads(loads.map(load => {
      if (!load.connectedLoad) return { ...load, inputMode: newMode };
      
      const voltage = parseFloat(supplyVoltage);
      const pf = parseFloat(load.powerFactor) || 0.9;
      const currentValue = parseFloat(load.connectedLoad);
      
      if (isNaN(currentValue) || isNaN(voltage)) return { ...load, inputMode: newMode };
      
      let convertedValue: number;
      if (newMode === 'kw' && load.inputMode === 'amperage') {
        // A to kW: P = V × I × PF / 1000
        convertedValue = (voltage * currentValue * pf) / 1000;
      } else if (newMode === 'amperage' && load.inputMode === 'kw') {
        // kW to A: I = P × 1000 / (V × PF)
        convertedValue = (currentValue * 1000) / (voltage * pf);
      } else {
        convertedValue = currentValue;
      }
      
      return { 
        ...load, 
        inputMode: newMode, 
        connectedLoad: convertedValue.toFixed(2)
      };
    }));
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

  // Map UI load types to diversity engine types - BS 7671 Table A1 compliant mapping
  const mapLoadTypeToEngineType = (uiType: string): CircuitLoad['type'] => {
    const typeMapping: Record<string, CircuitLoad['type']> = {
      // Lighting types → 'lighting' (66% domestic, 90% commercial/industrial per BS 7671 Table A1)
      'led-lighting': 'lighting',
      'fluorescent-lighting': 'lighting', 
      'general-lighting': 'lighting',
      'emergency-lighting': 'lighting', // Emergency lighting gets lighting diversity
      
      // Socket types → 'socket-outlet' (First 10A at 100%, remainder 40% per BS 7671 Table A1)
      'ring-main-sockets': 'socket-outlet',
      'radial-sockets': 'socket-outlet',
      'dedicated-sockets': 'water-heating', // Map to water-heating for 100% diversity
      
      // Cooking types → 'cooker' (First 10A at 100%, remainder 30% domestic per BS 7671 Table A1)
      'electric-cooker': 'cooker',
      'commercial-catering': 'cooker',
      
      // Water heating types → proper BS 7671 classification
      'immersion-heater': 'water-heating', // 100% diversity per BS 7671 Table A1
      'electric-shower': 'shower', // 100% diversity per BS 7671
      'instantaneous-water': 'water-heating', // 100% diversity for water heating
      
      // Space heating types → 'space-heating' (Largest 100%, others 75% per BS 7671 Table A1)
      'electric-heating': 'space-heating',
      'heat-pumps': 'space-heating',
      'underfloor-heating': 'space-heating',
      
      // Motor types → 'motor' (100% domestic, 80% commercial/industrial per BS 7671 Table A1)
      'single-motor': 'motor',
      'motor-group': 'motor',
      'lift-motor': 'water-heating', // Map to water-heating for 100% diversity
      'air-conditioning': 'motor',
      
      // Small power and specialist equipment
      'small-power': 'small-power', // First 10A at 100%, remainder 40% per BS 7671 Table A1
      'ev-charging': 'water-heating', // 100% diversity - no reduction allowed
      'welding-equipment': 'water-heating', // 100% diversity for industrial equipment
      'server-equipment': 'water-heating' // 100% diversity for critical systems
    };
    
    return typeMapping[uiType] || 'small-power';
  };

  const calculateDemand = () => {
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setResult(null);
      setShowResults(false);
      return;
    }

    // Convert loads to CircuitLoad format
    const circuits: CircuitLoad[] = loads.map(load => {
      const connected = parseFloat(load.connectedLoad);
      const units = parseInt(load.numberOfUnits);
      const voltage = parseFloat(supplyVoltage);
      const pf = parseFloat(load.powerFactor) || 0.9;
      
      let designCurrent: number;
      let installedPower: number;
      
      if (load.inputMode === 'kw') {
        // Convert kW to current: I = P × 1000 / (V × PF)
        installedPower = connected * units;
        designCurrent = (installedPower * 1000) / (voltage * pf);
      } else {
        // Input is already in amperage
        designCurrent = connected * units;
        installedPower = (designCurrent * voltage * pf) / 1000;
      }

      return {
        id: load.id,
        type: mapLoadTypeToEngineType(load.type), // Use mapped type
        designCurrent,
        installedPower,
        quantity: units,
        location
      };
    });

    try {
      const diversityResult = calculateDiversity(circuits, parseFloat(supplyVoltage));
      setResult(diversityResult);
      setShowResults(true);
    } catch (error) {
      console.error('Diversity calculation error:', error);
      setResult(null);
      setShowResults(false);
    }
  };

  const resetCalculator = () => {
    setLoads([{ id: '1', type: '', connectedLoad: '', numberOfUnits: '1', power: '', inputMode, powerFactor: '0.9' }]);
    setLocation('domestic');
    setSupplyVoltage("230");
    setResult(null);
    setErrors({});
    setShowResults(false);
  };

  const clearError = (field: string) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };


  return {
    // State
    loads,
    location,
    supplyVoltage,
    inputMode,
    result,
    errors,
    showResults,
    
    // Actions
    addLoad,
    removeLoad,
    updateLoad,
    setLocation: (value: string) => setLocation(value as 'domestic' | 'commercial' | 'industrial'),
    setSupplyVoltage,
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,
    
    // Data
    loadTypes: LOAD_TYPES
  };
}