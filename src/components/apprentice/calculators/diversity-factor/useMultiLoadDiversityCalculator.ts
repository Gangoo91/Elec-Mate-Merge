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

// Load types, described against the IET On-Site Guide Appendix A, Table A2.
//
// FIX (citations): the labels used to quote "Table A2 item N" and "Table H2
// item N". There is no diversity Table H2 in the On-Site Guide — Appendix H is
// standard circuit arrangements for household premises; the diversity table is
// Appendix A, Table A2. Row numbers are no longer quoted because they could not
// be verified. Non-domestic figures are designer allowances: Appendix A
// expressly excludes industrial and large commercial premises.
const LOAD_TYPES: Record<string, string> = {
  // Lighting — Table A2 lighting row
  'led-lighting': 'LED Lighting — 66% domestic (Table A2 lighting row)',
  'fluorescent-lighting': 'Fluorescent Lighting — 66% domestic (Table A2 lighting row)',
  'general-lighting': 'General Lighting — 66% domestic (Table A2 lighting row)',
  'emergency-lighting': 'Emergency Lighting — 100%, no reduction',

  // Socket outlets — Table A2 socket-outlet row
  'ring-main-sockets':
    'Ring Final Circuits — 100% of largest ring + 40% of every other (Table A2 socket-outlets)',
  'radial-sockets':
    'Radial Socket Outlets — 100% of largest + 40% of every other (Table A2 socket-outlets)',
  'dedicated-sockets': 'Dedicated Socket Outlets — 100%, no reduction',

  // Cooking & water heating
  'electric-cooker':
    'Electric Cooker — first 10A + 30% of remainder, +5A if the control unit has a socket (Table A2 cooking appliances)',
  'electric-shower':
    'Electric Shower — 100% largest + 100% 2nd + 25% remainder (Table A2 instantaneous water heaters)',
  'commercial-catering': 'Commercial Catering — 80%, designer allowance (outside Table A2)',
  'immersion-heater': 'Immersion Heater — 100%, no diversity (Table A2 thermostatic water heating)',
  'instantaneous-water': 'Instantaneous Water Heater — 100%, no diversity',

  // Space heating — Table A2 space heating row
  'electric-heating':
    'Electric Space Heating — 100% thermostatic / largest + 75% non-thermostatic (Table A2 space heating)',
  'heat-pumps': 'Heat Pump Systems — 100% thermostatic (Table A2 space heating)',
  'underfloor-heating': 'Underfloor Heating — 100%, no diversity (Table A2 floor warming)',

  // Motors & equipment — designer allowance, not published in Appendix A
  'single-motor': 'Single Phase Motor — 100% domestic, largest + 40% non-domestic (designer)',
  'motor-group': 'Motor Group — largest 100% + 40% remaining (designer allowance)',
  'lift-motor': 'Lift Motor — 100%, no reduction',
  'air-conditioning': 'Air Conditioning — largest 100% + 40% remaining (designer allowance)',

  // Specialist equipment
  'small-power': 'Small Power — 100% of largest + 40% of every other (Table A2 socket-outlets)',
  'ev-charging':
    'EV Charging — 100%, no diversity (Table A2 does not contemplate EV charge points)',
  'welding-equipment': 'Welding Equipment — 100%, no reduction',
  'server-equipment': 'Server/IT Equipment — 100%, no reduction',
};

