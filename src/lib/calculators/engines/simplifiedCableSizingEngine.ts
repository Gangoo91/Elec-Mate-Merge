import { getTemperatureFactor, getGroupingFactor } from '../bs7671-data/temperatureFactors';
import { getCableCapacity, CableType } from '../bs7671-data/cableCapacities';
import { getReferenceMethod } from '../bs7671-data/installationMethodFactors';

export interface SimplifiedCableSizingInputs {
  current: number;
  installationType: string;
  ambientTemp?: number;
  groupingCircuits?: number;
  length: number; // Required for voltage drop calculation
  voltage: number; // Required for voltage drop calculation
  cableType?: CableType;
  voltageDropLimit?: number; // Default 5% for power, 3% for lighting
}

export interface SimplifiedCableSizingResult {
  recommendedSize: number;
  capacity: number;
  deratedCapacity: number;
  factors: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  safetyMargin: number;
  compliant: boolean;
  voltageDropPercent: number;
  voltageDropCompliant: boolean;
  selectionReason: 'current' | 'voltage-drop' | 'both';
}

// Helper function to calculate voltage drop (mV/A/m method)
const calculateVoltageDropPercent = (
  cableType: CableType,
  size: number,
  current: number,
  length: number,
  voltage: number
): number => {
  // BS 7671 Appendix 4 voltage drop data (mV/A/m)
  const voltageDropData: Record<string, Record<number, number>> = {
    'pvc-twin-earth': {
      1.0: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93
    },
    'xlpe-twin-earth': {
      1.0: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93
    },
    'pvc-single': {
      1.0: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.37, 150: 0.30, 185: 0.24, 240: 0.185, 300: 0.148
    },
    'xlpe-single': {
      1.0: 44, 1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.37, 150: 0.30, 185: 0.24, 240: 0.185, 300: 0.148
    },
    'swa': {
      1.5: 29, 2.5: 18, 4: 11, 6: 7.3, 10: 4.4, 16: 2.8, 25: 1.75, 35: 1.25, 50: 0.93, 70: 0.63, 95: 0.46, 120: 0.37, 150: 0.30, 185: 0.24, 240: 0.185, 300: 0.148
    }
  };

  const mvPerAPerM = voltageDropData[cableType]?.[size];
  if (!mvPerAPerM) return 999; // Return high value if data not found

  // Voltage drop in mV = (mV/A/m) × current × length
  const voltageDropMv = mvPerAPerM * current * length;
  
  // Convert to volts and then percentage
  const voltageDropV = voltageDropMv / 1000;
  return (voltageDropV / voltage) * 100;
};

// Intelligent cable sizing with voltage drop awareness
export const calculateSimplifiedCableSize = (inputs: SimplifiedCableSizingInputs): SimplifiedCableSizingResult | null => {
  const {
    current,
    installationType,
    ambientTemp = 30,
    groupingCircuits = 1,
    length,
    voltage,
    cableType = 'pvc-single',
    voltageDropLimit = 5
  } = inputs;

  // Distance-aware starting point to skip obviously undersized cables
  let startIndex = 0;
  const standardSizes = [1.0, 1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300];
  
  // Smart minimum cable size based on cable type and length
  // Outdoor/SWA cables minimum 2.5mm² (industry standard for robustness)
  if (cableType === 'swa' && startIndex < standardSizes.indexOf(2.5)) {
    startIndex = standardSizes.indexOf(2.5);
  }
  
  // For long runs, start from larger cables to save iterations
  if (length > 50) {
    startIndex = Math.max(startIndex, standardSizes.indexOf(4)); // Start from 4mm² for very long runs
  } else if (length > 30) {
    startIndex = Math.max(startIndex, standardSizes.indexOf(2.5)); // Start from 2.5mm² for long runs
  }
  
  for (let i = startIndex; i < standardSizes.length; i++) {
    const size = standardSizes[i];
    const cableData = getCableCapacity(cableType, size);
    if (!cableData) continue;

    // Get BS 7671 Reference Method from installation type
    const referenceMethod = getReferenceMethod(installationType);
    
    // Get base capacity for this reference method
    const baseCapacity = cableData.capacities[referenceMethod];
    if (!baseCapacity) {
      // Fallback to most conservative (lowest) capacity if reference method not found
      const capacities = Object.values(cableData.capacities);
      const fallbackCapacity = Math.min(...capacities);
      if (!fallbackCapacity) continue;
    }

    // Determine temperature rating
    const temperatureRating = cableType.includes('xlpe') || cableType.includes('aluminium') ? '90C' : '70C';
    
    // Get derating factors using BS 7671 tables
    const tempFactor = getTemperatureFactor(ambientTemp, temperatureRating);
    const groupingFactor = getGroupingFactor(groupingCircuits);
    const overallFactor = tempFactor * groupingFactor;
    
    // Calculate derated capacity (Iz)
    const deratedCapacity = baseCapacity * overallFactor;
    
    // ✅ BS 7671 RULE 1: Design current must have safety margin
    // Cable capacity must be >= Ib * 1.25 for reliability
    const currentWithMargin = current * 1.25;
    const currentCompliant = deratedCapacity >= currentWithMargin;
    
    // Calculate voltage drop
    const voltageDropPercent = calculateVoltageDropPercent(cableType, size, current, length, voltage);
    const voltageDropCompliant = voltageDropPercent <= voltageDropLimit;
    
    // ✅ BS 7671 RULE 2: Protection device must not exceed cable capacity
    // This validation happens in the designer agent when selecting MCB/RCBO
    // Here we just ensure cable can handle the design current safely
    
    if (currentCompliant && voltageDropCompliant) {
      const safetyMargin = ((deratedCapacity - current) / current) * 100;
      
      // Determine selection reason
      let selectionReason: 'current' | 'voltage-drop' | 'both' = 'both';
      if (i > 0) {
        const prevSize = standardSizes[i - 1];
        const prevCableData = getCableCapacity(cableType, prevSize);
        
        if (prevCableData) {
          const prevBaseCapacity = prevCableData.capacities[referenceMethod] || Math.min(...Object.values(prevCableData.capacities));
          const prevDeratedCapacity = prevBaseCapacity * overallFactor;
          const prevCurrentCompliant = prevDeratedCapacity >= currentWithMargin;
          const prevVD = calculateVoltageDropPercent(cableType, prevSize, current, length, voltage);
          
          if (prevVD > voltageDropLimit) {
            selectionReason = 'voltage-drop';
          } else if (!prevCurrentCompliant) {
            selectionReason = 'current';
          }
        }
      }
      
      return {
        recommendedSize: size,
        capacity: baseCapacity,
        deratedCapacity: Math.round(deratedCapacity * 10) / 10,
        factors: {
          temperature: tempFactor,
          grouping: groupingFactor,
          overall: overallFactor
        },
        safetyMargin: Math.round(safetyMargin * 10) / 10,
        compliant: currentCompliant && voltageDropCompliant,
        voltageDropPercent: Math.round(voltageDropPercent * 10) / 10,
        voltageDropCompliant,
        selectionReason
      };
    }
  }

  return null; // No suitable cable size found
};