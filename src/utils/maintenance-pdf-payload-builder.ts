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
    contentSections: {
      what?: string;
      how?: string;
      whatToLookFor?: string[];
      commonFaults?: string;
      acceptanceCriteria?: string;
    };
    estimatedDuration: string;
    riskLevel: string;
    safety: string[];
    toolsRequired: string[];
    materialsNeeded: string[];
    qualifications: string[];
    inspectionCheckpoints: string[];
    linkedHazards: string[];
    bsReferences: string[];
    observations: string[];
    defectCodes: string[];
  }>;
  recommendations: string[];
  metadata: {
    generatedAt: string;
    version: string;
  };
}

/**
 * Sanitise text for PDF export - replace Unicode characters with ASCII equivalents
 * Fixes "NO GLYPH" issues in PDF Monkey
 */
function sanitizeTextForPdf(text: string | undefined): string {
  if (!text) return '';
  
  return text
    // Em dash and en dash → hyphen
    .replace(/[—–]/g, '-')
    // Smart/curly quotes → straight quotes
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    // Bullet points → hyphen
    .replace(/[•·]/g, '-')
    // Ellipsis → three dots
    .replace(/…/g, '...')
    // Degree symbol → word
    .replace(/°/g, ' deg')
    // Non-breaking space → regular space
    .replace(/\u00A0/g, ' ')
    // Mathematical symbols
    .replace(/[×]/g, 'x')
    .replace(/[÷]/g, '/')
    .replace(/[±]/g, '+/-')
    .replace(/[≤]/g, '<=')
    .replace(/[≥]/g, '>=')
    .replace(/[≈]/g, '~')
    // Greek letters commonly used
    .replace(/Ω/g, 'Ohms')
    .replace(/μ/g, 'u')
    // Trademark/copyright
    .replace(/[™®©]/g, '')
    // Fractions
    .replace(/½/g, '1/2')
    .replace(/¼/g, '1/4')
    .replace(/¾/g, '3/4')
    // Remove any remaining non-ASCII
    .replace(/[^\x00-\x7F]/g, '');
}

/**
 * Sanitise an array of strings for PDF export
 */
function sanitizeArrayForPdf(arr: string[] | undefined): string[] {
  if (!arr) return [];
  return arr.map(item => sanitizeTextForPdf(item));
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
    return sanitizeTextForPdf(timeMatch[1].trim());
  }
  
  // If no match, return first part before parenthesis or semicolon
  const shortMatch = duration.match(/^([^(;]+)/);
  return sanitizeTextForPdf(shortMatch ? shortMatch[1].trim() : duration);
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
    const trimmed = sanitizeTextForPdf(content.trim());
    return trimmed ? [trimmed] : [];
  }
  
  // Split by numbered patterns
  const items = content.split(/(?:^|\n)\s*\d+[.)]\s*/)
    .map(item => sanitizeTextForPdf(item.trim()))
    .filter(item => item.length > 0);
  
  return items;
}

interface ContentSections {
  what?: string;
  how?: string;
  whatToLookFor?: string[];
  commonFaults?: string;
  acceptanceCriteria?: string;
}

/**
 * Parse content into structured sections (WHAT, HOW, WHAT TO LOOK FOR, etc.)
 */
function parseContentSections(content: string | undefined): ContentSections {
  if (!content) return {};
  
  const sections: ContentSections = {};
  
  // Extract WHAT section
  const whatMatch = content.match(/WHAT[:.]\s*([\s\S]*?)(?=HOW[:.|\s]|WHAT TO LOOK FOR|Common faults|Acceptance criteria|$)/i);
  if (whatMatch) sections.what = sanitizeTextForPdf(whatMatch[1].trim());
  
  // Extract HOW section
  const howMatch = content.match(/HOW[:.]\s*([\s\S]*?)(?=WHAT[:.|\s]|WHAT TO LOOK FOR|Common faults|Acceptance criteria|$)/i);
  if (howMatch) sections.how = sanitizeTextForPdf(howMatch[1].trim());
  
  // Extract WHAT TO LOOK FOR (numbered items)
  const lookForMatch = content.match(/WHAT TO LOOK FOR[:.]\s*([\s\S]*?)(?=Common faults|Acceptance criteria|$)/i);
  if (lookForMatch) {
    sections.whatToLookFor = parseContentToArray(lookForMatch[1]);
  }
  
  // Extract Common faults
  const faultsMatch = content.match(/Common faults[:.]\s*([\s\S]*?)(?=Acceptance criteria|$)/i);
  if (faultsMatch) sections.commonFaults = sanitizeTextForPdf(faultsMatch[1].trim());
  
  // Extract Acceptance criteria
  const criteriaMatch = content.match(/Acceptance criteria[:.]\s*([\s\S]*?)$/i);
  if (criteriaMatch) sections.acceptanceCriteria = sanitizeTextForPdf(criteriaMatch[1].trim());
  
  return sections;
}

