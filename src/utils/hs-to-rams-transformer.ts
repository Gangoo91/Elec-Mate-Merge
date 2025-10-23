import { RAMSData, RAMSRisk } from '@/types/rams';
import { v4 as uuidv4 } from 'uuid';

export interface HealthSafetyHazard {
  hazard: string;
  likelihood: number;
  severity: number;
  riskRating: number;
  controls: string[];
  residualRisk: number;
}

export interface HealthSafetyAgentOutput {
  riskAssessment: {
    hazards: HealthSafetyHazard[];
  };
  requiredPPE: string[];
  methodStatement: string[];
  emergencyProcedures: string[];
  acopCitations: string[];
  workActivities: string[];
}

export interface EnhancedHealthSafetyAgentOutput extends HealthSafetyAgentOutput {
  riskAssessmentDetailed?: {
    hazards: Array<{
      hazard: string;
      linkedToStep: number;
      likelihood: number;
      likelihoodReason?: string;
      severity: number;
      severityReason?: string;
      riskScore: number;
      riskLevel: string;
      regulation?: string;
    }>;
    controls: Array<{
      hazard: string;
      linkedToStep: number;
      controlMeasure: string;
      residualLikelihood?: number;
      residualSeverity?: number;
      residualRisk: number;
      residualRiskLevel: string;
      regulation?: string;
      practicalImplementation?: string;
    }>;
    riskMatrix?: any;
  };
  ppeDetails?: Array<{
    itemNumber: number;
    ppeType: string;
    standard: string;
    mandatory: boolean;
    purpose: string;
  }>;
  siteLogistics?: {
    vehicleAccess?: string;
    parking?: string;
    materialStorage?: string;
    wasteManagement?: string;
    welfareFacilities?: string;
    siteRestrictions?: string;
  };
  competencyMatrix?: {
    competencyRequirements?: string;
    trainingRequired?: string;
    supervisionLevel?: string;
    additionalCertifications?: string;
  };
  conditionalProcedures?: any;
  compliance?: {
    regulations: string[];
    warnings?: string[];
  };
  ragCitations?: Array<{
    regulation: string;
    content: string;
  }>;
}

/**
 * Transforms Health & Safety agent output into RAMS format
 * Converts 5x5 risk matrix assessments into standardised RAMS document
 */
export function transformHealthSafetyOutputToRAMS(
  hsOutput: HealthSafetyAgentOutput,
  projectDetails: {
    projectName: string;
    location: string;
    assessor: string;
  }
): RAMSData & {
  emergencyProcedures: string[];
  requiredPPE: string[];
  acopCitations: string[];
  methodStatementSteps: string[];
} {
  const risks: RAMSRisk[] = hsOutput.riskAssessment.hazards.map(hazard => ({
    id: uuidv4(),
    hazard: hazard.hazard,
    risk: generateRiskDescription(hazard.hazard, hazard.severity),
    likelihood: hazard.likelihood,
    severity: hazard.severity,
    riskRating: hazard.riskRating,
    controls: hazard.controls.join('; '),
    residualRisk: hazard.residualRisk,
    responsible: projectDetails.assessor,
    furtherAction: hazard.residualRisk > 6 ? 'Additional controls required' : undefined,
  }));

  return {
    projectName: projectDetails.projectName,
    location: projectDetails.location,
    date: new Date().toISOString().split('T')[0],
    assessor: projectDetails.assessor,
    activities: hsOutput.workActivities,
    risks,
    emergencyProcedures: hsOutput.emergencyProcedures,
    requiredPPE: hsOutput.requiredPPE,
    acopCitations: hsOutput.acopCitations,
    methodStatementSteps: hsOutput.methodStatement,
  };
}

function generateRiskDescription(hazard: string, severity: number): string {
  const severityDescriptions: Record<number, string> = {
    1: 'Minor injury requiring first aid',
    2: 'Injury requiring medical treatment',
    3: 'Serious injury requiring hospital treatment',
    4: 'Major injury with long-term effects',
    5: 'Fatal or life-changing injury',
  };
  
  const baseRisk = hazard.toLowerCase().includes('electric') 
    ? 'Electric shock or burn'
    : hazard.toLowerCase().includes('fall')
    ? 'Fall from height'
    : hazard.toLowerCase().includes('manual')
    ? 'Musculoskeletal injury'
    : 'Personal injury';
  
  return `${baseRisk} - ${severityDescriptions[severity] || 'Injury'}`;
}

/**
 * Maps BS 7671 and HSE hazards to enhanced hazards database
 */
export function mapToEnhancedHazards(
  hsOutput: HealthSafetyAgentOutput,
  taskIds: string[]
): Array<{
  hazard_name: string;
  category: string;
  custom_controls: string[];
  linked_tasks: string[];
  risk_level: 'low' | 'medium' | 'high';
}> {
  return hsOutput.riskAssessment.hazards.map(hazard => ({
    hazard_name: hazard.hazard,
    category: categorizeHazard(hazard.hazard),
    custom_controls: hazard.controls,
    linked_tasks: taskIds,
    risk_level: getRiskLevel(hazard.riskRating),
  }));
}

function categorizeHazard(hazard: string): string {
  const hazardLower = hazard.toLowerCase();
  
  if (hazardLower.includes('electric') || hazardLower.includes('voltage')) {
    return 'Electrical';
  }
  if (hazardLower.includes('height') || hazardLower.includes('fall')) {
    return 'Work at Height';
  }
  if (hazardLower.includes('manual') || hazardLower.includes('lifting')) {
    return 'Manual Handling';
  }
  if (hazardLower.includes('confined')) {
    return 'Confined Spaces';
  }
  if (hazardLower.includes('dust') || hazardLower.includes('fume')) {
    return 'Dust & Fumes';
  }
  
  return 'General';
}

function getRiskLevel(riskRating: number): 'low' | 'medium' | 'high' {
  if (riskRating >= 15) return 'high';
  if (riskRating >= 8) return 'medium';
  return 'low';
}

/**
 * Transform enhanced H&S output to Method Statement format
 * Captures full structured data including RAG citations and detailed risk assessments
 */
export function transformHealthSafetyOutputToMethodStatement(
  hsOutput: EnhancedHealthSafetyAgentOutput,
  projectDetails?: {
    projectName?: string;
    location?: string;
    assessor?: string;
  }
): Partial<import('@/types/method-statement').MethodStatementData> {
  return {
    // Full risk assessment with all details
    riskAssessment: hsOutput.riskAssessmentDetailed ? {
      hazards: hsOutput.riskAssessmentDetailed.hazards,
      controls: hsOutput.riskAssessmentDetailed.controls,
      riskMatrix: hsOutput.riskAssessmentDetailed.riskMatrix,
    } : undefined,
    
    // Enhanced PPE with standards
    ppeDetails: hsOutput.ppeDetails,
    
    // Site logistics
    siteLogistics: hsOutput.siteLogistics,
    
    // Competency requirements
    competencyMatrix: hsOutput.competencyMatrix,
    
    // Conditional procedures
    conditionalProcedures: hsOutput.conditionalProcedures,
    
    // RAG citations from H&S agent
    ragCitations: hsOutput.ragCitations?.map(citation => ({
      source: 'health-safety' as const,
      regulation: citation.regulation,
      content: citation.content,
    })),
    
    // Compliance
    complianceRegulations: hsOutput.compliance?.regulations,
    complianceWarnings: hsOutput.compliance?.warnings,
  };
}
