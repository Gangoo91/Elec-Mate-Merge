export interface PDFValidationResult {
  isValid: boolean;
  completionScore: number;
  missingFields: string[];
  warnings: string[];
  criticalIssues: string[];
  recommendations: string[];
}

export interface PDFQualityMetrics {
  dataCompleteness: number;
  regulatoryCompliance: number;
  professionalPresentation: number;
  overallScore: number;
}

export const validateEICRData = (formData: any, inspectionItems: any[] = [], testResults: any[] = []): PDFValidationResult => {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  const criticalIssues: string[] = [];
  const recommendations: string[] = [];

  // Essential client information validation
  if (!formData.clientName || formData.clientName.trim() === '') {
    criticalIssues.push('Client name is required for certificate validity');
  }
  
  if (!formData.installationAddress || formData.installationAddress.trim() === '') {
    criticalIssues.push('Installation address is mandatory for legal compliance');
  }

  if (!formData.inspectionDate) {
    criticalIssues.push('Inspection date must be specified');
  }

  // Inspector credentials validation
  if (!formData.inspectorName || formData.inspectorName.trim() === '') {
    criticalIssues.push('Inspector name is required for certification');
  }

  if (!formData.inspectorQualifications) {
    warnings.push('Inspector qualifications should be specified for professional credibility');
  }

  // Installation details validation
  if (!formData.description) {
    missingFields.push('Property type/description');
  }

  if (!formData.estimatedAge) {
    warnings.push('Estimated age of installation helps with risk assessment');
  }

  // Supply characteristics validation
  if (!formData.earthingArrangement) {
    criticalIssues.push('Earthing arrangement must be identified for safety assessment');
  }

  if (!formData.supplyVoltage && !formData.nominalVoltage) {
    missingFields.push('Supply voltage specification');
  }

  // Inspection checklist validation
  if (!inspectionItems || inspectionItems.length === 0) {
    criticalIssues.push('No inspection items recorded - inspection checklist is mandatory');
  } else {
    const completedItems = inspectionItems.filter(item => 
      item.outcome && item.outcome !== '' && item.inspected
    );
    const completionRate = (completedItems.length / inspectionItems.length) * 100;
    
    if (completionRate < 80) {
      warnings.push(`Only ${completionRate.toFixed(1)}% of inspection items completed - consider completing more items`);
    }

    const criticalDefects = inspectionItems.filter(item => 
      ['C1', 'C2'].includes(item.outcome)
    );
    
    if (criticalDefects.length > 0) {
      warnings.push(`${criticalDefects.length} critical defect(s) identified - ensure appropriate remedial action is recommended`);
    }
  }

  // Test results validation
  if (!testResults || testResults.length === 0) {
    warnings.push('No test results recorded - testing schedule enhances certificate completeness');
  } else {
    const incompleteTests = testResults.filter(test => 
      !test.zs || test.zs === 'N/A' || !test.r1r2 || test.r1r2 === 'N/A'
    );
    
    if (incompleteTests.length > 0) {
      warnings.push(`${incompleteTests.length} circuit(s) have incomplete test results`);
    }

    const unsatisfactoryTests = testResults.filter(test => 
      test.overallResult === 'unsatisfactory' || test.satisfactory === false
    );
    
    if (unsatisfactoryTests.length > 0) {
      warnings.push(`${unsatisfactoryTests.length} circuit(s) failed testing - ensure defects are documented`);
    }
  }

  // Digital signature validation
  if (!formData.inspectorSignature) {
    recommendations.push('Digital signature adds professional authenticity to the certificate');
  }

  // Company branding validation
  if (!formData.brandingCompanyName && !formData.companyName) {
    recommendations.push('Company branding enhances professional presentation');
  }

  // Certificate reference validation
  if (!formData.certificateReference) {
    recommendations.push('Unique certificate reference improves traceability');
  }

  // Overall assessment validation
  if (!formData.overallAssessment) {
    criticalIssues.push('Overall assessment conclusion is required for certificate completion');
  }

  // Calculate completion score
  const totalRequiredFields = 15; // Based on BS 7671 requirements
  const completedFields = totalRequiredFields - criticalIssues.length - (missingFields.length * 0.7) - (warnings.length * 0.3);
  const completionScore = Math.max(0, Math.min(100, (completedFields / totalRequiredFields) * 100));

  const isValid = criticalIssues.length === 0 && completionScore >= 70;

  return {
    isValid,
    completionScore: Math.round(completionScore),
    missingFields,
    warnings,
    criticalIssues,
    recommendations
  };
};

