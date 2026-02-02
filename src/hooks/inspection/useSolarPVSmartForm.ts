/**
 * Smart Form Hook for Solar PV Certificate
 *
 * Provides intelligent auto-calculation, validation, and suggestions
 * for Solar PV installation certificates.
 */

import { useCallback, useMemo } from 'react';
import {
  SolarPVFormData,
  PVArray,
  Inverter,
  getDefaultArrayTestResult,
  getDefaultInverterTestResult,
} from '@/types/solar-pv';
import {
  calculateArrayCapacity,
  calculateStringVoc,
  calculateStringIsc,
  estimateAnnualYield,
  findPanelById,
} from '@/data/solarPanelDatabase';
import {
  findInverterById,
  checkInverterCompatibility,
} from '@/data/solarInverterDatabase';

// UK DNO regions by postcode prefix
const DNO_BY_POSTCODE: Record<string, { name: string; region: string }> = {
  // UK Power Networks - Eastern
  'CB': { name: 'UK Power Networks', region: 'Eastern' },
  'CO': { name: 'UK Power Networks', region: 'Eastern' },
  'IP': { name: 'UK Power Networks', region: 'Eastern' },
  'NR': { name: 'UK Power Networks', region: 'Eastern' },
  'PE': { name: 'UK Power Networks', region: 'Eastern' },
  'CM': { name: 'UK Power Networks', region: 'Eastern' },
  'SG': { name: 'UK Power Networks', region: 'Eastern' },
  'SS': { name: 'UK Power Networks', region: 'Eastern' },
  'AL': { name: 'UK Power Networks', region: 'Eastern' },
  'EN': { name: 'UK Power Networks', region: 'Eastern' },
  'HP': { name: 'UK Power Networks', region: 'Eastern' },
  'LU': { name: 'UK Power Networks', region: 'Eastern' },
  'MK': { name: 'UK Power Networks', region: 'Eastern' },
  'NN': { name: 'UK Power Networks', region: 'Eastern' },

  // UK Power Networks - London
  'E': { name: 'UK Power Networks', region: 'London' },
  'EC': { name: 'UK Power Networks', region: 'London' },
  'N': { name: 'UK Power Networks', region: 'London' },
  'NW': { name: 'UK Power Networks', region: 'London' },
  'SE': { name: 'UK Power Networks', region: 'London' },
  'SW': { name: 'UK Power Networks', region: 'London' },
  'W': { name: 'UK Power Networks', region: 'London' },
  'WC': { name: 'UK Power Networks', region: 'London' },
  'BR': { name: 'UK Power Networks', region: 'London' },
  'CR': { name: 'UK Power Networks', region: 'London' },
  'DA': { name: 'UK Power Networks', region: 'London' },
  'HA': { name: 'UK Power Networks', region: 'London' },
  'IG': { name: 'UK Power Networks', region: 'London' },
  'KT': { name: 'UK Power Networks', region: 'London' },
  'RM': { name: 'UK Power Networks', region: 'London' },
  'SM': { name: 'UK Power Networks', region: 'London' },
  'TW': { name: 'UK Power Networks', region: 'London' },
  'UB': { name: 'UK Power Networks', region: 'London' },
  'WD': { name: 'UK Power Networks', region: 'London' },

  // UK Power Networks - South Eastern
  'BN': { name: 'UK Power Networks', region: 'South Eastern' },
  'CT': { name: 'UK Power Networks', region: 'South Eastern' },
  'GU': { name: 'UK Power Networks', region: 'South Eastern' },
  'ME': { name: 'UK Power Networks', region: 'South Eastern' },
  'RH': { name: 'UK Power Networks', region: 'South Eastern' },
  'TN': { name: 'UK Power Networks', region: 'South Eastern' },

  // Scottish & Southern - Southern England
  'PO': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'SO': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'SP': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'BH': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'DT': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'BA': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'SN': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'OX': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'RG': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },
  'SL': { name: 'Scottish & Southern Electricity Networks', region: 'Southern' },

  // Western Power Distribution - West Midlands
  'B': { name: 'Western Power Distribution', region: 'West Midlands' },
  'CV': { name: 'Western Power Distribution', region: 'West Midlands' },
  'DY': { name: 'Western Power Distribution', region: 'West Midlands' },
  'ST': { name: 'Western Power Distribution', region: 'West Midlands' },
  'WS': { name: 'Western Power Distribution', region: 'West Midlands' },
  'WV': { name: 'Western Power Distribution', region: 'West Midlands' },

  // Western Power Distribution - East Midlands
  'DE': { name: 'Western Power Distribution', region: 'East Midlands' },
  'LE': { name: 'Western Power Distribution', region: 'East Midlands' },
  'NG': { name: 'Western Power Distribution', region: 'East Midlands' },
  'LN': { name: 'Western Power Distribution', region: 'East Midlands' },

  // Western Power Distribution - South West
  'BS': { name: 'Western Power Distribution', region: 'South West' },
  'EX': { name: 'Western Power Distribution', region: 'South West' },
  'GL': { name: 'Western Power Distribution', region: 'South West' },
  'PL': { name: 'Western Power Distribution', region: 'South West' },
  'TA': { name: 'Western Power Distribution', region: 'South West' },
  'TQ': { name: 'Western Power Distribution', region: 'South West' },
  'TR': { name: 'Western Power Distribution', region: 'South West' },

  // Western Power Distribution - South Wales
  'CF': { name: 'Western Power Distribution', region: 'South Wales' },
  'NP': { name: 'Western Power Distribution', region: 'South Wales' },
  'SA': { name: 'Western Power Distribution', region: 'South Wales' },

  // Scottish Power - North Wales & Merseyside
  'CH': { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  'L': { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  'WA': { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  'WN': { name: 'Scottish Power Energy Networks', region: 'Merseyside' },
  'LL': { name: 'Scottish Power Energy Networks', region: 'North Wales' },
  'SY': { name: 'Scottish Power Energy Networks', region: 'North Wales' },

  // Scottish Power - South Scotland
  'DG': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'EH': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'G': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'KA': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'ML': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'PA': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },
  'TD': { name: 'Scottish Power Energy Networks', region: 'South Scotland' },

  // Scottish & Southern - North Scotland
  'AB': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'DD': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'FK': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'IV': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'KW': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'KY': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'PH': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },
  'ZE': { name: 'Scottish & Southern Electricity Networks', region: 'North Scotland' },

  // Northern Powergrid - North East
  'DH': { name: 'Northern Powergrid', region: 'North East' },
  'DL': { name: 'Northern Powergrid', region: 'North East' },
  'NE': { name: 'Northern Powergrid', region: 'North East' },
  'SR': { name: 'Northern Powergrid', region: 'North East' },
  'TS': { name: 'Northern Powergrid', region: 'North East' },

  // Northern Powergrid - Yorkshire
  'BD': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'DN': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'HD': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'HG': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'HU': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'HX': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'LS': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'S': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'WF': { name: 'Northern Powergrid', region: 'Yorkshire' },
  'YO': { name: 'Northern Powergrid', region: 'Yorkshire' },

  // Electricity North West
  'BB': { name: 'Electricity North West', region: 'North West' },
  'BL': { name: 'Electricity North West', region: 'North West' },
  'CA': { name: 'Electricity North West', region: 'North West' },
  'CW': { name: 'Electricity North West', region: 'North West' },
  'FY': { name: 'Electricity North West', region: 'North West' },
  'LA': { name: 'Electricity North West', region: 'North West' },
  'M': { name: 'Electricity North West', region: 'North West' },
  'OL': { name: 'Electricity North West', region: 'North West' },
  'PR': { name: 'Electricity North West', region: 'North West' },
  'SK': { name: 'Electricity North West', region: 'North West' },

  // Northern Ireland
  'BT': { name: 'NIE Networks', region: 'Northern Ireland' },
};

