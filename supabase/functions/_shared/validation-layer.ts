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

  return {
    isValid: criticalIssues.length === 0,
    warnings,
    criticalIssues,
    suggestions
  };
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
