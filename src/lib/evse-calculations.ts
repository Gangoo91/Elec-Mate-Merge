import { CHARGER_TYPES, EARTHING_SYSTEMS, CABLE_SPECIFICATIONS, SAFETY_FACTORS, INSTALLATION_LOCATIONS } from './ev-constants';

export interface EVSEInput {
  chargingPoints: Array<{
    type: string;
    power: number;
    quantity: number;
  }>;
  supplyType: 'single' | 'three';
  supplyVoltage: number;
  earthingSystem: string;
  installationLocation: string;
  feederRunLength: number;
  voltageDrop: number;
  availableCapacity?: number;
  serviceHeadFuse?: number;
  existingSiteDemand?: number;
  loadManagementEnabled: boolean;
  simultaneityFactor: number;
  powerFactor: number;
}

export interface EVSEResult {
  connectedLoad: number;
  simultaneousLoad: number;
  lineCurrent: number;
  recommendedSupply: number;
  cableSize: string;
  protectionDevice: string;
  complianceStatus: 'compliant' | 'warning' | 'non-compliant';
  headroom: number;
  voltageDrop: number;
  zsCheck: {
    calculated: number;
    maximum: number;
    compliant: boolean;
  };
  warnings: string[];
  recommendations: string[];
  summary: {
    loadAnalysis: string;
    cableAssessment: string;
    protectionCompliance: string;
    installationRequirements: string;
  };
  requiresDNONotification: boolean;
  rcdType: string;
  penFaultProtection: boolean;
}

export function calculateEVSELoad(input: EVSEInput): EVSEResult {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Calculate total connected load
  const connectedLoad = input.chargingPoints.reduce((total, point) => {
    return total + (point.power * point.quantity);
  }, 0);

  // Apply simultaneity and load management
  let effectiveSimultaneity = input.simultaneityFactor / 100;
  if (input.loadManagementEnabled) {
    effectiveSimultaneity = Math.min(effectiveSimultaneity, 0.6); // Max 60% with load management
    recommendations.push("Load management system reduces peak demand and prevents supply overload");
  }

  const simultaneousLoad = connectedLoad * effectiveSimultaneity;

  // Calculate line current
  const voltage = input.supplyType === 'single' ? input.supplyVoltage : input.supplyVoltage * Math.sqrt(3);
  const lineCurrent = (simultaneousLoad * 1000) / (voltage * input.powerFactor);

  // Apply temperature derating
  const deratedCurrent = lineCurrent / SAFETY_FACTORS.temperature_derating.ambient_35c;

  // Select cable size
  const cableSelection = selectCable(deratedCurrent, input.feederRunLength, input.voltageDrop, input.supplyVoltage, input.supplyType);
  
  // Calculate actual voltage drop
  const actualVoltageDrop = calculateVoltageDrop(
    lineCurrent,
    input.feederRunLength,
    cableSelection.size,
    input.supplyType
  );

  // Check headroom
  let headroom = 0;
  if (input.availableCapacity) {
    headroom = input.availableCapacity - lineCurrent;
  } else if (input.serviceHeadFuse && input.existingSiteDemand) {
    const totalCapacity = input.serviceHeadFuse * 0.8; // 80% of fuse rating
    headroom = totalCapacity - input.existingSiteDemand - lineCurrent;
  }

  if (headroom < 0) {
    warnings.push("Calculated load exceeds available supply capacity");
  }

  // Earthing system checks
  const earthingData = EARTHING_SYSTEMS[input.earthingSystem];
  const zsCheck = calculateZs(input.feederRunLength, cableSelection.size, earthingData);

  // Protection device selection
  const protectionDevice = selectProtectionDevice(deratedCurrent);

  // RCD requirements
  const rcdType = determineRCDType(input.chargingPoints, input.earthingSystem);

  // PEN fault protection for external PME
  const penFaultProtection = input.earthingSystem === 'TN-C-S' && input.installationLocation === 'external';
  if (penFaultProtection) {
    recommendations.push("PEN fault protection required for external PME installation");
  }

  // DNO notification requirements
  const requiresDNONotification = checkDNONotification(simultaneousLoad, input.supplyType, headroom < 0);

  // Compliance status
  let complianceStatus: 'compliant' | 'warning' | 'non-compliant' = 'compliant';
  if (warnings.length > 0 || headroom < 0) {
    complianceStatus = 'warning';
  }
  if (actualVoltageDrop > input.voltageDrop || !zsCheck.compliant) {
    complianceStatus = 'non-compliant';
  }

  // Generate recommendations
  if (actualVoltageDrop > input.voltageDrop * 0.8) {
    recommendations.push("Consider larger cable size to improve voltage regulation");
  }
  
  if (input.earthingSystem === 'TT') {
    recommendations.push("30mA RCD protection mandatory for TT systems");
  }

  if (simultaneousLoad > 3.68 && input.supplyType === 'single') {
    recommendations.push("Consider three-phase supply for better load distribution");
  }

  return {
    connectedLoad,
    simultaneousLoad,
    lineCurrent,
    recommendedSupply: simultaneousLoad / input.powerFactor,
    cableSize: cableSelection.label,
    protectionDevice,
    complianceStatus,
    headroom,
    voltageDrop: actualVoltageDrop,
    zsCheck,
    warnings,
    recommendations,
    summary: generateSummary(input, simultaneousLoad, cableSelection, protectionDevice),
    requiresDNONotification,
    rcdType,
    penFaultProtection
  };
}

