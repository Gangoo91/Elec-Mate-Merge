/**
 * Simplified Validation Pipeline - Safety-Critical Checks Only
 * Calculations are performed by AI using RAG-retrieved regulations
 * This validation only checks regulatory requirements that cannot be calculated
 */

export interface ValidationError {
  circuitIndex: number;
  circuitName: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'safety' | 'compliance' | 'data';
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
 * Safety-Critical Validation Only
 * Does NOT validate calculations (AI + RAG handle that)
 * Only validates regulatory requirements and data completeness
 */
export function validateDesign(circuits: any[], incomingSupply: any, projectInfo: any = {}): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const info: ValidationError[] = [];

  const installationType = projectInfo.installationType || 'domestic';

  circuits.forEach((circuit, index) => {
    const loadType = circuit.loadType?.toLowerCase() || '';
    const location = circuit.specialLocation?.toLowerCase() || '';
    const circuitName = circuit.name?.toLowerCase() || '';

    // ========================================
    // 1. RCD PROTECTION REQUIREMENTS (Safety-Critical)
    // ========================================
    
    const isFixedIndustrial = 
      (location.includes('industrial') || location.includes('workshop')) &&
      (circuitName.includes('fixed') || 
       circuitName.includes('machine') || 
       circuitName.includes('three phase supply') ||
       circuit.loadPower > 10000);

    const requiresRCD = 
      (loadType.includes('socket') && !isFixedIndustrial) ||
      loadType.includes('outdoor') ||
      location.includes('bathroom') ||
      location.includes('outdoor') ||
      incomingSupply.earthingSystem === 'TT';

    if (requiresRCD && !circuit.rcdProtected) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'safety',
        message: 'RCD protection required but not specified',
        regulation: 'Reg 411.3.3',
        suggestedFix: 'Add 30mA RCD or RCBO protection (Type A minimum)'
      });
    }

    if (loadType.includes('socket') && isFixedIndustrial && !circuit.rcdProtected) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'compliance',
        message: 'Fixed industrial socket circuit without RCD - verify equipment is not portable',
        regulation: 'Reg 411.3.3',
        suggestedFix: 'Consider RCD protection even for fixed machinery as best practice'
      });
    }

    // ========================================
    // 2. SPECIAL LOCATIONS (Regulatory Requirements)
    // ========================================

    // Bathroom circuits
    if (location.includes('bathroom')) {
      if (!circuit.rcdProtected) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'safety',
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

    // Outdoor circuits - cable type requirement
    if (location.includes('outdoor')) {
      if (!circuit.cableType?.includes('SWA') && !circuit.cableType?.includes('armoured')) {
        warnings.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'warning',
          category: 'compliance',
          message: 'Outdoor circuits should use SWA (armoured) cable',
          regulation: 'Reg 522.6',
          suggestedFix: 'Specify SWA cable for mechanical protection'
        });
      }
    }

    // EV Charger RCD requirements
    if (loadType.includes('ev') || loadType.includes('charger')) {
      if (!circuit.rcdProtected) {
        errors.push({
          circuitIndex: index,
          circuitName: circuit.name,
          severity: 'critical',
          category: 'safety',
          message: 'EV charger requires RCD protection (Type A or Type B)',
          regulation: 'Section 722',
          suggestedFix: 'Add Type A RCD (6mA DC) or Type B RCD'
        });
      }
    }

    // ========================================
    // 3. DATA COMPLETENESS (Frontend Compatibility)
    // ========================================

    if (!circuit.cableSize || !circuit.protectionDevice) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'data',
        message: 'Incomplete circuit data - missing cable size or protection device',
        suggestedFix: 'Ensure AI provides complete design including cableSize and protectionDevice'
      });
    }

    if (!circuit.calculations) {
      warnings.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'warning',
        category: 'data',
        message: 'Missing calculations object - design may lack detailed justification',
        suggestedFix: 'Request AI to include Ib, In, Iz, voltage drop, and Zs calculations'
      });
    }

    // ========================================
    // 4. REGULATORY WARNINGS (Informational)
    // ========================================

    // AFDD recommendation (Amendment 3)
    if (loadType.includes('socket') && !loadType.includes('commercial') && !circuit.afddRequired) {
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

    // Ring final cable size (regulatory requirement, not calculable)
    const isExplicitlyRadial = circuitName.includes('radial') ||
                                loadType.includes('radial') ||
                                circuit.circuitType?.toLowerCase().includes('radial');
    
    const isRingCircuit = (circuit.circuitType?.toLowerCase().includes('ring') || 
                           loadType.includes('ring') ||
                           (loadType.includes('socket') && circuit.protectionDevice?.rating === 32)) && 
                          !isExplicitlyRadial;
    
    if (isRingCircuit && (circuit.cableSize ?? 2.5) > 2.5) {
      errors.push({
        circuitIndex: index,
        circuitName: circuit.name,
        severity: 'critical',
        category: 'compliance',
        message: `Ring final uses ${circuit.cableSize}mm² cable - must be 2.5mm² per BS 7671`,
        regulation: 'BS 7671 Appendix 15 / Reg 433.1.204',
        suggestedFix: 'Change to 2.5mm² cable for ring finals or convert to radial circuit'
      });
    }

    // Industrial breaking capacity
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
    passed: errors.length === 0,
    errors,
    warnings,
    info
  };
}

/**
 * Calculate confidence scores for design quality
 * Used for frontend display only, not validation
 */
export interface ConfidenceScore {
  overall: number;
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
    regulationsCited: countRegulationCitations(circuit) * 10,
    completeness: calculateCompleteness(circuit) * 15,
    complianceScore: circuit.rcdProtected ? 10 : 5
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
  return Math.min(3, regMatches.length);
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
