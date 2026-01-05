
import { cableSizeOptions } from '@/types/cableTypes';

// Enhanced cable current carrying capacities with installation methods
export const installationMethods = {
  'method_c': { label: 'Method C (Clipped Direct)', factor: 1.0 },
  'method_a1': { label: 'Method A1 (Conduit in Wall)', factor: 0.87 },
  'method_b': { label: 'Method B (Trunking)', factor: 0.91 },
  'method_d': { label: 'Method D (Direct Buried)', factor: 1.10 },
  'method_e': { label: 'Method E (Free Air)', factor: 1.20 }
};

// Voltage drop factors (mV/A/m) for different cable types
export const voltageDropFactors = {
  'pvc_copper': { r: 18, x: 0 },
  'xlpe_copper': { r: 18, x: 0 },
  'pvc_aluminium': { r: 29, x: 0 },
  'armoured_copper': { r: 18, x: 2.3 },
  'armoured_aluminium': { r: 29, x: 2.3 }
};

export const cableTypes = [
  { value: 'pvc_copper', label: '70°C PVC Copper', tempRating: 70 },
  { value: 'xlpe_copper', label: '90°C XLPE Copper', tempRating: 90 },
  { value: 'pvc_aluminium', label: '70°C PVC Aluminium', tempRating: 70 },
  { value: 'armoured_copper', label: 'Armoured Copper', tempRating: 70 },
  { value: 'armoured_aluminium', label: 'Armoured Aluminium', tempRating: 70 }
];

// Enhanced cable capacity calculation with installation method
export const getCableCapacity = (
  cableSize: string, 
  installationMethod: string = 'method_c',
  isRingCircuit: boolean = false
): number => {
  const cable = cableSizeOptions.find(option => option.value === cableSize);
  const method = installationMethods[installationMethod as keyof typeof installationMethods];
  
  if (!cable || !method) return 0;
  
  const adjustedCapacity = cable.currentCarryingCapacity * method.factor;
  return isRingCircuit ? adjustedCapacity * 2 : adjustedCapacity;
};

// Enhanced voltage drop calculation
export const calculateVoltageDrop = (
  cableType: string,
  cableSize: string,
  length: number,
  current: number,
  powerFactor: number = 1.0
): { voltageDrop: number, percentage: number, compliant: boolean } => {
  const cable = cableSizeOptions.find(option => option.value === cableSize);
  const dropFactors = voltageDropFactors[cableType as keyof typeof voltageDropFactors];
  
  if (!cable || !dropFactors) {
    return { voltageDrop: 0, percentage: 0, compliant: false };
  }
  
  const csaValue = parseFloat(cableSize.replace('mm', ''));
  const resistance = dropFactors.r;
  const reactance = dropFactors.x;
  
  // Calculate voltage drop considering power factor
  const resistiveDrop = (resistance * length * current) / (1000 * csaValue);
  const reactiveDrop = (reactance * length * current * Math.sqrt(1 - powerFactor * powerFactor)) / (1000 * csaValue);
  const totalDrop = Math.sqrt(resistiveDrop * resistiveDrop + reactiveDrop * reactiveDrop);
  
  const percentage = (totalDrop / 230) * 100;
  const compliant = percentage <= 5.0; // 5% limit for most circuits
  
  return { voltageDrop: totalDrop, percentage, compliant };
};

// Get minimum cable size for a given protective device rating
export const getCableSizeForRating = (
  rating: number, 
  installationMethod: string = 'method_c',
  isRingCircuit: boolean = false
): string => {
  const method = installationMethods[installationMethod as keyof typeof installationMethods];
  if (!method) return 'Invalid method';
  
  const requiredCapacity = isRingCircuit ? rating / 2 : rating;
  const adjustedRequired = requiredCapacity / method.factor;
  
  const suitableCables = cableSizeOptions.filter(cable => 
    cable.currentCarryingCapacity >= adjustedRequired
  );
  
  return suitableCables.length > 0 ? suitableCables[0].label : 'Check manufacturer data';
};

// Calculate maximum cable length for given voltage drop limit
export const getMaximumCableLength = (
  cableType: string,
  cableSize: string,
  current: number,
  voltageDropLimit: number = 5.0,
  powerFactor: number = 1.0
): number => {
  const cable = cableSizeOptions.find(option => option.value === cableSize);
  const dropFactors = voltageDropFactors[cableType as keyof typeof voltageDropFactors];
  
  if (!cable || !dropFactors) return 0;
  
  const csaValue = parseFloat(cableSize.replace('mm', ''));
  const maxVoltageDrop = (230 * voltageDropLimit) / 100;
  
  // Simplified calculation for maximum length
  const maxLength = (maxVoltageDrop * csaValue * 1000) / (dropFactors.r * current);
  
  return Math.floor(maxLength);
};
