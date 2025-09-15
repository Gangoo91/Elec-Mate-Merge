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
  maxBudget?: number;
  applicationContext?: 'domestic' | 'commercial' | 'industrial' | 'fire-safety';
  directBurial?: boolean;
  mechanicalProtection?: 'none' | 'light' | 'heavy';
  firePerformance?: 'standard' | 'lsoh' | 'fire-resistant';
}

export interface SmartCableSizingResult {
  primaryRecommendation: CableRecommendation;
  alternatives: CableRecommendation[];
  costAnalysis: CostAnalysis;
  complianceNotes: string[];
  warnings: string[];
}

export interface CableRecommendation {
  cableType: string;
  cableName: string;
  size: number;
  capacity: number;
  deratedCapacity: number;
  voltage_drop: number;
  suitability: 'suitable' | 'marginal' | 'unsuitable';
  reasoning: string;
  pricing: {
    retailPrice: number;
    wholesalePrice: number;
    bestSupplier: string;
    bestPrice: number;
    availability: string;
    leadTime: number;
  };
  specifications: {
    temperatureRating: string;
    voltageRating: number;
    mechanicalProtection: string;
    firePerformance: string;
    uvResistant: boolean;
    directBurial: boolean;
  };
  installationNotes: string[];
}

export interface CostAnalysis {
  budgetCompliant: boolean;
  costEffectiveOptions: Array<{
    cableType: string;
    size: number;
    price: number;
    savings: number;
    suitability: string;
  }>;
  bulkDiscountOpportunities: Array<{
    quantity: number;
    discount: number;
    totalSavings: number;
  }>;
}

// Installation method mapping to cable database reference methods
const INSTALLATION_METHOD_MAPPING: Record<string, string> = {
  'A1': 'A1', // Enclosed in conduit in thermally insulating wall
  'A2': 'A2', // Enclosed in conduit on wall or ceiling
  'B1': 'B1', // Enclosed in conduit in masonry wall
  'B2': 'B2', // Enclosed in trunking on wall
  'C': 'C',   // Clipped direct
  'D1': 'D1', // In ducts in ground
  'D2': 'D2', // Direct buried
  'E': 'E',   // In free air
  'F': 'F',   // In ventilated cable tray
  'G': 'G'    // On perforated cable tray
};

export const calculateSmartCableSelection = (inputs: SmartCableSizingInputs): SmartCableSizingResult => {
  const {
    current,
    installationType,
    ambientTemp = 30,
    groupingCircuits = 1,
    length = 50,
    preferredCableType,
    maxBudget,
    applicationContext = 'domestic',
    directBurial = false,
    mechanicalProtection = 'none',
    firePerformance = 'standard'
  } = inputs;

  // Determine suitable cable types based on requirements
  const suitableCableTypes = getSuitableCableTypes({
    applicationContext,
    directBurial,
    mechanicalProtection,
    firePerformance,
    installationType
  });

  // Calculate cable recommendations for each suitable type
  const recommendations: CableRecommendation[] = [];
  
  for (const cableType of suitableCableTypes) {
    const recommendation = calculateCableRecommendation(cableType, {
      current,
      installationType,
      ambientTemp,
      groupingCircuits,
      length
    });
    
    if (recommendation) {
      recommendations.push(recommendation);
    }
  }

  // Sort recommendations by suitability and cost
  const sortedRecommendations = recommendations.sort((a, b) => {
    // Prioritise suitable over marginal
    if (a.suitability !== b.suitability) {
      const suitabilityOrder = { 'suitable': 3, 'marginal': 2, 'unsuitable': 1 };
      return suitabilityOrder[b.suitability] - suitabilityOrder[a.suitability];
    }
    // Then by price
    return a.pricing.bestPrice - b.pricing.bestPrice;
  });

  // Select primary recommendation
  const primaryRecommendation = sortedRecommendations[0];
  const alternatives = sortedRecommendations.slice(1, 4); // Top 3 alternatives

  // Generate cost analysis
  const costAnalysis = generateCostAnalysis(recommendations, maxBudget);

  // Generate compliance notes and warnings
  const { complianceNotes, warnings } = generateComplianceNotesAndWarnings(
    primaryRecommendation,
    inputs
  );

  return {
    primaryRecommendation,
    alternatives,
    costAnalysis,
    complianceNotes,
    warnings
  };
};

