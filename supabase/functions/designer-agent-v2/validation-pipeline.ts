/**
 * Multi-Stage Validation Pipeline for Circuit Designs
 * Validates calculations, BS7671 compliance, and safety before returning to user
 */

export interface ValidationError {
  circuitIndex: number;
  circuitName: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'calculation' | 'compliance' | 'safety';
  message: string;
  regulation?: string;
  suggestedFix?: string;
}

export interface ValidationResult {
  passed: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  info: ValidationError[];
}

/**
 * Layer 1: Calculation Validation
 * Verify all electrical calculations are mathematically correct
 */
export function validateCalculations(circuits: any[]): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const info: ValidationError[] = [];

  circuits.forEach((circuit, index) => {
    // Safe destructuring with null coalescing
    const cableSize = circuit.cableSize ?? 2.5;
    const cpcSize = circuit.cpcSize ?? 1.5;
    const calculations = circuit.calculations ?? {};
    const protectionDevice = circuit.protectionDevice ?? {};
    
    if (!calculations) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'calculation',
        message: 'Missing calculations object',
        suggestedFix: 'Add complete calculations with Ib, In, Iz, voltageDrop, zs'
      });
      return;
    }

    // Check Ib ≤ In ≤ Iz relationship
    const { Ib, In, Iz } = calculations;
    if (Ib && In && Iz) {
      if (Ib > In) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'calculation',
          message: `Design current (${Ib}A) exceeds device rating (${In}A)`,
          regulation: 'Reg 433.1.1',
          suggestedFix: `Increase device rating to at least ${Math.ceil(Ib)}A`
        });
      }

      // BS 7671 Reg 433.1.204 Exception: Ring Final Circuits
      // Allows 32A protection with 2.5mm² cable (Iz=27A) for domestic ring finals
      const isRingFinal = circuit.loadType?.toLowerCase().includes('ring') || 
                          circuit.loadType?.toLowerCase().includes('socket');
      const isRingException = isRingFinal && In === 32 && cableSize === 2.5 && Iz >= 20;

      if (In > Iz && !isRingException) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'calculation',
          message: `Device rating (${In}A) exceeds cable capacity (${Iz}A)`,
          regulation: 'Reg 433.1.1',
          suggestedFix: `Increase cable size to at least ${(cableSize ?? 2.5) + 1}mm² or reduce device rating`
        });
      }

      // Check safety margin
      if (Iz < In * 1.1) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'calculation',
          message: `Low safety margin: Iz (${Iz}A) is less than 110% of In (${In}A)`,
          suggestedFix: 'Consider increasing cable size for better safety margin'
        });
      }
    }

    // Validate voltage drop
    const { voltageDrop } = calculations;
    if (voltageDrop) {
      const loadType = circuit.loadType?.toLowerCase() || '';
      const isLighting = loadType.includes('light');
      const maxPercent = isLighting ? 3 : 5;
      
      if (voltageDrop.percent > maxPercent) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'calculation',
          message: `Voltage drop ${voltageDrop.percent.toFixed(2)}% exceeds ${maxPercent}% limit`,
          regulation: 'Reg 525.1',
          suggestedFix: `Increase cable size or reduce cable length`
        });
      }

      if (voltageDrop.percent > maxPercent * 0.8) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'calculation',
          message: `Voltage drop ${voltageDrop.percent.toFixed(2)}% approaching ${maxPercent}% limit`,
          suggestedFix: 'Consider larger cable size for future-proofing'
        });
      }
    }

    // Validate Zs
    if (calculations.zs && calculations.maxZs) {
      if (calculations.zs > calculations.maxZs) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'calculation',
          message: `Zs (${calculations.zs.toFixed(3)}Ω) exceeds max permitted (${calculations.maxZs.toFixed(3)}Ω)`,
          regulation: 'Reg 411.3.2',
          suggestedFix: 'Increase CPC size or use lower impedance cable'
        });
      }
    }

    // Validate CPC size relative to cable size
    if (cableSize && cpcSize) {
      if (cpcSize < cableSize / 2 && cableSize > 16) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'calculation',
          message: `CPC (${cpcSize}mm²) may be undersized for cable (${cableSize}mm²)`,
          regulation: 'Reg 543.1.1',
          suggestedFix: 'Verify CPC meets adiabatic equation requirements'
        });
      }
    }
  });

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    info
  };
}

/**
 * Layer 2: BS7671 Compliance Validation
 * Check regulation-specific requirements
 */
