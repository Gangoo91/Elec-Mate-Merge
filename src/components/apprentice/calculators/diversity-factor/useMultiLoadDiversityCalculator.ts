import { useState } from 'react';
import {
  calculateDiversity,
  CircuitLoad,
  DiversityResult,
} from '@/lib/calculators/engines/diversityEngine';

interface UILoadEntry {
  id: string;
  type: string;
  connectedLoad: string;
  numberOfUnits: string;
  power: string; // kW or A depending on input mode
  inputMode: 'kw' | 'amperage';
  powerFactor: string;
  hasCookerSocket: boolean;
  thermostaticallyControlled: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

// IET On-Site Guide Table 1B / Table H2 Compliant Load Types
const LOAD_TYPES: Record<string, string> = {
  // Lighting Categories — Table 1B item 1
  'led-lighting': 'LED Lighting — 66% domestic, 90% commercial (Table 1B item 1)',
  'fluorescent-lighting': 'Fluorescent Lighting — 66% domestic, 90% commercial (Table 1B item 1)',
  'general-lighting': 'General Lighting — 66% domestic, 90% commercial (Table 1B item 1)',
  'emergency-lighting': 'Emergency Lighting — 100%, no reduction (Table 1B item 1)',

  // Socket Outlet Categories — Table 1B item 2
  'ring-main-sockets':
    'Ring Final Circuits — 32A assumed per ring, 100% + 40% additional (Table 1B item 2)',
  'radial-sockets': 'Radial Socket Outlets — 100% up to 10A + 40% remainder (Table 1B item 2)',
  'dedicated-sockets': 'Dedicated Socket Outlets — 100%, no reduction',

  // Cooking & Water Heating — Table 1B items 3, 5, 7
  'electric-cooker': 'Electric Cooker — 10A + 30% of remainder + 5A if socket (Table 1B item 3)',
  'electric-shower': 'Electric Shower — 100% largest + 100% 2nd + 25% remainder (Table 1B item 5)',
  'commercial-catering': 'Commercial Catering — 80% diversity (Table H2 item 3)',
  'immersion-heater': 'Immersion Heater — 100%, no diversity (Table 1B item 7)',
  'instantaneous-water': 'Instantaneous Water Heater — 100%, no diversity (Table 1B item 7)',

  // Space Heating — Table 1B item 4
  'electric-heating':
    'Electric Space Heating — 100% thermostatic / Largest+75% non-thermostatic (Table 1B item 4)',
  'heat-pumps': 'Heat Pump Systems — 100% thermostatic (Table 1B item 4)',
  'underfloor-heating': 'Underfloor Heating — 100%, no diversity (Table 1B item 8)',

  // Motors & Equipment — Table H2
  'single-motor': 'Single Phase Motor — 100% domestic, largest+40% commercial (Table H2)',
  'motor-group': 'Motor Group — Largest 100% + 40% remaining (Table H2)',
  'lift-motor': 'Lift Motor — 100%, no reduction',
  'air-conditioning': 'Air Conditioning — Largest 100% + 40% remaining (Table H2)',

  // Specialist Equipment
  'small-power': 'Small Power — 100% up to 10A + 40% remainder (Table 1B item 2)',
  'ev-charging': 'EV Charging — 100%, no diversity (BS 7671 Section 722.311)',
  'welding-equipment': 'Welding Equipment — 100%, no reduction',
  'server-equipment': 'Server/IT Equipment — 100%, no reduction',
};

export function useMultiLoadDiversityCalculator() {
  const [loads, setLoads] = useState<UILoadEntry[]>([
    {
      id: '1',
      type: '',
      connectedLoad: '',
      numberOfUnits: '1',
      power: '',
      inputMode: 'amperage',
      powerFactor: '0.9',
      hasCookerSocket: false,
      thermostaticallyControlled: true,
    },
  ]);
  const [location, setLocation] = useState<'domestic' | 'commercial' | 'industrial'>('domestic');
  const [supplyVoltage, setSupplyVoltage] = useState('230');
  const [supplyType, setSupplyType] = useState<'single-phase' | 'three-phase'>('single-phase');
  const [inputMode, setInputMode] = useState<'kw' | 'amperage'>('amperage');
  const [result, setResult] = useState<DiversityResult | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showResults, setShowResults] = useState(false);