/**
 * Capitalise first letter of a string
 */
function capitalise(str: string | undefined): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
  
  // If condition is already short, return as-is (sanitised)
  if (condition.length <= 30) return sanitizeTextForPdf(condition);
  
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
  // Transform steps with proper fallbacks and sanitisation
  const transformedSteps = (methodData.steps || []).map(step => ({
    stepNumber: step.stepNumber,
    title: sanitizeTextForPdf(step.title),
    content: sanitizeTextForPdf(step.content),
    contentItems: parseContentToArray(step.content),
    contentSections: parseContentSections(step.content),
    estimatedDuration: extractDurationValue(step.estimatedDuration),
    riskLevel: capitalise(step.riskLevel) || 'Medium',
    safety: sanitizeArrayForPdf(normalizeSafety(step.safety)),
    toolsRequired: sanitizeArrayForPdf(step.toolsRequired),
    materialsNeeded: sanitizeArrayForPdf(step.materialsNeeded),
    qualifications: sanitizeArrayForPdf(step.qualifications),
    inspectionCheckpoints: sanitizeArrayForPdf(step.inspectionCheckpoints),
    linkedHazards: sanitizeArrayForPdf(step.linkedHazards),
    bsReferences: sanitizeArrayForPdf(step.bsReferences),
    observations: sanitizeArrayForPdf(step.observations),
    defectCodes: sanitizeArrayForPdf(step.defectCodes)
  }));

  const equipmentType = sanitizeTextForPdf(methodData.executiveSummary?.equipmentType || equipmentDetails.equipmentType || 'Equipment');
  
  // Use location as project name, fallback to equipment type
  const projectName = sanitizeTextForPdf(equipmentDetails.location || equipmentType);

  return {
    reportDate: new Date().toLocaleDateString('en-GB'),
    reportTitle: `Maintenance Instructions - ${equipmentType}`,
    projectName: projectName,
    
    equipmentDetails: {
      equipmentType: sanitizeTextForPdf(equipmentDetails.equipmentType) || equipmentType,
      location: sanitizeTextForPdf(equipmentDetails.location) || 'Not specified',
      installationType: capitalise(equipmentDetails.installationType) || 'Commercial',
      estimatedAge: sanitizeTextForPdf(methodData.executiveSummary?.estimatedAge) || null
    },
    
    executiveSummary: {
      equipmentType: equipmentType,
      maintenanceType: sanitizeTextForPdf(methodData.executiveSummary?.maintenanceType) || 'Periodic Inspection',
      recommendedFrequency: sanitizeTextForPdf(methodData.executiveSummary?.recommendedFrequency) || 'Annual',
      overallCondition: extractConditionStatus(methodData.executiveSummary?.overallCondition),
      estimatedAge: sanitizeTextForPdf(methodData.executiveSummary?.estimatedAge) || null,
      criticalFindings: sanitizeArrayForPdf(methodData.executiveSummary?.criticalFindings)
    },
    
    maintenanceGuide: sanitizeTextForPdf(methodData.maintenanceGuide),
    
    summary: {
      totalSteps: methodData.summary?.totalSteps || transformedSteps.length,
      estimatedDuration: extractDurationValue(methodData.summary?.estimatedDuration),
      overallRiskLevel: capitalise(methodData.summary?.overallRiskLevel) || 'Medium',
      toolsRequired: sanitizeArrayForPdf(methodData.summary?.toolsRequired),
      materialsRequired: sanitizeArrayForPdf(methodData.summary?.materialsRequired),
      requiredQualifications: sanitizeArrayForPdf(methodData.summary?.requiredQualifications),
      criticalSafetyNotes: sanitizeArrayForPdf(methodData.summary?.criticalSafetyNotes)
    },
    
    steps: transformedSteps,
    recommendations: sanitizeArrayForPdf(methodData.recommendations),
    
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
