// Battery Backup Runtime Calculator - Core Logic
// BS 7671 18th Edition compliant calculations

export interface BatteryChemistry {
  name: string;
  defaultDoD: number;
  peukertExponent: number;
  maxCRate: number;
  chargeEfficiency: number;
  temperatureCoeff: number; // %/°C below 25°C
  minChargeRate: number;
  maxChargeRate: number;
}

export interface InverterType {
  name: string;
  efficiency: number;
  defaultHeadroom: number;
  description: string;
}

export interface LoadPreset {
  name: string;
  watts: number;
  dutyCycle: number;
  surgeMultiplier: number;
  category: 'essential' | 'important' | 'convenience';
  description: string;
}

export interface BatteryInputs {
  mode: 'runtime' | 'sizing';
  
  // Battery configuration
  chemistry: string;
  nominalVoltage: number;
  capacityAh: number;
  seriesStrings: number;
  parallelStrings: number;
  customDoD?: number;
  customPeukert?: number;
  
  // Environmental
  ambientTemp: number;
  batteryHealth: number; // 70-100%
  
  // Loads
  loads: Array<{
    name: string;
    watts: number;
    dutyCycle: number;
    surgeMultiplier: number;
    priority: 'essential' | 'important' | 'convenience';
  }>;
  
  // Inverter
  inverterType: string;
  customEfficiency?: number;
  customHeadroom?: number;
  
  // DC system
  dcCableLength: number;
  maxVoltDrop: number;
  
  // For sizing mode
  requiredRuntime?: number;
}

export interface CalculationResults {
  // Load analysis
  averagePower: number;
  peakPower: number;
  surgePower: number;
  loadsByPriority: {
    essential: number;
    important: number;
    convenience: number;
  };
  
  // Battery bank
  bankVoltage: number;
  bankCapacityAh: number;
  bankEnergyWh: number;
  usableEnergyWh: number;
  
  // DC calculations
  dcCurrent: number;
  cRate: number;
  effectiveCapacity: number;
  
  // Results
  runtime: number; // hours
  requiredAh?: number; // for sizing mode
  
  // Inverter sizing
  recommendedWatts: number;
  recommendedVA: number;
  surgeCapability: number;
  
  // Charging
  recommendedChargeAmps: number;
  rechargeTime: number;
  
  // DC protection
  recommendedFuse: number;
  recommendedCableSize: string;
  actualVoltDrop: number;
  
  // Status and warnings
  warnings: string[];
  recommendations: string[];
  complianceNotes: string[];
}

// Chemistry database
export const BATTERY_CHEMISTRIES: Record<string, BatteryChemistry> = {
  'lead-acid-flooded': {
    name: 'Lead-Acid Flooded',
    defaultDoD: 0.5,
    peukertExponent: 1.3,
    maxCRate: 0.2,
    chargeEfficiency: 0.85,
    temperatureCoeff: 0.5,
    minChargeRate: 0.05,
    maxChargeRate: 0.15
  },
  'lead-acid-agm': {
    name: 'Lead-Acid AGM/GEL',
    defaultDoD: 0.5,
    peukertExponent: 1.2,
    maxCRate: 0.3,
    chargeEfficiency: 0.88,
    temperatureCoeff: 0.3,
    minChargeRate: 0.05,
    maxChargeRate: 0.2
  },
  'lithium-lfp': {
    name: 'Lithium LFP',
    defaultDoD: 0.8,
    peukertExponent: 1.05,
    maxCRate: 1.0,
    chargeEfficiency: 0.95,
    temperatureCoeff: 0.1,
    minChargeRate: 0.2,
    maxChargeRate: 0.5
  },
  'lithium-nmc': {
    name: 'Lithium NMC',
    defaultDoD: 0.8,
    peukertExponent: 1.1,
    maxCRate: 2.0,
    chargeEfficiency: 0.93,
    temperatureCoeff: 0.2,
    minChargeRate: 0.2,
    maxChargeRate: 0.7
  }
};

// Inverter types
export const INVERTER_TYPES: Record<string, InverterType> = {
  'line-interactive': {
    name: 'Line Interactive',
    efficiency: 0.92,
    defaultHeadroom: 0.25,
    description: 'Good for most applications'
  },
  'online-double': {
    name: 'Online Double Conversion',
    efficiency: 0.88,
    defaultHeadroom: 0.20,
    description: 'Continuous protection'
  },
  'transformerless': {
    name: 'Transformerless',
    efficiency: 0.95,
    defaultHeadroom: 0.25,
    description: 'High efficiency'
  }
};