export const calculateQualityMetrics = (formData: any, inspectionItems: any[] = [], testResults: any[] = []): PDFQualityMetrics => {
  // Data completeness (40% of overall score)
  let dataFields = 0;
  let completedFields = 0;
  
  const requiredFields = [
    'clientName', 'installationAddress', 'inspectionDate', 'inspectorName',
    'description', 'earthingArrangement', 'supplyVoltage', 'overallAssessment'
  ];
  
  requiredFields.forEach(field => {
    dataFields++;
    if (formData[field] && formData[field].toString().trim() !== '') {
      completedFields++;
    }
  });

  const dataCompleteness = (completedFields / dataFields) * 100;

  // Regulatory compliance (35% of overall score)
  let complianceScore = 100;
  
  if (!inspectionItems || inspectionItems.length < 50) {
    complianceScore -= 30; // Insufficient inspection coverage
  }
  
  if (!testResults || testResults.length === 0) {
    complianceScore -= 20; // Missing test results
  }

  if (!formData.inspectorQualifications) {
    complianceScore -= 15; // Missing credentials
  }

  if (!formData.nextInspectionDate && !formData.recommendedNextInspection) {
    complianceScore -= 10; // Missing future inspection guidance
  }

  // Professional presentation (25% of overall score)
  let presentationScore = 60; // Base score
  
  if (formData.inspectorSignature) presentationScore += 15;
  if (formData.companyLogo) presentationScore += 10;
  if (formData.brandingCompanyName) presentationScore += 10;
  if (formData.certificateReference) presentationScore += 5;

  const regulatoryCompliance = Math.max(0, complianceScore);
  const professionalPresentation = Math.min(100, presentationScore);

  // Calculate weighted overall score
  const overallScore = (
    dataCompleteness * 0.4 +
    regulatoryCompliance * 0.35 +
    professionalPresentation * 0.25
  );

  return {
    dataCompleteness: Math.round(dataCompleteness),
    regulatoryCompliance: Math.round(regulatoryCompliance),
    professionalPresentation: Math.round(professionalPresentation),
    overallScore: Math.round(overallScore)
  };
};

export const generateCompletionReport = (validation: PDFValidationResult, metrics: PDFQualityMetrics): string => {
  let report = `EICR Certificate Quality Assessment\n`;
  report += `=====================================\n\n`;
  
  report += `Overall Score: ${metrics.overallScore}% `;
  if (metrics.overallScore >= 90) report += `(Excellent)\n`;
  else if (metrics.overallScore >= 80) report += `(Good)\n`;
  else if (metrics.overallScore >= 70) report += `(Acceptable)\n`;
  else report += `(Needs Improvement)\n\n`;
  
  report += `Completion Rate: ${validation.completionScore}%\n`;
  report += `Data Completeness: ${metrics.dataCompleteness}%\n`;
  report += `Regulatory Compliance: ${metrics.regulatoryCompliance}%\n`;
  report += `Professional Presentation: ${metrics.professionalPresentation}%\n\n`;
  
  if (validation.criticalIssues.length > 0) {
    report += `Critical Issues (Must Fix):\n`;
    validation.criticalIssues.forEach((issue, index) => {
      report += `  ${index + 1}. ${issue}\n`;
    });
    report += `\n`;
  }
  
  if (validation.warnings.length > 0) {
    report += `Warnings (Recommended to Fix):\n`;
    validation.warnings.forEach((warning, index) => {
      report += `  ${index + 1}. ${warning}\n`;
    });
    report += `\n`;
  }
  
  if (validation.recommendations.length > 0) {
    report += `Recommendations for Enhancement:\n`;
    validation.recommendations.forEach((rec, index) => {
      report += `  ${index + 1}. ${rec}\n`;
    });
  }
  
  return report;
};