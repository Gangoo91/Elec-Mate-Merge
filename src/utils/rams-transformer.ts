import { MethodStatementData, MethodStep } from '@/types/method-statement';
import { v4 as uuidv4 } from 'uuid';

export interface InstallerStepOutput {
  stepNumber: number;
  description: string;
  safetyRequirements: string[];
  toolsRequired: string[];
  materialsNeeded: string[];
  estimatedTime: string;
  criticalPoints: string[];
  hazards?: string[];
}

export interface InstallerAgentOutput {
  steps: InstallerStepOutput[];
  totalDuration: string;
  requiredQualifications: string[];
  specialRequirements: string[];
  overallRiskLevel: 'low' | 'medium' | 'high';
  circuitDetails?: {
    location: string;
    workType: string;
  };
}

export interface EnhancedInstallerAgentOutput extends InstallerAgentOutput {
  scopeOfWork?: {
    description: string;
    keyDeliverables: string[];
    exclusions?: string;
  };
  scheduleDetails?: {
    workingHours?: string;
    teamSize?: string;
    weatherDependency?: string;
    accessRequirements?: string;
  };
  practicalTips?: string[];
  commonMistakes?: string[];
  compliance?: {
    regulations: string[];
  };
  ragCitations?: Array<{
    regulation: string;
    content: string;
    linkedToStep?: number;
  }>;
}

/**
 * Transforms installer agent output into Method Statement format
 * Maps installation procedures to formal method statement steps with safety requirements
 */
export function transformInstallerOutputToMethodStatement(
  installerOutput: InstallerAgentOutput | EnhancedInstallerAgentOutput,
  projectDetails: {
    jobTitle: string;
    location: string;
    contractor: string;
    supervisor: string;
    teamSize: string;
  }
): MethodStatementData {
  const enhancedOutput = installerOutput as EnhancedInstallerAgentOutput;
  
  const methodSteps: MethodStep[] = installerOutput.steps.map((step, index) => ({
    id: uuidv4(),
    stepNumber: step.stepNumber,
    title: extractStepTitle(step.description),
    description: step.description,
    safetyRequirements: step.safetyRequirements || [],
    equipmentNeeded: [...(step.toolsRequired || []), ...(step.materialsNeeded || [])],
    qualifications: (step as any).qualifications || [], // ✅ FIX: Preserve step-level qualifications
    estimatedDuration: step.estimatedTime,
    riskLevel: determineStepRiskLevel(step),
    linkedHazards: (step as any).linkedHazards || step.hazards || [],
    notes: step.criticalPoints?.join('; ') || '',
    assignedPersonnel: (step as any).assignedPersonnel || [], // ✅ NEW: Assigned personnel field
  }));

  // Aggregate tools and materials at document level
  const allToolsSet = new Set<string>();
  const allMaterialsSet = new Set<string>();
  
  installerOutput.steps.forEach(step => {
    step.toolsRequired?.forEach(tool => allToolsSet.add(tool));
    step.materialsNeeded?.forEach(mat => allMaterialsSet.add(mat));
  });

  return {
    jobTitle: projectDetails.jobTitle,
    location: projectDetails.location,
    contractor: projectDetails.contractor,
    supervisor: projectDetails.supervisor,
    workType: installerOutput.circuitDetails?.workType || 'Electrical Installation',
    duration: installerOutput.totalDuration,
    teamSize: projectDetails.teamSize,
    description: `Installation procedure for ${projectDetails.jobTitle}`,
    overallRiskLevel: installerOutput.overallRiskLevel,
    reviewDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    steps: methodSteps,
    createdAt: new Date().toISOString(),
    
    // Document-level aggregated fields
    toolsRequired: Array.from(allToolsSet),
    materialsRequired: Array.from(allMaterialsSet),
    totalEstimatedTime: installerOutput.totalDuration,
    requiredQualifications: installerOutput.requiredQualifications || [],
    
    // Enhanced fields from installer agent
    scopeOfWork: enhancedOutput.scopeOfWork,
    scheduleDetails: enhancedOutput.scheduleDetails,
    practicalTips: enhancedOutput.practicalTips,
    commonMistakes: enhancedOutput.commonMistakes,
    complianceRegulations: enhancedOutput.compliance?.regulations,
    
    // RAG citations from installer
    ragCitations: enhancedOutput.ragCitations?.map(citation => ({
      source: 'installer' as const,
      regulation: citation.regulation,
      content: citation.content,
      linkedToStep: citation.linkedToStep,
    })),
    
    // Agent metadata
    agentMetadata: {
      installerVersion: 'v3',
      generatedAt: new Date().toISOString(),
    },
  };
}

function extractStepTitle(description: string): string {
  // Extract first sentence or first 50 chars as title
  const firstSentence = description.split('.')[0];
  return firstSentence.length > 60 
    ? firstSentence.substring(0, 57) + '...'
    : firstSentence;
}

function determineStepRiskLevel(step: InstallerStepOutput): 'low' | 'medium' | 'high' {
  const highRiskKeywords = ['live', 'energized', 'height', 'confined', 'overhead'];
  const mediumRiskKeywords = ['termination', 'testing', 'cable pulling', 'drilling'];
  
  const desc = step.description.toLowerCase();
  const safety = step.safetyRequirements.join(' ').toLowerCase();
  const combined = desc + ' ' + safety;
  
  if (highRiskKeywords.some(keyword => combined.includes(keyword))) {
    return 'high';
  }
  
  if (mediumRiskKeywords.some(keyword => combined.includes(keyword))) {
    return 'medium';
  }
  
  return 'low';
}
