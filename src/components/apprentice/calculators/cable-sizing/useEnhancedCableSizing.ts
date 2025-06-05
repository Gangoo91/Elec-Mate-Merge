
import { useState } from "react";
import { enhancedCableSizes, EnhancedCableSizeOption, industryTemplates, CableTemplate } from "./enhancedCableSizeData";

export interface EnhancedCableSizingInputs {
  current: string;
  length: string;
  installationType: "pvc" | "xlpe" | "epr";
  voltageDrop: string;
  voltage: string;
  cableType: string;
  loadType: string;
  environment: string;
  installationMethod: string;
  groupingFactor: string;
  ambientTemperature: string;
  template?: string;
  futureExpansion: string;
  harmonics: string;
  earthingSystem: string;
  mcbType: string;
}

export interface EnhancedCableSizingErrors {
  [key: string]: string;
}

export interface ComplianceCheck {
  regulation: string;
  requirement: string;
  status: "pass" | "fail" | "warning";
  reference: string;
  details?: string;
}

export interface CableSizingRecommendation {
  cable: EnhancedCableSizeOption;
  suitabilityScore: number;
  costEffectiveness: "excellent" | "good" | "fair" | "poor";
  futureProof: boolean;
  installationComplexity: "simple" | "moderate" | "complex";
  maintenanceRequirements: string[];
  warningNotes: string[];
}

export interface EnhancedCableSizingResult {
  recommendedCable: CableSizingRecommendation | null;
  alternativeCables: CableSizingRecommendation[];
  complianceChecks: ComplianceCheck[];
  environmentalFactors: {
    temperatureDerating: number;
    groupingDerating: number;
    overallDerating: number;
  };
  zsCalculation: {
    zs: number;
    maxZs: number;
    compliant: boolean;
  };
  errors: EnhancedCableSizingErrors;
  warnings: string[];
  recommendations: string[];
  designCurrent: number;
  protectiveDeviceRating: number;
}

export interface CalculationHistory {
  id: string;
  timestamp: Date;
  projectName: string;
  inputs: EnhancedCableSizingInputs;
  result: EnhancedCableSizingResult;
  notes: string;
}

