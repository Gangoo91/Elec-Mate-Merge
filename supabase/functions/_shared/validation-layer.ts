// VALIDATION LAYER: Cross-agent consistency checks for circuit designs
// Ensures all agents provide coherent and safe specifications

export interface ValidationResult {
  isValid: boolean;
  warnings: ValidationWarning[];
  criticalIssues: ValidationIssue[];
  suggestions: string[];
}

export interface ValidationWarning {
  severity: 'low' | 'medium' | 'high';
  message: string;
  affectedAgents: string[];
  recommendation: string;
}

export interface ValidationIssue {
  type: string;
  message: string;
  affectedData: any;
  requiresAttention: boolean;
}

/**
 * Validates consistency across all agent outputs
 */
export function validateAgentOutputs(agentOutputs: any[]): ValidationResult {
  const warnings: ValidationWarning[] = [];
  const criticalIssues: ValidationIssue[] = [];
  const suggestions: string[] = [];

  // Extract structured data from each agent
  const designerData = agentOutputs.find(a => a.agent === 'designer')?.structuredData;
  const costData = agentOutputs.find(a => a.agent === 'cost-engineer')?.structuredData;
  const installerData = agentOutputs.find(a => a.agent === 'installer')?.structuredData;
  const safetyData = agentOutputs.find(a => a.agent === 'health-safety')?.structuredData;

  // VALIDATION 1: Cable size consistency
  if (designerData?.cableSize && costData?.materials) {
    const designCableSize = designerData.cableSize;
    const costCableMaterial = costData.materials.find((m: any) => 
      m.item.toLowerCase().includes('cable') || m.item.toLowerCase().includes('twin')
    );
    
    if (costCableMaterial && !costCableMaterial.item.includes(`${designCableSize}mm`)) {
      warnings.push({
        severity: 'high',
        message: `Cable size mismatch: Designer specified ${designCableSize}mm² but Cost Engineer quoted different cable`,
        affectedAgents: ['designer', 'cost-engineer'],
        recommendation: `Verify cable specification matches ${designCableSize}mm² across all documents`
      });
    }
  }

  // VALIDATION 2: Protection device consistency
  if (designerData?.protectionDevice && costData?.materials) {
    const designProtection = designerData.protectionDevice;
    const costProtection = costData.materials.find((m: any) => 
      m.item.toLowerCase().includes('mcb') || m.item.toLowerCase().includes('rcbo')
    );
    
    if (costProtection && !costProtection.item.includes(designProtection.match(/\d+A/)?.[0] || '')) {
      warnings.push({
        severity: 'high',
        message: `Protection device mismatch between designer (${designProtection}) and costing`,
        affectedAgents: ['designer', 'cost-engineer'],
        recommendation: 'Ensure protection device ratings match across all documents'
      });
    }
  }

  // VALIDATION 3: Unusual design parameters
  if (designerData) {
    // Check for unusually high current
    if (designerData.designCurrent && designerData.designCurrent > 100) {
      warnings.push({
        severity: 'medium',
        message: `High design current detected (${designerData.designCurrent}A) - verify load calculations`,
        affectedAgents: ['designer'],
        recommendation: 'Double-check load diversity and simultaneous demand factors'
      });
    }

    // Check for excessive voltage drop
    if (designerData.voltageDrop?.percentage > 2.5) {
      warnings.push({
        severity: 'high',
        message: `Voltage drop ${designerData.voltageDrop.percentage}% approaching 3% limit`,
        affectedAgents: ['designer'],
        recommendation: 'Consider larger cable size or shorter route to improve voltage drop'
      });
    }

    // Check correction factors
    if (designerData.correctionFactors?.overall < 0.5) {
      warnings.push({
        severity: 'medium',
        message: `Heavy de-rating detected (overall factor ${designerData.correctionFactors.overall})`,
        affectedAgents: ['designer'],
        recommendation: 'Review grouping and ambient temperature - consider alternative routing'
      });
    }

    // Check for very small cable on high load
    if (designerData.cableSize < 2.5 && designerData.designCurrent > 20) {
      criticalIssues.push({
        type: 'undersized_cable',
        message: `${designerData.cableSize}mm² cable may be undersized for ${designerData.designCurrent}A load`,
        affectedData: { cableSize: designerData.cableSize, current: designerData.designCurrent },
        requiresAttention: true
      });
    }
  }

  // VALIDATION 4: Safety consistency
  if (safetyData?.riskAssessment?.hazards && installerData?.installationSteps) {
    const highRisks = safetyData.riskAssessment.hazards.filter((h: any) => h.riskRating >= 15);
    
    if (highRisks.length > 0) {
      suggestions.push(
        `${highRisks.length} high-risk hazard(s) identified - ensure adequate controls are in place before installation`
      );
    }
  }

  // VALIDATION 5: Cost sanity checks
  if (costData?.totalCost) {
    if (costData.totalCost < 50 && designerData?.cableSize >= 6) {
      warnings.push({
        severity: 'medium',
        message: `Cost estimate (£${costData.totalCost}) seems low for ${designerData.cableSize}mm² installation`,
        affectedAgents: ['cost-engineer'],
        recommendation: 'Verify all materials and labour hours are included'
      });
    }

    if (costData.totalCost > 5000 && !costData.materials.some((m: any) => m.item.toLowerCase().includes('board'))) {
      suggestions.push('High-value installation - consider detailed breakdown for client presentation');
    }
  }

  // VALIDATION 6: Installation method checks
  if (installerData?.supportIntervals && designerData?.installationMethod) {
    const method = designerData.installationMethod.toLowerCase();
    if (method.includes('surface') && !installerData.supportIntervals.includes('0.4m')) {
      suggestions.push('Surface wiring requires cable clips at 0.4m intervals for horizontal runs');
    }
  }

  // WAVE 3 FIX - VALIDATION 7: Earth fault loop impedance (Zs) safety check
  if (designerData?.earthFaultLoop?.zs !== undefined && designerData?.protectionDevice) {
    const zs = designerData.earthFaultLoop.zs;
    const mcbMatch = designerData.protectionDevice.match(/(\d+)A/);
    const mcbRating = mcbMatch ? parseInt(mcbMatch[1]) : 0;
    
    if (mcbRating > 0) {
      const maxZs = getMaxZsForMCB(mcbRating, designerData.protectionDevice);
      
      if (zs >= maxZs) {
        criticalIssues.push({
          type: 'zs_too_high',
          message: `Earth fault loop impedance (${zs.toFixed(2)}Ω) exceeds maximum ${maxZs.toFixed(2)}Ω for ${mcbRating}A MCB - circuit will not disconnect safely under fault conditions`,
          affectedData: { zs, maxZs, mcbRating, protectionDevice: designerData.protectionDevice },
          requiresAttention: true
        });
      } else if (zs >= maxZs * 0.8) {
        warnings.push({
          severity: 'high',
          message: `Earth fault loop impedance (${zs.toFixed(2)}Ω) is approaching limit of ${maxZs.toFixed(2)}Ω for ${mcbRating}A MCB`,
          affectedAgents: ['designer'],
          recommendation: 'Consider reducing cable length or improving earthing to provide safety margin'
        });
      }
    }
  }

  // WAVE 3 FIX - VALIDATION 8: RCD requirement check (BS 7671 Reg 411.3.3)
  if (designerData?.circuitType || designerData?.location) {
    const circuitType = (designerData.circuitType || '').toLowerCase();
    const location = (designerData.location || '').toLowerCase();
    const protectionDevice = (designerData.protectionDevice || '').toLowerCase();
    
    const hasRCD = protectionDevice.includes('rcbo') || protectionDevice.includes('rcd');
    
    // Check locations requiring RCD protection
    const requiresRCD = 
      circuitType.includes('socket') && location.includes('outdoor') ||
      location.includes('bathroom') ||
      location.includes('outside') ||
      location.includes('garden') ||
      circuitType.includes('socket') && location.includes('kitchen') ||
      designerData.supplyType === 'TT';
    
    if (requiresRCD && !hasRCD) {
      criticalIssues.push({
        type: 'missing_rcd',
        message: `RCD protection required for ${circuitType} in ${location} (BS 7671 Reg 411.3.3) but ${designerData.protectionDevice} specified`,
        affectedData: { 
          circuitType, 
          location, 
          protectionDevice: designerData.protectionDevice,
          regulation: 'BS 7671 Reg 411.3.3'
        },
        requiresAttention: true
      });
    }
  }

  // WAVE 3 FIX - VALIDATION 9: Diversity factor validation
  if (designerData?.diversityFactor !== undefined) {
    const diversity = designerData.diversityFactor;
    
    if (diversity > 1.0) {
      criticalIssues.push({
        type: 'invalid_diversity',
        message: `Diversity factor ${diversity} is greater than 1.0 - this would increase simultaneous demand above total load, which is physically impossible`,
        affectedData: { diversityFactor: diversity },
        requiresAttention: true
      });
    }
    
    if (diversity < 0.3) {
      warnings.push({
        severity: 'medium',
        message: `Very conservative diversity factor (${diversity}) may result in oversized installation`,
        affectedAgents: ['designer'],
        recommendation: 'Review diversity assumptions - typical values are 0.4-0.7 for domestic installations'
      });
    }
  }

  // WAVE 3 FIX - VALIDATION 10: Circuit breaker rating vs cable current-carrying capacity
  if (designerData?.protectionDevice && designerData?.cableCurrentCapacity) {
    const mcbMatch = designerData.protectionDevice.match(/(\d+)A/);
    const mcbRating = mcbMatch ? parseInt(mcbMatch[1]) : 0;
    const cableCapacity = designerData.cableCurrentCapacity;
    
    if (mcbRating > cableCapacity) {
      criticalIssues.push({
        type: 'mcb_exceeds_cable_capacity',
        message: `${mcbRating}A MCB rating exceeds cable current capacity of ${cableCapacity}A - cable will not be protected from overload`,
        affectedData: { mcbRating, cableCapacity },
        requiresAttention: true
      });
    }
  }

  // WAVE 3 FIX - VALIDATION 11: Minimum cable size for ring final circuits
  if (designerData?.circuitType?.toLowerCase().includes('ring') && designerData?.cableSize) {
    if (designerData.cableSize < 2.5) {
      criticalIssues.push({
        type: 'ring_cable_undersized',
        message: `Ring final circuit requires minimum 2.5mm² cable but ${designerData.cableSize}mm² specified (BS 7671 Reg 433.1.204)`,
        affectedData: { cableSize: designerData.cableSize, circuitType: 'ring final' },
        requiresAttention: true
      });
    }
  }

  return {
    isValid: criticalIssues.length === 0,
    warnings,
    criticalIssues,
    suggestions
  };
}

