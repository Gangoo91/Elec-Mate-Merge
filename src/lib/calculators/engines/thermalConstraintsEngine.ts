// BS 7671 Thermal Constraints for Cable Grouping and Installation Methods
import { CalculationError, validateInput } from '../utils/calculatorUtils';
import { getGroupingFactor } from '../bs7671-data/temperatureFactors';

export interface ThermalConstraintInputs {
  cables: Array<{
    id: string;
    csa: number; // mm²
    current: number; // A
    cableType: 'pvc' | 'xlpe' | 'mineral';
    installationMethod: string;
  }>;
  groupingArrangement: {
    numCircuits: number;
    spacing: number; // mm between cables
    formation: 'trefoil' | 'flat' | 'single-layer' | 'multi-layer';
    enclosureType: 'conduit' | 'trunking' | 'duct' | 'cable-tray' | 'clipped-direct';
  };
  ambientConditions: {
    airTemperature: number; // °C
    soilTemperature?: number; // °C
    soilThermalResistivity?: number; // K.m/W
    ventilation: 'natural' | 'forced' | 'restricted';
  };
  installationDetails: {
    depth?: number; // mm (burial depth)
    surfaceMaterial?: 'concrete' | 'soil' | 'sand' | 'air';
    thermalBarriers?: boolean;
    fireBarriers?: boolean;
  };
}

export interface ThermalConstraintResult {
  overallGroupingFactor: number;
  individualCableAnalysis: Array<{
    cableId: string;
    baseRating: number; // A
    deratedRating: number; // A
    utilisation: number; // %
    thermalMargin: number; // A
    status: 'adequate' | 'marginal' | 'overloaded';
  }>;
  thermalFactors: {
    grouping: number;
    temperature: number;
    installation: number;
    overall: number;
  };
  hotspotAnalysis: {
    predictedTemperature: number; // °C
    maxPermittedTemperature: number; // °C
    thermalRisk: 'low' | 'moderate' | 'high' | 'critical';
  };
  spacingRecommendations: {
    minimumSpacing: number; // mm
    recommendedSpacing: number; // mm
    improvementPotential: number; // % capacity gain
  };
  alternatives: Array<{
    description: string;
    groupingImprovement: number; // %
    costImpact: 'low' | 'medium' | 'high';
    complexity: 'simple' | 'moderate' | 'complex';
  }>;
  complianceNotes: string[];
  warnings: string[];
}

// Enhanced grouping factors based on BS 7671 with more granular spacing
const enhancedGroupingFactors = {
  conduit: {
    2: { 0: 0.80, 10: 0.82, 20: 0.85, 50: 0.88 },
    3: { 0: 0.70, 10: 0.73, 20: 0.76, 50: 0.80 },
    4: { 0: 0.65, 10: 0.68, 20: 0.72, 50: 0.76 },
    6: { 0: 0.57, 10: 0.61, 20: 0.65, 50: 0.70 },
    9: { 0: 0.50, 10: 0.54, 20: 0.58, 50: 0.64 }
  },
  trunking: {
    2: { 0: 0.85, 50: 0.88, 100: 0.91, 200: 0.94 },
    3: { 0: 0.79, 50: 0.82, 100: 0.86, 200: 0.90 },
    4: { 0: 0.75, 50: 0.78, 100: 0.83, 200: 0.88 },
    6: { 0: 0.68, 50: 0.72, 100: 0.77, 200: 0.83 },
    9: { 0: 0.60, 50: 0.65, 100: 0.71, 200: 0.78 }
  },
  'cable-tray': {
    2: { 0: 0.88, 100: 0.91, 200: 0.94, 300: 0.97 },
    3: { 0: 0.82, 100: 0.86, 200: 0.90, 300: 0.94 },
    4: { 0: 0.77, 100: 0.82, 200: 0.87, 300: 0.92 },
    6: { 0: 0.72, 100: 0.78, 200: 0.84, 300: 0.90 },
    9: { 0: 0.65, 100: 0.72, 200: 0.79, 300: 0.86 }
  }
};

