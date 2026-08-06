import { useState } from 'react';
import { CalculatorValidator, ValidationResult } from '@/services/calculatorValidation';
import {
  getTemperatureFactor,
  getGroupingFactor,
  getSoilTemperatureFactor,
} from '@/lib/calculators/bs7671-data/temperatureFactors';
import {
  getInstallationMethodCode,
  getInstallationMethodTableRef,
  isUndergroundMethod,
  isDomesticInsulationMethod,
  getReferenceMethod,
} from '@/lib/calculators/bs7671-data/installationMethodFactors';
import {
  getSoilResistivityFactor,
  getDepthOfLayingFactor,
} from '@/lib/calculators/bs7671-data/soilAndBurialFactors';
import {
  CableType,
  cableCapacityData,
  getThermalInsulationCapacity,
} from '@/lib/calculators/bs7671-data/cableCapacities';
import {
  capacityTables,
  CableTypeKey,
} from '@/lib/calculators/bs7671-data/appendix4CurrentCapacity';
import { DeviceType, ratingsByDevice } from './useProtectiveDeviceCheck';

export type { CableType };
import { getVoltageDropValue } from '@/lib/calculators/bs7671-data/voltageDropTables';

export interface CableSizingInputs {
  current: string;
  length: string;
  installationType: 'pvc' | 'xlpe';
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
  // Protective device — BS 7671 App 4 §5.1.1 sizes the cable on the rated
  // current In of the protective device, not on Ib, and the semi-enclosed-fuse
  // rating factor Cf depends on the device type. Both must therefore be inputs.
  deviceType?: DeviceType;
  /** 'auto' = smallest standard rating >= Ib, otherwise a rating in amperes */
  deviceRating?: string;
}

export interface CableSizingErrors {
  [key: string]: string;
}

export interface DeratingFactors {
  Ca: number; // Ambient/soil temperature factor — Table 4B1 / 4B2
  Cg: number; // Grouping factor — Table 4C1
  Ci: number; // Thermal insulation factor — App 4 §2.6
  Cs: number; // Soil thermal resistivity factor — Table 4B3
  Cd: number; // Depth of laying factor — Table 4B4
  Cf: number; // Semi-enclosed fuse (BS 3036) factor — App 4 §5.1.1(c)(i)
  Cc: number; // Buried / in-duct factor — App 4 §5.1.1(c)(ii)
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
  nextCableSizeUp?: { size: number; capacity: number };
  /** Rated current In of the protective device the cable was sized on (A) */
  deviceRating?: number;
}

// Which verified Appendix 4 table actually supplies this cable type's numbers.
// cableCapacityData is projected from exactly these tables (see
// cableCapacities.ts), so the citation and the Table 4B1 ambient column are both
// read from here rather than re-typed — that is how they drifted apart before.
//
// 90 °C flat T&E is deliberately sized on the 70 °C Table 4D5 columns
// (accessories limit the conductor to 70 °C in practice), so it maps to
// 'twin-earth' and therefore correctly picks up the 70 °C Table 4B1 column.
const APPENDIX4_KEY: Partial<Record<CableType, CableTypeKey>> = {
  'pvc-single': 'pvc-single',
  'xlpe-single': 'xlpe-single',
  'pvc-twin-earth': 'twin-earth',
  'xlpe-twin-earth': 'twin-earth',
  swa: 'swa-pvc',
  micc: 'mineral-light',
};

// 🔴 This replaces a hand-typed table map that cited 4D4A for flat twin & earth
// (it is Table 4D5), 4D2A — a 70 °C thermoplastic MULTICORE table — for XLPE
// single-core (it is 4E1A), 4E1A for mineral-insulated cable (it is 4G1A), and
// the VOLTAGE-DROP table 4D4B as the source of a current-carrying capacity.
// Verified against the printed Appendix 4 table index.
const getCableTableReference = (cableType: CableType): string => {
  const key = APPENDIX4_KEY[cableType];
  return (key && capacityTables[key]?.sourceTable) || 'BS 7671 Appendix 4';
};