interface UseSolarPVSmartFormReturn {
  // Auto-calculations
  calculateTotalCapacity: () => number;
  calculateEstimatedYield: () => number;
  calculateCO2Savings: (annualYieldKwh: number) => number;
  calculateArrayValues: (array: PVArray) => Partial<PVArray>;

  // Suggestions
  suggestG98OrG99: (totalCapacityKw: number, phases: 'single' | 'three') => 'G98' | 'G99';
  suggestDNOByPostcode: (postcode: string) => { name: string; region: string } | null;

  // Validation
  validateInverterCompatibility: (
    inverterId: string,
    arrays: PVArray[]
  ) => { compatible: boolean; warnings: string[]; errors: string[] };
  validateMPAN: (mpan: string) => { valid: boolean; error?: string };

  // Test result helpers
  initializeArrayTests: () => void;
  initializeInverterTests: () => void;

  // Smart updates
  updateArrayWithPanelSelection: (
    arrayIndex: number,
    panelId: string,
    currentFormData: SolarPVFormData,
    onUpdate: (field: string, value: any) => void
  ) => void;
  updateInverterWithSelection: (
    inverterIndex: number,
    inverterId: string,
    currentFormData: SolarPVFormData,
    onUpdate: (field: string, value: any) => void
  ) => void;

