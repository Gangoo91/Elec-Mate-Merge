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

// Enhanced BS 7671 Table 311 - Load types for diversity calculations
const LOAD_TYPES = {
  // Lighting Categories
  "led-lighting": "LED Lighting Circuits (90% diversity) - Modern energy efficient lighting",
  "fluorescent-lighting": "Fluorescent Lighting (85% diversity) - Commercial/industrial lighting", 
  "general-lighting": "General Lighting Circuits (66% diversity) - Mixed lighting types",
  "emergency-lighting": "Emergency Lighting (100% diversity) - No diversity allowed",
  
  // Socket Outlet Categories  
  "ring-main-sockets": "Ring Main Socket Outlets (First 10A at 100%, remainder 50%) - BS 7671 standard",
  "radial-sockets": "Radial Socket Outlets (40% diversity if ≤10A, else special calc) - Kitchen/utility areas",
  "dedicated-sockets": "Dedicated Socket Outlets (100% diversity) - Specific equipment only",
  
  // Cooking & Water Heating
  "electric-cooker": "Electric Cooker (First 10A at 100%, remainder 30%) - Domestic cooking",
  "commercial-catering": "Commercial Catering Equipment (80% diversity) - Professional kitchens",
  "immersion-heater": "Immersion Heater (100% diversity) - Water heating, no diversity",
  "instantaneous-water": "Instantaneous Water Heater (100% diversity) - Electric showers/taps",
  
  // Space Heating
  "electric-heating": "Electric Space Heating (100% diversity) - Panel heaters, storage heaters", 
  "heat-pumps": "Heat Pump Systems (100% diversity) - Air source/ground source heating",
  "underfloor-heating": "Underfloor Heating (75% diversity) - Electric UFH systems",
  
  // Motors & Equipment
  "single-motor": "Single Phase Motors (75% diversity) - Individual motor loads",
  "motor-group": "Motor Group (60% diversity) - Multiple motors unlikely to run together",
  "lift-motor": "Lift Motors (100% diversity) - Passenger/goods lifts",
  "air-conditioning": "Air Conditioning (80% diversity) - HVAC systems",
  
  // Specialist Equipment
  "ev-charging": "EV Charging Points (100% diversity) - Electric vehicle charging",
  "welding-equipment": "Welding Equipment (70% diversity) - Not continuous use",
  "small-power": "Small Power Circuits (40% after first 10A) - General equipment",
  "server-equipment": "Server/IT Equipment (95% diversity) - Critical systems"
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

  // Map UI load types to diversity engine types
  const mapLoadTypeToEngineType = (uiType: string): CircuitLoad['type'] => {
    const typeMapping: Record<string, CircuitLoad['type']> = {
      // Lighting types → 'lighting'
      'led-lighting': 'lighting',
      'fluorescent-lighting': 'lighting',
      'general-lighting': 'lighting',
      'emergency-lighting': 'lighting',
      
      // Socket types → 'socket-outlet'
      'ring-main-sockets': 'socket-outlet',
      'radial-sockets': 'socket-outlet',
      'dedicated-sockets': 'socket-outlet',
      
      // Cooking types → 'cooker'
      'electric-cooker': 'cooker',
      'commercial-catering': 'cooker',
      
      // Water heating types → 'water-heating'
      'immersion-heater': 'water-heating',
      'instantaneous-water': 'water-heating',
      
      // Space heating types → 'space-heating'
      'electric-heating': 'space-heating',
      'heat-pumps': 'space-heating',
      'underfloor-heating': 'space-heating',
      
      // Motor types → 'motor'
      'single-motor': 'motor',
      'motor-group': 'motor',
      'lift-motor': 'motor',
      'air-conditioning': 'motor',
      
      // Small power and other types → 'small-power'
      'small-power': 'small-power',
      'ev-charging': 'small-power',
      'welding-equipment': 'small-power',
      'server-equipment': 'small-power'
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