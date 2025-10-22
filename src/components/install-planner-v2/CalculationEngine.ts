import { InstallPlanDataV2, CalculationResult } from "./types";
import { calculateSimplifiedCableSize } from "@/lib/calculators/engines/simplifiedCableSizingEngine";
import { getTemperatureFactor, getGroupingFactor } from "@/lib/calculators/bs7671-data/temperatureFactors";
import { selectOptimalCableType } from "@/lib/calculators/cableTypeSelection";
import { getInstallationMethodFactor } from "@/lib/calculators/bs7671-data/installationMethodFactors";
import { CableType } from "@/lib/calculators/bs7671-data/cableCapacities";

export const calculateCableSelection = (planData: InstallPlanDataV2): CalculationResult => {
  // Calculate design current
  const designCurrent = planData.phases === 'three'
    ? planData.totalLoad / (Math.sqrt(3) * planData.voltage * (planData.powerFactor || 0.85))
    : planData.totalLoad / planData.voltage;

  // Intelligent cable type selection based on installation context
  const cableSelection = selectOptimalCableType({
    loadType: planData.loadType,
    location: planData.location,
    cableRun: planData.cableRun,
    mechanicalProtection: planData.mechanicalProtection,
    fireProtection: planData.fireProtection,
    ambientTemp: planData.environmentalProfile.finalApplied.ambientTemp
  });

  const selectedCableType = cableSelection.cableType;

  // Determine voltage drop limit: 3% for lighting, 5% for power
  const voltageDropLimit = planData.loadType.toLowerCase().includes('light') ? 3 : 5;
  
  // Use the simplified cable sizing engine with intelligent cable type
  const result = calculateSimplifiedCableSize({
    current: designCurrent,
    installationType: planData.cableRun || planData.installationMethod,
    ambientTemp: planData.environmentalProfile.finalApplied.ambientTemp,
    groupingCircuits: planData.environmentalProfile.finalApplied.grouping,
    length: planData.cableLength,
    voltage: planData.voltage,
    cableType: selectedCableType,
    voltageDropLimit
  });

  if (!result) {
    const failureReason = planData.cableLength > 50 
      ? `For ${planData.cableLength}m cable run, voltage drop exceeds ${voltageDropLimit}% limit with available cable sizes`
      : 'No suitable cable size found for the specified parameters';
    
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
      warnings: [failureReason],
      recommendations: [
        'Increase cable size to reduce voltage drop',
        'Reduce cable length or supply closer to load',
        'Consider alternative installation method or cable type'
      ],
      materials: [],
      practicalGuidance: [],
      costEstimate: { materials: 0, labour: 0, total: 0, breakdown: [] }
    };
  }

  // Use voltage drop from sizing result (already calculated)
  const voltageDropPercent = result.voltageDropPercent;
  const totalVoltageDrop = (voltageDropPercent / 100) * planData.voltage;

  // Calculate Zs (simplified)
  const r1r2 = getR1R2(result.recommendedSize);
  const zs = planData.environmentalProfile.finalApplied.ze + r1r2;

  // Determine protective device
  const protectiveDevice = getProtectiveDevice(designCurrent);

  // Warnings and recommendations
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Add cable selection reasoning
  recommendations.push(`Cable type: ${getCableTypeName(selectedCableType)} - ${cableSelection.reason}`);
  
  // Add selection reason if cable was sized for voltage drop
  if (result.selectionReason === 'voltage-drop') {
    recommendations.push(`Cable size selected to meet voltage drop requirement for ${planData.cableLength}m run`);
  } else if (result.selectionReason === 'current') {
    recommendations.push(`Cable size selected based on current carrying capacity`);
  }

  if (result.safetyMargin < 10) {
    warnings.push('Low safety margin - consider next cable size up');
  }

  if (result.safetyMargin > 50) {
    recommendations.push('Cable size can potentially be reduced for cost savings');
  }

  const compliant = voltageDropPercent <= 5 && result.compliant && zs < 1.5;

  // Generate materials list with intelligent cable type
  const materials = generateMaterialsList(
    result.recommendedSize,
    planData.cableLength,
    protectiveDevice,
    selectedCableType,
    planData.cableRun || planData.installationMethod,
    planData.location
  );

  // Generate practical guidance with context
  const practicalGuidance = generatePracticalGuidance(
    planData.cableRun || planData.installationMethod,
    result.recommendedSize,
    selectedCableType,
    planData.loadType,
    planData.location,
    planData.fireProtection
  );

  // Generate cost estimate with accurate 2025 pricing
  const costEstimate = generateCostEstimate(
    result.recommendedSize,
    planData.cableLength,
    protectiveDevice,
    selectedCableType,
    planData.cableRun || planData.installationMethod
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
const getCableTypeName = (cableType: CableType): string => {
  const names: Record<CableType, string> = {
    'pvc-single': 'FP200 Gold Fire Rated', // For fire/emergency circuits
    'xlpe-single': 'XLPE Single Core (90°C)',
    'pvc-twin-earth': 'PVC Twin & Earth',
    'xlpe-twin-earth': 'XLPE Twin & Earth (90°C)',
    'swa': 'SWA Armoured Cable',
    'micc': 'Mineral Insulated (MICC)',
    'aluminium-xlpe': 'Aluminium XLPE'
  };
  return names[cableType] || cableType;
};

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

const isFireRatedCircuit = (cableType: CableType): boolean => {
  return cableType === 'pvc-single'; // We use pvc-single to represent FP200
};

const generateMaterialsList = (
  cableSize: number,
  length: number,
  protectiveDevice: string,
  cableType: CableType,
  installationMethod: string,
  location?: string
): { name: string; quantity: string; specification: string; unitCost?: number; totalCost?: number }[] => {
  const lengthWithWastage = Math.ceil(length * 1.1);
  const isFireCircuit = isFireRatedCircuit(cableType);
  
  // Fire-rated circuits need metal clips at 300mm spacing max
  const clipSpacing = isFireCircuit ? 0.3 : (installationMethod.includes('surface') ? 0.4 : 0.25);
  const numClips = Math.ceil(length / clipSpacing) + 2; // +2 for ends
  
  const cableSpec = getCableTypeName(cableType);
  // Ensure minimum 1.5mm² for lighting circuits (industry standard)
  const effectiveCableSize = cableSize < 1.5 ? 1.5 : cableSize;
  
  // Get pricing for materials - UPDATED 2025 UK MARKET RATES
  const getCablePricePerMeter = (type: CableType, size: number): number => {
    const prices: Record<CableType, Record<number, number>> = {
      'pvc-twin-earth': { 1.0: 0.85, 1.5: 1.05, 2.5: 1.65, 4: 2.45, 6: 3.55, 10: 5.85, 16: 9.20, 25: 14.50, 35: 19.80 },
      'pvc-single': { 1.5: 2.80, 2.5: 3.25, 4: 4.20, 6: 5.50, 10: 8.50, 16: 12.50, 25: 19.00, 35: 26.00 },
      'swa': { 1.5: 3.80, 2.5: 4.85, 4: 6.50, 6: 8.80, 10: 13.50, 16: 20.00, 25: 29.50, 35: 40.00 },
      'xlpe-twin-earth': { 1.5: 1.35, 2.5: 2.15, 4: 3.20, 6: 4.50, 10: 7.50, 16: 12.00, 25: 19.00, 35: 26.00 },
      'xlpe-single': { 1.5: 0.65, 2.5: 0.95, 4: 1.35, 6: 1.90, 10: 3.15, 16: 4.90, 25: 7.80, 35: 10.50 },
      'micc': { 1.5: 3.20, 2.5: 4.50, 4: 5.90, 6: 7.80, 10: 12.50, 16: 19.00, 25: 29.00 },
      'aluminium-xlpe': { 16: 3.50, 25: 5.50, 35: 7.50, 50: 10.50, 70: 14.50, 95: 19.50 }
    };
    return prices[type]?.[size] || 1.65;
  };

  const cablePricePerMeter = getCablePricePerMeter(cableType, effectiveCableSize);
  const cableTotalCost = cablePricePerMeter * lengthWithWastage;
  
  const mcbPrices: Record<string, number> = {
    '6A': 8, '10A': 8, '16A': 8, '20A': 9, '25A': 9,
    '32A': 10, '40A': 12, '50A': 14, '63A': 16
  };
  const mcbRating = protectiveDevice.split('A')[0];
  const mcbCost = mcbPrices[`${mcbRating}A`] || 10;

  const materials = [
    {
      name: 'Cable',
      quantity: `${lengthWithWastage}m`,
      specification: `${effectiveCableSize}mm² ${cableSpec} (BS EN 50200 compliant${isFireCircuit ? ', 3-hour fire rating' : ''})`,
      unitCost: cablePricePerMeter,
      totalCost: cableTotalCost
    },
    {
      name: 'Protective Device',
      quantity: '1',
      specification: `${protectiveDevice} (BS EN 60898)`,
      unitCost: mcbCost,
      totalCost: mcbCost
    }
  ];

  // Cable-type specific materials
  if (cableType === 'swa') {
    materials.push(
      { name: 'SWA Glands', quantity: '2', specification: '20mm brass outdoor rated', unitCost: 12.50, totalCost: 25.00 },
      { name: 'Banjo Washers', quantity: '2', specification: 'Earthing banjo washers', unitCost: 2.50, totalCost: 5.00 },
      { name: 'Lockrings', quantity: '2', specification: '20mm brass lockrings', unitCost: 3.00, totalCost: 6.00 }
    );
    if (location === 'underground') {
      materials.push(
        { name: 'Warning Tape', quantity: `${length}m`, specification: 'Electrical cable buried below', unitCost: 0.50, totalCost: length * 0.50 },
        { name: 'Marker Posts', quantity: '2-4', specification: 'Cable route markers', unitCost: 8.00, totalCost: 24.00 }
      );
    }
  } else if (installationMethod.includes('conduit')) {
    materials.push(
      { name: 'Conduit', quantity: `${lengthWithWastage}m`, specification: '20mm PVC conduit', unitCost: 1.80, totalCost: lengthWithWastage * 1.80 },
      { name: 'Conduit Fittings', quantity: '6-10', specification: 'Elbows, couplers, inspection boxes', unitCost: 2.50, totalCost: 20.00 }
    );
  } else if (installationMethod.includes('trunking')) {
    const trunkingLengths = Math.ceil(length / 3);
    materials.push({ name: 'Trunking', quantity: `${trunkingLengths}`, specification: '50×50mm PVC trunking (3m lengths)', unitCost: 12.00, totalCost: trunkingLengths * 12.00 });
  } else {
    // Fire-rated circuits require metal clips
    const clipType = isFireCircuit ? 'Fire-rated metal cable clips' : 'Cable clips (spacer bar saddles)';
    const clipSpec = isFireCircuit 
      ? `BS 5839 compliant, 300mm max spacing` 
      : `${effectiveCableSize}mm² plastic/metal saddles`;
    const clipCost = isFireCircuit ? 0.80 : 0.35;
    materials.push({ name: clipType, quantity: `${numClips}`, specification: clipSpec, unitCost: clipCost, totalCost: numClips * clipCost });
  }

  // Fire-rated circuits require additional materials
  if (isFireCircuit) {
    materials.push(
      { name: 'Fire barrier compound', quantity: '1 tube', specification: 'Intumescent sealant (BS 476 Part 20)', unitCost: 18.50, totalCost: 18.50 },
      { name: 'Fire-rated cable ties', quantity: '10-15', specification: 'Metal cable ties for fire compartments', unitCost: 0.60, totalCost: 7.50 },
      { name: 'Circuit identification', quantity: '2', specification: 'EMERGENCY LIGHTING - DO NOT SWITCH OFF labels', unitCost: 2.50, totalCost: 5.00 }
    );
  } else {
    materials.push({ name: 'Circuit labels', quantity: '2', specification: 'BS 7671 compliant identification', unitCost: 1.50, totalCost: 3.00 });
  }

  return materials;
};

const generatePracticalGuidance = (
  installationMethod: string,
  cableSize: number,
  cableType: CableType,
  loadType: string,
  location?: string,
  fireProtection?: string
): { title: string; points: string[] }[] => {
  const guidance: { title: string; points: string[] }[] = [];

  // Cable-type specific guidance
  if (cableType === 'swa') {
    guidance.push({
      title: 'SWA Installation (BS 7671)',
      points: [
        location === 'underground' ? 'Burial depth: Minimum 450mm (gardens), 600mm (driveways)' : 'Use outdoor-rated glands (IP68)',
        'Terminate armour with banjo washer and flying earth to CPC',
        'Test insulation resistance before burial (≥1MΩ)',
        location === 'underground' ? 'Lay warning tape 150mm above cable' : 'Secure with galvanized cleats every 600mm'
      ]
    });
  } else if (fireProtection === 'fire-alarm' || loadType.toLowerCase().includes('emergency')) {
    const isEmergencyLighting = loadType.toLowerCase().includes('emergency') && loadType.toLowerCase().includes('light');
    guidance.push({
      title: isEmergencyLighting ? 'Emergency Lighting Installation (BS 5266 & BS 5839)' : 'Fire Circuit Installation (BS 5839)',
      points: isEmergencyLighting ? [
        'Use FP200 Gold fire-rated cable with metal clips - maximum 300mm spacing',
        'Segregate from power cables by minimum 50mm or use fire-rated barrier',
        'Fire-stop all penetrations through fire compartments using intumescent sealant',
        'Maintain cable support within 150mm of fire barrier penetrations',
        'Label clearly: EMERGENCY LIGHTING CIRCUIT - DO NOT SWITCH OFF',
        'Test 3-hour fire integrity after installation (BS EN 50200)',
        'Minimum 1.5mm² cable size for emergency lighting circuits (industry standard)',
        'Connect to maintained supply or central battery system as per BS 5266'
      ] : [
        'Use metal fire-rated clips - maximum 300mm spacing',
        'Segregate from power cables by 50mm minimum',
        'Fire-stop all penetrations through fire compartments',
        'Label clearly: FIRE ALARM CIRCUIT - DO NOT SWITCH OFF'
      ]
    });
  }

  guidance.push({
    title: 'Cable Routing (BS 7671 Regulation 522)',
    points: [
      'Run cables in safe zones: within 150mm of wall corners or ceiling/floor junctions',
      'Vertically, run cables directly above or below outlets/switches',
      'Mark cable routes clearly to prevent future damage'
    ]
  });

  guidance.push({
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
  });

  guidance.push({
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
  });

  guidance.push({
    title: 'Testing & Verification (BS 7671 Part 6)',
    points: [
      'Test continuity of protective conductors',
      'Test insulation resistance (≥1MΩ at 500V DC)',
      'Verify polarity is correct',
      `Test earth fault loop impedance (Zs must be < 1.44Ω for ${getProtectiveDevice(cableSize)})`,
      'Complete an Electrical Installation Certificate',
      'Provide the client with operating instructions'
    ]
  });

  return guidance;
};

const generateCostEstimate = (
  cableSize: number,
  length: number,
  protectiveDevice: string,
  cableType: CableType,
  installationMethod: string
): { materials: number; labour: number; total: number; breakdown: { item: string; cost: number }[] } => {
  // UK market prices (September 2025 - CORRECTED REAL MARKET RATES)
  // Cable prices per meter based on cable type
  const getCablePricePerMeter = (type: CableType, size: number): number => {
    const prices: Record<CableType, Record<number, number>> = {
      'pvc-twin-earth': {
        1.0: 0.85, 1.5: 1.05, 2.5: 1.65, 4: 2.45, 6: 3.55,
        10: 5.85, 16: 9.20, 25: 14.50, 35: 19.80, 50: 27.50
      },
      'xlpe-twin-earth': {
        1.0: 1.05, 1.5: 1.35, 2.5: 2.15, 4: 3.20, 6: 4.50,
        10: 7.50, 16: 12.00, 25: 19.00, 35: 26.00, 50: 36.00
      },
      'swa': {
        1.5: 3.80, 2.5: 4.85, 4: 6.50, 6: 8.80, 10: 13.50,
        16: 20.00, 25: 29.50, 35: 40.00, 50: 52.00
      },
      'pvc-single': { // FP200 Gold fire-rated cable pricing (2025 UK market rates)
        1.0: 3.20, 1.5: 3.80, 2.5: 4.50, 4: 5.80, 6: 7.20,
        10: 11.50, 16: 17.00, 25: 26.00, 35: 15.00, 50: 20.00
      },
      'xlpe-single': {
        1.0: 0.55, 1.5: 0.75, 2.5: 1.20, 4: 1.75, 6: 2.40,
        10: 4.00, 16: 6.20, 25: 9.80, 35: 13.20, 50: 17.50
      },
      'micc': {
        1.0: 3.20, 1.5: 3.80, 2.5: 5.50, 4: 7.20, 6: 9.50,
        10: 15.00, 16: 23.00, 25: 35.00
      },
      'aluminium-xlpe': {
        16: 4.50, 25: 7.00, 35: 9.50, 50: 13.00, 70: 18.00,
        95: 24.00, 120: 30.00, 150: 37.00
      }
    };
    return prices[type]?.[size] || 2.50;
  };

  const cableCostPerMeter = getCablePricePerMeter(cableType, cableSize);

  const mcbPrices: Record<string, number> = {
    '6A': 8, '10A': 8, '16A': 8, '20A': 9, '25A': 9,
    '32A': 10, '40A': 12, '50A': 14, '63A': 16, '80A': 20, '100A': 25
  };

  const lengthWithWastage = Math.ceil(length * 1.1);
  const cableCost = cableCostPerMeter * lengthWithWastage;
  
  const mcbRating = protectiveDevice.split('A')[0];
  const mcbCost = mcbPrices[`${mcbRating}A`] || 10;

  // Additional materials based on installation method and fire rating
  const isFireCircuitLocal = isFireRatedCircuit(cableType);
  let accessoriesCost = 5;
  
  if (cableType === 'swa') {
    accessoriesCost += 9; // SWA glands
  }
  
  if (isFireCircuitLocal) {
    accessoriesCost += 18; // Fire barrier compound (£12) + fire-rated ties (£6)
  }

  const clipSpacing = installationMethod.includes('conduit') ? 0 : (isFireCircuitLocal ? 0.3 : 0.4);
  const numClips = clipSpacing > 0 ? Math.ceil(length / clipSpacing) + 2 : 0;
  const clipCostEach = isFireCircuitLocal ? 0.45 : 0.15; // Fire-rated metal clips cost more
  const clipsCost = numClips * clipCostEach;

  const materialsCost = cableCost + mcbCost + clipsCost + accessoriesCost;
  
  // Labour: £45/hour (UK experienced electrician rate Sept 2025)
  const labourHours = Math.max(1.5, Math.min(3, length / 8));
  const labourCost = labourHours * 45;

  const cableDescription = isFireCircuitLocal ? 'FP200 Gold Cable' : 'Cable';
  
  const breakdown = [
    { item: `${cableDescription} ${cableSize >= 1.5 ? cableSize : 1.5}mm² (${lengthWithWastage}m)`, cost: Math.round(cableCost) },
    { item: protectiveDevice, cost: mcbCost },
    { item: isFireCircuitLocal ? 'Fire-rated clips' : 'Cable clips', cost: Math.round(clipsCost) },
    { item: isFireCircuitLocal ? 'Fire accessories (sealant, ties, labels)' : 'Accessories & labels', cost: Math.round(accessoriesCost) },
    { item: `Labour (${labourHours.toFixed(1)} hours @ £45/hr)`, cost: Math.round(labourCost) }
  ];

  return {
    materials: Math.round(materialsCost),
    labour: Math.round(labourCost),
    total: Math.round(materialsCost + labourCost),
    breakdown
  };
};