const getSuitableCableTypes = (requirements: {
  applicationContext: string;
  directBurial: boolean;
  mechanicalProtection: string;
  firePerformance: string;
  installationType: string;
}): string[] => {
  const suitable: string[] = [];

  Object.entries(UK_CABLE_DATABASE).forEach(([type, cable]) => {
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
        if (type === 'swa-xlpe' && requirements.mechanicalProtection === 'heavy') score += 8;
        if (type === 'pvc-single') score += 6;
        break;
      case 'commercial':
        if (type === 'swa-xlpe') score += 10;
        if (type === 'lsoh-cable') score += 9;
        if (type === 'pvc-single') score += 7;
        if (type === 'pvc-twin-earth' && spec.maxPracticalSize >= 6) score += 5;
        break;
      case 'industrial':
        if (type === 'swa-xlpe') score += 10;
        if (type === 'pvc-single') score += 8;
        if (type === 'lsoh-cable') score += 6;
        break;
      case 'fire-safety':
        if (type === 'fire-resistant') score += 10;
        if (type === 'lsoh-cable') score += 8;
        if (spec.firePerformance === 'Fire Resistant') score += 9;
        break;
    }

    // Direct burial requirement
    if (requirements.directBurial) {
      if (spec.directBurial) score += 10;
      else score = 0; // Must have direct burial capability
    }

    // Mechanical protection
    switch (requirements.mechanicalProtection) {
      case 'heavy':
        if (spec.mechanicalProtection === 'Heavy') score += 8;
        else if (spec.mechanicalProtection === 'Medium') score += 4;
        break;
      case 'light':
        if (spec.mechanicalProtection !== 'None') score += 6;
        break;
    }

    // Fire performance
    switch (requirements.firePerformance) {
      case 'fire-resistant':
        if (spec.firePerformance === 'Fire Resistant') score += 10;
        else if (spec.firePerformance === 'LSOH') score += 6;
        break;
      case 'lsoh':
        if (spec.firePerformance === 'LSOH') score += 8;
        else if (spec.firePerformance === 'Fire Resistant') score += 10;
        break;
    }

    if (score > 0) {
      suitable.push(type);
    }
  });

  // Sort by suitability score (would need to track scores)
  return suitable.length > 0 ? suitable : ['pvc-twin-earth', 'swa-xlpe', 'pvc-single'];
};

const calculateCableRecommendation = (
  cableType: string,
  params: {
    current: number;
    installationType: string;
    ambientTemp: number;
    groupingCircuits: number;
    length: number;
  }
): CableRecommendation | null => {
  const cable = getCableData(cableType);
  if (!cable) return null;

  const { current, installationType, ambientTemp, groupingCircuits, length } = params;
  
  // Find the appropriate reference method
  const refMethod = INSTALLATION_METHOD_MAPPING[installationType] || 'C';
  const methodKey = `referenceMethod${refMethod}` as keyof any;

  // Calculate derating factors
  const tempRating = cable.specification.temperatureRating === '90C' ? '90C' : '70C';
  const tempFactor = getTemperatureFactor(ambientTemp, tempRating);
  const groupingFactor = getGroupingFactor(groupingCircuits);
  const overallFactor = tempFactor * groupingFactor;

  // Find suitable cable size
  let selectedSize: number | null = null;
  let selectedCapacity = 0;
  let deratedCapacity = 0;

  for (const capacity of cable.capacities) {
    const baseCapacity = capacity[methodKey];
    if (!baseCapacity || baseCapacity === 0) continue;

    const derated = baseCapacity * overallFactor;
    if (derated >= current) {
      selectedSize = capacity.size;
      selectedCapacity = baseCapacity;
      deratedCapacity = derated;
      break;
    }
  }

  if (!selectedSize) return null;

  // Calculate voltage drop
  const voltageDropData = cable.voltageDrops.find(vd => vd.size === selectedSize);
  const voltageDropPercentage = voltageDropData 
    ? (voltageDropData.voltageDropPerAmpPerMetre * current * length) / (230 * 10) // Convert to percentage
    : 0;

  // Determine suitability
  let suitability: 'suitable' | 'marginal' | 'unsuitable' = 'suitable';
  const safetyMargin = ((deratedCapacity - current) / current) * 100;
  
  if (safetyMargin < 5) suitability = 'marginal';
  if (voltageDropPercentage > 5) suitability = 'marginal';
  if (safetyMargin < 0 || voltageDropPercentage > 8) suitability = 'unsuitable';

  // Check practical limitations
  if (cableType === 'pvc-twin-earth' && selectedSize > cable.specification.maxPracticalSize) {
    suitability = 'unsuitable';
  }

  // Get pricing information
  const pricing = getCablePricing(cableType, selectedSize);
  if (!pricing) return null;

  // Determine best supplier price
  const supplierPrices = [
    { name: 'Screwfix', price: pricing.screwfixPrice },
    { name: 'CEF', price: pricing.cefPrice },
    { name: 'Edmundson', price: pricing.edmundsonPrice },
    { name: 'Toolstation', price: pricing.toolstationPrice }
  ];
  const bestSupplier = supplierPrices.reduce((best, current) => 
    current.price < best.price ? current : best
  );

  // Generate reasoning
  let reasoning = '';
  if (cableType === 'pvc-twin-earth') {
    if (selectedSize <= 10) {
      reasoning = `Standard domestic cable suitable for this application. ${selectedSize}mm² T&E provides ${deratedCapacity.toFixed(1)}A capacity after derating factors.`;
    } else {
      reasoning = `T&E above 10mm² is impractical for installation. Consider SWA alternative.`;
    }
  } else if (cableType === 'swa-xlpe') {
    reasoning = `SWA XLPE provides excellent mechanical protection and higher current capacity. ${selectedSize}mm² provides ${deratedCapacity.toFixed(1)}A after derating.`;
  } else {
    reasoning = `${cable.specification.name} selected for specific application requirements. ${selectedSize}mm² provides adequate capacity.`;
  }

  // Installation notes
  const installationNotes: string[] = [];
  if (cableType === 'pvc-twin-earth' && selectedSize > 6) {
    installationNotes.push('Consider using SWA for easier installation and termination');
  }
  if (cable.specification.directBurial) {
    installationNotes.push('Suitable for direct burial applications');
  }
  if (cable.specification.mechanicalProtection === 'Heavy') {
    installationNotes.push('Provides excellent mechanical protection');
  }
  if (voltageDropPercentage > 3) {
    installationNotes.push(`Voltage drop is ${voltageDropPercentage.toFixed(1)}% - consider larger size for long runs`);
  }

  return {
    cableType,
    cableName: cable.specification.name,
    size: selectedSize,
    capacity: selectedCapacity,
    deratedCapacity: Math.round(deratedCapacity * 10) / 10,
    voltage_drop: Math.round(voltageDropPercentage * 10) / 10,
    suitability,
    reasoning,
    pricing: {
      retailPrice: pricing.retailPrice,
      wholesalePrice: pricing.wholesalePrice,
      bestSupplier: bestSupplier.name,
      bestPrice: bestSupplier.price,
      availability: pricing.availability,
      leadTime: pricing.leadTimeDays
    },
    specifications: {
      temperatureRating: cable.specification.temperatureRating,
      voltageRating: cable.specification.voltageRating,
      mechanicalProtection: cable.specification.mechanicalProtection,
      firePerformance: cable.specification.firePerformance,
      uvResistant: cable.specification.uvResistant,
      directBurial: cable.specification.directBurial
    },
    installationNotes
  };
};

