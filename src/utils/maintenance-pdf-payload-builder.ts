// Maintenance PDF Payload Builder
// Transforms AI output to PDF Monkey template structure

import { MaintenanceMethodData, MaintenanceEquipmentDetails } from '@/types/maintenance-method';

export interface MaintenancePdfPayload {
  reportDate: string;
  reportTitle: string;
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
    estimatedDuration: step.estimatedDuration || 'Not specified',
    safety: normalizeSafety(step.safety),
    toolsRequired: step.toolsRequired || [],
    materialsNeeded: step.materialsNeeded || [],
    qualifications: step.qualifications || [],
    inspectionCheckpoints: step.inspectionCheckpoints || [],
    linkedHazards: step.linkedHazards || [],
    bsReferences: step.bsReferences || []
  }));

  const equipmentType = methodData.executiveSummary?.equipmentType || equipmentDetails.equipmentType || 'Equipment';

  return {
    reportDate: new Date().toLocaleDateString('en-GB'),
    reportTitle: `Maintenance Instructions - ${equipmentType}`,
    
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
      overallCondition: methodData.executiveSummary?.overallCondition || 'Not assessed',
      estimatedAge: methodData.executiveSummary?.estimatedAge || null,
      criticalFindings: methodData.executiveSummary?.criticalFindings || []
    },
    
    maintenanceGuide: methodData.maintenanceGuide || '',
    
    summary: {
      totalSteps: methodData.summary?.totalSteps || transformedSteps.length,
      estimatedDuration: methodData.summary?.estimatedDuration || 'Not specified',
      overallRiskLevel: capitalise(methodData.summary?.overallRiskLevel) || 'Medium',
      toolsRequired: methodData.summary?.toolsRequired || [],
      materialsRequired: methodData.summary?.materialsRequired || [],
      requiredQualifications: methodData.summary?.requiredQualifications || [],
      criticalSafetyNotes: methodData.summary?.criticalSafetyNotes || []
    },
    
    steps: transformedSteps,
    recommendations: methodData.recommendations || [],
    
    // Note: EICR observations removed as per user request
    
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
