// Enhanced BS 7671 18th Edition Cable Database with Professional Installation Data
// Complete implementation with installation, physical, electrical, and environmental data

export interface CableSpecification {
  name: string;
  type: string;
  description: string;
  maxPracticalSize: number; // mm² - realistic field limit
  standardSizes: number[]; // mm² available sizes
  temperatureRating: '70C' | '90C';
  voltageRating: number; // V
  minBendRadius: number; // multiple of cable diameter
  firePerformance: 'Standard' | 'LSOH' | 'Fire Resistant' | 'Mineral';
  uvResistant: boolean;
  directBurial: boolean;
  mechanicalProtection: 'None' | 'Light' | 'Medium' | 'Heavy';
  installationMethods: string[]; // BS 7671 reference methods
  // Phase 1: Installation & Labor Data
  installationTime: number; // minutes per metre
  installationComplexity: 1 | 2 | 3 | 4 | 5; // 1=easy, 5=very complex
  requiredTools: string[];
  minimumCrewSize: number;
  terminationRequirements: string[];
  healthSafetyRequirements: string[];
  // Phase 2: Physical Handling Characteristics
  weightPerMetre: number; // kg/m
  cableDiameter: number; // mm
  minBendRadiusMM: number; // actual mm
  handlingDifficulty: 1 | 2 | 3 | 4 | 5; // 1=easy, 5=very difficult
  storageRequirements: string[];
  drumSizes: number[]; // available lengths in metres
}

export interface CableCapacityData {
  size: number; // mm²
  // BS 7671 Reference Methods (Amperes)
  referenceMethodA1: number; // Enclosed in conduit in thermally insulating wall
  referenceMethodA2: number; // Enclosed in conduit on wall or ceiling
  referenceMethodB1: number; // Enclosed in conduit in masonry wall
  referenceMethodB2: number; // Enclosed in trunking on wall
  referenceMethodC: number;  // Clipped direct
  referenceMethodD1: number; // In ducts in ground
  referenceMethodD2: number; // Direct buried
  referenceMethodE: number;  // In free air
  referenceMethodF: number;  // In ventilated cable tray
  referenceMethodG: number;  // On perforated cable tray
}

export interface CablePricing {
  size: number; // mm²
  // 2025 UK Pricing (£ per metre) - January 2025 rates
  wholesalePrice: number;
  retailPrice: number;
  screwfixPrice: number;
  cefPrice: number;
  edmundsonPrice: number;
  toolstationPrice: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Special Order';
  leadTimeDays: number;
  bulkDiscounts: {
    qty100m: number; // % discount
    qty500m: number;
    qty1000m: number;
  };
  // Phase 1: Installation Cost Data
  installationCostPerMetre: number; // £ labour cost per metre
  terminationCostPer: number; // £ per termination point
  accessoryCosts: {
    glands?: number; // £ per gland
    lugs?: number; // £ per lug
    conduit?: number; // £ per metre
    trunking?: number; // £ per metre
  };
}

export interface VoltageDropData {
  size: number; // mm²
  // mV/A/m at 70°C for copper conductors
  acResistance: number;
  acReactance: number;
  voltageDropPerAmpPerMetre: number;
}

export interface CompleteCableData {
  specification: CableSpecification;
  capacities: CableCapacityData[];
  pricing: CablePricing[];
  voltageDrops: VoltageDropData[];
  applications: string[];
  limitations: string[];
  recommendations: string[];
  // Phase 3: Advanced Electrical Performance
  electricalPerformance: {
    shortCircuitRating: number; // kA
    earthFaultLoopImpedance: number; // mΩ/m
    harmonicEffects: number; // derating factor
    powerFactorImpact: number; // derating factor
    skinEffectFactor: number; // at 50Hz
    proximityEffectFactor: number; // when grouped
  };
  // Phase 4: Environmental & Compliance Data
  environmentalData: {
    chemicalResistance: {
      oils: 'Poor' | 'Fair' | 'Good' | 'Excellent';
      acids: 'Poor' | 'Fair' | 'Good' | 'Excellent';
      alkalis: 'Poor' | 'Fair' | 'Good' | 'Excellent';
    };
    moistureAbsorption: number; // % by weight
    thermalCycling: number; // cycles to failure
    pestResistance: boolean;
    fireClassification: string; // CPR classification
    buildingRegsCompliance: string[];
    marineCertifications: string[];
  };
}