// Load presets
export const LOAD_PRESETS: LoadPreset[] = [
  { name: 'LED Light 10W', watts: 10, dutyCycle: 1.0, surgeMultiplier: 1.0, category: 'essential', description: 'Emergency lighting' },
  { name: 'Wi-Fi Router', watts: 12, dutyCycle: 1.0, surgeMultiplier: 1.2, category: 'important', description: 'Network connectivity' },
  { name: 'Desktop PC', watts: 150, dutyCycle: 0.6, surgeMultiplier: 1.5, category: 'important', description: 'Office workstation' },
  { name: 'Laptop', watts: 65, dutyCycle: 0.8, surgeMultiplier: 1.0, category: 'important', description: 'Portable computer' },
  { name: 'Fridge/Freezer', watts: 120, dutyCycle: 0.3, surgeMultiplier: 4.0, category: 'essential', description: 'Food preservation' },
  { name: 'Sump Pump', watts: 600, dutyCycle: 0.1, surgeMultiplier: 6.0, category: 'essential', description: 'Flood prevention' },
  { name: 'Security System', watts: 25, dutyCycle: 1.0, surgeMultiplier: 1.0, category: 'essential', description: 'Alarm panel + cameras' },
  { name: 'Server Rack 1U', watts: 200, dutyCycle: 1.0, surgeMultiplier: 2.0, category: 'essential', description: 'Critical IT equipment' },
  { name: 'Heating Circulator', watts: 80, dutyCycle: 0.4, surgeMultiplier: 3.0, category: 'important', description: 'Central heating pump' }
];

// Standard fuse/MCB sizes (A)
const STANDARD_FUSE_SIZES = [5, 6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250];

// Cable sizes and current ratings (simplified)
const DC_CABLE_RATINGS = [
  { csa: '1.5mm²', rating: 16, resistance: 12.1 },
  { csa: '2.5mm²', rating: 21, resistance: 7.41 },
  { csa: '4mm²', rating: 28, resistance: 4.61 },
  { csa: '6mm²', rating: 36, resistance: 3.08 },
  { csa: '10mm²', rating: 50, resistance: 1.83 },
  { csa: '16mm²', rating: 68, resistance: 1.15 },
  { csa: '25mm²', rating: 89, resistance: 0.727 },
  { csa: '35mm²', rating: 110, resistance: 0.524 },
  { csa: '50mm²', rating: 134, resistance: 0.387 }
];

