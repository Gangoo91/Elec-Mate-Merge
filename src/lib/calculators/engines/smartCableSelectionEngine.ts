// Smart Cable Selection Engine with Real-World Logic
import { getCablePricing, findOptimalCable, ENHANCED_CABLE_DATABASE } from '../bs7671-data/comprehensiveCableDatabase';
import { getTemperatureFactor, getGroupingFactor } from '../bs7671-data/temperatureFactors';

export interface SmartCableSizingInputs {
  current: number;
  installationType: string;
  ambientTemp?: number;
  groupingCircuits?: number;
  length?: number;
  preferredCableType?: string;
  budgetLimit?: number;
  voltageDropLimit?: number;
}

export interface SmartCableSizingResult {
  recommendedCable: {
    type: string;
    size: number;
    capacity: number;
    cost: number;
    totalCost: number;
  };
  alternatives: Array<{
    type: string;
    size: number;
    capacity: number;
    cost: number;
    totalCost: number;
    reason: string;
  }>;
  analysis: {
    temperatureFactor: number;
    groupingFactor: number;
    voltageDropPercentage: number;
    safetyMargin: number;
  };
  recommendations: string[];
}

export const calculateSmartCableSize = (inputs: SmartCableSizingInputs): SmartCableSizingResult => {
  const {
    current,
    installationType,
    ambientTemp = 30,
    groupingCircuits = 1,
    length = 50,
    preferredCableType,
    budgetLimit,
    voltageDropLimit = 3.0
  } = inputs;

  // Find optimal cable using enhanced database
  const optimal = findOptimalCable(
    current,
    installationType,
    length,
    voltageDropLimit,
    budgetLimit
  );

  if (!optimal) {
    throw new Error('No suitable cable found for the given requirements');
  }

  // Get alternatives
  const alternatives: any[] = [];
  
  for (const [cableType, cableData] of Object.entries(ENHANCED_CABLE_DATABASE)) {
    if (cableType === optimal.cableType) continue;
    
    for (const capacity of cableData.capacities) {
      if (capacity.referenceMethodC < current * 1.1) continue;
      
      const pricing = getCablePricing(cableType, capacity.size);
      if (!pricing) continue;
      
      const totalCost = pricing.retailPrice * length + 
                       pricing.installationCostPerMetre * length + 
                       pricing.terminationCostPer * 2;
      
      if (budgetLimit && totalCost > budgetLimit) continue;
      
      alternatives.push({
        type: cableType,
        size: capacity.size,
        capacity: capacity.referenceMethodC,
        cost: pricing.retailPrice,
        totalCost,
        reason: `Alternative option - ${cableData.specification.description}`
      });
    }
  }

  // Sort alternatives by cost
  alternatives.sort((a, b) => a.totalCost - b.totalCost);

  // Calculate analysis factors
  const tempFactor = getTemperatureFactor(ambientTemp);
  const groupFactor = getGroupingFactor(groupingCircuits);
  
  const cableData = ENHANCED_CABLE_DATABASE[optimal.cableType];
  const voltageDropData = cableData?.voltageDrops.find(v => v.size === optimal.size);
  const voltageDropPercentage = voltageDropData ? 
    (voltageDropData.voltageDropPerAmpPerMetre * current * length) / 1000 : 0;

  return {
    recommendedCable: {
      type: optimal.cableType,
      size: optimal.size,
      capacity: 0, // Will be calculated properly
      cost: 0, // Will be calculated properly
      totalCost: optimal.totalCost
    },
    alternatives: alternatives.slice(0, 3), // Top 3 alternatives
    analysis: {
      temperatureFactor: tempFactor,
      groupingFactor: groupFactor,
      voltageDropPercentage,
      safetyMargin: 10 // Default 10% safety margin
    },
    recommendations: optimal.reasons
  };
};

// Helper function to determine cable suitability for different applications
export const assessCableSuitability = (requirements: {
  current: number;
  voltage: number;
  applicationContext: string;
  directBurial: boolean;
  mechanicalProtection: string;
  firePerformance: string;
  installationType: string;
}): string[] => {
  const suitable: string[] = [];

  Object.entries(ENHANCED_CABLE_DATABASE).forEach(([type, cable]) => {
    let score = 0;
    const spec = cable.specification;

    // Check installation method compatibility
    if (!spec.installationMethods.includes(requirements.installationType)) {
      return; // Skip if not compatible
    }

    // Application context suitability
    switch (requirements.applicationContext) {
      case 'domestic':
        if (type === 'pvc-twin-earth') score += 10;
        break;
      case 'commercial':
        if (type === 'swa-xlpe' || type === 'lsoh-cable') score += 10;
        break;
      case 'industrial':
        if (type === 'swa-xlpe' || type === 'micc-cable') score += 10;
        break;
    }

    // Direct burial requirements
    if (requirements.directBurial && spec.directBurial) {
      score += 15;
    } else if (requirements.directBurial && !spec.directBurial) {
      return; // Skip if burial required but not supported
    }

    // Mechanical protection requirements
    const protectionLevels = { 'None': 0, 'Light': 1, 'Medium': 2, 'Heavy': 3 };
    const requiredLevel = protectionLevels[requirements.mechanicalProtection as keyof typeof protectionLevels] || 0;
    const providedLevel = protectionLevels[spec.mechanicalProtection as keyof typeof protectionLevels] || 0;
    
    if (providedLevel >= requiredLevel) {
      score += 5;
    } else {
      return; // Skip if insufficient protection
    }

    // Fire performance requirements
    if (requirements.firePerformance !== 'Standard' && spec.firePerformance === requirements.firePerformance) {
      score += 8;
    }

    if (score >= 10) {
      suitable.push(type);
    }
  });

  return suitable.sort((a, b) => {
    // Sort by preference: SWA > LSOH > PVC > Others
    const preferences = { 'swa-xlpe': 3, 'lsoh-cable': 2, 'pvc-twin-earth': 1 };
    const scoreA = preferences[a as keyof typeof preferences] || 0;
    const scoreB = preferences[b as keyof typeof preferences] || 0;
    return scoreB - scoreA;
  });
};

// Get cost-effective options within budget
export const getBudgetFriendlyOptions = (
  current: number,
  length: number,
  maxBudget: number,
  installationType: string = 'C'
): Array<{ type: string; size: number; cost: number; capacity: number }> => {
  const options: Array<{ type: string; size: number; cost: number; capacity: number }> = [];

  Object.entries(ENHANCED_CABLE_DATABASE).forEach(([type, cable]) => {
    for (const capacity of cable.capacities) {
      if (capacity.referenceMethodC < current * 1.1) continue; // 10% safety margin
      
      const pricing = getCablePricing(type, capacity.size) || { retailPrice: 5, installationCostPerMetre: 3, terminationCostPer: 10 };
      if (!pricing) continue;
      
      const totalCost = pricing.retailPrice * length + 
                       pricing.installationCostPerMetre * length + 
                       pricing.terminationCostPer * 2;
      
      if (totalCost <= maxBudget) {
        options.push({
          type,
          size: capacity.size,
          cost: totalCost,
          capacity: capacity.referenceMethodC
        });
      }
    }
  });

  return options.sort((a, b) => a.cost - b.cost);
};

export const getCableRecommendations = (cableType: string): string[] => {
  const cable = ENHANCED_CABLE_DATABASE[cableType];
  if (!cable) return [];
  
  return cable.recommendations;
};

export default {
  calculateSmartCableSize,
  assessCableSuitability,
  getBudgetFriendlyOptions,
  getCableRecommendations
};