  const addLoad = () => {
    const newId = (Math.max(...loads.map((l) => parseInt(l.id))) + 1).toString();
    setLoads([
      ...loads,
      {
        id: newId,
        type: '',
        connectedLoad: '',
        numberOfUnits: '1',
        power: '',
        inputMode,
        powerFactor: '0.9',
        hasCookerSocket: false,
        thermostaticallyControlled: true,
      },
    ]);
  };

  const toggleInputMode = (newMode: 'kw' | 'amperage') => {
    setInputMode(newMode);
    setLoads(
      loads.map((load) => {
        if (!load.connectedLoad) return { ...load, inputMode: newMode };

        const voltage = parseFloat(supplyVoltage);
        const pf = parseFloat(load.powerFactor) || 0.9;
        const currentValue = parseFloat(load.connectedLoad);

        if (isNaN(currentValue) || isNaN(voltage)) return { ...load, inputMode: newMode };

        let convertedValue: number;
        if (newMode === 'kw' && load.inputMode === 'amperage') {
          convertedValue = (voltage * currentValue * pf) / 1000;
        } else if (newMode === 'amperage' && load.inputMode === 'kw') {
          convertedValue = (currentValue * 1000) / (voltage * pf);
        } else {
          convertedValue = currentValue;
        }

        return {
          ...load,
          inputMode: newMode,
          connectedLoad: convertedValue.toFixed(2),
        };
      })
    );
  };

