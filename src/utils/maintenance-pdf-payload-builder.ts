// Maintenance PDF Payload Builder
// Transforms AI output to PDF Monkey template structure

import { MaintenanceMethodData, MaintenanceEquipmentDetails } from '@/types/maintenance-method';

export interface MaintenancePdfPayload {
  reportDate: string;
  reportTitle: string;
  projectName: string;
  equipmentDetails: {
    equipmentType: string;
    location: string;
    installationType: string;
    estimatedAge: string | null;
  };
  executiveSummary: {
    equipmentType: string;
    maintenanceType: string;
    recommendedFrequency: string;
    overallCondition: string;
    estimatedAge: string | null;
    criticalFindings: string[];
  };
  maintenanceGuide: string;
  summary: {
    totalSteps: number;
    estimatedDuration: string;
    overallRiskLevel: string;
    toolsRequired: string[];
    materialsRequired: string[];
    requiredQualifications: string[];
    criticalSafetyNotes: string[];
  };
  steps: Array<{
    stepNumber: number;
    title: string;
    content: string;
    contentItems: string[];
    estimatedDuration: string;
    safety: string[];
    toolsRequired: string[];
    materialsNeeded: string[];
    qualifications: string[];
    inspectionCheckpoints: string[];
    linkedHazards: string[];
    bsReferences: string[];
  }>;
  recommendations: string[];
  metadata: {
    generatedAt: string;
    version: string;
  };
}

/**
 * Extract just the time value from a verbose duration string
 * e.g., "8 hours 10 minutes (including setup...)" → "8 hours 10 minutes"
 */
function extractDurationValue(duration: string | undefined): string {
  if (!duration) return 'Not specified';
  
  // Match time patterns like "8 hours 10 minutes", "2-3 hours", "45 mins"
  const timeMatch = duration.match(/^(\d+\.?\d*\s*(?:to|-|\s)?\s*\d*\.?\d*\s*(?:hours?|hrs?|minutes?|mins?|days?|weeks?)(?:\s*(?:and|,)?\s*\d+\.?\d*\s*(?:hours?|hrs?|minutes?|mins?))?)/i);
  
  if (timeMatch) {
    return timeMatch[1].trim();
  }
  
  // If no match, return first part before parenthesis or semicolon
  const shortMatch = duration.match(/^([^(;]+)/);
  return shortMatch ? shortMatch[1].trim() : duration;
}

/**
 * Parse step content into an array of items
 * Extracts numbered items (1., 2., 1), 2)) and converts to array
 */
function parseContentToArray(content: string | undefined): string[] {
  if (!content) return [];
  
  // Check for numbered patterns like "1.", "2." or "1)", "2)"
  const numberedPattern = /(?:^|\n)\s*\d+[.)]\s*/;
  
  if (!numberedPattern.test(content)) {
    const trimmed = content.trim();
    return trimmed ? [trimmed] : [];
  }
  
  // Split by numbered patterns
  const items = content.split(/(?:^|\n)\s*\d+[.)]\s*/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  return items;
}

/**
 * Extract condition status from verbose condition descriptions
 * Returns "Good", "Monitor", "Immediate Action", or the original if short enough
 */
function extractConditionStatus(condition: string | undefined): string {
  if (!condition) return 'Not assessed';
  
  const conditionLower = condition.toLowerCase();
  
  // Check for known status keywords
  if (conditionLower.includes('immediate action')) return 'Immediate Action';
  if (conditionLower.includes('critical')) return 'Critical';
  if (conditionLower.includes('poor')) return 'Poor';
  if (conditionLower.includes('monitor')) return 'Monitor';
  if (conditionLower.includes('satisfactory')) return 'Satisfactory';
  if (conditionLower.includes('good')) return 'Good';
  if (conditionLower.includes('excellent')) return 'Excellent';
  
  // If condition is already short, return as-is
  if (condition.length <= 30) return condition;
  
  // Default fallback
  return 'Requires Assessment';
}

/**
 * Build properly structured payload for PDF Monkey template
 */
export function buildMaintenancePdfPayload(
  methodData: MaintenanceMethodData,
  equipmentDetails: MaintenanceEquipmentDetails
): MaintenancePdfPayload {
  // Transform steps with proper fallbacks
  const transformedSteps = (methodData.steps || []).map(step => ({
    stepNumber: step.stepNumber,
    title: step.title || '',
    content: step.content || '',
    contentItems: parseContentToArray(step.content),
    estimatedDuration: extractDurationValue(step.estimatedDuration),
    safety: normalizeSafety(step.safety),
    toolsRequired: step.toolsRequired || [],
    materialsNeeded: step.materialsNeeded || [],
    qualifications: step.qualifications || [],
    inspectionCheckpoints: step.inspectionCheckpoints || [],
    linkedHazards: step.linkedHazards || [],
    bsReferences: step.bsReferences || []
  }));

  const equipmentType = methodData.executiveSummary?.equipmentType || equipmentDetails.equipmentType || 'Equipment';
  
  // Use location as project name, fallback to equipment type
  const projectName = equipmentDetails.location || equipmentType;

  return {
    reportDate: new Date().toLocaleDateString('en-GB'),
    reportTitle: `Maintenance Instructions - ${equipmentType}`,
    projectName: projectName,
    
    equipmentDetails: {
      equipmentType: equipmentDetails.equipmentType || equipmentType,
      location: equipmentDetails.location || 'Not specified',
      installationType: capitalise(equipmentDetails.installationType) || 'Commercial',
      estimatedAge: methodData.executiveSummary?.estimatedAge || null
    },
    
    executiveSummary: {
      equipmentType: equipmentType,
      maintenanceType: methodData.executiveSummary?.maintenanceType || 'Periodic Inspection',
      recommendedFrequency: methodData.executiveSummary?.recommendedFrequency || 'Annual',
      overallCondition: extractConditionStatus(methodData.executiveSummary?.overallCondition),
      estimatedAge: methodData.executiveSummary?.estimatedAge || null,
      criticalFindings: methodData.executiveSummary?.criticalFindings || []
    },
    
    maintenanceGuide: methodData.maintenanceGuide || '',
    
    summary: {
      totalSteps: methodData.summary?.totalSteps || transformedSteps.length,
      estimatedDuration: extractDurationValue(methodData.summary?.estimatedDuration),
      overallRiskLevel: capitalise(methodData.summary?.overallRiskLevel) || 'Medium',
      toolsRequired: methodData.summary?.toolsRequired || [],
      materialsRequired: methodData.summary?.materialsRequired || [],
      requiredQualifications: methodData.summary?.requiredQualifications || [],
      criticalSafetyNotes: methodData.summary?.criticalSafetyNotes || []
    },
    
    steps: transformedSteps,
    recommendations: methodData.recommendations || [],
    
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '2.0'
    }
  };
}

/**
 * Normalise safety notes (can be string[] or SafetyNote[])
 */
function normalizeSafety(safety: any[] | undefined): string[] {
  if (!safety) return [];
  return safety.map(item => {
    if (typeof item === 'string') return item;
    if (item && typeof item === 'object' && item.note) return item.note;
    return String(item);
  });
}

/**
 * Capitalise first letter
 */
function capitalise(str: string | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
