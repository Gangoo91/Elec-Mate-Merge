import { InstallPlanDataV2, CalculationResult } from "./types";
import { calculateSimplifiedCableSize } from "@/lib/calculators/engines/simplifiedCableSizingEngine";
import { getTemperatureFactor, getGroupingFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";

export const calculateCableSelection = (planData: InstallPlanDataV2): CalculationResult => {
  // Calculate design current
  const designCurrent = planData.phases === 'three'
    ? planData.totalLoad / (Math.sqrt(3) * planData.voltage * (planData.powerFactor || 0.85))
    : planData.totalLoad / planData.voltage;

  // Use the simplified cable sizing engine
  const result = calculateSimplifiedCableSize({
    current: designCurrent,
    installationType: planData.installationMethod,
    ambientTemp: planData.environmentalProfile.finalApplied.ambientTemp,
    groupingCircuits: planData.environmentalProfile.finalApplied.grouping,
    length: planData.cableLength,
    cableType: planData.cableType === 'pvc-twin-earth' ? 'pvc-single' : 'pvc-single'
  });

  if (!result) {
    return {
      recommendedCableSize: 0,
      capacity: 0,
      deratedCapacity: 0,
      protectiveDevice: 'N/A',
      voltageDrop: 0,
      voltageDropPercent: 0,
      zs: 0,
      compliant: false,
      factors: { temperature: 1, grouping: 1, overall: 1 },
      safetyMargin: 0,
      warnings: ['Unable to calculate suitable cable size'],
      recommendations: ['Check input parameters']
    };
  }

  // Calculate voltage drop (simplified - using mV/A/m approach)
  const voltageDropPerMeter = getVoltageDrop(result.recommendedSize, designCurrent);
  const totalVoltageDrop = voltageDropPerMeter * planData.cableLength;
  const voltageDropPercent = (totalVoltageDrop / planData.voltage) * 100;

  // Calculate Zs (simplified)
  const r1r2 = getR1R2(result.recommendedSize);
  const zs = planData.environmentalProfile.finalApplied.ze + r1r2;

  // Determine protective device
  const protectiveDevice = getProtectiveDevice(designCurrent);

  // Warnings and recommendations
  const warnings: string[] = [];
  const recommendations: string[] = [];

  if (voltageDropPercent > 3) {
    warnings.push(`Voltage drop of ${voltageDropPercent.toFixed(2)}% exceeds 3% limit for lighting circuits`);
    recommendations.push('Consider increasing cable size or reducing cable length');
  }

  if (voltageDropPercent > 5) {
    warnings.push(`Voltage drop of ${voltageDropPercent.toFixed(2)}% exceeds 5% limit`);
  }

  if (result.safetyMargin < 10) {
    warnings.push('Low safety margin - consider next cable size up');
  }

  if (result.safetyMargin > 50) {
    recommendations.push('Cable size can potentially be reduced for cost savings');
  }

  const compliant = voltageDropPercent <= 5 && result.compliant && zs < 1.5;

  return {
    recommendedCableSize: result.recommendedSize,
    capacity: result.capacity,
    deratedCapacity: result.deratedCapacity,
    protectiveDevice,
    voltageDrop: totalVoltageDrop,
    voltageDropPercent,
    zs,
    compliant,
    factors: result.factors,
    safetyMargin: result.safetyMargin,
    warnings,
    recommendations
  };
};

// Helper functions
const getVoltageDrop = (cableSize: number, current: number): number => {
  // Voltage drop in mV per Amp per meter for copper conductors (simplified)
  const drops: Record<number, number> = {
    1.0: 44,
    1.5: 29,
    2.5: 18,
    4: 11,
    6: 7.3,
    10: 4.4,
    16: 2.8,
    25: 1.75,
    35: 1.25,
    50: 0.93,
    70: 0.63,
    95: 0.46,
    120: 0.36,
    150: 0.29
  };
  
  return (drops[cableSize] || 18) * current / 1000; // Convert mV to V
};

const getR1R2 = (cableSize: number): number => {
  // R1+R2 values in ohms per meter (simplified)
  const values: Record<number, number> = {
    1.0: 36.2,
    1.5: 24.2,
    2.5: 14.82,
    4: 9.22,
    6: 6.16,
    10: 3.66,
    16: 2.27,
    25: 1.45,
    35: 1.03,
    50: 0.74
  };
  
  return (values[cableSize] || 14.82) / 1000; // Convert to ohms
};

const getProtectiveDevice = (current: number): string => {
  const ratings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100];
  const rating = ratings.find(r => r >= current * 1.1) || ratings[ratings.length - 1];
  return `${rating}A Type B MCB`;
};