// Temperature ratings for different cable types
const temperatureRatings = {
  pvc: { normal: 70, emergency: 100 },
  xlpe: { normal: 90, emergency: 130 },
  mineral: { normal: 105, emergency: 250 }
};

export const analyseThermalConstraints = (inputs: ThermalConstraintInputs): ThermalConstraintResult => {
  const { cables, groupingArrangement, ambientConditions, installationDetails } = inputs;

  // Validation
  validateInput(ambientConditions.airTemperature, -10, 60, 'Air temperature');
  validateInput(groupingArrangement.numCircuits, 1, 20, 'Number of circuits');
  
  if (cables.length === 0) {
    throw new CalculationError('At least one cable is required', 'NO_CABLES');
  }

  const warnings: string[] = [];
  const complianceNotes: string[] = [];

  // Calculate enhanced grouping factor based on spacing
  const enhancedGroupingFactor = calculateEnhancedGroupingFactor(
    groupingArrangement.numCircuits,
    groupingArrangement.spacing,
    groupingArrangement.enclosureType
  );

  // Calculate temperature derating
  const temperatureFactor = calculateTemperatureDerating(
    ambientConditions.airTemperature,
    cables[0].cableType // Use first cable type as reference
  );

  // Installation method factor
  const installationFactor = calculateInstallationFactor(
    groupingArrangement.enclosureType,
    ambientConditions.ventilation,
    installationDetails.thermalBarriers
  );

  // Overall derating factor
  const overallFactor = enhancedGroupingFactor * temperatureFactor * installationFactor;

  // Analyse each cable
  const individualCableAnalysis = cables.map(cable => {
    // Base rating (would normally come from cable capacity tables)
    const baseRating = estimateBaseRating(cable.csa, cable.cableType);
    const deratedRating = baseRating * overallFactor;
    const utilisation = (cable.current / deratedRating) * 100;
    const thermalMargin = deratedRating - cable.current;

    let status: 'adequate' | 'marginal' | 'overloaded';
    if (utilisation <= 80) status = 'adequate';
    else if (utilisation <= 100) status = 'marginal';
    else status = 'overloaded';

    return {
      cableId: cable.id,
      baseRating: Math.round(baseRating),
      deratedRating: Math.round(deratedRating * 10) / 10,
      utilisation: Math.round(utilisation),
      thermalMargin: Math.round(thermalMargin * 10) / 10,
      status
    };
  });

  // Hotspot analysis
  const maxUtilisation = Math.max(...individualCableAnalysis.map(c => c.utilisation));
  const hotspotAnalysis = calculateHotspotTemperature(
    maxUtilisation,
    ambientConditions.airTemperature,
    cables[0].cableType,
    overallFactor
  );

  // Spacing recommendations
  const spacingRecommendations = calculateOptimalSpacing(
    groupingArrangement.numCircuits,
    groupingArrangement.enclosureType,
    groupingArrangement.spacing
  );

  // Alternative installation methods
  const alternatives = generateAlternatives(groupingArrangement, enhancedGroupingFactor);

  // Generate compliance notes and warnings
  if (overallFactor < 0.7) {
    warnings.push('Severe derating detected - consider alternative installation methods');
  }

  if (maxUtilisation > 100) {
    warnings.push('Cable overload detected - immediate action required');
    complianceNotes.push('FAIL: Installation exceeds cable thermal limits');
  } else if (maxUtilisation > 90) {
    warnings.push('High cable utilisation - monitor thermal performance');
  }

  if (hotspotAnalysis.thermalRisk === 'critical') {
    warnings.push('Critical thermal risk - cable damage possible');
  }

  complianceNotes.push(`Overall derating factor: ${(overallFactor * 100).toFixed(0)}%`);
  complianceNotes.push(`BS 7671 thermal analysis completed`);

  return {
    overallGroupingFactor: Math.round(enhancedGroupingFactor * 1000) / 1000,
    individualCableAnalysis,
    thermalFactors: {
      grouping: enhancedGroupingFactor,
      temperature: temperatureFactor,
      installation: installationFactor,
      overall: overallFactor
    },
    hotspotAnalysis,
    spacingRecommendations,
    alternatives,
    complianceNotes,
    warnings
  };
};