// Enhanced UK Cable Database with Complete Professional Data
export const ENHANCED_CABLE_DATABASE: Record<string, CompleteCableData> = {
  'pvc-twin-earth': {
    specification: {
      name: 'PVC Twin & Earth',
      type: 'pvc-twin-earth',
      description: 'Standard UK domestic cable with CPC - 6242Y',
      maxPracticalSize: 10,
      standardSizes: [1.0, 1.5, 2.5, 4, 6, 10],
      temperatureRating: '70C',
      voltageRating: 300,
      minBendRadius: 4,
      firePerformance: 'Standard',
      uvResistant: false,
      directBurial: false,
      mechanicalProtection: 'None',
      installationMethods: ['A1', 'A2', 'B1', 'B2', 'C'],
      installationTime: 2.5,
      installationComplexity: 2,
      requiredTools: ['Cable strippers', 'Side cutters', 'Screwdrivers', 'Drill'],
      minimumCrewSize: 1,
      terminationRequirements: ['Strip to 10mm', 'Check CPC continuity', 'Secure in terminals'],
      healthSafetyRequirements: ['Isolate supply', 'Test dead', 'PPE required'],
      weightPerMetre: 0.12,
      cableDiameter: 6.5,
      minBendRadiusMM: 26,
      handlingDifficulty: 1,
      storageRequirements: ['Dry conditions', 'Avoid direct sunlight', 'Temperature 5-35°C'],
      drumSizes: [25, 50, 100, 250, 500]
    },
    capacities: [
      { size: 1.0, referenceMethodA1: 11, referenceMethodA2: 13, referenceMethodB1: 13, referenceMethodB2: 16, referenceMethodC: 20, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 22, referenceMethodF: 0, referenceMethodG: 0 },
      { size: 1.5, referenceMethodA1: 14, referenceMethodA2: 16, referenceMethodB1: 17, referenceMethodB2: 20, referenceMethodC: 26, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 29, referenceMethodF: 0, referenceMethodG: 0 },
      { size: 2.5, referenceMethodA1: 18, referenceMethodA2: 21, referenceMethodB1: 23, referenceMethodB2: 27, referenceMethodC: 36, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 39, referenceMethodF: 0, referenceMethodG: 0 },
      { size: 4, referenceMethodA1: 24, referenceMethodA2: 28, referenceMethodB1: 30, referenceMethodB2: 36, referenceMethodC: 49, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 53, referenceMethodF: 0, referenceMethodG: 0 },
      { size: 6, referenceMethodA1: 31, referenceMethodA2: 36, referenceMethodB1: 38, referenceMethodB2: 46, referenceMethodC: 62, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 69, referenceMethodF: 0, referenceMethodG: 0 },
      { size: 10, referenceMethodA1: 42, referenceMethodA2: 50, referenceMethodB1: 52, referenceMethodB2: 63, referenceMethodC: 85, referenceMethodD1: 0, referenceMethodD2: 0, referenceMethodE: 94, referenceMethodF: 0, referenceMethodG: 0 }
    ],
    pricing: [
      { size: 1.0, wholesalePrice: 0.85, retailPrice: 1.20, screwfixPrice: 1.35, cefPrice: 1.15, edmundsonPrice: 1.10, toolstationPrice: 1.30, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 5, qty500m: 12, qty1000m: 18 }, installationCostPerMetre: 3.50, terminationCostPer: 8.50, accessoryCosts: {} },
      { size: 1.5, wholesalePrice: 1.05, retailPrice: 1.45, screwfixPrice: 1.65, cefPrice: 1.40, edmundsonPrice: 1.35, toolstationPrice: 1.60, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 5, qty500m: 12, qty1000m: 18 }, installationCostPerMetre: 3.75, terminationCostPer: 8.50, accessoryCosts: {} },
      { size: 2.5, wholesalePrice: 1.65, retailPrice: 2.25, screwfixPrice: 2.55, cefPrice: 2.15, edmundsonPrice: 2.10, toolstationPrice: 2.45, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 8, qty500m: 15, qty1000m: 22 }, installationCostPerMetre: 4.25, terminationCostPer: 9.50, accessoryCosts: {} },
      { size: 4, wholesalePrice: 2.45, retailPrice: 3.35, screwfixPrice: 3.85, cefPrice: 3.20, edmundsonPrice: 3.10, toolstationPrice: 3.70, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 8, qty500m: 15, qty1000m: 22 }, installationCostPerMetre: 4.85, terminationCostPer: 11.50, accessoryCosts: {} },
      { size: 6, wholesalePrice: 3.85, retailPrice: 5.25, screwfixPrice: 5.95, cefPrice: 5.05, edmundsonPrice: 4.90, toolstationPrice: 5.75, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 10, qty500m: 18, qty1000m: 25 }, installationCostPerMetre: 5.50, terminationCostPer: 13.50, accessoryCosts: {} },
      { size: 10, wholesalePrice: 6.45, retailPrice: 8.75, screwfixPrice: 9.95, cefPrice: 8.35, edmundsonPrice: 8.15, toolstationPrice: 9.65, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 10, qty500m: 18, qty1000m: 25 }, installationCostPerMetre: 6.75, terminationCostPer: 16.50, accessoryCosts: {} }
    ],
    voltageDrops: [
      { size: 1.0, acResistance: 18.10, acReactance: 0.10, voltageDropPerAmpPerMetre: 44 },
      { size: 1.5, acResistance: 12.10, acReactance: 0.10, voltageDropPerAmpPerMetre: 29 },
      { size: 2.5, acResistance: 7.30, acReactance: 0.10, voltageDropPerAmpPerMetre: 18 },
      { size: 4, acResistance: 4.60, acReactance: 0.10, voltageDropPerAmpPerMetre: 11 },
      { size: 6, acResistance: 3.08, acReactance: 0.10, voltageDropPerAmpPerMetre: 7.3 },
      { size: 10, acResistance: 1.83, acReactance: 0.10, voltageDropPerAmpPerMetre: 4.4 }
    ],
    applications: [
      'Domestic lighting circuits',
      'Ring final circuits',
      'Radial circuits',
      'Immersion heater circuits',
      'Cooker circuits up to 32A'
    ],
    limitations: [
      'Not suitable for direct burial',
      'Practical size limit 10mm² due to termination difficulties',
      'Not suitable for high-current industrial applications',
      'Limited mechanical protection'
    ],
    recommendations: [
      'Ideal for standard domestic installations',
      'Use conduit or trunking for mechanical protection',
      'Consider SWA for higher currents or burial'
    ],
    electricalPerformance: {
      shortCircuitRating: 3.5, // kA
      earthFaultLoopImpedance: 18.1, // mΩ/m
      harmonicEffects: 0.86, // derating factor
      powerFactorImpact: 0.95, // derating factor
      skinEffectFactor: 1.0, // minimal at these sizes
      proximityEffectFactor: 0.9 // when grouped
    },
    environmentalData: {
      chemicalResistance: {
        oils: 'Fair',
        acids: 'Poor',
        alkalis: 'Fair'
      },
      moistureAbsorption: 0.1, // % by weight
      thermalCycling: 10000, // cycles to failure
      pestResistance: false,
      fireClassification: 'Cca',
      buildingRegsCompliance: ['Part P', 'BS 7671'],
      marineCertifications: []
    }
  },

  'swa-xlpe': {
    specification: {
      name: 'SWA XLPE Cable',
      type: 'swa-xlpe',
      description: 'Steel Wire Armoured XLPE Insulated Cable - 6944X',
      maxPracticalSize: 400,
      standardSizes: [1.5, 2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240, 300, 400],
      temperatureRating: '90C',
      voltageRating: 1000,
      minBendRadius: 6,
      firePerformance: 'Standard',
      uvResistant: true,
      directBurial: true,
      mechanicalProtection: 'Heavy',
      installationMethods: ['C', 'D1', 'D2', 'E', 'F', 'G'],
      installationTime: 8.5,
      installationComplexity: 4,
      requiredTools: ['SWA strippers', 'Gland set', 'Cable pullers', 'Bending springs', 'Torque wrench'],
      minimumCrewSize: 2,
      terminationRequirements: ['Use SWA glands', 'Earth armour properly', 'Apply specified torque'],
      healthSafetyRequirements: ['Heavy lifting procedures', 'Cut protection', 'Mechanical handling equipment'],
      weightPerMetre: 1.85,
      cableDiameter: 18.5,
      minBendRadiusMM: 111,
      handlingDifficulty: 4,
      storageRequirements: ['Support on cable drums', 'Protect gland ends', 'Heavy duty storage'],
      drumSizes: [100, 250, 500, 1000]
    },
    capacities: [
      { size: 1.5, referenceMethodA1: 0, referenceMethodA2: 0, referenceMethodB1: 0, referenceMethodB2: 0, referenceMethodC: 32, referenceMethodD1: 25, referenceMethodD2: 27, referenceMethodE: 36, referenceMethodF: 34, referenceMethodG: 38 },
      { size: 2.5, referenceMethodA1: 0, referenceMethodA2: 0, referenceMethodB1: 0, referenceMethodB2: 0, referenceMethodC: 43, referenceMethodD1: 33, referenceMethodD2: 36, referenceMethodE: 48, referenceMethodF: 46, referenceMethodG: 51 },
      { size: 4, referenceMethodA1: 0, referenceMethodA2: 0, referenceMethodB1: 0, referenceMethodB2: 0, referenceMethodC: 57, referenceMethodD1: 44, referenceMethodD2: 48, referenceMethodE: 64, referenceMethodF: 61, referenceMethodG: 68 },
      { size: 6, referenceMethodA1: 0, referenceMethodA2: 0, referenceMethodB1: 0, referenceMethodB2: 0, referenceMethodC: 73, referenceMethodD1: 56, referenceMethodD2: 61, referenceMethodE: 82, referenceMethodF: 78, referenceMethodG: 87 },
      { size: 10, referenceMethodA1: 0, referenceMethodA2: 0, referenceMethodB1: 0, referenceMethodB2: 0, referenceMethodC: 98, referenceMethodD1: 75, referenceMethodD2: 81, referenceMethodE: 110, referenceMethodF: 105, referenceMethodG: 117 }
    ],
    pricing: [
      { size: 1.5, wholesalePrice: 2.45, retailPrice: 3.35, screwfixPrice: 3.85, cefPrice: 3.20, edmundsonPrice: 3.10, toolstationPrice: 3.70, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 8, qty500m: 15, qty1000m: 22 }, installationCostPerMetre: 12.50, terminationCostPer: 45.00, accessoryCosts: { glands: 18.50, lugs: 8.50 } },
      { size: 2.5, wholesalePrice: 3.25, retailPrice: 4.45, screwfixPrice: 5.15, cefPrice: 4.25, edmundsonPrice: 4.10, toolstationPrice: 4.95, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 8, qty500m: 15, qty1000m: 22 }, installationCostPerMetre: 13.50, terminationCostPer: 48.00, accessoryCosts: { glands: 22.50, lugs: 11.50 } },
      { size: 4, wholesalePrice: 4.65, retailPrice: 6.35, screwfixPrice: 7.35, cefPrice: 6.05, edmundsonPrice: 5.85, toolstationPrice: 7.05, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 10, qty500m: 18, qty1000m: 25 }, installationCostPerMetre: 15.50, terminationCostPer: 52.00, accessoryCosts: { glands: 26.50, lugs: 14.50 } },
      { size: 6, wholesalePrice: 6.85, retailPrice: 9.35, screwfixPrice: 10.85, cefPrice: 8.95, edmundsonPrice: 8.65, toolstationPrice: 10.45, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 10, qty500m: 18, qty1000m: 25 }, installationCostPerMetre: 17.50, terminationCostPer: 58.00, accessoryCosts: { glands: 32.50, lugs: 18.50 } },
      { size: 10, wholesalePrice: 10.45, retailPrice: 14.25, screwfixPrice: 16.55, cefPrice: 13.65, edmundsonPrice: 13.15, toolstationPrice: 15.95, availability: 'In Stock', leadTimeDays: 0, bulkDiscounts: { qty100m: 12, qty500m: 20, qty1000m: 28 }, installationCostPerMetre: 22.50, terminationCostPer: 75.00, accessoryCosts: { glands: 42.50, lugs: 25.50 } }
    ],
    voltageDrops: [
      { size: 1.5, acResistance: 12.10, acReactance: 0.08, voltageDropPerAmpPerMetre: 29 },
      { size: 2.5, acResistance: 7.30, acReactance: 0.08, voltageDropPerAmpPerMetre: 18 },
      { size: 4, acResistance: 4.60, acReactance: 0.08, voltageDropPerAmpPerMetre: 11 },
      { size: 6, acResistance: 3.08, acReactance: 0.08, voltageDropPerAmpPerMetre: 7.3 },
      { size: 10, acResistance: 1.83, acReactance: 0.08, voltageDropPerAmpPerMetre: 4.4 }
    ],
    applications: [
      'High-current industrial circuits',
      'Direct burial applications',
      'External building feeds',
      'Distribution boards',
      'Motor circuits',
      'High-power equipment feeds'
    ],
    limitations: [
      'Requires glands for termination',
      'Higher cost than T&E',
      'Larger bend radius required'
    ],
    recommendations: [
      'Preferred for circuits above 32A',
      'Essential for direct burial',
      'Use for external or underground feeds',
      'Consider when mechanical protection needed'
    ],
    electricalPerformance: {
      shortCircuitRating: 25.0, // kA
      earthFaultLoopImpedance: 1.83, // mΩ/m
      harmonicEffects: 0.80, // derating factor
      powerFactorImpact: 0.90, // derating factor
      skinEffectFactor: 1.05, // slight increase at larger sizes
      proximityEffectFactor: 0.85 // when grouped
    },
    environmentalData: {
      chemicalResistance: {
        oils: 'Excellent',
        acids: 'Good',
        alkalis: 'Good'
      },
      moistureAbsorption: 0.05, // % by weight
      thermalCycling: 25000, // cycles to failure
      pestResistance: true,
      fireClassification: 'Cca',
      buildingRegsCompliance: ['Part P', 'BS 7671', 'Building Regulations Part B'],
      marineCertifications: ['DNV-GL Type Approved']
    }
  }
};