export function validateCompliance(circuits: any[], incomingSupply: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const info: ValidationError[] = [];

  circuits.forEach((circuit, index) => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    const location = circuit.specialLocation?.toLowerCase() || '';
    const circuitName = circuit.name?.toLowerCase() || '';

    // PHASE 2: Check if this is genuinely a fixed industrial circuit
    const isFixedIndustrial = 
      (location.includes('industrial') || location.includes('workshop')) &&
      (circuitName.includes('fixed') || 
       circuitName.includes('machine') || 
       circuitName.includes('three phase supply') ||
       circuit.loadPower > 10000); // >10kW suggests fixed machinery

    // RCD Protection Requirements (with industrial exception)
    const requiresRCD = 
      (loadType.includes('socket') && !isFixedIndustrial) ||  // Exception for fixed industrial
      loadType.includes('outdoor') ||
      location.includes('bathroom') ||
      location.includes('outdoor') ||
      incomingSupply.earthingSystem === 'TT';

    if (requiresRCD && !circuit.rcdProtected) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'compliance',
        message: `RCD protection required but not specified`,
        regulation: 'Reg 411.3.3',
        suggestedFix: 'Add 30mA RCD or RCBO protection (Type A minimum)'
      });
    } else if (loadType.includes('socket') && isFixedIndustrial && !circuit.rcdProtected) {
      // Add warning instead of error for fixed industrial circuits
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'compliance',
        message: `Fixed industrial socket circuit without RCD - verify equipment is not portable`,
        regulation: 'Reg 411.3.3',
        suggestedFix: 'Consider RCD protection even for fixed machinery as best practice'
      });
    }

    // AFDD Requirements (Amendment 3)
    const requiresAFDD = 
      loadType.includes('socket') &&
      !loadType.includes('commercial') &&
      !circuit.afddRequired;

    if (requiresAFDD) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'compliance',
        message: 'AFDD recommended for socket circuits in new installations',
        regulation: 'Reg 421.1.7 (Amendment 3)',
        suggestedFix: 'Consider AFDD protection for arc fault protection'
      });
    }

    // Bathroom Specific Requirements
    if (location.includes('bathroom')) {
      if (!circuit.rcdProtected) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'compliance',
          message: 'Bathroom circuits must have 30mA RCD protection',
          regulation: 'Section 701',
          suggestedFix: 'Add 30mA RCD protection'
        });
      }

      info.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'info',
        category: 'compliance',
        message: 'Supplementary bonding may be required in bathroom',
        regulation: 'Section 701.415.2'
      });
    }

    // EV Charger Specific Requirements
    if (loadType.includes('ev') || loadType.includes('charger')) {
      if (!circuit.rcdProtected) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'compliance',
          message: 'EV charger requires RCD protection (Type A or Type B)',
          regulation: 'Section 722',
          suggestedFix: 'Add Type A RCD (6mA DC) or Type B RCD'
        });
      }

      if ((circuit.cableSize ?? 0) < 6 && (circuit.cableSize ?? 0) > 0) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'compliance',
          message: `Cable size ${circuit.cableSize ?? 0}mm² may be undersized for EV charger`,
          suggestedFix: 'Consider 10mm² minimum for future-proofing'
        });
      }
    }

    // Ring final cable size validation (PHASE 2)
    const isExplicitlyRadial = circuit.name?.toLowerCase().includes('radial') ||
                                circuit.loadType?.toLowerCase().includes('radial') ||
                                circuit.circuitType?.toLowerCase().includes('radial');
    
    const isRingCircuit = (circuit.circuitType?.toLowerCase().includes('ring') || 
                           circuit.loadType?.toLowerCase().includes('ring') ||
                           (loadType.includes('socket') && circuit.protectionDevice?.rating === 32)) && 
                          !isExplicitlyRadial;
    
    if (isRingCircuit && (circuit.cableSize ?? 2.5) > 2.5) {
      const loadPower = circuit.loadPower || 0;
      const suggestedRings = Math.ceil(loadPower / 7360);
      
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'compliance',
        message: `Ring final uses ${circuit.cableSize ?? 2.5}mm² cable - must be 2.5mm² per BS 7671 Appendix 15`,
        regulation: 'BS 7671 Appendix 15 / Reg 433.1.204',
        suggestedFix: `FIX OPTIONS:
  1. If domestic/office sockets (≤8 outlets): Change to 2.5mm²/1.5mm² T&E with 32A MCB
  2. If outdoor sockets: Change to 2.5mm² 3-core SWA with 32A MCB
  3. If load >${(7.36).toFixed(2)}kW: Split into ${suggestedRings} separate 2.5mm² ring circuits
  4. If long outdoor run (>50m): Change circuit type to RADIAL and use 4mm² 3-core SWA with 32A MCB`
      });
    }

    // High current circuits (>32A)
    if (circuit.protectionDevice?.rating > 32 && loadType.includes('socket')) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'compliance',
        message: 'Socket circuits should not exceed 32A',
        regulation: 'Reg 433.1.204',
        suggestedFix: 'Split into multiple 32A circuits or use radial configuration'
      });
    }

    // Outdoor circuits
    if (location.includes('outdoor')) {
      if (!circuit.cableType?.includes('SWA') && !circuit.cableType?.includes('armoured')) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'compliance',
          message: 'Outdoor circuits should use SWA (armoured) cable',
          suggestedFix: 'Specify SWA cable for mechanical protection'
        });
      }
    }

    // Industrial fixed equipment cable size check (with null safety)
    if (isFixedIndustrial && (circuit.cableSize ?? 0) > 10) {
      info.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'info',
        category: 'compliance',
        message: `Fixed industrial equipment using ${circuit.cableSize ?? 0}mm² cable`,
        regulation: 'Reg 433.1'
      });
    }
    }
  });

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    info
  };
}