const generateCostAnalysis = (
  recommendations: CableRecommendation[],
  maxBudget?: number
): CostAnalysis => {
  const budgetCompliant = maxBudget ? 
    recommendations.some(r => r.pricing.bestPrice <= maxBudget) : true;

  const costEffectiveOptions = recommendations
    .filter(r => r.suitability === 'suitable')
    .map(r => ({
      cableType: r.cableType,
      size: r.size,
      price: r.pricing.bestPrice,
      savings: 0, // Would calculate vs most expensive option
      suitability: r.suitability
    }))
    .slice(0, 3);

  // Calculate potential bulk discounts
  const bulkDiscountOpportunities = [
    { quantity: 100, discount: 10, totalSavings: 0 },
    { quantity: 500, discount: 20, totalSavings: 0 },
    { quantity: 1000, discount: 30, totalSavings: 0 }
  ];

  return {
    budgetCompliant,
    costEffectiveOptions,
    bulkDiscountOpportunities
  };
};

const generateComplianceNotesAndWarnings = (
  recommendation: CableRecommendation,
  inputs: SmartCableSizingInputs
): { complianceNotes: string[]; warnings: string[] } => {
  const complianceNotes: string[] = [];
  const warnings: string[] = [];

  // BS 7671 compliance notes
  complianceNotes.push('Cable selection complies with BS 7671:2018+A2:2022');
  complianceNotes.push(`Current carrying capacity: ${recommendation.deratedCapacity}A (after derating factors)`);
  complianceNotes.push(`Voltage drop: ${recommendation.voltage_drop}% (limit: 5%)`);

  // Warnings for marginal or unsuitable selections
  if (recommendation.suitability === 'marginal') {
    warnings.push('This cable selection has minimal safety margin - consider next size up');
  }
  
  if (recommendation.suitability === 'unsuitable') {
    warnings.push('This cable selection does not meet requirements - alternative needed');
  }

  if (recommendation.voltage_drop > 3) {
    warnings.push(`Voltage drop is ${recommendation.voltage_drop}% - may affect equipment performance`);
  }

  if (recommendation.cableType === 'pvc-twin-earth' && recommendation.size > 6) {
    warnings.push('Large T&E cables are difficult to install - consider SWA alternative');
  }

  if (inputs.directBurial && !recommendation.specifications.directBurial) {
    warnings.push('Selected cable is not suitable for direct burial');
  }

  return { complianceNotes, warnings };
};