// 🔴 Table 4B1 has separate columns per insulation, INCLUDING a dedicated
// mineral column. The ambient factor must come from the column matching the
// insulation of the tabulated capacity actually used (App 4 §2.1). The old code
// derived it from the string 'xlpe' in the cable-type key, which gave the 90 °C
// column to XLPE twin & earth (sized on the 70 °C Table 4D5 columns) and the
// general 70 °C thermoplastic column to MICC.
const getAmbientInsulation = (cableType: CableType): '70C' | '90C' | '70C-mineral' => {
  const key = APPENDIX4_KEY[cableType];
  return (key && capacityTables[key]?.insulation) || '70C';
};

export const useCableSizing = () => {
  const [inputs, setInputs] = useState<CableSizingInputs>({
    current: '',
    length: '',
    installationType: 'pvc',
    voltageDrop: '5',
    voltage: '230',
    cableType: 'pvc-twin-earth',
    cores: '2',
    soilResistivity: '2.5',
    burialDepth: '0.7',
    // Power factor was displayed as 0.9 by the form but read as 1.0 by the
    // calculation because it was never initialised. Seeded here so the value
    // shown is the value used.
    powerFactor: '1.0',
    deviceType: 'mcb-b',
    deviceRating: 'auto',
  });

  // UI state for dropdowns to display selected values correctly
  const [uiSelections, setUiSelections] = useState({
    installationMethodUI: 'clipped-direct',
    cableTypeUI: 'pvc-twin-earth',
  });

  const [result, setResult] = useState<CableSizingResult>({
    recommendedCable: null,
    alternativeCables: [],
    errors: {},
  });

  const updateInput = (field: keyof CableSizingInputs, value: string) => {
    setInputs((prev) => {
      const updated = { ...prev, [field]: value };

      // Smart form: auto-update voltage when cores selection changes
      if (field === 'cores') {
        // 2-core = Single Phase = 230V, 3-core or 4-core = Three Phase = 400V
        updated.voltage = value === '2' ? '230' : '400';
      }

      return updated;
    });

    if (result.errors[field]) {
      clearError(field);
    }
  };

  const setInstallationType = (type: string) => {
    // Map professional terminology to simple insulation types
    const installationMapping: Record<string, 'pvc' | 'xlpe'> = {
      'clipped-direct': 'pvc',
      'in-conduit': 'pvc',
      'buried-direct': 'xlpe',
      'buried-duct': 'xlpe',
      'cable-tray': 'pvc',
      'free-air': 'pvc',
      pvc: 'pvc',
      xlpe: 'xlpe',
    };

    const mappedType = installationMapping[type] || 'pvc';
    setInputs((prev) => ({ ...prev, installationType: mappedType }));
    setUiSelections((prev) => ({ ...prev, installationMethodUI: type }));
  };

  const setCableType = (type: CableType) => {
    // Determine insulation type from cable type
    const xlpeTypes: CableType[] = ['xlpe-single', 'xlpe-twin-earth', 'aluminium-xlpe'];
    const installationType = xlpeTypes.includes(type) ? 'xlpe' : 'pvc';

    setInputs((prev) => ({
      ...prev,
      cableType: type,
      installationType,
    }));
    setUiSelections((prev) => ({ ...prev, cableTypeUI: type }));
  };

  const clearError = (field: string) => {
    if (result.errors[field]) {
      setResult((prev) => ({
        ...prev,
        errors: Object.keys(prev.errors).reduce((acc, key) => {
          if (key !== field) acc[key] = prev.errors[key];
          return acc;
        }, {} as CableSizingErrors),
      }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: CableSizingErrors = {};

    if (!inputs.current) {
      newErrors.current = 'Current is required';
    } else {
      const currentValue = parseFloat(inputs.current);
      if (isNaN(currentValue) || currentValue <= 0) {
        newErrors.current = 'Please enter a valid positive number';
      } else {
        const currentValidation = CalculatorValidator.validateInputRange(currentValue, 'current');
        if (!currentValidation.isValid) {
          newErrors.current = currentValidation.errors[0];
        }
      }
    }

    if (!inputs.length) {
      newErrors.length = 'Cable length is required';
    } else {
      const lengthValue = parseFloat(inputs.length);
      if (isNaN(lengthValue) || lengthValue <= 0) {
        newErrors.length = 'Please enter a valid positive number';
      } else {
        const lengthValidation = CalculatorValidator.validateInputRange(lengthValue, 'length');
        if (!lengthValidation.isValid) {
          newErrors.length = lengthValidation.errors[0];
        }
      }
    }

    if (!inputs.voltageDrop) {
      newErrors.voltageDrop = 'Voltage drop percentage is required';
    } else {
      const voltageDropValue = parseFloat(inputs.voltageDrop);
      if (isNaN(voltageDropValue) || voltageDropValue <= 0 || voltageDropValue > 15) {
        newErrors.voltageDrop = 'Please enter a voltage drop percentage between 0.1% and 15%';
      }
    }

    if (!inputs.voltage) {
      newErrors.voltage = 'Voltage is required';
    } else {
      const voltageValue = parseFloat(inputs.voltage);
      if (isNaN(voltageValue) || voltageValue <= 0) {
        newErrors.voltage = 'Please enter a valid positive number';
      } else {
        const voltageValidation = CalculatorValidator.validateInputRange(voltageValue, 'voltage');
        if (!voltageValidation.isValid) {
          newErrors.voltage = voltageValidation.errors[0];
        }
      }
    }

    if (!inputs.cableType) {
      newErrors.cableType = 'Cable type is required';
    }

    setResult((prev) => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to get correct capacity key based on cable type and reference method
  const getCapacityKey = (
    cableType: CableType,
    referenceMethod: string,
    cores: '2' | '3' | '4'
  ): string[] => {
    const coresSuffix = cores === '3' || cores === '4' ? '3' : '2';
    const coreLabel = cores === '3' || cores === '4' ? '3c' : '2c';

    // SWA multicore uses C2, C3, D2, D3, E2, E3
    if (cableType === 'swa') {
      const baseMethod = referenceMethod.charAt(0); // Extract C, D, E from C, D1, D2, E etc.
      return [
        `${baseMethod}${coresSuffix}`, // C2, C3, D2, D3, E2, E3
        `C${coresSuffix}`, // Fallback to clipped method
        'C2', // Ultimate fallback
      ];
    }

    // SWA single-core uses C-2c, C-3c, F-2c, F-3c format
    if (cableType === 'swa-single-core') {
      const baseMethod = referenceMethod.charAt(0);
      return [
        `${baseMethod}-${coreLabel}`, // C-2c, C-3c, F-2c, F-3c
        `C-${coreLabel}`, // Fallback
        'C-2c', // Ultimate fallback
      ];
    }

    // Standard cables use A1, A2, B, C, E, F, G
    // Map B1/B2 to B for trunking methods
    //
    // 🔴 D, D1 and D2 used to map to 'C' here, silently substituting the
    // Method C (clipped direct, in air) capacity column for a buried cable and
    // then applying the ground-temperature, soil-resistivity and depth factors
    // on top of an air-based value. Appendix 4 tabulates each buried Reference
    // Method in its OWN column, and only the armoured multicore tables have one
    // (flat T&E, Table 4D5, has no buried column at all). Underground runs on
    // non-armoured types are now rejected in calculateCableSize() instead of
    // being answered with the wrong column.
    //
    // Installation Methods 100-103 likewise have their own Table 4D5 columns
    // (handled by getThermalInsulationCapacity); they no longer fall back to the
    // Method A1 column, which is a different installation entirely.
    const standardMethodMap: Record<string, string> = {
      A: 'A1',
      A1: 'A1',
      A2: 'A2',
      B: 'B',
      B1: 'B', // Trunking on wall
      B2: 'B', // Trunking flush
      C: 'C',
      E: 'E',
      F: 'F',
      G: 'G',
    };

    const mappedMethod = standardMethodMap[referenceMethod] || 'C';
    return [mappedMethod, 'C']; // Fallback to C (clipped direct)
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

    // Diversity is part of assessing the design current Ib (Reg 311.1); the
    // protective device is then chosen so that Ib <= In (Reg 433.1.1(a)).
    const effectiveDesignCurrent = designCurrent * diversityFactor;

    // Get installation method details
    const installationMethod = uiSelections.installationMethodUI;
    const isUnderground = isUndergroundMethod(installationMethod);
    const isDomesticInsulation = isDomesticInsulationMethod(installationMethod);
    // The D1/D2 reversal this used to work around has been fixed at source in
    // cableRunToReferenceMethod, so the local override is gone. An unknown key
    // now yields null rather than silently resolving to Method C.
    const referenceMethod = getReferenceMethod(installationMethod);
    const tableRef = getInstallationMethodTableRef(installationMethod);

    // 🔴 Appendix 4 tabulates buried Reference Methods D1/D2 only for armoured
    // cables; the non-armoured and flat T&E tables have no buried column. The
    // calculator used to substitute the Method C (in air) column and derate it,
    // producing an authoritative-looking answer with no basis in the standard.
    if (isUnderground && cableType !== 'swa') {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          general:
            'BS 7671 Appendix 4 tabulates the buried Reference Methods (D1 in ducting, D2 direct in the ground) only for armoured cables. Select SWA Multicore Armoured for an underground run, or choose an above-ground installation method.',
        },
      });
      return;
    }

    // Installation Methods 100-103 are flat twin & earth columns of Table 4D5.
    if (
      isDomesticInsulation &&
      cableType !== 'pvc-twin-earth' &&
      cableType !== 'xlpe-twin-earth'
    ) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          general:
            'BS 7671 Installation Methods 100-103 (cable in or above thermal insulation) are tabulated for flat twin & earth only. Select Flat Twin & Earth, or choose a different installation method.',
        },
      });
      return;
    }

    // Protective device — BS 7671 App 4 §5.1.1 sizes the cable on the rated
    // current In of the protective device, not on Ib. Reg 433.1.1 requires
    // Ib <= In <= Iz, so sizing on Ib alone skips the device step entirely and
    // lets a 32 A breaker sit on a cable chosen for a 25 A load.
    const deviceType: DeviceType = inputs.deviceType || 'mcb-b';
    const standardRatings = ratingsByDevice[deviceType] ?? ratingsByDevice['mcb-b'];
    const requestedRating = parseFloat(inputs.deviceRating || '');
    const deviceRating =
      Number.isFinite(requestedRating) && requestedRating > 0
        ? requestedRating
        : (standardRatings.find((r) => r >= effectiveDesignCurrent) ??
          standardRatings[standardRatings.length - 1]);

    // Calculate maximum allowable voltage drop in volts
    const maxVoltageDrop = (maxVoltageDropPercentage / 100) * supplyVoltage;

    // Table 4B1 column matching the insulation of the tabulated capacity used.
    const ambientInsulation = getAmbientInsulation(cableType);

    // Calculate all BS 7671 Appendix 4 correction factors
    // Ca - Temperature factor (use soil temp for underground, ambient for others)
    const Ca = isUnderground
      ? getSoilTemperatureFactor(ambientTemp, ambientInsulation === '90C' ? '90C' : '70C')
      : getTemperatureFactor(ambientTemp, ambientInsulation);

    // Cg - Grouping factor
    const Cg = getGroupingFactor(cableGrouping);

    // Ci - thermal insulation.
    //
    // 🔴 This was `getInstallationMethodFactor(installationMethod)`, which DOUBLE-COUNTED.
    // BS 7671 does not publish installation-method multipliers: Appendix 4 gives each
    // reference method its OWN tabulated Iz column, and the lookup below already selects
    // the right one via getCapacityKey(). Multiplying that column by a second
    // method-derived factor applied the method twice — 0.77 on top of an already-lower
    // Method A column, and, worse, 1.15 on Method G, which INFLATED the rating by 15%
    // and under-sized the cable. No rating factor in Appendix 4 exceeds 1.0.
    //
    // Thermal insulation is likewise already in the tabulated values: Installation
    // Methods 100-103 have their own columns, selected below. So there is nothing left
    // for a separate Ci to do here.
    const Ci = 1.0;

    // Cs - Soil thermal resistivity factor (underground only)
    const burialType = installationMethod === 'buried-duct' ? 'duct' : 'direct';
    const Cs = isUnderground ? getSoilResistivityFactor(soilResistivity, burialType) : 1.0;

    // Cd - Depth of laying factor (underground only)
    const Cd = isUnderground ? getDepthOfLayingFactor(burialDepth, burialType) : 1.0;

    // Cf - semi-enclosed fuse. App 4 §5.1.1(c)(i): "Where the protective device
    // is a semi-enclosed fuse to BS 3036, Cf = 0.725. Otherwise Cf = 1."
    // (0.725 = 1.45/2, matching Reg 433.1.202.) This was missing entirely.
    const Cf = deviceType === 'fuse-rewireable' ? 0.725 : 1.0;

    // Cc - buried installations. App 4 §5.1.1(c)(ii): "Where the cable
    // installation method is 'in a duct in the ground' or 'buried direct',
    // Cc = 0.9. For cables installed above ground Cc = 1." Also missing.
    const Cc = isUnderground ? 0.9 : 1.0;

    // Calculate total derating
    const totalDerating = Ca * Cg * Ci * Cs * Cd * Cf * Cc;

    // App 4 §5.1.1 / Reg 433.1.1: It >= In / (Ca·Cs·Cd·Ci·Cf·Cc), where In is the
    // RATED CURRENT OF THE PROTECTIVE DEVICE. The old code divided the design
    // current Ib by the factors, which skips the device step and under-sizes the
    // conductor whenever In > Ib (which is almost always).
    const requiredTabulatedCapacity = deviceRating / totalDerating;

    // Store derating factors for display
    const deratingFactors: DeratingFactors = {
      Ca,
      Cg,
      Ci,
      Cs,
      Cd,
      Cf,
      Cc,
      total: totalDerating,
      referenceMethod,
      tableRef,
    };

    // Get all available cable sizes for this type from BS 7671 tables
    const cableDataArray = cableCapacityData[cableType];
    if (!cableDataArray || cableDataArray.length === 0) {
      setResult({
        recommendedCable: null,
        alternativeCables: [],
        errors: {
          cableType: `No cable data available for ${cableType}. Available types: ${Object.keys(cableCapacityData).join(', ')}`,
        },
      });
      return;
    }

    // Build cable options with BS 7671 data
    const cableOptions: BS7671CableOption[] = [];

    for (const cableData of cableDataArray) {
      // Get tabulated capacity for the reference method
      let tabulatedCapacity: number | null = null;

      // Handle domestic thermal insulation methods (100-103)
      if (
        isDomesticInsulation &&
        (cableType === 'pvc-twin-earth' || cableType === 'xlpe-twin-earth')
      ) {
        const thermalMethod = installationMethod.includes('below100')
          ? '100e'
          : installationMethod.includes('over100')
            ? '101e'
            : installationMethod.includes('not-touching')
              ? '103e'
              : '102e';
        const thermalCap = getThermalInsulationCapacity(
          cableData.size,
          thermalMethod as '100e' | '101e' | '102e' | '103e'
        );
        if (thermalCap) tabulatedCapacity = thermalCap;
      }

      // Standard reference method lookup using the helper function
      if (!tabulatedCapacity) {
        const capacityKeys = getCapacityKey(cableType, referenceMethod, cores);

        for (const key of capacityKeys) {
          if (cableData.capacities[key]) {
            tabulatedCapacity = cableData.capacities[key];
            break;
          }
        }

        // Final fallback: get minimum of all available capacities (conservative)
        if (!tabulatedCapacity) {
          const capacityValues = Object.values(cableData.capacities).filter(
            (v) => typeof v === 'number'
          ) as number[];
          if (capacityValues.length > 0) {
            tabulatedCapacity = Math.min(...capacityValues);
          }
        }
      }

      if (!tabulatedCapacity) continue;

      // Calculate derated capacity
      const deratedCapacity = tabulatedCapacity * totalDerating;

      // Get voltage drop from BS 7671 tables.
      // Phase count is a property of the circuit, not of the voltage magnitude:
      // a 110 V site supply can be three-phase, and the 110 V option is offered
      // in the voltage list. The core selection is taken as the primary signal.
      const isThreePhase = cores === '3' || cores === '4' || supplyVoltage > 250;
      const voltageDropMvAm = getVoltageDropValue(
        cableType,
        cableData.size,
        isThreePhase,
        referenceMethod
      );

      // App 4 §6.2 — correction for load power factor. For conductors of
      // 16 mm² or less the design value is the tabulated mV/A/m × cos φ. ABOVE
      // 16 mm² it is the VECTOR sum cos φ·(mV/A/m)r + sin φ·(mV/A/m)x, which is
      // not a scalar scaling of the tabulated impedance (mV/A/m)z. The tables
      // module exposes only the z component, so above 16 mm² the tabulated
      // impedance is used unmodified — App 4 §6 states the direct use of the
      // tabulated value is the (pessimistically high) baseline, so this errs on
      // the safe side. Applying cos φ to z there under-stated the drop.
      const powerFactorCorrection = cableData.size <= 16 ? powerFactor : 1;

      // Calculate actual voltage drop: ΔV = mV/A/m × Ib × L / 1000
      const calculatedVoltageDrop =
        (voltageDropMvAm * designCurrent * cableLength * powerFactorCorrection) / 1000;
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
        // Reg 433.1.1(b): In <= Iz. The comparison used to be against Ib.
        meetsCurrentCapacity: deratedCapacity >= deviceRating,
        tableReference: `${getCableTableReference(cableType)} Col ${referenceMethod}`,
      });
    }

    // Sort by size ascending
    cableOptions.sort((a, b) => a.size - b.size);

    // Find cables that meet both criteria
    const compliantCables = cableOptions.filter(
      (c) => c.meetsCurrentCapacity && c.meetsVoltageDrop
    );

    if (compliantCables.length === 0) {
      // Find best available options for feedback
      const byCurrentCapacity = [...cableOptions].filter((c) => c.meetsCurrentCapacity);
      const byVoltageDrop = [...cableOptions].sort(
        (a, b) => a.voltageDropPercent - b.voltageDropPercent
      );

      let errorMessage = '';
      if (byCurrentCapacity.length === 0) {
        const maxCapacity = Math.max(...cableOptions.map((c) => c.deratedCapacity));
        errorMessage = `No cable meets the required capacity. Reg 433.1.1 needs Iz ≥ In = ${deviceRating}A (device rating); the largest tabulated size gives only ${maxCapacity}A after derating (It ≥ ${requiredTabulatedCapacity.toFixed(1)}A required). Consider using parallel cables, a lower device rating or a different cable type.`;
      } else {
        const bestVD = byCurrentCapacity[byCurrentCapacity.length - 1];
        errorMessage = `No cable meets both current capacity and voltage drop requirements. Best option: ${bestVD.sizeLabel} with ${bestVD.voltageDropPercent.toFixed(1)}% voltage drop (limit: ${maxVoltageDropPercentage}%). Consider shorter route or larger cable.`;
      }

      setResult({
        recommendedCable: null,
        alternativeCables: byVoltageDrop.slice(0, 3),
        errors: { general: errorMessage },
        deratingFactors,
      });
      return;
    }

    // Recommended: smallest compliant cable
    const recommended = compliantCables[0];
    const alternatives = compliantCables.slice(1, 4);

    // Get next cable size up for protective device suggestions
    const nextCableSizeUp =
      alternatives.length > 0
        ? { size: alternatives[0].size, capacity: alternatives[0].deratedCapacity }
        : undefined;

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
      deratingFactors,
      nextCableSizeUp,
      deviceRating,
    });
  };

  const resetCalculator = () => {
    setInputs({
      current: '',
      length: '',
      installationType: 'pvc',
      voltageDrop: '5',
      voltage: '230',
      cableType: 'pvc-twin-earth',
      cores: '2',
      ambientTemp: '30',
      cableGrouping: '1',
      loadType: 'resistive',
      diversityFactor: '1.0',
      powerFactor: '1.0',
      soilResistivity: '2.5',
      burialDepth: '0.7',
      deviceType: 'mcb-b',
      deviceRating: 'auto',
    });
    setUiSelections({
      installationMethodUI: 'clipped-direct',
      cableTypeUI: 'pvc-twin-earth',
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