export function calculateBatteryBackup(inputs: BatteryInputs): CalculationResults {
  const chemistry = BATTERY_CHEMISTRIES[inputs.chemistry];
  const inverterType = INVERTER_TYPES[inputs.inverterType];
  
  if (!chemistry || !inverterType) {
    throw new Error('Invalid chemistry or inverter type');
  }
  
  const warnings: string[] = [];
  const recommendations: string[] = [];
  const complianceNotes: string[] = [];
  
  // Calculate load analysis
  const totalWatts = inputs.loads.reduce((sum, load) => sum + (load.watts * load.dutyCycle), 0);
  const peakWatts = inputs.loads.reduce((sum, load) => sum + load.watts, 0);
  const surgeWatts = inputs.loads.reduce((sum, load) => sum + (load.watts * load.surgeMultiplier), 0);
  
  const loadsByPriority = {
    essential: inputs.loads.filter(l => l.priority === 'essential').reduce((sum, load) => sum + (load.watts * load.dutyCycle), 0),
    important: inputs.loads.filter(l => l.priority === 'important').reduce((sum, load) => sum + (load.watts * load.dutyCycle), 0),
    convenience: inputs.loads.filter(l => l.priority === 'convenience').reduce((sum, load) => sum + (load.watts * load.dutyCycle), 0)
  };
  
  // Battery bank configuration
  const bankVoltage = inputs.nominalVoltage * inputs.seriesStrings;
  const bankCapacityAh = inputs.capacityAh * inputs.parallelStrings;
  const bankEnergyWh = bankVoltage * bankCapacityAh;
  
  // Environmental adjustments
  const tempDerating = 1 + (chemistry.temperatureCoeff * (inputs.ambientTemp - 25) / 100);
  const healthFactor = inputs.batteryHealth / 100;
  const doD = inputs.customDoD || chemistry.defaultDoD;
  const peukertExp = inputs.customPeukert || chemistry.peukertExponent;
  
  // DC current calculation
  const efficiency = inputs.customEfficiency || inverterType.efficiency;
  const dcCurrent = totalWatts / (bankVoltage * efficiency);
  const cRate = dcCurrent / bankCapacityAh;
  
  // Peukert adjustment (assuming C20 reference)
  const referenceRate = bankCapacityAh / 20; // C20
  const peukertFactor = Math.pow(referenceRate / dcCurrent, peukertExp - 1);
  const effectiveCapacity = bankCapacityAh * peukertFactor;
  
  // Usable energy
  const usableEnergyWh = bankVoltage * effectiveCapacity * doD * tempDerating * healthFactor;
  
  // Runtime calculation
  const runtime = totalWatts > 0 ? usableEnergyWh / totalWatts : 0;
  
  // Sizing mode calculation
  let requiredAh: number | undefined;
  if (inputs.mode === 'sizing' && inputs.requiredRuntime) {
    const requiredEnergyWh = totalWatts * inputs.requiredRuntime;
    requiredAh = requiredEnergyWh / (bankVoltage * doD * efficiency * tempDerating * healthFactor * peukertFactor);
  }
  
  // Inverter sizing
  const headroom = inputs.customHeadroom || inverterType.defaultHeadroom;
  const recommendedWatts = Math.ceil(peakWatts * (1 + headroom));
  const recommendedVA = Math.ceil(recommendedWatts * 1.2); // Assume 0.8 PF
  const surgeCapability = surgeWatts;
  
  // Charging calculations
  const recommendedChargeAmps = bankCapacityAh * chemistry.minChargeRate;
  const maxChargeAmps = bankCapacityAh * chemistry.maxChargeRate;
  const energyToRestore = bankEnergyWh * doD;
  const rechargeTime = energyToRestore / (bankVoltage * recommendedChargeAmps * chemistry.chargeEfficiency);
  
  // DC protection and cabling
  const maxDcCurrent = dcCurrent * 1.25; // 125% for protection
  const recommendedFuse = STANDARD_FUSE_SIZES.find(size => size >= maxDcCurrent) || 250;
  
  // Cable sizing (simplified volt drop calculation)
  const voltDropMv = (2 * inputs.dcCableLength * dcCurrent * 1000) / 1000; // Simplified
  let recommendedCableSize = '50mm²';
  let actualVoltDrop = 5.0;
  
  for (const cable of DC_CABLE_RATINGS) {
    const drop = (2 * inputs.dcCableLength * dcCurrent * cable.resistance) / (1000 * bankVoltage) * 100;
    if (drop <= inputs.maxVoltDrop && dcCurrent <= cable.rating) {
      recommendedCableSize = cable.csa;
      actualVoltDrop = drop;
      break;
    }
  }
  
  // Generate warnings and recommendations
  if (cRate > chemistry.maxCRate) {
    warnings.push(`C-rate (${cRate.toFixed(2)}C) exceeds recommended maximum (${chemistry.maxCRate}C) for ${chemistry.name}`);
    recommendations.push('Consider larger battery bank or higher voltage system to reduce current');
  }
  
  if (doD > 0.5 && inputs.chemistry.includes('lead-acid')) {
    warnings.push('Deep discharge (>50%) will significantly reduce lead-acid battery life');
    recommendations.push('Consider lithium batteries for deep cycling applications');
  }
  
  if (inputs.parallelStrings > 3) {
    warnings.push('Multiple parallel strings (>3) can cause balancing issues');
    recommendations.push('Use battery balancers or consider higher voltage system');
  }
  
  if (actualVoltDrop > inputs.maxVoltDrop) {
    warnings.push(`Voltage drop (${actualVoltDrop.toFixed(1)}%) exceeds target (${inputs.maxVoltDrop}%)`);
    recommendations.push('Use larger cable size or reduce cable length');
  }
  
  if (inputs.ambientTemp < 10) {
    warnings.push('Low ambient temperature will reduce battery capacity and runtime');
    recommendations.push('Consider battery heating or insulation in cold environments');
  }
  
  // Compliance notes
  complianceNotes.push('AC circuits: Follow BS 7671 for protection, cable sizing, and earthing');
  complianceNotes.push('DC protection: Install appropriate DC OCPD within 0.5m of battery terminals');
  complianceNotes.push('UPS equipment: Must comply with BS EN 62040 series');
  
  if (inputs.chemistry.includes('lead-acid')) {
    complianceNotes.push('Lead-acid: Provide adequate ventilation and spill containment (BS 7671 Sect 721)');
  } else {
    complianceNotes.push('Lithium: Follow manufacturer\'s spacing and temperature requirements');
  }
  
  complianceNotes.push('Testing: Regular battery and UPS testing per IET Code of Practice for EESS');
  complianceNotes.push('Labelling: All DC circuits must be clearly labelled with voltage and polarity');
  
  return {
    averagePower: totalWatts,
    peakPower: peakWatts,
    surgePower: surgeWatts,
    loadsByPriority,
    bankVoltage,
    bankCapacityAh,
    bankEnergyWh,
    usableEnergyWh,
    dcCurrent,
    cRate,
    effectiveCapacity,
    runtime,
    requiredAh,
    recommendedWatts,
    recommendedVA,
    surgeCapability,
    recommendedChargeAmps: Math.min(recommendedChargeAmps, maxChargeAmps),
    rechargeTime,
    recommendedFuse,
    recommendedCableSize,
    actualVoltDrop,
    warnings,
    recommendations,
    complianceNotes
  };
}

// Helper functions for UI
export function formatRuntime(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}min`;
  } else if (hours < 24) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  } else {
    const d = Math.floor(hours / 24);
    const h = Math.round(hours % 24);
    return h > 0 ? `${d}d ${h}h` : `${d}d`;
  }
}

export function getChemistryColor(chemistry: string): string {
  if (chemistry.includes('lithium')) return 'elec-yellow';
  if (chemistry.includes('agm')) return 'blue';
  return 'orange';
}

export function getStatusColor(value: number, goodThreshold: number, warningThreshold: number): 'success' | 'warning' | 'error' {
  if (value >= goodThreshold) return 'success';
  if (value >= warningThreshold) return 'warning';
  return 'error';
}