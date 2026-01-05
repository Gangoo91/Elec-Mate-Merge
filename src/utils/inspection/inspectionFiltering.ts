import { InspectionSection, InspectionItem } from '@/data/bs7671ChecklistData';

// Property type mapping for smart filtering
export const getPropertyCategory = (propertyType: string): 'domestic' | 'commercial' | 'industrial' => {
  switch(propertyType) {
    case 'domestic':
    case 'domestic-dwelling':
      return 'domestic';
    case 'industrial':
    case 'industrial-unit':
    case 'warehouse':
      return 'industrial';
    case 'commercial':
    case 'commercial-office':
    case 'retail-shop':
    case 'restaurant-cafe':
    case 'hotel-accommodation':
    case 'school-education':
    case 'healthcare-facility':
    case 'community-centre':
    case 'other':
    default:
      return 'commercial';
  }
};

// Define inspection relevance for each property type
const inspectionRelevance = {
  // Items that are primarily relevant to domestic installations
  domestic: [
    'item_1_1', 'item_1_2', 'item_1_3', 'item_1_4', 'item_1_5', // Service/intake
    'item_3_1', 'item_3_2', 'item_3_3', 'item_3_4', 'item_3_5', 'item_3_6', 'item_3_7', 'item_3_8', 'item_3_9', 'item_3_10', // Earthing/bonding
    'item_5_1', 'item_5_2', 'item_5_3', 'item_5_4', 'item_5_5', 'item_5_8', 'item_5_9', 'item_5_10', 'item_5_11', 'item_5_12', 'item_5_13', 'item_5_14', 'item_5_17', 'item_5_18', 'item_5_19', 'item_5_24', 'item_5_25', // Consumer units
    'item_6_1', 'item_6_2', 'item_6_3', 'item_6_6', 'item_6_7', 'item_6_8', 'item_6_9', 'item_6_10', 'item_6_11', 'item_6_14', 'item_6_15', 'item_6_19', 'item_6_20', // Circuits
    'item_7_1', 'item_7_2', 'item_7_3', 'item_7_4', 'item_7_5', 'item_7_6', 'item_7_7', 'item_7_8', 'item_7_9', 'item_7_10', // Final circuits
    'item_8_1', 'item_8_2', 'item_8_3', 'item_8_4', 'item_8_5', 'item_8_6', 'item_8_7', 'item_8_8', 'item_8_9', 'item_8_10', 'item_8_11', 'item_8_12', 'item_8_13', 'item_8_14', 'item_8_15', 'item_8_16', // Socket outlets/lighting
    'item_9_1', 'item_9_2', 'item_9_3', 'item_9_4', 'item_9_5', 'item_9_6', 'item_9_7', 'item_9_8', 'item_9_9', 'item_9_10', 'item_9_11', 'item_9_12', 'item_9_13', 'item_9_14', 'item_9_15', 'item_9_16', 'item_9_17', 'item_9_18', 'item_9_19', 'item_9_20', 'item_9_21', 'item_9_22', 'item_9_23', // Bathrooms/special locations
    'item_10_1', 'item_10_2', 'item_10_3', 'item_10_4', 'item_10_5', 'item_10_6' // Other special installations
  ],
  
  // Items relevant to commercial installations
  commercial: [
    'item_1_1', 'item_1_2', 'item_1_3', 'item_1_4', 'item_1_5', // Service/intake
    'item_2_1', 'item_2_2', 'item_2_3', 'item_2_4', 'item_2_5', // Alternative supplies (generators etc)
    'item_3_1', 'item_3_2', 'item_3_3', 'item_3_4', 'item_3_5', 'item_3_6', 'item_3_7', 'item_3_8', 'item_3_9', 'item_3_10', 'item_3_11', // Earthing/bonding
    'item_4_3', 'item_4_6', 'item_4_7', // Electrical separation, SELV/PELV
    'item_5_1', 'item_5_2', 'item_5_3', 'item_5_4', 'item_5_5', 'item_5_6', 'item_5_7', 'item_5_8', 'item_5_9', 'item_5_10', 'item_5_11', 'item_5_12', 'item_5_13', 'item_5_14', 'item_5_15', 'item_5_16', 'item_5_17', 'item_5_18', 'item_5_19', 'item_5_20', 'item_5_21', 'item_5_22', 'item_5_23', 'item_5_24', 'item_5_25', // Distribution equipment
    'item_6_1', 'item_6_2', 'item_6_3', 'item_6_4', 'item_6_5', 'item_6_6', 'item_6_7', 'item_6_8', 'item_6_9', 'item_6_10', 'item_6_11', 'item_6_12', 'item_6_16', 'item_6_17', 'item_6_18', 'item_6_19', 'item_6_20', // Distribution circuits
    'item_7_1', 'item_7_2', 'item_7_3', 'item_7_4', 'item_7_5', 'item_7_6', 'item_7_7', 'item_7_8', 'item_7_9', 'item_7_10', 'item_7_11', 'item_7_12', 'item_7_13', 'item_7_14', // Final circuits
    'item_8_1', 'item_8_2', 'item_8_3', 'item_8_4', 'item_8_5', 'item_8_6', 'item_8_7', 'item_8_8', 'item_8_9', 'item_8_10', 'item_8_11', 'item_8_12', 'item_8_13', 'item_8_14', 'item_8_15', 'item_8_16', 'item_8_17', 'item_8_18', 'item_8_19', 'item_8_20', 'item_8_21', 'item_8_22', 'item_8_23', 'item_8_24', 'item_8_25', 'item_8_26', 'item_8_27', 'item_8_28', 'item_8_29', 'item_8_30', // Socket outlets/lighting/emergency systems
    'item_9_1', 'item_9_2', 'item_9_3', 'item_9_4', 'item_9_5', 'item_9_6', 'item_9_7', 'item_9_8', 'item_9_9', 'item_9_10', 'item_9_11', 'item_9_12', 'item_9_13', 'item_9_14', 'item_9_15', 'item_9_16', 'item_9_17', 'item_9_18', 'item_9_19', 'item_9_20', 'item_9_21', 'item_9_22', 'item_9_23', // Special locations
    'item_10_1', 'item_10_2', 'item_10_3', 'item_10_4', 'item_10_5', 'item_10_6', 'item_10_7', 'item_10_8', 'item_10_9', 'item_10_10', 'item_10_11', 'item_10_12', 'item_10_13', 'item_10_14', 'item_10_15', 'item_10_16', 'item_10_17', 'item_10_18', 'item_10_19', 'item_10_20' // Other special installations
  ],
  
  // Items relevant to industrial installations
  industrial: [
    'item_1_1', 'item_1_2', 'item_1_3', 'item_1_4', 'item_1_5', // Service/intake
    'item_2_1', 'item_2_2', 'item_2_3', 'item_2_4', 'item_2_5', // Alternative supplies (essential for industrial)
    'item_3_1', 'item_3_2', 'item_3_3', 'item_3_4', 'item_3_5', 'item_3_6', 'item_3_7', 'item_3_8', 'item_3_9', 'item_3_10', 'item_3_11', // Earthing/bonding (critical for industrial)
    'item_4_1', 'item_4_2', 'item_4_3', 'item_4_4', 'item_4_5', 'item_4_6', 'item_4_7', // All protective measures (needed for industrial environments)
    'item_5_1', 'item_5_2', 'item_5_3', 'item_5_4', 'item_5_5', 'item_5_6', 'item_5_7', 'item_5_8', 'item_5_9', 'item_5_10', 'item_5_11', 'item_5_12', 'item_5_13', 'item_5_14', 'item_5_15', 'item_5_16', 'item_5_17', 'item_5_18', 'item_5_19', 'item_5_20', 'item_5_21', 'item_5_22', 'item_5_23', 'item_5_24', 'item_5_25', // All distribution equipment
    'item_6_1', 'item_6_2', 'item_6_3', 'item_6_4', 'item_6_5', 'item_6_6', 'item_6_7', 'item_6_8', 'item_6_9', 'item_6_10', 'item_6_11', 'item_6_12', 'item_6_13', 'item_6_14', 'item_6_15', 'item_6_16', 'item_6_17', 'item_6_18', 'item_6_19', 'item_6_20', // All distribution circuits
    'item_7_1', 'item_7_2', 'item_7_3', 'item_7_4', 'item_7_5', 'item_7_6', 'item_7_7', 'item_7_8', 'item_7_9', 'item_7_10', 'item_7_11', 'item_7_12', 'item_7_13', 'item_7_14', 'item_7_15', 'item_7_16', 'item_7_17', 'item_7_18', 'item_7_19', 'item_7_20', // All final circuits including motor circuits
    'item_8_1', 'item_8_2', 'item_8_3', 'item_8_4', 'item_8_5', 'item_8_6', 'item_8_7', 'item_8_8', 'item_8_9', 'item_8_10', 'item_8_11', 'item_8_12', 'item_8_13', 'item_8_14', 'item_8_15', 'item_8_16', 'item_8_17', 'item_8_18', 'item_8_19', 'item_8_20', 'item_8_21', 'item_8_22', 'item_8_23', 'item_8_24', 'item_8_25', 'item_8_26', 'item_8_27', 'item_8_28', 'item_8_29', 'item_8_30', // All socket/equipment types
    'item_9_1', 'item_9_2', 'item_9_3', 'item_9_4', 'item_9_5', 'item_9_6', 'item_9_7', 'item_9_8', 'item_9_9', 'item_9_10', 'item_9_11', 'item_9_12', 'item_9_13', 'item_9_14', 'item_9_15', 'item_9_16', 'item_9_17', 'item_9_18', 'item_9_19', 'item_9_20', 'item_9_21', 'item_9_22', 'item_9_23', // Special locations
    'item_10_1', 'item_10_2', 'item_10_3', 'item_10_4', 'item_10_5', 'item_10_6', 'item_10_7', 'item_10_8', 'item_10_9', 'item_10_10', 'item_10_11', 'item_10_12', 'item_10_13', 'item_10_14', 'item_10_15', 'item_10_16', 'item_10_17', 'item_10_18', 'item_10_19', 'item_10_20' // All special installations
  ]
};