// Enhanced cable selection functions
export const getCableSpecification = (cableType: string): CableSpecification | null => {
  return ENHANCED_CABLE_DATABASE[cableType]?.specification || null;
};

export const getCableCapacity = (cableType: string, size: number, method: string): number => {
  const cable = ENHANCED_CABLE_DATABASE[cableType];
  if (!cable) return 0;
  
  const capacity = cable.capacities.find(c => c.size === size);
  if (!capacity) return 0;
  
  const methodKey = `referenceMethod${method}` as keyof CableCapacityData;
  return capacity[methodKey] as number || 0;
};

export const getCablePricing = (cableType: string, size: number): CablePricing | null => {
  const cable = ENHANCED_CABLE_DATABASE[cableType];
  if (!cable) return null;
  
  return cable.pricing.find(p => p.size === size) || null;
};

export const getTotalInstallationCost = (cableType: string, size: number, length: number, terminations: number): number => {
  const pricing = getCablePricing(cableType, size);
  if (!pricing) return 0;
  
  const materialCost = pricing.retailPrice * length;
  const installationCost = pricing.installationCostPerMetre * length;
  const terminationCost = pricing.terminationCostPer * terminations;
  
  return materialCost + installationCost + terminationCost;
};

export const getInstallationGuidance = (cableType: string): string[] => {
  const cable = ENHANCED_CABLE_DATABASE[cableType];
  if (!cable) return [];
  
  const spec = cable.specification;
  return [
    `Installation time: ${spec.installationTime} minutes per metre`,
    `Complexity level: ${spec.installationComplexity}/5`,
    `Minimum crew size: ${spec.minimumCrewSize} person(s)`,
    `Required tools: ${spec.requiredTools.join(', ')}`,
    `Weight: ${spec.weightPerMetre}kg/m`,
    `Minimum bend radius: ${spec.minBendRadiusMM}mm`,
    `Health & Safety: ${spec.healthSafetyRequirements.join(', ')}`
  ];
};

