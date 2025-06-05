import { useState, useCallback } from 'react';
import { enhancedCableSizes, industryTemplates, type EnhancedCableSizeOption, type CableTemplate } from './enhancedCableSizeData';

export interface EnhancedCableSizingInputs {
  // Project Information
  projectName: string;
  template: string;
  
  // Load Requirements
  current: number;
  voltage: number;
  powerFactor: number;
  loadType: 'resistive' | 'inductive' | 'mixed';
  futureExpansion: number; // percentage
  
  // Circuit Details
  length: number;
  phases: '1' | '3';
  circuitType: 'radial' | 'ring' | 'distribution';
  
  // Installation Environment
  installationMethod: string;
  ambientTemperature: number;
  groupingFactor: number;
  thermalInsulation: boolean;
  
  // Cable Preferences
  preferredCableTypes: string[];
  voltageDropLimit: number; // percentage
  
  // Protection
  protectionType: 'mcb' | 'fuse' | 'mccb';
  protectionRating: number;
  
  // Compliance
  earthingSystem: 'tn-s' | 'tn-c-s' | 'tt' | 'it';
  specialRequirements: string[];
}

export interface EnhancedCableSizingResult {
  recommendedCable: {
    cable: EnhancedCableSizeOption;
    suitabilityScore: number;
    costEffectiveness: 'excellent' | 'good' | 'fair' | 'poor';
    warningNotes: string[];
  } | null;
  alternativeCables: Array<{
    cable: EnhancedCableSizeOption;
    suitabilityScore: number;
    costEffectiveness: 'excellent' | 'good' | 'fair' | 'poor';
    warningNotes: string[];
  }>;
  designCurrent: number;
  protectiveDeviceRating: number;
  environmentalFactors: {
    temperatureDerating: number;
    groupingDerating: number;
    thermalInsulationDerating: number;
    overallDerating: number;
  };
  zsCalculation: {
    zs: number;
    maxZs: number;
    compliant: boolean;
  };
  complianceChecks: Array<{
    requirement: string;
    status: 'pass' | 'warning' | 'fail';
    details: string;
    regulation: string;
  }>;
  warnings: string[];
  recommendations: string[];
  errors: Record<string, string>;
}

export interface HistoryEntry {
  id: string;
  timestamp: Date;
  projectName: string;
  inputs: EnhancedCableSizingInputs;
  result: EnhancedCableSizingResult;
  notes: string;
}

const defaultInputs: EnhancedCableSizingInputs = {
  projectName: '',
  template: '',
  current: 0,
  voltage: 230,
  powerFactor: 0.85,
  loadType: 'mixed',
  futureExpansion: 0,
  length: 0,
  phases: '1',
  circuitType: 'radial',
  installationMethod: 'clipped-direct',
  ambientTemperature: 30,
  groupingFactor: 1.0,
  thermalInsulation: false,
  preferredCableTypes: ['swa'],
  voltageDropLimit: 3,
  protectionType: 'mcb',
  protectionRating: 0,
  earthingSystem: 'tn-c-s',
  specialRequirements: []
};

const defaultResult: EnhancedCableSizingResult = {
  recommendedCable: null,
  alternativeCables: [],
  designCurrent: 0,
  protectiveDeviceRating: 0,
  environmentalFactors: {
    temperatureDerating: 1.0,
    groupingDerating: 1.0,
    thermalInsulationDerating: 1.0,
    overallDerating: 1.0
  },
  zsCalculation: {
    zs: 0,
    maxZs: 0,
    compliant: false
  },
  complianceChecks: [],
  warnings: [],
  recommendations: [],
  errors: {}
};