// P = √3 · U_L · I · cosφ for a balanced three-phase load, P = U · I · cosφ for
// single-phase. FIX: the √3 used to be omitted when converting A → kW but
// applied by the engine when converting kW → A, so the round trip A → kW → A
// came back divided by √3 with nothing to cancel it, under-stating the design
// current by 42%. Power factor was likewise used in one direction only.
const phaseFactor = (supplyType: 'single-phase' | 'three-phase') =>
  supplyType === 'three-phase' ? Math.sqrt(3) : 1;

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
        const ph = phaseFactor(supplyType);
        const currentValue = parseFloat(load.connectedLoad);

        if (isNaN(currentValue) || isNaN(voltage)) return { ...load, inputMode: newMode };

        let convertedValue: number;
        if (newMode === 'kw' && load.inputMode === 'amperage') {
          convertedValue = (ph * voltage * currentValue * pf) / 1000;
        } else if (newMode === 'amperage' && load.inputMode === 'kw') {
          convertedValue = (currentValue * 1000) / (ph * voltage * pf);
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

    // Auto-calculate the "Calculated power" preview when load or units change.
    // FIX: this used to multiply the entered figure by the supply voltage
    // unconditionally, so in kW input mode it multiplied kW by 230 or 400, and
    // it omitted both √3 and the power factor in three-phase/pf cases.
    if (field === 'connectedLoad' || field === 'numberOfUnits') {
      const load = loads.find((l) => l.id === id);
      if (load) {
        const entered = parseFloat(
          field === 'connectedLoad' ? (value as string) : load.connectedLoad
        );
        const units = parseInt(field === 'numberOfUnits' ? (value as string) : load.numberOfUnits);
        const voltage = parseFloat(supplyVoltage);
        const pf = parseFloat(load.powerFactor) || 0.9;
        const ph = phaseFactor(supplyType);

        if (!isNaN(entered) && !isNaN(units) && !isNaN(voltage)) {
          const total = entered * units;
          const powerKW = load.inputMode === 'kw' ? total : (total * ph * voltage * pf) / 1000;
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
      // Lighting → 'lighting' (Table A2 lighting row: 66% domestic)
      'led-lighting': 'lighting',
      'fluorescent-lighting': 'lighting',
      'general-lighting': 'lighting',
      // FIX: 'emergency-lighting' used to map to 'lighting' and silently
      // received the 66% (domestic) / 90% (non-domestic) allowance, directly
      // contradicting its own dropdown label "Emergency Lighting — 100%, no
      // reduction". Mapped to a no-diversity type so the label and the maths
      // agree and the supply is sized for the full load.
      'emergency-lighting': 'emergency-lighting',

      // Socket types — Table A2 socket-outlet row
      'ring-main-sockets': 'ring-final',
      'radial-sockets': 'radial-socket',
      'dedicated-sockets': 'dedicated-outlet', // 100% no diversity

      // Cooking — Table A2 household cooking appliances
      'electric-cooker': 'cooker',
      'commercial-catering': 'cooker',

      // Water heating
      'immersion-heater': 'water-heating',
      'electric-shower': 'shower',
      'instantaneous-water': 'water-heating',

      // Space heating — Table A2 space heating row
      'electric-heating': 'space-heating',
      'heat-pumps': 'space-heating',
      'underfloor-heating': 'floor-warming',

      // Motors — designer allowance, not published in Appendix A
      'single-motor': 'motor',
      'motor-group': 'motor',
      // FIX: 'lift-motor' used to map to 'motor' and received largest-plus-40%
      // in commercial/industrial, contradicting its own dropdown label
      // "Lift Motor — 100%, no reduction".
      'lift-motor': 'lift-motor',
      'air-conditioning': 'motor',

      // Specialist
      'small-power': 'small-power',
      'ev-charging': 'ev-charging',
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
      const ph = phaseFactor(supplyType);

      let designCurrent: number;
      let installedPower: number;

      // Both directions now use P = √3 · U · I · cosφ (three-phase) or
      // P = U · I · cosφ (single-phase), so A → kW → A is lossless.
      if (load.inputMode === 'kw') {
        installedPower = connected * units;
        designCurrent = (installedPower * 1000) / (ph * voltage * pf);
      } else {
        designCurrent = connected * units;
        installedPower = (designCurrent * ph * voltage * pf) / 1000;
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
    // FIX: Supply Voltage and Supply Type were independent dropdowns, so
    // "400 V + Single Phase" and "230 V + Three Phase" were selectable and the
    // engine honoured them. A UK LV supply is 230 V line-to-neutral
    // single-phase or 400 V line-to-line three-phase, so the voltage now
    // follows the supply type.
    setSupplyType: (value: string) => {
      const next = value as 'single-phase' | 'three-phase';
      setSupplyType(next);
      setSupplyVoltage(next === 'three-phase' ? '400' : '230');
    },
    toggleInputMode,
    calculateDemand,
    resetCalculator,
    clearError,

    // Data
    loadTypes: LOAD_TYPES,
  };
}