export const getCableRecommendations = (cableType: string): string[] => {
  const cable = ENHANCED_CABLE_DATABASE[cableType];
  if (!cable) return [];
  
  return [
    ...cable.recommendations,
    ...getInstallationGuidance(cableType)
  ];
};

export const getAllCableTypes = (): string[] => {
  return Object.keys(ENHANCED_CABLE_DATABASE);
};

export const findOptimalCable = (
  current: number,
  method: string,
  length: number,
  voltageDropLimit: number = 3.0,
  budgetLimit?: number
): { cableType: string; size: number; totalCost: number; reasons: string[] } | null => {
  let bestOption: { cableType: string; size: number; totalCost: number; reasons: string[] } | null = null;
  let lowestCost = Infinity;
  
  for (const [cableType, cableData] of Object.entries(ENHANCED_CABLE_DATABASE)) {
    for (const capacity of cableData.capacities) {
      const cableCapacity = getCableCapacity(cableType, capacity.size, method);
      if (cableCapacity < current * 1.1) continue; // 10% safety margin
      
      const voltageDropData = cableData.voltageDrops.find(v => v.size === capacity.size);
      if (!voltageDropData) continue;
      
      const voltageDrop = (voltageDropData.voltageDropPerAmpPerMetre * current * length) / 1000;
      if (voltageDrop > voltageDropLimit) continue;
      
      const totalCost = getTotalInstallationCost(cableType, capacity.size, length, 2);
      if (budgetLimit && totalCost > budgetLimit) continue;
      
      if (totalCost < lowestCost) {
        lowestCost = totalCost;
        bestOption = {
          cableType,
          size: capacity.size,
          totalCost,
          reasons: [
            `Capacity: ${cableCapacity}A (required: ${current}A)`,
            `Voltage drop: ${voltageDrop.toFixed(2)}% (limit: ${voltageDropLimit}%)`,
            `Total cost: £${totalCost.toFixed(2)} including installation`,
            ...getCableRecommendations(cableType).slice(0, 2)
          ]
        };
      }
    }
  }
  
  return bestOption;
};