/**
 * Layer 3: Safety Validation
 * Additional safety checks
 */
export function validateSafety(circuits: any[], projectInfo: any): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const info: ValidationError[] = [];

  const installationType = projectInfo.installationType || 'domestic';

  circuits.forEach((circuit, index) => {
    // Installation method detail check (PHASE 4)
    if (!circuit.installationMethod?.includes('Method')) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'safety',
        message: 'Installation method missing reference method (A1, A2, B, C, etc.)',
        regulation: 'Appendix 4',
        suggestedFix: 'Specify installation reference method from BS 7671 Appendix 4'
      });
    }

    // Check for missing justifications
    if (!circuit.justifications || Object.keys(circuit.justifications).length === 0) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'safety',
        message: 'Missing design justifications',
        suggestedFix: 'Add justifications for cable size, protection, and RCD requirements'
      });
    }

    // Justification quality check (PHASE 5)
    if (circuit.justifications) {
      const cableSizeJust = circuit.justifications.cableSize || '';
      if (cableSizeJust.length < 50 || !cableSizeJust.includes('Reg')) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'safety',
          message: 'Cable size justification lacks detail or regulation references',
          suggestedFix: 'Include Iz calculation, derating factors, and BS 7671 regulation references'
        });
      }
    }

    // Check for unusually high power on single circuit
    if (circuit.loadPower > 10000 && circuit.phases === 1) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'safety',
        message: `High power load (${(circuit.loadPower/1000).toFixed(1)}kW) on single phase`,
        suggestedFix: 'Consider three-phase supply for loads >10kW'
      });
    }

    // Check for very long cable runs
    if (circuit.cableLength > 100) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'safety',
        message: `Very long cable run (${circuit.cableLength}m)`,
        suggestedFix: 'Verify voltage drop compliance and consider sub-distribution board'
      });
    }

    // Industrial-specific safety checks
    if (installationType === 'industrial') {
      const kaRating = circuit.protectionDevice?.kaRating || 6;
      if (kaRating < 10) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'safety',
          message: `Low breaking capacity (${kaRating}kA) for industrial installation`,
          regulation: 'Reg 536.1',
          suggestedFix: 'Consider 10kA or 16kA rated devices for industrial fault currents'
        });
      }
    }
  });

  return {
    passed: true, // Safety validation doesn't block, only warns
    errors,
    warnings,
    info
  };
}

/**
 * Run all validation layers in sequence
 */
export function validateDesign(circuits: any[], incomingSupply: any, projectInfo: any): ValidationResult {
  const calcResult = validateCalculations(circuits);
  const complianceResult = validateCompliance(circuits, incomingSupply);
  const safetyResult = validateSafety(circuits, projectInfo);

  return {
    passed: calcResult.passed && complianceResult.passed,
    errors: [...calcResult.errors, ...complianceResult.errors, ...safetyResult.errors],
    warnings: [...calcResult.warnings, ...complianceResult.warnings, ...safetyResult.warnings],
    info: [...calcResult.info, ...complianceResult.info, ...safetyResult.info]
  };
}

/**
 * Calculate confidence scores for design quality
 */
export interface ConfidenceScore {
  overall: number; // 0-100
  factors: {
    hasCalculations: number;
    hasJustifications: number;
    regulationsCited: number;
    completeness: number;
    complianceScore: number;
  };
}

export function calculateCircuitConfidence(circuit: any): ConfidenceScore {
  const factors = {
    hasCalculations: circuit.calculations ? 25 : 0,
    hasJustifications: circuit.justifications && Object.keys(circuit.justifications).length > 0 ? 20 : 0,
    regulationsCited: countRegulationCitations(circuit) * 10, // Up to 30 points
    completeness: calculateCompleteness(circuit) * 15, // Up to 15 points
    complianceScore: circuit.rcdProtected ? 10 : 5 // Basic compliance
  };

  const overall = Math.min(100, 
    factors.hasCalculations + 
    factors.hasJustifications + 
    factors.regulationsCited + 
    factors.completeness + 
    factors.complianceScore
  );

  return { overall, factors };
}

function countRegulationCitations(circuit: any): number {
  const justText = JSON.stringify(circuit.justifications || {});
  const regMatches = justText.match(/\d{3,4}\.\d+\.\d+/g) || [];
  return Math.min(3, regMatches.length); // Cap at 3 for scoring
}

function calculateCompleteness(circuit: any): number {
  const requiredFields = [
    'name', 'circuitNumber', 'loadType', 'loadPower',
    'cableSize', 'cpcSize', 'cableLength', 'protectionDevice',
    'calculations', 'justifications'
  ];
  
  const presentFields = requiredFields.filter(field => circuit[field] !== undefined && circuit[field] !== null);
  return presentFields.length / requiredFields.length;
}

export function calculateOverallConfidence(circuits: any[]): number {
  if (!circuits || circuits.length === 0) return 0;
  
  const scores = circuits.map(c => calculateCircuitConfidence(c).overall);
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / circuits.length);
}