/**
 * Get maximum earth fault loop impedance for MCB rating (BS 7671 Table 41.3)
 * Values for Type B MCBs at 0.4s disconnection time
 */
function getMaxZsForMCB(rating: number, deviceType: string): number {
  const isTypeC = deviceType.toLowerCase().includes('type c');
  const isTypeB = deviceType.toLowerCase().includes('type b') || !isTypeC;
  
  // BS 7671 Table 41.3 - Maximum Zs values for MCBs
  // Using Cmin = 0.95 per BS 7671:2018+A2:2022
  // Type B values (5 x In for magnetic trip)
  const typeBMaxZs: Record<number, number> = {
    6: 7.28,
    10: 4.37,
    16: 2.73,
    20: 2.19,
    25: 1.75,
    32: 1.37,
    40: 1.09,
    50: 0.87,
    63: 0.69,
    80: 0.55,
    100: 0.44,
    125: 0.35
  };
  
  // Type C values (10 x In for magnetic trip)
  const typeCMaxZs: Record<number, number> = {
    6: 3.64,
    10: 2.19,
    16: 1.37,
    20: 1.09,
    25: 0.87,
    32: 0.68,
    40: 0.55,
    50: 0.44,
    63: 0.35,
    80: 0.27,
    100: 0.22,
    125: 0.17
  };
  
  const maxZsTable = isTypeB ? typeBMaxZs : typeCMaxZs;
  
  // Return exact value if available, otherwise calculate conservatively
  if (maxZsTable[rating]) {
    return maxZsTable[rating];
  }
  
  // Conservative fallback: use next lower rating's value
  const availableRatings = Object.keys(maxZsTable).map(Number).sort((a, b) => a - b);
  const lowerRating = availableRatings.reverse().find(r => r < rating);
  
  return lowerRating ? maxZsTable[lowerRating] : 0.46; // 100A Type B as most conservative
}

