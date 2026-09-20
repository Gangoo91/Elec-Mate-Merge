/**
 * IET On-Site Guide Reference Tables
 * BS 7671:2018+A3:2024 On-Site Guide
 * 
 * PLACEHOLDER STRUCTURE - Awaiting On-Site Guide PDF upload
 * For use in Designer, Installer, and Commissioning agents
 */

export interface OnSiteGuideTable {
  tableNumber: string;
  tableTitle: string;
  section: string;
  appliesTo: string[];
  data: any; // Structured table data
  notes?: string;
}

/**
 * Cable Selection Quick Reference
 * Placeholder - to be populated from On-Site Guide Appendix A
 */
export interface CableSelectionData {
  circuitType: string;
  maxLoad: number;
  cableSize: string;
  installationMethod: string;
  maxLength: number;
  protectiveDevice: string;
}

export const CABLE_SELECTION_PLACEHOLDER: CableSelectionData[] = [
  {
    circuitType: 'lighting_final',
    maxLoad: 6,
    cableSize: '1.5mm² T&E',
    installationMethod: 'Method C (clipped direct)',
    maxLength: 50,
    protectiveDevice: 'B6 MCB'
  },
  {
    circuitType: 'socket_ring',
    maxLoad: 32,
    cableSize: '2.5mm² T&E',
    installationMethod: 'Method C (clipped direct)',
    maxLength: 106,
    protectiveDevice: 'B32 MCB'
  },
  {
    circuitType: 'shower',
    maxLoad: 40,
    cableSize: '10mm² T&E',
    installationMethod: 'Method C (clipped direct)',
    maxLength: 27,
    protectiveDevice: 'B40 MCB'
  },
  {
    circuitType: 'cooker',
    maxLoad: 32,
    cableSize: '6mm² T&E',
    installationMethod: 'Method C (clipped direct)',
    maxLength: 44,
    protectiveDevice: 'B32 MCB'
  }
];

/**
 * Voltage Drop Simplified Values
 * Placeholder - to be populated from On-Site Guide
 */
export interface VoltageDropData {
  cableSize: string;
  voltageDropPerAmpPerMetre: number;
  cableType: string;
}

export const VOLTAGE_DROP_PLACEHOLDER: VoltageDropData[] = [
  { cableSize: '1.0mm²', voltageDropPerAmpPerMetre: 44, cableType: 'copper_T&E' },
  { cableSize: '1.5mm²', voltageDropPerAmpPerMetre: 29, cableType: 'copper_T&E' },
  { cableSize: '2.5mm²', voltageDropPerAmpPerMetre: 18, cableType: 'copper_T&E' },
  { cableSize: '4mm²', voltageDropPerAmpPerMetre: 11, cableType: 'copper_T&E' },
  { cableSize: '6mm²', voltageDropPerAmpPerMetre: 7.3, cableType: 'copper_T&E' },
  { cableSize: '10mm²', voltageDropPerAmpPerMetre: 4.4, cableType: 'copper_T&E' }
];

/**
 * Installation Methods Reference
 * Placeholder - to be populated from On-Site Guide
 */
export interface InstallationMethodData {
  methodReference: string;
  description: string;
  deratingFactor: number;
  suitableFor: string[];
  restrictions?: string;
}

export const INSTALLATION_METHODS_PLACEHOLDER: InstallationMethodData[] = [
  {
    methodReference: 'Method A',
    description: 'Enclosed in conduit in thermally insulating wall',
    deratingFactor: 0.5,
    suitableFor: ['domestic', 'commercial'],
    restrictions: 'Significant derating required'
  },
  {
    methodReference: 'Method B',
    description: 'Enclosed in conduit on wooden wall',
    deratingFactor: 0.8,
    suitableFor: ['domestic', 'commercial']
  },
  {
    methodReference: 'Method C',
    description: 'Clipped direct to surface or embedded',
    deratingFactor: 1.0,
    suitableFor: ['domestic', 'commercial'],
    restrictions: 'Most common domestic installation method'
  },
  {
    methodReference: 'Method 100',
    description: 'Enclosed in conduit in thermally insulating wall',
    deratingFactor: 0.5,
    suitableFor: ['domestic']
  },
  {
    methodReference: 'Method 101',
    description: 'Enclosed in conduit on wall or in trunking',
    deratingFactor: 0.95,
    suitableFor: ['domestic', 'commercial']
  },
  {
    methodReference: 'Method 102',
    description: 'Clipped direct',
    deratingFactor: 1.0,
    suitableFor: ['domestic', 'commercial']
  }
];

