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
import { findInverterById, checkInverterCompatibility } from '@/data/solarInverterDatabase';
// Shared with the plug-in solar assessment — see src/data/dnoByPostcode.ts
import { DNO_BY_POSTCODE } from '@/data/dnoByPostcode';

// UK DNO regions by postcode prefix

// Standard gPV string-fuse ratings (A). Suggest the next size ≥ 1.5× Isc
// (BS 7671 712.43x / IEC 62548), so the installer doesn't size it by hand.
const STD_PV_FUSES = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 25, 30, 32, 40, 50, 63];
const suggestPvFuse = (isc: number): number => {
  if (!isc || isc <= 0) return 0;
  const min = isc * 1.5;
  return STD_PV_FUSES.find((f) => f >= min) ?? Math.ceil(min);
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
      return sum + array.panelWattage * array.panelCount;
    }, 0);

    return Math.round(totalWp / 10) / 100; // kWp with 2 decimal places
  }, [formData.arrays]);

  // Calculate estimated annual yield
  const calculateEstimatedYield = useCallback((): number => {
    if (!formData.arrays || formData.arrays.length === 0) return 0;

    // Calculate yield for each array and sum
    const totalYield = formData.arrays.reduce((sum, array) => {
      const arrayCapacity = (array.panelWattage * array.panelCount) / 1000;
      return (
        sum +
        estimateAnnualYield(arrayCapacity, array.orientation, array.tiltAngle, array.shadingFactor)
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
    const stringIsc = calculateStringIsc(array.iscRated, stringsInParallel);

    return {
      arrayCapacity: calculateArrayCapacity(array.panelWattage, array.panelCount),
      stringVoltageVoc: calculateStringVoc(array.vocRated, panelsPerString),
      stringVoltageVmp: calculateStringVoc(array.vmpRated, panelsPerString),
      stringCurrentIsc: stringIsc,
      stringCurrentImp: calculateStringIsc(array.impRated, stringsInParallel),
      // Smart compliance defaults — fill only when unset so manual edits stick.
      dcEarthCableSize: array.dcEarthCableSize || array.dcCableSize || 6,
      stringOcpdDcRatingV: array.stringOcpdDcRatingV || 1000,
      stringOcpdRatingA: array.stringOcpdRatingA || suggestPvFuse(stringIsc),
    };
  }, []);

  // Suggest G98 or G99 based on capacity and phases
  const suggestG98OrG99 = useCallback(
    (totalCapacityKw: number, phases: 'single' | 'three'): 'G98' | 'G99' => {
      // G98: Up to 16A per phase (single phase ~3.68kW, three phase ~11.04kW)
      // G99: Above these thresholds or as required by DNO
      const g98Threshold = phases === 'single' ? 3.68 : 11.04;

      return totalCapacityKw <= g98Threshold ? 'G98' : 'G99';
    },
    []
  );

  // Suggest DNO by postcode
  const suggestDNOByPostcode = useCallback(
    (postcode: string): { name: string; region: string } | null => {
      if (!postcode) return null;

      // Extract postcode prefix (letters before numbers)
      const match = postcode
        .toUpperCase()
        .trim()
        .match(/^([A-Z]+)/);
      if (!match) return null;

      const prefix = match[1];

      // Try full prefix first, then first letter only
      return DNO_BY_POSTCODE[prefix] || DNO_BY_POSTCODE[prefix.charAt(0)] || null;
    },
    []
  );

  // Validate inverter compatibility with arrays
  const validateInverterCompatibility = useCallback(
    (
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
          result.warnings.forEach((w) => allWarnings.push(`Array ${index + 1}: ${w}`));
          result.errors.forEach((e) => allErrors.push(`Array ${index + 1}: ${e}`));
        }
      });

      // Check total DC power
      const totalDcPower = arrays.reduce((sum, a) => sum + a.arrayCapacity, 0);
      if (totalDcPower > inverter.ratedPowerDc * 1.3) {
        allWarnings.push(
          `Total array power (${totalDcPower.toFixed(1)}kW) exceeds recommended max DC input (${(inverter.ratedPowerDc * 1.3).toFixed(1)}kW)`
        );
      }

      return {
        compatible: allErrors.length === 0,
        warnings: allWarnings,
        errors: allErrors,
      };
    },
    []
  );

  // Validate MPAN format
  const validateMPAN = useCallback((mpan: string): { valid: boolean; error?: string } => {
    // Remove spaces and dashes
    const cleaned = mpan.replace(/[\s-]/g, '');

    // MPAN should be 13 or 21 digits
    if (!/^\d{13}$/.test(cleaned) && !/^\d{21}$/.test(cleaned)) {
      return {
        valid: false,
        error: 'MPAN should be 13 or 21 digits (spaces/dashes allowed)',
      };
    }

    return { valid: true };
  }, []);

  // Initialize array tests based on arrays
  const initializeArrayTests = useCallback(() => {
    const existingTests = formData.testResults?.arrayTests || [];
    const newTests = formData.arrays.map((array) => {
      const existing = existingTests.find((t) => t.arrayId === array.id);
      if (existing) return existing;

      const test = getDefaultArrayTestResult(array.id);
      // Pre-fill expected values from array
      test.vocExpected = array.stringVoltageVoc;
      test.iscExpected = array.stringCurrentIsc;
      return test;
    });

    onUpdate('testResults', {
      ...formData.testResults,
      arrayTests: newTests,
    });
  }, [formData.arrays, formData.testResults, onUpdate]);

  // Initialize inverter tests based on inverters
  const initializeInverterTests = useCallback(() => {
    const existingTests = formData.testResults?.inverterTests || [];
    const newTests = formData.inverters.map((inverter) => {
      const existing = existingTests.find((t) => t.inverterId === inverter.id);
      if (existing) return existing;
      return getDefaultInverterTestResult(inverter.id);
    });

    onUpdate('testResults', {
      ...formData.testResults,
      inverterTests: newTests,
    });
  }, [formData.inverters, formData.testResults, onUpdate]);

  // Update array with panel selection (auto-fill specs)
  const updateArrayWithPanelSelection = useCallback(
    (
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
      const newTotalCapacity = updatedArrays.reduce(
        (sum, a) => sum + (a.panelWattage * a.panelCount) / 1000,
        0
      );
      updateFn('totalCapacity', Math.round(newTotalCapacity * 100) / 100);

      const newYield = updatedArrays.reduce((sum, a) => {
        const cap = (a.panelWattage * a.panelCount) / 1000;
        return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
      }, 0);
      updateFn('estimatedAnnualYield', Math.round(newYield));
    },
    [calculateArrayValues]
  );

  // Update inverter with selection (auto-fill specs)
  const updateInverterWithSelection = useCallback(
    (
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
    },
    []
  );

  // Recalculate all dependent values
  const recalculateAllValues = useCallback(
    (currentFormData: SolarPVFormData, updateFn: (field: string, value: any) => void) => {
      // Recalculate array values
      const updatedArrays = currentFormData.arrays.map((array) => ({
        ...array,
        ...calculateArrayValues(array),
      }));
      updateFn('arrays', updatedArrays);

      // Recalculate totals
      const totalCapacity = updatedArrays.reduce(
        (sum, a) => sum + (a.panelWattage * a.panelCount) / 1000,
        0
      );
      updateFn('totalCapacity', Math.round(totalCapacity * 100) / 100);

      const totalYield = updatedArrays.reduce((sum, a) => {
        const cap = (a.panelWattage * a.panelCount) / 1000;
        return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
      }, 0);
      updateFn('estimatedAnnualYield', Math.round(totalYield));

      // Update CO2 savings
      updateFn('co2SavingsAnnual', Math.round(totalYield * 0.233));
    },
    [calculateArrayValues]
  );

  // ============================================================================
  // Design Warnings — fire alarm-style intelligence
  // ============================================================================

  const getDesignWarnings = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (formData: Record<string, any>): { field: string; message: string; severity: 'warning' | 'error' }[] => {
      const warnings: { field: string; message: string; severity: 'warning' | 'error' }[] = [];
      const arrays = formData.arrays || [];
      const inverters = formData.inverters || [];

      // Total capacity
      const totalKwp = arrays.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sum: number, a: any) => sum + (a.panelWattage * a.panelCount) / 1000,
        0
      );

      // Inverter sizing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const totalInverterAc = inverters.reduce((sum: number, inv: any) => sum + (inv.ratedPowerAc || 0), 0);
      if (totalInverterAc > 0 && totalKwp > 0) {
        if (totalInverterAc < totalKwp * 0.8) {
          warnings.push({
            field: 'inverters',
            message: `Inverter may be undersized (${totalInverterAc}kW AC for ${totalKwp.toFixed(1)}kWp array)`,
            severity: 'warning',
          });
        }
        if (totalInverterAc > totalKwp * 1.3) {
          warnings.push({
            field: 'inverters',
            message: `Inverter significantly oversized (${totalInverterAc}kW AC for ${totalKwp.toFixed(1)}kWp array)`,
            severity: 'warning',
          });
        }
      }

      // Battery without Type B RCD
      const hasBattery = formData.batteryInstalled || formData.battery?.installed;
      const systemType = formData.systemType;
      const rcdType = formData.acTests?.rcdType || formData.testResults?.acTests?.rcdType;
      if ((hasBattery || systemType === 'hybrid') && rcdType && rcdType !== 'Type B') {
        warnings.push({
          field: 'acTests.rcdType',
          message: 'Type B RCD required for battery/hybrid systems per MIS 3002',
          severity: 'error',
        });
      }

      // G98/G99 threshold
      const phases = formData.gridConnection?.supplyPhases || 'single';
      const threshold = phases === 'three' ? 11.04 : 3.68;
      const appType = formData.gridConnection?.applicationType;
      if (totalKwp > threshold && appType === 'G98') {
        warnings.push({
          field: 'gridConnection.applicationType',
          message: `System (${totalKwp.toFixed(1)}kWp) exceeds G98 threshold (${threshold}kW) — G99 application required`,
          severity: 'error',
        });
      }

      // Export limiting without value
      if (formData.gridConnection?.exportLimited && !formData.gridConnection?.exportLimit) {
        warnings.push({
          field: 'gridConnection.exportLimit',
          message: 'Export limit value required when export limiting is enabled',
          severity: 'warning',
        });
      }

      // Bidirectional device for hybrid
      if (
        (hasBattery || systemType === 'hybrid') &&
        !formData.acTests?.bidirectionalDeviceInstalled &&
        !formData.testResults?.acTests?.bidirectionalDeviceInstalled
      ) {
        warnings.push({
          field: 'acTests.bidirectionalDeviceInstalled',
          message: 'Bidirectional protection required per BS 7671:2018+A4:2026 Reg. 530.3.201',
          severity: 'error',
        });
      }

      // High shading
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      arrays.forEach((a: any, i: number) => {
        if (a.shadingFactor && a.shadingFactor < 0.8) {
          warnings.push({
            field: `arrays[${i}].shadingFactor`,
            message: `Array ${i + 1}: High shading (${Math.round((1 - a.shadingFactor) * 100)}%) — consider micro-inverters or optimisers`,
            severity: 'warning',
          });
        }
      });

      // String voltage exceeds inverter max
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      arrays.forEach((a: any, i: number) => {
        if (a.stringVoc && inverters[0]?.maxInputVoltage) {
          if (a.stringVoc > inverters[0].maxInputVoltage) {
            warnings.push({
              field: `arrays[${i}].stringVoc`,
              message: `Array ${i + 1}: String Voc (${a.stringVoc}V) exceeds inverter max input (${inverters[0].maxInputVoltage}V)`,
              severity: 'error',
            });
          }
        }
      });

      // Missing MCS number
      if (!formData.mcsDetails?.installerNumber) {
        warnings.push({
          field: 'mcsDetails.installerNumber',
          message: 'MCS installer number required for certification',
          severity: 'warning',
        });
      }

      // RCD Type AC selected (not suitable for PV)
      if (rcdType === 'Type AC') {
        warnings.push({
          field: 'acTests.rcdType',
          message: 'Type AC RCD is NOT suitable for PV installations — use Type A minimum',
          severity: 'error',
        });
      }

      return warnings;
    },
    []
  );

  // Suggest RCD type based on system configuration
  const suggestRCDType = useCallback(
    (systemType: string, hasBattery: boolean): { type: string; reason: string } => {
      if (hasBattery || systemType === 'hybrid') {
        return {
          type: 'Type B',
          reason: 'Required for battery/hybrid systems to detect DC fault currents (MIS 3002)',
        };
      }
      return {
        type: 'Type A',
        reason: 'Standard for grid-tied PV (detects pulsating DC + sinusoidal AC)',
      };
    },
    []
  );

  // Suggest bidirectional device requirement
  const suggestBidirectionalDevice = useCallback(
    (systemType: string, hasBattery: boolean): { required: boolean; reason: string } => {
      if (hasBattery || systemType === 'hybrid') {
        return {
          required: true,
          reason: 'BS 7671:2018+A4:2026 Reg. 530.3.201 requires bidirectional protection for systems that can export',
        };
      }
      return {
        required: false,
        reason: 'Not mandatory for grid-tied systems without battery, but recommended',
      };
    },
    []
  );

  // Validate test conditions per BS EN 62446
  const validateTestConditions = useCallback(
    (irradiance: number, temperature: number): { valid: boolean; warnings: string[] } => {
      const w: string[] = [];
      if (irradiance > 0 && irradiance < 400) {
        w.push(
          `Low irradiance (${irradiance} W/m²) — results may be unreliable per BS EN 62446. Minimum 400 W/m² recommended.`
        );
      }
      if (temperature > 40) {
        w.push(
          `High module temperature (${temperature}°C) — Voc will be significantly reduced. Apply temperature compensation.`
        );
      }
      if (temperature < 0) {
        w.push(
          `Sub-zero temperature (${temperature}°C) — Voc will be higher than STC. Check string voltage doesn't exceed inverter max.`
        );
      }
      return { valid: w.length === 0, warnings: w };
    },
    []
  );

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
    getDesignWarnings,
    suggestRCDType,
    suggestBidirectionalDevice,
    validateTestConditions,
  };
}
