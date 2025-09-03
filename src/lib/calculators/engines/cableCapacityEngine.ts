import { 
  getTemperatureFactor, 
  getSoilTemperatureFactor, 
  getGroupingFactor 
} from '../bs7671-data/temperatureFactors';
import { 
  getCableCapacity, 
  getNextCableSize, 
  CableType 
} from '../bs7671-data/cableCapacities';

export interface CableCapacityInputs {
  cableType: CableType;
  cableSize: number;
  ambientTemp: number;
  groupingCircuits: number;
  designCurrent: number;
  deviceRating: number;
  installationMethod: 'air' | 'soil';
  soilTemp?: number;
}

export interface CableCapacityResult {
  Ib: number; // Design current
  In: number; // Device rating
  Iz: number; // Cable current capacity (after derating)
  IzTabulated: number; // Tabulated capacity before derating
  factors: {
    temperature: number;
    grouping: number;
    overall: number;
  };
  compliance: {
    IbLeIn: boolean; // Ib ≤ In
    InLeIz: boolean; // In ≤ Iz
    overallCompliant: boolean;
    safetyMargin: number; // (Iz - In) / In * 100
  };
  nextSizes?: {
    cable?: { size: number; capacity: number };
    device?: number;
  };
  equation: string;
}

export const calculateCableCapacity = (inputs: CableCapacityInputs): CableCapacityResult | null => {
  const { 
    cableType, 
    cableSize, 
    ambientTemp, 
    groupingCircuits, 
    designCurrent, 
    deviceRating,
    installationMethod,
    soilTemp = 20
  } = inputs;

  // Get tabulated cable capacity
  const cableData = getCableCapacity(cableType, cableSize);
  if (!cableData) return null;

  const IzTabulated = cableData.capacity;
  
  // Determine temperature rating based on cable type
  const temperatureRating = cableType.includes('xlpe') || cableType.includes('aluminium') ? '90C' : '70C';
  
  // Get derating factors using BS 7671 tables
  const temperatureFactor = installationMethod === 'soil' 
    ? getSoilTemperatureFactor(soilTemp, temperatureRating)
    : getTemperatureFactor(ambientTemp, temperatureRating);
    
  const groupingFactor = getGroupingFactor(groupingCircuits);
  const overallFactor = temperatureFactor * groupingFactor;
  
  // Calculate derated capacity
  const Iz = IzTabulated * overallFactor;
  
  // Check compliance with BS 7671 requirements
  const IbLeIn = designCurrent <= deviceRating;
  const InLeIz = deviceRating <= Iz;
  const overallCompliant = IbLeIn && InLeIz;
  
  // Calculate safety margin
  const safetyMargin = ((Iz - deviceRating) / deviceRating) * 100;
  
  // Find next sizes if not compliant
  let nextSizes: { cable?: { size: number; capacity: number }; device?: number } = {};
  
  if (!InLeIz) {
    const nextCable = getNextCableSize(cableType, cableSize);
    if (nextCable) {
      const nextIz = nextCable.capacity * overallFactor;
      nextSizes.cable = { 
        size: nextCable.size, 
        capacity: Math.round(nextIz) 
      };
    }
  }
  
  if (!IbLeIn) {
    // Standard device ratings: 6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125
    const standardRatings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400];
    const nextDevice = standardRatings.find(rating => rating >= designCurrent && rating <= Iz);
    if (nextDevice) {
      nextSizes.device = nextDevice;
    }
  }

  // Build equation string
  const factorStrings = [
    `Ca = ${temperatureFactor.toFixed(3)}`,
    `Cg = ${groupingFactor.toFixed(3)}`
  ];
  
  const equation = `Iz = It × Ca × Cg = ${IzTabulated} × ${factorStrings.join(' × ')} = ${Iz.toFixed(1)}A`;

  return {
    Ib: designCurrent,
    In: deviceRating,
    Iz: Math.round(Iz * 10) / 10, // Round to 1 decimal
    IzTabulated,
    factors: {
      temperature: temperatureFactor,
      grouping: groupingFactor,
      overall: overallFactor
    },
    compliance: {
      IbLeIn,
      InLeIz,
      overallCompliant,
      safetyMargin: Math.round(safetyMargin * 10) / 10
    },
    nextSizes,
    equation
  };
};

export const getRecommendations = (result: CableCapacityResult): string[] => {
  const recommendations: string[] = [];
  
  if (!result.compliance.IbLeIn) {
    if (result.nextSizes.device) {
      recommendations.push(`Increase protective device to ${result.nextSizes.device}A or reduce design current`);
    } else {
      recommendations.push('Design current exceeds maximum protective device rating for this cable');
    }
  }
  
  if (!result.compliance.InLeIz) {
    if (result.nextSizes.cable) {
      recommendations.push(`Upgrade to ${result.nextSizes.cable.size}mm² cable (Iz = ${result.nextSizes.cable.capacity}A)`);
    } else {
      recommendations.push('Consider alternative installation method or cable type');
    }
  }
  
  if (result.compliance.overallCompliant) {
    if (result.compliance.safetyMargin < 10) {
      recommendations.push('Consider next size up for improved safety margin');
    } else if (result.compliance.safetyMargin > 50) {
      recommendations.push('Cable may be oversized - consider smaller size if installation allows');
    }
  }
  
  if (result.factors.overall < 0.7) {
    recommendations.push('Low derating factors - review installation conditions');
  }
  
  return recommendations;
};