/**
 * Safe Zones for Cable Routing
 * From On-Site Guide Section X
 */
export const SAFE_ZONES = {
  horizontal: {
    description: 'Within 150mm of top of wall or ceiling',
    distance: 150,
    unit: 'mm'
  },
  vertical: {
    description: 'Within 150mm of wall corner or ceiling',
    distance: 150,
    unit: 'mm'
  },
  accessories: {
    description: 'Within 150mm zone either side of accessory',
    distance: 150,
    unit: 'mm'
  },
  notes: [
    'Cables must run vertically or horizontally to accessories',
    'If outside safe zones, must be at depth >50mm or have mechanical protection',
    'In walls with metal studs, cables at any depth must have earthed mechanical protection'
  ]
};

/**
 * Cable Support/Clip Spacing
 * From On-Site Guide installation guidance
 */
export interface CableSupportData {
  cableType: string;
  orientation: 'horizontal' | 'vertical';
  maxSpacing: number;
  unit: string;
}

export const CABLE_SUPPORT_SPACING: CableSupportData[] = [
  {
    cableType: 'T&E up to 9mm diameter',
    orientation: 'horizontal',
    maxSpacing: 250,
    unit: 'mm'
  },
  {
    cableType: 'T&E up to 9mm diameter',
    orientation: 'vertical',
    maxSpacing: 400,
    unit: 'mm'
  },
  {
    cableType: 'T&E 9-15mm diameter',
    orientation: 'horizontal',
    maxSpacing: 300,
    unit: 'mm'
  },
  {
    cableType: 'T&E 9-15mm diameter',
    orientation: 'vertical',
    maxSpacing: 400,
    unit: 'mm'
  },
  {
    cableType: 'T&E over 15mm diameter',
    orientation: 'horizontal',
    maxSpacing: 350,
    unit: 'mm'
  },
  {
    cableType: 'T&E over 15mm diameter',
    orientation: 'vertical',
    maxSpacing: 450,
    unit: 'mm'
  }
];

/**
 * Helper function to get cable selection for circuit type
 */
export function getCableSelection(circuitType: string): CableSelectionData | undefined {
  return CABLE_SELECTION_PLACEHOLDER.find(cs => cs.circuitType === circuitType);
}

/**
 * Helper function to calculate voltage drop
 */
export function calculateVoltageDrop(
  cableSize: string,
  current: number,
  length: number
): { voltageDrop: number; percentage: number; acceptable: boolean } {
  const vdData = VOLTAGE_DROP_PLACEHOLDER.find(vd => vd.cableSize === cableSize);
  
  if (!vdData) {
    return { voltageDrop: 0, percentage: 0, acceptable: false };
  }
  
  // Voltage drop = (mV/A/m × Current × Length) / 1000
  const voltageDrop = (vdData.voltageDropPerAmpPerMetre * current * length) / 1000;
  const percentage = (voltageDrop / 230) * 100;
  
  // BS 7671 allows max 3% for lighting, 5% for other uses
  const acceptable = percentage <= 5;
  
  return { voltageDrop, percentage, acceptable };
}

/**
 * Get installation method by reference
 */
export function getInstallationMethod(methodRef: string): InstallationMethodData | undefined {
  return INSTALLATION_METHODS_PLACEHOLDER.find(im => im.methodReference === methodRef);
}

/**
 * NOTE TO DEVELOPER:
 * Once the On-Site Guide PDF is uploaded and parsed:
 * 1. Extract table data from Appendix A (cable selection)
 * 2. Extract voltage drop tables
 * 3. Extract installation method details
 * 4. Replace placeholder data with actual On-Site Guide values
 * 5. Add table numbers and page references
 * 6. Store complete data in onsite_guide_tables database table
 */