  const removeLoad = (id: string) => {
    if (loads.length > 1) {
      setLoads(loads.filter((load) => load.id !== id));
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.includes(id)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const updateLoad = (id: string, field: keyof UILoadEntry, value: string | boolean) => {
    setLoads(loads.map((load) => (load.id === id ? { ...load, [field]: value } : load)));
    if (typeof value === 'string') {
      clearError(`${id}_${String(field)}`);
    }

    // Auto-calculate power when load or units change
    if (field === 'connectedLoad' || field === 'numberOfUnits') {
      const load = loads.find((l) => l.id === id);
      if (load) {
        const current = parseFloat(
          field === 'connectedLoad' ? (value as string) : load.connectedLoad
        );
        const units = parseInt(field === 'numberOfUnits' ? (value as string) : load.numberOfUnits);
        const voltage = parseFloat(supplyVoltage);

        if (!isNaN(current) && !isNaN(units) && !isNaN(voltage)) {
          const totalCurrent = current * units;
          const powerKW = (totalCurrent * voltage) / 1000;
          setLoads(
            loads.map((l) =>
              l.id === id ? { ...l, [field]: value, power: powerKW.toFixed(2) } : l
            )
          );
        }
      }
    }
  };

  const validateInputs = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    loads.forEach((load) => {
      if (!load.type) {
        newErrors[`${load.id}_type`] = 'Please select a load type';
      }

      const connected = parseFloat(load.connectedLoad);
      if (!load.connectedLoad) {
        newErrors[`${load.id}_connectedLoad`] = 'Please enter connected load';
      } else if (isNaN(connected) || connected <= 0) {
        newErrors[`${load.id}_connectedLoad`] = 'Connected load must be a positive number';
      } else if (connected > 1000) {
        newErrors[`${load.id}_connectedLoad`] = 'Connected load seems unreasonably high';
      }

      const units = parseInt(load.numberOfUnits);
      if (!load.numberOfUnits) {
        newErrors[`${load.id}_numberOfUnits`] = 'Please enter number of units';
      } else if (isNaN(units) || units < 1) {
        newErrors[`${load.id}_numberOfUnits`] = 'Number of units must be at least 1';
      } else if (units > 1000) {
        newErrors[`${load.id}_numberOfUnits`] = 'Number of units seems unreasonably high';
      }
    });

    return newErrors;
  };

  // Map UI load types to diversity engine types — IET On-Site Guide compliant
  const mapLoadTypeToEngineType = (uiType: string): CircuitLoad['type'] => {
    const typeMapping: Record<string, CircuitLoad['type']> = {
      // Lighting → 'lighting' (Table 1B item 1: 66% domestic)
      'led-lighting': 'lighting',
      'fluorescent-lighting': 'lighting',
      'general-lighting': 'lighting',
      'emergency-lighting': 'lighting',

      // Socket types
      'ring-main-sockets': 'ring-final', // Table 1B item 2: 32A assumed, 100% + 40%
      'radial-sockets': 'radial-socket', // Table 1B item 2: 100% up to 10A + 40%
      'dedicated-sockets': 'dedicated-outlet', // 100% no diversity

      // Cooking — Table 1B item 3
      'electric-cooker': 'cooker',
      'commercial-catering': 'cooker',

      // Water heating — Table 1B item 7
      'immersion-heater': 'water-heating',
      'electric-shower': 'shower', // Table 1B item 5
      'instantaneous-water': 'water-heating',

      // Space heating — Table 1B item 4
      'electric-heating': 'space-heating',
      'heat-pumps': 'space-heating',
      'underfloor-heating': 'floor-warming', // Table 1B item 8: 100%

      // Motors — Table H2
      'single-motor': 'motor',
      'motor-group': 'motor',
      'lift-motor': 'motor',
      'air-conditioning': 'motor',

      // Specialist
      'small-power': 'small-power',
      'ev-charging': 'ev-charging', // BS 7671 Section 722.311: 100%
      'welding-equipment': 'dedicated-outlet', // 100% no diversity
      'server-equipment': 'dedicated-outlet', // 100% no diversity
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

    const voltage = parseFloat(supplyVoltage);

    // Convert loads to CircuitLoad format
    const circuits: CircuitLoad[] = loads.map((load) => {
      const connected = parseFloat(load.connectedLoad);
      const units = parseInt(load.numberOfUnits);
      const pf = parseFloat(load.powerFactor) || 0.9;

      let designCurrent: number;
      let installedPower: number;

      if (load.inputMode === 'kw') {
        installedPower = connected * units;
        designCurrent = (installedPower * 1000) / (voltage * pf);
      } else {
        designCurrent = connected * units;
        installedPower = (designCurrent * voltage) / 1000;
      }

      return {
        id: load.id,
        type: mapLoadTypeToEngineType(load.type),
        designCurrent,
        installedPower,
        quantity: units,
        location,
        hasCookerSocket: load.hasCookerSocket,
        thermostaticallyControlled: load.thermostaticallyControlled,
      };
    });

    try {
      const diversityResult = calculateDiversity(circuits, voltage, supplyType);
      setResult(diversityResult);
      setShowResults(true);
    } catch (error) {
      console.error('Diversity calculation error:', error);
      setResult(null);
      setShowResults(false);
    }
  };

  const resetCalculator = () => {
    setLoads([
      {
        id: '1',
        type: '',
        connectedLoad: '',
        numberOfUnits: '1',
        power: '',
        inputMode,
        powerFactor: '0.9',
        hasCookerSocket: false,
        thermostaticallyControlled: true,
      },
    ]);
    setLocation('domestic');
    setSupplyVoltage('230');
    setSupplyType('single-phase');
    setResult(null);
    setErrors({});
    setShowResults(false);
  };

  const clearError = (field: string) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    // State
    loads,
    location,
    supplyVoltage,
    supplyType,
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
    setSupplyType: (value: string) => setSupplyType(value as 'single-phase' | 'three-phase'),
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,

    // Data
    loadTypes: LOAD_TYPES,
  };
}