const calculateEnhancedGroupingFactor = (numCircuits: number, spacing: number, enclosureType: string): number => {
  const factors = enhancedGroupingFactors[enclosureType as keyof typeof enhancedGroupingFactors];
  if (!factors) return getGroupingFactor(numCircuits); // Fallback to standard

  const circuitFactors = factors[numCircuits as keyof typeof factors] || factors[9]; // Use worst case if not found
  
  // Interpolate based on spacing
  const spacings = Object.keys(circuitFactors).map(Number).sort((a, b) => a - b);
  
  for (let i = 0; i < spacings.length - 1; i++) {
    const lowerSpacing = spacings[i];
    const upperSpacing = spacings[i + 1];
    
    if (spacing >= lowerSpacing && spacing <= upperSpacing) {
      const lowerFactor = circuitFactors[lowerSpacing as keyof typeof circuitFactors];
      const upperFactor = circuitFactors[upperSpacing as keyof typeof circuitFactors];
      
      // Linear interpolation
      const ratio = (spacing - lowerSpacing) / (upperSpacing - lowerSpacing);
      return lowerFactor + ratio * (upperFactor - lowerFactor);
    }
  }

  // Return closest value if outside range
  return spacing <= spacings[0] 
    ? circuitFactors[spacings[0] as keyof typeof circuitFactors]
    : circuitFactors[spacings[spacings.length - 1] as keyof typeof circuitFactors];
};

const calculateTemperatureDerating = (ambientTemp: number, cableType: string): number => {
  const referenceTemp = 30; // °C
  const tempRating = temperatureRatings[cableType as keyof typeof temperatureRatings];
  
  if (!tempRating) return 1.0;

  // Simplified temperature derating calculation
  if (ambientTemp <= referenceTemp) return 1.0;
  
  const tempRise = ambientTemp - referenceTemp;
  const maxTempRise = tempRating.normal - referenceTemp;
  
  return Math.max(0.5, 1 - (tempRise / maxTempRise) * 0.5);
};

const calculateInstallationFactor = (enclosure: string, ventilation: string, thermalBarriers?: boolean): number => {
  let factor = 1.0;

  // Enclosure type adjustments
  if (enclosure === 'conduit') factor *= 0.95;
  else if (enclosure === 'duct') factor *= 0.90;
  else if (enclosure === 'trunking') factor *= 0.98;

  // Ventilation adjustments
  if (ventilation === 'restricted') factor *= 0.85;
  else if (ventilation === 'forced') factor *= 1.1;

  // Thermal barrier penalty
  if (thermalBarriers) factor *= 0.9;

  return Math.max(0.5, factor);
};

const estimateBaseRating = (csa: number, cableType: string): number => {
  // Simplified base rating estimation (would use full cable tables in practice)
  const baseRatings = {
    pvc: { 1.5: 20, 2.5: 27, 4: 37, 6: 47, 10: 64, 16: 85, 25: 112, 35: 138 },
    xlpe: { 1.5: 23, 2.5: 31, 4: 42, 6: 54, 10: 73, 16: 97, 25: 127, 35: 157 },
    mineral: { 1.5: 25, 2.5: 33, 4: 45, 6: 58, 10: 78, 16: 104, 25: 136, 35: 168 }
  };

  const ratings = baseRatings[cableType as keyof typeof baseRatings] || baseRatings.pvc;
  return ratings[csa as keyof typeof ratings] || 50; // Default if not found
};