/**
 * Format validation results for display to user
 */
export function formatValidationReport(validation: ValidationResult): string {
  if (validation.isValid && validation.warnings.length === 0 && validation.suggestions.length === 0) {
    return '';
  }

  let report = '';

  if (validation.criticalIssues.length > 0) {
    report += '⚠️ **Critical Issues:**\n';
    validation.criticalIssues.forEach(issue => {
      report += `- ${issue.message}\n`;
    });
    report += '\n';
  }

  if (validation.warnings.length > 0) {
    const highWarnings = validation.warnings.filter(w => w.severity === 'high');
    if (highWarnings.length > 0) {
      report += '🔴 **Important Warnings:**\n';
      highWarnings.forEach(w => {
        report += `- ${w.message}\n`;
        report += `  *${w.recommendation}*\n`;
      });
      report += '\n';
    }

    const mediumWarnings = validation.warnings.filter(w => w.severity === 'medium');
    if (mediumWarnings.length > 0) {
      report += '🟡 **Design Notes:**\n';
      mediumWarnings.forEach(w => {
        report += `- ${w.message}\n`;
      });
      report += '\n';
    }
  }

  if (validation.suggestions.length > 0) {
    report += '💡 **Suggestions:**\n';
    validation.suggestions.forEach(s => {
      report += `- ${s}\n`;
    });
  }

  return report;
}