function selectCable(current: number, length: number, maxVoltageDrop: number, voltage: number, supplyType: string) {
  const cables = Object.entries(CABLE_SPECIFICATIONS);
  
  for (const [size, spec] of cables) {
    if (spec.current >= current) {
      const voltageDrop = calculateVoltageDrop(current, length, size, supplyType);
      if (voltageDrop <= maxVoltageDrop) {
        return { size, label: spec.label, voltageDrop };
      }
    }
  }
  
  return { size: '95mm', label: 'Specialist sizing required', voltageDrop: 0 };
}

function calculateVoltageDrop(current: number, length: number, cableSize: string, supplyType: string): number {
  const cable = CABLE_SPECIFICATIONS[cableSize as keyof typeof CABLE_SPECIFICATIONS];
  if (!cable) return 999;
  
  const multiplier = supplyType === 'single' ? 2 : Math.sqrt(3);
  return (current * length * cable.impedance * multiplier) / 1000;
}

function calculateZs(length: number, cableSize: string, earthingData: any) {
  const cable = CABLE_SPECIFICATIONS[cableSize as keyof typeof CABLE_SPECIFICATIONS];
  const estimatedZe = earthingData.label === 'TN-C-S (PME)' ? 0.35 : earthingData.label === 'TN-S' ? 0.8 : 1.0;
  const calculatedZs = estimatedZe + (length * cable.impedance / 1000);
  
  return {
    calculated: calculatedZs,
    maximum: earthingData.zs_max,
    compliant: calculatedZs <= earthingData.zs_max
  };
}

function selectProtectionDevice(current: number): string {
  const rating = Math.ceil(current * 1.1); // 10% margin
  
  if (rating <= 63) {
    return `${rating}A MCB with 30mA RCBO`;
  } else if (rating <= 125) {
    return `${rating}A MCCB with Type B RCD`;
  } else {
    return 'Specialist protection device required';
  }
}

function determineRCDType(chargingPoints: any[], earthingSystem: string): string {
  const hasDCCharging = chargingPoints.some(point => 
    CHARGER_TYPES[point.type]?.connector?.includes('DC') || point.power > 50
  );
  
  if (hasDCCharging) {
    return 'Type B with DC fault detection';
  } else if (earthingSystem === 'TT') {
    return '30mA Type A (mandatory)';
  } else {
    return '30mA Type A';
  }
}

function checkDNONotification(simultaneousLoad: number, supplyType: string, exceedsCapacity: boolean): boolean {
  if (supplyType === 'single' && simultaneousLoad > 3.68) return true;
  if (supplyType === 'three' && simultaneousLoad > 11.04) return true;
  if (exceedsCapacity) return true;
  return false;
}

function generateSummary(input: EVSEInput, simultaneousLoad: number, cable: any, protection: string) {
  return {
    loadAnalysis: `Total connected load of ${input.chargingPoints.reduce((sum, p) => sum + (p.power * p.quantity), 0).toFixed(1)}kW with ${(input.simultaneityFactor)}% simultaneity gives ${simultaneousLoad.toFixed(1)}kW simultaneous demand.`,
    cableAssessment: `${cable.label} cable selected for ${input.feederRunLength}m run with ${input.voltageDrop}% voltage drop limit on ${input.supplyType}-phase ${input.supplyVoltage}V supply.`,
    protectionCompliance: `${protection} recommended with ${input.earthingSystem} earthing system. ${input.earthingSystem === 'TT' ? '30mA RCD mandatory.' : 'RCD protection as per BS 7671.'}`,
    installationRequirements: `${INSTALLATION_LOCATIONS[input.installationLocation]?.label} installation with ${INSTALLATION_LOCATIONS[input.installationLocation]?.ipRating} protection. ${input.earthingSystem === 'TN-C-S' && input.installationLocation === 'external' ? 'PEN fault protection required.' : ''}`
  };
}