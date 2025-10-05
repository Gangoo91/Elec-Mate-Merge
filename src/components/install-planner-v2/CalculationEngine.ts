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
      recommendations: ['Check input parameters'],
      materials: [],
      practicalGuidance: [],
      costEstimate: { materials: 0, labour: 0, total: 0, breakdown: [] }
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

  // Generate materials list
  const materials = generateMaterialsList(
    result.recommendedSize,
    planData.cableLength,
    protectiveDevice,
    planData.cableType,
    planData.installationMethod
  );

  // Generate practical guidance
  const practicalGuidance = generatePracticalGuidance(
    planData.installationMethod,
    result.recommendedSize,
    planData.cableType,
    planData.loadType
  );

  // Generate cost estimate
  const costEstimate = generateCostEstimate(
    result.recommendedSize,
    planData.cableLength,
    protectiveDevice,
    planData.cableType
  );

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
    recommendations,
    materials,
    practicalGuidance,
    costEstimate
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

const generateMaterialsList = (
  cableSize: number,
  length: number,
  protectiveDevice: string,
  cableType: string,
  installationMethod: string
): { name: string; quantity: string; specification: string }[] => {
  const lengthWithWastage = Math.ceil(length * 1.1);
  const clipSpacing = installationMethod.includes('surface') ? 0.4 : 0.25; // meters
  const numClips = Math.ceil(length / clipSpacing) + 2; // +2 for ends
  
  const materials = [
    {
      name: 'Cable',
      quantity: `${lengthWithWastage}m`,
      specification: `${cableSize}mm² ${cableType === 'pvc-twin-earth' ? 'Twin & Earth' : 'Single Core'} PVC`
    },
    {
      name: 'Protective Device',
      quantity: '1',
      specification: protectiveDevice
    },
    {
      name: 'Cable Clips',
      quantity: `${numClips}`,
      specification: `Suitable for ${cableSize}mm² cable`
    }
  ];

  // Add grommets for through-wall installations
  if (installationMethod.includes('wall')) {
    materials.push({
      name: 'Grommets',
      quantity: '2-4',
      specification: `Rubber grommets for ${cableSize}mm² cable`
    });
  }

  // Add labels
  materials.push({
    name: 'Circuit Labels',
    quantity: '2',
    specification: 'Durable circuit identification labels'
  });

  return materials;
};

const generatePracticalGuidance = (
  installationMethod: string,
  cableSize: number,
  cableType: string,
  loadType: string
): { title: string; points: string[] }[] => {
  const guidance = [
    {
      title: 'Cable Routing (BS 7671 Regulation 522)',
      points: [
        'Run cables in safe zones: within 150mm of wall corners or ceiling/floor junctions',
        'If running horizontally, keep within 150mm of top or bottom of wall',
        'Vertically, run cables directly above or below outlets/switches',
        'Mark cable routes clearly to prevent future damage'
      ]
    },
    {
      title: 'Installation Method',
      points: installationMethod.includes('surface')
        ? [
            `Clip cable every ${installationMethod.includes('surface') ? '400mm' : '250mm'} horizontally`,
            'Use appropriate clips for the cable size and surface type',
            'Ensure cable is not kinked or sharply bent (min bend radius: 6× cable diameter)',
            'Protect cable in high-risk areas with conduit or trunking'
          ]
        : [
            'Ensure cable is de-rated if run in insulation',
            'Do not pull cable too tight - allow some slack',
            'Protect cable at entry/exit points with grommets',
            'Avoid running parallel to water pipes or gas lines'
          ]
    },
    {
      title: 'RCD Protection (BS 7671 Regulation 411.3.3)',
      points: loadType.toLowerCase().includes('socket') || loadType.toLowerCase().includes('outdoor')
        ? [
            'RCD protection (30mA) is required for socket outlets',
            'Test RCD monthly using the test button',
            'Label RCD with circuit identification'
          ]
        : [
            'Consider RCD protection for additional safety',
            'Required if cable depth is less than 50mm in walls/partitions'
          ]
    },
    {
      title: 'Testing & Verification (BS 7671 Part 6)',
      points: [
        'Test continuity of protective conductors',
        'Test insulation resistance (≥1MΩ at 500V DC)',
        'Verify polarity is correct',
        `Test earth fault loop impedance (Zs must be < 1.44Ω for ${getProtectiveDevice(cableSize)})`,
        'Complete an Electrical Installation Certificate',
        'Provide the client with operating instructions'
      ]
    }
  ];

  return guidance;
};

const generateCostEstimate = (
  cableSize: number,
  length: number,
  protectiveDevice: string,
  cableType: string
): { materials: number; labour: number; total: number; breakdown: { item: string; cost: number }[] } => {
  // UK market prices (September 2025 estimates)
  const cablePrices: Record<number, number> = {
    1.0: 0.85, 1.5: 1.20, 2.5: 1.85, 4: 2.90, 6: 4.20,
    10: 7.50, 16: 11.80, 25: 18.50, 35: 25.00, 50: 35.00
  };

  const mcbPrices: Record<string, number> = {
    '6A': 8, '10A': 8, '16A': 8, '20A': 9, '25A': 9,
    '32A': 10, '40A': 12, '50A': 14, '63A': 16, '80A': 20, '100A': 25
  };

  const lengthWithWastage = Math.ceil(length * 1.1);
  const cableCostPerMeter = cablePrices[cableSize] || 2.00;
  const cableCost = cableCostPerMeter * lengthWithWastage;
  
  const mcbRating = protectiveDevice.split('A')[0];
  const mcbCost = mcbPrices[`${mcbRating}A`] || 10;

  const clipSpacing = 0.4;
  const numClips = Math.ceil(length / clipSpacing) + 2;
  const clipsCost = numClips * 0.15;

  const accessoriesCost = 5; // grommets, labels, screws

  const materialsCost = cableCost + mcbCost + clipsCost + accessoriesCost;
  
  // Labour estimate: £45-65/hour, approx 1-2 hours for typical domestic circuit
  const labourHours = Math.max(1, Math.min(2, length / 10));
  const labourCost = labourHours * 55;

  const breakdown = [
    { item: `${cableSize}mm² Cable (${lengthWithWastage}m)`, cost: Math.round(cableCost) },
    { item: protectiveDevice, cost: mcbCost },
    { item: `Clips & Accessories`, cost: Math.round(clipsCost + accessoriesCost) },
    { item: `Labour (${labourHours.toFixed(1)} hours)`, cost: Math.round(labourCost) }
  ];

  return {
    materials: Math.round(materialsCost),
    labour: Math.round(labourCost),
    total: Math.round(materialsCost + labourCost),
    breakdown
  };
};