// Filter inspection sections based on property type
export const filterInspectionSections = (
  sections: InspectionSection[], 
  propertyType: string
): InspectionSection[] => {
  const category = getPropertyCategory(propertyType);
  const relevantItems = inspectionRelevance[category];
  
  if (!relevantItems || relevantItems.length === 0) {
    return sections; // Return all sections if no filtering rules defined
  }
  
  return sections.map(section => ({
    ...section,
    items: section.items.filter(item => relevantItems.includes(item.id))
  })).filter(section => section.items.length > 0); // Remove empty sections
};

// EIC inspection filtering is no longer needed as EIC uses a simple 14-item checklist
// that doesn't require property-type-based filtering

// Update smart field dependencies based on property type
export const updateSmartFieldDependencies = (propertyType: string) => {
  const category = getPropertyCategory(propertyType);
  
  const dependencies = {
    domestic: {
      supplyVoltage: '230V',
      phases: 'single',
      mainSwitchRating: '100',
      partPCompliance: 'compliant',
      earthingArrangement: 'tncs',
      earthElectrodeType: 'pme',
      mainBondingSize: '10mm',
      rcdMainSwitch: 'recommended'
    },
    commercial: {
      supplyVoltage: '400V',
      phases: 'three',
      mainSwitchRating: '200',
      partPCompliance: 'notApplicable',
      earthingArrangement: 'tncs',
      earthElectrodeType: 'pme',
      mainBondingSize: '10mm',
      rcdMainSwitch: 'yes'
    },
    industrial: {
      supplyVoltage: '400V',
      phases: 'three',
      mainSwitchRating: '400',
      partPCompliance: 'notApplicable',
      earthingArrangement: 'tns',
      earthElectrodeType: 'rod',
      mainBondingSize: '16mm',
      rcdMainSwitch: 'yes'
    }
  };
  
  return dependencies[category];
};