  // Recalculate all values
  recalculateAllValues: (
    formData: SolarPVFormData,
    onUpdate: (field: string, value: any) => void
  ) => void;
}

export function useSolarPVSmartForm(
  formData: SolarPVFormData,
  onUpdate: (field: string, value: any) => void
): UseSolarPVSmartFormReturn {

  // Calculate total system capacity from all arrays
  const calculateTotalCapacity = useCallback((): number => {
    if (!formData.arrays || formData.arrays.length === 0) return 0;

    const totalWp = formData.arrays.reduce((sum, array) => {
      return sum + (array.panelWattage * array.panelCount);
    }, 0);

    return Math.round(totalWp / 10) / 100; // kWp with 2 decimal places
  }, [formData.arrays]);

  // Calculate estimated annual yield
  const calculateEstimatedYield = useCallback((): number => {
    if (!formData.arrays || formData.arrays.length === 0) return 0;

    // Calculate yield for each array and sum
    const totalYield = formData.arrays.reduce((sum, array) => {
      const arrayCapacity = (array.panelWattage * array.panelCount) / 1000;
      return sum + estimateAnnualYield(
        arrayCapacity,
        array.orientation,
        array.tiltAngle,
        array.shadingFactor
      );
    }, 0);

    return Math.round(totalYield);
  }, [formData.arrays]);

  // Calculate CO2 savings (UK average: ~0.233 kg CO2/kWh)
  const calculateCO2Savings = useCallback((annualYieldKwh: number): number => {
    const co2PerKwh = 0.233; // UK grid average 2024
    return Math.round(annualYieldKwh * co2PerKwh);
  }, []);

  // Calculate array electrical values
  const calculateArrayValues = useCallback((array: PVArray): Partial<PVArray> => {
    const panelsPerString = array.panelsPerString || array.panelCount;
    const stringsInParallel = array.stringsInParallel || 1;

    return {
      arrayCapacity: calculateArrayCapacity(array.panelWattage, array.panelCount),
      stringVoltageVoc: calculateStringVoc(array.vocRated, panelsPerString),
      stringVoltageVmp: calculateStringVoc(array.vmpRated, panelsPerString),
      stringCurrentIsc: calculateStringIsc(array.iscRated, stringsInParallel),
      stringCurrentImp: calculateStringIsc(array.impRated, stringsInParallel),
    };
  }, []);

  // Suggest G98 or G99 based on capacity and phases
  const suggestG98OrG99 = useCallback((
    totalCapacityKw: number,
    phases: 'single' | 'three'
  ): 'G98' | 'G99' => {
    // G98: Up to 16A per phase (single phase ~3.68kW, three phase ~11.04kW)
    // G99: Above these thresholds or as required by DNO
    const g98Threshold = phases === 'single' ? 3.68 : 11.04;

    return totalCapacityKw <= g98Threshold ? 'G98' : 'G99';
  }, []);

  // Suggest DNO by postcode
  const suggestDNOByPostcode = useCallback((postcode: string): { name: string; region: string } | null => {
    if (!postcode) return null;

    // Extract postcode prefix (letters before numbers)
    const match = postcode.toUpperCase().trim().match(/^([A-Z]+)/);
    if (!match) return null;

    const prefix = match[1];

    // Try full prefix first, then first letter only
    return DNO_BY_POSTCODE[prefix] || DNO_BY_POSTCODE[prefix.charAt(0)] || null;
  }, []);

  // Validate inverter compatibility with arrays
  const validateInverterCompatibility = useCallback((
    inverterId: string,
    arrays: PVArray[]
  ): { compatible: boolean; warnings: string[]; errors: string[] } => {
    const inverter = findInverterById(inverterId);
    if (!inverter) {
      return { compatible: false, warnings: [], errors: ['Inverter not found'] };
    }

    const allWarnings: string[] = [];
    const allErrors: string[] = [];

    // Check each array
    arrays.forEach((array, index) => {
      if (array.stringVoltageVoc && array.stringCurrentIsc) {
        const result = checkInverterCompatibility(
          inverterId,
          array.stringVoltageVoc,
          array.stringCurrentIsc
        );
        result.warnings.forEach(w => allWarnings.push(`Array ${index + 1}: ${w}`));
        result.errors.forEach(e => allErrors.push(`Array ${index + 1}: ${e}`));
      }
    });

    // Check total DC power
    const totalDcPower = arrays.reduce((sum, a) => sum + a.arrayCapacity, 0);
    if (totalDcPower > inverter.ratedPowerDc * 1.3) {
      allWarnings.push(`Total array power (${totalDcPower.toFixed(1)}kW) exceeds recommended max DC input (${(inverter.ratedPowerDc * 1.3).toFixed(1)}kW)`);
    }

    return {
      compatible: allErrors.length === 0,
      warnings: allWarnings,
      errors: allErrors,
    };
  }, []);

  // Validate MPAN format
  const validateMPAN = useCallback((mpan: string): { valid: boolean; error?: string } => {
    // Remove spaces and dashes
    const cleaned = mpan.replace(/[\s-]/g, '');

    // MPAN should be 13 or 21 digits
    if (!/^\d{13}$/.test(cleaned) && !/^\d{21}$/.test(cleaned)) {
      return {
        valid: false,
        error: 'MPAN should be 13 or 21 digits (spaces/dashes allowed)'
      };
    }

    return { valid: true };
  }, []);

  // Initialize array tests based on arrays
  const initializeArrayTests = useCallback(() => {
    const existingTests = formData.testResults?.arrayTests || [];
    const newTests = formData.arrays.map(array => {
      const existing = existingTests.find(t => t.arrayId === array.id);
      if (existing) return existing;

      const test = getDefaultArrayTestResult(array.id);
      // Pre-fill expected values from array
      test.vocExpected = array.stringVoltageVoc;
      test.iscExpected = array.stringCurrentIsc;
      return test;
    });

    onUpdate('testResults', {
      ...formData.testResults,
      arrayTests: newTests
    });
  }, [formData.arrays, formData.testResults, onUpdate]);

  // Initialize inverter tests based on inverters
  const initializeInverterTests = useCallback(() => {
    const existingTests = formData.testResults?.inverterTests || [];
    const newTests = formData.inverters.map(inverter => {
      const existing = existingTests.find(t => t.inverterId === inverter.id);
      if (existing) return existing;
      return getDefaultInverterTestResult(inverter.id);
    });

    onUpdate('testResults', {
      ...formData.testResults,
      inverterTests: newTests
    });
  }, [formData.inverters, formData.testResults, onUpdate]);

  // Update array with panel selection (auto-fill specs)
  const updateArrayWithPanelSelection = useCallback((
    arrayIndex: number,
    panelId: string,
    currentFormData: SolarPVFormData,
    updateFn: (field: string, value: any) => void
  ) => {
    const panel = findPanelById(panelId);
    if (!panel) return;

    const updatedArrays = [...currentFormData.arrays];
    const currentArray = updatedArrays[arrayIndex];

    updatedArrays[arrayIndex] = {
      ...currentArray,
      panelMake: panel.make,
      panelModel: panel.model,
      panelWattage: panel.wattage,
      mcsCertified: panel.mcsCertified,
      vocRated: panel.voc,
      iscRated: panel.isc,
      vmpRated: panel.vmp,
      impRated: panel.imp,
    };

    // Recalculate array values
    const calculated = calculateArrayValues(updatedArrays[arrayIndex]);
    updatedArrays[arrayIndex] = {
      ...updatedArrays[arrayIndex],
      ...calculated,
    };

    updateFn('arrays', updatedArrays);

    // Update total capacity and yield
    const newTotalCapacity = updatedArrays.reduce((sum, a) =>
      sum + (a.panelWattage * a.panelCount) / 1000, 0
    );
    updateFn('totalCapacity', Math.round(newTotalCapacity * 100) / 100);

    const newYield = updatedArrays.reduce((sum, a) => {
      const cap = (a.panelWattage * a.panelCount) / 1000;
      return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
    }, 0);
    updateFn('estimatedAnnualYield', Math.round(newYield));
  }, [calculateArrayValues]);

  // Update inverter with selection (auto-fill specs)
  const updateInverterWithSelection = useCallback((
    inverterIndex: number,
    inverterId: string,
    currentFormData: SolarPVFormData,
    updateFn: (field: string, value: any) => void
  ) => {
    const inverter = findInverterById(inverterId);
    if (!inverter) return;

    const updatedInverters = [...currentFormData.inverters];
    const currentInverter = updatedInverters[inverterIndex];

    updatedInverters[inverterIndex] = {
      ...currentInverter,
      make: inverter.make,
      model: inverter.model,
      ratedPowerAc: inverter.ratedPowerAc,
      ratedPowerDc: inverter.ratedPowerDc,
      mcsCertified: inverter.mcsCertified,
      type: inverter.type,
      mpptCount: inverter.mpptCount,
      mpptVoltageRange: `${inverter.mpptVoltageMin}-${inverter.mpptVoltageMax}V`,
      maxInputVoltage: inverter.maxInputVoltage,
      maxInputCurrent: inverter.maxInputCurrent,
      efficiency: inverter.efficiency,
      phases: inverter.phases,
      g98g99Compliant: inverter.g98g99Compliant,
      batteryCompatible: inverter.batteryCompatible,
    };

    updateFn('inverters', updatedInverters);
  }, []);

  // Recalculate all dependent values
  const recalculateAllValues = useCallback((
    currentFormData: SolarPVFormData,
    updateFn: (field: string, value: any) => void
  ) => {
    // Recalculate array values
    const updatedArrays = currentFormData.arrays.map(array => ({
      ...array,
      ...calculateArrayValues(array),
    }));
    updateFn('arrays', updatedArrays);

    // Recalculate totals
    const totalCapacity = updatedArrays.reduce((sum, a) =>
      sum + (a.panelWattage * a.panelCount) / 1000, 0
    );
    updateFn('totalCapacity', Math.round(totalCapacity * 100) / 100);

    const totalYield = updatedArrays.reduce((sum, a) => {
      const cap = (a.panelWattage * a.panelCount) / 1000;
      return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
    }, 0);
    updateFn('estimatedAnnualYield', Math.round(totalYield));

    // Update CO2 savings
    updateFn('co2SavingsAnnual', Math.round(totalYield * 0.233));
  }, [calculateArrayValues]);

  return {
    calculateTotalCapacity,
    calculateEstimatedYield,
    calculateCO2Savings,
    calculateArrayValues,
    suggestG98OrG99,
    suggestDNOByPostcode,
    validateInverterCompatibility,
    validateMPAN,
    initializeArrayTests,
    initializeInverterTests,
    updateArrayWithPanelSelection,
    updateInverterWithSelection,
    recalculateAllValues,
  };
}