export const useEnhancedCableSizing = () => {
  const [inputs, setInputs] = useState<EnhancedCableSizingInputs>({
    current: "",
    length: "",
    installationType: "pvc",
    voltageDrop: "5",
    voltage: "230",
    cableType: "twin-and-earth",
    loadType: "resistive",
    environment: "indoor-dry",
    installationMethod: "clipped-direct",
    groupingFactor: "1",
    ambientTemperature: "30",
    futureExpansion: "25",
    harmonics: "none",
    earthingSystem: "tn-s",
    mcbType: "type-b"
  });

  const [result, setResult] = useState<EnhancedCableSizingResult>({
    recommendedCable: null,
    alternativeCables: [],
    complianceChecks: [],
    environmentalFactors: {
      temperatureDerating: 1,
      groupingDerating: 1,
      overallDerating: 1
    },
    zsCalculation: {
      zs: 0,
      maxZs: 0,
      compliant: false
    },
    errors: {},
    warnings: [],
    recommendations: [],
    designCurrent: 0,
    protectiveDeviceRating: 0
  });

  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [currentProject, setCurrentProject] = useState<string>("");

  const updateInput = (field: keyof EnhancedCableSizingInputs, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    if (result.errors[field]) {
      clearError(field);
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = industryTemplates.find(t => t.id === templateId);
    if (!template) return;

    setInputs(prev => ({
      ...prev,
      template: templateId,
      cableType: template.defaultCableTypes[0] || prev.cableType,
      installationMethod: template.installationMethods[0] || prev.installationMethod,
      environment: template.environmentalRequirements[0] || prev.environment
    }));
  };

  const clearError = (field: string) => {
    if (result.errors[field]) {
      setResult(prev => ({
        ...prev,
        errors: Object.keys(prev.errors).reduce((acc, key) => {
          if (key !== field) acc[key] = prev.errors[key];
          return acc;
        }, {} as EnhancedCableSizingErrors)
      }));
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: EnhancedCableSizingErrors = {};
    
    if (!inputs.current) newErrors.current = "Current is required";
    else if (isNaN(parseFloat(inputs.current)) || parseFloat(inputs.current) <= 0) 
      newErrors.current = "Please enter a valid positive number";
    
    if (!inputs.length) newErrors.length = "Cable length is required";
    else if (isNaN(parseFloat(inputs.length)) || parseFloat(inputs.length) <= 0) 
      newErrors.length = "Please enter a valid positive number";
    
    if (!inputs.voltageDrop) newErrors.voltageDrop = "Voltage drop percentage is required";
    else if (isNaN(parseFloat(inputs.voltageDrop)) || parseFloat(inputs.voltageDrop) <= 0) 
      newErrors.voltageDrop = "Please enter a valid positive number";
    
    if (!inputs.voltage) newErrors.voltage = "Voltage is required";
    else if (isNaN(parseFloat(inputs.voltage)) || parseFloat(inputs.voltage) <= 0) 
      newErrors.voltage = "Please enter a valid positive number";

    setResult(prev => ({ ...prev, errors: newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const calculateTemperatureDerating = (ambientTemp: number): number => {
    // Temperature derating factors based on BS 7671 Appendix 4
    if (ambientTemp <= 30) return 1.0;
    if (ambientTemp <= 35) return 0.94;
    if (ambientTemp <= 40) return 0.87;
    if (ambientTemp <= 45) return 0.79;
    if (ambientTemp <= 50) return 0.71;
    if (ambientTemp <= 55) return 0.61;
    if (ambientTemp <= 60) return 0.50;
    return 0.50; // Minimum derating
  };

  const calculateGroupingDerating = (groupingFactor: number): number => {
    // Simplified grouping factors
    return Math.max(0.5, Math.min(1.0, groupingFactor));
  };

  const performComplianceChecks = (
    cable: EnhancedCableSizeOption,
    designCurrent: number,
    voltageDrop: number
  ): ComplianceCheck[] => {
    const checks: ComplianceCheck[] = [];

    // Voltage drop compliance (BS 7671 Appendix 4)
    checks.push({
      regulation: "BS 7671",
      requirement: "Voltage drop limits",
      status: voltageDrop <= parseFloat(inputs.voltageDrop) ? "pass" : "fail",
      reference: "Appendix 4 Section 6.4",
      details: `Calculated: ${voltageDrop.toFixed(2)}%, Limit: ${inputs.voltageDrop}%`
    });

    // Current carrying capacity
    const currentRating = cable.currentRating[inputs.installationType] || 0;
    checks.push({
      regulation: "BS 7671",
      requirement: "Current carrying capacity",
      status: currentRating >= designCurrent ? "pass" : "fail",
      reference: "Appendix 4",
      details: `Rating: ${currentRating}A, Required: ${designCurrent.toFixed(1)}A`
    });

    // Installation method compatibility
    const methodCompatible = cable.installationMethods.includes(inputs.installationMethod);
    checks.push({
      regulation: "BS 7671",
      requirement: "Installation method compatibility",
      status: methodCompatible ? "pass" : "warning",
      reference: "Appendix 4",
      details: methodCompatible ? "Compatible" : "Method not optimised for this cable type"
    });

    return checks;
  };

  const calculateEnhancedCableSize = () => {
    if (!validateInputs()) return;
    
    const loadCurrent = parseFloat(inputs.current);
    const cableLength = parseFloat(inputs.length);
    const maxVoltageDropPercent = parseFloat(inputs.voltageDrop);
    const maxVoltageDrop = (maxVoltageDropPercent / 100) * parseFloat(inputs.voltage);
    const ambientTemp = parseFloat(inputs.ambientTemperature);
    const groupingFactor = parseFloat(inputs.groupingFactor);
    const expansionFactor = 1 + (parseFloat(inputs.futureExpansion) / 100);

    // Calculate environmental derating factors
    const tempDerating = calculateTemperatureDerating(ambientTemp);
    const groupDerating = calculateGroupingDerating(groupingFactor);
    const overallDerating = tempDerating * groupDerating;

    // Calculate design current with expansion factor
    const designCurrent = loadCurrent * expansionFactor / overallDerating;

    // Filter cables by type
    const availableCables = enhancedCableSizes.filter(cable => 
      cable.cableType === inputs.cableType
    );

    if (availableCables.length === 0) {
      setResult(prev => ({
        ...prev,
        errors: { cableType: "No cables available for selected type" },
        warnings: [],
        recommendations: []
      }));
      return;
    }

    // Find suitable cables
    const suitableCables = availableCables
      .map(cable => {
        const currentRating = cable.currentRating[inputs.installationType] || 0;
        const voltageDrop = cable.voltageDropPerAmpereMeter * loadCurrent * cableLength;
        const voltageDropPercent = (voltageDrop / parseFloat(inputs.voltage)) * 100;
        
        const meetsCurrentRequirement = currentRating >= designCurrent;
        const meetsVoltageDropRequirement = voltageDrop <= maxVoltageDrop;
        
        // Calculate suitability score
        let suitabilityScore = 0;
        if (meetsCurrentRequirement) suitabilityScore += 40;
        if (meetsVoltageDropRequirement) suitabilityScore += 40;
        if (cable.installationMethods.includes(inputs.installationMethod)) suitabilityScore += 10;
        if (cable.applications.some(app => app.includes(inputs.loadType))) suitabilityScore += 10;

        const recommendation: CableSizingRecommendation = {
          cable: {
            ...cable,
            calculatedVoltageDrop: voltageDrop,
            meetsVoltageDrop: meetsVoltageDropRequirement
          },
          suitabilityScore,
          costEffectiveness: cable.priceCategory === 'low' ? 'excellent' : 
                           cable.priceCategory === 'medium' ? 'good' : 'fair',
          futureProof: currentRating >= designCurrent * 1.25,
          installationComplexity: cable.mechanicalProtection === 'heavy' ? 'complex' : 
                                cable.mechanicalProtection === 'medium' ? 'moderate' : 'simple',
          maintenanceRequirements: [],
          warningNotes: []
        };

        if (!meetsCurrentRequirement) {
          recommendation.warningNotes.push("Insufficient current capacity");
        }
        if (!meetsVoltageDropRequirement) {
          recommendation.warningNotes.push("Voltage drop exceeds limits");
        }

        return recommendation;
      })
      .filter(rec => rec.suitabilityScore > 0)
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore);

    // Generate compliance checks
    const complianceChecks = suitableCables.length > 0 ? 
      performComplianceChecks(
        suitableCables[0].cable, 
        designCurrent, 
        (suitableCables[0].cable.calculatedVoltageDrop! / parseFloat(inputs.voltage)) * 100
      ) : [];

    // Calculate Zs (simplified)
    const r1r2 = suitableCables.length > 0 ? 
      (suitableCables[0].cable.impedance.r1 + suitableCables[0].cable.impedance.r2) * cableLength / 1000 : 0;
    const ze = 0.35; // Assumed Ze value
    const zs = ze + r1r2;
    const maxZs = inputs.mcbType === "type-b" ? 2.3 : inputs.mcbType === "type-c" ? 1.15 : 0.46;

    // Generate warnings and recommendations
    const warnings: string[] = [];
    const recommendations: string[] = [];

    if (suitableCables.length === 0) {
      warnings.push("No cables meet the specified requirements");
      recommendations.push("Consider increasing cable size or reducing load current");
    }

    if (overallDerating < 0.8) {
      warnings.push("High derating factors applied due to environmental conditions");
      recommendations.push("Consider improving installation conditions or using higher rated cables");
    }

    setResult({
      recommendedCable: suitableCables[0] || null,
      alternativeCables: suitableCables.slice(1, 4),
      complianceChecks,
      environmentalFactors: {
        temperatureDerating: tempDerating,
        groupingDerating: groupDerating,
        overallDerating
      },
      zsCalculation: {
        zs,
        maxZs,
        compliant: zs <= maxZs
      },
      errors: {},
      warnings,
      recommendations,
      designCurrent,
      protectiveDeviceRating: Math.ceil(designCurrent * 1.1)
    });
  };

  const saveToHistory = (projectName: string, notes: string = "") => {
    const historyEntry: CalculationHistory = {
      id: Date.now().toString(),
      timestamp: new Date(),
      projectName,
      inputs: { ...inputs },
      result: { ...result },
      notes
    };

    setHistory(prev => [historyEntry, ...prev.slice(0, 49)]); // Keep last 50 entries
  };

  const loadFromHistory = (historyId: string) => {
    const historyEntry = history.find(h => h.id === historyId);
    if (historyEntry) {
      setInputs(historyEntry.inputs);
      setResult(historyEntry.result);
      setCurrentProject(historyEntry.projectName);
    }
  };

  const resetCalculator = () => {
    setInputs({
      current: "",
      length: "",
      installationType: "pvc",
      voltageDrop: "5",
      voltage: "230",
      cableType: "twin-and-earth",
      loadType: "resistive",
      environment: "indoor-dry",
      installationMethod: "clipped-direct",
      groupingFactor: "1",
      ambientTemperature: "30",
      futureExpansion: "25",
      harmonics: "none",
      earthingSystem: "tn-s",
      mcbType: "type-b"
    });
    setResult({
      recommendedCable: null,
      alternativeCables: [],
      complianceChecks: [],
      environmentalFactors: {
        temperatureDerating: 1,
        groupingDerating: 1,
        overallDerating: 1
      },
      zsCalculation: {
        zs: 0,
        maxZs: 0,
        compliant: false
      },
      errors: {},
      warnings: [],
      recommendations: [],
      designCurrent: 0,
      protectiveDeviceRating: 0
    });
  };

  return {
    inputs,
    result,
    history,
    currentProject,
    updateInput,
    applyTemplate,
    calculateEnhancedCableSize,
    resetCalculator,
    saveToHistory,
    loadFromHistory,
    setCurrentProject,
    availableTemplates: industryTemplates
  };
};