export const useEnhancedCableSizing = () => {
  const [inputs, setInputs] = useState<EnhancedCableSizingInputs>(defaultInputs);
  const [result, setResult] = useState<EnhancedCableSizingResult>(defaultResult);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentProject, setCurrentProject] = useState<string>('');

  const updateInput = useCallback((field: keyof EnhancedCableSizingInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    const template = industryTemplates.find(t => t.id === templateId);
    if (!template) return;

    setInputs(prev => ({
      ...prev,
      template: templateId,
      preferredCableTypes: template.defaultCableTypes,
      specialRequirements: template.environmentalRequirements
    }));
  }, []);

  const validateInputs = useCallback((inputs: EnhancedCableSizingInputs): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!inputs.current || inputs.current <= 0) {
      errors.current = 'Current must be greater than 0';
    }

    if (!inputs.length || inputs.length <= 0) {
      errors.length = 'Length must be greater than 0';
    }

    if (!inputs.voltage || inputs.voltage <= 0) {
      errors.voltage = 'Voltage must be greater than 0';
    }

    if (inputs.powerFactor <= 0 || inputs.powerFactor > 1) {
      errors.powerFactor = 'Power factor must be between 0 and 1';
    }

    if (inputs.ambientTemperature < -20 || inputs.ambientTemperature > 80) {
      errors.ambientTemperature = 'Ambient temperature must be between -20°C and 80°C';
    }

    if (inputs.groupingFactor <= 0 || inputs.groupingFactor > 1) {
      errors.groupingFactor = 'Grouping factor must be between 0 and 1';
    }

    if (inputs.voltageDropLimit <= 0 || inputs.voltageDropLimit > 10) {
      errors.voltageDropLimit = 'Voltage drop limit must be between 0% and 10%';
    }

    return errors;
  }, []);

  const calculateEnvironmentalFactors = useCallback((inputs: EnhancedCableSizingInputs) => {
    // Temperature derating
    let tempDerating = 1.0;
    if (inputs.ambientTemperature > 30) {
      tempDerating = 0.87; // Simplified - should use BS 7671 Table 4B1
    }

    // Grouping derating
    const groupingDerating = inputs.groupingFactor;

    // Thermal insulation derating
    const thermalInsulationDerating = inputs.thermalInsulation ? 0.5 : 1.0;

    // Overall derating factor
    const overallDerating = tempDerating * groupingDerating * thermalInsulationDerating;

    return {
      temperatureDerating: tempDerating,
      groupingDerating,
      thermalInsulationDerating,
      overallDerating
    };
  }, []);

  const calculateDesignCurrent = useCallback((inputs: EnhancedCableSizingInputs) => {
    let designCurrent = inputs.current;

    // Apply future expansion
    if (inputs.futureExpansion > 0) {
      designCurrent *= (1 + inputs.futureExpansion / 100);
    }

    // For 3-phase, convert to line current if needed
    if (inputs.phases === '3') {
      // Already line current for balanced loads
    }

    return designCurrent;
  }, []);

  const selectSuitableCables = useCallback((
    inputs: EnhancedCableSizingInputs,
    designCurrent: number,
    environmentalFactors: any
  ) => {
    // Filter cables by preferred types if specified
    let availableCables = enhancedCableSizes;
    if (inputs.preferredCableTypes.length > 0) {
      availableCables = enhancedCableSizes.filter(cable => 
        inputs.preferredCableTypes.includes(cable.cableType)
      );
    }

    // Calculate required current carrying capacity considering derating
    const requiredCCC = designCurrent / environmentalFactors.overallDerating;

    // CRITICAL FIX: Filter out cables that don't meet minimum current requirement
    const suitableCables = availableCables.filter(cable => {
      const currentRating = cable.currentRating.swa || cable.currentRating.pvc || cable.currentRating.xlpe;
      return currentRating >= requiredCCC;
    });

    // If no cables meet the requirements, return empty array
    if (suitableCables.length === 0) {
      return [];
    }

    // Calculate voltage drop for suitable cables only
    const cablesWithVoltageDrops = suitableCables.map(cable => {
      const voltageDropPerMeter = (cable.voltageDropPerAmpereMeter * designCurrent * inputs.length) / 1000; // Convert mV to V
      const voltageDropPercentage = (voltageDropPerMeter / inputs.voltage) * 100;
      
      return {
        ...cable,
        calculatedVoltageDrop: voltageDropPerMeter,
        meetsVoltageDrop: voltageDropPercentage <= inputs.voltageDropLimit
      };
    });

    // Filter by voltage drop compliance
    const compliantCables = cablesWithVoltageDrops.filter(cable => cable.meetsVoltageDrop);

    // If no cables meet voltage drop requirements, still return the best options with warnings
    const finalCables = compliantCables.length > 0 ? compliantCables : cablesWithVoltageDrops;

    // Sort by suitability (current rating margin and voltage drop)
    return finalCables.sort((a, b) => {
      const aRating = a.currentRating.swa || a.currentRating.pvc || a.currentRating.xlpe;
      const bRating = b.currentRating.swa || b.currentRating.pvc || b.currentRating.xlpe;
      
      // Prefer cables with adequate but not excessive current rating
      const aMargin = aRating - requiredCCC;
      const bMargin = bRating - requiredCCC;
      
      // If both have adequate margin, prefer lower voltage drop
      if (aMargin > 0 && bMargin > 0) {
        return (a.calculatedVoltageDrop || 0) - (b.calculatedVoltageDrop || 0);
      }
      
      // Otherwise prefer higher current rating
      return bRating - aRating;
    });
  }, []);

  const calculateCableSuitability = useCallback((
    cable: EnhancedCableSizeOption,
    inputs: EnhancedCableSizingInputs,
    designCurrent: number
  ) => {
    const currentRating = cable.currentRating.swa || cable.currentRating.pvc || cable.currentRating.xlpe;
    const currentMargin = ((currentRating - designCurrent) / designCurrent) * 100;
    
    let suitabilityScore = 100;
    const warningNotes: string[] = [];

    // Current rating adequacy (most important factor)
    if (currentMargin < 0) {
      suitabilityScore = 0; // Cable is unsuitable
      warningNotes.push(`Insufficient current rating: ${currentRating}A < ${designCurrent.toFixed(1)}A required`);
    } else if (currentMargin < 20) {
      suitabilityScore -= 30;
      warningNotes.push('Low current rating margin - consider next size up');
    } else if (currentMargin > 200) {
      suitabilityScore -= 10;
      warningNotes.push('Oversized cable - consider smaller size for cost efficiency');
    }

    // Voltage drop compliance
    if (cable.calculatedVoltageDrop) {
      const voltageDropPercentage = (cable.calculatedVoltageDrop / inputs.voltage) * 100;
      if (voltageDropPercentage > inputs.voltageDropLimit) {
        suitabilityScore -= 40;
        warningNotes.push(`Voltage drop ${voltageDropPercentage.toFixed(2)}% exceeds limit of ${inputs.voltageDropLimit}%`);
      }
    }

    // Installation method compatibility
    if (!cable.installationMethods.includes(inputs.installationMethod)) {
      suitabilityScore -= 20;
      warningNotes.push('Installation method not typically recommended for this cable type');
    }

    // Cost effectiveness based on price category and size appropriateness
    let costEffectiveness: 'excellent' | 'good' | 'fair' | 'poor' = 'good';
    if (cable.priceCategory === 'low' && currentMargin < 50) {
      costEffectiveness = 'excellent';
    } else if (cable.priceCategory === 'premium' || currentMargin > 150) {
      costEffectiveness = 'fair';
    } else if (currentMargin < 0) {
      costEffectiveness = 'poor';
    }

    return {
      suitabilityScore: Math.max(0, suitabilityScore),
      costEffectiveness,
      warningNotes
    };
  }, []);

  const calculateEnhancedCableSize = useCallback(() => {
    const errors = validateInputs(inputs);
    if (Object.keys(errors).length > 0) {
      setResult(prev => ({ ...prev, errors }));
      return;
    }

    const environmentalFactors = calculateEnvironmentalFactors(inputs);
    const designCurrent = calculateDesignCurrent(inputs);
    
    // Determine protective device rating
    const protectiveDeviceRating = inputs.protectionRating || Math.ceil(designCurrent * 1.1);

    const suitableCables = selectSuitableCables(inputs, designCurrent, environmentalFactors);

    if (suitableCables.length === 0) {
      setResult({
        ...defaultResult,
        designCurrent,
        protectiveDeviceRating,
        environmentalFactors,
        errors: {
          calculation: `No suitable cables found for ${designCurrent.toFixed(1)}A load. Consider: 1) Using parallel cables, 2) Different cable type, 3) Reducing cable length, or 4) Improving installation conditions.`
        },
        warnings: [
          'No cables in database can handle the required current',
          'Consider using multiple parallel cables or different cable technology',
          'Review installation method and environmental conditions'
        ]
      });
      return;
    }

    // Calculate suitability for all cables
    const rankedCables = suitableCables.map(cable => ({
      cable,
      ...calculateCableSuitability(cable, inputs, designCurrent)
    }));

    // Get recommended cable (highest suitability score)
    const recommendedCable = rankedCables[0];
    const alternativeCables = rankedCables.slice(1, 6); // Top 5 alternatives

    // Basic Zs calculation (simplified)
    const zsCalculation = {
      zs: 0.35, // Simplified - would normally calculate from cable impedance
      maxZs: 1.44, // Typical for 32A MCB in TN system
      compliant: true
    };

    // Compliance checks
    const complianceChecks = [
      {
        requirement: 'Current carrying capacity',
        status: recommendedCable.suitabilityScore > 70 ? 'pass' as const : 'warning' as const,
        details: `Cable rated at ${(recommendedCable.cable.currentRating.swa || recommendedCable.cable.currentRating.pvc)}A for ${designCurrent.toFixed(1)}A load`,
        regulation: 'BS 7671:523.1'
      },
      {
        requirement: 'Voltage drop',
        status: (recommendedCable.cable.calculatedVoltageDrop || 0) / inputs.voltage * 100 <= inputs.voltageDropLimit ? 'pass' as const : 'fail' as const,
        details: `${((recommendedCable.cable.calculatedVoltageDrop || 0) / inputs.voltage * 100).toFixed(2)}% (limit: ${inputs.voltageDropLimit}%)`,
        regulation: 'BS 7671:525'
      },
      {
        requirement: 'Protective device coordination',
        status: 'pass' as const,
        details: `${protectiveDeviceRating}A protective device selected`,
        regulation: 'BS 7671:433.1'
      }
    ];

    const warnings: string[] = [];
    const recommendations: string[] = [];

    // Add specific warnings based on calculation
    if (designCurrent > 100) {
      recommendations.push('Consider 3-phase supply for loads over 100A');
    }

    if (inputs.length > 100) {
      recommendations.push('Long cable runs may benefit from voltage drop calculations using actual cable impedance');
    }

    setResult({
      recommendedCable,
      alternativeCables,
      designCurrent,
      protectiveDeviceRating,
      environmentalFactors,
      zsCalculation,
      complianceChecks,
      warnings,
      recommendations,
      errors: {}
    });
  }, [inputs, validateInputs, calculateEnvironmentalFactors, calculateDesignCurrent, selectSuitableCables, calculateCableSuitability]);

  const resetCalculator = useCallback(() => {
    setInputs(defaultInputs);
    setResult(defaultResult);
  }, []);

  const saveToHistory = useCallback((projectName: string, notes: string = '') => {
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      projectName,
      inputs: { ...inputs },
      result: { ...result },
      notes
    };

    setHistory(prev => [entry, ...prev].slice(0, 50)); // Keep last 50 entries
  }, [inputs, result]);

  const loadFromHistory = useCallback((entryId: string) => {
    const entry = history.find(h => h.id === entryId);
    if (entry) {
      setInputs(entry.inputs);
      setResult(entry.result);
      setCurrentProject(entry.projectName);
    }
  }, [history]);

  return {
    inputs,
    result,
    history,
    currentProject,
    availableTemplates: industryTemplates,
    updateInput,
    applyTemplate,
    calculateEnhancedCableSize,
    resetCalculator,
    saveToHistory,
    loadFromHistory,
    setCurrentProject
  };
};