const calculateHotspotTemperature = (utilisation: number, ambientTemp: number, cableType: string, deratingFactor: number) => {
  const tempRating = temperatureRatings[cableType as keyof typeof temperatureRatings];
  const maxTemp = tempRating?.normal || 70;

  // Simplified hotspot calculation
  const thermalRise = (utilisation / 100) * (utilisation / 100) * (maxTemp - ambientTemp) / deratingFactor;
  const predictedTemp = ambientTemp + thermalRise;

  let thermalRisk: 'low' | 'moderate' | 'high' | 'critical';
  if (predictedTemp < maxTemp * 0.8) thermalRisk = 'low';
  else if (predictedTemp < maxTemp * 0.9) thermalRisk = 'moderate';
  else if (predictedTemp < maxTemp) thermalRisk = 'high';
  else thermalRisk = 'critical';

  return {
    predictedTemperature: Math.round(predictedTemp),
    maxPermittedTemperature: maxTemp,
    thermalRisk
  };
};

const calculateOptimalSpacing = (numCircuits: number, enclosureType: string, currentSpacing: number) => {
  // Calculate optimal spacing for best thermal performance
  const minSpacing = 0;
  const recommendedSpacing = Math.max(currentSpacing, numCircuits * 5); // 5mm per circuit rule of thumb
  
  // Calculate improvement potential
  const currentFactor = calculateEnhancedGroupingFactor(numCircuits, currentSpacing, enclosureType);
  const improvedFactor = calculateEnhancedGroupingFactor(numCircuits, recommendedSpacing, enclosureType);
  const improvementPotential = ((improvedFactor - currentFactor) / currentFactor) * 100;

  return {
    minimumSpacing: minSpacing,
    recommendedSpacing,
    improvementPotential: Math.max(0, Math.round(improvementPotential))
  };
};

const generateAlternatives = (arrangement: ThermalConstraintInputs['groupingArrangement'], currentFactor: number) => {
  const alternatives = [];

  // Cable tray alternative
  if (arrangement.enclosureType !== 'cable-tray') {
    const trayFactor = calculateEnhancedGroupingFactor(arrangement.numCircuits, arrangement.spacing, 'cable-tray');
    const improvement = ((trayFactor - currentFactor) / currentFactor) * 100;
    
    alternatives.push({
      description: 'Install cables on perforated cable tray',
      groupingImprovement: Math.round(improvement),
      costImpact: 'medium' as const,
      complexity: 'moderate' as const
    });
  }

  // Increased spacing alternative
  const improvedSpacing = arrangement.spacing + 50;
  const spacingFactor = calculateEnhancedGroupingFactor(arrangement.numCircuits, improvedSpacing, arrangement.enclosureType);
  const spacingImprovement = ((spacingFactor - currentFactor) / currentFactor) * 100;

  alternatives.push({
    description: `Increase cable spacing to ${improvedSpacing}mm`,
    groupingImprovement: Math.round(spacingImprovement),
    costImpact: 'low' as const,
    complexity: 'simple' as const
  });

  // Split circuits alternative
  if (arrangement.numCircuits > 2) {
    const splitFactor = calculateEnhancedGroupingFactor(Math.ceil(arrangement.numCircuits / 2), arrangement.spacing, arrangement.enclosureType);
    const splitImprovement = ((splitFactor - currentFactor) / currentFactor) * 100;

    alternatives.push({
      description: 'Split circuits into separate enclosures',
      groupingImprovement: Math.round(splitImprovement),
      costImpact: 'high' as const,
      complexity: 'complex' as const
    });
  }

  return alternatives.filter(alt => alt.groupingImprovement > 5); // Only show meaningful improvements
};

// Helper function for common installation assessment
export const assessCableGrouping = (
  numCables: number,
  cableSize: number,
  current: number,
  installationType: 'conduit' | 'trunking' | 'cable-tray' = 'trunking',
  spacing: number = 0
): ThermalConstraintResult => {
  const cables = Array.from({ length: numCables }, (_, i) => ({
    id: `cable-${i + 1}`,
    csa: cableSize,
    current: current,
    cableType: 'pvc' as const,
    installationMethod: 'enclosed'
  }));

  return analyseThermalConstraints({
    cables,
    groupingArrangement: {
      numCircuits: numCables,
      spacing,
      formation: 'single-layer',
      enclosureType: installationType
    },
    ambientConditions: {
      airTemperature: 30,
      ventilation: 'natural'
    },
    installationDetails: {}
  });
};